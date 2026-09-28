"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'join' | 'privacy' | 'terms'>('main');

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setTimeout(() => setActiveTab('main'), 500); // reset after close animation
        }}
        className="fixed left-[36px] bottom-[30px] z-[120] flex flex-col items-center gap-[6px] hover:opacity-70 transition-opacity mix-blend-difference text-white"
      >
        <span className="text-[14px] font-bold tracking-tight uppercase" style={{ fontFamily: "Youth, sans-serif" }}>
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
                        className="text-[#999999] hover:text-[#E8E8E8] text-[72px] font-bold leading-[1.05] tracking-[-3px] transition-colors"
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
                  <form className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors" />
                    <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors" />
                    <input type="text" placeholder="Desired Role" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors" />
                    <input type="url" placeholder="Portfolio / LinkedIn URL" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors" />
                    <textarea placeholder="Tell us about yourself..." rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors resize-none"></textarea>
                    <button type="button" className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl py-4 hover:scale-[1.02] transition-transform">
                      Submit Application
                    </button>
                  </form>
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
                  <div className="flex-1 overflow-y-auto text-sm leading-relaxed pr-4 space-y-4 font-sans">
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
                  <div className="flex-1 overflow-y-auto text-sm leading-relaxed pr-4 space-y-4 font-sans">
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
