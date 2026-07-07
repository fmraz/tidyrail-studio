#!/usr/bin/env node

import { access, readFile, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tauriConfigPath = path.join(repoRoot, "desktop", "renewal-desk", "src-tauri", "tauri.conf.json");

const requiredFiles = [
  "desktop/renewal-desk/src-tauri/icons/icon.ico",
  "desktop/renewal-desk/src-tauri/icons/Square30x30Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square44x44Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square71x71Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square89x89Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square107x107Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square142x142Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square150x150Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square284x284Logo.png",
  "desktop/renewal-desk/src-tauri/icons/Square310x310Logo.png",
  "desktop/renewal-desk/src-tauri/icons/StoreLogo.png",
  "WINDOWS_PACKAGING.md",
  "MICROSOFT_STORE_LISTING.md",
];

const expectedPngSizes = new Map([
  ["desktop/renewal-desk/src-tauri/icons/Square30x30Logo.png", 30],
  ["desktop/renewal-desk/src-tauri/icons/Square44x44Logo.png", 44],
  ["desktop/renewal-desk/src-tauri/icons/Square71x71Logo.png", 71],
  ["desktop/renewal-desk/src-tauri/icons/Square89x89Logo.png", 89],
  ["desktop/renewal-desk/src-tauri/icons/Square107x107Logo.png", 107],
  ["desktop/renewal-desk/src-tauri/icons/Square142x142Logo.png", 142],
  ["desktop/renewal-desk/src-tauri/icons/Square150x150Logo.png", 150],
  ["desktop/renewal-desk/src-tauri/icons/Square284x284Logo.png", 284],
  ["desktop/renewal-desk/src-tauri/icons/Square310x310Logo.png", 310],
  ["desktop/renewal-desk/src-tauri/icons/StoreLogo.png", 50],
]);

const checks = [];

try {
  for (const file of requiredFiles) await mustExist(file);

  const config = JSON.parse(await readFile(tauriConfigPath, "utf8"));
  assert(config.productName === "Renewal Desk", "Unexpected Tauri productName.");
  assert(config.identifier === "com.tidyrailstudio.renewaldesk", "Unexpected Tauri identifier.");
  assert(config.bundle?.active === true, "Tauri bundle must be active.");
  assert(config.bundle?.publisher === "Tidyrail Studio", "Tauri bundle publisher must be Tidyrail Studio.");
  assert(Array.isArray(config.bundle?.targets), "Tauri bundle targets must be explicit.");
  assert(config.bundle.targets.includes("nsis"), "Windows NSIS target must be configured.");
  assert(config.bundle.icon?.includes("icons/icon.ico"), "Windows .ico must be configured in bundle.icon.");
  assert(config.bundle.shortDescription?.length <= 80, "Windows shortDescription should stay concise.");
  assert(config.bundle.longDescription?.includes("Renewal Desk"), "Windows longDescription should describe Renewal Desk.");

  await assertIco("desktop/renewal-desk/src-tauri/icons/icon.ico");
  for (const [file, size] of expectedPngSizes) await assertPngSize(file, size, size);

  checkHost();
  checkSigningState();

  for (const check of checks) {
    const prefix = check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "INFO";
    console.log(`${prefix} ${check.label}${check.detail ? `: ${check.detail}` : ""}`);
  }
  console.log("PASS Windows packaging readiness metadata");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

async function mustExist(relativePath) {
  await access(path.join(repoRoot, relativePath));
}

function checkHost() {
  if (os.platform() === "win32") {
    checks.push({ label: "Windows host", status: "pass", detail: "Installer build can be attempted on this host." });
    return;
  }
  checks.push({
    label: "Windows host",
    status: "info",
    detail: "This host is not Windows; use a Windows machine or CI runner for real installer build and smoke testing.",
  });
}

function checkSigningState() {
  const hasWindowsSigningHint = ["WINDOWS_CERTIFICATE", "WINDOWS_CERTIFICATE_PASSWORD", "TAURI_SIGNING_PRIVATE_KEY"].some((name) => process.env[name]);
  if (hasWindowsSigningHint) {
    checks.push({ label: "Windows signing environment", status: "warn", detail: "Signing-related environment variable is present; make sure secrets are never committed." });
    return;
  }
  checks.push({
    label: "Windows signing environment",
    status: "info",
    detail: "No Windows code signing configuration detected. This is expected before founder approval.",
  });
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

async function assertIco(relativePath) {
  const buffer = await readFile(path.join(repoRoot, relativePath));
  assert(buffer.readUInt16LE(0) === 0 && buffer.readUInt16LE(2) === 1, `${relativePath} is not a Windows icon file.`);
  assert(buffer.readUInt16LE(4) >= 1, `${relativePath} must contain at least one icon image.`);
  const fileStat = await stat(path.join(repoRoot, relativePath));
  assert(fileStat.size > 1024, `${relativePath} is unexpectedly small.`);
}

function assertMagicFromBuffer(relativePath, buffer, magic) {
  assert(buffer.subarray(0, magic.length).equals(magic), `${relativePath} has an unexpected file signature.`);
}
