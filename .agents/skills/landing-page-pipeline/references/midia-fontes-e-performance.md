# Mídia, fontes e performance

**REQUIRED SUB-SKILLS: `web-performance-optimization` e `vercel-react-best-practices`.** Leia-as antes de decidir carregamento, divisão de código, imagens, fontes ou scripts. Meça a build de produção, não o servidor de desenvolvimento.

## Inventário primeiro

Execute o auditor incluído antes e depois da otimização:

```powershell
node scripts/audit-assets.mjs <diretorio-de-assets>
node scripts/audit-assets.mjs <diretorio-de-assets> --json
```

Registre peso por arquivo e categoria. O script mede; não substitui compressão, inspeção visual ou análise de rede.

## SVG

Para logos, monogramas e ilustrações vetoriais:

1. preserve o original fora do caminho servido ou sob controle de versão;
2. otimize uma cópia com SVGO;
3. preserve `viewBox`, proporção, IDs necessários e acessibilidade;
4. compare visualmente antes/depois nas cores e tamanhos reais;
5. adapte à paleta com `currentColor`, variáveis CSS ou variantes explícitas somente quando isso não alterar a marca;
6. use um favicon simplificado quando o monograma completo for pesado demais para esse papel.

Não confunda redução de bytes com permissão para redesenhar ou apagar detalhes essenciais.

## Imagens raster

Processe as imagens finais com Squoosh:

- dimensione pelo maior tamanho real de exibição e densidade necessária;
- compare AVIF e WebP e escolha pelo ganho medido e qualidade visual;
- preserve rostos, texto, evidência e detalhes relevantes;
- informe largura, altura, `aspect-ratio` e `sizes` corretos;
- priorize/precarregue somente a imagem responsável pelo LCP;
- aplique lazy loading abaixo da dobra;
- não amplie arquivos sem resolução suficiente;
- evite transferir imagens de slides distantes no carregamento inicial.

Use `next/image` quando ele atender ao caso, sem deixar `sizes` genérico ou incorreto.

## Vídeo

- Abaixo da dobra, use poster e preload mínimo ou nenhum até a aproximação do viewport.
- Não faça autoplay com áudio.
- Evite baixar múltiplos vídeos ou variantes antes da interação.
- Disponibilize controle e alternativa compatível com movimento reduzido quando necessário.

## Fontes

Sempre confirme a fonte no briefing.

- Saans: use somente quando escolhida e com arquivos fornecidos/licenciados.
- Fallback: Plus Jakarta Sans.
- Converta fontes locais para WOFF2 com ferramenta adequada.
- Faça subset apenas dos caracteres realmente necessários, preservando português.
- Inclua somente pesos e estilos usados.
- Precarregue apenas o arquivo crítico acima da dobra.
- Configure métricas/fallback para minimizar mudança de layout.
- Confirme a licença antes de redistribuir arquivos de fonte.

## JavaScript e renderização

- Server Components por padrão; reduza a fronteira de hidratação.
- Importe bibliotecas e ícones diretamente, de forma analisável.
- Carregue carrossel, mapas, vídeo, animação e widgets abaixo da dobra sob demanda quando isso trouxer ganho real.
- Adie scripts de terceiros até depois da renderização inicial ou do consentimento aplicável.
- Não inicialize observadores e animações de toda a página no primeiro frame.
- Remova dependências e polyfills sem uso.
- Investigue tarefas longas e custo de hidratação antes de micro-otimizar CSS.

## Metas iniciais

Use como alvo, não como artifício de teste:

- mediana Lighthouse mobile de pelo menos 95 em três execuções;
- LCP abaixo de 2,5 s;
- CLS abaixo de 0,1;
- INP abaixo de 200 ms quando houver dados confiáveis;
- TBT de laboratório abaixo de 200 ms;
- JavaScript inicial idealmente abaixo de 100 KiB gzip;
- transferência inicial idealmente abaixo de 500 KiB.

Exceções são permitidas quando justificadas por conteúdo ou negócio. Documente causa, impacto, alternativa e decisão. Não desabilite comportamento real, analytics necessário ou conteúdo essencial somente durante a auditoria.

## Relatório

Entregue pesos antes/depois, formato e dimensões finais, recurso LCP, fontes precarregadas, JavaScript inicial, terceiros, resultados das três execuções e exceções. Diferencie métricas de laboratório de dados reais de usuários.
