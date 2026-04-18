"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the trailing glow
  const glowSpring = { damping: 30, stiffness: 180, mass: 0.3 };
  const glowX = useSpring(cursorX, glowSpring);
  const glowY = useSpring(cursorY, glowSpring);

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768 || "ontouchstart" in window;
    setIsMobile(mobileCheck);

    if (mobileCheck) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 2);
      cursorY.set(e.clientY - 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Suspend completely over Terminal/Ascii Engine components
      if (target.closest("[data-terminal-cursor]") || target.closest(".terminal-layer")) {
         setIsVisible(false);
         return;
      }
      
      if (!isVisible) setIsVisible(true);

      // Scale matrix over typical interactive web nodes
      if (target.closest("a, button, input, select, textarea, [role='button'], .cursor-pointer")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, pathname]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        body, a, button, [role="button"], input, select, textarea, .cursor-pointer {
          cursor: none !important;
        }
      `}</style>

      {/* Trailing particle glow — lags slightly behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width:  isHovering ? 48 : 28,
            height: isHovering ? 48 : 28,
            opacity: isHovering ? 0.55 : 0.35,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 80%, transparent) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Sharp dot — snaps precisely to cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width:  isHovering ? 7 : 4,
            height: isHovering ? 7 : 4,
            opacity: isHovering ? 1 : 0.85,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            boxShadow: "0 0 6px 1px color-mix(in srgb, var(--color-primary) 60%, transparent)",
          }}
        />
      </motion.div>

      {/* Wide ambient gradient that tracks the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[900px] h-[900px] pointer-events-none z-[-1]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "calc(-50%)",
          translateY: "calc(-50%)",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, color-mix(in srgb, var(--color-primary) 2%, transparent) 40%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};
