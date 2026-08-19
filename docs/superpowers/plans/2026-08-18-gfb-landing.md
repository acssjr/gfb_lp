# Grupo Forró do Bom Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing responsiva que qualifique e encaminhe as quatro intenções comerciais do GFB para o WhatsApp.

**Architecture:** Next.js App Router com conteúdo centralizado, seções semânticas, ilhas cliente somente para interação e uma camada única de GSAP. Helpers puros isolam WhatsApp, UTMs e GA4 para teste e edição segura.

**Tech Stack:** Next.js 16.3.1, React 19.2.8, TypeScript, CSS Modules, GSAP 3.15, Vitest e Testing Library.

---

### Task 1: Base e contratos

**Files:** `app/`, `config/`, `content/`, `lib/`, `tests/`

- [ ] Escrever testes falhando para URLs do WhatsApp, UTMs e propriedades permitidas no GA4.
- [ ] Implementar helpers mínimos e repetir os testes até passar.
- [ ] Criar configuração central de negócio, turma e mensagens.

### Task 2: Conteúdo e composição

**Files:** `components/landing/`, `app/page.tsx`, `app/globals.css`

- [ ] Escrever testes de presença do hero, planos, estados de turma e placeholders.
- [ ] Implementar as dezesseis dobras com componentes focados.
- [ ] Refinar layout mobile first e breakpoints de tablet/desktop.

### Task 3: Interações acessíveis

**Files:** `components/ui/`, `components/landing/`

- [ ] Escrever testes falhando para menu, FAQ, nivelamento e seleção de horário.
- [ ] Implementar estados, teclado, Escape, foco e atributos ARIA.
- [ ] Integrar links e eventos por intenção sem coletar PII.

### Task 4: Movimento e barra móvel

**Files:** `components/motion/`, `components/landing/MobileConversionBar.tsx`

- [ ] Criar orquestração GSAP com cleanup e `matchMedia()`.
- [ ] Adicionar entradas curtas, profundidade discreta e provas em sequência.
- [ ] Mostrar a barra após o hero e escondê-la em planos/CTA final.

### Task 5: SEO, assets e documentação

**Files:** `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `public/`, `README.md`, `docs/TRACKING.md`, `.env.example`

- [ ] Integrar o logotipo original e placeholders claros para ativos ausentes.
- [ ] Implementar metadata e JSON-LD sem dados inventados.
- [ ] Documentar edição, variáveis, assets, tracking e deploy na Vercel.

### Task 6: Verificação final

- [ ] Rodar testes e corrigir falhas.
- [ ] Rodar lint e corrigir erros e avisos relevantes.
- [ ] Rodar build de produção.
- [ ] Verificar ausência de overflow e os estados críticos da landing.
