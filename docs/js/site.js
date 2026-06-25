document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll(".nav").forEach((nav) => {
  const links = nav.querySelector(".nav-links");
  if (!links || nav.querySelector(".nav-toggle")) return;

  document.documentElement.classList.add("nav-js");
  links.id = links.id || `nav-links-${Math.random().toString(36).slice(2)}`;

  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", links.id);
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "<span></span><span></span><span></span><span class=\"sr-only\">Menu</span>";

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target)) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  nav.insertBefore(toggle, links);
});

const languageNames = {
  en: "English",
  cs: "Čeština",
  sk: "Slovenčina",
  de: "Deutsch",
  pl: "Polski",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  sv: "Svenska",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
  hu: "Magyar",
  ro: "Română",
  hr: "Hrvatski",
  sl: "Slovenščina",
  uk: "Українська",
  tr: "Türkçe",
  el: "Ελληνικά",
  ja: "日本語",
  ko: "한국어",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  th: "ไทย",
  ar: "العربية",
  he: "עברית",
};

const supportedLanguages = Object.keys(languageNames);

function normalizeLanguage(language) {
  if (!language) return "en";
  const exact = supportedLanguages.find((code) => code.toLowerCase() === language.toLowerCase());
  if (exact) return exact;
  const base = language.split("-")[0].toLowerCase();
  return supportedLanguages.find((code) => code.toLowerCase() === base) || "en";
}

function preferredLanguage() {
  return normalizeLanguage(
    localStorage.getItem("tidyrail-language") ||
      navigator.languages?.[0] ||
      navigator.language ||
      "en",
  );
}

function applyLanguage(language) {
  const code = normalizeLanguage(language);
  document.documentElement.lang = code;
  document.documentElement.dir = ["ar", "he"].includes(code) ? "rtl" : "ltr";
  document.querySelectorAll("[data-language-current]").forEach((node) => {
    node.textContent = languageNames[code] || "English";
  });
}

function mountLanguageSelector() {
  const footer = document.querySelector(".footer-links");
  if (!footer || document.querySelector("[data-language-select]")) return;
  const label = document.createElement("label");
  label.className = "language-select";
  label.innerHTML = "<span>Language</span>";
  const select = document.createElement("select");
  select.setAttribute("data-language-select", "");
  supportedLanguages.forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = languageNames[code];
    select.append(option);
  });
  select.value = preferredLanguage();
  select.addEventListener("change", () => {
    localStorage.setItem("tidyrail-language", select.value);
    applyLanguage(select.value);
  });
  label.append(select);
  footer.append(label);
}

applyLanguage(preferredLanguage());
mountLanguageSelector();
