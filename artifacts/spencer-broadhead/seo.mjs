// Intended replacement domain supplied by the user, not a preview/deployment URL.
export const siteUrl = 'https://spencerandbroadhead.co.uk';
export const canonicalUrl = `${siteUrl}/`;
export const title = 'Garage & MOT Testing Wakefield | Spencer & Broadhead';
export const description = 'Family-run garage in Wakefield since 1969. MOT testing, car servicing, diagnostics and repairs on George Street. Call Spencer & Broadhead on 01924 373675.';
export const socialImage = `${siteUrl}/images/garage-outside.jpg`;

export const garageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': `${siteUrl}/#garage`,
  name: 'Spencer & Broadhead Ltd',
  url: canonicalUrl,
  description,
  telephone: '+441924373675',
  email: 'info@spencerandbroadhead.co.uk',
  foundingDate: '1969',
  image: socialImage,
  logo: `${siteUrl}/images/original-logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'George Street',
    addressLocality: 'Wakefield',
    addressRegion: 'West Yorkshire',
    postalCode: 'WF1 1DR',
    addressCountry: 'GB',
  },
  areaServed: { '@type': 'City', name: 'Wakefield' },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30',
  }],
  // Weekend appointments aren't regular opening hours.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Garage services',
    itemListElement: [
      'Car servicing', 'MOT testing', 'Vehicle diagnostics', 'Tyres',
      'Brakes', 'Clutches', 'Air conditioning', 'Exhausts', 'Accident and bodywork repairs',
    ].map(name => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};
