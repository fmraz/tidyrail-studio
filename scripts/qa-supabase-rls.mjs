#!/usr/bin/env node

const requiredEnv = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "QA_USER_A_EMAIL",
  "QA_USER_A_PASSWORD",
  "QA_USER_B_EMAIL",
  "QA_USER_B_PASSWORD",
];

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required env: ${missing.join(", ")}`);
  console.error("See SUPABASE_RLS_QA.md for the test-safe setup workflow.");
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
const anonKey = process.env.SUPABASE_ANON_KEY;
const runId = `qa-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const aClientId = `${runId}-user-a`;
const bClientId = `${runId}-user-b`;
const wrongOwnerClientId = `${runId}-wrong-owner`;
let deletionRequestId = null;

const tests = [];

async function main() {
  const userA = await signIn(process.env.QA_USER_A_EMAIL, process.env.QA_USER_A_PASSWORD);
  const userB = await signIn(process.env.QA_USER_B_EMAIL, process.env.QA_USER_B_PASSWORD);

  await cleanup(userA, aClientId);
  await cleanup(userB, bClientId);
  await cleanup(userA, wrongOwnerClientId);
  await cleanup(userB, wrongOwnerClientId);

  await test("user A can create and read their own profile", async () => {
    await upsertProfile(userA, `User A ${runId}`);
    const rows = await selectProfiles(userA, userA.user.id);
    assert(rows.length === 1, `expected one user A profile, got ${rows.length}`);
    assert(rows[0].id === userA.user.id, "user A profile has the wrong owner");
  });

  await test("user B can create and read their own profile", async () => {
    await upsertProfile(userB, `User B ${runId}`);
    const rows = await selectProfiles(userB, userB.user.id);
    assert(rows.length === 1, `expected one user B profile, got ${rows.length}`);
    assert(rows[0].id === userB.user.id, "user B profile has the wrong owner");
  });

  await test("user B cannot read user A profile", async () => {
    const rows = await selectProfiles(userB, userA.user.id);
    assert(rows.length === 0, `user B read ${rows.length} user A profile row(s)`);
  });

  await test("user A cannot update user B profile", async () => {
    const before = await selectProfiles(userB, userB.user.id);
    const response = await rest(`profiles?id=eq.${encodeURIComponent(userB.user.id)}`, {
      method: "PATCH",
      token: userA.access_token,
      body: { display_name: `Wrong profile update ${runId}` },
    });
    assert(response.ok, `RLS profile update attempt returned unexpected HTTP ${response.status}`);
    const after = await selectProfiles(userB, userB.user.id);
    assert(after.length === 1, "user B profile disappeared after cross-user update attempt");
    assert(after[0].display_name === before[0].display_name, "user A changed user B profile");
  });

  await test("anonymous users cannot insert renewal rows", async () => {
    const response = await rest("renewal_items", {
      method: "POST",
      body: {
        user_id: userA.user.id,
        client_id: `${runId}-anon-insert`,
        name: "Anonymous insert attempt",
        category: "Other",
        renewal_date: "2026-12-31",
      },
    });
    assert(!response.ok, `anonymous insert unexpectedly returned ${response.status}`);
  });

  await test("user A can insert and read only their own row", async () => {
    await insertItem(userA, aClientId, "User A renewal");
    const rows = await selectItems(userA, aClientId);
    assert(rows.length === 1, `expected one user A row, got ${rows.length}`);
    assert(rows[0].user_id === userA.user.id, "user A row has the wrong owner");
  });

  await test("user B can insert and read only their own row", async () => {
    await insertItem(userB, bClientId, "User B renewal");
    const rows = await selectItems(userB, bClientId);
    assert(rows.length === 1, `expected one user B row, got ${rows.length}`);
    assert(rows[0].user_id === userB.user.id, "user B row has the wrong owner");
  });

  await test("anonymous users cannot read user A rows", async () => {
    const rows = await selectItems(null, aClientId);
    assert(rows.length === 0, `anonymous read returned ${rows.length} row(s)`);
  });

  await test("user B cannot read user A rows", async () => {
    const rows = await selectItems(userB, aClientId);
    assert(rows.length === 0, `user B read ${rows.length} user A row(s)`);
  });

  await test("user A cannot read user B rows", async () => {
    const rows = await selectItems(userA, bClientId);
    assert(rows.length === 0, `user A read ${rows.length} user B row(s)`);
  });

  await test("user A cannot insert rows owned by user B", async () => {
    const response = await rest("renewal_items", {
      method: "POST",
      token: userA.access_token,
      body: {
        user_id: userB.user.id,
        client_id: wrongOwnerClientId,
        name: "Wrong owner insert",
        category: "Other",
        renewal_date: "2026-12-31",
      },
    });
    assert(!response.ok, `wrong-owner insert unexpectedly returned ${response.status}`);
    const rows = await selectItems(userB, wrongOwnerClientId);
    assert(rows.length === 0, "wrong-owner insert created a row visible to user B");
  });

  await test("user A cannot update user B rows", async () => {
    const response = await rest(`renewal_items?client_id=eq.${encodeURIComponent(bClientId)}`, {
      method: "PATCH",
      token: userA.access_token,
      body: { notes: "Updated by user A" },
    });
    assert(response.ok, `RLS update attempt returned unexpected HTTP ${response.status}`);
    const rows = await selectItems(userB, bClientId);
    assert(rows.length === 1, "user B row disappeared after cross-user update attempt");
    assert(rows[0].notes !== "Updated by user A", "user A changed user B notes");
  });

  await test("user A cannot delete user B rows", async () => {
    const response = await rest(`renewal_items?client_id=eq.${encodeURIComponent(bClientId)}`, {
      method: "DELETE",
      token: userA.access_token,
    });
    assert(response.ok, `RLS delete attempt returned unexpected HTTP ${response.status}`);
    const rows = await selectItems(userB, bClientId);
    assert(rows.length === 1, "user B row was deleted by user A");
  });

  await test("user A can create an account deletion request", async () => {
    const response = await rest("account_deletion_requests", {
      method: "POST",
      token: userA.access_token,
      body: { user_id: userA.user.id },
    });
    const data = await parseJson(response);
    assert(response.ok, `deletion request insert failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data) && data[0]?.id, "deletion request insert did not return an id");
    deletionRequestId = data[0].id;
    const rows = await selectDeletionRequests(userA, deletionRequestId);
    assert(rows.length === 1, `expected one deletion request, got ${rows.length}`);
    assert(rows[0].user_id === userA.user.id, "deletion request has the wrong owner");
  });

  await test("user B cannot read user A deletion request", async () => {
    const rows = await selectDeletionRequests(userB, deletionRequestId);
    assert(rows.length === 0, `user B read ${rows.length} user A deletion request row(s)`);
  });

  await cleanup(userA, aClientId);
  await cleanup(userB, bClientId);
  await cleanup(userA, wrongOwnerClientId);
  await cleanup(userB, wrongOwnerClientId);
  if (deletionRequestId) await cleanupDeletionRequest(userA, deletionRequestId);

  const failed = tests.filter((entry) => entry.status === "failed");
  for (const entry of tests) {
    console.log(`${entry.status === "passed" ? "PASS" : "FAIL"} ${entry.name}`);
    if (entry.error) console.log(`  ${entry.error.message}`);
  }

  if (failed.length) process.exit(1);
}

async function test(name, fn) {
  try {
    await fn();
    tests.push({ name, status: "passed" });
  } catch (error) {
    tests.push({ name, status: "failed", error });
  }
}

async function signIn(email, password) {
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJson(response);
  assert(response.ok, `sign-in failed for ${email}: ${data.error_description || data.msg || response.status}`);
  assert(data.access_token && data.user?.id, `sign-in response for ${email} did not include a session`);
  return data;
}

async function insertItem(session, clientId, name) {
  const response = await rest("renewal_items", {
    method: "POST",
    token: session.access_token,
    body: {
      user_id: session.user.id,
      client_id: clientId,
      name,
      category: "Service",
      renewal_date: "2026-12-31",
      amount: 10,
      currency: "USD",
      cycle: "Yearly",
      receipt_status: "Missing",
      notes: "Created by RLS QA.",
    },
  });
  const data = await parseJson(response);
  assert(response.ok, `insert failed for ${clientId}: ${JSON.stringify(data)}`);
}

async function upsertProfile(session, displayName) {
  const patchResponse = await rest(`profiles?id=eq.${encodeURIComponent(session.user.id)}`, {
    method: "PATCH",
    token: session.access_token,
    body: {
      display_name: displayName,
      locale: "en",
      privacy_mode: "minimal",
    },
  });
  const patchData = await parseJson(patchResponse);
  assert(patchResponse.ok, `profile update failed for ${session.user.email}: ${JSON.stringify(patchData)}`);
  if (Array.isArray(patchData) && patchData.length > 0) return;

  const insertResponse = await rest("profiles", {
    method: "POST",
    token: session.access_token,
    body: {
      id: session.user.id,
      display_name: displayName,
      locale: "en",
      privacy_mode: "minimal",
    },
  });
  const insertData = await parseJson(insertResponse);
  assert(insertResponse.ok, `profile insert failed for ${session.user.email}: ${JSON.stringify(insertData)}`);
}

async function selectItems(session, clientId) {
  const response = await rest(`renewal_items?select=*&client_id=eq.${encodeURIComponent(clientId)}`, {
    token: session?.access_token,
  });
  const data = await parseJson(response);
  assert(response.ok, `select failed for ${clientId}: ${JSON.stringify(data)}`);
  assert(Array.isArray(data), `select returned a non-array response for ${clientId}: ${JSON.stringify(data)}`);
  return data;
}

async function selectProfiles(session, id) {
  const response = await rest(`profiles?select=*&id=eq.${encodeURIComponent(id)}`, {
    token: session?.access_token,
  });
  const data = await parseJson(response);
  assert(response.ok, `profile select failed for ${id}: ${JSON.stringify(data)}`);
  assert(Array.isArray(data), `profile select returned a non-array response for ${id}: ${JSON.stringify(data)}`);
  return data;
}

async function selectDeletionRequests(session, id) {
  const response = await rest(`account_deletion_requests?select=*&id=eq.${encodeURIComponent(id)}`, {
    token: session?.access_token,
  });
  const data = await parseJson(response);
  assert(response.ok, `deletion request select failed for ${id}: ${JSON.stringify(data)}`);
  assert(Array.isArray(data), `deletion request select returned a non-array response for ${id}: ${JSON.stringify(data)}`);
  return data;
}

async function cleanup(session, clientId) {
  const response = await rest(`renewal_items?client_id=eq.${encodeURIComponent(clientId)}`, {
    method: "DELETE",
    token: session.access_token,
  });
  if (!response.ok) {
    const data = await parseJson(response);
    console.warn(`Cleanup warning for ${clientId}: ${response.status} ${JSON.stringify(data)}`);
  }
}

async function cleanupDeletionRequest(session, id) {
  const response = await rest(`account_deletion_requests?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    token: session.access_token,
  });
  if (!response.ok) {
    const data = await parseJson(response);
    console.warn(`Cleanup warning for deletion request ${id}: ${response.status} ${JSON.stringify(data)}`);
  }
}

async function rest(path, options = {}) {
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: options.method || "GET",
    headers: {
      ...baseHeaders(options.token),
      Prefer: "return=representation",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}

function baseHeaders(token) {
  const headers = {
    apikey: anonKey,
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function parseJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
