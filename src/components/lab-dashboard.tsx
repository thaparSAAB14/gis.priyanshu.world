"use client";

import React from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { FlaskConical, Sparkles, Beaker, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

export function LabDashboard() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent transition-colors duration-300">
      <SlideTabs />
      
      {/* Fluid Bg Particle Element */}
      <DottedSurface className="opacity-80 fixed pointer-events-none" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-10 left-1/2 w-full h-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_50%)] opacity-10 blur-[30px] z-0"
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-96 z-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_70%)]" />
      
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Existing Lab Hero Banner */}
        <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 pb-20 pt-28">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-card/5 rounded-full blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex max-w-3xl flex-col items-center text-center"
          >
            <div className="mb-6 flex items-center gap-3 rounded-full border border-primary/20 bg-background/60 px-4 py-2 backdrop-blur-xl">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 90 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 p-2 shadow-xl shadow-primary/10"
              >
                <FlaskConical className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-foreground/60">
                Experimental Sandbox
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-bold leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl">
              The{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-foreground/80 bg-clip-text text-transparent">
                Lab
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-foreground/70 md:text-xl">
              A running archive of creative code, interface studies, and geospatial experiments built to test ideas in public.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/70">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /><span className="text-xs font-mono uppercase tracking-widest">creative code</span></div>
              <div className="hidden h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-800 sm:block" />
              <div className="flex items-center gap-2"><Beaker className="w-4 h-4 text-primary" /><span className="text-xs font-mono uppercase tracking-widest">prototypes</span></div>
              <div className="hidden h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-800 sm:block" />
              <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /><span className="text-xs font-mono uppercase tracking-widest">geospatial ui</span></div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute bottom-16 flex flex-col items-center gap-2">
            <p className="text-[10px] font-mono text-foreground/50 tracking-[0.2em] uppercase">scroll to enter the featured build</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-12 bg-gradient-to-b from-primary/80 to-transparent" />
          </motion.div>
        </section>

        <section className="relative w-full z-20">
          <SmoothScrollHero
            iframeSrc="https://atmolens.priyanshu.world"
            scrollHeight={1350}
            initialClipPercentage={18}
            showcase={{
              eyebrow: "Featured Build",
              handwrittenLabel: "AtmoLens",
              title: "Atmospheric",
              accentTitle: "intelligence",
              description:
                "A geospatial interface study that turns weather fields and atmospheric layers into a cinematic, shader-driven mapping experience.",
              techStack: "GLSL / GIS / Weather Tiles",
              domain: "Climate Mapping",
              cursorLabel: "Open Build",
            }}
          />
        </section>

        <TapedFooter />
      </div>
    </div>
  );
}
