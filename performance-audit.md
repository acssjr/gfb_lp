# Estudo atualizado da landing GFB

Data: 08/09/2026. Escopo: sincronização com o remoto, estudo do projeto, instalação da skill solicitada e primeira rodada local de otimização. Nenhum deploy ou push realizado.

## Estado do projeto e sincronização

O aplicativo está em `gfb_lp-main/` dentro da pasta de trabalho. A cópia recebida não tinha metadados Git. O remoto identificado foi https://github.com/acssjr/gfb_lp.git; a base local agora acompanha `origin/main`, commit `b0d2d14` (Fix tablet layouts and FAQ defaults). As alterações desta auditoria estão por cima dessa base, sem commit.

Os ambientes locais, configuração da Vercel e dependências locais foram preservados. O `next.config.ts` anterior, inexistente no remoto, foi preservado fora do aplicativo em `.Codex/cache/next.config.pre-remote-sync.2026-09-08.ts` na pasta externa. A configuração antiga não foi reaplicada automaticamente; revisar seus headers antes de uma publicação futura. A alteração de `package-lock.json` decorre da instalação local com npm, incluindo metadados peer e dependências opcionais; não foi uma atualização intencional de versões.

## Arquitetura e experiência atuais

- Next.js 16.3.1, React 19.2.8, TypeScript; páginas pré-renderizadas estaticamente.
- Conteúdo e informações comerciais separados em `content/siteContent` e `config/site`; ativos visuais em `config/visualAssets`.
- `LandingPage` compõe as seções; `Landing.module.css` concentra a identidade visual e os ajustes responsivos. GSAP e componentes React controlam as animações e interações.
- A sequência atual reúne promessa inicial, reconhecimento das inseguranças, prova, história, galeria de aulas, metodologia, aprendizado, diferenciais, professores, planos, depoimentos, nivelamento, horários, próxima turma, localização, FAQ e CTA final.
- A comunicação atual enfatiza começar do zero, primeira aula de R$ 39 convertida em crédito, história iniciada na UEFS em 2015, 11 anos e mais de 3 mil pessoas. Há fotografias reais, galeria com vídeos e equipe identificada.
- A grade informa avançado na segunda às 19h30, iniciante na quinta às 19h30 e três turmas no sábado. A próxima turma usa lista prioritária e escolha de horário.
- Conversão ocorre pelo WhatsApp, não por checkout. Os links renderizados no localhost apontam para `5575981234176`; não para `#whatsapp-pendente`. Há tratamento de UTMs/eventos e integração opcional de analytics.
- Privacidade, termos, robots e sitemap também são gerados. A identidade continua em amarelo, creme e marrom com a tipografia Saans.

## Skill solicitada: adequação

Instalada em `.agents/skills/performance-optimization` na pasta externa, a partir de https://github.com/rampstackco/claude-skills/tree/main/skills/performance-optimization. Foram estudados o SKILL.md e os três arquivos de referência: template, checklist e playbook.

A skill é adequada como método de diagnóstico: medir antes, identificar o elemento LCP e suas fases, priorizar gargalos e validar regressões. Não é um plugin que acelera a página automaticamente. Seus exemplos genéricos devem ser adaptados ao Next.js.

As recomendações de WordPress/Elementor dos prints não se aplicam diretamente a este projeto. A imagem principal já usa WebP, `next/image`, carregamento eager, prioridade alta e descoberta no HTML. Repetir essas recomendações ou instalar plugins WordPress não resolveria o gargalo restante.

## Medição

Lighthouse 13.4.1, Chrome headless, perfil mobile com throttling simulado, build de produção em `localhost:3001`. Não foi usado `next dev` como referência de desempenho. São amostras de laboratório locais, não dados reais de usuários ou notas garantidas da Vercel.

| Métrica | Base remota, antes | Final local |
| --- | ---: | ---: |
| Desempenho | 75 | 82 |
| Acessibilidade | 97 | 97 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1,06 s | 1,06 s |
| LCP | 7,17 s | 4,99 s |
| TBT | 80 ms | 62 ms |
| CLS | 0 | 0 |
| Speed Index | 2,89 s | 1,97 s |
| Transferência inicial | 2.217.598 bytes | 767.711 bytes |

Redução observada de transferência: aproximadamente 65%. O LCP continua acima da meta de 2,5 s. A amostra final foi executada isoladamente. Algumas rodadas exploratórias anteriores ocorreram concorrentemente e outras usaram throttling DevTools: elas não são usadas como uma série estatística comparável. É necessário repetir rodadas sequenciais e comparar medianas para quantificar o ganho com maior confiança.

Relatórios: `.Codex/lighthouse-mobile-baseline.json` e `.Codex/lighthouse-mobile-verified.json`. O comando final terminou com EPERM ao limpar a pasta temporária do Chrome, depois de gravar o relatório completo; este contém as quatro categorias e não registra runtimeError. Não confundir a falha de limpeza com uma execução de CLI sem erros.

O PageSpeed enviado pelo usuário informa 79 e LCP 5,4 s: é outro ambiente e momento, portanto não constitui um antes/depois controlado com estes testes. A consulta à API PageSpeed retornou 429; não foram obtidos dados CrUX/INP de campo. O relatório antigo `lighthouse-report.json` do projeto corresponde a outra versão da página e não representa esta base.

## Gargalos encontrados e alterações aplicadas

1. **Ícone excessivamente pesado.** A metadata usava PNG de aproximadamente 1 MB como ícone. `app/layout.tsx` agora aponta para o monograma SVG existente. As imagens de compartilhamento social não foram alteradas.
2. **Fontes OTF na carga inicial.** Foram geradas versões WOFF2 dos quatro pesos mantendo o conjunto de glifos e os arquivos originais. `app/fonts/saans.ts` usa os novos arquivos. A transferência de fontes caiu de aproximadamente 331 KB para 221 KB, preservando a família e pesos.
3. **Imagem LCP participando de animações de entrada.** `IllustrativeImage.tsx` exclui imagens prioritárias do reveal genérico e `AnimatedLanding.tsx` exclui o visual principal da animação de entrada do hero. Texto e demais efeitos continuam. Isso evita condicionar a aparição da fotografia principal a essas duas sequências; não elimina todo o custo do GSAP.
4. **Posters de vídeos abaixo da dobra requisitados cedo.** `AtmosphereGallery.tsx` só atribui os posters quando a seção se aproxima da viewport. Todos os posters ficam disponíveis nesse momento, incluindo os slides vizinhos. O arquivo de vídeo continua condicionado ao slide ativo e à visibilidade, como antes.

As mudanças foram orientadas pela skill a reduzir trabalho e recursos na carga inicial, preservando o desenho existente. A evidência mais sólida é a redução de bytes; a parcela exata de ganho de LCP atribuível a cada mudança não foi isolada com repetições suficientes.

## Próximas prioridades

| Prioridade | Trabalho | Critério de validação |
| --- | --- | --- |
| Alta | Perfilar a inicialização de GSAP, medições de layout e hidratação; adiar animações abaixo da dobra sem esconder conteúdo no HTML | Menor atraso de renderização do LCP e ausência de regressão visual/interativa |
| Alta | Repetir 3–5 testes sequenciais em preview Vercel, mesmo perfil, cache e ambiente controlados | Mediana de LCP em direção a ≤2,5 s; não perseguir apenas a nota |
| Média | Rever quais pesos de fonte precisam de preload e considerar subconjunto compatível com todos os textos/acentos | Menos bytes críticos sem flash inadequado, glifos ausentes ou CLS |
| Média | Criar ícone dedicado menor e revisar imagem de compartilhamento | Menor transferência preservando reconhecimento da marca |
| Média | Corrigir o uso de aria-label nos elementos strong da seção de prova, apontado pela auditoria | Revalidar acessibilidade e nomes acessíveis |
| Posterior | Coletar Web Vitals reais após publicação e segmentar por dispositivo | LCP/INP/CLS no percentil 75; INP não pode ser inferido do TBT |

Orçamentos de referência, ainda não implementados em CI: LCP ≤2,5 s, CLS ≤0,1, INP ≤200 ms em campo; evitar regressão da transferência inicial atual. Analytics estava ausente da captura local, portanto seu custo em um ambiente com tags habilitadas precisa de teste próprio.

## Validação e entrega

- 42 testes passaram; lint e build de produção passaram.
- `git diff --check` sem erros de whitespace.
- Página aberta e inspecionada visualmente no navegador local; tipografia e fotografia principal renderizam. Links de WhatsApp confirmados pela árvore acessível.
- A validação visual desta rodada não equivale a uma revisão completa de todas as animações em todos os breakpoints.
- Servidor de desenvolvimento disponível em http://localhost:3000/. Não houve publicação remota das otimizações.
