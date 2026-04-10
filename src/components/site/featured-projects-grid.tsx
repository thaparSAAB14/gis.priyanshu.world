import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/content/projects";

export function FeaturedProjectsGrid() {
  return (
    <section id="featured-projects" className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold">Featured Case Studies</h2>
        <Link href="/projects" className="text-sm text-primary hover:underline">
          View all projects
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {featuredProjects.map((project) => (
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
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-foreground/75">{project.outcome}</p>
              <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-primary hover:underline">
                Read case study
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
