'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Smile, Mail, Plus } from 'lucide-react';
import Link from 'next/link';
import CinematicZoom from "@/components/ui/cinematic-zoom";
import FeaturedWorkSection from '@/components/ui/featured-work-section';
import ProjectShowcaseCard from "@/components/ui/project-showcase-card";
import EditorialThreeCardGrid from '@/components/ui/editorial-three-card-grid';
import EditorialGridReverse from '@/components/ui/editorial-grid-reverse';
import CircularGallery from '@/components/ui/circular-flip-card-gallery';
import CardFlow from '@/components/ui/cardflow';
import FoundersTestimonials from "@/components/ui/founders-testimonials";
import BoldCtaSection from '@/components/ui/bold-cta-section';

// --- Components ---

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
    className="fixed top-[28px] left-[28px] z-50 group cursor-pointer"
  >
    <div className="relative w-[72px] h-[72px] rounded-full border border-accent/30 flex items-center justify-center bg-[#4F46E5] overflow-hidden">
      <div className="absolute inset-0 border-[1.5px] border-accent rounded-full scale-95 group-hover:scale-100 transition-transform duration-500" />
      <span className="text-white font-bold text-xl relative z-10">RK</span>
    </div>
  </motion.div>
);

const NavButton = ({ icon: Icon, active = false, href }: { icon: any, active?: boolean, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ y: -3, backgroundColor: 'rgba(23, 20, 18, 0.08)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-colors ${active ? 'bg-[#F3F0EA] shadow-sm' : 'bg-white/45 backdrop-blur-[2px]'
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
    <NavButton icon={Home} active href="/" />
    <NavButton icon={Briefcase} href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} href="/contact" />
  </motion.div>
);

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.8 }}
    className="fixed right-[38px] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
  >
    <div className="relative">
      <div className="w-[14px] h-[14px] rounded-full border border-black/30 flex items-center justify-center">
        <div className="w-[4px] h-[4px] rounded-full bg-black/60" />
      </div>
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[1px] h-[220px] bg-black/15" />
    </div>
  </motion.div>
);

const TopRightButton = () => (
  <motion.button
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
    className="fixed top-[30px] right-[30px] z-50 bg-[#171412] text-white px-[26px] h-[52px] rounded-full font-bold text-[14px] tracking-[-0.3px] flex items-center justify-center uppercase"
  >
    Book a call now
  </motion.button>
);

const FloatingDiscoveryPill = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="hidden md:flex fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#F3F0EA]/95 backdrop-blur-md border border-black/5 pl-8 pr-2 py-2 rounded-full items-center gap-8 shadow-2xl pointer-events-auto"
  >
    <span className="text-[#171412] font-semibold text-[1.1rem] tracking-tight">Book a free discovery call</span>
    <button className="bg-[#171412] text-white px-6 py-3 rounded-full flex items-center gap-3 font-bold text-[0.9rem] uppercase transition-transform hover:scale-[1.02]">
      <span>Book a call</span>
      <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/100?u=jeremy" alt="Jeremy" className="w-full h-full object-cover" />
      </div>
      <div className="w-[1.5rem] h-[1.5rem] bg-white rounded-full flex items-center justify-center text-[#171412]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
    </button>
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
        className="hidden md:flex fixed bottom-[26px] left-[32px] z-50 flex-col"
      >
        <span className="text-[26px] font-black leading-[1] tracking-tight">Brand<br />Apart</span>
        <span className="text-[16px] font-medium opacity-60 mt-1 uppercase">FR</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:block fixed bottom-[26px] right-[32px] z-50 text-[16px] font-normal opacity-75"
      >
        Paris, France {time}
      </motion.div>
    </>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <div className="relative w-full bg-[#F3F0EA] selection:bg-accent selection:text-white overflow-x-hidden">
      {/* UI Elements */}
      <Logo />
      <TopRightButton />
      <FloatingNav />
      <ScrollIndicator />
      <Footer />
      <FloatingDiscoveryPill />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-12 pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center max-w-[1400px] w-full"
        >
          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="text-[52px] md:text-[92px] lg:text-[140px] font-black leading-[0.82] tracking-[-2px] md:tracking-[-6px] lg:tracking-[-7px] text-[#171412] max-w-[1200px]"
          >
            The design
            <span className="relative inline-flex items-center ml-2">
              <span className="absolute -top-[0.1em] md:-top-[0.05em] lg:-top-[0.02em] inline-flex items-center justify-center border-[4px] md:border-[6px] lg:border-[8px] border-accent text-accent rounded-full w-[40px] h-[40px] md:w-[64px] md:h-[64px] lg:w-[92px] lg:h-[92px] text-[20px] md:text-[36px] lg:text-[54px] font-black">
                C
              </span>
              <span className="opacity-0">C</span>
            </span>
            <br />
            partner for top-tier companies
          </motion.h1>

          {/* Trusted Logos */}
          <motion.div
            variants={item}
            className="mt-[42px] flex flex-wrap justify-center items-center gap-[42px] opacity-45 grayscale"
          >
            <div className="h-[22px] font-black text-xl tracking-tighter">FORBES</div>
            <div className="h-[22px] font-black text-xl tracking-tighter italic">PMU</div>
            <div className="h-[22px] font-black text-xl tracking-tighter">BNP PARIBAS</div>
            <div className="h-[22px] font-black text-xl tracking-tighter">MISTRAL</div>
          </motion.div>

          {/* Supporting Paragraph */}
          <motion.p
            variants={item}
            className="mt-[80px] md:mt-[100px] lg:mt-[120px] text-[18px] md:text-[24px] lg:text-[32px] font-normal leading-[1.15] tracking-[-1px] text-[#171412] max-w-[780px]"
          >
            We help funded startups ship iconic brands, conversion-ready sites, and investor-proof decks.
          </motion.p>

          {/* Bottom CTA */}
          <motion.div
            variants={item}
            className="mt-[36px] flex items-center gap-3 group cursor-pointer"
          >
            <span className="text-[20px] font-bold tracking-tight uppercase border-b-2 border-transparent group-hover:border-black transition-all duration-300">
              Book an intro call
            </span>
            <div className="flex -space-x-2">
              <div className="w-[32px] h-[32px] rounded-full bg-zinc-300 border-2 border-[#F3F0EA] overflow-hidden">
                <img src="https://i.pravatar.cc/100?u=1" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-[32px] h-[32px] rounded-full bg-[#171412] border-2 border-[#F3F0EA] flex items-center justify-center text-white">
                <Plus size={14} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Cinematic Animation Section */}
      <CinematicZoom />

      <FeaturedWorkSection />
      {/* TOP LARGE SHOWCASE CARD */}
      <ProjectShowcaseCard video="https://player.vimeo.com/video/1112225239?autopause=0&controls=0&loop=1&background=1&app_id=122963" />

      {/* 3 CARD EDITORIAL GRID */}
      <EditorialThreeCardGrid />

      {/* TOP LARGE SHOWCASE CARD */}
      <ProjectShowcaseCard image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2000&auto=format&fit=crop" />

      {/* REVERSED EDITORIAL GRID */}
      <EditorialGridReverse />

      <CircularGallery />

      <CardFlow />

      <FoundersTestimonials />

      {/* Premium CTA Section */}
      <BoldCtaSection />


      {/* Grid Overlay for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-5"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
