# 🏛️ Full Project Context: AtmoLens GIS Portfolio & Lab

This document is a high-fidelity "Source of Truth" for the AtmoLens ecosystem. It covers the architecture, component mechanics, and inter-system protocols for the **Portfolio** and the **Lab System**.

---

## 🛠️ Core Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Parent App** | Next.js 15 (App Router), TypeScript, Tailwind CSS 4 |
| **Lab App** | Vite, React, Three.js/Fiber (WebGL), GLSL |
| **Animation** | Framer Motion (UI/Scroll), GSAP ScrollTrigger (Complex FX) |
| **State/Theme** | `next-themes` (Parent), Custom `postMessage` listener (Iframe) |
| **Infrastructure** | Vercel (Parent), Subdomain Routing (`atmolens.priyanshu.world`) |

---

## 🏗️ Architecture & Domains

### 1. The Portfolio (Parent)
Located in `/src`. This acts as the main hub. It handles navigation (`SlideTabs`), branding, and the global ambient background (`ParticlesBackground`).

### 2. The Lab (Iframe Subdomain)
Located in `/webapp`. An isolated, hardware-accelerated "Sandbox." 
- **AtmoLens GIS**: A high-performance spatial dashboard integrated via an iframe on the `/lab` page.
- **Theme Bridge**: Since it exists on a different origin, it requires the **ThemeSync Protocol** (see below) to stay visually consistent.

---

## 🌓 ThemeSync Protocol (Inter-System Handshake)

To prevent visual "flashes" when toggling light/dark mode, the portfolio and Lab app are tightly coupled:

> [!IMPORTANT]
> **Implementation Level 1: Initial Sync**
> When the Lab page mounts, the `SmoothScrollHero` appends `?theme=dark|light` to the iframe URL. `webapp/src/main.jsx` reads this on mount.

> [!TIP]
> **Implementation Level 2: Real-time Sync**
> The `SmoothScrollHero` broadcasts a `postMessage` with `type: 'SET_THEME'` whenever the parent theme changes. The `ThemeSync` component in the Lab app listens and applies the `.dark-theme` class instantly without a reload.

---

## 🎢 Page Deep-Dives

### 🏠 Home Page (`src/app/page.tsx`)
*   **Hero Animation**: Uses `ContainerScroll` for a 3D perspective tilt on the mock dashboard.
*   **Radar Effect**: A subtle, pulsing background component (`Radar`) reflecting the "Geospatial" theme.
*   **Experience Timeline**: Found in `src/components/ui/timeline.tsx`, this component uses `framer-motion` to reveal career milestones as the user scrolls.
*   **Personal Branding**: Uses `Tilt` and `Spotlight` on the headshot card for a "hover-reactive" premium feel.

### 🧪 Lab Page (`src/app/lab/page.tsx`)
*   **SmoothScrollHero**: The center-piece. 
    - **Logic**: It calculates scroll progress *locally* using `useScroll` with the `containerRef`.
    - **Springs**: Uses high-stiffness `useSpring` (stiffness: 1000, damping: 50) for zero-lag cursor tracking.
    - **Clip-Path Reveal**: Insets the viewport from `25%` to `0%` round `3.5rem`.
    - **Transition**: Moves the showcase panel from **Screen Center** to **Bottom-Left Corner** over the scroll duration.

---

## 🧩 Component Special Specs

### `SmoothScrollHero` (Architecture)
- **Custom Cursor**: Centered exactly on the pointer tip (`translateX/Y: 0%`). It pulses a "VISIT" label via `framer-motion`.
- **Showcase Details**: 
    - Title: **"Cartographix"** using the `font-signature` (`Caveat`).
    - Detail Tags: **"GLSL • GIS • TILE"** for technical authority.
    - Aesthetic: Deep backdrop-blur (`backdrop-blur-3xl`) and grain texture overlay.

### `FullScrollFx` (GSAP Engine)
- Found in: `src/components/ui/full-screen-scroll-fx.tsx`.
- This is a complex scroll-storytelling engine using **GSAP ScrollTrigger**. It pins sections and handles multi-layered word masking transitions.

### `SlideTabs` (Navigation)
- Implements a "sliding underline" effect that tracks the current active route using `layoutId` transitions.

---

## 🎨 Design System: Tailwind CSS 4

The project uses **Tailwind 4**, meaning configuration is moved to `src/app/globals.css`.

### Custom Theme Tokens:
- `--font-signature`: Maps to the `Caveat` font.
- `--font-display`: Maps to `Outfit`.
- `--font-sans`: Maps to `Inter Tight`.
- `--color-primary`: The primary blue/green brand color.
- `--color-background`: Responsive to light/dark mode variables.

### Key CSS Utilities:
- `.liquid-glass`: A custom utility located in `webapp/src/index.css` that provides ultra-smooth glassmorphism with spotlight highlights.

---

## 📁 Key File Map for Successors

| File | Context / Responsibility |
| :--- | :--- |
| `src/app/layout.tsx` | Global fonts, Analytics, ThemeProvider. |
| `src/app/page.tsx` | Landing experience and Timeline configuration. |
| `src/components/ui/smooth-scroll-hero.tsx` | The math for the Lab animation and Cursor logic. |
| `src/app/globals.css` | Tailwind 4 `@theme` block and core UI tokens. |
| `webapp/src/main.jsx` | The `ThemeSync` listener for the AtmoLens app. |
| `webapp/src/App.jsx` | The entry-point for the Lab's GIS visualization. |

---

## 🤖 Note for Next AI Tasking

Maintain the **"Scrapbook" signature style**. When adding new headings or branding:
1. Use `font-signature` (`Caveat`) for "handwritten" elements.
2. Use `backdrop-blur-3xl` for all floating interactions.
3. Ensure all scroll-driven animations use **local refs** and **springs** to prevent the "Next.js Jitter" often found when using global scroll values.

---
*Generated by Antigravity AI*
