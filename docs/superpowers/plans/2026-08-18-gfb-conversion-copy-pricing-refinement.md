# GFB Conversion, Copy and Pricing Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve landing legibility, naturalness and plan selection while preserving the approved identity and motion language.

**Architecture:** Keep commercial content in `content/siteContent.ts`, present it through focused landing components, and centralize scroll choreography in `AnimatedLanding.tsx`. Use native form controls for schedule choice and CSS Modules for every visual state.

**Tech Stack:** Next.js 16, React, TypeScript, CSS Modules, GSAP, ScrollTrigger, Vitest and Testing Library.

---

### Task 1: Lock desired copy and plan behavior with tests

**Files:**
- Modify: `tests/landing.test.tsx`

- [ ] Add assertions for “Eu acho que não levo jeito”, “Tenho vergonha de errar”, “Sempre fico parado quando toca forró”, “O MAIS ESCOLHIDO”, “GFB Plus”, “A próxima turma começa por aqui.” and practical FAQ questions.
- [ ] Assert that the pricing section exposes `data-pricing-stage` and one recommended plan with `data-recommended-plan`.
- [ ] Run `npm test -- tests/landing.test.tsx --reporter=dot` and confirm failure because the new content and hooks do not exist yet.

### Task 2: Rewrite recognition, plans, cohort and FAQ

**Files:**
- Modify: `content/siteContent.ts`
- Modify: `components/landing/HeroSection.tsx`
- Modify: `components/landing/PricingSection.tsx`
- Modify: `components/landing/CohortSection.tsx`

- [ ] Replace the three recognition lines with the approved natural phrases.
- [ ] Mark Essencial as recommended, assign “O MAIS ESCOLHIDO”, and reshape the third plan as GFB Plus with “Tudo do Essencial” plus existing acceleration benefits.
- [ ] Render inline semantic check SVGs for plan benefits and add pricing animation hooks.
- [ ] Render “Já danço” with a secondary button treatment and explanatory text.
- [ ] Render waitlist schedule choices as native radio labels containing day, time and a custom visual indicator.
- [ ] Replace FAQ summaries with practical questions about rhythm, shyness, clothing, absence, deciding after the trial, leveling and learning time.
- [ ] Run the focused test and confirm it passes.

### Task 3: Increase type size and refine visual hierarchy

**Files:**
- Modify: `app/globals.css`
- Modify: `components/landing/Landing.module.css`

- [ ] Increase the global body size and all small labels, captions, buttons, pricing details, schedule choices and FAQ answer text.
- [ ] Give the secondary hero route a bordered cream treatment with a clear hover state.
- [ ] Highlight Essencial with a dark surface, yellow badge and elevated outline while keeping Plus visually premium but secondary.
- [ ] Create professional schedule option states using native inputs, visible focus and selected indicators.
- [ ] Add proof and pricing styles required by the new animation hooks.

### Task 4: Add advanced proof and pricing choreography

**Files:**
- Modify: `components/landing/ProofSection.tsx`
- Modify: `components/landing/AnimatedLanding.tsx`

- [ ] Add accessible static proof labels plus animated count targets.
- [ ] Create a proof timeline with rule expansion, label tracking reduction, count-up and staggered copy.
- [ ] Replace the generic price-card tween with a labeled pricing timeline that fans cards in, cascades benefits and emphasizes the recommended badge.
- [ ] Keep all motion inside scoped `useGSAP`, use transforms/opacity where possible, and skip it under reduced motion.

### Task 5: Verify behavior and rendering

**Files:**
- Verify: `tests/landing.test.tsx`
- Verify: whole application

- [ ] Run `npm test -- --reporter=dot` and confirm all tests pass.
- [ ] Run `npm run lint` and confirm zero ESLint errors.
- [ ] Run `npm run build` and confirm the Next.js production build completes.
- [ ] Review 390 × 844 and 1024 × 1366 in the in-app browser; confirm no horizontal overflow, readable computed sizes, one selected schedule, visible Essencial emphasis and active proof/pricing movement.
