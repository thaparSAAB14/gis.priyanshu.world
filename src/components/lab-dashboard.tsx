"use client";

import React from "react";
import { LampContainer } from "@/components/ui/lamp";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { FlaskConical, Sparkles, Beaker, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";

export function LabDashboard() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      <DottedSurface className="opacity-80 fixed pointer-events-none" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-10 left-1/2 w-full h-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_50%)] opacity-10 blur-[30px] z-0"
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-96 z-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_70%)]" />
      
      <div className="relative z-10 w-full flex flex-col">
        {/* Lamp Top Navigation Header */}
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-gradient-to-br from-foreground to-foreground/60 py-4 bg-clip-text text-center text-4xl font-display font-medium tracking-tight text-transparent md:text-7xl"
          >
            Digital <br /> Laboratory
          </motion.h1>
        </LampContainer>

        {/* Existing Lab Hero Banner */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 -mt-32">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-card/5 rounded-full blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 180 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 shadow-xl shadow-primary/10 cursor-pointer"
              >
                <FlaskConical className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-foreground mb-4 leading-none">
              The <span className="bg-gradient-to-r from-primary via-primary to-foreground/80 bg-clip-text text-transparent">Lab</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-lg mb-8">
              A showcase of my digital experiments, creative coding, and everything else I build online just to show off.
            </p>
            <div className="flex items-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4" /><span className="text-xs font-mono">experimental</span></div>
              <div className="w-1 h-1 rounded-full bg-neutral-300 " /><div className="flex items-center gap-2"><Beaker className="w-4 h-4" /><span className="text-xs font-mono">prototypes</span></div>
              <div className="w-1 h-1 rounded-full bg-neutral-300 " /><div className="flex items-center gap-2"><Cpu className="w-4 h-4" /><span className="text-xs font-mono">creative</span></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute bottom-8 flex flex-col items-center gap-2">
            <p className="text-xs font-mono text-foreground/70 ">scroll to explore</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* New Smooth Scroll Iframe Component replacing the Terminal */}
        <section className="relative w-full z-20 top-[-70px]">
          <SmoothScrollHero iframeSrc="https://atmolens.priyanshu.world" />
        </section>

        <footer className="py-12 px-4 border-t border-foreground/40 mt-32 relative z-30">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="text-sm text-foreground/70 ">made by <span className="text-primary font-medium">Priyanshu</span> <span className="italic text-foreground/70 ">with intentions</span></p>
          </div>
        </footer>
      </div>
    </div>
  );
}
