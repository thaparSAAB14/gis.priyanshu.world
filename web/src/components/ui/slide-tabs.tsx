"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  label: string;
  href: string;
}

const tabs: TabItem[] = [
  { label: "Home", href: "/" },
  { label: "Lab", href: "/lab" },
];

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const pathname = usePathname();
  
  const getIndex = (p: string) => {
    return tabs.findIndex((tab) => {
      if (tab.href === "/") return p === "/";
      return p === tab.href || (p && p.startsWith(tab.href + "/"));
    });
  };
  
  const initialIndex = getIndex(pathname ?? "/");
  const [selected, setSelected] = useState(initialIndex !== -1 ? initialIndex : 0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!pathname) return;
    const idx = getIndex(pathname);
    console.log("SlideTabs Pathname change:", pathname, "Evaluated to index:", idx);
    if (idx !== -1 && idx !== selected) {
      setSelected(idx);
    }
  }, [pathname, selected]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  const handleMouseLeave = () => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <ul
        onPointerLeave={(e) => {
          if (e.pointerType === "touch") return;
          handleMouseLeave();
        }}
        className="relative flex w-fit rounded-full border border-neutral-200 dark:border-[#2a2a3e] bg-white/80 dark:bg-[#141420]/80 backdrop-blur-xl p-1 transition-colors duration-300"
      >
        {tabs.map((tab, i) => (
          <li
            key={tab.label}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            onClick={() => setSelected(i)}
            onPointerEnter={(e) => {
              if (e.pointerType === "touch") return; // Prevents "double tap" bug on mobile
              const el = tabsRef.current[i];
              if (!el) return;
              const { width } = el.getBoundingClientRect();
              setPosition({
                left: el.offsetLeft,
                width,
                opacity: 1,
              });
            }}
            className="relative z-10 block cursor-pointer"
          >
            <Link
              href={tab.href}
              className="block px-4 py-2 text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white transition-colors mix-blend-difference"
            >
              {tab.label}
            </Link>
          </li>
        ))}
        <motion.li
          animate={{ ...position }}
          className="absolute z-0 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30"
        />
      </ul>
    </nav>
  );
};
