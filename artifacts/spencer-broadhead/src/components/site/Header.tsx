import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV, PHONE, TEL, img } from "./data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#1C2759]/95 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(0,0,0,.6)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" data-testid="link-home" className="flex items-center gap-3" aria-label="Spencer & Broadhead, back to top">
          <img src={img("original-logo.png")} alt="Spencer & Broadhead" width="250" height="105" className="h-9 w-auto md:h-10" />
          <span className="hidden border-l border-white/20 pl-3 font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-white/60 lg:block">
            Wakefield
            <br />
            Est. 1969
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`link-nav-${n.href.slice(1)}`}
              className={`relative px-3 py-2 text-[15px] font-semibold transition-colors ${
                active === n.href ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {n.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-[#F4C430] transition-transform duration-300 ${
                  active === n.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
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
            type="button"
            onClick={() => setOpen((o) => !o)}
            data-testid="button-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-md text-white hover:bg-white/10 md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-[76px] bottom-0 bg-[#1C2759] transition-all duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 pt-6" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              data-testid={`link-mobile-${n.href.slice(1)}`}
              className="flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-4xl font-bold uppercase text-white transition-all duration-500"
              style={{ transform: open ? "none" : "translateY(12px)", transitionDelay: `${i * 50}ms` }}
            >
              <span className="font-mono text-xs text-[#F4C430]">0{i + 1}</span>
              {n.label}
            </a>
          ))}
          <a href={TEL} data-testid="button-mobile-call" className="mt-8 flex items-center justify-center gap-2 rounded-md bg-accent py-4 text-lg font-bold text-white">
            <Phone className="h-5 w-5" /> Call {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}
