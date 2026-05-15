'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BoldCtaSectionProps {
  headlineLines?: string[][];
  tagline?: React.ReactNode;
}

const DEFAULT_HEADLINE_LINES = [
  ['Make', 'every'],
  ['pixel', 'pay', 'for'],
  ['itself!'],
];

export default function BoldCtaSection({
  headlineLines = DEFAULT_HEADLINE_LINES,
}: BoldCtaSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mousePos = useRef({ x: -1000, y: -1000 }); // Start far away
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  const textContainerRef = useRef<HTMLDivElement>(null);

  // Use Scroll progress for background transition (matching Circular Gallery)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to colors: 
  // 0% -> 35% : Transition to Black
  // 35% -> 55% : Maintain Black
  // 55% -> 100% : Transition to White
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    ["#F3F0EA", "#171412", "#171412", "#F3F0EA"]
  );

  // Transition text color for the background layer
  const dimmedTextColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    ["rgba(23, 20, 18, 0.05)", "rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.05)", "rgba(23, 20, 18, 0.05)"]
  );

  // Control visibility of spotlight effects based on darkness
  const effectsOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    if (!container || !textContainer) return;

    const updatePosition = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      container.style.setProperty('--mouse-x', `${currentPos.current.x}px`);
      container.style.setProperty('--mouse-y', `${currentPos.current.y}px`);

      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    rafRef.current = requestAnimationFrame(updatePosition);

    container.addEventListener('mousemove', handleMouseMove);
    textContainer.addEventListener('mouseenter', handleMouseEnter);
    textContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      textContainer.removeEventListener('mouseenter', handleMouseEnter);
      textContainer.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ backgroundColor }}
      className={`bcta-root relative w-full min-h-[110vh] flex flex-col items-center justify-between overflow-hidden py-12 px-8 md:px-16 transition-colors duration-300 ${isHovered ? 'cursor-none' : 'cursor-default'}`}
    >
      {/* Background Static Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} 
      />

      {/* --- Top Bar --- */}
      <div className="w-full flex justify-center z-50">
        <motion.div style={{ opacity: effectsOpacity }} className="flex items-center gap-2">
          {['IG', 'X', 'LK', 'BE'].map((social) => (
            <a key={social} href="#" className="px-4 py-2 border border-white/20 rounded-md text-[11px] font-bold text-white tracking-widest uppercase hover:bg-white/10 transition-colors">
              {social}
            </a>
          ))}
        </motion.div>
      </div>

      {/* --- The Reveal Layer (Spotlight Mask) --- */}
      <motion.div 
        className="spotlight-mask absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{ 
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden'
        }} 
      />

      {/* --- The Glow Layer (Atmospheric Bloom) --- */}
      <motion.div 
        className="spotlight-glow absolute z-30 pointer-events-none transition-opacity duration-500"
        style={{ 
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden'
        }} 
      />

      {/* --- Background Content (Dimmed) --- */}
      <div ref={textContainerRef} className="relative z-10 flex flex-col items-center text-center max-w-7xl">
        <div className="bcta-headline flex flex-col items-center gap-2">
          {headlineLines.map((line, lineIdx) => (
            <div key={lineIdx} className="flex flex-wrap justify-center gap-[0.2em] leading-[0.85]">
              {line.map((word, wordIdx) => (
                <motion.span 
                  key={wordIdx}
                  style={{ 
                    fontFamily: "'Arial Black', sans-serif",
                    color: dimmedTextColor
                  }}
                  className="text-[clamp(3.5rem,12vw,10rem)] font-black tracking-tighter select-none"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- Front Layer (Revealed Text & Sub-CTA) --- */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center"
           style={{
             maskImage: 'radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, black 40%, transparent 100%)',
             WebkitMaskImage: 'radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, black 40%, transparent 100%)'
           }}>
        <div className="flex flex-col items-center text-center max-w-7xl pt-12">
          <div className="flex flex-col items-center gap-2">
            {headlineLines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap justify-center gap-[0.2em] leading-[0.85]">
                {line.map((word, wordIdx) => (
                  <span 
                    key={wordIdx}
                    className="text-[clamp(3.5rem,12vw,10rem)] font-black tracking-tighter text-white select-none"
                    style={{ 
                      fontFamily: "'Arial Black', sans-serif",
                      textShadow: '0 0 30px rgba(255, 90, 31, 0.5), 0 0 60px rgba(255, 123, 0, 0.3)'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex items-center gap-4">
            <span className="text-white text-[11px] font-black tracking-[0.2em] uppercase">
              Get your quote in 24h
            </span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
               <div className="w-3 h-3 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="w-full flex justify-center z-50">
        <motion.span 
          style={{ opacity: effectsOpacity }}
          className="text-[10px] font-bold tracking-widest uppercase text-white/30"
        >
          ©2026 Brand Appart
        </motion.span>
      </div>

      <style jsx>{`
        .spotlight-mask {
          background: rgba(0, 0, 0, 0.95);
          mask-image: radial-gradient(
            circle 220px at var(--mouse-x) var(--mouse-y),
            transparent 0%,
            transparent 35%,
            black 75%
          );
          -webkit-mask-image: radial-gradient(
            circle 220px at var(--mouse-x) var(--mouse-y),
            transparent 0%,
            transparent 35%,
            black 75%
          );
        }

        .spotlight-glow {
          width: 500px;
          height: 500px;
          left: calc(var(--mouse-x) - 250px);
          top: calc(var(--mouse-y) - 250px);
          background: radial-gradient(
            circle,
            rgba(255, 120, 0, 0.45) 0%,
            rgba(255, 90, 31, 0.25) 30%,
            rgba(255, 179, 71, 0.12) 55%,
            transparent 75%
          );
          filter: blur(50px);
          mix-blend-mode: screen;
          will-change: left, top;
        }

        @media (max-width: 768px) {
          .spotlight-mask, .spotlight-glow {
            display: none;
          }
          .bcta-root { cursor: auto; }
          .text-white\/5 { color: rgba(255, 255, 255, 0.8) !important; }
        }
      `}</style>
    </motion.section>
  );
}
