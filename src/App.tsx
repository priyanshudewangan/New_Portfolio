import { useEffect } from "react";
import { Header } from "@/components/Header";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrutalistRecordIcon,
  BrutalistCircleDotIcon,
  BrutalistStarIcon,
} from "@/components/BrutalistIcons";
import { About } from "@/components/sections/About";
import { SocialMedia } from "@/components/sections/SocialMedia";
import { Projects } from "@/components/sections/Projects";
import { Skiper31 } from "@/components/sections/Skiper31";
import heroPortrait from "@/assets/hero-portrait.webp";

import { Footer } from "@/components/Footer";
import { LayoutPreloader } from "@/components/ui/layout-preloader";


function App() {
  useEffect(() => {
    // Reset scroll position to top
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after layout paint to recalculate triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutPreloader>
      <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased">
        {/* Header component */}
        <Header />

        {/* Hero Section */}
        <main id="home" className="h-[calc(100vh-64px)] flex flex-col justify-between relative w-full overflow-hidden shrink-0">
          {/* Huge Red Background Title - Positioned Absolute so it stays in background */}
          <div className="absolute top-6 left-0 right-0 select-none z-0 pointer-events-none">
            <h1
              className="text-[22vw] sm:text-[23vw] md:text-[25vw] font-black leading-[0.85] tracking-tighter text-primary font-league uppercase text-center w-full block origin-top hero-title"
            >
              PRIYANSHU
            </h1>
          </div>

          {/* Hero Image layered behind slogan but in front of background title */}
          <div className="absolute right-0 bottom-0 w-[60%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-h-[90%] z-10 pointer-events-none flex items-end justify-end">
            <img
              src={heroPortrait}
              alt="Priyanshu Dewangan Portrait"
              className="object-contain max-h-[55vh] md:max-h-[82vh] lg:max-h-[88vh] select-none"
            />
          </div>

          {/* Main Hero Content Area */}
          <div className="flex-1 px-6 sm:px-8 md:px-12 py-12 relative w-full z-20">

            {/* Vertical Navigation Links - Moved back to the left as indicated by the arrow */}
            <div className="absolute left-6 sm:left-8 md:left-25 top-[35%] md:top-[70%] select-none">
              <nav className="flex flex-col gap-2 font-sans font-black text-base sm:text-lg md:text-xxl tracking-wider uppercase">
                <a href="#home" className="underline decoration-2 underline-offset-4 decoration-foreground w-fit">HOME</a>
                <a href="#about" className="text-foreground/45 hover:text-foreground transition-colors w-fit">ABOUT</a>
                <a href="#projects" className="text-foreground/45 hover:text-foreground transition-colors w-fit">PROJECTS</a>
                <a href="mailto:priyanshudewangan2004@gmail.com" className="text-foreground/45 hover:text-foreground transition-colors w-fit">CONTACT</a>
              </nav>
            </div>

            {/* Slogan Heading - Absolute positioned where the arrow points in the screenshot */}
            <div className="absolute left-6 sm:left-[28%] md:left-[63%] lg:left-[38%] bottom-6 sm:bottom-10 md:bottom-14 lg:bottom-20 select-none">
              <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.85] tracking-tighter uppercase font-league">
                Designing <BrutalistRecordIcon className="inline-block size-8 sm:size-14 md:size-16 lg:size-20 align-middle ml-1" />
                <br />
                <BrutalistCircleDotIcon className="inline-block size-8 sm:size-14 md:size-16 lg:size-20 align-middle mr-2" />
                Experiences
                <br />
                That People Love <BrutalistStarIcon className="inline-block size-8 sm:size-14 md:size-16 lg:size-20 align-middle ml-1 animate-spin" style={{ animationDuration: '20s' }} />
              </h2>
            </div>
          </div>
        </main>

        {/* Other Sections */}
        <About />
        <SocialMedia />
        <Projects />

        {/* Interactive Footer Scroll Section */}
        <Skiper31 />

        {/* Footer */}
        <Footer />
      </div>
    </LayoutPreloader>
  );
}

export default App;
