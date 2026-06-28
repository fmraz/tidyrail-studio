const platformNames = {
  android: "Android",
  ios: "iOS",
  linux: "Linux",
  macos: "macOS",
  web: "this browser",
  windows: "Windows",
};

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (platform.includes("mac")) return "macos";
  if (platform.includes("win")) return "windows";
  if (platform.includes("linux")) return "linux";
  return "web";
}

function updatePlatformNote(key) {
  const label = platformNames[key] || platformNames.web;
  document.querySelectorAll("[data-platform-note]").forEach((node) => {
    node.textContent =
      key === "web"
        ? "This browser can use the web app now. No tracking, fingerprinting, or analytics are used for this note."
        : `Detected platform: ${label}. Native ${label} builds are not published yet; use the web app or static package for now. No tracking, fingerprinting, or analytics are used for this note.`;
  });
}

const detectedPlatform = detectPlatform();
updatePlatformNote(detectedPlatform);
