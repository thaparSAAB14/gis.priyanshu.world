import type { Metadata } from "next";
import { Inter_Tight, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { TerminalCursor } from "@/components/ui/terminal-cursor";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

const signature = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gis.priyanshu.world"),
  title: {
    default: "Priyanshu | Junior GIS Analyst & Geospatial Research Assistant",
    template: "%s | Priyanshu - GIS Analyst",
  },
  description:
    "Portfolio of Priyanshu, a Junior GIS Analyst and Geospatial Research Assistant specializing in spatial analysis, cartography, Survey123, ArcGIS Pro, QGIS, and publication-quality map production for Canadian environmental and geospatial roles.",
  keywords: [
    "Junior GIS Analyst", "Geospatial Research Assistant", "GIS Technician",
    "ArcGIS Pro", "ArcGIS Online", "QGIS", "Survey123",
    "Spatial Analysis", "Cartography", "Thematic Mapping", "Geoprocessing",
    "Data Integration", "QA/QC", "Web GIS", "Environmental GIS",
    "Canadian GIS", "Vancouver", "Map Production", "Publication-Quality Maps",
  ],
  authors: [{ name: "Priyanshu", url: "https://gis.priyanshu.world" }],
  creator: "Priyanshu",
  openGraph: {
    title: "Priyanshu | Junior GIS Analyst & Geospatial Research Assistant",
    description: "Spatial analysis, cartography, and web mapping — turning geographic data into clear, decision-ready maps and systems. Currently seeking GIS analyst and geospatial research roles across Canada.",
    url: "https://gis.priyanshu.world",
    siteName: "Priyanshu | GIS Portfolio",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu | Junior GIS Analyst & Geospatial Research Assistant",
    description: "Spatial analysis, cartography, and web mapping for Canadian environmental and geospatial roles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://gis.priyanshu.world",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${interTight.variable} ${signature.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ParticlesBackground />
          <ThemeToggle />
          <CustomCursor />
          <TerminalCursor />
          <Analytics />
          <SpeedInsights />
          <main className="flex-1 relative z-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
