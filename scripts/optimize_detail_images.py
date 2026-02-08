#!/usr/bin/env python3
"""
Create lightweight versions of the gelato detail images (*-2.webp).
Outputs *-2-light.webp next to each original, resized to 600x600 max
and compressed with WebP quality 60.
"""

import os
from pathlib import Path
from PIL import Image

GELATO_DIR = Path(__file__).resolve().parent.parent / "assets" / "gelato"
MAX_SIZE = 600        # px  – longest side
WEBP_QUALITY = 60     # 0-100, lower = smaller file

def process_image(src: Path):
    dst = src.with_name(src.stem.replace("-2", "-2-light") + ".webp")
    try:
        with Image.open(src) as img:
            img = img.convert("RGB")
            # Resize keeping aspect ratio, longest side = MAX_SIZE
            img.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)
            img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
        old_kb = src.stat().st_size / 1024
        new_kb = dst.stat().st_size / 1024
        print(f"  ✓ {src.parent.name}/{src.name}  {old_kb:.0f} KB → {new_kb:.0f} KB  ({100-new_kb/old_kb*100:.0f}% smaller)")
    except Exception as e:
        print(f"  ✗ {src}: {e}")

def main():
    images = sorted(GELATO_DIR.rglob("*-2.webp"))
    print(f"Found {len(images)} detail images to optimise.\n")
    for img_path in images:
        process_image(img_path)
    print(f"\nDone – {len(images)} light versions created.")

if __name__ == "__main__":
    main()
