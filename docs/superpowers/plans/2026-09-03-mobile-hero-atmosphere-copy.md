# Mobile Hero and Atmosphere Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a copy aprovada e corrigir foto, selo e legendas verticais na experiência móvel.

**Architecture:** A copy institucional permanece centralizada em `content/siteContent.ts`, enquanto o texto introdutório da galeria continua no componente que o apresenta. As correções visuais ficam no CSS Module existente e são limitadas ao breakpoint móvel e aos slides marcados como `portrait`.

**Tech Stack:** Next.js 16.3.1, React, TypeScript, CSS Modules, Vitest, Testing Library

---

### Task 1: Fixar copy e requisitos móveis em testes

**Files:**
- Modify: `tests/landing.test.tsx`

- [ ] **Step 1: Adicionar as expectativas de copy**

```tsx
expect(screen.getByRole("heading", { name: "O GFB começou na UEFS. Hoje, faz Feira dançar." })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "As aulas começam pelas bases e avançam com a desenvoltura da turma." })).toBeInTheDocument();
expect(screen.getByText("Os professores e monitores orientam você de perto. Nas trocas de pares, dá para praticar sem ficar perdido.")).toBeInTheDocument();
```

- [ ] **Step 2: Adicionar as expectativas de CSS móvel**

Ler `Landing.module.css` e exigir regras móveis específicas para `.heroVisual`, `.heroStamp` e a legenda dos slides `portrait`, incluindo `justify-self: center`, `right`, coluna única, `text-align: center` e `white-space: nowrap`.

- [ ] **Step 3: Executar o teste e confirmar a falha**

Run: `npm test -- --run tests/landing.test.tsx -t "mobile layout safeguards"`

Expected: FAIL porque copy e regras móveis ainda não foram aplicadas.

### Task 2: Aplicar a copy aprovada

**Files:**
- Modify: `content/siteContent.ts`
- Modify: `components/landing/AtmosphereGallery.tsx`

- [ ] **Step 1: Atualizar o título da história**

```ts
title: "O GFB começou na UEFS. Hoje, faz Feira dançar.",
```

- [ ] **Step 2: Atualizar título e subtítulo da galeria**

```tsx
title="As aulas começam pelas bases e avançam com a desenvoltura da turma."
text="Os professores e monitores orientam você de perto. Nas trocas de pares, dá para praticar sem ficar perdido."
```

### Task 3: Corrigir a composição móvel

**Files:**
- Modify: `components/landing/Landing.module.css`

- [ ] **Step 1: Centralizar a foto e mover o selo**

Dentro de `@media (max-width: 599px)`, centralizar `.heroVisual`, centralizar sua legenda e trocar a ancoragem de `.heroStamp` de `left` para `right`.

- [ ] **Step 2: Corrigir as legendas 9:16**

Dentro do mesmo breakpoint, forçar uma coluna no `figcaption` dos slides `portrait`, esticar e centralizar o `strong`, aplicar tamanho responsivo e `white-space: nowrap`, mantendo o texto de apoio oculto.

- [ ] **Step 3: Rodar a validação completa**

Run: `npm test`

Expected: 34 testes passando.

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: build de produção concluído sem erros.

- [ ] **Step 4: Conferir no navegador**

Validar a hero e os slides verticais em `http://localhost:3000/#inicio`, no viewport móvel de 430 px, confirmando ausência de overflow e quebra das legendas.
