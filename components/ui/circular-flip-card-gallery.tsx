"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

const cardData = [
  {
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609172303465-56c68ad89aae?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1681986367283-c6a5fbf3a7b2?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop&crop=center",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=600&fit=crop&crop=center",
  },
];

function OrbitCard({
  image,
  className,
  style,
}: {
  image: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "orbit-card absolute h-[150px] w-[120px] overflow-hidden rounded-[18px] bg-neutral-900 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:h-[210px] md:w-[170px]",
        className
      )}
      style={style}
    >
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
      />
    </div>
  );
}

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Use Scroll progress for much more reliable background transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to colors: 
  // Further decreased ending point as requested (turning back to white even earlier)
  // 0% -> 35% : Transition to Black
  // 35% -> 55% : Maintain Black
  // 55% -> 100% : Transition to White
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    ["#F3F0EA", "#171412", "#171412", "#F3F0EA"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    ["#120D0C", "#FFFFFF", "#FFFFFF", "#120D0C"]
  );

  const [size, setSize] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scrollBoost, setScrollBoost] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        setSize(galleryRef.current.offsetWidth);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    if (galleryRef.current) {
      resizeObserver.observe(galleryRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setRotation((prev) => prev + 0.0015 + scrollBoost);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollBoost]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setScrollBoost(0.035);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setScrollBoost(0);
      }, 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const radius = size * 0.42;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <motion.main
      ref={containerRef}
      style={{ backgroundColor }}
      className="flex min-h-[120vh] items-center justify-center overflow-hidden px-4 py-32 transition-colors duration-300"
    >
      <div
        ref={galleryRef}
        className="relative aspect-square w-full max-w-[1200px]"
      >
        {/* CENTER TEXT */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center leading-[0.85] tracking-[-4px]">
            <motion.h1
              style={{
                color: textColor,
                fontSize: "clamp(3.5rem,8vw,6.5rem)",
                fontWeight: 900,
              }}
              className="font-black"
            >
              See more
            </motion.h1>

            <motion.h1
              style={{
                color: textColor,
                fontSize: "clamp(3.5rem,8vw,6.5rem)",
                fontWeight: 900,
              }}
              className="font-black"
            >
              work
            </motion.h1>
          </div>
        </div>

        {/* ORBIT CARDS CONTAINER WITH SCALING */}
        <motion.div
          animate={{ scale: scrollBoost > 0 ? 0.8 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {size > 0 &&
            cardData.map((card, index) => {
              const angle = (index / cardData.length) * 2 * Math.PI + rotation;

              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);

              return (
                <OrbitCard
                  key={index}
                  image={card.image}
                  className="hover:z-30"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `translate(-50%, -50%) rotate(${
                      (angle * 180) / Math.PI + 12
                    }deg)`,
                  }}
                />
              );
            })}
        </motion.div>
      </div>
    </motion.main>
  );
}
