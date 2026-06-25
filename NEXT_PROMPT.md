Pokračuj v projektu ve složce `/Users/frantamraz/Documents/Software Company`.

Nezačínej od nuly. Nepřejmenovávej Tidyrail Studio. Neopouštěj Renewal Desk.

Komunikační pravidla:

- S founderem komunikuj pouze česky.
- Veškeré veřejné produktové texty, UI, dokumentace, web copy, changelogy, policies a marketingové materiály piš nejdříve anglicky.

Aktuální stav:

- Firma: Tidyrail Studio.
- První produkt: Renewal Desk.
- Doména: `tidyrailstudio.com`.
- GitHub repo: `fmraz/tidyrail-studio`.
- GitHub Pages source: větev `main`, složka `/docs`.
- Veřejný HTTP web funguje: `http://tidyrailstudio.com/`.
- HTTPS zatím není připravené, protože certifikát pro `tidyrailstudio.com` stále neodpovídá vlastní doméně.
- VEDOS DNS root a `www` záznamy míří na GitHub Pages.
- VEDOS wildcard záznamy už autoritativní nameserver nevrací.
- Produkty jsou zatím zdarma. Neimplementuj platby, subscriptions, Pro funkce ani umělá omezení.

Co už je hotové:

- Web má prémiovou scroll-driven Three.js homepage.
- Web má responzivní mobilní menu jako kompaktní popover.
- Downloads stránka má privacy-friendly detekci OS/zařízení a manuální výběr platformy.
- Renewal Desk je dostupný jako free web app a statický balíček.
- Renewal Desk source obsahuje PWA manifest a service worker.
- Renewal Desk je jasně označený jako local-first release: data zůstávají v browser storage, k dispozici je JSON backup/import a CSV export.
- Renewal Desk export panel obsahuje informaci, že cloud sync není zatím připojený.
- Account stránky existují jako připravené scaffold stránky:
  - `/account/login/`
  - `/account/register/`
  - `/account/reset/`
  - `/account/dashboard/`
  - `/account/settings/`
- Auth JavaScript scaffold existuje pro Supabase, ale je záměrně neaktivní bez konfigurace.
- Lokalizační scaffold existuje v `website/i18n/translations.json`.
- Cookie policy stránka existuje.
- Strategické dokumenty pro auth, databázi, packaging, store listingy, ikony, lokalizaci, patching, verzování, support a improvement backlog existují.
- Nově existuje `SUPABASE_SETUP.md` s konkrétním setup checklistem.
- Nově existuje `RENEWAL_DESK_SYNC_PLAN.md` s návrhem cloud syncu přes RLS.
- Rebuilt ZIP je dostupný v `dist/renewal-desk-0.1.0-mvp.zip` a `website/downloads/renewal-desk-0.1.0-mvp.zip`.

Důležité soubory:

- `website/` - zdroj webu.
- `docs/` - GitHub Pages deploy mirror.
- `products/renewal-desk/` - zdroj Renewal Desk.
- `dist/renewal-desk-0.1.0-mvp.zip` - static release package.
- `website/downloads/renewal-desk-0.1.0-mvp.zip` - veřejná download kopie.
- `website/downloads/renewal-desk-0.1.0-mvp.zip.sha256` - checksum.
- `AUTH_STRATEGY.md`
- `DATABASE_SCHEMA.md`
- `SUPABASE_SETUP.md`
- `RENEWAL_DESK_SYNC_PLAN.md`
- `DOWNLOAD_STRATEGY.md`
- `DESIGN_SYSTEM.md`
- `ICON_SYSTEM.md`
- `APP_ICON_SPEC.md`
- `LOCALIZATION_PLAN.md`
- `MAC_DMG_PACKAGING.md`
- `WINDOWS_PACKAGING.md`
- `LINUX_PACKAGING.md`
- `MOBILE_WIDGET_PLAN.md`
- `PATCH_PLAN.md`
- `VERSIONING.md`
- `BUG_FIX_PROCESS.md`
- `RELEASE_NOTES_TEMPLATE.md`
- `CHANGELOG.md`
- `SUPPORT_WORKFLOW.md`
- `IMPROVEMENT_BACKLOG.md`

Co bylo v poslední session otestováno:

- DNS root A/AAAA a `www` CNAME míří na GitHub Pages.
- HTTPS stále selhává na certifikátu, proto nezapínej Enforce HTTPS.
- Lokální syntax check prošel pro `website/js/site.js`, `website/js/downloads.js`, `website/js/auth.js`, `website/apps/renewal-desk/src/app.js`, `website/apps/renewal-desk/sw.js`.
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip` prošel.
- `website/` a `docs/` jsou synchronizované.
- Lokální browser QA prošla: homepage, Three.js canvas, downloads, platform selector, Renewal Desk export panel, mobilní menu.
- Veřejné HTTP routy vrací 200: homepage, downloads, account stránky, Renewal Desk app, manifest, service worker, ZIP, sitemap, robots.

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Native desktop buildy: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shell a widgety.
- Store submissions.

Další priorita:

1. Znovu ověř HTTPS pro `https://tidyrailstudio.com/`.
2. Jakmile HTTPS funguje s validním certifikátem pro `tidyrailstudio.com`, zapni Enforce HTTPS v GitHub Pages.
3. Pokud HTTPS stále nefunguje, nečekej pasivně: pokračuj ve first-product práci.
4. Připrav Renewal Desk sync adapter design v kódu, ale nezapojuj produkční Supabase bez schválených config hodnot.
5. Připrav test-safe `auth-config.js` workflow bez commitování secrets.
6. Rozšiř QA checklist pro dvouuživatelský RLS test.
7. Potom pokračuj desktop packaging přípravou pro macOS `.dmg`, Windows installer a Linux package.

Omezení:

- Neutrácej peníze.
- Nezadávej platební údaje.
- Nepublikuj do store ani na sociální platformy.
- Nehardcoduj secrets.
- Nevystavuj service role keys.
- Netvrď platform availability, dokud reálné buildy neexistují.
- Neimplementuj platby, subscriptions, Pro funkce ani umělá free omezení.
- Account sync veřejně označuj jako připravovaný, dokud není backend nakonfigurovaný, otestovaný a schválený.
