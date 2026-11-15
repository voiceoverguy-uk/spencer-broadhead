---
name: Website hosting requirements
description: User-stated destination and scope for the garage website
---

The user wants a clean replacement website for Spencer & Broadhead, with code hosted on GitHub and the website hosted on Vercel.

**Why:** The user explicitly named these destinations when requesting the website.

**How to apply:** Keep the website portable to Vercel. Do not assume Replit hosting is the desired production destination, or claim either external account has been connected without doing so.

The user also explicitly requires the replacement website to be SEO compliant.

**Why:** Local search visibility is a stated requirement, not an optional visual enhancement.

**How to apply:** Preserve crawlable, pre-rendered content when changing the React site. Keep real business details consistent and preserve old URLs through redirects when moving to Vercel. Do not present rankings or indexing as guaranteed.

The user wants separate website pages rather than all content on one page.

**Why:** The user explicitly requested a multi-page site.

**How to apply:** Keep the main navigation as real page links and preserve page-specific content and SEO; do not revert to one long scrolling homepage.

The user wants testimonial dates omitted and a randomly rotating selection on the home page.

**Why:** The user explicitly requested these changes when bringing across the original testimonials.

**How to apply:** Preserve the genuine customer wording and attribution without displaying dates or implying the old quotes are new reviews.

The user subsequently chose live Google review cards instead of the original website's static testimonials, and approved “randomise and cycle”: randomise the opening review and show all returned reviews before repeating, without controls.

**Why:** The user selected “Live Google review cards” when asked how Google reviews should appear.

**How to apply:** Keep the integration compatible with static Vercel hosting. Treat the Maps browser key as browser-visible and require API and referrer restrictions. Do not claim a listing or live reviews are verified unless Google actually returns the matching business. Do not silently substitute old testimonials when Google fails.

Verify referrer-restricted integrations from the real HTTPS preview origin, not the screenshot service's localhost origin.

**Why:** The screenshot service received a Google 403 while the real HTTPS browser successfully loaded the same integration and verified the correct business.

**How to apply:** A localhost screenshot failure alone does not prove that a restricted key or its authorized website is broken. Preserve restrictions and use the real browser origin to distinguish an environment mismatch from a genuine API failure.

The user dislikes chunky heading lettering and wants softer typography that remains businesslike.

**Why:** The user explicitly rejected the heavy condensed “Meet the team” heading.

**How to apply:** Keep headings professional and readable without restoring heavy condensed, all-capital display typography.

The user wants the site streamlined, closer to the simplicity of the original, without lots of repetition.

**Why:** The user liked the design but felt it had become very busy and repetitive.

**How to apply:** Give each page a distinct purpose. Avoid repeating the garage story, large contact prompts and repair process across pages; keep homepage previews concise.

The user wants enough accurate, relevant business information on the website to improve local search visibility.

**Why:** They said the current site is not being found and asked for useful text Google can understand.

**How to apply:** Use specific, helpful details about services, Wakefield/George Street, company history, expertise and customer process. Write naturally for visitors; avoid repetitive keyword stuffing and never guarantee rankings.
