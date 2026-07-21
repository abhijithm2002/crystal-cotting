import { useCallback, useEffect, useMemo, useState } from 'react'
import {
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

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [homepage, about, mainServices, secondaryServices, portfolio, testimonials, faq, contact, settings] =
        await Promise.all([
          getHomepage(),
          getAboutPage(),
          getServices({ category: 'main' }),
          getServices({ category: 'secondary' }),
          getPortfolio(),
          getTestimonials(),
          getFaq(),
          getContactPage(),
          getSettings(),
        ])

      setContent({
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
      setError(err.message || 'Could not load site content from the API.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const value = useMemo(
    () => ({ ...content, loading, error, reload: load }),
    [content, loading, error, load],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}
