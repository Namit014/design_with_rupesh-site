"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ProjectShowcaseCardProps = {
  image?: string;
  video?: string;
  title?: string;
  year?: string;
  cta?: string;
  href?: string;
};

export default function ProjectShowcaseCard({
  image,
  video,
  title = "YANTRAA.TECH",
  year,
  cta = "DISCOVER CASE",
  href = "#",
}: ProjectShowcaseCardProps) {
  return (
    <section className="project-showcase-wrapper w-full px-4 md:px-8 pb-10 pt-0">
      <Link href={href} className="block w-full group/link">
        {/* Header Above Card */}
        <div className="flex w-full max-w-[1180px] mx-auto items-end justify-between pb-4">
          <div className="flex items-baseline gap-4 overflow-hidden">
            <h3 className="uppercase text-[#111111] text-[26px] min-[380px]:text-[32px] md:text-[56px] leading-[0.8] font-black tracking-[-1px] md:tracking-[-2px] truncate" style={{ fontFamily: "Youth, sans-serif" }}>
              {title}
            </h3>
            {year && (
              <span className="uppercase text-[#111111]/50 font-bold text-[14px] md:text-[16px] tracking-widest shrink-0">
                {year}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2 uppercase text-[#111111] font-bold text-[16px] tracking-[-0.3px] group-hover/link:underline underline-offset-4 shrink-0">
            {cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="project-showcase-card group relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[28px] bg-black"
      >
        {/* MEDIA */}
        <div className="project-showcase-media relative w-full h-auto overflow-hidden">
          {video ? (
            <video
              src={video}
              className="w-full h-auto object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <motion.img
              src={image}
              alt=""
              className="w-full h-auto object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
      </motion.div>
      </Link>
    </section>
  );
}



