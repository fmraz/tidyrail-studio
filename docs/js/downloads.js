const platformLinks = {
  web: {
    label: "Try the free web app",
    href: "../apps/renewal-desk/index.html",
    status: "Available",
    note: "Runs in a modern browser and stores MVP data locally on this device.",
  },
  package: {
    label: "Download static package",
    href: "./renewal-desk-0.1.0-mvp.zip",
    status: "Available",
    note: "A portable ZIP package for local browser use. This is not a native installer.",
  },
  macos: {
    label: "macOS .dmg",
    href: "#platform-macos",
    status: "In preparation",
    note: "A signed and notarized .dmg is planned. The current public build is the web app and static package.",
  },
  windows: {
    label: "Windows installer",
    href: "#platform-windows",
    status: "In preparation",
    note: "A Windows installer is planned after the desktop shell is ready.",
  },
  linux: {
    label: "Linux package",
    href: "#platform-linux",
    status: "In preparation",
    note: "AppImage or .deb packaging is planned after the desktop shell is ready.",
  },
  ios: {
    label: "iOS App Store",
    href: "#platform-ios",
    status: "Coming soon",
    note: "The iOS app requires Apple Developer setup and App Store review before it can be offered.",
  },
  android: {
    label: "Google Play",
    href: "#platform-android",
    status: "Coming soon",
    note: "The Android app requires Play Console setup and store review before it can be offered.",
  },
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

function updateRecommendation(key) {
  const target = platformLinks[key] || platformLinks.web;
  document.querySelectorAll("[data-platform-status]").forEach((node) => {
    node.textContent = target.status;
  });
  document.querySelectorAll("[data-platform-title]").forEach((node) => {
    node.textContent = target.label;
  });
  document.querySelectorAll("[data-platform-note]").forEach((node) => {
    node.textContent = target.note;
  });
  document.querySelectorAll("[data-platform-action]").forEach((node) => {
    node.textContent = target.status === "Available" ? target.label : "Use the web app for now";
    node.setAttribute("href", target.status === "Available" ? target.href : platformLinks.web.href);
  });
}

const detectedPlatform = detectPlatform();
updateRecommendation(detectedPlatform);

document.querySelectorAll("[data-platform-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    updateRecommendation(button.getAttribute("data-platform-choice"));
  });
});
