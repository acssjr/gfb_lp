# Movimento e componentes recorrentes

Implemente conteúdo e layout estáticos antes do movimento. Interações devem melhorar orientação, feedback ou compreensão sem disputar atenção com a oferta.

## Gate de movimento

1. **REQUIRED SUB-SKILL: `find-animation-opportunities`.** Avalie os candidatos e rejeite os que não tenham função clara.
2. **REQUIRED SUB-SKILL: `animate`.** Implemente somente as oportunidades aprovadas.
3. Use skills GSAP específicas apenas quando sequência, scroll ou controle dinâmico justificarem a dependência.

Cada animação deve servir a pelo menos uma função: feedback, continuidade espacial, indicação de estado, prevenção de mudança brusca, explicação ou encanto raro. Prefira `transform` e `opacity`, entradas curtas e stagger moderado. CSS é a primeira opção para movimentos previsíveis.

Respeite `prefers-reduced-motion`, carregue código de movimento abaixo da dobra somente quando necessário e limite efeitos de hover a dispositivos compatíveis. A seção comercial pode ter entrada própria, mas seu conteúdo deve estar imediatamente acessível sem a animação.

## CTA persistente

Modele o comportamento como estados observáveis:

- **oculto:** o CTA principal do hero está visível;
- **visível:** o CTA do hero saiu e nenhuma zona comercial ou final equivalente está visível;
- **oculto:** pricing, modalidades ou CTA final entrou no viewport.

Requisitos:

- mensagem de WhatsApp contextual, distinta da mensagem do hero;
- altura compacta e limite geométrico testável;
- largura, quebra de texto e área segura controladas;
- `safe-area-inset-bottom` incorporado sem inflar o conteúdo interno;
- nenhum conteúdo acionável encoberto;
- não competir com outro CTA equivalente;
- foco e navegação por teclado preservados;
- não crescer indefinidamente em celulares altos, texto ampliado, rotação ou mudança da barra do navegador.

No desktop, o componente pode ser botão ou faixa flutuante conforme a direção visual. A mesma máquina de estados continua valendo.

## Carrossel

Use carrossel apenas quando reduzir densidade, mostrar prova, processo, situações ou benefícios melhor do que uma lista estática.

Contrato padrão:

- autoplay entre 5 e 7 segundos;
- iniciar somente quando o carrossel estiver próximo ou dentro do viewport;
- pausar em hover, foco, aba oculta, movimento reduzido ou interação manual;
- depois da primeira interação manual, não disputar o controle do visitante;
- setas, indicadores, swipe e teclado;
- estado acessível sem anúncios excessivos por leitor de tela;
- loop contínuo sem área vazia depois do último item;
- carregar inicialmente apenas o item ativo e vizinhos necessários;
- controles e legendas sempre dentro do viewport;
- frases curtas e centralizadas quando isso melhorar a leitura, sem quebras artificiais;
- alternância entre imagens 9:16 e paisagem sem salto de rolagem nem perda do conteúdo atual.

Não use autoplay para esconder ausência de conteúdo. Não transforme toda a página em carrossel.

## Pricing e modalidades

- A entrada visual deve revelar a hierarquia comercial sem atrasar a decisão.
- Conteúdo, links e foco continuam funcionais com JavaScript de animação indisponível.
- Cards se reorganizam antes de ficarem estreitos; tablet é um estado próprio.
- O plano ou modalidade recomendada só recebe destaque quando houver critério real.

## Implementação e limpeza

- Evite listeners globais duplicados e observadores sem cleanup.
- Agrupe medições de layout e escritas de estilo para impedir thrashing.
- Não anime propriedades que provoquem layout contínuo quando transformações resolverem.
- Teste o comportamento com aba oculta, reduced motion, toque, teclado, resize e mudança de orientação.
