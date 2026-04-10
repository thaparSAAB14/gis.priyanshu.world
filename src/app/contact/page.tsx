import { Metadata } from "next";
import { ContactDashboard } from "@/components/contact-dashboard";

export const metadata: Metadata = {
  title: "Contact | Priyanshu — Junior GIS Analyst",
  description: "Get in touch for junior GIS analyst, cartography, geospatial research, and spatial data roles across Canada.",
  openGraph: {
    title: "Contact Priyanshu | Junior GIS Analyst",
    description: "Available for junior GIS analyst, cartography, mapping, and geospatial research roles across Canada.",
    url: "https://gis.priyanshu.world/contact",
    siteName: "Priyanshu GIS Portfolio",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactDashboard />;
}
