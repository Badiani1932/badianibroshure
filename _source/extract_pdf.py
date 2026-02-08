import os
import json
import fitz

BASE = r"C:\Users\Mamabru\Documents\GitHub\Progetti\Badiani 1932 B2B"
OUT = os.path.join(BASE, "pdf_extracted")
os.makedirs(OUT, exist_ok=True)

PDFS = [
    "090223_Brochure_16-9_Ristoranti.pdf",
    "110223_Brochure_eventi_.pdf",
]

summary = {}

for pdf in PDFS:
    doc = fitz.open(os.path.join(BASE, pdf))
    text_parts = []
    images = []

    for i, page in enumerate(doc):
        text_parts.append(page.get_text("text"))
        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha >= 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            img_name = f"{os.path.splitext(pdf)[0]}_p{i+1}_{img_index+1}.png"
            img_path = os.path.join(OUT, img_name)
            pix.save(img_path)
            images.append(img_name)

    summary[pdf] = {
        "text": "\n".join(text_parts),
        "images": images,
    }

with open(os.path.join(OUT, "summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)
