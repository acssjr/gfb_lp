# Carousel Learning Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the first atmosphere card beside the sixth, replace interface instructions with emotional outcome copy, and compact the learning cards.

**Architecture:** Render one aria-hidden preview after the six stateful atmosphere slides so the existing GSAP collection, counter, autoplay, and navigation stay unchanged. Keep the learning copy in its component and compact the existing CSS grid without changing carousel state behavior.

**Tech Stack:** Next.js 16.3.1, React 19, TypeScript, CSS Modules, GSAP, Vitest, Testing Library

---

### Task 1: Add a non-interactive loop preview

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/AtmosphereGallery.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Write a failing test**

Assert that `[data-atmosphere-loop-preview]` exists, contains “O forró também ocupa a cidade”, is `aria-hidden`, and does not increase the six `[data-atmosphere-slide]` elements.

- [x] **Step 2: Verify the test fails**

Run: `npm test -- tests/landing.test.tsx`

Expected: FAIL because the loop preview does not exist.

- [x] **Step 3: Implement the preview**

Render a second visual instance of the first image after the mapped slides. Give it the regular slide class plus `atmosphereLoopPreview`, `aria-hidden="true"`, and `data-atmosphere-loop-preview`. Do not add `data-atmosphere-slide` or `data-atmosphere-media`.

- [x] **Step 4: Verify Task 1**

Run: `npm test -- tests/landing.test.tsx`

Expected: all landing tests PASS.

### Task 2: Rewrite and compact the learning section

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/LearningSection.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Write a failing test**

Assert that the section contains “Quando a música começa, você encontra um ponto de partida, liga um movimento ao outro e sabe como voltar se algo sair diferente.”, excludes “Cada slide mostra”, and that the base `.learningSlide` rule uses `grid-template-rows: auto auto`, `align-content: start`, and `min-height: clamp(18rem, 30vw, 22rem)`.

- [x] **Step 2: Verify the test fails**

Run: `npm test -- tests/landing.test.tsx`

Expected: FAIL on the old copy and old elastic grid.

- [x] **Step 3: Implement the copy and compact grid**

Replace the support paragraph in `LearningSection.tsx`. Update `.learningSlide` to the tested natural rows, start alignment, smaller minimum height, and a responsive gap. Remove the redundant mobile row/alignment overrides while keeping the mobile minimum height.

- [x] **Step 4: Verify Task 2**

Run: `npm test -- tests/landing.test.tsx`

Expected: all landing tests PASS.

### Task 3: Validate the complete page

**Files:**
- Verify: `components/landing/AtmosphereGallery.tsx`
- Verify: `components/landing/LearningSection.tsx`
- Verify: `components/landing/Landing.module.css`

- [x] **Step 1: Inspect the browser**

Open `http://localhost:3000/#ambiente-gfb`, select the sixth atmosphere card, and confirm that the first card appears at its right without entering the accessibility tree. Inspect all three learning cards at desktop and mobile widths.

- [x] **Step 2: Run complete verification**

Run: `npm test`, `npm run lint`, and `npm run build`.

Expected: all tests pass, ESLint exits with code 0, and the production build succeeds.
