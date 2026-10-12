import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { FloatingActions } from '../components/common/FloatingActions'
import { QuoteModal } from '../components/common/QuoteModal'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { LeadProvider } from '../context/LeadContext'
import { SiteContentProvider } from '../context/SiteContentContext'
import { useSiteContent } from '../hooks/useSiteContent'
import { resolveMediaUrl } from '../services/api'

export function SiteLayout() {
  return (
    <SiteContentProvider>
      <LeadProvider>
        <SiteContentGate />
      </LeadProvider>
    </SiteContentProvider>
  )
}

function SiteContentGate() {
  const { loading, error, reload, settings } = useSiteContent()

  useEffect(() => {
    if (!settings) return

    for (const [key, variable] of Object.entries({ primary: '--color-royal', secondary: '--color-amber-cta', accent: '--color-orange-cta' })) {
      const color = settings.themeColors?.[key]
      if (color && CSS.supports('color', color)) document.documentElement.style.setProperty(variable, color)
      else document.documentElement.style.removeProperty(variable)
    }
    const seo = settings.seo || {}
    if (seo.defaultTitle || settings.siteName) {
      document.title = seo.defaultTitle || settings.siteName
    }
    setMetaTag('name', 'description', seo.defaultDescription)
    setMetaTag('name', 'keywords', seo.defaultKeywords)
    setMetaTag('property', 'og:title', seo.defaultTitle || settings.siteName)
    setMetaTag('property', 'og:description', seo.defaultDescription)
    setMetaTag('property', 'og:image', seo.ogImage ? resolveMediaUrl(seo.ogImage) : '')

    if (settings.favicon) {
      let link = document.querySelector('link[rel="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = resolveMediaUrl(settings.favicon)
    }
  }, [settings])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-charcoal">
        <div className="glass-panel h-24 w-full max-w-md animate-pulse rounded-[2rem]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center bg-charcoal px-4 text-center text-white">
        <div>
          <p className="text-lg font-black">Could not load the site right now.</p>
          <p className="mt-2 text-sm text-white/70">{error}</p>
          <button
            type="button"
            onClick={reload}
            className="mt-6 rounded-full bg-amber-cta px-6 py-3 text-sm font-black text-charcoal"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatingActions />
      <QuoteModal />
    </>
  )
}

function setMetaTag(attr, key, content) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`)
  if (!content) { tag?.remove(); return }
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
