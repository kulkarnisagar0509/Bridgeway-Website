import { GraduationCap, ListChecks, Briefcase, FileText, Plane, Award } from 'lucide-react'

// Single source of truth for every service. The homepage Services grid and
// the /services/:slug detail page both read from here so copy never drifts.
export const SERVICES = [
  {
    slug: 'college-admissions',
    icon: GraduationCap,
    title: 'College Admissions',
    short: 'Find and secure your seat at the right Canadian college or university.',
    color: 'from-navy to-navy-600',
    featured: true,
    image: '/images/college-admissions.jpg',
    tagline: 'Your seat at the right Canadian institution — secured.',
    heroDesc:
      'From shortlisting colleges to confirming your offer, we make sure you apply where you’ll actually thrive — not just where the brochure looks good.',
    overview: [
      'Choosing where to study is the single biggest decision in your journey — and the one most students get wrong by chasing rankings instead of fit. We help you look beyond the brochure: entry requirements, program quality, location, cost, and real graduate outcomes.',
      'With direct partnerships across 50+ Canadian colleges and universities, we know what each admissions team actually looks for, and how to put your application in the strongest possible position.',
    ],
    includes: [
      { title: 'Institution Shortlisting', desc: 'A tailored list of colleges and universities that match your profile, budget, and goals.' },
      { title: 'Eligibility Checks', desc: 'A clear, honest assessment of where you qualify — and where you’d be a stretch.' },
      { title: 'Application Strategy', desc: 'Timing, rounds, and backup options so one rejection never ends your journey.' },
      { title: 'Offer Evaluation', desc: 'Help comparing your offers to choose the one that’s genuinely best for you.' },
    ],
    process: [
      { title: 'Profile Review', desc: 'We assess your academics, budget, and goals to define what “right fit” means for you.' },
      { title: 'Shortlist', desc: 'You receive a curated list of institutions with a clear reason for each one.' },
      { title: 'Apply', desc: 'We coordinate and submit applications strategically, tracking every deadline for you.' },
      { title: 'Choose', desc: 'We help you compare offers and confirm the seat that fits your future.' },
    ],
    faqs: [
      { q: 'Do you guarantee admission?', a: 'No ethical counselor can guarantee admission — it’s always the institution’s decision. What we guarantee is that every application is as strong, complete, and well-targeted as it can be.' },
      { q: 'How many institutions should I apply to?', a: 'Most students apply to 4–6. We recommend a balanced mix of aspirational, well-matched, and safe options so you’re never left without a seat.' },
      { q: 'Can you help with universities, not just colleges?', a: 'Yes. We work with both colleges and universities across Canada, from diploma programs to undergraduate and graduate degrees.' },
    ],
  },
  {
    slug: 'program-selection',
    icon: ListChecks,
    title: 'Program Selection',
    short: 'Match your interests and career goals to the best-fit programs.',
    color: 'from-orange to-orange-400',
    featured: false,
    image: '/images/program-selection.jfif',
    tagline: 'Match your goals to the program that actually fits.',
    heroDesc:
      'Stop guessing. We align your interests, strengths, and budget with programs that lead somewhere real.',
    overview: [
      'There are thousands of programs across Canada — and many that look similar on paper lead to very different careers. The right program isn’t the most popular one; it’s the one that fits your strengths, budget, and the future you want.',
      'We go deeper than course titles: we look at curriculum, outcomes, intakes, tuition, and post-graduation work eligibility so your choice is informed, not impulsive.',
    ],
    includes: [
      { title: 'Goal Mapping', desc: 'We connect your interests to real career outcomes before picking a program.' },
      { title: 'Curriculum Comparison', desc: 'Plain-language breakdowns of what each program actually teaches.' },
      { title: 'Intake & Duration Planning', desc: 'Choosing intakes that fit your timeline and visa strategy.' },
      { title: 'ROI Check', desc: 'Honest advice on tuition versus realistic earning potential after graduation.' },
    ],
    process: [
      { title: 'Discover Goals', desc: 'We learn what you enjoy, what you’re good at, and where you want to end up.' },
      { title: 'Narrow the Field', desc: 'We filter thousands of programs down to the ones that genuinely fit.' },
      { title: 'Compare Options', desc: 'You get a side-by-side comparison of curriculum, cost, and outcomes.' },
      { title: 'Decide', desc: 'We help you commit to a program with confidence — and a clear plan.' },
    ],
    faqs: [
      { q: 'What if I’m not sure what I want to study?', a: 'That’s common, and it’s exactly why this service exists. We use your interests and strengths to surface programs you may not have considered.' },
      { q: 'Do you consider post-study work options?', a: 'Always. Program eligibility for the Post-Graduation Work Permit (PGWP) is part of every recommendation we make.' },
      { q: 'Can I change my program later?', a: 'You can, though it can cost time and money. We help you choose well the first time to avoid that.' },
    ],
  },
  {
    slug: 'career-guidance',
    icon: Briefcase,
    title: 'Career Guidance',
    short: 'Plan a clear, future-ready career path aligned with your strengths.',
    color: 'from-navy-600 to-navy',
    featured: false,
    image: '/images/who-professional.jpg',
    tagline: 'A clear, future-ready career path — not a guess.',
    heroDesc:
      'We connect your strengths to real-world careers so your degree actually leads somewhere.',
    overview: [
      'A degree is only worth what it lets you do next. Too many students graduate into fields they never researched — then scramble to pivot. Career guidance up front turns your education into a deliberate step toward a career, not a hopeful one.',
      'We look at labor-market demand, your natural strengths, and the long-term path — then map the programs, certifications, and experiences that get you there.',
    ],
    includes: [
      { title: 'Strengths Assessment', desc: 'A structured look at what you’re naturally good at and motivated by.' },
      { title: 'Market Demand Check', desc: 'An honest read on which careers are growing in Canada and beyond.' },
      { title: 'Pathway Mapping', desc: 'The programs, skills, and experience that lead to your target role.' },
      { title: 'Long-Term Planning', desc: 'A multi-year view — not just “get admitted.”' },
    ],
    process: [
      { title: 'Assess', desc: 'We identify your strengths, interests, and constraints.' },
      { title: 'Research', desc: 'We map real career demand and entry routes in your target field.' },
      { title: 'Map the Path', desc: 'You get a step-by-step plan from today to your target role.' },
      { title: 'Align Programs', desc: 'We connect the plan to the right programs and institutions.' },
    ],
    faqs: [
      { q: 'Is this only for students who’ve chosen a career?', a: 'No — it’s especially useful when you haven’t. We help you decide before you commit years and tuition to a direction.' },
      { q: 'Do you help with careers after graduation?', a: 'Our focus is the education-to-career bridge: choosing programs that lead to real opportunities. We can point you to job-search and immigration partners for what comes after.' },
      { q: 'Will you tell me which career pays the most?', a: 'Earnings matter, and we share them — but fit and demand matter more. A high-paying field you dislike is a costly mistake.' },
    ],
  },
  {
    slug: 'application-assistance',
    icon: FileText,
    title: 'Application Assistance',
    short: 'Polished, complete applications that stand out to admissions teams.',
    color: 'from-orange-400 to-orange',
    featured: false,
    image: '/images/application-assistance.jpg',
    tagline: 'Applications that stand out — and get submitted on time.',
    heroDesc:
      'We turn a stressful, paperwork-heavy process into a clean, complete, compelling application.',
    overview: [
      'An application is more than forms — it’s the first impression an admissions team has of you. Small mistakes, missing documents, or weak statements of purpose quietly cost students offers they were qualified for.',
      'We handle the details that decide outcomes: document checklists, statement polishing, reference guidance, and deadline tracking — so your application is complete, correct, and compelling.',
    ],
    includes: [
      { title: 'Document Checklist', desc: 'A clear, personalized list of everything each application needs.' },
      { title: 'Statement of Purpose Review', desc: 'Feedback and polishing that keeps your voice while strengthening your case.' },
      { title: 'Reference Guidance', desc: 'Help choosing and preparing the right recommenders.' },
      { title: 'Deadline Tracking', desc: 'We keep every deadline visible so nothing slips.' },
    ],
    process: [
      { title: 'Gather', desc: 'We build your document checklist and timeline.' },
      { title: 'Draft', desc: 'You draft your statement; we review and refine it with you.' },
      { title: 'Assemble', desc: 'We ensure every piece is complete, correct, and properly formatted.' },
      { title: 'Submit', desc: 'We submit on time and confirm receipt with each institution.' },
    ],
    faqs: [
      { q: 'Do you write the statement of purpose for me?', a: 'No — it has to be yours to be authentic. We review, refine, and strengthen what you write so it’s clear and compelling without losing your voice.' },
      { q: 'What if I’m missing a document?', a: 'Our checklist is designed to prevent that. If something is genuinely unavailable, we advise on alternatives and how to explain the gap.' },
      { q: 'How early should I start?', a: 'Ideally 3–4 months before the deadline. Earlier is always better — strong applications take time.' },
    ],
  },
  {
    slug: 'visa-support',
    icon: Plane,
    title: 'Visa Support',
    short: 'End-to-end study permit guidance for a smooth, high-success filing.',
    color: 'from-navy to-navy-800',
    featured: false,
    image: '/images/visa-support.jpg',
    tagline: 'Study permit guidance built for a high-success filing.',
    heroDesc:
      'We guide your study-permit application end to end — so one filing gives you the best shot at approval.',
    overview: [
      'A study permit can make or break your plans — and most refusals come down to avoidable mistakes: unclear finances, weak letters, or incomplete files. We help you build a complete, well-supported application the first time.',
      'We don’t file on your behalf (only you can), but we prepare everything with you: documents, your explanation letter, and the strategy behind a credible, complete submission.',
    ],
    includes: [
      { title: 'Document Preparation', desc: 'A complete, verified checklist tailored to your case.' },
      { title: 'Financial Proof Guidance', desc: 'How to clearly show funds and the source of your income.' },
      { title: 'Explanation Letter', desc: 'Help writing a credible, clear letter of explanation.' },
      { title: 'Pre-Submission Review', desc: 'We review your full file before you submit.' },
    ],
    process: [
      { title: 'Assess', desc: 'We review your profile for visa strengths and risks.' },
      { title: 'Prepare', desc: 'We build your document set and explanation letter with you.' },
      { title: 'Review', desc: 'We go through the complete file before submission.' },
      { title: 'Submit', desc: 'You file the application; we track updates and guide next steps.' },
    ],
    faqs: [
      { q: 'Can you guarantee my visa will be approved?', a: 'No. The decision is the immigration officer’s. We maximize your chances by making sure the application is complete, credible, and well-supported.' },
      { q: 'Do you file the application for me?', a: 'No — Canadian study permits must be filed by the applicant. We prepare everything with you so filing is straightforward.' },
      { q: 'What if my visa is refused?', a: 'We help you understand the refusal reasons and advise on whether a reapplication makes sense — and how to strengthen it.' },
    ],
  },
  {
    slug: 'scholarship-guidance',
    icon: Award,
    title: 'Scholarship Guidance',
    short: 'Uncover funding opportunities and strengthen your scholarship case.',
    color: 'from-orange to-orange-600',
    featured: false,
    image: '/images/scholarship-guidance.jpg',
    tagline: 'Find funding — and build a case that wins it.',
    heroDesc:
      'Scholarships can cut thousands off your education. We help you find them and apply with a winning case.',
    overview: [
      'There’s more funding available than most students realize — but it’s scattered, competitive, and rarely applied for well. The students who win aren’t always the strongest; they’re the ones who found the right opportunities and presented a clear case.',
      'We map funding you’re actually eligible for, help you prioritize, and strengthen your applications so your effort goes where it has the best return.',
    ],
    includes: [
      { title: 'Funding Search', desc: 'We surface scholarships, grants, and bursaries you’re eligible for.' },
      { title: 'Eligibility Check', desc: 'Honest filtering so you don’t waste time on long shots.' },
      { title: 'Application Strengthening', desc: 'Help crafting essays and materials that make a clear case.' },
      { title: 'Priority Planning', desc: 'We sequence applications by deadline and likelihood of success.' },
    ],
    process: [
      { title: 'Search', desc: 'We map funding opportunities matched to your profile.' },
      { title: 'Prioritize', desc: 'We rank them by fit, value, and deadline.' },
      { title: 'Strengthen', desc: 'We help you build a compelling, well-evidenced application.' },
      { title: 'Submit & Track', desc: 'We track deadlines and outcomes with you.' },
    ],
    faqs: [
      { q: 'Are scholarships only for top students?', a: 'No. Many are based on background, country, field, or financial need — not just grades. We help you find the ones that fit you.' },
      { q: 'Can you guarantee I’ll win a scholarship?', a: 'No scholarship outcome is guaranteed. We improve your odds by targeting the right opportunities and strengthening how you apply.' },
      { q: 'Do you charge a percentage of the scholarship?', a: 'No. Our guidance is a flat service — your funding stays entirely yours.' },
    ],
  },
]

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)