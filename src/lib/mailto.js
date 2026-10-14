// Shared mailto helper. Builds a mailto: URL addressed to the company inbox
// with the submitted form data pre-filled into the subject and body, then
// opens the visitor's default email client. Used by every form on the site
// (contact form + consultation modal) so enquiries land in info@bridgewayz.ca.

export const COMPANY_EMAIL = 'info@bridgewayz.ca'

/**
 * Open the visitor's email client with a pre-filled message.
 *
 * @param {Object} opts
 * @param {string} [opts.to]        Recipient (defaults to the company inbox).
 * @param {string} opts.subject     Email subject line.
 * @param {Array<[string, string]>} opts.fields  Ordered [label, value] pairs
 *                                                rendered as the body.
 * @param {string} [opts.intro]     Optional opening line above the fields.
 */
export function openMailto({ to = COMPANY_EMAIL, subject, fields = [], intro }) {
  const lines = []
  if (intro) lines.push(intro, '')
  for (const [label, value] of fields) {
    lines.push(`${label}: ${value && value.trim() ? value : '—'}`)
  }
  lines.push('') // trailing blank line before nothing; keeps formatting tidy

  const body = lines.join('\r\n')
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  // Use a hidden anchor click so it works reliably inside React without
  // interfering with the router or triggering a page navigation.
  const link = document.createElement('a')
  link.href = url
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}