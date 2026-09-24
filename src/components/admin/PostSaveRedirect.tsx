'use client'

import React, { useEffect, useState } from 'react'

export function PostSaveRedirect() {
  const [currentCollection, setCurrentCollection] = useState<string | null>(null)
  const [isEditOrCreatePage, setIsEditOrCreatePage] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateRouteState = () => {
      const path = window.location.pathname
      // Matches /admin/collections/:collection/:id or /admin/collections/:collection/create
      const match = path.match(/\/admin\/collections\/([a-zA-Z0-9_-]+)(?:\/([^/]+))?/)
      if (match && match[1]) {
        const slug = match[1]
        const docId = match[2]
        setCurrentCollection(slug)
        setIsEditOrCreatePage(Boolean(docId))
      } else {
        setCurrentCollection(null)
        setIsEditOrCreatePage(false)
      }
    }

    updateRouteState()
    window.addEventListener('popstate', updateRouteState)

    // Intercept fetch to automatically redirect back to the listing page after saving
    const originalFetch = window.fetch
    const customFetch: typeof window.fetch = async (...args) => {
      const response = await originalFetch(...args)
      try {
        const rawUrl = typeof args[0] === 'string' ? args[0] : (args[0] as Request)?.url || ''
        const options = (args[1] || (typeof args[0] === 'object' ? args[0] : {})) as RequestInit
        const method = (options.method || 'GET').toUpperCase()

        // Only trigger on successful write operations (POST, PATCH)
        if ((method === 'POST' || method === 'PATCH') && response.ok) {
          const path = window.location.pathname
          const match = path.match(/\/admin\/collections\/([a-zA-Z0-9_-]+)(?:\/([^/]+))?/)
          if (match && match[1] && match[2]) {
            const currentSlug = match[1]
            // Verify that the API call matches this specific collection and is not an internal user refresh or media drawer
            const isCollectionApiCall =
              rawUrl.includes(`/api/${currentSlug}`) || rawUrl.endsWith(`/api/${currentSlug}`)

            if (isCollectionApiCall) {
              // Wait briefly (750ms) to allow Payload toast notification to display
              setTimeout(() => {
                const listUrl = `/admin/collections/${currentSlug}`
                if (window.location.pathname !== listUrl) {
                  window.location.href = listUrl
                }
              }, 750)
            }
          }
        }
      } catch (e) {
        // Fail silently so admin operations are never interrupted
        console.warn('PostSaveRedirect hook:', e)
      }
      return response
    }

    window.fetch = customFetch

    return () => {
      window.removeEventListener('popstate', updateRouteState)
      window.fetch = originalFetch
    }
  }, [])

  if (!isEditOrCreatePage || !currentCollection) {
    return null
  }

  const collectionName = currentCollection.charAt(0).toUpperCase() + currentCollection.slice(1)

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: 12 }}>
      <a
        href={`/admin/collections/${currentCollection}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: '#085056',
          textDecoration: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'background-color 0.15s ease',
        }}
        title={`Return to ${collectionName} listing`}
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back to {collectionName}</span>
      </a>
    </div>
  )
}
