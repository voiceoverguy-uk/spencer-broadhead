# GitHub and Vercel

This is a static React website styled with Tailwind CSS. It does not depend on the API server or a database.

## Vercel

1. Push the full repository to your GitHub account.
2. In Vercel, import that repository.
3. Keep the root directory set to the repository root. The root `vercel.json` supplies the install command, build command and output directory.
4. Deploy a preview and check it before moving the existing domain.

Calls, email links and Google Maps directions open the visitor's own phone, email or map app. There is no online appointment reservation or enquiry delivery service.

No GitHub repository or Vercel project is connected automatically by this code.

## Search-engine setup

The production build pre-renders seven real React pages: Home (`/`), Services (`/services`), Bodywork (`/bodywork`), About (`/about`), Our team (`/our-team`), Testimonials (`/testimonials`) and Contact (`/contact`). Each has its own static HTML document, unique metadata and canonical URL, so visitors and crawlers receive the text and links without running JavaScript. React then hydrates that same content. The team and testimonials pages preserve their existing URLs rather than redirecting elsewhere.

Google reviews load in the browser using Maps JavaScript API and Places API (New). Add `VITE_GOOGLE_MAPS_API_KEY` in Vercel's environment settings before building. This is a browser-visible key: restrict it to these APIs and the exact allowed website referrers (production apex and www domains, plus any preview domains you use). Google Cloud billing must be enabled. Usage-based charges may apply.

The website searches for Spencer & Broadhead Ltd, George Street, Wakefield WF1 1DR and verifies the name, city and postcode before displaying reviews. It stores only the verified Place ID in local storage, not review content. No fixed Place ID has yet been independently confirmed. Reviews are requested fresh on page load, with no background polling. Google returns up to five reviews selected by relevance, not necessarily the newest. The compact homepage selection rotates automatically, except for visitors requesting reduced motion. Dates are omitted; author profile links and Google branding remain. Errors show an explicit message and a direct Google link rather than substituting old testimonials. No rating or aggregate review structured data is generated.

Navigation uses normal document links. Vercel's `cleanUrls` setting serves the generated HTML at the extensionless addresses; no catch-all homepage rewrite is used. A generated `404.html` handles unknown pages without indexing them.

`seo.mjs` holds the intended canonical domain, currently `https://spencerandbroadhead.co.uk`. This is the existing domain being replaced, not confirmation that the new site is live there. Update this one file if the final domain changes; rebuild to regenerate metadata, local-business structured data, sitemap and robots.txt.

The root Vercel configuration permanently redirects the known old page URLs. Keep these redirects when replacing the old site. In Vercel, set the intended domain as primary and redirect other domain variants to it. Vercel preview deployments should remain excluded from indexing; verify their `X-Robots-Tag` before launch.

After the real domain points to Vercel:

1. Check the live page, redirects, `/robots.txt` and `/sitemap.xml`.
2. Verify ownership in Google Search Console and submit the sitemap.
3. Validate the page using Google's Rich Results Test and measure mobile performance using PageSpeed Insights.
4. Keep the Google Business Profile's address, phone, hours and website consistent with the site.

Structured data uses verified contact details and weekday hours only, with no fabricated ratings or review markup. No ranking or indexing outcome is guaranteed.
