#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tauriConfigPath = path.join(repoRoot, "desktop", "renewal-desk", "src-tauri", "tauri.conf.json");

const requiredFiles = [
  "desktop/renewal-desk/src-tauri/icons/32x32.png",
  "desktop/renewal-desk/src-tauri/icons/64x64.png",
  "desktop/renewal-desk/src-tauri/icons/128x128.png",
  "desktop/renewal-desk/src-tauri/icons/128x128@2x.png",
  "desktop/renewal-desk/src-tauri/icons/icon.png",
  "LINUX_PACKAGING.md",
];

const expectedPngSizes = new Map([
  ["desktop/renewal-desk/src-tauri/icons/32x32.png", 32],
  ["desktop/renewal-desk/src-tauri/icons/64x64.png", 64],
  ["desktop/renewal-desk/src-tauri/icons/128x128.png", 128],
  ["desktop/renewal-desk/src-tauri/icons/128x128@2x.png", 256],
  ["desktop/renewal-desk/src-tauri/icons/icon.png", 512],
]);

const checks = [];

try {
  for (const file of requiredFiles) await mustExist(file);

  const config = JSON.parse(await readFile(tauriConfigPath, "utf8"));
  assert(config.productName === "Renewal Desk", "Unexpected Tauri productName.");
  assert(config.identifier === "com.tidyrailstudio.renewaldesk", "Linux desktop id should match the Tauri identifier.");
  assert(config.bundle?.active === true, "Tauri bundle must be active.");
  assert(Array.isArray(config.bundle?.targets), "Tauri bundle targets must be explicit.");
  assert(config.bundle.targets.includes("appimage"), "Linux AppImage target must be configured.");
  assert(config.bundle.targets.includes("deb"), "Linux .deb target must be configured.");

  for (const [file, size] of expectedPngSizes) await assertPngSize(file, size, size);

  checkHost();
  checkLinuxDocs();

  for (const check of checks) {
    const prefix = check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "INFO";
    console.log(`${prefix} ${check.label}${check.detail ? `: ${check.detail}` : ""}`);
  }
  console.log("PASS Linux packaging readiness metadata");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

async function mustExist(relativePath) {
  await access(path.join(repoRoot, relativePath));
}

function checkHost() {
  if (os.platform() === "linux") {
    checks.push({ label: "Linux host", status: "pass", detail: "Linux package build can be attempted on this host." });
    return;
  }
  checks.push({
    label: "Linux host",
    status: "info",
    detail: "This host is not Linux; use a Linux machine or CI runner for AppImage/.deb build and smoke testing.",
  });
}

async function checkLinuxDocs() {
  const docs = await readFile(path.join(repoRoot, "LINUX_PACKAGING.md"), "utf8");
  assert(docs.includes("com.tidyrailstudio.renewaldesk"), "LINUX_PACKAGING.md must document the Tauri identifier as the desktop id.");
  checks.push({ label: "Linux desktop id documentation", status: "pass", detail: "Documented id matches Tauri identifier." });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertPngSize(relativePath, expectedWidth, expectedHeight) {
  const buffer = await readFile(path.join(repoRoot, relativePath));
  assertMagicFromBuffer(relativePath, buffer, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  assert(width === expectedWidth && height === expectedHeight, `${relativePath} must be ${expectedWidth}x${expectedHeight}; got ${width}x${height}.`);
}

function assertMagicFromBuffer(relativePath, buffer, magic) {
  assert(buffer.subarray(0, magic.length).equals(magic), `${relativePath} has an unexpected file signature.`);
}
