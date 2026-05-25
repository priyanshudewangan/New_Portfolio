import React from "react";
import { motion } from "framer-motion";

export const SocialMedia: React.FC = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/priyanshudewangan" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Email", url: "mailto:priyanshudewangan2004@gmail.com" },
    { name: "Discord", url: "https://discord.com" },
  ];

  return (
    <section
      id="socials"
      className="w-full py-36 bg-[#5b63e8] text-[#f5efe4] flex flex-col items-center justify-center relative overflow-hidden border-t-2 border-white/10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Centered Star Icon at the Top */}
      <motion.div
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 360 }}
        viewport={{ once: false }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="mb-8 cursor-pointer select-none text-[#0d0e12]"
      >
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          className="w-12 h-12 sm:w-16 sm:h-16"
        >
          <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
        </svg>
      </motion.div>

      {/* Massive Vertical Stacked Title */}
      <div className="flex flex-col items-center justify-center font-league font-black text-[22vw] sm:text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter uppercase text-center select-none text-[#f5efe4] my-2">
        <span>Explore</span>
        <span>My Projects</span>
      </div>

      {/* Social Links Sub-Menu */}
      <div className="mt-12 flex flex-wrap gap-4 sm:gap-6 justify-center px-4 max-w-xl z-10">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-white/20 hover:border-[#f5efe4] rounded-full text-xs sm:text-sm font-mono tracking-widest text-white/80 hover:text-[#f5efe4] bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 uppercase cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
};
