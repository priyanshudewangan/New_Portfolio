import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assumes a standard `cn` utility for merging classes

// 1. --- PROPS INTERFACE ---
// The component is now driven by props, making it reusable.
interface FluidTextMorphProps {
  wordPairs: [string, string][];
  className?: string;
  // Allows for custom animation props to be passed
  animationProps?: {
    initialColor?: string;
    animateColor?: string;
    exitColor?: string;
  };
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// 2. --- REUSABLE COMPONENT LOGIC ---
// The component name is capitalized as per React standards.
export function FluidTextMorph({
  wordPairs,
  className,
  animationProps = {},
  autoPlay = false,
  autoPlayInterval = 1000,
}: FluidTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Default colors are now CSS variables for theming
  const {
    initialColor = "hsl(var(--primary))",
    animateColor = "hsl(var(--foreground))",
    exitColor = "hsl(var(--destructive))",
  } = animationProps;

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordPairs.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, wordPairs.length]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % wordPairs.length);
  };

  const word = (wordPairs && wordPairs.length > 0) ? wordPairs[index][isHovered ? 1 : 0] : "";
  const letters = word.split("");


  // 3. --- CLEAN, REUSABLE MARKUP ---
  // The component no longer includes demo-specific wrappers or text.
  // It uses `cn` to merge default classes with any custom classes passed via props.
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center text-6xl font-bold sm:text-8xl",
        className
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
    >
      <AnimatePresence>
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            layoutId={`letter-${i}`}
            // 4. --- THEMING WITH CSS VARIABLES ---
            // Hardcoded colors are replaced with style objects using CSS variables.
            // This ensures light/dark mode support out of the box.
            initial={{ opacity: 0, y: 30, scale: 0.8, color: initialColor }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: animateColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: i * 0.05,
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
              color: exitColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: (letters.length - 1 - i) * 0.05,
              },
            }}
            className="relative text-inherit" // Modified class to keep parent styles or inherit them
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
