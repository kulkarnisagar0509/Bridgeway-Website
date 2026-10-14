# Bridgewayz — Education Consultancy Website

A premium, modern, fully responsive marketing homepage for **Bridgewayz**, a Canadian education consultancy. Built to feel like a top international consulting brand: trust-first, conversion-focused, smooth, and accessible.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom brand theme: navy `#003B8E`, orange `#FF6B00`)
- **Framer Motion** — scroll reveals, parallax, floating cards, micro-interactions
- **Lucide React** — icon set
- **Swiper** — testimonial slider (autoplay, pagination, navigation, loop)
- **React CountUp** — animated statistics counters
- **React Intersection Observer** patterns (custom `useInViewOnce` hook)
- Fonts: **Poppins** (headings) + **Inter** (body) via Google Fonts

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build to /dist
npm run preview # preview the production build
```

## Project Structure

```
src/
├─ main.jsx                  # entry
├─ App.jsx                   # assembles all sections
├─ index.css                 # Tailwind layers + global styles
├─ context/ModalContext.jsx  # consultation modal open/close state
├─ lib/motion.jsx            # shared Framer Motion variants + useInViewOnce
└─ components/
   ├─ Navbar.jsx             # sticky, transparent→solid, dropdown, mobile menu
   ├─ Hero.jsx               # two-column, floating cards, parallax, trust row
   ├─ Stats.jsx              # count-up glassmorphism cards
   ├─ WhyChooseUs.jsx        # 4 premium cards w/ hover lift + border glow
   ├─ AboutPreview.jsx       # two-column with parallax image + features
   ├─ Services.jsx           # 6 core services grid
   ├─ AreasOfStudy.jsx        # 12 study-area cards w/ hover scale
   ├─ HowItWorks.jsx          # 6-step animated timeline
   ├─ PartnerColleges.jsx    # infinite auto-scroll logo marquee
   ├─ WhoWeHelp.jsx           # 4 audience cards
   ├─ Testimonials.jsx       # Swiper slider w/ ratings + autoplay
   ├─ ConsultationCTA.jsx     # orange gradient conversion band
   ├─ Footer.jsx             # 4-column footer
   ├─ ConsultationModal.jsx   # full form w/ validation, loading, success
   ├─ ScrollProgress.jsx     # top scroll-progress bar
   ├─ SectionHeading.jsx     # reusable eyebrow+title+subtitle
   └─ Logo.jsx               # wordmark + bridge glyph
```

## Features

- **Sticky navbar** — transparent over hero, solid white on scroll, Services dropdown, animated mobile hamburger menu, "Book Consultation" CTA wired to the modal.
- **Hero** — badge, orange-gradient highlighted headline, dual CTAs, trust row, floating stat cards with parallax + idle float animation.
- **Animated stats** — count-up triggered on scroll into view (5,000+ students, 50+ institutions, 98% visa, 10+ years).
- **Glassmorphism** stat cards, hover lift throughout.
- **Timeline** with an animated connecting line that fills as you scroll.
- **Marquee** partner carousel — infinite loop, pauses on hover, grayscale→color on hover.
- **Consultation modal** — fields: Full Name, Email, Phone, Current Location, Interested Program, Preferred Intake, Message. Inline validation, loading state, success state, Escape-to-close, body scroll lock, focus management.
- **Scroll progress indicator** at the top.
- **SEO** — title/description/keywords, Open Graph, Twitter card, JSON-LD `EducationalOrganization`, canonical.
- **Accessibility** — semantic landmarks, aria-labels on icon buttons, labeled form fields, focusable modal, reduced-motion-friendly (animations are subtle and transform/opacity based).
- **Mobile-first responsive** at 320–767 / 768–1024 / 1025+ breakpoints; no horizontal overflow.

## Notes

- All imagery is generated with CSS/SVG (gradients, icons, avatars) so there are no external image dependencies to fetch. Swap in real photography by replacing the placeholder blocks in `Hero.jsx` and `AboutPreview.jsx`.
- The consultation form submission is simulated (`setTimeout`). Wire `onSubmit` in `ConsultationModal.jsx` to your real API/email endpoint.
- Partner college names are representative placeholders in `PartnerColleges.jsx` — replace with real partner logos when available.

## Build

`npm run build` outputs a static, optimized bundle to `dist/` (~139 kB JS gzipped, ~10 kB CSS gzipped).