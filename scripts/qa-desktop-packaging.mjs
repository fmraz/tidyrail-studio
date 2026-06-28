#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
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

  const frontendDist = path.resolve(path.dirname(tauriConfigPath), config.build?.frontendDist || "");
  assert(frontendDist === path.join(repoRoot, "products", "renewal-desk"), "Tauri frontendDist must point at products/renewal-desk.");
  await access(path.join(frontendDist, "index.html"));

  const csp = config.app?.security?.csp || "";
  assert(!csp.includes("unsafe-eval"), "Desktop CSP must not allow unsafe-eval.");
  assert(!csp.includes("*"), "Desktop CSP must not use wildcard sources.");

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

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
