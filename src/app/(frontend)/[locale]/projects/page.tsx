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
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
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
        if (d.propertyType === 'house') category = 'residential'
        else if (d.propertyType === 'commercial') category = 'commercial'
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
          imageUrl: firstImg || '/assets/masterplanned-plots.jpg',
          featured: Boolean(d.featured),
        }
      })
    }
  } catch {
    cmsProjects = []
  }

  // Curated architectural catalogue showcase items (ensures every filter has rich content)
  const showcaseProjects: ProjectItem[] = [
    {
      id: 'project-1',
      title:
        locale === 'ml'
          ? 'ദി മിസ്ട്രൽ ഹൊറൈസൺ വില്ല & എസ്റ്റേറ്റ്'
          : 'The Mistral Horizon Villa & Estate',
      category: 'residential',
      status: 'ongoing',
      location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
      price: '₹ 3.85 Cr',
      extent: '2.8 Acres · 4 Bed Villa',
      specs: [
        locale === 'ml' ? '25 മീറ്റർ ഇൻഫിനിറ്റി പൂൾ' : '25m Infinity Pool',
        locale === 'ml' ? '2,600 അടി ഉയരം' : '2,600 FT Elevation',
        locale === 'ml' ? 'സ്വാഭാവിക ചുണ്ണാമ്പുകല്ല്' : 'Limestone & Seasoned Teak',
      ],
      description:
        locale === 'ml'
          ? 'പ്രകൃതിദത്ത കല്ലുകൾ, തേക്ക് തടി മേൽക്കൂരകൾ, കോടമഞ്ഞും പച്ചപ്പും കാണാവുന്ന 25 മീറ്റർ ഇൻഫിനിറ്റി പൂൾ എന്നിവയുള്ള മലയോര സങ്കേതം.'
          : 'A dramatic cliffside sanctuary designed with natural limestone, seasoned teak timber eaves, and panoramic horizon vistas overlooking Chembra Peak valley.',
      imageUrl: '/assets/villa-infinity-sunset.jpg',
      featured: true,
    },
    {
      id: 'project-2',
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
        locale === 'ml' ? 'ടാർ റോഡ് സൗകര്യം' : 'All-Weather Tarmac Access',
      ],
      description:
        locale === 'ml'
          ? 'ബാണാസുര അണക്കെട്ടിന്റെ താഴ്‌വരയിൽ സ്ഥിതി ചെയ്യുന്ന ഉന്നത നിലവാരത്തിലുള്ള പ്ലാന്റേഷൻ പ്ലോട്ടുകൾ.'
          : 'Gently terraced agricultural land parcels nestled in the fertile Banasura foothills, featuring year-round freshwater spring feeds.',
      imageUrl: '/assets/masterplanned-plots.jpg',
    },
    {
      id: 'project-3',
      title:
        locale === 'ml'
          ? 'ചെമ്പ്ര പീക്ക് ഹൈലാൻഡ് ഹിൽടോപ്പ്'
          : 'Chembra Highland Hilltop Parcel',
      category: 'land',
      status: 'ongoing',
      location: locale === 'ml' ? 'ചെമ്പ്ര അടിവാരം, വയനാട്' : 'Chembra Foothills, Wayanad',
      price: '₹ 95 Lakhs',
      extent: '1.75 Acres · Virgin Acreage',
      specs: [
        locale === 'ml' ? '360° കാഴ്‌ച' : '360° Panoramic Ridge',
        locale === 'ml' ? 'തോട്ടം ഭൂമി' : 'Ecological Green Zone',
        locale === 'ml' ? 'ക്ലിയർ ടൈറ്റിൽ' : 'Clear Ownership Deeds',
      ],
      description:
        locale === 'ml'
          ? 'ചെമ്പ്ര കൊടുമുടിയുടെ താഴ്‌വരയിലെ നിത്യഹരിത കാലാവസ്ഥയുള്ള സുരക്ഷിതമായ ലാൻഡ് പ്ലോട്ട്.'
          : 'High-altitude virgin property offering complete solitude, cool mountain breeze, and clear title documentation suited for private retreats.',
      imageUrl: '/assets/kerala-mist-sunrise.jpg',
    },
    {
      id: 'project-4',
      title:
        locale === 'ml'
          ? 'ദി തേക്ക്‌വുഡ് പവിലിയൻ റെസിഡൻസ്'
          : 'The Teakwood Pavilion Residence',
      category: 'residential',
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
          : 'A bespoke modern residence honoring vernacular Kerala proportions with exposed laterite detailing, deep overhangs, and sustainable courtyard ventilation.',
      imageUrl: '/assets/modern-timber-eaves.jpg',
    },
    {
      id: 'project-5',
      title:
        locale === 'ml'
          ? 'ദി ഹൊറൈസൺ റിഡ്ജ് ഇൻഫിനിറ്റി റിട്രീറ്റ്'
          : 'The Horizon Ridge Infinity Retreat',
      category: 'residential',
      status: 'upcoming',
      location: locale === 'ml' ? 'മേപ്പാടി ഹൈറ്റ്സ്, വയനാട്' : 'Meppadi Heights, Wayanad',
      price: '₹ 4.50 Cr',
      extent: '3.2 Acres · Masterplanned Estate',
      specs: [
        locale === 'ml' ? 'സ്വകാര്യ വില്ല സമുച്ചയം' : 'Ultra-Luxury Villa',
        locale === 'ml' ? 'ഹെലിപാഡ് ആക്സസ്' : 'Helipad Access',
        locale === 'ml' ? 'പ്രകൃതിദത്ത നീരുറവ' : 'Natural Spring Feeder',
      ],
      description:
        locale === 'ml'
          ? 'മേപ്പാടിയിലെ മലനിരകളിൽ വരാനിരിക്കുന്ന അത്യാധുനിക ആർക്കിടെക്ചറൽ എസ്റ്റേറ്റ് റിട്രീറ്റ്.'
          : 'An upcoming enclave of ultra-luxury hillside villas featuring cantilevered terraces, glass curtain walls, and uninterrupted views across the rainforest canopy.',
      imageUrl: '/assets/infinity-pool-horizon.jpg',
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
      imageUrl: '/assets/architectural-limestone.jpg',
    },
    {
      id: 'project-7',
      title:
        locale === 'ml'
          ? 'ഗോൾഡൻ വാലി ഇക്കോ-എസ്റ്റേറ്റ് പ്ലോട്ടുകൾ'
          : 'Golden Valley Eco-Estate Parcels',
      category: 'land',
      status: 'upcoming',
      location: locale === 'ml' ? 'സുൽത്താൻ ബത്തേരി പീഠഭൂമി' : 'Sulthan Bathery Plateau',
      price: '₹ 1.65 Cr',
      extent: '8.0 Acres · Organic Canopy',
      specs: [
        locale === 'ml' ? 'പ്രകൃതി സൗഹൃദം' : 'Organic Certified Soil',
        locale === 'ml' ? 'വന്യജീവി സംരക്ഷിത വേലി' : 'Solar Perimeter Fencing',
        locale === 'ml' ? 'വെള്ളവും വെളിച്ചവും' : 'Dedicated Electricity & Borewell',
      ],
      description:
        locale === 'ml'
          ? 'സുൽത്താൻ ബത്തേരിയിൽ വരാനിരിക്കുന്ന വലിയ ഓർഗാനിക് ഇക്കോ പ്ലാന്റേഷൻ ഭൂമി.'
          : 'Exclusive agricultural acreage surrounded by towering areca palms and fruit orchards, ideal for boutique agro-tourism or private farmsteads.',
      imageUrl: '/assets/golden-sunset-palms.jpg',
    },
    {
      id: 'project-8',
      title:
        locale === 'ml'
          ? 'വൈത്തിരി ഹിൽസൈഡ് ആർട്ടിസാൻ സ്യൂട്ടുകൾ'
          : 'Vythiri Hillside Artisan Suites',
      category: 'commercial',
      status: 'completed',
      location: locale === 'ml' ? 'വൈത്തിരി താഴ്‌വര, വയനാട്' : 'Vythiri Valley, Wayanad',
      price: '₹ 5.20 Cr',
      extent: '6 Boutique Cottages & Clubhouse',
      specs: [
        locale === 'ml' ? 'പ്രവർത്തിക്കുന്ന റിസോർട്ട്' : 'Operational Eco-Resort',
        locale === 'ml' ? 'മനോഹരമായ അരുവി' : 'Perennial Stream Edge',
        locale === 'ml' ? 'അനുമതികൾ എല്ലാം ലഭ്യമാണ്' : 'All Licenses & Clearances',
      ],
      description:
        locale === 'ml'
          ? 'വൈത്തിരിയിലെ തണുത്ത കാലാവസ്ഥയിൽ സ്ഥിതി ചെയ്യുന്ന വിജയകരമായ ഇക്കോ-ടൂറിസം പ്രോജക്ട്.'
          : 'Award-winning hospitality property consisting of six independent chalets, dining pavilion, and wellness lounge nestled along a natural forest stream.',
      imageUrl: '/assets/hero-cinematic.jpg',
    },
  ]

  // Combine CMS projects with curated showcase items
  const allProjects =
    cmsProjects.length >= 4 ? cmsProjects : showcaseProjects

  const catalogueLabels = {
    filterAll: t('projects.filterAll'),
    filterResidential: t('projects.filterResidential'),
    filterCommercial: t('projects.filterCommercial'),
    filterLand: t('projects.filterLand'),
    filterCompleted: t('projects.filterCompleted'),
    filterOngoing: t('projects.filterOngoing'),
    filterUpcoming: t('projects.filterUpcoming'),
    statusCompleted: t('projects.statusCompleted'),
    statusOngoing: t('projects.statusOngoing'),
    statusUpcoming: t('projects.statusUpcoming'),
    statusAvailable: t('projects.statusAvailable'),
    catResidential: t('projects.catResidential'),
    catCommercial: t('projects.catCommercial'),
    catLand: t('projects.catLand'),
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
      <ProjectsCatalogue projects={allProjects} labels={catalogueLabels} />

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
