import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export const Header: React.FC = () => {
  const navItems = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];
  const [theme, setTheme] = useState<"hero" | "about" | "project-0" | "project-1" | "project-2" | "project-3">("hero");

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      const projectsEl = document.getElementById("projects");

      const headerHeight = 64; // h-16 is 64px

      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // If projects section has reached the top of the viewport
        if (rect.top <= headerHeight) {
          // Find which project slide is currently covering the top of the screen
          const slides = Array.from(projectsEl.querySelectorAll<HTMLElement>('[data-flow-section]'));
          for (let i = 0; i < slides.length; i++) {
            const slideRect = slides[i].getBoundingClientRect();
            // If the top of the slide is at or above the header height, and bottom is below it
            if (slideRect.top <= headerHeight && slideRect.bottom > headerHeight) {
              setTheme(`project-${i}` as typeof theme);
              return;
            }
          }
          setTheme("project-0");
          return;
        }
      }

      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If about section has reached the top of the viewport
        if (rect.top <= headerHeight) {
          setTheme("about");
          return;
        }
      }

      setTheme("hero");
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeClasses = {
    hero: "bg-background text-foreground border-foreground",
    about: "bg-black text-white border-white/20",
    "project-0": "bg-[#f23e16] text-white border-white/20",
    "project-1": "bg-black text-white border-white/20",
    "project-2": "bg-[#fdf0eb] text-[#f23e16] border-[#f23e16]",
    "project-3": "bg-[#1A3DE8] text-white border-white/20",
  };

  const borderClasses = {
    hero: "border-foreground",
    about: "border-white/20",
    "project-0": "border-white/20",
    "project-1": "border-white/20",
    "project-2": "border-[#f23e16]",
    "project-3": "border-white/20",
  };

  const dotClasses = {
    hero: "bg-foreground",
    about: "bg-white",
    "project-0": "bg-white",
    "project-1": "bg-white",
    "project-2": "bg-[#f23e16]",
    "project-3": "bg-white",
  };

  const buttonBorderClasses = {
    hero: "border-foreground hover:bg-foreground/5 active:bg-foreground/10",
    about: "border-white/20 hover:bg-white/5 active:bg-white/10",
    "project-0": "border-white/20 hover:bg-white/5 active:bg-white/10",
    "project-1": "border-white/20 hover:bg-white/5 active:bg-white/10",
    "project-2": "border-[#f23e16] hover:bg-[#f23e16]/5 active:bg-[#f23e16]/10",
    "project-3": "border-white/20 hover:bg-white/5 active:bg-white/10",
  };

  const currentClasses = themeClasses[theme];

  return (
    <header className={`w-full border-b sticky top-0 z-50 transition-colors duration-300 ${currentClasses}`}>
      <div className="flex h-16 w-full items-center justify-between">
        {/* Logo Section */}
        <div className={`flex h-full px-6 items-center justify-center border-r transition-colors duration-300 ${borderClasses[theme]}`}>
          <span className="font-serif italic text-3xl font-medium tracking-tight select-none">
            Priyanshu
          </span>
        </div>

        {/* Middle decorative spacer with drafting grid marks */}
        <div className="relative flex-1 h-full hidden md:block">
          {/* Left Intersection Dot */}
          <div className={`absolute left-0 bottom-[-4px] w-2 h-2 translate-x-[-50%] transition-colors duration-300 ${dotClasses[theme]}`} />
          {/* Right Intersection Dot */}
          <div className={`absolute right-0 bottom-[-4px] w-2 h-2 translate-x-[50%] transition-colors duration-300 ${dotClasses[theme]}`} />
        </div>

        {/* Mobile / Desktop Navigation Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={`flex h-full w-20 flex-col items-center justify-center border-l transition-colors duration-300 cursor-pointer ${buttonBorderClasses[theme]}`}
              aria-label="Toggle Menu"
            >
              <div className="flex w-7 flex-col gap-1.5">
                <span className={`h-0.5 w-full transition-all duration-300 ${dotClasses[theme]}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${dotClasses[theme]}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${dotClasses[theme]}`}></span>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-l border-foreground p-0 w-80">
            {/* Accessibility Header */}
            <div className="p-6 border-b border-foreground">
              <SheetTitle className="font-serif italic text-3xl text-left">Navigation</SheetTitle>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <SheetClose asChild key={item}>
                  <button
                    onClick={() => {
                      if (item === "CONTACT") {
                        window.location.href = "mailto:priyanshudewangan2004@gmail.com";
                      } else {
                        const element = document.getElementById(item.toLowerCase());
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="w-full text-left font-sans font-bold text-2xl py-6 px-8 border-b border-foreground hover:bg-foreground hover:text-background transition-colors uppercase cursor-pointer"
                  >
                    {item}
                  </button>
                </SheetClose>
              ))}

            </nav>

            {/* Extra architectural grid elements inside sidebar drawer */}
            <div className="p-8 mt-12 flex flex-col gap-4 text-xs font-sans uppercase tracking-widest text-foreground/50">
              <p>© 2026 Priyanshu Dewangan.</p>
              <p>Designing Experiences That People Love.</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
