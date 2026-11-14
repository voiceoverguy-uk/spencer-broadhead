import type { JSX } from "react";
import { Header } from "@/components/site/Header";
import { Footer, MobileCallBar } from "@/components/site/Sections";
import { AboutPage, BodyworkPage, ContactPage, HomePage, NotFoundPage, ServicesPage } from "@/components/site/Pages";
import { TeamPage } from "@/components/site/TeamPage";
import { resolveRoute, type RouteKey } from "@/components/site/data";

const PAGES: Record<RouteKey, () => JSX.Element> = {
  home: HomePage,
  services: ServicesPage,
  bodywork: BodyworkPage,
  about: AboutPage,
  team: TeamPage,
  contact: ContactPage,
  notfound: NotFoundPage,
};

function App({ pathname }: { pathname?: string } = {}) {
  const path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const route = resolveRoute(path);
  const Page = PAGES[route];
  return (
    <div id="top" className="grain min-h-[100dvh] bg-background pb-[52px] sm:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header current={route} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}

export default App;
