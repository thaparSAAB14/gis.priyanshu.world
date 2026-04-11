import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Map, Database, Compass, CheckCircle2, MonitorPlay } from 'lucide-react';

const projectsData = {
  "bear-sighting": {
    title: "Bear Sighting Network",
    summary: "Survey-driven wildlife reporting and web mapping workflow built with Survey123 and ArcGIS Online to support real-time data collection and operational visibility.",
    image: "/projects/metro-vancouver-municipalities.webp",
    iframeUrl: "https://arcg.is/y0efn",
    problem: "Wildlife reporting in the region lacked centralized, real-time spatial organization, slowing down mitigation efforts. Static forms often led to data silos, making it difficult for wildlife management agencies to track bear movement patterns effectively.",
    goal: "Design a mobile-responsive field reporting tool perfectly synchronized with a real-time ArcGIS operational dashboard, replacing manual workflows.",
    tools: ["ArcGIS Online", "Survey123", "ArcGIS Dashboards"],
    workflow: "Engineered customized geospatial survey logic using Survey123 (XLSForm), established secure cloud-hosted feature layers on ArcGIS Online, and wired live synchronization feeds into a dynamic Dashboard UI. Integrated heat maps and time-series charting.",
    outcome: "Dramatically streamlined data collection and reduced incident reporting lag to seconds, providing conservation officers with immediate spatial awareness of human-wildlife encounters.",
    skills: ["Web GIS", "Field Data Collection", "Operational Dashboards"]
  },
  "metro-geology": {
    title: "Metro Vancouver Geology",
    summary: "Publication-quality geology and location mapping created for faculty-led academic research and formal book chapter production.",
    image: "/projects/geological-map-metro-vancouver.webp",
    iframeUrl: null,
    problem: "Faculty geology research required precise, print-ready cartographic layouts to visually convey the tectonic and glacial history of the physical geography, but source datasets were fragmented across multiple datums and catalogs.",
    goal: "Synthesize scattered geospatial data into a highly precise, publication-ready cartographic layout suitable for an academic textbook.",
    tools: ["QGIS", "BC Data Catalogue", "GSC Data", "Adobe Illustrator"],
    workflow: "Conducted rigorous QA/QC on multi-source data, standardized geodatabases, and carefully aligned map projections. Applied advanced cartographic styling rules (color theory, labeling hierarchy) to ensure maximum readability.",
    outcome: "Successfully authored final map figures that clearly articulate regional geological formations, which are successfully scheduled for formal inclusion in an upcoming academic book chapter on Metro Vancouver.",
    skills: ["Publication Cartography", "Geospatial Data Engineering", "QA/QC"]
  },
  "atmolens": {
    title: "AtmoLens GIS Dashboard",
    summary: "A production-grade, hardware-accelerated spatial visualization dashboard engineered from scratch with React, WebGL, and Next.js.",
    image: "/about-portrait.png", 
    iframeUrl: "https://atmolens.priyanshu.world",
    problem: "Traditional GIS platforms often struggle with the real-time fluidity and interactivity required for engaging, public-facing data visualization within modern web browsers without expensive software licenses.",
    goal: "Architect a custom, high-performance spatial data rendering pipeline integrating localized meteorological APIs directly onto a WebGL-accelerated canvas.",
    tools: ["React", "WebGL", "Next.js", "TailwindCSS", "Mapbox GL"],
    workflow: "Engineered a custom interactive mapping interface using Mapbox GL JS and React. Decoupled rendering logic from the DOM to achieve 60fps rendering of thousands of atmospheric data points. Styled perfectly utilizing Tailwind CSS glassmorphic layers.",
    outcome: "Deployed a fully interactive, production-grade spatial playground capable of visualizing complex vector layers dynamically, served globally on Vercel edge infrastructure.",
    skills: ["Web GIS Engineering", "Front-end Architecture", "Interactive Mapping"],
    liveUrl: "https://atmolens.priyanshu.world"
  }
};

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projectsData[params.slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 selection:bg-primary selection:text-primary-foreground">
      
      {/* Heavy cartography hero lazy/eager loaded efficiently */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-card overflow-hidden flex flex-col justify-end">
        {project.iframeUrl ? (
          <div className="absolute inset-0 z-0 w-full h-full bg-background overflow-hidden pointer-events-none">
            {/* Locked iframe acting purely as a rich interactive visual hero */}
            <iframe 
              src={project.iframeUrl} 
              className="w-full h-[120%] -mt-[10%] border-none opacity-80" 
              title={project.title}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
            />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-background/20">
            <Image 
              src={project.image}
              alt={project.title}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center opacity-60"
            />
          </div>
        )}
        
        {/* Intelligently layered gradient so text is VERY readable without blocking map clicks too much */}
        <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10 ${project.iframeUrl ? 'pointer-events-none' : ''}`} />
        
        <div className={`relative z-20 w-full max-w-6xl mx-auto px-6 pb-12 ${project.iframeUrl ? 'pointer-events-none' : ''}`}>
          <div className="pointer-events-auto w-fit">
            <Link href="/#projects" className="inline-flex items-center text-[10px] sm:text-xs md:text-sm font-mono font-semibold text-foreground/80 mb-6 sm:mb-8 hover:text-primary bg-card/60 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-foreground/10 hover:border-primary/50 shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO PORTFOLIO
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-tight text-foreground drop-shadow-xl">{project.title}</h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl text-foreground/80 font-medium max-w-4xl leading-relaxed drop-shadow-md">{project.summary}</p>
        </div>
      </div>

      {/* Case Study Content mapped for Recruiter Scanning */}
      <main className="max-w-6xl mx-auto px-6 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div className="lg:col-span-8 space-y-16">
          <section className="group">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm tracking-widest uppercase font-bold mb-6 group-hover:bg-primary/20 transition-colors">
              <Map className="w-4 h-4"/> Context & Problem
            </div>
            <p className="text-foreground/80 leading-loose text-lg md:text-xl font-medium">{project.problem}</p>
          </section>
          
          <section className="group">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm tracking-widest uppercase font-bold mb-6 group-hover:bg-primary/20 transition-colors">
              <Compass className="w-4 h-4"/> Workflow & Methods
            </div>
            <div className="bg-card/40 border border-border/60 p-6 md:p-8 rounded-3xl mb-6 shadow-inner backdrop-blur-md">
              <p className="text-foreground leading-relaxed text-lg font-semibold"><span className="text-primary mr-2">Goal:</span> {project.goal}</p>
            </div>
            <p className="text-foreground/80 leading-loose text-lg md:text-xl">{project.workflow}</p>
          </section>

          <section className="group relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card/50 to-background z-0" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full z-0 group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="relative z-10 p-8 md:p-10 border border-border/50 rounded-3xl shadow-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background border border-border/50 text-foreground font-mono text-sm tracking-widest uppercase font-bold mb-6 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-primary"/> Deliverables & Outcome
              </div>
              <p className="text-foreground/90 font-medium leading-loose text-xl md:text-2xl">{project.outcome}</p>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-12 space-y-8 bg-card/[0.05] p-8 rounded-3xl border border-foreground/10 shadow-xl backdrop-blur-3xl">
            {project.iframeUrl && (
              <div className="pb-8 border-b border-foreground/10 mb-8">
                 <h3 className="text-xs font-mono tracking-widest text-primary uppercase font-bold mb-5 flex items-center gap-2"><MonitorPlay className="w-4 h-4"/> Live Web App</h3>
                 <Link href={project.iframeUrl} target="_blank" className="flex w-full items-center justify-center py-4 bg-primary text-primary-foreground font-bold font-mono tracking-wider rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(var(--primary),0.3)]">
                    [ Launch Application ]
                 </Link>
                 <p className="text-[10px] text-center text-foreground/50 mt-3 font-mono uppercase px-2">Fully interactive live demonstration embedded on this page and linked above.</p>
              </div>
            )}
            
            <div>
              <h3 className="text-xs font-mono tracking-widest text-primary uppercase font-bold mb-5 flex items-center gap-2"><Database className="w-4 h-4"/> Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="px-4 py-2 bg-background border border-foreground/10 text-foreground/80 font-mono font-medium rounded-lg text-xs hover:border-primary/40 hover:text-primary transition-colors cursor-default shadow-sm">{tool}</span>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t border-foreground/10">
              <h3 className="text-xs font-mono tracking-widest text-primary uppercase font-bold mb-5">Primary Disciplines</h3>
              <ul className="space-y-3">
                {project.skills.map(skill => (
                  <li key={skill} className="flex items-start gap-3 text-foreground/80 font-medium text-sm md:text-base">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]" /> 
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
