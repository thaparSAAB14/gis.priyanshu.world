"use client";

import React, { useState, useEffect, useRef } from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { AsciiVideoPlayer } from "@/components/ui/ascii-video-player";
import { FlaskConical, Sparkles, Beaker, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";

export function LabDashboard() {
  const [showVideo, setShowVideo] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "> boot sequence initiated.",
    "> parsing portfolio files...",
    "> WARNING: ego detected in repository.",
    "> ignoring warnings. continuing execution."
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sarcasticLogs = [
      "> compiling CSS... still compiling... why do you have so much CSS?",
      "> rewriting your terrible code in Rust.",
      "> AI agent is silently judging your component structure.",
      "> simulating productivity...",
      "> breaking production just to feel something.",
      "> npm install... gathering 2,000,000 dependencies.",
      "> analyzing user cursor movement... incredibly slow.",
      "> WARNING: caffeine levels critically low.",
      "> deploying to staging... staging is down.",
      "> executing rm -rf node_modules just in case.",
      "> formatting code... fixing 400 spacing errors.",
      "> finding meaning in digital void... failed.",
      "> pushing to prod on a Friday. bold move.",
      "> 60FPS ASCII engine running perfectly. React tree crying.",
      "> checking git status... 4,032 uncommitted changes.",
      "> waiting for Vercel to build... maybe grab a coffee?",
      "> implementing dark mode... oh wait, it's already dark."
    ];

    const asciiArts = [
      "\n [ SYSTEM THINKING ]\n  .---.\n /     \\\n| () () |\n \\  ^  /\n  |||||\n",
      "\n [ NEURAL UPLINK ACTIVE ]\n    /\\\n   /  \\\n  /____\\\n (______)\n",
      "\n [ RESEARCHING STACKOVERFLOW ]\n   _____\n  |     |\n  |_|_|_|\n  |_____|\n > copy-pasting logic blocks...\n",
      "\n [ TYPING AT 1200 WPM ]\n  _   _   _   _   _ \n / \\ / \\ / \\ / \\ / \\\n( H | A | C | K | I )\n \\_/ \\_/ \\_/ \\_/ \\_/\n",
      "\n [ LOADING EXTERNAL MODULES ]\n [▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░] 85%\n > downloading 400MB of pure node modules.\n"
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setLogs(prev => {
          const isArt = Math.random() > 0.85; 
          const newLog = isArt 
            ? asciiArts[Math.floor(Math.random() * asciiArts.length)]
            : sarcasticLogs[Math.floor(Math.random() * sarcasticLogs.length)];
            
          return [...prev.slice(-14), newLog];
        });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      <DottedSurface className="opacity-80 fixed pointer-events-none" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-10 left-1/2 w-full h-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_50%)] opacity-10 blur-[30px] z-0"
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-96 z-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_70%)]" />
      <div className="relative z-10">
        <SlideTabs />
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
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

        <section className="relative w-full py-40 min-h-screen flex flex-col items-center justify-center z-20 px-4">
          <div className="absolute inset-0 -z-10 bg-background/50 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-bold text-foreground font-display text-center mb-6 tracking-tight">
            I swear I&apos;m <span className="text-primary italic">cooking</span>.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-xl text-center mb-16">
            This tab is supposed to be packed with mind-blowing digital experiments. Instead, I got distracted and engineered a highly optimized sarcastic rendering terminal.
          </p>
          <div data-terminal-cursor="true" className={cn("bg-card/20 backdrop-blur-2xl border border-foreground/30 rounded-xl flex flex-col transition-all duration-500 overflow-hidden shadow-2xl ring-1 ring-white/10 dark:ring-white/5", showVideo ? "relative w-full max-w-5xl xl:max-w-6xl h-[70vh] min-h-[600px] lg:min-h-[800px] mt-8 z-30" : "relative w-full max-w-3xl h-[450px] mt-8 z-20")}>
            <div className="h-12 bg-foreground/10 border-b border-foreground/20 flex items-center px-4 justify-between backdrop-blur-md">
              <div className="flex items-center gap-2 opacity-40"><div className="w-3 h-3 rounded-full bg-foreground" /><div className="w-3 h-3 rounded-full bg-foreground" /><div className="w-3 h-3 rounded-full bg-foreground" /></div>
              <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] text-foreground/40 uppercase tracking-[0.2em] font-medium hidden sm:block">simulated_productivity.exe</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowVideo(!showVideo)} className={cn("px-4 py-1.5 font-mono text-[10px] rounded-md transition-all border font-bold tracking-widest shadow-sm", showVideo ? "bg-primary/10 text-primary border-primary/30" : "text-foreground/50 border-transparent hover:bg-foreground/5 hover:text-foreground")}>
                  {showVideo ? "[ CLOSE ASCII ENGINE ]" : "[ LAUNCH ASCII ENGINE ]"}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative flex flex-col">
              {!showVideo ? (
                <div className="flex-1 bg-foreground/5 backdrop-blur-xl flex flex-col font-mono text-xs overflow-hidden shadow-2xl relative z-40">
                  <div className="p-3 border-b border-foreground/10 bg-foreground/5 text-foreground/40 text-[10px] uppercase tracking-widest flex justify-between items-center">
                    <span className="hidden sm:inline">{">"} server_health_ctrl</span><span className="sm:hidden">{">"} logs</span>
                    <span className="animate-pulse text-primary font-bold shadow-primary drop-shadow-[0_0_5px_var(--color-primary)]">• LIVE</span>
                  </div>
                  <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 !scrollbar-thin !scrollbar-thumb-foreground/10">
                    {logs.map((log, i) => (
                      <motion.div key={`${i}-${Math.random()}`} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className={cn("font-mono tracking-tight", log.includes("\n") ? "whitespace-pre text-[10px] leading-tight opacity-70" : "leading-relaxed", log.includes("WARNING") || log.includes("ERROR") || log.includes("failed") || log.includes("down") ? "text-red-400/90" : log.includes("SUCCESS") || log.includes("[") ? "text-primary" : "text-foreground/60")}>
                        {log}
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-foreground/10 bg-foreground/5 text-foreground/30 text-[10px] flex items-center gap-2">
                    <span className="animate-pulse font-bold text-foreground/50">_</span><span className="truncate">waiting for user competence...</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-hidden relative transition-all duration-500 bg-background/50">
                  <AsciiVideoPlayer onExit={() => setShowVideo(false)} />
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-foreground/40">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" /><p className="text-sm text-foreground/70 ">made by <span className="text-primary font-medium">Priyanshu</span> <span className="italic text-foreground/70 ">with intentions</span></p>
          </div>
        </footer>
      </div>
    </div>
  );
}
