# DSS — Índice de Débito Aberto

> Ponto único de consulta do que está **em aberto** no DSS, para não depender de varrer a memória/histórico.
> Criado 2026-07-02 @ `import/dss-v2.4.0`. **Manter enxuto:** ao fechar um item, mover para "Resolvidos"
> (com commit) ou remover. Cada item aponta a fonte de detalhe (doc de governança ou arquivo de memória).

## Legenda
🔴 ativo (frente em curso) · 🟡 débito de fundo (consciente, não urgente) · ⏳ aguardando terceiro · 🔍 verificar

---

## Frentes desta onda (cadeia de fonte única / contraste)

- 🔲 **(d) Brandabilidade passa por fora da camada de token** — **medida, não iniciada.**
  92 componentes pintam marca com o primitivo cru (`var(--dss-hub-600)`) no
  `4-output/_brands.scss`, em vez do semântico. **577 usos** contra 175 do
  `--dss-action-primary`. Consequência medida: o alto contraste alcança o atributo
  `[data-brand]` (texto branco 2.81 → 8.88) e **não** alcança a prop `brand`
  (fica em 2.81) — que é o caminho que os produtos usam. Mesma raiz já registrada
  em "prop brand não remapeia action-primary", agora com número.
  Tamanho, riscos, forma da correção e piloto sugerido (Badge/Button/Chip):
  **`DSS_FRENTE_MARCA_PRIMITIVOS.md`**. Não bloqueia o HC.

- ✅ **(a) Escalar `dss.contract.json`** — **CONCLUÍDO (76/76)**, `--all --strict` exit 0. Todos os
  grupos (Form/Input 23, Feedback 1, Navigation 9, Overlay 1, Data 3, Layout 10, Outros 27) emitidos,
  schema-válidos, a11y verificada. Relatórios em `relatorios/CONTRATOS_*.md`. `classification` é enum
  enforçado (Action|Compact|Visual); prosa→`classificationNote`. Runbook histórico: `HANDOFF_ESCALA_CONTRATOS.md`.
  - ⚠️ **Mapeamentos de `classification` ambíguos p/ revisão humana** (nos relatórios): DssItem,
    DssBreadcrumbsEl (Action×Visual), DssCard (clickable), DssSlideItem (gesto), DssBanner (dispensar),
    **DssUploader (Visual×Action — root não-interativo, mas propósito é fluxo de upload interativo)**.
  - ⚠️ **Débito de componente descoberto na emissão** (fora do escopo, tratar em Higiene): progressbars
    sem `aria-valuenow` tipado; cobertura de `alt`/`decorative` nos testes de imagem. + focus-ring (já listado).
- ⏳ **(c1) Contraste WCAG da paleta default** — auditoria + tabela de rotas (A escurecer / B texto escuro)
  prontas; **aguardando decisão da equipe** por cor. NÃO tocar `globals.scss` até o retorno.
  `[[project_color_ramp_a11y]]`. (c0 — reconciliação da rampa com o Figma — **feito**, commit `6a4baa6`.)
  - 📊 **QUANTO DO c1 É DE GRAÇA — medido com `scripts/wcag-kit.mjs`** (2026-08-17). Metade das 8 cores
    fecha **sem trocar hex nenhum**; a outra metade é que exige decisão de cor.

    | cor | texto branco | texto escuro | veredito |
    |---|---|---|---|
    | `warning` | 1,70 | **5,64** | ✅ AA trocando o texto |
    | `positive` | 1,99 | **4,82** | ✅ AA trocando o texto |
    | `info` | 2,08 | **4,61** | ✅ AA trocando o texto |
    | `negative` | **5,13** | 1,87 | ✅ já passa com branco |
    | `primary` | 3,80 | 2,52 | ❌ nenhum dos dois |
    | `tertiary` | 2,93 | 3,27 | ❌ nenhum dos dois |
    | `accent` | 4,20 | 2,29 | ❌ nenhum dos dois |
    | `secondary` | *(kit não resolveu)* | 3,20 | ❌ |

    **Consequência para o planejamento:** o bloco que precisa de decisão de cor é só a **família de
    ação** (4 cores). Feedback já está resolvido — 3 por troca de texto, 1 de graça.
    ⚠️ **Mas a troca não é local:** existe **um único** `--dss-text-on-primary` (branco), usado sobre
    TODAS as cores. Fazer feedback usar texto escuro exige tokens por cor
    (`--dss-text-on-{positive,info,warning}`) e tocar todo componente que pinta texto sobre fundo
    colorido — é mudança de arquitetura de token, não ajuste pontual. Por isso está medido aqui e
    **não implementado**: é a frente de cor/a11y do dono.
    🔗 Isto reforça a §1 do `DSS_ALTO_CONTRASTE_SPIKE.md`: o modo HC **não** fecha o c1 (WCAG 1.4.3 mede
    o default), e metade do c1 não precisa dele.

  - 📌 **Evidência medida de campo** (2026-08-13, chips `filled` no dark, texto branco): `positive`
    **1,99:1** e `primary` **3,80:1** reprovam AA para texto normal; `negative` 5,13:1 passa. Confirma a
    auditoria com número de componente real — `positive` é o caso mais grave e o candidato natural a
    abrir a lista quando a decisão vier.

## Débito de fundo (ondas anteriores)

- 🔴 **58% das claims WCAG são "verificadas" por âncora que não verifica nada** (medido ago/2026,
  na 4ª passagem do `DssEmptyState`). Distribuição real dos 185 claims dos 79 contratos:

  | âncora | claims | componentes | o que de fato checa |
  |---|---|---|---|
  | `css` | **78** | 51 | **verifica de verdade** — computa contraste ou casa regra no SCSS |
  | `test` | **72** | 72 | apenas que o arquivo `*.test.js` **existe** |
  | `aria` | **35** | 32 | apenas que existe prop cujo nome casa `/aria\|required/i` |

  **107 claims (58%) passam sem que nada olhe para a implementação.** O `emit-contract --all
  --strict` reporta essas claims como ✅, e a promessa escrita na apresentação técnica §5 — *"cada
  claim com uma âncora verificável: o gate reprova afirmação que não fecha"* — vale hoje só para
  o terço ancorado em `css`.
  **Como apareceu:** o `G-02` levantou a `aria` (a regex casa "aria" dentro de "v**aria**nt"); a
  4ª passagem mostrou que a `test` é igualmente vazia e alcança o **dobro**. Agravante registrado
  pelo auditor: o rebaixamento da claim 4.1.3 do `DssEmptyState` moveu a claim **de uma âncora
  vazia para outra** — a substância continua correta (o teste assere `role`, `aria-live` e a
  remoção com `announce=false`), mas não é a âncora que a torna verificada.
  *Correção sugerida:* `aria` deve casar o atributo no SFC; `test` deve casar o **nome do caso**
  no `*.test.js` (ex.: procurar `role="status"` ou o critério no `describe`). Ambas em
  `scripts/emit-contract.mjs`. **Corrigir vai reprovar contratos hoje verdes** — precisa de onda
  própria, não de conserto de passagem.

- 🟡 **Pré-prompt é superfície de retratação que ninguém varre** (ago/2026). Ao retratar a claim
  4.1.3 do `DssEmptyState` a correção foi aplicada em 5 lugares ao longo de 3 rodadas — comentário
  do SFC, `types`, contrato, prosa e demo renderizada — e o **pré-prompt ficou fora da varredura
  nas quatro**. A 4ª passagem o encontrou: `pre_prompt_dss_empty_state.md` mantinha a frase
  retratada e a âncora `aria` antiga na tabela WCAG.
  **Gravidade pelo próprio protocolo:** o Gate G do `prompt_auditoria_v2.5.txt` diz que cobertura
  incompleta de pré-prompt é *"não bloqueante para o componente, mas **bloqueante para o próximo
  componente da mesma família**"* — o pré-prompt é insumo do próximo, então ele propaga o erro.
  **Este caso foi corrigido**; o que fica em aberto é a **classe**: nenhuma checklist de retratação
  lista `docs/governance/pre-prompts/` entre as superfícies a varrer. *Correção sugerida:* incluir
  o pré-prompt na ordem de verificação (contrato → types → prosa → demo renderizada →
  **pré-prompt**).

- 🟡 **A definição de Fase 1 não acomoda primitivo nativo do DSS** (ago/2026).
  `docs/reference/DSS_FASEAMENTO_COMPONENTES.md:16` define: *"O componente deve ser um wrapper
  direto de **UM único componente Quasar**"*. O `DssEmptyState` é **Fase 1 e não tem base
  Quasar** — o Quasar não tem equivalente, e o componente é HTML próprio do DSS.
  O auditor marcou a linha do faseamento como `— (DSS nativo)` com exceção declarada, em vez de
  forçar a regra a acomodá-lo. **É a decisão certa para um caso e insustentável como padrão:** se
  o DSS passa a criar primitivos nativos (e o `DssEmptyState` existe porque o Quasar não oferece
  resposta para estado vazio), a Regra de Ouro precisa distinguir **wrapper governado** de
  **primitivo nativo** — hoje ela só prevê o primeiro. *Decisão pendente de governança;* nenhuma
  linha alterada além da exceção declarada.


- 🟡 **A API de slots não é verificada pelo TypeScript — e `defineSlots` NÃO é o conserto**
  (levantado como G-04 em ago/2026; **premissa refutada por experimento em 2026-08-31**).

  **Medição atual:** 58 componentes declaram slots no contrato · **20 já usam `defineSlots`** ·
  **38 declaram a interface e não a aplicam** · **0 estão sem interface**. Ou seja, a correção
  parecia ser só "ligar o que já existe".

  **O experimento que refutou isso** (controle negativo, não leitura de código):
  1. `defineSlots<ItemSlots>()` aplicado ao `DssItem`;
  2. num consumidor **dentro do escopo do type-check** (`DssMultiselectAutocomplete`, que é
     `components/**/*.vue`), o slot `#leading` foi trocado por `#leadng` — nome **inexistente**;
  3. `vue-tsc` → **exit 0**. Não acusou.

  **Causa:** `packages/core/tsconfig.json` **não tem `vueCompilerOptions`**, então
  `strictTemplates` está desligado (padrão `false`). Sem ele, o `vue-tsc` não confere slot nem
  prop no template — `defineSlots` vira declaração sem consumidor.

  > ⚠️ **Consequência para o planejamento:** migrar os 38 seria **puramente cosmético** e, pior,
  > *pareceria* fechar o item. A primeira tentativa de fechar o G-04 ia fazer exatamente isso.

  **Um primeiro controle negativo foi INVÁLIDO e vale registrar:** o slot errado foi injetado num
  `.example.vue`, que está no **`exclude`** do tsconfig — o arquivo nem é verificado. *Grep que
  não acha não é ausência; type-check que passa em arquivo excluído não é verificação.*

  **O item real é o `strictTemplates`, e ele é grande:** ligado experimentalmente, produz
  **215 erros**. A amostra mostra que a maioria **não é defeito** — são atributos legítimos que
  caem por `$attrs` (`ref`, `role`, `aria-hidden`, `aria-label` em componente). Ligar exige
  tratar essa classe primeiro (tipar os fall-through ou relaxar por componente), não é conserto
  de passagem.

  *Sequência sugerida:* (1) decidir se `strictTemplates` é meta; (2) se for, resolver a classe
  dos `$attrs`; (3) só então `defineSlots` nos 38, que aí passa a valer alguma coisa.

- 🟡 **A escala `--dss-surface-*` inverte o próprio sentido no dark** (medido ago/2026, na
  adequação do DssEmptyState). Valores computados:

  | token | light | dark |
  |---|---|---|
  | `--dss-surface-default` | `#ffffff` | `#262626` |
  | `--dss-surface-subtle` | `#fafafa` | `#525252` |
  | `--dss-surface-muted` | `#f5f5f5` | `#737373` |

  No light a progressão é **discreta** (4% de passo a partir do branco) — "muted" quer dizer
  *quase igual ao fundo*. No dark, `muted` (#737373) é o mais **claro** dos três, ou seja o mais
  **berrante** sobre o `default` (#262626): salta ~45% de luminância. O nome passa a significar o
  oposto. Consequência medida: um cabeçalho com texto `--dss-text-secondary` sobre
  `--dss-surface-muted` fica em **~2,8:1** no dark — reprova AA. *Não é o mesmo item do
  `--dss-text-muted`* (aquele é nome↔valor; este é a **escala inverter a direção** entre temas).
  Precisa de decisão de cor, não de conserto local.


- ✅ **O PLAYGROUND do sandbox mostra cor que produção NÃO mostra — RESOLVIDO** (2026-09-01,
  `utils/_colors.scss`). Diagnóstico corrigido em 2026-08-31; o verbete anterior culpava o token
  errado. Mantido na íntegra abaixo porque o **erro de diagnóstico** é a parte reaproveitável.

  **O que eu havia registrado (ERRADO):** *"`.bg-*` fura a camada semântica — `utils/_colors.scss:40`
  usa o primitivo `--dss-primary`"*, com o sintoma de um `DssButton color="primary"` ficando
  `#1F86DE` nas três marcas.

  **O sintoma é real e reproduzível — a causa não era essa.** `.bg-primary` está definida **duas
  vezes**, de propósito:
  - `utils/_colors.scss:40` → `background: var(--dss-primary)` (primitivo)
  - `themes/_quasar-overrides.scss:1058` → `background-color: var(--dss-action-primary)` (semântico)

  A segunda **sobrescreve** a primeira, e a ordem de `packages/core/index.scss` (tokens → utils →
  themes → components) garante isso. **Compilado, o core está correto:** `npx sass index.scss`
  emite 2 regras e a semântica é a última. **Produção brandeia.**

  **O defeito está no BUNDLE DE DEV do sandbox.** Medido no navegador: **3** regras `.bg-primary`,
  e a última (ordem 7159) é o **primitivo** — vem de uma folha separada com 579 regras que começa
  em `.dss-block`/`.dss-flex`, ou seja `utils/` **reemitido depois de `themes/`**. O resultado:

  | superfície | `DssButton color="primary"` sob `[data-brand]` | fiel? |
  |---|---|---|
  | Core compilado (produção) | segue a marca | ✅ |
  | **Preview Frame** (iframe) | segue a marca | ✅ |
  | **Playground** (documento principal) | **`#1F86DE` nas 3 marcas** | ❌ |

  > ⚠️ **Por que isto é grave e não é cosmético:** o Playground é **instrumento de medição** da
  > onda de adequação. Um instrumento que diverge de produção nesta classe faz o adequador ver
  > defeito que não existe — foi exatamente o que aconteceu comigo: medi, acreditei, e registrei
  > uma dívida 🔴 contra o token errado.

  **O que foi feito (variação em relação à correção sugerida).** A sugestão era *eliminar* a
  duplicidade. O que entrou **alinha** as duas definições no mesmo token: `utils/_colors.scss`
  passou de primitivo para semântico (`--dss-action-*` / `--dss-feedback-*`), que é o alvo que
  `themes/_quasar-overrides.scss:1058+` já usava. A ordem de emissão **deixa de decidir** — que era
  o objetivo — sem tocar em `themes/`. Custo aceito: as duas fontes continuam existindo; a mitigação
  é o bloco de comentário no cabeçalho de `utils/_colors.scss`, que documenta a duplicidade e proíbe
  reverter para o primitivo.

  **Delta de cor: zero.** Verificado: (a) os 12 tokens semânticos existem; (b) em `:root` são alias
  direto dos primitivos, então só muda onde deve — sob `[data-brand]` e sob `hc`/`hcdark`; (c) 7 dos
  8 pares já eram vencidos por `themes/` (mudou-se o código *perdedor*); (d) `.bg-tertiary` /
  `.text-tertiary` são a exceção — não existem em `themes/`, mas `--dss-action-tertiary` é alias puro
  de `--dss-tertiary` nas 3 marcas; (e) `npx sass index.scss` exit 0, e as duas regras emitidas
  (4409 e 7230) apontam para o mesmo token; (f) `validate:scss-tokens:gate` e `validate:theme-scopes`
  verdes.

  Doc derivada sincronizada junto: `DssIcon/3-variants/_semantic.scss` e `DssIcon.md` documentavam a
  tabela `.text-* → --dss-primitivo` (Constituição #6).

  > ⚠️ **A linha "o Preview Frame é a superfície confiável para cor, não o Playground" deixa de
  > valer.** As três superfícies convergem.

- 🔴 **O hover das utilitárias de cor NÃO brandeia e reprova AA — `utils/_colors-hover.scss`**
  (aberto em 2026-09-01, medido em 2026-09-02). **Bug de produção pré-existente, não regressão** do
  item acima — e **fila da adequação de UI**, não defeito escapado: os dois componentes que o arquivo
  mira (`.dss-button`, `.dss-badge`) ainda não foram adequados.

  O arquivo irmão de `_colors.scss` não foi migrado: as 40+ regras de hover/active de
  `.dss-button` e `.dss-badge` usam `--dss-primary-hover`, `--dss-tertiary-light`,
  `--dss-positive-hover`… — todos **primitivos**. É a única definição desses estados (não há
  concorrente em `themes/`) e entra em `utils/index.scss:22`.

  **Por que não brandeia:** `tokens/brand/_hub.scss:14` remapeia `--dss-action-primary-hover` →
  `--dss-hub-800`. **Nenhuma marca remapeia `--dss-primary-hover`** — o primitivo é, por definição,
  o que não muda por marca. Logo o hover cai no azul base sob qualquer `[data-brand]`.

  **O ramo que dói em produção é o flat/outline** (`_colors-hover.scss:70+`), não o filled:

  | ramo | declaração | competidor | efeito real |
  |---|---|---|---|
  | filled (`.bg-*`) | `background: var(--dss-primary-hover)` | `.bg-primary{…!important}` do Quasar (`quasar.css:6469`) | **inerte** onde o CSS do Quasar carrega (é o que o comentário T2b do arquivo já afirma) |
  | flat/outline (`.text-*`) | `background: var(--dss-primary-light)` | **nenhum** — o `.text-*` do Quasar só disputa `color` | **aplica** — `DssButton flat color="primary"` sob `[data-brand="hub"]` acende **fundo azul** no hover |

  **MEDIDO no sandbox** (2026-09-02, chrome-devtools MCP, `DssButton` real na página de teste,
  `[data-brand]` no `<html>`, transições desligadas para não ler valor intermediário):

  | marca | fundo do hover (atual) | deveria ser | texto | contraste |
  |---|---|---|---|---|
  | hub | **`#86c0f3`** (azul) | `#fbcb76` | `#ef7a11` | **1,45:1** ❌ |
  | water | **`#86c0f3`** (azul) | `#7dc4fc` | `#0e88e4` | **1,92:1** ❌ |
  | waste | **`#86c0f3`** (azul) | `#74e1ae` | `#0b8154` | **2,53:1** ❌ |

  O fundo é `--dss-primary-light` **nas três marcas** — o primitivo não se move. Vale igual para
  `variant="flat"` e `variant="outline"` (ambos medidos). **Não é só brandabilidade: é reprovação
  de contraste WCAG AA** (4,5:1) no estado hover — e o hub, a 1,45:1, é laranja sobre azul claro.

  Confirmado na mesma sessão que o ramo **filled é mesmo inerte**: no hover o `.bg-primary` fica em
  `#ef7a11` (a cor **base**), não em cor de hover alguma — quem dá o feedback é a elevação
  (`box-shadow` `0 4px 6px` → `0 10px 15px`). Ou seja, as 24 regras de `.bg-*` em `_colors-hover.scss`
  são **código morto** onde o CSS do Quasar carrega. Migrá-las é inócuo; o que precisa de conserto é
  o ramo `.text-*`.

  **ISTO É FILA DA ADEQUAÇÃO, NÃO DEFEITO ESCAPADO.** `_colors-hover.scss` mira exatamente dois
  seletores — `.dss-button` e `.dss-badge` — e **nenhum dos dois passou pela adequação de UI**. O selo
  do DssButton é de 20/01/2026, anterior à onda; **ambos têm página Playground mas nenhum tem Preview
  Frame** — estão os dois na faixa *parcial* do quadro (ver
  [`DSS_ESTADO_ADEQUACAO_UI.md`](DSS_ESTADO_ADEQUACAO_UI.md)). O arquivo inteiro vive em território
  não processado, e seus dois donos estão a **um artefato** de entrar na onda.

  **A correção NÃO é migrar os tokens.** O DssChip — adequado (2026-08-13), Golden Reference de
  interativo — faz hover assim:

  ```scss
  &.dss-chip--clickable:hover::after { opacity: var(--dss-opacity-hover); }
  ```

  Overlay em `::after` com opacidade/brightness, **sem nomear cor de hover alguma**. Por construção não
  desbrandeia: herda a cor base. É o que o Cartão Base já manda (`::after` = efeitos visuais).
  Trocar `background` por uma cor nomeada — como `_colors-hover.scss` faz — é o anti-pattern; migrá-lo
  1:1 para a rampa semântica preservaria a técnica errada com a cor certa.

  **Encaminhamento:** dobrar este item na **adequação de UI do DssButton e do DssBadge**, com a tabela
  medida acima servindo de evidência do que consertar. O desfecho provável é `_colors-hover.scss`
  **deixar de existir** (regras absorvidas pelo `4-output/_states.scss` de cada componente, no padrão
  overlay), não ser migrado. Enquanto a adequação não chega, o contraste de 1,45:1 no hover do flat/
  outline segue valendo como defeito conhecido.

  **Por que ficou fora do commit do item acima:** aquele é convergência de superfícies com delta de
  cor **zero**; este tem delta de cor **real** em produção e, como mostrado acima, nem sequer é
  conserto de token — é redesenho de estado, que pertence à adequação do componente.

  *Mesma raiz da frente **(d) Brandabilidade passa por fora da camada de token*** (topo deste doc):
  primitivo onde deveria haver semântico. Aquela mede `4-output/_brands.scss` (577 usos); esta é a
  camada de utilitárias. Se (d) virar frente, este item entra no mesmo lote.

- 🔴 **Gate estrutural NÃO verifica o `@forward` em `components/index.scss`** — descoberto ao criar o
  `DssEmptyState` (ago/2026). O componente passou nos **10 gates** (estrutura, contrato, api-docs,
  demo-registry, sandbox-tags, catálogo, type-check…) com as 4 camadas completas e o `.module.scss`
  compilando — e mesmo assim renderizava **sem nenhum CSS**, porque ninguém tinha adicionado
  `@forward 'base/DssEmptyState/DssEmptyState.module';` ao agregador. Medido no Preview Frame:
  `padding: 0px · display: block`. **É um buraco real do gate estrutural:** um componente pode estar
  100% conforme e entregar zero estilo em produção. *Correção sugerida:* o `validate-structure.cjs` já
  varre as 4 camadas — basta cruzar cada `<Comp>.module.scss` encontrado com os `@forward` de
  `packages/core/components/index.scss` e reprovar o que faltar. Custo baixo, pega uma classe inteira
  de falha silenciosa.

- 🟡 **`--dss-text-muted` é uma armadilha de nome: aponta para `--dss-dark-disable` (#D7D7D7)** — o
  comentário no `tokens/semantic/_text.scss:16` diz "Texto terciário", mas o valor é a cor de
  **desabilitado**. Quem lê o nome escolhe errado: um ícone ou texto nesse tom lê como componente
  quebrado, não como ênfase baixa. Encontrado no `DssEmptyState`, que passou a usar
  `--dss-text-secondary` (a decisão está registrada em `DssEmptyState.md` §7.3). **Nenhum outro
  componente base usa `--dss-text-muted` em `2-composition/`** — o que sugere que os demais tropeçaram
  no mesmo problema e desviaram em silêncio, sem registrar. *Decisão pendente:* ou renomear para
  `--dss-text-disabled` (o que ele de fato é), ou criar um `--dss-text-tertiary` real entre
  `secondary` (#737373) e `disable` (#D7D7D7). Bloqueia quem precisar de três níveis de ênfase.


- ✅ **DssChip sem cor neutra/token + DssSelect não consome DssChip — RESOLVIDO** (`886b083`, ago/2026).
  `ChipColor` ganhou `'neutral'` (aditiva; o default segue `primary`) e o `DssSelect` passou a preencher o
  slot `selected-item` com `<DssChip color="neutral" size="xs">` — acabou a divergência de duas linguagens
  visuais para o mesmo dado. `[[project_multiselect_autocomplete]]`.

- 🟡 **`meta.visualProperties` staleness = GERIDO via checklist (automação total impossível)** — o gate
  não pode pegar drift da *lista de tokens*: o validador não distingue "token aplicado via classe Quasar
  (`bg-primary`)" de "token removido" — `--validate-strict` deu **129 falsos-positivos em 88 comp**. Mesma
  cegueira atinge o contrato (deriva do SCSS compilado, não vê Quasar-applied). Correção da premissa:
  `meta.visualProperties` (curado, inclui Quasar-applied) é **complementar** ao contrato, não legado
  inferior. **Resolvido como:** passo de propagação no `DSS_UI_ADEQUACAO_CHECKLIST.md` (sync:token-values
  p/ value dimensional + revisão curatorial da lista + reverificar meta.a11y). Não há mais gate a construir
  aqui — é curadoria humana consciente. *(Opção estratégica adiada: validador Quasar-aware p/ resolver
  bg-primary→token; ou aposentar a REFERENCIA em favor do contrato.)*

- 🟡 **Governança da IMPLEMENTAÇÃO (o que o produto constrói) — camada 1 de 4 entregue** (2026-08).
  > 🔻 **A árvore paralela desta frente foi encerrada em 2026-08-10** (worktree `DSS-governanca` +
  > branch `work/dss-governanca-implementacao`, ambas removidas após atualização do SO). **Nada se perdeu:**
  > os 13 commits que já existiram nela foram verificados um a um como contidos em
  > `work/dss-selection-controls` (merge `67838e5`), incluindo o último — a apresentação à diretoria
  > (`DSS_APRESENTACAO_DIRETORIA.html`), que estava fora do git desde 07/ago.
  > **Os itens abertos abaixo continuam abertos**; o que acabou foi a árvore
  > separada, não o trabalho. Daqui em diante esta frente anda na árvore principal.
  📖 **Visão consolidada do processo: `DSS_PROCESSO_DESENVOLVIMENTO_ASSISTIDO.md`** (fronteira Descoberta+Solução =
  como a spec nasce / Entrega = onde o DSS entra; divisão analista×designer; o que roda hoje; limites; medição).
  Contexto: as frentes do DSS governam o *componente*; **nada governava a implementação**. Causa de origem: D4
  do blueprint tirou `purpose.*`/`examples[]` do contrato (correto — proveniência não certificável), mas a
  orientação de uso não entrou em nenhum lugar com gate.
  - ✅ **(1) `ui-rules.schema.json` ressuscitado** — de 28/abr a 05/ago/2026 sem consumidor algum (forense de git:
    o schema nasceu 1 mês ANTES do MCP; os planos das Fases 1–4 do MCP nunca o citaram; `DSS_UI_RULES.md` §3.2
    declarava o consumo no presente como fato consumado). Agora tem consumidor real: tool **`validate_composition`**
    (9 regras: vocabulário DSS, allowed/forbidden children, forbidden_contexts, auto-aninhamento, Matryoshka,
    required_props, estados de dados, densidade de formulário). Schema → v1.2.0 (`applies_to`/`field_components`:
    as regras de tela existiam sem dizer a QUEM se aplicam, logo eram inexecutáveis). **Anti-apodrecimento:** nada
    transcrito para constante — vocabulário existence-checked a cada chamada contra o catálogo real e a escala real
    de spacing; resultado em `schemaIntegrity`. Reproduz o NC-03 do stress test (`<q-checkbox>` cru) sozinho.
  - ⏳ **Pendente decidir: gate de pre-commit** para `schemaIntegrity` (hoje o schema só se anuncia se alguém
    CHAMAR a tool — é o mesmo modo de falha que o matou). Único ponto que fecha o anti-apodrecimento de vez.
  - ✅ **(2) Ontologia de funcionalidade** — `DSS_ONTOLOGIA_FUNCIONALIDADE.md` + `dss.ontology.json` (v0.1.0,
    27 entidades, 83 campos, **27/27 com `evidencia`** apontando spec real). Derivada de RF-0292D (SPC/Serasa,
    692 linhas). **Método: descrever, não inventar** — entidade sem evidência não entra; lacuna só entra
    verificada por busca negativa (grep=0), não por impressão. **`regime` é o conceito central** (obrigatorio/
    recomendado/**horizonte**): reconcilia o que a produção Sansys faz HOJE com o alvo do DSS. **Acessibilidade
    = `horizonte` por decisão explícita do dono (ago/2026)** — registrada como débito, NUNCA reprova a spec;
    NÃO afrouxa a Constituição #4, que segue vinculante no nível do COMPONENTE. Achados: a spec é BOA (escopo
    negativo, 41 BDD Gherkin, 40 CA) — as lacunas são do **template**, não do analista (não há campo para
    estado vazio/carregando/erro, texto de mensagem, volume, responsividade); §2.4 "Elementos a preservar" é a
    árvore de composição escrita em prosa (input direto da `validate_composition`); §2.4 manda reprototipar "no
    padrão do sistema" **sem citar o DSS**; o checklist exige inferir a convenção de tachado (não é legível por
    máquina). **v0.2.0 revalidada contra +2 specs** (#85505 fiscal/Water, #33950 jurídico/Rio — autores e módulos
    distintos): 33 entidades, 97 campos, 33/33 com evidência. Aprendizado central: **NÃO existe template único**
    (3 specs = 3 formatos) → criado o conceito de **`genero`** e regimes `condicional:genero`; exigir a estrutura
    da RF-0292D reprovaria a #33950 por ~15 seções. Rebaixados: `cenario` e `criterio_aceite` (Gherkin 82/18/**0**;
    CA 40/sim/**0**) e `estoria.para` (Como/Quero/Para só existe na 0292D). Novas: `maquina_estado` (promovida — o que
    mais governa tela nas 3), `rastreio` (melhor prática da amostra: #33950 amarra 12 requisitos à estória),
    `contexto_negocio` ('Premissas' tem 2 semânticas), `integracao`, `parametrizacao` (tela com flag por cliente tem
    DUAS composições; a spec descreve uma), `historico_documento`, `regra.motivo`. **Lacunas confirmadas SISTÊMICAS
    (0 em 3/3):** estado vazio · carregando · volume · **acessibilidade** (os hits eram falsos positivos — base64 e a
    palavra 'gost*aria*'). Mensagem: 22 menções somadas, **nenhuma** redige texto final ou diz o veículo. **Handoff de
    design estruturalmente vazio:** §2.4 da #85505 é cabeçalho SEM CONTEÚDO; a da 0292D manda reprototipar 'no padrão
    do sistema' sem apontar nada; a #33950 dá 40 imagens. **O DSS não é citado em nenhuma das 3.** ⚠️ Amostra=3 fecha
    o sistêmico vs individual, mas não `cardinalidade` nem o número de gêneros. 'modal×tela' NÃO se repetiu (é da 0292D).
  - ✅ **(3) Portão de prontidão da spec** — `scripts/emit-spec.mjs` + tool MCP **`validate_spec_readiness`**.
    **DERIVADO, nunca autorado (D1):** lê o markdown que o analista JÁ escreve; ele não redige nenhum JSON —
    era a mudança cultural que encontraria resistência. Detecta o `genero` e só cobra o que aquele gênero exige
    (a #33950 não é reprovada por não ter critério de aceite). Reporta por regime: bloqueantes · recomendados ·
    **horizonte (acessibilidade, nunca reprova)**. A tool DELEGA ao emissor em vez de reimplementar as regras —
    duas fontes de verdade divergiriam em silêncio. **Enquadramento:** Descoberta+Solução são construção conjunta
    designer+analista, então o relatório NÃO fiscaliza ninguém — diz à DUPLA quando a spec pode atravessar para a
    Entrega. **Verificado nas 3 specs reais:** todas `incompleta`, com as mesmas 5 lacunas bloqueantes.
    ⚠️ **Mecanismo de controle provou seu valor na 1ª execução:** o padrão de controle `deverá` deu 0 nas 3 specs
    porque `\b` em JS deriva de `\w` = `[A-Za-z0-9_]` e **não casa depois de letra acentuada** — sem os controles,
    um regex quebrado teria APROVADO as 3 em silêncio. Veredito `inconclusivo` ≠ aprovação.
    **Limites declarados:** verifica completude/coerência estrutural, NUNCA correção de regra de negócio; entidades
    semânticas (campo, comando, `maquina_estado`) não são extraídas — exigem leitura de significado, que é parecer
    probabilístico (item 5) e por isso não vira gate.
  - ⏳ **Pendente decidir: o portão entra em pre-commit/CI?** Hoje roda sob demanda (`npm run spec:check`). Specs
    vivem fora do repo (Desktop/Confluence), então o gate natural não é o pre-commit do DSS — é a superfície do
    item 4.
  - 🟡 **(4) Superfície onde o analista escreve — METADE entregue.** ✅ **Template:** `DSS_SPEC_BLOCO_INTERFACE.md`
    — uma seção **§2.5 Interface**, dona = **designer**, que entra AO LADO do que o analista já escreve (não desloca
    nada). 7 campos: superfície · estados de dados · mensagens (texto exato + veículo) · volume · responsividade ·
    acessibilidade (horizonte) · elementos a preservar. **Laço fechado e verificado:** RF-0292D real + §2.5 preenchida
    → portão vira `incompleta` (5 bloqueantes) em **`pronta`**; as 3 specs originais seguem `incompleta` (sem aprovação
    falsa). Fechar o laço expôs divergência template↔portão: o detector de volume não reconhecia a redação do PRÓPRIO
    template ("Máximo esperado: N") — corrigido no `emit-spec.mjs`. ⏳ **Integração (validar na ferramenta) BLOQUEADA
    por fato desconhecido:** as 3 specs têm assinatura de exportação **Google Docs → Markdown** (imagens em referência
    + base64 no rodapé, escapes de ponto, pseudo-cabeçalhos em negrito), mas isso é INFERÊNCIA — falta confirmar onde
    o analista escreve de fato, quem administra e se a organização autoriza integração. Existe MCP de Google Drive
    disponível, não testado. **Não construir integração para ferramenta suposta.**
  - 🔜 ✅ **(5) Parecer semântico — ROTEIRO, não gate.** `scripts/spec-parecer.mjs` + tool
    **`request_spec_parecer`** + `npm run spec:parecer`. **Decisão de arquitetura: o DSS NÃO chama LLM.** O MCP não
    faz chamada de rede alguma e o `MCP_READ_ONLY_CONTRACT` §3 exige que ele "observe e explique, nunca decida" —
    juízo probabilístico embutido o tornaria criativo/não-reprodutível e daria à opinião aparência de veredito da
    ferramenta. Divisão: **DSS monta o roteiro (determinístico) · agente responde (juízo) · humano confere**.
    8 perguntas que busca textual não alcança: contradição interna · referência órfã · cobertura regra↔cenário↔CA ·
    vagueza que decide comportamento · termo inconsistente · estado sem transição · caminho infeliz sem contrapartida ·
    escopo negativo furado. **Disciplina anti-achismo:** toda observação exige **citação literal** (mesmo princípio do
    `verifiedBy`) — sem âncora é opinião e se descarta; com âncora o humano confere em segundos. O roteiro **importa
    o resultado do portão e manda NÃO repetir** o que já foi apontado por ausência. Verificado: `isGate:false`, sem
    campo de veredito, exit 0 sempre, portão inalterado. **Dogfood — achado real e novo (fora dos exemplos de
    calibragem):** na RF-0292D, BDD07 (lote somente-leitura: Enviado/Negativado/Cancelado) e BDD08 (lote editável:
    Em Análise/Neg. Aprovada/Neg. Reprovada) **não cobrem "Pendente"**, que consta na lista de status (BDD10, CA11) —
    a spec não diz se um lote Pendente abre travado ou editável. ⚠️ **Limite estrutural:** parecer pode errar; ausência
    de observação NÃO significa spec correta. ·
    **(6) MCP servido a ferramentas externas — PRÉ-REQUISITOS FEITOS, hospedagem
    pendente.** A descrição "transporte pronto, falta hospedar" era otimista: o transporte funciona (via `/mcp`,
    protocolo MCP real, 15/15 tools respondem), mas expor exigia 4 correções, TODAS feitas e verificadas:
    (a) **`/tools` mentia** — array escrito à mão que já driftou (anunciava 13; servidor registrava 15, faltando
    `validate_composition` e `validate_spec_readiness`). Agora deriva de `TOOL_DEFINITIONS`;
    (b) **leitura de arquivo arbitrário** — `validate_spec_readiness` aceitava QUALQUER caminho absoluto; hospedado
    = ler `/etc/passwd`. Servidores HTTP marcam `DSS_MCP_REMOTE=1` e caminho fora da raiz é recusado;
    (c) **remoto era inútil** — o `.md` do analista não existe no servidor. Adicionado `specContent` (+ `--stdin` no
    emissor, mantendo fonte única). Verificado: 24 KB por HTTP → veredito correto;
    (d) **tool de ESCRITA exposta sem auth** — `record_audit_event` grava no `dss.meta.json`. **Comprovado na prática:
    um teste meu MUTOU o `dss.meta.json` do DssButton via HTTP não autenticado** (revertido). Agora: Bearer opcional
    (`DSS_MCP_TOKEN`, `/health` livre) e a escrita se RECUSA em modo remoto sem token.
    ✅ **Empacotamento portável pronto:** `packages/mcp/Dockerfile` + `.dockerignore` + **`DSS_MCP_DEPLOY.md`**.
    **O plano Fase 4 tratava o MCP como stateless e ELE NÃO É** — as tools leem o repo em runtime (docs/, components/,
    tokens/, scripts/): **~18 MB viajam com o código**; sem eles o servidor sobe, responde /health e TODA tool devolve
    "não encontrado" (falha que parece sucesso). Imagem multi-stage, usuário não-root, `DSS_MCP_REMOTE=1` fixo.
    **`/health` agora carimba `content.sha` + `builtAt`** — MCP defasado mente com confiança; agora a defasagem é
    visível (comparar com HEAD da main) → **deploy precisa ser automático a cada merge**. ⚠️ **Docker não existe no
    ambiente: a imagem NÃO foi construída.** Verificado: todo `COPY` existe · ontologia sob docs/ acompanha · /health
    novo responde · comando do HEALTHCHECK retorna 0. Primeiro `docker build` pode exigir ajuste no `npm ci` com
    workspaces. ⏳ **Falta:** escolher ONDE hospedar — infra, não código; 3 perguntas em `DSS_MCP_DEPLOY.md` §6
    (padrão de nuvem Veolia? internet+token ou rede interna? quem opera?). **Item 4 (add-on no Google Docs) DEPENDE deste**: Apps Script não roda Node, então validar
    dentro do Docs exige endpoint hospedado — senão duplicaria as regras. · **(7) sinais de
    runtime** (depende dos times de produto). Refs.: `DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` §D4 + §4.2 ·
    `DSS_OBSERVABILITY_SIGNALS.md` (v0.1, 6 sinais especificados e **não instrumentados**) · `RELATORIO_STRESS_TEST_FASE3.md`.

- 🟡 **ESTADO VAZIO — metade RESOLVIDA** (achado 2026-08-24; lado do DSS fechado em 2026-08-31).
  - ✅ **Lado do DSS: RESOLVIDO.** O primitivo **`DssEmptyState`** existe, está **selado**
    (`DSS v2.2`, após 4 passagens de auditoria independente) e é o 89º componente do catálogo.
    Substitui o slot `empty` solto do `DssVirtualScroll` como resposta canônica.
  - 🟡 **Lado da spec: ABERTO.** `estado_dado.vazio` aparece **0 vez em 3 de 3** specs medidas.
    Continua entre as lacunas que o portão de prontidão reporta — **mas mudou de natureza**: antes
    o gate acusava uma ausência que o DS não tinha como suprir; agora ele pode apontar o componente.
    O que falta é o lado do analista passar a declarar o estado vazio na spec.
  - **Por que importa mais do que parece:** o portão cobra da spec algo que o design system não sabe
    entregar. Enquanto isso valer, preencher o campo na spec não tem para onde apontar — e o
    consumidor vai reinventar, que é exatamente o retrabalho que a apresentação à diretoria nomeia.
  - 🔲 **Decidir:** nasce um primitivo (`DssEmptyState`, com ilustração/título/ação opcionais), ou
    declara-se uma **convenção de composição** que conta como resposta. As duas servem ao join; a
    primeira serve também a quem constrói tela hoje.
  📖 Detalhe e tabela do cruzamento: [`DSS_JOIN_SPEC_CONTRATO.md`](DSS_JOIN_SPEC_CONTRATO.md).

- 🟡 **Cobertura baixa de props que o join exigiria** (mesmo esboço, medido no catálogo de
  contratos): `required` existe em **4** componentes (Input, Select, Textarea, File) e
  `indeterminateValue` em **1** (DssCheckbox). Não é defeito — é sinal de que, quando o join
  existir, parte das reprovações será por **falta de peça no DSS**, não por erro de composição.
  A mensagem de reprovação precisa distinguir os dois casos, senão vira frustração com a ferramenta.

- 🔴 **`.dss-item--divider` SEM BORDA no tema claro** (achado 2026-08-17 pela checagem nova do gate).
  `--dss-border-default` só é definido em `[data-theme="dark"]`; no light a única ocorrência está
  **dentro de um bloco de comentário** que documenta um tema futuro (`light-high-contrast`). Logo o
  `border-bottom: … var(--dss-border-default)` do DssItem resolve para nada e o divisor some.
  Referenciado 10× (DssItem `_base`/`_states` + `utils/_example-showcase`). **Corrigir exige escolher o
  valor light** — o dark usa `gray-600`; um divisor claro pediria algo como `gray-200`/`gray-300`.
  Decisão de design, por isso registrado em vez de arbitrado por mim.

- 🟡 **Mais 2 condicional-only referenciados** (mesma checagem): `--dss-brand-primary` (11×, só sob
  `[data-brand]` — sem marca não resolve; alimenta `--quasar-primary` em `themes/`) e
  `--dss-border-brand-primary` (1×, idem, em `utils/_example-showcase`).

- 🔴 **Visual Height do DssInput (issues #3/#4) — agora com número, e o DssField mostrou a saída**
  (2026-08-14). Auto-height do Quasar: label ~2.5px fora do centro em repouso (#3); com valor, a label
  flutuante **sobrepõe** o valor centralizado no native (#4). Tensão: altura compacta × reserva de topo.
  `[[project_visual_height_propagacao]]`.
  - **MEDIDO:** com valor + ícone prepend, o DssInput tem **6px de desvio** entre o centro do TEXTO e o
    centro do ÍCONE. Causa: `.dss-input__native` tem `padding-top: 12px / bottom: 0` (assimétrico, para
    reservar a label) enquanto o ícone centra na altura TOTAL do field. O defeito não é "a label
    sobrepõe" apenas — é que **a reserva desalinha os adornos**.
  - ✅ **O DssField foi corrigido e serve de modelo**: o `__control` reserva a faixa
    (`padding: spacing-5 spacing-4 spacing-3`, total vertical inalterado) **e os adornos
    (`__prepend`/`__append`/`__prefix`/`__suffix`) recebem a MESMA caixa de padding**; o `__field` passou
    de `align-items: center` para `stretch`, de modo que cada filho centra o próprio conteúdo na mesma
    área útil. Desvio medido depois: **0**.
  - ✅ **DssInput CORRIGIDO** (2026-08-14) — desvio **6px → 0**, medido em 7 campos com adorno.
    A técnica final NÃO foi a do DssField, e as duas tentativas descartadas valem registro porque a
    armadilha se repete em qualquer campo com adorno:
    - **`padding-top` no adorno INFLA a caixa.** Um `append` com `DssButton` (36px) virava 48px e
      estourava os 44px do campo, que crescia para **50px** (medido). Padding só é seguro quando o
      adorno é um glifo — e o slot aceita qualquer coisa.
    - **`margin-top` sob `align-items: center` desloca só METADE** (o flex centra a caixa de MARGEM):
      6px de margem renderam 3px de deslocamento. Dobrar traz de volta o crescimento.
    - ✅ **`position: relative` + `top`** desloca o pixel exato e **não entra no cálculo de altura** —
      serve a glifo e a botão. É a técnica correta para correção puramente VISUAL de alinhamento.
    O DssField foi migrado para a mesma técnica (4px), então a família está uniforme.
  - ✅ **`DssField.example.vue` também compensava** — as mesmas `padding-top: 20px` da página de teste,
    em 4 controles. Como o `example.vue` é a **fonte de verdade de uso**, ele propagava o padrão errado
    para quem lê a documentação. Corrigido; desvio da seção de exemplos foi de 8px para 0.
  - ✅ **Select e Textarea MEDIDOS e corrigidos** (2026-08-14). Tinham o mesmo desvio de **6px**, mas
    por outra via: são QField-based, e quem empurra o native para abrir espaço é o **Quasar**, não o
    SCSS do DSS (o `padding` do native é `0/0` ali). **Correlação verificada com precisão:** o desvio
    ocorre **só** no estado `q-field--float` — 41 campos sem float dão 0, os 12 com float davam 6.
    Corrigido em `themes/_quasar-overrides.scss`, escopado a `&.q-field--float`, com a mesma técnica
    (`position: relative` + `top`). Depois: **0 em todos os estados**, nos dois componentes.
  - ✅ **DssFile MEDIDO e corrigido** (2026-08-14). ⚠️ **Correção de um erro meu:** eu havia registrado
    "não exercitado" — estava errado, o playground **já tinha** `#prepend`/`#append`; meu seletor é que
    procurava classes do Quasar (`.q-field__prepend`) num componente que usa anatomia própria
    (`.dss-file__prepend`). Medido corretamente: **5px** de desvio (1px no dense).
    - **Mecanismo diferente dos irmãos:** aqui a reserva não é `padding`, é
      `align-items: flex-end` + `padding-bottom` no `__control`. Por isso a correção **não** foi o
      `position/top` dos outros — foi **espelhar o mesmo ancoramento** no adorno
      (`align-self: flex-end` + mesmo `padding-bottom`), derivando do mesmo token em vez de um número
      mágico que desatualizaria se a reserva mudasse.
    - **Paridade de API fechada** (aditivo): props `loading`/`required` e slots `before`/`after`/`label`
      — o DssFile era o único da família sem eles. O gate `validate:api-docs` **reprovou** a mudança até
      README e `*_API.md` serem atualizados, exatamente como o passo de propagação de PROSA prevê.
    - 🔍 **Dois defeitos encontrados na própria adição, por medição:** (a) `before`/`after` no DssInput
      estavam **no mesmo seletor** que `prepend`/`append` e pegaram o deslocamento de 6px por engano —
      ficam fora da moldura, onde não há reserva; escopo separado. (b) a label por SLOT não flutuava
      (a condição olhava só `props.label`), então sobrepunha o placeholder.
- 🟡 **Propagação CSS→meta — lotes 2–6** — catálogo com 38 divergências de *value* + 6 dimensionais
  pendentes (`sync-token-values.js`). Mesma fonte acima.
- 🟡 **`--dss-text-secondary` reprova AA** — `#B0B0B0` ≈ 2.6:1, sistêmico. DssInput já migrou p/ gray-600
  no label; **demais componentes ainda usam o token frouxo**. → **tratar junto com (c1)** (mesmo tema).
- 🟡 **Gate a11y — verificação de âncora é COARSE em `aria`/`test`** — descoberto no teste de fluxo do
  DssUploader (2026-07). `verifiedBy: "css"` (contraste/focus) é **calculado de verdade** pelo wcag-kit;
  mas `verifiedBy: "aria"` passa só por existir prop `aria*`/`required`, e `verifiedBy: "test"` passa só
  por existir `*.test.js` — **presença, não que o teste exerça o claim**. Logo o "impossível escrever p/
  passar" vale **plenamente só para `css`**; `aria`/`test` são gameáveis. (O executor cobriu por honestidade
  — não declarou 2.1.1/teclado porque o teste não exercita.) **Decisão futura:** endurecer (aria→checar
  atributo no DOM renderizado; test→casar o critério a um `it()` nomeado) ou aceitar como presence-gate assumido.
- 🟡 **DssUploader disabled usa `opacity: 0.4` (não o padrão cor-based F1)** — escalado, não forçado. Seguro
  AQUI (Quasar `.q-uploader--disable` só aplica `pointer-events:none`, sem empilhar → não ocorre o 0.24 do F1),
  mas não é o padrão. Migrar = redesenho multi-camada num componente selado → decisão humana. `[[project_adequacao_ui_recorrencias]]`.
- 🟡 **Composto com `classification`-objeto precisa `meta.category` no top-level** — o emissor lê
  `meta.category` (raiz); na convenção antiga de composto a `category` fica DENTRO do objeto `classification`.
  Ao emitir contrato dos próximos compostos, **promover `category` para o topo** (senão `--write` dá gap).
- 🟡 **Focus ring ausente no CSS próprio — de 6 sobrou 1** (reverificado 2026-08-11, direto no SCSS).
  Checkbox, Radio e Toggle declaram `outline: … var(--dss-focus-primary)`; Range e Slider usam
  `box-shadow: var(--dss-shadow-focus)`. **Só o `DssField` segue sem anel próprio** — tem apenas
  `.dss-field--focused` na variante `outlined`, que é classe de estado do Quasar e não `:focus-visible`.
  Risco WCAG 2.4.7 restrito a ele. **Onda Higiene.** `relatorios/CONTRATOS_FORM_INPUT.md`.
  *(A ser confirmado no Range/Slider: se o `box-shadow` está de fato preso a `:focus-visible` e não a
  `:focus` — a distinção importa para não exibir anel em clique de mouse.)*
- 🟡 **Higiene `!important` — estados não-default** — disabled/erro/hover reais não são validáveis na
  sandbox (injeção sintética de classe Quasar dá artefato). Risco residual baixo. `[[project_important_audit]]`.
- 🟡 **`tokens/brand/index.scss` = código morto (T4)** — ~149 `!important` inócuos (arquivo não importado)
  + feature de override local de marca parcialmente entregue. T4 BLOQUEADO (limpar seria maquiagem).
  Alerta em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`. `[[project_brand_index_dead_code]]`.

- ⏳ **DECISÃO EM ABERTO: a escala de tonalidade de marca (`--dss-brand-*`) deve ser cabeada?**
  (levantado 2026-08-13, a partir de observação do dono durante o DssChip). **Existem DUAS famílias de
  token de marca, com significados diferentes**, e só uma está viva:
  | Família | `secondary` sob Hub | Significado |
  |---|---|---|
  | `--dss-action-*` | `--dss-secondary` (verde-azulado) | outra MATIZ, com carga semântica própria |
  | `--dss-brand-*` | `--dss-hub-300` (#fbcb76) | MESMA matiz da marca, outra luminosidade |
  - **Estado real medido:** `--dss-brand-{secondary,tertiary,accent}` têm **ZERO consumidores** em todo
    o `packages/core` — definidos nas três marcas, ninguém lê. `--dss-brand-primary` é consumido, mas só
    em `themes/` para alimentar `--quasar-primary`. Ou seja: **a escala está especificada e não cabeada**,
    mesma natureza da entrega parcial do item acima.
  - ⚠️ **CUSTO DURO da adoção (calculado, não estimado).** Se o `filled` passasse a usar a escala com
    texto branco, **6 dos 9 casos reprovam AA** — porque 300 e 400 são tons claros:

    | | secondary (300) | tertiary (800) | accent (400) |
    |---|---|---|---|
    | Hub | **1,51:1** ❌ | 6,52:1 ✅ | **1,94:1** ❌ |
    | Water | **1,88:1** ❌ | 9,02:1 ✅ | **2,63:1** ❌ |
    | Waste | **1,60:1** ❌ | 8,14:1 ✅ | **2,08:1** ❌ |

    Só os `tertiary` (800) passam. Adotar exigiria **inverter o texto para escuro** nos tons claros —
    isso é redesenho da variante, não troca de token. Some-se que as três cores passariam a ser tons da
    MESMA matiz, perdendo a distinção semântica entre elas.
  - **Nada do que está no DssChip depende disto**: ele consome `--dss-action-*`, a família viva. A decisão
    é de sistema (todos os componentes), não do chip.
  - 🔲 **Decidir:** (a) cabear a escala e redesenhar o contraste das variantes claras; (b) manter
    `--dss-action-*` como única via e **remover** `--dss-brand-{secondary,tertiary,accent}`, que hoje só
    sugerem uma capacidade inexistente; (c) manter como está, documentando que são reserva de futuro.

- ✅ **Ponto cego do gate de tokens fantasma — FECHADO** (2026-08-13). O `validate-scss-tokens.cjs` varria
  só `components/`; `themes/` e `tokens/` nunca foram olhados, então o baseline "vazio = qualquer fantasma
  bloqueia" cobria menos do que o nome sugeria. Descoberto via `--dss-brand-primary-hover` (consumido em
  10 lugares de `themes/`, nunca definido — nem no `dist/style.css`; os arquivos de marca definem
  `--dss-brand-hover`, sem o `primary-`). Escopo estendido aos três diretórios + gatilho do pre-commit
  ampliado para `themes/` (sem isso o gate só rodaria por acaso, quando um `.scss` de componente caísse
  no mesmo commit — foi assim que o fantasma sobreviveu).
  - **Baseline agora é POR ESCOPO.** Uma lista plana de nomes faria com que perdoar um fantasma em
    `themes/` o perdoasse também em `components/`, diluindo a garantia de baseline vazio conquistada em
    `b49b6e0`. **Controle negativo verificado:** injetando `--dss-touch-target-min` (baselinado em
    `themes/`) num componente, o gate reprova com exit 1 e rotula `(20× · components)`.
  - 🟡 **Débito novo rastreado: 35 fantasmas em 82 referências** (20 em `utils/`, 11 em `themes/`,
    4 em `tokens/`). Baselinados, não corrigidos — porque **corrigir não é trocar o nome do token**,
    ver abaixo.
  - 🔴 **`utils/` era um QUARTO ponto cego — e o pior deles.** Incluído na mesma onda, revelou **20
    fantasmas**. O caso emblemático: o mixin `dss-touch-target` (`utils/_mixins.scss:63`) tem os **três**
    ramos apontando para tokens inexistentes — `'min'`, `'ideal'` e `'large'`; só a escala `-{xs..xl}`
    existe. **O mixin nunca funcionou.** Mitigante: nenhum componente o invoca — as 3 chamadas vivem
    dentro do próprio `utils/` (`_helpers.scss:311,315` · `_mixins.scss:143`), então o estrago é contido.
    Também reapareceu ali `--dss-focus-ring` (1×), o fantasma de a11y que a onda `b49b6e0` zerou em
    `components/` (27 usos) — `utils/` ficou para trás por estar fora do escopo.
    ⚠️ **VERIFICADO (2026-08-14) — `utils/` NÃO é código morto. A hipótese anterior estava errada**
    (eu havia escrito "majoritariamente código morto"; não é). Medido compilando o fonte atual, porque
    o `dist/style.css` está **defasado desde 25/jun** e mostrava o estado *anterior* ao `b49b6e0`:
    - **Vivo:** importado por `packages/core/index.scss:10` (entry point) **e por 18 SCSS de componente**.
      Cinco arquivos emitem CSS que **chega ao bundle** — `_helpers`, `_colors`, `_colors-hover`,
      `_border-helpers`, `_layout-helpers` (todos os seletores amostrados presentes). Dois mixins são
      load-bearing: **`dss-focus-ring` (16 usos)** e **`dss-transition` (16 usos)**.
    - **Morto:** `_example-showcase.scss` (0/6 seletores no bundle) — e morto **de propósito**, o
      `utils/index.scss` documenta que ele fica fora para não levar CSS de demo à produção.
    - **Morto por símbolo:** **11 dos 16 mixins têm ZERO uso externo** (recontado; o registro anterior
      dizia 12). Usados: `dss-focus-ring` (16), `dss-transition` (16), `dss-button-variant` (1),
      `dss-card` (1), `dss-visually-hidden` (1).
    - 🔍 **POR QUE não são usados — investigado 2026-08-14. Não há causa única; são 4 grupos, e cada um
      pede um desfecho diferente:**

      | Motivo | Mixins | Desfecho indicado |
      |---|---|---|
      | **(b) Substituído por implementação real** | `dss-input-base`→DssInput · `dss-accessible-form`→DssField/DssInput · `dss-accessible-tooltip`→DssTooltip · `dss-accessible-modal`→DssDialog (composed) · `dss-loading-state`→DssSpinner/DssInnerLoading · `dss-validate-contrast`→`scripts/wcag-kit.mjs` | **Remover.** São ancestrais dos componentes — o `dss-input-base` até carrega comentários "refatoração Jan 2025 Sprint 2". Mantê-los é oferecer dois caminhos para a mesma coisa. |
      | **(c) Esquecidos / redundantes com o token direto** | `dss-opacity` · `dss-text` · `dss-touch-target` | **Remover.** O `dss-opacity` inclusive **hardcoda** `0.1/0.2/0.5/0.75` — hoje violaria a Constituição #1 no próprio utilitário que deveria ensiná-la. |
      | **(a) Sem consumidor porque a feature nunca existiu** | `dss-skip-link` | **Decidir:** skip link não existe em lugar nenhum do repo. Ou se implementa (é item real de a11y), ou se remove o mixin órfão. |
      | **(d) Estruturalmente impossível** | `dss-aria-live` | **Remover sem debate.** Escreve `aria-live: polite` **como propriedade CSS** — que não existe. O browser descarta a declaração. Nunca poderia ter funcionado, com ou sem consumidor. |

      ⚠️ **FORENSE DE GIT corrigiu duas afirmações minhas** (2026-08-14). Eu havia escrito que a camada
      de mixins era *anterior* à arquitetura de 4 camadas e que os mixins "perderam o sentido" quando os
      componentes chegaram. **As duas erradas:**
      - Os mixins nasceram em **2026-01-09** (`63e4e07`, "DSS compartilhado") — **o mesmo commit** que
        criou DssInput e DssField. Não são anteriores; são simultâneos.
      - `git log -S "@include <mixin>" --all -- packages/core/components` = **0 para os 11**. Nunca
        foram usados por componente algum, em commit nenhum. Não perderam adoção: **nunca tiveram**.
      - Confirmado o vício de data escrita à mão que o dono apontou: o `dss-input-base` diz "refatoração
        Jan **2025** Sprint 2" e é de Jan/**2026**. O 1º commit do repo (`bebc3a2`, "2025-01-01") é um
        template com data default; o trabalho real começa em 2026-01-08.
      **Enquadramento correto:** não é legado que envelheceu, é **andaime especulativo escrito no
      bootstrap e nunca ligado**. Os componentes que hoje cobrem o papel vieram *depois*
      (DssTooltip 02/26, DssSpinner 03/26, DssDialog 05/26, wcag-kit 07/26) — tornaram os mixins
      redundantes de forma retroativa, mas eles já estavam sem uso antes disso.
  - ✅ **HIGIENIZAÇÃO EXECUTADA** (2026-08-14). **11 mixins removidos**; sobraram os 5 com uso real
    (`dss-focus-ring`, `dss-transition`, `dss-button-variant`, `dss-card`, `dss-visually-hidden`).
    - **Chamadas órfãs consertadas, não removidas:** `dss-button-variant` invocava internamente
      `dss-touch-target('ideal')` — ou seja, o único mixin de botão do DSS embutia uma declaração vazia.
      Passou a declarar `--dss-touch-target-md` direto.
    - **2 classes utilitárias públicas removidas:** `.dss-touch-target` e `.dss-touch-target-ideal`
      (mais `::after`). Eram API que não entregava nada; **ninguém as aplica no repo** (verificado) e
      remover é no-op visual — o que já não pintava, sumiu.
    - **`--dss-border-error`/`-success` → `-negative`/`-positive`** em `_border-helpers` e `_helpers`.
      Os nomes certos sempre existiram (o DSS segue a convenção semântica do Quasar); os utilitários
      citavam nomes inventados. Mesmo padrão do `--dss-error-*`→`--dss-feedback-error*` de `b49b6e0`.
    - **MEDIDO no bundle compilado: 29 → 15 declarações quebradas** em produção. As 15 restantes são
      todas `--dss-touch-target-min` vindas de `themes/` (`.q-btn`, `.q-tab`, `.q-item`, `.q-chip`,
      `.dss-pagination__item`) — é a decisão separada, que **muda layout** e por isso não entra aqui.
    - Baseline de fantasmas: **35 → 27** pares (utils 20→12). Gates: type-check 0 · scss-tokens sem
      novo · estrutura · api-docs 0 · `--all --strict` 78 · vitest 208/208.
    - 🔲 **Sobra decidir:** `dss-skip-link` foi removido como órfão, mas **skip link é item legítimo de
      a11y e não existe em lugar nenhum do repo** — implementar de verdade continua em aberto.
    ⚠️ **Risco assumido:** `utils/index.scss` faz `@forward` dos dois arquivos, então os mixins eram
    **API pública**. Dentro do repo o uso era 0 e todos resolviam para vazio ou eram inválidos; o risco
    residual é consumidor externo que os incluísse — e receberia CSS vazio de qualquer forma.
    - 🔴 **27 declarações QUEBRADAS chegam ao CSS de produção** (contadas no bundle compilado agora):
      `--dss-touch-target-min` 19× · `-ideal` 4× · `--dss-touch-spacing-min` 2× · `--dss-border-error`
      e `-success` 2×. Destas, **4 são classes utilitárias públicas de `utils/_helpers.scss`** —
      `.dss-touch-target`, `.dss-touch-target-ideal` e seus `::after`: **quem aplicar
      `class="dss-touch-target"` não recebe nada.** O resto vem de `themes/` (`.q-btn`, `.q-tab`,
      `.q-item`, `.q-chip`, `.dss-pagination__item`, `.dss-sidebar-accessible …`).
    🔲 **Decidir, agora com base medida:** as 4 classes utilitárias públicas quebradas são o alvo de
    maior valor (baixo risco, some código que promete e não entrega). Os 12 mixins sem uso são candidatos
    a remoção, não a conserto — consertar símbolo sem consumidor é maquiagem (o erro já evitado no
    `brand/index.scss`, T4 BLOQUEADO).

- 🟡 **`dist/style.css` DEFASADO ~2 meses** (25/jun contra commits de ago) — descoberto ao investigar
  `utils/`. Quem inspecionar o `dist` lê o estado **anterior** ao `b49b6e0`: ele ainda mostra
  `--dss-focus-ring` 27×, o fantasma de a11y já zerado no fonte. Não é bug de código, é artefato de
  build versionado e não regenerado. **Decidir:** regenerar no CI a cada merge, ou parar de versionar o
  `dist` (o mesmo raciocínio já aplicado ao `build/` do MCP em `47a8182`).

- 🟡 **Estilo de componente morando em `themes/` — metade resolvida** (2026-08-14). O que parecia "mover
  para as 4 camadas" era outra coisa: **`.dss-pagination__item` NUNCA é emitida** — o
  `usePaginationClasses` produz `.dss-pagination` e modificadores, e nada no repo escreve `__item`. Quem
  desenha os botões é o QPagination. Eram **38 linhas de CSS morto** (com `--active`/`--disabled`),
  removidas.
  - 🔲 **Sobra um conflito real, deixado de propósito:** a regra raiz `.dss-pagination` em
    `themes/_quasar-utilities.scss` **colide** com a do componente
    (`DssPagination/2-composition/_base.scss:6`) — mesma especificidade (0,1,0). O `display` do
    componente vence por ordem de import (`themes` é importado antes de `components` em
    `packages/core/index.scss`), mas o **`margin-top: var(--dss-spacing-6)` do themes NÃO é sobrescrito**,
    porque o componente não declara margem. Resultado: 24px de margem superior injetados em todo
    DssPagination, invisíveis para quem lê o SCSS do componente. **Remover MUDA espaçamento de páginas
    existentes** → decisão com verificação visual, não higiene. *(Margem no root do próprio componente é
    anti-padrão — layout é do consumidor —, o que sugere remover; mas a decisão é do dono.)*
  - Verificar se há outros casos ao passar por cada componente na onda de adequação.
    - ✅ **Divergência 48px × 44px — RESOLVIDA na fonte normativa** (2026-08-13). A Constituição #4 do
      `CLAUDE.md` exigia "≥ 48px", valor que **não existe na escala** (32/36/44/52/64) e que vinha do
      Material, não do WCAG. Os componentes sempre entregaram 44px (`--dss-touch-target-md`), e a
      divergência estava mascarada por comentários `/* 48px */` escritos ao lado do token de 44.
      **A decisão já existia:** o selo do DssInput registrava como risco **R-04** que "governança definiu
      44px" e pedia "alinhamento de CLAUDE.md na próxima revisão normativa" — ação que nunca ocorreu.
      Agora: `CLAUDE.md` corrigido para 44px + **19 citações do token fantasma e 46 valores `48px`**
      corrigidos em Checkbox/Radio/Toggle/Chip (`.md`, `README`, `_base.scss`), mais **10 citações e 11
      valores nos SELOS** desses quatro — eram afirmação falsa em documento de certificação.
      ✅ **Varredura estendida (2026-08-13):** `DSS_CATALOG_2026.md` · `dss_system_handoff_v_2.md` ·
      e os **5 normativos de Nível 1/2** — `DSS_TOKEN_REFERENCE` (7), `DSS_COMPONENT_ARCHITECTURE` (20),
      `DSS_ARCHITECTURE` (6), `DSS_IMPLEMENTATION_GUIDE` (23), `DSS_UI_RULES` (1). Estes eram os que
      mais importavam: são o que o agente lê ao **criar componente do zero**, e ensinavam
      `@include dss-touch-target('ideal')` — o mixin que nunca funcionou.
      - **Não foi busca-e-troca.** Dos 11 hits do TOKEN_REFERENCE, **4 eram 48px legítimos**
        (`--dss-spacing-12`, `--dss-layout-header-height-dense`, `--dss-icon-size-xl`,
        `--dss-switch-track-width-sm`) e ficaram. Vários exemplos tinham `min-height: 48px` **hardcoded**,
        violando Token First — passaram a usar o token.
      - **Correção de norma, não só de número:** `DSS_UI_RULES` afirmava "48x48px (WCAG 2.5.5) **ou**
        44x44px (WCAG 2.1 AA)" — duplamente errado. 44×44 é o WCAG **2.5.5**, nível **AAA**; o WCAG 2.1
        **não tem** critério de alvo em AA (o 2.5.8, 24×24 em AA, é do WCAG 2.2); e 48px é Material, não
        WCAG. Mesma imprecisão corrigida em `--dss-min-h-md`, que é 48px legítimo (piso do **MD3**) mas
        se anunciava como "piso MD3/**WCAG 2.5.5**".
      - **Cadeia respeitada:** a descrição de `--dss-min-h-md` vive em `tokens/semantic/_dimensions.scss`
        e alimenta tabela AUTO-GENERATED; corrigi na **fonte** e rodei `sync:tokens-to-reference`.
      🔲 **Sobra:** selos de outros componentes (DssBar, DssItem, DssFab, DssExpansionItem,
      DssChatMessage, DssSlideItem), `pre-prompts/`, `audit-prompts/` e `specs/`. `docs/archive/` e
      `docs/audits/` **não** devem ser reescritos — são registro do que se acreditava à época.
    - ✅ **`--dss-touch-target-min` em `themes/` — RESOLVIDO por REMOÇÃO** (2026-08-14). A guarda de
      WCAG 2.5.5 nunca funcionou (a escala é `xs/sm/md/lg/xl`; `-min` não existe), então
      `.q-btn { min-height: … !important }` era no-op. **Verificado antes de mexer: era REDUNDANTE** —
      DssButton, DssItem, DssTab e DssChip declaram o próprio alvo com token real. Removidas as 15
      declarações (`.q-btn`, `--sm`, `--lg`, `.q-tab`, `.q-item`, `.q-chip`, paginação de tabela,
      `.dss-sidebar-accessible`) e as 5 variáveis Sass de `quasar.variables.scss` (nenhuma consumida).
      ⚠️ **Não foram apontadas para `--dss-touch-target-md`**: isso as tornaria vivas e mudaria altura
      em cascata. **Provado no bundle compilado que a remoção é no-op**: diff sem comentários mostra
      APENAS as declarações inválidas saindo — `touch-target-min` no CSS entregue foi de **15 → 0**.
    - ✅ **`--dss-input-height-min` — RESOLVIDO** (2026-08-13), o bug de
      `[[project_qfield_height_token_bug]]`, que até agora não tinha gate. **A regra foi REMOVIDA, não
      reapontada.** Medido `min-height: 0px` no navegador: o `!important` nunca aplicou nada, então
      remover não mudou pixel algum — Select 54 campos (38–48px), Textarea 52 (36–122), File 49 (36–69),
      idênticos antes e depois. ⚠️ **Não apontar para `--dss-form-control-height-md` (44px)**: isso a
      tornaria viva e forçaria 44px em todo `.q-field__control`, atropelando a escala densa que o próprio
      DSS oferece (`-xs` 32px, `-sm` 36px) — os 4 campos hoje em 36–38px são exatamente as densas.
      O comentário `KEEP: load-bearing` que a acompanhava era falso e saiu junto. *(Nota: DssInput foi
      reconstruído com DOM próprio — `dss-input__control` — e não passa por `.q-field`; o alcance da regra
      era só Select/Textarea/File.)*
    - Demais: `--dss-brand-primary-hover`, `--dss-{button,input}-padding-{x,y}`,
      `--dss-radius-{button,input,card,modal}`, `--dss-touch-target-ideal` (themes) e
      `--dss-opacity-{8,12,16,24}` (tokens — quebram a cadeia de `--dss-opacity-brand-*`).

- 🟡 **Decisão: label flutuante vs estática** — Material (flutuante, atual) vs shadcn/Make (estática acima).
  Usuário optou por **manter flutuante por enquanto**. `[[project_make_vs_dss_contrato_visual]]`.
- 🟡 **Consolidação documental (5→1)** — `COMPONENT_PAGE_STRUCTURE` já absorve 5 docs; **remoção física**
  dos superados é etapa pós-POC, ainda não executada. `[[project_sandbox_source_of_truth]]`.
- 🟡 **`example.vue` non-normativos (90)** — rotular como demo ilustrativo (item M do blueprint); backfill
  de prosa verificável (a11y) por componente é parte de (a). `[[project_sandbox_source_of_truth]]`.
- 🟡 **Adequação LLM-eficiente dos 4 docs-gigantes de referência** — `DSS_IMPLEMENTATION_GUIDE` (3059 linhas),
  `DSS_TOKEN_REFERENCE` (2338), `DSS_COMPONENT_ARCHITECTURE` (2084), `DSS_ARCHITECTURE` (1591) carregam o vício
  de acreção/lista-plana que o CLAUDE.md já superou. **Fora do caminho crítico da adequação de base** (o Roteador
  manda o agente ao checklist de 208 linhas, não a eles) — mas **tratar ANTES de reabrir "criar componente do
  zero"**, que é quando o agente realmente os lê. Ref.: `PROPOSTA_READEQUACAO_CLAUDE_MD.md` (mesma tese: núcleo
  enxuto + gates + índice para lookup). `[[project_claudemd_higiene]]`.

- 🔴 **Eixo visual da adequação — cobertura muito abaixo da regra** (medido 2026-08-11;
  **recontado do disco em 2026-09-02**, com 3 correções — os números anteriores estavam errados). O
  `DSS_UI_ADEQUACAO_CHECKLIST.md` exige, por componente adequado, **página Playground**
  (`apps/sandbox/src/Test‹Nome›.vue`) **e** **Preview Frame** registrado — é o que torna possível a
  análise visual, o passo que FECHA a adequação.

  📖 **Quadro completo, componente a componente: [`DSS_ESTADO_ADEQUACAO_UI.md`](DSS_ESTADO_ADEQUACAO_UI.md)**
  — **gerado por script** (`npm run build:adequacao-status`) a partir de `CERTIFIED_COMPONENTS.md` +
  `TestSuite.vue`. **Não recontar à mão:** foi assim que os números abaixo apodreceram. Há
  `npm run validate:adequacao-status` (exit 1 se o quadro estiver defasado) para virar gate quando
  se decidir o ratchet.

  | Fase | Componentes | Adequados | Só frame | Só playground | Não iniciados |
  |---|---|---|---|---|---|
  | 1 — Atômicos | 20 | **9** | 0 | 3 | 8 |
  | 2 — Compostos | 68 | **2** | 0 | 1 | 65 |
  | **Total** | **88** | **11** | 0 | 4 | 73 |

  - **Adequados (11):** Chip, Input, Select, Textarea, File, Checkbox, Radio, Toggle, EmptyState
    (Fase 1) · Field, Uploader (Fase 2).
  - **Só Playground (4)** — falta o Preview Frame: **DssAvatar, DssBadge, DssButton, DssCard**. Se a
    fila for ordenada por menor esforço, **começa aqui**.
  - **Só Preview Frame: zerado** (set/2026). Era o `DssUploader` — tinha o frame e não tinha página.
    `TestUploader.vue` foi criado (11 seções sobre a API real, template Playground) e o frame dele
    saiu da seção temporária de topo do `TestSuite.vue` para debaixo do componente, em Campos, como o
    comentário do próprio arquivo instruía. Sobrou lá só o `DssMultiselectAutocomplete` (Fase 3).

  **Correções em relação à contagem de 2026-08-11:**
  1. **São 12 Preview Frames, não 11** — faltava o `DssEmptyState`. (11 pertencem a componentes de
     Fase 1/2; o 12º é o `DssMultiselectAutocomplete`, que é Fase 3 e não entra neste placar.)
  2. **O do `DssInput` usa a chave SEM sufixo** (`activeComponent === 'preview-frame'`, por ter sido o
     primeiro) — escapa de qualquer busca por `preview-frame-*`. Cuidado ao recontar por grep.
  3. **A base são 88 componentes de Fase 1/2, não 76**, e há **15** páginas Playground (não 13).
  4. **Preview Frame ≠ adequado.** Ao automatizar, o script separou o `DssUploader`: ter frame não
     implica ter Playground. A contagem manual anterior somava os dois artefatos como se fossem um,
     e por isso dizia 11 adequados onde são **10 + 1 caso à parte**.

  - Não é dívida de um componente: é a regra valendo só onde a adequação já passou. **Cada componente
    adequado daqui em diante entra com os dois** — e a fila de não-adequados carrega o resto.
  - ⚠️ **Sem gate automatizado.** Hoje é item de checklist marcado à mão — e o quadro acima é
    **derivado da presença dos artefatos em disco**, que é o sinal mais confiável disponível, mas é
    inferência, não selo. Um gate desses reprovaria **78/88** de saída, então precisaria de
    baseline/ratchet como o de tokens fantasma. **Decisão pendente:** construir o ratchet ou manter
    curadoria manual. *(O `validate:adequacao-status` já existe, mas gateia a **frescura do quadro**,
    não a cobertura — são coisas diferentes.)*
  - ⚠️ **Não chamar esse gate de `validate:portal-pages`** — o nome JÁ EXISTE e significa outra coisa:
    `scripts/validate-portal-pages.cjs` (no pre-commit, §3c) valida as páginas **React do docs-portal**
    (`apps/docs-portal/src/pages/components/‹Comp›Page.tsx`) para componentes **SELADOS**. Eixo diferente
    (portal ≠ sandbox; selado ≠ adequado). Um gate do eixo visual precisa de outro nome
    (ex.: `validate:sandbox-pages`), senão colide.

- ✅ **`modelValue` não admitia os valores de `trueValue`/`falseValue` — RESOLVIDO** (`17715e9`,
  2026-08-11) em **DssCheckbox E DssToggle** — a verificação pedida confirmou que o Toggle tinha o mesmo
  defeito. Tipo alargado para `any`, espelhando o Quasar (`model-value`: `Any | Array`); o **DssRadio já
  era `any`**, então o fix alinhou a família ao irmão. Não-breaking (só admite mais).
  **Nuance que vale reter:** o comportamento sempre esteve correto — os testes já exerciam
  `modelValue: 'no'` + `trueValue: 'yes'` e **passavam**, porque Vue warn não reprova o vitest. O defeito
  era só o runtime check que o compilador do Vue deriva do tipo. Por isso o teste de regressão asserta
  sobre o **warn** (`console.warn` espiado, filtro `Invalid prop`), não sobre o comportamento — com
  controle negativo verificado. Console real conferido no sandbox: zero warn.
  ⚠️ **Padrão a generalizar:** qualquer prop tipada estreita cujo valor venha de outra prop `any`
  (`val`, `trueValue`, `falseValue`, `indeterminateValue`) tem esse mesmo risco. Vale varrer a base na
  Onda Higiene — o sintoma é silencioso em teste e só aparece no console.

- ✅ **`leftLabel` não funcionava em DssRadio e DssToggle — RESOLVIDO** (`64cf911`, 2026-08-11). A label
  seguia à direita. Causa: **dupla-inversão** — o template já renderiza a label ANTES do controle quando
  `leftLabel=true`, e o CSS revertia de novo com `flex-direction: row-reverse`. Duas inversões se
  cancelam. **O DssCheckbox já tinha corrigido isso** e carrega o comentário de aviso no `_base.scss`;
  Radio e Toggle nasceram com a regra CSS e ganharam a inversão no template depois. O comentário foi
  replicado nos dois para o próximo da família não reintroduzir.

- 🔴 **MODO DE FALHA RECORRENTE DE TESTE: asserção sobre PROXY, não sobre RESULTADO** (2 casos em
  2026-08-11, vale varrer na Onda Higiene). Os dois defeitos acima tinham teste passando:
  - `leftLabel`: o teste afirmava `classes()).toContain('dss-*--left-label')` — a **classe aplicada**,
    não a **ordem real**. A classe existia; o layout estava errado.
  - `modelValue`: o teste exercia o valor customizado, mas Vue warn não reprova o vitest.
  **Regra prática:** asserte o efeito observável (ordem no DOM, o warn, o atributo final), não o
  intermediário que você mesmo produziu. **Limite honesto a respeitar:** jsdom não aplica SCSS — defeito
  que mora só no CSS (como o `row-reverse`) **não é capturável em teste unitário**; quem o pega é o
  `dss.contract.json` (derivado do SCSS, versionado → aparece no diff) e a verificação visual. Isso
  reforça o item do eixo visual acima: ele não é redundante com os testes, cobre o que eles não alcançam.

- 🟡 **Contrato visual do DssToggle MUDOU** (2026-08-12) — reformulação aprovada pelo dono para alcançar a
  qualidade visual do QToggle **com tokens DSS**. Fonte: `node_modules/quasar/src/components/toggle/QToggle.sass`
  (v2.19.3), lida direto em vez do site. O que mudou:
  - **Proporção:** o thumb passou a ser MAIOR que a espessura do trilho (md: 20px sobre 14px, 1:1,43 — a
    razão exata do Quasar). Antes era 16px dentro de um trilho de 20px. Vale nas 5 variantes (1,33–1,50).
    A altura visual do componente virou a do thumb, que coincide com o control do DssCheckbox → o
    alinhamento em linha de formulário se preservou.
  - **Trilho:** de sólido `surface-muted` + borda 2px para **translúcido** via `color-mix` (40% desligado,
    55% ligado), sem borda. `opacity` não serviria: no DSS o thumb é FILHO do trilho (no Quasar são irmãos).
  - **Thumb:** ganhou elevação (`--dss-shadow-sm`) e **inverteu a lógica de cor** — branco no desligado,
    sólido na cor no ligado (antes: cinza no desligado, branco no ligado).
  - **Hover:** o `filter: brightness(0.95)` no trilho saiu; entrou halo no THUMB (anel translúcido de meio
    thumb via `box-shadow`, dobrando o diâmetro aparente). Feito com sombra e não com pseudo-elemento
    porque `::before` é reservado ao touch target e um `::after` pintaria por cima do próprio thumb.
  - ⚠️ **`4-output/_brands.scss` do Toggle foi esvaziado** (o arquivo permanece pela arquitetura de 4
    camadas). As regras de lá pintavam o trilho SÓLIDO e, por especificidade, venciam a L2 nova — além de
    cobrirem só 3 das 8 cores. A cor de marca já chega pela L2 via `--dss-action-*`, que é brand-aware.
    **O mesmo esvaziamento cabe em DssCheckbox e DssRadio** (lá é só redundância, não conflito) — pendente.
  - 🔍 **`DSS_VISUAL_DEFAULTS_STANDARD.md` NÃO EXISTE** e é citado como autoridade em 4 arquivos SCSS
    (DssButton ×3, DssToggle ×1). O `PROMPT_DIRECIONADOR_CONSOLIDACAO_CONTRATO_VISUAL.md` previa mesclá-lo
    no canônico e arquivar, e a referência ficou pendurada. **Decidir:** recriar, ou reapontar as 4 citações
    para o doc que absorveu o conteúdo.

- 🟡 **Meio pixel: `line-height` sem unidade gera altura FRACIONADA e desalinha controle circular**
  (achado 2026-08-12, investigando "o ponto do DssRadio está torto"). **A geometria do componente estava
  exata** — a 5× de zoom os círculos são concêntricos e redondos em todos os tamanhos, e o ponto centra em
  offsets inteiros. O artefato era de **rasterização**: a página do playground posicionava as linhas em
  Y fracionado (`.875` numa seção, `.188` noutra), e círculo em meio pixel antialiasa torto. Isso explica a
  anomalia que abriu o caso: SM e MD têm o MESMO tamanho e pareciam diferentes — estavam em **fases
  sub-pixel diferentes**.
  - **Origem:** `line-height: 1.2` hardcoded no `pg-section__title` (16px × 1,2 = 19,2px). A fração subia
    pelo cabeçalho da seção e empurrava tudo abaixo. Corrigido para `--dss-line-height-tight` (1,25 → 20px):
    os 86 controles da página passaram de **todos** fracionados para **zero**.
  - ⚠️ **O problema é sistêmico, não do sandbox.** Vários pares token×tamanho do próprio DSS dão altura
    fracionada — `xs`(1,4)×16px = 22,4 · `sm`(1,45)×14px = 20,3 · `lg`(1,55)×16px = 24,8 · `xl`(1,6)×16px =
    25,6 · `tight`(1,25)×14px = 17,5 · `snug`(1,375)×14px = 19,25. Onde isso cair acima de um radio/toggle,
    o círculo volta a rasterizar torto. **Só `--dss-line-height-normal` (1,5) é seguro em toda a escala de
    fontes** (12/14/16/20/24 → todos inteiros).
  - ✅ **RESOLVIDO pela rota C** (2026-08-12): escala pareada em px. Ver entrada abaixo.

- ✅ **Rota C — escala de `line-height` pareada em px — CONCLUÍDA** (2026-08-12). Substitui as razões
  sem unidade que fracionavam. **Achado que reduziu o escopo pela metade:** `normal` (1,5) é a ÚNICA razão
  segura em toda a escala — todas as font-sizes do DSS são pares, então 1,5 sempre fecha inteiro. Ela
  NÃO foi depreciada e continua sendo a ferramenta certa para elemento cujo font-size **varia por
  variante** (ex.: label de Checkbox/Radio/Toggle, de 12px no xs a 18px no xl) — px fixo estaria errado ali.
  Assim, dos 54 usos só **13 eram inseguros** e precisaram migrar; os 39 de `normal` ficaram como estavam.
  - **Novos tokens:** tier confortável (`--dss-line-height-{xs,sm,md,base,lg,xl,2xl,3xl,4xl}`, = 1,5 em px)
    e tier compacto (`--dss-line-height-{xs,sm,md,lg,xl}-tight`, ~1,25), mais `--dss-line-height-md-relaxed`
    (26px) para o único uso relaxado (DssCard), que já era inteiro.
  - **Valores escolhidos preservando o que já renderizava inteiro** — a migração é quase inerte. Único
    delta real: `tight`×14px de 17,5 → 18px, em Button, Chip, Tab e Item.
  - **Medido antes×depois** nos 89 componentes do Defaults Preview: line-heights fracionados **36 → 12**, e
    os 12 restantes são do QUASAR (razões 1,715 e 1,2), não do DSS. Alturas de componente inalteradas
    (button 44, chip 28 — `min-height` domina); `dss-tab` passou de 20,3 para 21 e `dss-tabs` de 21,3 para 22
    (ambos saíram de fracionário para inteiro).
  - 🟡 **Depreciados, ainda definidos:** `tight`, `snug`, `relaxed`, `loose` — consumo interno ZERO, mantidos
    para não quebrar consumidor externo. **Remover quando houver certeza de que ninguém fora do repo usa.**
  - ⚠️ **Resíduo de terceiros:** os 12 fracionados restantes vêm do CSS do Quasar. Não dá para corrigir por
    token; se algum deles cair acima de um controle circular, o remédio é local (fixar o line-height naquele
    ponto), não sistêmico.

## Verificar (pode já estar resolvido)

- 🔍 **`DssResponsive`** — lista scope-props do slot default como slots (baixa prioridade). Mesmo arquivo.

## Frente em curso

- 🔴 **Gates de componente no MCP** (branch `work/dss-selection-controls`, **empurrado em 2026-08-31**
  nos dois remotes; MR !8 aberto no GitLab). Commits
  `a2722fe`→`4460c93`: Gate Estrutural (4 camadas, wrapper puro, barrel, orquestrador) · escopo do gate de
  higiene por REGRA e não por arquivo · `validate_component_code` implementa o regime de exceções da
  Constituição #1 (fallback de `var()`, px em `@media`/`@container`, bloco `forced-colors`) · Token First
  escopado às camadas de ESTILO (`2-composition`/`3-variants`/`4-output`), mesmo contorno do grep do DoD —
  o `<style>` de `.example.vue` é andaime de demo. Gate de Composição (`:deep()`) segue valendo em TODO
  arquivo. Medido: DssChip 7→0, DssMultiselectAutocomplete 2→0, DssSelect 0 — o ruído acabou.
  **Runner de teste criado** (`packages/mcp` não tinha nenhum): vitest, `npm test`, 8 casos, fixture
  = dssRoot em miniatura sob `tests/fixtures/` (fora de `components/`, senão viraria componente-fantasma
  em catálogo/contrato/selo). Controle negativo verificado.
  - ⚠️ **`build/` do MCP precisa de rebuild + RESTART do servidor** para o comportamento novo valer na tool
    — `build/` deixou de ser versionado em `47a8182`, então cada clone/sessão reconstrói.
  - 🔲 **Hardcode real descoberto pelo validador limpo** (agora que não há ruído): **DssButton 12**
    (`3-variants/_glossy.scss`, `_push.scss`, `4-output/_states.scss`) e **DssInput 1**
    (`2-composition/_base.scss`). São candidatos DENTRO das camadas de estilo → **Onda Higiene**.
  - 🔲 **`tests/validateGridLayout.test.ts` fora do runner** — anterior a ele: script de console que
    imprime em vez de asserir; sob vitest falharia por não declarar suíte. Converter ou aposentar.
  - 🔲 **`tests/` não é type-checked** — `tsconfig.json` do MCP tem `include: ["src/**/*"]` + `rootDir: src`;
    o vitest transpila sem checar tipo. Erro de tipo no `.spec.ts` passa batido.

- ⏳ **MR !6 — consistência da família de campos** (`work/dss-continuidade` → `main`, aberto 2026-07-22).
  16 commits: brand no anel de foco (rotas A/B + dark), label×placeholder padrão B, base font 16 + ícone
  20px + paridade pixel-perfect do prepend, slot `error` fiel ao `getBottom` do Quasar, anel de foco do
  DssFile, + Preview Frames Textarea/Field e seletor de ícone no sandbox. Gates verdes, testes 5/5.
  Reviewer `@joao-henrique.vieira`; aguardando review + CI.

- ✅ **Família Controles de Seleção — FECHADA** (2026-08-12, branch `work/dss-selection-controls`).
  Fechamento em duas ondas: **paridade de API** (jul/ago) e **qualidade visual** (ago/12), esta última
  disparada pela comparação com os controles do Quasar. Gates no fechamento: vitest 222/222 nos três ·
  SCSS compila · `--all --strict` exit 0 (78) · api-docs 0 divergência · type-check 0 · tokens fantasma 0 ·
  estrutura 91/91 · barrels · variant-naming · field-conventions. Os três têm página Playground e
  Preview Frame (o eixo visual que o checklist exige).
  - **Correções de contrato:** `modelValue` passou a admitir os valores de `trueValue`/`falseValue`
    (`17715e9`) · `leftLabel` voltou a funcionar no Radio e no Toggle — dupla-inversão template×CSS
    (`64cf911`) · dark mode passou a seguir `[data-theme]` e não `prefers-color-scheme` (`14a8b37`) ·
    `error` implementado no Checkbox, que não tinha a prop (`bd772c6`) · erro passou a PREENCHER em vez de
    só contornar (`485a744`).
  - **Cor brand-aware** (`6bdcc92`): a cor saiu das utilities do Quasar (não brand-aware e `!important`
    em layer) para o SCSS do DSS com `--dss-action-*`. Sob brand GLOBAL o fundo ficava azul fixo com ícone
    laranja. Consequência: **`4-output/_brands.scss` dos TRÊS ficou sem regras de cor** — era redundante
    (a L2 já resolve as 8 cores nos dois caminhos) e em parte inerte. Os arquivos permanecem pela
    arquitetura de 4 camadas.
  - **Qualidade visual** (`c04d42b`, `43a22f1`, `e489846`): Toggle reformulado com as proporções do
    QToggle (thumb maior que o trilho, trilho translúcido, elevação, halo, thumb branco↔colorido) ·
    halo de hover/foco no Checkbox e no Radio no lugar do `brightness(0.95)` chapado · Radio com
    **geometria proporcional** — anel 8,3%, ponto 50%, folga 16,7% em todos os tamanhos, as mesmas razões
    do SVG do QRadio.
  - 🔍 **Aprendizados que valem para os próximos componentes** (não são débito deste, são método):
    - Teste que asserta PROXY (classe aplicada) passa com a feature quebrada — asserte o resultado.
    - `border-width` é arredondado para pixel inteiro pelo navegador; espessura fracionada exige
      `box-shadow: inset`.
    - Proporção que não escala junto (borda fixa contra dimensão variável) faz cada tamanho virar um
      desenho diferente — foi o defeito real do Radio, e o mesmo risco existe em qualquer componente com
      borda fixa e 5 tamanhos.
    - Medir contra o elemento pai esconde deslocamento absoluto; medir a fração da posição na tela.

- ✅ **DssChip — adequação de UI FECHADA** (2026-08-13, `9965b90` · `8262f83` · `97c517e`). Entra com os
  dois itens do eixo visual (Playground + Preview Frame), como a regra passou a exigir.
  - **Altura fiel à escala de compact control.** O `lg` estourava o token — padding vertical `spacing-2`
    (8px) + fonte 16px davam **34px** contra os 32px de `--dss-compact-control-height-lg`. Causa de fundo:
    o `line-height` era declarado UMA vez na base, pareado com 14px, e os modificadores trocavam só o
    `font-size` — o par só fechava no `md`. Cada tamanho passou a declarar o seu par, usando a escala
    compacta em px da Rota C. Medido: **20 / 24 / 28 / 32**, todos inteiros (não reintroduz a rasterização
    fracionada de `ae81a89`).
  - **`.bg-neutral` não seguia o tema** — usava o primitivo `--dss-gray-100`, que não inverte, enquanto o
    par `.text-neutral` usa `--dss-text-primary`, que inverte. No dark: fundo #fafafa com texto #f5f5f5,
    **1,04:1 medido** — o chip sumia. Com `--dss-surface-subtle`: **7,17:1** no dark e 9,19:1 no light
    (inalterado). Raio de alcance conferido: a classe só é emitida pelo `useChipClasses`; Select e
    MultiselectAutocomplete herdam o fix por comporem `<DssChip color="neutral">`.
  - 🔍 **Padrão a generalizar:** par de utilitárias em que o **fundo é primitivo e o texto é semântico**
    quebra em dark por construção. Vale varrer as demais `.bg-*`/`.text-*` de `_quasar-overrides.scss`
    na Onda Higiene — o sintoma é invisível no light, que é onde quase toda inspeção acontece.
  - **`PgTile` ganhou `align`** (opt-in; default `stretch` inalterado). Detalhe que custou tempo:
    `inline-flex` no root **não** protege — item de flex é blockificado, então o componente estica assim
    mesmo; só o alinhamento do stage resolve. Verificado que os 8 consumidores existentes não regridem.
  - **2ª rodada (2026-08-13, `36bf0fe` · `de4ca8b` · `19367c0`)** — três achados do dono, dos quais
    **um era CSS stale** (`dense` "mais alto": medido 24px contra 28px, sempre esteve certo). Fica o
    lembrete de método: no WSL2 o HMR falha em `/mnt/c`, então **hard refresh antes de reportar** —
    mas o hard refresh **zera os knobs do Preview Frame**, o que fez um defeito real *parecer* resolvido.
    - **`round` removida** (breaking, uso em produção zero). Vinha `true` de fábrica e aplicava regra
      byte-idêntica ao default da base: inerte ligada **e** desligada. O QChip também só tem `square`.
    - **Cor tinha DUAS fontes** → dois defeitos. Com `brand` + 6 das 9 cores nada casava e o chip ficava
      **preto** (`rgb(0,0,0)` medido); e o **ícone era sequestrado** pela marca. Unificado em
      `3-variants/_colors.scss` (9 cores); `_brands.scss` esvaziado, como já ocorrera na família.
    - 🔍 **ACHADO SISTÊMICO — `[data-brand] .dss-icon` é regra GLOBAL.** Mora em
      `DssIcon/4-output/_brands.scss` e casa **direto no elemento** do ícone (0,2,0), vencendo qualquer
      cor apenas **herdada** do componente pai. Sob marca global, um `filled` ficava com fundo e ícone
      na mesma cor — o glifo sumia. **Qualquer componente que componha `DssIcon` e conte com herança
      para colorir o ícone tem esse defeito**, e ele é invisível sem marca ativa. O DssCheckbox já o
      havia encontrado e documentado o remédio (declarar a cor no próprio ícone, ≥3 classes de
      especificidade); Chip é o segundo caso. **Vale varrer a base na Onda Higiene** — o candidato
      natural é todo componente com prop de ícone. *(Alternativa de fundo, mais limpa e mais arriscada:
      restringir a regra global do DssIcon a ícones que não estejam dentro de outro componente DSS.)*
    - ⚠️ **Correção de premissa registrada:** eu havia escrito que as 4 cores de AÇÃO acompanham a
      marca. **Não acompanham** — `tokens/brand/_{hub,water,waste}.scss` declaram `secondary`,
      `tertiary` e `accent` como "Mantém … semântico" nas três marcas; **só `--dss-action-primary` é
      remapeada**. Quem governa isso é o token, não o componente.

- ⏳ **Histórico da família (contexto das decisões acima)** (branch `work/dss-selection-controls`).
  **DssCheckbox fechado** (4 commits `816ed41`→`fba32a2`): leftLabel (dupla-inversão template×CSS),
  example §12 (estado inicial vazio→variedade), `defineExpose(focus/blur/toggle/inputRef)` (paridade
  campo), Preview Frame nascia indeterminate (seed `null`==`indeterminateValue:null` → semear do
  `@default` do vModel via contrato), `size="xl"` (28px, token). Preview Frame + TestCheckbox
  feitos. **DECISÕES DO DONO RESOLVIDAS + IMPLEMENTADAS (2026-07-24, ainda não commitado):**
  - ✅ **Props de ícone → escopo `checked`+`indeterminate`** (CCI §7, mudança aditiva). `checkedIcon`
    (`'check'`) e `indeterminateIcon` (`'remove'`) compostos via `DssIcon`; desmarcado permanece vazio
    (SEM `unchecked-icon`). Template usa `:name` binding. **`size` px arbitrário = REJEITADO POR TIPO**
    (união literal `xs|sm|md|lg|xl`, não `string`) — precedente da família registrado.
  - ✅ **`keepColor` adotado** (escape hatch opt-in; default cinza inalterado). Impl. em 3 camadas: type
    `keepColor?: boolean`; composable adiciona classe `dss-checkbox--keep-color` no root + `text-{color}`
    no control desmarcado (non-brand); `_brands.scss` estende o mixin p/ colorir o stroke desmarcado por
    variante (primary/secondary/accent) atrás de `.dss-checkbox--keep-color`. Racional/mecanismo detalhado
    ↓ resolvidos. **A11y:** 3:1 (WCAG 1.4.11) por brand×tema continua exigido; `forced-colors` vence.
  - **Gates (75 testes, +12):** SCSS compila · vitest 75/75 · @import/Material Icons/hardcode limpos ·
    contrato re-emitido (18 props, schema-válido, a11y 4) · `--all --strict` exit 0 · api-docs 0 diverg. ·
    type-check exit 0. **PENDENTE:** verificação visual no Preview Frame (dev server estava down; knobs já
    derivam do contrato) + **commit**. `[[project_adequacao_ui_recorrencias]]`.
  - **Verificação visual (2026-07-24, chrome-devtools no 5173):** keepColor ✅ colore o stroke em
    repouso; props de ícone ✅ (`checkedIcon`/`indeterminateIcon` renderizaram "star" no checkbox real —
    `indeterminateIcon` só aparece no estado indeterminate, alcançável via `toggleIndeterminate`+ciclo).
  - 🟡 **keepColor herda a inconsistência de brand global da família** (2026-07-24, provado por CSS):
    o stroke do keepColor segue o **brand-prop** (`_brands.scss` → `var(--dss-action-*)`, brand-aware)
    mas **não** o `[data-brand]` GLOBAL — porque no path non-brand usa a utility `.text-primary` do
    Quasar, que **não** é brand-aware (fixa em `rgb(31,134,222)` sob hub/water/waste). NÃO é regressão do
    keepColor: o **fill do estado marcado** (`bg-primary`) tem a MESMA cegueira; só o focus ring segue o
    global (mecanismo à parte). Consistente com o componente → **não corrigir isoladamente** (faria o
    stroke desmarcado seguir o global enquanto o fill marcado não → pior). Fix correto = sistêmico/família
    (componente inteiro brand-aware sob `[data-brand]` global). `[[project_brand_prop_vs_data_brand_focus]]`.
  - ✅ **MELHORIA DE SANDBOX (Preview Frame): knob de ícone ganhou autocomplete** (2026-07-24). Os knobs
    cujo nome casa `/icon/i` (`checkedIcon`/`indeterminateIcon`/`*Icon`) agora renderizam
    `input list="pv-icon-suggestions"` — o MESMO datalist do slot prepend/append (reaproveitado; movido p/
    fora do bloco de slots). 112 sugestões varridas dos `*.example.vue`. Input continua livre (só sugere),
    mas guia p/ nomes válidos e evita o glifo-em-branco. `PreviewFrame.vue`. Doc alertada
    (`DSSCHECKBOX_API.md` §Icon). *(Contexto: nome ausente do "Material Icons" clássico renderiza em branco
    pois o font não tem glifo de letra — NÃO é bug do componente; passthrough correto p/ DssIcon→QIcon.)*
  - 🟡 **MELHORIA DE SANDBOX (infra): carregar Material Symbols** — o sandbox só carrega `Material Icons`
    clássico (Google Fonts `family=Material+Icons`). Nomes novos falham. Decisão: carregar também
    Material Symbols (suporta os nomes novos) ou manter só o clássico + o picker acima. Escopo sandbox.
  - ✅ **Aplicar à FAMÍLIA — FEITO** (2026-08-11, `8b057a0` DssRadio + `d929e21` DssToggle). `keepColor`,
    `checkedIcon` e `size` união-literal com `xl` nos três. Aditivo: quem não passa as props novas não vê
    diferença. **Os dois não foram cópia** — cada um exigiu decisão própria, registrada nos commits:
    - **Radio:** o indicador é o PONTO, não um glifo. `checkedIcon` ficou SEM default e *substitui* o ponto;
      omitir preserva a convenção. Sem `indeterminateIcon` — conferido na `api.json` do Quasar que o próprio
      q-radio não o oferece (radio não tem estado indeterminado).
    - **Toggle:** o track é pílula PREENCHIDA — colorir no desligado apagaria a distinção ligado×desligado.
      Como o track usa `border: … currentColor` + fundo `surface-muted`, o `keepColor` colore **só a borda**.
      Teste trava o invariante (exige `text-primary` E ausência de `bg-primary`).
    - **Toggle, dívida estrutural encontrada de brinde:** era o único da família sem aliases de tipo —
      `color` era `string` ABERTO. Agora exporta `ToggleColor`/`ToggleSize`/`ToggleBrand`. **Estreitamento
      = breaking em tempo de compilação**, aplicado após medir: os 37 usos de `color=` no repo já estavam
      nas 8 semânticas e o type-check passa intacto.
  - ✅ **Colisão de seed do Preview — VERIFICADA, não ocorre** no Radio nem no Toggle. Em ambos `null`/`false`
    significa "nada selecionado", que é correto; o bug do Checkbox era `null` ser lido como *indeterminate*,
    estado que nenhum dos dois possui.
  - 🟡 **`keepColor` do Radio e do Toggle herdam a MESMA cegueira de brand global** já registrada acima para
    o Checkbox (a utility `.text-{color}` do Quasar não é brand-aware). Consistente com o componente →
    não corrigir isoladamente; o fix é sistêmico. `[[project_brand_prop_vs_data_brand_focus]]`.

## Resolvidos nesta onda (para não reabrir por engano)

- ✅ **Merge da v2.4.0 para `main` — CONCLUÍDO** (2026-07-17). As 3 branches penduradas
  (`import/dss-v2.4.0`, `chore/apidocs-passthrough`, `chore/eol-normalization`) foram consolidadas
  numa branch de review (`review/merge-v2.4.0-apidocs-eol`, conflitos resolvidos) e mergeadas via
  **MR !5** (merge commit `7fb36d5`, por `@joaoVittorDevvv`). Auditoria de integridade no MR: 36
  arquivos apidocs 100% idênticos + 492 só-EOL + 0 mudança de conteúdo real; baseline de tokens
  fantasma = 0 preservado; CI-Lint válido. MRs !2/!4 auto-marcados merged; !3 fechado como superseded
  (EOL já em `main`). As 3 branches-fonte foram removidas do remoto; trabalho segue em `work/dss-continuidade`.

- ✅ **Tokens SCSS fantasma ZERADOS — baseline 34→0, gate DURO** (`b49b6e0` e antecessores). Todo
  `var(--dss-*)` no SCSS de componente resolvia p/ token INEXISTENTE escapava (o sync só valida o meta).
  Novo gate `validate-scss-tokens.cjs` (ratchet c/ baseline) + varreu 34 fantasmas: `--dss-error-*`→
  `--dss-feedback-error*`; `--dss-focus-ring` (27×, a11y invisível)→`--dss-focus-primary`; brand theming
  (`--dss-{hub,water,waste}-*` literal + interpolado em mixins Checkbox/Chip/Radio/Toggle)→`--dss-action-*`
  brand-aware + colapso de blocos `[data-brand]` redundantes (codemod `collapse-brand-blocks.mjs`); e o
  lote final (typos `border-width-medium`/`touch-target-min`/`line-height-md`/`neutral-*`/`spacing-1-5`,
  theme-aware `surface-dark`/`text-primary-dark`, tokens-de-componente-sem-def→fallback direto). Baseline
  agora **VAZIO** = qualquer `var(--dss-*)` inexistente bloqueia. `[[project_undefined_error_scale]]`.

- ✅ **Teste do fluxo de adequação (DssUploader, composto)** — validado ponta a ponta: Roteador→Cartão
  Composto, fonte-de-verdade-CSS resolveu Fase A sem alucinação, gate do contrato fechou Fase B com
  âncoras verificadas; julgamentos (F1, classification) escalados não forçados. 77 contratos, `--all
  --strict` exit 0. Commits `01e0b4d` (DoD) + `dbcb934` (DssUploader). DoD do CLAUDE.md agora inclui o passo do contrato.
- ✅ **DssUploader tem teste** (30 casos) — o débito de cobertura da memória estava DESATUALIZADO (o teste existe).
- ✅ **c0 — rampa de cores reconciliada com o Figma** (focus ausente/deep duplicado; 54/54) — `6a4baa6`.
- ✅ **Cadeia de fonte única**: schema + emissor + gates N/O/F + Preview Frame + gate CI — provados em DssInput/DssSelect.
- ✅ **Gate api-docs (30→0)** — **mergeado em `main` via MR !5** (v2.4.0); gate `validate:api-docs` verde. Verificação 🔍 fechada.
- ✅ **Normalização EOL** — `.gitattributes` **mergeado em `main` via MR !5** (v2.4.0).
