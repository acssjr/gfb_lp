# GFB Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gerar um favicon ICO leve do monograma GFB e impedir que o SVG completo seja baixado como ícone do navegador.

**Architecture:** O arquivo `app/favicon.ico` usa a convenção de metadata do Next.js e incorpora três resoluções. A configuração manual de ícones será removida de `app/layout.tsx`, enquanto os SVGs usados no conteúdo permanecem intocados.

**Tech Stack:** Next.js 16.3.1, TypeScript, Sharp, Pillow, Vitest

---

### Task 1: Definir o contrato do favicon

**Files:**
- Modify: `tests/landing.test.tsx`

- [ ] **Step 1: Escrever o teste inicialmente falho**

```ts
it("ships a lightweight conventional favicon instead of the full monogram", () => {
  const favicon = readFileSync("app/favicon.ico");
  const imageCount = favicon.readUInt16LE(4);
  const widths = Array.from({ length: imageCount }, (_, index) => {
    const width = favicon[6 + index * 16];
    return width === 0 ? 256 : width;
  });

  expect(favicon.readUInt16LE(0)).toBe(0);
  expect(favicon.readUInt16LE(2)).toBe(1);
  expect(widths).toEqual([16, 32, 48]);
  expect(favicon.byteLength).toBeLessThan(10 * 1024);
});
```

- [ ] **Step 2: Executar o teste e confirmar falha por arquivo ausente**

Run: `npm test -- --run tests/landing.test.tsx`
Expected: FAIL com `ENOENT` para `app/favicon.ico`.

### Task 2: Gerar e integrar o favicon

**Files:**
- Create: `app/favicon.ico`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rasterizar o monograma diretamente em 16, 32 e 48 px**

Usar Sharp sobre `public/brand/gfb-monogram.svg`, preservando transparência, e salvar PNGs temporários separados.

- [ ] **Step 2: Empacotar as três imagens em `app/favicon.ico`**

Usar Pillow com `sizes=[(16, 16), (32, 32), (48, 48)]` e confirmar peso abaixo de 10 KiB.

- [ ] **Step 3: Remover a configuração manual antiga**

Remover de `metadata`:

```ts
icons: {
  icon: [{ url: "/brand/gfb-monogram.svg", type: "image/svg+xml" }],
  shortcut: "/brand/gfb-monogram.svg",
},
```

- [ ] **Step 4: Executar o teste e confirmar aprovação**

Run: `npm test -- --run tests/landing.test.tsx`
Expected: PASS.

### Task 3: Verificar visual e integração

**Files:**
- Verify: `app/favicon.ico`
- Verify: output de produção do Next.js

- [ ] **Step 1: Renderizar cada camada do ICO**

Extrair 16, 32 e 48 px e verificar que o monograma permanece centralizado, transparente e reconhecível.

- [ ] **Step 2: Executar validação completa**

Run: `npm test`, `npm run lint`, `npm run build`
Expected: 42 ou mais testes aprovados, lint sem avisos e build concluído.

- [ ] **Step 3: Validar metadata do build**

Iniciar `next start`, requisitar `/` e confirmar `<link rel="icon" href="/favicon.ico" sizes="any">`, sem referência ao monograma SVG como ícone.

### Task 4: Versionar e publicar

**Files:**
- Commit: todas as alterações intencionais já verificadas no workspace

- [ ] **Step 1: Revisar diff e ausência de segredos**

Run: `git diff --check` e `git status --short`
Expected: apenas arquivos desta rodada de performance, favicon e documentação.

- [ ] **Step 2: Criar commit**

Run: `git commit -m "perf: optimize brand assets and favicon"`
Expected: commit criado em `main`.

- [ ] **Step 3: Enviar ao GitHub**

Run: `git push origin main`
Expected: `main` remoto atualizado para o novo commit.
