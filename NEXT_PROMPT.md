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
- HTTPS zatím není připravené, protože GitHub ještě nemá hotový certifikát pro vlastní doménu.
- VEDOS root DNS a `www` záznamy míří na GitHub Pages.
- VEDOS wildcard záznamy už autoritativní nameserver nevrací.

Co už je hotové:

- Web má prémiovou scroll-driven Three.js homepage.
- Web má responzivní mobilní menu jako kompaktní popover.
- Downloads stránka má privacy-friendly detekci OS/zařízení a manuální výběr platformy.
- Renewal Desk je dostupný jako free web app a statický balíček.
- Renewal Desk source obsahuje PWA manifest, service worker a aktualizovaný SVG icon směr.
- Byly přidány account stránky:
  - `/account/login/`
  - `/account/register/`
  - `/account/reset/`
  - `/account/dashboard/`
  - `/account/settings/`
- Auth JavaScript scaffold existuje pro Supabase, ale je záměrně neaktivní bez konfigurace.
- Lokalizační scaffold existuje v `website/i18n/translations.json`.
- Existuje cookie policy stránka.
- Byly přidány strategické dokumenty pro auth, databázi, packaging, store listingy, ikony, lokalizaci, patching, verzování, support a improvement backlog.

Důležité soubory:

- `website/` - zdroj webu.
- `docs/` - GitHub Pages deploy mirror.
- `products/renewal-desk/` - zdroj Renewal Desk.
- `dist/renewal-desk-0.1.0-mvp.zip` - rebuilt static release package.
- `website/downloads/renewal-desk-0.1.0-mvp.zip` - veřejná download kopie.
- `AUTH_STRATEGY.md`
- `DATABASE_SCHEMA.md`
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

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Native desktop buildy: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shell a widgety.
- Store submissions.

Další priorita:

1. Ověř DNS a HTTPS.
2. Jakmile HTTPS funguje s validním certifikátem pro `tidyrailstudio.com`, zapni Enforce HTTPS v GitHub Pages.
3. Spusť lokální i veřejnou QA pro homepage, mobilní menu, account stránky, downloads, Renewal Desk app, ZIP download, sitemap, robots, PWA manifest a service worker.
4. Pokud founder schválí, připrav přesný Supabase setup checklist podle dashboard kroků a potom připoj auth test-safe způsobem.
5. Pokračuj návrhem a implementací Renewal Desk cloud sync přes RLS, než začneš další produkt.

Omezení:

- Neutrácej peníze.
- Nezadávej platební údaje.
- Nepublikuj do store ani na sociální platformy.
- Nehardcoduj secrets.
- Nevystavuj service role keys.
- Netvrď platform availability, dokud reálné buildy neexistují.
- Neimplementuj platby, subscriptions, Pro funkce ani umělá free omezení.
