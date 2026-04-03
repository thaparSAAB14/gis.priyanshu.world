"use client";

import React from "react";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

export function LabDashboard() {
  return (
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      {/* Global Navigation */}
      <SlideTabs />
      
      {/* Hero Section: Interactive Showcase */}
      <section className="relative w-full z-10">
        <SmoothScrollHero iframeSrc="https://atmolens.priyanshu.world" />
      </section>

      {/* Footer replacing the old standard one to match global vibe, or returning to what was there */}
      <TapedFooter />
    </div>
  );
}
