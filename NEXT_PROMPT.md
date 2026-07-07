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
- Desktop scaffold: `desktop/renewal-desk/`.
- Veřejný HTTP web funguje na `http://tidyrailstudio.com/`.
- Produkty jsou zatím zdarma. Neimplementuj platby, subscriptions, Pro funkce ani umělá omezení.

Co už je hotové:

- Hlavní web má iOS/macOS-inspired Liquid Glass design se scroll-driven Three.js homepage.
- Renewal Desk web app je sjednocená se stejným Liquid Glass design systémem.
- Veřejné webové a app texty jsou zjednodušené směrem k uživatelskému výsledku: backup, restore, spreadsheet export, account sync coming later, no account required today.
- Z běžného user flow byly odstraněné zbytečné technické výrazy jako backend setup, row-level security, Supabase, checksum, static package, JSON/CSV jako primární button labely a sync readiness.
- Renewal Desk Add/Edit/Delete, backup download, spreadsheet export, backup restore, service worker a 390px mobile dialog QA prošly.
- Downloads stránka má privacy-friendly OS/device detection a manuální platform selector, ale text je jednoduchý a netechnický.
- ZIP balíček je publikovaný v `dist/`, `website/downloads/` a `docs/downloads/`; aktuální SHA-256: `dc276d3451ce4f7f44c1ffc9dbea2d6bab4d61d71d6749f913473ec931706884`.
- Supabase auth/sync je připravený jako disabled-by-default scaffold bez secretů, ale veřejně se prezentuje jen jako account sync coming later.
- Tauri desktop scaffold existuje v `desktop/renewal-desk`.
- Renewal Desk platform icon assets jsou v `desktop/renewal-desk/src-tauri/icons` a jsou zapojené do Tauri `bundle.icon`.
- Native packaging prerequisite preflight existuje jako `npm run qa:native-prereqs --prefix desktop/renewal-desk`.
- Rust/Cargo byly nainstalované lokálně přes `rustup` po founderově pokynu pokračovat.
- `npm run qa:native-prereqs --prefix desktop/renewal-desk` prochází s jedním warningem: full Xcode není selected, aktivní jsou Xcode Command Line Tools.
- `npm run qa:desktop --prefix desktop/renewal-desk` prochází.
- Tauri macOS config má `bundle.macOS.signingIdentity` nastavené na `"-"` pro interní QA ad-hoc signing.
- Lokální macOS Apple Silicon DMG kandidát existuje na `desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg`.
- Aktuální lokální DMG SHA-256: `9e9a9772c2c394dfcf5cc6025d1179923230762547176de6f1c25f781ef7020d`.
- `hdiutil verify` prošel pro lokální DMG.
- Mounted DMG obsahuje `Renewal Desk.app`, `Applications` symlink, `.VolumeIcon.icns` a `.DS_Store`.
- Mounted app bundle má bundle identifier `com.tidyrailstudio.renewaldesk`.
- `codesign --verify --deep --strict` prošel pro mounted app bundle s ad-hoc podpisem.
- Public macOS distribuce pořád není hotová: chybí Developer ID signing, notarizace a clean-machine Gatekeeper test.

Aktuální HTTPS stav:

- DNS root A/AAAA a `www` CNAME míří na GitHub Pages.
- HTTP routy vrací 200.
- GitHub Pages API 2026-07-07 stále vrací `https_certificate.state: bad_authz`.
- `https://tidyrailstudio.com/` stále selhává, protože TLS certifikát neobsahuje `tidyrailstudio.com`.
- Enforce HTTPS je vypnuté a nesmí se zapnout, dokud certifikát nebude validní.
- Předchozí remove/re-add reset přes commitované `CNAME` soubory nepomohl.
- Nový pokus přes GitHub Pages API o `cname: null` a re-add byl odmítnut chybou `The certificate has not finished being issued`; custom domain zůstala `tidyrailstudio.com`.
- Další HTTPS krok: zkusit reset v GitHub Pages Settings UI, případně kontaktovat GitHub Support, pokud UI reset nepůjde.

Naposledy otestováno:

- GitHub Pages API a HTTPS stav.
- `curl -I http://tidyrailstudio.com/` vrací 200.
- `curl -I https://tidyrailstudio.com/` selhává na certifikátu.
- DNS: apex A/AAAA a `www` CNAME jsou správné; CAA není nastavené.
- `node --check scripts/qa-native-prereqs.mjs`
- `npm run qa:native-prereqs --prefix desktop/renewal-desk`
- `npm run qa:desktop --prefix desktop/renewal-desk`
- `node --check products/renewal-desk/src/app.js`
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip`
- `npm run tauri:build --prefix desktop/renewal-desk`
- `hdiutil verify` pro lokální DMG.
- Mounted `.app` `Info.plist`, bundle contents a strict local codesign verification.
- `npm run qa:macos-dmg --prefix desktop/renewal-desk`
- Mounted DMG launch smoke test: aplikace se otevřela na Renewal Desk dashboard, proces běžel, quit proběhl a DMG se odpojil.
- `npm run qa:macos-notarization --prefix desktop/renewal-desk`
- macOS notarization readiness: `notarytool` a `stapler` jsou dostupné; chybí Developer ID Application identity a notarization credentials; full Xcode není selected.
- `npm run qa:windows --prefix desktop/renewal-desk`
- `npm run qa:linux --prefix desktop/renewal-desk`
- Windows/Linux packaging readiness metadata prochází, ale reálné buildy a smoke testy musí běžet na Windows/Linux nebo v CI.

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt a production auth config.
- Reálný dvouuživatelský RLS test.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Developer ID podpis a notarizace macOS DMG.
- Developer ID Application identity v Keychain.
- Notarization credentials bez commitování secretů.
- Full Xcode selected pro finální signing/notarization workflow.
- Reálný Windows installer a Linux package.
- Target OS nebo CI build/test workflow pro Windows/Linux.
- iOS/Android app shell a widgety.
- Store submissions.
- Finální právní review policies/terms.
- Optional assistive-technology screen-reader spot check.

Další priorita:

1. Zkontroluj git stav a ujisti se, že `desktop/renewal-desk/src-tauri/target/`, `desktop/renewal-desk/src-tauri/gen/`, `.env`, `auth-config.js` a secret-bearing soubory nejsou commitované.
2. Ověř GitHub Pages API a `https://tidyrailstudio.com/`.
3. Pokud HTTPS certifikát už odpovídá `tidyrailstudio.com`, zapni Enforce HTTPS a ověř HTTP->HTTPS redirect.
4. Pokud HTTPS stále vrací `bad_authz`, otevři GitHub Pages Settings UI a zkus ručně odstranit custom domain, uložit, znovu zadat `tidyrailstudio.com`, uložit a počkat na provisioning. Přesný postup a support text jsou v `GITHUB_PAGES_SETUP.md`. Pokud UI krok vyžaduje 2FA nebo selže, připrav přesnou zprávu pro GitHub Support.
5. Nečekej pasivně na HTTPS; pokračuj Renewal Desk RC prací.
6. Zopakuj `npm run qa:macos-dmg --prefix desktop/renewal-desk` po každém novém Tauri buildu.
7. Použij `MACOS_NOTARIZATION_CHECKLIST.md` a `npm run qa:macos-notarization --prefix desktop/renewal-desk` pro Developer ID/notarization readiness. Nezadávej ani neukládej Apple credentials bez ručního schválení.
8. Použij `DESKTOP_CI_BUILD_PLAN.md` pro další Windows/Linux build plán. Nepřidávej aktivní GitHub Actions workflow bez kontroly token scope a founder approval.
9. Připrav Supabase test-safe config workflow bez commitování secretů.
10. Po dodání Supabase env hodnot spusť dvouuživatelský RLS QA.
11. Aktualizuj `NEXT_PROMPT.md` na konci session.

Omezení:

- Neutrácej peníze.
- Nezadávej platební údaje.
- Nepublikuj do store ani na sociální platformy.
- Nehardcoduj secrets.
- Nevystavuj service role keys.
- Necommituj `auth-config.js`, `.env` ani secret-bearing poznámky.
- Netvrď platform availability, dokud reálné buildy neexistují a neprojdou QA.
- Neimplementuj platby, subscriptions, Pro funkce ani umělá free omezení.
- Mac DMG s ad-hoc podpisem je pouze interní QA kandidát, ne veřejný release.

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
