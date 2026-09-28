"use client";

import { motion } from "framer-motion";

export default function FeaturedWorkSection() {
  return (
    <section className="featured-work-wrapper relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F3F0EA]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="featured-work-content relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <div className="featured-work-heading">
          <h1
            className="font-black text-[#171412]"
            style={{
              fontSize: 'clamp(3rem, 12vw, 126px)',
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
              fontFamily: 'Youth, sans-serif',
            }}
          >
            Featured
          </h1>

          <h1
            className="mt-2 md:mt-[-8px] font-black text-[#8E827C]"
            style={{
              fontSize: 'clamp(3rem, 12vw, 126px)',
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
              fontFamily: 'Youth, sans-serif',
            }}
          >
            work
          </h1>
        </div>

        <div className="mt-12 md:mt-16 text-4xl md:text-6xl font-thin text-[#171412]">
          ↓
        </div>

        <p
          className="mt-8 md:mt-12 max-w-[920px] text-center text-[#171412] px-4 md:px-0 text-[20px] md:text-[29px] leading-[1.4] md:leading-[34px]"
          style={{
            fontFamily: 'PP Neue Montreal, sans-serif',
          }}
        >
          We build innovative and performant web apps that not only capture
          attention but also drive meaningful results.
        </p>
      </motion.div>
    </section>
  );
}
