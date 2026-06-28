Pokračuj v projektu ve složce `/Users/frantamraz/Documents/Software Company`.

Nezačínej od nuly. Nepřejmenovávej Tidyrail Studio. Neopouštěj Renewal Desk.

Komunikační pravidla:

- S founderem komunikuj pouze česky.
- Veškeré veřejné produktové texty, UI, dokumentace, web copy, changelogy, policies a marketingové materiály piš anglicky.

Aktuální stav:

- Firma: Tidyrail Studio.
- První produkt: Renewal Desk.
- Doména: `tidyrailstudio.com`.
- GitHub repo: `fmraz/tidyrail-studio`.
- GitHub Pages source: větev `main`, složka `/docs`.
- Source webu: `website/`.
- Deploy mirror: `docs/`.
- Renewal Desk source: `products/renewal-desk/`.
- Veřejný HTTP web funguje.
- HTTPS stále není hotové: GitHub Pages API naposledy hlásilo `bad_authz` a TLS stále servíruje certifikát pro `*.github.io`, proto Enforce HTTPS zůstává vypnuté.
- Produkty jsou zatím zdarma. Neimplementuj platby, subscriptions, Pro funkce ani umělá omezení.

Co už je hotové:

- Hlavní web má Tidyrail Studio iOS/macOS-inspired Liquid Glass design se scroll-driven Three.js homepage.
- Renewal Desk web app byla sjednocena se stejným Liquid Glass design systémem:
  - translucent sidebar
  - glass command navigation
  - elevated topbar
  - search field with code-native icon styling
  - blue primary CTA
  - stat cards with soft icon tiles
  - glass table container
  - glass timeline/receipt panels
  - polished item cards
  - redesigned export/sync readiness panel
  - polished dialog and focus states
  - responsive mobile/tablet breakpoints
  - mobile 2x2 navigation grid
- Renewal Desk zůstává local-first:
  - browser local storage
  - JSON backup/import
  - CSV export
  - sync readiness export
  - Supabase sync adapter scaffold gated behind config
- ZIP byl přebalen po posledním design refreshi:
  - `dist/renewal-desk-0.1.0-mvp.zip`
  - `website/downloads/renewal-desk-0.1.0-mvp.zip`
  - aktuální website checksum: `7dfaee16ddef59f2013800d269911e81d55fb37b9780f9ffbd525e20ec4c21bb`
- `website/` a `docs/` jsou synchronizované přes checksum rsync.
- Desktop packaging scaffold existuje v `desktop/renewal-desk/`.
- Test scripts existují v `scripts/`.
- Strategické dokumenty pro Supabase, RLS QA, desktop packaging, store distribution, support, versioning a maintenance existují.

Co bylo naposledy otestováno:

- `node --check` prošel pro Renewal Desk app, sync adapter, service worker a website scripts.
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip` prošel.
- `website/` a `docs/` jsou shodné.
- In-app Browser desktop QA:
  - route `/apps/renewal-desk/` načtena
  - title `Renewal Desk`
  - dashboard není prázdný
  - console warnings/errors prázdné
  - sample data fungují
  - Export view funguje
  - sync readiness button existuje
- Chrome CDP desktop QA:
  - 1440px screenshot prošel vizuálně
  - `documentElement.scrollWidth === clientWidth`
  - sample data zobrazují 3 rows
- Chrome CDP mobile QA:
  - 390px screenshot prošel vizuálně
  - `documentElement.scrollWidth === 390`
  - `body.scrollWidth === 390`
  - nav grid nepřetéká
- Lokální server byl použit na portu 4325; na konci další session ho po testech zastav.

Co není hotové:

- GitHub HTTPS certifikát a Enforce HTTPS.
- Reálný Supabase projekt.
- Reálný cloud sync v Renewal Desk.
- Plná lokalizace všech website/app stringů.
- Native desktop buildy: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shell a widgety.
- Store submissions.
- Finální právní review policies/terms.

Další priorita:

1. Zkontroluj git stav; respektuj existující necommitnuté změny.
2. Znovu ověř `https://tidyrailstudio.com/`.
3. Pokud HTTPS certifikát konečně odpovídá `tidyrailstudio.com`, zapni Enforce HTTPS v GitHub Pages a ověř routy.
4. Pokud HTTPS stále nefunguje, nezapínej Enforce HTTPS; pokračuj v produktu.
5. Pokračuj Renewal Desk release-candidate prací:
   - otestuj JSON export/import na novém designu
   - otestuj CSV export
   - otestuj Add/Edit/Delete flow
   - ověř dialog na mobilu
   - ověř service worker update flow
6. Potom pokračuj Supabase test-safe setupem:
   - necommituj `auth-config.js`
   - necommituj secrets
   - připrav RLS dvouuživatelský QA postup
   - cloud writes nech vypnuté, dokud RLS QA neprojde
7. Potom pokračuj desktop packaging:
   - Tauri preflight
   - macOS `.dmg` plan
   - Windows installer plan
   - Linux AppImage/deb plan
8. Teprve po silném Renewal Desk RC plánuj další produkt.

Omezení:

- Neutrácej peníze.
- Nezadávej platební údaje.
- Nepublikuj do store ani na sociální platformy.
- Nehardcoduj secrets.
- Nevystavuj service role keys.
- Netvrď platform availability, dokud reálné buildy neexistují.
- Neimplementuj platby, subscriptions, Pro funkce ani umělá free omezení.
- Account sync veřejně označuj jako připravovaný, dokud není backend nakonfigurovaný, otestovaný a schválený.

Výstup na konci další session:

1. Co jsem dokončil
2. Aktuální stav webu
3. Aktuální stav Renewal Desk
4. Jak jsem sjednotil design napříč webem a aplikací
5. Co jsem nastavil nebo opravil pro HTTPS/doménu
6. Jaké soubory jsem vytvořil nebo změnil
7. Co jsem otestoval
8. Jaké problémy nebo rizika zůstávají
9. Co vyžaduje tvoje ruční schválení
10. Další nejlepší krok
11. NEXT_PROMPT.md - nový prompt pro pokračování práce
