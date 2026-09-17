import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { waLink, WA_NUMBER, MAIL } from '@/lib/site'
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

  // Curated architectural catalogue showcase items (ensures every category has rich content)
  const showcaseProjects: ProjectItem[] = [
    {
      id: 'project-1',
      title:
        locale === 'ml'
          ? 'ആധുനിക കേരള വാസ്തുശില്പ വില്ല'
          : 'Contemporary Kerala Architectural Villa',
      category: 'house',
      status: 'ongoing',
      location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
      price: '₹ 1.85 Cr',
      extent: '3,200 Sq Ft · 4 Bed Villa',
      specs: [
        locale === 'ml' ? 'പരമ്പരാഗത മുഖപ്പും ബാൽക്കണിയും' : 'Pitched Roof & Balcony',
        locale === 'ml' ? 'കാർ പോർച്ച് & ഗേറ്റ്' : 'Car Porch & Gated Boundary',
        locale === 'ml' ? '100% ക്ലിയർ ടൈറ്റിൽ' : '100% Clear Title',
      ],
      description:
        locale === 'ml'
          ? 'സമകാലിക ശൈലിയിലുള്ള 2-നില കേരള വാസ്തുവിദ്യാ ഭവനം, കാർ പോർച്ച്, മതിൽക്കെട്ട് സൗകര്യം.'
          : 'A newly constructed contemporary Kerala double-story residence with refined architectural woodwork, dedicated car porch, and secure boundary wall.',
      imageUrl: '/assets/kerala-house-sale.png',
      featured: true,
    },
    {
      id: 'project-2',
      title:
        locale === 'ml'
          ? 'മേപ്പാടി റെഡ്-സോയിൽ റെസിഡൻഷ്യൽ പ്ലോട്ട്'
          : 'Meppadi Red-Soil Hillside Plot',
      category: 'land',
      status: 'ongoing',
      location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
      price: '₹ 45 Lakhs',
      extent: '50 Cents · Road Frontage',
      specs: [
        locale === 'ml' ? 'വെട്ടുകല്ല് സംരക്ഷണ മതിൽ' : 'Laterite Retaining Wall',
        locale === 'ml' ? 'ഉടൻ വീട് വെക്കാം' : 'Ready for Construction',
        locale === 'ml' ? 'റവന്യൂ ക്ലിയറൻസ്' : 'Verified Deeds',
      ],
      description:
        locale === 'ml'
          ? 'വീട് പണിയാൻ ഒരുക്കിയ നിരപ്പായ പ്ലോട്ട്, വെട്ടുകല്ല് ബൗണ്ടറി വാളും റോഡ് പ്രവേശനവും.'
          : 'A prime residential building plot with existing stone retaining structure, level building envelope, and full road frontage.',
      imageUrl: '/assets/kerala-land-plot.png',
    },
    {
      id: 'project-3',
      title:
        locale === 'ml'
          ? 'ബാണാസുര താഴ്‌വര പ്ലാന്റേഷൻ പ്ലോട്ടുകൾ'
          : 'Banasura Terraced Plantation Parcels',
      category: 'land',
      status: 'completed',
      location: locale === 'ml' ? 'പടിഞ്ഞാറത്തറ, വയനാട്' : 'Padinjarathara, Wayanad',
      price: '₹ 1.20 Cr',
      extent: '5.4 Acres · Fertile Estate',
      specs: [
        locale === 'ml' ? 'തടാക സാമീപ്യം' : 'Direct Reservoir Frontage',
        locale === 'ml' ? 'കാപ്പിയും കുരുമുളകും' : 'Mature Coffee & Pepper',
        locale === 'ml' ? 'തണ്ണീർത്തട സാമീപ്യം' : 'Freshwater Spring Feeder',
      ],
      description:
        locale === 'ml'
          ? 'ബാണാസുര അണക്കെട്ടിന്റെ താഴ്‌വരയിൽ സ്ഥിതി ചെയ്യുന്ന പ്ലാന്റേഷൻ ഭൂമി.'
          : 'Gently terraced fertile plantation acreage featuring perennial freshwater springs and mature coffee holdings.',
      imageUrl: '/assets/kerala-plantation-meadow.png',
    },
    {
      id: 'project-4',
      title:
        locale === 'ml'
          ? 'ദി തേക്ക്‌വുഡ് പവിലിയൻ റെസിഡൻസ്'
          : 'The Teakwood Pavilion Residence',
      category: 'house',
      status: 'completed',
      location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
      price: '₹ 2.45 Cr',
      extent: '3,400 Sq Ft · Modern Kerala',
      specs: [
        locale === 'ml' ? '4 ബെഡ്‌റൂം മാസ്റ്റർ സ്യൂട്ട്' : '4 Ensuite Bedrooms',
        locale === 'ml' ? 'പരമ്പരാഗത മുറ്റം' : 'Central Rainwater Courtyard',
        locale === 'ml' ? 'സോളാർ പവർ' : 'Solar-Ready Grid',
      ],
      description:
        locale === 'ml'
          ? 'കേരള വാസ്തുശില്പ കലയും ആധുനിക ആഡംബരങ്ങളും ഒത്തുചേരുന്ന അതിമനോഹര ഭവനം.'
          : 'A bespoke modern residence honoring vernacular Kerala proportions with exposed laterite detailing, deep overhangs, and courtyard ventilation.',
      imageUrl: '/assets/modern-timber-eaves.jpg',
    },
    {
      id: 'project-5',
      title:
        locale === 'ml'
          ? 'ദി മിസ്ട്രൽ ഹൊറൈസൺ ഇൻഫിനിറ്റി വില്ല'
          : 'The Mistral Horizon Infinity Villa',
      category: 'house',
      status: 'upcoming',
      location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
      price: '₹ 3.85 Cr',
      extent: '2.8 Acres · 4 Bed Luxury Villa',
      specs: [
        locale === 'ml' ? '25 മീറ്റർ ഇൻഫിനിറ്റി പൂൾ' : '25m Infinity Pool',
        locale === 'ml' ? 'സ്വാഭാവിക ചുണ്ണാമ്പുകല്ല്' : 'Limestone & Seasoned Teak',
        locale === 'ml' ? 'താഴ്‌വര കാഴ്‌ച' : 'Panoramic Horizon Views',
      ],
      description:
        locale === 'ml'
          ? 'പ്രകൃതിദത്ത കല്ലുകൾ, തേക്ക് തടി മേൽക്കൂരകൾ, ഇൻഫിനിറ്റി പൂളുള്ള ആഡംബര വില്ല.'
          : 'Dramatic cliffside villa sanctuary designed with natural stone and teak timber eaves.',
      imageUrl: '/assets/kerala-house-heritage-hires.jpg',
    },
    {
      id: 'project-6',
      title:
        locale === 'ml'
          ? 'പുൽപ്പള്ളി കൊമേഴ്‌സ്യൽ പ്ലാസ & സ്യൂട്ടുകൾ'
          : 'Pulpally Commercial Plaza & Suites',
      category: 'commercial',
      status: 'ongoing',
      location: locale === 'ml' ? 'ടൗൺ സെന്റർ, പുൽപ്പള്ളി' : 'Town Center, Pulpally',
      price: '₹ 3.10 Cr',
      extent: '12,500 Sq Ft · Commercial',
      specs: [
        locale === 'ml' ? 'മെയിൻ റോഡ് ഫ്രണ്ട്' : 'Main Highway Frontage',
        locale === 'ml' ? 'വിശാലമായ പാർക്കിംഗ്' : '30+ Vehicle Parking',
        locale === 'ml' ? 'ഉയർന്ന വാടക വരുമാനം' : 'High Yield Commercial Hub',
      ],
      description:
        locale === 'ml'
          ? 'പുൽപ്പള്ളി പ്രധാന റോഡിൽ സ്ഥിതി ചെയ്യുന്ന പ്രീമിയം വാണിജ്യ സമുച്ചയം.'
          : 'Centrally positioned commercial asset engineered for boutique banking, retail flagships, and premium serviced executive suites.',
      imageUrl: '/assets/kerala-commercial-building-hires.jpg',
    },
    {
      id: 'project-7',
      title:
        locale === 'ml'
          ? 'ബാണാസുര ലേക്‌സൈഡ് ഇക്കോ റിസോർട്ട്'
          : 'Banasura Lakeside Eco-Resort & Retreat',
      category: 'resort',
      status: 'completed',
      location: locale === 'ml' ? 'ബാണാസുര സാഗർ, വയനാട്' : 'Banasura Sagar, Wayanad',
      price: '₹ 8.50 Cr',
      extent: '9.5 Acres · Lake Frontage',
      specs: [
        locale === 'ml' ? 'പ്രവർത്തിക്കുന്ന റിസോർട്ട്' : 'Operational Luxury Resort',
        locale === 'ml' ? 'തടാക തീര വില്ലകൾ' : 'Shoreline Villas & Towers',
        locale === 'ml' ? 'ടൂറിസം ക്ലിയറൻസുകൾ' : 'Full Tourism Clearances',
      ],
      description:
        locale === 'ml'
          ? 'തടാക തീരത്ത് സ്ഥിതി ചെയ്യുന്ന അത്യാധുനിക ആഡംബര റിസോർട്ട് സമുച്ചയം.'
          : 'A premier operating lakefront hospitality asset with twin architectural towers, shoreline chalets, and recreation facilities.',
      imageUrl: '/assets/kerala-resort-luxury-hires.jpg',
    },
    {
      id: 'project-8',
      title:
        locale === 'ml'
          ? 'വൈത്തിരി റെയിൻഫോറസ്റ്റ് റിസോർട്ട് & എസ്റ്റേറ്റ്'
          : 'Vythiri Rainforest Resort & Estate',
      category: 'resort',
      status: 'ongoing',
      location: locale === 'ml' ? 'വൈത്തിരി താഴ്‌വര, വയനാട്' : 'Vythiri Valley, Wayanad',
      price: '₹ 5.20 Cr',
      extent: '6 Boutique Cottages & Stream',
      specs: [
        locale === 'ml' ? 'വന സാമീപ്യം' : 'Rainforest Stream Edge',
        locale === 'ml' ? 'ഇക്കോ-ടൂറിസം അനുമതി' : 'Approved Eco-Tourism Masterplan',
        locale === 'ml' ? 'ഉയർന്ന ഒക്യുപൻസി' : 'High Year-Round Occupancy',
      ],
      description:
        locale === 'ml'
          ? 'വൈത്തിരിയിലെ നിത്യഹരിത വനത്തിൽ സ്ഥിതി ചെയ്യുന്ന വിജയകരമായ ഇക്കോ റിട്രീറ്റ്.'
          : 'An acclaimed boutique eco-resort property nestled alongside a perennial mountain stream in Vythiri.',
      imageUrl: '/assets/hero-cinematic.jpg',
    },
  ]

  // Combine CMS projects with curated showcase items
  const allProjects = cmsProjects.length >= 8 ? cmsProjects : [...cmsProjects, ...showcaseProjects]

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
                href={consultationWa}
                target="_blank"
                rel="noopener noreferrer"
                className="vl-btn-whatsapp-editorial"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
