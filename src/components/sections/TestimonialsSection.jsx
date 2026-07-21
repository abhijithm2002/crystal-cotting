import { Card } from '@heroui/react'
import { MapPin, Quote, Star } from 'lucide-react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { SectionHeading } from '../common/SectionHeading'

export function TestimonialsSection() {
  const { homepage, testimonials } = useSiteContent()
  const intro = homepage?.testimonialsIntro || {}
  const items = testimonials || []

  if (!items.length) return null

  return (
    <section className="section-pad bg-gradient-to-b from-cloud to-white">
      <div className="container-premium">
        <SectionHeading
          eyebrow={intro.eyebrow || 'Testimonials'}
          title={intro.title || 'What our customers say'}
          text={intro.text}
        />

        <Swiper
          className="mt-12 !pb-12"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3600, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={22}
          slidesPerView={1}
          breakpoints={{
            780: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item._id || item.name}>
              <Card className="h-full rounded-[1.6rem] border border-white/80 bg-white/82 p-6 shadow-card backdrop-blur-xl">
                <Card.Content className="p-0">
                  <Quote className="text-royal/20" size={42} />
                  <div className="mt-4 flex gap-1 text-amber-cta">
                    {Array.from({ length: item.rating || 0 }).map((_, index) => (
                      <Star key={`${item.name}-${index}`} size={17} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-5 min-h-32 text-base leading-8 text-slate-600">{item.review}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-mist pt-5">
                    {item.image ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={resolveMediaUrl(item.image)}
                        alt={item.name}
                      />
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-royal to-royal-600 text-lg font-black text-white">
                        {item.initials || item.name?.charAt(0)}
                      </span>
                    )}
                    <span>
                      <strong className="block font-black text-charcoal">{item.name}</strong>
                      <small className="mt-1 flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        <MapPin size={13} />
                        {item.location}
                      </small>
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
