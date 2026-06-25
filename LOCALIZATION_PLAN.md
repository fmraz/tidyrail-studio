# Localization Plan

Status: scaffolding started.

## Supported Languages

English, Czech, Slovak, German, Polish, French, Spanish, Italian, Portuguese, Dutch, Swedish, Norwegian, Danish, Finnish, Hungarian, Romanian, Croatian, Slovenian, Ukrainian, Turkish, Greek, Japanese, Korean, Chinese Simplified, Chinese Traditional, Hindi, Indonesian, Vietnamese, Thai, Arabic, Hebrew.

## Implementation

- Default language: English.
- Detect browser language automatically.
- Store manual language preference in local storage.
- Set `html[lang]` and `dir` for RTL languages.
- Translation file started at `website/i18n/translations.json`.

## Current Limitation

Only core navigation and CTA strings are scaffolded. Full editorial translation of every page and Renewal Desk UI is still required.

## QA Checklist

- Check text expansion in German, French, Polish, Finnish, and Hungarian.
- Check RTL layout for Arabic and Hebrew.
- Check CJK line breaks.
- Check form labels and validation messages.
- Check SEO metadata per locale before publishing localized URLs.
