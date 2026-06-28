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
      "A sync configuration is present, but Renewal Desk cloud writes remain disabled until sync is explicitly enabled and tested.",
  };

  const cloudReadyMode = {
    key: "cloud_ready",
    label: "Account sync test mode",
    description:
      "Renewal Desk can reach the configured Supabase project. Cloud writes still require an approved import or sync action.",
  };

  function createAdapter(options = {}) {
    const storageKey = options.storageKey || "renewal-desk-items-v1";
    const config = readConfig();
    const cloudEnabled = Boolean(config?.enableRenewalDeskCloudSync);
    const mode = cloudEnabled ? cloudReadyMode : config ? configuredMode : localMode;

    return {
      adapterType: cloudEnabled ? "supabase-gated" : "local",
      mode,
      isCloudReady: cloudEnabled,
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
          cloudReady: cloudEnabled,
          storage: "browser-local",
          preparedBackend: "Supabase Auth and Postgres with Row Level Security",
          cloudProvider: config ? "Supabase" : "not-configured",
          cloudWrites: cloudEnabled ? "available-through-explicit-sync-methods" : "disabled",
          safetyGates: [
            "Valid production HTTPS",
            "Supabase project approved and configured",
            "RLS policies tested with two separate users",
            "No service role key exposed to the frontend",
            "User export and deletion flows verified",
          ],
        };
      },
      async getSession() {
        const client = await getSupabaseClient(config);
        if (!client) return null;
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        return data.session || null;
      },
      async loadCloudItems() {
        const client = await requireCloudClient(config);
        const { data, error } = await client
          .from("renewal_items")
          .select("*")
          .order("renewal_date", { ascending: true });
        if (error) throw error;
        return Array.isArray(data) ? data.map(fromCloudRow) : [];
      },
      async upsertCloudItems(items) {
        const client = await requireCloudClient(config);
        const session = await requireSession(client);
        const rows = items.map((item) => ({
          ...toCloudRow(item),
          user_id: session.user.id,
        }));
        const { data, error } = await client
          .from("renewal_items")
          .upsert(rows, { onConflict: "user_id,client_id" })
          .select("*");
        if (error) throw error;
        return Array.isArray(data) ? data.map(fromCloudRow) : [];
      },
      async deleteCloudItem(clientId) {
        const client = await requireCloudClient(config);
        const { error } = await client.from("renewal_items").delete().eq("client_id", clientId);
        if (error) throw error;
      },
      async exportCloudData() {
        const client = await requireCloudClient(config);
        const session = await requireSession(client);
        const [{ data: profile, error: profileError }, { data: items, error: itemsError }] = await Promise.all([
          client.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
          client.from("renewal_items").select("*").order("renewal_date", { ascending: true }),
        ]);
        if (profileError) throw profileError;
        if (itemsError) throw itemsError;
        return {
          app: "Renewal Desk",
          exportedAt: new Date().toISOString(),
          schemaVersion: 1,
          profile,
          items: Array.isArray(items) ? items.map(fromCloudRow) : [],
        };
      },
      async requestAccountDeletion() {
        const client = await requireCloudClient(config);
        const session = await requireSession(client);
        const { error } = await client.from("account_deletion_requests").insert({
          user_id: session.user.id,
        });
        if (error) throw error;
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

  async function getSupabaseClient(config) {
    if (!config?.supabaseUrl || !config?.supabaseAnonKey || !config.enableRenewalDeskCloudSync) return null;
    if (!window.supabase?.createClient) {
      const module = await import("https://esm.sh/@supabase/supabase-js@2");
      window.supabase = module;
    }
    return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  async function requireCloudClient(config) {
    const client = await getSupabaseClient(config);
    if (!client) {
      throw new Error("Renewal Desk cloud sync is not enabled. Set enableRenewalDeskCloudSync after RLS QA passes.");
    }
    return client;
  }

  async function requireSession(client) {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (!data.session?.user?.id) throw new Error("Sign in before using Renewal Desk cloud sync.");
    return data.session;
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
