#!/usr/bin/env node

import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const desktopRoot = path.join(repoRoot, "desktop", "renewal-desk");
const tauriConfigPath = path.join(desktopRoot, "src-tauri", "tauri.conf.json");

const requiredFiles = [
  "desktop/renewal-desk/package.json",
  "desktop/renewal-desk/README.md",
  "desktop/renewal-desk/src-tauri/Cargo.toml",
  "desktop/renewal-desk/src-tauri/build.rs",
  "desktop/renewal-desk/src-tauri/src/lib.rs",
  "desktop/renewal-desk/src-tauri/src/main.rs",
  "desktop/renewal-desk/src-tauri/capabilities/default.json",
  "desktop/renewal-desk/src-tauri/icons/32x32.png",
  "desktop/renewal-desk/src-tauri/icons/64x64.png",
  "desktop/renewal-desk/src-tauri/icons/128x128.png",
  "desktop/renewal-desk/src-tauri/icons/128x128@2x.png",
  "desktop/renewal-desk/src-tauri/icons/icon.png",
  "desktop/renewal-desk/src-tauri/icons/icon.icns",
  "desktop/renewal-desk/src-tauri/icons/icon.ico",
  "products/renewal-desk/index.html",
  "products/renewal-desk/src/app.js",
  "products/renewal-desk/src/sync-adapter.js",
  "products/renewal-desk/sw.js",
];

const forbiddenFiles = [
  "website/js/auth-config.js",
  "docs/js/auth-config.js",
  "desktop/renewal-desk/.env",
  "desktop/renewal-desk/src-tauri/.env",
];

const expectedPngSizes = new Map([
  ["desktop/renewal-desk/src-tauri/icons/32x32.png", 32],
  ["desktop/renewal-desk/src-tauri/icons/64x64.png", 64],
  ["desktop/renewal-desk/src-tauri/icons/128x128.png", 128],
  ["desktop/renewal-desk/src-tauri/icons/128x128@2x.png", 256],
  ["desktop/renewal-desk/src-tauri/icons/icon.png", 512],
]);

async function main() {
  for (const file of requiredFiles) {
    await mustExist(file);
  }

  for (const file of forbiddenFiles) {
    await mustNotExist(file);
  }

  const config = JSON.parse(await readFile(tauriConfigPath, "utf8"));
  assert(config.productName === "Renewal Desk", "Unexpected Tauri productName.");
  assert(config.identifier === "com.tidyrailstudio.renewaldesk", "Unexpected Tauri bundle identifier.");
  assert(config.bundle?.active === true, "Tauri bundling is not active.");
  assert(Array.isArray(config.bundle?.icon), "Tauri bundle.icon must list desktop icon assets.");
  assert(config.bundle.icon.includes("icons/icon.icns"), "Tauri bundle.icon must include the macOS .icns asset.");
  assert(config.bundle.icon.includes("icons/icon.ico"), "Tauri bundle.icon must include the Windows .ico asset.");

  const frontendDist = path.resolve(path.dirname(tauriConfigPath), config.build?.frontendDist || "");
  assert(frontendDist === path.join(repoRoot, "products", "renewal-desk"), "Tauri frontendDist must point at products/renewal-desk.");
  await access(path.join(frontendDist, "index.html"));

  const csp = config.app?.security?.csp || "";
  assert(!csp.includes("unsafe-eval"), "Desktop CSP must not allow unsafe-eval.");
  assert(!csp.includes("*"), "Desktop CSP must not use wildcard sources.");

  for (const [file, size] of expectedPngSizes) {
    await assertPngSize(file, size, size);
  }
  await assertMagic("desktop/renewal-desk/src-tauri/icons/icon.icns", Buffer.from("icns"));
  await assertIco("desktop/renewal-desk/src-tauri/icons/icon.ico");

  console.log("PASS desktop packaging scaffold preflight");
}

async function mustExist(relativePath) {
  await access(path.join(repoRoot, relativePath));
}

async function mustNotExist(relativePath) {
  try {
    await access(path.join(repoRoot, relativePath));
  } catch {
    return;
  }
  throw new Error(`Forbidden local config or secret-bearing file exists: ${relativePath}`);
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

async function assertMagic(relativePath, magic) {
  const buffer = await readFile(path.join(repoRoot, relativePath));
  assertMagicFromBuffer(relativePath, buffer, magic);
  const fileStat = await stat(path.join(repoRoot, relativePath));
  assert(fileStat.size > magic.length, `${relativePath} is empty or truncated.`);
}

function assertMagicFromBuffer(relativePath, buffer, magic) {
  assert(buffer.subarray(0, magic.length).equals(magic), `${relativePath} has an unexpected file signature.`);
}

async function assertIco(relativePath) {
  const buffer = await readFile(path.join(repoRoot, relativePath));
  assert(buffer.readUInt16LE(0) === 0 && buffer.readUInt16LE(2) === 1, `${relativePath} is not a Windows icon file.`);
  assert(buffer.readUInt16LE(4) >= 1, `${relativePath} must contain at least one icon image.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
