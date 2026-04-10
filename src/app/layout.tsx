import type { Metadata } from "next";
import { Inter_Tight, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
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
    default: "Priyanshu | Junior GIS Analyst & Geospatial Researcher",
    template: "%s | Priyanshu GIS Portfolio",
  },
  description:
    "Portfolio of Priyanshu, a Metro Vancouver-based Junior GIS Analyst and Geospatial Research Assistant focused on cartography, spatial analysis, Survey123, and web GIS.",
  keywords: [
    "Junior GIS Analyst",
    "Geospatial Research Assistant",
    "Cartography",
    "ArcGIS Pro",
    "ArcGIS Online",
    "QGIS",
    "Survey123",
    "Spatial Analysis",
    "QA/QC",
    "Web GIS",
    "Metro Vancouver",
  ],
  openGraph: {
    title: "Priyanshu | Junior GIS Analyst & Geospatial Researcher",
    description:
      "Case studies, GIS workflows, and cartography work by Priyanshu in Metro Vancouver.",
    url: "https://gis.priyanshu.world",
    siteName: "Priyanshu GIS Portfolio",
    locale: "en_CA",
    type: "website",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          <Analytics />
          <SpeedInsights />
          <main className="flex-1 relative z-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
