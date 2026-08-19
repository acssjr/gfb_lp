# Grupo Forró do Bom — design da landing

## Direção aprovada

A página será uma narrativa única, mobile first, com visual “solar popular”: amarelo `#F6C300`, creme `#FFF2DB` e marrom `#2B1A0E`, fotografia documental e tipografia de interface com fallback de sistema até a chegada dos arquivos Saans. O lettering do logotipo fornecido será usado como imagem, sem redesenho.

## Conversão e conteúdo

O WhatsApp é o único destino comercial. Cada intenção terá uma mensagem própria: primeira aula, horário, plano e nivelamento. O número ficará em `NEXT_PUBLIC_WHATSAPP_NUMBER`; quando ausente, a interface identificará a configuração pendente sem inventar contato. A turma começa no estado de lista prioritária, pois não há data real informada. Conteúdo desconhecido aparece como placeholder editorial explícito.

## Arquitetura

O App Router do Next.js renderiza uma landing composta por seções focadas. Conteúdo e configuração comercial ficam fora dos componentes. Componentes de interação cuidam apenas de menu, acordeão, modal, seleção de horário, tracking e barra móvel. Helpers puros criam URLs do WhatsApp, preservam UTMs para atribuição e limitam propriedades enviadas ao GA4.

## Movimento

Uma camada cliente coordena GSAP com `useGSAP`, `ScrollTrigger` e `gsap.matchMedia()`. O hero entra como uma composição, provas aparecem em sequência e imagens usam profundidade discreta. Não há pin, bloqueio de scroll ou animação de layout. `prefers-reduced-motion` remove o movimento.

## Acessibilidade e desempenho

HTML semântico, foco visível, botões com área mínima, modal nativo com Escape e foco contido, acordeões com `aria-expanded`, imagens otimizadas, lazy loading abaixo da dobra e reserva de espaço. Testes cobrem URLs, tracking sem PII, estados interativos e conteúdo essencial; lint e build fecham a validação.

## SEO local

Metadata, canonical, Open Graph, robots, sitemap e JSON-LD em `@graph` com `DanceSchool`, `WebSite` e `FAQPage`. Apenas informações visíveis e confirmadas entram nos dados estruturados; telefone, redes sociais, fotos e horários de funcionamento do negócio ficam de fora até serem fornecidos.
