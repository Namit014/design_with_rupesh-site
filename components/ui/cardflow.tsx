"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardData = [
  {
    id: "01",
    title: "Branding that drives\nconversion & funding.",
    description:
      "We clarify your positioning, define a distinctive tone of voice, and build a visual system that works across acquisition and product. Each sprint ships a robust logo, pragmatic brand guidelines, and a social kit so you can launch fast. The goal is simple: perceived value up.",
    testimonial:
      "Working with Brand Appart has been an absolute pleasure. Beyond their creativity and professionalism, there's a real sense of kindness and care in everything they do. The team is always open, generous, and never gets stuck on small details, they never say no. I was truly impressed by their reliability, flexibility, and collaborative spirit. I couldn't recommend them more!",
    author: "Jérémy Bendayan",
    role: "Co-founder & COO @Jaws Group",
    color: "#3d2fa9",
    gallery: [
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e1f900620069168863_branding-01.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e11dd5b6cd8f6f8560_branding-02.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e1186f7124847bd445_branding-03.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e0f43b55dc529e97b9_branding-04.avif",
    ],
  },
  {
    id: "02",
    title: "Product experiences\nusers adopt & keep using",
    description:
      "We start from business goals, map the critical journeys, and prototype what actually moves the needle. Every sprint ships clear flows, a reusable UI library, and a dev-ready. Expect time-to-value down, UX friction down, retention/NPS up.",
    testimonial:
      "A huge thank you to the entire Brand Appart team for your outstanding work on our rebranding! We're thrilled to have you as an integral part of the Incard team, and we can't wait to reveal what's coming next.",
    author: "Théo Cesarin",
    role: "CEO & Co-Founder @Incard",
    color: "#ff7722",
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "03",
    title: "Web Design for growing\nteams & business.",
    description:
      "We align messaging, page architecture, and UI. You get clear structure, sections. The site loads fast, tells the right story, and pushes to action without dev firefighting. Your team gets a scalable base they can evolve without calling us for every change.",
    testimonial:
      "I've worked with Brand Appart on multiple projects — website development, landing pages for branding, and PowerPoint presentations. I love how flexible, fast, and professional the team is.",
    author: "Alexis Botaya",
    role: "Managing director @Sound Experience",
    color: "#ff3d33",
    gallery: [
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "04",
    title: "Investor-proof decks\nthat raise faster.",
    description:
      "We craft the narrative that gets meetings and a precise ask. Design serves the story: readable numbers, rhythm across slides, and versions for teaser/one-pager. Your deck can be pitched in 5 minutes, read solo, and generates faster responses.",
    testimonial:
      "The deck was a game changer for our seed round. The clarity and design helped us close in record time. Brand Appart really understands how to tell a financial story through visuals.",
    author: "Sara Jenkins",
    role: "Founder @FinTechly",
    color: "#785f47",
    gallery: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    ],
  },
];

export default function CardFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray<HTMLElement>(".cf-card-el");
    const totalCards = cards.length;
    const scaleStep = 0.06;
    const yStep = 12; // px offset between stacked cards

    // Initial stacked state: card 0 on top (full size), cards behind it scale down
    cards.forEach((card, i) => {
      gsap.set(card, {
        scale: 1 - i * scaleStep,
        y: i * yStep,
        transformOrigin: "center bottom",
        zIndex: totalCards - i,
      });
    });

    // For each card except last: on scroll, lift it up (y: -120%) and scale up the rest
    cards.forEach((card, i) => {
      if (i === totalCards - 1) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => `top+=${i * window.innerHeight * 1.2} top`,
        end: () => `top+=${(i + 1) * window.innerHeight * 1.2} top`,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Animate this card up and away
          gsap.set(card, {
            yPercent: gsap.utils.interpolate(0, -130, p),
            rotationX: gsap.utils.interpolate(0, -60, p), // Flips upwards (top moves away)
            z: gsap.utils.interpolate(0, -400, p), // Move away in Z space
            scale: gsap.utils.interpolate(1, 1.05, p), // Slight scale up
            opacity: gsap.utils.interpolate(1, 0, Math.max(0, (p - 0.7) / 0.3)),
          });

          // Pull the cards behind forward (increase scale, reduce y offset)
          for (let j = i + 1; j < totalCards; j++) {
            const behind = j - i - 1; // relative position behind
            const targetScale = 1 - behind * scaleStep;
            const currentScale = 1 - (j - i) * scaleStep;
            const targetY = behind * yStep;
            const currentY = (j - i) * yStep;

            gsap.set(cards[j], {
              scale: gsap.utils.interpolate(currentScale, targetScale, p),
              y: gsap.utils.interpolate(currentY, targetY, p),
            });
          }
        },
      });
    });

    // Pin the whole section for the total scroll distance
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${totalCards * window.innerHeight * 1.2}`,
      pin: true,
      pinSpacing: true,
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="cf-outer">
      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&display=swap');

        /* ── Outer container (white stage) ── */
        .cf-outer {
          width: 100%;
          background: white;
        }

        /* ── Sticky section ── */
        .cf-stage {
          position: relative;
          width: 100%;
          height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 2500px; /* Enhanced perspective for 3D flips */
        }

        /* ── Stack container (all cards live here) ── */
        .cf-stack {
          position: relative;
          width: 86%;
          max-width: 1320px;
          height: 86svh;
        }

        /* ── Individual card ── */
        .cf-card-el {
          position: absolute;
          inset: 0;
          border-radius: 2rem;
          overflow: hidden;
          will-change: transform, opacity;
          display: flex;
          flex-direction: column;
          padding: 3.5rem 4rem;
          color: #FBF9EF;
          box-shadow: 0 40px 100px rgba(0,0,0,0.15);
        }

        /* ── Top row ── */
        .cf-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .cf-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 4.5vw, 64px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -2px;
          color: #FBF9EF;
          white-space: pre-line;
          max-width: 75%;
          margin: 0;
        }

        .cf-num {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 500;
          color: rgba(251,249,239,0.5);
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        /* ── Middle: description ── */
        .cf-desc {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 1.4;
          letter-spacing: 0px;
          color: rgba(251,249,239,0.7);
          max-width: 50%;
          margin: 0;
        }

        /* ── Bottom row ── */
        .cf-foot {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-top: auto;
        }

        /* Testimonial */
        .cf-tbox {
          max-width: 320px;
          flex-shrink: 0;
        }

        .cf-quote {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.4;
          letter-spacing: 0px;
          color: rgba(251,249,239,0.9);
          margin: 0 0 1.5rem;
        }

        .cf-author-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cf-ava {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        .cf-ava img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cf-author-name {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #FBF9EF;
          margin: 0;
          line-height: 1.2;
        }

        .cf-author-role {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          color: rgba(251,249,239,0.6);
          margin: 0;
          line-height: 1.2;
          margin-top: 0.2rem;
        }

        /* Gallery */
        .cf-gallery {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          flex: 1;
          justify-content: flex-end;
        }

        .cf-gitem {
          border-radius: 1rem;
          overflow: hidden;
          flex-shrink: 0;
          background: rgba(0,0,0,0.2);
          width: clamp(100px, 14vw, 180px);
          aspect-ratio: 1 / 1;
          height: auto;
        }

        .cf-gitem img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cf-card-el {
            padding: 2rem 1.5rem;
          }
          .cf-title {
            max-width: 90%;
            font-size: 28px;
            line-height: 1.1;
            letter-spacing: -1.2px;
          }
          .cf-desc {
            max-width: 100%;
            font-size: 14px;
            line-height: 1.4;
          }
          .cf-foot {
            flex-direction: column;
            align-items: flex-start;
          }
          .cf-tbox {
            max-width: 100%;
          }
          .cf-gallery {
            justify-content: flex-start;
            flex-wrap: wrap;
          }
          .cf-gitem {
            width: clamp(80px, 30vw, 120px);
          }
        }
      `}</style>

      <div ref={sectionRef} className="cf-stage">
        <div className="cf-stack">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="cf-card-el"
              style={{ backgroundColor: card.color }}
            >
              {/* Top */}
              <div className="cf-head">
                <h2 className="cf-title">{card.title}</h2>
                <span className="cf-num">({card.id})</span>
              </div>

              {/* Middle */}
              <p className="cf-desc">{card.description}</p>

              {/* Bottom */}
              <div className="cf-foot">
                <div className="cf-tbox">
                  <p className="cf-quote">"{card.testimonial}"</p>
                  <div className="cf-author-row">
                    <div className="cf-ava">
                      <img
                        src={`https://i.pravatar.cc/100?u=${encodeURIComponent(card.author)}`}
                        alt={card.author}
                      />
                    </div>
                    <div>
                      <p className="cf-author-name">{card.author}</p>
                      <p className="cf-author-role">{card.role}</p>
                    </div>
                  </div>
                </div>

                <div className="cf-gallery">
                  {card.gallery.map((img, gi) => (
                    <div key={gi} className="cf-gitem">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
