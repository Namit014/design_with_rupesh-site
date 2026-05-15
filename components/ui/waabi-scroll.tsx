"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = {
  hero: "/scrollp/hero.jpg",
  cols: [
    ["/scrollp/img1.jpg", "/scrollp/img2.jpg", "/scrollp/img3.jpg", "/scrollp/img4.jpg"],
    ["/scrollp/img5.jpg", "/scrollp/img6.jpg", "/scrollp/img7.jpg", "/scrollp/img8.jpg"],
    ["/scrollp/img9.jpg", "/scrollp/img10.jpg", "/scrollp/img11.jpg", "/scrollp/img12.jpg"],
    ["/scrollp/img13.jpg", "/scrollp/img14.jpg", "/scrollp/img15.jpg", "/scrollp/img16.jpg"],
  ]
};

export default function WaabiScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !heroRef.current || !heroCopyRef.current) return;

    // Split text for hero copy
    const split = new SplitType(heroCopyRef.current, { types: "words" });
    const words = split.words || [];

    let isHeroCopyHidden = false;

    // Hero Section Scroll Logic
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+${window.innerHeight * 3.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Hero Header Y-Percent
        const heroHeaderProgress = Math.min(progress / 0.29, 1);
        gsap.set(".waabi-hero-header", { yPercent: -heroHeaderProgress * 100 });

        // Word Opacity Logic
        const heroWordsProgress = Math.max(0, Math.min((progress - 0.29) / 0.21, 1));
        const totalWords = words.length;
        words.forEach((word, i) => {
          const wordStart = i / totalWords;
          const wordEnd = (i + 1) / totalWords;
          const wordOpacity = Math.max(
            0,
            Math.min((heroWordsProgress - wordStart) / (wordEnd - wordStart), 1)
          );
          gsap.set(word, { opacity: wordOpacity });
        });

        // Hide Hero Copy at threshold
        if (progress > 0.64 && !isHeroCopyHidden) {
          isHeroCopyHidden = true;
          gsap.to(heroCopyRef.current, { opacity: 0, duration: 0.2 });
        } else if (progress <= 0.64 && isHeroCopyHidden) {
          isHeroCopyHidden = false;
          gsap.to(heroCopyRef.current, { opacity: 1, duration: 0.2 });
        }

        // Hero Image Shrink Logic
        const heroImgProgress = Math.max(0, Math.min((progress - 0.71) / 0.29, 1));
        const heroImgWidth = gsap.utils.interpolate(window.innerWidth, 150, heroImgProgress);
        const heroImgHeight = gsap.utils.interpolate(window.innerHeight, 150, heroImgProgress);
        const heroImgBorderRadius = gsap.utils.interpolate(0, 10, heroImgProgress);

        gsap.set(".waabi-hero-img-container", {
          width: heroImgWidth,
          height: heroImgHeight,
          borderRadius: heroImgBorderRadius,
        });
      },
    });

    // About Columns Logic
    const aboutImgCols = [
      { id: ".waabi-col-1", y: -500 },
      { id: ".waabi-col-2", y: -250 },
      { id: ".waabi-col-3", y: -250 },
      { id: ".waabi-col-4", y: -500 },
    ];

    aboutImgCols.forEach(({ id, y }) => {
      gsap.to(id, {
        y,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="waabi-container relative bg-[#e3e3db] text-[#171412] selection:bg-accent selection:text-white">
      <section ref={heroRef} className="waabi-hero relative w-full h-screen overflow-hidden">
        <div className="waabi-hero-img-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-0 w-full h-full will-change-[transform,opacity,width,height]">
          <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="waabi-hero-header absolute inset-0 p-8 md:p-16 flex items-center justify-center z-10 text-white pointer-events-none will-change-transform text-center">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-normal leading-[0.9] tracking-tight max-w-[85%] uppercase">
            A study of motion unfolding inside a single frame
          </h1>
        </div>

        <div className="waabi-hero-copy absolute inset-0 p-8 md:p-16 flex items-center justify-center z-20 text-white pointer-events-none text-center">
          <h3 ref={heroCopyRef} className="text-[clamp(1.5rem,5vw,3rem)] font-normal leading-[1] tracking-tight max-w-[75%] opacity-0">
            The moment where stillness transforms into movement
          </h3>
        </div>
      </section>

      <section ref={aboutRef} className="waabi-about relative w-full min-h-screen py-[20vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="waabi-about-images w-full h-full flex justify-between items-center px-8 md:px-16 relative z-0">
          {IMAGES.cols.map((col, colIdx) => (
            <div key={colIdx} className={`waabi-imgs-col waabi-col-${colIdx + 1} flex flex-col gap-8 md:gap-16 will-change-transform`}
              style={{
                transform: colIdx === 0 || colIdx === 3 ? 'translateY(800px)' : 'translateY(400px)'
              }}>
              {col.map((img, imgIdx) => (
                <div key={imgIdx} className="waabi-img-wrapper w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-xl overflow-hidden shadow-lg">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="waabi-about-header absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] md:w-[45%]">
          <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-tight tracking-tight" style={{ fontFamily: 'var(--font-gebuk), sans-serif' }}>
            Design with
            <br />
            rupesh
          </h3>
        </div>
      </section>

    </div>
  );
}
