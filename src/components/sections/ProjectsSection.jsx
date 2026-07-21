import { Button, Card, Chip, useOverlayState } from '@heroui/react'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { scaleIn, staggerContainer, viewport } from '../../utils/motion'
import { ProjectModal } from '../common/ProjectModal'
import { SectionHeading } from '../common/SectionHeading'

export function ProjectsSection() {
  const { homepage, portfolio } = useSiteContent()
  const intro = homepage?.projectsIntro || {}
  const projects = portfolio || []
  const [activeProject, setActiveProject] = useState(null)
  const modalState = useOverlayState({})

  function openProject(project) {
    setActiveProject(project)
    modalState.open()
  }

  if (!projects.length) return null

  return (
    <section id="projects" className="section-pad overflow-hidden bg-cloud">
      <div className="container-premium">
        <SectionHeading
          eyebrow={intro.eyebrow || 'Projects'}
          title={intro.title || 'Projects that prove the finish'}
          text={intro.text}
        />

        <motion.div
          className="mt-12 grid min-w-0 gap-7 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {projects.map((project) => {
            const images = (project.images?.length ? project.images : [project.coverImage]).filter(Boolean)
            return (
              <motion.div key={project._id || project.title} className="min-w-0" variants={scaleIn}>
                <Card className="group h-full min-w-0 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-premium">
                  <div className="relative aspect-[4/3] min-w-0 overflow-hidden">
                    <Swiper
                      className="absolute inset-0 h-full w-full min-w-0"
                      modules={[Autoplay, Navigation, Pagination]}
                      autoplay={{ delay: 2800, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      navigation
                      loop
                      lazyPreloadPrevNext={1}
                    >
                      {images.map((image) => (
                        <SwiperSlide key={`${project._id || project.title}-${image}`}>
                          <img
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            src={resolveMediaUrl(image)}
                            alt={project.title}
                            loading="lazy"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
                      <Chip className="bg-amber-cta px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-charcoal">
                        {project.category}
                      </Chip>
                      <Chip className="bg-charcoal/76 px-3 py-1 text-xs font-black text-white backdrop-blur">
                        {project.duration}
                      </Chip>
                    </div>
                  </div>
                  <Card.Content className="p-6">
                    <h3 className="text-2xl font-black leading-tight text-charcoal">{project.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={15} className="text-royal" />
                        {project.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={15} className="text-royal" />
                        {project.completionDate}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                    <Button
                      className="mt-6 min-h-11 rounded-full bg-royal px-5 text-sm font-black text-white transition hover:bg-royal-600"
                      onClick={() => openProject(project)}
                    >
                      View Project Details
                    </Button>
                  </Card.Content>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <ProjectModal project={activeProject} state={modalState} />
    </section>
  )
}
