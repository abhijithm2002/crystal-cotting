# Crystal Coat Website — Hardcoded Content Audit

Scope: `crystal-cotting` (Crystal Coat Painting & Renovation), a single-page React app (Vite). All page "sections" listed in the admin sidebar spec (Home, About, Services, Contact, etc.) are anchor sections inside one route (`/`), not separate pages. This report catalogs every hardcoded image and editable text found, and the DB field / API endpoint that will replace it.

Source of truth today: `src/constants/siteData.js`, plus a few literals inline in components (`Header.jsx`, `Footer.jsx`, `HeroSection.jsx`, `AboutSection.jsx`, `index.html`).

Full schema/endpoint definitions live in `API_CONTRACT.md` (same repo root). This report maps old → new.

## 1. Global / Site Settings

| File path | Component | Hardcoded value | DB field | Endpoint |
|---|---|---|---|---|
| `src/components/layout/Header.jsx:36`, `Footer.jsx:18` | Header, Footer | `/assets/logo-crystal-coat-white.jpg` | `Settings.logo` | `GET /api/settings` |
| `public/favicon.svg`, `index.html:23` | — | favicon.svg | `Settings.favicon` | `GET /api/settings` |
| `src/constants/siteData.js:31` | business.name | "Crystal Coat Painting & Renovation" | `Settings.siteName` | `GET /api/settings` |
| `index.html:8,12,17-21,27-46` | meta/OG/JSON-LD | description, keywords, og:title, og:description, og:image | `Settings.seo.{defaultTitle,defaultDescription,defaultKeywords,ogImage}` | `GET /api/settings` |
| `Footer.jsx:82-83` | Footer | copyright text, tagline text | `Settings.footerText` | `GET /api/settings` |

## 2. Homepage — Hero (`HeroSection.jsx`)

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| line 17 | bg image `/assets/exterior-home-front.jpg` | `Homepage.hero.backgroundImage` | `GET /api/homepage` |
| line 30-32 | Chip text "Professional Painting Specialists" | `Homepage.hero.eyebrow` | " |
| line 33-35 | Badge = `business.tagline` | `Homepage.hero.badgeText` | " |
| line 42 | H1 "Professional Painting & Renovation Services You Can Trust" | `Homepage.hero.title` | " |
| line 44-51 | paragraph copy | `Homepage.hero.subtitle` | " |
| line 54-62 | 3 button labels + links (Get Free Quote / WhatsApp / Call) | `Homepage.hero.buttons[]{text,link,type}` | " |
| line 66 | chip list `['Interior Painting', ...]` | `Homepage.hero.highlightTags[]` | " |
| line 84-88 | "Free Site Visit" badge text | `Homepage.hero.floatingBadgeText` | " |
| line 92 | side image `/assets/blue-texture-wall.jpg` | `Homepage.hero.sideImage` | " |
| line 103-106 | "Quality in Every Coat" title+text | `Homepage.hero.sideCaption{title,text}` | " |
| `siteData.js:59-64` | `heroStats[]` (label, value, icon) x4 | `Homepage.heroStats[]{label,value,icon}` | " |

## 3. Homepage — Stats Strip (`StatsSection.jsx`)

| `siteData.js:248-253` | `stats[]` (value, suffix, label) x4 | `Homepage.stats[]{value,suffix,label}` | `GET /api/homepage` |

## 4. Homepage — Featured Services (`ServicesSection.jsx`)

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| lines 12-15 | section eyebrow/title/text | `Homepage.servicesIntro{eyebrow,title,text}` | `GET /api/homepage` |
| `siteData.js:66-99` | `mainServices[]` — title, description, **image**, icon, accent gradient | `Service{isFeatured:true, category:'main'}` docs | `GET /api/services?featured=true` |
| `siteData.js:101-110` | `secondaryServices[]` — title, icon | `Service{category:'secondary'}` docs | `GET /api/services?category=secondary` |
| line 96 | static text "Available as part of complete home improvement..." | `Service.description` (per secondary service) | same |
| line 103-105 | Chip text "Painting remains the primary service..." | `Homepage.servicesIntro.note` | `GET /api/homepage` |

## 5. Homepage — Why Choose Us (`WhyChooseSection.jsx`)

| `siteData.js:112-143` | `whyChoose[]` — title, text, icon x6 | `Homepage.whyChoose[]{title,text,icon}` | `GET /api/homepage` |
| lines 12-15 | section intro copy | `Homepage.whyChooseIntro{eyebrow,title,text}` | " |
| lines 49-59 | "Premium Promise" banner (eyebrow, title, paragraph) | `Homepage.premiumPromise{eyebrow,title,text}` | " |

## 6. Homepage — Featured Projects (`ProjectsSection.jsx`)

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| lines 24-27 | section intro copy | `Homepage.projectsIntro{eyebrow,title,text}` | `GET /api/homepage` |
| `siteData.js:145-202` | `projects[]` — title, location, category, completionDate, duration, **cover image**, **images[] gallery**, description, materials[], services[] | `Portfolio` collection (full CRUD) | `GET /api/portfolio` |

Note: Homepage shows featured/recent portfolio items; `Portfolio.isFeatured` (or "show first N") controls what renders here — no data duplication.

## 7. Homepage — Before / After (`BeforeAfterSection.jsx`)

| `siteData.js:204-219` | `beforeAfterItems[]` — title, beforeLabel, afterLabel, **before image**, **after image** x2 | `Homepage.beforeAfter[]{title,beforeLabel,afterLabel,beforeImage,afterImage}` | `GET /api/homepage` |

## 8. Homepage — Testimonials Preview (`TestimonialsSection.jsx`)

| lines 12-15 | section intro copy | `Homepage.testimonialsIntro{eyebrow,title,text}` | `GET /api/homepage` |
| `siteData.js:221-246` | `testimonials[]` — name, location, rating, initials, **image (none currently — add field)**, review | `Testimonial` collection (full CRUD) | `GET /api/testimonials` |

## 9. Homepage — Footer (`Footer.jsx`)

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| line 18 | logo image | `Settings.logo` | `GET /api/settings` |
| lines 21-24 | description paragraph | `Homepage.footer.description` | `GET /api/homepage` |
| `siteData.js:44-48` | `business.socials[]` (label, href) | `Homepage.footer.socials[]` | " |
| `siteData.js:34-43` | phone, whatsapp, email, address, hours | `Homepage.footer.{phone,whatsapp,email,address,hours}` (mirrors `ContactPage`) | " |
| lines 82-83 | copyright / strapline | `Settings.footerText` | `GET /api/settings` |

## 10. About Section (`AboutSection.jsx`) → Admin "About Page"

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| line 22 | image `/assets/geometric-accent-wall.jpg` | `AboutPage.companyImage` | `GET /api/about` |
| lines 28-33 | "Experience" caption + line | `AboutPage.experienceCaption{label,text}` | " |
| lines 39-41 | eyebrow/title/description | `AboutPage.intro{eyebrow,title,description}` | " |
| `siteData.js:255-276` | `aboutBlocks[]` (Company Story / Mission / Vision / Quality Commitment) — title, text, icon | `AboutPage.blocks[]{title,text,icon}` | " |
| `siteData.js:302-309` | `qualityChips[]` (6 strings) | `AboutPage.qualityChips[]` | " |
| **Not yet present** | Banner image, team images, certificates (required by spec) | `AboutPage.banner`, `AboutPage.teamImages[]{image,name,role}`, `AboutPage.certificates[]{image,title}` | " |
| `siteData.js:278-291` | `faqItems[]` (rendered inside About section) | `FAQ` collection (full CRUD) | `GET /api/faq` |

## 11. Services (dedicated CRUD, feeds `ServicesSection.jsx`)

| `siteData.js:66-99` | 4 main services: title, description, **image**, icon, accent | `Service{category:'main', image, banner, title, description, icon, features[], gallery[]}` | Full CRUD `/api/services` |
| `siteData.js:101-110` | 8 secondary services: title, icon | `Service{category:'secondary', ...}` | same |

Spec also wants per-service **banner** and **gallery images** — not present today; new fields, empty until admin fills them.

## 12. Portfolio (dedicated CRUD, feeds `ProjectsSection.jsx` + `BeforeAfterSection.jsx`)

| `siteData.js:145-219` | id, title, location, category, completionDate, duration, cover, images[], description, materials[], services[]; plus separate `beforeAfterItems[]` (before/after image pairs) | `Portfolio{title, category, location, completionDate, coverImage, images[], beforeImage, afterImage, description, materials[], services[]}` | Full CRUD `/api/portfolio` |

## 13. Testimonials (dedicated CRUD)

| `siteData.js:221-246` | name, location, rating, initials, review (no image today) | `Testimonial{name, image, review, rating, isFeatured}` | Full CRUD `/api/testimonials` |

## 14. FAQ (dedicated CRUD)

| `siteData.js:278-291` | title (question), text (answer) x3 | `FAQ{question, answer, order}` | Full CRUD `/api/faq` |

## 15. Contact Page (`ContactSection.jsx`)

| File path | Hardcoded value | DB field | Endpoint |
|---|---|---|---|
| lines 12-15 | section intro copy | `ContactPage.intro{eyebrow,title,text}` | `GET /api/contact` |
| `siteData.js:34-43` | phone, phoneHref, whatsapp, email, address, hours, mapQuery | `ContactPage.{phone,phoneHref,whatsapp,whatsappHref,email,address,hours,mapQuery}` | " |
| `utils/contactLinks.js` | builds Google Maps embed/search URL from `mapQuery` | `ContactPage.mapEmbedUrl` (store directly instead of deriving) | " |
| **Not yet present** | Contact banner image (spec requirement) | `ContactPage.banner` | " |
| `LeadForm.jsx` submissions | currently only opens WhatsApp / local context (`LeadContext.jsx`, `leadService.js`) — no backend persistence | New: `ContactMessage{name,phone,email,service,message,isRead,createdAt}` | `POST /api/contact/messages` (public), `GET/DELETE /api/contact/messages` (admin) |

## 16. Icons (not images — code constructs)

Every "Icon" field above (`lucide-react` components like `Trophy`, `Paintbrush`, `UserCheck`, etc.) is a React component reference, not an uploadable image. These will become a **string icon name** (e.g. `"Trophy"`) stored in Mongo and resolved client-side through a fixed icon-name → `lucide-react` component map (already partially present as `iconMap` in `siteData.js`). Admin dashboard will offer a picker of allowed icon names — no arbitrary icon upload.

## 17. Full image inventory (`public/assets/`)

All 10 files below are currently static; each becomes a `Media` document (uploaded via Media Library) once seeded, and is referenced by URL (e.g. `/uploads/...`) instead of `/assets/...`:

`blue-texture-wall.jpg`, `exterior-boundary-wall.jpg`, `exterior-home-front.jpg`, `exterior-side-view.jpg`, `gate-finish.jpg`, `geometric-accent-wall.jpg`, `interior-blue-feature-wall.jpg`, `interior-stair-wall.jpg`, `logo-crystal-coat-white.jpg`, `logo-crystal-coat.png`.

## Summary

- 2 logo files, 1 favicon → `Settings`
- 9 unique content images (hero bg + side, about, 4 service cards, before/after) → `Homepage` / `AboutPage` / `Service` fields, backed by `Media`
- 3 projects × 4 images each (cover + gallery) → `Portfolio`
- 4 hero stats, 4 homepage stats, 6 "why choose" cards, 12 services (4 main + 8 secondary), 4 about blocks, 6 quality chips, 3 FAQ items, 3 testimonials, 2 before/after pairs — all currently hardcoded arrays in `siteData.js` → become documents in their respective collections, fully CRUD-able from the admin panel
- Every heading/subtitle/button label per section (13+ section intros) → moved into `Homepage` / `AboutPage` / `ContactPage` singleton documents
- Zero hardcoded editable content should remain in `src/` after refactor — the only thing that stays in code is structure/layout/styling and the icon-name allowlist
