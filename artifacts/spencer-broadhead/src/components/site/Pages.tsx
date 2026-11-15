import { ArrowRight, Home as HomeIcon, Mail, MapPin, Phone } from "lucide-react";
import { Btn, Eyebrow, Reveal } from "./ui";
import { Bodywork, Exterior, Hero, How, Marquee, NextSteps, PageIntro, Services, Story, Visit } from "./Sections";
import { HomeTestimonials, TestimonialWall } from "./Testimonials";
import { DIRECTIONS, MAILTO, PHONE, SERVICES, TEL, img, page } from "./data";

const years = new Date().getFullYear() - 1969;

function Overview() {
  const tiles = [
    { id: "services", href: page("/services"), n: "01", t: "Servicing, MOT & repairs", d: `${SERVICES.length} core services, from interim services to clutches, brakes and diagnostics.`, image: "garage-inside.jpg" },
    { id: "bodywork", href: page("/bodywork"), n: "02", t: "Accident & bodywork", d: "Dents, scrapes and accident damage repaired in our own workshop.", image: null },
    { id: "about", href: page("/about"), n: "03", t: "Family-run since 1969", d: `${years} years on George Street, and how we still work today.`, image: null },
    { id: "contact", href: page("/contact"), n: "04", t: "Hours & directions", d: "Phone, email, opening hours and how to find us in central Wakefield.", image: "garage-outside.jpg" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
      <Reveal>
        <Eyebrow>Find your way around</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.92] text-secondary md:text-6xl">One garage. Everything under one roof.</h2>
      </Reveal>
      <ul className="mt-12 grid gap-4 md:grid-cols-6">
        {tiles.map((t, i) => (
          <li key={t.id} className={i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}>
            <Reveal delay={(i % 2) * 90} className="h-full">
              <a href={t.href} data-testid={`link-overview-${t.id}`} className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-lg bg-secondary p-7 text-white">
                {t.image && (
                  <>
                    <img src={img(t.image)} alt="" width="1600" height="650" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-[1.2s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C2759] via-[#1C2759]/60 to-transparent" />
                  </>
                )}
                <span className="relative font-mono text-xs text-[#F4C430]">{t.n}</span>
                <span className="relative mt-3 font-display text-3xl font-bold uppercase leading-none md:text-4xl">{t.t}</span>
                <span className="relative mt-3 max-w-md text-white/75">{t.d}</span>
                <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F4C430]">
                  Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Overview />
      <HomeTestimonials />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Servicing, MOTs and mechanical repairs"
        title="Car servicing, MOTs & repairs in Wakefield"
        lead="Routine servicing, MOT testing and mechanical repairs, carried out by experienced technicians on George Street. We'll tell you what your car actually needs, and what it doesn't."
        image="garage-inside.jpg"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        <Btn href={page("/contact")} variant="light" testId="button-intro-contact">Hours &amp; directions</Btn>
      </PageIntro>
      <Services title="Every service, under one roof." />
      <How />
      <NextSteps
        items={[
          { id: "bodywork", href: page("/bodywork"), label: "Bodywork repairs", line: "Accident damage, dents and scrapes fixed in the same workshop." },
          { id: "contact", href: page("/contact"), label: "Get in touch", line: `Ring ${PHONE} or email, and we'll find a time that suits.` },
        ]}
      />
    </>
  );
}

export function BodyworkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Accident and bodywork repairs"
        title="Accident & bodywork repairs in Wakefield"
        lead="Bumped, scraped or dented? We repair it here in our own workshop, so your car isn't passed between businesses. One garage, one point of contact."
        image="garage-inside.jpg"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call about a repair</Btn>
        <Btn href={MAILTO} variant="light" testId="button-intro-email"><Mail className="h-4 w-4" /> Email us photos</Btn>
      </PageIntro>
      <Bodywork />
      <How />
      <NextSteps
        items={[
          { id: "services", href: page("/services"), label: "Servicing & MOTs", line: "Mechanical work, diagnostics and MOT testing on site." },
          { id: "contact", href: page("/contact"), label: "Find us", line: "George Street, Wakefield, WF1 1DR. Opening hours and directions." },
        ]}
      />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Family-run since 1969"
        title="A Wakefield family garage since 1969"
        lead="Founded by Ray Spencer and Barry Broadhead, still independent and still on George Street. Here's who we are and how we work."
        image="garage-outside.jpg"
      />
      <Story />
      <How />
      <Exterior />
      <NextSteps
        items={[
          { id: "team", href: page("/our-team"), label: "Meet the team", line: "David, Rob, Andy and Lewis, the people looking after your car." },
          { id: "services", href: page("/services"), label: "What we do", line: "Servicing, MOTs, diagnostics and mechanical repairs." },
          { id: "contact", href: page("/contact"), label: "Visit us", line: "Phone, email, hours and directions." },
        ]}
      />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Visit or get in touch"
        title="Contact Spencer & Broadhead"
        lead="We don't take bookings online. Call or email and a real person will find a time that works for you."
        image="garage-outside.jpg"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        <Btn href={DIRECTIONS} external variant="light" testId="button-intro-directions"><MapPin className="h-4 w-4" /> Get directions</Btn>
      </PageIntro>
      <Visit />
    </>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Customer testimonials"
        title="What our customers say"
        lead="A few words from the people who bring their cars to George Street. Printed exactly as they wrote them."
        image="garage-outside.jpg"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        <Btn href={page("/contact")} variant="light" testId="button-intro-contact">Hours &amp; directions</Btn>
      </PageIntro>
      <TestimonialWall />
      <NextSteps
        items={[
          { id: "team", href: page("/our-team"), label: "Meet the team", line: "The familiar faces behind the service people talk about." },
          { id: "contact", href: page("/contact"), label: "Book your car in", line: `Ring ${PHONE} or email, and we'll find a time that suits.` },
        ]}
      />
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="relative overflow-hidden bg-[#1C2759] text-white">
      <div className="mx-auto flex min-h-[80dvh] max-w-7xl flex-col justify-center px-5 pb-20 pt-[140px] md:px-8">
        <div aria-hidden className="pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[clamp(10rem,32vw,26rem)] font-extrabold leading-[0.8] text-white/[0.05]">404</div>
        <div className="rise"><Eyebrow light>Page not found</Eyebrow></div>
        <h1 className="rise mt-6 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.75rem)] font-extrabold uppercase leading-[0.9]">Wrong turn off George Street.</h1>
        <p className="rise mt-6 max-w-xl text-lg text-white/80">That page doesn't exist. Head back to the home page, or ring us on {PHONE} if you were looking for something specific.</p>
        <div className="rise mt-8 flex flex-wrap gap-3">
          <Btn href={page("/")} testId="button-notfound-home"><HomeIcon className="h-4 w-4" /> Back to home</Btn>
          <Btn href={TEL} variant="light" testId="button-notfound-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        </div>
      </div>
      <div className="stripe-rule h-2 w-full" />
    </section>
  );
}
