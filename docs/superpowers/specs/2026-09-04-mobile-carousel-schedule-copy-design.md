# Refinamento mobile do carrossel, da grade e da voz da marca

## Objetivo

Corrigir os problemas observados em 384 x 824 no carrossel de ambiente e na grade de horários, além de reduzir a repetição visível de “GFB” sem apagar os nomes próprios da marca, dos planos ou da metodologia.

## Diagnóstico confirmado

- Na largura de 384 px, o segundo controle do carrossel termina em 415 px. As seis barras, as duas setas e os espaços ocupam mais do que a área útil de 329 px.
- A coluna de horário oferece cerca de 95 px, mas o conteúdo mede cerca de 112 px. O horário invade visualmente a coluna da turma.
- Ao mudar de um slide 9:16 para um slide mais baixo, a redução animada da altura do viewport pode acionar a ancoragem de rolagem do navegador. A região inferior permanece visível e o topo da foto sobe para trás do cabeçalho fixo.

## Solução aprovada

### Controles do carrossel

Em telas de até 430 px, as barras de progresso passam a ocupar o espaço flexível disponível e podem encolher. As setas mantêm tamanho de toque adequado e não podem sair da largura do carrossel.

### Troca de formato

O componente guarda o formato anterior. Somente quando a troca partir de um slide vertical para um slide horizontal ou quadrado, em viewport móvel e com a seção visível, o início da mídia ativa será reposicionado abaixo do cabeçalho. O ajuste acontece ao término da animação de altura; com movimento reduzido, acontece imediatamente e sem rolagem suave.

### Grade de horários

Em telas de até 430 px, as colunas usam 26% para dia, 38% para horário e 36% para turma. O horário recebe tipografia e espaçamento ligeiramente menores para permanecer dentro da célula. Os nomes dos níveis continuam inteiros e legíveis.

### Voz da página

Substituir apenas ocorrências visuais em que o nome da escola se repete sem acrescentar identificação:

- “FORRÓ PARA COMEÇAR DO ZERO” por “ESCOLA DE FORRÓ EM”.
- “O GFB EM DOIS NÚMEROS” por “NOSSA HISTÓRIA EM DOIS NÚMEROS”.
- “pessoas já passaram pelo GFB.” por “pessoas já passaram por aqui.”
- “HISTÓRIA DO GFB” por “NOSSA HISTÓRIA”.
- “O GFB começou na UEFS. Hoje, faz Feira dançar.” por “Começamos na UEFS. Hoje, fazemos Feira dançar.”
- “POR DENTRO DO GFB” por “POR DENTRO DAS AULAS”.
- “POR QUE O GFB” por “POR QUE APRENDER AQUI”.
- A apresentação da equipe passa a dizer que os quatro professores acompanham nossas turmas.
- O primeiro depoimento começa com “Uma amiga me chamou para conhecer uma aula.”
- O título dos depoimentos passa a ser “Como foi a primeira aula.”
- Os papéis dos depoimentos deixam de repetir “GFB”.
- O aviso da próxima turma usa “A gente avisa”.
- A legenda da tabela passa a ser “Horários semanais das turmas”.

Manter “metodologia GFB”, os nomes “Essencial GFB” e “GFB Plus”, o nome institucional na história, no rodapé, em metadados, textos legais, mensagens de WhatsApp, textos alternativos e rótulos de acessibilidade.

## Validação

- Testes de conteúdo devem distinguir os usos preservados dos usos removidos.
- Testes de CSS devem proteger a distribuição móvel dos controles e das colunas.
- O teste do carrossel deve demonstrar a regra vertical para não vertical e a existência do alvo de realinhamento.
- Validar visualmente em 384 x 824, 430 x 932 e largura desktop.
- Executar testes completos, lint e build de produção.
