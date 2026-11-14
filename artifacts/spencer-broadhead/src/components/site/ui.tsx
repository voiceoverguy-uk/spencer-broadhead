import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;
    // Static HTML remains visible without JavaScript; only animate off-screen content.
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('will-reveal');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] ${light ? "text-[#F4C430]" : "text-accent"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#F4C430]" : "bg-accent"}`} />
      {children}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "ghost" | "light"; external?: boolean; testId: string };
export function Btn({ href, children, variant = "solid", external, testId }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]";
  const v = {
    solid: "bg-accent text-accent-foreground shadow-[0_10px_24px_-12px_hsl(356_72%_40%/.7)] hover:bg-[hsl(356_72%_42%)]",
    ghost: "border border-secondary/25 text-secondary hover:border-secondary hover:bg-secondary hover:text-secondary-foreground",
    light: "border border-white/30 text-white hover:bg-white hover:text-secondary",
  }[variant];
  return (
    <a
      href={href}
      data-testid={testId}
      className={`${base} ${v}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
