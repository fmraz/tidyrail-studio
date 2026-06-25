# QA Checklist

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

