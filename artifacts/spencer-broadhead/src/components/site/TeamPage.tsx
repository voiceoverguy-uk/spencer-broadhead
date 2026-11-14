import { Mail, MapPin, Phone } from "lucide-react";
import { Btn, Eyebrow, Reveal } from "./ui";
import { NextSteps, PageIntro } from "./Sections";
import { DIRECTIONS, EMAIL, MAILTO, PHONE, TEL, img, page } from "./data";

type Member = {
  id: string;
  name: string;
  known?: string;
  role: string;
  joined?: string;
  photo: string;
  w: number;
  h: number;
  /** object-position tuned per source so heads are never clipped */
  pos: string;
  bio: string;
  away: string[];
};

const TEAM: Member[] = [
  {
    id: "david",
    name: "David Jackson",
    role: "Part of the family",
    joined: "Joined 2008",
    photo: "team/david-spencer-broadhead.webp",
    w: 325,
    h: 325,
    pos: "50% 30%",
    bio: "Ray Spencer's son-in-law, David brought a broad motor trade background with him and helps keep Spencer & Broadhead a family-run business. He cares about doing right by customers and by the people who work here.",
    away: ["Golf", "Squash"],
  },
  {
    id: "rob",
    name: "Robert Cox",
    known: "Rob",
    role: "Technician",
    photo: "team/rob-technician.webp",
    w: 325,
    h: 325,
    pos: "50% 30%",
    bio: "Rob spent his school holidays learning in this workshop before starting his apprenticeship here, and he's been part of the place for a long time since. Meticulous by nature, he holds his work to a high standard.",
    away: ["Archery", "Pool", "A good night out"],
  },
  {
    id: "andy",
    name: "Andy Goodall",
    role: "Technician",
    joined: "Joined 1995",
    photo: "team/andy-technician.webp",
    w: 325,
    h: 325,
    pos: "50% 30%",
    bio: "An experienced technician who's happy to take on the demanding jobs, Andy brings plenty of hands-on know-how to the tricky repairs that need patience and care.",
    away: ["Mountain biking", "Walking", "The gym"],
  },
  {
    id: "lewis",
    name: "Lewis Haigh",
    role: "Mechanic",
    joined: "Joined 2015",
    photo: "team/lewis-mechanic.webp",
    w: 325,
    h: 272,
    pos: "50% 18%",
    bio: "Hardworking and reliable, Lewis is a steady pair of hands in the workshop and part of the everyday running of the garage.",
    away: ["Football", "Socialising"],
  },
];

function Portrait({ m, index }: { m: Member; index: number }) {
  return (
    <figure className="relative mx-auto w-full max-w-[260px] shrink-0 sm:mx-0 sm:w-[220px] lg:w-[240px]">
      {/* offset paper backing — like a photo pinned to the workshop board */}
      <div
        aria-hidden
        className={`absolute inset-0 translate-x-2 translate-y-2 rounded-[4px] bg-[#F4C430]/70 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 ${index % 2 ? "-rotate-[1.2deg]" : "rotate-[1.2deg]"}`}
      />
      <div className="relative rounded-[4px] bg-[hsl(40_40%_98%)] p-2 shadow-[0_18px_40px_-24px_rgba(28,39,89,.55)] ring-1 ring-secondary/10">
        <div className="relative aspect-square overflow-hidden rounded-[2px] bg-[hsl(40_25%_88%)]">
          <img
            src={img(m.photo)}
            alt={`${m.name}${m.known ? ` (${m.known})` : ""}, ${m.role.toLowerCase()} at Spencer & Broadhead`}
            width={m.w}
            height={m.h}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            data-testid={`img-team-${m.id}`}
            style={{ objectPosition: m.pos }}
            className="h-full w-full object-cover saturate-[.94] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* gentle warm wash + inner vignette for a consistent look across sources */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#F4C430]/[0.04] mix-blend-multiply" />
          <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(28,39,89,.08),inset_0_-40px_50px_-40px_rgba(28,39,89,.35)]" />
        </div>
        <figcaption className="flex items-center justify-between px-1 pb-0.5 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/60">
          <span>{m.known ?? m.name.split(" ")[0]}</span>
          <span>No. {String(index + 1).padStart(2, "0")}</span>
        </figcaption>
      </div>
    </figure>
  );
}

function MemberCard({ m, index }: { m: Member; index: number }) {
  return (
    <Reveal delay={(index % 2) * 110} className="h-full">
      <article
        data-testid={`card-team-${m.id}`}
        className="group flex h-full flex-col gap-7 rounded-lg border border-card-border bg-card p-6 sm:flex-row sm:items-start sm:p-7"
      >
        <Portrait m={m} index={index} />
        <div className="min-w-0 flex-1 sm:pt-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{m.role}</div>
          <h2 className="mt-2 font-display text-[2.5rem] font-extrabold uppercase leading-[0.9] text-secondary" data-testid={`text-team-name-${m.id}`}>
            {m.name}
          </h2>
          {(m.known || m.joined) && (
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {[m.known && `Known as ${m.known}`, m.joined].filter(Boolean).join(" · ")}
            </p>
          )}
          <p className="mt-4 text-[16.5px] leading-relaxed text-foreground/85">{m.bio}</p>
          <div className="mt-5 border-t border-dashed border-secondary/20 pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Away from the ramps</div>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {m.away.map((a) => (
                <li key={a} className="rounded-full bg-muted px-3 py-1 text-[13px] font-semibold text-secondary">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="The people on George Street"
        title="Meet the team"
        lead="When you ring, it's one of us who answers. When your car's on the ramp, it's one of us working on it. Here are the faces behind Spencer & Broadhead."
        image="garage-inside.jpg"
      >
        <Btn href={TEL} testId="button-intro-call"><Phone className="h-4 w-4" /> Call {PHONE}</Btn>
        <Btn href="#team" variant="light" testId="button-intro-team">Say hello below</Btn>
      </PageIntro>

      <section id="team" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <Eyebrow>Family-run, still</Eyebrow>
          <p className="mt-5 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.95] text-secondary md:text-5xl">
            Four familiar faces. No call centre.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Some of us have been here for decades, one of us is family, and all of us would rather explain a repair properly than rush you out the door.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-5 xl:grid-cols-2">
          {TEAM.map((m, i) => (
            <li key={m.id}>
              <MemberCard m={m} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-[#1C2759] text-white">
        <div className="stripe-rule h-2 w-full" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:items-end md:px-8 md:py-20">
          <Reveal>
            <Eyebrow light>Talk to a real person</Eyebrow>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">Ask for any of us by name.</h2>
            <p className="mt-4 max-w-xl text-lg text-white/75">Call, email or pop into the workshop. We'll talk you through what your car needs in plain English.</p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3 md:justify-end">
            <Btn href={TEL} testId="button-team-call"><Phone className="h-4 w-4" /> {PHONE}</Btn>
            <Btn href={MAILTO} variant="light" testId="button-team-email"><Mail className="h-4 w-4" /> <span className="sr-only">Email </span>{EMAIL}</Btn>
            <Btn href={DIRECTIONS} external variant="light" testId="button-team-directions"><MapPin className="h-4 w-4" /> Directions</Btn>
          </Reveal>
        </div>
      </section>

      <NextSteps
        items={[
          { id: "about", href: page("/about"), label: "Our story", line: "Family-run on George Street since 1969." },
          { id: "contact", href: page("/contact"), label: "Visit us", line: "Phone, email, hours and directions." },
        ]}
      />
    </>
  );
}
