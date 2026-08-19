# Motion Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar o movimento da landing do GFB com estados físicos claros, melhor desempenho e uma narrativa de scroll mais expressiva.

**Architecture:** Estados frequentes ou diretamente controlados pelo usuário usam transições CSS interrompíveis. O modal usa o elemento `dialog` nativo e Web Animations API para coordenar entrada e saída sem nova dependência. GSAP continua concentrado em animações raras de marketing, dentro do `useGSAP`, com escopo e cleanup.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, GSAP 3, Vitest, Testing Library.

---

### Task 1: Contratos de comportamento

**Files:**
- Modify: `tests/landing.test.tsx`

- [x] Escrever testes que exijam ícone estável no FAQ, hooks próprios nos passos e números de prova permanentemente corretos.
- [x] Executar `npm test -- tests/landing.test.tsx` e confirmar falha pelas marcações ainda ausentes.

### Task 2: Estados de interface

**Files:**
- Modify: `components/landing/SiteHeader.tsx`
- Modify: `components/landing/FaqSection.tsx`
- Modify: `components/landing/LevelingSection.tsx`
- Modify: `components/landing/Landing.module.css`
- Modify: `app/globals.css`

- [x] Manter o menu montado e animar opacity/transform com origem no header.
- [x] Substituir a troca de caracteres do FAQ por um ícone CSS com estado via `aria-expanded`.
- [x] Coordenar abertura e fechamento do dialog com WAAPI e devolver foco ao gatilho.
- [x] Adicionar press feedback, hover gating e reduced motion gentil.

### Task 3: Narrativa GSAP e desempenho

**Files:**
- Modify: `components/landing/HowItWorks.tsx`
- Modify: `components/landing/ProofSection.tsx`
- Modify: `components/landing/AnimatedLanding.tsx`
- Modify: `components/landing/Landing.module.css`

- [x] Revelar os três passos em sequência com transform/opacity e linhas em `scaleX`.
- [x] Manter 11 e + de 500 estáticos, animando somente sua apresentação.
- [x] Remover brightness pulse e loop infinito do selo.
- [x] Reduzir a amplitude cinética da segunda dobra no mobile.
- [x] Limitar `will-change` a elementos continuamente ligados ao scroll.

### Task 4: Verificação

**Files:**
- Modify: `docs/superpowers/plans/2026-08-18-motion-refinement.md`

- [x] Executar `npm test`.
- [x] Executar `npm run lint`.
- [x] Executar `npm run build`.
- [x] Inspecionar menu, segunda dobra, prova social, planos, modal e FAQ em 390 × 844 e desktop.
- [x] Marcar as tarefas concluídas somente após as verificações passarem.
