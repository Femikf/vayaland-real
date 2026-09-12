'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { WA_NUMBER, waLink } from '@/lib/site'

export type Property = {
  id: string
  title: string
  propertyType: 'house' | 'land' | 'commercial'
  status: 'available' | 'sold'
  price?: string
  location?: string
  specs?: { value?: string }[]
  imageUrl?: string
}

type Tab = 'house' | 'land' | 'commercial' | 'sold'

export function GalleryGrid({ properties }: { properties: Property[] }) {
  const t = useTranslations('gallery')
  const [tab, setTab] = useState<Tab>('house')

  const houseItems      = properties.filter((p) => p.propertyType === 'house'      && p.status !== 'sold')
  const landItems       = properties.filter((p) => p.propertyType === 'land'       && p.status !== 'sold')
  const commercialItems = properties.filter((p) => p.propertyType === 'commercial' && p.status !== 'sold')
  const soldItems       = properties.filter((p) => p.status === 'sold')

  const shown =
    tab === 'house'      ? houseItems :
    tab === 'land'       ? landItems :
    tab === 'commercial' ? commercialItems :
    soldItems

  return (
    <>
      <div className="tabs">
        <button className={`tab ${tab === 'house' ? 'active' : ''}`} onClick={() => setTab('house')}>
          <span>{t('tabHouse')}</span><span className="cnt">{houseItems.length}</span>
        </button>
        <button className={`tab ${tab === 'land' ? 'active' : ''}`} onClick={() => setTab('land')}>
          <span>{t('tabLand')}</span><span className="cnt">{landItems.length}</span>
        </button>
        <button className={`tab ${tab === 'commercial' ? 'active' : ''}`} onClick={() => setTab('commercial')}>
          <span>{t('tabCommercial')}</span><span className="cnt">{commercialItems.length}</span>
        </button>
        <button className={`tab ${tab === 'sold' ? 'active' : ''}`} onClick={() => setTab('sold')}>
          <span>{t('tabSold')}</span><span className="cnt">{soldItems.length}</span>
        </button>
      </div>

      <div className="gwrap">
        <div className="grid">
          {shown.map((p) => {
            const isSold = p.status === 'sold'
            const tagLabel =
              p.propertyType === 'land'       ? t('tagLand') :
              p.propertyType === 'commercial' ? t('tagCommercial') :
              t('tagHouse')
            return (
              <article className="gcard in" key={p.id}>
                <div className="gimg">
                  <div className="ph" style={{ backgroundImage: p.imageUrl ? `url('${p.imageUrl}')` : undefined }} />
                  {isSold
                    ? <span className="sold-stamp">{t('sold')}</span>
                    : <span className="gtag">{tagLabel}</span>}
                </div>
                <div className="gbody">
                  <div className="gloc">
                    <svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    <span>{p.location}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <div className={`gprice ${isSold ? '' : 'gold-text'}`} style={isSold ? { color: 'var(--text-dim)', textDecoration: 'line-through' } : undefined}>
                    {p.price}
                  </div>
                  {p.specs && p.specs.length > 0 && (
                    <div className="gspecs">
                      {p.specs.map((s, i) => <span key={i}>{s.value}</span>)}
                    </div>
                  )}
                  <Link href={`/gallery/${p.id}`} className="gcard-link">
                    {t('viewDetails')}
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Enquiry banner */}
        <div className="gcta">
          <div className="gcta-text">
            <h3>{t('ctaTitle')}</h3>
            <p>{t('ctaSub')}</p>
          </div>
          <div className="gcta-btns">
            <a
              href={waLink('Hi, I am looking for a property in Wayanad and need your help.')}
              className="btn-whatsapp"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
              </svg>
              {t('ctaWhatsapp')}
            </a>
            <a href={`tel:+${WA_NUMBER}`} className="btn-ghost">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {t('ctaCall')}
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
