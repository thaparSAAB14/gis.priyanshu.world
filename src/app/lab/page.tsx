import { Metadata } from "next";
import { LabDashboard } from "@/components/lab-dashboard";

export const metadata: Metadata = {
  title: "The Lab | Experimental Digital Sandbox & WebGL",
  description: "A hardware-accelerated playground featuring real-time ASCII video rendering, WebGL particle systems, and experimental UI engineering.",
  keywords: ["WebGL", "Three.js", "ASCII Art", "React Fiber", "Creative Coding", "Frontend Engineering", "Interactive Web"],
  openGraph: {
    title: "The Lab | Priyanshu",
    description: "Hardware accelerated ASCII render engine & digital experiments.",
    url: "https://lab.priyanshu.world",
    siteName: "Priyanshu Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lab | Priyanshu",
    description: "Hardware accelerated ASCII render engine.",
  },
  alternates: {
    canonical: "https://lab.priyanshu.world",
  },
};

export default function LabPage() {
  return <LabDashboard />;
}
