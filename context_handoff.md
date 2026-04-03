# 🚀 Project Handover: GIS Portfolio & Lab System

This document provides crucial context for continuing development on the **AtmoLens GIS Portfolio**. The project is currently in a "Polish & Refinement" phase, focusing on high-fidelity animations and cross-domain synchronization.

---

## 🏛️ Architecture Overview

The system is split into two primary domains:
1.  **Main Portfolio (Next.js 15)**: The parent container found in `/src`.
2.  **AtmoLens Lab (Vite/React)**: An experimental GIS dashboard located in `/webapp`, which is integrated into the Lab page via an iframe.

### 🎨 Design Philosophy: "Liquid Glass & Scrapbook"
The aesthetic combines **high-end glassmorphism** (backdrop blurs, gradients) with a **"Scrapbook" signature style** (grain textures, handwritten fonts).
- **Core Font**: `Outfit` (Sans)
- **Signature Font**: `Caveat` (Handwritten/Scrapbook style)
- **Colors**: Blue-accented primary theme with strict HSL consistency.

---

## 🏗️ Core Component: `SmoothScrollHero`
Found in: `src/components/ui/smooth-scroll-hero.tsx`

This component handles the "Center-to-Corner" transition for the project showcase.

### Key Implementation Details:
*   **Scroll Logic**: Uses `useScroll` with a custom `useSpring` (stiffness: 1000, damping: 50) for local progress tracking. **DO NOT** use global `scrollY` for these animations to avoid parallax jitter.
*   **Clip Path**: Animates an `inset` clip-path from `25%` to `0%` to create a "reveal" effect on scroll.
*   **Custom Cursor**:
    - Pulsing "Visit" label centered exactly on the pointer tip (`translateX/Y: 0%`).
    - Uses a very high-stiffness spring to ensure the label tracks the mouse instantly.
*   **Showcase Panel**:
    - **Positioning**: Moves from a true viewport center (`top: 50%, left: 50%`) to the bottom-left corner (`bottom: 3rem, left: 3rem`).
    - **Aesthetic**: Integrated `sparkles` animation and signature titles with a grainy backdrop-blur card.

---

## 🌓 Theme Synchronization (CRITICAL)

The parent site and the iframe must stay in sync visually.

### Implementation:
1.  **Initial Load**: The parent appends `?theme=dark|light` to the `iframeSrc`.
2.  **Real-Time Update**: 
    - The `SmoothScrollHero` component uses `useTheme` from `next-themes`.
    - It broadcasts a `SET_THEME` message via `postMessage` whenever the parent theme toggles.
    - **Receiver**: `webapp/src/main.jsx` contains a `ThemeSync` component that listens for this message and applies the `.dark-theme` class to the `document.documentElement`.

---

## 🛠️ Ongoing Tasks & Next Steps

> [!IMPORTANT]
> **Priority 1: Animation Smoothness**
> If any jitter is noticed during the showcase transition, verify that `useSpring` is receiving the correct `rawScrollProgress` from the `containerRef`.

> [!TIP]
> **Priority 2: Adding New Lab Projects**
> The `SmoothScrollHero` is designed to be a factory. To add a new project, simply pass a new `iframeSrc` and update the `Showcase` child labels.

### Current "To-Do" Items:
- [ ] **Production Pass**: Verify the `3.5rem` rounded corners on extreme mobile aspect ratios (e.g., iPhone SE vs. iPad).
- [ ] **Iframe Interaction**: The iframe currently has `pointer-events-none` for performance/animation stability. If interaction is needed, implement a "Double Click to Interact" overlay.
- [ ] **GLSL Expansion**: The AtmoLens webapp (`/webapp`) uses custom shaders. Ensure any theme changes in the parent also update the shader uniforms (color palettes).

---

## 📁 Key File Map
| File | Responsibility |
| :--- | :--- |
| `src/app/layout.tsx` | Global fonts (`Caveat`, `Outfit`) and Theme Provider. |
| `src/components/ui/smooth-scroll-hero.tsx` | Core Lab animation logic & Showcase UI. |
| `src/app/globals.css` | Tailwind 4 `@theme` tokens (e.g., `--font-signature`). |
| `webapp/src/main.jsx` | Iframe theme listener & entry point. |
| `webapp/src/index.css` | AtmoLens specific CSS variables (`--bg-color`, etc.). |

---

## 🤖 Note for Next LLM
When editing **Tailwind 4** styles, remember that configuration happens in `globals.css` using the `@theme inline` block. **Do not** look for a `tailwind.config.ts` as it has been deprecated for this project.

Maintain the "Cartographix" branding—it requires bold typography, high-contrast details, and smooth, intentful interactions.

---
*Signed by: Antigravity*
