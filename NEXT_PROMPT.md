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
- Source webu: `website/`.
- Deploy mirror: `docs/`.
- Renewal Desk source: `products/renewal-desk/`.
- Veřejný HTTP web funguje na `http://tidyrailstudio.com/`.
- Produkty jsou zatím zdarma. Neimplementuj platby, subscriptions, Pro funkce ani umělá omezení.

Co už je hotové:

- Hlavní web má iOS/macOS-inspired Liquid Glass design se scroll-driven Three.js homepage.
- Renewal Desk web app je sjednocená se stejným Liquid Glass design systémem.
- Renewal Desk je local-first release candidate: browser storage, JSON backup/import, CSV export, sync readiness export.
- Downloads stránka má privacy-friendly OS/device detection a manuální platform selector.
- ZIP balíček je publikovaný v `dist/`, `website/downloads/` a `docs/downloads/`; ověřený SHA-256: `7dfaee16ddef59f2013800d269911e81d55fb37b9780f9ffbd525e20ec4c21bb`.
- Supabase auth/sync je připravený jako disabled-by-default scaffold bez secretů.
- Tauri desktop scaffold existuje v `desktop/renewal-desk`.
- Renewal Desk platform icon assets jsou v `desktop/renewal-desk/src-tauri/icons` a jsou zapojené do Tauri `bundle.icon`.
- Desktop preflight kontroluje scaffold, secret/config blokace, CSP, icon PNG rozměry, `.icns` signaturu a `.ico` header.
- GitHub Pages CNAME reset byl proveden přes skutečný commit/remove/re-add flow a Pages build je zpět `built`.

Aktuální HTTPS stav:

- DNS root A/AAAA a `www` CNAME míří na GitHub Pages.
- HTTP routy vrací 200.
- GitHub Pages API 2026-07-07 stále vrací `https_certificate.state: bad_authz` a popis `The ACME authorization is in a bad state. We need to start over.`
- `https://tidyrailstudio.com/` stále selhává, protože TLS certifikát neobsahuje `tidyrailstudio.com`.
- Enforce HTTPS je vypnuté a nesmí se zapnout, dokud certifikát nebude validní.
- Další HTTPS krok: znovu ověřit Pages API po čekání; pokud stav zůstane `bad_authz`, použít GitHub Pages Settings UI nebo GitHub Support, protože API/remove-readd reset už byl proveden.

Naposledy otestováno:

- `node --check website/js/site.js`
- `node --check website/js/downloads.js`
- `node --check website/apps/renewal-desk/src/app.js`
- `node --check scripts/qa-desktop-packaging.mjs`
- `npm run qa:desktop --prefix desktop/renewal-desk`
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip`
- Public HTTP routes: `/`, `/downloads/`, `/apps/renewal-desk/`, `/sitemap.xml`, `/robots.txt`

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt a production auth config.
- Reálný dvouuživatelský RLS test.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Rust/Cargo a platform-specific Tauri prerequisites.
- Native desktop buildy: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shell a widgety.
- Store submissions.
- Finální právní review policies/terms.

Další priorita:

1. Zkontroluj git stav; respektuj existující necommitnuté změny.
2. Ověř znovu GitHub Pages API a `https://tidyrailstudio.com/`.
3. Pokud HTTPS certifikát už odpovídá `tidyrailstudio.com`, zapni Enforce HTTPS a ověř přesměrování.
4. Pokud HTTPS stále vrací `bad_authz`, nečekej pasivně; pokračuj Renewal Desk release-candidate prací.
5. Dokonči manuální QA core flow: Add/Edit/Delete, JSON export/import, CSV export, mobile dialog, service worker update.
6. Připrav Supabase test-safe lokální config workflow, ale necommituj secrets.
7. Jakmile founder dodá Supabase projekt/env hodnoty, spusť dvouuživatelský RLS QA.
8. Pokračuj desktop packagingem: nainstaluj Rust/Tauri prerequisites, vytvoř první lokální `.dmg`, Windows installer a Linux package kandidáty bez veřejných availability claimů.
9. Aktualizuj `NEXT_PROMPT.md` na konci session.

Omezení:

- Neutrácej peníze.
- Nezadávej platební údaje.
- Nepublikuj do store ani na sociální platformy.
- Nehardcoduj secrets.
- Nevystavuj service role keys.
- Necommituj `auth-config.js`, `.env` ani secret-bearing poznámky.
- Netvrď platform availability, dokud reálné buildy neexistují.
- Neimplementuj platby, subscriptions, Pro funkce ani umělá free omezení.

Výstup na konci další session:

1. Co jsem dokončil
2. Aktuální stav webu
3. Aktuální stav Renewal Desk
4. HTTPS/doména
5. Jaké soubory jsem vytvořil nebo změnil
6. Co jsem otestoval
7. Jaké problémy nebo rizika zůstávají
8. Co vyžaduje tvoje ruční schválení
9. Další nejlepší krok
10. Aktuální obsah `NEXT_PROMPT.md`
