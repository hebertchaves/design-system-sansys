# DSS — Grafia da variante `outline` vs `outlined`

> **Status:** Normativo. **Regra verificada por gate** (`scripts/validate-variant-naming.cjs`).
> **Fonte da verdade:** a **API oficial do Quasar** (`node_modules/quasar/dist/api/<Q>.json`).

## TL;DR

O DSS usa **duas grafias** para a variante de contorno — `outline` e `outlined` — e
**isso é correto, não é typo.** As duas grafias **espelham o próprio Quasar**, que é
inconsistente por família de componente.

## A realidade do Quasar (não do DSS)

Verificado na API oficial do Quasar (v2.19.3), cada componente declara uma prop
booleana de contorno com grafia própria:

| Componente Quasar | prop de contorno | descrição na api.json |
|---|---|---|
| **QBtn** | `outline` | *"Use 'outline' design"* |
| **QBtnToggle** | `outline` | idem |
| **QBtnDropdown** | `outline` | idem |
| **QChip** | `outline` | idem |
| **QField / QInput / QSelect / QFile** | `outlined` | *"Use 'outlined' design for the field"* |

Ou seja: **botões/chips → `outline`** · **campos → `outlined`**. `QBtn` **não** tem
`outlined`; `QField` **não** tem `outline`. É uma inconsistência do **Quasar**.

## A regra do DSS

O `variant` do DSS é uma abstração string que **mapeia para o Quasar subjacente**.
Para não confundir quem já conhece o Quasar, a grafia da variante **espelha o
componente Quasar de base**:

- **Família de AÇÃO** (`DssButton`, `DssChip`, `DssBtnToggle`, `DssBtnDropdown`) →
  `variant="outline"` (mapeia p/ o `outline` booleano do QBtn/QChip/…).
- **Família de CAMPO** (`DssInput`, `DssSelect`, `DssTextarea`, `DssFile`, `DssField`) →
  `variant="outlined"` (QField/QInput/…).
- **Sem âncora no Quasar** (`DssCard`, `DssUploader`, `DssCarousel` — os Q correspondentes
  **não têm** prop `outline*`) → **escolha própria do DS**, declarada explicitamente:
  `DssCard` = `outlined`; `DssUploader`/`DssCarousel` = `outline`.

### Mapa canônico (gated)

| Componente DSS | grafia | âncora |
|---|---|---|
| DssInput, DssSelect, DssTextarea, DssFile, DssField | `outlined` | QInput/QSelect/QFile/QField (Quasar) |
| DssButton, DssChip, DssBtnToggle, DssBtnDropdown | `outline` | QBtn/QChip/QBtnToggle/QBtnDropdown (Quasar) |
| DssCard | `outlined` | escolha do DS |
| DssUploader, DssCarousel | `outline` | escolha do DS |

## ⚠️ Consequência (footgun conhecido)

Como a grafia difere por família, `<DssButton variant="outlined">` **não aplica** a
variante (o botão espera `outline`), e `<DssInput variant="outline">` idem. Isto é
**intencional** (fidelidade ao Quasar) e está documentado aqui + verificado pelo gate.
Um consumidor deve seguir o mapa acima. *(A adoção de aliases bidirecionais para
eliminar o footgun foi considerada e descartada em jul/2026 — decisão: manter a
fidelidade ao Quasar e apenas documentar+gatear.)*

## O gate

`scripts/validate-variant-naming.cjs` faz **duas** checagens.

**A. Grafia outline(d) (componentes com variante de contorno):**

1. **Coerência interna** — grafia no `types/*.types.ts` == classe SCSS (`--outline`
   vs `--outlined`). Divergência = variante quebrada (classe nunca aplica).
2. **Conformidade** — a grafia bate com a âncora; para os ancorados, a grafia
   **esperada é lida da api.json do Quasar** (o mapa só diz *qual* Q é a referência,
   então não pode mentir sobre a grafia).
3. **Classificação** — todo componente com variante outline(d) deve estar no mapa;
   um componente novo não classificado **falha** (força decisão consciente).

**B. Colisão estado × valor (TODOS os componentes):** uma classe de **estado**
(chave-objeto literal no composable, ex.: `'dss-x--has-value': hasValue`) NÃO pode
coincidir com uma classe de **valor** interpolada (`dss-x--${props.variant}`,
`--${props.size}`, …, valores lidos do contrato). Se colidir, um componente NAQUELE
estado herda o visual daquela variante. **Origem:** bug do DssFile (jul/2026) — o
estado `hasValue` gerava `--filled`, a MESMA classe da variante `filled`; um outlined
com arquivo herdava o visual do filled. Corrigido renomeando o estado p/ `--has-value`.

```bash
npm run validate:variant-naming        # relatório
npm run validate:variant-naming:gate   # exit 1 se houver violação (usado no pre-commit)
```

**Ao adicionar um componente com variante de contorno:** classifique-o em `ANCHOR`
(se envolve um Q com prop `outline*`) ou `DS_CHOICE` no gate, seguindo a família.

---

**Mantido por:** governança DSS · **Escopo:** camadas `base` + `composed` (fixtures em
`stress-test/` fora do gate).
