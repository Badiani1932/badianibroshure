# Asset Audit Report — Badiani 1932 B2B Brochure Site

**Date:** 2025-07-11  
**Scope:** All file/image/asset references across the entire `badianibroshure/` project  
**Files scanned:** 9 HTML, 3 JS modules, 1 CSS file

---

## Table of Contents

1. [Broken / Missing References](#1-broken--missing-references)
2. [Orphaned Files (never referenced)](#2-orphaned-files)
3. [Asset Reference Map (per source file)](#3-asset-reference-map)
4. [Root-Level Source Documents](#4-root-level-source-documents)
5. [Folder Structure Issues](#5-folder-structure-issues)
6. [Recommendations](#6-recommendations)

---

## 1. Broken / Missing References

### ❌ CONFIRMED MISSING (4 files)

| Referenced Path | Referenced By | Issue |
|---|---|---|
| `fonts/SuperGroteskB-CdMed.woff2` | `assets/badiani-common.css` | Only `.woff` exists in `fonts/`. The `.woff2` (preferred format) is missing. |
| `fonts/SuperGroteskA-Rg[7511].woff2` | `assets/badiani-common.css` | Only `.woff` exists in `fonts/`. The `.woff2` variant is missing. |
| `inspiration/1220.mp4` | `inspiration/index.html` | Video file does not exist anywhere in the project. |
| `inspiration/videospesa.mp4` | `inspiration/index.html` | Video file does not exist anywhere in the project. |

> **Impact:** The two missing `.woff2` fonts have `.woff` fallbacks, so text still renders but with slightly larger downloads. The two missing `.mp4` videos will show broken video players on the inspiration page.

### ✅ All other references verified

- **27 gelato flavors** × 4 image variants each (base, -2, -thumb, -2-light) = **108 gelato images** — ALL PRESENT
- **7 pdf_extracted category images** (vasche, torte, pezziduri, coppette, gelati tenda, wafer-pulsante, contenitori) — ALL PRESENT
- **9 foto_pezziduri images** — ALL PRESENT
- **6 foto_torte2 images** — ALL PRESENT
- **5 eventi/foto eventi root photos** (1–5.jpg) — ALL PRESENT
- **2 eventi subdir photos** (Steve Madden MICAM/DSC01280.JPG, Steve Madden Pitti/DSC09319.jpg) — ALL PRESENT
- **3 brochure-italia images** (p13_2, p14_2, p15_2) — ALL PRESENT
- **Logo webp** (f473fa…) — present in both `assets/extracted/` and `inspiration/assets/extracted/`
- **All inspiration images** (classico, dolcevita, pistacchio, top-*, freezer-prodotti, mission, vision, worldwide, *-open, barattolo-tab) — ALL PRESENT in both `inspiration/` and `inspiration/mobile/`

### ℹ️ Font File Comparison

| Directory | .woff | .woff2 | .otf |
|---|---|---|---|
| `fonts/` (root) | SuperGroteskA ✅, SuperGroteskB ✅ | ❌ BOTH MISSING | — |
| `inspiration/fonts/` | SuperGroteskA ✅, SuperGroteskB ✅ | SuperGroteskA ✅, SuperGroteskB ✅ | SuperGroteskC ✅ |
| `inspiration/mobile/fonts/` | SuperGroteskA ✅, SuperGroteskB ✅ | SuperGroteskA ✅, SuperGroteskB ✅ | SuperGroteskC ✅ |

**Fix:** Copy the `.woff2` files from `inspiration/fonts/` to `fonts/`.

---

## 2. Orphaned Files

### 🔴 Entire folders never referenced

| Folder | Files | Notes |
|---|---|---|
| `foto_torte/` | 8 PNG files | Superseded by `foto_torte2/` (WEBP versions). No page references `foto_torte/`. |
| `eventi/foto eventi/Artigianato a Palazzo/` | 12 JPG files | No page references any image from this folder. |
| `inspiration/mobile/assets/audio/` | Empty directory | No audio files and no audio references anywhere. |

### 🟠 Individual orphaned files

#### `assets/` (root)
| File | Status |
|---|---|
| `assets/i18n.js` | ORPHANED — No page imports this. Pages use `inspiration/assets/i18n.js` or `src/i18n/i18n.js` instead. |
| `assets/barattolo-tab.webp` | ORPHANED — Only inspiration pages reference `barattolo-tab.webp`, but their relative paths resolve to `inspiration/assets/barattolo-tab.webp` and `inspiration/mobile/assets/barattolo-tab.webp`. |
| `assets/extracted/Tosinghi.png` | ORPHANED — Not referenced by any HTML or JS file. |
| `assets/extracted/a7a56600…webp` | ORPHANED in main `assets/extracted/`. Only referenced by inspiration pages which use their own copy at `inspiration/assets/extracted/`. |

#### `assets/extracted/brochure-italia/` — 28 of 31 orphaned
Only 3 files are referenced (by `eventi/evento-esterno/index.html`):
- ✅ `brochure-italia_p13_2.png`
- ✅ `brochure-italia_p14_2.png`
- ✅ `brochure-italia_p15_2.png`

**Orphaned (28 files):** `_p1_1`, `_p2_1`, `_p2_2`, `_p3_1`, `_p4_1`, `_p4_2`, `_p5_1`, `_p5_2`, `_p6_1`, `_p7_1`, `_p7_2`, `_p8_1`, `_p9_1`, `_p10_1`, `_p11_1`, `_p12_1`, `_p12_2`, `_p13_1`, `_p14_1`, `_p15_1`, `_p16_1`, `_p16_2`, `_p17_1`, `_p18_1`, `_p19_1`, `_p20_1`, `_p21_1`, `_p22_1`

#### `pdf_extracted/` — ~53 of 60 orphaned
Only 7 image files are referenced (by `b2b/index.html` as category card backgrounds):
- ✅ `vasche.png`, `torte.png`, `pezziduri.png`, `coppette.png`, `gelati tenda.png`, `wafer-pulsante.png`, `contenitori.png`

Also present: `summary.json` (build artifact from `extract_pdf.py`)

**Orphaned (~53 files):** All `110223_Brochure_eventi__p*` PNGs, plus `backgroung gelati.png`, `chocolate.png`, `gelato.png`, `gelatovan.png`, `group-barattoli.webp`, `hezelnut.png`, `mano con gelati.png`, `pinguini.png`, `semifreddi.png`

#### `eventi/foto eventi/` — partial
| File/Folder | Status |
|---|---|
| `IMG_3529.HEIC`, `IMG_3563.HEIC` | Raw iPhone photos, never referenced |
| `Steve Madden MICAM/` — 8 of 9 files orphaned | Only `DSC01280.JPG` referenced |
| `Steve Madden Pitti/` — 3 of 4 files orphaned | Only `DSC09319.jpg` referenced |

#### `inspiration/` root — 2 files orphaned
| File | Status |
|---|---|
| `group-barattoli.webp` | Not referenced by any page |
| `group-barattoli-2.webp` | Not referenced by any page |

Same two files exist in `inspiration/mobile/` and are also orphaned there.

#### `inspiration/` — `CNAME` file
Contains deployment config (`badiani.it` or similar). Not an asset issue.

---

## 3. Asset Reference Map

### `index.html` (root homepage)
| Type | Path |
|---|---|
| CSS | `./assets/badiani-common.css` |
| Image (logo) | `assets/extracted/f473fa4a…webp` (×2) |
| Image | `assets/worldwide.webp` |
| CSS bg | `assets/extracted/5a21d37f…webp` |
| CSS bg | `assets/extracted/1b2a5cc6…webp` |
| Video | `home-b2b.mp4` |
| Links | `eventi/`, `b2b/`, `magazine/` |

### `b2b/index.html` (2741 lines — main product catalog)
| Type | Path |
|---|---|
| CSS | `../assets/badiani-common.css` |
| Image (logo) | `../assets/extracted/f473fa4a…webp` |
| JS module | `../data/gelatoFlavors.js?v=20260207` |
| JS module | `../src/i18n/i18n.js` |
| CSS bg (×7) | `../pdf_extracted/{vasche,torte,pezziduri,coppette,gelati tenda,wafer-pulsante,contenitori}.png` |
| JS images (×9) | `../foto_pezziduri/{bianco,stracciatella,biscotto,cuore,pinguino tondo,pinguino1 bianco,rosa,pistacchio ,zampetta}.png` |
| JS images (×6) | `../foto_torte2/{millefoglie buontalenti,la dolcevita,buontalenti pistacchio} {s,L}.webp` |
| Dynamic (×108) | 27 gelato flavors § `../assets/gelato/<Flavor>/<name>{.webp,-2.webp,-thumb.webp,-2-light.webp}` |

### `eventi/index.html`
| Type | Path |
|---|---|
| CSS | `../assets/badiani-common.css` |
| Image (logo) | `../assets/extracted/f473fa4a…webp` |
| Image | `./foto eventi/4.jpg` |
| Image | `./foto eventi/Steve Madden MICAM/DSC01280.JPG` |
| Image | `../assets/extracted/gelatovan.png` |
| Image | `./foto eventi/Steve Madden Pitti/DSC09319.jpg` |
| CSS bg | `../assets/extracted/1b2a5cc6…webp` |
| Links | `./saletta-privata-tosinghi/`, `./evento-esterno/`, `../`, `../b2b/` |

### `eventi/evento-esterno/index.html`
| Type | Path |
|---|---|
| CSS | `../../assets/badiani-common.css` |
| Image (logo) | `../../assets/extracted/f473fa4a…webp` |
| CSS bg | `../../assets/extracted/1b2a5cc6…webp` |
| Modal images (×3) | `../../assets/extracted/brochure-italia/brochure-italia_{p13_2,p14_2,p15_2}.png` |

### `eventi/saletta-privata-tosinghi/index.html`
| Type | Path |
|---|---|
| CSS | `../../assets/badiani-common.css` |
| Image (logo) | `../../assets/extracted/f473fa4a…webp` |
| CSS bg | `../../assets/extracted/1b2a5cc6…webp` |
| Gallery (×5) | `../foto eventi/{1,2,3,4,5}.jpg` |

### `eventi/speciale-aziende/index.html`
| Type | Path |
|---|---|
| CSS | `../../assets/badiani-common.css` |
| Image (logo) | `../../assets/extracted/f473fa4a…webp` |
| _(no other assets — placeholder page)_ | |

### `magazine/index.html`
| Type | Path |
|---|---|
| CSS | `../assets/badiani-common.css` |
| Image (logo) | `../assets/extracted/f473fa4a…webp` |
| _(minimal page, no other assets)_ | |

### `inspiration/index.html`
| Type | Path |
|---|---|
| JS | `assets/i18n.js` (→ `inspiration/assets/i18n.js`) |
| Fonts (×5) | `fonts/SuperGroteskA…{woff,woff2}`, `SuperGroteskB…{woff,woff2}`, `SuperGroteskC…otf` |
| CSS bg (×3) | `assets/extracted/{a7a5…,5a21…,1b2a…}.webp` |
| CSS bg | `assets/barattolo-tab.webp` (×2) |
| Images | `mission.webp`, `vision.webp`, `worldwide.webp` |
| Images | `classico.webp`, `dolcevita.webp`, `pistacchio.webp` |
| Images | `top-classico.webp`, `top-dolcevita.webp`, `top-pistacchio.webp` |
| Images | `freezer-prodotti.webp` |
| JS images | `classico-open.webp`, `dolcevita-open.webp`, `pistacchio-open.webp` |
| Image (logo) | `assets/extracted/f473fa4a…webp` |
| Video ❌ | `1220.mp4` — **MISSING** |
| Video ❌ | `videospesa.mp4` — **MISSING** |

### `inspiration/mobile/index.html`
| Type | Path |
|---|---|
| JS | `../assets/i18n.js` (→ `inspiration/assets/i18n.js`) |
| Fonts (×5) | `fonts/SuperGroteskA…{woff,woff2}`, `SuperGroteskB…{woff,woff2}`, `SuperGroteskC…otf` |
| CSS bg (×3) | `assets/extracted/{a7a5…,5a21…,1b2a…}.webp` |
| CSS bg | `assets/barattolo-tab.webp` (×3) |
| Images | `mission.webp`, `vision.webp`, `worldwide.webp` |
| Images | `classico.webp`, `dolcevita.webp`, `pistacchio.webp` |
| Images | `top-classico.webp`, `top-dolcevita.webp`, `top-pistacchio.webp` |
| Images | `freezer-prodotti.webp` |
| JS images | `classico-open.webp`, `dolcevita-open.webp`, `pistacchio-open.webp` |
| Image (logo) | `assets/extracted/f473fa4a…webp` |
| Video ❌ | `../1220.mp4` (→ `inspiration/1220.mp4`) — **MISSING** |

### `assets/badiani-common.css`
| Type | Path |
|---|---|
| Font | `../fonts/SuperGroteskB-CdMed.woff2` ❌ MISSING |
| Font | `../fonts/SuperGroteskB-CdMed.woff` ✅ |
| Font | `../fonts/SuperGroteskA-Rg[7511].woff2` ❌ MISSING |
| Font | `../fonts/SuperGroteskA-Rg[7511].woff` ✅ |

### `data/gelatoFlavors.js`
27 flavors, each with `image` and `detailImage`. All 54 paths verified ✅.  
Runtime also generates `-thumb.webp` and `-2-light.webp` variants — all 54 additional variants verified ✅.

---

## 4. Root-Level Source Documents

These are source/working files, not web assets. Consider moving them out of the web-served directory:

| File | Purpose |
|---|---|
| `B2B Categories.xlsx` | Product category data source |
| `Badiani - Listino clienti B2B 2026.docx` | B2B client price list 2026 |
| `Brochure ITALIA.pdf` | Italy brochure source PDF |
| `Rassegne stampa.docx` | Press review document |
| `extract_pdf.py` | Build script for extracting PDF images |

---

## 5. Folder Structure Issues

### A. Duplicated assets across inspiration paths
`inspiration/` and `inspiration/mobile/` each have **their own copies** of:
- 14 image files (classico, dolcevita, pistacchio, top-*, freezer-prodotti, mission, vision, worldwide, *-open, group-barattoli, group-barattoli-2)
- A complete `fonts/` folder (5 files each)
- An `assets/` folder with `barattolo-tab.webp` + `extracted/` subfolder

**Total duplication:** ~7 MB of identical files. Both could share one set via relative paths.

### B. Image scatter across multiple top-level folders
Product images are spread across 5 different directories:
- `assets/gelato/` — gelato flavor photos (108 files)
- `foto_pezziduri/` — pezzi duri product photos (9 files)
- `foto_torte2/` — cake product photos (6 files)
- `pdf_extracted/` — category card background images (7 used, ~53 orphaned)
- `assets/extracted/brochure-italia/` — brochure page scans (3 used, 28 orphaned)

Consider consolidating into a cleaner structure (e.g., `assets/products/`).

### C. Superseded folder still present
`foto_torte/` contains 8 PNG files that were replaced by the 6 WEBP files in `foto_torte2/`. The old folder is completely unreferenced.

### D. Spaces, special characters, and encoding in paths
Several referenced paths contain spaces and special characters that require URL encoding:
- `foto_pezziduri/pistacchio .png` (trailing space before extension)
- `foto_pezziduri/pinguino tondo.png`, `pinguino1 bianco.png`
- `foto_torte2/millefoglie buontalenti L.webp`
- `foto eventi/Steve Madden MICAM/…`
- `pdf_extracted/gelati tenda.png`
- Gelato folders with accented chars: `Caffè`, `Tiramisù`
- Gelato folders with apostrophe encoding: `Buontalenti all_Amarena` (uses `_` for `'`)

### E. Hash-named extracted files
Four assets use hex hash filenames (`f473fa4a…webp`, `5a21d37f…webp`, etc.) — output from `extract_pdf.py`. These are hard to identify at a glance and exist as duplicates (main `assets/extracted/` + `inspiration/assets/extracted/` + `inspiration/mobile/assets/extracted/`).

---

## 6. Recommendations

### Critical (broken functionality)
1. **Add missing videos** — Provide `inspiration/1220.mp4` and `inspiration/videospesa.mp4`, or remove the `<video>` references from `inspiration/index.html` and `inspiration/mobile/index.html`.
2. **Copy missing .woff2 fonts** — Copy `SuperGroteskA-Rg[7511].woff2` and `SuperGroteskB-CdMed.woff2` from `inspiration/fonts/` to `fonts/` for proper font loading on all main site pages.

### Cleanup (reduce bloat)
3. **Delete `foto_torte/`** — Entirely superseded by `foto_torte2/`. (Saves 8 files)
4. **Delete orphaned `pdf_extracted/` files** — Remove the ~53 unused `110223_Brochure_eventi__p*` PNGs and other unused extracts. (Saves ~50+ files)
5. **Delete orphaned `brochure-italia/` files** — Remove the 28 unreferenced brochure page scans. (Saves 28 files)
6. **Clean up `eventi/foto eventi/`** — Remove HEIC raw photos and archive the unreferenced `Artigianato a Palazzo/` and extra Steve Madden photos if not planned for future use. (Saves ~25 files)
7. **Remove `assets/Tosinghi.png`** — Unreferenced by any page.
8. **Remove root `assets/i18n.js`** and **`assets/barattolo-tab.webp`** — Orphaned duplicates of files used only from `inspiration/assets/`.
9. **Remove `inspiration/group-barattoli.webp`** and **`group-barattoli-2.webp`** from both `inspiration/` and `inspiration/mobile/`. (4 files total)

### Architecture
10. **Move source documents out** — Relocate `.xlsx`, `.docx`, `.pdf`, and `.py` from the web root into a `_source/` or `docs/` folder (or exclude from deployment).
11. **Deduplicate inspiration/mobile assets** — Both `inspiration/` and `inspiration/mobile/` carry identical copies of ~20 files. Restructure to share common assets via `../` or a shared folder.
12. **Consolidate image folders** — Consider merging `foto_pezziduri/`, `foto_torte2/`, and the relevant `pdf_extracted/` images under a unified `assets/products/` directory.
13. **Rename hash-based files** — The 4 hash-named `.webp` files in `assets/extracted/` would be easier to maintain with descriptive names (e.g., `logo.webp`, `heritage-bg.webp`, `dark-bg.webp`).

---

## Summary Statistics

| Category | Count |
|---|---|
| Total files audited | ~300+ |
| Broken references | **4** (2 fonts, 2 videos) |
| Verified references | ~180 (all images, CSS, JS modules) |
| Orphaned files | **~120** |
| Duplicate file sets | ~20 files (inspiration / inspiration/mobile) |
| Root source documents | 5 (non-web files in web root) |
