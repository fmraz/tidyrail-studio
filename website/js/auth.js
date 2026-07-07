const authStatus = document.querySelector("[data-auth-status]");
const authForms = document.querySelectorAll("[data-auth-form]");
const oauthButtons = document.querySelectorAll("[data-auth-provider]");
const localDataKey = "renewal-desk-items-v1";

function showAuthStatus(message, tone = "info") {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.dataset.tone = tone;
}

function getAuthConfig() {
  return window.TIDYRAIL_AUTH || null;
}

async function getSupabaseClient() {
  const config = getAuthConfig();
  if (!config?.supabaseUrl || !config?.supabaseAnonKey) return null;
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  return createClient(config.supabaseUrl, config.supabaseAnonKey);
}

function exportLocalData() {
  const data = localStorage.getItem(localDataKey) || "[]";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `renewal-desk-local-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function handleAuthForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const mode = form.getAttribute("data-auth-form");
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const client = await getSupabaseClient();

  if (!client) {
    showAuthStatus("Accounts are not active yet. Please use Renewal Desk without signing in for now.", "warning");
    return;
  }

  const actions = {
    login: () => client.auth.signInWithPassword({ email, password }),
    register: () => client.auth.signUp({ email, password }),
    reset: () => client.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/account/settings/` }),
  };

  const { error } = await actions[mode]();
  if (error) {
    showAuthStatus(error.message || "Authentication failed. Please try again.", "error");
    return;
  }

  showAuthStatus(mode === "reset" ? "Password reset email requested." : "Authentication request completed.", "success");
}

authForms.forEach((form) => form.addEventListener("submit", handleAuthForm));

oauthButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const provider = button.getAttribute("data-auth-provider");
    const client = await getSupabaseClient();
    if (!client) {
      showAuthStatus("Social sign-in is not available yet.", "warning");
      return;
    }
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/account/dashboard/` },
    });
    if (error) showAuthStatus(error.message || "Social sign-in failed.", "error");
  });
});

document.querySelectorAll("[data-export-local]").forEach((button) => {
  button.addEventListener("click", exportLocalData);
});

document.querySelectorAll("[data-delete-local]").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(localDataKey);
    showAuthStatus("Local Renewal Desk data was deleted from this browser.", "success");
  });
});

if (authStatus && !getAuthConfig()) {
  showAuthStatus("Accounts are not active yet. You can use Renewal Desk without signing in.", "warning");
}
