// Shared form submission helper. Posts each form's data to the backend
// endpoint POST /api/forms/:formKey, which sends the form's own distinct
// email via SMTP (see server.js). If the backend is unreachable or the
// send fails, we fall back to opening the visitor's mail client
// (openMailto from mailto.js) so the lead is never lost.
import { openMailto } from './mailto.js'

// Empty = same origin (dev proxy / server.js). Set VITE_API_URL when the API is hosted separately.
const API_BASE = import.meta.env.VITE_API_URL || ''

/**
 * POST a form's data to the backend. Throws on any non-OK response.
 *
 * @param {string} formKey  Form type key registered in server.js
 *                          (FORM_EMAIL_CONFIG) — e.g. 'contact', 'consultation'.
 * @param {Object} data     Form field values.
 */
export async function submitForm(formKey, data) {
  const res = await fetch(`${API_BASE}/api/forms/${formKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(payload.error || `Request failed (${res.status})`)
  return payload
}

/**
 * Submit via the backend, falling back to the visitor's mail client if the
 * backend could not send (SMTP down, server unreachable, etc.).
 *
 * @param {Object} opts
 * @param {string} opts.formKey   Backend form type key (FORM_EMAIL_CONFIG).
 * @param {Object} opts.data      Form field values sent to the backend.
 * @param {string} opts.subject   Subject used by the mailto fallback.
 * @param {Array<[string, string]>} opts.fields  Ordered [label, value] pairs
 *                                               for the mailto fallback body.
 * @param {string} [opts.intro]   Opening line for the mailto fallback body.
 * @returns {Promise<'sent'|'fallback'>} 'sent' = delivered by the backend,
 *         'fallback' = visitor's mail client was opened instead.
 */
export async function submitWithFallback({ formKey, data, subject, fields = [], intro }) {
  try {
    await submitForm(formKey, data)
    return 'sent'
  } catch (err) {
    // Backend missing/misconfigured/failing — keep the lead via mailto.
    console.warn(`[forms] ${formKey} submission via API failed, falling back to mailto:`, err?.message || err)
    openMailto({ subject, fields, intro })
    return 'fallback'
  }
}

/**
 * Hidden honeypot field. Real users never see or fill it; bots do. The
 * backend silently drops submissions where it is filled. Render it inside
 * every public <form>.
 */
export function HoneyPotField() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ opacity: 0, position: 'absolute', left: '-9999px', height: 0, width: 0 }}
    />
  )
}