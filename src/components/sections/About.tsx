import React from "react";
import portfolioDp from "@/assets/Portfolio_DP.png";
import { FluidTextMorph } from "@/components/ui/fluid-text-morph";

const WORD_PAIRS: [string, string][] = [
  ["FrontEnd", "Developer"],
  ["Design", "Develop"],
  ["Create", "Innovate"],
  ["Build", "Ship"],
  ["Animate", "Engage"],
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen w-full text-[#e2e0db] p-6 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center relative overflow-hidden border-t-2 border-white/10"
      style={{
        backgroundImage: `radial-gradient(circle at 60% 40%, rgba(28, 29, 31, 0.98) 0%, rgba(13, 14, 15, 0.99) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
        backgroundBlendMode: "normal",
      }}
    >
      {/* Container holding the grid */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-20 h-full my-auto z-10">

        {/* Left Column: Vertical Text "ABOUT ME" facing right */}
        <div className="relative w-[30vw] md:w-[22vw] lg:w-[18vw] h-[55vw] md:h-[42vw] lg:h-[35vw] flex items-center justify-center select-none shrink-0">
          <div className="absolute flex flex-col items-start rotate-[-90deg] font-sans font-black text-[15vw] md:text-[11vw] lg:text-[12vw] leading-none text-[#e2e0db] uppercase tracking-tighter whitespace-nowrap gap-4 sm:gap-6 md:gap-8">
            <span>ABOUT</span>
            <span className="translate-x-[65%]">ME</span>
          </div>
        </div>

        {/* Right Column: Image, Paragraphs, and Name */}
        <div className="flex-1 flex flex-col items-end gap-8 sm:gap-10 max-w-xl w-full">
          {/* Display Picture */}
          <div className="w-36 sm:w-40 md:w-44 aspect-[132/193] overflow-hidden border border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <img
              src={portfolioDp}
              alt="Priyanshu"
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
          </div>

          {/* Description Paragraphs replaced with FluidTextMorph component */}
          <div className="w-full max-w-md flex flex-col items-end gap-2 text-right">
            <FluidTextMorph
              wordPairs={WORD_PAIRS}
              className="text-5xl sm:text-7xl font-extrabold tracking-tighter justify-end w-full min-h-[5rem] sm:min-h-[7rem]"
              autoPlay={true}
              autoPlayInterval={2000}
              animationProps={{
                initialColor: "#f23e16",
                animateColor: "#e2e0db",
                exitColor: "#ef4444",
              }}
            />
          </div>

          {/* Biography paragraphs */}
          <div className="space-y-6 text-[#a1a1a5] text-sm sm:text-base font-sans font-normal text-right leading-relaxed max-w-md">
            <p>
              I’m a Frontend Developer and Creative Developer passionate about building immersive and visually engaging digital experiences.
            </p>
            <p>
              My work focuses on modern UI/UX, smooth animations, and interactive web experiences that combine aesthetics with functionality. Using technologies like React, Next.js, Tailwind CSS, GSAP, and Framer Motion, I create responsive websites that feel clean, dynamic, and cinematic.
            </p>
            <p>
              I enjoy blending design, motion, and development to craft experiences that are not only functional — but memorable.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};



