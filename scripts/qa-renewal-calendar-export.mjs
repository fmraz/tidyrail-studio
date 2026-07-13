#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(repoRoot, "products/renewal-desk/src/calendar-export.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const calendar = context.window.RenewalDeskCalendar;

const output = calendar.createCalendar(
  [
    {
      id: "renewal-1",
      name: "Hosting, domain; renewal",
      category: "Subscription",
      date: "2026-12-31",
      cycle: "Yearly",
      receipt: "Saved",
      notes: "Review plan\nbefore renewal.",
    },
    { id: "invalid", name: "Ignored item", date: "2026-02-30" },
  ],
  new Date("2026-07-12T08:00:00.000Z"),
);

const assertions = [
  ["calendar envelope", output.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0") && output.endsWith("END:VCALENDAR\r\n")],
  ["stable product identity", output.includes("PRODID:-//Tidyrail Studio//Renewal Desk 0.1//EN")],
  ["all-day start date", output.includes("DTSTART;VALUE=DATE:20261231")],
  ["exclusive next-day end", output.includes("DTEND;VALUE=DATE:20270101")],
  ["deterministic UTC stamp", output.includes("DTSTAMP:20260712T080000Z")],
  ["calendar text escaping", output.includes("SUMMARY:Hosting\\, domain\\; renewal")],
  ["multiline note escaping", output.includes("Notes: Review plan\\nbefore renewal.")],
  ["invalid dates omitted", !output.includes("Ignored item")],
  ["one valid event", output.split("BEGIN:VEVENT").length - 1 === 1],
];

for (const [name, passed] of assertions) {
  if (!passed) throw new Error(`${name} failed`);
  console.log(`PASS ${name}`);
}
