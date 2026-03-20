# 🌍 Priyanshu - Geospatial Developer & Data Analyst
> **Live Deployments:** [gis.priyanshu.world](https://gis.priyanshu.world) | [lab.priyanshu.world](https://lab.priyanshu.world)

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](#)

A highly optimized, hardware-accelerated dual-domain portfolio showcasing the intersection of full-stack web engineering and Geospatial Information Systems (GIS). 

Built natively on the Next.js App Router, this repository utilizes advanced domain-level Edge Proxy routing to seamlessly serve two completely distinct interactive web environments from the physical execution of a single codebase.

---

## ⚡ Technical Architecture

### 1. `gis.priyanshu.world` (The Professional Viewport)
A premium, glassmorphic portfolio utilizing heavily tailored **Framer Motion** physics and mathematical React cursor tracking specifically crafted to highlight spatial relationships and mapping logic.
- Immersive smooth-scrolling Timeline configurations mapping my educational journey and academic workflows.
- Native interactive 3D WebGL background elements mirroring topographic radar mapping systems.
- Advanced semantic layout reacting flawlessly between Light and Dark mode states natively tied to OS preferences.

### 2. `lab.priyanshu.world` (The Sandbox Environment)
An isolated sandbox for raw digital engineering and logic experiments, hidden from professional search index crawlers via custom Next.js `proxy.ts` edge-level resolution rewrites.
- **Hardware Validated ASCII Engine:** A real-time `<canvas>` stream executing cross-origin video processing arrays inside the browser using pure mathematical matrix manipulation mapped natively to monospace character bounds.
- **Mock Terminal Monitor:** Features a completely isolated React-state interval renderer spoofing continuous server-health logs and generating dynamic ASCII art structures based entirely on a heavily optimized tracking cycle.
- **Isolated Cursor Topology:** Contains a modular tracking framework that overrides the standard interaction layer, physically rendering a 3D intersection crosshair strictly localized to the dashboard components.

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/thaparSAAB14/gis.priyanshu.world.git
   cd gis.priyanshu.world
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Navigate to `http://localhost:3000` to view the GIS branch, and `http://localhost:3000/lab` to access the experimental proxy.

## 🔒 Edge Proxy Routing (`src/proxy.ts`)
This application mathematically resolves traffic bounds using native Vercel `host` headers. Incoming traffic mapped to the exact domain `lab.priyanshu.world` transparently resolves to the deeply nested `/lab` React components. It forcefully drops all cross-origin visitors looking for `/lab` exclusively on the primary `gis` domain straight into secure HTTP 307 redirects to preserve crawler mapping indexing. It simultaneously injects strict `X-Frame-Options` and `Strict-Transport-Security` headers to all responses exactly at the Edge.
