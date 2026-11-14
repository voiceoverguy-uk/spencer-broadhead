// Intended replacement domain supplied by the user, not a preview/deployment URL.
export const siteUrl = 'https://spencerandbroadhead.co.uk';
export const canonicalUrl = `${siteUrl}/`;
export const title = 'Garage & MOT Testing Wakefield | Spencer & Broadhead';
export const description = 'Family-run garage in Wakefield since 1969. MOT testing, car servicing, diagnostics and repairs on George Street. Call Spencer & Broadhead on 01924 373675.';
export const socialImage = `${siteUrl}/images/garage-outside.jpg`;

export const pages = [
  { path: '/', label: 'Home', title, description },
  {
    path: '/services', label: 'Services',
    title: 'Car Servicing & MOTs Wakefield | Spencer & Broadhead',
    description: 'Explore MOT testing, car servicing, diagnostics, brakes, tyres, clutches, air conditioning and exhaust repairs at our family-run garage in central Wakefield.',
  },
  {
    path: '/bodywork', label: 'Bodywork',
    title: 'Car Bodywork Repairs Wakefield | Spencer & Broadhead',
    description: 'On-site accident and bodywork repairs on George Street, Wakefield. From minor bumps and scratches to insurance repairs, contact our friendly garage team.',
  },
  {
    path: '/about', label: 'About',
    title: 'About Our Wakefield Garage | Spencer & Broadhead',
    description: 'Meet the story behind Spencer & Broadhead, the family-run independent garage founded in Wakefield in 1969. Honest advice and experienced vehicle technicians.',
  },
  {
    path: '/our-team', label: 'Our team',
    title: 'Meet Our Wakefield Garage Team | Spencer & Broadhead',
    description: 'Meet David, Robert, Andy and Lewis at Spencer & Broadhead, our family-run garage on George Street, Wakefield. Familiar faces and personal service.',
  },
  {
    path: '/testimonials', label: 'Testimonials',
    title: 'Customer Testimonials | Spencer & Broadhead Wakefield',
    description: 'Read genuine customer testimonials about Spencer & Broadhead, our family-run Wakefield garage, and the friendly, efficient service our customers value.',
  },
  {
    path: '/contact', label: 'Contact',
    title: 'Contact Our Wakefield Garage | Spencer & Broadhead',
    description: 'Call 01924 373675 or visit Spencer & Broadhead on George Street, Wakefield, WF1 1DR. Find directions, email and weekday opening hours. Weekends by appointment.',
  },
];

export const notFoundPage = {
  path: '/404', label: 'Page not found',
  title: 'Page Not Found | Spencer & Broadhead Wakefield',
  description: 'This page could not be found. Visit our Wakefield garage website to explore services, learn about our family-run team or contact Spencer & Broadhead.',
};

export const getPage = pathname => {
  const normalized = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return pages.find(page => page.path === normalized) ?? notFoundPage;
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

export function withPageSeo(html, pathname) {
  const page = getPage(pathname);
  const url = `${siteUrl}${page.path}`;
  const isNotFound = page === notFoundPage;
  const meta = (attribute, key, value) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', page.description),
    isNotFound ? meta('name', 'robots', 'noindex, follow') : `<link rel="canonical" href="${url}" />`,
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', socialImage),
    meta('property', 'og:image:alt', 'Spencer & Broadhead garage on George Street, Wakefield'),
    meta('property', 'og:site_name', 'Spencer & Broadhead'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', socialImage),
    jsonLd(garageSchema),
  ];
  if (page.path !== '/' && !isNotFound) {
    tags.push(jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl },
        { '@type': 'ListItem', position: 2, name: page.label, item: url },
      ],
    }));
  }
  const marker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
  if (!marker.test(html)) throw new Error('Missing SEO markers in the HTML template.');
  return html.replace(marker, () => `<!-- seo:start -->\n${tags.join('\n')}\n<!-- seo:end -->`);
}

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
