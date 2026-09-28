'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Smile, Mail, Plus } from 'lucide-react';
import Link from 'next/link';
import BoldCtaSection from '@/components/ui/bold-cta-section';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import WaabiScroll from '@/components/ui/waabi-scroll';

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
    <NavButton icon={Briefcase} href="/showcase" />
    <NavButton icon={Smile} active href="/about" />
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
      {/* Rebirth Logo removed from here as it should only be on the homepage */}

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

// --- About Page Main ---

export default function AboutPage() {
  return (
    <div className="relative w-full bg-[#171412] selection:bg-accent selection:text-white min-h-screen overflow-x-hidden overflow-y-visible">
      {/* Navigation & UI */}
      <TopRightButton />
      <FloatingNav />
      <ScrollIndicator />
      <Footer />

      <FlowArt aria-label="Présentation Flow Art">
        <FlowSection aria-label="Qui nous sommes" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Who we are</p>
          <hr className="my-[2vw] border-none border-t border-black opacity-20" />
          <div>
            <h1
              className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight"
            >
              Digital
              <br />
              Rebirth
              <br />
              Design
            </h1>
          </div>
          <hr className="my-[2vw] border-none border-t border-black opacity-20" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            We partner with visionary founders to build category-defining brands and digital experiences.
            Design isn't just how it looks, it's how it works.
          </p>
        </FlowSection>

        <FlowSection aria-label="La mission" style={{ backgroundColor: '#000', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — The mission</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2
              className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight"
            >
              Code
              <br />
              Meets
              <br />
              Design
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            We bridge the gap between stunning visual aesthetics and bulletproof engineering. 
            We build platforms that look beautiful and run blazingly fast.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Performance</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Every millisecond counts. We optimize architectures for peak performance and scale.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Aesthetics</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Premium, category-defining design systems that set you apart from the competition.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Conversion</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                We engineer user journeys that transform passive visitors into active believers.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="Comment ça marche" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — Capabilities</p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div>
            <h2
              className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight text-[#171412]"
            >
              Show
              <br />
              Up.
              <br />
              Stand
              <br />
              Out.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-[#171412]">
            End-to-end execution. From the first wireframe to the final deployment, we own the entire lifecycle of your digital product.
          </p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#171412]">01 — Strategy</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75 text-[#171412]">
                Deep dives into your brand DNA to uncover what makes you truly unique.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#171412]">02 — Creative</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75 text-[#171412]">
                Iconic brand identities and digital interfaces that capture attention.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#171412]">03 — Delivery</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75 text-[#171412]">
                High-performance code and systems that scale with your ambitions.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="La vision" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The vision</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2
              className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight"
            >
              Build
              <br />
              To
              <br />
              Scale
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            We're not just building websites; we're architecting digital ecosystems designed for massive scale. 
            The internet is evolving, and we make sure you lead the charge.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Innovation</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Leveraging the bleeding edge of web technologies to future-proof your digital presence.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Growth</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Scalable architectures that seamlessly handle millions of concurrent users.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Partnership</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                We act as your dedicated engineering arm, completely invested in your long-term success.
              </p>
            </div>
          </div>
        </FlowSection>
      </FlowArt>

      <WaabiScroll />

      {/* Bottom CTA */}
      <div className="relative z-20">
        <BoldCtaSection />
      </div>
    </div>
  );
}
