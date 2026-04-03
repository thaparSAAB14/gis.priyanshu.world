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
    default: "Priyanshu | GIS Developer & Geospatial Data Analyst",
    template: "%s | Priyanshu - GIS Developer",
  },
  description:
    "Portfolio of Priyanshu, a GIS Developer and Data Analyst specializing in spatial analysis, web mapping, cartography, and full-stack web engineering. Building interactive maps and geospatial dashboards.",
  keywords: [
    "GIS", "Geospatial", "GIS Developer", "Data Analyst", "Spatial Analysis", 
    "WebGIS", "Cartography", "Remote Sensing", "React", "Next.js", 
    "Mapbox", "Leaflet", "Data Visualization", "Vancouver", "Earth Observation"
  ],
  authors: [{ name: "Priyanshu", url: "https://gis.priyanshu.world" }],
  creator: "Priyanshu",
  openGraph: {
    title: "Priyanshu | GIS Developer & Geospatial Data Analyst",
    description: "Crafting interactive web maps, spatial analysis pipelines, and immersive geospatial dashboards. Merging software engineering with earth sciences.",
    url: "https://gis.priyanshu.world",
    siteName: "Priyanshu | GIS Portfolio",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu | GIS Developer & Geospatial Analyst",
    description: "Mapping the world with code. Exploring spatial intelligence, WebGIS, and Earth observation.",
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
