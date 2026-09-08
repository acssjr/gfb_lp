# Design da skill `landing-page-pipeline`

Data: 8 de setembro de 2026  
Status: desenho aprovado nas seis etapas; aguardando revisão da especificação antes do plano de implementação.

## 1. Objetivo

Criar uma skill global para conduzir a criação de landing pages comerciais em Next.js do briefing à prévia local. A skill deve reduzir retrabalho sem transformar os projetos em cópias visuais uns dos outros.

Ela reutilizará os padrões comprovados nas páginas de Iasmin Portugal, Grupo Forró do Bom e Priscilla Castão:

- arquitetura orientada à conversão;
- copy concreta, organizada por objeções e nível de consciência;
- cabeçalho visualmente contrastante;
- CTA contextual que acompanha a leitura sem encobrir o conteúdo;
- seção comercial adaptada ao modelo real do negócio;
- conteúdo visual em carrossel para evitar blocos extensos de texto;
- movimento curto, funcional e profissional;
- implementação mobile-first;
- mídias e fontes otimizadas;
- validação funcional, visual, responsiva, acessível e de performance antes de publicar.

A skill não será um template visual rígido. Cores, tipografia, composição e linguagem continuarão pertencendo à identidade de cada projeto.

## 2. Forma da skill

A skill será instalada globalmente em:

```text
C:\Users\antonio.santos\.codex\skills\landing-page-pipeline\
```

Estrutura prevista:

```text
landing-page-pipeline/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   ├── briefing-essencial.md
│   ├── arquitetura-e-copy.md
│   ├── interface-mobile-first.md
│   ├── movimento-e-componentes.md
│   ├── midia-fontes-e-performance.md
│   └── testes-e-entrega.md
└── scripts/
    └── audit-assets.mjs
```

O `SKILL.md` será curto e atuará como coordenador. As referências só serão abertas na etapa correspondente, reduzindo consumo de contexto. O script fará auditoria determinística dos arquivos de mídia; não substituirá a inspeção visual.

## 3. Dependências de conhecimento

A pipeline deverá usar, quando disponíveis:

- `revenue-centric-design` para ordenar argumentos, prova, oferta e decisões comerciais;
- `schwartz-copy` para diagnosticar consciência e sofisticação antes da copy;
- `no-ai-slop` para a revisão final de naturalidade, ritmo e precisão;
- `mobile-first-design` para começar em telas pequenas e evoluir progressivamente;
- `vercel-react-best-practices` para desempenho e arquitetura React/Next.js;
- `web-performance-optimization` para Core Web Vitals, carregamento e auditoria;
- `find-animation-opportunities` para decidir onde o movimento tem função;
- `animate` para implementar os movimentos que sobreviverem ao filtro;
- skills GSAP específicas somente quando GSAP for realmente necessário.

A nova skill não copiará integralmente essas instruções. Ela indicará quando cada uma deve ser usada e registrará os contratos particulares desta pipeline.

## 4. Pipeline principal

### Etapa 1 — reconhecer o contexto

Antes de perguntar ou editar:

1. Determinar se o trabalho começa em um projeto novo ou existente.
2. Em projeto existente, inventariar estrutura, conteúdo, ativos, dependências, testes, alterações locais e configuração de deploy.
3. Ler as instruções da versão instalada do Next.js em `node_modules/next/dist/docs/` antes de escrever código.
4. Preservar código, conteúdo, prova e mídias existentes, salvo remoção aprovada.
5. Não pressupor que uma decisão específica de uma das três páginas seja universal.

### Etapa 2 — briefing essencial

A skill fará somente perguntas que alterem conteúdo, arquitetura ou implementação. Respostas já fornecidas não serão perguntadas novamente.

O briefing deve obter:

1. O que é oferecido e qual ação principal a página deve gerar.
2. Quem é o público, qual desejo dominante possui e quais objeções impedem a ação.
3. O que a pessoa recebe, como o serviço funciona, quais diferenciais são reais e quais condições ou limitações existem.
4. Qual modelo comercial será usado:
   - preços e planos públicos, como no GFB;
   - duas ou mais modalidades sem preço público, como na Priscilla;
   - uma única opção de contato ou agendamento, como na Iasmin.
5. Quais provas existem: números, resultados, credenciais, depoimentos, imagens, vídeos, equipe e história.
6. Quais informações operacionais precisam aparecer: cidade, endereço, horários, duração, formato ou área de atendimento.
7. Qual é a paleta de cores. Esta resposta é obrigatória antes da criação visual.
8. Quais ativos de identidade estão disponíveis, preferencialmente SVGs de logo e monograma.
9. Qual fonte deve ser usada. A pergunta é obrigatória em todos os projetos.
10. Quais restrições profissionais, legais ou éticas afetam a comunicação.
11. Quais dados existem para SEO, domínio, redes, analytics e eventos de conversão.

O briefing pode ser apresentado como um bloco compacto. Se uma resposta introduzir uma decisão material ainda ambígua, a skill perguntará somente sobre essa decisão antes de continuar.

### Etapa 3 — estratégia e arquitetura

Antes de implementar, a skill produzirá uma proposta curta contendo:

- diagnóstico Schwartz de consciência e sofisticação;
- promessa e mecanismo central;
- objeções que cada seção deve resolver;
- provas disponíveis e a força de cada uma;
- modelo comercial escolhido;
- arquitetura de seções;
- papel de cada CTA;
- direção visual baseada na paleta e nos ativos fornecidos.

A arquitetura-base será:

1. Cabeçalho contrastante.
2. Hero com promessa direta, contexto, objeção inicial e CTA.
3. Reconhecimento do problema ou da situação do visitante.
4. Prova inicial.
5. Método ou processo explicado concretamente.
6. Carrossel visual de fotos, etapas, benefícios ou situações reais.
7. Benefícios e quebra das objeções principais.
8. Seção comercial adequada ao modelo escolhido.
9. Prova aprofundada, equipe, história ou autoridade.
10. Informações práticas.
11. Perguntas frequentes.
12. CTA final e rodapé.

A ordem pode mudar quando o nível de consciência, o segmento, a complexidade da oferta ou a disponibilidade de prova justificar. A skill explicará a mudança em poucas linhas.

### Etapa 4 — implementação

Após aprovação da estratégia:

1. Preparar a arquitetura Next.js.
2. Centralizar conteúdo, configurações e mensagens de CTA.
3. Implementar primeiro a experiência móvel.
4. Adicionar progressivamente tablet e desktop.
5. Implementar interações e movimento apenas depois do conteúdo e do layout estático estarem funcionais.
6. Otimizar mídias e fontes.
7. Executar testes funcionais e auditorias.
8. Servir a versão de produção em localhost para validação visual.

## 5. Contrato de copy

A copy deverá:

- canalizar um desejo já existente, sem inventar uma necessidade;
- partir do nível de consciência e da sofisticação do público;
- usar uma ideia principal por seção;
- explicar o mecanismo do serviço em linguagem compreensível;
- trocar abstrações por situações, ações, consequências e detalhes observáveis;
- responder objeções reais em vez de preencher espaço;
- apoiar promessas com prova proporcional;
- evitar jargão, clichês, superlativos vazios e frases com aparência de texto gerado;
- usar CTAs breves e naturais;
- não criar urgência, escassez, garantias, credenciais ou condições inexistentes.

O texto demonstrativo poderá aparecer naturalmente no protótipo. A interface, o código e o processo de deploy não adicionarão rótulos como “foto ilustrativa”, “depoimento ilustrativo” ou equivalentes, nem criarão um bloqueio específico por esse motivo.

Informações que mudam a veracidade comercial ou operacional da página continuam fazendo parte do briefing essencial. A skill não deve silenciosamente inventar preços, formação profissional, localização, datas, horários, resultados quantitativos ou condições contratuais.

## 6. WhatsApp e CTAs

O canal de conversão inicial será WhatsApp.

Padrões:

- usar provisoriamente o número `75981234176` até o usuário fornecer outro;
- centralizar o número em configuração editável;
- gerar uma mensagem pré-preenchida específica para a intenção de cada botão;
- diferenciar mensagens de hero, modalidade, plano, FAQ, CTA flutuante e CTA final;
- codificar corretamente a mensagem no link;
- usar texto de botão coerente com o próximo passo;
- não enviar dados pessoais pela telemetria;
- registrar apenas posição e intenção do CTA quando analytics estiver configurado.

O CTA persistente aparecerá quando o CTA principal do hero sair do campo de visão e desaparecerá quando a seção comercial ou o CTA final estiver visível. Ele não deve competir com outro CTA equivalente.

No mobile, será uma barra compacta com altura controlada e `safe-area-inset-bottom`. No desktop, poderá virar botão ou faixa flutuante de acordo com a direção visual. Em qualquer largura, não poderá cobrir conteúdo ou crescer indefinidamente por causa de texto, zoom, orientação ou altura do navegador.

## 7. Arquitetura Next.js

Padrão de engenharia:

- Next.js App Router;
- TypeScript estrito;
- renderização estática sempre que o conteúdo permitir;
- Server Components por padrão;
- Client Components apenas nas ilhas realmente interativas;
- conteúdo, contatos, ofertas, mensagens e ativos centralizados em uma configuração tipada;
- validação de conteúdo quando houver múltiplas campanhas ou páginas;
- componentes pequenos, com responsabilidade clara;
- CSS mobile-first e tokens próprios da marca;
- sem biblioteca pesada ou serviço worker incluído por reflexo;
- analytics e scripts de terceiros adiados até não competirem com a renderização inicial;
- imports diretos e analisáveis;
- carregamento dinâmico para recursos pesados abaixo da dobra;
- nenhuma inicialização global de animações abaixo da dobra durante a hidratação.

A estrutura exata pode variar com a versão instalada do Next.js. As instruções locais da versão têm precedência sobre conhecimento memorizado.

## 8. Identidade visual e tipografia

### Paleta

A paleta é obrigatória antes da implementação visual. Ela será convertida em tokens semânticos, incluindo ao menos:

- fundo principal e superfícies;
- texto principal e secundário;
- cor de ação;
- contraste do cabeçalho;
- bordas e estados de foco;
- estados de destaque ou recomendação comercial.

Os contrastes devem ser verificados. A cor do cabeçalho deve ser diferente do corpo, preservando unidade com a marca.

### SVGs

Logos e monogramas fornecidos serão:

1. inventariados e preservados como fonte original;
2. otimizados com SVGO;
3. comparados visualmente antes e depois;
4. mantidos com `viewBox` e proporção corretos;
5. adaptados à paleta com `currentColor`, variáveis CSS ou variantes explícitas quando tecnicamente seguro;
6. mantidos acessíveis conforme tenham função informativa ou decorativa.

A otimização não autoriza redesenhar a marca nem remover detalhes que alterem sua leitura.

### Fontes

A skill sempre perguntará qual tipografia usar.

- Quando Saans for escolhida, os arquivos fornecidos serão convertidos e preparados para web.
- Na ausência de escolha ou de arquivos utilizáveis, o fallback será Plus Jakarta Sans.
- Fontes locais deverão preferir WOFF2.
- Somente caracteres e pesos necessários serão mantidos.
- Apenas o peso crítico será precarregado.
- A configuração deverá minimizar mudanças de layout durante a troca da fonte.

## 9. Imagens e vídeos

Todas as imagens raster serão processadas com Squoosh antes do uso final.

A pipeline deverá:

- escolher dimensões com base no maior tamanho real de exibição;
- preferir AVIF ou WebP quando o ganho for comprovado;
- preservar qualidade visual suficiente para rostos, texto e prova documental;
- declarar largura, altura, proporção e `sizes`;
- antecipar somente a mídia responsável pelo LCP;
- carregar o restante sob demanda;
- evitar ampliar arquivos sem resolução suficiente;
- impedir que mídia fora da tela consuma rede sem benefício;
- manter vídeo abaixo da dobra com preload mínimo ou inexistente até se aproximar do viewport.

O relatório final mostrará os tamanhos relevantes antes e depois.

## 10. Mobile-first e responsividade

A interface será desenhada inicialmente para 320 px e testada também em larguras intermediárias, celulares grandes, tablets e desktops. Breakpoints serão definidos pelo momento em que o conteúdo deixa de caber bem, não por uma lista fixa de aparelhos.

Contratos:

- nenhum overflow horizontal;
- alvos de toque com pelo menos 48 × 48 px, salvo justificativa acessível equivalente;
- tipografia legível sem zoom;
- layout funcional com texto ampliado;
- uso cuidadoso de unidades dinâmicas de viewport;
- respeito às safe areas;
- conteúdo não encoberto por cabeçalho ou CTA fixo;
- grades mudam de estrutura antes de comprimir texto e controles;
- seção comercial adaptada especificamente para tablet;
- rotação e mudança de altura não fazem o visitante perder o conteúdo atual;
- carrosséis mantêm controles e legendas dentro da tela;
- teclado virtual e barras do navegador não deformam elementos persistentes.

Não basta obter uma captura bonita em um aparelho. Os testes deverão medir posições, dimensões e interseções em uma matriz de viewports.

## 11. Carrosséis

O carrossel será usado apenas quando houver ganho real de compreensão ou redução de densidade textual.

Quando usado, deverá:

- ter autoplay por padrão entre 5 e 7 segundos;
- iniciar somente quando estiver próximo ou dentro do viewport;
- pausar em hover, foco, aba oculta ou interação;
- parar de disputar o controle depois da primeira interação manual;
- respeitar `prefers-reduced-motion`;
- oferecer setas, indicadores, swipe e teclado;
- manter estado e anúncios acessíveis sem excesso de leitura por leitor de tela;
- fazer loop sem exibir área vazia após o último item;
- carregar inicialmente apenas o item ativo e os vizinhos necessários;
- acomodar imagens verticais e horizontais sem cortar a leitura nem provocar salto de rolagem.

## 12. Movimento

Movimento será aplicado em duas fases:

1. `find-animation-opportunities` avalia candidatos e rejeita movimentos sem função.
2. `animate` implementa somente oportunidades aprovadas.

Regras:

- cada animação deve servir a feedback, consistência espacial, indicação de estado, prevenção de mudança brusca, explicação ou encanto raro;
- entradas de seções devem ser curtas e discretas;
- elementos de um grupo podem usar stagger moderado;
- `transform` e `opacity` são as propriedades preferidas;
- CSS é a primeira opção para movimentos previsíveis;
- GSAP será usado para sequências, scroll e controle dinâmico que justifiquem seu custo;
- bibliotecas de movimento serão carregadas apenas quando necessárias;
- a seção comercial terá entrada própria sem atrasar acesso à informação;
- todo movimento terá variante compatível com `prefers-reduced-motion`;
- efeitos de hover serão limitados a dispositivos com hover e ponteiro fino.

## 13. Testes orientados a riscos reais

Os testes não poderão apenas procurar textos, classes ou atributos para produzir resultado verde. Eles devem provocar e observar comportamentos.

### Unidade e integração

- criação correta de links e mensagens do WhatsApp;
- seleção do modelo comercial;
- validação de conteúdo e configuração;
- estados do CTA persistente;
- ciclo de autoplay e interrupção manual;
- comportamento de movimento reduzido;
- carregamento condicional de mídia e código.

### Navegador e responsividade

Usar Playwright ou ferramenta equivalente para verificar:

- viewports representativas a partir de 320 px;
- celulares altos e largos;
- tablets em retrato e paisagem;
- desktop comum e amplo;
- mudança de largura e altura durante a sessão;
- zoom ou escala de texto;
- navegação por toque simulado e teclado.

As asserções deverão medir:

- ausência de scroll horizontal;
- altura e largura máximas do CTA flutuante;
- limites do CTA dentro do viewport e da safe area;
- ausência de sobreposição com conteúdo acionável;
- presença integral de botões e setas;
- integridade das grades e tabelas;
- estabilidade da rolagem quando a proporção de uma imagem muda;
- legibilidade das legendas;
- comportamento correto de entrada e saída das zonas de conversão.

O caso do CTA móvel que ganhou altura indevida em um celular grande será transformado em uma classe de regressão: variação de conteúdo, largura, altura, safe area e tamanho de texto, com validação geométrica do componente.

### Acessibilidade

- navegação completa por teclado;
- foco visível;
- ordem semântica de títulos e regiões;
- contraste;
- nomes acessíveis para controles;
- estados de accordion, menu e carrossel;
- auditoria automatizada com Axe;
- inspeção visual e funcional complementar.

### Performance

Executar contra a build de produção local:

- lint, checagem de tipos, testes e build;
- auditoria de peso de SVGs, imagens, fontes e JavaScript;
- inspeção de recursos carregados na primeira dobra;
- console sem erros de hidratação;
- três execuções de Lighthouse mobile e uso da mediana.

Metas iniciais:

- Lighthouse mobile com mediana mínima de 95;
- LCP abaixo de 2,5 s;
- CLS abaixo de 0,1;
- INP abaixo de 200 ms quando mensurável;
- TBT de laboratório abaixo de 200 ms;
- redução contínua de JavaScript inicial e peso total, com exceções registradas.

Metas não serão falsificadas por desabilitar conteúdo essencial, analytics necessários ou comportamento real apenas durante o teste.

## 14. Entrega e autorização

A pipeline termina inicialmente em uma prévia local da build de produção.

Antes da validação visual, entregar:

- URL do localhost;
- resumo do que foi implementado;
- resultados de lint, tipos, testes e build;
- relatório de acessibilidade e performance;
- peso dos principais ativos antes e depois;
- pendências que realmente exigem decisão humana.

O PageSpeed Insights será executado depois que houver uma URL externa publicada. A medição local usará Lighthouse com condições móveis controladas.

Commit, push e deploy não fazem parte da execução automática da skill. Cada uma dessas ações exige uma solicitação posterior e explícita, feita depois da validação visual. Quando o deploy for autorizado, a pipeline deverá verificar projeto, branch, integração GitHub–Vercel, alias de produção, resposta HTTP e conteúdo publicado.

## 15. Tratamento de impedimentos

- Sem paleta: interromper a criação visual e pedir a paleta.
- Sem definição de fonte: aplicar Plus Jakarta Sans, depois de confirmar que a pergunta foi feita.
- Sem SVGs: prosseguir somente com uma solução tipográfica coerente se isso não contrariar a identidade disponível; não inventar um símbolo de marca.
- Sem preço: usar modalidades ou contato, conforme decisão comercial; não inventar valores.
- Sem prova: ajustar a força da promessa; não substituir prova por superlativos.
- Ferramenta de otimização indisponível: registrar o impedimento e usar alternativa tecnicamente equivalente apenas com resultado verificável.
- Falha de teste: diagnosticar a causa; não enfraquecer a asserção para obter aprovação artificial.
- Falha de Lighthouse isolada: repetir em condições controladas e usar a mediana, sem ignorar regressões consistentes.

## 16. Fora de escopo

Esta skill não:

- cria automaticamente checkout ou pagamento online;
- define preços ou condições comerciais pelo usuário;
- impõe a mesma estética às próximas marcas;
- instala bibliotecas ou serviços sem necessidade;
- publica o projeto sem validação visual e autorização;
- substitui revisão jurídica ou profissional de segmentos regulados;
- transforma toda seção em animação ou carrossel;
- usa React Native para landing pages web.

## 17. Critérios de conclusão da implementação da skill

A skill estará pronta quando:

1. Todos os arquivos previstos existirem e não contiverem placeholders de scaffold.
2. O `SKILL.md` tiver descrição de acionamento clara e não duplicar as referências.
3. Cada referência tiver responsabilidade definida e estiver ligada pelo coordenador.
4. O script de auditoria funcionar em um conjunto controlado de ativos.
5. A validação oficial de skills passar.
6. Cenários realistas demonstrarem que a skill:
   - faz somente o briefing necessário;
   - não começa a identidade visual sem paleta;
   - escolhe corretamente entre os três modelos comerciais;
   - gera mensagens distintas de WhatsApp;
   - usa mobile-first e cobre regressões geométricas;
   - não publica sem aprovação;
   - mantém copy concreta e orientada a objeções;
   - otimiza e verifica mídias em vez de apenas declarar que o fez.
7. Uma revisão final não encontrar contradições entre briefing, implementação, testes e entrega.

