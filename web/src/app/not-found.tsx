"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

const Page = () => (
  <div className="w-full h-full bg-gradient-to-b from-white to-neutral-50 dark:from-[#1c1c2e] dark:to-[#141420] rounded-xl border border-neutral-200 dark:border-[#2a2a3e] p-4 shadow-sm">
    <div className="flex flex-col gap-2">
      <div className="w-full h-1.5 bg-neutral-200 dark:bg-white/5 rounded-full" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-white/5 rounded-full" />
          <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-white/5 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    {
      initial: { rotate: -3, x: -38, y: 2 },
      open: { rotate: -8, x: -70, y: -75 },
      transition: {
        type: "spring" as const,
        bounce: 0.15,
        stiffness: 160,
        damping: 22,
      },
      className: "z-10",
    },
    {
      initial: { rotate: 0, x: 0, y: 0 },
      open: { rotate: 1, x: 2, y: -95 },
      transition: {
        type: "spring" as const,
        duration: 0.55,
        bounce: 0.12,
        stiffness: 190,
        damping: 24,
      },
      className: "z-20",
    },
    {
      initial: { rotate: 3.5, x: 42, y: 1 },
      open: { rotate: 9, x: 75, y: -80 },
      transition: {
        type: "spring" as const,
        duration: 0.58,
        bounce: 0.17,
        stiffness: 170,
        damping: 21,
      },
      className: "z-10",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-24 px-4 transition-colors duration-300">
      {/* Title */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-neutral-900 dark:text-white tracking-tight">
          Lost in{" "}
          <span className="relative inline-flex items-center gap-2 px-4 py-1 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:bg-emerald-500/5 dark:border-emerald-500/10 dark:text-emerald-400">
            Space
            <span className="inline-block text-2xl">🌍</span>
          </span>
        </h2>
        <p className="mt-4 text-lg text-neutral-500 dark:text-white/30 font-mono">
          error 404 — coordinates not found
        </p>
      </div>

      {/* Animated folder */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-80 h-52 relative group cursor-pointer mb-16"
      >
        <div
          className="folder-back relative w-[87.5%] mx-auto h-full flex justify-center rounded-xl overflow-visible"
          style={{
            background: "#1c1c2e",
            border: "1px solid #2a2a3e",
          }}
        >
          {pages.map((page, i) => (
            <motion.div
              key={i}
              initial={page.initial}
              animate={isOpen ? page.open : page.initial}
              transition={page.transition}
              className={`absolute top-2 w-32 h-fit rounded-xl shadow-lg ${page.className}`}
            >
              <Page />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ rotateX: isOpen ? -35 : 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="absolute inset-x-0 -bottom-px z-30 h-44 rounded-3xl origin-bottom flex justify-center items-center overflow-visible"
        >
          <div className="relative w-full h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 235 121"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z"
                fill="#141420"
                stroke="#2a2a3e"
                strokeWidth="1.5"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
              <div className="flex gap-11 mb-2.5">
                <div className="w-2.5 h-2.5 bg-emerald-500/30 rounded-full" />
                <div className="w-2.5 h-2.5 bg-emerald-500/30 rounded-full" />
              </div>
              <div className="w-9 h-1 bg-emerald-500/30 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Message */}
      <div className="text-center space-y-4">
        <p className="text-xl text-neutral-900 dark:text-white tracking-tight">
          This page doesn&apos;t exist <br />
          <span className="text-neutral-500 dark:text-white/40 text-lg">
            Click the folder to reveal what&apos;s not here
          </span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-300 dark:border-[#2a2a3e] bg-white dark:bg-[#141420] hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
          >
            <Home className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span className="text-sm font-medium text-neutral-800 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              Go Home
            </span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-dashed border-neutral-300 dark:border-[#2a2a3e] hover:border-neutral-500 dark:hover:border-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-500 dark:text-white/40 group-hover:text-neutral-700 dark:group-hover:text-white/60 transition-colors" />
            <span className="text-sm font-medium text-neutral-500 dark:text-white/40 group-hover:text-neutral-700 dark:group-hover:text-white/60 transition-colors">
              Go Back
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
