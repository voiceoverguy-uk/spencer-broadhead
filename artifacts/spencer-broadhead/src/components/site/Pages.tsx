import { ArrowRight, Home as HomeIcon, Mail, Phone } from "lucide-react";
import { Btn, Eyebrow } from "./ui";
import { Bodywork, Hero, How, NextSteps, PageIntro, Services, Story, Visit } from "./Sections";
import { HomeTestimonials, TestimonialWall } from "./Testimonials";
import { MAILTO, PHONE, TEL, page } from "./data";

function Overview() {
  const tiles = [
    { id: "services", href: page("/services"), t: "Servicing, MOT & repairs", d: "Routine servicing, fault finding and mechanical repairs." },
    { id: "bodywork", href: page("/bodywork"), t: "Accident & bodywork", d: "Dents, scrapes and accident damage repaired in-house." },
  ];
  return (
    <section aria-label="Our services" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <ul className="grid gap-8 md:grid-cols-2 md:gap-12">
        {tiles.map((t) => (
          <li key={t.id}>
            <div className="h-full">
              <a href={t.href} data-testid={`link-overview-${t.id}`} className="group block h-full border-t border-secondary/20 pt-6 text-secondary">
                <h2 className="flex items-center justify-between gap-4 font-display text-2xl md:text-3xl">
                  {t.t}<ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                </h2>
                <p className="mt-2 text-muted-foreground">{t.d}</p>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LocalGarageInformation() {
  return (
    <section aria-labelledby="local-garage-title" className="border-y border-border bg-muted/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>Independent garage in Wakefield</Eyebrow>
          <h2 id="local-garage-title" className="mt-5 max-w-md text-3xl font-semibold leading-tight text-secondary md:text-4xl">
            Local experience, straightforward advice
          </h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            Established on George Street in 1969 by Ray Spencer and Barry Broadhead, Spencer &amp; Broadhead is an independent, family-run garage in central Wakefield. Our technicians look after a wide range of vehicle needs, from car servicing and MOT testing to diagnostics and mechanical repairs.
          </p>
          <p>
            We take time to find the cause of a problem, explain what we find in plain English and agree the work with you before we go ahead. We’re an RAC Repair &amp; Go approved garage, serving Wakefield motorists, commuters and local businesses. A loan car may be available by arrangement, subject to availability.
          </p>
          <p className="text-secondary">
            Find out more about our <a className="font-semibold underline underline-offset-4" href={page("/services")}>garage services</a>, or <a className="font-semibold underline underline-offset-4" href={page("/contact")}>call or visit us on George Street</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <LocalGarageInformation />
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
        image="workshop-hero.webp"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        <Btn href={page("/contact")} variant="light" testId="button-intro-contact">Hours &amp; directions</Btn>
      </PageIntro>
      <Services title="Every service, under one roof." />
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
        image="garage-outside-sharp.webp"
      />
      <Visit />
      <How />
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
      />
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
