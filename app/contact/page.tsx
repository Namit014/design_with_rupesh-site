'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Smile, Mail } from 'lucide-react';
import Link from 'next/link';

// --- Shared Navigation Components ---
const Logo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
    className="fixed top-[28px] left-[28px] z-50 group cursor-pointer"
  >
    <Link href="/">
      <div className="relative w-[72px] h-[72px] rounded-full border border-accent/30 flex items-center justify-center bg-[#4F46E5] overflow-hidden">
        <div className="absolute inset-0 border-[1.5px] border-accent rounded-full scale-95 group-hover:scale-100 transition-transform duration-500" />
        <span className="text-white font-bold text-xl relative z-10">RK</span>
      </div>
    </Link>
  </motion.div>
);

const NavButton = ({ icon: Icon, active = false, href }: { icon: any, active?: boolean, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ y: -3, backgroundColor: 'rgba(23, 20, 18, 0.08)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-colors ${active ? 'bg-white shadow-sm' : 'bg-white/45 backdrop-blur-[2px]'
        }`}
    >
      <Icon size={20} className="md:w-6 md:h-6 text-[#171412]" strokeWidth={1.5} />
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
    className="fixed left-1/2 -translate-x-1/2 md:left-[36px] md:translate-x-0 bottom-[20px] md:top-1/2 md:-translate-y-1/2 z-50 flex flex-row md:flex-col gap-[12px] md:gap-[14px]"
  >
    <NavButton icon={Home} href="/" />
    <NavButton icon={Briefcase} href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} active href="/contact" />
  </motion.div>
);

const Footer = () => {
  const [time, setTime] = useState('1:47 AM');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Europe/Paris'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex fixed bottom-[26px] left-[32px] z-50 flex-col pointer-events-none"
      >
        <span className="text-[26px] font-black leading-[1] tracking-tight text-[#111111]">Brand<br />Apart</span>
        <span className="text-[16px] font-medium opacity-60 mt-1 uppercase text-[#111111]">FR</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:block fixed bottom-[26px] right-[32px] z-50 text-[16px] font-normal opacity-75 pointer-events-none text-[#111111]"
      >
        Paris, France {time}
      </motion.div>
    </>
  );
};

export default function PremiumContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#ececec] flex items-center justify-center p-6 overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* UI Elements */}
      <Logo />
      <FloatingNav />
      <Footer />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl rounded-[36px] bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden border border-white grid lg:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="relative p-10 lg:p-14 min-h-[700px] overflow-hidden bg-gradient-to-br from-[#fffaf7] via-[#fff2ea] to-[#ff8a3d]">
          {/* Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Glow Effect */}
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff7a1a]/30 blur-[140px] rounded-full" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Center Content */}
            <div className="max-w-md mx-auto text-center flex flex-col items-center justify-center h-full py-10">
              <h1 className="text-[#111111] text-5xl lg:text-6xl font-semibold leading-[1] tracking-tight">
                Let’s Build{' '}
                <span className="text-[#ff6b00]">Something Great</span>
              </h1>

              <p className="text-[#666666] text-lg mt-6 leading-relaxed max-w-sm">
                Tell us about your project and our team will reach out within 24 hours.
              </p>

              {/* Steps */}
              <div className="w-full mt-14 space-y-4">
                <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-[0_10px_40px_rgba(255,106,0,0.12)] border border-orange-100 transition-all duration-500 hover:scale-[1.02]">
                  <div className="w-8 h-8 rounded-full bg-[#ff6b00] text-white text-sm flex items-center justify-center font-semibold">
                    1
                  </div>
                  <span className="text-[#111111] font-semibold text-left">
                    Discuss your idea
                  </span>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-orange-100 rounded-[24px] p-5 flex items-center gap-4 transition-all duration-500 hover:bg-white hover:translate-x-1">
                  <div className="w-8 h-8 rounded-full bg-[#f3ebe6] text-[#666666] text-sm flex items-center justify-center font-semibold border border-orange-100">
                    2
                  </div>
                  <span className="text-[#666666] text-left">
                    Plan the experience
                  </span>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-orange-100 rounded-[24px] p-5 flex items-center gap-4 transition-all duration-500 hover:bg-white hover:translate-x-1">
                  <div className="w-8 h-8 rounded-full bg-[#f3ebe6] text-[#666666] text-sm flex items-center justify-center font-semibold border border-orange-100">
                    3
                  </div>
                  <span className="text-[#666666] text-left">
                    Launch your product
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative bg-[#ffffff]/80 backdrop-blur-xl p-10 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="mb-10">
              <h2 className="text-[#111111] text-5xl font-semibold tracking-tight">
                Contact Us
              </h2>

              <p className="text-[#666666] mt-3 text-lg leading-relaxed">
                Enter your details and we’ll connect with you.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <button className="h-14 rounded-2xl border border-orange-100 bg-white text-[#111111] font-medium transition-all duration-300 hover:border-[#ff6b00] hover:shadow-[0_0_30px_rgba(255,106,0,0.12)]">
                Email Us
              </button>

              <button className="h-14 rounded-2xl border border-orange-100 bg-white text-[#111111] font-medium transition-all duration-300 hover:border-[#ff6b00] hover:shadow-[0_0_30px_rgba(255,106,0,0.12)]">
                Schedule Call
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#222222] text-sm font-medium block mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="John"
                    className="w-full h-14 rounded-2xl bg-[#fafafa] border border-[#ececec] px-5 text-[#111111] placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-[#ff6b00] focus:shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                  />
                </div>

                <div>
                  <label className="text-[#222222] text-sm font-medium block mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full h-14 rounded-2xl bg-[#fafafa] border border-[#ececec] px-5 text-[#111111] placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-[#ff6b00] focus:shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#222222] text-sm font-medium block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-14 rounded-2xl bg-[#fafafa] border border-[#ececec] px-5 text-[#111111] placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-[#ff6b00] focus:shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                />
              </div>

              <div>
                <label className="text-[#222222] text-sm font-medium block mb-2">
                  Company
                </label>

                <input
                  type="text"
                  placeholder="Your Company"
                  className="w-full h-14 rounded-2xl bg-[#fafafa] border border-[#ececec] px-5 text-[#111111] placeholder:text-[#999999] outline-none transition-all duration-300 focus:border-[#ff6b00] focus:shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                />
              </div>

              <div>
                <label className="text-[#222222] text-sm font-medium block mb-2">
                  Project Details
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about your vision..."
                  className="w-full rounded-2xl bg-[#fafafa] border border-[#ececec] px-5 py-4 text-[#111111] placeholder:text-[#999999] outline-none resize-none transition-all duration-300 focus:border-[#ff6b00] focus:shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-16 rounded-2xl bg-[#ff6b00] text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(255,106,0,0.25)] mt-6"
              >
                Send Message
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-[#888888] text-sm">
              We usually respond within a few hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
