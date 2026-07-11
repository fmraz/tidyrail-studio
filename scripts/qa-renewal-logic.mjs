#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(repoRoot, "products/renewal-desk/src/renewal-logic.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const logic = context.window.RenewalDeskLogic;

const cases = [
  ["monthly future date", "2026-07-20", "Monthly", "2026-07-11", "2026-08-20"],
  ["overdue monthly date catches up", "2026-01-15", "Monthly", "2026-07-11", "2026-07-15"],
  ["month end remains clamped", "2026-01-31", "Monthly", "2026-02-01", "2026-02-28"],
  ["quarterly schedule", "2026-01-31", "Quarterly", "2026-07-31", "2026-10-31"],
  ["leap-day yearly schedule", "2024-02-29", "Yearly", "2026-01-01", "2026-02-28"],
];

for (const [name, date, cycle, today, expected] of cases) {
  const actual = logic.nextRecurringDate(date, cycle, today);
  if (actual !== expected) throw new Error(`${name}: expected ${expected}, got ${actual}`);
  console.log(`PASS ${name}`);
}

if (logic.nextRecurringDate("2026-07-11", "Custom", "2026-07-11") !== null) {
  throw new Error("custom cycles must require a manually chosen next date");
}
console.log("PASS custom cycles stay manual");
