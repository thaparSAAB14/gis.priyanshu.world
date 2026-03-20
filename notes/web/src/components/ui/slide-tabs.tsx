"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

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

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <ul
        onMouseLeave={() => {
          const selectedTab = tabsRef.current[selected];
          if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect();
            setPosition({
              left: selectedTab.offsetLeft,
              width,
              opacity: 1,
            });
          }
        }}
        className="relative flex w-fit rounded-full border border-[#2a2a3e] bg-[#141420]/80 backdrop-blur-xl p-1"
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.label}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            setPosition={setPosition}
            onClick={() => setSelected(i)}
            href={tab.href}
          >
            {tab.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  onClick: () => void;
  href: string;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick, href }, ref) => {
    const liRef = useRef<HTMLLIElement | null>(null);

    const setRefs = (el: HTMLLIElement | null) => {
      liRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLLIElement | null>).current = el;
      }
    };

    return (
      <li
        ref={setRefs}
        onClick={onClick}
        onMouseEnter={() => {
          if (!liRef.current) return;
          const { width } = liRef.current.getBoundingClientRect();
          setPosition({
            left: liRef.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 block cursor-pointer"
      >
        <Link
          href={href}
          className="block px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors mix-blend-difference"
        >
          {children}
        </Link>
      </li>
    );
  }
);

Tab.displayName = "Tab";

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30"
    />
  );
};
