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
        <div className="featured-work-heading leading-none tracking-[-6.3px]">
          <h1
            className="font-black text-[#171412]"
            style={{
              fontSize: 'clamp(4rem,8vw,126px)',
              lineHeight: '101px',
              fontFamily: 'Youth, sans-serif',
            }}
          >
            Featured
          </h1>

          <h1
            className="mt-[-8px] font-black text-[#8E827C]"
            style={{
              fontSize: 'clamp(4rem,8vw,126px)',
              lineHeight: '101px',
              fontFamily: 'Youth, sans-serif',
            }}
          >
            work
          </h1>
        </div>

        <div className="mt-16 text-6xl font-thin text-[#171412]">
          ↓
        </div>

        <p
          className="mt-12 max-w-[920px] text-center text-[#171412]"
          style={{
            fontSize: '29px',
            lineHeight: '34px',
            letterSpacing: '0px',
            fontFamily: 'PP Neue Montreal, sans-serif',
          }}
        >
          We create innovative and purposeful designs that not only capture
          attention but also drive meaningful results.
        </p>
      </motion.div>
    </section>
  );
}
