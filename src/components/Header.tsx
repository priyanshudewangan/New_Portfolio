import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

interface HeaderProps {
  onNavClick?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const navItems = ["HOME", "ABOUT", "PROJECT", "CASE STUDY"];

  return (
    <header className="w-full border-b border-black bg-[#c4cfd0] sticky top-0 z-50">
      <div className="flex h-16 w-full items-center justify-between">
        {/* Logo Section */}
        <div className="flex h-full w-24 items-center justify-center border-r border-black px-6">
          <span className="font-serif italic text-3xl font-medium tracking-tight select-none">
            P_D
          </span>
        </div>

        {/* Middle decorative spacer with drafting grid marks */}
        <div className="relative flex-1 h-full hidden md:block">
          {/* Left Intersection Dot */}
          <div className="absolute left-0 bottom-[-4px] w-2 h-2 bg-black translate-x-[-50%]" />
          {/* Right Intersection Dot */}
          <div className="absolute right-0 bottom-[-4px] w-2 h-2 bg-black translate-x-[50%]" />
        </div>

        {/* Mobile / Desktop Navigation Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex h-full w-20 flex-col items-center justify-center border-l border-black hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              <div className="flex w-7 flex-col gap-1.5">
                <span className="h-0.5 w-full bg-black transition-transform"></span>
                <span className="h-0.5 w-full bg-black"></span>
                <span className="h-0.5 w-full bg-black transition-transform"></span>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#c4cfd0] border-l border-black p-0 w-80">
            {/* Accessibility Header */}
            <div className="p-6 border-b border-black">
              <SheetTitle className="font-serif italic text-3xl text-left">Navigation</SheetTitle>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (onNavClick) onNavClick(item);
                  }}
                  className="w-full text-left font-sans font-bold text-2xl py-6 px-8 border-b border-black hover:bg-black hover:text-[#c4cfd0] transition-colors uppercase cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Extra architectural grid elements inside sidebar drawer */}
            <div className="p-8 mt-12 flex flex-col gap-4 text-xs font-sans uppercase tracking-widest text-black/50">
              <p>© 2026 Francies Drek.</p>
              <p>Designing Experiences That People Love.</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
