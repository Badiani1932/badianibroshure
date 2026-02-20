export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: buildCorsHeaders(origin, env) });
    }

    if (request.method === 'GET' && requestUrl.pathname === '/health') {
      return jsonResponse({ ok: true, service: 'badiani-contact-api' }, 200, origin, env);
    }

    if (request.method !== 'POST' || requestUrl.pathname !== '/send') {
      return jsonResponse({ error: 'Not Found' }, 404, origin, env);
    }

    if (!isOriginAllowed(origin, env)) {
      return jsonResponse({ error: 'Origin not allowed' }, 403, origin, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, origin, env);
    }

    const subject = sanitizeOneLine((payload && payload.subject) || 'Richiesta contatto sito Badiani');
    const message = String((payload && (payload.message || payload.body)) || '').trim();

    if (!message) {
      return jsonResponse({ error: 'Missing message/body' }, 400, origin, env);
    }

    const toEmail = (env.MAIL_TO || '').trim();
    const fromEmail = (env.MAIL_FROM || '').trim();

    if (!toEmail || !fromEmail) {
      return jsonResponse({ error: 'MAIL_TO or MAIL_FROM not configured' }, 500, origin, env);
    }

    const requestId = crypto.randomUUID();
    const finalTextBody = buildCleanEmailBody(payload, message);
    const replyTo = inferReplyTo(payload);

    try {
      const accessToken = await getGoogleAccessToken(env);
      await sendGmail({
        accessToken,
        fromEmail,
        toEmail,
        subject,
        bodyText: finalTextBody,
        replyTo
      });

      return jsonResponse({ ok: true, requestId }, 200, origin, env);
    } catch (error) {
      console.error('send-email-error', (error && error.message) || error);
      return jsonResponse({ error: 'Email send failed', details: String((error && error.message) || error) }, 502, origin, env);
    }
  }
};

function sanitizeOneLine(input) {
  return String(input || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 200) || 'Richiesta contatto sito Badiani';
}

function buildCleanEmailBody(payload, fallbackMessage) {
  const lines = [];
  lines.push('Nuova richiesta dal sito Badiani');
  lines.push('');

  const source = sanitizeOneLine((payload && payload.source) || 'website');
  const formId = sanitizeOneLine((payload && payload.formId) || '');
  if (source && source !== 'website') lines.push(`Canale: ${source}`);
  if (formId) lines.push(`Form: ${formId}`);

  const data = extractBestData(payload);
  const entries = toDisplayEntries(data);
  if (entries.length) {
    if (lines[lines.length - 1] !== '') lines.push('');
    lines.push('Dettagli richiesta:');
    entries.forEach(({ label, value }) => {
      if (Array.isArray(value)) {
        if (!value.length) return;
        lines.push(`${label}:`);
        value.forEach((item) => lines.push(`- ${item}`));
      } else {
        lines.push(`${label}: ${value}`);
      }
    });
  }

  const extraMessage = sanitizeMessageForEmail(fallbackMessage);
  if (extraMessage) {
    if (lines[lines.length - 1] !== '') lines.push('');
    lines.push('Messaggio:');
    lines.push(extraMessage);
  }

  return lines.join('\n').trim();
}

function extractBestData(payload) {
  if (payload && payload.structured && typeof payload.structured === 'object') {
    return payload.structured;
  }

  if (payload && payload.fields && typeof payload.fields === 'object') {
    const normalized = {};
    Object.entries(payload.fields).forEach(([key, value]) => {
      const cleanKey = String(key || '').replace(/\[\]$/g, '');
      normalized[cleanKey] = value;
    });
    return normalized;
  }

  return {};
}

function toDisplayEntries(data) {
  const labelMap = {
    nome: 'Nome',
    cognome: 'Cognome',
    email: 'Email',
    telefono: 'Telefono',
    tipo: 'Azienda o Privato',
    azienda: 'Azienda',
    tipoAzienda: 'Tipo Attività',
    partitaIva: 'Partita IVA',
    preferenza: 'Preferenza di contatto',
    preferenzaContatto: 'Preferenza di contatto',
    data: 'Data evento',
    orario: 'Orario',
    persone: 'Numero persone',
    interesse: 'Interesse',
    extra: 'Opzioni extra',
    extras: 'Dettaglio opzioni extra',
    eventi: 'Evento di interesse',
    messaggio: 'Messaggio'
  };

  const priorityOrder = [
    'nome', 'cognome', 'email', 'telefono', 'tipo', 'azienda', 'tipoAzienda', 'partitaIva',
    'preferenzaContatto', 'preferenza', 'data', 'orario', 'persone', 'interesse', 'extra',
    'extras', 'eventi', 'messaggio'
  ];

  const used = new Set();
  const entries = [];

  priorityOrder.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(data, key)) return;
    const value = normalizeDisplayValue(data[key]);
    if (isEmptyValue(value)) return;
    entries.push({ label: labelMap[key] || key, value });
    used.add(key);
  });

  Object.entries(data).forEach(([key, rawValue]) => {
    if (used.has(key)) return;
    const value = normalizeDisplayValue(rawValue);
    if (isEmptyValue(value)) return;
    const fallbackLabel = labelMap[key] || key;
    entries.push({ label: fallbackLabel, value });
  });

  return entries;
}

function normalizeDisplayValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim())
      .filter(Boolean);
  }

  return String(value || '').trim();
}

function isEmptyValue(value) {
  if (Array.isArray(value)) return value.length === 0;
  return !String(value || '').trim();
}

function sanitizeMessageForEmail(message) {
  const raw = String(message || '').trim();
  if (!raw) return '';

  const cleaned = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^===/.test(line) && !/^---/.test(line))
    .join('\n')
    .trim();

  return cleaned;
}

function inferReplyTo(payload) {
  const fromStructured = payload && payload.structured ? payload.structured.email : '';
  if (fromStructured && typeof fromStructured === 'string' && fromStructured.includes('@')) return fromStructured.trim();

  const fields = payload && payload.fields ? payload.fields : null;
  if (fields && typeof fields === 'object') {
    const candidate = fields.email;
    if (typeof candidate === 'string' && candidate.includes('@')) return candidate.trim();
  }

  return '';
}

function safePretty(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

async function getGoogleAccessToken(env) {
  const clientId = (env.GOOGLE_CLIENT_ID || '').trim();
  const clientSecret = (env.GOOGLE_CLIENT_SECRET || '').trim();
  const refreshToken = (env.GOOGLE_REFRESH_TOKEN || '').trim();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }).toString()
  });

  const data = await response.json();
  if (!response.ok || !data || !data.access_token) {
    throw new Error(`Google OAuth token error: ${response.status} ${safePretty(data)}`);
  }

  return data.access_token;
}

async function sendGmail({ accessToken, fromEmail, toEmail, subject, bodyText, replyTo }) {
  const mime = buildMime({ fromEmail, toEmail, subject, bodyText, replyTo });
  const raw = toBase64Url(mime);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Gmail API error: ${response.status} ${safePretty(data)}`);
  }

  return data;
}

function buildMime({ fromEmail, toEmail, subject, bodyText, replyTo }) {
  const lines = [
    `From: Badiani Website <${fromEmail}>`,
    `To: ${toEmail}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit'
  ];

  if (replyTo) {
    lines.splice(2, 0, `Reply-To: ${replyTo}`);
  }

  lines.push('', bodyText || '');
  return lines.join('\r\n');
}

function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function isOriginAllowed(origin, env) {
  if (!origin) return true;

  const raw = (env.ALLOWED_ORIGIN || '').trim();
  if (!raw) return true;

  const allowed = raw.split(',').map((x) => x.trim()).filter(Boolean);
  if (allowed.includes('*')) return true;
  return allowed.includes(origin);
}

function buildCorsHeaders(origin, env) {
  const headers = new Headers();

  const raw = (env.ALLOWED_ORIGIN || '').trim();
  if (!raw) {
    headers.set('Access-Control-Allow-Origin', origin || '*');
  } else if (raw.includes('*')) {
    headers.set('Access-Control-Allow-Origin', '*');
  } else {
    const allowed = raw.split(',').map((x) => x.trim()).filter(Boolean);
    if (origin && allowed.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Vary', 'Origin');
    }
  }

  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

function jsonResponse(payload, status, origin, env) {
  const headers = buildCorsHeaders(origin, env);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(payload), { status, headers });
}
