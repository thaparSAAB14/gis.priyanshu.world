import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { getProjectBySlug, projectCaseStudies } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projectCaseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title}`,
    description: project.summary,
    alternates: {
      canonical: `https://gis.priyanshu.world/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
        <Link href="/projects" className="text-sm text-primary hover:underline">
          ← Back to projects
        </Link>

        <section className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
          <p className="text-base text-foreground/75">{project.summary}</p>
        </section>

        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          width={project.heroImage.width}
          height={project.heroImage.height}
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="w-full rounded-2xl border border-foreground/10 object-cover"
        />

        <section className="grid gap-5 md:grid-cols-2">
          <InfoCard title="Problem" value={project.problem} />
          <InfoCard title="Goal" value={project.goal} />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <ListCard title="Data Sources" items={project.dataSources} />
          <ListCard title="Skills Demonstrated" items={project.skillsDemonstrated} />
        </section>

        <ListCard title="Workflow" items={project.workflow} />

        <section className="rounded-2xl border border-foreground/10 bg-card/40 p-5">
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p className="mt-2 text-sm text-foreground/75">{project.outcome}</p>
          {project.fullResolution && (
            <a
              href={project.fullResolution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              {project.fullResolution.label}
            </a>
          )}
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-2xl border border-foreground/10 bg-card/40 p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-foreground/75">{value}</p>
    </article>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-foreground/10 bg-card/40 p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-foreground/75">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </article>
  );
}
