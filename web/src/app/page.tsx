"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Timeline } from "@/components/ui/timeline";

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
} from "lucide-react";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";

export default function Home() {
  const timelineData = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-white/80 text-xs md:text-sm font-normal mb-2">
            <span className="text-emerald-400 font-medium">GIS Analyst</span> — Academic Projects & Applied Labs
          </p>
          <p className="text-white/60 text-xs md:text-sm font-normal mb-4">
            Designed and analyzed spatial datasets using QGIS and ArcGIS. Performed
            overlay analysis, buffering, querying, classification, and thematic mapping.
            Built a survey-driven, auto-updating GIS map linking data collection to
            dynamic spatial visualization.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["QGIS", "ArcGIS", "Spatial Analysis", "Geoprocessing", "Thematic Mapping"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500&h=500&fit=crop"
              alt="GIS spatial analysis"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(0,0,0,0.3)]"
            />
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop"
              alt="Cartographic design"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-white/80 text-xs md:text-sm font-normal mb-2">
            <span className="text-indigo-400 font-medium">Geospatial Research Assistant</span> — Capilano University
          </p>
          <p className="text-white/60 text-xs md:text-sm font-normal mb-4">
            Collaborating with faculty on an academic book project involving geographic
            and spatial analysis. Developing custom GIS maps, figures, and spatial
            visualizations. Supporting research through data sourcing, cleaning,
            integration, and publication-quality representations.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Research", "Map Design", "Data Visualization", "Academic Publishing"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=500&fit=crop"
              alt="Geospatial research"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(0,0,0,0.3)]"
            />
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=500&fit=crop"
              alt="Spatial data integration"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-white/80 text-xs md:text-sm font-normal mb-2">
            <span className="text-amber-400 font-medium">Capilano University</span> — Associate of Science
          </p>
          <p className="text-white/60 text-xs md:text-sm font-normal mb-4">
            Began my journey into GIS and spatial sciences at Capilano University
            in North Vancouver. Diving into coursework spanning GIS fundamentals,
            spatial analysis, cartography, physical geography, statistics, and computing.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["GIS Fundamentals", "Cartography", "Statistics", "Physical Geography"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-white/60 text-xs md:text-sm">
              ✅ Geographic Information Systems
            </div>
            <div className="flex gap-2 items-center text-white/60 text-xs md:text-sm">
              ✅ Spatial Analysis & Cartography
            </div>
            <div className="flex gap-2 items-center text-white/60 text-xs md:text-sm">
              ✅ Statistics for Data Analysis
            </div>
            <div className="flex gap-2 items-center text-white/60 text-xs md:text-sm">
              ✅ Google Project Management Certificate
            </div>
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
                <h1 className="text-4xl font-semibold text-neutral-900 dark:text-white font-display">
                  Mapping the World with Code <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-400 bg-clip-text text-transparent">
                    GIS × Dev
                  </span>
                </h1>
                <p className="mt-4 text-lg text-neutral-600 dark:text-white/50 max-w-xl mx-auto">
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
                  <Globe className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <Layers className="w-8 h-8 text-emerald-300" />
                  <Satellite className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <Database className="w-8 h-8 text-emerald-300" />
                  <Map className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <Code className="w-8 h-8 text-emerald-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400/60">
                    $ exploring --spatial-data
                  </p>
                  <p className="text-xs font-mono text-neutral-500 dark:text-white/30 mt-2">
                    latitude: 49.2827° N &nbsp;&middot;&nbsp; longitude: 123.1207° W
                  </p>
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-emerald-500/20 dark:border-emerald-500/10 animate-ping" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-emerald-500/10 dark:border-emerald-500/5" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          {/* Tilt card */}
          <Tilt
            rotationFactor={8}
            isRevese
            className="w-full max-w-sm flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-[#2a2a3e] bg-white dark:bg-[#141420] shadow-xl dark:shadow-none group transition-colors duration-300">
              <Spotlight
                className="z-10 from-emerald-400/30 via-emerald-500/10 to-transparent blur-2xl"
                size={280}
                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
              />
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Priyanshu"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141420] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                  Priyanshu
                </h3>
                <div className="flex items-center gap-2 mt-2 text-neutral-600 dark:text-white/50">
                  <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-sm">Metro-Vancouver, BC</span>
                </div>
                <p className="mt-3 text-sm text-neutral-500 dark:text-white/40 font-mono">
                  GIS Student &middot; Capilano University
                </p>
              </div>
            </div>
          </Tilt>

          {/* About text */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2">
                // about.me
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white font-display">
                Hello, I&apos;m <span className="text-emerald-600 dark:text-emerald-400">Priyanshu</span>
              </h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/60 leading-relaxed">
              Associate of Science student at Capilano University, currently
              working as a Geospatial Research Assistant. I collaborate with
              faculty on academic projects, developing custom GIS maps and
              spatial visualizations for scholarly publications.
            </p>
            <p className="text-base text-neutral-500 dark:text-white/40 leading-relaxed">
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
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#1c1c2e] text-white/50 border border-[#2a2a3e] hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORK / TIMELINE SECTION ===== */}
      <section id="work">
        <Timeline data={timelineData} />
      </section>

      {/* ===== FOOTER / LINKS SECTION ===== */}
      <TapedFooter />
    </div>
  );
}
