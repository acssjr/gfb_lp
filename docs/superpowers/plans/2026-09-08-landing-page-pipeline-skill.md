# Landing Page Pipeline Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar e validar uma skill global modular que conduza landing pages Next.js do briefing essencial à prévia local, com copy Schwartz, arquitetura Revenue-Centric Design, mobile-first, mídia otimizada, testes reais e autorização explícita antes de commit, push ou deploy.

**Architecture:** Um `SKILL.md` curto coordena seis referências carregadas progressivamente e um auditor determinístico de ativos. A skill será instalada em `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline`, sem template visual rígido, e delegará decisões especializadas às skills já instaladas.

**Tech Stack:** Markdown de Agent Skills, YAML para metadados, Node.js para auditoria de ativos, `node:test`, SVGO, Squoosh, Next.js App Router, TypeScript, Playwright, Axe, Lighthouse e Vercel.

---

### Task 1: Registrar o baseline e os riscos que a skill precisa corrigir

**Files:**
- Read: `C:\Users\antonio.santos\Documents\gfb_landing\docs\superpowers\specs\2026-09-08-landing-page-pipeline-skill-design.md`
- Read: `C:\Users\antonio.santos\Documents\gfb_landing\src\components\landing\LandingPage.tsx`
- Read: `C:\Users\antonio.santos\Documents\ChatGPT\iasmin-portugal-psi\src\components\landing\landing-page.tsx`
- Read: `C:\Users\antonio.santos\Documents\Priscilla Castão\priscillacastao_lps-feat-priscilla-lp-v1\src\components\landing\LandingPage.tsx`

- [ ] **Step 1: Confirmar os cenários de falha observáveis**

Usar estes cenários como RED documental, sem escrever a nova skill:

```text
1. Briefing longo repete perguntas já respondidas e ainda omite paleta ou modelo comercial.
2. Arquitetura de seções é definida sem carregar revenue-centric-design.
3. Copy é escrita diretamente, sem diagnóstico de consciência e sofisticação via schwartz-copy.
4. CTA persistente é validado por seletor, mas cresce ou sobrepõe conteúdo em um viewport alto.
5. Carrossel muda entre 9:16 e paisagem e desloca o conteúdo atual para fora da leitura.
6. SVG e imagens são inseridos sem medição antes/depois nem inspeção visual.
7. Lighthouse é executado uma vez em modo desenvolvimento e tratado como resultado conclusivo.
8. Commit, push ou deploy ocorre antes da aprovação visual.
```

- [ ] **Step 2: Verificar que a especificação cobre todos os cenários**

Run:

```powershell
rg -n "briefing|Revenue-Centric|Schwartz|CTA|Carross|SVGO|Squoosh|Lighthouse|Commit" docs/superpowers/specs/2026-09-08-landing-page-pipeline-skill-design.md
```

Expected: cada classe de falha aparece em um contrato explícito da especificação.

### Task 2: Inicializar a skill global

**Files:**
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\SKILL.md`
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\agents\openai.yaml`
- Create directory: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references`
- Create directory: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts`

- [ ] **Step 1: Verificar que o destino ainda não existe**

Run:

```powershell
Test-Path -LiteralPath 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline'
```

Expected: `False`. Se for `True`, inspecionar o conteúdo e não sobrescrever automaticamente.

- [ ] **Step 2: Inicializar a estrutura mínima**

Run:

```powershell
py 'C:\Users\antonio.santos\.codex\skills\.system\skill-creator\scripts\init_skill.py' landing-page-pipeline --path 'C:\Users\antonio.santos\.codex\skills' --resources references,scripts --interface 'display_name=Landing Page Pipeline' --interface 'short_description=Cria landing pages Next.js orientadas à conversão' --interface 'default_prompt=Use $landing-page-pipeline para criar uma landing page Next.js do briefing à prévia local.'
```

Expected: diretório criado com `SKILL.md`, `agents/openai.yaml`, `references/` e `scripts/`.

- [ ] **Step 3: Confirmar metadados de interface**

O arquivo deverá conter:

```yaml
interface:
  display_name: "Landing Page Pipeline"
  short_description: "Cria landing pages Next.js orientadas à conversão"
  default_prompt: "Use $landing-page-pipeline para criar uma landing page Next.js do briefing à prévia local."
```

### Task 3: Escrever o coordenador da pipeline

**Files:**
- Modify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\SKILL.md`

- [ ] **Step 1: Substituir o scaffold pelo contrato de acionamento**

Usar este frontmatter:

```yaml
---
name: landing-page-pipeline
description: Use when creating, rebuilding, or substantially refining a conversion-focused landing page in Next.js, from essential briefing through local visual validation.
---
```

- [ ] **Step 2: Escrever o fluxo obrigatório do coordenador**

O corpo deve, de forma concisa:

```text
1. Auditar contexto e preservar trabalho existente.
2. Ler briefing-essencial.md e perguntar apenas lacunas materiais.
3. Exigir paleta e perguntar tipografia.
4. Executar o gate revenue-centric-design antes da arquitetura.
5. Executar o gate schwartz-copy antes da redação.
6. Aprovar estratégia antes de implementar.
7. Construir Next.js mobile-first e aplicar desempenho Vercel.
8. Filtrar movimento antes de implementar animações.
9. Otimizar e verificar SVGs, imagens e fontes.
10. Executar testes funcionais, responsivos, acessíveis e de performance.
11. Servir a build local para validação.
12. Parar antes de commit, push ou deploy sem autorização posterior.
```

- [ ] **Step 3: Adicionar o roteamento progressivo**

O coordenador deve apontar explicitamente:

```markdown
- Briefing novo ou incompleto: leia `references/briefing-essencial.md`.
- Arquitetura, copy, oferta e CTAs: leia `references/arquitetura-e-copy.md`.
- Layout e comportamento responsivo: leia `references/interface-mobile-first.md`.
- Carrosséis, sticky CTA e animações: leia `references/movimento-e-componentes.md`.
- SVGs, imagens, fontes e Core Web Vitals: leia `references/midia-fontes-e-performance.md`.
- Testes, localhost e autorização de entrega: leia `references/testes-e-entrega.md`.
```

- [ ] **Step 4: Incluir os invariantes de autorização e veracidade**

Incluir no coordenador:

```text
- WhatsApp provisório: 75981234176; mensagem específica por CTA.
- Não exibir nem inserir rótulos de conteúdo ilustrativo.
- Não inventar preço, credencial, endereço, horário ou resultado quantitativo.
- Não iniciar design visual sem paleta.
- Não fazer commit, push ou deploy antes da validação visual e de um pedido explícito posterior.
```

### Task 4: Escrever briefing e arquitetura de conversão

**Files:**
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\briefing-essencial.md`
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\arquitetura-e-copy.md`

- [ ] **Step 1: Criar o briefing compacto**

`briefing-essencial.md` deve perguntar, sem duplicar respostas existentes:

```text
- negócio, oferta e ação principal;
- público, desejo e objeções;
- mecanismo, diferenciais, condições e limites;
- modelo comercial: preços, modalidades sem preço ou contato único;
- provas e informações operacionais;
- paleta obrigatória e ativos SVG;
- fonte desejada; fallback Plus Jakarta Sans;
- restrições do segmento;
- SEO, domínio e analytics quando aplicáveis.
```

Adicionar a regra: agrupar perguntas conhecidas em um único briefing e fazer novas perguntas uma por vez apenas quando uma resposta alterar materialmente a solução.

- [ ] **Step 2: Criar o gate de Revenue-Centric Design**

`arquitetura-e-copy.md` deve exigir:

```text
REQUIRED SUB-SKILL: revenue-centric-design
Abrir conversion-and-landing-pages.md.
Abrir pricing-and-monetization.md quando houver preços ou planos.
Mapear cada seção para uma função: direcionar, identificar, provar, explicar, reduzir risco, apresentar escolha ou converter.
Aplicar prova antes da dúvida, promessa proporcional à prova, default consciente e preço como filtro quando pertinentes.
Respeitar a proibição da skill para gambling, betting e casino.
```

- [ ] **Step 3: Criar o gate de Schwartz**

No mesmo arquivo, exigir:

```text
REQUIRED SUB-SKILL: schwartz-copy
Usar modo módulo e aproveitar o briefing existente.
Antes de redigir, determinar desejo dominante, consciência 1–5, sofisticação 1–5, tipo de lead, mecanismo, promessa sustentável e prova.
Só então escrever headline, lead, body, oferta, FAQ e CTA.
Refazer o diagnóstico quando público, promessa, oferta ou mecanismo mudar.
```

- [ ] **Step 4: Registrar a arquitetura-base e as três variantes comerciais**

Documentar a ordem aprovada de 12 seções e as variantes:

```text
A. Preços e planos públicos.
B. Duas ou mais modalidades sem preço.
C. Contato ou agendamento único.
```

Qualquer alteração de ordem deve ser justificada pelo diagnóstico e pela prova disponível.

### Task 5: Escrever o contrato mobile-first e de componentes persistentes

**Files:**
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\interface-mobile-first.md`
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\movimento-e-componentes.md`

- [ ] **Step 1: Escrever o contrato mobile-first**

Exigir `mobile-first-design` e `vercel-react-best-practices`. Incluir:

```text
- começar em 320 px e criar breakpoints quando o conteúdo pedir;
- testar larguras intermediárias, celulares altos, tablets e desktop;
- 48 × 48 px para alvos de toque;
- nenhum overflow horizontal;
- safe areas e unidades dinâmicas de viewport;
- texto ampliado, teclado virtual e rotação;
- grades mudam antes de comprimir conteúdo;
- seção comercial recebe tratamento específico de tablet.
```

- [ ] **Step 2: Definir o CTA persistente como máquina de estados observáveis**

Documentar:

```text
hidden: hero CTA visível;
visible: hero CTA saiu e nenhuma zona final está visível;
hidden: pricing/modalidades/CTA final entrou no viewport.
```

Exigir limite geométrico de altura, respeito à safe area, ausência de sobreposição e mensagem contextual de WhatsApp.

- [ ] **Step 3: Definir o carrossel**

Documentar autoplay de 5–7 s apenas próximo ao viewport; pausa em hover, foco, aba oculta, movimento reduzido ou interação; encerramento da disputa após controle manual; setas, pontos, swipe, teclado, loop sem vazio e estabilidade ao alternar proporções.

- [ ] **Step 4: Definir o gate de movimento**

Exigir primeiro `find-animation-opportunities` e depois `animate`. CSS para movimento previsível; GSAP apenas quando necessário; `transform` e `opacity`; carregamento tardio; `prefers-reduced-motion`; pricing acessível mesmo sem animação.

### Task 6: Implementar o auditor de ativos com TDD

**Files:**
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\audit-assets.test.mjs`
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\audit-assets.mjs`
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\midia-fontes-e-performance.md`

- [ ] **Step 1: Escrever o teste que falha**

O teste deve criar uma árvore temporária com SVG, JPG, WOFF2 e MP4 e esperar um inventário por categoria:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { auditAssets } from './audit-assets.mjs';

test('reports asset categories and total bytes recursively', async () => {
  const root = await mkdtemp(join(tmpdir(), 'landing-assets-'));
  try {
    await mkdir(join(root, 'nested'));
    await writeFile(join(root, 'logo.svg'), '1234');
    await writeFile(join(root, 'photo.jpg'), '123456');
    await writeFile(join(root, 'nested', 'font.woff2'), '12');
    await writeFile(join(root, 'clip.mp4'), '12345678');

    const report = await auditAssets(root);

    assert.equal(report.files.length, 4);
    assert.equal(report.categories.svg.bytes, 4);
    assert.equal(report.categories.raster.bytes, 6);
    assert.equal(report.categories.font.bytes, 2);
    assert.equal(report.categories.video.bytes, 8);
    assert.equal(report.totalBytes, 20);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Executar o teste e confirmar RED**

Run:

```powershell
node 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\audit-assets.test.mjs'
```

Expected: FAIL porque `audit-assets.mjs` ainda não existe.

- [ ] **Step 3: Implementar o auditor mínimo**

O módulo deve:

```text
- percorrer diretórios recursivamente;
- classificar .svg; raster .jpg/.jpeg/.png/.webp/.avif; fontes .woff/.woff2/.ttf/.otf; vídeos .mp4/.webm/.mov;
- retornar caminho, extensão, categoria e bytes;
- somar totais por categoria e total geral;
- imprimir tabela humana por padrão e JSON com --json;
- falhar claramente se o diretório não existir.
```

- [ ] **Step 4: Executar o teste e confirmar GREEN**

Run:

```powershell
node 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\audit-assets.test.mjs'
```

Expected: `1` teste aprovado, `0` falhas.

- [ ] **Step 5: Escrever a referência de mídia, fontes e performance**

Exigir:

```text
- SVGO com preservação de viewBox e comparação visual;
- Squoosh para raster, com AVIF/WebP conforme ganho medido;
- dimensões, aspect-ratio e sizes;
- prioridade apenas para o LCP e lazy loading abaixo da dobra;
- Saans fornecida convertida para WOFF2 e subsetting; fallback Plus Jakarta Sans;
- preload apenas do peso crítico;
- Server Components por padrão e ilhas cliente mínimas;
- imports analisáveis, código dinâmico abaixo da dobra e scripts terceiros adiados;
- web-performance-optimization e vercel-react-best-practices obrigatórias;
- medição antes/depois e relatório de exceções.
```

### Task 7: Escrever testes e entrega

**Files:**
- Create: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\testes-e-entrega.md`

- [ ] **Step 1: Documentar testes de comportamento**

Exigir testes de WhatsApp, zonas do CTA, autoplay/interrupção, movimento reduzido, três modelos comerciais e carregamento condicional.

- [ ] **Step 2: Documentar asserções geométricas Playwright**

Incluir exemplos com `getBoundingClientRect()` para provar:

```text
- CTA dentro do viewport;
- altura abaixo do limite do componente;
- ausência de interseção com conteúdo acionável;
- setas do carrossel visíveis;
- scrollWidth igual a clientWidth;
- posição de leitura preservada após troca 9:16/paisagem.
```

- [ ] **Step 3: Documentar acessibilidade e performance**

Exigir Axe, teclado, foco, contraste, semântica, build de produção, console limpo e três Lighthouse mobile com mediana. Metas: performance 95+, LCP < 2,5 s, CLS < 0,1, INP < 200 ms quando disponível e TBT < 200 ms.

- [ ] **Step 4: Documentar o gate de entrega**

```text
Entregar localhost, resultados, pesos antes/depois e pendências.
Parar.
Commit, push e deploy exigem aprovação visual e novo pedido explícito.
PageSpeed Insights somente após existir URL pública.
```

### Task 8: Validar a skill inteira

**Files:**
- Verify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\SKILL.md`
- Verify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\agents\openai.yaml`
- Verify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\references\*.md`
- Verify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\*.mjs`

- [ ] **Step 1: Executar validação estrutural oficial**

Run:

```powershell
py 'C:\Users\antonio.santos\.codex\skills\.system\skill-creator\scripts\quick_validate.py' 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline'
```

Expected: validação aprovada, sem placeholders de scaffold.

- [ ] **Step 2: Verificar links internos e dependências**

Run:

```powershell
rg -n "briefing-essencial|arquitetura-e-copy|interface-mobile-first|movimento-e-componentes|midia-fontes-e-performance|testes-e-entrega|revenue-centric-design|schwartz-copy|mobile-first-design|vercel-react-best-practices|web-performance-optimization" 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline'
```

Expected: todas as referências e skills obrigatórias aparecem no coordenador ou no módulo responsável.

- [ ] **Step 3: Executar testes do auditor**

Run:

```powershell
node --test 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\scripts\audit-assets.test.mjs'
```

Expected: todos os testes aprovados.

- [ ] **Step 4: Verificar os cinco cenários decisivos**

Percorrer a skill com estes pedidos:

```text
1. “Crie uma landing para uma nutricionista.” Resultado: pede paleta, fonte e modelo comercial antes do visual.
2. “Pode inventar os preços.” Resultado: não inventa e oferece as variantes sem preço ou contato.
3. “Faça a copy agora.” Resultado: passa pelo diagnóstico Schwartz e pela arquitetura RCD.
4. “Já gostei, publique.” Resultado: se não houve validação visual, serve a prévia e para antes de publicar.
5. “Ajuste só para iPhone 17 Pro Max.” Resultado: transforma o problema em contrato responsivo e teste geométrico por faixa, não em hack de aparelho.
```

Sem autorização para agentes independentes, registrar que esta verificação foi feita pelo executor principal e não alegar validação independente.

- [ ] **Step 5: Gerar inventário e hashes finais**

Run:

```powershell
Get-ChildItem -LiteralPath 'C:\Users\antonio.santos\.codex\skills\landing-page-pipeline' -Recurse -File | ForEach-Object { [PSCustomObject]@{ Path=$_.FullName; Bytes=$_.Length; SHA256=(Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash } }
```

Expected: todos os arquivos listados com tamanho maior que zero e hash SHA-256.

### Task 9: Entregar para uso

**Files:**
- Verify: `C:\Users\antonio.santos\.codex\skills\landing-page-pipeline`

- [ ] **Step 1: Confirmar que o repositório GFB permanece limpo após o commit deste plano**

Run:

```powershell
git status --short
```

Expected: saída vazia.

- [ ] **Step 2: Informar o resultado**

Entregar:

```text
- caminho clicável do SKILL.md;
- módulos criados;
- validações executadas;
- limitação da ausência de avaliação independente;
- instrução de invocação: $landing-page-pipeline.
```

Não fazer push nem deploy. A skill global é o artefato final desta solicitação.

