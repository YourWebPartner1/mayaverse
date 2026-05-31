# MAYAVERSE

> **A premium, award-winning cinematic web experience — volcanic digital abyss meets futuristic cyberpunk luxury.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-000000?style=flat-square&logo=scroll&logoColor=white)](https://lenis.darkroom.engineering/)

---

## 💻 Tech Stack & Coding Languages

MAYAVERSE is engineered as a zero-compilation, hyper-performance front-end application leveraging native browser APIs and hardware-accelerated animations:

1. **HTML5 (Structure & Shaders):**
   * High-fidelity, semantic document trees containing descriptive SEO metadata tags and accessible role configurations.
   * Embedded SVG displacement filters (`feTurbulence` + `feDisplacementMap` fractal noise) powering real-time volcanic heat-distortion ripples.
2. **CSS3 (Styling, Gradients & Layouts):**
   * Curated HSL volcanic-magma color tokens, luxury-tech typography grids, and micro-interactions.
   * Full viewport CSS Grid layouts and responsive flex alignments.
   * CSS keyframe animations (like `@keyframes magmaFlow` shifting liquid lava inside text letters).
   * Customized responsive breakpoints providing absolute layout balance across horizontal ultrawides, vertical tablets, and narrow mobile viewports.
3. **JavaScript / ES6+ (Interactive Physics & Orchestration):**
   * Core state managers tracking viewport coordinates, mouse paths, scroll positions, and device forms.
   * High-performance, frame-rate independent HTML5 Canvas 2D render loops for particle ecosystems and wave equations.
   * Synchronized kinetic scrolling mappings and GSAP timeline triggers.

---

## ✨ Core Features & Visual Mechanics

### 🌋 Volcanic Portal Centerpiece & Parallax
* **Centerpiece Artwork:** A sharp, unclipped high-fidelity chiseled stone logo integrated into a glowing volcanic rune circle, surrounded by soft lighting and volumetric haze.
* **Scroll Parallax:** Powered by GSAP ScrollTrigger, the entire portal structure, ambient glows, and smoke drift upward at a slightly offset rate as users scroll down, generating massive 3D camera depth.
* **Hover Tilt Effect:** Interactive mouse-move listeners tilt the centerpiece card relative to cursor coordinates and shift the inner graphic, rendering an immersive 3D holographic illusion.

### 🌊 Kinetic Smooth Scroll (Lenis Engine)
* **Smooth Kinetic Glide:** Integrated with the modern Lenis Scroll Engine to standardise scrolling physics across all desktop browsers, replacing default harsh clicks with a premium ease-out cubic velocity glide.
* **GSAP Synchronisation:** Scroller updates are piped directly into the ScrollTrigger animation ticks, eliminating reveal stutters or layout shifts.
* **Native Inertia Protection:** Retains default native touch-screen physics on iOS/Android viewports to respect default touch-scroll behaviors.

### 🌀 Frame-Rate Independent Physics Loops
* **Dynamic Ember Particles:** Up to 160 active floating embers running on a fullscreen HTML5 Canvas layer (`#canvas-ember`). Embers are layered across three depths (foreground bokeh, standard midground, background dust).
* **Molten Magma Waves:** Renders three overlapping, smooth layered sine waves of molten crimson and orange magma flowing dynamically across the bottom of the hero section.
* **Delta-Time Physics:** Physics updates inside requestAnimationFrame loops are scaled dynamically by frame delta-time (`dt` normalized around 60fps). This enables native high-refresh fluidity (rendering at **120fps/144fps** on modern Apple/Android devices and gaming displays) while maintaining identical physical speeds on standard 60Hz displays.
* **Viewport Telemetry Guard:** Canvas drawing cycles automatically pause whenever the user scrolls out of view, reducing CPU overhead and battery drain to absolute zero.

### 📊 Interactive Brand Igniter Widget (Bento Capsule)
* **Goal Selector:** Responsive HUD-styled selectors to choose primary growth goals.
* **Dynamic Budget Slider:** A smooth input range slider updating projections in real-time.
* **Dynamic Projection Calculations:** A GSAP-interpolated projection card updating average ROI multipliers, monthly lead numbers, high-priority channels, and recommended roadmaps based on budget factors.

### 📱 Tailored Smartphone Hero Overhaul
* **Aspect Ratio Protection:** Keeps the colossal volcanic centerpiece bounded (`max-width: 225px` on vertical phones) to preserve vertical layout proportions.
* **Tightened Paddings:** Compacts paddings and gaps (`grid-template-columns: 1fr; gap: 22px;`) to fit copying elements, logos, buttons, and badges cleanly above the fold.
* **Translucent Pill Badges:** Replaces messy, wrapping mobile separators (`|`) with gorgeous individual rounded capsule badges featuring a translucent background and thin gold-orange borders.
* **Scroll Space Recovery:** Automatically hides the bulky scroll-bouncing line on screens below 768px.

---

## 📁 Professional Folder Structure

```
MayaVerse/
├── index.html              # Main Document (Semantic HTML5, SVG shaders, layout wrappers)
├── style.css               # Stylesheet (Vanilla CSS3, token mappings, media queries)
├── script.js               # Interactive Engine (State, Lenis scroller, Canvas physics, GSAP)
├── assets/                 # High-Fidelity Artwork & Images
│   ├── logo.jpg               # Authentic chiseled stone logo & portal artwork
│   ├── cyber_reaper.png       # Relic card image asset
│   ├── void_gate.png          # Relic card image asset
│   ├── magma_drive.png        # Relic card image asset
│   ├── relic_cyber_reaper.png # Full-scale relic render
│   ├── relic_void_gate.png    # Full-scale relic render
│   └── relic_void_gate.png    # Full-scale relic render
├── package.json            # NPM Package config (Metadata, server scripts, build tools)
├── README.md               # Production-grade documentation (This file)
├── CHANGELOG.md            # Version logs and code maintenance tracking
├── LICENSE                 # MIT License details
├── .gitignore              # Version control ignore definitions
├── .prettierrc             # Standard code formatting parameters
├── .editorconfig           # IDE cross-platform editor configuration rules
└── .htmlvalidate.json      # HTML5 strict validation configuration overrides
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
* **Node.js:** `>= 16.0.0` (required only for starting the local development server).
* **Modern Web Browser:** Chrome 90+, Safari 14+, Firefox 88+, Edge 90+ (supports backdrop-filters, custom canvas contexts, and variable frame-rates).

### Installation & Run

1. **Clone the project:**
   ```bash
   git clone https://github.com/your-org/mayaverse.git
   cd mayaverse
   ```

2. **Launch Dev Server:**
   This project uses a static server script to serve the directory:
   ```bash
   npm run dev
   ```
   This will spin up a local static server serving the project files live on **[http://localhost:3000](http://localhost:3000)**.

3. **Alternative Quick Start (Zero npm):**
   ```bash
   npx serve . -l 3000
   ```

---

## 🛠️ Code Quality & Formatting

* **Prettier Rules:** The code uses single quotes, trailing commas, and strict tag closing configurations defined inside `.prettierrc`. You can format the workspace at any time:
  ```bash
  npm run format
  ```
* **HTML5 Strict Validation:** The markup is validated against standard schema rules. Run the validator:
  ```bash
  npm run lint:html
  ```

---

## 📄 License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Made with 🔥 by the MayaVerse Team for passionate founders.*
