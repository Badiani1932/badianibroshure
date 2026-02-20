#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    ROOT / "index.html",
    ROOT / "eventi" / "index.html",
    ROOT / "eventi" / "saletta-privata-tosinghi" / "index.html",
    ROOT / "eventi" / "evento-esterno" / "index.html",
    ROOT / "b2b" / "index.html",
]

IMAGE_EXT_RE = re.compile(r"\.(png|jpe?g)$", re.IGNORECASE)
REF_RE = re.compile(
    r"(?:src|href)\s*=\s*[\"']([^\"']+)[\"']|url\((?:[\"']?)([^)\"'\s]+)(?:[\"']?)\)",
    re.IGNORECASE,
)


def is_local_image_ref(raw: str) -> bool:
    if not raw:
        return False
    if re.match(r"^(https?:|mailto:|tel:|data:|javascript:|#)", raw, re.IGNORECASE):
        return False
    clean = raw.split("?", 1)[0].split("#", 1)[0]
    return bool(IMAGE_EXT_RE.search(clean))


def to_webp_ref(raw: str) -> str:
    return IMAGE_EXT_RE.sub(".webp", raw)


def resolve_path(page: Path, raw: str) -> Path:
    clean = raw.split("?", 1)[0].split("#", 1)[0]
    decoded = unquote(clean)
    return (page.parent / decoded).resolve()


def convert_to_webp(src: Path, dst: Path) -> bool:
    if dst.exists():
        return False
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
        im.save(dst, "WEBP", quality=78, method=6)
    return True


def process_page(page: Path) -> tuple[int, int, int]:
    text = page.read_text(encoding="utf-8")
    refs: list[str] = []
    for m in REF_RE.finditer(text):
        raw = m.group(1) or m.group(2) or ""
        if is_local_image_ref(raw):
            refs.append(raw)

    refs = sorted(set(refs))
    converted = 0
    replaced = 0

    for ref in refs:
        src = resolve_path(page, ref)
        if not src.exists():
            continue
        dst = src.with_suffix(".webp")
        if convert_to_webp(src, dst):
            converted += 1

        new_ref = to_webp_ref(ref)
        if new_ref != ref and ref in text:
            text = text.replace(ref, new_ref)
            replaced += 1

    page.write_text(text, encoding="utf-8")
    return len(refs), converted, replaced


def main() -> None:
    total_refs = 0
    total_converted = 0
    total_replaced = 0

    for page in PAGES:
        refs, converted, replaced = process_page(page)
        total_refs += refs
        total_converted += converted
        total_replaced += replaced
        print(f"{page.relative_to(ROOT)} => refs:{refs} converted:{converted} replaced:{replaced}")

    print("-")
    print(f"TOTAL refs:{total_refs} converted:{total_converted} replaced:{total_replaced}")


if __name__ == "__main__":
    main()
