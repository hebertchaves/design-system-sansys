# Pré-prompt: DssEmptyState

> ⚠️ **NOTA DE PROCEDÊNCIA — leia antes de auditar.**
> Este pré-prompt foi escrito **depois** da implementação (ago/2026), não antes. O componente foi
> criado à mão, seguindo as convenções do DssBadge, sem passar pelo `generate_component_scaffold`
> nem por este documento. A lacuna foi detectada em revisão de processo e está sendo fechada aqui.
>
> **O que isso significa para quem audita:** este documento é uma **declaração de intenção
> reconstruída a partir do código**, não um registro prévio. Ele não prova que as decisões
> antecederam a implementação — prova apenas que estão explícitas e são verificáveis contra o
> disco. Trate cada afirmação como claim a conferir, não como premissa aceita.
>
> Os componentes de Fase 1 anteriores (DssButton, DssBadge, DssChip, DssInput, entre 19) não têm
> pré-prompt porque foram criados antes da existência da ferramenta — é resíduo histórico da
> evolução do sistema, **não** isenção que se estenda a componentes novos.

---

## 1. CLASSIFICAÇÃO E CONTEXTO

- **Tipo:** Informativo (bloco de estado de dado)
- **Categoria:** Feedback / Display
- **Interativo:** **Não**
- **Fase:** 1 — componente base
- **Golden Reference:** `DssBadge` (governança da categoria não interativa)
- **Golden Context:** `DssBanner` (baseline de bloco informativo de superfície)
- **`classification` (enum de contrato):** `Visual`

### Golden Reference

O `DssEmptyState` é não interativo: exibe informação e não responde a hover, foco ou clique. Essa
é exatamente a natureza governada pelo `DssBadge`, Golden Reference da categoria não interativa.
Herda dele a postura de "sem estados próprios, sem touch target, sem anel de foco".

### Golden Context

O `DssBanner` é o baseline específico: também é bloco informativo de superfície, também combina
ícone + texto + ação opcional. A diferença de papel é deliberada e está documentada — o banner
**interrompe** para avisar; o estado vazio **ocupa o lugar** do conteúdo que não veio.

### Justificativa — por que este componente existe

Não é conveniência: é lacuna medida nas **duas** pontas do processo.

- **Lado da especificação:** `estado_dado.vazio` apareceu **0 vez em 3 de 3** specs medidas.
- **Lado do DSS:** não existia componente `DssEmpty*`. `empty` era apenas um **slot** do
  `DssVirtualScroll`, o que jogava o conteúdo para o consumidor — cada tela inventava o seu.

Ou seja: o gate de prontidão de spec reportava a ausência como falha do analista, quando o design
system não oferecia a peça para responder. Registrado em
[`DSS_JOIN_SPEC_CONTRATO.md`](../DSS_JOIN_SPEC_CONTRATO.md) §5 e no
[`DEBITO_ABERTO.md`](../DEBITO_ABERTO.md).

---

## 2. RISCOS ARQUITETURAIS E GATES

### Risco arquitetural principal

**O componente ser confundido com erro ou carregamento.** É o risco que mais custa caro, porque
não quebra nada visualmente — engana. Estado vazio significa "a operação funcionou e o resultado
é zero". Tratar falha como vazio **esconde do usuário que algo quebrou**.

Mitigação implementada: a doc normativa §2 traz a tabela "quando NÃO usar", com o componente
correto para cada caso (`error` no campo/lista · `DssSkeleton`/`DssInnerLoading` · `DssBanner` ·
`DssBadge`), e a regra normativa está escrita como regra, não como conselho.

### Riscos secundários

- **Q-component base:** **nenhum**. É HTML próprio do DSS — o Quasar não tem equivalente. Não há
  cascata de terceiros a isolar, `inheritAttrs` a governar nem API herdada. Risco eliminado por
  ausência, não por tratamento.
- **Cor de marca vazando no ícone:** ⚠️ **RISCO QUE SE MATERIALIZOU.** A regra global
  `[data-brand] .dss-icon` (0,2,0) em `DssIcon/4-output/_brands.scss` casa **direto** no elemento
  do ícone e vence qualquer cor apenas **herdada** do wrapper. Medido no Preview Frame: sob brand
  Hub o ícone saía laranja, contrariando a decisão de neutralidade. Mesmo mecanismo já documentado
  em `DssChip` e `DssCheckbox`. Corrigido com seletor (0,3,0); reverificado nas 3 marcas × 2 temas.
- **`--dss-text-muted` como armadilha de nome:** o comentário diz "Texto terciário", mas aponta
  para `--dss-dark-disable` (#D7D7D7) — a cor de **desabilitado**. Um ícone nesse tom lê como
  componente quebrado. Evitado: o componente usa `--dss-text-secondary`. Registrado como débito.
- **Ausência de CSS no bundle:** ⚠️ **RISCO QUE SE MATERIALIZOU.** Faltava o `@forward` em
  `components/index.scss` — que **gate nenhum verifica**. O componente passou em 10 gates
  renderizando com `padding: 0` e `display: block`. Corrigido; a correção do gate ficou registrada
  no `DEBITO_ABERTO`.
- **Medida de leitura:** sem constraint de largura, uma descrição dentro de tabela larga produz
  linhas ilegíveis. Resolvido com `max-width` na descrição (token de espaçamento como largura).

### Convenção de pseudo-elementos

- `::before` → RESERVADO a touch target (WCAG 2.5.5). **Não usado** — o bloco não é clicável.
- `::after` → efeitos visuais. **Não usado** — o componente não tem estados interativos.

### Violações DSS a evitar (checklist aplicado)

- ❌ Valores hardcoded px/rem/hex → **zero**; todo valor dimensional vem de `var(--dss-*)`
- ❌ Cores aplicadas no SCSS → cores são de **texto** (`--dss-text-*`), não de ação/marca
- ❌ Tokens específicos de componente → **nenhum** `--dss-empty-state-*` criado
- ❌ `:deep()` / `::v-deep` → **zero**
- ❌ `::before` para efeito visual → não usado

### Gates aplicáveis

Estrutural (4 camadas · wrapper puro · orquestrador L2→L3→L4 · barrel `index.ts`) · higiene de SFC ·
grafia de variante · tokens SCSS existentes · paridade API↔docs · registro no DemoRenderer ·
tags do sandbox · consistência do catálogo · contrato schema-válido com âncoras a11y · type-check ·
`.test.js` com cobertura mínima (bloqueante).

---

## 3. MAPEAMENTO DE API

### Equivalente no Quasar

**Nenhum.** O Quasar não tem componente de estado vazio. Não há API a mapear, herdar ou divergir —
a API abaixo é **decisão de design do DSS**, sem âncora externa. Por isso cada prop carrega o seu
porquê: não há "é assim no Quasar" a que apelar.

### Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `icon` | `string` | `''` | Nome Material Icons; renderizado via `DssIcon` como **decorativo** |
| `title` | `string` | `''` | Frase principal — o que não há, na linguagem do domínio |
| `description` | `string` | `''` | Por que está vazio e o que fazer a respeito |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Densidade — três contextos de uso reais |
| `variant` | `'plain' \| 'bordered'` | `'plain'` | Tratamento do contêiner |
| `announce` | `boolean` | `true` | Emite `role="status"` + `aria-live="polite"` |
| `ariaLabel` | `string` | `''` | Rótulo acessível quando o `title` não basta |

### Slots

| Slot | Descrição |
|---|---|
| `icon` | Ilustração própria (SVG de marca). **Precede** a prop `icon` (CCI §3.2) |
| `title` | Frase principal customizada (substitui a prop) |
| `description` | Explicação customizada (substitui a prop) |
| `action` | Ação que tira o usuário do vazio — normalmente um `DssButton` |
| `default` | Conteúdo adicional, abaixo da ação |

### Eventos

**Nenhum** — declarado explicitamente, não omitido. O componente não é interativo; os eventos
vivem no que o consumidor coloca no slot `action`. O `.test.js` **verifica a ausência**, de modo
que uma emissão acidental futura reprove no teste.

### Props deliberadamente ausentes

| Prop ausente | Motivo |
|---|---|
| `color` | Estado vazio é informação neutra, não feedback |
| `brand` | O bloco não se colore por marca — ver §4 |
| `loading` | Vazio ≠ carregando → `DssSkeleton` / `DssInnerLoading` |
| `error` | Vazio ≠ erro → `error` no componente de campo/lista |
| `clickable` / `@click` | O bloco não é interativo; a ação vive no slot |

> ⚠️ Toda prop declarada tem caminho de implementação real (precedente NC-01 do
> `clearAriaLabel` do DssSelect). Nenhuma prop é decorativa.

---

## 4. GOVERNANÇA DE TOKENS E CSS

Todos os valores via `var(--dss-*)`. **Zero** valores hardcoded — nenhuma exceção registrada.

| Propriedade | Token |
|---|---|
| padding (sm / md / lg) | `--dss-spacing-4`+`-3` / `--dss-spacing-8`+`-4` / `--dss-spacing-12`+`-6` |
| gap (sm / md / lg) | `--dss-spacing-2` / `--dss-spacing-3` / `--dss-spacing-4` |
| família tipográfica | `--dss-font-family-sans` |
| título — tamanho (sm/md/lg) | `--dss-font-size-md` / `-lg` / `-xl` |
| título — peso · cor | `--dss-font-weight-semibold` · `--dss-text-primary` |
| descrição — tamanho | `--dss-font-size-sm` (sm) / `--dss-font-size-md` |
| descrição — entrelinha · cor | `--dss-line-height-relaxed` · `--dss-text-secondary` |
| descrição — medida de leitura | `--dss-spacing-96` (sm) / `--dss-spacing-120` |
| ícone — tamanho (sm/md/lg) | `--dss-icon-size-md` / `-lg` / `-xl` |
| ícone — cor | `--dss-text-secondary` |
| borda (`bordered`) | `--dss-border-width-thin` · `--dss-border-default` · `--dss-radius-lg` |

### Decisões de token que exigem justificativa

**Medida de leitura via token de espaçamento.** `max-width` da descrição usa `--dss-spacing-120`
(480px). Usar um token de spacing como largura é deliberado: a escala do DSS vai até 768px e é a
única escala dimensional genérica disponível. Criar `--dss-measure-*` exigiria decisão de
tipografia ainda não tomada — registrado como ponto a revisitar.

**`--dss-text-muted` NÃO é usado.** Apesar do nome ("Texto terciário"), aponta para
`--dss-dark-disable` (#D7D7D7), a cor de desabilitado.

### Tokens proibidos — verificado

- ❌ `--dss-empty-state-*` (específico de componente) → nenhum criado
- ❌ `--dss-font-weight-regular` (não existe) → usado `--dss-font-weight-normal`
- ❌ `--dss-text-tertiary`, `--dss-border-color`, `--dss-icon-size-2xl` → **verificados como
  inexistentes antes de escrever**; substituídos por `--dss-text-secondary`,
  `--dss-border-default`, `--dss-icon-size-xl`

### Brandabilidade — decisão registrada

**O componente NÃO se colore por marca.** `4-output/_brands.scss` existe e está **deliberadamente
sem regras**, com a justificativa dentro do próprio arquivo — é decisão, não omissão.

Racional: o estado vazio é informação neutra. Pintar ícone ou título com a cor do produto
competiria com a ação real (o `DssButton` do slot `action`), que **essa sim** segue a marca pelos
próprios tokens. Verificado nas 3 marcas × 2 temas: ícone e texto neutros nas 6 combinações.

---

## 5. ACESSIBILIDADE E ESTADOS

### Estados

| Estado | Implementado | Observação |
|---|---|---|
| hover | — | **não existe**: o bloco não é clicável |
| focus | — | **não existe**: nada focável no bloco |
| active | — | **não existe** |
| disabled | — | **não existe**: não há o que desabilitar |
| loading | — | fora do escopo por definição → `DssSkeleton` / `DssInnerLoading` |
| error | — | fora do escopo por definição → vazio ≠ erro |
| dark mode | ✅ | resolvido pelos tokens semânticos; **sem override próprio** |
| `prefers-contrast: more` | ✅ | descrição e ícone sobem para `--dss-text-primary`; moldura sólida |
| `forced-colors: active` | ✅ | moldura recebe `CanvasText` para não desaparecer |
| reduced-motion | — | **não se aplica**: o componente não anima |

> A ausência de estados interativos é **decisão de arquitetura declarada**, não escopo reduzido.
> O único elemento focável é o que o consumidor coloca no slot `action`, e ele traz os próprios
> estados.

### WCAG 2.1 AA

| Critério | Nível | Implementação | Âncora |
|---|---|---|---|
| **4.1.3** Mensagens de status | AA | `role="status"` + `aria-live="polite"` quando `announce` | `aria` |
| **1.4.3** Contraste mínimo | AA | título `--dss-text-primary`, descrição e ícone `--dss-text-secondary`; a âncora mede o **elo mais fraco** | `css` (contraste computado) |
| **1.4.1** Uso de cor | A | informação sempre no texto do título; ícone `decorative` | `aria` |
| **2.5.5** Tamanho do alvo | — | **não se aplica**: sem alvo clicável | — |

### `announce` — a decisão de a11y que exige justificativa

`true` por padrão. O caso dominante é o estado vazio **substituir** um resultado — após busca,
filtro ou exclusão — e essa troca precisa ser anunciada a quem usa leitor de tela.

Desligável (`:announce="false"`) para quando o bloco já nasce na tela e nunca muda: anunciar
conteúdo estático é ruído. O padrão serve ao caso dominante; o caso estático desliga.

### Navegação por teclado

**Nenhuma interação de teclado própria** — não há elemento focável. O `DssButton` do slot `action`
participa da ordem natural de tabulação e traz o próprio anel de foco e touch target de 44px.

---

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências DSS internas

| Componente | Uso |
|---|---|
| `DssIcon` | única forma de renderizar o ícone da prop: `<DssIcon :name inline decorative />` |

Nenhuma outra. O `DssButton` do slot `action` é fornecido pelo **consumidor** — o componente não o
importa nem o presume.

### Onde este componente é composto

- `DssVirtualScroll` / `DssInfiniteScroll` — conteúdo do slot `empty` (era exatamente o vazio que
  motivou a criação)
- `DssTable` — substitui o corpo quando `rows` está vazio (usar `size="sm"`)
- `DssCard` / `DssPage` — dentro de contêiner que já tem contorno (manter `variant="plain"`)

### Layout — fronteira de responsabilidade

O componente define a própria **densidade interna** (padding, gap, medida de leitura). **Não**
define largura, altura nem centralização vertical: isso é decisão do contêiner, conforme a regra
de composição do DSS ("layout mora no pai").

---

## 7. EXCEÇÕES PREVISTAS

**Nenhuma exceção registrada.** Não há valor não-tokenizado no componente:

- sem `brightness()` / `saturate()` — o componente não tem estados que exijam ajuste de luminância
- sem `border-radius: 50%` / `9999px` — a moldura usa `--dss-radius-lg`
- sem valor hardcoded em `forced-colors` — só a palavra-chave `CanvasText`

O bloco `"exceptions"` do `dss.meta.json` permanece vazio por ser verdade, não por omissão.

---

## 8. SUPERFÍCIE DE PLAYGROUND

- **Preview Frame:** registrado em `apps/sandbox/src/TestSuite.vue` como
  `preview-frame-empty-state`, consumindo `dss.contract.json` (knobs derivados do contrato).
- **`.example.vue`:** 7 cenários — busca sem resultado (o caso dominante), primeiro acesso,
  dentro de tabela, `bordered` para anexos, sem ação possível, ilustração própria via slot,
  e `announce=false`.
- **Playground dedicado:** ainda **não existe**. O componente nasceu `status: draft` e a adequação
  de UI dele não foi rodada — ver a ressalva de escopo abaixo.

### Verificação já executada (medida, não afirmada)

| O quê | Resultado |
|---|---|
| SCSS compila | ✅ |
| Testes unitários | ✅ 22/22 |
| Gates de pre-commit | ✅ 15/15 |
| Contrato emitido | ✅ schema-válido, 3 claims a11y com âncora aprovada |
| `validate_component_code` (MCP) | ✅ `compliant` — 4 camadas, zero violações |
| Medido no Preview Frame | sm/md/lg · plain/bordered · light/dark · 3 marcas — batendo com a doc |

### Ressalva de escopo (para a auditoria)

O componente está `status: draft`: **sem selo, sem página de portal, e sem a adequação de UI
rodada** (`DSS_UI_ADEQUACAO_CHECKLIST.md`). Ele é funcional e verificado — não é um componente
selado. O roteador do `CLAUDE.md` posiciona "criar componente BASE do zero" como posterior à
adequação da base, e essa ordem foi invertida aqui por decisão explícita do responsável.

---

## Declaração de estado

**Componente PRONTO PARA AUDITORIA DSS v2.2**, com as duas ressalvas declaradas acima:
(1) este pré-prompt é retroativo — ver a nota de procedência no topo; (2) a adequação de UI não
foi rodada, e o componente é `draft`.

🚫 Nenhum selo emitido. 🚫 Nenhuma auto-certificação de conformidade.
