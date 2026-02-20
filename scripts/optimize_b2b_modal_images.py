#!/usr/bin/env python3
"""
Optimize images used by the B2B modal.

- Converts PNG/JPG/JPEG images in modal folders to WebP (keeps originals untouched)
- Applies max-size resize to reduce payload
- Uses higher max edge for hero/group images, lower for detail images
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG_ROOT = ROOT / "assets" / "images"
TARGET_DIRS = [
    "pezziduri",
    "torte",
    "contenitori",
    "coni-coppette",
    "accessori",
    "vasche",
]

HERO_KEYWORDS = {
    "gruppo",
    "group",
    "hero",
    "vetrina",
    "conigroup",
    "coniglutenfree",
}

MAX_EDGE_HERO = 1800
MAX_EDGE_DEFAULT = 1200
WEBP_QUALITY = 72


def max_edge_for(path: Path) -> int:
    stem = path.stem.lower()
    if any(k in stem for k in HERO_KEYWORDS):
        return MAX_EDGE_HERO
    return MAX_EDGE_DEFAULT


def convert_one(src: Path) -> tuple[int, int] | None:
    if src.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        return None

    dst = src.with_suffix(".webp")

    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

        max_edge = max_edge_for(src)
        img.thumbnail((max_edge, max_edge), Image.LANCZOS)

        save_kwargs = {
            "format": "WEBP",
            "quality": WEBP_QUALITY,
            "method": 6,
        }
        if img.mode == "RGBA":
            save_kwargs["lossless"] = False

        img.save(dst, **save_kwargs)

    return src.stat().st_size, dst.stat().st_size


def main() -> None:
    total_before = 0
    total_after = 0
    converted = 0

    for sub in TARGET_DIRS:
        folder = IMG_ROOT / sub
        if not folder.exists():
            continue

        for src in sorted(folder.iterdir()):
            if not src.is_file():
                continue
            result = convert_one(src)
            if not result:
                continue

            before, after = result
            total_before += before
            total_after += after
            converted += 1
            rel = src.relative_to(ROOT).as_posix()
            print(f"✓ {rel} -> {src.with_suffix('.webp').name} ({before/1024:.0f} KB -> {after/1024:.0f} KB)")

    if converted == 0:
        print("No PNG/JPG/JPEG files found to convert.")
        return

    saved = total_before - total_after
    ratio = (saved / total_before * 100) if total_before else 0
    print("\n---")
    print(f"Converted: {converted} files")
    print(f"Before: {total_before/1024/1024:.2f} MB")
    print(f"After:  {total_after/1024/1024:.2f} MB")
    print(f"Saved:  {saved/1024/1024:.2f} MB ({ratio:.1f}% smaller)")


if __name__ == "__main__":
    main()
