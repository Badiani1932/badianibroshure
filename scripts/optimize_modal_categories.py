#!/usr/bin/env python3
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ROOT / 'assets' / 'images' / 'categories' / 'wafer-pulsante.png',
    ROOT / 'assets' / 'images' / 'categories' / 'vasche.png',
    ROOT / 'assets' / 'images' / 'categories' / 'pezzi-duri.png',
    ROOT / 'assets' / 'images' / 'categories' / 'contenitori.png',
    ROOT / 'assets' / 'images' / 'categories' / 'torte.png',
    ROOT / 'assets' / 'images' / 'categories' / 'coni-coppette.png',
]

QUALITY = 72
MAX_WIDTH = 1400


def optimize(src: Path) -> tuple[float, float, Path]:
    dst = src.with_suffix('.webp')
    with Image.open(src) as im:
        if im.mode not in ('RGB', 'RGBA'):
            im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
        w, h = im.size
        if w > MAX_WIDTH:
            nh = int(h * (MAX_WIDTH / w))
            im = im.resize((MAX_WIDTH, nh), Image.Resampling.LANCZOS)
        im.save(dst, 'WEBP', quality=QUALITY, method=6)
    return src.stat().st_size / 1024, dst.stat().st_size / 1024, dst


def main() -> None:
    total_old = 0.0
    total_new = 0.0
    for src in TARGETS:
        if not src.exists():
            print(f'! missing: {src}')
            continue
        old_kb, new_kb, dst = optimize(src)
        total_old += old_kb
        total_new += new_kb
        gain = 100 - (new_kb / old_kb * 100) if old_kb else 0
        print(f'✓ {src.name}: {old_kb:.1f}KB -> {new_kb:.1f}KB ({gain:.1f}% smaller) => {dst.name}')

    if total_old:
        gain = 100 - (total_new / total_old * 100)
        print(f'\nTOTAL: {total_old:.1f}KB -> {total_new:.1f}KB ({gain:.1f}% smaller)')


if __name__ == '__main__':
    main()
