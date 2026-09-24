import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { waLink, waBuyLink, waSellLink, WA_NUMBER, MAIL } from '@/lib/site'
import {
  ProjectsCatalogue,
  type ProjectItem,
  type ProjectCategory,
  type ProjectStatus,
} from '@/components/projects/ProjectsCatalogue'

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const initialCategory = resolvedSearchParams?.category || ''
  setRequestLocale(locale)
  const t = await getTranslations()

  let cmsProjects: ProjectItem[] = []

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      locale: locale as 'en' | 'ml',
      depth: 1,
      limit: 100,
      sort: '-createdAt',
    })

    if (docs && docs.length > 0) {
      cmsProjects = docs.map((d: any) => {
        // Map CMS propertyType to ProjectCategory
        let category: ProjectCategory = 'land'
        if (d.propertyType === 'house') category = 'house'
        else if (d.propertyType === 'land') category = 'land'
        else if (d.propertyType === 'commercial') category = 'commercial'
        else if (d.propertyType === 'resort') category = 'resort'
        else category = 'land'

        // Map CMS status to ProjectStatus
        let status: ProjectStatus = 'ongoing'
        if (d.status === 'completed' || d.status === 'sold') status = 'completed'
        else if (d.status === 'upcoming') status = 'upcoming'
        else status = 'ongoing'

        const firstImg = d.images?.[0]?.sizes?.card?.url || d.images?.[0]?.url

        return {
          id: String(d.id),
          title: d.title,
          category,
          status,
          location: d.location || 'Wayanad, Kerala',
          price: d.price,
          description: d.description,
          specs: Array.isArray(d.specs)
            ? d.specs.map((s: any) => s.value).filter(Boolean)
            : [],
          imageUrl: firstImg || '/assets/kerala-land-plantation-hires.jpg',
          featured: Boolean(d.featured),
        }
      })
    }
  } catch {
    cmsProjects = []
  }

  // Only show real properties retrieved from Payload CMS backend
  const allProjects = cmsProjects

  const catalogueLabels = {
    filterAll: t('projects.filterAll'),
    filterHouse: t('projects.filterHouse'),
    filterResidential: t('projects.filterResidential'),
    filterCommercial: t('projects.filterCommercial'),
    filterLand: t('projects.filterLand'),
    filterResort: t('projects.filterResort'),
    filterCompleted: t('projects.filterCompleted'),
    filterOngoing: t('projects.filterOngoing'),
    filterUpcoming: t('projects.filterUpcoming'),
    statusCompleted: t('projects.statusCompleted'),
    statusOngoing: t('projects.statusOngoing'),
    statusUpcoming: t('projects.statusUpcoming'),
    statusAvailable: t('projects.statusAvailable'),
    catHouse: t('projects.catHouse'),
    catResidential: t('projects.catResidential'),
    catCommercial: t('projects.catCommercial'),
    catLand: t('projects.catLand'),
    catResort: t('projects.catResort'),
    viewDetails: t('projects.viewDetails'),
    enquire: t('projects.enquire'),
    emptyTitle: t('projects.emptyTitle'),
    emptyDesc: t('projects.emptyDesc'),
    resetFilter: t('projects.resetFilter'),
    whatsappDirect: t('projects.whatsappDirect'),
    featuredBadge: t('projects.featuredBadge'),
    priceOnEnquiry: t('projects.priceOnEnquiry'),
  }

  const consultationWa = waLink(
    locale === 'ml'
      ? 'നമസ്കാരം, വയലാൻഡിന്റെ പ്രോജക്ടുകളെയും പ്രത്യേക പ്ലോട്ടുകളെയും കുറിച്ച് സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Vayaland, I would like to schedule an architectural consultation regarding your property catalogue in Wayanad.'
  )

  return (
    <div className="vl-projects-page">
      {/* ========================================================================= */}
      {/* EDITORIAL CATALOGUE HEADER                                                */}
      {/* ========================================================================= */}
      <header className="vl-projects-header">
        <div className="vl-container">
          <div className="vl-projects-header-content">
            <span className="vl-editorial-eyebrow">
              <span className="vl-eyebrow-line" />
              <span>{t('projects.eyebrow')}</span>
            </span>

            <h1 className="vl-projects-main-heading">{t('projects.title')}</h1>

            <p className="vl-projects-sub-statement">
              {t('projects.subtitle')}
            </p>

            {/* Architectural Trust Strip */}
            <div className="vl-projects-stats-strip">
              <div className="vl-pstat-item">
                <span className="vl-pstat-number">
                  {String(allProjects.length).padStart(2, '0')}+
                </span>
                <span className="vl-pstat-label">{t('projects.statsTotal')}</span>
              </div>
              <div className="vl-pstat-divider" />
              <div className="vl-pstat-item">
                <span className="vl-pstat-number">06</span>
                <span className="vl-pstat-label">{t('projects.statsRegions')}</span>
              </div>
              <div className="vl-pstat-divider" />
              <div className="vl-pstat-item">
                <span className="vl-pstat-number">100%</span>
                <span className="vl-pstat-label">{t('projects.statsVerified')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* INTERACTIVE CATALOGUE & ASYMMETRIC GRID                                   */}
      {/* ========================================================================= */}
      <ProjectsCatalogue
        projects={allProjects}
        initialCategory={initialCategory}
        labels={catalogueLabels}
      />

      {/* ========================================================================= */}
      {/* CLOSING ADVISORY CONSULTATION STRIP                                       */}
      {/* ========================================================================= */}
      <section className="vl-projects-consult-banner">
        <div className="vl-container">
          <div className="vl-consult-box">
            <div className="vl-consult-text">
              <span className="vl-editorial-eyebrow-light">
                <span className="vl-eyebrow-line-gold" />
                <span>PRIVATE ACQUISITIONS</span>
              </span>
              <h2 className="vl-consult-title">{t('projects.ctaTitle')}</h2>
              <p className="vl-consult-sub">{t('projects.ctaSub')}</p>
            </div>
            <div className="vl-consult-actions">
              <Link href="/contact" className="vl-btn-gold">
                <span>{t('projects.ctaButton')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={waBuyLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="vl-btn-whatsapp-editorial"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                <span>{locale === 'ml' ? 'വാങ്ങാൻ വാട്സ്ആപ്പ്' : 'WhatsApp to Buy'}</span>
              </a>
              <a
                href={waSellLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="vl-btn-whatsapp-editorial"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                <span>{locale === 'ml' ? 'വിൽക്കാൻ വാട്സ്ആപ്പ്' : 'WhatsApp to Sell'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
