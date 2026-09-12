import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { waLink, WA_NUMBER, MAIL } from '@/lib/site'

interface ServiceItem {
  id: string
  num: string
  category: string
  title: string
  desc: string
  deliverablesTitle?: string
  deliverables: string[]
  exploreLabel: string
  exploreHref: string
  enquireLabel: string
  enquireMessage: string
  image: string
  imageAlt: string
  coordsTag: string
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  // Fetch optional client-managed services from Payload CMS
  let cmsServices: any[] = []
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'services',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { active: { equals: true } },
      sort: 'order',
      limit: 50,
    })
    cmsServices = docs || []
  } catch {
    cmsServices = []
  }

  // Core Vayaland Architectural Disciplines (application-verified)
  const coreServices: ServiceItem[] = [
    {
      id: 'service-01',
      num: t('s1Num'),
      category: t('s1Category'),
      title: t('s1Title'),
      desc: t('s1Desc'),
      deliverablesTitle: t('s1DeliverablesTitle'),
      deliverables: [t('s1D1'), t('s1D2'), t('s1D3'), t('s1D4')],
      exploreLabel: t('s1Explore'),
      exploreHref: '/projects',
      enquireLabel: t('s1Enquire'),
      enquireMessage:
        locale === 'ml'
          ? 'നമസ്കാരം വയലാൻഡ്, എനിക്ക് വയനാട്ടിലെ ഭൂമി / പ്ലാന്റേഷൻ അക്വിസിഷനെക്കുറിച്ച് ആലോചിക്കാൻ താല്പര്യമുണ്ട്.'
          : 'Hello Vayaland, I would like to enquire about your Land & Estate Acquisition advisory in Wayanad.',
      image: '/assets/masterplanned-plots.jpg',
      imageAlt: 'Vayaland Land & Estate Acquisition Wayanad',
      coordsTag: '11.7853° N, 76.1684° E · Elevation: 760m',
    },
    {
      id: 'service-02',
      num: t('s2Num'),
      category: t('s2Category'),
      title: t('s2Title'),
      desc: t('s2Desc'),
      deliverablesTitle: t('s2DeliverablesTitle'),
      deliverables: [t('s2D1'), t('s2D2'), t('s2D3'), t('s2D4')],
      exploreLabel: t('s2Explore'),
      exploreHref: '/projects',
      enquireLabel: t('s2Enquire'),
      enquireMessage:
        locale === 'ml'
          ? 'നമസ്കാരം വയലാൻഡ്, എനിക്ക് നിങ്ങളുടെ വാസ്തുവിദ്യാ രൂപകൽപ്പനയെയും സൈറ്റ് പ്ലാനിംഗിനെയും കുറിച്ച് സംസാരിക്കണം.'
          : 'Hello Vayaland, I would like to schedule an Architectural Siting & Spatial Design consultation.',
      image: '/assets/architecture-mood.jpg',
      imageAlt: 'Vayaland Architectural Siting and Spatial Design',
      coordsTag: 'Bio-Climatic Siting · Tropical Vernacular',
    },
    {
      id: 'service-03',
      num: t('s3Num'),
      category: t('s3Category'),
      title: t('s3Title'),
      desc: t('s3Desc'),
      deliverablesTitle: t('s3DeliverablesTitle'),
      deliverables: [t('s3D1'), t('s3D2'), t('s3D3'), t('s3D4')],
      exploreLabel: t('s3Explore'),
      exploreHref: '/projects',
      enquireLabel: t('s3Enquire'),
      enquireMessage:
        locale === 'ml'
          ? 'നമസ്കാരം വയലാൻഡ്, എനിക്ക് വയനാട്ടിൽ ഒരു വില്ല / റെസിഡൻസ് ടേൺകീ നിർമ്മാണത്തെക്കുറിച്ച് കൺസൾട്ട് ചെയ്യണം.'
          : 'Hello Vayaland, I am planning a luxury residential build in Wayanad and would like to discuss Turnkey Construction.',
      image: '/assets/villa-infinity-sunset.jpg',
      imageAlt: 'Vayaland Turnkey Construction and Villa Development',
      coordsTag: 'Monsoon-Resilient · Laterite & Teak Joinery',
    },
    {
      id: 'service-04',
      num: t('s4Num'),
      category: t('s4Category'),
      title: t('s4Title'),
      desc: t('s4Desc'),
      deliverablesTitle: t('s4DeliverablesTitle'),
      deliverables: [t('s4D1'), t('s4D2'), t('s4D3'), t('s4D4')],
      exploreLabel: t('s4Explore'),
      exploreHref: '/about',
      enquireLabel: t('s4Enquire'),
      enquireMessage:
        locale === 'ml'
          ? 'നമസ്കാരം വയലാൻഡ്, എനിക്ക് വയനാട്ടിലെ പ്രോപ്പർട്ടി ടൈറ്റിൽ സ്ക്രൂട്ടിനിയെക്കുറിച്ചും ലീഗൽ പരിശോധനയെക്കുറിച്ചും അറിയണം.'
          : 'Hello Vayaland, I would like to consult your legal team regarding Title Scrutiny & Land Due Diligence in Wayanad.',
      image: '/assets/architectural-limestone.jpg',
      imageAlt: 'Vayaland Title Scrutiny and Legal Diligence',
      coordsTag: '30-Year Prior Deed Chain · 100% Clear Title',
    },
  ]

  // Map any additional CMS-published services seamlessly
  const mappedCmsServices: ServiceItem[] = cmsServices.map((s, idx) => ({
    id: `cms-service-${s.id || idx}`,
    num: String(coreServices.length + idx + 1).padStart(2, '0'),
    category: 'VAYALAND CUSTOM DISCIPLINE',
    title: s.name,
    desc: s.fullDesc || s.shortDesc || '',
    deliverablesTitle: 'Deliverables & Highlights',
    deliverables: (s.features || []).map((f: any) => f.value).filter(Boolean),
    exploreLabel: t('s1Explore'),
    exploreHref: '/projects',
    enquireLabel: t('s1Enquire'),
    enquireMessage: `Hello Vayaland, I am enquiring about your ${s.name} service.`,
    image: s.image?.sizes?.card?.url || s.image?.url || '/assets/architecture-mood.jpg',
    imageAlt: s.name,
    coordsTag: 'Pulpally · Wayanad, Kerala',
  }))

  const allServices = [...coreServices, ...mappedCmsServices]

  const closingWaUrl = waLink(
    locale === 'ml'
      ? 'നമസ്കാരം വയലാൻഡ്, എന്റെ പ്രോപ്പർട്ടി ആലോചനകൾക്കായി ഒരു അഡ്വൈസറി കോൾ ഷെഡ്യൂൾ ചെയ്യാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Vayaland, I would like to schedule a private advisory consultation regarding property and development in Wayanad.'
  )

  return (
    <div className="vl-services-page-root">
      {/* ========================================================================= */}
      {/* STAGE 1: CINEMATIC EDITORIAL HERO                                         */}
      {/* ========================================================================= */}
      <section className="vl-services-hero" aria-label="Services Hero">
        <div className="vl-services-hero-bg">
          <Image
            src="/assets/hero-cinematic.jpg"
            alt="Vayaland Architectural Services Wayanad"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="vl-services-hero-img"
          />
          <div className="vl-services-hero-scrim" />
        </div>

        <div className="vl-container vl-services-hero-container">
          <div className="vl-services-hero-content">
            <span className="vl-hero-tag">
              <span className="vl-tag-accent" />
              <span>{t('heroEyebrow')}</span>
            </span>

            <h1 className="vl-services-main-title">{t('heroTitle')}</h1>

            <p className="vl-services-tagline">{t('heroTagline')}</p>

            <p className="vl-services-lead">{t('heroLead')}</p>

            <a href="#disciplines" className="vl-hero-scroll-hint" aria-label="Scroll to services ecosystem">
              <span className="vl-scroll-pill">
                <span className="vl-scroll-dot" />
              </span>
              <span className="vl-scroll-text">{t('scrollHint')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 2: ECOSYSTEM QUICK-REFERENCE STRIP                                  */}
      {/* ========================================================================= */}
      <nav id="ecosystem" className="vl-services-eco-strip" aria-label="Service disciplines navigation">
        <div className="vl-container vl-eco-inner">
          <span className="vl-eco-header">{t('ecoTitle')}</span>
          <div className="vl-eco-pillars">
            <a href="#service-01" className="vl-eco-pillar">
              <span className="vl-eco-num">01</span>
              <span className="vl-eco-label">{t('ecoPillar1')}</span>
              <span className="vl-eco-arrow">↓</span>
            </a>
            <a href="#service-02" className="vl-eco-pillar">
              <span className="vl-eco-num">02</span>
              <span className="vl-eco-label">{t('ecoPillar2')}</span>
              <span className="vl-eco-arrow">↓</span>
            </a>
            <a href="#service-03" className="vl-eco-pillar">
              <span className="vl-eco-num">03</span>
              <span className="vl-eco-label">{t('ecoPillar3')}</span>
              <span className="vl-eco-arrow">↓</span>
            </a>
            <a href="#service-04" className="vl-eco-pillar">
              <span className="vl-eco-num">04</span>
              <span className="vl-eco-label">{t('ecoPillar4')}</span>
              <span className="vl-eco-arrow">↓</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* STAGE 3: LARGE ALTERNATING EDITORIAL SERVICE SECTIONS                     */}
      {/* ========================================================================= */}
      <div id="disciplines" className="vl-services-sections-wrap">
        {allServices.map((service, index) => {
          // Alternating pattern:
          // 0 -> Image Left / Content Right
          // 1 -> Content Left / Image Right
          // 2 -> Image Left / Content Right
          // 3 -> Content Left / Image Right
          const isReverse = index % 2 !== 0
          const serviceWa = waLink(service.enquireMessage)

          return (
            <section
              key={service.id}
              id={service.id}
              className={`vl-service-section ${isReverse ? 'vl-is-reverse' : ''}`}
              aria-labelledby={`${service.id}-title`}
            >
              <div className="vl-container">
                <div className="vl-service-grid">
                  {/* MEDIA COLUMN */}
                  <div className="vl-service-media-col">
                    <div className="vl-service-media-frame">
                      <div className="vl-service-img-outer">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          quality={90}
                          className="vl-service-img"
                        />
                        <div className="vl-service-img-scrim" />
                      </div>
                      <div className="vl-service-media-badge">
                        <span className="vl-service-media-num">{service.num}</span>
                        <span className="vl-service-media-tag">{service.coordsTag}</span>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="vl-service-content-col">
                    <div className="vl-service-meta-top">
                      <span className="vl-service-num-display">{service.num}</span>
                      <span className="vl-service-category-tag">{service.category}</span>
                    </div>

                    <h2 id={`${service.id}-title`} className="vl-service-title">
                      {service.title}
                    </h2>

                    <p className="vl-service-desc">{service.desc}</p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="vl-service-deliverables">
                        <span className="vl-deliv-title">{service.deliverablesTitle || 'Key Scope'}</span>
                        <ul className="vl-deliv-list">
                          {service.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="vl-deliv-item">
                              <span className="vl-deliv-bullet" aria-hidden="true">✦</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="vl-service-actions">
                      <a
                        href={serviceWa}
                        className="vl-service-cta-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${service.enquireLabel} via WhatsApp`}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                          <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                        </svg>
                        <span>{service.enquireLabel}</span>
                      </a>

                      <Link href={service.exploreHref as any} className="vl-service-cta-ghost">
                        <span>{service.exploreLabel}</span>
                        <span className="vl-cta-arrow" aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* ========================================================================= */}
      {/* STAGE 4: CONSULTATION & ENQUIRY ADVISORY CLOSING BANNER                   */}
      {/* ========================================================================= */}
      <section className="vl-services-closing-cta" aria-label="Services Consultation">
        <div className="vl-container">
          <div className="vl-services-cta-box">
            <div className="vl-services-cta-glow" aria-hidden="true" />
            <div className="vl-services-cta-content">
              <span className="vl-cta-badge">{t('closingTag')}</span>

              <h2 className="vl-services-cta-title">{t('closingTitle')}</h2>

              <p className="vl-services-cta-desc">{t('closingDesc')}</p>

              <div className="vl-services-cta-actions">
                <a
                  href={closingWaUrl}
                  className="vl-services-btn-solid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>{t('closingCtaWa')}</span>
                </a>

                <Link href="/contact" className="vl-services-btn-outline">
                  <span>{t('closingCtaContact')}</span>
                  <span className="vl-cta-arrow" aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="vl-services-cta-meta">
                <div className="vl-meta-pill">
                  <span className="vl-meta-dot" />
                  <span>{t('officeLocation')}</span>
                </div>
                <div className="vl-meta-pill">
                  <span className="vl-meta-dot" />
                  <span>{t('callDesk')}</span>
                </div>
                <div className="vl-meta-pill">
                  <span className="vl-meta-dot" />
                  <span>{MAIL}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
