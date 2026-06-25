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
- HTTPS zatím není hotové, protože GitHub Pages stále nevrací certifikát odpovídající `tidyrailstudio.com`.
- VEDOS DNS root A/AAAA a `www` CNAME míří na GitHub Pages.
- VEDOS wildcard záznamy už autoritativní nameserver nevrací.
- Produkty jsou zatím zdarma. Neimplementuj platby, subscriptions, Pro funkce ani umělá omezení.

Co už je hotové:

- Web má nový originální iOS/macOS-inspired glass design: světlé cool-white pozadí, modré primární CTA, teal detaily, floating glass header, pill buttons a jemnou hloubku.
- Homepage má scroll-driven Three.js prezentaci.
- Mobilní layout byl opraven proti horizontálnímu přetečení; Chrome DevTools mobile emulation na 390px potvrdila `documentElement.scrollWidth === viewport width`.
- Mobilní menu funguje jako kompaktní hamburger a zavírá se přes outside click, link click i Escape.
- Public HTML stránky obsahují `strict-origin-when-cross-origin` referrer metadata, theme color a mobile format-detection metadata.
- Downloads stránka má privacy-friendly detekci OS/zařízení a manuální výběr platformy.
- Renewal Desk je dostupný jako free web app a statický balíček.
- Renewal Desk source obsahuje PWA manifest, service worker a sync adapter scaffold.
- Renewal Desk je jasně označený jako local-first release: data zůstávají v browser storage, k dispozici je JSON backup/import a CSV export.
- Account stránky existují jako připravené scaffold stránky, ale nejsou hlavní veřejná release funkce bez Supabase konfigurace.
- Auth JavaScript scaffold existuje pro Supabase, ale je záměrně neaktivní bez konfigurace.
- Lokalizační scaffold existuje v `website/i18n/translations.json`.
- Strategické dokumenty pro auth, databázi, packaging, store listingy, ikony, lokalizaci, patching, verzování, support a improvement backlog existují.
- Renewal Desk ZIP byl přebalen po HTML metadata update a je dostupný v `dist/renewal-desk-0.1.0-mvp.zip` a `website/downloads/renewal-desk-0.1.0-mvp.zip`.
- `website/` a `docs/` mají být synchronizované po posledních úpravách.

Důležité soubory:

- `website/` - zdroj webu.
- `docs/` - GitHub Pages deploy mirror.
- `products/renewal-desk/` - zdroj Renewal Desk.
- `dist/renewal-desk-0.1.0-mvp.zip` - static release package.
- `website/downloads/renewal-desk-0.1.0-mvp.zip` - veřejná download kopie.
- `website/downloads/renewal-desk-0.1.0-mvp.zip.sha256` - checksum.
- `products/renewal-desk/src/sync-adapter.js` - local-first sync adapter scaffold.
- `website/apps/renewal-desk/src/sync-adapter.js` - public app copy of the adapter scaffold.
- `DESIGN_SYSTEM.md`
- `WEBSITE_PLAN.md`
- `QA_CHECKLIST.md`
- `FIRST_PRODUCT_RELEASE_CHECKLIST.md`
- `CHANGELOG.md`
- `DECISION_LOG.md`
- `SUPABASE_SETUP.md`
- `RENEWAL_DESK_SYNC_PLAN.md`
- `AUTH_STRATEGY.md`
- `DATABASE_SCHEMA.md`
- `DOWNLOAD_STRATEGY.md`
- `LOCALIZATION_PLAN.md`
- `MAC_DMG_PACKAGING.md`
- `WINDOWS_PACKAGING.md`
- `LINUX_PACKAGING.md`
- `STORE_DISTRIBUTION_PLAN.md`
- `SUPPORT_WORKFLOW.md`
- `IMPROVEMENT_BACKLOG.md`

Co bylo naposledy otestováno:

- JavaScript syntax check prošel pro website scripts, Renewal Desk app, sync adapter a service worker.
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip` prošel.
- Lokální HTTP routy vrací 200: homepage, downloads, products, Renewal Desk product page, Renewal Desk app, sitemap, robots, PWA manifest, service worker, ZIP a checksum.
- Desktop screenshot homepage vizuálně prošel.
- Desktop screenshot downloads stránky vizuálně prošel.
- Mobilní screenshot přes Chrome DevTools emulaci vizuálně prošel.
- HTTPS kontrola stále selhává na certifikátu, proto nezapínej Enforce HTTPS.
- GitHub Pages cert provisioning byl retriggernut bezpečným re-apply custom domain postupem, ale certifikát ještě není vydaný.

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Native desktop buildy: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shell a widgety.
- Store submissions.

Další priorita:

1. Znovu ověř `https://tidyrailstudio.com/`.
2. Jakmile HTTPS funguje s validním certifikátem pro `tidyrailstudio.com`, zapni Enforce HTTPS v GitHub Pages.
3. Pokud HTTPS stále nefunguje, zkontroluj GitHub Pages Settings UI pro přesný certifikátový stav a případné tlačítko retry/remove custom domain.
4. Nečekej pasivně na HTTPS: pokračuj v Renewal Desk first-product práci.
5. Připrav Supabase test-safe konfiguraci podle `SUPABASE_SETUP.md`, ale necommituj `auth-config.js` ani žádné secrets.
6. Připrav RLS dvouuživatelský QA postup a poté cloud sync adapter za config gate.
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
