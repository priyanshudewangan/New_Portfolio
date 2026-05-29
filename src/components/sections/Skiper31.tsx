"use client";

import { useRef } from "react";
import ReactLenis from "lenis/react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Local PNG Icon Imports
import reactIcon from "@/assets/react.png";
import viteIcon from "@/assets/vite.png";
import tensorflowIcon from "@/assets/tensorflow.png";
import seleniumIcon from "@/assets/selenium.png";
import javascriptIcon from "@/assets/javascript.png";
import githubIcon from "@/assets/github.png";
import linkedinIcon from "@/assets/linkedin.png";
import gmailIcon from "@/assets/gmail.png";
import discordIcon from "@/assets/discord.png";

gsap.registerPlugin(ScrollTrigger);

const Skiper31 = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);
  const strokeWrapperRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const textLines = [
    "IF YOU'RE LOOKING",
    "FOR EXPERIENCES",
    "LIKE THIS!!"
  ];

  const thankYouText = "THANK YOU";
  const thankYouCharacters = thankYouText.split("");
  const thankYouCenterIndex = Math.floor(thankYouCharacters.length / 2);

  // GitHub Repositories
  const repoItems = [
    {
      name: "New Portfolio",
      icon: viteIcon,
      url: "https://portfoliopriyanshu2.vercel.app",
      tech: "Vite + React + TS"
    },
    {
      name: "Diabetic Retinopathy",
      icon: tensorflowIcon,
      url: "https://github.com/priyanshudewangan/diabetic-retinopathy",
      tech: "Python + TensorFlow"
    },
    {
      name: "ApplyFlow Automation",
      icon: seleniumIcon,
      url: "https://github.com/priyanshudewangan/applyflow-automation",
      tech: "Python + Selenium"
    },
    {
      name: "FutureMe AI Platform",
      icon: reactIcon,
      url: "https://github.com/priyanshudewangan/futureme-ai-platform",
      tech: "React + Framer Motion"
    },
    {
      name: "Cinematic Recommender",
      icon: javascriptIcon,
      url: "https://github.com/priyanshudewangan/cinematic-recommender",
      tech: "JS + HTML + CSS"
    },
    {
      name: "GitHub Profile",
      icon: githubIcon,
      url: "https://github.com/priyanshudewangan",
      tech: "All Repositories"
    }
  ];
  const repoCenterIndex = Math.floor(repoItems.length / 2);

  // Social Channels
  const socialItems = [
    {
      name: "GitHub",
      icon: githubIcon,
      url: "https://github.com/priyanshudewangan"
    },
    {
      name: "LinkedIn",
      icon: linkedinIcon,
      url: "https://www.linkedin.com/in/priyanshudewangan2303"
    },
    {
      name: "Email",
      icon: gmailIcon,
      url: "mailto:priyanshudewangan2004@gmail.com"
    },
    {
      name: "Discord",
      icon: discordIcon,
      url: "https://discord.com"
    }
  ];
  const socialCenterIndex = Math.floor(socialItems.length / 2);

  useGSAP(() => {
    // 1. SVG LinePath Drawing animation
    if (pathRef.current && strokeWrapperRef.current && targetRef3.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      // Initialize path to be hidden (strokeDashoffset matches total length)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: strokeWrapperRef.current,
          start: "top 90%",
          end: "bottom 95%",
          scrub: 1.0, // Luxurious catch-up delay for premium scroll feel
          invalidateOnRefresh: true,
        }
      }).to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });
    }

    // 2. Block 1 — Characters Animation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: targetRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 0.5,
      }
    });
    tl1.fromTo(".char-v1",
      {
        x: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 50;
        },
        rotateX: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 50;
        },
      },
      {
        x: 0,
        rotateX: 0,
        ease: "power2.out",
      }
    );

    // 3. Block 2 — Repo Icons Animation
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: targetRef2.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 0.5,
      }
    });
    tl2.fromTo(".repo-icon",
      {
        x: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 50;
        },
        y: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return Math.abs(distance) * 50;
        },
        scale: 0.75,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
      }
    );

    // 4. Block 3 — Social Icons Animation
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: targetRef3.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 0.5,
      }
    });
    tl3.fromTo(".social-icon",
      {
        x: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 90;
        },
        rotate: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 50;
        },
        y: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return -Math.abs(distance) * 20;
        },
        scale: 0.75,
      },
      {
        x: 0,
        rotate: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
      }
    );

    // 5. Thank You Characters Animation
    const tlThankYou = gsap.timeline({
      scrollTrigger: {
        trigger: targetRef3.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });
    tlThankYou.fromTo(".thank-you-char",
      {
        x: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 65;
        },
        rotate: (_, target) => {
          const distance = parseFloat((target as HTMLElement).dataset.distance || "0");
          return distance * 35;
        },
        scale: 0.6,
        opacity: 0,
      },
      {
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  return (
    <ReactLenis root>
      <div
        ref={containerRef}
        className="w-full border-t-2 border-foreground overflow-hidden bg-[#FAFDEE] relative"
      >
        {/* Shared container for Blocks 1, 2, and 3 to allow the stroke to span the entire bottom of the site */}
        <div ref={strokeWrapperRef} className="relative w-full overflow-hidden">
          <LinePath
            className="absolute right-0 md:right-[5%] top-0 h-full w-full md:w-[70vw] max-w-5xl z-0 pointer-events-none"
            pathRef={pathRef}
          />

          {/* Block 1 — Animated Intro Headline & Stroke Start */}
          <div
            ref={targetRef}
            className="relative box-border flex h-[100vh] flex-col items-center justify-center overflow-hidden p-[2vw] gap-6"
          >
            <div
              className="w-full max-w-6xl text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-black font-sans flex flex-col gap-2 relative z-10"
              style={{ perspective: "500px" }}
            >
              {textLines.map((line, lineIdx) => {
                const chars = line.split("");
                const center = Math.floor(chars.length / 2);
                return (
                  <div key={lineIdx} className="block leading-none">
                    {chars.map((char, charIdx) => {
                      const isSpace = char === " ";
                      return (
                        <span
                          key={charIdx}
                          className={cn("inline-block text-black char-v1", isSpace && "w-3 sm:w-4 md:w-5")}
                          data-distance={charIdx - center}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            <p className="font-sans relative z-10 max-w-2xl text-lg sm:text-xl font-bold text-[#1F3A4B]/80 uppercase mt-4 text-center">
              Scroll down to see the effect
            </p>
          </div>

          {/* Block 2 — GitHub Repos */}
          <div
            ref={targetRef2}
            className="relative -mt-[30vh] box-border flex h-[110vh] flex-col items-center justify-center gap-[4vw] overflow-hidden p-[2vw]"
          >
            <p className="flex items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl font-black tracking-tight text-black uppercase font-sans">
              <Bracket className="h-10 text-black" />
              <span>Check these repositories</span>
              <Bracket className="h-10 scale-x-[-1] text-black" />
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 max-w-6xl w-full px-6 justify-center">
              {repoItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 text-center border-2 border-black p-4 bg-white/60 hover:bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-y-0 active:shadow-none transition-all duration-200 cursor-pointer z-10"
                >
                  <div className="flex items-center justify-center p-2 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors">
                    <img
                      src={item.icon}
                      alt=""
                      className="repo-icon h-14 w-14 shrink-0 object-contain will-change-transform filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      data-distance={index - repoCenterIndex}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full overflow-hidden">
                    <span className="text-xs sm:text-sm font-black font-sans tracking-tight text-black truncate uppercase">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-black/50 group-hover:text-black transition-colors">
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
            className="relative -mt-[25vh] box-border flex h-[120vh] flex-col items-center justify-center gap-[4vw] overflow-hidden p-[2vw]"
          >
            <p className="flex items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl font-black tracking-tight text-black uppercase font-sans">
              <Bracket className="h-10 text-black" />
              <span>connect & collaborate</span>
              <Bracket className="h-10 scale-x-[-1] text-black" />
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 z-10" style={{ perspective: "500px" }}>
              {socialItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 border border-black/10 hover:border-black p-4 rounded-xl bg-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 z-10 cursor-pointer"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="social-icon h-14 w-14 shrink-0 object-contain will-change-transform filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    data-distance={index - socialCenterIndex}
                  />
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 group-hover:text-black uppercase transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>

            <div
              className="w-full text-center flex justify-center mt-12 z-10"
              style={{ perspective: "500px" }}
            >
              {thankYouCharacters.map((char, index) => {
                const isSpace = char === " ";
                return (
                  <span
                    key={index}
                    className={cn(
                      "thank-you-char inline-block text-primary font-black uppercase text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] tracking-tighter font-league select-none leading-none",
                      isSpace && "w-[4vw] sm:w-[6vw]"
                    )}
                    data-distance={index - thankYouCenterIndex}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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

const LinePath = ({
  className,
  pathRef,
}: {
  className: string;
  pathRef: React.RefObject<SVGPathElement | null>;
}) => {
  return (
    <svg
      viewBox="0 0 1278 2670"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#C2F84F"
        strokeWidth="20"
        vectorEffect="non-scaling-stroke"
        style={{ willChange: "stroke-dashoffset" }}
      />
    </svg>
  );
};

export { Skiper31 };
