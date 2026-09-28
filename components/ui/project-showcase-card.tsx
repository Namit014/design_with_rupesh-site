"use client";

import { motion } from "framer-motion";

type ProjectShowcaseCardProps = {
  image?: string;
  video?: string;
  title?: string;
  cta?: string;
  link?: string;
};

export default function ProjectShowcaseCard({
  image,
  video,
  title = "YANTRAA.TECH",
  year = "TECH 2024",
  cta = "DISCOVER CASE",
  link = "#",
}: ProjectShowcaseCardProps) {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="project-showcase-card group relative mx-auto aspect-[1000/540] w-full max-w-[1180px] overflow-hidden rounded-[28px] bg-black cursor-pointer"
    >
        {/* MEDIA */}
        <div className="project-showcase-media absolute inset-0 overflow-hidden">
          {video ? (
            <video
              src={video}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
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
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={{
            rest: { width: "auto", height: 48 },
            hover: { width: "calc(100% - 2rem)", height: 72 }
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="project-showcase-headline absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
        >
          {/* CONTENT */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <motion.h3
                className="uppercase whitespace-nowrap"
                variants={{
                  rest: { fontSize: "18px" },
                  hover: { fontSize: "42px" }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "Youth, sans-serif",
                  lineHeight: "1",
                  letterSpacing: "-2px",
                  fontWeight: 900,
                }}
              >
                {title}
              </motion.h3>

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

            <motion.div
              className="uppercase text-white overflow-hidden whitespace-nowrap"
              variants={{
                rest: { opacity: 0, width: 0 },
                hover: { opacity: 1, width: "auto" }
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "PP Neue Montreal, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              {cta}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
  );

  return (
    <section className="project-showcase-wrapper w-full bg-[#F3F0EA] px-8 pb-4 pt-0">
      <a href={link} className="block w-full h-full">
        {CardContent}
      </a>
    </section>
  );
}



