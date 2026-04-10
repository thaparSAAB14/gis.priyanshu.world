import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { FeaturedProjectsGrid } from "@/components/site/featured-projects-grid";
import { SkillsGrid } from "@/components/site/skills-grid";

export default function HomePage() {
  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:py-16">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.18em] text-foreground/60">
            Metro Vancouver, Canada
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Priyanshu, Junior GIS Analyst & Geospatial Researcher
          </h1>
          <p className="max-w-3xl text-lg text-foreground/75">
            I create publication-quality maps, spatial analysis workflows, and
            web-based GIS systems for academic research and applied geospatial
            projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              View Case Studies
            </Link>
            <Link
              href="/resume"
              className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium"
            >
              Resume
            </Link>
          </div>
        </section>

        <FeaturedProjectsGrid />

        <section className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <article className="rounded-2xl border border-foreground/10 bg-card/40 p-5">
            <h2 className="text-2xl font-semibold">About Snapshot</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-foreground/80">
              <p>
                I am based in Metro Vancouver and currently study at Capilano
                University. I work as a Geospatial Research Assistant supporting
                faculty-led geology and publication-related GIS mapping.
              </p>
              <p>
                My work focuses on practical outcomes: cleaner spatial data,
                readable maps, and workflows that others can reuse. I am
                interested in junior analyst roles where cartography, QA/QC,
                and field-informed GIS work matter.
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-foreground/10 bg-card/40 p-5">
            <h2 className="text-2xl font-semibold">Experience Snapshot</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li>• Produced geology maps and field-route layouts for faculty research outputs.</li>
              <li>• Integrated datasets from Geological Survey of Canada, BC data, and GTFS sources.</li>
              <li>• Built a Survey123 + ArcGIS Online workflow for bear sighting reporting.</li>
            </ul>
          </article>
        </section>

        <SkillsGrid />

        <section className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
          <p className="text-base font-medium">Open to junior GIS roles across Canada.</p>
          <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
            Contact me
          </Link>
          <p className="mt-4 text-xs text-foreground/60">
            Looking for experiments? Visit the
            {" "}
            <a href="https://lab.priyanshu.world" target="_blank" rel="noopener noreferrer" className="underline">
              Lab (Experimental WebGL Sandbox)
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
