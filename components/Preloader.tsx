"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import "../pre/preloader.css";

// Prevent preloader from showing on every route change in the same session
let isInitialLoad = true;

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Mark initial load as complete
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    if (!showPreloader) return;

    // Optional: Define "hop" ease if you want it to match perfectly.
    // If not registered, it defaults to power4.inOut or similar.
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "power4.inOut", 
      },
    });

    setLoaderAnimating(true);

    // Initial State
    gsap.set(".loader .digit h1", { y: "100%" });
    gsap.set(".loader .word h1", { y: "120%" });
    gsap.set(".loader .divider", { scaleY: 0 });
    gsap.set(".main-content", { opacity: 0 });


    // Removed Digits Animation as requested

    // 2. Spinner & Word entrance
    tl.to(".loader .spinner", {
      opacity: 0,
      duration: 0.2,
    });

    tl.to(".loader .word h1", {
      y: "0%",
      duration: 0.6,
    }, "<");

    // 3. Divider entrance
    tl.to(".loader .divider", {
      scaleY: "100%",
      duration: 0.6,
      onComplete: () => {
        gsap.to(".loader .divider", { opacity: 0, duration: 0.2, delay: 0.2 });
      }
    });

    // 4. Word exit
    tl.to(".loader #word-1 h1", {
      y: "100%",
      duration: 0.6,
      delay: 0.1,
    });

    tl.to(".loader #word-2 h1", {
      y: "-100%",
      duration: 0.6,
    }, "<");

    // 5. Final exit Swipe Up + Site Fade In
    tl.to(".loader", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onStart: () => {
        gsap.to(".main-content", {
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        });
        gsap.to(".hero-img", { scale: 1, duration: 1, ease: "power4.out" });
      },
      onComplete: () => {
        gsap.set(".loader", { pointerEvents: "none" });
        setLoaderAnimating(false);
        setShowPreloader(false);
      }
    }, "+=0.2");



  }, { dependencies: [showPreloader] });


  if (!showPreloader) return null;

  return (
    <div className="loader" ref={container}>
      <div className="overlay">
        <div className="block"></div>
      </div>
      
      <div className="intro-logo">
        <div id="word-1" className="word">
          <h1>THE REBIRTH</h1>
        </div>
        <div id="word-2" className="word">
          <h1>COMPANY</h1>
        </div>
      </div>

      <div className="divider"></div>

      {/* Removed counter */}

      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
