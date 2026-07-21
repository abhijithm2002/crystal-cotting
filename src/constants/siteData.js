// Everything that used to live in this file (business info, services, projects,
// testimonials, FAQ, about content, stats, etc.) is now managed from the admin
// dashboard and fetched at runtime — see src/context/SiteContentContext.jsx and
// src/services/contentApi.js. See CONTENT_AUDIT_REPORT.md for the full mapping.
//
// The only thing left here is site navigation structure, which is not
// content — it's fixed anchor links into this single-page app.
export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
