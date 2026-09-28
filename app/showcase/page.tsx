'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Smile, Mail } from 'lucide-react';
import Link from 'next/link';
import ProjectShowcaseCard from "@/components/ui/project-showcase-card";

// --- Shared Navigation Components ---

const NavButton = ({ icon: Icon, active = false, href }: { icon: any, active?: boolean, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ y: -3, backgroundColor: 'rgba(23, 20, 18, 0.08)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-colors shadow-sm ${active ? 'bg-[#111111] text-white' : 'bg-white border border-[#111111]/10 text-[#111111]/60 hover:bg-[#111111] hover:text-white'
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
    className="fixed left-1/2 -translate-x-1/2 md:left-[36px] md:translate-x-0 bottom-[20px] md:top-1/2 md:-translate-y-1/2 z-50 flex flex-row md:flex-col gap-[12px] md:gap-[14px]"
  >
    <NavButton icon={Home} href="/" />
    <NavButton icon={Briefcase} active href="/showcase" />
    <NavButton icon={Smile} href="/about" />
    <NavButton icon={Mail} href="/contact" />
  </motion.div>
);

const PROJECTS = [
  {
    title: "YANTRAA.TECH",
    year: "TECH 2024",
    image: "/image copy 2.png",
    href: "https://yantraa.tech",
    cta: "DISCOVER CASE",
  },
  {
    title: "CONEKT.DESIGN",
    year: "DESIGN 2024",
    image: "/image copy 3.png",
    href: "https://conekt.design",
    cta: "VISIT SITE",
  },
  {
    title: "GENH HARYANA GOV",
    year: "GOV TECH 2024",
    image: "/image copy 4.png",
    href: "https://genhfounders.com/#masterclass",
    cta: "DISCOVER CASE",
  },
  {
    title: "DEADLOCK",
    year: "STUDIO 2024",
    image: "/ChatGPT Image Sep 27, 2026, 10_08_28 PM.png",
    href: "https://studio.therebirth.tech",
    cta: "VISIT SITE",
  },
  {
    title: "MODERN ECOM SITE",
    year: "E-COMMERCE 2025",
    image: "/image copy 5.png",
    href: "https://ecommrebirth.tech",
    cta: "DISCOVER CASE",
  },
];

export default function ShowcasePage() {
  return (
    <div className="relative w-full bg-[#F3F0EA] min-h-screen overflow-x-hidden selection:bg-[#111111] selection:text-white pb-32">
      {/* UI Elements */}
      <FloatingNav />

      <main className="relative z-10 pt-[15vh]">
        <div className="max-w-7xl mx-auto px-8 md:px-24 mb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="uppercase text-sm font-bold tracking-widest mb-6 text-[#111111]/70"
            >
              Our Portfolio
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.85]"
               style={{ fontFamily: 'Youth, Arial, sans-serif' }}
            >
                SELECTED WORKS
            </motion.h1>
        </div>
        
        <div className="flex flex-col gap-12 max-w-[1400px] mx-auto w-full md:pl-[80px]">
          {PROJECTS.map((project, index) => (
            <ProjectShowcaseCard
              key={index}
              title={project.title}
              year={project.year}
              image={project.image}
              href={project.href}
              cta={project.cta}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
