import { useEffect, useState } from 'react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { SectionHeading } from '../common/SectionHeading'

export function GallerySection() {
  const { gallery } = useSiteContent()
  const [availableUrls, setAvailableUrls] = useState(new Set())

  useEffect(() => {
    let active = true
    const cleanups = []
    // Old records can outlive their files. Only show photos that actually load;
    // the next content refresh retries failures, including temporary outages.
    Promise.all((gallery || []).map(item => new Promise(resolve => {
      const image = new Image()
      const finish = available => {
        clearTimeout(timer)
        image.onload = image.onerror = null
        resolve(available ? item.url : null)
      }
      const timer = setTimeout(() => finish(false), 20000)
      image.onload = () => finish(true)
      image.onerror = () => finish(false)
      cleanups.push(() => finish(false))
      image.src = resolveMediaUrl(item.url)
    }))).then(urls => {
      if (active) setAvailableUrls(new Set(urls.filter(Boolean)))
    })
    return () => { active = false; cleanups.forEach(cleanup => cleanup()) }
  }, [gallery])

  const visible = (gallery || []).filter(item => availableUrls.has(item.url))
  if (!visible.length) return null
  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="container-premium">
        <SectionHeading eyebrow="Gallery" title="A closer look at our work" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(item => <a key={item._id} href={resolveMediaUrl(item.url)} target="_blank" rel="noreferrer"><img src={resolveMediaUrl(item.url)} alt="Painting and renovation project" onError={() => setAvailableUrls(current => { const next = new Set(current); next.delete(item.url); return next })} className="h-72 w-full rounded-2xl object-cover" /></a>)}
        </div>
      </div>
    </section>
  )
}
