// Bridgeway Website — backend server.
//
// Serves the built frontend (dist/) in production and exposes a generic form
// endpoint: every public form (contact, consultation, and any form type added
// later) posts to POST /api/forms/:formKey and sends its own distinct email
// (own subject, body and recipient) via a system-level SMTP transporter
// configured through the SMTP_* environment variables.
//
// The frontend calls /api/forms in dev through the Vite proxy (vite.config.js)
// and same-origin in production. If sending fails, the frontend falls back to
// opening the visitor's mail client (src/lib/mailto.js) so a lead is never lost.

import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// System-level SMTP (the site's own account — visitors are not logged in, so
// there are no per-user SMTP preferences here).
// ---------------------------------------------------------------------------
const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'no-reply@example.com'
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
const FORMS_TO_EMAIL = process.env.FORMS_TO_EMAIL || SMTP_USER || SMTP_FROM

let systemTransporter = null
function getSystemTransporter() {
  if (!SMTP_HOST) return null
  if (!systemTransporter) {
    systemTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    })
  }
  return systemTransporter
}

// ---------------------------------------------------------------------------
// Per-form email configuration registry.
// Adding a new form type = adding an entry here; the sending logic never
// changes. `fields` is also the allow-list of keys read from req.body.
// ---------------------------------------------------------------------------
const FORM_EMAIL_CONFIG = {
  contact: {
    label: 'Contact',
    to: FORMS_TO_EMAIL,
    subject: (d) => `New contact form submission from ${d.name || 'a visitor'}`,
    required: ['name', 'email', 'message'],
    fields: ['name', 'email', 'phone', 'interest', 'message'],
  },
  consultation: {
    label: 'Consultation',
    to: FORMS_TO_EMAIL,
    subject: (d) => `New consultation request: ${d.name || 'a visitor'}`,
    required: ['name', 'email', 'phone'],
    fields: ['name', 'email', 'phone', 'location', 'program', 'intake', 'message', 'source'],
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD_LENGTH = 5000
const HONEYPOT_FIELD = 'company' // hidden on the real forms; bots fill it

// HTML-escape user input before it goes into the html body.
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Build the plain-text and HTML email bodies from the form's configured fields.
function buildFormEmailBody(formKey, data) {
  const cfg = FORM_EMAIL_CONFIG[formKey]
  const rows = cfg.fields
    .filter((f) => data[f] != null && String(data[f]).trim() !== '')
    .map((f) => {
      const label = f.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
      return { label, val: String(data[f]) }
    })

  const text = rows.map((r) => `${r.label}: ${r.val}`).join('\n')
  const html = rows.map((r) => `<p><b>${esc(r.label)}:</b> ${esc(r.val)}</p>`).join('')
  return { text, html }
}

const app = express()
app.use(express.json({ limit: '64kb' }))

// Health check (also handy for uptime monitors on the hosting platform).
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, smtpConfigured: Boolean(SMTP_HOST) })
})

app.post('/api/forms/:formKey', async (req, res) => {
  const formKey = req.params.formKey
  const cfg = FORM_EMAIL_CONFIG[formKey]

  if (!cfg) {
    return res.status(404).json({ error: `Unknown form type: ${formKey}` })
  }

  const data = req.body || {}

  // Honeypot: real users never see this field, so a filled value means a bot.
  // Pretend success so bots don't learn anything.
  if (String(data[HONEYPOT_FIELD] || '').trim() !== '') {
    return res.json({ success: true, message: 'Thanks! Your submission has been sent.' })
  }

  const missing = cfg.required.filter((f) => !String(data[f] || '').trim())
  if (missing.length) {
    return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` })
  }

  const transporter = getSystemTransporter()
  if (!transporter) {
    console.error(`[${formKey}] SMTP_HOST is not configured on the server — cannot send form email`)
    return res.status(500).json({ error: 'Email service not configured' })
  }

  // Only copy the configured fields, and cap every value's length.
  const safeData = {}
  for (const f of cfg.fields) {
    safeData[f] = String(data[f] ?? '').slice(0, MAX_FIELD_LENGTH)
  }

  const { text, html } = buildFormEmailBody(formKey, safeData)

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: cfg.to,
      // replyTo only for well-formed emails — never pass raw user input
      // into an address header.
      replyTo: EMAIL_RE.test(safeData.email) ? safeData.email : undefined,
      subject: cfg.subject(safeData),
      text,
      html,
    })
  } catch (err) {
    console.error(`[${formKey}] Failed to send email:`, err.message)
    // 500 → the frontend falls back to opening the visitor's mail client.
    return res.status(500).json({ error: 'Could not send your submission. Please try again.' })
  }

  res.json({ success: true, message: 'Thanks! Your submission has been sent.' })
})

// ---------------------------------------------------------------------------
// Payments (Stripe Checkout). The visitor enters an amount on /payment, we
// create a hosted Checkout Session with the secret key, and the browser is
// redirected to Stripe. Card details never touch this server.
// ---------------------------------------------------------------------------
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''
const STRIPE_CURRENCY = (process.env.STRIPE_CURRENCY || 'cad').toLowerCase()
const PAYMENT_MIN = 1 // in major units (e.g. $1.00)
const PAYMENT_MAX = 50000

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null

app.get('/api/payments/config', (_req, res) => {
  res.json({
    enabled: Boolean(stripe),
    currency: STRIPE_CURRENCY,
    min: PAYMENT_MIN,
    max: PAYMENT_MAX,
  })
})

app.post('/api/payments/checkout', async (req, res) => {
  if (!stripe) {
    console.error('[payments] STRIPE_SECRET_KEY is not configured')
    return res.status(500).json({ error: 'Payments are not configured yet.' })
  }

  const { amount, name, email, description } = req.body || {}
  const value = Number(amount)
  if (!Number.isFinite(value) || value < PAYMENT_MIN || value > PAYMENT_MAX) {
    return res.status(400).json({ error: `Enter an amount between ${PAYMENT_MIN} and ${PAYMENT_MAX}.` })
  }
  // Stripe wants the smallest currency unit (cents).
  const unitAmount = Math.round(value * 100)

  const safeName = String(name || '').trim().slice(0, 200)
  const safeDesc = String(description || '').trim().slice(0, 500)
  const safeEmail = EMAIL_RE.test(String(email || '')) ? String(email) : undefined

  // Build return URLs from the request origin so it works in dev and prod.
  const origin = req.get('origin') || `${req.protocol}://${req.get('host')}`

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: safeEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: STRIPE_CURRENCY,
            unit_amount: unitAmount,
            product_data: {
              name: 'Bridgeway Payment',
              ...(safeDesc ? { description: safeDesc } : {}),
            },
          },
        },
      ],
      metadata: { payer_name: safeName, note: safeDesc },
      success_url: `${origin}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?status=cancelled`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('[payments] Failed to create checkout session:', err.message)
    res.status(500).json({ error: 'Could not start the payment. Please try again.' })
  }
})

// Confirms a finished Checkout Session for the success screen.
app.get('/api/payments/session/:id', async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Payments are not configured yet.' })
  try {
    const s = await stripe.checkout.sessions.retrieve(req.params.id)
    res.json({
      paid: s.payment_status === 'paid',
      amount: s.amount_total / 100,
      currency: s.currency,
      email: s.customer_details?.email || null,
    })
  } catch (err) {
    res.status(404).json({ error: 'Payment session not found.' })
  }
})

// ---------------------------------------------------------------------------
// Static frontend (production). `npm run build` outputs to dist/, and unknown
// non-API routes fall back to index.html so React Router deep links work.
// ---------------------------------------------------------------------------
const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, () => {
  console.log(`Bridgeway server listening on http://localhost:${PORT}`)
  if (!SMTP_HOST) console.warn('SMTP_HOST is not set — form submissions will fail until .env is configured.')
  if (!stripe) console.warn('STRIPE_SECRET_KEY is not set — the payment page will be disabled until .env is configured.')
})