import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { TESTIMONIALS, page } from "./data";

const INTERVAL = 8000;
const N = TESTIMONIALS.length;

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 48" className={className} fill="currentColor">
      <path d="M0 48V28C0 12 8 3 24 0l3 6C18 9 14 15 14 22h12v26H0zm36 0V28c0-16 8-25 24-28l3 6c-9 3-13 9-13 16h12v26H36z" />
    </svg>
  );
}

function shuffled(exclude: number) {
  const a = Array.from({ length: N }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // never show the same quote twice in a row across bag boundaries
  if (a[0] === exclude && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

export function HomeTestimonials() {
  // Deterministic for SSR/first paint: sequence starts at index 0.
  const [{ order, pos }, setSequence] = useState(() => ({
    order: TESTIMONIALS.map((_, i) => i),
    pos: 0,
  }));
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tick, setTick] = useState(0);

  // Randomise once on the client, keeping the server-rendered first quote in place.
  useEffect(() => {
    const rest = shuffled(-1).filter((i) => i !== 0);
    setSequence({ order: [0, ...rest], pos: 0 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setTick((t) => t + 1);
    setSequence((sequence) => {
      const next = sequence.pos + dir;
      if (next >= N) {
        return { order: shuffled(sequence.order[sequence.pos]), pos: 0 };
      }
      return { ...sequence, pos: Math.max(0, next) };
    });
  }, []);

  const running = playing && !hover && !focus && !hidden;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => step(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, pos, tick, step]);

  const current = order[pos];
  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" aria-labelledby="home-reviews-title" className="relative scroll-mt-[76px] overflow-hidden bg-secondary text-white" data-testid="section-home-testimonials">
      <div className="stripe-rule h-1.5" />
      <QuoteMark className="pointer-events-none absolute -left-6 top-10 h-48 w-64 text-white/[0.04] md:h-72 md:w-96" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow light>In their words</Eyebrow>
          <h2 id="home-reviews-title" className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">
            Said at the counter. Written down.
          </h2>
          <p className="mt-5 max-w-sm text-white/70">Real words from real customers, quoted as they wrote them.</p>
          <a href={page("/testimonials")} data-testid="link-all-testimonials" className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#F4C430] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4C430]">
            Read all testimonials <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div
          className="lg:col-span-8"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false); }}
        >
          {/* Stacked grid: every quote occupies the same cell, so height = longest quote. No jumps. */}
          <div className="grid" aria-live={running ? "off" : "polite"}>
            {TESTIMONIALS.map((q, i) => {
              const on = i === current;
              return (
                <figure
                  key={q.id}
                  aria-hidden={!on}
                  aria-roledescription="slide"
                  data-testid={`slide-testimonial-${q.id}`}
                  className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? "opacity-100 translate-y-0" : "pointer-events-none invisible opacity-0 translate-y-3"}`}
                  style={on ? undefined : { transitionProperty: "opacity, transform, visibility" }}
                >
                  <QuoteMark className="h-8 w-10 text-[#F4C430]" />
                  <blockquote className="mt-5 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-[1.35] text-white">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <span className="h-px w-10 bg-[#F4C430]" />
                    <span className="font-mono text-sm uppercase tracking-[0.18em] text-white/80">{q.name}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
            <button type="button" onClick={() => step(-1)} disabled={pos === 0} aria-label="Previous testimonial" data-testid="button-testimonial-prev"
              className="grid h-11 w-11 place-items-center rounded-md border border-white/25 transition-colors hover:bg-white hover:text-secondary disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]">
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next testimonial" data-testid="button-testimonial-next"
              className="grid h-11 w-11 place-items-center rounded-md border border-white/25 transition-colors hover:bg-white hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause testimonial rotation" : "Play testimonial rotation"} aria-pressed={!playing} data-testid="button-testimonial-toggle"
              className="grid h-11 w-11 place-items-center rounded-md border border-white/25 transition-colors hover:bg-white hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]">
              {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
            </button>
            <div className="ml-auto flex items-center gap-4">
              <span className="font-mono text-xs text-white/60" data-testid="text-testimonial-count">
                {String(pos + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <span aria-hidden className="relative hidden h-[2px] w-24 overflow-hidden bg-white/15 sm:block">
                <span key={`${pos}-${tick}`} className="absolute inset-0 origin-left bg-[#F4C430]"
                  style={{ animation: `sb-progress ${INTERVAL}ms linear both`, animationPlayState: running ? "running" : "paused" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialWall() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28" aria-label="Customer testimonials">
      <ol className="divide-y divide-secondary/15 border-y border-secondary/15">
        {TESTIMONIALS.map((q, i) => (
          <li key={q.id} data-testid={`card-testimonial-${q.id}`}>
            <Reveal>
              <figure className="grid gap-5 py-9 md:grid-cols-12 md:gap-8 md:py-12">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
                  <figcaption className="mt-2 font-display text-lg font-semibold leading-tight text-secondary md:text-xl" data-testid={`text-testimonial-name-${q.id}`}>
                    {q.name}
                  </figcaption>
                  <div className="mt-3 h-1 w-10 bg-[#F4C430]" />
                </div>
                <blockquote className={`relative md:col-span-9 ${i % 2 ? "md:pl-16" : ""}`}>
                  <QuoteMark className="absolute -top-2 left-0 h-8 w-10 text-accent/80 md:-left-14" />
                  <p className={`pl-14 font-display font-medium leading-[1.35] text-foreground md:pl-0 ${q.quote.length > 140 ? "text-[clamp(1.15rem,1.7vw,1.4rem)]" : "text-[clamp(1.25rem,1.9vw,1.55rem)]"}`}>
                    {q.quote}
                  </p>
                </blockquote>
              </figure>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-xl text-muted-foreground">
        Been in recently? We'd be glad to hear how it went. Mention it next time you're in, or drop us an email.
      </p>
    </section>
  );
}
