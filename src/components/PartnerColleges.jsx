import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { fadeUp, viewportOnce } from '../lib/motion.jsx'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'

const PARTNERS = [
  { name: 'Maple Leaf College', mark: 'ML', color: '#003B8E', location: 'Toronto, ON', desc: 'Healthcare & business programs with strong placement rates.' },
  { name: 'Northern Gate University', mark: 'NG', color: '#FF6B00', location: 'Vancouver, BC', desc: 'Leading technology and engineering research institution.' },
  { name: 'Crown Institute', mark: 'CI', color: '#0069D7', location: 'Montreal, QC', desc: 'Renowned for business management and finance pathways.' },
  { name: 'Pacific Tech Academy', mark: 'PT', color: '#111827', location: 'Calgary, AB', desc: 'Specialist in cyber security and skilled trades diplomas.' },
  { name: 'Lakeshore Business School', mark: 'LB', color: '#003B8E', location: 'Ottawa, ON', desc: 'Marketing, entrepreneurship and operations excellence.' },
  { name: 'Summit Health College', mark: 'SH', color: '#FF6B00', location: 'Halifax, NS', desc: 'Nursing, PSW and allied health career training.' },
  { name: 'Harbor Engineering Inst.', mark: 'HE', color: '#0069D7', location: 'Victoria, BC', desc: 'Civil, mechanical and industrial engineering programs.' },
  { name: 'Crestview Polytechnic', mark: 'CV', color: '#111827', location: 'Edmonton, AB', desc: 'AI, data science and applied technology diplomas.' },
]

function ShowcaseCard({ p }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium">
      {/* Animated gradient border on hover */}
      <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />
      {/* Top row: logo + location */}
      <div className="flex items-start justify-between">
        <span
          className="grid h-14 w-14 place-items-center rounded-xl font-heading text-lg font-extrabold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
          style={{ background: p.color }}
        >
          {p.mark}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-ink/55">
          <MapPin className="h-3 w-3 text-orange" />
          {p.location}
        </span>
      </div>
      {/* Name + description */}
      <h3 className="mt-5 font-heading text-base font-bold text-navy">{p.name}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{p.desc}</p>
      {/* Footer accent */}
      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Partner institution
        <span className="h-px flex-1 bg-gradient-to-r from-orange/40 to-transparent" />
      </div>
    </div>
  )
}

export default function PartnerColleges() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Partners"
          title="Trusted Canadian Institutions"
          subtitle="We work directly with leading colleges and universities across Canada to give our students a real admissions advantage."
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-8"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          grabCursor
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 22 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!px-5 !pb-14 sm:!px-8 lg:!px-[60px]"
        >
          {PARTNERS.map((p) => (
            <SwiperSlide key={p.name} className="!h-auto">
              <ShowcaseCard p={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <p className="container-px mt-2 text-center text-xs text-ink/40">
        Representative partner brands — updated partnerships available on request.
      </p>
    </section>
  )
}