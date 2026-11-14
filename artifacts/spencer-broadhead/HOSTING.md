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

The production build pre-renders six real React pages: Home (`/`), Services (`/services`), Bodywork (`/bodywork`), About (`/about`), Our team (`/our-team`) and Contact (`/contact`). Each has its own static HTML document, unique metadata and canonical URL, so visitors and crawlers receive the text and links without running JavaScript. React then hydrates that same content. The team page preserves its existing URL rather than redirecting to About.

Navigation uses normal document links. Vercel's `cleanUrls` setting serves the generated HTML at the extensionless addresses; no catch-all homepage rewrite is used. A generated `404.html` handles unknown pages without indexing them.

`seo.mjs` holds the intended canonical domain, currently `https://spencerandbroadhead.co.uk`. This is the existing domain being replaced, not confirmation that the new site is live there. Update this one file if the final domain changes; rebuild to regenerate metadata, local-business structured data, sitemap and robots.txt.

The root Vercel configuration permanently redirects the known old page URLs. Keep these redirects when replacing the old site. In Vercel, set the intended domain as primary and redirect other domain variants to it. Vercel preview deployments should remain excluded from indexing; verify their `X-Robots-Tag` before launch.

After the real domain points to Vercel:

1. Check the live page, redirects, `/robots.txt` and `/sitemap.xml`.
2. Verify ownership in Google Search Console and submit the sitemap.
3. Validate the page using Google's Rich Results Test and measure mobile performance using PageSpeed Insights.
4. Keep the Google Business Profile's address, phone, hours and website consistent with the site.

Structured data uses verified contact details and weekday hours only, with no fabricated ratings or review markup. No ranking or indexing outcome is guaranteed.
