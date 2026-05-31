# Changelog

All notable changes to MAYAVERSE are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [5.0.0] — 2026-05-31

### Added — V5.0 APEX Redesign & Immersive Upgrades
- **Authentic Brand Logo Integration**: Replaced raw SVG/text navigation and footer logos with the newly uploaded official horizontal logo (`assets/logo.png`), utilizing high-fidelity CSS inversion (`filter: invert(1) hue-rotate(180deg)`) and the **Vertical-Center Overflow Crop Hack** to clip margins and display at full resolution.
- **Interactive Hero Centerpiece Portal**: Placed the high-fidelity founder portrait (`assets/founder_portrait.jpg`) inside the centerpiece portal ring with a pulsing "Click on me to know about me" floating badge, triggerable dynamic GSAP exit flash transitions, and responsive mobile visibility rules.
- **3D Immersive 8K Standalone Showcase Page (`maya.html`)**: Implemented mouse-tilt 3D parallax layers, dynamic stats counter animations, and an expanded 5-tab HUD intelligence terminal (Archetype origin story, Codex skill bars, 7 Volcanic Laws of Dominance, SaaS/E-Com victories, and Chief Growth Architect Manifesto).
- **Page 4 — Portfolio Proof Strip**: Added a scrolling performance proof banner displaying verified metrics (Avg ROI, response speeds, client ratings) and glowing category filter tabs with dynamic scroll-triggered counters.
- **Page 5 — Central Neon Lava Spine Timeline**: Unified the process roadmap into an interactive vertical timeline featuring a central glowing lava spine that fills and illuminates active step nodes as the page is scrolled.
- **Page 7 — Live Channel Brand Igniter Chart**: Embedded an interactive budget simulator bar chart widget linked to input sliders and goal selectors to animate real-time metric estimates.
- **Page 8 & Footer Updates**: Integrated trust validation badges (Google, Meta certified) and a glowing green WhatsApp CTA channel card, while appending an infinite-scrolling ribbon services marquee above a cleaned footer.

### Changed
- Removed all text wrappers and image banners from the Services section to focus purely on the volcanic, interactive vector SVGs.
- Added scroll prevention overlays to Lenis Smooth Scroll engines for modals and mobile hamburger menus to prevent background viewport jitter.

---

## [2.8.0] — 2025-05-25

### Added — Contact Section Cinematic Upgrade
- **Basalt Magma Crack Network** (`contact-lava-cracks`): SVG tectonic fracture paths at two stroke weights with `crackPulse` 8s alternate brightness/opacity animation
- **Dual-layer animated smoke drift**: `::before` + `::after` pseudo-elements with opposing `fractalNoise` textures drifting at 50s and 32s cycle speeds
- **35 dynamic JS-spawned ember particles**: Each with fully randomized `--x`, `--size`, `--delay`, `--duration`, `--drift`, `--opacity` CSS custom properties, powered by `@keyframes riseAndDrift`
- **Scroll-triggered ambient activation** (`IntersectionObserver`): Adds `.contact-active` at 15% viewport entry — intensifies `contact-abyss-bg` dual-radial glow and `contact-lava-cracks` bloom
- **`#contact::before` divider override**: 3px height, 4-layer box-shadow bloom reaching 100px diffusion spread
- **Contact floor ambient bloom**: 280px `cinema-section-lava-reflect` with 7s `contactFloorPulse` scale animation
- **Premium `.btn-molten-giant` CTA button upgrades**:
  - `::before` liquid magma conduit shifts every 6s (accelerates to 2.2s on hover)
  - `.btn-lava-pulse` pulsing core reservoir with 4s alternate `scale(0.9)→scale(1.1)`
  - On hover: burst animation at 1.6s cycle, `scale(1.2)` peak, opacity 1.0
  - Ambient `filter: drop-shadow` floor glow (rest → hover intensification)
- **Enhanced `.dark-metal-method` contact cards**: Premium high-inertia `0.8s cubic-bezier` transitions, triple-stop `.method-glow` gradient stripe, warm amber title glow on hover

### Changed
- `contact-abyss-bg`: Dual radial gradients now cover both 80%/50% (right) and 15%/85% (bottom-left) positions for richer ambient coverage
- `.dark-metal-form` hover: Added `0 0 60px rgba(255, 94, 0, 0.18)` outer ambient bloom
- `.form-input:focus`: Upgraded to layered `inset + outer + outline-ring` shadow stack
- `#contact .section-title`: Added `text-shadow` with 40px and 80px orange glow layers
- Contact method icons: Hover scale increased `1.05→1.08`, rotation `5deg→6deg`, added inner `inset` highlight
- Asset cache version bumped: `v=27` → `v=28`

---

## [2.7.0] — 2025-05-24

### Added — Global Atmospheric Depth System
- **`mid-layer-fog` parallax planes** injected into About, Services, Portfolio, and Contact sections
- **`cinema-section-lava-reflect`** floor reflections with heat distortion filter applied per-section
- Per-section GSAP `ScrollTrigger` scrub-linked parallax engines for all fog layers

### Added — Portfolio Card Enhancements
- `ember-particles-overlay` mask reveal on card hover
- `@keyframes emberBreathe` shimmer pulsing at 4s alternate
- Grayscale-to-color image transition on hover
- Card corner tactical brackets (`card-corner`) glowing on hover

### Changed
- Section divider system (`7S. Volcanic Rift Divider System`): Unified glowing `2px` horizontal separators across all non-hero sections
- Portfolio card hover lift: `-8px` → `-12px` elevation

---

## [2.6.0] — 2025-05-24

### Added — Hero Portal Redesign
- Colossal portal scale: `135vw` diameter centered behind MAYAVERSE title
- Portal positioned at `top: 43%`, `left: 50%` with `translate(-50%, -50%)`
- Molten yellow-gold eclipse core with pitch-black abyss void center
- 20s `portalBreath` breathing pulse animation
- Multi-ring orbital embers: `abyss-orb-ember` elements with staggered rotation

### Changed
- Hero background tokens shifted to absolute pitch-black (`#000000`)
- Section tags and card tags mapped to Orbitron technical font

---

## [2.5.0] — 2025-05-24

### Added — Cinematic Lighting Engine V2 (Section 7)
- `cinema-cursor-light`: 600px radius cursor-following spotlight with blend mode `screen`
- `cinema-bloom-overlay`: Fixed viewport bloom diffusion layer
- `cinema-atmospheric-depth`: Full-page depth haze
- `cinema-light-sweep`: Animated light sweep cycling across viewport
- `cinema-volcanic-rim-top` / `cinema-volcanic-rim-bottom`: Viewport edge rim lighting

---

## [2.4.0] — 2025-05-23

### Added — Premium Card Hover Interactions
- **Glowing neon border**: `0 0 0 2px rgba(255, 102, 0, 0.65)` on all card types
- **Atmospheric floor glow**: `0 15px 60px rgba(255, 102, 0, 0.28)` drop projection
- **High-inertia lift**: `translateY(-12px)` on `1.2s cubic-bezier(0.16, 1, 0.3, 1)`
- **Image zoom**: Portfolio images `scale(1.08)` on hover

---

## [2.3.0] — 2025-05-23

### Added — Global Visual Contrast Overhaul
- Deeper blacks across all section backgrounds
- Brighter lava orange highlights: boosted to `rgba(255, 94, 0, 0.x)` values
- Glowing divider lines with `box-shadow` bloom
- Subtle red gradient atmospheric layers per section

---

## [2.2.0] — 2025-05-22

### Added — Canvas Physics Engine
- 200 ember particles (65 mobile) with 3-layer depth parallax
- Foreground bokeh blobs (radial gradient), midground standard, background atmospheric dust
- Mouse repelling force within 150px radius
- Camera parallax drift tied to mouse-to-center offset

---

## [2.1.0] — 2025-05-22

### Added — Initial Cinematic World-Class Overhaul
- Volcanic digital abyss aesthetic
- GSAP ScrollTrigger reveal animations for all sections
- Cinematic typography: Cinzel (headers) + Orbitron (HUD labels) + Inter (body)
- Global `SVG feTurbulence` heat distortion filter
- Molten hero title gradient animation (`titleLavaFlow`, 12s)

---

## [1.0.0] — 2025-05-01

### Initial Release
- Basic HTML structure with MAYAVERSE branding
- CSS styling with dark theme
- JavaScript interactions
- GSAP integration
- Hero, About, Services, Portfolio, Contact, Footer sections
