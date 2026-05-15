"use client";

import { motion } from "framer-motion";

type ProjectShowcaseCardProps = {
  image?: string;
  video?: string;
  title?: string;
  year?: string;
  cta?: string;
};

export default function ProjectShowcaseCard({
  image,
  video,
  title = "INCARD",
  year = "FINTECH 2024",
  cta = "DISCOVER CASE",
}: ProjectShowcaseCardProps) {
  return (
    <section className="project-showcase-wrapper w-full bg-[#F3F0EA] px-8 pb-4 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="project-showcase-card group relative mx-auto aspect-[1000/540] w-full max-w-[1180px] overflow-hidden rounded-[28px] bg-black"
      >
        {/* MEDIA */}
        <div className="project-showcase-media absolute inset-0 overflow-hidden">
          {video ? (
            <iframe
              src={`${video}&autoplay=1&muted=1&byline=0&title=0&controls=0`}
              className="absolute inset-0 h-full w-full scale-[1.25] object-cover pointer-events-none"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-view"
            />
          ) : (
            <motion.img
              src={image}
              alt=""
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>

        <motion.div
          initial={{ width: 180, height: 48 }}
          whileHover={{ width: "calc(100% - 2rem)", height: 72 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="project-showcase-headline absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
        >
          {/* CONTENT */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <h3
                className="uppercase"
                style={{
                  fontFamily: "Youth, sans-serif",
                  fontSize: "42px",
                  lineHeight: "1",
                  letterSpacing: "-2px",
                  fontWeight: 900,
                }}
              >
                {title}
              </h3>

              <span
                className="uppercase opacity-80"
                style={{
                  fontFamily: "PP Neue Montreal, sans-serif",
                  fontSize: "15px",
                  lineHeight: "1.1",
                  letterSpacing: "1px",
                }}
              >
                {year}
              </span>
            </div>

            <div
              className="uppercase text-white"
              style={{
                fontFamily: "PP Neue Montreal, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              {cta}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



