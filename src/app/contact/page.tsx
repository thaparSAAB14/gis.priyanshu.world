import { Metadata } from "next";
import { ContactDashboard } from "@/components/contact-dashboard";

export const metadata: Metadata = {
  title: "Connect | Priyanshu GIS",
  description: "Get in touch for opportunities in geospatial analysis, WebGIS development, cartography, and spatial engineering.",
  openGraph: {
    title: "Connect with Priyanshu | GIS Developer",
    description: "Open for new opportunities in geospatial analysis, mapping, and web engineering.",
    url: "https://gis.priyanshu.world/contact",
    siteName: "Priyanshu GIS Portfolio",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactDashboard />;
}
