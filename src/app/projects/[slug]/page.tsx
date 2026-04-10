import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Map, Database, Compass, CheckCircle2 } from 'lucide-react';

// This fulfills the "Phase 2: Project Architecture Redesign" to offload heavy maps.
const projectsData = {
  "bear-sighting": {
    title: "Bear Sighting Network",
    summary: "Survey-driven wildlife reporting and web mapping workflow built with Survey123 and ArcGIS Online to support data collection, map-based visibility, and dynamic GIS updates.",
    image: "/projects/metro-vancouver-municipalities.jpeg",
    problem: "Wildlife reporting in the region lacked centralized, real-time spatial organization, slowing down mitigation efforts.",
    goal: "Design a mobile-friendly field reporting tool linked perfectly to a dynamic web dashboard.",
    tools: ["ArcGIS Online", "Survey123", "ArcGIS Dashboards"],
    workflow: "Built customized geospatial survey logic, established feature layers, and wired real-time sync into a dashboard UI.",
    outcome: "Streamlined data collection and drastically improved visualization for regional biological monitoring.",
    skills: ["Web GIS", "Field Data Collection", "Real-Time Mapping"]
  },
  "metro-geology": {
    title: "Metro Vancouver Geology",
    summary: "Publication-quality geology and location mapping created for faculty-led academic research and book chapter production.",
    image: "/projects/geological-map-metro-vancouver.jpeg",
    problem: "Faculty geology research required a print-ready cartographic layout to properly convey the physical geography.",
    goal: "Synthesize scattered geospatial data into a highly precise, publication-ready cartographic layout.",
    tools: ["QGIS", "BC Data Catalogue", "Adobe Illustrator"],
    workflow: "Rigorous QA/QC on multi-source data, careful alignment of projections, and nuanced cartographic styling for clarity.",
    outcome: "Successfully authored final map figures for formal inclusion in an academic book chapter on Metro Vancouver.",
    skills: ["Publication Cartography", "Spatial Data Sourcing", "QA/QC"]
  },
  "route-analytics": {
    title: "Field Route Analytics",
    summary: "Spatial analysis and mapping work involving route design, geology context, and multi-layer overlays.",
    image: "/projects/geology-route-queen-elizabeth.jpeg",
    problem: "Analyzing complex geological field transit required exact route overlay onto diverse base maps.",
    goal: "Deliver a spatial analysis model identifying key geological transit paths.",
    tools: ["ArcGIS Pro", "Network Analysis", "Topographic Data"],
    workflow: "Extracted and dissolved route networks, executed multi-layer overlays, and styled outputs for academic field review.",
    outcome: "Provided a clear spatial breakdown of operational field paths against existing geological boundaries.",
    skills: ["Spatial Analysis", "Overlay Analysis", "Geoprocessing"]
  },
  "multi-scale": {
    title: "Multi-Scale Mapping",
    summary: "Cartographic work showing projection handling, boundary context, and map design across scales from regional to local.",
    image: "/projects/study-area-location-map.jpeg",
    problem: "Complex research locations require viewers to simultaneously understand regional context and strict local boundaries.",
    goal: "Architect a multi-scale cartographic composition ensuring projection accuracy across viewports.",
    tools: ["QGIS", "Map Projections", "Vector Data"],
    workflow: "Engineered robust CRS reprojections, inset map integration, and rigorous scale bars indicating exact physical distances.",
    outcome: "Delivered a visually unified map clearly articulating macro and micro spatial relationships.",
    skills: ["Coordinate Systems (CRS)", "Map Layouts", "Cartographic Design"]
  }
};

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projectsData[params.slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Heavy cartography hero lazy/eager loaded efficiently */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-card/50">
        <Image 
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 max-w-4xl mx-auto px-6 pb-12">
          <Link href="/#projects" className="inline-flex items-center text-sm font-mono text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-foreground">{project.title}</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 font-medium max-w-3xl leading-relaxed">{project.summary}</p>
        </div>
      </div>

      {/* Case Study Content mapped for Recruiter Scanning */}
      <main className="max-w-4xl mx-auto px-6 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold font-display text-primary mb-4 flex items-center gap-2"><Map className="w-5 h-5"/> Context & Problem</h2>
            <p className="text-foreground/80 leading-relaxed text-lg">{project.problem}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold font-display text-primary mb-4 flex items-center gap-2"><Compass className="w-5 h-5"/> Workflow & Methods</h2>
            <p className="text-foreground/80 leading-relaxed text-lg mb-4"><strong>Goal:</strong> {project.goal}</p>
            <p className="text-foreground/80 leading-relaxed text-lg">{project.workflow}</p>
          </section>

          <section className="bg-card p-6 rounded-xl border border-border/50">
            <h2 className="text-2xl font-bold font-display text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary"/> Deliverables & Outcome</h2>
            <p className="text-foreground/90 font-medium leading-relaxed text-lg">{project.outcome}</p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 bg-card/30 p-6 rounded-2xl border border-border/30 h-fit">
          <div>
            <h3 className="text-sm font-mono tracking-widest text-primary uppercase mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="px-3 py-1 bg-background border border-border/50 text-foreground/80 rounded-md text-sm">{tool}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-mono tracking-widest text-primary uppercase mb-3">Key Skills</h3>
            <ul className="space-y-2">
              {project.skills.map(skill => (
                <li key={skill} className="flex items-center gap-2 text-foreground/80 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50" /> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
