import { Metadata } from "next";
import { LabDashboard } from "@/components/lab-dashboard";

export const metadata: Metadata = {
  title: "The Lab | Experimental Digital Sandbox",
  description: "A hardware-accelerated playground featuring real-time ASCII video rendering and sarcastic server monitoring logs.",
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
};

export default function LabPage() {
  return <LabDashboard />;
}
