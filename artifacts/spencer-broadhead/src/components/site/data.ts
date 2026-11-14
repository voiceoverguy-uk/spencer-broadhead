export const img = (p: string) => `${import.meta.env.BASE_URL}images/${p}`;

export const PHONE = "01924 373675";
export const TEL = "tel:+441924373675";
export const EMAIL = "info@spencerandbroadhead.co.uk";
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry about my car")}`;
export const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Spencer & Broadhead Ltd, George Street, Wakefield WF1 1DR");
export const MAP_EMBED =
  "https://www.google.com/maps?q=" + encodeURIComponent("George Street, Wakefield WF1 1DR") + "&output=embed";

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export type RouteKey = "home" | "services" | "bodywork" | "about" | "team" | "contact" | "notfound";

/** BASE_URL-aware path for a site page, e.g. page("/services") or page("/contact", "#hours"). */
export const page = (path: string, hash = "") => `${BASE}${path === "/" ? "/" : path}${hash}`;

export const ROUTES: Record<string, RouteKey> = {
  "/": "home",
  "/services": "services",
  "/bodywork": "bodywork",
  "/about": "about",
  "/our-team": "team",
  "/contact": "contact",
};

export function resolveRoute(pathname: string): RouteKey {
  let p = (pathname || "/").split(/[?#]/)[0];
  if (BASE && (p === BASE || p.startsWith(BASE + "/"))) p = p.slice(BASE.length);
  p = p.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
  return ROUTES[p] ?? "notfound";
}

export const NAV: { key: RouteKey; href: string; label: string }[] = [
  { key: "services", href: page("/services"), label: "Services" },
  { key: "bodywork", href: page("/bodywork"), label: "Bodywork" },
  { key: "about", href: page("/about"), label: "About us" },
  { key: "team", href: page("/our-team"), label: "Our team" },
  { key: "contact", href: page("/contact"), label: "Contact" },
];

export const SERVICES = [
  { code: "01", name: "Servicing", line: "Interim and full services to keep your car running as it should. We tell you what it needs, and what it doesn't." },
  { code: "02", name: "MOT testing", line: "MOT tests carried out on site. If something needs attention, we'll explain it plainly before any work goes ahead." },
  { code: "03", name: "Diagnostics", line: "Warning light on? We read the fault, find the cause and talk you through the options." },
  { code: "04", name: "Tyres", line: "Worn, damaged or just due. We'll check tread and condition and fit replacements." },
  { code: "05", name: "Brakes", line: "Pads, discs and the rest of the system checked and repaired. Not something to put off." },
  { code: "06", name: "Clutches", line: "Slipping, juddering or heavy pedal. Clutch work carried out by people who've done plenty." },
  { code: "07", name: "Air conditioning", line: "Air con not blowing cold? We'll look at why and get it working again." },
  { code: "08", name: "Exhausts", line: "Blowing, rattling or failing the MOT. Exhaust repairs and replacements." },
];
