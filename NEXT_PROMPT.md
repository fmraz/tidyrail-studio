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
- Veřejné webové a app texty jsou zjednodušené směrem k uživatelskému výsledku: backup, restore, spreadsheet export, account sync coming later, no account required today.
- Z běžného user flow byly odstraněné zbytečné technické výrazy jako backend setup, row-level security, Supabase, checksum, static package, JSON/CSV jako primární button labely a sync readiness.
- Opraven bug po odstranění viditelného sync-status tlačítka: `syncReadinessBtn` listener je nyní guarded, takže aplikace znovu inicializuje submit handler a core flow funguje.
- Renewal Desk Add/Edit/Delete, backup download, spreadsheet export, backup restore, service worker a 390px mobile dialog QA prošly.
- Downloads stránka má privacy-friendly OS/device detection a manuální platform selector, ale text je jednoduchý a netechnický.
- ZIP balíček je publikovaný v `dist/`, `website/downloads/` a `docs/downloads/`; aktuální SHA-256: `dc276d3451ce4f7f44c1ffc9dbea2d6bab4d61d71d6749f913473ec931706884`.
- Supabase auth/sync je připravený jako disabled-by-default scaffold bez secretů, ale veřejně se prezentuje jen jako account sync coming later.
- Tauri desktop scaffold existuje v `desktop/renewal-desk`.
- Renewal Desk platform icon assets jsou v `desktop/renewal-desk/src-tauri/icons` a jsou zapojené do Tauri `bundle.icon`.

Aktuální HTTPS stav:

- DNS root A/AAAA a `www` CNAME míří na GitHub Pages.
- HTTP routy vrací 200.
- GitHub Pages API 2026-07-07 stále vracelo `https_certificate.state: bad_authz`.
- `https://tidyrailstudio.com/` stále selhávalo, protože TLS certifikát neobsahoval `tidyrailstudio.com`.
- Enforce HTTPS je vypnuté a nesmí se zapnout, dokud certifikát nebude validní.
- Další HTTPS krok: znovu ověřit Pages API po čekání; pokud stav zůstane `bad_authz`, použít GitHub Pages Settings UI nebo GitHub Support.

Naposledy otestováno:

- GitHub Pages API a HTTPS stav.
- Public HTTP routes: `/`, `/downloads/`, `/apps/renewal-desk/`, `/products/renewal-desk/`.
- `node --check products/renewal-desk/src/app.js`
- `node --check website/apps/renewal-desk/src/app.js`
- `node --check docs/apps/renewal-desk/src/app.js`
- Renewal Desk clean-browser Add/Edit/Delete.
- Backup download: `renewal-desk-backup.json`.
- Spreadsheet export: `renewal-desk-items.csv`.
- Restore backup through file input.
- Service worker supported, controlled, one registration.
- Mobile Add Item dialog at 390px: no horizontal overflow and dialog fits viewport.

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
- Optional assistive-technology screen-reader spot check.

Další priorita:

1. Zkontroluj git stav.
2. Ověř GitHub Pages API a `https://tidyrailstudio.com/`.
3. Pokud HTTPS certifikát už odpovídá `tidyrailstudio.com`, zapni Enforce HTTPS a ověř přesměrování.
4. Pokud HTTPS stále vrací `bad_authz`, nečekej pasivně.
5. Proveď ještě veřejnou HTTP QA po deployi: homepage, downloads, Renewal Desk app, product page, ZIP download.
6. Pokud je Renewal Desk stále stabilní, pokračuj desktop packaging readiness: ověř dostupnost Rust/Cargo/Tauri prerequisites a připrav první macOS `.dmg` kandidát, ale netvrď native availability.
7. Připrav Supabase test-safe config workflow bez commitování secretů.
8. Po dodání Supabase env hodnot spusť dvouuživatelský RLS QA.
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
