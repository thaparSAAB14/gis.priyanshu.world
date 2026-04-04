"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const BongoCat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Paw/Eye tracking transformations
  const eyeX = useTransform(smoothX, [-100, 100], [-3, 3]);
  const eyeY = useTransform(smoothY, [-100, 100], [-3, 3]);
  
  const leftPawX = useTransform(smoothX, [-150, 150], [-10, 20]);
  const leftPawY = useTransform(smoothY, [-150, 150], [50, 30]);
  
  const rightPawX = useTransform(smoothX, [-150, 150], [-20, 10]);
  const rightPawY = useTransform(smoothY, [-150, 150], [50, 30]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-card to-background overflow-hidden"
    >
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_70%)] opacity-5 blur-2xl" />
      
      <svg
        viewBox="0 0 200 150"
        className="w-48 h-auto drop-shadow-2xl z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cat Body */}
        <path
          d="M40 100C40 60 70 40 100 40C130 40 160 60 160 100V130H40V100Z"
          fill="white"
          stroke="var(--color-primary)"
          strokeWidth="4"
          className="opacity-90"
        />
        
        {/* Ears */}
        <path d="M50 50L40 30L65 45L50 50Z" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
        <path d="M150 50L160 30L135 45L150 50Z" fill="white" stroke="var(--color-primary)" strokeWidth="3" />

        {/* Dynamic Eyes */}
        <motion.g style={{ x: eyeX, y: eyeY }}>
          <circle cx="80" cy="75" r="4" fill="var(--color-primary)" />
          <circle cx="120" cy="75" r="4" fill="var(--color-primary)" />
        </motion.g>

        {/* Blush */}
        <circle cx="70" cy="85" r="3" fill="var(--color-primary)" opacity="0.2" />
        <circle cx="130" cy="85" r="3" fill="var(--color-primary)" opacity="0.2" />

        {/* Mouth */}
        <path
          d="M95 85C95 85 97.5 88 100 88C102.5 88 105 85 105 85"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Left Paw - Tracing Mouse */}
        <motion.path
          style={{ x: leftPawX, y: leftPawY }}
          d="M10 0C10 -5 15 -10 25 -10C35 -10 40 -5 40 0V15H10V0Z"
          fill="white"
          stroke="var(--color-primary)"
          strokeWidth="4"
          transform="translate(45, 60)"
        />

        {/* Right Paw - Tracing Mouse */}
        <motion.path
          style={{ x: rightPawX, y: rightPawY }}
          d="M0 0C0 -5 5 -10 15 -10C25 -10 30 -5 30 0V15H0V0Z"
          fill="white"
          stroke="var(--color-primary)"
          strokeWidth="4"
          transform="translate(125, 60)"
        />

        {/* Desk/Surface */}
        <rect x="30" y="125" width="140" height="4" rx="2" fill="var(--color-primary)" opacity="0.3" />
      </svg>
      
      {/* Table Detail */}
      <div className="absolute bottom-0 w-full h-[15%] bg-card border-t border-primary/10 shadow-inner z-0" />
    </div>
  );
};
