---
name: no-duplicate-content-across-pages
description: Each page must have its own content and a distinct layout — don't reuse identical components/data/layouts across pages
metadata:
  type: feedback
---

When building a new page (e.g., the About page), do NOT reuse the same components, data, and layouts verbatim from other pages. Putting identical content (testimonials, CTA forms/copy, stats blocks) and identical layouts on every page creates a "bad copying" impression.

**Why:** The user explicitly objected to the About page reusing the homepage's `Testimonials` and `ConsultationCTA` components unchanged — same reviews, same form copy, same layout. It looks lazy and hurts the brand.

**How to apply:** For shared section types that appear on multiple pages (testimonials, CTA, feature grids, stats), create a page-specific variant with: (1) different data/copy, and (2) a visibly different layout treatment (different background, card arrangement, avatar style, etc.). Reuse design tokens and motion variants for consistency, but not the content or the exact composition. When a brief repeats the same section across pages, differentiate rather than duplicate.