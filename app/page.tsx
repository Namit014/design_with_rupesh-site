'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Home, Briefcase, Smile, Mail, Plus, Building, Target, FileText, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import CinematicZoom from "@/components/ui/cinematic-zoom";
import FeaturedWorkSection from '@/components/ui/featured-work-section';
import ProjectShowcaseCard from "@/components/ui/project-showcase-card";
import EditorialThreeCardGrid from '@/components/ui/editorial-three-card-grid';
import EditorialGridReverse from '@/components/ui/editorial-grid-reverse';
import CircularGallery from '@/components/ui/circular-flip-card-gallery';
import CardFlow from '@/components/ui/cardflow';
import Services from '@/components/ui/services';
import FoundersTestimonials from "@/components/ui/founders-testimonials";
import BoldCtaSection from '@/components/ui/bold-cta-section';


// --- Components ---

const Logo = ({ hidden }: { hidden?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
    className={`fixed top-[28px] left-[28px] z-50 group cursor-pointer ${hidden ? 'pointer-events-none' : ''}`}
  >
    <div className="text-[26px] font-black leading-[1] tracking-tight text-[#171412]">The Rebirth<br />Company</div>
  </motion.div>
);

const NavButton = ({ icon: Icon, active = false, href }: { icon: any, active?: boolean, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ y: -3, backgroundColor: 'rgba(23, 20, 18, 0.12)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-colors shadow-sm ${active ? 'bg-[#111111] text-white' : 'bg-[#E5E3DC] text-[#171412]/60 hover:bg-[#111111] hover:text-white'
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

const FloatingNav = ({ hidden }: { hidden?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: hidden ? 0 : 1, x: hidden ? -40 : 0 }}
    transition={{ duration: 0.8, delay: hidden ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as any }}
    className={`fixed left-1/2 -translate-x-1/2 md:left-[36px] md:translate-x-0 bottom-[20px] md:top-1/2 md:-translate-y-1/2 z-50 flex flex-row md:flex-col gap-[12px] md:gap-[14px] ${hidden ? 'pointer-events-none' : ''}`}
  >
    <NavButton icon={Home} active href="/" />
    <NavButton icon={Briefcase} href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} href="/contact" />
  </motion.div>
);

const ScrollIndicator = ({ hidden }: { hidden?: boolean }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 1, delay: hidden ? 0 : 0.8 }}
      className="fixed right-[38px] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
    >
      <div className="relative h-[220px] w-[14px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[220px] bg-black/15" />
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full border border-black/30 bg-[#F3F0EA] flex items-center justify-center z-10"
        >
          <div className="w-[4px] h-[4px] rounded-full bg-black/60" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const TopRightButton = ({ hidden }: { hidden?: boolean }) => (
  <motion.button
    onClick={() => window.dispatchEvent(new Event('open-booking-modal'))}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
    whileHover={{ scale: hidden ? 1 : 1.03 }}
    transition={{ duration: 0.6, delay: hidden ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] as any }}
    className={`fixed top-[30px] right-[30px] z-50 bg-[#171412] text-white px-[26px] h-[52px] rounded-full font-bold text-[14px] tracking-[-0.3px] flex items-center justify-center uppercase ${hidden ? 'pointer-events-none' : ''}`}
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

const Footer = ({ hidden }: { hidden?: boolean }) => {
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
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 1, delay: hidden ? 0 : 1 }}
        className={`hidden md:block fixed bottom-[26px] right-[32px] z-50 text-[16px] font-normal opacity-75 ${hidden ? 'pointer-events-none' : ''}`}
      >
        Mumbai, India {time}
      </motion.div>
    </>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { margin: "-35% 0px -35% 0px" });

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
      <Logo hidden={isServicesInView} />
      <TopRightButton hidden={isServicesInView} />
      <FloatingNav hidden={isServicesInView} />
      <ScrollIndicator hidden={isServicesInView} />
      <Footer hidden={isServicesInView} />
      {/* <FloatingDiscoveryPill /> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 md:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center max-w-[1400px] w-full -mt-16 md:-mt-24"
        >
          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="font-bold text-[#171412] max-w-[1200px] text-center"
            style={{
              fontFamily: 'Youth, Arial, sans-serif',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 700,
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            The digital
            <span className="inline-flex items-center ml-2 text-[#FF7A22]" style={{ verticalAlign: 'middle', transform: 'translateY(-0.05em)' }}>
              <svg viewBox="0 0 100 100" className="w-[0.55em] h-[0.55em] fill-current">
                <path fillRule="evenodd" clipRule="evenodd" d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM17 50C17 31.7746 31.7746 17 50 17C68.2254 17 83 31.7746 83 50C83 68.2254 68.2254 83 50 83C31.7746 83 17 68.2254 17 50ZM67.5707 33.1557C63.2625 29.548 57.3871 27.5 50 27.5C37.5736 27.5 27.5 37.5736 27.5 50C27.5 62.4264 37.5736 72.5 50 72.5C57.3871 72.5 63.2625 70.452 67.5707 66.8443C69.8394 64.9452 69.9678 61.5428 67.8924 59.4589C65.8118 57.3697 62.3807 57.4834 60.1583 59.3908C57.5721 61.611 54.1206 63 50 63C42.8203 63 37 57.1797 37 50C37 42.8203 42.8203 37 50 37C54.1206 37 57.5721 38.389 60.1583 40.6092C62.3807 42.5166 65.8118 42.6303 67.8924 40.5411C69.9678 38.4572 69.8394 35.0548 67.5707 33.1557Z" />
              </svg>
            </span>
            <br className="hidden md:block" />
            partner for top-tier companies
          </motion.h1>

          {/* Trusted Logos removed as requested */}

          {/* Supporting Paragraph */}
          <motion.p
            variants={item}
            className="mt-[60px] md:mt-[100px] lg:mt-[120px] text-[18px] md:text-[24px] lg:text-[32px] font-normal leading-[1.3] md:leading-[1.1] tracking-tight md:tracking-[-1px] text-[#171412] max-w-[780px]"
          >
            We help startups to ship iconic<br className="hidden md:block" />
            web apps, conversion-ready sites, and<br className="hidden md:block" />
            blazing-fast software.
          </motion.p>

          {/* Bottom CTA */}
          <motion.div
            variants={item}
            onClick={() => window.dispatchEvent(new Event('open-booking-modal'))}
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
      <ProjectShowcaseCard video="/trb2.mp4" />

      {/* 3 CARD EDITORIAL GRID */}
      <EditorialThreeCardGrid />

      {/* TOP LARGE SHOWCASE CARD */}
      <ProjectShowcaseCard image="/image copy.png" title="LABS.YANTRAA.TECH" />

      {/* REVERSED EDITORIAL GRID */}
      <EditorialGridReverse />

      <div ref={servicesRef}>
        <Services />
      </div>

      {/* <CardFlow /> */}

      <FoundersTestimonials />

      {/* Premium CTA Section */}
      <BoldCtaSection />


      {/* Grid Overlay for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-5"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
