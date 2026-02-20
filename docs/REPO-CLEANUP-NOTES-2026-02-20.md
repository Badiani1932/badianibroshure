# Repo cleanup notes (2026-02-20)

## Cosa è stato fatto in sicurezza

- Rimossi file di backup `*.bak` nelle pagine eventi.
- Rimossi script temporanei usati solo per migrazione immagini.
- Consolidato uso immagini WebP nelle pagine richieste.
- Mantenuta compatibilità dei percorsi relativi esistenti.

## Verifiche eseguite

- Nessun errore editor su:
  - `index.html`
  - `eventi/index.html`
  - `eventi/saletta-privata-tosinghi/index.html`
  - `eventi/evento-esterno/index.html`
  - `b2b/index.html`
  - `magazine/index.html`

## Regole per cleanup futuri (anti-rottura)

1. Eliminare file immagine originali solo se:
   - esiste il corrispondente `.webp`, **e**
   - non esistono più riferimenti nel codice.
2. Separare i commit per tipologia:
   - `fix:` correzioni funzionali (es. percorsi font/asset)
   - `perf:` ottimizzazioni media (webp/compressione)
   - `chore:` pulizia file/script temporanei
3. Evitare refactor strutturali massivi in un solo passaggio.
4. Dopo ogni batch, rieseguire validazione pagine principali.

## Commit sequence consigliata

- `fix: align font preload paths to existing font assets`
- `perf: migrate requested page media refs to webp`
- `chore: remove obsolete backup and migration helper files`

## Nota operativa

Per una riorganizzazione più profonda (cartelle immagini/script/docs), procedere in una branch dedicata con migrazione a step e checkpoint di rollback tra uno step e il successivo.
