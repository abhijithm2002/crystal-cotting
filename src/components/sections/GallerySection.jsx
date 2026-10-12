import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { SectionHeading } from '../common/SectionHeading'

export function GallerySection() {
  const { gallery } = useSiteContent()
  if (!gallery?.length) return null
  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="container-premium">
        <SectionHeading eyebrow="Gallery" title="A closer look at our work" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(item => <a key={item._id} href={resolveMediaUrl(item.url)} target="_blank" rel="noreferrer"><img src={resolveMediaUrl(item.url)} alt={item.originalName || 'Our work'} loading="lazy" className="h-72 w-full rounded-2xl object-cover" /></a>)}
        </div>
      </div>
    </section>
  )
}
