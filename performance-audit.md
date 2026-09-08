# Auditoria iterativa de performance — landing GFB

Data: 08/09/2026. Base: `main`/`origin/main` em `9910c2c`. Escopo desta rodada: superar 90 no Lighthouse mobile sem reduzir a qualidade das imagens, remover conteúdo ou quebrar animações. As mudanças estão locais e ainda não foram publicadas.

## Método

A skill `performance-optimization` foi usada como protocolo: medir um build de produção, localizar o gargalo, testar uma hipótese por vez, rejeitar mudanças sem evidência e repetir a medição final. Lighthouse 13.4.1 e Chrome headless foram executados em `localhost:3001`, com o perfil mobile e throttling simulado. A nota da Vercel pode variar por infraestrutura; estes números são resultados laboratoriais reproduzíveis deste checkout.

## Resultado

| Métrica | Início desta rodada | Final — mediana de 3 | Variação |
| --- | ---: | ---: | ---: |
| Desempenho | 80 | **91** | +11 pontos |
| FCP | 1,06 s | 1,06 s | estável |
| LCP | 5,11 s | **3,47 s** | −32% |
| TBT | 40 ms | 58 ms | +18 ms, ainda excelente |
| CLS | 0 | 0,055 | ainda dentro do nível “bom” (<0,1) |
| Speed Index | 3,25 s | **1,75 s** | −46% |
| Transferência | 768 KB | **622 KB** | −19% |

As três notas finais sequenciais foram **92, 91 e 91**. Relatórios: `.Codex/final-90plus-1.json`, `.Codex/final-90plus-2.json` e `.Codex/final-90plus-3.json`.

## Alterações mantidas

1. **Saans crítica em subconjuntos WOFF2 lossless.** Regular e Bold são pré-carregadas; Medium e SemiBold entram depois do carregamento. Português, acentos, estrelas e setas usados pela interface permanecem no subconjunto. O gerador compara cmap, métricas e os comandos de cada contorno com as fontes-fonte; 259 caracteres por peso foram verificados. Os arquivos completos continuam como fallback para outros alfabetos.
2. **GSAP fora do caminho crítico.** O hero preserva a entrada visual com animações CSS limitadas a `transform`; o runtime GSAP das seções abaixo da dobra é carregado após o primeiro paint. A coreografia, ScrollTrigger e paralaxe continuam no runtime separado.
3. **Trabalho abaixo da dobra sob demanda.** A galeria importa GSAP ao se aproximar da viewport. O morph de níveis importa GSAP e mede as palavras somente quando a seção se aproxima, pausando o loop fora da tela.
4. **Selector pesado sob demanda.** O componente Base UI do nivelamento é separado do bundle inicial e carregado quando necessário, mantendo placeholder, foco, diálogo e acessibilidade.
5. **Renderização distante adiada pelo navegador.** Seções não hero usam `content-visibility: auto` com tamanho intrínseco de reserva; o HTML e o conteúdo continuam presentes.

Nenhum arquivo de fotografia, vídeo, poster ou configuração de qualidade do `next/image` foi modificado.

## Experimentos rejeitados

- Remover o preload das fontes derrubou a nota para 78; revertido.
- Uma tentativa de usar declarações incompatíveis do `next/font` chegou a 88, mas renderizou Times New Roman. O resultado foi invalidado e a família Saans foi restaurada antes das medições finais.
- Preload manual adicional da imagem hero marcou 85 contra 86 na rodada comparável; revertido.
- Adiar ainda mais fotografias abaixo da dobra marcou 82 e não ajudou o LCP; revertido.

Essas reversões evitam confundir uma nota artificial com uma melhoria real e preservam fidelidade visual.

## Regressão e animações

- `npm test`: 42/42 testes passaram.
- `npm run lint`: zero erros e zero avisos.
- `npm run build`: build estático de produção concluído para todas as rotas.
- Comparação do hero em 390, 768, 1173 e 1440 px: mesmas larguras/alturas e deslocamento máximo de 0,1 px, apenas arredondamento subpixel.
- Teste de runtime em 390 e 1173 px: os quatro níveis apareceram; mínimo/máximo de palavras simultâneas = 1; zero ocorrências de overflow; galeria avançou; diálogo e combobox abriram.
- `prefers-reduced-motion` continua respeitado pelas entradas do hero, pelo morph e pela galeria.
- `http://localhost:3000/` responde 200 e permanece disponível. O build usado na medição está em `http://localhost:3001/`.

## Estado de entrega

Meta local atingida com margem e repetição. Não houve commit, push ou deploy nesta rodada. A alteração já existente em `package-lock.json` não faz parte da otimização descrita aqui e deve continuar fora de um commit de performance, a menos que seja revisada separadamente.
