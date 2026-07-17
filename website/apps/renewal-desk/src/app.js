const storageKey = "renewal-desk-items-v1";
const renewalLogic = window.RenewalDeskLogic;
const calendarExport = window.RenewalDeskCalendar;
const backupLogic = window.RenewalDeskBackup;
const maxBackupBytes = 5 * 1024 * 1024;
const syncAdapter =
  window.RenewalDeskSync?.createAdapter({ storageKey }) || createFallbackSyncAdapter(storageKey);
document.documentElement.dataset.syncAdapter = syncAdapter.adapterType || "fallback";

const state = {
  items: syncAdapter.loadItems(normalizeItem),
  query: "",
  category: "all",
  view: "dashboard",
  returnFocusTo: null,
  undoAction: null,
  undoTimer: null,
};

const elements = {
  viewTitle: document.querySelector("#view-title"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  upcomingTable: document.querySelector("#upcomingTable"),
  dashboardEmpty: document.querySelector("#dashboardEmpty"),
  itemsEmpty: document.querySelector("#itemsEmpty"),
  itemCards: document.querySelector("#itemCards"),
  timelineList: document.querySelector("#timelineList"),
  receiptList: document.querySelector("#receiptList"),
  calendarBuckets: document.querySelector("#calendarBuckets"),
  statDueSoon: document.querySelector("#statDueSoon"),
  statAnnual: document.querySelector("#statAnnual"),
  statMissingReceipts: document.querySelector("#statMissingReceipts"),
  statTotal: document.querySelector("#statTotal"),
  dialog: document.querySelector("#itemDialog"),
  form: document.querySelector("#itemForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  itemId: document.querySelector("#itemId"),
  exportStatus: document.querySelector("#exportStatus"),
  importJsonBtn: document.querySelector("#importJsonBtn"),
  importJsonInput: document.querySelector("#importJsonInput"),
  syncReadinessBtn: document.querySelector("#syncReadinessBtn"),
  itemName: document.querySelector("#itemName"),
  itemCategory: document.querySelector("#itemCategory"),
  itemDate: document.querySelector("#itemDate"),
  itemCost: document.querySelector("#itemCost"),
  itemCycle: document.querySelector("#itemCycle"),
  itemReceipt: document.querySelector("#itemReceipt"),
  itemNotes: document.querySelector("#itemNotes"),
  actionToast: document.querySelector("#actionToast"),
  actionToastMessage: document.querySelector("#actionToastMessage"),
  undoActionBtn: document.querySelector("#undoActionBtn"),
};

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelector("#addItemBtn").addEventListener("click", () => openItemDialog());
document.querySelector("#sampleDataBtn").addEventListener("click", loadSampleData);
document.querySelector("#clearAllBtn").addEventListener("click", clearAllItems);
document.querySelector("#exportJsonBtn").addEventListener("click", exportJson);
document.querySelector("#exportCalendarBtn").addEventListener("click", exportCalendar);
document.querySelector("#exportCsvBtn").addEventListener("click", exportCsv);
elements.importJsonBtn.addEventListener("click", () => elements.importJsonInput.click());
elements.importJsonInput.addEventListener("change", importJson);
elements.syncReadinessBtn?.addEventListener("click", exportSyncReadiness);
elements.undoActionBtn.addEventListener("click", undoLastAction);

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  render();
});

elements.categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;
  render();
});

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitter = event.submitter;
  if (submitter?.value === "cancel") {
    elements.dialog.close();
    return;
  }
  saveFormItem();
});

elements.dialog.addEventListener("close", () => {
  if (state.returnFocusTo instanceof HTMLElement && document.contains(state.returnFocusTo)) {
    state.returnFocusTo.focus();
  }
  state.returnFocusTo = null;
});

render();

function persistItems() {
  syncAdapter.saveItems(state.items);
}

function normalizeItem(item) {
  const name = typeof item?.name === "string" ? item.name.trim() : "";
  if (!name || !isValidDateValue(item.date)) return null;
  const categories = ["Subscription", "Warranty", "Document", "Service", "Other"];
  const cycles = ["Monthly", "Quarterly", "Yearly", "One-time", "Custom"];
  const receiptStates = ["Saved", "Missing", "Not needed"];
  const cost = Number(item.cost || 0);
  return {
    id: String(item.id || createId()),
    name,
    category: categories.includes(item.category) ? item.category : "Other",
    date: item.date,
    cost: Number.isFinite(cost) && cost >= 0 ? cost : 0,
    cycle: cycles.includes(item.cycle) ? item.cycle : "Custom",
    receipt: receiptStates.includes(item.receipt) ? item.receipt : "Missing",
    notes: typeof item.notes === "string" ? item.notes : "",
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
    if (button.dataset.view === view) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === view);
  });
  elements.viewTitle.textContent = titleCase(view);
}

function render() {
  const filtered = getFilteredItems();
  const sorted = [...filtered].sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date));
  renderStats();
  renderUpcoming(sorted);
  renderItems(sorted);
  renderTimeline(sorted);
  renderReceipts(sorted);
  renderCalendar(sorted);
}

function getFilteredItems() {
  return state.items.filter((item) => {
    const matchesCategory = state.category === "all" || item.category === state.category;
    const searchTarget = `${item.name} ${item.category} ${item.cycle} ${item.receipt} ${item.notes}`.toLowerCase();
    return matchesCategory && searchTarget.includes(state.query);
  });
}

function renderStats() {
  const now = startOfToday();
  const needsAttention = state.items.filter((item) => {
    const days = differenceInDays(parseLocalDate(item.date), now);
    return days <= 30;
  });
  const annualEstimate = state.items.reduce((sum, item) => sum + annualizedCost(item), 0);
  const missingReceipts = state.items.filter((item) => item.receipt === "Missing").length;

  elements.statDueSoon.textContent = needsAttention.length;
  elements.statAnnual.textContent = formatCurrency(annualEstimate);
  elements.statMissingReceipts.textContent = missingReceipts;
  elements.statTotal.textContent = state.items.length;
}

function renderUpcoming(items) {
  const now = startOfToday();
  const upcoming = items.filter((item) => differenceInDays(parseLocalDate(item.date), now) <= 90).slice(0, 12);
  elements.upcomingTable.innerHTML = upcoming
    .map((item) => {
      const days = differenceInDays(parseLocalDate(item.date), now);
      const status = getStatus(days);
      return `
        <tr>
          <td data-label="Name">
            <span class="item-title">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.notes || "No notes added")}</span>
            </span>
          </td>
          <td data-label="Category"><span class="tag">${escapeHtml(item.category)}</span></td>
          <td data-label="Next date">${formatDate(item.date)}</td>
          <td data-label="Cost">${item.cost ? formatCurrency(item.cost) : "—"}</td>
          <td data-label="Status"><span class="tag ${status.className}">${status.label}</span></td>
          <td data-label="Actions">
            <div class="row-actions">
              ${renewAction(item)}
              <button class="text-button" type="button" data-action="edit" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">Edit</button>
              <button class="text-button danger" type="button" data-action="delete" data-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">Delete</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  elements.dashboardEmpty.classList.toggle("is-visible", upcoming.length === 0);
  bindActionButtons(elements.upcomingTable);
}

function renderItems(items) {
  elements.itemCards.innerHTML = items
    .map((item) => {
      const days = differenceInDays(parseLocalDate(item.date), startOfToday());
      const status = getStatus(days);
      return `
        <article class="item-card">
          <div class="item-title">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.category)} · ${escapeHtml(item.cycle)}</span>
          </div>
          <div>
            <span class="tag ${status.className}">${status.label}</span>
            <span class="tag">${escapeHtml(item.receipt)}</span>
          </div>
          <p class="body-copy">${escapeHtml(item.notes || "No notes added.")}</p>
          <div class="item-card-footer">
            <span>${formatDate(item.date)} · ${item.cost ? formatCurrency(item.cost) : "No cost"}</span>
            <span class="row-actions">
              ${renewAction(item)}
              <button class="text-button" type="button" data-action="edit" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">Edit</button>
              <button class="text-button danger" type="button" data-action="delete" data-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">Delete</button>
            </span>
          </div>
        </article>
      `;
    })
    .join("");
  elements.itemsEmpty.classList.toggle("is-visible", items.length === 0);
  bindActionButtons(elements.itemCards);
}

function renderTimeline(items) {
  const nextItems = items.slice(0, 5);
  elements.timelineList.innerHTML = nextItems.length
    ? nextItems
        .map((item) => `
          <div class="timeline-item">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${formatDate(item.date)}</span>
            </div>
            <span>${relativeDate(item.date)}</span>
          </div>
        `)
        .join("")
    : `<div class="empty-state is-visible"><strong>No dates to show</strong><span>Add an item to build your timeline.</span></div>`;
}

function renderReceipts(items) {
  const missing = items.filter((item) => item.receipt === "Missing").slice(0, 5);
  elements.receiptList.innerHTML = missing.length
    ? missing
        .map((item) => `
          <div class="receipt-item">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.category)}</span>
            </div>
            <span>${formatDate(item.date)}</span>
          </div>
        `)
        .join("")
    : `<div class="empty-state is-visible"><strong>No missing receipts</strong><span>Items marked Saved or Not needed are hidden here.</span></div>`;
}

function renderCalendar(items) {
  const buckets = new Map();
  items.forEach((item) => {
    const date = parseLocalDate(item.date);
    const key = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(item);
  });

  elements.calendarBuckets.innerHTML = buckets.size
    ? Array.from(buckets.entries())
        .map(([month, monthItems]) => `
          <section class="calendar-bucket">
            <strong>${escapeHtml(month)}</strong>
            <span>${monthItems.length} item${monthItems.length === 1 ? "" : "s"}</span>
            <div class="timeline">
              ${monthItems
                .map((item) => `
                  <div class="timeline-item">
                    <div>
                      <strong>${escapeHtml(item.name)}</strong>
                      <span>${escapeHtml(item.category)}</span>
                    </div>
                    <span>${formatDate(item.date)}</span>
                  </div>
                `)
                .join("")}
            </div>
          </section>
        `)
        .join("")
    : `<div class="empty-state is-visible"><strong>No calendar items</strong><span>Add dates to create a monthly view.</span></div>`;
}

function bindActionButtons(root) {
  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "edit") openItemDialog(button.dataset.id);
      if (button.dataset.action === "renew") renewItem(button.dataset.id);
      if (button.dataset.action === "delete") deleteItem(button.dataset.id);
    });
  });
}

function renewAction(item) {
  if (!renewalLogic?.canAdvance(item.cycle)) return "";
  return `<button class="text-button success" type="button" data-action="renew" data-id="${item.id}" aria-label="Renew ${escapeHtml(item.name)} and move its next date">Renew</button>`;
}

function renewItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  const nextDate = renewalLogic?.nextRecurringDate(item.date, item.cycle, toDateInputValue(startOfToday()));
  if (!nextDate) {
    openItemDialog(id);
    return;
  }

  const previousItem = { ...item };
  state.items = state.items.map((entry) =>
    entry.id === id ? { ...entry, date: nextDate, updatedAt: new Date().toISOString() } : entry,
  );
  persistItems();
  render();
  showActionToast(`${item.name} now renews on ${formatDate(nextDate)}.`, () => {
    state.items = state.items.map((entry) => (entry.id === id ? previousItem : entry));
    persistItems();
    render();
  });
}

function showActionToast(message, undoAction) {
  window.clearTimeout(state.undoTimer);
  state.undoAction = undoAction;
  elements.actionToastMessage.textContent = message;
  elements.actionToast.hidden = false;
  state.undoTimer = window.setTimeout(hideActionToast, 8000);
}

function undoLastAction() {
  const undoAction = state.undoAction;
  hideActionToast();
  undoAction?.();
}

function hideActionToast() {
  window.clearTimeout(state.undoTimer);
  state.undoAction = null;
  elements.actionToast.hidden = true;
}

function openItemDialog(id = null) {
  state.returnFocusTo = document.activeElement;
  elements.form.reset();
  elements.itemId.value = "";
  elements.dialogTitle.textContent = id ? "Edit item" : "Add item";

  if (id) {
    const item = state.items.find((entry) => entry.id === id);
    if (!item) return;
    elements.itemId.value = item.id;
    elements.itemName.value = item.name;
    elements.itemCategory.value = item.category;
    elements.itemDate.value = item.date;
    elements.itemCost.value = item.cost || "";
    elements.itemCycle.value = item.cycle;
    elements.itemReceipt.value = item.receipt;
    elements.itemNotes.value = item.notes;
  } else {
    elements.itemDate.value = toDateInputValue(addDays(startOfToday(), 30));
  }

  elements.dialog.showModal();
  elements.itemName.focus();
}

function saveFormItem() {
  const formData = new FormData(elements.form);
  const existingId = formData.get("id");
  const now = new Date().toISOString();
  const item = normalizeItem({
    id: existingId || createId(),
    name: formData.get("name"),
    category: formData.get("category"),
    date: formData.get("date"),
    cost: formData.get("cost"),
    cycle: formData.get("cycle"),
    receipt: formData.get("receipt"),
    notes: formData.get("notes"),
    createdAt: existingId ? state.items.find((entry) => entry.id === existingId)?.createdAt : now,
    updatedAt: now,
  });

  if (!item) return;

  if (existingId) {
    state.items = state.items.map((entry) => (entry.id === existingId ? item : entry));
  } else {
    state.items = [...state.items, item];
  }

  persistItems();
  elements.dialog.close();
  render();
}

function deleteItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  const confirmed = window.confirm(`Delete "${item.name}" from Renewal Desk?`);
  if (!confirmed) return;
  state.items = state.items.filter((entry) => entry.id !== id);
  persistItems();
  render();
}

function clearAllItems() {
  if (!state.items.length) return;
  const confirmed = window.confirm("Clear all Renewal Desk data stored in this browser?");
  if (!confirmed) return;
  state.items = [];
  persistItems();
  render();
}

function loadSampleData() {
  if (state.items.length) {
    const confirmed = window.confirm("Add sample items to your existing tracker?");
    if (!confirmed) return;
  }
  const today = startOfToday();
  state.items = [
    ...state.items,
    {
      id: createId(),
      name: "Home internet plan",
      category: "Subscription",
      date: toDateInputValue(addDays(today, 12)),
      cost: 59,
      cycle: "Monthly",
      receipt: "Not needed",
      notes: "Review speed and price before renewal.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Laptop warranty",
      category: "Warranty",
      date: toDateInputValue(addDays(today, 47)),
      cost: 0,
      cycle: "One-time",
      receipt: "Missing",
      notes: "Find original purchase receipt.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Passport reminder",
      category: "Document",
      date: toDateInputValue(addDays(today, 82)),
      cost: 0,
      cycle: "Custom",
      receipt: "Not needed",
      notes: "Check travel requirements before booking.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  persistItems();
  render();
}

function exportJson() {
  const payload = backupLogic.createBackup(state.items);
  downloadFile("renewal-desk-backup.json", JSON.stringify(payload, null, 2), "application/json");
  setExportStatus("Backup downloaded.");
}

function exportCalendar() {
  if (!state.items.length) {
    setExportStatus("Add an item before downloading a calendar.");
    return;
  }
  const calendar = calendarExport?.createCalendar(state.items);
  if (!calendar) {
    setExportStatus("Calendar export is unavailable. Try reloading Renewal Desk.");
    return;
  }
  downloadFile("renewal-desk-calendar.ics", calendar, "text/calendar;charset=utf-8");
  setExportStatus(`Calendar downloaded with ${state.items.length} date${state.items.length === 1 ? "" : "s"}.`);
}

function exportCsv() {
  const headers = ["Name", "Category", "Next Date", "Cost", "Cycle", "Receipt", "Notes"];
  const rows = state.items.map((item) => [
    item.name,
    item.category,
    item.date,
    item.cost,
    item.cycle,
    item.receipt,
    item.notes,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  downloadFile("renewal-desk-items.csv", csv, "text/csv");
  setExportStatus("Spreadsheet export downloaded.");
}

function exportSyncReadiness() {
  const payload = syncAdapter.exportReadiness();
  downloadFile("renewal-desk-sync-readiness.json", JSON.stringify(payload, null, 2), "application/json");
  setExportStatus("Sync status saved.");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > maxBackupBytes) {
    setExportStatus("This backup is too large. Choose a file smaller than 5 MB.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const result = backupLogic.parseBackup(parsed, normalizeItem);
      const previousItems = state.items.map((item) => ({ ...item }));
      if (previousItems.length) {
        const confirmed = window.confirm(
          backupLogic.createRestorePrompt(previousItems.length, result.items.length),
        );
        if (!confirmed) {
          setExportStatus("Restore canceled. Your current list was not changed.");
          return;
        }
      }

      state.items = result.items;
      persistItems();
      render();
      const skippedCount = result.invalidCount + result.duplicateCount;
      const restoredMessage = `Restored ${result.items.length} item${result.items.length === 1 ? "" : "s"}${
        skippedCount ? `. Skipped ${skippedCount} unusable ${skippedCount === 1 ? "entry" : "entries"}` : ""
      }.`;
      setExportStatus(restoredMessage);
      showActionToast(restoredMessage, () => {
        state.items = previousItems;
        persistItems();
        render();
        setExportStatus("Previous list restored.");
      });
    } catch {
      setExportStatus("Import failed. Choose a Renewal Desk backup file.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setExportStatus(message) {
  elements.exportStatus.textContent = message;
  window.setTimeout(() => {
    if (elements.exportStatus.textContent === message) elements.exportStatus.textContent = "";
  }, 4000);
}

function annualizedCost(item) {
  const cost = Number(item.cost || 0);
  if (!cost) return 0;
  if (item.cycle === "Monthly") return cost * 12;
  if (item.cycle === "Quarterly") return cost * 4;
  return cost;
}

function getStatus(days) {
  if (days < 0) return { label: `${Math.abs(days)} days overdue`, className: "overdue" };
  if (days === 0) return { label: "Due today", className: "due" };
  if (days <= 30) return { label: `${days} days left`, className: "due" };
  return { label: `${days} days left`, className: "" };
}

function relativeDate(dateValue) {
  const days = differenceInDays(parseLocalDate(dateValue), startOfToday());
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isValidDateValue(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function differenceInDays(date, baseDate) {
  const ms = parseLocalDate(toDateInputValue(date)) - parseLocalDate(toDateInputValue(baseDate));
  return Math.round(ms / 86400000);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  return parseLocalDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 ? 2 : 0,
  }).format(value);
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createFallbackSyncAdapter(key) {
  return {
    adapterType: "fallback",
    mode: {
      key: "local_only",
      label: "Saved on this device",
      description: "Your list is saved on this device.",
    },
    isCloudReady: false,
    loadItems(normalizeItem) {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.map(normalizeItem).filter(Boolean) : [];
      } catch {
        return [];
      }
    },
    saveItems(items) {
      localStorage.setItem(key, JSON.stringify(items));
    },
    exportReadiness() {
      return {
        app: "Renewal Desk",
        generatedAt: new Date().toISOString(),
        currentMode: "local_only",
        cloudReady: false,
        storage: "browser-local",
      };
    },
  };
}
