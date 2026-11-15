import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Car, Clock, Mail, MapPin, Phone, ShieldCheck, Wrench, MessageSquare, ClipboardCheck, KeyRound } from "lucide-react";
import { Btn, Eyebrow, Reveal } from "./ui";
import { DIRECTIONS, EMAIL, MAILTO, MAP_EMBED, NAV, PHONE, SERVICES, TEL, img, page } from "./data";

const years = new Date().getFullYear() - 1969;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1C2759] text-white">
      <div className="absolute inset-0">
        <img src={img("workshop-hero.webp")} alt="" width="1600" height="650" fetchPriority="high" className="kenburns h-full w-full object-cover" />
        <div className="hero-shade absolute inset-0" />
      </div>
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 pb-16 pt-36 md:min-h-[680px] md:px-8">
        <div className="max-w-3xl">
          <div className="rise"><Eyebrow light>Independent garage, George Street, Wakefield</Eyebrow></div>
          <h1 className="rise mt-6 font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.08]" style={{ animationDelay: "120ms" }}>Car servicing, MOTs &amp; repairs in Wakefield</h1>
          <p className="rise mt-7 max-w-xl text-lg text-white/80 md:text-xl" style={{ animationDelay: "240ms" }}>
            Family-run since 1969. Experienced technicians, straightforward advice and only the work your car needs.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Btn href={TEL} testId="button-hero-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
            <Btn href={page("/services")} variant="light" testId="button-hero-services">See what we do <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Btn>
          </div>
          <p className="mt-7 flex items-center gap-2 text-sm text-white/80"><ShieldCheck className="h-4 w-4 shrink-0 text-[#F4C430]" /> RAC Repair &amp; Go approved</p>
        </div>
      </div>
      <div className="stripe-rule h-2 w-full" />
    </section>
  );
}

export function Marquee() {
  const items = ["Servicing", "MOT testing", "Diagnostics", "Tyres", "Brakes", "Clutches", "Air conditioning", "Exhausts", "Accident repairs", "Bodywork"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-card py-4" aria-hidden>
      <div className="marquee flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold uppercase text-secondary/80">
            {t} <span className="h-2 w-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Services({ title = "Everything your car needs, under one roof." }: { title?: string } = {}) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The work we do</Eyebrow>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] text-secondary md:text-6xl">{title}</h2>
            <p className="mt-5 max-w-sm text-lg text-muted-foreground">
              From a routine service to a fault nobody else could pin down. If you're not sure what's wrong, ring us and describe it. That's what we're here for.
            </p>
          </div>
        </Reveal>
        <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-8">
          {SERVICES.map((s) => (
            <li key={s.code} data-testid={`card-service-${s.code}`} className="border-t border-border py-4">
                <h3 className="text-xl font-semibold text-secondary">{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-secondary">Inside our workshop</h2>
        <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { file: "spencer-broadhead-workshop-MOT-bay.webp", label: "Our MOT bay", alt: "Car positioned over the inspection pit in our MOT testing bay" },
            { file: "spencer-broadhead-workshop-2.webp", label: "Servicing and repairs", alt: "Technician working alongside cars raised on workshop ramps" },
            { file: "spencer-broadhead-workshop-3.webp", label: "Engine work", alt: "Technician working on an engine beneath a raised car" },
            { file: "spencer-broadhead-workshop-.webp", label: "Mechanical repairs", alt: "Engine and transmission removed from a car in our workshop" },
          ].map((photo) => (
            <li key={photo.file}>
              <a href={img(photo.file)} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`View full photo: ${photo.label} (opens in a new tab)`}>
                <img src={img(photo.file.replace(".webp", "-thumb.webp"))} alt={photo.alt} width="600" height="450" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-md object-cover" />
                <span className="mt-2 block text-sm text-secondary underline-offset-4 group-hover:underline">{photo.label} <span aria-hidden>↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Bodywork() {
  return (
    <section id="bodywork" className="relative bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img src={img("garage-inside.jpg")} alt="Inside the Spencer & Broadhead workshop with cars raised on ramps" width="1600" height="650" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] hover:scale-105" />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-md bg-[#F4C430] px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-secondary">Our workshop, George Street</div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow light>Accident and bodywork repairs</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">Bumped, scraped or dented? Fixed on site.</h2>
          <p className="mt-6 text-lg text-white/75">
            We handle accident and bodywork repairs here in our own workshop, so your car isn't passed around between businesses. One garage, one point of contact, and people you can ring for an update.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-white/15 p-5">
              <Wrench className="h-5 w-5 text-[#F4C430]" />
              <div className="mt-3 font-semibold">Repaired in-house</div>
              <div className="text-sm text-white/65">Mechanical and body work in the same building.</div>
            </div>
            <div className="rounded-md border border-white/15 p-5">
              <KeyRound className="h-5 w-5 text-[#F4C430]" />
              <div className="mt-3 font-semibold">Free loan car</div>
              <div className="text-sm text-white/65">If you need one, subject to availability. Just ask.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <figure className="lg:col-span-4">
          <img src={img("ray-spencer.webp")} alt="Ray Spencer, co-founder of Spencer & Broadhead" width="1069" height="1471" loading="lazy" decoding="async" className="mx-auto w-full max-w-sm rounded-lg" />
          <figcaption className="mt-3 text-sm text-muted-foreground">Ray Spencer, co-founder</figcaption>
        </figure>
        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-secondary md:text-5xl">
            Two names over the door. Still a family business.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Ray Spencer and Barry Broadhead opened the garage in 1969. More than {years > 55 ? "55" : years} years on, Spencer &amp; Broadhead is still independent, still family-run, and still in central Wakefield.
            </p>
            <p>
              Plenty has changed under the bonnet since then. What hasn't is the way we work: look at the car properly, explain what we've found in plain English, and only do the work you've agreed to.
            </p>
          </div>
          <div className="mt-8 grid items-start gap-6 border-t border-border pt-8 sm:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <h3 className="text-2xl font-semibold text-secondary">Celebrating 50 years</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">In 2019, the Wakefield Express marked our golden jubilee with a feature on Ray and the garage’s first 50 years on George Street.</p>
              <a href={img("spencer-broadhead-50-years-newspaper-article.webp")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">Read the newspaper cutting <ArrowUpRight className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <a href={img("spencer-broadhead-50-years-newspaper-article.webp")} target="_blank" rel="noopener noreferrer" aria-label="View the full 50th anniversary newspaper article (opens in a new tab)" className="block">
              <img src={img("spencer-broadhead-50-years-newspaper-article.webp")} alt="Newspaper cutting headlined City garage still going strong after 50 years, featuring Ray Spencer outside the garage" width="928" height="1694" loading="lazy" decoding="async" className="mx-auto w-full max-w-[280px] rounded-sm border border-border" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function How() {
  const steps = [
    { icon: Phone, t: "Get in touch", d: `Ring ${PHONE} or email. Tell us what's going on and we'll arrange a time that suits.` },
    { icon: ClipboardCheck, t: "We take a look", d: "Our technicians inspect the car and find the cause, not just the symptom." },
    { icon: MessageSquare, t: "You decide", d: "We explain what we've found and what it involves. Nothing goes ahead without your say-so." },
    { icon: Car, t: "Back on the road", d: "Work done, car ready. A free loan car in the meantime if you need one, subject to availability." },
  ];
  return (
    <section id="how" className="border-y border-border bg-muted/60">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.92] text-secondary md:text-6xl">No jargon. No surprises.</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="group relative border-t-2 border-secondary pt-6" data-testid={`step-${i + 1}`}>
                <span className="absolute -top-[2px] left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Step 0{i + 1}</span>
                  <s.icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-secondary">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Exterior() {
  return (
    <section className="relative overflow-hidden">
      <img src={img("garage-outside.jpg")} alt="The Spencer & Broadhead garage building on George Street, Wakefield" width="1600" height="650" loading="lazy" decoding="async" className="h-[60vh] min-h-[360px] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C2759] via-[#1C2759]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Reveal>
          <p className="max-w-2xl font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
            Look for the blue signs on George Street.
          </p>
          <div className="mt-5"><Btn href={DIRECTIONS} external variant="light" testId="button-exterior-directions"><MapPin className="h-4 w-4" /> Get directions</Btn></div>
        </Reveal>
      </div>
    </section>
  );
}

export function Visit() {
  const hours = [
    ["Monday to Friday", "08:30 – 17:30"],
    ["Saturday", "By appointment"],
    ["Sunday", "By appointment"],
  ];
  return (
    <section id="visit" className="bg-[#1C2759] text-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <h2 className="sr-only">Contact details and opening hours</h2>
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2">
              {[
                { href: TEL, icon: Phone, k: "Call", v: PHONE, id: "call" },
                { href: MAILTO, icon: Mail, k: "Email", v: EMAIL, id: "email" },
                { href: DIRECTIONS, icon: MapPin, k: "Find us", v: "George Street, Wakefield, West Yorkshire, WF1 1DR", id: "directions", ext: true },
              ].map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  data-testid={`link-contact-${c.id}`}
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group bg-[#1C2759] p-7 transition-colors hover:bg-[#263B96] ${c.id === "directions" ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <c.icon className="h-5 w-5 text-[#F4C430]" />
                    <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{c.k}</div>
                  <div className="mt-1 break-words text-xl font-semibold md:text-2xl">{c.v}</div>
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-white/10 p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"><Clock className="h-4 w-4" /> Opening hours</div>
              <dl className="mt-4 divide-y divide-white/10">
                {hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between py-3">
                    <dt className="text-white/75">{d}</dt>
                    <dd className="font-semibold">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="h-[320px] overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Map showing Spencer & Broadhead on George Street, Wakefield"
                src={MAP_EMBED}
                className="h-full w-full grayscale-[40%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#141c42] text-white/60">
      <div className="stripe-rule h-1.5" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <img src={img("original-logo.png")} alt="Spencer & Broadhead" width="250" height="105" loading="lazy" className="h-9 w-auto" />
          <span className="text-sm">Independent, family-run garage in Wakefield since 1969.</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href={TEL} data-testid="link-footer-call" className="hover:text-white">{PHONE}</a>
          <a href={MAILTO} data-testid="link-footer-email" className="hover:text-white">{EMAIL}</a>
          <a href="#top" data-testid="link-footer-top" className="hover:text-white">Back to top</a>
        </div>
      </div>
      <nav aria-label="Footer" className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm font-semibold">
          {NAV.map((n) => (
            <li key={n.key}><a href={n.href} data-testid={`link-footer-${n.key}`} className="hover:text-white">{n.label}</a></li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto max-w-7xl px-5 pb-8 text-xs text-white/40 md:px-8">
        &copy; {new Date().getFullYear()} Spencer &amp; Broadhead Ltd. George Street, Wakefield, WF1 1DR.
      </div>
    </footer>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-[#1C2759] sm:hidden">
      <a href={TEL} data-testid="button-sticky-call" className="flex items-center justify-center gap-2 bg-accent py-3.5 font-bold text-white"><Phone className="h-4 w-4" /> Call</a>
      <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" data-testid="button-sticky-directions" className="flex items-center justify-center gap-2 py-3.5 font-bold text-white"><MapPin className="h-4 w-4" /> Directions</a>
    </div>
  );
}

export function PageIntro({ eyebrow, title, lead, image, imageAlt, children }: { eyebrow: string; title: string; lead: string; image?: string; imageAlt?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#1C2759] text-white">
      {image && (
        <div className="absolute inset-0">
          <img src={img(image)} alt={imageAlt ?? ""} width="1600" height="650" fetchPriority="high" className="kenburns h-full w-full object-cover" />
          <div className="hero-shade absolute inset-0" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-[140px] md:px-8 md:pb-20 md:pt-[168px]">
        <div className="rise"><Eyebrow light>{eyebrow}</Eyebrow></div>
        <h1 className="rise mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,5.75rem)] font-extrabold uppercase leading-[0.9]" style={{ animationDelay: "100ms" }}>{title}</h1>
        <p className="rise mt-6 max-w-2xl text-lg text-white/80 md:text-xl" style={{ animationDelay: "200ms" }}>{lead}</p>
        {children && <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "300ms" }}>{children}</div>}
      </div>
      <div className="stripe-rule h-2 w-full" />
    </section>
  );
}

export function NextSteps({ items }: { items: { href: string; label: string; line: string; id: string }[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <ul className={`grid gap-6 border-t border-border pt-6 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={it.href} data-testid={`link-next-${it.id}`} className="group flex h-full items-start justify-between gap-6 py-2">
              <span>
                <span className="block text-xl font-semibold text-secondary group-hover:underline">{it.label}</span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
