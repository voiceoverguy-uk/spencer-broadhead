import { ArrowRight, ArrowUpRight, Car, Clock, Mail, MapPin, Phone, ShieldCheck, Wrench, MessageSquare, ClipboardCheck, KeyRound } from "lucide-react";
import { Btn, Eyebrow, Reveal } from "./ui";
import { DIRECTIONS, EMAIL, MAILTO, MAP_EMBED, PHONE, SERVICES, TEL, img } from "./data";

const years = new Date().getFullYear() - 1969;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#1C2759] text-white">
      <div className="absolute inset-0">
        <img src={img("garage-inside.jpg")} alt="" width="1600" height="650" fetchPriority="high" className="kenburns h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#1C2759_25%,rgba(28,39,89,.75)_60%,rgba(28,39,89,.35))]" />
      </div>
      <div className="relative mx-auto grid min-h-[100dvh] max-w-7xl items-end gap-10 px-5 pb-16 pt-32 md:px-8 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-8">
          <div className="rise"><Eyebrow light>Independent garage, George Street, Wakefield</Eyebrow></div>
          <h1 className="rise mt-6 font-display text-[clamp(3.2rem,9vw,7.5rem)] font-extrabold uppercase leading-[0.88]" style={{ animationDelay: "120ms" }}>
            <span className="mb-4 block font-sans text-base font-semibold normal-case leading-normal tracking-normal text-white/80">Car servicing, MOTs &amp; repairs in Wakefield</span>
            Straight answers.
            <br />
            <span className="text-[#F4C430]">Proper</span> repairs.
          </h1>
          <p className="rise mt-7 max-w-xl text-lg text-white/80 md:text-xl" style={{ animationDelay: "240ms" }}>
            Family-run since 1969. Servicing, MOTs, diagnostics and repairs from experienced technicians who'll tell you what your car actually needs.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Btn href={TEL} testId="button-hero-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
            <Btn href="#services" variant="light" testId="button-hero-services">See what we do <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Btn>
          </div>
        </div>
        <div className="rise lg:col-span-4 lg:justify-self-end" style={{ animationDelay: "480ms" }}>
          <div className="w-full max-w-sm rounded-lg border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">On George Street for</span>
            </div>
            <div className="mt-1 font-display text-7xl font-extrabold leading-none">{years}<span className="text-3xl text-[#F4C430]"> years</span></div>
            <div className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm text-white/80">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#F4C430]" /> RAC Repair &amp; Go approved</div>
              <div className="flex items-center gap-2"><Car className="h-4 w-4 text-[#F4C430]" /> Free loan car, subject to availability</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#F4C430]" /> Mon to Fri, 08:30 to 17:30</div>
            </div>
          </div>
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

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The work we do</Eyebrow>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] text-secondary md:text-6xl">Everything your car needs, under one roof.</h2>
            <p className="mt-5 max-w-sm text-lg text-muted-foreground">
              From a routine service to a fault nobody else could pin down. If you're not sure what's wrong, ring us and describe it. That's what we're here for.
            </p>
            <div className="mt-8"><Btn href={TEL} variant="ghost" testId="button-services-call"><Phone className="h-4 w-4" /> Talk to a technician</Btn></div>
          </div>
        </Reveal>
        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-8">
          {SERVICES.map((s, i) => (
            <li key={s.code} data-testid={`card-service-${s.code}`} className="group relative bg-card p-7 transition-colors duration-300 hover:bg-secondary">
              <Reveal delay={(i % 2) * 80}>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-accent transition-colors group-hover:text-[#F4C430]">{s.code}</span>
                  <ArrowUpRight className="h-5 w-5 text-border transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <h3 className="mt-8 font-display text-3xl font-bold uppercase text-secondary transition-colors group-hover:text-white">{s.name}</h3>
                <p className="mt-2 text-muted-foreground transition-colors group-hover:text-white/75">{s.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={TEL} testId="button-bodywork-call"><Phone className="h-4 w-4" /> Call about a repair</Btn>
            <Btn href={MAILTO} variant="light" testId="button-bodywork-email"><Mail className="h-4 w-4" /> Email us photos</Btn>
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
        <Reveal className="lg:col-span-5">
          <Eyebrow>Since 1969</Eyebrow>
          <div className="mt-6 font-display text-[clamp(6rem,16vw,12rem)] font-extrabold leading-[0.8] text-secondary">1969</div>
          <div className="mt-4 h-1 w-24 bg-accent" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
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
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {[
              ["1969", "Founded by Ray Spencer and Barry Broadhead"],
              ["Family", "Run and independent, not part of a chain"],
              ["RAC", "Repair & Go approved garage"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-3xl font-extrabold uppercase text-accent">{k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
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
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.92] text-secondary md:text-6xl">No jargon. No surprises.</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-4">
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
        <Reveal>
          <Eyebrow light>Visit or get in touch</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">Need your car looked at? Give us a ring.</h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">We don't take bookings online. Call or email and a real person will find a time that works for you.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
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
            <div className="h-full min-h-[360px] overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Map showing Spencer & Broadhead on George Street, Wakefield"
                src={MAP_EMBED}
                className="h-full min-h-[360px] w-full grayscale-[40%]"
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
