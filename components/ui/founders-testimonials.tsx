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
    name: "Rohan",
    role: "CMO @Qonnect",
    image: "https://i.pravatar.cc/150?img=11",
    text:
      "We worked together on backend and product software. Everything shipped fast and the collaboration was seamless.",
    rotation: "-6deg",
    bg: "#ECE7DE",
    textColor: "#171412",
  },
  {
    id: 2,
    name: "Tushar Pandey",
    role: "CEO @Weekends Films",
    image: "https://i.pravatar.cc/150?img=12",
    text:
      "We love the way The Rebirth made our brand come alive. Their strategic approach goes far beyond just design and software.",
    rotation: "7deg",
    bg: "#A09591",
    textColor: "#F8F3EA",
  },
  {
    id: 3,
    name: "Aditya",
    role: "CEO @PDF",
    image: "https://i.pravatar.cc/150?img=13",
    text:
      "The Rebirth helped us with refactoring and platform stability. The boost in perception was immediate.",
    rotation: "-5deg",
    bg: "#F1EEE8",
    textColor: "#171412",
  },
  {
    id: 4,
    name: "Sneha",
    role: "Founder @Sowbeez",
    image: "https://i.pravatar.cc/150?img=5",
    text:
      "We faced a challenge with positioning and The Rebirth exceeded expectations with clarity and execution.",
    rotation: "6deg",
    bg: "#A09591",
    textColor: "#F8F3EA",
  },
  {
    id: 5,
    name: "Karthik",
    role: "Founder @Qonnect",
    image: "https://i.pravatar.cc/150?img=15",
    text:
      "Amazing experience with The Rebirth. Professional, responsive, and technical. I couldn’t recommend them more.",
    rotation: "-4deg",
    bg: "#F1EEE8",
    textColor: "#171412",
  },
];

export default function SemiCircularCardAnimation() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0].clientWidth;
      const gap = 16; // gap-4 is 16px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setMobileActiveIndex(index);
    }
  };

  useEffect(() => {


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
            className="text-[79px] font-black leading-[1] tracking-[-5px] text-[#171412] max-lg:text-[56px]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Trusted by
            <br />
            <span className="text-[#9D908A]">visionary founders</span>
          </h2>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          @media (min-width: 1024px) {
            ${testimonials.map((item, i) => `
              .orbit-card-${i} { 
                left: calc(50% - 160px + ${(i - 2) * 120}px); 
                transform: rotate(${item.rotation});
              }
              
              .cards-container:hover .orbit-card-${i}:not(.active-card) {
                transform: rotate(${item.rotation}) translateX(${i < (activeCard || 0) ? '-220px' : '220px'}) scale(0.96);
                opacity: 0.9;
              }
            `).join('')}
            
            .cards-container .orbit-card.active-card {
              transform: scale(1.03) translateY(0px) translateX(0px) !important;
              z-index: 99 !important;
              opacity: 1 !important;
            }
          }
        `}</style>
        
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="cards-container no-scrollbar relative flex lg:min-h-[640px] items-center justify-start lg:justify-center overflow-x-auto lg:overflow-visible gap-4 lg:gap-0 py-4 lg:py-0 snap-x snap-mandatory w-full"
        >
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className={`orbit-card orbit-card-${index} ${activeCard === index ? 'active-card' : ''} snap-center shrink-0 relative lg:absolute flex h-[480px] lg:h-[520px] w-full max-w-[400px] lg:w-[320px] flex-col justify-between rounded-[28px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
              style={{
                backgroundColor: item.bg,
                color: item.textColor,
                zIndex: testimonials.length - index,
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
                  src="https://i.pinimg.com/1200x/9b/5c/26/9b5c2689ab13f305bb89a8ed99e336d8.jpg"
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <div className="text-[18px] font-semibold">
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Numbers */}
        <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const cardWidth = container.children[0].clientWidth;
                  const gap = 16;
                  container.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
                }
              }}
              className={`text-[16px] font-bold transition-colors ${mobileActiveIndex === i ? 'text-black' : 'text-black/20'}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
