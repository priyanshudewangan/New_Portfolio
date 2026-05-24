import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import {
  BrutalistRecordIcon,
  BrutalistCircleDotIcon,
  BrutalistStarIcon,
} from "@/components/BrutalistIcons";
import heroPortrait from "@/assets/hero-portrait.png";
import { ArrowUpRight, Mail, Cpu, Layers, Heart } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function App() {
  const [activeSection, setActiveSection] = useState<string>("HOME");

  // Track scroll position to update active navigation item
  useEffect(() => {
    const sections = ["home", "about", "project", "casestudy"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // offset for early trigger

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    const id = section.toLowerCase().replace(" ", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#c4cfd0] text-black selection:bg-black selection:text-[#c4cfd0] font-sans antialiased overflow-x-hidden">
      {/* Header component */}
      <Header onNavClick={handleNavClick} />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-row relative w-full">

        {/* Left Column - Sticky Sidebar Navigation (Desktop only) */}
        <aside className="w-24 lg:w-64 border-r border-black hidden md:flex flex-col justify-between sticky top-16 h-[calc(100vh-64px)] bg-[#c4cfd0] shrink-0 z-20">
          {/* Nav Links */}
          <div className="flex flex-col pt-16 px-4 lg:px-8 gap-8">
            {["HOME", "ABOUT", "PROJECT", "CASE STUDY"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className={`font-sans font-black text-sm lg:text-lg tracking-wider transition-all duration-300 relative uppercase w-fit group select-none ${activeSection === item
                  ? "text-black pl-3 lg:pl-4"
                  : "text-black/30 hover:text-black hover:pl-1 lg:hover:pl-2"
                  }`}
              >
                {/* Active Indicator Dot */}
                {activeSection === item && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f23e16] rounded-full" />
                )}
                <span className={activeSection === item ? "underline decoration-2 underline-offset-4 decoration-black" : ""}>
                  {/* Abbreviate on smaller sidebars */}
                  <span className="lg:inline hidden">{item}</span>
                  <span className="lg:hidden inline">{item === "CASE STUDY" ? "CASE" : item}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Big Diagonal Arrow Box */}
          <button
            onClick={() => handleNavClick("PROJECT")}
            className="w-full aspect-square bg-[#0a141d] flex items-center justify-center border-t border-black hover:bg-[#f23e16] transition-colors duration-300 group cursor-pointer"
            aria-label="View Projects"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="w-10 h-10 lg:w-16 lg:h-16 text-white group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </aside>

        {/* Right Column - Scrollable Content */}
        <main className="flex-1 min-w-0 flex flex-col">

          {/* SECTION 1: HOME (HERO) */}
          <section
            id="home"
            className="min-h-[calc(100vh-64px)] flex flex-col justify-between p-6 sm:p-8 md:p-12 relative border-b border-black overflow-hidden bg-[#c4cfd0]"
          >
            {/* Huge Red Background Title */}
            <div className="relative mt-8 md:mt-4 select-none">
              <h1 className="text-[20vw] md:text-[18vw] font-black leading-[0.8] tracking-tighter text-[#f23e16] font-sans">
                PRIYANSHU
              </h1>

              {/* Rotated Translucent Glass Pill Badge */}
              <div className="absolute left-[5%] top-[-10px] md:top-[10px] z-20 bg-white/20 backdrop-blur-md border border-black/10 px-4 py-1.5 md:px-8 md:py-3 rounded-full shadow-lg -rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="font-serif italic text-lg md:text-3xl font-medium text-black">
                  Dewangan
                </span>
              </div>
            </div>

            {/* Hero Image layered behind slogan but in front of DREK */}
            <div className="absolute right-0 bottom-0 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[45%] max-h-[85%] z-10 pointer-events-none flex items-end justify-end">
              <img
                src={heroPortrait}
                alt="Priyanshu Dewangan Portrait"
                className="object-contain max-h-[70vh] md:max-h-[85vh] select-none"
              />
            </div>

            {/* Red Slogan Heading */}
            <div className="z-20 max-w-4xl mt-auto pt-24 md:pt-36 select-none">
              <h2 className="text-3xl sm:text-5xl md:text-[5.5rem] font-black text-[#f23e16] leading-[0.95] tracking-tighter uppercase font-sans">
                Designing{" "}
                <BrutalistRecordIcon className="w-10 h-10 md:w-16 md:h-16 inline-block align-middle mx-1" />
                <br />
                <BrutalistCircleDotIcon className="w-10 h-10 md:w-16 md:h-16 inline-block align-middle mx-1" />{" "}
                Experiences
                <br />
                That People Love{" "}
                <BrutalistStarIcon className="w-10 h-10 md:w-16 md:h-16 inline-block align-middle mx-1 animate-spin-[20s] text-[#f23e16]" />
              </h2>
            </div>

            {/* Hero Footer Grid */}
            <div className="z-20 flex flex-row justify-between items-end border-t border-black pt-6 mt-8 w-full">
              <div className="font-sans font-black text-xs md:text-sm leading-tight uppercase text-black max-w-[200px] md:max-w-xs">
                <p>Modern,</p>
                <p>Responsive</p>
                <p>Websites That Work</p>
              </div>
              <button
                onClick={() => handleNavClick("ABOUT")}
                className="font-sans font-black text-sm md:text-lg tracking-wider uppercase border-b-2 border-black pb-1 hover:text-[#f23e16] hover:border-[#f23e16] transition-colors cursor-pointer"
              >
                WHAT I DO ↗
              </button>
            </div>
          </section>

          {/* SECTION 2: ABOUT */}
          <section
            id="about"
            className="min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-12 bg-[#0a141d] text-[#c4cfd0] border-b border-black relative"
          >
            <div>
              {/* Category Indicator */}
              <div className="flex items-center gap-2 text-[#f23e16] font-sans font-black tracking-widest text-xs uppercase mb-8">
                <Cpu className="w-4 h-4" />
                <span>ABOUT // BIOGRAPHY</span>
              </div>

              {/* Core Statement */}
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase max-w-4xl font-sans mb-12">
                Building digital structures that bridge high-concept aesthetics and robust engineering.
              </h3>

              {/* Bio & Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                {/* Biography Paragraphs */}
                <div className="flex flex-col gap-6 text-base sm:text-lg font-medium text-white/70 max-w-xl">
                  <p>
                    I operate at the intersection of graphic design, digital architecture, and technology. I build bespoke websites and interactive interfaces that challenge standard visual layouts, bringing editorial design principles together with high-fidelity performance.
                  </p>
                  <p>
                    My workflow emphasizes custom layout structures, heavy typography, and smooth micro-animations. I believe web projects should be highly responsive, extremely interactive, and visually unforgettable.
                  </p>
                </div>

                {/* Info Block & Tech Stack */}
                <div className="flex flex-col gap-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 border border-[#c4cfd0]/20 p-6 bg-black/20 gap-4">
                    <div>
                      <h4 className="text-xs text-white/40 uppercase tracking-widest mb-1">LOCATION</h4>
                      <p className="text-white font-bold">Milan, Italy</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-white/40 uppercase tracking-widest mb-1">ROLE</h4>
                      <p className="text-white font-bold">Creative Architect</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs text-white/40 uppercase tracking-widest mb-4">ENGINEERING STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "TypeScript",
                        "Tailwind CSS v4",
                        "Next.js",
                        "shadcn/ui",
                        "Framer Motion",
                        "Vite",
                        "Three.js / WebGL",
                        "Node.js",
                        "PostgreSQL",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="border border-[#c4cfd0]/20 hover:border-[#f23e16] hover:text-white px-4 py-2 text-xs font-bold font-sans tracking-wide uppercase transition-all duration-300 hover:bg-[#f23e16]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Accents */}
            <div className="border-t border-[#c4cfd0]/10 pt-8 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs tracking-widest uppercase text-white/40 gap-4">
              <span>DESIGN & DEV FOR WEB CONNOISSEURS</span>
              <span>EST. 2024</span>
            </div>
          </section>

          {/* SECTION 3: PROJECT */}
          <section
            id="project"
            className="min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-12 bg-[#c4cfd0] text-black border-b border-black"
          >
            <div>
              {/* Category Indicator */}
              <div className="flex items-center gap-2 text-[#f23e16] font-sans font-black tracking-widest text-xs uppercase mb-8">
                <Layers className="w-4 h-4" />
                <span>WORK // PROJECTS</span>
              </div>

              {/* Section Header */}
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-12">
                Selected Creations
              </h3>

              {/* Projects Grid/Rows */}
              <div className="flex flex-col mt-8 border-b border-black">
                {[
                  {
                    num: "01",
                    title: "AURA",
                    desc: "An experiential website for a luxury fashion house, featuring high-fidelity fluid transitions, immersive image grids, and minimal typography.",
                    tech: "React / Vite / Tailwind / Framer Motion",
                    previewColor: "bg-neutral-800",
                  },
                  {
                    num: "02",
                    title: "KINETIC",
                    desc: "A real-time WebGL data monitoring dashboard with interactive 3D particle visualizations, custom chart modules, and high-performance load times.",
                    tech: "TypeScript / React / Three.js / CSS Grid",
                    previewColor: "bg-red-800",
                  },
                  {
                    num: "03",
                    title: "CHRONOS",
                    desc: "A rich typography-driven digital publication with horizontal scroll experiences, contextual dark/light toggle modes, and advanced responsive grid styling.",
                    tech: "Next.js / shadcn/ui / Tailwind CSS",
                    previewColor: "bg-slate-800",
                  },
                ].map((proj) => (
                  <div
                    key={proj.num}
                    className="border-t border-black py-8 md:py-12 flex flex-col lg:flex-row justify-between items-stretch group hover:bg-black/5 transition-all duration-300 px-4 gap-6 cursor-pointer"
                  >
                    {/* Index & Title */}
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <span className="font-mono text-sm font-bold text-black/40 mt-1">{proj.num}</span>
                      <h4 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase group-hover:text-[#f23e16] transition-colors">
                        {proj.title}
                      </h4>
                    </div>

                    {/* Graphic Box Preview & Description */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:w-1/2 flex-1">
                      {/* Mini Brutalist Graphic Frame */}
                      <div className="w-24 h-16 shrink-0 border border-black overflow-hidden relative bg-[#0a141d] flex items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-300">
                        <div className={`absolute inset-1 ${proj.previewColor} opacity-50 flex items-center justify-center text-[10px] text-white font-mono uppercase`}>
                          [MOCK]
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#f23e16] rounded-full absolute bottom-1 right-1 animate-ping" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-sm sm:text-base text-black/80 font-medium max-w-md">
                          {proj.desc}
                        </p>
                        <span className="text-xs font-bold tracking-widest text-[#f23e16] uppercase">
                          {proj.tech}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Action */}
                    <div className="flex items-center justify-end lg:w-20">
                      <div className="border border-black p-3 bg-transparent group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="pt-8 mt-12 flex justify-between items-center text-xs font-bold tracking-wider uppercase text-black/60">
              <span>CLICK TO DISCOVER DESIGN METRICS</span>
              <span>PAGE [02] // WORKS</span>
            </div>
          </section>

          {/* SECTION 4: CASE STUDY */}
          <section
            id="casestudy"
            className="min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-12 bg-[#0a141d] text-[#c4cfd0]"
          >
            <div>
              {/* Category Indicator */}
              <div className="flex items-center gap-2 text-[#f23e16] font-sans font-black tracking-widest text-xs uppercase mb-8">
                <Heart className="w-4 h-4" />
                <span>ANALYSIS // CASE STUDY</span>
              </div>

              {/* Title Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="max-w-2xl">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase leading-none tracking-tight mb-4">
                    VORTEX: OVERHAULING A DIGITAL ECOSYSTEM
                  </h3>
                  <p className="text-base sm:text-lg text-white/60 font-medium">
                    A deep dive into how we re-engineered Vortex's brand presence, maximizing speed and client conversions.
                  </p>
                </div>
                <div className="border border-[#c4cfd0]/20 px-6 py-3 bg-black/40">
                  <span className="text-xs font-mono uppercase text-[#f23e16]">METRIC: LCP 0.8s</span>
                </div>
              </div>

              {/* Case Study Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#c4cfd0]/10 py-12 gap-8 my-8">
                {[
                  {
                    step: "01",
                    title: "CHALLENGE",
                    text: "Vortex's old website suffered from extreme layout shift and slow page loads, leading to an immediate 40% bounce rate from mobile visitors.",
                  },
                  {
                    step: "02",
                    title: "EXECUTION",
                    text: "We deployed a streamlined React+Vite architecture utilizing pure tailwind styling rules, removing all bloated javascript library overhead.",
                  },
                  {
                    step: "03",
                    title: "OUTCOME",
                    text: "Load times plummeted to less than 1s globally. Mobile conversion increased by 43%, and total user retention climbed by 28% in month one.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col gap-4 border border-[#c4cfd0]/10 p-6 bg-black/30 hover:border-[#f23e16]/50 transition-all duration-300">
                    <span className="font-mono text-[#f23e16] font-black text-lg">{item.step}</span>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Performance Comparison Graphic */}
              <div className="bg-black/30 border border-[#c4cfd0]/10 p-6 max-w-2xl my-8">
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">PERFORMANCE BREAKDOWN (LIGHTHOUSE SCORE)</h4>

                {/* Score bars */}
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-white/60 mb-1">
                      <span>LEGACY SYSTEM</span>
                      <span>34%</span>
                    </div>
                    <div className="h-4 bg-neutral-900 border border-neutral-800 relative">
                      <div className="h-full bg-white/40" style={{ width: "34%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-white/60 mb-1">
                      <span>DREK RE-ARCHITECTED SYSTEM</span>
                      <span className="text-[#f23e16]">98%</span>
                    </div>
                    <div className="h-4 bg-neutral-900 border border-neutral-800 relative">
                      <div className="h-full bg-[#f23e16]" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Contact Footer */}
            <div className="border-t border-[#c4cfd0]/10 pt-12 mt-12">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase leading-none mb-2">
                    Let's Build Something Exceptional
                  </h4>
                  <p className="text-sm sm:text-base text-white/50">
                    Interested in elevating your platform? Reach out for collaboration.
                  </p>
                </div>

                <a
                  href="mailto:drek@agency.digital"
                  className="flex items-center gap-3 border-2 border-[#f23e16] bg-[#f23e16] text-white font-sans font-black text-base md:text-lg tracking-widest px-8 py-4 uppercase hover:bg-transparent hover:text-[#f23e16] transition-colors duration-300 shadow-xl cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                  <span>CONTACT DREK</span>
                </a>
              </div>

              {/* Bottom Social Links & Copyright */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-16 border-t border-[#c4cfd0]/5 pt-8 text-xs text-white/40 gap-4">
                <span>© 2026 FRANCIES DREK. ALL RIGHTS RESERVED.</span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;
