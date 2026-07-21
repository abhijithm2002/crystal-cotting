import { useSiteContent } from '../../hooks/useSiteContent'
import { BeforeAfterSlider } from '../common/BeforeAfterSlider'
import { SectionHeading } from '../common/SectionHeading'

export function BeforeAfterSection() {
  const { homepage } = useSiteContent()
  const items = homepage?.beforeAfter || []

  if (!items.length) return null

  return (
    <section className="section-pad bg-white">
      <div className="container-premium">
        <SectionHeading
          align="center"
          eyebrow="Before & After"
          title="Transformations that make quality easy to see"
          text="Painting is visual. These comparison sliders help visitors understand the improvement before they ever call."
        />
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {items.map((item) => (
            <BeforeAfterSlider
              key={item.title}
              item={{ ...item, before: item.beforeImage, after: item.afterImage }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
