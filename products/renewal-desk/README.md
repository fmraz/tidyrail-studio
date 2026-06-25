# Renewal Desk

Renewal Desk is a local-first tracker for subscriptions, warranties, renewals, service dates, and document expiry reminders.

## What It Does

- Track renewal and expiry dates.
- See upcoming items in a simple dashboard.
- Mark whether receipts are saved, missing, or not needed.
- Search and filter records locally.
- Export JSON backups and CSV files.
- Import a JSON backup.

## Privacy

The MVP stores data in browser `localStorage` on the current device. It does not create accounts, send data to a server, or include analytics.

## Run Locally

Open `index.html` in a modern browser.

No build step is required.

## MVP Limitations

- Data is tied to the browser profile where it was entered.
- Clearing browser data may remove records unless a JSON backup was exported.
- Receipts are tracked by status only; file attachments are not included in the MVP.
- Currency display uses English USD formatting in the MVP.

## Release Status

Current status: static MVP release candidate. The MVP feature set is implemented, packaged, and covered by release-candidate QA. Public distribution, sales setup, or marketplace submission still needs approval for the concrete destination and action.
