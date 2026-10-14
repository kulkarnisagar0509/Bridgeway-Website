import { motion } from 'framer-motion'
import { Target, Eye, Heart, Shield, Gem, Users2, Award, Handshake } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { staggerContainer, itemFade, fadeUp, viewportOnce } from '../../lib/motion.jsx'

const VALUES = [
  { icon: Shield, label: 'Integrity' },
  { icon: Gem, label: 'Transparency' },
  { icon: Users2, label: 'Student First Approach' },
  { icon: Award, label: 'Excellence' },
  { icon: Handshake, label: 'Long-Term Relationships' },
]

const CARDS = [
  {
    icon: Target, eyebrow: 'Mission',
    text: 'Helping students achieve their educational goals through expert guidance and personalized support.',
  },
  {
    icon: Eye, eyebrow: 'Vision',
    text: 'To become a trusted global education partner empowering students to build successful futures.',
  },
]

export default function AboutMvv() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-16 lg:py-20">
      {/* Soft gradient + blobs to make glass cards pop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />
        <div className="absolute right-[-6%] top-1/3 h-80 w-80 rounded-full bg-orange/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container-px relative">
        <SectionHeading
          eyebrow="What Drives Us"
          title="Our Mission, Vision & Values"
          subtitle="The principles behind every recommendation we make and every student we guide."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {CARDS.map(({ icon: Icon, eyebrow, text }) => (
            <motion.div
              key={eyebrow}
              variants={itemFade}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-premium backdrop-blur-xl"
            >
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-[2rem]" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                className="grid h-16 w-16 place-items-center rounded-2xl bg-orange-gradient text-white shadow-lg"
              >
                <Icon className="h-8 w-8" />
              </motion.div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-navy">
                {eyebrow}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values card — full width */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="group relative mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-premium backdrop-blur-xl"
        >
          <span className="border-gradient pointer-events-none absolute inset-0 rounded-[2rem]" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-xs">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-gradient text-white shadow-lg"
              >
                <Heart className="h-8 w-8" />
              </motion.div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Values
              </span>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                The standards that shape every student relationship we build.
              </p>
            </div>

            <motion.ul
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl"
            >
              {VALUES.map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={itemFade}
                  className="flex items-center gap-3 rounded-2xl border border-navy/8 bg-white/70 p-3.5 text-sm font-semibold text-navy backdrop-blur-sm transition-colors hover:border-orange/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/8 text-navy transition-colors group-hover:bg-orange-gradient group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}