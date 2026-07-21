import { AboutSection } from '../components/sections/AboutSection'
import { BeforeAfterSection } from '../components/sections/BeforeAfterSection'
import { ContactSection } from '../components/sections/ContactSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { StatsSection } from '../components/sections/StatsSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { WhyChooseSection } from '../components/sections/WhyChooseSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <ProjectsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
