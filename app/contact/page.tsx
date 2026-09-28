'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Smile, Mail, X, Calendar } from 'lucide-react';
import Link from 'next/link';

// --- Shared Navigation Components ---
const NavButton = ({ icon: Icon, active = false, href }: { icon: any, active?: boolean, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ y: -3, backgroundColor: 'rgba(23, 20, 18, 0.08)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-colors shadow-sm ${active ? 'bg-[#111111] text-white' : 'bg-white border border-[#111111]/10 text-[#111111]/60'
        }`}
    >
      <Icon size={20} className="md:w-6 md:h-6" strokeWidth={2} />
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
};

const FloatingNav = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
    className="fixed left-1/2 -translate-x-1/2 md:left-[36px] md:translate-x-0 bottom-[20px] md:top-1/2 md:-translate-y-1/2 z-[100] flex flex-row md:flex-col gap-[12px] md:gap-[14px]"
  >
    <NavButton icon={Home} href="/" />
    <NavButton icon={Briefcase} href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} active href="/contact" />
  </motion.div>
);

export default function EditorialContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'Booking',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
    };

    try {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Booking saved locally to submissions.json!');
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to submit booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111111] overflow-x-hidden selection:bg-[#111111] selection:text-white relative pl-0 md:pl-[120px]">
      {/* UI Elements */}
      <FloatingNav />

      {/* Main Content */}
      <div className="pt-32 md:pt-48 pb-20 max-w-[1800px] mx-auto w-full relative">
        
        {/* Top Header Section */}
        <div className="px-8 md:px-24 lg:px-32 flex flex-col mb-20 md:mb-32 md:pr-[350px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase text-sm font-bold tracking-widest mb-4">A Question ?</p>
            <h1 
              className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-[-0.04em] uppercase -ml-1 md:-ml-2 lg:-ml-3" 
              style={{ fontFamily: "Youth, sans-serif" }}
            >
              CONTACT US
            </h1>
            
            <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 text-[#111111]/70 font-medium tracking-wide">
              <a href="mailto:namit@therebirth.tech" className="flex items-center gap-2 hover:text-[#111111] transition-colors">
                <Mail size={16} />namit@therebirth.tech
              </a>
              <a href="mailto:built@rebirth.tech" className="flex items-center gap-2 hover:text-[#111111] transition-colors">
                <Mail size={16} />built@rebirth.tech
              </a>
            </div>

            <div className="mt-12">
              <div 
                onClick={() => setIsModalOpen(true)}
                className="inline-block border border-[#111111] rounded-full px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              >
                Book a Call
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Circle (Visible on large screens) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => setIsModalOpen(true)}
          className="hidden lg:flex absolute right-24 top-40 w-[300px] h-[300px] bg-[#171412] rounded-full flex-col items-center justify-center text-center p-12 text-white hover:scale-105 transition-transform cursor-pointer shadow-2xl"
        >
          <p className="text-sm leading-relaxed mb-6 font-medium">Are you a visionary founder and want to know more about our engineering process?</p>
          <span className="uppercase text-xs font-bold border-b border-white pb-1 tracking-widest">Book A Call</span>
        </motion.div>

        {/* Bottom Form Section */}
        <div className="w-full mt-32 flex flex-col border-t border-[#111111]/20">
          


          {/* Row 1: Last name */}
          <div className="w-full border-b border-[#111111]/20 flex flex-col md:flex-row">
            <div className="hidden md:block w-full md:w-1/2"></div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <input 
                type="text" 
                placeholder="Last name" 
                className="w-full bg-transparent py-6 md:py-10 px-8 text-sm md:text-base outline-none text-[#111111] placeholder:text-[#111111]/60 focus:bg-[#f9f9f9] transition-colors" 
              />
            </div>
          </div>

          {/* Row 2: DO YOU HAVE / First name */}
          <div className="w-full border-b border-[#111111]/20 flex flex-col md:flex-row items-stretch">
            <div className="hidden md:flex w-1/2 px-8 md:px-16 lg:px-24 items-center">
              <h2 className="text-[7vw] lg:text-[4.5vw] font-black leading-[0.85] tracking-tight uppercase whitespace-nowrap" style={{ fontFamily: "Youth, sans-serif" }}>
                DO YOU HAVE
              </h2>
            </div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <input 
                type="text" 
                placeholder="First name" 
                className="w-full h-full bg-transparent py-6 md:py-10 px-8 text-sm md:text-base outline-none text-[#111111] placeholder:text-[#111111]/60 focus:bg-[#f9f9f9] transition-colors" 
              />
            </div>
          </div>

          {/* Row 3: A [image] / Email */}
          <div className="w-full border-b border-[#111111]/20 flex flex-col md:flex-row items-stretch">
            <div className="hidden md:flex w-1/2 px-8 md:px-16 lg:px-24 items-center">
              <h2 className="text-[7vw] lg:text-[4.5vw] font-black leading-[0.85] tracking-tight uppercase flex items-center whitespace-nowrap" style={{ fontFamily: "Youth, sans-serif" }}>
                A 
                <div className="inline-block w-[1.8em] h-[0.7em] mx-4 bg-gray-200 overflow-hidden relative top-[-0.05em] align-middle">
                  <img src="https://i.pinimg.com/1200x/85/cd/51/85cd51c485eaca101419cb3e9eddad3a.jpg" className="w-full h-full object-cover grayscale opacity-80" alt="texture" />
                </div>
              </h2>
            </div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full h-full bg-transparent py-6 md:py-10 px-8 text-sm md:text-base outline-none text-[#111111] placeholder:text-[#111111]/60 focus:bg-[#f9f9f9] transition-colors" 
              />
            </div>
          </div>

          {/* Row 4: QUESTION ? / Subject */}
          <div className="w-full border-b border-[#111111]/20 flex flex-col md:flex-row items-stretch">
            <div className="hidden md:flex w-1/2 px-8 md:px-16 lg:px-24 items-center">
              <h2 className="text-[7vw] lg:text-[4.5vw] font-black leading-[0.85] tracking-tight uppercase whitespace-nowrap" style={{ fontFamily: "Youth, sans-serif" }}>
                QUESTION ?
              </h2>
            </div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full h-full bg-transparent py-6 md:py-10 px-8 text-sm md:text-base outline-none text-[#111111] placeholder:text-[#111111]/60 focus:bg-[#f9f9f9] transition-colors" 
              />
            </div>
          </div>

          {/* Row 5: Message */}
          <div className="w-full border-b border-[#111111]/20 flex flex-col md:flex-row items-stretch">
            <div className="hidden md:block w-1/2"></div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <textarea 
                placeholder="Message" 
                rows={3}
                className="w-full h-full bg-transparent py-6 md:py-10 px-8 text-sm md:text-base outline-none text-[#111111] placeholder:text-[#111111]/60 resize-none focus:bg-[#f9f9f9] transition-colors" 
              />
            </div>
          </div>

          {/* Row 6: SEND */}
          <div className="w-full flex flex-col md:flex-row">
            <div className="hidden md:block w-1/2"></div>
            <div className="w-full md:w-1/2 md:border-l border-[#111111]/10">
              <button className="w-full text-left py-6 md:py-10 px-8 text-sm md:text-base font-bold tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-colors">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Booking Modal Overlay --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F3F0EA] text-[#171412] rounded-[24px] flex flex-col md:flex-row shadow-2xl"
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
              <div className="w-full md:w-1/2 p-6 md:p-14 bg-white/50 border-r border-black/5 flex flex-col justify-between shrink-0">
                <div>
                  <h3 className="text-[28px] md:text-[46px] leading-[0.95] tracking-[-2px] font-black uppercase" style={{ fontFamily: 'Youth, sans-serif' }}>
                    Let's discuss your next big thing.
                  </h3>
                  <p className="mt-4 md:mt-6 text-[#171412]/60 font-medium text-[15px] md:text-lg leading-snug">
                    Select a time to connect directly with our engineering team. We typically respond instantly to confirm your slot.
                  </p>
                </div>
                
                <div className="mt-8 md:mt-12 flex items-center gap-4 hidden md:flex">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://i.pravatar.cc/100?u=namit" alt="Namit" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">Namit Jadhav</div>
                    <div className="text-[12px] text-[#171412]/60 font-semibold uppercase tracking-widest">Cofounder & CEO</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col shrink-0">
                <h4 className="text-[11px] md:text-[12px] font-bold tracking-[2px] uppercase mb-4 md:mb-8 flex items-center gap-3 text-black/40">
                  <Calendar size={16} /> Booking Details
                </h4>
                
                <form className="flex flex-col gap-3 md:gap-4" onSubmit={handleBookingSubmit}>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full p-3 md:p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full p-3 md:p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full p-3 md:p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold"
                  />
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full p-3 md:p-4 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-semibold text-black/70"
                  />

                  <button type="submit" disabled={isSubmitting} className="mt-6 md:mt-10 w-full bg-[#171412] text-white py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] hover:bg-black/80 transition-colors shadow-lg shadow-black/10 shrink-0 disabled:opacity-50">
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
