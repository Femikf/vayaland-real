import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MAIL, WA_NUMBER } from '@/lib/site'

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="vl-editorial-footer" role="contentinfo">
      <div className="vl-footer-inner">
        {/* Top Branding Strip */}
        <div className="vl-footer-top">
          <div className="vl-footer-brand">
            <Link href="/" className="vl-footer-logo-link" aria-label="Vayaland Home">
              <div className="vl-footer-logo-box">
                <Image
                  src="/assets/logo.png"
                  alt="VAYALAND Real Estate"
                  width={190}
                  height={55}
                  className="vl-footer-logo-img"
                />
              </div>
            </Link>
            <p className="vl-footer-tagline">
              {t('home.heroSub')}
            </p>
            <div className="vl-footer-credentials">
              <span className="vl-cred-pill">RERA Verified Advisory</span>
              <span className="vl-cred-pill">Wayanad, Kerala</span>
            </div>
          </div>

          <div className="vl-footer-nav-col">
            <h4 className="vl-footer-heading">{t('services.heroTitle')}</h4>
            <ul className="vl-footer-links">
              <li><Link href="/projects?category=house">{t('services.ecoPillar1')}</Link></li>
              <li><Link href="/projects?category=land">{t('services.ecoPillar2')}</Link></li>
              <li><Link href="/projects?category=commercial">{t('services.ecoPillar3')}</Link></li>
              <li><Link href="/projects?category=resort">{t('services.ecoPillar4')}</Link></li>
            </ul>
          </div>

          <div className="vl-footer-nav-col">
            <h4 className="vl-footer-heading">{t('footer.navigate')}</h4>
            <ul className="vl-footer-links">
              <li><Link href="/">{t('nav.home')}</Link></li>
              <li><Link href="/services">{t('nav.services')}</Link></li>
              <li><Link href="/about">{t('nav.about')}</Link></li>
              <li><Link href="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="vl-footer-nav-col vl-footer-contact-col">
            <h4 className="vl-footer-heading">{t('nav.contact')}</h4>
            <div className="vl-footer-contact-info">
              <p className="vl-footer-address">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>{t('contact.addressValue')}</span>
              </p>
              <a href={`tel:+${WA_NUMBER}`} className="vl-footer-link-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+{WA_NUMBER}</span>
              </a>
              <a href={`mailto:${MAIL}`} className="vl-footer-link-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{MAIL}</span>
              </a>
            </div>

            <div className="vl-footer-social">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="vl-social-bubble"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="vl-social-bubble"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="vl-social-bubble"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Regions Bar */}
        <div className="vl-footer-regions">
          <span className="vl-regions-label">Wayanad Regions:</span>
          <div className="vl-regions-list">
            <span>Meppadi</span>
            <span className="dot">•</span>
            <span>Vythiri</span>
            <span className="dot">•</span>
            <span>Sulthan Bathery</span>
            <span className="dot">•</span>
            <span>Mananthavady</span>
            <span className="dot">•</span>
            <span>Pulpally</span>
            <span className="dot">•</span>
            <span>Kalpetta</span>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="vl-footer-bottom">
          <p className="vl-footer-copy">
            &copy; {new Date().getFullYear()} VAYALAND Real Estate. All rights reserved.
          </p>
          <div className="vl-footer-legal-links">
            <span>Land · Homes · Possibilities</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
