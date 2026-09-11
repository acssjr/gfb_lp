# Testes e entrega

Os testes devem prever falhas reais e observar comportamento. Não aceite testes que apenas encontrem um seletor, uma classe ou uma frase e declarem a experiência correta.

## Unidade e integração

Cubra:

- formação e codificação de cada link/mensagem de WhatsApp;
- número provisório centralizado e substituível;
- seleção dos três modelos comerciais;
- validação da configuração e de informações obrigatórias;
- máquina de estados do CTA persistente;
- autoplay, pausa e interrupção manual do carrossel;
- `prefers-reduced-motion`;
- carregamento condicional de mídia, widgets e código abaixo da dobra.

## Matriz de navegador

Use Playwright ou equivalente em:

- 320 px e larguras intermediárias;
- celulares comuns e celulares altos/largos;
- tablets em retrato e paisagem;
- desktop comum e amplo;
- resize durante a sessão;
- orientação alterada;
- escala ou tamanho de texto aumentado;
- teclado e toque simulado quando aplicável.

Evite depender somente do nome de um aparelho. O caso do CTA que ganhou altura indevida no iPhone 17 Pro Max deve virar uma classe de regressão com variações de largura, altura, safe area, orientação, conteúdo e texto ampliado.

## Asserções geométricas

Meça `getBoundingClientRect()` e dimensões computadas para provar:

- CTA persistente inteiramente dentro do viewport e acima da safe area;
- altura do CTA abaixo do limite definido pelo componente;
- nenhuma interseção com conteúdo ou controle acionável;
- setas, indicadores, preços, horários e nomes totalmente visíveis;
- largura total sem overflow: `scrollWidth <= clientWidth + tolerância`;
- grades e tabelas reorganizadas antes de esmagar colunas;
- posição de leitura preservada depois da troca entre mídia 9:16 e paisagem;
- legenda legível e controles do carrossel acessíveis em cada proporção.

Compare retângulos e interseções; não faça asserção apenas de `visibility: visible`.

## Acessibilidade

- Navegação completa por teclado e ordem de foco coerente.
- Foco visível e não encoberto.
- Hierarquia semântica de títulos, landmarks e listas.
- Contraste de texto, controles e estados.
- Nomes e estados acessíveis de menu, accordion e carrossel.
- FAQ inicialmente fechada quando essa for a decisão aprovada.
- Auditoria Axe, seguida de inspeção manual dos fluxos principais.

## Qualidade e produção

Contra a build de produção local, execute os comandos reais do projeto para:

- lint;
- checagem de tipos;
- testes unitários e de integração;
- testes de navegador;
- build;
- console sem erros de hidratação ou exceções;
- auditoria de assets;
- três Lighthouse mobile e mediana dos resultados.

Metas: performance 95+, LCP abaixo de 2,5 s, CLS abaixo de 0,1, INP abaixo de 200 ms quando mensurável e TBT abaixo de 200 ms. Se alguma meta falhar, investigue a causa e registre a pendência; não arredonde nem selecione apenas a melhor execução.

## Validação visual

Sirva a build de produção em localhost e forneça a URL. Inspecione hero, carrossel, seção comercial, FAQ, CTA persistente, rodapé e estados de interação na matriz representativa. Compare assets otimizados com os originais.

## Gate de entrega

Antes da validação do usuário, entregue:

- URL local;
- resumo do que foi implementado;
- resultados recentes de lint, tipos, testes e build;
- achados de acessibilidade e performance;
- pesos de assets antes/depois;
- exceções e pendências.

Então pare. Não faça commit, push ou deploy. Essas ações exigem:

1. validação visual explícita do usuário; e
2. um pedido explícito posterior para a ação remota.

Quando houver autorização, confirme o diff e o estado do repositório, faça commit, push e deploy conforme solicitado, e valide URL, conteúdo e versão publicados. Execute PageSpeed Insights somente quando houver URL pública acessível; não trate localhost como resultado público.
