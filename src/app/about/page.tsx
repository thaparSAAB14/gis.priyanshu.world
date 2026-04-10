import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Priyanshu, a Metro Vancouver-based Junior GIS Analyst and Geospatial Research Assistant at Capilano University.",
  alternates: { canonical: "https://gis.priyanshu.world/about" },
};

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <section className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight">About</h1>
          <p className="text-sm leading-6 text-foreground/80">
            I am a Metro Vancouver-based GIS student at Capilano University and
            currently work as a Geospatial Research Assistant. My focus is on
            creating clear cartographic products and practical spatial analysis
            workflows for faculty-led geology and publication work.
          </p>
          <p className="text-sm leading-6 text-foreground/80">
            I enjoy projects where data cleanup, projection consistency, and map
            readability make a real difference for the end audience. I am also
            involved in an upcoming academic chapter context through supporting
            research mapping tasks and figure preparation.
          </p>
          <p className="text-sm leading-6 text-foreground/80">
            I am seeking junior GIS analyst and geospatial research roles across
            Canada where I can contribute through cartography, web GIS support,
            and reliable QA/QC habits.
          </p>
        </section>

        <aside className="rounded-2xl border border-foreground/10 bg-card/40 p-4">
          <Image
            src="/headshot-88.jpg"
            alt="Professional headshot of Priyanshu"
            width={560}
            height={560}
            className="aspect-square w-full rounded-xl object-cover"
          />
          <p className="mt-3 text-xs text-foreground/60">
            Replaceable asset: store your preferred professional headshot at
            <code className="ml-1 rounded bg-foreground/10 px-1 py-0.5">public/headshot-88.jpg</code>.
          </p>
        </aside>
      </div>
    </div>
  );
}
