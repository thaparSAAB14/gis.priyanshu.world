import { Metadata } from "next";
import { ResumeDashboard } from "@/components/resume-dashboard";

export const metadata: Metadata = {
  title: "Resume | Priyanshu — Junior GIS Analyst",
  description:
    "Download the resume of Priyanshu, a Junior GIS Analyst and Geospatial Research Assistant experienced in ArcGIS Pro, QGIS, Survey123, spatial analysis, and cartographic production.",
  openGraph: {
    title: "Resume | Priyanshu — Junior GIS Analyst",
    description:
      "GIS Analyst and Geospatial Research Assistant resume — spatial analysis, cartography, ArcGIS, QGIS, Survey123.",
    url: "https://gis.priyanshu.world/resume",
    siteName: "Priyanshu GIS Portfolio",
    type: "website",
  },
};

export default function ResumePage() {
  return <ResumeDashboard />;
}
