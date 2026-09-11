# Interface mobile-first

**REQUIRED SUB-SKILLS: `mobile-first-design` e `vercel-react-best-practices`.** Leia ambas antes da implementação da interface. Consulte também a documentação da versão instalada do Next.js em `node_modules/next/dist/docs/`; instruções locais têm precedência.

## Arquitetura padrão

- Next.js App Router e TypeScript estrito.
- Renderização estática quando o conteúdo permitir.
- Server Components por padrão; Client Components apenas para ilhas realmente interativas.
- Conteúdo, ofertas, contatos, mensagens de WhatsApp e caminhos de ativos centralizados em configuração tipada.
- Componentes pequenos, com responsabilidade clara e composição em vez de proliferação de flags.
- CSS mobile-first e tokens semânticos próprios da marca.
- Imports diretos e analisáveis; dependências pesadas abaixo da dobra carregadas sob demanda.
- Scripts de terceiros e analytics não competem com a renderização inicial.

## Contrato de responsividade

Comece em 320 px. Crie breakpoints no ponto em que conteúdo, leitura ou interação deixem de funcionar bem, não com base numa lista fixa de aparelhos.

Valide:

- 320 px e larguras intermediárias;
- celulares altos e largos;
- tablets em retrato e paisagem;
- desktop comum e amplo;
- mudanças de largura e altura durante a sessão;
- zoom ou ampliação de texto;
- barras dinâmicas do navegador e teclado virtual.

## Regras invariantes

- Nenhum overflow horizontal: `scrollWidth` não pode exceder `clientWidth` além de tolerância de arredondamento.
- Alvos de toque de pelo menos 48 × 48 px, salvo alternativa acessível equivalente.
- Texto legível e hierarquia preservada com ampliação.
- Safe areas respeitadas em elementos fixos.
- Use unidades dinâmicas de viewport com fallback quando a altura visual importar.
- Cabeçalho e CTA persistente não encobrem conteúdo, controles ou foco.
- Grades mudam de estrutura antes de comprimir rótulos, horários, preços ou botões.
- A seção comercial recebe um layout específico para tablet; não estique três cards desktop até perder legibilidade.
- Rotação e mudanças de altura não removem do campo de visão o conteúdo que estava sendo lido.
- Hover só é requisito visual em dispositivos que realmente têm hover e ponteiro fino.

## Identidade visual

- A paleta deve ter sido fornecida antes desta etapa.
- Converta-a em tokens de fundo, superfície, texto principal/secundário, ação, cabeçalho, borda, foco e destaque comercial.
- O cabeçalho deve contrastar com o corpo sem parecer uma marca diferente.
- Verifique contraste nos estados normal, hover, foco, ativo e desabilitado.
- Não copie a composição visual de GFB, Iasmin ou Priscilla; reutilize somente os contratos de produto e qualidade.

## Conteúdo que precisa caber

Teste a interface com títulos longos, mensagens reais de CTA, preço com periodicidade, nomes extensos, horários, legenda em uma linha e respostas de FAQ. Não use `nowrap`, altura fixa ou fonte reduzida como correção automática quando o conteúdo real não cabe.

## Revisão visual mínima

Inspecione screenshots representativas e também medidas computadas. Uma captura bonita não prova responsividade. Toda correção de aparelho específico deve se tornar uma regra por faixa e um teste geométrico reproduzível.
