"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicZoom() {
  const immersiveSectionRef = useRef<HTMLDivElement>(null);
  const immersiveFrameRef = useRef<HTMLDivElement>(null);
  const immersiveBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {


    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(immersiveFrameRef.current, {
        scale: 0.72,
        borderRadius: "28px",
        width: "78vw",
        height: "72vh",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: immersiveSectionRef.current,
          start: "top top",
          end: "+=2600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Cinematic Zoom Animation
      // Keep corners rounded even in fullscreen as requested
      tl.to(immersiveFrameRef.current, {
        scale: 1,
        width: "100vw",
        height: "100vh",
        borderRadius: "28px", 
        ease: "power2.out",
        duration: 1,
      });

      // Background transition: White -> #171412 -> White
      tl.to(
        immersiveBgRef.current,
        {
          backgroundColor: "#171412",
          duration: 0.1,
          ease: "power1.inOut",
        },
        0.05
      );

      tl.to(
        immersiveBgRef.current,
        {
          backgroundColor: "#F3F0EA",
          duration: 0.15,
          ease: "power1.inOut",
        },
        0.6
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="cinematic-zoom-container w-full">
      <section
        ref={immersiveSectionRef}
        className="cinematic-zoom-wrapper relative h-screen w-full overflow-hidden"
      >
        {/* Background Layer */}
        <div
          ref={immersiveBgRef}
          className="cinematic-zoom-bg absolute inset-0 bg-[#F3F0EA]"
        />

        {/* Animation Content Layer */}
        <div className="cinematic-zoom-layout relative flex h-screen items-center justify-center">
          <div
            ref={immersiveFrameRef}
            className="cinematic-zoom-frame relative overflow-hidden bg-black will-change-transform transform-gpu"
          >
            <video
              src="/THE REBIRTH COMPANY.mp4"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none will-change-transform transform-gpu"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
