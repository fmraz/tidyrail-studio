#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const adapterPath = path.join(repoRoot, "products", "renewal-desk", "src", "sync-adapter.js");
const source = await readFile(adapterPath, "utf8");

const tests = [];

await test("local mode stays local when auth config is absent", async () => {
  const { adapter, localStorage } = createAdapter();
  assert(adapter.adapterType === "local", `expected local adapter, got ${adapter.adapterType}`);
  assert(adapter.mode.key === "local_only", `expected local_only mode, got ${adapter.mode.key}`);
  assert(adapter.isCloudReady === false, "local mode must not be cloud ready");

  adapter.saveItems([{ id: "local-1", name: "Local item", date: "2026-12-31" }]);
  assert(localStorage.getItem("renewal-desk-items-v1").includes("Local item"), "local item was not persisted");

  const items = adapter.loadItems((item) => (item.name ? item : null));
  assert(items.length === 1, `expected one persisted item, got ${items.length}`);

  const readiness = adapter.exportReadiness();
  assert(readiness.cloudReady === false, "readiness must keep cloud disabled without config");
  assert(readiness.cloudWrites === "disabled", "cloud writes must be disabled without config");
});

await test("configured auth does not enable cloud writes by default", async () => {
  const { adapter } = createAdapter({
    supabaseUrl: "https://example.supabase.co",
    supabaseAnonKey: "public-anon-key",
    enableRenewalDeskCloudSync: false,
  });

  assert(adapter.adapterType === "local", `expected local adapter, got ${adapter.adapterType}`);
  assert(adapter.mode.key === "sync_configured", `expected sync_configured mode, got ${adapter.mode.key}`);
  assert(adapter.isCloudReady === false, "config-only mode must not be cloud ready");
  assert((await adapter.getSession()) === null, "disabled cloud gate must not create a Supabase session");

  const readiness = adapter.exportReadiness();
  assert(readiness.cloudProvider === "Supabase", "readiness should detect the configured provider");
  assert(readiness.cloudWrites === "disabled", "cloud writes must stay disabled until explicitly enabled");
});

await test("explicit local test gate exposes cloud-ready adapter state", async () => {
  const { adapter } = createAdapter({
    supabaseUrl: "https://example.supabase.co",
    supabaseAnonKey: "public-anon-key",
    enableRenewalDeskCloudSync: true,
  });

  assert(adapter.adapterType === "supabase-gated", `expected supabase-gated adapter, got ${adapter.adapterType}`);
  assert(adapter.mode.key === "cloud_ready", `expected cloud_ready mode, got ${adapter.mode.key}`);
  assert(adapter.isCloudReady === true, "enabled gate should mark adapter cloud ready for local QA");

  const readiness = adapter.exportReadiness();
  assert(readiness.cloudReady === true, "readiness should expose the enabled local test gate");
  assert(
    readiness.cloudWrites === "available-through-explicit-sync-methods",
    `unexpected cloudWrites state: ${readiness.cloudWrites}`,
  );
});

await test("cloud row mapping preserves Renewal Desk fields", async () => {
  const { adapter } = createAdapter();
  const cloudRow = adapter.toCloudRow({
    id: "client-123",
    name: "Warranty renewal",
    category: "Hardware",
    date: "2026-08-15",
    cost: 49.99,
    cycle: "Annual",
    receipt: "Saved",
    notes: "Stored with vendor invoice.",
    createdAt: "2026-06-26T05:00:00.000Z",
    updatedAt: "2026-06-26T05:10:00.000Z",
  });

  assert(cloudRow.client_id === "client-123", "local id should map to client_id");
  assert(cloudRow.renewal_date === "2026-08-15", "local date should map to renewal_date");
  assert(cloudRow.amount === 49.99, "local cost should map to amount");
  assert(cloudRow.receipt_status === "Saved", "receipt should map to receipt_status");

  const localItem = adapter.fromCloudRow({
    id: "server-uuid",
    client_id: "client-123",
    name: cloudRow.name,
    category: cloudRow.category,
    renewal_date: cloudRow.renewal_date,
    amount: cloudRow.amount,
    cycle: cloudRow.cycle,
    receipt_status: cloudRow.receipt_status,
    notes: cloudRow.notes,
    created_at: cloudRow.created_at,
    updated_at: cloudRow.updated_at,
  });

  assert(localItem.id === "client-123", "client_id should remain the local item id");
  assert(localItem.date === "2026-08-15", "renewal_date should map back to date");
  assert(localItem.cost === 49.99, "amount should map back to cost");
  assert(localItem.receipt === "Saved", "receipt_status should map back to receipt");
});

for (const entry of tests) {
  console.log(`${entry.status === "passed" ? "PASS" : "FAIL"} ${entry.name}`);
  if (entry.error) console.log(`  ${entry.error.message}`);
}

if (tests.some((entry) => entry.status === "failed")) process.exit(1);

async function test(name, fn) {
  try {
    await fn();
    tests.push({ name, status: "passed" });
  } catch (error) {
    tests.push({ name, status: "failed", error });
  }
}

function createAdapter(authConfig) {
  const localStorage = createLocalStorage();
  const window = {};
  if (authConfig) window.TIDYRAIL_AUTH = authConfig;

  vm.runInNewContext(source, {
    window,
    localStorage,
    console,
  });

  return {
    adapter: window.RenewalDeskSync.createAdapter({ storageKey: "renewal-desk-items-v1" }),
    localStorage,
  };
}

function createLocalStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
    clear() {
      values.clear();
    },
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
