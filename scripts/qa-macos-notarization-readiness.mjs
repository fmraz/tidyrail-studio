#!/usr/bin/env node

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const strict = process.argv.includes("--strict");

const checks = [];

await commandCheck("xcrun", ["notarytool", "--help"], {
  label: "Apple notarytool",
  required: true,
});
await commandCheck("xcrun", ["stapler", "help"], {
  label: "Apple stapler",
  required: true,
  acceptUsageOnFailure: true,
});
await commandCheck("xcodebuild", ["-version"], {
  label: "Full Xcode selected",
  required: false,
});
await developerIdIdentityCheck();
await notarizationCredentialCheck();

for (const check of checks) {
  const prefix = check.status === "pass" ? "PASS" : check.status === "warn" ? "WARN" : "BLOCKER";
  console.log(`${prefix} ${check.label}${check.detail ? `: ${check.detail}` : ""}`);
}

const blockers = checks.filter((check) => check.status === "blocker");
const warnings = checks.filter((check) => check.status === "warn");

if (blockers.length > 0) {
  console.log(`INFO macOS notarization is not ready: ${blockers.length} blocker(s), ${warnings.length} warning(s).`);
  console.log("INFO No credentials were printed, submitted, or stored.");
  if (strict) process.exit(1);
} else {
  console.log(`PASS macOS notarization readiness: ${warnings.length} warning(s).`);
}

async function commandCheck(command, args, options) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, { timeout: 15000 });
    const detail = firstLine(stdout || stderr);
    checks.push({ label: options.label, status: "pass", detail });
  } catch (error) {
    const detail = firstLine(error.stderr || error.stdout || error.message);
    if (options.acceptUsageOnFailure && String(error.stderr || error.stdout || "").includes("Usage: stapler")) {
      checks.push({ label: options.label, status: "pass", detail });
      return;
    }
    checks.push({
      label: options.label,
      status: options.required ? "blocker" : "warn",
      detail,
    });
  }
}

async function developerIdIdentityCheck() {
  try {
    const { stdout } = await execFileAsync("security", ["find-identity", "-v", "-p", "codesigning"], { timeout: 15000 });
    const identities = stdout
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.includes("Developer ID Application:"));
    if (identities.length === 0) {
      checks.push({
        label: "Developer ID Application signing identity",
        status: "blocker",
        detail: "No Developer ID Application identity found in the accessible keychains.",
      });
      return;
    }
    checks.push({
      label: "Developer ID Application signing identity",
      status: "pass",
      detail: `${identities.length} matching identity/identities found.`,
    });
  } catch (error) {
    checks.push({
      label: "Developer ID Application signing identity",
      status: "blocker",
      detail: firstLine(error.stderr || error.message),
    });
  }
}

async function notarizationCredentialCheck() {
  const appleIdFlow = hasEnv("APPLE_ID") && hasEnv("APPLE_TEAM_ID") && hasEnv("APPLE_PASSWORD");
  const apiKeyFlow = hasEnv("APPLE_API_KEY") && hasEnv("APPLE_API_ISSUER") && hasEnv("APPLE_API_KEY_PATH");

  if (appleIdFlow || apiKeyFlow) {
    checks.push({
      label: "Notarization credentials",
      status: "pass",
      detail: appleIdFlow ? "Apple ID app-specific password variables are present." : "App Store Connect API key variables are present.",
    });
    return;
  }

  checks.push({
    label: "Notarization credentials",
    status: "blocker",
    detail: "Set either APPLE_ID + APPLE_TEAM_ID + APPLE_PASSWORD or APPLE_API_KEY + APPLE_API_ISSUER + APPLE_API_KEY_PATH.",
  });
}

function hasEnv(name) {
  return typeof process.env[name] === "string" && process.env[name].length > 0;
}

function firstLine(value) {
  return String(value || "").trim().split("\n")[0];
}
