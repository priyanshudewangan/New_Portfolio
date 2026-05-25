import React from "react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import netflixPng from "@/assets/Netlfix.png";
import MovieRecommender from "@/assets/MovieRecommender.png";
import ApplyFlow from "@/assets/ApplyFlow.png";
import Taskmanager from "@/assets/TaskManager.png"

const projects = [
  {
    titleLine1: "NETFLIX",
    titleLine2: "PRO",
    tags: ["REACT", "TAILWIND CSS", "TMDB API", "FIREBASE"],
    description: "A high-fidelity Netflix clone featuring user authentication, dynamic trailer playback, personal watchlists, and movie content populated via TMDB API integration.",
    image: netflixPng,
    bgColor: "#E50914",
    textColor: "#ffffff"
  },
  {
    titleLine1: "APPLYFLOW",
    titleLine2: "AUTOMATION",
    tags: ["PYTHON", "SELENIUM", "APIs"],
    description: "End-to-end internship application automation system reducing manual effort by over 80%.",
    image: ApplyFlow,
    bgColor: "#000000",
    textColor: "#ffffff"
  },
  {
    titleLine1: "FUTUREME",
    titleLine2: "AI PLATFORM",
    tags: ["REACT", "FRAMER MOTION", "NLP"],
    description: "AI-Simulated personal growth orchestrator with dynamic telemetry dashboards and NLP-driven burnout diagnostics.",
    image: Taskmanager,
    bgColor: "#fdf0eb",
    textColor: "#f23e16"
  },
  {
    titleLine1: "CINEMATIC",
    titleLine2: "RECOMMENDER",
    tags: ["JS", "HTML", "CSS"],
    description: "Intelligent recommendation engine suggesting movies based on title, genre, and user keywords.",
    image: MovieRecommender,
    bgColor: "#1A3DE8",
    textColor: "#ffffff"
  },
];

export const Projects: React.FC = () => {
  return (
    <FlowArt id="projects" aria-label="Selected Projects" className="border-t-2 border-foreground">
      {projects.map((project, index) => (
        <FlowSection
          key={index}
          aria-label={`${project.titleLine1} ${project.titleLine2}`}
          style={{ backgroundColor: project.bgColor, color: project.textColor }}
        >
          {/* Top Label / Tag Section */}
          <div className="flex justify-between items-center w-full z-20">
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold">
              0{index + 1} — SELECTED PROJECTS
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono font-black border border-current px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Central Section: Stacked Big Title + Centered Image Overlay */}
          <div className="relative flex-1 flex flex-col items-center justify-center my-6 sm:my-10 w-full min-h-[40vh]">
            {/* Background Big Title with Glow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-0 pointer-events-none text-center">
              <h3
                className="text-[18vw] sm:text-[16vw] font-black leading-[0.8] uppercase tracking-tighter font-league"
                style={{
                  color: project.textColor,
                  textShadow: `0 0 25px ${project.textColor}55`,
                }}
              >
                {project.titleLine1}
                <br />
                {project.titleLine2}
              </h3>
            </div>

            {/* Centered Overlapping Image */}
            <div className="relative z-10 w-72 sm:w-96 md:w-[28rem] lg:w-[36rem] aspect-[16/9] shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden bg-background border border-white/10 transition-transform duration-500 hover:scale-105">
              <img
                src={project.image}
                alt={`${project.titleLine1} ${project.titleLine2}`}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-out hover:scale-110"
              />
            </div>
          </div>

          {/* Bottom Section: Description & Link */}
          <div className="mt-auto space-y-4 w-full z-20">
            <hr className="border-none border-t border-current opacity-25" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight font-sans">
                  {project.titleLine1} {project.titleLine2}
                </h4>
                <p className="max-w-[65ch] text-base sm:text-lg md:text-xl font-normal leading-snug tracking-tight opacity-90 font-sans">
                  {project.description}
                </p>
              </div>
              <button className="whitespace-nowrap text-sm font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer text-left self-start md:self-end">
                View Case Study →
              </button>
            </div>
          </div>
        </FlowSection>
      ))}
    </FlowArt>
  );
};

