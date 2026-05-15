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
              initial={{ width: 180, height: 48 }}
              whileHover={{ width: "calc(100% - 2rem)", height: 72 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-white">
                <h3
                  style={{
                    fontFamily: "Youth, sans-serif",
                    fontSize: "26px",
                    lineHeight: 1,
                    letterSpacing: "-1px",
                    fontWeight: 900,
                  }}
                >
                  SOWBEZ
                </h3>

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

            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1097424040?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
                className="absolute inset-0 h-full w-full scale-[1.25] object-cover pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-view"
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
              Testimonial
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
              Brand Appart quickly identified our needs and proposed highly relevant creative directions. We’re thrilled with the branding they created for GoStan.
            </p>

            <div className="mt-12 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
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
                    Alexis Gendreau
                  </div>

                  <div className="text-sm text-white/60">
                    Founder @GoStan
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-4 text-white transition-opacity duration-300 hover:opacity-70">
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
            initial={{ width: 180, height: 48 }}
            whileHover={{ width: "calc(100% - 2rem)", height: 72 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between overflow-hidden rounded-[14px] bg-black/90 px-4 py-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-white">
              <h3
                style={{
                  fontFamily: "Youth, sans-serif",
                  fontSize: "26px",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                  fontWeight: 900,
                }}
              >
                FORBES
              </h3>

              <span
                className="uppercase opacity-70"
                style={{
                  fontFamily: "PP Neue Montreal, sans-serif",
                  fontSize: "12px",
                  lineHeight: 1.1,
                  letterSpacing: "1px",
                }}
              >
                WEB 3.0
                <br />
                2023
              </span>
            </div>
          </motion.div>

          {/* VIDEO BACKGROUND */}
          <div className="absolute inset-0 h-full overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1089995529?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
              className="absolute inset-0 h-full w-full scale-[1.25] object-cover pointer-events-none"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-view"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
