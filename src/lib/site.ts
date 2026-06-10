/**
 * Centralni podaci o prodavnici — JEDINI izvor istine za NAP
 * (Name / Address / Phone), radno vreme i SEO podatke.
 * Svaka sekcija i schema.org markup čitaju odavde.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://una-zdrava-hrana.vercel.app'

export const site = {
  name: 'UNA Zdrava Hrana',
  shortName: 'UNA',
  tagline: 'Priroda zna recept',
  description:
    'UNA je prodavnica zdrave hrane u Kragujevcu, kod Mosta u Bresnici. ' +
    'Organski proizvodi, suplementi i vitamini, superhrana, čajevi, zdrave grickalice ' +
    'i prirodna kozmetika — više od 15 godina poverenja.',
  url: SITE_URL,
  locale: 'sr_RS',

  address: {
    street: 'Slobodana Penezića Krcuna',
    landmark: 'Kod mosta u Bresnici',
    // varijanta za upotrebu usred rečenice — Bresnica ostaje veliko slovo
    landmarkInline: 'kod mosta u Bresnici',
    city: 'Kragujevac',
    postalCode: '34000',
    countryCode: 'RS',
    countryName: 'Srbija',
  },

  geo: {
    lat: 43.9970506,
    lng: 20.9379514,
  },

  phones: {
    landline: { display: '034 387 257', e164: '+38134387257' },
    mobile: { display: '+381 64 121 32 92', e164: '+381641213292' },
  },

  email: 'una.zdravahrana@gmail.com',

  hours: {
    label: 'Ponedeljak – subota',
    opens: '07:30',
    closes: '21:00',
    closedLabel: 'Nedelja — zatvoreno',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },

  yearsInBusiness: 15,

  maps: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.3396847844284!2d20.9353765!3d43.9970506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475721e27f812157%3A0x6b96b2b26ee95793!2sHrani%20se%20zdravo!5e0!3m2!1sen!2srs!4v1738702000000!5m2!1sen!2srs',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=43.9970506,20.9379514',
    placeUrl:
      'https://www.google.com/maps/search/?api=1&query=43.9970506,20.9379514',
  },
} as const

export const stats = [
  { value: 15, suffix: '+', label: 'godina poverenja' },
  { value: 500, suffix: '+', label: 'proizvoda u ponudi' },
  { value: 5000, suffix: '+', label: 'zadovoljnih kupaca' },
] as const

/** FAQ — deli se između UI sekcije i FAQPage JSON-LD šeme. */
export const faq = [
  {
    question: 'Koje je radno vreme prodavnice UNA?',
    answer:
      'Otvoreni smo od ponedeljka do subote, od 07:30 do 21:00. Nedeljom smo zatvoreni.',
  },
  {
    question: 'Gde se tačno nalazite?',
    answer:
      'U Ulici Slobodana Penezića Krcuna u Kragujevcu, na dobro poznatoj lokaciji kod mosta u Bresnici. Lako ćete nas pronaći i kolima i pešice — most je orijentir koji svi u kraju znaju.',
  },
  {
    question: 'Šta sve mogu da pronađem u ponudi?',
    answer:
      'Više od 500 proizvoda u šest kategorija: organska hrana, suplementi i vitamini, čajevi i napici, zdrave grickalice, superhrana i prirodna kozmetika.',
  },
  {
    question: 'Da li mogu da dobijem savet pri izboru proizvoda?',
    answer:
      'Naravno — to je deo posla koji najviše volimo. Iza nas je više od 15 godina iskustva sa zdravom ishranom, pa slobodno pitajte: pomoći ćemo vam da izaberete ono što vama zaista odgovara.',
  },
  {
    question: 'Kako mogu da vas kontaktiram?',
    answer:
      'Telefonom na 034 387 257 ili na +381 64 121 32 92, mejlom na una.zdravahrana@gmail.com — ili jednostavno svratite u prodavnicu.',
  },
] as const

/** schema.org JSON-LD — GroceryStore + WebSite + FAQPage */
export function buildStoreJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    '@id': `${SITE_URL}/#store`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: site.phones.landline.e164,
    email: site.email,
    image: [`${SITE_URL}/images/store/store-front.jpg`],
    logo: `${SITE_URL}/una-logo-512.png`,
    priceRange: '$$',
    currenciesAccepted: 'RSD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street} (${site.address.landmark})`,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.maps.placeUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...site.hours.schemaDays],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
      {
        // nedelja zatvoreno — opens === closes označava neradni dan
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '00:00',
        closes: '00:00',
      },
    ],
    keywords:
      'zdrava hrana, organski proizvodi, suplementi, superhrana, prirodna kozmetika, Kragujevac, Bresnica',
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    inLanguage: 'sr-Latn-RS',
    publisher: { '@id': `${SITE_URL}/#store` },
  }
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
