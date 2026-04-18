"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: "AtmoLens",
    description:
      "Automated pipeline that fetches ECCC synoptic weather maps, colorizes grayscale outputs for readability, and archives 7 days of enhanced charts — updated every 30 minutes.",
    year: "2025",
    link: "https://atmolens.priyanshu.world",
    image: "/projects/atmolens-preview.webp",
    tags: ["Automation", "Web GIS", "Geospatial Viz", "Public Data"],
  },
  {
    title: "Bear Sighting GIS",
    description:
      "Survey123-powered wildlife reporting workflow with auto-stored sightings in ArcGIS Online, feeding a real-time updating web map for community safety awareness.",
    year: "2025",
    link: "https://arcg.is/y0efn",
    image: "/projects/bear-sighting-preview.webp",
    tags: ["Survey123", "ArcGIS Online", "Field Data", "Dynamic GIS"],
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-2xl mx-auto px-6 py-16"
    >
      <p className="text-sm font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-3">
        <span className="w-8 h-px bg-primary" /> Portfolio
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight font-display mb-4">
        Key Projects
      </h2>
      <p className="text-foreground/60 text-sm leading-relaxed mb-10 max-w-lg">
        Applied GIS workflows, automation pipelines, and dynamic web mapping systems — built for real-world impact.
      </p>

      {/* Floating image preview that follows cursor */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? "1" : "0.85",
          transition:
            "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[300px] h-[190px] bg-card rounded-xl overflow-hidden border border-foreground/10">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? "1" : "1.08",
                filter: hoveredIndex === index ? "none" : "blur(8px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-6 border-t border-border transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 px-4 bg-foreground/[0.03] rounded-xl
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-2 mb-2">
                    <h3 className="text-foreground font-bold text-xl tracking-tight font-display">
                      <span className="relative">
                        {project.title}
                        <span
                          className={`
                            absolute left-0 -bottom-0.5 h-px bg-primary
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      className={`
                        w-4 h-4 text-primary
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-2 translate-y-2"
                        }
                      `}
                    />
                  </div>

                  <p
                    className={`
                      text-sm leading-relaxed mb-3
                      transition-all duration-300 ease-out
                      ${
                        hoveredIndex === index
                          ? "text-foreground/75"
                          : "text-foreground/55"
                      }
                    `}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`
                          px-2.5 py-1 text-[10px] font-mono rounded-md border
                          transition-all duration-300
                          ${
                            hoveredIndex === index
                              ? "border-primary/30 text-primary bg-primary/5"
                              : "border-foreground/10 text-foreground/40 bg-transparent"
                          }
                        `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year badge */}
                <span
                  className={`
                    text-xs font-mono tabular-nums mt-1 flex-shrink-0
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "text-primary" : "text-foreground/30"}
                  `}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
