'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Calendar, Clock } from 'lucide-react';

interface BoldCtaSectionProps {
  headlineLines?: string[][];
  tagline?: React.ReactNode;
}

export default function BoldCtaSection({}: BoldCtaSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener('open-booking-modal', handleOpen);
    return () => window.removeEventListener('open-booking-modal', handleOpen);
  }, []);

  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-[#0B0B0B] text-[#F8F8F8] flex flex-col items-center justify-between pt-16 md:pt-24 selection:bg-white selection:text-black overflow-hidden">
        {/* --- Top Bar & Copyright --- */}
        <div className="w-full flex flex-col items-center gap-6 z-20">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group px-10 py-5 border border-white/20 rounded-full text-[14px] font-bold text-white tracking-[2px] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shadow-lg hover:scale-105"
          >
            <span>Book a free call</span>
            <Phone size={18} className="group-hover:fill-black" />
          </button>
          
          <span className="text-[11px] font-normal tracking-wide text-white/50">
            ©2026 The Rebirth
          </span>
        </div>

        {/* --- Huge Footer Text --- */}
        <div className="w-full flex-1 flex flex-col justify-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <div
              className="select-none text-center whitespace-nowrap"
              style={{
                fontFamily: 'Youth, system-ui, sans-serif',
                fontSize: 'clamp(3rem, 14vw, 400px)',
                lineHeight: 0.75,
                letterSpacing: '-0.06em',
                fontWeight: 900,
                color: '#151515',
                textTransform: 'uppercase',
              }}
            >
              The Rebirth
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Booking Modal Overlay --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#F3F0EA] text-[#171412] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Column */}
              <div className="w-full md:w-1/2 p-8 md:p-14 bg-white/50 border-r border-black/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[32px] md:text-[46px] leading-[0.95] tracking-[-2px] font-black uppercase" style={{ fontFamily: 'Youth, sans-serif' }}>
                    Let's discuss your next big thing.
                  </h3>
                  <p className="mt-6 text-[#171412]/60 font-medium text-lg leading-snug" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}>
                    Select a time to connect directly with our engineering team. We typically respond instantly to confirm your slot.
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://i.pravatar.cc/100?u=jeremy" alt="Jeremy" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">Namit</div>
                    <div className="text-[12px] text-[#171412]/60 font-semibold uppercase tracking-widest">Lead Engineer</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col">
                <h4 className="text-[12px] font-bold tracking-[2px] uppercase mb-8 flex items-center gap-3 text-black/40">
                  <Calendar size={16} /> Booking Details
                </h4>
                
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                    style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                    style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                    style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}
                  />
                  <input
                    type="date"
                    className="w-full p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold text-black/70"
                    style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}
                  />
                </div>

                <button className="mt-10 w-full bg-[#171412] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] hover:bg-black/80 transition-colors shadow-lg shadow-black/10">
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


