"use client"; // Required for Next.js App Router

import { FluidTextMorph } from "@/components/ui/fluid-text-morph";

// 1. --- DEMO-SPECIFIC DATA ---
// The content is defined here, not inside the component.
const WORD_PAIRS: [string, string][] = [
  ["Design", "Develop"],
  ["Create", "Innovate"],
  ["Build", "Ship"],
  ["Animate", "Engage"],
];

export default function FluidTextMorphDemo() {
  // 2. --- DEMO-SPECIFIC LAYOUT & STYLING ---
  // The background and centering are part of the demo, not the component.
  // It uses theme variables (`bg-background`) to be theme-aware.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      {/* 3. --- RENDERING THE REUSABLE COMPONENT ---
          The component is now used by passing props to it. */}
      <FluidTextMorph wordPairs={WORD_PAIRS} />

      {/* The instruction text is also part of the demo page. */}
      <p className="mt-6 text-muted-foreground">
        Hover to morph, Click to change.
      </p>
    </div>
  );
}
