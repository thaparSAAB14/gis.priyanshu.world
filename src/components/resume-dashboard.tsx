"use client";

import React from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { Component as TapedFooter } from "@/components/ui/footer-taped-design";
import { motion } from "framer-motion";
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
  ExternalLink,
  Award,
  Zap,
} from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

export function ResumeDashboard() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent transition-colors duration-300">
      <SlideTabs />
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* ── Hero / Download Header ── */}
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
              Junior GIS Analyst &amp; Geospatial Research Assistant — available for
              spatial analysis, cartography, and web GIS roles across Canada.
            </p>

            {/* Open to Work badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-sm font-semibold"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              OPEN TO WORK — GIS Analyst · Geospatial Research · Cartography
            </motion.div>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ButtonWithIcon
                label="DOWNLOAD RESUME (PDF)"
                icon={Download}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-xl shadow-primary/20"
              />
            </a>
          </motion.div>
        </section>

        {/* ── Resume Content ── */}
        <section className="w-full max-w-4xl mx-auto px-4 pb-24 space-y-12">

          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-mono text-foreground/60 border border-foreground/10 rounded-2xl bg-card/30 backdrop-blur-sm p-5"
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
          <ResumeSection icon={FileText} title="Professional Summary" delay={0}>
            <div className="space-y-3 text-foreground/70 leading-relaxed">
              <p>
                Detail-oriented{" "}
                <strong className="text-foreground">Junior GIS Analyst</strong> and{" "}
                <strong className="text-foreground">Geospatial Research Assistant</strong>{" "}
                with demonstrated experience producing publication-quality maps,
                designing survey-driven data collection systems, and performing
                end-to-end spatial analysis workflows.
              </p>
              <p>
                Currently co-authoring{" "}
                <span className="text-primary font-medium">
                  multi-scale cartographic figures for a faculty-led academic book
                </span>{" "}
                on Metro Vancouver geology at Capilano University. Proficient in{" "}
                <strong className="text-foreground">
                  ArcGIS Pro, ArcGIS Online, QGIS, and Survey123
                </strong>
                , with a strong foundation in data integration, QA/QC, and
                cartographic design. Actively seeking junior GIS analyst,
                cartography, and geospatial research roles across Canada.
              </p>
            </div>
          </ResumeSection>

          {/* Key Projects — recruiter highlight */}
          <ResumeSection icon={Zap} title="Key Projects" delay={0.05}>
            <div className="space-y-6">
              <ProjectItem
                title="AtmoLens — Synoptic Weather Map Enhancer"
                subtitle="Full-Stack · Cloud Architecture · Geospatial Automation"
                link="https://atmolens.priyanshu.world"
                bullets={[
                  "Built a fully automated pipeline that fetches ECCC synoptic weather charts every 30 minutes, colorizes grayscale outputs for readability, and archives a rolling 7-day catalog.",
                  "Deployed serverless cron jobs and cloud storage on Vercel; zero manual intervention required after launch.",
                  "Demonstrates applied geospatial visualization, process automation, and production-grade cloud architecture.",
                ]}
                tags={["Next.js", "Automation", "Cloud", "Geospatial Viz", "Public Data"]}
              />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
              <ProjectItem
                title="Bear Sighting GIS System"
                subtitle="Web GIS · Survey123 · ArcGIS Online"
                link="https://arcg.is/y0efn"
                bullets={[
                  "Designed a complete field data collection and visualization workflow using Survey123 and ArcGIS Online for a local wildlife non-profit.",
                  "Survey submissions automatically populate a real-time web map with spatial queries, pie charts, and summary indicators.",
                  "Replaced a manual paper-based process with a professional-grade operational GIS dashboard for immediate spatial awareness.",
                ]}
                tags={["Survey123", "ArcGIS Online", "Field GIS", "Dynamic Web Map"]}
              />
            </div>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection icon={Briefcase} title="Professional Experience" delay={0.1}>
            <div className="space-y-8">
              <ExperienceItem
                title="Geospatial Research Assistant"
                org="Capilano University — Faculty Research"
                date="Nov 2025 — Present"
                highlight
                bullets={[
                  "Producing publication-quality geological maps, study area maps, and field trip route maps for a faculty-led academic book on Metro Vancouver geology — co-authored spatial figures for formal publication.",
                  "Sourcing and integrating geospatial datasets from the Geological Survey of Canada, BC Data Catalogue, and TransLink GTFS feeds across multiple datums and formats.",
                  "Performing systematic data cleaning, attribute management, and QA/QC across all cartographic deliverables to ensure accuracy and visual consistency.",
                  "Designing multi-scale cartographic products using QGIS, applying sound layout, symbology, legend, and labeling practices aligned with academic publication standards.",
                  "Translating complex geographic concepts into clear, reproducible visual outputs for non-specialist academic audiences.",
                ]}
                tags={[
                  "QGIS",
                  "Cartographic Design",
                  "Data Integration",
                  "QA/QC",
                  "Academic Publishing",
                ]}
              />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
              <ExperienceItem
                title="Junior GIS Analyst"
                org="Capilano University — GIS Program"
                date="May 2025 — Dec 2025"
                bullets={[
                  "Built and analyzed vector and raster GIS datasets using QGIS and ArcGIS Pro, including projection management, attribute editing, querying, classification, buffering, and overlay analysis.",
                  "Developed a survey-driven, auto-updating wildlife reporting workflow linking Survey123 data collection with dynamic ArcGIS Online web map visualization.",
                  "Designed thematic maps and presentation-ready cartographic outputs using sound layout, symbology, legend, and labeling principles.",
                  "Cleaned, validated, and prepared geospatial data for analysis, improving consistency and usability across multiple project workflows.",
                  "Applied structured geoprocessing steps and careful data management practices to support reproducible GIS workflows.",
                ]}
                tags={[
                  "ArcGIS Pro",
                  "Survey123",
                  "QGIS",
                  "Web GIS",
                  "Geoprocessing",
                  "Thematic Mapping",
                ]}
              />
            </div>
          </ResumeSection>

          {/* Education */}
          <ResumeSection icon={GraduationCap} title="Education" delay={0.2}>
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
                  Geographic Information Systems (GIS), Spatial Analysis &amp;
                  Cartography, Physical Geography, Weather &amp; Climate Systems,
                  Statistics for Data Analysis, Calculus I, Precalculus Mathematics,
                  Physics for Life Sciences, Business Computing, Computer Applications.
                </span>
              </div>
            </div>
          </ResumeSection>

          {/* Technical Skills */}
          <ResumeSection icon={Compass} title="Technical Skills" delay={0.3}>
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
                  "Overlay Analysis",
                  "Buffering",
                  "Spatial Queries",
                  "Classification",
                  "Geoprocessing",
                ]}
              />
              <SkillGroup
                icon={PenTool}
                label="Cartography"
                skills={[
                  "Thematic Mapping",
                  "Map Layouts",
                  "Symbology & Labeling",
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
                  "Projections & CRS",
                  "Spatial Data Cleaning",
                ]}
              />
              <SkillGroup
                icon={Layers}
                label="Web GIS"
                skills={[
                  "Survey123",
                  "ArcGIS Online",
                  "Dynamic Web Mapping",
                  "Field Data Collection",
                ]}
              />
              <SkillGroup
                icon={Server}
                label="Supporting Tools"
                skills={["Python (Basic)", "Excel", "Next.js", "Git", "Vercel"]}
              />
            </div>
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection icon={Award} title="Certifications & Training" delay={0.35}>
            <div className="space-y-3">
              {[
                {
                  name: "Google Project Management Certificate",
                  issuer: "Google via Coursera",
                  note: "Project lifecycle, stakeholder management, agile workflows",
                },
                {
                  name: "Occupational First Aid Level 1",
                  issuer: "WorkSafeBC",
                  note: null,
                },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 rounded-xl border border-foreground/10 bg-card/20"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-foreground/50 font-mono">{cert.issuer}</p>
                  </div>
                  {cert.note && (
                    <span className="text-[10px] font-mono text-foreground/40 italic">
                      {cert.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Bottom Download */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ButtonWithIcon
                label="DOWNLOAD RESUME (PDF)"
                icon={Download}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20"
              />
            </a>
            <a href="/contact">
              <ButtonWithIcon
                label="GET IN TOUCH"
                icon={Mail}
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

/* ─── Sub-Components ────────────────────────────────────── */

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
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
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
  highlight = false,
}: {
  title: string;
  org: string;
  date: string;
  bullets: string[];
  tags: string[];
  highlight?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h4
            className={`text-base font-bold font-display ${
              highlight ? "text-primary" : "text-foreground"
            }`}
          >
            {title}
            {highlight && (
              <span className="ml-2 text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider align-middle">
                Current
              </span>
            )}
          </h4>
          <p className="text-sm text-foreground/60">{org}</p>
        </div>
        <span className="text-xs font-mono text-primary whitespace-nowrap">{date}</span>
      </div>
      <ul className="space-y-2 text-sm text-foreground/70 leading-relaxed">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary mt-1 text-[10px] flex-shrink-0">&bull;</span>
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

function ProjectItem({
  title,
  subtitle,
  link,
  bullets,
  tags,
}: {
  title: string;
  subtitle: string;
  link: string;
  bullets: string[];
  tags: string[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-foreground font-display">{title}</h4>
          <p className="text-xs font-mono text-foreground/50 mt-0.5">{subtitle}</p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-primary hover:underline whitespace-nowrap mt-0.5"
        >
          <ExternalLink className="w-3 h-3" /> Live Project
        </a>
      </div>
      <ul className="space-y-2 text-sm text-foreground/70 leading-relaxed">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary mt-1 text-[10px] flex-shrink-0">&bull;</span>
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-primary/5 text-primary/70 border border-primary/15"
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
