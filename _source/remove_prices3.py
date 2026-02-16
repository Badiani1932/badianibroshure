import re

path = r'C:\Users\Mamabru\Documents\GitHub\Progetti\badiani1932B2B\badianibroshure\b2b\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# ══════════════════════════════════════════════════════════════
# 1) i18n TRANSLATIONS — remove b2b.torte.price / b2b.pezziduri.price lines
# ══════════════════════════════════════════════════════════════
lines = content.split('\n')
new_lines = []
for line in lines:
    s = line.strip()
    if re.match(r"'b2b\.(torte|pezziduri)\.price'\s*:\s*'[^']*'\s*,?\s*$", s):
        changes += 1
        continue
    new_lines.append(line)
content = '\n'.join(new_lines)

# ══════════════════════════════════════════════════════════════
# 2) VASCHE CATEGORY_DATA — ['Gusto', 'Prezzo per kg'] → ['Gusto']
#    and rows ['Name', '€XX.XX'] → ['Name']
# ══════════════════════════════════════════════════════════════
old = content.count("'Prezzo per kg'")
content = content.replace("columns: ['Gusto', 'Prezzo per kg'],", "columns: ['Gusto'],")
# rows: ['Bacio', '€12.00'] → ['Bacio']
content = re.sub(r"\['([^']+)',\s*'€\s*\d+[\.\,]?\d*/?\w*'\]", r"['\1']", content)
changes += old

# ══════════════════════════════════════════════════════════════
# 3) PEZZI DURI CATEGORY_DATA — remove 'Prezzo unità' column and price from rows
# ══════════════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Gusto', 'Prezzo unit\u00e0', 'Peso medio unit\u00e0', 'Ordine minimo*'],",
    "columns: ['Gusto', 'Peso medio unit\u00e0', 'Ordine minimo*'],")
# rows: ['Name', '€2.20', '90 g', '24'] → ['Name', '90 g', '24']
content = re.sub(
    r"\['([^']+)',\s*'€\s*\d+[\.\,]\d+',\s*'(\d+ g)',\s*'(\d+)'\]",
    r"['\1', '\2', '\3']",
    content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 4) CONI_COPPETTE / ACCESSORI / CONTENITORI — remove 'Prezzo' column and € from rows
# ══════════════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Prodotto', 'Descrizione', 'Quantit\u00e0', 'Prezzo'],",
    "columns: ['Prodotto', 'Descrizione', 'Quantit\u00e0'],")
# rows: ['Name', 'Desc', 'Qty', '€ 30.00'] → ['Name', 'Desc', 'Qty']
content = re.sub(
    r"\['([^']+)',\s*'([^']*)',\s*'([^']*)',\s*'€[^']*'\]",
    r"['\1', '\2', '\3']",
    content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 5) CATEGORY_COLUMNS_I18N — remove 'Prezzo per kg', 'Prezzo unità', 'Prezzo' entries
# ══════════════════════════════════════════════════════════════
content = re.sub(r",?\s*'Prezzo per kg'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Prezzo unit\u00e0'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Prezzo'\s*:\s*'[^']*'", '', content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 6) PRICING_NOTE_I18N — remove the const and getPricingNote function
# ══════════════════════════════════════════════════════════════
content = re.sub(
    r"\n\s*const PRICING_NOTE_I18N\s*=\s*\{[^}]+\};\s*\n",
    '\n',
    content)
content = re.sub(
    r"function getPricingNote\(\)\{[^}]+\}\s*\n",
    '\n',
    content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 7) renderCategoryContent — remove the pricing note section from sections array
# ══════════════════════════════════════════════════════════════
content = content.replace(
    "const sections = [\n          `<div class=\"modal__section\"><p class=\"modal__note\">${getPricingNote()}</p></div>`\n        ];",
    "const sections = [];")
changes += 1

# ══════════════════════════════════════════════════════════════
# 8) VASCHE BUTTON TEXTS — remove "price list" / "listino" wording
# ══════════════════════════════════════════════════════════════
content = content.replace("'b2b.gelato.vascheButton': 'Vasche: mostra listino',",
                          "'b2b.gelato.vascheButton': 'Vasche: lista gusti',")
content = content.replace("'b2b.gelato.vascheButton': 'Tubs: show price list',",
                          "'b2b.gelato.vascheButton': 'Tubs: flavour list',")
content = content.replace("'b2b.gelato.vascheButton': 'Bacs : afficher la liste',",
                          "'b2b.gelato.vascheButton': 'Bacs : liste des parfums',")
content = content.replace("'b2b.gelato.vascheButton': 'Cubas: ver lista',",
                          "'b2b.gelato.vascheButton': 'Cubas: lista de sabores',")
changes += 1

# ══════════════════════════════════════════════════════════════
# 9) renderTorteGallery — remove price references
# ══════════════════════════════════════════════════════════════
content = content.replace(
    "rows.forEach(([name, price]) => { torteDataMap[name] = { price }; });",
    "rows.forEach(([name]) => { torteDataMap[name] = {}; });")
# Remove price display in detail panel
content = re.sub(
    r'\s*<span><strong>\$\{t\(\'b2b\.torte\.price\'\)\}</strong><em>\$\{d\.price\}</em></span>\s*\n',
    '\n',
    content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 10) renderContenitoriGallery — remove price from destructuring
# ══════════════════════════════════════════════════════════════
content = content.replace(
    "rows.forEach(([name, desc, qty, price]) => { contDataMap[name] = { desc, qty, price }; });",
    "rows.forEach(([name, desc, qty]) => { contDataMap[name] = { desc, qty }; });")
changes += 1

# ══════════════════════════════════════════════════════════════
# 11) renderPezziDuriGallery — remove price from destructuring and card HTML
# ══════════════════════════════════════════════════════════════
content = content.replace(
    ".map(([name, price, weight, min]) => {",
    ".map(([name, weight, min]) => {")
content = content.replace(
    "return { name, price, weight, min, src };",
    "return { name, weight, min, src };")
content = content.replace(
    ".map(({ name, price, weight, min, src }) => {",
    ".map(({ name, weight, min, src }) => {")
# Remove pezzi duri price display line 
content = re.sub(
    r'\s*<span><strong>\$\{t\(\'b2b\.pezziduri\.price\'\)\}</strong><em>\$\{price\}</em></span>\s*\n',
    '\n',
    content)
changes += 1

# ══════════════════════════════════════════════════════════════
# 12) SHIPPING_INFO_I18N — remove price/IVA references from shipping text
# ══════════════════════════════════════════════════════════════
# IT
content = content.replace(
    "All'interno del comune di Firenze: costo di spedizione gratuita, il listino \u00e8 valido per minimo 250 EUR per ordine (IVA esclusa);",
    "All'interno del comune di Firenze: costo di spedizione gratuita;")
# EN 
content = content.replace(
    "Within the municipality of Florence: free shipping, the price list is valid for a minimum of EUR 250 per order (VAT excluded);",
    "Within the municipality of Florence: free shipping;")
# FR
content = content.replace(
    "Dans la commune de Florence : livraison gratuite, le tarif est valable pour un minimum de 250 EUR par commande (TVA exclue) ;",
    "Dans la commune de Florence : livraison gratuite ;")
# ES
content = content.replace(
    "Dentro del municipio de Florencia: env\u00edo gratuito, la lista de precios es v\u00e1lida para un m\u00ednimo de 250 EUR por pedido (IVA excluido);",
    "Dentro del municipio de Florencia: env\u00edo gratuito;")
changes += 1

# ══════════════════════════════════════════════════════════════
# WRITE FILE
# ══════════════════════════════════════════════════════════════
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Applied {changes} change groups.\n")

# ══════════════════════════════════════════════════════════════
# VERIFICATION
# ══════════════════════════════════════════════════════════════
remaining_euro = content.count('\u20ac')
print(f"Remaining \u20ac symbols: {remaining_euro}")

problems = []
for pattern in [r'[Pp]rezzo', r'[Pp]rezzi', r'\bprice\b', r'[Pp]rices', r'\bprix\b', r'[Pp]recio',
                r'IVA escl', r'VAT excl', r'hors TVA', r'\blistino\b', r'lista de precios']:
    for i, line in enumerate(content.split('\n'), 1):
        if re.search(pattern, line, re.IGNORECASE):
            s = line.strip()[:130]
            # Skip false positives
            if any(skip in s.lower() for skip in ['privacy', 'partita', 'cookie']):
                continue
            problems.append(f"  L{i} [{pattern}]: {s}")

if not problems:
    print("\n=== ALL PRICE REFERENCES REMOVED SUCCESSFULLY ===")
else:
    print(f"\n{len(problems)} remaining references:")
    for p in problems:
        print(p)
