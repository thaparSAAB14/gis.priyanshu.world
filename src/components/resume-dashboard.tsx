"use client";

import React from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";
import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Globe,
  Layers,
  Database,
  Search,
  PenTool,
  Server,
  Compass,
} from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

export function ResumeDashboard() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent transition-colors duration-300">
      <SlideTabs />
      <DottedSurface className="opacity-60 fixed pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Hero / Download Header */}
        <section className="relative flex min-h-[50svh] w-full flex-col items-center justify-center px-4 pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground tracking-tight">
              My{" "}
              <span className="bg-gradient-to-r from-primary to-foreground/80 bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-xl">
              Junior GIS Analyst & Geospatial Research Assistant — available for
              spatial analysis, cartography, and data roles across Canada.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ButtonWithIcon
                label="VIEW RESUME (PDF)"
                icon={Download}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-xl shadow-primary/20"
              />
            </a>
          </motion.div>
        </section>

        {/* Resume Content */}
        <section className="w-full max-w-4xl mx-auto px-4 pb-24 space-y-12">
          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm font-mono text-foreground/60 border border-foreground/10 rounded-2xl bg-card/30 backdrop-blur-sm p-5"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Metro Vancouver, BC
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> connect@priyanshu.world
            </span>
            <a
              href="https://gis.priyanshu.world"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4 text-primary" /> gis.priyanshu.world
            </a>
          </motion.div>

          {/* Professional Summary */}
          <ResumeSection
            icon={FileText}
            title="Professional Summary"
            delay={0}
          >
            <p className="text-foreground/70 leading-relaxed">
              Detail-oriented GIS Analyst and Geospatial Research Assistant
              with hands-on experience producing publication-quality maps,
              performing spatial analysis, and designing survey-driven data
              collection systems. Proficient in ArcGIS Pro, QGIS, ArcGIS
              Online, and Survey123. Experienced in multi-source data
              integration, cartographic design, and QA/QC workflows for
              academic research and applied projects. Seeking junior-level GIS
              analyst, cartography, and geospatial research roles across
              Canada.
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection
            icon={Briefcase}
            title="Professional Experience"
            delay={0.1}
          >
            <div className="space-y-8">
              <ExperienceItem
                title="Geospatial Research Assistant"
                org="Capilano University — Faculty Research"
                date="Nov 2025 — Present"
                bullets={[
                  "Producing publication-quality geological maps, study area maps, and field trip route maps for a faculty-led academic book chapter on Metro Vancouver geology.",
                  "Sourcing and integrating geospatial datasets from the Geological Survey of Canada, BC government data catalogues, and TransLink GTFS feeds.",
                  "Performing systematic data cleaning, attribute management, and QA/QC to ensure accuracy across all spatial deliverables.",
                  "Designing multi-scale cartographic products aligned with academic publication standards using QGIS.",
                ]}
                tags={[
                  "QGIS",
                  "Cartographic Design",
                  "Data Sourcing",
                  "QA/QC",
                  "Academic Publishing",
                ]}
              />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
              <ExperienceItem
                title="GIS Analyst — Applied Projects"
                org="Capilano University — GIS Program"
                date="May 2025 — Dec 2025"
                bullets={[
                  "Designed and analyzed spatial datasets using QGIS and ArcGIS Pro, managing vector/raster data, projections, and attribute tables across multiple applied projects.",
                  "Built a survey-driven, auto-updating wildlife reporting system linking Survey123 data collection to dynamic ArcGIS Online web maps.",
                  "Performed geoprocessing including overlay analysis, buffering, spatial queries, classification, and thematic mapping.",
                  "Produced professional, publication-ready maps using cartographic best practices.",
                ]}
                tags={[
                  "ArcGIS Pro",
                  "Survey123",
                  "QGIS",
                  "Web GIS",
                  "Geoprocessing",
                ]}
              />
            </div>
          </ResumeSection>

          {/* Education */}
          <ResumeSection
            icon={GraduationCap}
            title="Education"
            delay={0.2}
          >
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h4 className="text-base font-bold text-foreground font-display">
                    Associate of Science
                  </h4>
                  <p className="text-sm text-foreground/60">
                    Capilano University — North Vancouver, BC
                  </p>
                </div>
                <span className="text-xs font-mono text-primary whitespace-nowrap">
                  May 2024 — Apr 2026
                </span>
              </div>
              <div className="mt-3 text-sm text-foreground/60 leading-relaxed bg-foreground/5 border border-foreground/10 p-4 rounded-xl">
                <strong className="text-foreground text-xs font-mono uppercase tracking-wider">
                  Relevant Coursework:
                </strong>
                <span className="ml-2">
                  Geographic Information Systems (GIS), Spatial Analysis &
                  Cartography, Physical Geography, Weather & Climate Systems,
                  Statistics for Data Analysis, Calculus, Computer Applications.
                </span>
              </div>
            </div>
          </ResumeSection>

          {/* Technical Skills */}
          <ResumeSection
            icon={Compass}
            title="Technical Skills"
            delay={0.3}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillGroup
                icon={Globe}
                label="GIS Platforms"
                skills={["ArcGIS Pro", "ArcGIS Online", "QGIS"]}
              />
              <SkillGroup
                icon={Search}
                label="Spatial Analysis"
                skills={[
                  "Geoprocessing",
                  "Overlay Analysis",
                  "Buffering",
                  "Spatial Queries",
                ]}
              />
              <SkillGroup
                icon={PenTool}
                label="Cartography"
                skills={[
                  "Thematic Mapping",
                  "Map Layouts",
                  "Publication-Quality Maps",
                ]}
              />
              <SkillGroup
                icon={Database}
                label="Data Management"
                skills={[
                  "Data Integration",
                  "QA/QC",
                  "Attribute Management",
                  "Projections",
                ]}
              />
              <SkillGroup
                icon={Layers}
                label="Web GIS"
                skills={["Survey123", "ArcGIS Online", "Web Mapping"]}
              />
              <SkillGroup
                icon={Server}
                label="Supporting Tools"
                skills={["Python (Basic)", "Excel", "Next.js", "Git"]}
              />
            </div>
          </ResumeSection>

          {/* Bottom Download */}
          <div className="flex justify-center pt-4">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ButtonWithIcon
                label="VIEW RESUME (PDF)"
                icon={Download}
                className="bg-card hover:bg-card/90 text-foreground border border-foreground/20"
              />
            </a>
          </div>
        </section>

        <TapedFooter />
      </div>
    </div>
  );
}

/* ─── Resume Sub-Components ────────────────────────────────────── */

function ResumeSection({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="pl-12">{children}</div>
    </motion.div>
  );
}

function ExperienceItem({
  title,
  org,
  date,
  bullets,
  tags,
}: {
  title: string;
  org: string;
  date: string;
  bullets: string[];
  tags: string[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h4 className="text-base font-bold text-foreground font-display">
            {title}
          </h4>
          <p className="text-sm text-foreground/60">{org}</p>
        </div>
        <span className="text-xs font-mono text-primary whitespace-nowrap">
          {date}
        </span>
      </div>
      <ul className="space-y-2 text-sm text-foreground/70 leading-relaxed">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary mt-1 text-[10px]">&bull;</span>
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-foreground/5 text-foreground/60 border border-foreground/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillGroup({
  icon: Icon,
  label,
  skills,
}: {
  icon: React.ElementType;
  label: string;
  skills: string[];
}) {
  return (
    <div className="p-4 rounded-xl border border-foreground/10 bg-card/20">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-foreground font-display uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-foreground/5 text-foreground/70 border border-foreground/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
