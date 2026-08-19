# GFB Cinetic Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Saans, replace all empty visual placeholders with original illustrative imagery, and add a richer accessible GSAP motion system.

**Architecture:** Keep the existing section components and central content model. Add one typed visual-asset registry, one reusable illustrative image component, local font configuration, and expand the existing scoped `AnimatedLanding` orchestration instead of distributing animation lifecycles across the page.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, `next/font/local`, `next/image`, GSAP, ScrollTrigger, Vitest, Testing Library.

---

### Task 1: Visual contracts

**Files:**
- Modify: `tests/landing.test.tsx`
- Create: `tests/visual-assets.test.ts`
- Create: `config/visualAssets.ts`

- [ ] Add a landing test that asserts rendered content contains no `PLACEHOLDER` token and that the recognition fold exposes `data-kinetic-section`, `data-kinetic-row`, and `data-kinetic-image` hooks.
- [ ] Add a registry test that requires every asset to have a project-local source, descriptive Portuguese alt text beginning with `Imagem ilustrativa:`, and a caption.
- [ ] Run the focused tests and confirm failure because the registry and hooks do not exist and placeholders remain.
- [ ] Implement the minimal typed registry and component hooks, then rerun the focused tests to green.

### Task 2: Saans local font

**Files:**
- Create: `app/fonts/Saans-TRIAL-Regular.otf`
- Create: `app/fonts/Saans-TRIAL-Medium.otf`
- Create: `app/fonts/Saans-TRIAL-SemiBold.otf`
- Create: `app/fonts/Saans-TRIAL-Bold.otf`
- Create: `app/fonts/saans.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] Copy the supplied font files into the app and configure a single `localFont` family with weights 400, 500, 600, and 700.
- [ ] Apply the generated class and `--font-saans` variable to the document body.
- [ ] Replace system-first font declarations with the Saans variable while retaining a system fallback.

### Task 3: Illustrative assets and components

**Files:**
- Create: `public/images/illustrative/*.png`
- Create: `components/ui/IllustrativeImage.tsx`
- Modify: `HeroSection.tsx`, `RecognitionSection.tsx`, `AtmosphereGallery.tsx`, `LearningSection.tsx`, `TeamSection.tsx`, `TestimonialsSection.tsx`, `LocationSection.tsx`, `SiteFooter.tsx`
- Modify: `content/siteContent.ts`
- Modify: `components/landing/Landing.module.css`

- [ ] Generate the documentary-illustrative image set with no text, logo, watermark, or festa junina imagery.
- [ ] Inspect every output and copy accepted assets into `public/images/illustrative/`.
- [ ] Build `IllustrativeImage` around `next/image`, explicit ratios, caption, and depth/reveal hooks.
- [ ] Replace every `PhotoPlaceholder` usage and remove user-visible factual placeholders without inventing information.
- [ ] Run focused tests and confirm the visual-content contracts pass.

### Task 4: GSAP choreography

**Files:**
- Modify: `components/landing/AnimatedLanding.tsx`
- Modify: `components/landing/Landing.module.css`
- Modify: section components to add narrowly scoped data hooks.

- [ ] Replace the basic hero tween with a labeled timeline.
- [ ] Add a viewport-aware repeating timeline for the second fold and pause it on leave.
- [ ] Add reveal-mask, parallax, learning drift, pricing choreography, leveling-seal rotation, and final-CTA sequences using transforms and opacity only.
- [ ] Keep ScrollTriggers top-to-bottom, avoid pinning, scope every selector, and revert through `useGSAP`/`matchMedia` cleanup.
- [ ] Keep reduced-motion rendering static and fully readable.

### Task 5: Validation and preview

**Files:**
- Modify: `README.md`

- [ ] Run `npm test -- --reporter=dot` and require all tests to pass.
- [ ] Run `npm run lint` and require exit code 0.
- [ ] Run `npm run build` and require the static route build to complete.
- [ ] Open the existing preview tab, validate 390px and desktop layouts, confirm no horizontal overflow, exercise menu/FAQ/modal, and inspect console errors.
- [ ] Document Saans personal-use status, illustrative asset locations, and replacement guidance for future real photographs.
