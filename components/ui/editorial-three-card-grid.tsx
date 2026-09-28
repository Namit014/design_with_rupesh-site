"use client";

import { motion } from "framer-motion";

export default function EditorialThreeCardGrid() {
  return (
    <section className="editorial-grid-wrapper w-full bg-[#F3F0EA] px-4 md:px-8 pb-4 pt-0">
      <div className="editorial-grid-layout mx-auto grid max-w-[1180px] grid-cols-12 gap-4">
        {/* LEFT COLUMN */}
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          {/* TOP CARD */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-4">
              <h3 className="uppercase text-[#111111] text-[26px] min-[380px]:text-[32px] md:text-[56px] leading-[0.8] font-black tracking-[-1px] md:tracking-[-2px]" style={{ fontFamily: "Youth, sans-serif" }}>
                MODERN IDENTITY
              </h3>
              <span className="uppercase text-[#111111]/50 font-bold text-[14px] md:text-[16px] tracking-widest">
                B2C APP 2024
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="editorial-card-soft group relative aspect-[1.3/1] overflow-hidden rounded-[28px] bg-[#EAE1CC]"
            >
              {/* IMAGE BACKGROUND */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/insta logo.png"
                  alt="Sowbez"
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

          {/* TESTIMONIAL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="editorial-card-testimonial relative overflow-hidden rounded-[28px] bg-[#4332B8] p-10"
          >
            <div
              className="uppercase text-white/60"
              style={{
                fontFamily: "PP Neue Montreal, sans-serif",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Tech
            </div>

            <p
              className="mt-6 max-w-[540px] text-white"
              style={{
                fontFamily: "PP Neue Montreal, sans-serif",
                fontSize: "clamp(20px, 6vw, 28px)",
                lineHeight: "1.08",
                letterSpacing: "-1.4px",
              }}
            >
              We love the way The Rebirth made our brand come alive.
            </p>

            <div className="mt-12 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pinimg.com/1200x/9b/5c/26/9b5c2689ab13f305bb89a8ed99e336d8.jpg"
                  alt=""
                  className="h-[56px] w-[56px] rounded-full object-cover"
                />

                <div>
                  <div
                    className="text-white"
                    style={{
                      fontFamily: "PP Neue Montreal, sans-serif",
                      fontSize: "18px",
                    }}
                  >
                    Tushar Pandey
                  </div>
                </div>
              </div>

              <button onClick={() => window.dispatchEvent(new Event('open-booking-modal'))} className="flex items-center gap-4 text-white transition-opacity duration-300 hover:opacity-70">
                <span
                  style={{
                    fontFamily: "PP Neue Montreal, sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  CONTACT SALES
                </span>

                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F3F0EA] text-black">
                  ↗
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-baseline gap-4">
            <h3 className="uppercase text-[#111111] text-[26px] min-[380px]:text-[32px] md:text-[56px] leading-[0.8] font-black tracking-[-1px] md:tracking-[-2px]" style={{ fontFamily: "Youth, sans-serif" }}>
              MODERN ECOM
            </h3>
            <span className="uppercase text-[#111111]/50 font-bold text-[14px] md:text-[16px] tracking-widest">
              E-COMMERCE 2026
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="editorial-card-media group relative overflow-hidden rounded-[28px] bg-black h-full min-h-[300px]"
          >
            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 h-full overflow-hidden">
              <video
                src="/trb1.mp4"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
