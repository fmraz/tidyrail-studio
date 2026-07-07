# Decision Log

## 2026-06-25

- Chose **Tidyrail Studio** as the working company name after evaluating 20 candidates and doing a preliminary web collision check.
- Selected a local-first utility portfolio instead of a SaaS platform to minimize infrastructure cost and maintenance burden.
- Selected **Renewal Desk** as the first product because it is broad-market, useful without network effects, privacy-respecting, and realistic to finish quickly.
- Chose a static web MVP for Renewal Desk to make it downloadable, inspectable, and easy to run without accounts or paid services.
- Set rule that no external publishing, account creation, spending, or irreversible action happens without explicit founder approval.
- Created the Codex automation `tidyrail-3-hour-work-loop` to run the studio work loop every 3 hours.
- Fixed Renewal Desk product formatting to use English dates and USD currency formatting regardless of the system locale.
- Fixed Renewal Desk mobile table overflow by switching upcoming rows into a stacked layout on narrow screens.
- Chose Renewal Desk accessibility and release-candidate QA as the next primary focus because the MVP feature set was already implemented and the release checklist still had accessibility, product page, and packaging gaps.
- Added basic accessibility polish to Renewal Desk: contextual action labels, dialog focus management, active navigation state, and live export/import status messaging.
- Chose Renewal Desk export/import release-candidate QA as the next primary focus because the release checklist was otherwise complete but the QA report still had unclosed backup and CSV verification gaps.
- Verified Renewal Desk JSON export/import and CSV export content in a fresh browser context; no product code change was needed, so the product remains in founder-approval hold before any public release.
- Treated the founder's broad approval to "handle everything not done" as permission to finish local, reversible release-readiness work, not as permission to spend money, create accounts, publish publicly, submit marketplaces, or perform irreversible external actions without a concrete target.

## 2026-06-25 Permission Update

- Founder granted standing approval to create necessary accounts and prepare cheap essential purchases.
- Payment details and final payment confirmation remain founder-only actions.
- Public posting, marketplace submission, and product publication remain concrete approval actions unless explicitly approved for the specific destination.
- Domain spot check: `tidyrail.com` resolves, while `tidyrail.studio`, `tidyrailstudio.com`, and `gettidyrail.com` did not resolve via DNS; registrar availability still needs checkout verification before purchase.
- RDAP check found `tidyrail.com` registered via IONOS and expiring 2026-12-22; `tidyrail.studio`, `tidyrailstudio.com`, and `gettidyrail.com` returned not-found style responses.
- Recommended `tidyrail.studio` as the first domain purchase attempt, with `tidyrailstudio.com` as the fallback.
- Verified the packaged Renewal Desk zip from a fresh extracted `file://` run in a clean local Chrome profile; no local product QA blockers remain for the static MVP release candidate.
- Chose Renewal Desk release-channel preparation as the primary focus for this run because the product itself has no local release-candidate blocker and the remaining release checklist item is founder approval for a concrete external destination.
- Prepared a release channel decision brief recommending Gumroad as the first paid download channel and Product Hunt only after a live sales/download URL exists; no external accounts were created, no product was published, and no marketplace submission was made.

## 2026-06-25 Free-First Strategy Update

- Founder changed strategy to free products first under one central Tidyrail Studio website.
- Payment processing, paid downloads, subscriptions, locked Pro features, and artificial limits are paused.
- Renewal Desk remains the first product and must be finished before starting CleanClip Local.
- Recommended platform direction: static web first, Tauri desktop packaging later, mobile shell later after validation.
- Created the first static company website under `website/`.
- Switched the practical VEDOS purchase target from `tidyrail.studio` to `tidyrailstudio.com` after checkout showed `.studio` at 1252.35 CZK with VAT and `.com` at 413.82 CZK with VAT for one year.
- Created the VEDOS `tidyrailstudio.com` domain order with no hosting, no paid monitoring, no paid certificate, and no domain insurance. Registration remains pending until the founder pays the VEDOS payment request.
- Verified that VEDOS payment status for `tidyrailstudio.com` shows paid and the domain appears in the VEDOS domain list with provisioning pending.
- Chose GitHub Pages as the first public hosting path. The first push uses the `main` branch `/docs` publishing source because the current GitHub token does not have `workflow` scope for publishing workflow files.
- Added a public hosted Renewal Desk app route at `/apps/renewal-desk/` alongside the downloadable ZIP package.
- Added a scroll-driven Three.js product presentation to the Tidyrail Studio homepage, using local static assets and no backend.
- Configured GitHub Pages for `fmraz/tidyrail-studio` with source `main` branch `/docs` and custom domain `tidyrailstudio.com`.
- Entered the GitHub Pages DNS target records in the VEDOS DNS editor. Authoritative VEDOS DNS returns the GitHub Pages root and `www` records, while public resolver cache and old wildcard parking records still need follow-up verification/removal.
- Verified that `http://tidyrailstudio.com/` serves the GitHub Pages site. HTTPS remains pending until GitHub finishes certificate provisioning for the custom domain.
- Chose company website free-first alignment as the primary focus because Renewal Desk is already a local release candidate and public copy still exposed account previews too prominently.
- Removed account links from the public website navigation and sitemap, added `/account/` to robots disallow, and rewrote homepage/product/download copy around the actual free local-first release with JSON/CSV export.
- Rebuilt the Renewal Desk ZIP package after the app shell local-storage note changed, and verified the new SHA-256 checksum.
- Retested the local website homepage and downloads page in the in-app browser on desktop and mobile widths. The pages rendered, the mobile menu opened, the download picker updated, and no console warnings or errors appeared.
- Retested the Renewal Desk export view after the local-first/sync-status copy update. The Export navigation opened the expected panel and no console warnings or errors appeared.
- Rechecked public domain status: `http://tidyrailstudio.com/` still serves GitHub Pages, while `https://tidyrailstudio.com/` and `https://www.tidyrailstudio.com/` still fail certificate host-name validation.
- Updated the Tidyrail Studio website toward an original iOS/macOS-inspired glass interface with bright cool surfaces, blue primary actions, teal details, floating navigation, and refined responsive panels.
- Added public-page metadata for strict-origin referrer handling, mobile theme color, and disabled automatic telephone detection where it could alter layout.
- Improved mobile navigation behavior so the compact menu closes on outside click, link click, and Escape.
- Re-triggered GitHub Pages certificate provisioning by safely re-applying the custom domain. The custom domain returned to `tidyrailstudio.com`, HTTP remains live, and Enforce HTTPS remains off until GitHub issues a matching certificate.
- Chose Renewal Desk free-first release alignment as the primary focus because active planning docs still contained paid-storefront and Gumroad guidance that conflicted with the current strategy.
- Rewrote Renewal Desk portfolio, landing, store draft, roadmap, and release-channel docs around the free central website/download path; monetization remains deferred and no payment, subscription, Pro, or artificial limit path is active.
- Rebuilt the Renewal Desk release ZIP after documentation changes and copied it to website/docs download locations; later visual alignment work updated the package again, with current SHA-256 `cd6142cc6c693e0fcd81949be6c7f800041a0c0e7aa2204a9dceb60db8f76886`.
- Rechecked public HTTP, HTTPS, DNS, TLS, and GitHub Pages API state for `tidyrailstudio.com`: HTTP still works, DNS points to GitHub Pages, HTTPS still serves a GitHub wildcard certificate, and Pages API still reports `bad_authz`.
- Attempted a GitHub Pages custom-domain remove/re-add reset through the API after consulting the Pages API contract for `cname: null`; GitHub returned `The certificate has not finished being issued`, so the next certificate reset should be done manually in GitHub Pages Settings UI.
- Aligned the Renewal Desk app UI with the Tidyrail Studio website glass visual system and refreshed the website/deploy product screenshot assets so the website no longer displays the older green-gray app style.
- Chose Renewal Desk release-candidate cache hardening as the primary focus because a browser QA pass showed the old cache-first service worker could keep serving a stale app shell on a previously used origin.
- Changed the Renewal Desk service worker from cache-first to network-first with cached fallback, bumped the cache to `renewal-desk-0.1.4`, and added immediate activation/claiming for returning-browser updates.
- Removed the remaining paid-validation sentence from the Renewal Desk launch copy and removed negative letter spacing from the app CSS in product, website, and docs copies.
- Rebuilt the Renewal Desk ZIP and copied it to the website/docs download folders; current SHA-256 is `5940ea020f2e8137f67f3e34d767084599b0d59d4b947090a9857123113ba3c4`.
- Rechecked `tidyrailstudio.com` HTTPS on 2026-06-28: DNS root and `www` still point to GitHub Pages, HTTP routes work, GitHub Pages API still reports `bad_authz`, and TLS still serves a `*.github.io` certificate, so Enforce HTTPS remains off.
- Chose Renewal Desk design unification as the primary focus because the company website already had the Tidyrail Studio glass direction but the product app needed the same system applied throughout.
- Generated a Renewal Desk dashboard concept as implementation reference, then implemented the design in code-native CSS rather than shipping a static UI image.
- Updated Renewal Desk sidebar, navigation, topbar, search, stat cards, panels, table rows, empty states, item cards, sync readiness panel, dialogs, focus states, and mobile/tablet breakpoints to match the Tidyrail Studio Liquid Glass system.
- Replaced the narrow mobile horizontal nav with a 2x2 glass command grid after QA showed the previous mobile nav could visually clip the last item.
- Rebuilt the Renewal Desk ZIP and copied it to the website/docs download folders; current SHA-256 is `7dfaee16ddef59f2013800d269911e81d55fb37b9780f9ffbd525e20ec4c21bb`.
- Rechecked `tidyrailstudio.com` HTTPS and GitHub Pages on 2026-06-28: DNS still points to GitHub Pages, API still reports `bad_authz`, TLS still serves `*.github.io`, and Enforce HTTPS remains off. Chrome automation was unavailable and the in-app browser could not complete the GitHub Pages Settings UI reset, so the UI retry remains a manual/account-browser blocker.
- Generated Renewal Desk Tauri icon assets from `brand/icons/renewal-desk-icon-concept.png`, wired `.icns`, `.ico`, and PNG assets into the Tauri bundle config, and expanded desktop preflight to validate icon signatures and PNG dimensions. Native builds remain blocked until Rust/Cargo and platform prerequisites are installed.
- Rechecked `tidyrailstudio.com` HTTPS and GitHub Pages on 2026-07-07: DNS root A/AAAA and `www` CNAME are correct, public HTTP routes return 200, Pages build is healthy, but GitHub's ACME certificate state remains `bad_authz` and TLS still serves `*.github.io`.
- Per GitHub's documented recovery path for stuck Pages certificates, temporarily removed `docs/CNAME`/`website/CNAME`, pushed the change, set Pages custom domain to null, restored `tidyrailstudio.com`, pushed again, and triggered a fresh Pages build. This restored the site and build but did not clear the ACME `bad_authz`; Enforce HTTPS remains off to avoid breaking access.
- Chose a user-outcome copy pass across the website and Renewal Desk before adding more features, because the public experience was exposing implementation details such as backend setup, sync internals, JSON/CSV labels, checksum links, and platform packaging terms too early. Technical details remain in internal QA/docs where useful.
- Chose to keep the sync readiness export available only as internal code path rather than a visible user button, because the current public release should focus on clear user actions: backup, restore, and spreadsheet export. The app now guards the optional listener so removing that button does not break initialization.
- Chose not to install Rust automatically during desktop packaging readiness. The project now has `npm run qa:native-prereqs --prefix desktop/renewal-desk` to show the exact blocker state; installing free developer tooling should be an explicit founder-approved system change.
- After the founder asked to continue, installed Rust/Cargo locally through `rustup` without spending money, re-ran native prerequisite QA, and produced the first local Apple Silicon macOS `.dmg` candidate for Renewal Desk.
- Set Tauri macOS `signingIdentity` to `"-"` for internal QA only. This allows a structurally verifiable local bundle while keeping public distribution blocked until Developer ID signing and notarization are approved and completed.
- Verified the local `.dmg` with `hdiutil verify`, mounted it, confirmed the drag-to-Applications layout, checked `Info.plist`, and confirmed `codesign --verify --deep --strict` passes for the mounted app bundle. The local `spctl` result is not treated as public readiness because it reports a local security override.
- Rechecked `tidyrailstudio.com` HTTPS through GitHub Pages API and `curl`: HTTP still works, DNS remains correct, but GitHub Pages still reports `bad_authz` and HTTPS still serves the wrong certificate. A fresh API attempt to remove/re-add the Pages custom domain was rejected by GitHub with `The certificate has not finished being issued`, so the next reset path is GitHub Pages Settings UI or GitHub Support.
- Added `scripts/qa-macos-dmg.mjs` and `npm run qa:macos-dmg --prefix desktop/renewal-desk` so the local macOS DMG can be checked consistently before any release decision.
- Smoke-tested the mounted DMG app launch and quit flow. The app opened to the Renewal Desk dashboard, the process was visible, quit completed, and the DMG detached cleanly. The temporary screenshot was deleted because it captured the user's desktop background.
- Documented the exact GitHub Pages HTTPS recovery UI steps and support request text because Chrome automation is unavailable in this session and GitHub's Pages API refused the reset.
- Added `scripts/qa-macos-notarization-readiness.mjs` and `MACOS_NOTARIZATION_CHECKLIST.md` to separate local DMG quality from public macOS distribution readiness. The report confirms `notarytool` and `stapler` are available, but Developer ID identity and notarization credentials are blockers.
