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
  Download,
  ArrowRight,
  FileText,
  Compass,
  BarChart3,
  Search,
  PenTool,
  Server,
  Microscope,
} from "lucide-react";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

/* ─── SKILLS DATA ─────────────────────────────────────────────── */
const skillCategories = [
  {
    label: "GIS Platforms",
    icon: Globe,
    skills: ["ArcGIS Pro", "ArcGIS Online", "QGIS"],
  },
  {
    label: "Spatial Analysis",
    icon: Search,
    skills: [
      "Geoprocessing",
      "Overlay Analysis",
      "Buffering",
      "Spatial Queries",
    ],
  },
  {
    label: "Cartography",
    icon: PenTool,
    skills: [
      "Thematic Mapping",
      "Map Layouts",
      "Cartographic Design",
      "Publication-Quality Maps",
    ],
  },
  {
    label: "Data Management",
    icon: Database,
    skills: [
      "Data Integration",
      "Attribute Management",
      "QA/QC",
      "Projections & CRS",
    ],
  },
  {
    label: "Web GIS",
    icon: Layers,
    skills: ["Survey123", "ArcGIS Online", "Web Mapping", "Dynamic Dashboards"],
  },
  {
    label: "Supporting Tools",
    icon: Server,
    skills: ["Python (Basic)", "Excel", "Next.js", "Git"],
  },
];

/* ─── CORE FOCUS DATA ─────────────────────────────────────────── */
const coreFocusAreas = [
  {
    icon: Compass,
    title: "Spatial Analysis",
    desc: "Geoprocessing, overlay analysis, and scenario-based geographic problem-solving.",
  },
  {
    icon: PenTool,
    title: "Cartography",
    desc: "Publication-quality map production with clear legends, scales, and projections.",
  },
  {
    icon: Database,
    title: "Data Integration",
    desc: "Sourcing, cleaning, and integrating multi-format spatial datasets with systematic QA/QC.",
  },
  {
    icon: Globe,
    title: "Web GIS",
    desc: "Survey123 forms, ArcGIS Online dashboards, and dynamic web-based mapping systems.",
  },
  {
    icon: Microscope,
    title: "Research Support",
    desc: "Faculty-led academic research with spatial visualization and geographic data documentation.",
  },
  {
    icon: BarChart3,
    title: "Decision Support",
    desc: "Turning complex geographic data into clear, decision-ready maps and spatial outputs.",
  },
];

export default function Home() {
  /* ─── TIMELINE DATA ──────────────────────────────────────── */
  const timelineData = [
    {
      title: "Nov 2025 — Present",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            <span className="text-primary font-medium text-lg">
              Geospatial Research Assistant
            </span>
          </p>
          <ul className="text-foreground/70 text-xs md:text-sm font-normal mb-8 list-none space-y-3">
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Producing publication-quality maps, figures, and spatial
              visualizations for a faculty-led academic book on Metro Vancouver
              geology.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Sourcing and integrating geospatial datasets from the Geological
              Survey of Canada, BC government, and TransLink GTFS feeds.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Designing multi-scale cartographic products including geological
              maps, field trip route maps, and study area location maps.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Performing data cleaning, attribute management, and QA/QC to
              ensure accuracy across all spatial deliverables.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Translating complex geographic concepts into clear, reproducible
              cartographic outputs aligned with academic publication standards.
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "QGIS",
              "Cartographic Design",
              "Data Sourcing",
              "QA/QC",
              "Academic Publishing",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "May 2025 — Dec 2025",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            <span className="text-foreground font-medium text-lg">
              GIS Analyst
            </span>{" "}
            <span className="opacity-50">
              &mdash; Applied GIS Projects & Spatial Analysis
            </span>
          </p>
          <ul className="text-foreground/70 text-xs md:text-sm font-normal mb-6 list-none space-y-3">
            <li className="flex gap-3">
              <span className="text-foreground/30 mt-1 text-[10px]">
                &bull;
              </span>
              Designed and analyzed spatial datasets using QGIS and ArcGIS Pro,
              managing vector/raster data, projections, and attribute tables
              across multiple applied projects.
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 mt-1 text-[10px]">
                &bull;
              </span>
              Performed spatial analysis and geoprocessing, including overlay
              analysis, buffering, spatial queries, classification, and thematic
              mapping.
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 mt-1 text-[10px]">
                &bull;
              </span>
              Produced professional, publication-ready maps using cartographic
              best practices to support geographic analysis and decision-making.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1 text-[10px]">&bull;</span>
              Built a survey-driven, auto-updating GIS wildlife reporting system
              linking Survey123 data collection to dynamic ArcGIS Online
              visualization.
            </li>
          </ul>
          <div className="mb-8">
            <a
              href="https://arcg.is/y0efn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-card border border-foreground/20 rounded-full text-sm font-mono hover:bg-foreground/5 hover:border-primary/50 shadow-xl shadow-primary/5 hover:shadow-primary/20 hover:text-primary transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-primary animate-pulse" />
              [ View Bear Sighting Web Map ]
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "QGIS",
              "ArcGIS Pro",
              "Survey123",
              "Geoprocessing",
              "Thematic Mapping",
              "Web GIS",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-card/50 backdrop-blur-md text-foreground/70 border border-foreground/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "May 2024 — Apr 2026",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-2">
            <span className="text-foreground/80 font-bold tracking-tight text-xl">
              Capilano University
            </span>
          </p>
          <p className="text-primary text-xs md:text-sm font-mono mb-4 uppercase tracking-widest">
            Associate of Science{" "}
            <span className="opacity-50 lowercase tracking-normal text-foreground">
              (North Vancouver, BC)
            </span>
          </p>
          <div className="text-foreground/70 text-xs md:text-sm font-normal mb-6 leading-relaxed bg-foreground/5 border border-foreground/10 p-5 rounded-xl">
            <strong className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-primary" />
              Relevant Coursework
            </strong>
            Geographic Information Systems (GIS), Spatial Analysis &
            Cartography, Physical Geography, Weather & Climate Systems,
            Statistics for Data Analysis, Calculus I, Precalculus Mathematics,
            Physics for Life Sciences, Business Computing, Computer
            Applications.
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "GIS Fundamentals",
              "Cartography",
              "Statistics",
              "Physical Geography",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-md bg-transparent text-foreground/50 border border-foreground/10"
              >
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
                <h1 className="text-4xl md:text-5xl font-semibold text-foreground font-display tracking-tight leading-tight">
                  Junior GIS Analyst & <br />
                  <span className="text-5xl md:text-[5.5rem] font-bold mt-1 leading-none bg-gradient-to-r from-primary via-primary to-foreground/80 bg-clip-text text-transparent transform">
                    Geospatial Researcher
                  </span>
                </h1>
                <p className="mt-6 pb-8 text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto font-medium leading-relaxed">
                  I create publication-quality maps, spatial analysis workflows, and web-based GIS systems for academic research and applied geospatial projects.<br className="hidden md:block" /><span className="text-primary/90">Co-author of an upcoming academic book on Metro Vancouver geology.</span>
                </p>

                {/* CTA Buttons */}
                <div className="pb-12 md:pb-20 flex flex-wrap justify-center items-center gap-4">
                  <a href="#projects">
                    <ButtonWithIcon
                      label="VIEW PROJECTS"
                      icon={ArrowRight}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20"
                    />
                  </a>
                  <a href="/resume">
                    <ButtonWithIcon
                      label="RESUME"
                      icon={FileText}
                      className="bg-card hover:bg-card/90 text-foreground border border-foreground/20"
                    />
                  </a>
                  <a href="/contact">
                    <ButtonWithIcon
                      label="CONTACT"
                      icon={Mail}
                      className="bg-card hover:bg-card/90 text-foreground border border-foreground/20"
                    />
                  </a>
                </div>
              </>
            }
          >
            <div className="h-full w-full flex items-center justify-center relative overflow-hidden transition-colors duration-300">
              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center gap-6 p-8">
                <div className="flex gap-4 items-center">
                  {[Globe, Layers, Satellite, Database, Map, Code].map(
                    (Icon, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{
                          scale: 1.3,
                          rotate: idx % 2 === 0 ? 15 : -15,
                        }}
                        className="cursor-pointer"
                      >
                        <Icon
                          className={`w-8 h-8 ${idx % 2 === 0 ? "text-primary animate-pulse" : "text-primary"}`}
                        />
                      </motion.div>
                    )
                  )}
                </div>
                {/* Location Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  className="flex flex-col items-center mt-2 relative z-50"
                >
                  <div className="relative group cursor-pointer">
                    {/* Glowing animated border via framer-motion */}
                    <motion.div
                      animate={{
                        backgroundPosition: [
                          "0% 50%",
                          "100% 50%",
                          "0% 50%",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-background to-primary opacity-40 group-hover:opacity-100 blur-sm group-hover:blur-md bg-[length:200%_auto] transition-all duration-500"
                    />

                    <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-b from-card to-background border border-foreground/20 rounded-full leading-none overflow-hidden backdrop-blur-md shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        <p className="font-mono text-xs md:text-sm font-semibold tracking-wider text-foreground ">
                          AVAILABLE
                        </p>
                      </div>

                      <div className="w-px h-4 bg-neutral-300 "></div>

                      <p className="text-xs md:text-sm font-mono text-foreground/70 whitespace-nowrap">
                        <span className="text-primary font-bold">LAT:</span>{" "}
                        49.28&deg; N
                        <span className="mx-2 text-neutral-300 ">|</span>
                        <span className="text-primary font-bold">LON:</span>{" "}
                        123.12&deg; W
                      </p>
                    </div>
                  </div>

                  {/* Professional value statement */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-[10px] md:text-xs font-mono text-foreground/70 mt-6 tracking-widest uppercase text-center"
                  >
                    <span className="text-primary mr-2 animate-pulse">
                      &gt;
                    </span>
                    ArcGIS · QGIS · Python · Next.js · Data Engineering
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="text-[10px] md:text-xs font-mono text-foreground/50 mt-2 tracking-wider text-center"
                  >
                    Open to GIS Analyst, Geospatial Research & Data Engineering roles
                    across Canada
                  </motion.p>
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

      {/* ===== FEATURED WORK SECTION ===== */}
      <section id="projects" className="w-full relative z-10 py-16 md:py-28 px-4 bg-foreground/[0.02] border-y border-foreground/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 px-2">
            <div className="max-w-3xl">
              <p className="text-sm font-mono text-primary mb-4 tracking-widest uppercase flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Portfolio
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight font-display">
                Featured Work
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 mt-6 font-medium leading-relaxed max-w-2xl">
                Applied spatial analysis, dynamic web mapping, and publication-quality cartography. Discover my workflow from data sourcing to final product.
              </p>
            </div>
            <a href="#about" className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary uppercase tracking-wider transition-colors group mb-2 md:mb-4">
              More About Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xl:gap-8 px-2">
            {[
              {
                id: "bear-sighting",
                title: "Bear Sighting Network",
                desc: "Survey-driven wildlife reporting and web mapping workflow built with Survey123 and ArcGIS Online.",
                category: "Web GIS & Survey123",
                img: "/projects/metro-vancouver-municipalities.webp",
                colSpan: "col-span-1 md:col-span-1 lg:col-span-7",
              },
              {
                id: "metro-geology",
                title: "Metro Vancouver Geology",
                desc: "Publication-quality geology and location mapping for faculty-led research.",
                category: "Cartography",
                img: "/projects/geological-map-metro-vancouver.webp",
                colSpan: "col-span-1 md:col-span-1 lg:col-span-5",
              },
              {
                id: "route-analytics",
                title: "Field Route Analytics",
                desc: "Spatial analysis involving route design, geology context, and multi-layer overlays.",
                category: "Spatial Analysis",
                img: "/projects/geology-route-queen-elizabeth.webp",
                colSpan: "col-span-1 md:col-span-1 lg:col-span-5",
              },
              {
                id: "multi-scale",
                title: "Multi-Scale Mapping",
                desc: "Cartographic work showing projection handling across regional to local scales.",
                category: "Cartography",
                img: "/projects/study-area-location-map.webp",
                colSpan: "col-span-1 md:col-span-1 lg:col-span-7",
              },
              {
                id: "atmolens",
                title: "AtmoLens WebGL Dashboard",
                desc: "A production-grade, hardware-accelerated spatial visualization dashboard engineered with React, WebGL, and Next.js.",
                category: "Full-Stack Development",
                img: "atmolens-gradient",
                colSpan: "col-span-1 md:col-span-2 lg:col-span-12",
              }
            ].map((p, i) => (
              <div key={i} className={`w-full h-full ${p.colSpan}`}>
                <a href={`/projects/${p.id}`} className="group flex flex-col w-full h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden border border-foreground/10 bg-card hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl">
                  {/* Top Image Section */}
                  <div className="relative w-full flex-1 overflow-hidden bg-background">
                    {p.img === "atmolens-gradient" ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1e9df1]/20 to-[#00b87a]/10 opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out flex w-full h-full justify-center items-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--shadow-color)_0,transparent_60%)]" />
                        <div className="text-primary/10 font-mono text-7xl md:text-9xl font-black rotate-[-5deg] scale-125 whitespace-nowrap blur-[2px]">WEBGL / REACT</div>
                      </div>
                    ) : (
                      <Image 
                        src={p.img} 
                        alt={p.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                    )}
                    {/* Inner shadow to separate image from text block cleanly */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Bottom Text Label Section */}
                  <div className="w-full bg-card/80 backdrop-blur-md flex-shrink-0 p-6 md:p-8 flex justify-between items-center z-20 group-hover:bg-card transition-colors duration-300">
                    <div className="flex-1 pr-4 md:pr-10">
                      <div className="text-[10px] md:text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3">{p.category}</div>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-display text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{p.title}</h3>
                      <p className="text-sm md:text-base font-medium text-foreground/70 line-clamp-2 md:line-clamp-1 group-hover:text-foreground/90 transition-colors">{p.desc}</p>
                    </div>
                    
                    <div className="hidden sm:flex w-12 h-12 rounded-full border border-primary/20 text-primary items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 flex-shrink-0 shadow-sm">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
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
              <div className="relative aspect-[5/4] w-full group overflow-hidden">
                <Image
                  src="/about-portrait.png"
                  alt="Priyanshu — Junior GIS Analyst"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/95 via-background/40 to-transparent pointer-events-none" />
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
                  Junior GIS Analyst &middot; Geospatial Research Assistant
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
                Hello, I&apos;m{" "}
                <span className="text-primary ">Priyanshu</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
              I am a detail-oriented GIS Analyst, Geospatial Researcher, and academic co-author based in Metro Vancouver. I currently produce publication-quality maps and spatial visualizations for faculty-led geology research at Capilano University.
            </p>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              From complex overlay analysis to configuring survey-driven web platforms, I specialize in transforming raw geographic data into clear, decision-ready outputs. I adhere to rigorous QA/QC standards to ensure cartographic precision and data integrity.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "ArcGIS Pro",
                "ArcGIS Online",
                "QGIS",
                "Survey123",
                "Spatial Analysis",
                "Cartography",
                "Geoprocessing",
                "Data Integration",
                "QA/QC",
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

      {/* ===== CORE FOCUS AREAS ===== */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              What I Work On
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
              Core GIS <span className="text-primary">Focus Areas</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFocusAreas.map((area, idx) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group p-6 rounded-2xl border border-foreground/10 bg-gradient-to-br from-card/50 to-background hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <area.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground font-display mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              Technical Capability
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
              Tools &{" "}
              <span className="text-primary">Skills</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl border border-foreground/10 bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold text-foreground font-display uppercase tracking-wider">
                    {category.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono rounded-lg bg-foreground/5 text-foreground/70 border border-foreground/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORK / TIMELINE SECTION ===== */}
      <section id="experience" className="pb-24 md:pb-40">
        <Timeline data={timelineData} />
      </section>

      {/* ===== FOOTER / LINKS SECTION ===== */}
      <TapedFooter />
    </div>
  );
}
