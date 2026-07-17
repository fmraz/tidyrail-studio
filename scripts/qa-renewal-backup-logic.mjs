#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(repoRoot, "products/renewal-desk/src/backup-logic.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const backup = context.window.RenewalDeskBackup;

const normalizeItem = (item) => {
  if (!item?.id || !item?.name || !/^\d{4}-\d{2}-\d{2}$/.test(item.date || "")) return null;
  return { id: String(item.id), name: String(item.name), date: item.date };
};

const created = backup.createBackup([{ id: "1", name: "Passport", date: "2027-01-10" }], new Date("2026-07-13T08:00:00Z"));
assert(created.app === "Renewal Desk", "created backup must include app identity");
assert(created.formatVersion === 1, "created backup must include format version");
assert(created.exportedAt === "2026-07-13T08:00:00.000Z", "created backup must include deterministic timestamp");
console.log("PASS versioned backup creation");

const parsed = backup.parseBackup(created, normalizeItem);
assert(parsed.items.length === 1 && parsed.sourceFormat === "renewal-desk-v1", "versioned backup must parse");
console.log("PASS versioned backup parsing");

const legacy = backup.parseBackup([{ id: "legacy", name: "Warranty", date: "2026-12-01" }], normalizeItem);
assert(legacy.items.length === 1 && legacy.sourceFormat === "legacy-array", "legacy array must remain supported");
console.log("PASS legacy backup compatibility");

const deduplicated = backup.parseBackup(
  {
    app: "Renewal Desk",
    formatVersion: 1,
    items: [
      { id: "same", name: "Old name", date: "2026-11-01" },
      { id: "same", name: "New name", date: "2026-12-01" },
      { id: "bad", name: "Missing date" },
    ],
  },
  normalizeItem,
);
assert(deduplicated.items.length === 1, "duplicate ids must collapse to one item");
assert(deduplicated.items[0].name === "New name", "latest duplicate must win");
assert(deduplicated.duplicateCount === 1 && deduplicated.invalidCount === 1, "skipped entries must be counted");
console.log("PASS duplicate and invalid entry handling");

expectFailure(() => backup.parseBackup({ app: "Another App", items: [] }, normalizeItem), "foreign backup rejection");
expectFailure(
  () => backup.parseBackup({ app: "Renewal Desk", formatVersion: 2, items: [] }, normalizeItem),
  "future format rejection",
);
expectFailure(
  () => backup.parseBackup({ app: "Renewal Desk", items: [{ id: "bad", name: "No date" }] }, normalizeItem),
  "all-invalid backup rejection",
);
expectFailure(
  () =>
    backup.parseBackup(
      {
        app: "Renewal Desk",
        items: Array.from({ length: 10001 }, (_, index) => ({
          id: String(index),
          name: "Record",
          date: "2027-01-01",
        })),
      },
      normalizeItem,
    ),
  "oversized record set rejection",
);

const empty = backup.parseBackup({ app: "Renewal Desk", formatVersion: 1, items: [] }, normalizeItem);
assert(empty.items.length === 0, "intentional empty backup must remain valid");
console.log("PASS empty backup support");

const emptyRestorePrompt = backup.createRestorePrompt(3, 0);
assert(emptyRestorePrompt.includes("backup is empty"), "empty restore must identify the empty backup");
assert(emptyRestorePrompt.includes("remove all 3 current items"), "empty restore must state the data loss");
assert(emptyRestorePrompt.includes("undo"), "empty restore must explain immediate recovery");
console.log("PASS empty backup replacement warning");

const replacementPrompt = backup.createRestorePrompt(1, 2);
assert(replacementPrompt.includes("current 1 item"), "replacement prompt must use singular item copy");
assert(replacementPrompt.includes("with 2"), "replacement prompt must state the incoming count");
console.log("PASS standard replacement warning");

function expectFailure(fn, name) {
  let failed = false;
  try {
    fn();
  } catch {
    failed = true;
  }
  assert(failed, `${name} must fail`);
  console.log(`PASS ${name}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
