"use client";

import { useCallback, useEffect, useRef } from "react";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);

  const fadeTo = useCallback((target: number, duration = 500) => {
    const video = videoRef.current;
    if (!video) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const startOpacity = Number.parseFloat(video.style.opacity || "0");
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      video.style.opacity = String(startOpacity + (target - startOpacity) * progress);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && video) {
      video.pause();
      video.style.opacity = "0";
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      muted
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={(event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        void event.currentTarget.play();
        fadeTo(1);
      }}
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (video.duration - video.currentTime <= 0.55) fadeTo(0);
      }}
      onEnded={(event) => {
        const video = event.currentTarget;
        video.style.opacity = "0";
        window.setTimeout(() => {
          video.currentTime = 0;
          void video.play();
          fadeTo(1);
        }, 100);
      }}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
