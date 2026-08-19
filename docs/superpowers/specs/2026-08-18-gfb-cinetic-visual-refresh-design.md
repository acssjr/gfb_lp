# GFB Cinetic Visual Refresh Design

## Objective

Replace the current visual placeholders with cohesive illustrative documentary images, load the supplied Saans family locally, and make the page feel more like dance through a richer GSAP choreography while preserving conversion, accessibility, native scrolling, and the existing commercial copy.

## Visual direction

- Use the supplied Saans trial files for this personal-use project: Regular for body, Medium for UI, SemiBold for supporting display text, and Bold for headlines.
- Keep the proprietary GFB logo untouched.
- Generate original illustrative photography with candid movement, inclusive adult groups, natural body language, subtle motion blur, and the existing yellow, cream, brown, and burnt-orange palette.
- Avoid festa junina props, rural caricatures, hats, flags, bonfires, staged advertising poses, gradients, glassmorphism, and in-image text.
- Mark generated imagery discreetly as illustrative in captions and alt text, not as real GFB documentary evidence.

## Content treatment

- Remove every user-visible `PLACEHOLDER` token.
- Do not invent monitor names, tenure, testimonials, dates, vacancy counts, phone numbers, or venue references.
- Until real monitor and testimonial content arrives, use neutral editorial labels such as “Imagem ilustrativa” and “Conteúdo real em preparação”, keeping the data structures easy to replace.
- Hide configuration warnings from the public-facing footer; keep missing WhatsApp handling in code.

## Motion system

- Hero: a short unified timeline for copy, image, stamp, and accent line.
- Second fold: a continuously moving kinetic composition. The three recognition phrases travel in alternating directions while a documentary image breathes through subtle scale and rotation. The loop pauses outside the viewport and is fully disabled for reduced motion.
- Proof: numbers rise and scale in sequence.
- Photography: reveal masks plus alternating parallax on scroll.
- Learning sequence: cards advance with a shallow horizontal drift without trapping native scroll.
- Pricing: controlled alternating card entrance and featured-plan emphasis.
- Leveling: slow seal rotation only while visible.
- Final CTA: concise scale/translation choreography.
- Animate transforms and opacity only; use `useGSAP`, scoped selectors, `gsap.matchMedia()`, `ScrollTrigger`, and automatic cleanup.

## Responsive and accessibility constraints

- Preserve CTA visibility in the first mobile viewport and prevent horizontal overflow.
- Avoid pinned sections and custom scroll smoothing.
- Keep reading order and focus order unchanged.
- Images use `next/image`, explicit aspect ratios, `sizes`, lazy loading below the fold, and descriptive alternative text.
- `prefers-reduced-motion: reduce` renders every section in its final static state.

## Verification

- Tests cover the absence of visible placeholder tokens, illustrative image metadata, and the presence of kinetic hooks.
- Run Vitest, ESLint, production build, browser console checks, and representative mobile/desktop visual QA.
