(function attachRenewalDeskLogic(global) {
  const cycleMonths = {
    Monthly: 1,
    Quarterly: 3,
    Yearly: 12,
  };

  function canAdvance(cycle) {
    return Boolean(cycleMonths[cycle]);
  }

  function nextRecurringDate(dateValue, cycle, todayValue = toDateValue(new Date())) {
    const interval = cycleMonths[cycle];
    const source = parseDateValue(dateValue);
    const today = parseDateValue(todayValue);
    if (!interval || !source || !today) return null;

    for (let occurrence = 1; occurrence <= 1200; occurrence += 1) {
      const candidate = addMonthsClamped(source, interval * occurrence);
      if (candidate > today) return toDateValue(candidate);
    }

    return null;
  }

  function addMonthsClamped(source, months) {
    const targetMonth = source.getMonth() + months;
    const year = source.getFullYear() + Math.floor(targetMonth / 12);
    const month = ((targetMonth % 12) + 12) % 12;
    const day = Math.min(source.getDate(), daysInMonth(year, month));
    return new Date(year, month, day);
  }

  function parseDateValue(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
    return date;
  }

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function toDateValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const api = { canAdvance, nextRecurringDate };
  global.RenewalDeskLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
