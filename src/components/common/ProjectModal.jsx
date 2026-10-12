import { BeforeAfterSlider } from './BeforeAfterSlider'
import { Chip, Modal } from '@heroui/react'
import { CalendarDays, CheckCircle2, Clock3, MapPin, PackageCheck, X } from 'lucide-react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { resolveMediaUrl } from '../../services/api'

export function ProjectModal({ project, state }) {
  if (!project) return null

  const images = [...new Set([project.coverImage, ...(project.images || [])].filter(Boolean))]

  return (
    <Modal state={state}>
      <Modal.Trigger
        className="pointer-events-none fixed h-px w-px opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <Modal.Backdrop className="fixed inset-0 z-[120] bg-charcoal/82 p-4 backdrop-blur-xl">
        <Modal.Container
          size="5xl"
          placement="center"
          scroll="inside"
          className="mx-auto flex min-h-full max-w-6xl items-center justify-center"
        >
          <Modal.Dialog className="relative max-h-[92svh] w-full overflow-auto rounded-[1.8rem] border border-white/60 bg-white shadow-premium">
            <Modal.CloseTrigger className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/92 text-charcoal shadow-card backdrop-blur">
              <X size={20} aria-hidden="true" />
            </Modal.CloseTrigger>
            <Modal.Body className="p-0">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative min-h-[420px] bg-charcoal">
                  <Swiper
                    className="h-full"
                    modules={[Navigation, Pagination]}
                    navigation={images.length > 1}
                    pagination={images.length > 1 ? { clickable: true } : false}
                    loop={images.length > 1}
                  >
                    {images.map((image) => (
                      <SwiperSlide key={image}>
                        <img
                          className="h-[420px] w-full object-cover lg:h-full"
                          src={resolveMediaUrl(image)}
                          alt={project.title}
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Chip className="absolute left-5 top-5 z-10 bg-amber-cta px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-charcoal">
                    {project.category}
                  </Chip>
                </div>

                <div className="p-6 sm:p-8">
                  <Modal.Heading className="text-3xl font-black leading-tight text-charcoal">
                    {project.title}
                  </Modal.Heading>
                  <p className="mt-4 text-base leading-8 text-slate-600">{project.description}</p>

                  <div className="mt-6 grid gap-3">
                    <Meta icon={<MapPin size={18} />} label="Location" value={project.location} />
                    <Meta
                      icon={<CalendarDays size={18} />}
                      label="Completion"
                      value={project.completionDate}
                    />
                    <Meta icon={<Clock3 size={18} />} label="Duration" value={project.duration} />
                  </div>

                  <DetailList
                    className="mt-7"
                    icon={<PackageCheck size={18} />}
                    title="Materials Used"
                    items={project.materials || []}
                  />
                  <DetailList
                    className="mt-6"
                    icon={<CheckCircle2 size={18} />}
                    title="Services Performed"
                    items={project.services || []}
                  />
                </div>
              </div>
              {project.beforeImage && project.afterImage ? <div className="p-6"><BeforeAfterSlider item={{ title: project.title, before: project.beforeImage, after: project.afterImage, beforeLabel: 'Before', afterLabel: 'After' }} /></div> : null}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

function Meta({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-mist bg-cloud px-4 py-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-royal shadow-sm">
        {icon}
      </span>
      <span className="grid">
        <small className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          {label}
        </small>
        <strong className="text-sm font-black text-charcoal">{value}</strong>
      </span>
    </div>
  )
}

function DetailList({ icon, title, items, className = '' }) {
  return (
    <div className={className}>
      <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-royal">
        {icon}
        {title}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item} className="border border-royal/10 bg-royal-100 px-3 py-1 text-sm font-bold text-charcoal">
            {item}
          </Chip>
        ))}
      </div>
    </div>
  )
}
