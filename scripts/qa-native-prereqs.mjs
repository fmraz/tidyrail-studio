#!/usr/bin/env node

import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const checks = [];

await commandCheck("node", ["--version"], { required: true, label: "Node.js" });
await commandCheck("npm", ["--version"], { required: true, label: "npm" });
await commandCheck("rustc", ["--version"], { required: true, label: "Rust compiler" });
await commandCheck("cargo", ["--version"], { required: true, label: "Cargo" });
await commandCheck("hdiutil", ["help"], { required: true, label: "macOS hdiutil" });
await commandCheck("xcode-select", ["-p"], { required: true, label: "Xcode command line tools" });
await commandCheck("xcodebuild", ["-version"], { required: false, label: "Full Xcode" });
await tauriCliCheck();

const failures = checks.filter((check) => check.status === "fail");
const warnings = checks.filter((check) => check.status === "warn");

for (const check of checks) {
  const prefix = check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "FAIL";
  console.log(`${prefix} ${check.label}${check.detail ? `: ${check.detail}` : ""}`);
}

if (failures.length > 0) {
  console.error(`Native packaging prerequisites incomplete: ${failures.length} blocking check(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

console.log(`PASS native packaging prerequisites: ${warnings.length} warning(s).`);

async function commandCheck(command, args, options) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, { cwd: repoRoot, timeout: 10000 });
    const output = `${stdout || stderr}`.trim().split("\n")[0];
    checks.push({ label: options.label, status: "pass", detail: output });
  } catch (error) {
    checks.push({
      label: options.label,
      status: options.required ? "fail" : "warn",
      detail: error.stderr?.trim().split("\n")[0] || error.message,
    });
  }
}

async function tauriCliCheck() {
  try {
    const packageLockPath = path.join(repoRoot, "desktop", "renewal-desk", "package-lock.json");
    const packageLock = JSON.parse(await readFile(packageLockPath, "utf8"));
    const version = packageLock.packages?.["node_modules/@tauri-apps/cli"]?.version;
    if (!version) throw new Error("@tauri-apps/cli not found in package-lock.json");
    checks.push({ label: "Tauri CLI package", status: "pass", detail: version });
  } catch (error) {
    checks.push({ label: "Tauri CLI package", status: "fail", detail: error.message });
  }
}
