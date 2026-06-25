(function () {
  const localMode = {
    key: "local_only",
    label: "Local-first release",
    description:
      "Renewal Desk is using browser storage on this device. Optional account sync is not connected in this release.",
  };

  const configuredMode = {
    key: "sync_configured",
    label: "Sync configuration detected",
    description:
      "A sync configuration is present, but Renewal Desk cloud writes remain disabled until the Supabase adapter is fully tested.",
  };

  function createAdapter(options = {}) {
    const storageKey = options.storageKey || "renewal-desk-items-v1";
    const config = readConfig();
    const mode = config ? configuredMode : localMode;

    return {
      adapterType: "local",
      mode,
      isCloudReady: false,
      loadItems(normalizeItem) {
        return loadLocalItems(storageKey, normalizeItem);
      },
      saveItems(items) {
        saveLocalItems(storageKey, items);
      },
      exportReadiness() {
        return {
          app: "Renewal Desk",
          generatedAt: new Date().toISOString(),
          currentMode: mode.key,
          cloudReady: false,
          storage: "browser-local",
          preparedBackend: "Supabase Auth and Postgres with Row Level Security",
          safetyGates: [
            "Valid production HTTPS",
            "Supabase project approved and configured",
            "RLS policies tested with two separate users",
            "No service role key exposed to the frontend",
            "User export and deletion flows verified",
          ],
        };
      },
      toCloudRow,
      fromCloudRow,
    };
  }

  function readConfig() {
    const config = window.TIDYRAIL_AUTH;
    if (!config || typeof config !== "object") return null;
    if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
    return config;
  }

  function loadLocalItems(storageKey, normalizeItem) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.map(normalizeItem).filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  function saveLocalItems(storageKey, items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function toCloudRow(item) {
    return {
      client_id: item.id,
      name: item.name,
      category: item.category,
      renewal_date: item.date,
      amount: item.cost || null,
      cycle: item.cycle,
      receipt_status: item.receipt,
      notes: item.notes || null,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
    };
  }

  function fromCloudRow(row) {
    return {
      id: row.client_id || row.id,
      name: row.name,
      category: row.category,
      date: row.renewal_date,
      cost: Number(row.amount || 0),
      cycle: row.cycle || "Custom",
      receipt: row.receipt_status || "Missing",
      notes: row.notes || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  window.RenewalDeskSync = {
    createAdapter,
    toCloudRow,
    fromCloudRow,
  };
})();
