#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { access, lstat, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultDmgPath = path.join(
  repoRoot,
  "desktop",
  "renewal-desk",
  "src-tauri",
  "target",
  "release",
  "bundle",
  "dmg",
  "Renewal Desk_0.1.0_aarch64.dmg",
);

const dmgPath = path.resolve(repoRoot, process.argv[2] || defaultDmgPath);
let mountDir;

try {
  await access(dmgPath);
  const checksum = await sha256(dmgPath);
  await run("hdiutil", ["verify", dmgPath], "DMG image verification");

  mountDir = await mkdtemp(path.join(os.tmpdir(), "renewal-desk-dmg-"));
  await run("hdiutil", ["attach", dmgPath, "-mountpoint", mountDir, "-nobrowse", "-readonly"], "DMG mount");

  const appPath = path.join(mountDir, "Renewal Desk.app");
  const applicationsPath = path.join(mountDir, "Applications");
  await access(appPath);
  const applicationsStat = await lstat(applicationsPath);
  assert(applicationsStat.isSymbolicLink(), "DMG must include an Applications symlink.");

  const infoPath = path.join(appPath, "Contents", "Info.plist");
  const executablePath = path.join(appPath, "Contents", "MacOS", "renewal-desk");
  const iconPath = path.join(appPath, "Contents", "Resources", "icon.icns");
  await access(infoPath);
  await access(executablePath);
  await access(iconPath);

  const bundleIdentifier = await plistValue(infoPath, "CFBundleIdentifier");
  const displayName = await plistValue(infoPath, "CFBundleDisplayName");
  const version = await plistValue(infoPath, "CFBundleShortVersionString");
  assert(bundleIdentifier === "com.tidyrailstudio.renewaldesk", `Unexpected bundle identifier: ${bundleIdentifier}`);
  assert(displayName === "Renewal Desk", `Unexpected display name: ${displayName}`);
  assert(version === "0.1.0", `Unexpected bundle version: ${version}`);

  await run("codesign", ["--verify", "--deep", "--strict", "--verbose=2", appPath], "Strict local code signature verification");

  const signature = await run("codesign", ["-dv", "--verbose=4", appPath], "Code signature detail", { allowStderr: true });
  assert(signature.includes("Signature=adhoc"), "Internal QA build should currently use ad-hoc signing.");
  assert(signature.includes("Identifier=com.tidyrailstudio.renewaldesk"), "Code signature should use the Renewal Desk identifier.");
  assert(signature.includes("Sealed Resources"), "Code signature should seal resources.");

  const spctl = await run("spctl", ["--assess", "--type", "execute", "--verbose=4", appPath], "Gatekeeper local assessment", {
    optional: true,
    allowStderr: true,
  });

  console.log(`PASS macOS DMG internal QA: ${path.relative(repoRoot, dmgPath)}`);
  console.log(`SHA-256 ${checksum}`);
  if (spctl.includes("override=security disabled")) {
    console.log("WARN Gatekeeper assessment used a local security override; this is not public distribution proof.");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (mountDir) {
    await run("hdiutil", ["detach", mountDir], "DMG detach", { optional: true }).catch(() => {});
    await rm(mountDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function sha256(filePath) {
  const buffer = await readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

async function plistValue(plistPath, key) {
  const output = await run("plutil", ["-extract", key, "raw", plistPath], `Read ${key}`);
  return output.trim();
}

async function run(command, args, label, options = {}) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, { cwd: repoRoot, timeout: 30000 });
    return options.allowStderr ? `${stdout}${stderr}` : stdout;
  } catch (error) {
    if (options.optional) return `${error.stdout || ""}${error.stderr || error.message}`;
    throw new Error(`${label} failed: ${error.stderr?.trim() || error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
