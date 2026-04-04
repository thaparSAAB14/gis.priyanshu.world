"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Timeline } from "@/components/ui/timeline";
import { Radar } from "@/components/ui/radar-effect";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

import { SlideTabs } from "@/components/ui/slide-tabs";
import {
  MapPin,
  Github,
  Linkedin,
  FlaskConical,
  Globe,
  Layers,
  Database,
  Satellite,
  Map,
  Code,
  Briefcase,
  Mail,
} from "lucide-react";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

export default function Home() {
  const timelineData = [
    {
      title: "Nov 2025 - Present",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            <span className="text-primary font-medium text-lg">Geospatial Research Assistant</span>
          </p>
          <ul className="text-foreground/70 text-xs md:text-sm font-normal mb-8 list-none space-y-3">
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Collaborating with faculty on an academic book project involving geographic and spatial analysis.</li>
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Developing custom GIS maps, figures, and spatial visualizations to support scholarly content.</li>
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Supporting research through geospatial data sourcing, cleaning, integration, and visualization.</li>
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Translating complex geographic concepts into clear, publication-quality spatial representations.</li>
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Gaining exposure to academic research standards, documentation, and publication workflows.</li>
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Academic Research", "Map Design", "Spatial Visualization", "Data Sourcing"].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "May 2025 - Dec 2025",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            <span className="text-foreground font-medium text-lg">GIS Analyst</span> <span className="opacity-50">&mdash; Academic Projects & Applied Labs</span>
          </p>
          <ul className="text-foreground/70 text-xs md:text-sm font-normal mb-6 list-none space-y-3">
            <li className="flex gap-3"><span className="text-foreground/30 mt-1 text-[10px]">&bull;</span> Designed and analyzed spatial datasets using QGIS and ArcGIS, managing vector and raster data, projections, and attribute tables for academic GIS labs.</li>
            <li className="flex gap-3"><span className="text-foreground/30 mt-1 text-[10px]">&bull;</span> Performed spatial analysis and geoprocessing, including overlay analysis, buffering, querying, classification, and thematic mapping.</li>
            <li className="flex gap-3"><span className="text-foreground/30 mt-1 text-[10px]">&bull;</span> Produced professional, publication-ready maps using cartographic design principles to support geographic analysis and scenario modeling.</li>
            <li className="flex gap-3"><span className="text-primary mt-1 text-[10px]">&bull;</span> Developed a survey-driven, auto-updating GIS map as part of a course-based project, linking data collection to dynamic spatial visualization.</li>
          </ul>
          <div className="mb-8">
            <a 
              href="https://arcg.is/y0efn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-card border border-foreground/20 rounded-full text-sm font-mono hover:bg-foreground/5 hover:border-primary/50 shadow-xl shadow-primary/5 hover:shadow-primary/20 hover:text-primary transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-primary animate-pulse" />
              [ View Web Map Application ]
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["QGIS", "ArcGIS", "Geoprocessing", "Thematic Mapping", "Web GIS"].map(
              (tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-card/50 backdrop-blur-md text-foreground/70 border border-foreground/10">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      ),
    },
    {
      title: "May 2024 - Apr 2026",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-2">
            <span className="text-foreground/80 font-bold tracking-tight text-xl">Capilano University</span>
          </p>
          <p className="text-primary text-xs md:text-sm font-mono mb-4 uppercase tracking-widest">
            Associate of Science <span className="opacity-50 lowercase tracking-normal text-foreground">(North Vancouver, BC)</span>
          </p>
          <div className="text-foreground/70 text-xs md:text-sm font-normal mb-6 leading-relaxed bg-foreground/5 border border-foreground/10 p-5 rounded-xl">
            <strong className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-primary" />
              Relevant Coursework
            </strong>
             Geographic Information Systems (GIS), Spatial Analysis & Cartography, Physical Geography, Weather & Climate Systems, Statistics for Data Analysis, Calculus I, Precalculus Mathematics, Physics for Life Sciences, Business Computing, Computer Applications.
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["GIS Fundamentals", "Cartography", "Statistics", "Physical Geography"].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-md bg-transparent text-foreground/50 border border-foreground/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <SlideTabs />

      {/* ===== HERO SECTION ===== */}
      <section id="hero">
        <div className="flex flex-col overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-foreground font-display">
                  Mapping the World with Code <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-primary via-primary to-foreground/80 bg-clip-text text-transparent">
                    GIS &times; Dev
                  </span>
                </h1>
                <p className="mt-4 pb-16 md:pb-24 text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
                  Exploring geospatial systems, spatial analysis, and the
                  technology that connects us to our planet.
                </p>
              </>
            }
          >
            <div className="h-full w-full flex items-center justify-center relative overflow-hidden transition-colors duration-300">
              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center gap-6 p-8">
                <div className="flex gap-4 items-center">
                  {[Globe, Layers, Satellite, Database, Map, Code].map((Icon, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.3, rotate: idx % 2 === 0 ? 15 : -15 }} 
                      className="cursor-pointer"
                    >
                      <Icon className={`w-8 h-8 ${idx % 2 === 0 ? "text-primary animate-pulse" : "text-primary"}`} />
                    </motion.div>
                  ))}
                </div>
                {/* The "Hook" Element */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  className="flex flex-col items-center mt-2 relative z-50"
                >
                  <div className="relative group cursor-pointer">
                    {/* Glowing animated border via framer-motion */}
                    <motion.div 
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-background to-primary opacity-40 group-hover:opacity-100 blur-sm group-hover:blur-md bg-[length:200%_auto] transition-all duration-500"
                    />
                    
                    <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-b from-card to-background border border-foreground/20 rounded-full leading-none overflow-hidden backdrop-blur-md shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        <p className="font-mono text-xs md:text-sm font-semibold tracking-wider text-foreground ">
                          LIVE
                        </p>
                      </div>

                      <div className="w-px h-4 bg-neutral-300 "></div>

                      <p className="text-xs md:text-sm font-mono text-foreground/70 whitespace-nowrap">
                        <span className="text-primary font-bold">LAT:</span> 49.28&deg; N 
                        <span className="mx-2 text-neutral-300 ">|</span> 
                        <span className="text-primary font-bold">LON:</span> 123.12&deg; W
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle terminal-like text below the pill */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-[10px] md:text-xs font-mono text-foreground/70 mt-6 tracking-widest uppercase"
                  >
                    <span className="text-primary mr-2 animate-pulse">&gt;</span>
                    exploring --spatial-data
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="mt-10 flex flex-wrap justify-center items-center gap-6"
                  >
                    <a href="mailto:connect@priyanshu.world">
                      <ButtonWithIcon label="HIRE ME" icon={Briefcase} className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20" />
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/priyanshu-624aa8368/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ButtonWithIcon label="CONNECT" className="bg-card hover:bg-card/90 text-foreground border border-foreground/20" />
                    </a>
                  </motion.div>
                </motion.div>
                {/* Immersive Deep Radar Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
                  <Radar className="opacity-90 blur-[1px] scale-125 md:scale-150" />
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          {/* Tilt card */}
          <Tilt
            rotationFactor={8}
            isRevese
            className="w-full max-w-sm flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-foreground/10 bg-gradient-to-br from-card to-background shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(125,206,148,0.06)] group transition-all duration-300">
              <Spotlight
                className="z-10 from-primary/30 via-primary/10 to-transparent blur-2xl"
                size={280}
                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
              />
              <div className="relative h-64 w-full group overflow-hidden">
                <Image
                  src="/ai-avatar.png"
                  alt="Priyanshu AI Avatar"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground font-display">
                  Priyanshu
                </h3>
                <div className="flex items-center gap-2 mt-2 text-foreground/70 ">
                  <MapPin className="w-4 h-4 text-primary " />
                  <span className="text-sm">Metro-Vancouver, BC</span>
                </div>
                <p className="mt-3 text-sm text-foreground/70 font-mono">
                  GIS Student &middot; Capilano University
                </p>
              </div>
            </div>
          </Tilt>

          {/* About text */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-mono text-primary mb-2">
                // about.me
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground font-display">
                Hello, I&apos;m <span className="text-primary ">Priyanshu</span>
              </h2>
            </div>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Associate of Science student at Capilano University, currently
              working as a Geospatial Research Assistant. I collaborate with
              faculty on academic projects, developing custom GIS maps and
              spatial visualizations for scholarly publications.
            </p>
            <p className="text-base text-foreground/70 leading-relaxed">
              From overlay analysis and thematic mapping to survey-driven
              auto-updating maps, I love translating complex geographic concepts
              into clear, meaningful spatial representations. Exploring the
              intersection of GIS, cartography, and data science.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "QGIS",
                "ArcGIS",
                "Spatial Analysis",
                "Cartography",
                "Geoprocessing",
                "Data Visualization",
                "Microsoft Excel",
              ].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-gradient-to-b from-card to-background text-foreground/70 border border-foreground/10 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORK / TIMELINE SECTION ===== */}
      <section id="work" className="pb-24 md:pb-40">
        <Timeline data={timelineData} />
      </section>

      {/* ===== FOOTER / LINKS SECTION ===== */}
      <TapedFooter />
    </div>
  );
}

