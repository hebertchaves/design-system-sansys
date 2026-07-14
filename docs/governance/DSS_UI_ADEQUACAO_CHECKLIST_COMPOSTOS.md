# DSS — Delta-Checklist de Adequação de UI: Componentes COMPOSTOS (Fase 3)

> **Origem:** Onda Higiene (jun/2026), Passo 3. Derivado de
> [`DSS_UI_ADEQUACAO_CHECKLIST.md`](DSS_UI_ADEQUACAO_CHECKLIST.md) (campos Fase 1/2)
> para o escopo de **componentes compostos** (`packages/core/components/composed/`).
>
> **Este é um DELTA, não um substituto.** Ele NÃO repete o que já está escrito; ele
> **herda por link** as seções universais do checklist de campo e **referencia** o
> [`DSS_GUIA_COMPOSICAO_FASE3.md`](DSS_GUIA_COMPOSICAO_FASE3.md) (arquitetura). Aqui
> ficam só os itens de adequação **próprios da composição visual**.
>
> **Golden Context:** `DssDataCard`. **Sempre verifique LIGHT e DARK.**

---

## Parte 1 — Herdado (rode o checklist de campo POR PEÇA INTERNA)

Um composto é uma árvore de primitivos. Cada campo/primitivo interativo interno
(`DssInput`, `DssSelect`, `DssChip`, `DssButton`…) **reproduz as mesmas armadilhas**
de cascade, dark e tema dos campos. Por isso, **rode as seções universais do
checklist de campo em cada peça interna**, não só no contêiner:

| Seção (campo) | Aplicar ao composto assim |
|---|---|
| **A — Cascade DSS×Quasar** | QField-based aninhado (Select/Textarea dentro do composto) herda `.q-field__*`; `!important` *layered* do Quasar não é sobrescrito — contorne (A1/A2/A3). |
| **B — Dark backgrounds** | Calibrar cada superfície interna contra o "stage" real (que muda quando o composto está dentro de Dialog/Card escuro), não contra o preto. |
| **C — Tokens de texto** | `text-inverse` inverte no dark; usar `text-body` p/ valor claro; erro = `--dss-feedback-error`. Vale para todo texto interno. |
| **F — Disabled** | **Não empilhar opacity** — o composto propaga `disabled` via provide/inject (guia §1.2); cada filho usa cor `text-disabled`, não opacity no wrapper. |
| **I — Sandbox/HMR** | Páginas de teste do composto sofrem o mesmo escopo `data-v` e HMR no `/mnt/c` (WSL2). Hard-refresh antes de caçar bug. |

> 🔗 Conteúdo canônico (sintoma → causa → fix) em
> [`DSS_UI_ADEQUACAO_CHECKLIST.md`](DSS_UI_ADEQUACAO_CHECKLIST.md), seções A, B, C, F, I.

---

## Parte 2 — Próprio da composição (itens novos)

> Arquitetura de composição (inheritAttrs, provide/inject, `:deep()` proibido,
> overlay/teleport, overflow/scroll) é responsabilidade do
> [`DSS_GUIA_COMPOSICAO_FASE3.md`](DSS_GUIA_COMPOSICAO_FASE3.md). Aqui só o **aspecto
> visual** desses pontos.

### K. Costuras & separators entre blocos

- **K1 — Divisor com token, nunca dupla borda.** As costuras entre blocos internos
  (header / body / footer; linhas de tabela; itens de lista) usam **um** divisor com
  cor via token (`--dss-border-*` / `--dss-separator-*`). ❌ Sintoma a evitar: borda
  do bloco pai **+** borda do filho na mesma costura = linha dupla/grossa.
  → O pai controla a costura no **próprio wrapper** (`&__header`), nunca via `:deep()`
  no filho (guia §1.4).
- **K2 — Alinhamento das costuras (LIGHT e DARK).** Divisores devem encostar nas
  bordas internas reais do composto (respeitando padding), sem sobra/sangria. No dark,
  conferir contraste do divisor contra a superfície interna (não some no stage).

### L. Brand atravessando filhos (incl. overlays teleportados)

- **L1 — `data-brand` chega em TODOS os filhos.** Propagado via `data-*` no raiz
  (guia §1.3). Verificar **visualmente** que cada filho reage (Hub/Water/Waste), não
  só o contêiner.
- **L2 — Overlays quebram a cascata.** `DssDialog`/`DssMenu`/`DssDrawer`/`DssBottomSheet`
  usam `teleport` → o conteúdo sai para o `<body>` e **perde** o `data-brand` herdado
  (guia §2.1). → O composto **deve repassar `brand` explicitamente** ao overlay; o gate
  abaixo confirma que o conteúdo teleportado mantém a marca.

### M. Não reimplementar primitivos

- **M1 — Peça interna = primitivo DSS real.** Chips, botões, ícones, avatares dentro do
  composto DEVEM ser `DssChip`/`DssButton`/`DssIcon`/`DssAvatar` reais — **nunca** um
  `<span>`/`<div>` re-estilizado à mão imitando o primitivo. Razão: o imitador não
  herda tokens, dark, brand nem a11y → diverge na primeira mudança de tema.
  (Ícone: reforça a **Composição de Ícones** — Cartão Base — glifo só via `DssIcon`.)

> ↪️ **Overflow / scroll duplo** não é item próprio aqui — é o **risco §2.2 do
> guia de composição**. Ao adequar a UI, confirme visualmente que não há barra de
> rolagem dupla nem conteúdo cortado, e que **um** elemento explícito é o responsável
> pelo scroll.

---

## Gate de adequação de COMPOSTO (marcar por componente — LIGHT e DARK)

**Pré-requisito:** o Gate de campo (do checklist herdado) passou em **cada peça
interna** relevante.

- [ ] **Costura única** entre blocos (sem borda dupla; divisor com token) — K1
- [ ] **Divisores alinhados e visíveis no dark** (contraste contra o stage interno) — K2
- [ ] **Brand reage em todos os filhos** (Hub/Water/Waste), não só no contêiner — L1
- [ ] **Brand mantido em overlay teleportado** (Dialog/Menu/Drawer/BottomSheet) — L2
- [ ] **Sem primitivo reimplementado à mão** (chips/botões/ícones são Dss reais) — M1
- [ ] **Sem scroll duplo / conteúdo cortado**; scroll-owner explícito — guia §2.2
- [ ] **Disabled propagado sem empilhar opacity** (cor `text-disabled` por filho) — F1
- [ ] Seções **A/B/C** do checklist de campo OK em cada peça QField-based interna

---

## Validação visual final (Preview Frame) — **premissa de fechamento**

> Herda a etapa de fechamento do [checklist de campo](DSS_UI_ADEQUACAO_CHECKLIST.md#validação-visual-final-preview-frame--premissa-de-fechamento):
> o composto só está adequado quando renderiza **fiel** no **Preview Frame**
> (`<iframe>` sobre o **SFC real** + knobs derivados do `dss.contract.json`).
> O Preview Frame já **alcança `composed/`** (glob `{base,composed}`) — registrar a aba
> em `TestSuite.vue` e validar.
>
> **Próprio do composto — o iframe é a barreira que prova o item L2:** um composto com
> overlay (`DssDialog`/`DssMenu`/`DssDrawer`/`DssBottomSheet`) teleporta para o `<body>`
> do **realm do iframe**, não do host — então o overlay fica **contido** e a marca
> repassada explicitamente (L2) pode ser conferida **dentro** do iframe.

**Gate visual final (marcar — LIGHT e DARK):**

- [ ] **SFC real** do composto monta no iframe (não o fallback "não encontrado"); **zero erros** no console
- [ ] Knobs **derivados do contrato**; mexer num knob → o composto real reage; **snippet** reflete o estado
- [ ] **LIGHT e DARK** corretos; **Brand** propaga a todos os filhos **dentro** do iframe — L1
- [ ] Overlay do composto **teleporta contido** no realm do iframe e **mantém a marca** — L2
- [ ] Sem **scroll duplo** nem conteúdo cortado no preview — guia §2.2

---

**Relacionados:** [[DSS_UI_ADEQUACAO_CHECKLIST]] · [[DSS_GUIA_COMPOSICAO_FASE3]] ·
[[DSS_GOLDEN_COMPONENTS]] (Golden Context: `DssDataCard`)
