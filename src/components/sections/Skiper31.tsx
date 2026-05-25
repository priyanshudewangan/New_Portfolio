"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block text-primary", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-14 w-14 shrink-0 object-contain will-change-transform filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-14 w-14 shrink-0 object-contain will-change-transform filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

const ThankYouCharacter = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0.35, 0.65], [distanceFromCenter * 65, 0]);
  const rotate = useTransform(scrollYProgress, [0.35, 0.65], [distanceFromCenter * 35, 0]);
  const scale = useTransform(scrollYProgress, [0.35, 0.65], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block text-primary font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter font-league select-none leading-none",
        isSpace && "w-6 sm:w-10"
      )}
      style={{ x, rotate, scale, opacity }}
    >
      {char}
    </motion.span>
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  const text = "see more from ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const thankYouText = "THANK YOU";
  const thankYouCharacters = thankYouText.split("");
  const thankYouCenterIndex = Math.floor(thankYouCharacters.length / 2);

  // GitHub Repositories
  const repoItems = [
    {
      name: "New Portfolio",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vite.svg",
      url: "https://github.com/priyanshudewangan/New_Portfolio",
      tech: "Vite + React + TS"
    },
    {
      name: "Diabetic Retinopathy",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tensorflow.svg",
      url: "https://github.com/priyanshudewangan/diabetic-retinopathy",
      tech: "Python + TensorFlow"
    },
    {
      name: "ApplyFlow Automation",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/selenium.svg",
      url: "https://github.com/priyanshudewangan/applyflow-automation",
      tech: "Python + Selenium"
    },
    {
      name: "FutureMe AI Platform",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
      url: "https://github.com/priyanshudewangan/futureme-ai-platform",
      tech: "React + Framer Motion"
    },
    {
      name: "Cinematic Recommender",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/javascript.svg",
      url: "https://github.com/priyanshudewangan/cinematic-recommender",
      tech: "JS + HTML + CSS"
    },
    {
      name: "GitHub Profile",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
      url: "https://github.com/priyanshudewangan",
      tech: "All Repositories"
    }
  ];
  const repoCenterIndex = Math.floor(repoItems.length / 2);

  // Social Channels
  const socialItems = [
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
      url: "https://github.com/priyanshudewangan"
    },
    {
      name: "LinkedIn",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg",
      url: "https://linkedin.com" // Placeholder/generic, user can update
    },
    {
      name: "Email",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/gmail.svg",
      url: "mailto:priyanshudewangan2004@gmail.com"
    },
    {
      name: "Discord",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
      url: "https://discord.com" // Placeholder/generic, user can update
    }
  ];
  const socialCenterIndex = Math.floor(socialItems.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-[#f5f4f3] border-t-2 border-foreground overflow-hidden">
        {/* Helper tip */}
        <div className="absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-4 text-center text-black pointer-events-none mt-12">
          <span className="relative max-w-[12ch] text-[10px] font-mono uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:mt-2 after:h-12 after:w-px after:bg-gradient-to-b after:from-[#f23e16] after:to-transparent after:content-['']">
            Scroll to see more
          </span>
        </div>

        {/* Block 1 — see more from */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[180vh] items-center justify-center gap-[2vw] overflow-hidden p-[2vw]"
        >
          <div
            className="w-full max-w-4xl text-center text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black font-sans"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Block 2 — GitHub Repos */}
        <div
          ref={targetRef2}
          className="relative -mt-[80vh] box-border flex h-[180vh] flex-col items-center justify-center gap-[4vw] overflow-hidden p-[2vw]"
        >
          <p className="flex items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl font-black tracking-tight text-black uppercase font-sans">
            <Bracket className="h-10 text-black" />
            <span>my featured repositories</span>
            <Bracket className="h-10 scale-x-[-1] text-black" />
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 max-w-6xl w-full px-6 justify-center">
            {repoItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 text-center border-2 border-black p-4 bg-white/60 hover:bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-y-0 active:shadow-none transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-center p-2 rounded-lg bg-black/5 group-hover:bg-primary/10 transition-colors">
                  <CharacterV2
                    char={item.icon}
                    index={index}
                    centerIndex={repoCenterIndex}
                    scrollYProgress={scrollYProgress2}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full overflow-hidden">
                  <span className="text-xs sm:text-sm font-black font-sans tracking-tight text-black truncate uppercase">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-black/50 group-hover:text-primary transition-colors">
                    {item.tech}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Block 3 — Socials & Thank You */}
        <div
          ref={targetRef3}
          className="relative -mt-[75vh] box-border flex h-[200vh] flex-col items-center justify-center gap-[4vw] overflow-hidden p-[2vw]"
        >
          <p className="flex items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl font-black tracking-tight text-black uppercase font-sans">
            <Bracket className="h-10 text-black" />
            <span>connect & collaborate</span>
            <Bracket className="h-10 scale-x-[-1] text-black" />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8" style={{ perspective: "500px" }}>
            {socialItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 border border-black/10 hover:border-black p-4 rounded-xl bg-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CharacterV3
                  char={item.icon}
                  index={index}
                  centerIndex={socialCenterIndex}
                  scrollYProgress={scrollYProgress3}
                />
                <span className="text-xs font-mono font-bold tracking-widest text-black/60 group-hover:text-primary uppercase transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </div>

          <div
            className="w-full text-center flex justify-center mt-12"
            style={{ perspective: "500px" }}
          >
            {thankYouCharacters.map((char, index) => (
              <ThankYouCharacter
                key={index}
                char={char}
                index={index}
                centerIndex={thankYouCenterIndex}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
        </div>
      </main>
    </ReactLenis>
  );
};

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="#000"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31, ThankYouCharacter };
