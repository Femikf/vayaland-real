export function parseCoords(url: string): { lat: number; lng: number } | null {
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }
  const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }
  return null
}

export const WA_NUMBER = '919292008096'
export const ALT_NUMBER = '919447854801'
export const MAIL = 'Signatureclt16@gmail.com'

export const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const mailLink = (subject: string, body: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
