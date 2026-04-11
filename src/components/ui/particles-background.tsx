"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme()
  const [color, setColor] = useState("#3d3d3f")

  useEffect(() => {
    // Use Scuffed Dark Grey (#3d3d3f) for light mode, Vanilla Grey (#f6f5f3) for dark mode
    setColor(resolvedTheme === "dark" ? "#f6f5f3" : "#3d3d3f")
  }, [resolvedTheme])

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Particles
        className="absolute inset-0"
        quantity={180}
        ease={80}
        staticity={40}
        color={color}
        vx={0.15}
        vy={-0.15}
        refresh
      />
    </div>
  )
}
