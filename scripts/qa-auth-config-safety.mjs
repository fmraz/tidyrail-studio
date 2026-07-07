#!/usr/bin/env node

import { execFile } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const checks = [];

try {
  await assertIgnored("website/js/auth-config.js");
  await assertIgnored("docs/js/auth-config.js");
  await assertNotTracked("website/js/auth-config.js");
  await assertNotTracked("docs/js/auth-config.js");
  await assertMissingFromDeploy("docs/js/auth-config.js");
  await assertExamplesMatch();
  await assertExampleShape("website/js/auth-config.example.js");
  await assertNoServiceRoleLeak();

  for (const check of checks) console.log(`PASS ${check}`);
  console.log("PASS auth config safety");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

async function assertIgnored(relativePath) {
  try {
    await execFileAsync("git", ["check-ignore", relativePath], { cwd: repoRoot });
    checks.push(`${relativePath} is ignored by git`);
  } catch {
    throw new Error(`${relativePath} must be ignored by git.`);
  }
}

async function assertNotTracked(relativePath) {
  const { stdout } = await execFileAsync("git", ["ls-files", relativePath], { cwd: repoRoot });
  if (stdout.trim()) throw new Error(`${relativePath} is tracked; remove it before committing.`);
  checks.push(`${relativePath} is not tracked`);
}

async function assertMissingFromDeploy(relativePath) {
  try {
    await access(path.join(repoRoot, relativePath));
  } catch {
    checks.push(`${relativePath} is absent from deploy mirror`);
    return;
  }
  throw new Error(`${relativePath} exists. Do not deploy auth config until production enablement is approved.`);
}

async function assertExamplesMatch() {
  const websiteExample = await readFile(path.join(repoRoot, "website/js/auth-config.example.js"), "utf8");
  const docsExample = await readFile(path.join(repoRoot, "docs/js/auth-config.example.js"), "utf8");
  if (websiteExample !== docsExample) throw new Error("website and docs auth config examples must match.");
  checks.push("website/docs auth config examples match");
}

async function assertExampleShape(relativePath) {
  const source = await readFile(path.join(repoRoot, relativePath), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: relativePath });
  const config = sandbox.window.TIDYRAIL_AUTH;
  if (!config || typeof config !== "object") throw new Error(`${relativePath} must define window.TIDYRAIL_AUTH.`);
  assert(config.supabaseUrl === "https://YOUR_PROJECT_REF.supabase.co", "Example Supabase URL must stay a placeholder.");
  assert(config.supabaseAnonKey === "YOUR_PUBLIC_ANON_KEY", "Example anon key must stay a placeholder.");
  assert(config.enableRenewalDeskCloudSync === false, "Cloud sync must be disabled in the example config.");
  assert(!("serviceRoleKey" in config), "Example config must never include serviceRoleKey.");
  checks.push(`${relativePath} keeps safe placeholder values`);
}

async function assertNoServiceRoleLeak() {
  const patterns = [
    "service_role",
    "service-role",
    "SUPABASE_SERVICE_ROLE",
    "supabaseServiceRole",
  ];
  const { stdout } = await execFileAsync("git", ["grep", "-n", "-i", "-E", patterns.join("|"), "--", "."], {
    cwd: repoRoot,
  }).catch((error) => {
    if (error.code === 1) return { stdout: "" };
    throw error;
  });

  const allowedFiles = new Set([
    ".gitignore",
    "AUTH_STRATEGY.md",
    "CHANGELOG.md",
    "DECISION_LOG.md",
    "SUPABASE_SETUP.md",
    "SUPABASE_RLS_QA.md",
    "NEXT_PROMPT.md",
    "scripts/qa-auth-config-safety.mjs",
  ]);

  const unexpected = stdout
    .split("\n")
    .filter(Boolean)
    .filter((line) => {
      const file = line.split(":")[0];
      return !allowedFiles.has(file);
    });

  if (unexpected.length > 0) {
    throw new Error(`Unexpected service-role reference(s):\n${unexpected.join("\n")}`);
  }
  checks.push("no unexpected service-role references in tracked files");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
