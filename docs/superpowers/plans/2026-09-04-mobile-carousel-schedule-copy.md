# Mobile Carousel, Schedule and Copy Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the atmosphere controls and schedule readable at 384 px, restore the carousel position after portrait-to-shorter transitions, and reduce unnecessary visible repetitions of “GFB”.

**Architecture:** Keep the existing six-slide React/GSAP carousel and add one pure transition predicate plus a scoped post-animation alignment. Use mobile-only CSS constraints for controls and table columns. Keep brand naming in product, methodology, institutional, accessibility, metadata, legal, and WhatsApp contexts while editing only repeated visible marketing copy.

**Tech Stack:** Next.js 16.3.1, React 19, TypeScript, CSS Modules, GSAP 3.15, Vitest, Testing Library

---

### Task 1: Protect the approved copy hierarchy

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/HeroSection.tsx`
- Modify: `components/landing/ProofSection.tsx`
- Modify: `components/landing/AtmosphereGallery.tsx`
- Modify: `components/landing/WhyGfbSection.tsx`
- Modify: `components/landing/TeamSection.tsx`
- Modify: `components/landing/TestimonialsSection.tsx`
- Modify: `components/landing/CohortSection.tsx`
- Modify: `components/landing/ScheduleSection.tsx`
- Modify: `content/siteContent.ts`

- [x] **Step 1: Write failing copy assertions**

Assert the approved hero eyebrow, proof label and “por aqui” statistic, first-person history title, atmosphere and why kickers, team introduction, testimonial title/text/roles, cohort wording, and shortened table caption. Also assert that “metodologia GFB”, “Essencial GFB”, and “GFB Plus” remain present.

- [x] **Step 2: Run the landing tests and verify RED**

Run: `npm test -- tests/landing.test.tsx`

Expected: failures identify the current repeated visible copy.

- [x] **Step 3: Apply the minimum copy edits**

Use the exact approved language from the design. Keep `gfbHistory.origin` institutional and do not edit metadata, legal pages, WhatsApp messages, image alternatives, accessibility names, or branded plan names.

- [x] **Step 4: Run the landing tests and verify GREEN**

Run: `npm test -- tests/landing.test.tsx`

Expected: all landing tests pass.

### Task 2: Keep carousel controls inside narrow screens

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Add failing mobile CSS assertions**

Assert that the `max-width: 430px` block gives `.atmosphereDots` `flex: 1` and `min-width: 0`, makes its buttons flexible instead of fixed-width, and prevents `.atmosphereArrows` from shrinking.

- [x] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/landing.test.tsx -t "keeps mobile carousel controls"`

Expected: failure because the controls still require about 395 px inside a 329 px area.

- [x] **Step 3: Add the mobile flex constraints**

Inside `@media (max-width: 430px)`, let the dots consume remaining space, reduce their gap, set each dot to `flex: 1` with automatic width, and keep the arrows at a fixed non-shrinking width.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/landing.test.tsx -t "keeps mobile carousel controls"`

Expected: pass.

### Task 3: Restore the active media after a tall-to-short transition

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/AtmosphereGallery.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Add a failing transition test**

Export and test `shouldRestoreAtmospherePosition(previous, next, mobile)`. It must return true only for mobile transitions from `portrait` to `landscape` or `square`. Assert that the viewport has a mobile-safe `scroll-margin-top`.

- [x] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/landing.test.tsx -t "restores the atmosphere position"`

Expected: failure because the transition predicate and scroll margin do not exist.

- [x] **Step 3: Implement the scoped GSAP alignment**

Track the previous format with a ref. During the existing scoped `useGSAP` update, compute whether restoration is needed, update the ref, and append a timeline callback that calls `viewport.scrollIntoView({ block: "start", behavior })` only when the mobile section is on screen. Use `auto` with reduced motion and `smooth` otherwise. Reuse the same viewport alignment for device orientation changes.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/landing.test.tsx -t "restores the atmosphere position"`

Expected: pass.

### Task 4: Prevent schedule-column collisions

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Add failing schedule CSS assertions**

Assert the mobile column distribution `26% / 38% / 36%` and a mobile schedule-time size no larger than `0.78rem` with reduced gap.

- [x] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/landing.test.tsx -t "keeps schedule columns separated"`

Expected: failure because the current `26% / 30% / 44%` distribution leaves the time content wider than its cell.

- [x] **Step 3: Apply the mobile schedule dimensions**

Change only the `max-width: 430px` overrides. Keep the desktop table unchanged.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/landing.test.tsx -t "keeps schedule columns separated"`

Expected: pass.

### Task 5: Validate the complete page

**Files:**
- Verify: `components/landing/AtmosphereGallery.tsx`
- Verify: `components/landing/Landing.module.css`
- Verify: `content/siteContent.ts`
- Verify: `tests/landing.test.tsx`

- [x] **Step 1: Run complete automated verification**

Run: `npm test`, `npm run lint`, `npm run build`, and `git diff --check`.

Expected: all 35 or more tests pass, lint and build exit with code 0, and the diff has no whitespace errors.

- [x] **Step 2: Inspect responsive behavior**

At 384 x 824, verify both arrow buttons end within the viewport, every schedule cell has `scrollWidth <= clientWidth`, and a portrait-to-landscape carousel transition aligns the media below the sticky header. Repeat at 430 x 932 and a desktop width.
