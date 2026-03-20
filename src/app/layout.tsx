import type { Metadata } from "next";
import { Inter_Tight, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://gis.priyanshu.world"),
  title: {
    default: "Priyanshu | GIS Developer & Data Analyst",
    template: "%s | Priyanshu GIS",
  },
  description:
    "A highly optimized geospatial developer portfolio exploring the intersection of spatial analysis, cartography, and full-stack web engineering.",
  openGraph: {
    title: "Priyanshu | GIS Developer & Data Analyst",
    description: "Geospatial systems, spatial analysis, and the technology that connects us to our planet.",
    url: "https://gis.priyanshu.world",
    siteName: "Priyanshu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu | GIS Developer",
    description: "Mapping the world with code and spatial intelligence.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${outfit.variable} ${interTight.variable} h-full antialiased`}
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
