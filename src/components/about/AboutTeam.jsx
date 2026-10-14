import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, UserRound } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { staggerContainer, itemFade, viewportOnce } from '../../lib/motion.jsx'

const TEAM = [
  {
    name: 'Aarav Mehta',
    role: 'Founder & CEO',
    bio: '20+ years in international education. Aarav founded Bridgewayz to bring honest, student-first counsel to global admissions.',
    tone: 'from-navy-600 to-navy-800',
  },
  {
    name: 'Sofia Almeida',
    role: 'Head of Admissions',
    bio: 'Former university admissions officer who now helps students present their strongest, most authentic applications.',
    tone: 'from-orange-500 to-orange-600',
  },
  {
    name: 'James Carter',
    role: 'Senior Education Advisor',
    bio: 'Specializes in career-focused program selection, matching each student to a path that fits their long-term goals.',
    tone: 'from-navy-500 to-navy-700',
  },
  {
    name: 'Maya Singh',
    role: 'Visa & Compliance Lead',
    bio: 'Guides students through visa filing and documentation with a meticulous, no-surprise process.',
    tone: 'from-orange-400 to-orange-600',
  },
]

const SOCIAL = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1KhZ9sAsew/?mibextid=wwXIfr' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bridgewayz.canada' },
  { Icon: Mail, label: 'Email', href: 'mailto:info@bridgewayz.ca' },
]

export default function AboutTeam() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our People"
          title="Meet The Team Behind Bridgewayz"
          subtitle="Experienced advisors who treat your journey as their own — committed to your success, not a transaction."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((m) => (
            <motion.article
              key={m.name}
              variants={itemFade}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white shadow-md shadow-navy/5 transition-shadow duration-300 hover:shadow-premium"
            >
              {/* Avatar — premium gradient placeholder */}
              <div className="relative aspect-[4/4] w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${m.tone}`} />
                <div className="absolute inset-0 bg-worldmap opacity-20" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-heading text-5xl font-extrabold text-white/90">
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>

                {/* Floating user mark */}
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                  <UserRound className="h-4 w-4" />
                </span>

                {/* Social reveal on hover */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-navy-900/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                  {SOCIAL.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={label === 'Email' ? undefined : '_blank'}
                      rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                      aria-label={`${m.name} on ${label}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-orange-gradient"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-navy">{m.name}</h3>
                <p className="text-sm font-semibold text-orange">{m.role}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{m.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}