"use client";

import React from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { FlaskConical, Sparkles, Beaker, Cpu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

export function LabDashboard() {
  const prefersReducedMotion = useReducedMotion();
  const labProjects = [
    {
      iframeSrc: "https://atmolens.priyanshu.world",
      scrollHeight: 1500,
      initialClipPercentage: 20,
      showcase: {
        eyebrow: "Featured Build",
        handwrittenLabel: "AtmoLens",
        title: "Atmospheric",
        accentTitle: "intelligence",
        description:
          "A geospatial interface study that turns weather fields and atmospheric layers into a cinematic, shader-driven mapping experience.",
        techStack: "GLSL / GIS / Weather Tiles",
        domain: "Climate Mapping",
        cursorLabel: "Open Build",
        placement: "left",
      },
    },
    {
      iframeSrc:
        "https://storymaps.arcgis.com/stories/a0889557b3594487992bff5c68a3ee5e",
      scrollHeight: 1500,
      initialClipPercentage: 20,
      showcase: {
        eyebrow: "Story Map",
        handwrittenLabel: "ArcGIS",
        title: "Spatial",
        accentTitle: "storytelling",
        description:
          "A narrative mapping project built in ArcGIS StoryMaps, pairing place-based writing with embedded maps and guided geographic context.",
        techStack: "ArcGIS / StoryMaps / GIS",
        domain: "Narrative Mapping",
        cursorLabel: "Open Story",
        placement: "right",
      },
    },
  ] as const;

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
          <motion.div
            aria-hidden="true"
            animate={
              prefersReducedMotion
                ? { opacity: 0.08, scale: 1 }
                : { opacity: [0.07, 0.14, 0.07], scale: [0.98, 1.04, 0.98] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={
              prefersReducedMotion
                ? { opacity: 0.05, y: 0, scale: 1 }
                : { opacity: [0.04, 0.1, 0.04], y: [0, 12, 0], scale: [1, 1.05, 1] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-card/5 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.35 }
                : { type: "spring", stiffness: 110, damping: 20, mass: 0.85 }
            }
            className="relative z-10 flex max-w-3xl flex-col items-center text-center"
          >
            <div className="mb-6 flex items-center gap-3 rounded-full border border-primary/20 bg-background/60 px-4 py-2 backdrop-blur-xl">
              <motion.div
                whileHover={prefersReducedMotion ? { scale: 1.03 } : { scale: 1.08, rotate: 18 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0.2 : 0.9,
              duration: prefersReducedMotion ? 0.25 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-16 flex flex-col items-center gap-2"
          >
            <p className="text-[10px] font-mono text-foreground/50 tracking-[0.2em] uppercase">scroll to explore the featured builds</p>
            <motion.div
              animate={prefersReducedMotion ? { opacity: 0.8 } : { y: [0, 8, 0], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 w-px bg-gradient-to-b from-primary/80 to-transparent"
            />
          </motion.div>
        </section>

        <div className="relative z-20 w-full">
          {labProjects.map((project) => (
            <section key={project.iframeSrc} className="relative w-full">
              <SmoothScrollHero
                iframeSrc={project.iframeSrc}
                scrollHeight={project.scrollHeight}
                initialClipPercentage={project.initialClipPercentage}
                showcase={project.showcase}
              />
            </section>
          ))}
        </div>

        <TapedFooter />
      </div>
    </div>
  );
}
