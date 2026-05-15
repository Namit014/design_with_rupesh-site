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


    // 1. Digits Animation
    const counts = document.querySelectorAll(".loader .count");
    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");

      tl.to(
        digits,
        {
          y: "0%",
          duration: 1,
          stagger: 0.075,
        },
        index * 1
      );

      if (index < counts.length - 1) {
        tl.to(
          digits,
          {
            y: "-100%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1 + 1
        );
      }
    });

    // 2. Spinner & Word entrance
    tl.to(".loader .spinner", {
      opacity: 0,
      duration: 0.3,
    });

    tl.to(".loader .word h1", {
      y: "0%",
      duration: 1,
    }, "<");

    // 3. Divider entrance
    tl.to(".loader .divider", {
      scaleY: "100%",
      duration: 1,
      onComplete: () => {
        gsap.to(".loader .divider", { opacity: 0, duration: 0.3, delay: 0.3 });
      }
    });

    // 4. Word exit
    tl.to(".loader #word-1 h1", {
      y: "100%",
      duration: 1,
      delay: 0.3,
    });

    tl.to(".loader #word-2 h1", {
      y: "-100%",
      duration: 1,
    }, "<");

    // 5. Final exit Swipe Up + Site Fade In
    tl.to(".loader", {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
      onStart: () => {
        gsap.to(".main-content", {
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        });
        gsap.to(".hero-img", { scale: 1, duration: 2, ease: "power4.out" });
      },
      onComplete: () => {
        gsap.set(".loader", { pointerEvents: "none" });
        setLoaderAnimating(false);
        setShowPreloader(false);
      }
    }, "+=0.5");



  }, { dependencies: [showPreloader] });


  if (!showPreloader) return null;

  return (
    <div className="loader" ref={container}>
      <div className="overlay">
        <div className="block"></div>
      </div>
      
      <div className="intro-logo">
        <div id="word-1" className="word">
          <h1>RUPESH</h1>
        </div>
        <div id="word-2" className="word">
          <h1>KUMAR</h1>
        </div>
      </div>

      <div className="divider"></div>

      <div className="counter">
        <div className="count">
          <div className="digit"><h1>2</h1></div>
          <div className="digit"><h1>0</h1></div>
          <div className="digit"><h1>2</h1></div>
          <div className="digit"><h1>6</h1></div>
        </div>
        <div className="count" style={{ position: 'absolute', opacity: 0 }}>
           {/* You can add more counts here to match the staggered logic */}
        </div>
      </div>

      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
