'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

export interface GalleryItem {
  id: string
  title: string
  location: string
  tag: string
  image: string
  aspect?: string
  categoryLink?: string
}

interface VisualGalleryProps {
  items?: GalleryItem[]
  title?: string
  eyebrow?: string
  subtitle?: string
}

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Contemporary Kerala Architectural Home',
    location: 'Pulpally, Wayanad',
    tag: 'House for Sale · Modern Kerala',
    image: '/assets/kerala-house-sale.png',
    categoryLink: '/projects?category=house',
  },
  {
    id: '2',
    title: 'Wayanad Terraced Red-Soil Plot',
    location: 'Meppadi Foothills',
    tag: 'Land for Sale · Ready to Build',
    image: '/assets/kerala-land-plot.png',
    categoryLink: '/projects?category=land',
  },
  {
    id: '3',
    title: 'Lush Kerala Palm Grove & Meadow',
    location: 'Sulthan Bathery Plateau',
    tag: 'Land for Sale · Plantation Acreage',
    image: '/assets/kerala-plantation-meadow.png',
    categoryLink: '/projects?category=land',
  },
  {
    id: '4',
    title: 'Banasura Lakeside Hill Resort',
    location: 'Banasura Sagar, Wayanad',
    tag: 'Resort for Sale · Lake Panoramas',
    image: '/assets/kerala-resort-aerial.png',
    categoryLink: '/projects?category=resort',
  },
  {
    id: '5',
    title: 'Emerald Morning Mist Ridge',
    location: 'Chembra Peak Valley',
    tag: 'Highland Vantage · Ecological Belt',
    image: '/assets/kerala-mist-sunrise.jpg',
    categoryLink: '/projects?category=land',
  },
  {
    id: '6',
    title: 'Handcrafted Laterite & Seasoned Teak',
    location: 'Wayanad Highlands',
    tag: 'House for Sale · Vernacular Craft',
    image: '/assets/modern-timber-eaves.jpg',
    categoryLink: '/projects?category=house',
  },
]

export function VisualGallery({
  items = DEFAULT_ITEMS,
  title,
  eyebrow,
  subtitle,
}: VisualGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate dynamic active index based on rendered card width
    const cardEl = scrollRef.current.firstElementChild as HTMLElement
    const cardStep = cardEl ? cardEl.offsetWidth + 24 : 320
    const currentIdx = Math.round(scrollLeft / cardStep)
    setActiveIndex(Math.min(Math.max(0, currentIdx), items.length - 1))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [items.length])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardEl = scrollRef.current.firstElementChild as HTMLElement
    const step = cardEl ? cardEl.offsetWidth + 24 : scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[idx] as HTMLElement
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  // Touch handlers for fluid swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const deltaX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 45

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && activeIndex < items.length - 1) {
        scrollToIndex(activeIndex + 1)
      } else if (deltaX < 0 && activeIndex > 0) {
        scrollToIndex(activeIndex - 1)
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className="vl-visual-gallery" aria-label="Visual Gallery">
      <div className="vl-gallery-header-wrap">
        <div className="vl-gallery-text">
          {eyebrow && (
            <span className="vl-editorial-eyebrow">
              <span className="vl-eyebrow-line" />
              <span>{eyebrow}</span>
            </span>
          )}
          {title && <h2 className="vl-editorial-headline">{title}</h2>}
          {subtitle && <p className="vl-editorial-sub">{subtitle}</p>}
        </div>

        {/* Desktop / Tablet Controls */}
        <div className="vl-gallery-controls" aria-label="Gallery Controls">
          <span className="vl-gallery-counter">
            <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="slash">/</span>
            <span className="total">{String(items.length).padStart(2, '0')}</span>
          </span>
          <div className="vl-gallery-btn-group">
            <button
              type="button"
              className="vl-gallery-nav-btn"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Previous gallery slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="vl-gallery-nav-btn"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Next gallery slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with Swipe Support */}
      <div className="vl-gallery-track-container">
        <div
          className="vl-gallery-track"
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`vl-gallery-card ${activeIndex === index ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(index)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${item.title} (${index + 1} of ${items.length})`}
            >
              <div className="vl-gallery-card-media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 480px) 82vw, (max-width: 768px) 70vw, 420px"
                  className="vl-gallery-card-img"
                  priority={index < 2}
                />
                <div className="vl-gallery-card-scrim" />
                <span className="vl-gallery-card-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="vl-gallery-card-info">
                <div className="vl-gallery-card-meta">
                  <span className="vl-gallery-card-tag">{item.tag}</span>
                  <span className="vl-gallery-card-loc">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>{item.location}</span>
                  </span>
                </div>
                <div className="vl-gallery-card-title-row">
                  <h3 className="vl-gallery-card-title">{item.title}</h3>
                  {item.categoryLink && (
                    <Link
                      href={item.categoryLink as any}
                      className="vl-gallery-card-explore-btn"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Explore ${item.title}`}
                    >
                      <span>Explore</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots */}
        <div className="vl-gallery-mobile-dots" role="tablist" aria-label="Gallery slides pagination">
          {items.map((item, i) => (
            <button
              key={`dot-${item.id}-${i}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Slide ${i + 1}: ${item.title}`}
              className={`vl-gallery-dot ${activeIndex === i ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
