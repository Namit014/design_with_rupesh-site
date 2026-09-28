"use client";
import gsap from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    color: "#000000",
    src: "https://i.pinimg.com/1200x/85/cd/51/85cd51c485eaca101419cb3e9eddad3a.jpg",
    title: "Modern Website Development",
  },
  {
    color: "#8C8C8C",
    src: "https://i.pinimg.com/736x/fe/13/98/fe13988e1815350338d1991d336f6f73.jpg",
    title: "E-Commerce Platforms",
  },
  {
    color: "#EFE8D3",
    src: "https://i.pinimg.com/736x/5e/69/35/5e6935300f0f372bc4e46b0674b216ed.jpg",
    title: "Conversion Landing Pages",
  },
  {
    color: "#706D63",
    src: "https://i.pinimg.com/1200x/dd/72/c2/dd72c22badd2cb9f03363a940f4fa283.jpg",
    title: "Brand Rebirth",
  },
];

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
};

export default function Services() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className="py-16 overflow-hidden bg-[#f9f9f9] text-black">
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-7xl tracking-tight" style={{ fontFamily: "Youth, sans-serif", fontWeight: 900 }}>Services.</h2>
          <p className="max-w-md font-medium text-neutral-500" style={{ fontFamily: "PP Neue Montreal, sans-serif" }}>
            Our engineering solutions are tailored to meet the unique challenges of modern
            web platforms, providing blazing-fast speed, bulletproof reliability, and scalable architecture at
            every stage of your growth.
          </p>
        </div>
        <div className="flex w-full items-center justify-center relative">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                index={index}
                key={project.title}
                setModal={setModal}
                title={project.title}
              />
            ))}
          </div>
          <Modal modal={modal} projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Project({ index, title, setModal }: any) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-[#c9c9c9] border-t px-[100px] py-[50px] transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="m-0 font-normal text-6xl transition-all duration-300 group-hover:translate-x-2.5" style={{ fontFamily: "Youth, sans-serif" }}>
        {title}
      </h2>
      <p className="font-light transition-all duration-300 group-hover:translate-x-2.5 text-[#171412]" style={{ fontFamily: "PP Neue Montreal, sans-serif" }}>
        Web Engineering
      </p>
    </div>
  );
}

function Modal({ modal, projects }: any) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-white"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project: any, idx: number) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.title}
              style={{ backgroundColor: project.color }}
            >
              <img
                alt={project.title}
                className="h-auto w-[300px] object-cover"
                src={project.src}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[110] flex h-20 w-auto min-w-[80px] px-8 items-center justify-center rounded-full bg-[#171412] font-light text-sm text-white"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      >
        <span className="opacity-0 whitespace-nowrap">{projects[index].title}</span>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[110] flex h-20 w-auto min-w-[80px] px-8 items-center justify-center rounded-full bg-transparent font-medium text-[15px] text-white"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        <span className="whitespace-nowrap">{projects[index].title}</span>
      </motion.div>
    </>
  );
}
