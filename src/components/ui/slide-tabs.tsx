"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  label: string;
  href: string;
  external?: boolean;
  match: (pathname: string) => boolean;
}

const tabs: TabItem[] = [
  { label: "Home", href: "/", match: (path) => path === "/" },
  { label: "Projects", href: "/projects", match: (path) => path.startsWith("/projects") },
  { label: "About", href: "/about", match: (path) => path.startsWith("/about") },
  { label: "Resume", href: "/resume", match: (path) => path.startsWith("/resume") },
  { label: "Connect", href: "/contact", match: (path) => path.startsWith("/contact") },
  {
    label: "Lab (Exp)",
    href: "https://lab.priyanshu.world",
    external: true,
    match: (path) => path.startsWith("/lab"),
  },
];

export const SlideTabs = () => {
  const pathname = usePathname() || "/";

  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <ul className="flex w-fit items-center rounded-full border border-foreground/20 bg-gradient-to-b from-card/90 to-background/90 p-1 text-sm shadow-lg shadow-foreground/5 backdrop-blur-xl">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname);

          return (
            <li key={tab.label}>
              <Link
                href={tab.href}
                target={tab.external ? "_blank" : undefined}
                rel={tab.external ? "noopener noreferrer" : undefined}
                className={`block rounded-full px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-primary/20 text-foreground border border-primary/30"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
