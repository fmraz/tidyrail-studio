#!/usr/bin/env python3
"""Validate local links and assets in the static GitHub Pages source."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


ROOT = Path(__file__).resolve().parents[1] / "website"
SKIP_SCHEMES = {"http", "https", "mailto", "tel", "data", "blob"}


class ReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        for name in ("href", "src"):
            value = attributes.get(name)
            if value:
                self.references.append((tag, name, value))


def resolve_reference(page, reference):
    parsed = urlsplit(reference)
    if parsed.scheme in SKIP_SCHEMES or reference.startswith("//") or not parsed.path:
        return None
    path = Path(unquote(parsed.path.lstrip("/"))) if parsed.path.startswith("/") else page.parent / unquote(parsed.path)
    candidate = ROOT / path if parsed.path.startswith("/") else path
    if parsed.path.endswith("/"):
        candidate /= "index.html"
    elif candidate.is_dir():
        candidate /= "index.html"
    return candidate.resolve()


def main():
    failures = []
    checked = 0
    for page in sorted(ROOT.rglob("*.html")):
        parser = ReferenceParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for tag, attribute, reference in parser.references:
            target = resolve_reference(page, reference)
            if target is None:
                continue
            checked += 1
            if ROOT.resolve() not in target.parents and target != ROOT.resolve():
                failures.append(f"{page.relative_to(ROOT)}: {reference} escapes website root")
            elif not target.exists():
                failures.append(
                    f"{page.relative_to(ROOT)}: {tag}[{attribute}]={reference!r} -> missing {target.relative_to(ROOT)}"
                )

    if failures:
        print("Public site QA failed:")
        print("\n".join(f"- {failure}" for failure in failures))
        return 1

    print(f"Public site QA passed: {checked} local references across {len(list(ROOT.rglob('*.html')))} HTML files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
