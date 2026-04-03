import { Metadata } from "next";
import { LabDashboard } from "@/components/lab-dashboard";

export const metadata: Metadata = {
  title: "The Lab | Creative Code, WebGL, and Geospatial Experiments",
  description:
    "A digital sandbox for creative code, WebGL studies, interface experiments, and interactive geospatial prototypes.",
  keywords: [
    "WebGL",
    "Three.js",
    "Creative Coding",
    "Frontend Engineering",
    "Geospatial UI",
    "Interactive Web",
  ],
  openGraph: {
    title: "The Lab | Priyanshu",
    description:
      "Creative code, WebGL studies, and interactive geospatial experiments by Priyanshu.",
    url: "https://lab.priyanshu.world",
    siteName: "Priyanshu Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lab | Priyanshu",
    description: "Creative code, WebGL studies, and geospatial experiments.",
  },
  alternates: {
    canonical: "https://lab.priyanshu.world",
  },
};

export default function LabPage() {
  return <LabDashboard />;
}
