import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hook into scroll progress for the parallax on the giant typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Giant typography parallax: subtle shift upward on scroll
  const giantY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const giantOpacity = useTransform(scrollYProgress, [0, 0.7], [0.15, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[#FAF9F6] text-black flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundBlendMode: "multiply"
      }}
    >
      {/* Upper Grid Area */}
      <div className="pt-24 sm:pt-32 md:pt-40 px-8 sm:px-12 md:px-16 lg:px-24 w-full flex-1 flex flex-col justify-between pb-48 z-10">

        {/* Editorial Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 w-full">

          {/* Column 1: Brand Logo & Copyright */}
          <div className="flex flex-col justify-between items-start h-full min-h-[120px]">
            <div className="flex flex-col font-sans font-black text-2xl sm:text-3xl tracking-tighter uppercase leading-[0.9] text-black">
              <span>DESIGNING</span>
              <span className="flex items-center gap-2">
                CULTURE
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-black fill-none stroke-current stroke-[3] shrink-0">
                  <polygon points="50,15 15,85 85,85" />
                </svg>
              </span>
            </div>

            <p className="text-[10px] font-mono tracking-widest text-black/40 uppercase mt-8 sm:mt-12">
              © ALL RIGHTS RESERVED. <br />2026 PRIYANSHU DEWANGAN
            </p>
          </div>

          {/* Column 2: Massive Empty Space (Brutalist Whitespace Layout) */}
          <div className="hidden lg:block"></div>

          {/* Column 3: Contact & Socials */}
          <div className="flex flex-col gap-8 text-left font-sans">
            <div>
              <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-4">— INQUIRIES</p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:priyanshudewangan2004@gmail.com"
                  className="block w-fit text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black hover:translate-y-1.5 hover:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top break-all"
                >
                  priyanshudewangan2004@gmail.com
                </a>
                <a
                  href="tel:+919937069399"
                  className="block w-fit text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black hover:translate-y-1.5 hover:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top"
                >
                  +91 99370 69399
                </a>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-4">— SOCIAL CHANNELS</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/priyanshudewangannn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black hover:translate-y-1.5 hover:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://www.linkedin.com/in/priyanshudewangan2303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black hover:translate-y-1.5 hover:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/priyanshudewangan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black hover:translate-y-1.5 hover:scale-95 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top"
                >
                  GITHUB
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Locations */}
          <div className="flex flex-col gap-8 text-left font-sans">
            <div>
              <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-4">— MAIN LOCATIONS</p>
              <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-black/80 leading-relaxed">
                <div>
                  <h4 className="text-black text-xs font-black">JAIPUR</h4>
                  <p className="text-[11px] text-black/50 font-medium mt-1">Manipal University Jaipur, 303007</p>
                </div>
                <div>
                  <h4 className="text-black text-xs font-black">Nuapada</h4>
                  <p className="text-[11px] text-black/50 font-medium mt-1">12, Nuapada, Odisha, India </p>
                </div>
                <div>
                  <h4 className="text-black text-xs font-black">REMOTE</h4>
                  <p className="text-[11px] text-black/50 font-medium mt-1">AVAILABLE FOR OPPORTUNITIES WORLDWIDE</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Giant Cropped Typography at the Bottom - Intentionally Over-scaled, Curved and Anchored */}
      <motion.div
        style={{ y: giantY, opacity: giantOpacity }}
        className="absolute bottom-[-18%] sm:bottom-[-20%] md:bottom-[-22%] lg:bottom-[-24%] left-[-20vw] w-[140vw] select-none pointer-events-none z-0 flex justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 1200 400"
          className="w-full text-black fill-current"
          style={{ transform: "scale(1.08, 0.92)", transformOrigin: "center" }}
        >
          <defs>
            <path id="curve" d="M 0,260 Q 600,390 1200,260" />
          </defs>
          <text
            className="font-serif italic font-normal select-none pointer-events-none"
            fontSize="250"
            letterSpacing="-0.04em"
          >
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              Dewangan
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
