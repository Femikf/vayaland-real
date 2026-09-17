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

export const waBuyLink = (locale: string = 'en') => {
  const msg =
    locale === 'ml'
      ? 'നമസ്കാരം വയലാൻഡ്, വയനാട്ടിൽ ഒരു പ്രോപ്പർട്ടി വാങ്ങാൻ (സ്ഥലം / വീട് / കൊമേഴ്സ്യൽ / റിസോർട്ട്) ഞാൻ ആഗ്രഹിക്കുന്നു. ലഭ്യമായ വിവരങ്ങൾ പങ്കുവെക്കാമോ?'
      : 'Hello VAYALAND, I am looking to BUY a property in Wayanad (House / Land / Commercial / Resort). Please share verified listings and details.'
  return waLink(msg)
}

export const waSellLink = (locale: string = 'en') => {
  const msg =
    locale === 'ml'
      ? 'നമസ്കാരം വയലാൻഡ്, വയനാട്ടിലുള്ള എന്റെ പ്രോപ്പർട്ടി വിൽക്കാൻ / വയലാൻഡിൽ ലിസ്റ്റ് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു. തുടർനടപടികൾ എങ്ങനെയാണെന്ന് വ്യക്തമാക്കാമോ?'
      : 'Hello VAYALAND, I want to SELL / LIST my property in Wayanad. Please let me know how to proceed with verification and listing.'
  return waLink(msg)
}

export const mailLink = (subject: string, body: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

