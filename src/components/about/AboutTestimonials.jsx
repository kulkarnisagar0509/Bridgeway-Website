import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { fadeUp, viewportOnce } from '../../lib/motion.jsx'
import 'swiper/css'
import 'swiper/css/pagination'

// About-page-specific testimonials — different students, a relationship/trust
// angle (fits an "about us" page), and gradient-initial avatars instead of
// photos so this section reads distinctly from the homepage testimonials.
const TESTIMONIALS = [
  {
    name: 'Rohan Verma',
    program: 'Data Analytics — Toronto',
    initials: 'RV',
    tone: 'from-navy-600 to-navy-800',
    rating: 5,
    review: 'Bridgewayz felt like a partner, not a service. Months after I arrived, they still checked in to make sure I was settling in. That kind of care is rare.',
  },
  {
    name: 'Lina Park',
    program: 'Hospitality Management — Vancouver',
    initials: 'LP',
    tone: 'from-orange-500 to-orange-600',
    rating: 5,
    review: 'What stood out was the honesty. They told me which programs weren\'t a fit for me — and saved me from a costly mistake before I even applied.',
  },
  {
    name: 'Tobi Adeyemi',
    program: 'Mechanical Engineering — Calgary',
    initials: 'TA',
    tone: 'from-navy-500 to-navy-700',
    rating: 5,
    review: 'The team stayed reachable at every step. I never waited more than a day for a reply, and during visa season that made all the difference.',
  },
  {
    name: 'Sara El-Sayed',
    program: 'Public Health — Montreal',
    initials: 'SE',
    tone: 'from-orange-400 to-orange-600',
    rating: 5,
    review: 'They guided my younger brother after me — same care, same patience. That\'s a real relationship, not a one-time transaction.',
  },
  {
    name: 'Kevin Nguyen',
    program: 'Software Development — Ottawa',
    initials: 'KN',
    tone: 'from-navy-600 to-navy-800',
    rating: 5,
    review: 'From the first call to my first day of class, someone at Bridgewayz had my back. I never felt alone in the process, not once.',
  },
]

function Stars({ n }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? 'fill-orange text-orange' : 'text-navy/15'}`} />
      ))}
    </div>
  )
}

export default function AboutTestimonials() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Student Voices"
          title="Why Students Stay With Bridgewayz"
          subtitle="We're measured not by the students we sign up, but by the ones who still call us years later."
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          grabCursor
          loop
          autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 18 },
            768: { slidesPerView: 1.6, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 28 },
          }}
          className="!pb-16 !pt-4"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-navy/8 bg-white p-7 shadow-premium">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange/10 text-orange">
                    <Quote className="h-6 w-6" />
                  </span>
                  <Stars n={t.rating} />
                </div>

                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/75 md:text-base">
                  "{t.review}"
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-navy/8 pt-5">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.tone} font-heading text-sm font-extrabold text-white shadow-md ring-2 ring-white`}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-ink/55">{t.program}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}