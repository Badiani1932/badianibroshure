#!/usr/bin/env python3
"""Remove all price references from b2b/index.html"""
import re

path = r'C:\Users\Mamabru\Documents\GitHub\Progetti\badiani1932B2B\badianibroshure\b2b\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# ═══════════════════════════════════════════════════════
# 1) VASCHE: remove price column, keep only flavor name
# ═══════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Gusto', 'Prezzo per kg'],",
    "columns: ['Gusto'],",
    1  # first occurrence = VASCHE
)
# Remove price value from each vasche row: ['Name', '€XX.XX'] → ['Name']
content = re.sub(
    r"(\['(?:Bacio|Banana|Buontalenti(?! [Cc])|Buontalenti Caramello|Buontalenti Delattosato|Buontalenti Fondente|Buontalenti Pistacchio|Caffè|Caramello al Burro Salato|Cassandra Delattosata|Cheesecake|Cioccolata(?! all)|Cioccolata all Arancia|Cioccoriso|Cocco|Cremino|La Dolcevita|Nocciola|Pistacchio|Sorbetto[^']*|Stracciatella(?! alla)|Stracciatella alla menta|Vaniglia|Yogurt)'), '€[^']*'\]",
    r"\1]",
    content
)
print('1) Vasche prices removed')

# ═══════════════════════════════════════════════════════
# 2) PEZZI DURI: remove Prezzo unità column
# ═══════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Gusto', 'Prezzo unità', 'Peso medio unità', 'Ordine minimo*'],",
    "columns: ['Gusto', 'Peso medio unità', 'Ordine minimo*'],",
)
# Remove price from each pezzi duri row: ['Name', '€X.XX', 'weight', 'min'] → ['Name', 'weight', 'min']
content = re.sub(
    r"(\['[^']+'), '€\d+\.\d+', ('(?:\d+ g)', '(?:\d+)'\])",
    r"\1, \2",
    content
)
print('2) Pezzi duri prices removed')

# ═══════════════════════════════════════════════════════
# 3) TORTE: remove price column
# ═══════════════════════════════════════════════════════
# Change columns
old_torte_cols = "columns: ['Gusto', 'Prezzo per kg'],"
# There are 2 occurrences (VASCHE already changed), this is the second
content = content.replace(
    old_torte_cols,
    "columns: ['Gusto'],",
    1  # remaining occurrence = TORTE
)
# Remove price from torte rows
content = re.sub(
    r"(\['Millefoglie[^']*'), '€[^']*'\]",
    r"\1]",
    content
)
print('3) Torte prices removed')

# ═══════════════════════════════════════════════════════
# 4) CONI_COPPETTE: remove Prezzo column
# ═══════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Prodotto', 'Descrizione', 'Quantità', 'Prezzo'],\n          rows: [\n            ['Sottozero',",
    "columns: ['Prodotto', 'Descrizione', 'Quantità'],\n          rows: [\n            ['Sottozero',",
)
# Remove price from coni rows
coni_items = ['Sottozero', 'Maxi 1', 'Maxi 2', 'Coni Gluten free (083)', 'Coni Gluten free (084)',
              'Bicchierini 16B', 'Bicchierini 108', 'Bicchierini 4C', 'Bicchierini 4CA']
for item in coni_items:
    escaped = re.escape(item)
    content = re.sub(
        r"(\['" + escaped + r"', '[^']+', '[^']+')\s*, '€[^']*'\]",
        r"\1]",
        content
    )
print('4) Coni & Coppette prices removed')

# ═══════════════════════════════════════════════════════
# 5) ACCESSORI: remove Prezzo column
# ═══════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Prodotto', 'Descrizione', 'Quantità', 'Prezzo'],\n          rows: [\n            ['Palettine',",
    "columns: ['Prodotto', 'Descrizione', 'Quantità'],\n          rows: [\n            ['Palettine',",
)
acc_items = ['Palettine', 'Cialdine', 'Tovagliolini stampati']
for item in acc_items:
    escaped = re.escape(item)
    content = re.sub(
        r"(\['" + escaped + r"', '[^']+', '[^']+')\s*, '€[^']*'\]",
        r"\1]",
        content
    )
print('5) Accessori prices removed')

# ═══════════════════════════════════════════════════════
# 6) CONTENITORI: remove Prezzo column
# ═══════════════════════════════════════════════════════
content = content.replace(
    "columns: ['Prodotto', 'Descrizione', 'Quantità', 'Prezzo'],\n          rows: [\n            ['RE-MAXIGEL 350',",
    "columns: ['Prodotto', 'Descrizione', 'Quantità'],\n          rows: [\n            ['RE-MAXIGEL 350',",
)
cont_items = ['RE-MAXIGEL 350', 'RE-MAGIGEL 500', 'RE-MAXIGEL 750', 'RE-MAXIGEL 1000', 'Contenitore polistirolo T2']
for item in cont_items:
    escaped = re.escape(item)
    content = re.sub(
        r"(\['" + escaped + r"', '[^']+', '[^']+')\s*, '€[^']*'\]",
        r"\1]",
        content
    )
print('6) Contenitori prices removed')

# ═══════════════════════════════════════════════════════
# 7) Remove price columns from CATEGORY_COLUMNS_I18N
# ═══════════════════════════════════════════════════════
# Remove 'Prezzo per kg' and 'Prezzo unità' and 'Prezzo' from translations
content = re.sub(r",?\s*'Prezzo per kg'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Prezzo unità'\s*:\s*'[^']*'", '', content)
# 'Prezzo': 'Prezzo' etc - be careful not to remove other things
content = re.sub(r",?\s*'Prezzo'\s*:\s*'(?:Prezzo|Price|Prix|Precio)'", '', content)
# English equivalents
content = re.sub(r",?\s*'Price per kg'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Unit Price'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Price'\s*:\s*'[^']*'", '', content)
# French
content = re.sub(r",?\s*'Prix au kg'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Prix unitaire'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Prix'\s*:\s*'[^']*'", '', content)
# Spanish
content = re.sub(r",?\s*'Precio por kg'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Precio unidad'\s*:\s*'[^']*'", '', content)
content = re.sub(r",?\s*'Precio'\s*:\s*'[^']*'", '', content)
print('7) Column translations cleaned')

# ═══════════════════════════════════════════════════════
# 8) Remove PRICING_NOTE_I18N and getPricingNote
# ═══════════════════════════════════════════════════════
content = re.sub(
    r"const PRICING_NOTE_I18N = \{[^}]+\};\s*",
    '',
    content
)
# Remove the pricing note render line in renderCategoryContent
content = content.replace(
    "const sections = [\n          `<div class=\"modal__section\"><p class=\"modal__note\">${getPricingNote()}</p></div>`\n        ];",
    "const sections = [];",
)
# Remove getPricingNote function
content = re.sub(
    r"\s*function getPricingNote\(\)\{[^}]+\}\s*",
    '\n',
    content
)
print('8) Pricing note removed')

# ═══════════════════════════════════════════════════════
# 9) Remove 'b2b.torte.price' from i18n translations
# ═══════════════════════════════════════════════════════
content = re.sub(r"\s*'b2b\.torte\.price'\s*:\s*'[^']*',?\s*", '\n', content)
print('9) b2b.torte.price translations removed')

# ═══════════════════════════════════════════════════════
# 10) Remove price from Pezzi Duri rendering
# ═══════════════════════════════════════════════════════
# renderPezziDuriGallery: .map(([name, price, weight, min]) → .map(([name, weight, min])
content = content.replace(
    ".map(([name, price, weight, min]) => {",
    ".map(([name, weight, min]) => {",
)
content = content.replace(
    "return { name, price, weight, min, src };",
    "return { name, weight, min, src };",
)
content = content.replace(
    ".map(({ name, price, weight, min, src }) => {",
    ".map(({ name, weight, min, src }) => {",
)
# Remove the price line from pezzi duri card template
content = content.replace(
    "<span><strong>Prezzo</strong><em>${price}</em></span>\n",
    "",
)
# alternative without newline
content = content.replace(
    "<span><strong>Prezzo</strong><em>${price}</em></span>",
    "",
)
print('10) Pezzi duri rendering prices removed')

# ═══════════════════════════════════════════════════════
# 11) Remove price from Torte rendering
# ═══════════════════════════════════════════════════════
# torteDataMap: rows.forEach(([name, price]) → rows.forEach(([name])
content = content.replace(
    "rows.forEach(([name, price]) => { torteDataMap[name] = { price }; });",
    "rows.forEach(([name]) => { torteDataMap[name] = {}; });",
)
# Remove the price display in torte detail panel
content = re.sub(
    r"\s*<span><strong>\$\{t\('b2b\.torte\.price'\)\}</strong><em>\$\{d\.price\}</em></span>\s*",
    "",
    content
)
print('11) Torte rendering prices removed')

# ═══════════════════════════════════════════════════════
# 12) Remove price from Contenitori rendering
# ═══════════════════════════════════════════════════════
# contDataMap: rows.forEach(([name, desc, qty, price]) → rows.forEach(([name, desc, qty])
content = content.replace(
    "rows.forEach(([name, desc, qty, price]) => { contDataMap[name] = { desc, qty, price }; });",
    "rows.forEach(([name, desc, qty]) => { contDataMap[name] = { desc, qty }; });",
)
print('12) Contenitori rendering prices removed')

# ═══════════════════════════════════════════════════════
# 13) Remove price-related shipping info (min EUR 250 etc)
# ═══════════════════════════════════════════════════════
# Update shipping info to remove price references
content = content.replace(
    "il listino è valido per minimo 250 EUR per ordine (IVA esclusa);",
    "il listino è valido su richiesta;",
)
content = content.replace(
    "the price list is valid for a minimum of EUR 250 per order (VAT excluded);",
    "the catalogue is available on request;",
)
content = content.replace(
    "le tarif est valable pour un minimum de 250 EUR par commande (TVA exclue) ;",
    "le catalogue est disponible sur demande ;",
)
content = content.replace(
    "la lista de precios es válida para un mínimo de 250 EUR por pedido (IVA excluido);",
    "el catálogo está disponible bajo solicitud;",
)
print('13) Shipping info price references removed')

# ═══════════════════════════════════════════════════════
# 14) Remove 'b2b.gelato.vascheButton' "show price list" references
# ═══════════════════════════════════════════════════════
content = content.replace("'b2b.gelato.vascheButton': 'Vasche: mostra listino',", "'b2b.gelato.vascheButton': 'Vasche: elenco gusti',")
content = content.replace("'b2b.gelato.vascheButton': 'Tubs: show price list',", "'b2b.gelato.vascheButton': 'Tubs: flavour list',")
content = content.replace("'b2b.gelato.vascheButton': 'Bacs : afficher la liste',", "'b2b.gelato.vascheButton': 'Bacs : liste des parfums',")
content = content.replace("'b2b.gelato.vascheButton': 'Cubas: ver lista',", "'b2b.gelato.vascheButton': 'Cubas: lista de sabores',")
print('14) Vasche button text updated')

# Write result
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n=== ALL PRICES REMOVED ===')

# Verify: check for remaining € symbols
remaining = [m.start() for m in re.finditer('€', content)]
print(f'Remaining € symbols: {len(remaining)}')
for pos in remaining[:10]:
    ctx = content[max(0,pos-30):pos+50]
    print(f'  ...{repr(ctx)}...')
