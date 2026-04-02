"use client";
import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  iframeSrc: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

const SmoothScrollHeroBackground: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  iframeSrc,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const { scrollYProgress } = useScroll();

  // Map the raw scroll progress specifically to this container's height mathematically
  // Actually, standard scrollY ranges from 0 to absolute pixels. 
  // Let's use standard tracking
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [300, scrollHeight + 300], // offset trigger since it's lower down the page
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [300, scrollHeight + 300],
    [finalClipPercentage, 100]
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const iframeScale = useTransform(
    scrollY,
    [300, scrollHeight + 800],
    [1.3, 1]
  );

  const captionY = useTransform(
    scrollY,
    [300, scrollHeight + 200],
    [100, -100]
  );
  
  const captionOpacity = useTransform(
    scrollY,
    [300, scrollHeight-200, scrollHeight + 100],
    [0, 1, 0]
  );

  // Fallback direct responsive iframe layout without blocking scaling mechanics
  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-background overflow-hidden flex items-center justify-center p-4 md:p-8"
      style={{
        clipPath,
        willChange: "transform, opacity, clip-path",
      }}
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_60%)] opacity-20 blur-[50px] mix-blend-screen pointer-events-none" />
      </div>
      
      {/* Live Iframe Wrapper with hardware acceleration scaling */}
      <motion.div
        className="relative w-full max-w-7xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-foreground/20 ring-4 ring-background/50 bg-card"
        style={{ scale: iframeScale, transformOrigin: 'center center' }}
      >
        <div className="absolute top-0 left-0 w-full h-10 bg-foreground/10 border-b border-foreground/20 backdrop-blur-md flex items-center px-4 gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 font-mono text-[10px] tracking-widest text-foreground/50">{iframeSrc}</span>
        </div>
        
        <iframe 
            src={iframeSrc} 
            className="w-full h-full pt-10 border-none"
            title="Project Interactive Window"
            loading="lazy"
        />
        
        {/* Anti-hijack overlay prevents accidental scrolling inside iframe when user tries to scroll page */}
        <div className="absolute inset-0 z-0 bg-transparent" />
      </motion.div>

      {/* Sticky Contextual Caption Layer overlaying the iframe rendering tree */}
      <motion.div 
        className="absolute bottom-20 left-10 md:left-20 z-50 p-6 md:p-10 rounded-2xl bg-card/60 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-xl pointer-events-none"
        style={{
            y: captionY,
            opacity: captionOpacity
        }}
      >
        <div className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Live Demo Protocol</div>
        <h3 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-4 leading-tight">Interactive <br/><span className="text-primary italic">AtmoLens</span></h3>
        <p className="text-foreground/80 md:text-lg">
            This isn't a screenshot. Scroll down to expand the live production WebGL rendering engine. Hover inside to interact directly with the GIS atmospheric framework.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function SmoothScrollHero({ iframeSrc }: { iframeSrc: string }) {
  // Use a strictly defined calc container to provide enough physical scrolling runway
  // for the Framer hooks to sequence properly down the viewport
  return (
    <div
      style={{ height: `calc(1500px + 100vh)` }}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground scrollHeight={1500} iframeSrc={iframeSrc} />
    </div>
  );
}
