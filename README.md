# Landing pages — Grupo Forró do Bom

Repositório das landing pages e campanhas digitais do Grupo Forró do Bom. A implementação atual é a primeira landing de captação de interessados pelo WhatsApp, construída com Next.js 16.3.1, TypeScript, CSS Modules e GSAP.

O projeto foi organizado para crescer sem misturar campanhas. Novas landing pages devem receber uma rota estável, conteúdo próprio e assets próprios; variações de headline pertencem à configuração da campanha, não a branches diferentes. A convenção completa está em [`docs/CAMPAIGNS.md`](docs/CAMPAIGNS.md).

## Executar localmente

Requisito: Node.js 20.9 ou superior.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

| Variável | Obrigatória em produção | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número com DDI e DDD, apenas dígitos. Sem ele, os CTAs levam ao aviso de configuração pendente. |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL pública usada em canonical, Open Graph, sitemap e JSON-LD. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Não | Ativa o carregamento do GA4. |
| `NEXT_PUBLIC_COHORT_STATUS` | Sim | `waitlist` ou `open`. |
| `NEXT_PUBLIC_COHORT_START_DATE` | Quando aberta | Data real exibida para a próxima turma. |
| `NEXT_PUBLIC_COHORT_SCHEDULE` | Quando aberta | `thursday` ou `saturday`. |
| `NEXT_PUBLIC_COHORT_AVAILABLE_SPOTS` | Não | Exibir apenas quando o número de vagas for real. |

## Onde editar conteúdo

- `content/siteContent.ts`: copy, mensagens do WhatsApp, planos e FAQ.
- `config/site.ts`: endereço, horários, número, turma e links de mapa.
- `config/visualAssets.ts`: imagens editoriais, textos alternativos, legendas e enquadramentos.
- `components/landing/`: seções e interações da página.
- `components/landing/Landing.module.css`: identidade visual e responsividade.
- `app/politica-de-privacidade/` e `app/termos-de-uso/`: páginas institucionais ligadas no rodapé.

## Novas campanhas e headlines

A página atual permanece na rota `/`. Para as próximas campanhas, use rotas como `/campanhas/nome-da-campanha` e mantenha cada campanha isolada em três partes:

- página em `app/campanhas/<slug>/page.tsx`;
- conteúdo e variações em `content/campaigns/<slug>.ts`;
- imagens em `public/campaigns/<slug>/`.

Cada headline deve ter um identificador permanente, por exemplo `hero-a`, `hero-b` e `hero-c`. Isso permite trocar ou testar a mensagem sem apagar o histórico da campanha. Componentes, marca, tracking, WhatsApp e informações institucionais continuam compartilhados.

## Tipografia e imagens

Os logotipos horizontal, quebrado e o monograma estão em `public/brand/`. A interface usa Saans por meio de `next/font/local`, com os arquivos em `app/fonts/`.

As fotografias usadas nesta versão ficam em `public/images/illustrative/`. Elas ocupam hero, reconhecimento, atmosfera, monitores e relatos. Para substituí-las por registros próprios, mantenha as chaves em `config/visualAssets.ts` e troque os caminhos, dimensões, textos alternativos e legendas.

Antes da publicação, substitua os nomes, histórias e depoimentos simulados pelos conteúdos autorizados. Também devem ser confirmados o número oficial do WhatsApp, domínio final, formas de pagamento, referência textual do endereço, data de início e vagas de uma turma aberta.

## Movimento

As animações ficam centralizadas em `components/landing/AnimatedLanding.tsx`. O sistema usa `useGSAP`, timelines, `ScrollTrigger`, `gsap.matchMedia()` e cleanup automático. Há composição de entrada no hero, segunda dobra em movimento contínuo, revelação editorial das fotografias, profundidade discreta, provas sociais em sequência, gestos nos cards e CTA final. O scroll continua nativo e `prefers-reduced-motion` é respeitado.

## Turma aberta e lista prioritária

O estado inicial é `waitlist`. Para mostrar uma turma aberta, configure:

```env
NEXT_PUBLIC_COHORT_STATUS=open
NEXT_PUBLIC_COHORT_START_DATE=DD/MM/AAAA
NEXT_PUBLIC_COHORT_SCHEDULE=thursday
NEXT_PUBLIC_COHORT_AVAILABLE_SPOTS=
```

Deixe vagas em branco até existir um número confirmado.

## WhatsApp

As mensagens são centralizadas e codificadas em URLs `wa.me`. Há mensagens diferentes para iniciante, quinta, sábado, cada plano e cada nível do nivelamento. Não existe checkout nem pagamento on-line.

## Tracking

O plano completo está em `docs/TRACKING.md`. UTMs permanecem na sessão até o clique e entram apenas como propriedades permitidas. Nenhum dado pessoal ou texto de mensagem é enviado ao GA4.

## SEO local

A implementação inclui metadata, canonical, Open Graph, Twitter Card, robots, sitemap e JSON-LD com `DanceSchool`, `WebSite` e `FAQPage`. Telefone, coordenadas, redes sociais e horários de funcionamento não foram inventados e devem ser adicionados somente quando confirmados.

Depois do deploy, valide a URL pública no Rich Results Test, Schema.org Validator e Google Search Console.

## Qualidade

```bash
npm test
npm run lint
npm run build
npm audit
```

Último diagnóstico local da build de produção: Lighthouse 98 em Performance e 100 em Acessibilidade, Boas Práticas e SEO, com CLS 0 e LCP de 2,3 s. O relatório completo está em `lighthouse-report.json`; resultados podem variar conforme máquina e rede.

## Deploy na Vercel

Importe o repositório na Vercel, cadastre as variáveis de ambiente e faça o deploy. O projeto usa apenas recursos compatíveis com a plataforma e não depende de banco, pagamento ou backend próprio.
