"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'join' | 'privacy' | 'terms'>('main');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'Job Application',
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      url: formData.get('url'),
      about: formData.get('about')
    };

    try {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setActiveTab('main');
      }, 3000);
    } catch (err) {
      alert('Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setTimeout(() => setActiveTab('main'), 500); // reset after close animation
        }}
        className="fixed left-[16px] bottom-[24px] md:left-[36px] md:bottom-[30px] z-[120] flex flex-col items-center gap-[6px] hover:opacity-70 transition-opacity mix-blend-difference text-white"
      >
        <span className="text-[12px] md:text-[14px] font-bold tracking-tight uppercase" style={{ fontFamily: "Youth, sans-serif" }}>
          {isOpen ? 'Close' : 'Menu'}
        </span>
        <div className="flex gap-[6px]">
          <div className="w-[4px] h-[4px] rounded-full bg-current"></div>
          <div className="w-[4px] h-[4px] rounded-full bg-current"></div>
          <div className="w-[4px] h-[4px] rounded-full bg-current"></div>
        </div>
      </button>

      {/* The Black Card Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-[90px] top-[20px] bottom-[20px] w-[500px] max-w-[calc(100vw-110px)] z-[110] bg-[#141414] rounded-[24px] p-12 flex flex-col shadow-2xl overflow-y-auto overflow-x-hidden"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'main' && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div className="flex flex-col mt-4">
                    {['Home', 'Work', 'About', 'Contact'].map((item) => (
                      <Link 
                        key={item} 
                        href={item === 'Home' ? '/' : item === 'Work' ? '/showcase' : `/${item.toLowerCase()}`}
                        className="text-[#999999] hover:text-[#E8E8E8] text-[48px] md:text-[72px] font-bold leading-[1.05] tracking-[-1px] md:tracking-[-3px] transition-colors"
                        style={{ fontFamily: 'Youth, Arial, sans-serif' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 mt-12">
                    <button
                      onClick={() => setActiveTab('join')}
                      className="text-left text-[#888888] hover:text-[#E8E8E8] text-[13px] font-bold tracking-[1px] uppercase transition-colors"
                      style={{ fontFamily: "PP Neue Montreal, sans-serif" }}
                    >
                      Join the team
                    </button>
                    <button
                      onClick={() => setActiveTab('privacy')}
                      className="text-left text-[#888888] hover:text-[#E8E8E8] text-[13px] font-bold tracking-[1px] uppercase transition-colors"
                      style={{ fontFamily: "PP Neue Montreal, sans-serif" }}
                    >
                      Privacy policy
                    </button>
                    <button
                      onClick={() => setActiveTab('terms')}
                      className="text-left text-[#888888] hover:text-[#E8E8E8] text-[13px] font-bold tracking-[1px] uppercase transition-colors"
                      style={{ fontFamily: "PP Neue Montreal, sans-serif" }}
                    >
                      Terms of services
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'join' && (
                <motion.div
                  key="join"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <button onClick={() => setActiveTab('main')} className="text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest mb-8 text-left transition-colors">
                    ← Back to Menu
                  </button>
                  <h2 className="text-white text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Youth, sans-serif' }}>Join the team</h2>
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center flex-1 text-center h-full gap-4 mt-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Application Received</h3>
                      <p className="text-white/60 text-sm max-w-[250px]">We'll be in touch soon. Thank you for your interest!</p>
                    </motion.div>
                  ) : (
                    <form className="flex flex-col gap-4 flex-1 mt-2" onSubmit={handleJoinSubmit}>
                      <input name="name" type="text" required placeholder="Full Name" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-medium" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }} />
                      <input name="email" type="email" required placeholder="Email Address" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-medium" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }} />
                      <input name="role" type="text" required placeholder="Desired Role" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-medium" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }} />
                      <input name="url" type="url" placeholder="Portfolio / LinkedIn URL" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-medium" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }} />
                      <textarea name="about" required placeholder="Tell us about yourself..." rows={3} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-white/40 transition-all font-medium resize-none" style={{ fontFamily: 'PP Neue Montreal, sans-serif' }}></textarea>
                      <button type="submit" disabled={isSubmitting} className="mt-4 bg-white text-black font-bold uppercase tracking-[2px] text-[13px] rounded-xl py-4 hover:scale-[1.02] hover:bg-white/90 transition-all shadow-lg shadow-white/5 disabled:opacity-50">
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full text-white/80"
                >
                  <button onClick={() => setActiveTab('main')} className="text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest mb-8 text-left transition-colors">
                    ← Back to Menu
                  </button>
                  <h2 className="text-white text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Youth, sans-serif' }}>Privacy Policy</h2>
                  <div className="flex-1 overflow-y-auto text-sm leading-relaxed pr-2 space-y-4 font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <p>Last updated: September 2026</p>
                    <p>At The Rebirth Company, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our website and services.</p>
                    <p>We only collect information that is necessary to provide our services and improve your experience. We do not sell your personal data to third parties.</p>
                    <p>If you have any questions about this policy, please contact us.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'terms' && (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full text-white/80"
                >
                  <button onClick={() => setActiveTab('main')} className="text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest mb-8 text-left transition-colors">
                    ← Back to Menu
                  </button>
                  <h2 className="text-white text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Youth, sans-serif' }}>Terms of Service</h2>
                  <div className="flex-1 overflow-y-auto text-sm leading-relaxed pr-2 space-y-4 font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <p>Last updated: September 2026</p>
                    <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of The Rebirth Company or its content suppliers and protected by international copyright laws.</p>
                    <p>We reserve the right to modify these terms at any time. Please review this page periodically for changes.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
