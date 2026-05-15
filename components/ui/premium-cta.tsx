'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function PremiumCta() {
  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-between py-12 px-6 overflow-hidden selection:bg-[#FF7722] selection:text-white">
      {/* --- Top Bar --- */}
      <div className="w-full flex justify-center z-10">
        <div className="flex items-center gap-2">
          {['IG', 'X', 'LK', 'BE'].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="px-4 py-2 border border-white/20 rounded-md text-[11px] font-bold text-white tracking-widest uppercase transition-colors flex items-center justify-center min-w-[50px]"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="flex flex-col items-center justify-center text-center max-w-7xl z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-white"
        >
          Make every <br />
          <span className="bg-gradient-to-r from-[#FF7722] via-[#FFAA77] to-[#FF7722] bg-clip-text text-transparent animate-gradient-x">
            pixel
          </span> pay for <br />
          <span className="bg-gradient-to-r from-[#FF7722] via-[#FFAA77] to-[#FF7722] bg-clip-text text-transparent animate-gradient-x">
            itself!
          </span>
        </motion.h2>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           className="mt-16 flex items-center gap-4 group cursor-pointer"
        >
          <span className="text-white text-[11px] font-black tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            Get your quote in 24h
          </span>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
            <Phone size={16} fill="black" className="text-black" />
          </div>
        </motion.div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="w-full flex justify-center z-10">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">
          ©2026 Brand Appart
        </span>
      </div>

      {/* --- Aesthetic Elements --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,119,34,0.06)_0%,transparent_55%)] pointer-events-none" />
      
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </section>
  );
}
