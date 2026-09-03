# Hero “DO ZERO” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar o selo geométrico aprovado à expressão “do zero” da headline principal sem alterar seu nome acessível nem causar overflow no mobile.

**Architecture:** A estrutura continua dentro de `HeroSection`, com uma classe exclusiva para o segundo destaque da headline. O CSS Modules controla o estado padrão, limita o hover a ponteiros precisos e remove transições para usuários com redução de movimento.

**Tech Stack:** Next.js 16.3.1, React, CSS Modules, Vitest, Testing Library

---

### Task 1: Implementar e validar o selo geométrico

**Files:**
- Modify: `components/landing/HeroSection.tsx`
- Modify: `components/landing/Landing.module.css`
- Test: `tests/landing.test.tsx`

- [x] **Step 1: Escrever o teste de estrutura que deve falhar**

Atualizar o teste da hero para exigir a classe específica do selo, mantendo o conteúdo textual em caixa normal para preservar o nome acessível:

```tsx
const zeroHighlight = hero?.querySelector('h1 span[class*="heroZero"]');
expect(zeroHighlight).toHaveTextContent("do zero.");
expect(
  screen.getByRole("heading", { name: "Aprenda forró começando do zero." }),
).toBeInTheDocument();
```

- [x] **Step 2: Executar o teste e confirmar a falha**

Run: `npm test -- --run tests/landing.test.tsx -t "keeps the hero emphasis"`

Expected: FAIL porque a classe `heroZero` ainda não existe.

- [x] **Step 3: Separar o destaque de “do zero” no componente**

Em `HeroSection.tsx`, manter o texto original no DOM e trocar apenas a classe do segundo `span`:

```tsx
Aprenda <span className={styles.heroEmphasis}>forró</span> começando{" "}
<span className={styles.heroZero}>do zero.</span>
```

- [x] **Step 4: Implementar o estilo aprovado e seus estados**

Adicionar a `Landing.module.css`:

```css
.heroZero {
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0.025em 0.12em 0.08em;
  border: 0.055em solid var(--brown);
  box-shadow: 0.08em 0.08em 0 var(--orange);
  letter-spacing: -0.03em;
  line-height: 0.88;
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    color 180ms var(--ease-out),
    background-color 180ms var(--ease-out),
    box-shadow 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .heroZero:hover {
    color: var(--yellow);
    background: var(--brown);
    box-shadow: 0 0 0 var(--orange);
    transform: translate(0.06em, 0.06em);
  }
}

@media (prefers-reduced-motion: reduce) {
  .heroZero {
    transition: none;
  }
}
```

- [x] **Step 5: Executar a regressão automatizada**

Run: `npm test`

Expected: 34 testes passando e nenhum erro não tratado.

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: build de produção concluído sem erros.

- [x] **Step 6: Validar visualmente**

Abrir `http://localhost:3000/#inicio`, conferir o selo no viewport atual e em largura móvel próxima a 430 px. Confirmar que não há overflow horizontal e que o hover inverte as cores apenas em dispositivo compatível.

- [x] **Step 7: Preservar a implementação no checkout atual**

Manter a mudança sem um commit isolado neste momento. Os três arquivos também contêm ajustes anteriores ainda não consolidados do protótipo aberto no localhost; criar um commit parcial misturaria trabalhos distintos ou deixaria um estado histórico incompleto.
