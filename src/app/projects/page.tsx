import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { projectCaseStudies } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "GIS case studies by Priyanshu covering cartography, Survey123 workflows, spatial analysis, and QA/QC.",
  alternates: { canonical: "https://gis.priyanshu.world/projects" },
};

export default function ProjectsPage() {
  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-3 max-w-3xl text-foreground/75">
          A focused set of GIS case studies with project context, workflow,
          outcomes, and the tools used.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projectCaseStudies.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-2xl border border-foreground/10 bg-card/40">
              <Image
                src={project.thumbnail.src}
                alt={project.thumbnail.alt}
                width={project.thumbnail.width}
                height={project.thumbnail.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-48 w-full object-cover"
              />
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-foreground/75">{project.summary}</p>
                <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-primary hover:underline">
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
