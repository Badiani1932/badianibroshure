import os
from PIL import Image

ROOT = r"C:/Users/Mamabru/Documents/GitHub/Progetti/badiani1932B2B/badianibroshure/assets/gelato"
WIDTH = 420
QUALITY = 80

converted = 0
for dirpath, _, filenames in os.walk(ROOT):
    for name in filenames:
        low = name.lower()
        if not low.endswith(".webp"):
            continue
        if low.endswith("-2.webp") or low.endswith("-thumb.webp"):
            continue
        src = os.path.join(dirpath, name)
        dst = os.path.splitext(src)[0] + "-thumb.webp"
        try:
            with Image.open(src) as im:
                w, h = im.size
                if w > WIDTH:
                    new_h = int(h * WIDTH / w)
                    im = im.resize((WIDTH, new_h), Image.LANCZOS)
                im.save(dst, "WEBP", quality=QUALITY, method=6)
            converted += 1
        except Exception as exc:
            print(f"Failed: {src} -> {exc}")

print(f"Created {converted} thumbnails.")
