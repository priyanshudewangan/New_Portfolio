import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// @ts-ignore
import finalLetterVideo from "@/assets/FinalLetter.webm";

gsap.registerPlugin(ScrollTrigger);

export const ThankYouLetter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create HTML5 Video in-memory to drive seek/drawing
    const video = document.createElement("video");
    video.src = finalLetterVideo;
    video.preload = "auto";
    video.playsInline = true;
    video.muted = true;
    video.controls = false;

    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    // Draw video frame to canvas mimicking object-fit: cover
    const drawImageProp = (
      ctx: CanvasRenderingContext2D,
      img: HTMLVideoElement,
      x = 0,
      y = 0,
      w: number,
      h: number,
      offsetX = 0.5,
      offsetY = 0.5
    ) => {
      const iw = img.videoWidth;
      const ih = img.videoHeight;
      if (iw === 0 || ih === 0) return;

      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let cx, cy, cw, ch;

      if (nw < w) nw = w;
      if (nh < h) nh = h;

      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    };

    const drawFrame = () => {
      if (video.readyState >= 1) {
        drawImageProp(ctx, video, 0, 0, canvas.width, canvas.height);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      drawFrame();
    };

    const initScrollTrigger = () => {
      setIsLoading(false);
      const duration = video.duration || 1;

      resizeCanvas();

      // GSAP ScrollTrigger to pin container and track scrub progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          targetTime = self.progress * duration;
        },
      });

      // Smooth Lerped Render Loop to scrub video.currentTime
      const renderLoop = () => {
        const diff = targetTime - currentTime;
        if (Math.abs(diff) > 0.0001) {
          currentTime += diff * 0.08; // Lerping seek time for buttery smooth feel
          if (currentTime < 0) currentTime = 0;
          if (currentTime > duration) currentTime = duration;
          video.currentTime = currentTime;
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    };

    // Seeked event fires when the frame is ready in buffer
    video.addEventListener("seeked", drawFrame);
    video.addEventListener("loadedmetadata", initScrollTrigger);

    // Watch video load progress for loader
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration || 1;
        setLoadProgress(Math.min(100, Math.round((bufferedEnd / duration) * 100)));
      }
    };
    video.addEventListener("progress", handleProgress);

    window.addEventListener("resize", resizeCanvas);

    video.load();

    if (video.readyState >= 1) {
      initScrollTrigger();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("seeked", drawFrame);
      video.removeEventListener("loadedmetadata", initScrollTrigger);
      video.removeEventListener("progress", handleProgress);
      window.removeEventListener("resize", resizeCanvas);
      video.src = "";
      video.load();
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none border-t-2 border-white/10"
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black font-sans text-[#f5efe4] gap-4">
          <div className="w-12 h-12 border-2 border-[#f23e16] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase">
            LOADING EXPERIENCE... {loadProgress}%
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};
