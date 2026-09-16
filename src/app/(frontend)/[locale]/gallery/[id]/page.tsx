import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { waLink, mailLink, parseCoords } from '@/lib/site'
import { PropertyGallery, type PropertyImageItem } from '@/components/property/PropertyGallery'

// Curated architectural showcase details with rich multiple photography angles
const SHOWCASE_PROPERTIES: Record<
  string,
  (locale: string) => {
    id: string
    title: string
    propertyType: 'house' | 'land' | 'commercial' | 'resort'
    status: 'available' | 'ongoing' | 'completed' | 'sold' | 'upcoming'
    location: string
    price: string
    description: string
    specs: { value: string }[]
    googleEarthLink?: string
    images: PropertyImageItem[]
  }
> = {
  'project-1': (locale) => ({
    id: 'project-1',
    title:
      locale === 'ml'
        ? 'ആധുനിക കേരള വാസ്തുശില്പ വില്ല'
        : 'Contemporary Kerala Architectural Villa',
    propertyType: 'house',
    status: 'ongoing',
    location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
    price: '₹ 1.85 Cr',
    description:
      locale === 'ml'
        ? 'സമകാലിക ശൈലിയിലുള്ള 2-നില കേരള വാസ്തുവിദ്യാ ഭവനം. പരമ്പരാഗത തേക്ക് തടി മുഖപ്പുകൾ, വിശാലമായ കാർ പോർച്ച്, സംരക്ഷിത മതിൽക്കെട്ട്, പ്രകൃതിദത്ത വെളിച്ചം നിറഞ്ഞ ലിവിംഗ് ഏരിയകൾ.'
        : 'A newly constructed contemporary Kerala double-story residence celebrating vernacular proportion and modern engineering. Features sculpted teak rafters, double-height natural light atrium, private car porch, and verified 100% clear freehold title.',
    specs: [
      { value: locale === 'ml' ? '3,200 ചതുരശ്ര അടി' : '3,200 Sq Ft Living Envelope' },
      { value: locale === 'ml' ? '4 ബെഡ്‌റൂം മാസ്റ്റർ സ്യൂട്ട്' : '4 Ensuite Bedrooms' },
      { value: locale === 'ml' ? 'പരമ്പരാഗത മുഖപ്പും ബാൽക്കണിയും' : 'Pitched Roof & Balcony' },
      { value: locale === 'ml' ? 'കാർ പോർച്ച് & ഗേറ്റ്' : 'Dedicated Covered Portico' },
      { value: locale === 'ml' ? '100% ക്ലിയർ ടൈറ്റിൽ' : 'Verified Deeds & Clear Title' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.7942,76.1687,740a,800d',
    images: [
      {
        url: '/assets/kerala-house-sale.png',
        alt: 'Contemporary Kerala Villa - Front Facade & Portico',
        title: 'Front Elevation with Pitched Wood Eaves',
      },
      {
        url: '/assets/modern-timber-eaves.jpg',
        alt: 'Crafted Timber Rafters & Veranda Detailing',
        title: 'Vernacular Teak Overhangs',
      },
      {
        url: '/assets/architecture-mood.jpg',
        alt: 'Courtyard Light Well and Living Interior',
        title: 'Interior Living Space with Natural Illumination',
      },
      {
        url: '/assets/hero-villa.jpg',
        alt: 'Twilight View of Villa Architecture',
        title: 'Evening Ambient Illumination',
      },
      {
        url: '/assets/masterplanned-plots.jpg',
        alt: 'Plot Boundary Layout and Landscaping',
        title: 'Site Plan & Boundary Layout',
      },
    ],
  }),

  'project-2': (locale) => ({
    id: 'project-2',
    title:
      locale === 'ml'
        ? 'മേപ്പാടി റെഡ്-സോയിൽ റെസിഡൻഷ്യൽ പ്ലോട്ട്'
        : 'Meppadi Red-Soil Hillside Plot',
    propertyType: 'land',
    status: 'ongoing',
    location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
    price: '₹ 45 Lakhs',
    description:
      locale === 'ml'
        ? 'വീട് പണിയാൻ ഒരുക്കിയ നിരപ്പായ പ്ലോട്ട്. വെട്ടുകല്ല് ബൗണ്ടറി വാൾ, ടാർ റോഡ് പ്രവേശനം, തടസ്സമില്ലാത്ത ചെമ്പ്ര പീക്ക് കാഴ്ചകൾ.'
        : 'A prime elevated residential building plot with pre-constructed laterite retaining boundary wall, flat graded construction plateau, direct bitumen road access, and panoramic Chembra Peak backdrop.',
    specs: [
      { value: locale === 'ml' ? '50 സെന്റ് വിസ്തൃതി' : '50 Cents Level Parcel' },
      { value: locale === 'ml' ? 'വെട്ടുകല്ല് സംരക്ഷണ മതിൽ' : 'Laterite Retaining Boundary' },
      { value: locale === 'ml' ? 'ഉടൻ നിർമ്മാണം സാധ്യം' : 'Ready for Immediate Construction' },
      { value: locale === 'ml' ? 'ടാർ റോഡ് ഫ്രണ്ടേജ്' : 'Full Tar Road Frontage' },
      { value: locale === 'ml' ? 'റവന്യൂ ക്ലിയറൻസ്' : 'Revenue Department Cleared' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.5518,76.1287,850a,600d',
    images: [
      {
        url: '/assets/kerala-land-plot.png',
        alt: 'Meppadi Hillside Red Soil Plot - Front View',
        title: 'Cleared Building Envelope with Stone Retaining Wall',
      },
      {
        url: '/assets/land-plot.png',
        alt: 'Wide Boundary Survey and Frontage Angle',
        title: 'Road Approach & Front Boundary',
      },
      {
        url: '/assets/kerala-mist-sunrise.jpg',
        alt: 'Sunrise View over Meppadi Valley from Site',
        title: 'Mountain Horizon at Dawn',
      },
      {
        url: '/assets/masterplanned-plots.jpg',
        alt: 'Contour Survey and Boundary Overlay',
        title: 'Contour & Masterplot Plan',
      },
    ],
  }),

  'project-3': (locale) => ({
    id: 'project-3',
    title:
      locale === 'ml'
        ? 'ബാണാസുര താഴ്‌വര പ്ലാന്റേഷൻ പ്ലോട്ടുകൾ'
        : 'Banasura Terraced Plantation Parcels',
    propertyType: 'land',
    status: 'completed',
    location: locale === 'ml' ? 'പടിഞ്ഞാറത്തറ, വയനാട്' : 'Padinjarathara, Wayanad',
    price: '₹ 1.20 Cr',
    description:
      locale === 'ml'
        ? 'ബാണാസുര അണക്കെട്ടിന്റെ താഴ്‌വരയിൽ സ്ഥിതി ചെയ്യുന്ന പ്ലാന്റേഷൻ ഭൂമി. റോബസ്റ്റ കോഫി, കുരുമുളക് വള്ളികൾ, പ്രകൃതിദത്ത ശുദ്ധജല ഉറവ.'
        : 'Gently terraced fertile plantation acreage featuring perennial freshwater spring feeders, producing Robusta coffee, export-grade black pepper, and direct visual access to the Banasura reservoir skyline.',
    specs: [
      { value: locale === 'ml' ? '5.4 ഏക്കർ വിസ്തൃതി' : '5.4 Acres Mature Estate' },
      { value: locale === 'ml' ? 'തടാക സാമീപ്യം' : 'Direct Reservoir Basin Outlook' },
      { value: locale === 'ml' ? 'കാപ്പിയും കുരുമുളകും' : 'Mature Yielding Coffee & Pepper' },
      { value: locale === 'ml' ? 'ശുദ്ധജല ഉറവ' : 'Perennial Freshwater Stream' },
      { value: locale === 'ml' ? 'ക്ലിയർ ടൈറ്റിൽ' : 'Unencumbered Clean Title' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.6667,75.9667,780a,900d',
    images: [
      {
        url: '/assets/kerala-plantation-meadow.png',
        alt: 'Banasura Terraced Plantation - Meadow Landscape',
        title: 'Gentle Plantation Terraces & Coffee Canopy',
      },
      {
        url: '/assets/golden-sunset-palms.jpg',
        alt: 'Golden Sunset over the Western Ghats from the Estate',
        title: 'Sunset Skyline across Reservoir Hills',
      },
      {
        url: '/assets/kerala-mist-sunrise.jpg',
        alt: 'Morning Mountain Mist Covering the Valleys',
        title: 'Morning Mist over Estate Valleys',
      },
      {
        url: '/assets/masterplanned-plots.jpg',
        alt: 'Topographical Estate Survey Map',
        title: 'Topographic Boundary Mapping',
      },
    ],
  }),

  'project-4': (locale) => ({
    id: 'project-4',
    title:
      locale === 'ml'
        ? 'ദി തേക്ക്‌വുഡ് പവിലിയൻ റെസിഡൻസ്'
        : 'The Teakwood Pavilion Residence',
    propertyType: 'house',
    status: 'completed',
    location: locale === 'ml' ? 'പുൽപ്പള്ളി, വയനാട്' : 'Pulpally, Wayanad',
    price: '₹ 2.45 Cr',
    description:
      locale === 'ml'
        ? 'കേരള വാസ്തുശില്പ കലയും ആധുനിക ആഡംബരങ്ങളും ഒത്തുചേരുന്ന അതിമനോഹര ഭവനം. സെൻട്രൽ മഴമുറ്റം, ഇൻ-സീറ്റ് തേക്ക് വുഡ് ഫിനിഷുകൾ, വിശാലമായ വരാന്ത.'
        : 'A bespoke modern residence honoring vernacular Kerala proportions. Designed with an open central rainwater courtyard (Nadumuttam), deep timber eaves for thermal cooling, and seamless indoor-outdoor garden integration.',
    specs: [
      { value: locale === 'ml' ? '3,400 ചതുരശ്ര അടി' : '3,400 Sq Ft Built-up Space' },
      { value: locale === 'ml' ? '4 ബെഡ്‌റൂം മാസ്റ്റർ സ്യൂട്ട്' : '4 Ensuite Master Bedrooms' },
      { value: locale === 'ml' ? 'പരമ്പരാഗത നടുമുറ്റം' : 'Central Rainwater Courtyard' },
      { value: locale === 'ml' ? 'സോളാർ എനർജി ഗ്രിൽ' : 'Off-Grid Ready Solar Array' },
      { value: locale === 'ml' ? 'ലാൻഡ്‌സ്‌കേപ്പ്ഡ് ഗാർഡൻ' : 'Native Botanical Garden' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.7942,76.1687,740a,800d',
    images: [
      {
        url: '/assets/modern-timber-eaves.jpg',
        alt: 'The Teakwood Pavilion - Timber Overhangs & Veranda',
        title: 'Timber Rafters & Deep Shading Eaves',
      },
      {
        url: '/assets/kerala-house-sale.png',
        alt: 'Gated Residence Front Elevation',
        title: 'Gated Entrance & Front Elevation',
      },
      {
        url: '/assets/architecture-mood.jpg',
        alt: 'Courtyard Skylight and Polished Teak Interior',
        title: 'Courtyard Interior with Natural Illumination',
      },
      {
        url: '/assets/villa-infinity-sunset.jpg',
        alt: 'Sunset Garden Terrace View',
        title: 'Outdoor Garden Terrace at Dusk',
      },
    ],
  }),

  'project-5': (locale) => ({
    id: 'project-5',
    title:
      locale === 'ml'
        ? 'ദി മിസ്ട്രൽ ഹൊറൈസൺ ഇൻഫിനിറ്റി വില്ല'
        : 'The Mistral Horizon Infinity Villa',
    propertyType: 'house',
    status: 'upcoming',
    location: locale === 'ml' ? 'മേപ്പാടി, വയനാട്' : 'Meppadi, Wayanad',
    price: '₹ 3.85 Cr',
    description:
      locale === 'ml'
        ? 'പ്രകൃതിദത്ത കല്ലുകൾ, തേക്ക് തടി മേൽക്കൂരകൾ, 25 മീറ്റർ ഇൻഫിനിറ്റി പൂളുള്ള ആഡംബര വില്ല. പശ്ചിമഘട്ട മലനിരകളുടെ മനോഹരമായ കാഴ്ച.'
        : 'A dramatic cliffside luxury villa sanctuary poised 850m above sea level in Meppadi. Boasts an engineered cantilevered 25m heated infinity pool extending into the cloud line, curated natural stone, and seasoned teak timber roofs.',
    specs: [
      { value: locale === 'ml' ? '2.8 ഏക്കർ സ്വകാര്യ എസ്റ്റേറ്റ്' : '2.8 Acres Gated Estate' },
      { value: locale === 'ml' ? '25 മീറ്റർ ഇൻഫിനിറ്റി പൂൾ' : '25m Cantilever Infinity Pool' },
      { value: locale === 'ml' ? 'സ്വാഭാവിക ചുണ്ണാമ്പുകല്ല്' : 'Limestone & Seasoned Teak' },
      { value: locale === 'ml' ? 'താഴ്‌വര കാഴ്‌ച' : 'Panoramic Valley & Peak Views' },
      { value: locale === 'ml' ? 'ഹെലിപാഡ് അനുമതി' : 'Private Access Helipad Provision' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.5518,76.1287,850a,600d',
    images: [
      {
        url: '/assets/villa-infinity-sunset.jpg',
        alt: 'The Mistral Horizon - 25m Infinity Pool at Sunset',
        title: 'Cantilevered Infinity Pool Horizon at Dusk',
      },
      {
        url: '/assets/infinity-pool-horizon.jpg',
        alt: 'Daylight Pool Deck overlooking Wayanad Valley',
        title: 'Skyline Pool Deck in Daylight',
      },
      {
        url: '/assets/modern-timber-eaves.jpg',
        alt: 'Teak Timber Pavilion and Outdoor Lounge',
        title: 'Crafted Timber Pavilion Lounge',
      },
      {
        url: '/assets/architecture-mood.jpg',
        alt: 'Master Suite with Floor-to-Ceiling Valley Glazing',
        title: 'Master Suite with Floor-to-Ceiling Panorama',
      },
    ],
  }),

  'project-6': (locale) => ({
    id: 'project-6',
    title:
      locale === 'ml'
        ? 'പുൽപ്പള്ളി കൊമേഴ്‌സ്യൽ പ്ലാസ & സ്യൂട്ടുകൾ'
        : 'Pulpally Commercial Plaza & Suites',
    propertyType: 'commercial',
    status: 'ongoing',
    location: locale === 'ml' ? 'ടൗൺ സെന്റർ, പുൽപ്പള്ളി' : 'Town Center, Pulpally',
    price: '₹ 3.10 Cr',
    description:
      locale === 'ml'
        ? 'പുൽപ്പള്ളി പ്രധാന റോഡിൽ സ്ഥിതി ചെയ്യുന്ന പ്രീമിയം വാണിജ്യ സമുച്ചയം. ബാങ്കുകൾ, റീട്ടെയിൽ ഔട്ട്‌ലെറ്റുകൾ, എക്സിക്യൂട്ടീവ് ഓഫീസുകൾ എന്നിവയ്ക്ക് അനുയോജ്യം.'
        : 'Centrally positioned commercial asset engineered for boutique banking, retail flagships, and premium serviced executive suites. Features high double-glazed frontage, multi-tier car parking, and superior rental yield.',
    specs: [
      { value: locale === 'ml' ? '12,500 ചതുരശ്ര അടി' : '12,500 Sq Ft Commercial Space' },
      { value: locale === 'ml' ? 'മെയിൻ ഹൈവേ ഫ്രണ്ടേജ്' : 'Main Highway Dual Frontage' },
      { value: locale === 'ml' ? '30+ വാഹന പാർക്കിംഗ്' : '30+ Dedicated Vehicle Parking' },
      { value: locale === 'ml' ? 'ലിഫ്റ്റും ബാക്കപ്പും' : 'Passenger Elevator & 100% Power' },
      { value: locale === 'ml' ? 'ഉയർന്ന വാടക വരുമാനം' : 'Projected 8.5% Net Yield' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.7942,76.1687,740a,800d',
    images: [
      {
        url: '/assets/architectural-limestone.jpg',
        alt: 'Pulpally Commercial Plaza - Polished Limestone Facade',
        title: 'Architectural Stone & Glass Commercial Elevation',
      },
      {
        url: '/assets/hero-cinematic.jpg',
        alt: 'Front Street Elevation with Wide Access',
        title: 'Street Frontage & Covered Drop-off',
      },
      {
        url: '/assets/architecture-mood.jpg',
        alt: 'Modern Executive Lobby and Atrium',
        title: 'Double-Height Grand Lobby Atrium',
      },
      {
        url: '/assets/masterplanned-plots.jpg',
        alt: 'Commercial Parking Footprint and Layout',
        title: 'Floor Plan & Parking Circulation Map',
      },
    ],
  }),

  'project-7': (locale) => ({
    id: 'project-7',
    title:
      locale === 'ml'
        ? 'ബാണാസുര ലേക്‌സൈഡ് ഇക്കോ റിസോർട്ട്'
        : 'Banasura Lakeside Eco-Resort & Retreat',
    propertyType: 'resort',
    status: 'completed',
    location: locale === 'ml' ? 'ബാണാസുര സാഗർ, വയനാട്' : 'Banasura Sagar, Wayanad',
    price: '₹ 8.50 Cr',
    description:
      locale === 'ml'
        ? 'തടാക തീരത്ത് സ്ഥിതി ചെയ്യുന്ന അത്യാധുനിക ആഡംബര റിസോർട്ട് സമുച്ചയം. വാസ്തുശില്പ വില്ലകൾ, തടാക തീര കോട്ടേജുകൾ, റെസ്റ്റോറന്റ്, ബോട്ടിംഗ് സൗകര്യം.'
        : 'A premier operating lakefront hospitality asset situated on the tranquil waters of Banasura Sagar. Features signature architectural shoreline chalets, panoramic cliffside infinity pool, organic farm-to-table restaurant, and full tourism operating permits.',
    specs: [
      { value: locale === 'ml' ? '9.5 ഏക്കർ ലേക്‌ഫ്രണ്ട്' : '9.5 Acres Lakefront Grounds' },
      { value: locale === 'ml' ? 'പ്രവർത്തിക്കുന്ന റിസോർട്ട്' : 'Operational Luxury Eco-Resort' },
      { value: locale === 'ml' ? 'തീരദേശ വില്ലകൾ' : 'Shoreline Timber Chalets' },
      { value: locale === 'ml' ? 'ടൂറിസം അനുമതികൾ' : 'Comprehensive Tourism Clearances' },
      { value: locale === 'ml' ? 'സ്ഥിരമായ റിട്ടേൺ' : 'Proven Year-Round Cashflow' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.6667,75.9667,780a,900d',
    images: [
      {
        url: '/assets/kerala-resort-aerial.png',
        alt: 'Banasura Lakeside Resort - Aerial Island & Inlet View',
        title: 'Aerial Perspective of Lakefront Shoreline & Chalets',
      },
      {
        url: '/assets/hero-cinematic.jpg',
        alt: 'Lakeside Cottages at Twilight',
        title: 'Shoreline Chalets against Mist-Clad Peaks',
      },
      {
        url: '/assets/villa-infinity-sunset.jpg',
        alt: 'Resort Sunset Pool Deck overlooking Banasura Waters',
        title: 'Waterfront Sunset Pool Deck',
      },
      {
        url: '/assets/golden-sunset-palms.jpg',
        alt: 'Private Waterside Botanical Pathway',
        title: 'Lakeside Walking Promenade',
      },
    ],
  }),

  'project-8': (locale) => ({
    id: 'project-8',
    title:
      locale === 'ml'
        ? 'വൈത്തിരി റെയിൻഫോറസ്റ്റ് റിസോർട്ട് & എസ്റ്റേറ്റ്'
        : 'Vythiri Rainforest Resort & Estate',
    propertyType: 'resort',
    status: 'ongoing',
    location: locale === 'ml' ? 'വൈത്തിരി താഴ്‌വര, വയനാട്' : 'Vythiri Valley, Wayanad',
    price: '₹ 5.20 Cr',
    description:
      locale === 'ml'
        ? 'വൈത്തിരിയിലെ നിത്യഹരിത വനത്തിൽ സ്ഥിതി ചെയ്യുന്ന വിജയകരമായ ഇക്കോ റിട്രീറ്റ്. പ്രകൃതിദത്ത അരുവി, ആഡംബര തടി കോട്ടേജുകൾ, ഉയർന്ന ഒക്യുപൻസി.'
        : 'An acclaimed boutique eco-resort property nestled along a perennial mountain brook in the dense canopy of Vythiri. Offers 6 private elevated wooden chalets, yoga shala, and approved expansion masterplan for 8 additional eco-villas.',
    specs: [
      { value: locale === 'ml' ? '6 ബൊട്ടീക് കോട്ടേജുകൾ' : '6 Boutique Chalets & Stream' },
      { value: locale === 'ml' ? 'വന സാമീപ്യം' : 'Rainforest Stream Edge Setting' },
      { value: locale === 'ml' ? 'ഇക്കോ-ടൂറിസം അനുമതി' : 'Approved Eco-Tourism Masterplan' },
      { value: locale === 'ml' ? 'ഉയർന്ന ഒക്യുപൻസി' : 'High Year-Round Occupancy' },
      { value: locale === 'ml' ? 'വികസന സാധ്യത' : 'Expandable to 14 Keys' },
    ],
    googleEarthLink: 'https://earth.google.com/web/@11.5518,76.0418,920a,800d',
    images: [
      {
        url: '/assets/hero-cinematic.jpg',
        alt: 'Vythiri Rainforest Resort - Canopy Cottages by Stream',
        title: 'Canopy Cottages alongside Perennial Stream',
      },
      {
        url: '/assets/kerala-resort-aerial.png',
        alt: 'Rainforest Valley Aerial Panorama',
        title: 'Aerial Rainforest Valley Setting',
      },
      {
        url: '/assets/kerala-mist-sunrise.jpg',
        alt: 'Morning Forest Fog over the Ridge',
        title: 'Morning Forest Mist & Mountain Stream',
      },
      {
        url: '/assets/modern-timber-eaves.jpg',
        alt: 'Cottage Private Timber Balcony',
        title: 'Private Canopy Viewing Deck',
      },
    ],
  }),
}

type Media = {
  url?: string
  alt?: string
  title?: string
  sizes?: { card?: { url?: string }; hero?: { url?: string } }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const t = await getTranslations('gallery')

  let property: any = null

  // 1. First, check if this is a known showcase catalogue item
  const showcaseItem = SHOWCASE_PROPERTIES[id]
  if (showcaseItem) {
    property = showcaseItem(locale)
  } else {
    // 2. Otherwise, look up in Payload CMS
    try {
      const payload = await getPayload({ config })
      property = await payload.findByID({
        collection: 'properties',
        id,
        locale: locale as 'en' | 'ml',
        depth: 1,
      })
    } catch {
      notFound()
    }
  }

  if (!property) notFound()

  // Extract all images uploaded in Payload CMS or defined in showcase
  const rawImages: Media[] = Array.isArray(property.images) ? property.images : []
  let galleryImages: PropertyImageItem[] = rawImages
    .map((img: any) => {
      const url = img?.sizes?.hero?.url || img?.sizes?.card?.url || img?.url
      if (!url) return null
      return {
        url,
        alt: img?.alt || property.title,
        title: img?.title || property.title,
      }
    })
    .filter(Boolean) as PropertyImageItem[]

  // Fallback to single image if no array provided
  if (galleryImages.length === 0) {
    const fallbackUrl =
      property.imageUrl ||
      property.featuredImage?.url ||
      '/assets/masterplanned-plots.jpg'
    galleryImages = [
      {
        url: fallbackUrl,
        alt: property.title,
        title: property.title,
      },
    ]
  }

  const isSold = property.status === 'sold'
  const mapCoords = property.googleEarthLink ? parseCoords(property.googleEarthLink) : null
  const mapEmbedUrl = mapCoords
    ? `https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&z=15&output=embed`
    : null

  let tagLabel = 'Property · For Sale'
  if (property.propertyType === 'land') {
    tagLabel = locale === 'ml' ? 'ഭൂമി · വിൽക്കാനുണ്ട്' : 'Land · For Sale'
  } else if (property.propertyType === 'house') {
    tagLabel = locale === 'ml' ? 'വീട് · വിൽക്കാനുണ്ട്' : 'House · For Sale'
  } else if (property.propertyType === 'commercial') {
    tagLabel = locale === 'ml' ? 'കൊമേഴ്‌സ്യൽ · വിൽക്കാനുണ്ട്' : 'Commercial · For Sale'
  } else if (property.propertyType === 'resort') {
    tagLabel = locale === 'ml' ? 'റിസോർട്ട് · വിൽക്കാനുണ്ട്' : 'Resort · For Sale'
  }

  const wa = waLink(
    isSold
      ? `Hi, I'm looking for a property like ${property.title}. Please share similar options.`
      : `Hi, I'm interested in ${property.title} in Wayanad. Please share more details, all property photos, and arrange a site visit.`,
  )
  const mail = mailLink(
    `Enquiry: ${property.title}`,
    `Hi,\n\nI'm interested in ${property.title}.\nLocation: ${property.location || ''}\nPrice: ${property.price || ''}\n\nPlease share availability, complete photo gallery, and a site visit slot.\n\nThanks,`,
  )

  return (
    <>
      <header className="page-head">
        <div className="inner">
          <Link href="/projects" className="back-link">
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {t('back')}
          </Link>
          <span className="eyebrow" style={{ marginTop: 22, display: 'block' }}>
            <span className="rule" />&nbsp;&nbsp;
            <span>{isSold ? t('sold') : tagLabel}</span>
          </span>
          <h1 className="display">{property.title}</h1>
          {property.location && (
            <div className="prop-head-loc">
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="var(--vl-olive-light)" fill="none" strokeWidth="1.6">
                <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              {property.location}
            </div>
          )}
        </div>
      </header>

      <section className="prop-detail">
        <div className="prop-wrap">

          {/* ========================================================================= */}
          {/* INTERACTIVE MULTI-IMAGE ARCHITECTURAL GALLERY & ENLARGED LIGHTBOX        */}
          {/* ========================================================================= */}
          <PropertyGallery
            images={galleryImages}
            title={property.title}
            isSold={isSold}
            soldLabel={t('sold')}
            viewAllLabel={locale === 'ml' ? 'എല്ലാ ഫോട്ടോകളും കാണുക' : 'View all photos'}
            enlargeHint={locale === 'ml' ? 'വലുതാക്കി കാണുക' : 'Click to enlarge'}
          />

          {/* Price + Specs */}
          <div className="prop-meta">
            {property.price && (
              <div className={`prop-price${isSold ? ' prop-price-sold' : ''}`}>
                {property.price}
              </div>
            )}
            {property.specs && property.specs.length > 0 && (
              <div className="prop-specs">
                {property.specs.map((s: any, i: number) => (
                  <span key={i} className="prop-spec">{s.value}</span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <div className="prop-desc-wrap">
              <h2 className="prop-section-head">{t('about')}</h2>
              <p className="prop-desc">{property.description}</p>
            </div>
          )}

          {/* Google Earth link — land, commercial & resort */}
          {property.googleEarthLink && (property.propertyType === 'land' || property.propertyType === 'commercial' || property.propertyType === 'resort') && (
            <div className="prop-earth">
              <h2 className="prop-section-head">{t('viewOnEarth')}</h2>
              {mapEmbedUrl && (
                <div className="prop-map">
                  <iframe
                    src={mapEmbedUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property location map"
                  />
                </div>
              )}
              <p className="prop-earth-desc">{t('viewOnEarthDesc')}</p>
              <a href={property.googleEarthLink} target="_blank" rel="noopener" className="prop-earth-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
                {t('viewOnEarthBtn')}
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          )}

          {/* Enquiry */}
          <div className="prop-enq">
            <p className="prop-enq-label">{isSold ? t('similar') : t('interested')}</p>
            <div className="prop-enq-btns">
              <a href={wa} className="btn-whatsapp" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm4.4 12.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                {isSold ? t('findSimilar') : t('buyEnquiry')}
              </a>
              {!isSold && (
                <a href={mail} className="btn-ghost">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                  {t('emailUs')}
                </a>
              )}
            </div>
            <Link href="/projects" className="back-link" style={{ marginTop: 40, display: 'inline-flex' }}>
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {t('back')}
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
