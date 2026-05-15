"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const testimonials = [
  {
    id: 1,
    name: "Elliot",
    role: "CMO @Qonnect",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    text:
      "We worked together on branding and product visuals. Everything shipped fast and the collaboration was seamless.",
    rotation: "-6deg",
    bg: "#ECE7DE",
    textColor: "#171412",
  },
  {
    id: 2,
    name: "Alexis",
    role: "Founder @GoStan",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    text:
      "I had the chance to work with Brand Appart on redesign and UI. Their strategic approach goes far beyond visuals.",
    rotation: "7deg",
    bg: "#A09591",
    textColor: "#F8F3EA",
  },
  {
    id: 3,
    name: "Ali",
    role: "CEO @PDF",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    text:
      "Brand Appart helped us with rebranding and platform identity. The boost in perception was immediate.",
    rotation: "-5deg",
    bg: "#F1EEE8",
    textColor: "#171412",
  },
  {
    id: 4,
    name: "Julien",
    role: "Founder @Sowbeez",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    text:
      "We faced a challenge with positioning and Brand Appart exceeded expectations with clarity and execution.",
    rotation: "6deg",
    bg: "#A09591",
    textColor: "#F8F3EA",
  },
  {
    id: 5,
    name: "Eddy",
    role: "Founder @Qonnect",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    text:
      "Amazing experience with Brand Appart. Professional, responsive, and creative. I couldn’t recommend them more.",
    rotation: "-4deg",
    bg: "#F1EEE8",
    textColor: "#171412",
  },
];

export default function SemiCircularCardAnimation() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const cards = gsap.utils.toArray<HTMLElement>(".orbit-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.7,
          rotation: 18,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          ease: "power4.out",
          delay: index * 0.12,
          motionPath: {
            path: [
              { x: 600, y: 240 },
              { x: 320, y: -180 },
              { x: 120, y: -40 },
              { x: 0, y: 0 },
            ],
            curviness: 1.8,
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#F3F0EA] px-8 py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-24 ml-5">
          <h2
            className="text-[79px] font-black leading-[0.88] tracking-[-5px] text-[#171412] max-lg:text-[56px]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Trusted by
            <br />
            <span className="text-[#9D908A]">+40 founders</span>
          </h2>
        </div>

        <div className="relative flex min-h-[640px] items-center justify-center">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="orbit-card absolute flex h-[520px] w-[320px] flex-col justify-between rounded-[28px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                backgroundColor: item.bg,
                color: item.textColor,
                left: `calc(50% - 160px + ${(index - 2) * 120}px)`,
                zIndex:
                  activeCard === index
                    ? 99
                    : testimonials.length - index,
                transform:
                  activeCard === null
                    ? `rotate(${item.rotation}) translateY(0px) translateX(0px) scale(1)`
                    : activeCard === index
                    ? `rotate(0deg) translateY(0px) translateX(0px) scale(1.03)`
                    : index < activeCard
                    ? `rotate(${item.rotation}) translateX(-220px) translateY(0px) scale(0.96)`
                    : `rotate(${item.rotation}) translateX(220px) translateY(0px) scale(0.96)`,
                opacity:
                  activeCard === null
                    ? 1
                    : activeCard === index
                    ? 1
                    : 0.9,
              }}
            >
              <div>
                <div className="mb-14 flex items-center justify-between">
                  <div className="flex gap-1 text-[28px] text-[#FF7A22]">
                    ★★★★★
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold uppercase tracking-[0.08em]">
                      Contact Sales
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                      ↗
                    </div>
                  </div>
                </div>

                <p className="text-[29px] leading-[1.05] tracking-[-1.6px] max-lg:text-[20px]">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <div className="text-[18px] font-semibold">
                    {item.name}
                  </div>

                  <div className="text-[14px] opacity-60">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
