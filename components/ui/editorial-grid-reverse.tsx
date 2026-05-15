"use client";

import { motion } from "framer-motion";

export default function EditorialGridReverse() {
  return (
    <section className="editorial-grid-wrapper w-full bg-[#F3F0EA] px-8 pb-4 pt-0">
      <div className="editorial-grid-layout mx-auto grid max-w-[1180px] grid-cols-12 gap-4">

        {/* LEFT CARD (Large Image) - Swapped from Right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="editorial-card-media group relative col-span-12 overflow-hidden rounded-[28px] bg-black lg:col-span-6 cursor-pointer"
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
                MISTRAL
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
                AI MODEL
                <br />
                2024
              </span>
            </div>
          </motion.div>

          {/* IMAGE */}
          <div className="h-full overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT COLUMN (Two Split Cards) - Swapped from Left */}
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          {/* TOP CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="editorial-card-soft group relative aspect-[1.3/1] overflow-hidden rounded-[28px] bg-[#D7E3D6] cursor-pointer"
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
                  ZENLY
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
                  SOCIAL
                  <br />
                  2023
                </span>
              </div>
            </motion.div>

            {/* ARTWORK */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-[#32CD32]"
                style={{
                  fontFamily: "Youth, sans-serif",
                  fontSize: "140px",
                  lineHeight: 1,
                  fontWeight: 900,
                }}
              >
                Z
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[180px] w-[180px] rounded-tr-full bg-green-200" />
            <div className="absolute top-0 right-0 h-[140px] w-[140px] rounded-bl-full bg-green-500" />
          </motion.div>

          {/* TESTIMONIAL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="editorial-card-testimonial relative overflow-hidden rounded-[28px] bg-[#E14D2A] p-10 cursor-pointer"
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
              The level of craftsmanship and attention to detail from the team exceeded our expectations. They didn't just design a site, they built a brand experience.
            </p>

            <div className="mt-12 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"
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
                    Julien Lemoine
                  </div>

                  <div className="text-sm text-white/60">
                    CTO @Mistral AI
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
                  VIEW PROJECT
                </span>

                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F3F0EA] text-black">
                  ↗
                </div>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
