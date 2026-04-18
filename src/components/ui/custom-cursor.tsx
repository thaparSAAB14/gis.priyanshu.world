"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  // Dot — snaps very fast
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotSpring = { damping: 28, stiffness: 500, mass: 0.08 };
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  // Ring — lags noticeably behind the dot
  const ringSpring = { damping: 22, stiffness: 140, mass: 0.6 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768 || "ontouchstart" in window;
    setIsMobile(mobileCheck);
    if (mobileCheck) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest("[data-terminal-cursor]") ||
        target.closest(".terminal-layer")
      ) {
        setIsVisible(false);
        return;
      }

      if (!isVisible) setIsVisible(true);

      if (
        target.closest(
          "a, button, input, select, textarea, [role='button'], .cursor-pointer"
        )
      ) {
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

      {/* ── Chasing ring — lags behind, gives the "particle orbit" feel ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            width:  isHovering ? 34 : 16,
            height: isHovering ? 34 : 16,
            backgroundColor: isHovering ? "var(--primary)" : "transparent",
            opacity: isHovering ? 0.12 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            borderRadius: "50%",
            border: "1.5px solid var(--primary)",
            opacity: 0.45,
          }}
        />
      </motion.div>

      {/* ── Precise dot — snaps to real position ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          animate={{
            width:  isHovering ? 8 : 5,
            height: isHovering ? 8 : 5,
          }}
          transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
          }}
        />
      </motion.div>

      {/* ── Ambient page glow that follows cursor slowly ── */}
      <motion.div
        className="fixed top-0 left-0 w-[700px] h-[700px] pointer-events-none z-[-1]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, oklch(from var(--primary) l c h / 0.06) 0%, transparent 65%)",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </>
  );
};
