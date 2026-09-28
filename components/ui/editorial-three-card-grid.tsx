"use client";

import { motion } from "framer-motion";

export default function EditorialThreeCardGrid() {
  return (
    <section className="editorial-grid-wrapper w-full bg-[#F3F0EA] px-8 pb-4 pt-0">
      <div className="editorial-grid-layout mx-auto grid max-w-[1180px] grid-cols-12 gap-4">
        {/* LEFT COLUMN */}
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          {/* TOP CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="editorial-card-soft group relative aspect-[1.3/1] overflow-hidden rounded-[28px] bg-[#EAE1CC]"
          >
            {/* TOP BAR */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
              rest: { width: "auto", height: 48 },
              hover: { width: "calc(100% - 2rem)", height: 72 }
            }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-white">
                <motion.h3
                  className="whitespace-nowrap"
                  variants={{
                    rest: { fontSize: "16px" },
                    hover: { fontSize: "26px" }
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "Youth, sans-serif",
                    lineHeight: 1,
                    letterSpacing: "-1px",
                    fontWeight: 900,
                  }}
                >
                  MODERN IDENTITY
                </motion.h3>

                <span
                  className="uppercase opacity-70"
                  style={{
                    fontFamily: "PP Neue Montreal, sans-serif",
                    fontSize: "12px",
                    lineHeight: 1.1,
                    letterSpacing: "1px",
                  }}
                >
                  B2C APP
                  <br />
                  2024
                </span>
              </div>
            </motion.div>

            {/* IMAGE BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/insta logo.png"
                alt="Sowbez"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              />
            </div>
          </motion.div>

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
                fontSize: "28px",
                lineHeight: "1.08",
                letterSpacing: "-1.4px",
              }}
            >
              We love the way The Rebirth made our brand come alive.
            </p>

            <div className="mt-12 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/150?u=tushar"
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="editorial-card-media group relative col-span-12 overflow-hidden rounded-[28px] bg-black lg:col-span-6"
        >
          {/* TOP BAR */}
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { width: "auto", height: 48 },
              hover: { width: "calc(100% - 2rem)", height: 72 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-white">
              <motion.h3
                className="whitespace-nowrap"
                variants={{
                  rest: { fontSize: "16px" },
                  hover: { fontSize: "26px" }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "Youth, sans-serif",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                  fontWeight: 900,
                }}
              >
                MODERN ECOM
              </motion.h3>

              <span
                className="uppercase opacity-70"
                style={{
                  fontFamily: "PP Neue Montreal, sans-serif",
                  fontSize: "12px",
                  lineHeight: 1.1,
                  letterSpacing: "1px",
                }}
              >
                E-COMMERCE
                <br />
                2026
              </span>
            </div>
          </motion.div>

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
    </section>
  );
}
