import re

path = r'C:\Users\Mamabru\Documents\GitHub\Progetti\badiani1932B2B\badianibroshure\b2b\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove b2b.pezziduri.price lines from all languages
content = re.sub(r"\s*'b2b\.pezziduri\.price'\s*:\s*'[^']*',?\n", "\n", content)
print("Removed b2b.pezziduri.price lines")

# Check for remaining price/prezzo references
for pattern in ['prezzo', 'prezzi', 'price', 'prices', 'prix', 'precio', 'precios', 'IVA escl', 'VAT excl', 'hors TVA']:
    matches = [(i+1, l.strip()[:100]) for i, l in enumerate(content.split('\n')) if pattern.lower() in l.lower()]
    if matches:
        for ln, txt in matches:
            print(f"  [{pattern}] L{ln}: {txt}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
