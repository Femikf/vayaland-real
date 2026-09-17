import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { waLink, waBuyLink, waSellLink, mailLink, WA_NUMBER } from '@/lib/site'
import { VisualGallery } from '@/components/home/VisualGallery'
import { HeroSlider } from '@/components/home/HeroSlider'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  let cmsProperties: any[] = []
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      locale: locale as 'en' | 'ml',
      depth: 1,
      limit: 6,
      sort: '-createdAt',
    })
    cmsProperties = docs || []
  } catch {
    // Gracefully handle database or CMS disconnect in static/offline scenarios
    cmsProperties = []
  }

  // Fallback / curated architectural showcase properties
  const fallbackProperties = [
    {
      id: 'showcase-1',
      title: locale === 'ml' ? 'ദി മിസ്ട്രൽ ഹൊറൈസൺ വില്ല & എസ്റ്റേറ്റ്' : 'The Mistral Horizon Villa & Estate',
      propertyType: 'house',
      location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
      price: '₹ 3.85 Cr',
      extent: '2.8 Acres · 4 Bed Villa',
      imageUrl: '/assets/kerala-house-heritage-hires.jpg',
      aspectRatio: 'landscape',
    },
    {
      id: 'showcase-2',
      title: locale === 'ml' ? 'ബാണാസുര താഴ്‌വര പ്ലാന്റേഷൻ പ്ലോട്ടുകൾ' : 'Banasura Terraced Plantation Parcels',
      propertyType: 'land',
      location: locale === 'ml' ? 'പടിഞ്ഞാറത്തറ, വയനാട്' : 'Padinjarathara, Wayanad',
      price: '₹ 1.20 Cr',
      extent: '5.4 Acres · Coffee & Pepper',
      imageUrl: '/assets/kerala-land-plantation-hires.jpg',
      aspectRatio: 'portrait',
    },
    {
      id: 'showcase-3',
      title: locale === 'ml' ? 'ചെമ്പ്ര പീക്ക് ഹൈലാൻഡ് ഹിൽടോപ്പ്' : 'Chembra Highland Hilltop Parcel',
      propertyType: 'land',
      location: locale === 'ml' ? 'ചെമ്പ്ര അടിവാരം, വയനാട്' : 'Chembra Foothills, Wayanad',
      price: '₹ 95 Lakhs',
      extent: '1.75 Acres · Panoramic Vista',
      imageUrl: '/assets/kerala-mist-sunrise.jpg',
      aspectRatio: 'portrait',
    },
    {
      id: 'showcase-4',
      title: locale === 'ml' ? 'ദി തേക്ക്‌വുഡ് പവിലിയൻ റെസിഡൻസ്' : 'The Teakwood Pavilion Residence',
      propertyType: 'house',
      location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
      price: '₹ 2.45 Cr',
      extent: '3,400 Sq Ft · Contemporary Kerala',
      imageUrl: '/assets/modern-timber-eaves.jpg',
      aspectRatio: 'landscape',
    },
  ]

  // Merge CMS properties if available, fallback otherwise
  const displayProperties = cmsProperties.length >= 3 ? cmsProperties : fallbackProperties

  const waConsultationLink = waLink(
    locale === 'ml'
      ? 'നമസ്കാരം, വയലാൻഡിന്റെ പ്രോപ്പർട്ടികളെയും പ്ലോട്ടുകളെയും കുറിച്ച് കൂടുതൽ അറിയാൻ താല്പര്യപ്പെടുന്നു.'
      : 'Hello Vayaland, I would like to enquire about your land parcels and architectural estates in Wayanad.'
  )

  // 5-Slide Architectural Running Hero Showcase
  const heroSlides = [
    {
      id: 'hero-1-brand',
      image: '/assets/hero-cinematic.jpg',
      eyebrow: locale === 'ml' ? 'വയലാൻഡ് · ദി റിയൽ വയനാട്' : 'VAYALAND · THE REAL WAYANAD',
      serviceBadge: locale === 'ml' ? 'പ്രീമിയം വയനാട് റിയൽ എസ്റ്റേറ്റ്' : 'PREMIUM ARCHITECTURAL ESTATES',
      title: t('home.heroTitle'),
      subtitle: t('home.heroSub'),
      ctaLabel: t('home.explore'),
      ctaLink: '/projects',
    },
    {
      id: 'hero-2-house',
      image: '/assets/hero-slider-house.jpg',
      eyebrow: locale === 'ml' ? 'വീടുകൾ വിൽക്കാനുണ്ട്' : 'HOUSE FOR SALE',
      serviceBadge: locale === 'ml' ? 'ആധുനിക കേരള വാസ്തുശില്പം' : 'CONTEMPORARY KERALA VILLAS',
      title: locale === 'ml' ? 'ആധുനിക കേരള വാസ്തുശില്പ വില്ലകൾ' : 'Contemporary Kerala Architectural Villas',
      subtitle: locale === 'ml' ? 'പരമ്പരാഗത തേക്ക് തടി മുഖപ്പുകൾ, വിശാലമായ നടുമുറ്റം, പ്രകൃതിദത്ത വെളിച്ചം നിറഞ്ഞ ലിവിംഗ് ഏരിയകൾ, 100% ക്ലിയർ ടൈറ്റിൽ.' : 'Bespoke vernacular proportions, courtyard ventilation, seasoned teak timber eaves, and verified clear deeds in Wayanad.',
      ctaLabel: locale === 'ml' ? 'വീടുകൾ കാണുക' : 'Explore Houses',
      ctaLink: '/projects?category=house',
    },
    {
      id: 'hero-3-land',
      image: '/assets/hero-slider-land.jpg',
      eyebrow: locale === 'ml' ? 'ഭൂമി വിൽക്കാനുണ്ട്' : 'LAND FOR SALE',
      serviceBadge: locale === 'ml' ? 'റസിഡൻഷ്യൽ & പ്ലാന്റേഷൻ പ്ലോട്ടുകൾ' : 'SCENIC HILLSIDE & ESTATE PLOTS',
      title: locale === 'ml' ? 'വയനാടൻ മലനിരകളിലെ മനോഹര പ്ലോട്ടുകൾ' : 'Scenic Wayanad Hillside & Plantation Plots',
      subtitle: locale === 'ml' ? 'വെട്ടുകല്ല് സംരക്ഷണ മതിൽ, കാപ്പിയും കുരുമുളകും നിറഞ്ഞ ഫലഭൂയിഷ്ഠമായ മണ്ണ്, അതിമനോഹരമായ പശ്ചിമഘട്ട കാഴ്ച്ചകൾ.' : 'Terraced fertile red soil, crystal freshwater springs, mature coffee canopy, and panoramic horizon vistas.',
      ctaLabel: locale === 'ml' ? 'സ്ഥലങ്ങൾ കാണുക' : 'Explore Land',
      ctaLink: '/projects?category=land',
    },
    {
      id: 'hero-4-commercial',
      image: '/assets/hero-slider-commercial.jpg',
      eyebrow: locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ പ്രോപ്പർട്ടികൾ' : 'COMMERCIAL BUILDING',
      serviceBadge: locale === 'ml' ? 'പ്രധാന ഹൈവേ കൊമേഴ്‌സ്യൽ ഹബ്ബ്' : 'PRIME HIGHWAY BUSINESS HUBS',
      title: locale === 'ml' ? 'ആധുനിക കൊമേഴ്‌സ്യൽ പ്ലാസകളും സ്യൂട്ടുകളും' : 'Modern Highway Commercial Plazas & Suites',
      subtitle: locale === 'ml' ? 'മെയിൻ റോഡ് ഫ്രണ്ടേജ്, വിശാലമായ പാർക്കിംഗ്, ഉയർന്ന വാടക വരുമാനം ഉറപ്പുനൽകുന്ന പ്രീമിയം വാണിജ്യ സമുച്ചയങ്ങൾ.' : 'Strategic highway double-frontage, multi-tier parking, and premium retail avenues with high rental yields.',
      ctaLabel: locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ കാണുക' : 'Explore Commercial',
      ctaLink: '/projects?category=commercial',
    },
    {
      id: 'hero-5-resort',
      image: '/assets/hero-slider-resort.jpg',
      eyebrow: locale === 'ml' ? 'റിസോർട്ടുകൾ വിൽക്കാനുണ്ട്' : 'RESORT FOR SALE',
      serviceBadge: locale === 'ml' ? 'ഇക്കോ-ടൂറിസം റിട്രീറ്റുകൾ' : 'LUXURY HOSPITALITY & ECO-RESORTS',
      title: locale === 'ml' ? 'തടാക തീര ആഡംബര ഇക്കോ-റിസോർട്ടുകൾ' : 'Serene Wayanad Lakeside & Rainforest Eco-Resorts',
      subtitle: locale === 'ml' ? 'പ്രകൃതിദത്ത തടാക തീരത്ത് സ്ഥിതി ചെയ്യുന്ന പ്രവർത്തിക്കുന്ന റിസോർട്ടുകൾ, ഇൻഫിനിറ്റി പൂൾ, പൂർണ്ണ ടൂറിസം അനുമതികൾ.' : 'Operating boutique chalets, cliffside infinity pools, approved eco-tourism masterplans, and lasting returns.',
      ctaLabel: locale === 'ml' ? 'റിസോർട്ടുകൾ കാണുക' : 'Explore Resorts',
      ctaLink: '/projects?category=resort',
    },
  ]

  const keralaGalleryItems = [
    {
      id: 'kerala-1',
      title: locale === 'ml' ? 'പരമ്പരാഗത കേരള തറവാട് ഭവനം' : 'Heritage Kerala Courtyard Residence',
      location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
      tag: locale === 'ml' ? 'വീടുകൾ · House for Sale' : 'House for Sale · Heritage Architecture',
      image: '/assets/kerala-house-traditional.png',
      categoryLink: '/projects?category=house',
    },
    {
      id: 'kerala-2',
      title: locale === 'ml' ? 'ഹൈവേ കൊമേഴ്‌സ്യൽ ഷോപ്പിംഗ് പ്ലാസ' : 'EK Commercial Arcade & Showrooms',
      location: locale === 'ml' ? 'ടൗൺ സെന്റർ, വയനാട്' : 'Town Center, Wayanad',
      tag: locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ · Commercial' : 'Commercial Building · Prime Retail',
      image: '/assets/kerala-commercial-arcade.png',
      categoryLink: '/projects?category=commercial',
    },
    {
      id: 'kerala-3',
      title: locale === 'ml' ? 'വന സാമീപ്യമുള്ള ഇക്കോ റിസോർട്ട്' : 'Forest Canopy Eco-Resort & Cottages',
      location: locale === 'ml' ? 'വൈത്തിരി താഴ്‌വര' : 'Vythiri Rainforest Edge',
      tag: locale === 'ml' ? 'റിസോർട്ടുകൾ · Resort for Sale' : 'Resort for Sale · Operational Retreat',
      image: '/assets/kerala-resort-traditional.png',
      categoryLink: '/projects?category=resort',
    },
    {
      id: 'kerala-4',
      title: locale === 'ml' ? 'ഫലഭൂയിഷ്ഠമായ ഹിൽസൈഡ് പ്ലോട്ട്' : 'Verdant Hillside Plantation Plot',
      location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
      tag: locale === 'ml' ? 'സ്ഥലങ്ങൾ · Land for Sale' : 'Land for Sale · Panoramic Parcel',
      image: '/assets/kerala-plot-hillside.png',
      categoryLink: '/projects?category=land',
    },
    {
      id: 'kerala-5',
      title: locale === 'ml' ? 'ആധുനിക മൾട്ടി-ടയർ കൊമേഴ്‌സ്യൽ കോംപ്ലക്സ്' : 'Contemporary Commercial Hub & Parking',
      location: locale === 'ml' ? 'സുൽത്താൻ ബത്തേരി' : 'Sulthan Bathery Corridor',
      tag: locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ · Commercial' : 'Commercial Building · Highway Facing',
      image: '/assets/kerala-commercial-modern.png',
      categoryLink: '/projects?category=commercial',
    },
    {
      id: 'kerala-6',
      title: locale === 'ml' ? 'സമകാലിക കേരള വാസ്തുശില്പ വില്ല' : 'Contemporary Kerala Architectural Villa',
      location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
      tag: locale === 'ml' ? 'വാസ്തുശില്പം · Modern Kerala' : 'House for Sale · Modern Kerala',
      image: '/assets/kerala-house-sale.png',
      categoryLink: '/projects?category=house',
    },
  ]

  return (
    <div className="vl-homepage-root">
      {/* ========================================================================= */}
      {/* SECTION 1: 5-SLIDE RUNNING EDITORIAL HERO SLIDER                          */}
      {/* ========================================================================= */}
      <HeroSlider slides={heroSlides} locale={locale} />

      {/* ========================================================================= */}
      {/* SECTION 2: BRAND INTRODUCTION & ARCHITECTURAL PHILOSOPHY                  */}
      {/* ========================================================================= */}
      <section id="editorial-intro" className="vl-intro-section">
        <div className="vl-container">
          <div className="vl-intro-grid">
            {/* Left Editorial Narrative Column */}
            <div className="vl-intro-col-text">
              <span className="vl-editorial-eyebrow">
                <span className="vl-eyebrow-line" />
                <span>{t('home.introTag')}</span>
              </span>

              <h2 className="vl-intro-heading">
                {t('home.introTitle').split('\n').map((line: string, i: number) => (
                  <span key={i} className="vl-heading-line">
                    {line}
                  </span>
                ))}
              </h2>

              <div className="vl-intro-body">
                <p className="vl-intro-lead">{t('home.introP1')}</p>
                <p className="vl-intro-sub">{t('home.introP2')}</p>
              </div>

              <div className="vl-intro-cta">
                <Link href="/about" className="vl-text-link-editorial">
                  <span>{t('nav.about')} Vayaland</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Architectural Composition Column */}
            <div className="vl-intro-col-media">
              <div className="vl-intro-image-frame">
                <div className="vl-intro-image-wrapper">
                  <Image
                    src="/assets/kerala-house-heritage-hires.jpg"
                    alt="Vayaland Architecture in Wayanad"
                    fill
                    sizes="(max-width: 900px) 100vw, 540px"
                    className="vl-intro-img"
                  />
                  <div className="vl-intro-img-scrim" />
                </div>

                {/* Overlaid Floating Editorial Card */}
                <div className="vl-intro-floating-card">
                  <div className="vl-card-quote-mark">“</div>
                  <p className="vl-card-quote-text">
                    Where the enduring mist of the Western Ghats meets contemporary architectural craft.
                  </p>
                  <div className="vl-card-location-meta">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>Wayanad, Kerala · 11.6854° N, 76.1320° E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2.5: BUY & SELL DUAL ENGAGEMENT WITH VAYALAND                     */}
      {/* ========================================================================= */}
      <section className="vl-buysell-section">
        <div className="vl-container">
          <div className="vl-buysell-header">
            <span className="vl-editorial-eyebrow">
              <span className="vl-eyebrow-line" />
              <span>{t('home.buySellTag')}</span>
            </span>
            <h2 className="vl-buysell-title">
              {t('home.buySellTitle').split('\n').map((line: string, i: number) => (
                <span key={i} className="vl-buysell-title-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="vl-buysell-sub">{t('home.buySellSub')}</p>
          </div>

          <div className="vl-buysell-grid">
            {/* CARD 1: FOR BUYERS */}
            <div className="vl-buysell-card vl-buysell-card--buy">
              <div className="vl-buysell-card-top">
                <span className="vl-buysell-badge vl-buysell-badge--buy">{t('home.forBuyersBadge')}</span>
                <div className="vl-buysell-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
              </div>

              <h3 className="vl-buysell-card-title">{t('home.forBuyersTitle')}</h3>
              <p className="vl-buysell-card-desc">{t('home.forBuyersDesc')}</p>

              <ul className="vl-buysell-points">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-teal)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.buyerPoint1')}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-teal)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.buyerPoint2')}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-teal)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.buyerPoint3')}</span>
                </li>
              </ul>

              <div className="vl-buysell-actions">
                <Link href="/projects" className="vl-btn-gold">
                  <span>{t('home.buyerBtnExplore')}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={waBuyLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vl-btn-whatsapp-editorial"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>{t('home.buyerBtnWa')}</span>
                </a>
              </div>
            </div>

            {/* CARD 2: FOR SELLERS */}
            <div className="vl-buysell-card vl-buysell-card--sell">
              <div className="vl-buysell-card-top">
                <span className="vl-buysell-badge vl-buysell-badge--sell">{t('home.forSellersBadge')}</span>
                <div className="vl-buysell-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>

              <h3 className="vl-buysell-card-title">{t('home.forSellersTitle')}</h3>
              <p className="vl-buysell-card-desc">{t('home.forSellersDesc')}</p>

              <ul className="vl-buysell-points">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-amber)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.sellerPoint1')}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-amber)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.sellerPoint2')}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vl-amber)" strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{t('home.sellerPoint3')}</span>
                </li>
              </ul>

              <div className="vl-buysell-actions">
                <Link href="/contact" className="vl-btn-gold">
                  <span>{t('home.sellerBtnList')}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={waSellLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vl-btn-whatsapp-editorial"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>{t('home.sellerBtnWa')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FEATURED PROJECT MAGAZINE SPREAD                               */}
      {/* ========================================================================= */}
      <section className="vl-featured-spread">
        <div className="vl-container">
          <div className="vl-spread-header">
            <div className="vl-spread-header-left">
              <span className="vl-editorial-eyebrow">
                <span className="vl-eyebrow-line" />
                <span>{t('home.featuredTag')}</span>
              </span>
              <h2 className="vl-spread-main-title">{t('home.featuredTitle')}</h2>
            </div>
            <span className="vl-spotlight-badge">
              <span className="vl-badge-dot" />
              <span>{t('home.featuredBadge')}</span>
            </span>
          </div>

          <div className="vl-spread-body">
            {/* Cinematic Visual Stage */}
            <div className="vl-spread-stage">
              <Image
                src="/assets/kerala-resort-luxury-hires.jpg"
                alt="The Mistral Horizon Villa & Estate"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="vl-spread-stage-img"
              />
              <div className="vl-spread-stage-overlay" />
              <div className="vl-spread-stage-badge">
                <span>{t('home.featuredStatus')}</span>
              </div>
            </div>

            {/* Architectural Data & Story Board */}
            <div className="vl-spread-dossier">
              <div className="vl-dossier-meta">
                <div className="vl-dossier-loc">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{t('home.featuredLoc')}</span>
                </div>
                <span className="vl-dossier-type">{t('home.featuredType')}</span>
              </div>

              <p className="vl-dossier-desc">
                {t('home.featuredDesc')}
              </p>

              {/* Architectural Specifications Grid */}
              <div className="vl-specs-grid">
                <div className="vl-spec-item">
                  <span className="vl-spec-label">Land Extent</span>
                  <span className="vl-spec-value">2.8 Acres</span>
                </div>
                <div className="vl-spec-item">
                  <span className="vl-spec-label">Elevation</span>
                  <span className="vl-spec-value">2,600 FT</span>
                </div>
                <div className="vl-spec-item">
                  <span className="vl-spec-label">Pool Feature</span>
                  <span className="vl-spec-value">25m Infinity Edge</span>
                </div>
                <div className="vl-spec-item">
                  <span className="vl-spec-label">Architecture</span>
                  <span className="vl-spec-value">Limestone & Teak</span>
                </div>
              </div>

              <div className="vl-dossier-actions">
                <Link href="/projects" className="vl-btn-gold">
                  <span>{t('home.viewProject')}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Enquiry for The Mistral Horizon Villa & Estate')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vl-btn-ghost-dark"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>WhatsApp Enquire</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: ASYMMETRIC PROPERTY COLLECTION                                 */}
      {/* ========================================================================= */}
      <section className="vl-collection-grid-section">
        <div className="vl-container">
          <div className="vl-collection-header">
            <div className="vl-collection-header-text">
              <span className="vl-editorial-eyebrow">
                <span className="vl-eyebrow-line" />
                <span>{t('home.collectionTag')}</span>
              </span>
              <h2 className="vl-editorial-headline">{t('home.collectionTitle')}</h2>
              <p className="vl-editorial-sub">{t('home.collectionSub')}</p>
            </div>
            <div className="vl-collection-header-cta">
              <Link href="/projects" className="vl-btn-outline">
                <span>{t('home.viewAll')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="vl-cards-composition">
            {displayProperties.slice(0, 4).map((p: any, idx: number) => {
              const imgUrl = p.images?.[0]?.sizes?.card?.url || p.images?.[0]?.url || p.imageUrl || '/assets/kerala-land-plantation-hires.jpg'
              const propertyTag = p.propertyType === 'land'
                ? t('gallery.tagLand')
                : p.propertyType === 'commercial'
                ? t('gallery.tagCommercial')
                : t('gallery.tagHouse')
              const isLargeCard = idx === 0

              return (
                <article
                  key={p.id || idx}
                  className={`vl-prop-card ${isLargeCard ? 'vl-prop-card-large' : 'vl-prop-card-regular'}`}
                >
                  <Link href="/projects" className="vl-prop-card-link" aria-label={p.title}>
                    <div className="vl-prop-media-box">
                      <Image
                        src={imgUrl}
                        alt={p.title}
                        fill
                        sizes={isLargeCard ? '(max-width: 768px) 100vw, 65vw' : '(max-width: 768px) 100vw, 33vw'}
                        className="vl-prop-card-img"
                      />
                      <div className="vl-prop-scrim" />
                      <span className="vl-prop-type-badge">{propertyTag}</span>
                    </div>

                    <div className="vl-prop-info-box">
                      <div className="vl-prop-loc-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        <span>{p.location || 'Wayanad, Kerala'}</span>
                      </div>

                      <h3 className="vl-prop-title">{p.title}</h3>

                      <div className="vl-prop-meta-footer">
                        <div className="vl-prop-price-tag">
                          {p.price || (locale === 'ml' ? 'വില വിവരങ്ങൾക്ക് ബന്ധപ്പെടുക' : 'Price on Enquiry')}
                        </div>
                        {p.extent && <span className="vl-prop-extent">{p.extent}</span>}
                        <div className="vl-prop-arrow-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="vl-collection-mobile-cta">
            <Link href="/projects" className="vl-btn-outline">
              <span>{t('home.viewAll')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: THE VAYALAND DIFFERENCE                                        */}
      {/* ========================================================================= */}
      <section className="vl-difference-section">
        <div className="vl-container">
          <div className="vl-difference-header">
            <span className="vl-editorial-eyebrow-light">
              <span className="vl-eyebrow-line-gold" />
              <span>{t('home.diffTag')}</span>
            </span>
            <h2 className="vl-diff-headline">{t('home.diffTitle')}</h2>
          </div>

          <div className="vl-diff-grid">
            <div className="vl-diff-card">
              <div className="vl-diff-num">01</div>
              <div className="vl-diff-card-content">
                <h3 className="vl-diff-title">{t('home.diff1Title')}</h3>
                <p className="vl-diff-desc">{t('home.diff1Desc')}</p>
              </div>
              <div className="vl-diff-border-glow" />
            </div>

            <div className="vl-diff-card">
              <div className="vl-diff-num">02</div>
              <div className="vl-diff-card-content">
                <h3 className="vl-diff-title">{t('home.diff2Title')}</h3>
                <p className="vl-diff-desc">{t('home.diff2Desc')}</p>
              </div>
              <div className="vl-diff-border-glow" />
            </div>

            <div className="vl-diff-card">
              <div className="vl-diff-num">03</div>
              <div className="vl-diff-card-content">
                <h3 className="vl-diff-title">{t('home.diff3Title')}</h3>
                <p className="vl-diff-desc">{t('home.diff3Desc')}</p>
              </div>
              <div className="vl-diff-border-glow" />
            </div>

            <div className="vl-diff-card">
              <div className="vl-diff-num">04</div>
              <div className="vl-diff-card-content">
                <h3 className="vl-diff-title">{t('home.diff4Title')}</h3>
                <p className="vl-diff-desc">{t('home.diff4Desc')}</p>
              </div>
              <div className="vl-diff-border-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CURATED STATISTICS STRIP                                       */}
      {/* ========================================================================= */}
      <section className="vl-stats-strip">
        <div className="vl-container">
          <div className="vl-stats-grid">
            <div className="vl-stat-box">
              <span className="vl-stat-metric">{t('home.stat1Num')}</span>
              <span className="vl-stat-label">{t('home.stat1Lbl')}</span>
            </div>
            <div className="vl-stat-divider" />
            <div className="vl-stat-box">
              <span className="vl-stat-metric">{t('home.stat2Num')}</span>
              <span className="vl-stat-label">{t('home.stat2Lbl')}</span>
            </div>
            <div className="vl-stat-divider" />
            <div className="vl-stat-box">
              <span className="vl-stat-metric">{t('home.stat3Num')}</span>
              <span className="vl-stat-label">{t('home.stat3Lbl')}</span>
            </div>
            <div className="vl-stat-divider" />
            <div className="vl-stat-box">
              <span className="vl-stat-metric">{t('home.stat4Num')}</span>
              <span className="vl-stat-label">{t('home.stat4Lbl')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: VISUAL GALLERY                                                 */}
      {/* ========================================================================= */}
      <VisualGallery
        eyebrow={locale === 'ml' ? 'കേരള വാസ്തുശില്പ ഗാലറി' : 'KERALA ARCHITECTURAL & LANDSCAPE GALLERY'}
        title={locale === 'ml' ? 'വയനാടിന്റെ തനത് ഭൂപ്രകൃതിയും ഭവനങ്ങളും' : 'The Kerala Living Chronicle'}
        subtitle={locale === 'ml' ? 'വയനാട്ടിലെ സമകാലിക ഭവനങ്ങൾ, പ്ലാന്റേഷൻ ഭൂമികൾ, തടാക റിസോർട്ടുകൾ എന്നിവയുടെ ദൃശ്യാനുഭവം.' : 'An intimate visual showcase of authentic Kerala architecture, lush plantation parcels, and lakeside resorts curated by Vayaland.'}
        items={keralaGalleryItems}
      />

      {/* ========================================================================= */}
      {/* SECTION 8: EMOTIONAL EDITORIAL CLOSING CTA                                */}
      {/* ========================================================================= */}
      <section className="vl-closing-cta">
        <div className="vl-closing-glow-overlay" />
        <div className="vl-container">
          <div className="vl-closing-inner">
            <span className="vl-editorial-eyebrow-light">
              <span className="vl-eyebrow-line-gold" />
              <span>{t('home.closingTag')}</span>
            </span>

            <h2 className="vl-closing-headline">
              {t('home.closingTitle').split('\n').map((line: string, i: number) => (
                <span key={i} className="vl-closing-line">
                  {line}
                </span>
              ))}
            </h2>

            <p className="vl-closing-desc">
              {t('home.closingSub')}
            </p>

            <div className="vl-closing-actions">
              <Link href="/contact" className="vl-btn-gold">
                <span>{t('home.startConversation')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={waConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="vl-btn-whatsapp-editorial"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
