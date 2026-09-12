'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export interface GalleryItem {
  id: string
  title: string
  location: string
  tag: string
  image: string
  aspect?: string
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
    title: 'Mistral Horizon Ridge',
    location: 'Meppadi, Wayanad',
    tag: 'Private Hillside Sanctuary',
    image: '/assets/villa-infinity-sunset.jpg',
  },
  {
    id: '2',
    title: 'Banasura Foothills Plantation',
    location: 'Padinjarathara, Wayanad',
    tag: 'Masterplanned Land Parcels',
    image: '/assets/masterplanned-plots.jpg',
  },
  {
    id: '3',
    title: 'Emerald Morning Mist',
    location: 'Chembra Peak Valley',
    tag: 'High-Altitude Ecological Belt',
    image: '/assets/kerala-mist-sunrise.jpg',
  },
  {
    id: '4',
    title: 'The Horizon Infinity Edge',
    location: 'Meppadi Heights',
    tag: 'Architectural Water Feature',
    image: '/assets/infinity-pool-horizon.jpg',
  },
  {
    id: '5',
    title: 'Handcrafted Limestone & Teak',
    location: 'Pulpally Micro-Region',
    tag: 'Artisanal Natural Materials',
    image: '/assets/architectural-limestone.jpg',
  },
  {
    id: '6',
    title: 'Golden Canopy Palms',
    location: 'Sulthan Bathery Plateau',
    tag: 'Tropical Plantation Canopy',
    image: '/assets/golden-sunset-palms.jpg',
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
                <h3 className="vl-gallery-card-title">{item.title}</h3>
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
