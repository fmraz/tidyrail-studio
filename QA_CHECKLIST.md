# QA Checklist

## Website

- [x] Homepage loads locally.
- [x] Desktop screenshot checked.
- [x] Mobile screenshot checked.
- [x] 3D scene initializes locally.
- [x] Scroll animation changes scene progress.
- [x] ZIP download link returns a file.
- [x] Public HTTP site returns GitHub Pages content.
- [ ] Public HTTPS certificate completed.
- [x] VEDOS wildcard DNS records removed.
- [x] Mobile menu retested after account/download changes.
- [x] Public website navigation and sitemap exclude account drafts until backend approval.
- [x] Homepage and downloads page retested locally after free-first copy changes.

## Renewal Desk

- [x] Core local app flow tested.
- [x] Export/import tested.
- [x] ZIP integrity tested.
- [x] Download ZIP rebuilt and checksum verified after app-shell copy update.
- [x] Export view retested after local-first/sync-status copy update.
- [ ] Cloud sync tested after backend setup.

## Account System

- [ ] Supabase project created.
- [ ] RLS schema applied.
- [ ] Email/password tested.
- [ ] Password reset tested.
- [ ] OAuth providers tested.
- [ ] Export/delete cloud data tested.

## Localization

- [ ] Full English string inventory.
- [ ] Full translation files.
- [ ] RTL QA.
- [ ] Mobile text expansion QA.

## General App QA

- Core workflow works from empty state.
- Data persists after reload when persistence is expected.
- Export works and can be imported again.
- Delete actions require confirmation or are easy to recover from.
- Error messages are clear.
- Mobile layout does not overflow.
- Keyboard focus is visible.
- No console errors in normal use.
- README instructions are accurate.
- Privacy claims match actual behavior.

## Release Candidate QA

- Fresh browser/profile test.
- Existing data migration or reset test.
- Manual accessibility pass.
- Responsive desktop and mobile pass.
- Offline/local file usage pass where applicable.
- Packaging/opening instructions verified.
