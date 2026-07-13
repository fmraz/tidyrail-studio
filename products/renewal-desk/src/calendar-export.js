(function attachRenewalDeskCalendar(global) {
  const lineBreak = "\r\n";

  function createCalendar(items, generatedAt = new Date()) {
    const events = items.map((item) => createEvent(item, generatedAt)).filter(Boolean);
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Tidyrail Studio//Renewal Desk 0.1//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Renewal Desk",
      ...events,
      "END:VCALENDAR",
      "",
    ].join(lineBreak);
  }

  function createEvent(item, generatedAt) {
    if (!item?.name || !isDateValue(item.date)) return null;
    const description = [
      item.category ? `Category: ${item.category}` : "",
      item.cycle ? `Cycle: ${item.cycle}` : "",
      item.receipt ? `Receipt: ${item.receipt}` : "",
      item.notes ? `Notes: ${item.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return [
      "BEGIN:VEVENT",
      `UID:${escapeText(String(item.id || item.name))}@renewal-desk.tidyrailstudio.com`,
      `DTSTAMP:${toUtcStamp(generatedAt)}`,
      `DTSTART;VALUE=DATE:${toCompactDate(item.date)}`,
      `DTEND;VALUE=DATE:${toCompactDate(nextDay(item.date))}`,
      `SUMMARY:${escapeText(item.name)}`,
      `DESCRIPTION:${escapeText(description)}`,
      "STATUS:CONFIRMED",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    ].join(lineBreak);
  }

  function escapeText(value) {
    return String(value)
      .replaceAll("\\", "\\\\")
      .replaceAll("\r\n", "\n")
      .replaceAll("\r", "\n")
      .replaceAll("\n", "\\n")
      .replaceAll(",", "\\,")
      .replaceAll(";", "\\;");
  }

  function nextDay(value) {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    return toDateValue(date);
  }

  function isDateValue(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  function toCompactDate(value) {
    return value.replaceAll("-", "");
  }

  function toDateValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function toUtcStamp(date) {
    return date.toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}Z$/, "Z");
  }

  const api = { createCalendar, escapeText };
  global.RenewalDeskCalendar = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
