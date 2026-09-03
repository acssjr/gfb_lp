# Destaque “DO ZERO” na headline

## Objetivo

Reforçar que a aula atende quem nunca dançou sem competir com a palavra “forró” nem descaracterizar a direção editorial do Grupo Forró do Bom.

## Solução aprovada

Aplicar a opção C, “Selo geométrico”, somente à expressão “DO ZERO.” da headline principal.

- Exibir “DO ZERO.” em letras maiúsculas.
- Preservar o destaque fino já usado em “forró”.
- Envolver “DO ZERO.” com contorno marrom e uma sombra curta laranja.
- Manter o fundo transparente no estado padrão.
- No hover de dispositivos com ponteiro preciso, preencher a forma de marrom, trocar o texto para amarelo e deslocar o selo poucos pixels para acompanhar a redução da sombra.
- Em telas de toque, manter o estado padrão. A compreensão não pode depender do hover.
- Desativar a transição quando `prefers-reduced-motion` estiver ativo.

## Limites

O ajuste não altera o texto, a quebra principal da headline, o tamanho tipográfico, a posição dos botões nem o restante da hero.

## Responsividade

O selo acompanha o tamanho fluido da headline e não pode ultrapassar a largura disponível. Espaçamento, borda e sombra devem usar unidades relativas ao tamanho da fonte para preservar a proporção em desktop e mobile.

## Validação

- Confirmar que a headline mantém o nome acessível “Aprenda forró começando do zero.”
- Verificar o estado padrão em mobile e desktop.
- Verificar o hover em dispositivo com ponteiro preciso.
- Confirmar ausência de overflow horizontal.
- Executar os testes da landing, lint e build de produção.
