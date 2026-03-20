"use client";

import React from "react";
import ImageReveal from "@/components/ui/image-tiles";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { FlaskConical, Sparkles, Beaker, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const labProjects = [
  {
    title: "Terrain Visualizer",
    description:
      "Interactive 3D terrain rendering from DEM data with custom shading.",
    images: {
      left: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      middle:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop",
      right:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=400&fit=crop",
    },
  },
  {
    title: "Urban Heat Map",
    description:
      "Real-time urban heat island analysis using satellite thermal data.",
    images: {
      left: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
      middle:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop",
      right:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
    },
  },
  {
    title: "Watershed Analyzer",
    description:
      "Automated watershed delineation and flow accumulation modeling.",
    images: {
      left: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&h=400&fit=crop",
      middle:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
      right:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    },
  },
];

export default function LabPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <SlideTabs />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <FlaskConical className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-neutral-900 dark:text-white mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              Lab
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-white/40 max-w-lg mb-8">
            Experimental geospatial projects, creative explorations, and things
            I build for fun.
          </p>

          <div className="flex items-center gap-6 text-neutral-500 dark:text-white/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono">experimental</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/20" />
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4" />
              <span className="text-xs font-mono">prototypes</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/20" />
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-mono">creative</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <p className="text-xs font-mono text-neutral-500 dark:text-white/20">scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 mb-2">
              // lab.projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-display">
              Fun Experiments
            </h2>
          </div>

          <div className="space-y-32">
            {labProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="mb-8">
                  <ImageReveal
                    leftImage={project.images.left}
                    middleImage={project.images.middle}
                    rightImage={project.images.right}
                  />
                </div>
                <div className="text-center max-w-md">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-white/40">{project.description}</p>
                  <div className="mt-4 flex justify-center">
                    <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      experiment #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#2a2a3e]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <p className="text-sm text-neutral-500 dark:text-white/30">
            made by{" "}
            <span className="text-emerald-500 font-medium">Priyanshu</span>{" "}
            <span className="italic text-neutral-400 dark:text-white/20">with intentions</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
