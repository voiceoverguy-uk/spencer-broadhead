import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV, PHONE, TEL, img, page, type RouteKey } from "./data";

export function Header({ current }: { current: RouteKey }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<RouteKey, HTMLAnchorElement>());
  const [hoveredKey, setHoveredKey] = useState<RouteKey | null>(null);
  const [focusedKey, setFocusedKey] = useState<RouteKey | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const indicatorKey = focusedKey ?? hoveredKey ?? current;

  useEffect(() => {
    const nav = navRef.current;
    const link = linkRefs.current.get(indicatorKey);
    if (!nav || !link) return;

    const updateIndicator = () => {
      const navBounds = nav.getBoundingClientRect();
      const linkBounds = link.getBoundingClientRect();
      const style = window.getComputedStyle(link);
      const inset = Number.parseFloat(style.paddingLeft);
      const rightInset = Number.parseFloat(style.paddingRight);
      setIndicator({
        left: linkBounds.left - navBounds.left + inset,
        width: linkBounds.width - inset - rightInset,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [indicatorKey]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled && !open
          ? "border-secondary/5 bg-white/80 shadow-[0_8px_30px_-24px_rgba(28,39,89,.4)] backdrop-blur-xl"
          : "border-secondary/10 bg-white shadow-[0_8px_30px_-24px_rgba(28,39,89,.4)]"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href={page("/")} data-testid="link-home" className="flex items-center gap-3" aria-label="Spencer & Broadhead, home" aria-current={current === "home" ? "page" : undefined}>
          <img src={img("original-logo.png")} alt="" width="250" height="105" className="h-12 w-auto md:h-[52px]" />
          <span className="hidden border-l border-secondary/20 pl-3 font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-secondary/70 xl:block">
            Wakefield
            <br />
            Est. 1969
          </span>
        </a>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 md:flex"
          aria-label="Main"
          onPointerLeave={() => setHoveredKey(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusedKey(null);
            }
          }}
        >
          {NAV.map((n) => {
            const on = current === n.key;
            return (
              <a
                key={n.key}
                ref={(link) => {
                  if (link) linkRefs.current.set(n.key, link);
                  else linkRefs.current.delete(n.key);
                }}
                href={n.href}
                aria-current={on ? "page" : undefined}
                data-testid={`link-nav-${n.key}`}
                onPointerEnter={() => setHoveredKey(n.key)}
                onFocus={() => setFocusedKey(n.key)}
                className={`relative whitespace-nowrap px-2 py-2 text-[14px] font-semibold lg:px-3 lg:text-[15px] transition-colors ${on ? "text-primary" : "text-secondary/80 hover:text-primary"}`}
              >
                {n.label}
              </a>
            );
          })}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-0.5 h-[2px] bg-primary transition-[left,width] duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={TEL}
            data-testid="button-header-call"
            className="hidden items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-white transition-transform md:px-3 lg:px-4 hover:-translate-y-0.5 sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden /> <span className="md:sr-only lg:not-sr-only">{PHONE}</span>
          </a>
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            data-testid="button-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-md text-secondary hover:bg-secondary/5 md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto bg-white md:hidden"
      >
        <nav className="flex flex-col px-6 pt-6 pb-24" aria-label="Mobile">
          {NAV.map((n, i) => {
            const on = current === n.key;
            return (
              <a
                key={n.key}
                href={n.href}
                aria-current={on ? "page" : undefined}
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${n.key}`}
                className={`rise flex items-baseline gap-4 border-b border-secondary/10 py-5 font-display text-4xl font-bold uppercase ${on ? "text-primary" : "text-secondary"}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
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
