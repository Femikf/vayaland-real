import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { waLink, mailLink, parseCoords } from '@/lib/site'
import { PropertyGallery, type PropertyImageItem } from '@/components/property/PropertyGallery'

type Media = {
  url?: string
  alt?: string
  title?: string
  sizes?: { card?: { url?: string }; hero?: { url?: string } }
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>
  searchParams?: Promise<{ fromCategory?: string; category?: string }>
}) {
  const { locale, id } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const backCategory = resolvedSearchParams.fromCategory || resolvedSearchParams.category
  const backHref = backCategory && backCategory !== 'all' ? `/projects?category=${backCategory}` : '/projects'

  setRequestLocale(locale)
  const t = await getTranslations('gallery')

  let property: any = null

  // Query property exclusively from Payload CMS
  try {
    const payload = await getPayload({ config })
    property = await payload.findByID({
      collection: 'properties',
      id,
      locale: locale as 'en' | 'ml',
      depth: 1,
    })
  } catch {
    notFound()
  }

  if (!property) notFound()

  // Extract all images uploaded in Payload CMS or defined in showcase
  const rawImages: Media[] = Array.isArray(property.images) ? property.images : []
  let galleryImages: PropertyImageItem[] = rawImages
    .map((img: any) => {
      const url = img?.sizes?.hero?.url || img?.sizes?.card?.url || img?.url
      if (!url) return null
      return {
        url,
        alt: img?.alt || property.title,
        title: img?.title || property.title,
      }
    })
    .filter(Boolean) as PropertyImageItem[]

  // Fallback to single image if no array provided
  if (galleryImages.length === 0) {
    const fallbackUrl =
      property.imageUrl ||
      property.featuredImage?.url ||
      '/assets/no-image-preview.svg'
    galleryImages = [
      {
        url: fallbackUrl,
        alt: property.title,
        title: property.title,
      },
    ]
  }

  const isSold = property.status === 'sold'
  const mapCoords = property.googleEarthLink ? parseCoords(property.googleEarthLink) : null
  const mapEmbedUrl = mapCoords
    ? `https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&z=15&output=embed`
    : null

  let tagLabel = 'Property · For Sale'
  if (property.propertyType === 'land') {
    tagLabel = locale === 'ml' ? 'ഭൂമി · വിൽക്കാനുണ്ട്' : 'Land · For Sale'
  } else if (property.propertyType === 'house') {
    tagLabel = locale === 'ml' ? 'വീട് · വിൽക്കാനുണ്ട്' : 'House · For Sale'
  } else if (property.propertyType === 'commercial') {
    tagLabel = locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ · വിൽക്കാനുണ്ട്' : 'Commercial · For Sale'
  } else if (property.propertyType === 'resort') {
    tagLabel = locale === 'ml' ? 'റിസോർട്ട് · വിൽക്കാനുണ്ട്' : 'Resort · For Sale'
  }

  const wa = waLink(
    isSold
      ? `Hi, I'm looking for a property like ${property.title}. Please share similar options.`
      : `Hi, I'm interested in ${property.title} in Wayanad. Please share more details, all property photos, and arrange a site visit.`,
  )
  const mail = mailLink(
    `Enquiry: ${property.title}`,
    `Hi,\n\nI'm interested in ${property.title}.\nLocation: ${property.location || ''}\nPrice: ${property.price || ''}\n\nPlease share availability, complete photo gallery, and a site visit slot.\n\nThanks,`,
  )

  return (
    <>
      <header className="page-head">
        <div className="inner">
          <Link href={backHref} className="back-link">
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {t('back')}
          </Link>
          <span className="eyebrow" style={{ marginTop: 22, display: 'block' }}>
            <span className="rule" />&nbsp;&nbsp;
            <span>{isSold ? t('sold') : tagLabel}</span>
          </span>
          <h1 className="display">{property.title}</h1>
          {property.location && (
            <div className="prop-head-loc">
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="var(--vl-olive-light)" fill="none" strokeWidth="1.6">
                <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              {property.location}
            </div>
          )}
        </div>
      </header>

      <section className="prop-detail">
        <div className="prop-wrap">

          {/* ========================================================================= */}
          {/* INTERACTIVE MULTI-IMAGE ARCHITECTURAL GALLERY & ENLARGED LIGHTBOX        */}
          {/* ========================================================================= */}
          <PropertyGallery
            images={galleryImages}
            title={property.title}
            isSold={isSold}
            soldLabel={t('sold')}
            viewAllLabel={locale === 'ml' ? 'എല്ലാ ഫോട്ടോകളും കാണുക' : 'View all photos'}
            enlargeHint={locale === 'ml' ? 'വലുതാക്കി കാണുക' : 'Click to enlarge'}
          />

          {/* Price + Specs */}
          <div className="prop-meta">
            {property.price && (
              <div className={`prop-price${isSold ? ' prop-price-sold' : ''}`}>
                {property.price}
              </div>
            )}
            {property.specs && property.specs.length > 0 && (
              <div className="prop-specs">
                {property.specs.map((s: any, i: number) => (
                  <span key={i} className="prop-spec">{s.value}</span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <div className="prop-desc-wrap">
              <h2 className="prop-section-head">{t('about')}</h2>
              <p className="prop-desc">{property.description}</p>
            </div>
          )}

          {/* Google Earth link — land, commercial & resort */}
          {property.googleEarthLink && (property.propertyType === 'land' || property.propertyType === 'commercial' || property.propertyType === 'resort') && (
            <div className="prop-earth">
              <h2 className="prop-section-head">{t('viewOnEarth')}</h2>
              {mapEmbedUrl && (
                <div className="prop-map">
                  <iframe
                    src={mapEmbedUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property location map"
                  />
                </div>
              )}
              <p className="prop-earth-desc">{t('viewOnEarthDesc')}</p>
              <a href={property.googleEarthLink} target="_blank" rel="noopener" className="prop-earth-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
                {t('viewOnEarthBtn')}
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          )}

          {/* Enquiry */}
          <div className="prop-enq">
            <p className="prop-enq-label">{isSold ? t('similar') : t('interested')}</p>
            <div className="prop-enq-btns">
              <a href={wa} className="btn-whatsapp" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm4.4 12.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                {isSold ? t('findSimilar') : t('buyEnquiry')}
              </a>
              {!isSold && (
                <a href={mail} className="btn-ghost">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                  {t('emailUs')}
                </a>
              )}
            </div>
            <Link href={backHref} className="back-link" style={{ marginTop: 40, display: 'inline-flex' }}>
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {t('back')}
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
