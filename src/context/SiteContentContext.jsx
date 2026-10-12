import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  getGallery,
  getAboutPage,
  getContactPage,
  getFaq,
  getHomepage,
  getPortfolio,
  getServices,
  getSettings,
  getTestimonials,
} from '../services/contentApi'
import { SiteContentContext } from './siteContentContextCore'

const emptyContent = {
  gallery: [],
  homepage: null,
  about: null,
  services: { main: [], secondary: [] },
  portfolio: [],
  testimonials: [],
  faq: [],
  contact: null,
  settings: null,
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(emptyContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const inFlight = useRef(false)
  const loaded = useRef(false)

  const load = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    if (!loaded.current) setLoading(true)
    setError(null)
    try {
      const [homepage, about, mainServices, secondaryServices, portfolio, testimonials, faq, contact, settings, gallery] =
        await Promise.all([
          getHomepage(),
          getAboutPage(),
          getServices({ category: 'main', featured: true }),
          getServices({ category: 'secondary', featured: true }),
          getPortfolio({ featured: true }),
          getTestimonials({ featured: true }),
          getFaq(),
          getContactPage(),
          getSettings(),
          getGallery(),
        ])

      loaded.current = true
      setContent({
        gallery: gallery || [],
        homepage,
        about,
        services: { main: mainServices || [], secondary: secondaryServices || [] },
        portfolio: portfolio || [],
        testimonials: testimonials || [],
        faq: faq || [],
        contact,
        settings,
      })
    } catch (err) {
      if (!loaded.current) setError(err.message || 'Could not load site content from the API.')
    } finally {
      inFlight.current = false
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const refresh = () => { if (document.visibilityState === 'visible') load() }
    const timer = window.setInterval(refresh, 60000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [load])

  const value = useMemo(
    () => ({ ...content, loading, error, reload: load }),
    [content, loading, error, load],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}
