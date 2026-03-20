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

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768 || "ontouchstart" in window;
    setIsMobile(mobileCheck);

    if (mobileCheck) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
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
  }, [cursorX, cursorY, isVisible, pathname]); // Re-register on pathname change if necessary

  if (isMobile) return null;

  return (
    <>
      <style>{`
        body, a, button, [role="button"], input, select, textarea, .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary/80 pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? "rgba(125, 206, 148, 0.4)" : "rgba(125, 206, 148, 0)",
          borderColor: isHovering ? "rgba(125, 206, 148, 0)" : "rgba(125, 206, 148, 0.8)",
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div 
          className="w-1 h-1 bg-primary rounded-full transition-opacity duration-150" 
          animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Global Interactive Gradient Background Element */}
      <motion.div
        className="fixed top-0 left-0 w-[1000px] h-[1000px] pointer-events-none z-[-1]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "calc(-50% + 12px)",
          translateY: "calc(-50% + 12px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 7%, transparent) 0%, color-mix(in srgb, var(--color-primary) 2%, transparent) 40%, transparent 70%)",
        }}
      />
    </>
  );
};
