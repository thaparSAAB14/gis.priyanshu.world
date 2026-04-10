"use client";

import React, { useState, useEffect } from 'react';
import { Tent, Flame, Droplets, Bath, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Luxury Tent",
      description: "Cozy glamping under the stars",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      icon: <Tent size={20} className="text-white" />
    },
    {
      title: "Campfire Feast",
      description: "Gourmet s'mores & stories",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      icon: <Flame size={20} className="text-white" />
    },
    {
      title: "Lakeside Retreat",
      description: "Private dock & canoe rides",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      icon: <Droplets size={20} className="text-white" />
    },
    {
      title: "Mountain Spa",
      description: "Outdoor sauna & hot tub",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      icon: <Bath size={20} className="text-white" />
    },
    {
      title: "Guided Adventure",
      description: "Expert-led nature tours",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      icon: <Compass size={20} className="text-white" />
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
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight font-display">Escape in Style</h2>
        <p className="text-lg md:text-xl text-foreground/70 font-medium max-w-xl mx-auto">Discover luxurious experiences in nature’s most breathtaking spots.</p>
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
