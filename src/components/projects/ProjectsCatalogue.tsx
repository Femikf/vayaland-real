'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { waLink, WA_NUMBER } from '@/lib/site'

export type ProjectCategory = 'house' | 'residential' | 'commercial' | 'land' | 'resort'
export type ProjectStatus = 'completed' | 'ongoing' | 'upcoming'

export interface ProjectItem {
  id: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  location: string
  price?: string
  extent?: string
  specs?: string[]
  imageUrl: string
  featured?: boolean
  description?: string
}

export type FilterKey =
  | 'all'
  | 'house'
  | 'residential'
  | 'commercial'
  | 'land'
  | 'resort'
  | 'completed'
  | 'ongoing'
  | 'upcoming'

interface ProjectsCatalogueProps {
  projects: ProjectItem[]
  initialCategory?: string
  labels: {
    filterAll: string
    filterHouse?: string
    filterResidential: string
    filterCommercial: string
    filterLand: string
    filterResort?: string
    filterCompleted: string
    filterOngoing: string
    filterUpcoming: string
    statusCompleted: string
    statusOngoing: string
    statusUpcoming: string
    statusAvailable?: string
    catHouse?: string
    catResidential: string
    catCommercial: string
    catLand: string
    catResort?: string
    viewDetails: string
    enquire: string
    emptyTitle: string
    emptyDesc: string
    resetFilter: string
    whatsappDirect: string
    featuredBadge?: string
    priceOnEnquiry?: string
  }
}

export function ProjectsCatalogue({ projects, initialCategory, labels }: ProjectsCatalogueProps) {
  // Normalize initial category with URL and sessionStorage persistence
  const getInitialFilter = (): FilterKey => {
    if (initialCategory) {
      const cat = initialCategory.toLowerCase()
      if (cat === 'house' || cat === 'residential') return 'house'
      if (cat === 'land') return 'land'
      if (cat === 'commercial') return 'commercial'
      if (cat === 'resort') return 'resort'
      if (['completed', 'ongoing', 'upcoming'].includes(cat)) return cat as FilterKey
    }

    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const cat = urlParams.get('category')?.toLowerCase()
        if (cat === 'house' || cat === 'residential') return 'house'
        if (cat === 'land') return 'land'
        if (cat === 'commercial') return 'commercial'
        if (cat === 'resort') return 'resort'
        if (cat && ['completed', 'ongoing', 'upcoming'].includes(cat)) return cat as FilterKey

        const saved = sessionStorage.getItem('vl_projects_active_filter')
        if (
          saved &&
          ['house', 'residential', 'commercial', 'land', 'resort', 'completed', 'ongoing', 'upcoming'].includes(
            saved
          )
        ) {
          return saved as FilterKey
        }
      } catch {}
    }

    return 'all'
  }

  const [activeFilter, setActiveFilter] = useState<FilterKey>(getInitialFilter())
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Ensure client-side synchronization and restore saved tab
  React.useEffect(() => {
    try {
      if (initialCategory) {
        const cat = initialCategory.toLowerCase()
        if (cat === 'house' || cat === 'residential') {
          setActiveFilter('house')
          sessionStorage.setItem('vl_projects_active_filter', 'house')
          return
        } else if (cat === 'land') {
          setActiveFilter('land')
          sessionStorage.setItem('vl_projects_active_filter', 'land')
          return
        } else if (cat === 'commercial') {
          setActiveFilter('commercial')
          sessionStorage.setItem('vl_projects_active_filter', 'commercial')
          return
        } else if (cat === 'resort') {
          setActiveFilter('resort')
          sessionStorage.setItem('vl_projects_active_filter', 'resort')
          return
        }
      }

      const urlParams = new URLSearchParams(window.location.search)
      const urlCat = urlParams.get('category')?.toLowerCase()
      if (urlCat === 'house' || urlCat === 'residential') {
        setActiveFilter('house')
        sessionStorage.setItem('vl_projects_active_filter', 'house')
        return
      } else if (urlCat === 'land') {
        setActiveFilter('land')
        sessionStorage.setItem('vl_projects_active_filter', 'land')
        return
      } else if (urlCat === 'commercial') {
        setActiveFilter('commercial')
        sessionStorage.setItem('vl_projects_active_filter', 'commercial')
        return
      } else if (urlCat === 'resort') {
        setActiveFilter('resort')
        sessionStorage.setItem('vl_projects_active_filter', 'resort')
        return
      }

      const saved = sessionStorage.getItem('vl_projects_active_filter')
      if (saved && saved !== 'all') {
        setActiveFilter(saved as FilterKey)
      }
    } catch {}
  }, [initialCategory])

  // Calculate dynamic counts for all filter tabs
  const filterCounts = useMemo(() => {
    return {
      all: projects.length,
      house: projects.filter((p) => p.category === 'house' || p.category === 'residential').length,
      residential: projects.filter((p) => p.category === 'house' || p.category === 'residential').length,
      commercial: projects.filter((p) => p.category === 'commercial').length,
      land: projects.filter((p) => p.category === 'land').length,
      resort: projects.filter((p) => p.category === 'resort').length,
      completed: projects.filter((p) => p.status === 'completed').length,
      ongoing: projects.filter((p) => p.status === 'ongoing').length,
      upcoming: projects.filter((p) => p.status === 'upcoming').length,
    }
  }, [projects])

  // Filter projects based on activeFilter
  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case 'house':
      case 'residential':
        return projects.filter((p) => p.category === 'house' || p.category === 'residential')
      case 'commercial':
        return projects.filter((p) => p.category === 'commercial')
      case 'land':
        return projects.filter((p) => p.category === 'land')
      case 'resort':
        return projects.filter((p) => p.category === 'resort')
      case 'completed':
        return projects.filter((p) => p.status === 'completed')
      case 'ongoing':
        return projects.filter((p) => p.status === 'ongoing')
      case 'upcoming':
        return projects.filter((p) => p.status === 'upcoming')
      case 'all':
      default:
        return projects
    }
  }, [projects, activeFilter])

  const handleFilterSelect = (filter: FilterKey) => {
    if (filter === activeFilter) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFilter(filter)
      setIsTransitioning(false)
      // Sync URL search params and persist in sessionStorage
      if (typeof window !== 'undefined') {
        try {
          if (filter === 'all') {
            sessionStorage.removeItem('vl_projects_active_filter')
          } else {
            sessionStorage.setItem('vl_projects_active_filter', filter)
          }

          const url = new URL(window.location.href)
          if (filter === 'all' || filter === 'completed' || filter === 'ongoing' || filter === 'upcoming') {
            url.searchParams.delete('category')
          } else if (filter === 'house' || filter === 'residential') {
            url.searchParams.set('category', 'house')
          } else {
            url.searchParams.set('category', filter)
          }
          window.history.replaceState({}, '', url.toString())
        } catch {}
      }
    }, 180)
  }

  const getCategoryLabel = (category: ProjectCategory) => {
    switch (category) {
      case 'house':
      case 'residential':
        return labels.catHouse || labels.catResidential
      case 'commercial':
        return labels.catCommercial
      case 'land':
        return labels.catLand
      case 'resort':
        return labels.catResort || 'Resort'
      default:
        return category
    }
  }

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return labels.statusCompleted
      case 'ongoing':
        return labels.statusOngoing
      case 'upcoming':
        return labels.statusUpcoming
      default:
        return status
    }
  }

  const getStatusClass = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return 'vl-cat-status--completed'
      case 'ongoing':
        return 'vl-cat-status--ongoing'
      case 'upcoming':
        return 'vl-cat-status--upcoming'
      default:
        return ''
    }
  }

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: 'all', label: labels.filterAll },
    { key: 'house', label: labels.filterHouse || labels.filterResidential },
    { key: 'land', label: labels.filterLand },
    { key: 'commercial', label: labels.filterCommercial },
    { key: 'resort', label: labels.filterResort || 'Resort for Sale' },
    { key: 'ongoing', label: labels.filterOngoing },
    { key: 'completed', label: labels.filterCompleted },
    { key: 'upcoming', label: labels.filterUpcoming },
  ]

  return (
    <section className="vl-catalogue-section" aria-label="Projects Catalogue">
      <div className="vl-container">
        {/* Refined Architectural Filter Bar */}
        <div className="vl-filter-bar-container">
          <div className="vl-filter-bar" role="tablist" aria-label="Filter Projects">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key
              const count = filterCounts[tab.key]
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  className={`vl-filter-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleFilterSelect(tab.key)}
                >
                  <span className="vl-filter-label">{tab.label}</span>
                  <span className="vl-filter-count">{count}</span>
                  {isActive && <span className="vl-filter-indicator" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Project Grid / Empty State */}
        <div
          className={`vl-catalogue-content ${
            isTransitioning ? 'vl-catalogue-transitioning' : 'vl-catalogue-ready'
          }`}
        >
          {filteredProjects.length === 0 ? (
            /* Tasteful Architectural Empty State */
            <div className="vl-cat-empty-state">
              <div className="vl-cat-empty-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="6" y="6" width="36" height="36" rx="2" strokeDasharray="4 4" />
                  <path d="M16 24h16M24 16v16" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="8" />
                </svg>
              </div>
              <h3 className="vl-cat-empty-title">{labels.emptyTitle}</h3>
              <p className="vl-cat-empty-desc">{labels.emptyDesc}</p>
              <div className="vl-cat-empty-actions">
                <button
                  type="button"
                  className="vl-btn-outline"
                  onClick={() => handleFilterSelect('all')}
                >
                  <span>{labels.resetFilter}</span>
                </button>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    `Hello Vayaland, I am inquiring about available off-market properties matching the ${activeFilter} category in Wayanad.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vl-btn-whatsapp-editorial"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>{labels.whatsappDirect}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Asymmetric Architectural Catalogue Grid */
            <div className="vl-catalogue-asymmetric-grid">
              {filteredProjects.map((project, index) => {
                const isFeatured = index === 0

                // Asymmetric rhythm mapping:
                // index 0: featured (span 12)
                // index 1: medium (span 7)
                // index 2: small (span 5)
                // index 3: small (span 5)
                // index 4: medium (span 7)
                // index 5: large (span 8)
                // index 6: small (span 4)
                let sizeClass = 'vl-cat-card--medium'
                if (isFeatured) {
                  sizeClass = 'vl-cat-card--featured'
                } else if (index % 5 === 1 || index % 5 === 4) {
                  sizeClass = 'vl-cat-card--medium'
                } else if (index % 5 === 2 || index % 5 === 3) {
                  sizeClass = 'vl-cat-card--small'
                } else {
                  sizeClass = 'vl-cat-card--large'
                }

                const waEnquiryLink = waLink(
                  `Hello Vayaland, I am inquiring about project "${project.title}" in ${project.location}.`
                )

                return (
                  <article
                    key={project.id}
                    className={`vl-cat-card ${sizeClass}`}
                  >
                    <div className="vl-cat-card-inner">
                      {/* Media Frame */}
                      <div className="vl-cat-media-box">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes={
                            isFeatured
                              ? '100vw'
                              : sizeClass === 'vl-cat-card--large' || sizeClass === 'vl-cat-card--medium'
                              ? '(max-width: 900px) 100vw, 60vw'
                              : '(max-width: 900px) 100vw, 40vw'
                          }
                          priority={index < 2}
                          className="vl-cat-img"
                        />
                        <div className="vl-cat-scrim" />

                        {/* Badges on Media */}
                        <div className="vl-cat-badges-top">
                          <span className="vl-cat-category-badge">
                            {getCategoryLabel(project.category)}
                          </span>
                          <span
                            className={`vl-cat-status-pill ${getStatusClass(
                              project.status
                            )}`}
                          >
                            <span className="vl-status-live-dot" />
                            <span>{getStatusLabel(project.status)}</span>
                          </span>
                        </div>

                        {isFeatured && (
                          <div className="vl-cat-featured-ribbon">
                            <span className="vl-ribbon-star">★</span>
                            <span>{labels.featuredBadge || 'FEATURED ARCHITECTURAL PROJECT'}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Dossier */}
                      <div className="vl-cat-content-box">
                        <div className="vl-cat-location-row">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>
                          <span>{project.location}</span>
                        </div>

                        <h3 className="vl-cat-project-title">{project.title}</h3>

                        {project.description && (
                          <p className="vl-cat-excerpt">{project.description}</p>
                        )}

                        {/* Key specifications */}
                        {(project.extent || (project.specs && project.specs.length > 0)) && (
                          <div className="vl-cat-specs-chips">
                            {project.extent && (
                              <span className="vl-spec-chip vl-spec-chip--primary">
                                {project.extent}
                              </span>
                            )}
                            {project.specs?.slice(0, 3).map((spec, i) => (
                              <span key={i} className="vl-spec-chip">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer with Price & Actions */}
                        <div className="vl-cat-card-footer">
                          <div className="vl-cat-price-box">
                            <span className="vl-cat-price-label">GUIDE PRICE</span>
                            <span className="vl-cat-price-val">
                              {project.price || labels.priceOnEnquiry || 'Price on Enquiry'}
                            </span>
                          </div>

                          <div className="vl-cat-actions-row">
                            <a
                              href={waEnquiryLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vl-cat-action-wa"
                              aria-label={`Inquire about ${project.title} on WhatsApp`}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                              </svg>
                              <span>{labels.enquire}</span>
                            </a>

                            <Link
                              href={`/gallery/${project.id}${activeFilter !== 'all' ? `?fromCategory=${activeFilter}` : ''}`}
                              className="vl-cat-action-arrow"
                              aria-label={`View details of ${project.title}`}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
