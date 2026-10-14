// Single source of truth for the Privacy Policy and Terms of Service pages.
// Edit the copy here; the /privacy and /terms routes render from this file.

const LAST_UPDATED = 'August 13, 2026'

export const PRIVACY = {
  kind: 'privacy',
  title: 'Privacy Policy',
  intro:
    'Bridgewayz (“we”, “us”, “our”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. It applies to our website and the advisory services we provide to students exploring education in Canada.',
  sections: [
    {
      heading: 'Information We Collect',
      body: [
        'Contact details you give us voluntarily — such as your name, email address, phone number, and country of residence — typically through our consultation form, contact page, or when you email us directly.',
        'Academic and application-related details you share so we can advise you effectively, including your study background, target programs, institutions of interest, and budget.',
        'Technical information collected automatically when you visit our site, such as browser type, device, and approximate region, used to keep the site secure and working.',
      ],
    },
    {
      heading: 'How We Use Your Information',
      body: [
        'To respond to your enquiry, deliver advisory services, and guide you through program selection, applications, and visa support.',
        'To send you information you requested — such as intake deadlines, scholarship updates, or consultation reminders — and to keep records of our communications.',
        'To improve our website and services, and to meet legal, accounting, or regulatory obligations where applicable.',
      ],
    },
    {
      heading: 'How We Share Information',
      body: [
        'We do not sell your personal information. We share details only with institutions, partners, or service providers when needed to advance your application, and only to the extent necessary.',
        'We may disclose information when required by law or to protect the rights, safety, or property of Bridgewayz, our clients, or others.',
      ],
    },
    {
      heading: 'International Transfers',
      body: [
        'Because our clients study in Canada and often live elsewhere, your information may be processed across borders. We take reasonable steps to ensure it is handled consistently with this policy wherever it is processed.',
      ],
    },
    {
      heading: 'Data Retention',
      body: [
        'We keep your information for as long as your enquiry or engagement is active, and afterward only as long as needed to meet legal, accounting, or record-keeping obligations.',
      ],
    },
    {
      heading: 'Your Rights',
      body: [
        'You may request access to, correction of, or deletion of your personal information. You can also ask us to stop sending you communications at any time by following the unsubscribe link or replying to any email.',
        'To exercise any of these rights, contact us at info@bridgewayz.ca.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'We use reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure, but we work to keep your data safe.',
      ],
    },
    {
      heading: 'Changes to This Policy',
      body: [
        'We may update this policy from time to time. When we do, we will revise the “last updated” date above. Material changes will be communicated through our website or directly where appropriate.',
      ],
    },
  ],
}

export const TERMS = {
  kind: 'terms',
  title: 'Terms of Service',
  intro:
    'These Terms of Service govern your use of the Bridgewayz website and our advisory services. By using our site or engaging with us, you agree to the terms below. Please read them carefully.',
  sections: [
    {
      heading: 'Our Services',
      body: [
        'Bridgewayz provides advisory and guidance services for students exploring education in Canada, including program selection, application support, visa guidance, and scholarship information.',
        'We act as a guide and advocate on your behalf. Admissions decisions, visa decisions, and scholarship outcomes are made by institutions, immigration authorities, and funding bodies — not by us.',
      ],
    },
    {
      heading: 'No Guarantees',
      body: [
        'We do not guarantee admission to any institution, approval of any visa, or the awarding of any scholarship. Our commitment is to make every application as strong, complete, and well-targeted as possible.',
        'Outcomes depend on factors outside our control, including your qualifications, institutional policy, and immigration rules, which can change without notice.',
      ],
    },
    {
      heading: 'Your Responsibilities',
      body: [
        'You agree to provide accurate, truthful, and complete information and documents. Applications, statements, and visa filings must be authentic and your own.',
        'You are responsible for meeting deadlines you are given and for the decisions you make based on our guidance.',
      ],
    },
    {
      heading: 'Fees',
      body: [
        'Some of our services may carry fees, which will be communicated and agreed with you before any work begins. We do not charge a percentage of any scholarship you may receive — your funding stays yours.',
      ],
    },
    {
      heading: 'Intellectual Property',
      body: [
        'All content on this website — including text, graphics, logos, and design — is the property of Bridgewayz and may not be reproduced without our written permission, except for personal, non-commercial use.',
      ],
    },
    {
      heading: 'Third-Party Links',
      body: [
        'Our site may link to external websites we do not control. We are not responsible for the content, accuracy, or practices of those sites, and your use of them is at your own risk.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'To the fullest extent permitted by law, Bridgewayz is not liable for indirect or consequential losses arising from your use of our site or services. Our liability is limited to the fees you have paid us for the relevant service.',
      ],
    },
    {
      heading: 'Changes to These Terms',
      body: [
        'We may update these terms from time to time. Continued use of our site or services after changes are posted constitutes acceptance of the updated terms.',
      ],
    },
  ],
}

export const LEGAL_MAP = { privacy: PRIVACY, terms: TERMS }
export const LEGAL_LAST_UPDATED = LAST_UPDATED