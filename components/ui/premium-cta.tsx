'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function PremiumCta() {
  return (
    <section className="relative w-full min-h-screen bg-[#0B0B0B] text-[#F8F8F8] flex flex-col items-center justify-between py-12 px-6 md:px-12 selection:bg-white selection:text-black overflow-hidden">
      {/* --- Top Bar --- */}
      <div className="w-full flex justify-center z-20">
        <div className="flex items-center gap-2">
          {['IG', 'X', 'LK', 'BE'].map((social) => (
            <a
              key={social}
              href="#"
              className="px-4 py-2 border border-white/20 rounded-md text-[11px] font-bold text-white tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center min-w-[50px]"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* --- Main Hero Typography Poster Composition --- */}
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center justify-center flex-1 z-20 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center"
        >
          {/* Main Hero Headline */}
          <div
            className="flex flex-col items-center text-[#F8F8F8] font-bold select-none"
            style={{
              fontFamily: 'Youth, "Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: 'clamp(72px, 9vw, 126px)',
              lineHeight: 0.82,
              letterSpacing: '-3.8px',
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            {/* Lines 1 & 2: Optically aligned left edges */}
            <div className="flex flex-col items-start w-fit">
              <span className="whitespace-nowrap block">Make every</span>
              <span className="whitespace-nowrap block">pixel pay for</span>
            </div>

            {/* Line 3: Centered underneath lines 1 & 2 */}
            <span className="whitespace-nowrap block text-center">itself!</span>
          </div>

          {/* --- Sub CTA --- */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 flex items-center gap-3 cursor-pointer group"
          >
            <span className="text-[#F8F8F8] text-[11px] md:text-[13px] font-bold tracking-[2px] uppercase opacity-90 group-hover:opacity-100 transition-opacity">
              GET YOUR QUOTE IN 24H
            </span>
            <div className="w-9 h-9 rounded-full bg-[#F8F8F8] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
              <Phone size={14} className="fill-black text-black" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Bottom Footer Bar --- */}
      <div className="w-full flex justify-center z-20">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">
          ©2026 Brand Appart
        </span>
      </div>
    </section>
  );
}

