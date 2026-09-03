# Refinamento do carrossel de ambiente e aprendizado

## Objetivo

Eliminar o vazio visual após o último registro da galeria, substituir a instrução mecânica da seção “Em um mês” por uma promessa concreta e reduzir a altura herdada dos cards de aprendizado.

## Galeria de ambiente

- Manter seis registros navegáveis, seis indicadores e o contador de `01 / 06` a `06 / 06`.
- Acrescentar depois do sexto registro uma prévia visual e não interativa do primeiro card.
- A prévia repetida fica fora da coleção usada por estado, GSAP e acessibilidade.
- Ao avançar no sexto registro, o estado continua voltando ao primeiro como já acontece hoje.
- Não duplicar vídeos nem criar um segundo ciclo de autoplay.

## Copy da seção “Em um mês”

Substituir a frase que descreve a interface por:

“Quando a música começa, você encontra um ponto de partida, liga um movimento ao outro e sabe como voltar se algo sair diferente.”

A frase usa uma cena concreta para reunir os três resultados apresentados nos cards. Ela não menciona slides, setas ou tempo de leitura.

## Altura dos cards de aprendizado

- Trocar a grade com segunda linha elástica por duas linhas naturais.
- Alinhar índice e conteúdo no início do card.
- Reduzir a altura mínima responsiva, preservando espaço para títulos de duas linhas.
- Manter o layout móvel compacto já existente.

## Validação

- Confirmar que continuam existindo somente seis slides navegáveis e uma prévia inerte do primeiro.
- Confirmar que a nova frase aparece e a instrução antiga não aparece.
- Confirmar em CSS que o card usa linhas naturais e uma altura menor.
- Conferir o sexto registro e os três cards de aprendizado no navegador.
- Executar testes, lint e build de produção.
