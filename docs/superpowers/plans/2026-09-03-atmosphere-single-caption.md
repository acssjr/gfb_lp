# Atmosphere Single Caption Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show one concise, concrete sentence under every photo or video in the GFB atmosphere carousel.

**Architecture:** Keep the six visible phrases in `atmosphereFrames`, where the gallery already reads its content. Remove the secondary caption node from `AtmosphereGallery` so the one-sentence rule applies at every breakpoint, then simplify the caption grid CSS and protect the behavior with a rendering test.

**Tech Stack:** Next.js 16.3.1, React 19, TypeScript, CSS Modules, Vitest, Testing Library

---

### Task 1: Render one calibrated phrase per atmosphere card

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `content/siteContent.ts`
- Modify: `components/landing/AtmosphereGallery.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] **Step 1: Write the failing test**

Assert that the gallery renders exactly these six phrases and no element marked `data-atmosphere-support`:

```tsx
const phrases = [
  "O forró também ocupa a cidade",
  "Gente que dança junto",
  "Gente que continua por perto",
  "A turma começa pelas bases",
  "Uma turma para dançar junto",
  "Orientação de perto na prática",
];

phrases.forEach((phrase) => {
  expect(screen.getByText(phrase)).toBeInTheDocument();
});
expect(container.querySelector("[data-atmosphere-support]")).not.toBeInTheDocument();
```

- [x] **Step 2: Run the focused test and verify the expected failure**

Run: `npm test -- tests/landing.test.tsx`

Expected: FAIL because the old phrases and secondary support nodes are still rendered.

- [x] **Step 3: Apply the minimal implementation**

Replace the six `label` values in `content/siteContent.ts` with the approved phrases. In `AtmosphereGallery.tsx`, keep only `<strong>{frame.label}</strong>` inside `figcaption`. In `Landing.module.css`, use a one-column centered caption at every breakpoint and remove selectors that only target the deleted support span.

- [x] **Step 4: Verify the focused behavior**

Run: `npm test -- tests/landing.test.tsx`

Expected: all landing tests PASS.

- [x] **Step 5: Check the carousel visually**

Open `http://localhost:3000/#ambiente-gfb` at 430 px and desktop width. Advance through all six cards and confirm that each shows one centered, readable phrase without overflow.

- [x] **Step 6: Run the full project verification**

Run: `npm test`, `npm run lint`, and `npm run build`.

Expected: all 34 tests pass, ESLint exits with code 0, and the production build succeeds.
