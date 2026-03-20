"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  label: string;
  href: string;
  match: (hostname: string, pathname: string) => boolean;
}

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hostname, setHostname] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const isProd = hostname.includes("priyanshu.world");

  const tabs: TabItem[] = [
    { 
      label: "Home", 
      href: isProd ? "https://gis.priyanshu.world" : "/",
      match: (host, path) => host === "lab.priyanshu.world" ? false : path === "/"
    },
    { 
      label: "Lab", 
      href: isProd ? "https://lab.priyanshu.world" : "/lab",
      match: (host, path) => host === "lab.priyanshu.world" ? true : path.startsWith("/lab")
    },
  ];
  
  const getIndex = (host: string, p: string) => {
    return tabs.findIndex((tab) => tab.match(host, p));
  };
  
  const initialIndex = pathname?.startsWith("/lab") ? 1 : 0;
  const [selected, setSelected] = useState(initialIndex !== -1 ? initialIndex : 0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!pathname) return;
    const idx = getIndex(hostname, pathname);
    if (idx !== -1 && idx !== selected) {
      setSelected(idx);
    }
  }, [pathname, hostname, selected]);

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
        className="relative flex w-fit rounded-full border border-foreground/20 bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl p-1 shadow-lg shadow-foreground/5 dark:shadow-foreground/20 transition-all duration-300"
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
              className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground dark:hover:text-white transition-colors mix-blend-difference"
            >
              {tab.label}
            </Link>
          </li>
        ))}
        <motion.li
          animate={{ ...position }}
          className="absolute z-0 h-9 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/30 shadow-inner"
        />
      </ul>
    </nav>
  );
};
