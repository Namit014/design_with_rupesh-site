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
        className="hidden md:flex fixed bottom-[26px] left-[32px] z-50 flex flex-col pointer-events-none"
      >
        <span className="text-[26px] font-black leading-[1] tracking-tight text-white">Brand<br />Apart</span>
        <span className="text-[16px] font-medium opacity-60 mt-1 uppercase text-white">FR</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:block fixed bottom-[26px] right-[32px] z-50 text-[16px] font-normal opacity-75 pointer-events-none text-white"
      >
        Paris, France {time}
      </motion.div>
    </>
  );
};

// --- About Page Main ---

export default function AboutPage() {
  return (
    <div className="relative w-full bg-[#171412] selection:bg-accent selection:text-white min-h-screen overflow-x-hidden overflow-y-visible">
      {/* Navigation & UI */}
      <Logo />
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
              Result
              <br />
              Driven
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
              Art
              <br />
              First
              <br />
              Always
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            A global community built for artists, by artists. We're rewriting the rules of how
            creative work gets seen, shared, and valued.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Discovery</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Human-curated collections that put real eyes on real art. No algorithms deciding your
                fate.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Community</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Find collaborators, mentors, and fellow creatives who push your work forward.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Value</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Fair pricing. Transparent commissions. Artists keep what they earn. Always.
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
            Three steps. Zero complexity. Your creative career starts moving the moment you sign up.
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
              Future
              <br />
              Of
              <br />
              Design
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            We're not just building a platform. We're building a movement.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">10K+</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Artists from 80 countries already shaping the future with us.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">$2M+</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Paid directly to creators in our first year. Zero hidden fees.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">100%</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                Artist-owned. Every decision we make starts with the creator.
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
