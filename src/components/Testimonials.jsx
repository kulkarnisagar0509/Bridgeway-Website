import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { fadeUp, viewportOnce } from '../lib/motion.jsx'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const TESTIMONIALS = [
  {
    name: 'Aisha Rahman',
    program: 'Healthcare Administration — Toronto',
    avatar: '/images/avatar-1.jpg',
    color: '#003B8E',
    rating: 5,
    review: 'Bridgewayz made the entire process feel simple. From choosing my program to landing my visa, they were with me at every step. I never felt like just a number.',
  },
  {
    name: 'Daniel Okoye',
    program: 'Cyber Security Diploma — Vancouver',
    avatar: '/images/avatar-2.jpg',
    color: '#FF6B00',
    rating: 5,
    review: 'The team understood my career goals better than I did. They matched me with a program that fit perfectly and guided me through every application detail.',
  },
  {
    name: 'Priya Sharma',
    program: 'Business Management — Montreal',
    avatar: '/images/avatar-3.jpg',
    color: '#0069D7',
    rating: 5,
    review: 'Honestly the most professional consultants I spoke with. Transparent, responsive, and genuinely student-first. I got my admission in weeks, not months.',
  },
  {
    name: 'Mateo Silva',
    program: 'Information Technology — Calgary',
    avatar: '/images/avatar-4.jpg',
    color: '#111827',
    rating: 5,
    review: 'Their scholarship guidance saved me thousands. The application support was thorough and the visa filing went through without a single issue.',
  },
  {
    name: 'Grace Chen',
    program: 'Nursing — Ottawa',
    avatar: '/images/avatar-5.jpg',
    color: '#FF6B00',
    rating: 5,
    review: 'As an international student I was nervous, but Bridgewayz gave me confidence and a clear plan. Now I\'m studying nursing in Canada — dream achieved!',
  },
]

function Stars({ n }) {
  return (
    <div className="flex justify-center gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < n ? 'fill-orange text-orange' : 'text-navy/15'}`} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Student Stories"
          title="What Our Students Say"
          subtitle="Real students. Real journeys. Real results — hear from the people we've helped reach Canada."
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
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 140, modifier: 2.2, slideShadows: false }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 1.6, spaceBetween: 24 },
            1024: { slidesPerView: 2.1, spaceBetween: 32 },
          }}
          className="!pb-16 !pt-4"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto">
              <div className="mx-auto flex h-full max-w-xl flex-col items-center rounded-[2rem] border border-navy/8 bg-white p-7 text-center shadow-premium md:p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange/10 text-orange">
                  <Quote className="h-7 w-7" />
                </span>
                <div className="mt-5"><Stars n={t.rating} /></div>
                <p className="mt-5 text-balance text-lg font-medium leading-relaxed text-ink/75 md:text-xl">
                  "{t.review}"
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span
                    className="grid h-14 w-14 place-items-center overflow-hidden rounded-full shadow-md ring-2 ring-white"
                    style={{ background: t.color }}
                  >
                    <img src={t.avatar} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <div className="text-left">
                    <p className="text-base font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-ink/55">{t.program}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}