import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { HeroCarousel, type Slide } from '@/components/HeroCarousel'
import { waLink, mailLink } from '@/lib/site'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const payload = await getPayload({ config })

  const [{ docs: slideDocs }, { docs: featured }, { docs: featuredServices }] = await Promise.all([
    payload.find({
      collection: 'hero-slides',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { active: { equals: true } },
      sort: 'order',
    }),
    payload.find({
      collection: 'properties',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { featured: { equals: true } },
      limit: 3,
    }),
    payload.find({
      collection: 'services',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { and: [{ active: { equals: true } }, { featured: { equals: true } }] },
      sort: 'order',
      limit: 4,
    }),
  ])

  const slides: Slide[] = slideDocs.map((s: any) => ({
    id: String(s.id),
    title: s.title,
    eyebrow: s.eyebrow,
    subtitle: s.subtitle,
    ctaLabel: s.ctaLabel,
    ctaLink: s.ctaLink,
    imageUrl: s.image?.sizes?.hero?.url || s.image?.url,
  }))

  const divisions = [
    {
      label: t('divisions.realEstate'),
      tag: t('divisions.realEstateTag'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V21H3V9.5z"/>
          <path d="M9 21v-7h6v7"/>
        </svg>
      ),
    },
    {
      label: t('divisions.construction'),
      tag: t('divisions.constructionTag'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="12" height="19" rx="1"/>
          <line x1="4" y1="9" x2="16" y2="9"/>
          <line x1="4" y1="15" x2="16" y2="15"/>
          <line x1="9" y1="3" x2="9" y2="22"/>
          <path d="M16 7h3a1 1 0 011 1v13h-4"/>
        </svg>
      ),
    },
    {
      label: t('divisions.fire'),
      tag: t('divisions.fireTag'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c4 0 7-3 7-7 0-4-3-7-3-7s-.5 2.5-2.5 4C13 10 11 8 10.5 6 10.5 6 5 9 5 15c0 4 3 7 7 7z"/>
          <path d="M12 22c-2 0-3.5-1.5-3.5-3.5 0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5C15.5 20.5 14 22 12 22z"/>
        </svg>
      ),
    },
    {
      label: t('divisions.transport'),
      tag: t('divisions.transportTag'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="5" width="14" height="11" rx="1"/>
          <path d="M15 8h4l3 4v4h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2"/>
          <circle cx="18.5" cy="18.5" r="2"/>
        </svg>
      ),
    },
  ]

  return (
    <>
      <HeroCarousel slides={slides} scrollLabel={t('hero.scroll')} />

      {/* DIVISIONS */}
      <section id="divisions">
        <div className="wrap">
          <div className="sec-head reveal in">
            <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('divisions.eyebrow')}</span></span>
            <h2 className="display">{t('divisions.title')}</h2>
          </div>
          <div className="divisions">
            {divisions.map((d, i) => (
              <div className="division reveal in" key={i}>
                <span className="dnum">{String(i + 1).padStart(2, '0')}</span>
                <div className="di">{d.icon}</div>
                <h3>{d.label}</h3>
                <p className="dtag">{d.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      {featured.length > 0 && (
        <section style={{ background: 'var(--graphite)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="sec-head reveal in">
              <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('featured.eyebrow')}</span></span>
              <h2 className="display">{t('featured.title')}</h2>
            </div>
            <div className="feat-grid">
              {featured.map((p: any) => {
                const img = p.images?.[0]?.sizes?.card?.url || p.images?.[0]?.url
                return (
                  <article className="pcard reveal in" key={p.id}>
                    <div className="pcard-img">
                      <div className="ph" style={img ? { backgroundImage: `url('${img}')` } : undefined} />
                      <span className="pcard-tag">
                        {p.propertyType === 'land' ? t('gallery.tagLand') : p.propertyType === 'commercial' ? t('gallery.tagCommercial') : t('gallery.tagHouse')}
                      </span>
                    </div>
                    <div className="pcard-body">
                      <div className="pcard-loc">
                        <svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                        <span>{p.location}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <div className="pcard-price gold-text">{p.price}</div>
                    </div>
                  </article>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <Link href="/gallery" className="btn-ghost">{t('featured.viewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES PREVIEW */}
      {featuredServices.length > 0 && (
        <section id="services">
          <div className="wrap">
            <div className="sec-head reveal in">
              <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('servicesPreview.eyebrow')}</span></span>
              <h2 className="display">{t('servicesPreview.title')}</h2>
            </div>
            <div className="svc-grid">
              {featuredServices.map((s: any, i: number) => {
                const imgUrl = s.image?.sizes?.card?.url || s.image?.url
                const wa = waLink(`Hi Signature, I'd like to enquire about your ${s.name} service.`)
                const mail = mailLink(`Enquiry: ${s.name}`, `Hi Signature,\n\nI'd like to enquire about your ${s.name} service.\n\nThanks,`)
                return (
                  <div className="svc-card reveal in" key={s.id}>
                    <div
                      className="svc-card-img"
                      style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                    >
                      <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="svc-card-body">
                      <span className="eyebrow">{s.name}</span>
                      <h3 className="svc-card-title">{s.name}</h3>
                      {s.shortDesc && <p className="svc-card-desc">{s.shortDesc}</p>}
                      <div className="svc-card-cta">
                        <a className="btn-whatsapp" href={wa} target="_blank" rel="noopener">
                          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
                          {t('servicesPreview.enquire')}
                        </a>
                        <a className="enq-mailbtn" href={mail}>
                          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                          <span>{t('services.email')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <Link href="/services" className="btn-ghost">{t('servicesPreview.viewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="glow" />
        <div className="cta-inner reveal in">
          <div className="tag">{t('cta.tag')}</div>
          <h2 className="display">{t('cta.title')}</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link href="/services" className="btn-gold">{t('servicesPreview.viewAll')}</Link>
            <Link href="/gallery" className="btn-ghost">{t('featured.viewAll')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
