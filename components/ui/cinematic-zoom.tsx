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
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
      lenis.destroy();
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
            className="cinematic-zoom-frame relative overflow-hidden bg-black"
          >
            <iframe
              src="https://player.vimeo.com/video/1120758182?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
              className="absolute inset-0 h-full w-full scale-[1.25] object-cover pointer-events-none"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-view"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
