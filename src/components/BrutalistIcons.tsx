import React from "react";

// Brutalist Disc Record Icon: A black square containing a vinyl disc pattern
export const BrutalistRecordIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block align-middle mx-1 ${props.className || ""}`}
    {...props}
  >
    <rect width="28" height="28" className="fill-foreground" />
    <circle cx="14" cy="14" r="10" className="fill-background" />
    <circle cx="14" cy="14" r="7" className="fill-foreground" />
    <circle cx="14" cy="14" r="4" className="fill-background" />
    <circle cx="14" cy="14" r="1.5" className="fill-foreground" />
  </svg>
);

// Circle Dot Icon: A black square with a dot inside a circle
export const BrutalistCircleDotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block align-middle mx-1 ${props.className || ""}`}
    {...props}
  >
    <rect width="28" height="28" className="fill-foreground" />
    <circle cx="14" cy="14" r="9" className="fill-background" />
    <circle cx="14" cy="14" r="4" className="fill-foreground" />
  </svg>
);

// Sparkle Star Icon: An 8-point brutalist star (asterisk)
export const BrutalistStarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block align-middle mx-1 ${props.className || ""}`}
    {...props}
  >
    <path
      d="M12 2L14.2 8.2L20.8 6L18.6 12.2L24.8 14.4L18.6 16.6L20.8 22.8L14.2 20.6L12 26.8L9.8 20.6L3.2 22.8L5.4 16.6L-0.8 14.4L5.4 12.2L3.2 6L9.8 8.2L12 2Z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </svg>
);
