(function attachRenewalDeskBackup(global) {
  const appName = "Renewal Desk";
  const formatVersion = 1;
  const maxItems = 10000;

  function createBackup(items, generatedAt = new Date()) {
    return {
      app: appName,
      formatVersion,
      exportedAt: generatedAt.toISOString(),
      items,
    };
  }

  function parseBackup(parsed, normalizeItem) {
    if (typeof normalizeItem !== "function") throw new Error("A record validator is required.");

    let rawItems;
    let sourceFormat;
    if (Array.isArray(parsed)) {
      rawItems = parsed;
      sourceFormat = "legacy-array";
    } else if (parsed && parsed.app === appName && Array.isArray(parsed.items)) {
      const version = Number(parsed.formatVersion || parsed.schemaVersion || 1);
      if (!Number.isInteger(version) || version < 1 || version > formatVersion) {
        throw new Error("This backup version is not supported.");
      }
      rawItems = parsed.items;
      sourceFormat = `renewal-desk-v${version}`;
    } else {
      throw new Error("This is not a Renewal Desk backup.");
    }

    if (rawItems.length > maxItems) throw new Error("This backup contains too many records.");

    const uniqueItems = new Map();
    let invalidCount = 0;
    let duplicateCount = 0;
    rawItems.forEach((rawItem) => {
      const item = normalizeItem(rawItem);
      if (!item) {
        invalidCount += 1;
        return;
      }
      if (uniqueItems.has(item.id)) duplicateCount += 1;
      uniqueItems.set(item.id, item);
    });

    if (rawItems.length > 0 && uniqueItems.size === 0) {
      throw new Error("This backup does not contain any usable records.");
    }

    return {
      items: [...uniqueItems.values()],
      sourceFormat,
      invalidCount,
      duplicateCount,
    };
  }

  function createRestorePrompt(currentCount, incomingCount) {
    if (currentCount <= 0) return "";
    if (incomingCount === 0) {
      return `This backup is empty. Restoring it will remove all ${currentCount} current ${
        currentCount === 1 ? "item" : "items"
      }. You can undo this change immediately. Continue?`;
    }
    return `Replace your current ${currentCount} ${currentCount === 1 ? "item" : "items"} with ${incomingCount} from this backup? You can undo this change immediately.`;
  }

  const api = { createBackup, parseBackup, createRestorePrompt };
  global.RenewalDeskBackup = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
