"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import all critical images to preload
import heroPortrait from "@/assets/hero-portrait.webp";
import portfolioDp from "@/assets/Portfolio_DP.webp";
import netflixPng from "@/assets/Netlfix.webp";
import MovieRecommender from "@/assets/MovieRecommender.webp";
import ApplyFlow from "@/assets/ApplyFlow.webp";
import Taskmanager from "@/assets/TaskManager.webp";
import reactIcon from "@/assets/react.png";
import viteIcon from "@/assets/vite.png";
import tensorflowIcon from "@/assets/tensorflow.png";
import seleniumIcon from "@/assets/selenium.png";
import javascriptIcon from "@/assets/javascript.png";
import githubIcon from "@/assets/github.png";
import linkedinIcon from "@/assets/linkedin.png";
import gmailIcon from "@/assets/gmail.png";
import discordIcon from "@/assets/discord.png";

interface LayoutPreloaderProps {
  children: React.ReactNode;
}

const imagesToPreload = [
  heroPortrait,
  portfolioDp,
  netflixPng,
  MovieRecommender,
  ApplyFlow,
  Taskmanager,
  reactIcon,
  viteIcon,
  tensorflowIcon,
  seleniumIcon,
  javascriptIcon,
  githubIcon,
  linkedinIcon,
  gmailIcon,
  discordIcon,
];

export function LayoutPreloader({ children }: LayoutPreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(imagesToPreload.length === 0);
  const [isAnimComplete, setIsAnimComplete] = useState(false);

  useEffect(() => {
    // Prevent scroll while preloading
    if (!isAnimComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAnimComplete]);

  useEffect(() => {
    let loadedCount = 0;
    const total = imagesToPreload.length;

    if (total === 0) {
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount >= total) {
        // Pause slightly to let user appreciate the loaded state
        setTimeout(() => {
          setIsLoaded(true);
        }, 400);
      }
    };

    const handleImageError = () => {
      // Don't block loading if an image fails to load
      handleImageLoad();
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    });

    // Fallback: Force load after 6 seconds max so user is never stuck
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const letters = "Loading".split("");

  return (
    <>
      <AnimatePresence onExitComplete={() => setIsAnimComplete(true)}>
        {!isLoaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Centered Custom LoadingLines Display */}
            <div className="relative flex items-center justify-center h-[120px] w-auto font-sans text-[1.5em] font-bold select-none text-white scale-[1.4] sm:scale-[1.6]">
              {/* Animated letters */}
              {letters.map((letter, idx) => (
                <span
                  key={idx}
                  className="relative inline-block opacity-0 z-[2] animate-[letterAnim_4s_linear_infinite] text-white"
                  style={{ animationDelay: `${0.1 + idx * 0.105}s` }}
                >
                  {letter}
                </span>
              ))}

              {/* Loader background */}
              <div className="absolute top-0 left-0 w-full h-full z-[1] bg-transparent [mask:repeating-linear-gradient(90deg,transparent_0,transparent_6px,black_7px,black_8px)]">
                <div className="absolute top-0 left-0 w-full h-full 
                  [background-image:radial-gradient(circle_at_50%_50%,#ff0_0%,transparent_50%),radial-gradient(circle_at_45%_45%,#f00_0%,transparent_45%),radial-gradient(circle_at_55%_55%,#0ff_0%,transparent_45%),radial-gradient(circle_at_45%_55%,#0f0_0%,transparent_45%),radial-gradient(circle_at_55%_45%,#00f_0%,transparent_45%)]
                  [mask:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_10%,black_25%)]
                  animate-[transformAnim_2s_infinite_alternate_cubic-bezier(0.6,0.8,0.5,1),opacityAnim_4s_infinite]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Wrapper */}
      <motion.div
        animate={
          isLoaded
            ? {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                scale: 0.98,
                filter: "blur(5px)",
              }
        }
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={isAnimComplete ? "w-full min-h-screen" : "w-full min-h-screen pointer-events-none"}
      >
        {children}
      </motion.div>
    </>
  );
}

