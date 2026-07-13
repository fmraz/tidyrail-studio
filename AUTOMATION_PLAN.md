# 3-Hour Automation Plan

The preferred automation is a Codex recurring workspace automation that runs every 3 hours in this workspace and follows `THREE_HOUR_WORK_LOOP.md`.

Active Codex automation: `create-software-company-brand`, displayed as **Tidyrail 3-hour product loop**. It runs every three hours in the current project thread and uses `THREE_HOUR_WORK_LOOP.md` plus `NEXT_PROMPT.md` as its operating context.

## Safety Rules

The automation may create necessary low-cost/no-cost setup accounts when technically possible without payment details, public posting, or irreversible publication.

The automation must never:

- Spend money.
- Enter payment details.
- Buy domains, hosting, ads, APIs, subscriptions, templates, fonts, licenses, or marketplace listings.
- Publish publicly.
- Submit to marketplaces.
- Send emails or post on social media.
- Perform irreversible external actions without explicit founder approval.
- Confirm paid purchases without founder approval for the exact payment.
- Create fake users, reviews, revenue, testimonials, downloads, or social proof.

## Manual Cron Example

```cron
0 */3 * * * cd "/Users/frantamraz/Documents/Software Company" && codex "$(cat THREE_HOUR_WORK_LOOP.md)" >> automation-reports.log 2>&1
```

Adjust the `codex` command to the installed CLI on the machine.

## macOS launchd Example

Create `~/Library/LaunchAgents/com.tidyrail.studio.workloop.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.tidyrail.studio.workloop</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>-lc</string>
    <string>cd "/Users/frantamraz/Documents/Software Company" && codex "$(cat THREE_HOUR_WORK_LOOP.md)" >> automation-reports.log 2>&1</string>
  </array>
  <key>StartInterval</key>
  <integer>10800</integer>
  <key>StandardOutPath</key>
  <string>/Users/frantamraz/Documents/Software Company/automation-reports.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/frantamraz/Documents/Software Company/automation-errors.log</string>
</dict>
</plist>
```

Load it with:

```bash
launchctl load ~/Library/LaunchAgents/com.tidyrail.studio.workloop.plist
```

## GitHub Actions Schedule Example

Only use this if the project is on GitHub and the founder approves repository automation.

```yaml
name: Three Hour Work Loop

on:
  schedule:
    - cron: "0 */3 * * *"
  workflow_dispatch:

jobs:
  work-loop:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run work loop
        run: |
          echo "Run the work loop prompt through the approved Codex environment."
```
