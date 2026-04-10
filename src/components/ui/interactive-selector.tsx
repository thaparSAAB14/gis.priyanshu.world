"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Map, Compass, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Bear Sighting Network",
      description: "Auto-updating survey-driven wildlife database",
      image: "/projects/metro-vancouver-municipalities.jpeg",
      icon: <Globe size={20} className="text-white" />
    },
    {
      title: "Metro Vancouver Geology",
      description: "Publication-ready QGIS cartography & spatial design",
      image: "/projects/geological-map-metro-vancouver.jpeg",
      icon: <Map size={20} className="text-white" />
    },
    {
      title: "Field Route Analytics",
      description: "Complex overlay analysis of geological transit networks",
      image: "/projects/geology-route-queen-elizabeth.jpeg",
      icon: <Compass size={20} className="text-white" />
    },
    {
      title: "Multi-Scale Mapping",
      description: "High-precision map projections & boundary contexts",
      image: "/projects/study-area-location-map.jpeg",
      icon: <Layers size={20} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Stagger the entrance animation using state to avoid CSS parsing conflicts
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4 font-sans text-white w-full rounded-2xl overflow-hidden mt-8 max-w-6xl mx-auto"> 
      {/* Header Section mapped cleanly to Next.js Tailwind configuration globally */}
      <div className="w-full max-w-2xl px-6 mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-[300ms] fill-mode-both">
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight font-display">Core GIS Deliverables</h2>
        <p className="text-lg md:text-xl text-foreground/70 font-medium max-w-xl mx-auto">Explore production-ready spatial analysis, dynamic web mapping, and publication-quality cartography.</p>
      </div>

      {/* Options Slider Container */}
      <div className="flex w-full xl:max-w-5xl h-[400px] md:h-[500px] items-stretch overflow-hidden relative gap-2 md:gap-4 px-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer rounded-2xl md:rounded-3xl border border-white/10",
              activeIndex === index 
                ? "flex-[7] border-white/50 shadow-[0_20px_60px_rgba(30,157,241,0.2)] z-10" 
                : "flex-1 shadow-md z-0 hover:flex-[1.5]"
            )}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'cover' : 'cover', // Ensures full responsive fill
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dark Mask for Text Visibility */}
            <div 
              className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              style={{
                bottom: activeIndex === index ? '0' : '-60px',
                height: '240px',
              }}
            />
            
            {/* Label container logic (Title & Subtitle) */}
            <div className="absolute left-0 right-0 bottom-6 flex items-center justify-start z-10 pointer-events-none px-4 md:px-6 w-full">
              {/* Glassmorphism Icon Layer */}
              <div className="min-w-[40px] h-[40px] md:min-w-[50px] md:h-[50px] flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md shadow-xl border border-white/20 transition-all duration-300">
                {option.icon}
              </div>
              
              {/* Dynamic Text Scaling Frame */}
              <div className="text-white whitespace-pre ml-4 overflow-hidden relative">
                <div 
                  className="font-bold text-lg md:text-2xl transition-all duration-700 ease-in-out mb-1 font-display tracking-tight text-white/95"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="text-sm md:text-md text-gray-300 transition-all duration-700 ease-in-out line-clamp-1"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
