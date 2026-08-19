# GFB Conversion, Copy and Pricing Refinement Design

## Objective

Refine the existing landing without changing its visual identity: increase legibility, make the “Já danço” path visible, replace artificial copy with natural beginner language, turn the proof fold into a memorable animated moment, rebuild pricing around a clearly recommended Essencial plan, strengthen the waitlist state, and replace generic FAQ summaries with practical pre-enrollment questions.

## Design decisions

- Raise body copy to a responsive 17–19 px range. Micro-labels, captions, buttons and kickers must not fall below a comfortable 13–15 px range.
- Present “Já danço” as a real secondary button with its own label and supporting line, while keeping “Quero começar” primary.
- Use three common recognition phrases: “Eu acho que não levo jeito”, “Tenho vergonha de errar” and “Sempre fico parado quando toca forró”.
- Enlarge “O GFB em dois números” and animate the proof section with an expanding rule, counting numbers, clipped reveals and staggered supporting copy. Preserve static readable values when reduced motion is enabled.
- Keep three pricing choices. “Para conhecer” is a one-time entry experience. “Essencial GFB” is the recommended continuity plan and carries “O MAIS ESCOLHIDO”. “GFB Plus” contains everything in Essencial plus the existing acceleration benefits.
- Do not invent new operational benefits. Repackage only confirmed method, schedule, class frequency, teacher/monitor proximity, pair rotation, credit, initial private class and individual corrections.
- Use semantic check marks for included benefits instead of decorative diamonds.
- Animate pricing as one choreography: heading reveal, three-card fan-in, item cascade, emphasized badge and a subtle settling motion on Essencial. No pinning and no scroll blocking.
- Replace the waitlist headline with “A próxima turma começa por aqui.” Style the native radio inputs as large schedule choices with clear day, time and selected state.
- FAQ questions must sound like actual pre-enrollment concerns and be answered without inventing policy. Unknown absence/replacement rules explicitly route the visitor to WhatsApp for confirmation.

## Pricing rationale

Research on context effects shows that an intermediate option can become more attractive when it is the easiest choice to justify, but newer research also warns that informed visitors judge absolute value rather than blindly choosing the middle. Therefore Essencial will be recommended visually and supported with concrete value, not a manipulative decoy. GFB Plus creates a clear high-frequency anchor and acceleration path; the R$ 39 class remains an honest low-risk entry.

Sources consulted:

- Huber, Payne and Puto, attraction effect: https://academic.oup.com/jcr/article-abstract/9/1/90/1839380
- Simonson and Tversky, compromise and extremeness aversion: https://www.gsb.stanford.edu/faculty-research/publications/choice-context-tradeoff-contrast-extremeness-aversion
- Stanford GSB on weaker compromise effects when buyers have better information: https://www.gsb.stanford.edu/insights/how-digital-age-rewrites-rule-book-consumer-behavior
- W3C radio group keyboard and accessibility behavior: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- Nielsen Norman Group, FAQ questions should match real user language: https://media.nngroup.com/media/reports/free/Strategic_Design_for_Frequently_Asked_Questions.pdf

## Validation

- Tests assert the new recognition language, Essencial badge, Plus positioning, stronger cohort headline and practical FAQ content.
- Browser review at 390 × 844 and 1024 × 1366 checks text size, CTA hierarchy, pricing animation hooks, native radio interaction and horizontal overflow.
- Run tests, ESLint and the production build.
