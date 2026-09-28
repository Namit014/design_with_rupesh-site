'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Smile, Mail } from 'lucide-react';
import Link from 'next/link';
import ScrollBatchGallery from "@/components/ui/scroll-batch-gallery";

// --- Shared Navigation Components ---
const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
    className="fixed top-[28px] left-[28px] z-50 group cursor-pointer"
  >
    <Link href="/">
      <div className="text-[26px] font-black leading-[1] tracking-tight text-white hover:opacity-80 transition-opacity">The Rebirth<br />Company</div>
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
    <NavButton icon={Briefcase} active href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} href="/contact" />
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
        timeZone: 'Asia/Kolkata'
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
        <span className="text-[26px] font-black leading-[1] tracking-tight text-white">The Rebirth<br />Company</span>
        <span className="text-[16px] font-medium opacity-60 mt-1 uppercase text-white">GLOBAL</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:block fixed bottom-[26px] right-[32px] z-50 text-[16px] font-normal opacity-75 pointer-events-none text-white"
      >
        Mumbai, India {time}
      </motion.div>
    </>
  );
};

export default function ShowcasePage() {
  return (
    <div className="relative w-full bg-black min-h-screen overflow-x-hidden">
      {/* UI Elements */}
      <FloatingNav />
      <Footer />

      <main className="relative z-10 pt-[10vh]">
        <div className="max-w-7xl mx-auto px-8 md:px-24 mb-12 text-center">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter text-white uppercase"
            >
                Selected Works
            </motion.h1>
        </div>
        
        <ScrollBatchGallery />
      </main>
    </div>
  );
}
