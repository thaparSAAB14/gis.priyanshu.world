"use client";

import React from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { Copy, Mail, MapPin } from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";

export function ContactDashboard() {
  const [copied, setCopied] = React.useState(false);
  const email = "connect@priyanshu.world";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BackgroundPaths className="transition-colors duration-300">
      <SlideTabs />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-32 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full flex flex-col items-center text-center gap-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 shadow-xl shadow-primary/5">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground leading-tight tracking-tight">
              Let's build something <br />
              <span className="text-primary italic">together.</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-lg mt-2">
              Currently open for new opportunities in geospatial analysis, mapping, and web engineering.
            </p>
          </div>

          <div className="w-full bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-sm font-mono text-primary tracking-widest uppercase">Direct Email</span>
              <div 
                onClick={handleCopy}
                className="group flex items-center gap-4 px-6 py-4 bg-background border border-foreground/10 rounded-2xl cursor-pointer hover:border-primary/50 transition-all hover:shadow-md hover:shadow-primary/10 active:scale-95"
              >
                <span className="text-xl md:text-2xl font-mono text-foreground font-semibold tracking-tight">{email}</span>
                <div className="w-px h-6 bg-foreground/10" />
                <Copy className={`w-5 h-5 transition-colors ${copied ? "text-green-500" : "text-foreground/40 group-hover:text-primary"}`} />
              </div>
              {copied && <span className="text-xs text-green-500 font-mono mt-2 absolute -bottom-6">Copied to clipboard!</span>}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-2" />

            <div className="relative z-10 flex flex-wrap justify-center items-center gap-6">
              <a href={`mailto:${email}`}>
                <ButtonWithIcon label="SEND EMAIL" icon={Mail} className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20" />
              </a>
              <a href="https://www.linkedin.com/in/priyanshu-624aa8368/" target="_blank" rel="noopener noreferrer">
                <ButtonWithIcon label="LINKEDIN" className="bg-card hover:bg-card/90 text-foreground border border-foreground/20" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-foreground/50 text-sm font-mono">
             <MapPin className="w-4 h-4" /> Based in Metro-Vancouver, BC
          </div>
        </motion.div>
      </main>

      <TapedFooter />
    </BackgroundPaths>
  );
}
