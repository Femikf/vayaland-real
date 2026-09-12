export function parseCoords(url: string): { lat: number; lng: number } | null {
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }
  const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }
  return null
}

// VAYALAND contact details
// TODO: Update when final contact details are provided
export const WA_NUMBER = '919526435619'
export const ALT_NUMBER = '919526435619'
export const MAIL = 'info@vayaland.com'

export const BRAND_NAME = 'VAYALAND'
export const BRAND_TAGLINE = 'The Real Wayanad'
export const BRAND_LOCATION = 'Pulpally, Wayanad, Kerala'

export const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const mailLink = (subject: string, body: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
