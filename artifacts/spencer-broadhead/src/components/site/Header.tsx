import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV, PHONE, TEL, img, page, type RouteKey } from "./data";

export function Header({ current }: { current: RouteKey }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const solid = scrolled || current !== "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open ? "bg-[#1C2759]/95 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(0,0,0,.6)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href={page("/")} data-testid="link-home" className="flex items-center gap-3" aria-label="Spencer & Broadhead, home" aria-current={current === "home" ? "page" : undefined}>
          <img src={img("original-logo.png")} alt="" width="250" height="105" className="h-9 w-auto md:h-10" />
          <span className="hidden border-l border-white/20 pl-3 font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-white/60 lg:block">
            Wakefield
            <br />
            Est. 1969
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const on = current === n.key;
            return (
              <a
                key={n.key}
                href={n.href}
                aria-current={on ? "page" : undefined}
                data-testid={`link-nav-${n.key}`}
                className={`relative px-3 py-2 text-[15px] font-semibold transition-colors ${on ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-[#F4C430] transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={TEL}
            data-testid="button-header-call"
            className="hidden items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            data-testid="button-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-md text-white hover:bg-white/10 md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto bg-[#1C2759] md:hidden"
      >
        <nav className="flex flex-col px-6 pt-6 pb-24" aria-label="Mobile">
          {[{ key: "home" as RouteKey, href: page("/"), label: "Home" }, ...NAV].map((n, i) => {
            const on = current === n.key;
            return (
              <a
                key={n.key}
                href={n.href}
                aria-current={on ? "page" : undefined}
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${n.key}`}
                className={`rise flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-4xl font-bold uppercase ${on ? "text-[#F4C430]" : "text-white"}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-mono text-xs text-[#F4C430]">0{i + 1}</span>
                {n.label}
              </a>
            );
          })}
          <a href={TEL} data-testid="button-mobile-call" className="mt-8 flex items-center justify-center gap-2 rounded-md bg-accent py-4 text-lg font-bold text-white">
            <Phone className="h-5 w-5" /> Call {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}
