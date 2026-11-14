import { Header } from "@/components/site/Header";
import { Bodywork, Exterior, Footer, Hero, How, Marquee, MobileCallBar, Services, Story, Visit } from "@/components/site/Sections";

function App() {
  return (
    <div className="grain min-h-[100dvh] bg-background pb-[52px] sm:pb-0">
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Bodywork />
        <Story />
        <How />
        <Exterior />
        <Visit />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}

export default App;
