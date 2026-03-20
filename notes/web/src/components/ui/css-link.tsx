"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export const AnimatedLink = ({
  children,
  href,
  className,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener"
        className={cn(
          "group relative flex items-center",
          "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-current before:content-['']",
          "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:before:origin-left hover:before:scale-x-100",
          className
        )}
      >
        {children}
        <svg
          className="ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          fill="none"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
};
