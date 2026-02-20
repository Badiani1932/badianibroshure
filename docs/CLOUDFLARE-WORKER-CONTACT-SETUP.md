# Cloudflare Worker Contact API (`/send`)

## Files added

- `cloudflare/contact-api-worker.js`
- `cloudflare/wrangler.toml`

## Worker endpoint

- `POST /send`
- `GET /health`

## Required secrets in Cloudflare Worker

Set these in **Worker > Settings > Variables and Secrets** as **Secret**:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`

Set as plaintext vars:

- `ALLOWED_ORIGIN` (example: `https://www.badiani1932.com`)
- `MAIL_TO` (`eventi@badiani1932.com`)
- `MAIL_FROM` (Google sender mailbox)

## Dashboard deploy (no CLI)

1. Open Worker `badiani-contact-api`
2. **Edit code**
3. Paste `cloudflare/contact-api-worker.js`
4. **Save and Deploy**
5. Add variables/secrets listed above

## Frontend expectation

Current frontend sends JSON to:

- `https://badianiapiwebmail.marco-bruzzi.workers.dev/send`

Payload includes:

- `source`, `formId`
- `subject`, `message`/`body`
- `fields` (raw form)
- `structured` (normalized data)

## Quick test with browser

1. Submit one form on site
2. Check DevTools > Network: request to `/send` returns `200`
3. Verify email arrived at `MAIL_TO`

## Common errors

- `403 Origin not allowed` → fix `ALLOWED_ORIGIN`
- `502 Email send failed` → check Google OAuth secrets / Gmail API permissions
- `404 Not Found` → ensure frontend uses `/send` path
