# Favicon leve do GFB

## Objetivo

Substituir o monograma SVG de aproximadamente 60 KiB transferidos como favicon por um arquivo convencional e leve, sem alterar os logos exibidos no conteúdo da landing.

## Design aprovado

- Fonte visual: `public/brand/gfb-monogram.svg`.
- Saída: `app/favicon.ico` quadrado, transparente e multirresolução.
- Tamanhos incorporados: 16 × 16, 32 × 32 e 48 × 48 pixels.
- Limite: menos de 10 KiB no total.
- Integração: convenção nativa de metadata do Next.js 16; remover `metadata.icons` que aponta para o SVG pesado.
- Nitidez: rasterizar cada tamanho diretamente do vetor, sem redimensionar uma miniatura já rasterizada.

## Não faz parte

- Alterar `gfb-monogram.svg`, `gfb-logo.svg` ou logos visíveis.
- Criar Apple Touch Icon, manifest ou pacote PWA.
- Redesenhar as letras ou as cores da marca.

## Validação

- Conferir cabeçalho ICO, três dimensões e peso em teste automatizado.
- Renderizar 16, 32 e 48 px para inspeção visual.
- Confirmar que o HTML final referencia `/favicon.ico` e não carrega o monograma como ícone.
- Executar testes, lint e build de produção.
