"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export const TerminalCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768 || "ontouchstart" in window;
    setIsMobile(mobileCheck);
    if (mobileCheck) return;

    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Crosshair explicitly renders over anything wrapped in data-terminal-cursor
      if (target.closest("[data-terminal-cursor]") || target.closest(".terminal-layer")) {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
        if (!isVisible) setIsVisible(true);
      } else {
         if (isVisible) setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isVisible, pathname]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        [data-terminal-cursor="true"] * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100000] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-8 h-8 border border-primary/50 shadow-[0_0_8px_rgba(255,255,255,0.1)] rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="w-1 h-1 bg-primary/80 rounded-full shadow-[0_0_3px_rgba(255,255,255,0.2)]" />
          <div className="absolute w-10 h-[1px] bg-primary/40" />
          <div className="absolute w-[1px] h-10 bg-primary/40" />
        </div>
      </motion.div>
    </>
  );
};
