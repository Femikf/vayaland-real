import React from 'react'
import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { waLink, WA_NUMBER } from '@/lib/site'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  const consultationWa = waLink(
    locale === 'ml'
      ? 'നമസ്കാരം, വയലാൻഡിനെക്കുറിച്ചും നിങ്ങളുടെ പ്രോപ്പർട്ടി അഡ്വൈസറിയെക്കുറിച്ചും സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Vayaland, I would like to schedule an architectural consultation and learn more about your land & property collective in Wayanad.'
  )

  return (
    <div className="vl-about-page-root">
      {/* ========================================================================= */}
      {/* STAGE 1: CINEMATIC EDITORIAL HERO                                         */}
      {/* ========================================================================= */}
      <section className="vl-about-hero" aria-label="About Hero">
        <div className="vl-about-hero-bg">
          <Image
            src="/assets/hero-cinematic.jpg"
            alt="Vayaland Architectural Real Estate Wayanad"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="vl-about-hero-img"
          />
          <div className="vl-about-hero-scrim" />
        </div>

        <div className="vl-container vl-about-hero-container">
          <div className="vl-about-hero-content">
            <span className="vl-hero-tag">
              <span className="vl-tag-accent" />
              <span>{t('heroEyebrow')}</span>
            </span>

            <h1 className="vl-about-main-title">{t('heroTitle')}</h1>

            <p className="vl-about-hero-sub">{t('heroSub')}</p>

            <a href="#statement" className="vl-hero-scroll-hint" aria-label="Scroll to philosophy statement">
              <span className="vl-scroll-pill">
                <span className="vl-scroll-dot" />
              </span>
              <span className="vl-scroll-text">DISCOVER OUR PHILOSOPHY</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 2: LARGE STATEMENT SECTION                                          */}
      {/* ========================================================================= */}
      <section id="statement" className="vl-about-statement">
        <div className="vl-container">
          <div className="vl-statement-grid">
            <div className="vl-statement-quote-col">
              <span className="vl-editorial-eyebrow">
                <span className="vl-eyebrow-line" />
                <span>FOUNDING PHILOSOPHY</span>
              </span>
              <blockquote className="vl-statement-quote">
                {t('statementQuote').split('\n').map((line, i) => (
                  <span key={i} className="vl-quote-line">
                    {line}
                  </span>
                ))}
              </blockquote>
              <div className="vl-statement-accent-bar" />
            </div>

            <div className="vl-statement-body-col">
              <p className="vl-statement-p1">{t('statementP1')}</p>
              <p className="vl-statement-p2">{t('statementP2')}</p>
              <div className="vl-statement-location-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>Pulpally, Wayanad · 11.7853° N, 76.1684° E</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 3: VISION & MISSION DUAL-STAGE                                      */}
      {/* ========================================================================= */}
      <section className="vl-about-vision-mission">
        <div className="vl-container">
          <div className="vl-vm-grid">
            {/* Vision Stage */}
            <div className="vl-vm-card vl-vm-vision">
              <div className="vl-vm-card-inner">
                <span className="vl-editorial-eyebrow-light">
                  <span className="vl-eyebrow-line-gold" />
                  <span>{t('visionEyebrow')}</span>
                </span>
                <h2 className="vl-vm-title">{t('visionTitle')}</h2>
                <p className="vl-vm-desc">{t('visionDesc')}</p>
                <div className="vl-vm-badge">
                  <span className="vl-badge-dot" />
                  <span>Permanent Ecological Living</span>
                </div>
              </div>
              <div className="vl-vm-glow-ambient" />
            </div>

            {/* Mission Stage */}
            <div className="vl-vm-card vl-vm-mission">
              <div className="vl-vm-card-inner">
                <span className="vl-editorial-eyebrow">
                  <span className="vl-eyebrow-line" />
                  <span>{t('missionEyebrow')}</span>
                </span>
                <h2 className="vl-vm-title vl-vm-title--dark">{t('missionTitle')}</h2>
                <p className="vl-vm-desc vl-vm-desc--dark">{t('missionDesc')}</p>

                <div className="vl-mission-commitments">
                  <div className="vl-commit-item">
                    <div className="vl-commit-check">✓</div>
                    <div>
                      <h4 className="vl-commit-title">{t('missionC1Title')}</h4>
                      <p className="vl-commit-desc">{t('missionC1Desc')}</p>
                    </div>
                  </div>
                  <div className="vl-commit-item">
                    <div className="vl-commit-check">✓</div>
                    <div>
                      <h4 className="vl-commit-title">{t('missionC2Title')}</h4>
                      <p className="vl-commit-desc">{t('missionC2Desc')}</p>
                    </div>
                  </div>
                  <div className="vl-commit-item">
                    <div className="vl-commit-check">✓</div>
                    <div>
                      <h4 className="vl-commit-title">{t('missionC3Title')}</h4>
                      <p className="vl-commit-desc">{t('missionC3Desc')}</p>
                    </div>
                  </div>
                </div>

                <div className="vl-about-dual-pillars">
                  <h3 className="vl-dual-pillars-heading">{t('dualPillarTitle')}</h3>
                  <div className="vl-dual-pillars-grid">
                    <div className="vl-dual-pillar-card vl-dual-pillar-card--buyer">
                      <span className="vl-dual-pillar-tag">FOR BUYERS</span>
                      <h4 className="vl-dual-pillar-title">{t('buyerPillarTitle')}</h4>
                      <p className="vl-dual-pillar-desc">{t('buyerPillarDesc')}</p>
                    </div>
                    <div className="vl-dual-pillar-card vl-dual-pillar-card--seller">
                      <span className="vl-dual-pillar-tag">FOR PROPERTY OWNERS</span>
                      <h4 className="vl-dual-pillar-title">{t('sellerPillarTitle')}</h4>
                      <p className="vl-dual-pillar-desc">{t('sellerPillarDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 4: 4 VISUAL VALUES GRID                                             */}
      {/* ========================================================================= */}
      <section className="vl-about-values">
        <div className="vl-container">
          <div className="vl-values-header">
            <span className="vl-editorial-eyebrow">
              <span className="vl-eyebrow-line" />
              <span>{t('valuesEyebrow')}</span>
            </span>
            <h2 className="vl-editorial-headline">{t('valuesTitle')}</h2>
          </div>

          <div className="vl-values-grid">
            {/* Value 01 */}
            <div className="vl-val-card">
              <div className="vl-val-bg">
                <Image
                  src="/assets/architectural-limestone.jpg"
                  alt={t('val1Title')}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="vl-val-bg-img"
                />
                <div className="vl-val-bg-overlay" />
              </div>
              <div className="vl-val-card-content">
                <span className="vl-val-num">{t('val1Num')}</span>
                <h3 className="vl-val-title">{t('val1Title')}</h3>
                <p className="vl-val-desc">{t('val1Desc')}</p>
              </div>
            </div>

            {/* Value 02 */}
            <div className="vl-val-card">
              <div className="vl-val-bg">
                <Image
                  src="/assets/modern-timber-eaves.jpg"
                  alt={t('val2Title')}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="vl-val-bg-img"
                />
                <div className="vl-val-bg-overlay" />
              </div>
              <div className="vl-val-card-content">
                <span className="vl-val-num">{t('val2Num')}</span>
                <h3 className="vl-val-title">{t('val2Title')}</h3>
                <p className="vl-val-desc">{t('val2Desc')}</p>
              </div>
            </div>

            {/* Value 03 */}
            <div className="vl-val-card">
              <div className="vl-val-bg">
                <Image
                  src="/assets/golden-sunset-palms.jpg"
                  alt={t('val3Title')}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="vl-val-bg-img"
                />
                <div className="vl-val-bg-overlay" />
              </div>
              <div className="vl-val-card-content">
                <span className="vl-val-num">{t('val3Num')}</span>
                <h3 className="vl-val-title">{t('val3Title')}</h3>
                <p className="vl-val-desc">{t('val3Desc')}</p>
              </div>
            </div>

            {/* Value 04 */}
            <div className="vl-val-card">
              <div className="vl-val-bg">
                <Image
                  src="/assets/kerala-mist-sunrise.jpg"
                  alt={t('val4Title')}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="vl-val-bg-img"
                />
                <div className="vl-val-bg-overlay" />
              </div>
              <div className="vl-val-card-content">
                <span className="vl-val-num">{t('val4Num')}</span>
                <h3 className="vl-val-title">{t('val4Title')}</h3>
                <p className="vl-val-desc">{t('val4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 5: VERTICAL JOURNEY TIMELINE                                        */}
      {/* ========================================================================= */}
      <section className="vl-about-timeline">
        <div className="vl-container">
          <div className="vl-timeline-header">
            <span className="vl-editorial-eyebrow-light">
              <span className="vl-eyebrow-line-gold" />
              <span>{t('journeyEyebrow')}</span>
            </span>
            <h2 className="vl-timeline-title">{t('journeyTitle')}</h2>
            <p className="vl-timeline-sub">{t('journeySub')}</p>
          </div>

          <div className="vl-timeline-spine-wrap">
            <div className="vl-timeline-spine" />

            {/* Milestone 01 */}
            <div className="vl-timeline-item vl-timeline-item--left">
              <div className="vl-timeline-node">
                <span className="vl-node-dot" />
              </div>
              <div className="vl-timeline-card">
                <span className="vl-milestone-phase">{t('m1Phase')}</span>
                <h3 className="vl-milestone-title">{t('m1Title')}</h3>
                <p className="vl-milestone-desc">{t('m1Desc')}</p>
              </div>
            </div>

            {/* Milestone 02 */}
            <div className="vl-timeline-item vl-timeline-item--right">
              <div className="vl-timeline-node">
                <span className="vl-node-dot" />
              </div>
              <div className="vl-timeline-card">
                <span className="vl-milestone-phase">{t('m2Phase')}</span>
                <h3 className="vl-milestone-title">{t('m2Title')}</h3>
                <p className="vl-milestone-desc">{t('m2Desc')}</p>
              </div>
            </div>

            {/* Milestone 03 */}
            <div className="vl-timeline-item vl-timeline-item--left">
              <div className="vl-timeline-node">
                <span className="vl-node-dot" />
              </div>
              <div className="vl-timeline-card">
                <span className="vl-milestone-phase">{t('m3Phase')}</span>
                <h3 className="vl-milestone-title">{t('m3Title')}</h3>
                <p className="vl-milestone-desc">{t('m3Desc')}</p>
              </div>
            </div>

            {/* Milestone 04 */}
            <div className="vl-timeline-item vl-timeline-item--right">
              <div className="vl-timeline-node">
                <span className="vl-node-dot" />
              </div>
              <div className="vl-timeline-card">
                <span className="vl-milestone-phase">{t('m4Phase')}</span>
                <h3 className="vl-milestone-title">{t('m4Title')}</h3>
                <p className="vl-milestone-desc">{t('m4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 6: PEOPLE & ADVISORY DISCIPLINES                                    */}
      {/* ========================================================================= */}
      <section className="vl-about-team">
        <div className="vl-container">
          <div className="vl-team-header">
            <span className="vl-editorial-eyebrow">
              <span className="vl-eyebrow-line" />
              <span>{t('teamEyebrow')}</span>
            </span>
            <h2 className="vl-editorial-headline">{t('teamTitle')}</h2>
            <p className="vl-editorial-sub">{t('teamSub')}</p>
          </div>

          <div className="vl-team-grid">
            {/* Discipline 1 */}
            <div className="vl-team-card">
              <div className="vl-team-media">
                <Image
                  src="/assets/architecture-mood.jpg"
                  alt={t('t1Name')}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="vl-team-img"
                />
                <div className="vl-team-scrim" />
                <span className="vl-team-discipline-pill">LEGAL & REVENUE</span>
              </div>
              <div className="vl-team-info">
                <span className="vl-team-role">{t('t1Role')}</span>
                <h3 className="vl-team-name">{t('t1Name')}</h3>
                <p className="vl-team-desc">{t('t1Desc')}</p>
              </div>
            </div>

            {/* Discipline 2 */}
            <div className="vl-team-card">
              <div className="vl-team-media">
                <Image
                  src="/assets/villa-infinity-sunset.jpg"
                  alt={t('t2Name')}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="vl-team-img"
                />
                <div className="vl-team-scrim" />
                <span className="vl-team-discipline-pill">DESIGN & ELEVATION</span>
              </div>
              <div className="vl-team-info">
                <span className="vl-team-role">{t('t2Role')}</span>
                <h3 className="vl-team-name">{t('t2Name')}</h3>
                <p className="vl-team-desc">{t('t2Desc')}</p>
              </div>
            </div>

            {/* Discipline 3 */}
            <div className="vl-team-card">
              <div className="vl-team-media">
                <Image
                  src="/assets/masterplanned-plots.jpg"
                  alt={t('t3Name')}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="vl-team-img"
                />
                <div className="vl-team-scrim" />
                <span className="vl-team-discipline-pill">PRIVATE CLIENTS</span>
              </div>
              <div className="vl-team-info">
                <span className="vl-team-role">{t('t3Role')}</span>
                <h3 className="vl-team-name">{t('t3Name')}</h3>
                <p className="vl-team-desc">{t('t3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 7: CREDIBILITY & TRUST BENCHMARKS                                   */}
      {/* ========================================================================= */}
      <section className="vl-about-credibility">
        <div className="vl-container">
          <div className="vl-cred-header">
            <span className="vl-editorial-eyebrow-light">
              <span className="vl-eyebrow-line-gold" />
              <span>{t('credEyebrow')}</span>
            </span>
            <h2 className="vl-cred-headline">{t('credTitle')}</h2>
            <p className="vl-cred-sub">{t('credSub')}</p>
          </div>

          <div className="vl-cred-grid">
            <div className="vl-cred-card">
              <span className="vl-cred-num">{t('c1Num')}</span>
              <h3 className="vl-cred-title">{t('c1Title')}</h3>
              <p className="vl-cred-desc">{t('c1Desc')}</p>
            </div>
            <div className="vl-cred-card">
              <span className="vl-cred-num">{t('c2Num')}</span>
              <h3 className="vl-cred-title">{t('c2Title')}</h3>
              <p className="vl-cred-desc">{t('c2Desc')}</p>
            </div>
            <div className="vl-cred-card">
              <span className="vl-cred-num">{t('c3Num')}</span>
              <h3 className="vl-cred-title">{t('c3Title')}</h3>
              <p className="vl-cred-desc">{t('c3Desc')}</p>
            </div>
            <div className="vl-cred-card">
              <span className="vl-cred-num">{t('c4Num')}</span>
              <h3 className="vl-cred-title">{t('c4Title')}</h3>
              <p className="vl-cred-desc">{t('c4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 8: FINAL ARCHITECTURAL CTA                                          */}
      {/* ========================================================================= */}
      <section className="vl-about-closing">
        <div className="vl-closing-glow-overlay" />
        <div className="vl-container">
          <div className="vl-about-closing-inner">
            <span className="vl-editorial-eyebrow-light">
              <span className="vl-eyebrow-line-gold" />
              <span>{t('closingEyebrow')}</span>
            </span>

            <h2 className="vl-about-closing-title">{t('closingTitle')}</h2>

            <p className="vl-about-closing-desc">{t('closingSub')}</p>

            <div className="vl-about-closing-actions">
              <Link href="/contact" className="vl-btn-gold">
                <span>{t('ctaContact')}</span>
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
                <span>{t('ctaWhatsapp')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
