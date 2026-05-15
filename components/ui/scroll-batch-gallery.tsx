"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const images = [
  "https://assets.codepen.io/16327/quentin.png",
  "https://assets.codepen.io/16327/planetono.png",
  "https://assets.codepen.io/16327/sanrita.jpg",
  "https://assets.codepen.io/16327/anima.jpg",
  "https://assets.codepen.io/16327/giulio.jpg",
  "https://assets.codepen.io/16327/lando.png",
  "https://assets.codepen.io/16327/glenn.png",
  "https://assets.codepen.io/16327/fantik.jpg",
  "https://assets.codepen.io/16327/romei.jpg",
  "https://assets.codepen.io/16327/ironhill.jpeg",
  "https://assets.codepen.io/16327/inkwell.jpg",
  "https://assets.codepen.io/16327/monolith.jpg",
  "https://assets.codepen.io/16327/phantom.jpg",
  "https://assets.codepen.io/16327/ribbit.jpg",
  "https://assets.codepen.io/16327/aurel.jpg",
  "https://assets.codepen.io/16327/aether.jpg",
  "https://assets.codepen.io/16327/cashapp.jpg",
  "https://assets.codepen.io/16327/osmo.png",
  "https://assets.codepen.io/16327/pantheon.jpg",
  "https://assets.codepen.io/16327/ponpon.jpg",
]

export default function ScrollBatchGallery() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".image", {
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          }),
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={container}
      className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-24"
    >
      {/* GALLERY */}

      <div className="flex w-full max-w-[900px] flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 80 }).map((_, i) => (
          <img
            key={i}
            src={images[i % images.length]}
            alt=""
            className="image aspect-video w-[30%] rounded-md object-cover opacity-0 will-change-transform"
            style={{
              transform: "translateY(40px)",
            }}
          />
        ))}
      </div>
    </div>
  )
}