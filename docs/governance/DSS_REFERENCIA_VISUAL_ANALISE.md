# Análise Visual das Referências de Mercado — DSS

**Data:** 26 de Maio de 2026
**Objetivo:** Registrar as observações visuais coletadas nas páginas de componentes das referências Material Design 3, IBM Carbon e Salesforce Lightning, com indicações concretas de como cada categoria de componente DSS deveria se parecer.

---

## Metodologia

As três referências foram analisadas diretamente em suas documentações oficiais:

- **Material Design 3** — m3.material.io
- **IBM Carbon** — carbondesignsystem.com
- **Salesforce Lightning** — lightningdesignsystem.com

Para cada categoria de componente, foram observados: forma (border-radius), cor, tipografia, espaçamento, estados interativos (hover, focus, active, disabled) e densidade visual geral.

---

## 1. Botões (Button, FAB, BtnToggle, BtnDropdown)

### O que as referências mostram

**Material Design 3** define cinco variantes de botão com hierarquia clara:
- **Filled** (ação principal): fundo sólido na cor primária (`#6750A4` no M3 padrão), texto branco, `border-radius: 20px` (formato de pílula completo), sem sombra por padrão, `height: 40px`, `padding: 0 24px`, `font-size: 14px`, `font-weight: 500`, `letter-spacing: 0.1px`, `text-transform: none`.
- **Outlined** (ação secundária): fundo transparente, borda `1px solid` na cor de outline (`#79747E`), texto na cor primária, mesmo border-radius.
- **Text** (ação terciária): sem fundo, sem borda, texto na cor primária.
- **Elevated**: fundo `surface-container-low`, sombra `elevation level 1`.
- **Tonal**: fundo `secondary-container`, texto `on-secondary-container`.

**IBM Carbon** usa botões mais quadrados:
- `border-radius: 0` (sem arredondamento) ou `border-radius: 4px` no Carbon v11.
- Altura `48px` para tamanho padrão (`md`), `32px` para `sm`.
- Fundo sólido na cor primária (`#0f62fe`), texto branco.
- `font-size: 14px`, `font-weight: 400`, `letter-spacing: 0.16px`, `text-transform: none`.
- Hover: fundo escurece para `#0353e9` (10% mais escuro).
- Ícone à direita com `padding-right: 64px` para dar espaço.

**Salesforce Lightning** usa botões com `border-radius: 4px`:
- Variante primária: fundo `#0176d3` (azul Salesforce), texto branco.
- Variante neutra: fundo branco, borda `1px solid #dddbda`, texto escuro.
- `height: 32px` (padrão), `padding: 0 12px`.
- `font-size: 13px`, `font-weight: 700`, `text-transform: none`.

### Como o DSS deveria se parecer

O DSS deve adotar o padrão **Material Design 3 Filled** como variante `elevated` (principal):

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` — pílula completa (20px+) |
| `height` | `var(--dss-touch-target-md)` — 44px |
| `padding` | `0 var(--dss-spacing-6)` — 0 24px |
| `background` | `var(--dss-action-primary)` |
| `color` | `var(--dss-text-inverse)` |
| `font-size` | `var(--dss-font-size-sm)` — 14px |
| `font-weight` | `var(--dss-font-weight-medium)` — 500 |
| `letter-spacing` | `0.01em` |
| `text-transform` | `none` |
| Hover | `background: var(--dss-action-primary-hover)` |
| Focus | `outline: 3px solid var(--dss-action-primary-focus)`, `outline-offset: 2px` |
| Disabled | `opacity: 0.38`, `cursor: not-allowed` |

**Variante `outlined`:** borda `1px solid var(--dss-action-primary)`, fundo transparente, texto `var(--dss-action-primary)`.

**Variante `flat`/`text`:** sem borda, sem fundo, texto `var(--dss-action-primary)`.

---

## 2. Formulários (Input, Select, Textarea)

### O que as referências mostram

**Material Design 3** — Text Field:
- Duas variantes: **Filled** (fundo `surface-container-highest`, borda inferior `1px`) e **Outlined** (borda completa `1px`).
- `border-radius` no Filled: `4px 4px 0 0` (arredondado no topo, reto na base).
- `border-radius` no Outlined: `4px` em todos os cantos.
- Label flutuante: cor `on-surface-variant` no repouso, cor primária no foco.
- Borda no foco: `2px solid` na cor primária.
- `height: 56px` (padrão), `padding: 16px`.
- Ícones de suporte (leading/trailing) com `24px`.

**IBM Carbon** — Text Input:
- Variante única com borda inferior `1px solid #8d8d8d` no repouso.
- Foco: borda inferior `2px solid #0f62fe`.
- `height: 40px` (padrão), `padding: 0 16px`.
- Label acima do campo (não flutuante), `font-size: 12px`, `font-weight: 400`.
- Fundo `#f4f4f4` no repouso, `#ffffff` no foco.
- Mensagem de erro em vermelho abaixo do campo com ícone.

**Salesforce Lightning** — Input:
- Borda `1px solid #dddbda` no repouso.
- Foco: borda `1px solid #1b96ff` + `box-shadow: 0 0 3px #0176d3`.
- `height: 32px`, `border-radius: 4px`, `padding: 0 12px`.
- Label acima do campo, `font-size: 13px`.

### Como o DSS deveria se parecer

O DSS adota a variante **Outlined** como padrão, inspirada no M3 Outlined + Carbon:

| Propriedade | Estado | Valor DSS |
|---|---|---|
| `border` | Repouso | `1px solid var(--dss-gray-400)` |
| `border` | Hover | `1px solid var(--dss-gray-600)` |
| `border` | Foco | `2px solid var(--dss-action-primary)` |
| `border-radius` | — | `var(--dss-radius-md)` — 8px |
| `height` | — | `var(--dss-touch-target-md)` — 44px |
| `padding` | — | `0 var(--dss-spacing-4)` — 0 16px |
| `background` | Repouso | `var(--dss-surface-default)` |
| `label color` | Repouso | `var(--dss-text-subtle)` |
| `label color` | Foco | `var(--dss-action-primary)` |
| `font-size` | — | `var(--dss-font-size-sm)` — 14px |

---

## 3. Controles de Seleção (Checkbox, Radio, Toggle)

### O que as referências mostram

**Material Design 3** — Checkbox:
- Tamanho do controle: `18px × 18px`.
- Estado unchecked: borda `2px solid on-surface-variant` (cinza médio), fundo transparente.
- Estado checked: fundo `primary`, ícone de check branco, sem borda visível.
- `border-radius: 2px` (levemente arredondado).
- Estado indeterminate: fundo `primary`, traço horizontal branco.
- Área de toque: `40px × 40px` (com ripple).

**Material Design 3** — Radio:
- Tamanho: `20px × 20px`, circular.
- Unchecked: borda `2px solid on-surface-variant`.
- Checked: borda `2px solid primary` + ponto interno `10px` na cor `primary`.

**Material Design 3** — Switch (Toggle):
- Track unchecked: `52px × 32px`, fundo `surface-container-highest`, borda `2px solid outline`.
- Track checked: fundo `primary`, sem borda.
- Thumb unchecked: `16px`, fundo `outline` (cinza), centralizado.
- Thumb checked: `24px`, fundo `primary-container` (branco/claro), centralizado.
- Transição suave do thumb com `spring animation`.

**IBM Carbon** — Checkbox:
- `16px × 16px`, `border-radius: 2px`.
- Unchecked: borda `1px solid #8d8d8d`.
- Checked: fundo `#0f62fe`, ícone branco.

**IBM Carbon** — Toggle:
- Track: `48px × 24px`, arredondado.
- Off: fundo `#8d8d8d`.
- On: fundo `#0f62fe`.
- Thumb: `18px`, branco.

### Como o DSS deveria se parecer

**Checkbox:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Tamanho | — | `18px × 18px` |
| `border-radius` | — | `var(--dss-radius-sm)` — 4px |
| Borda | Unchecked | `2px solid var(--dss-gray-500)` |
| Fundo | Checked | `var(--dss-action-primary)` |
| Ícone | Checked | branco |
| Área de toque | — | `44px × 44px` |

**Radio:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Tamanho | — | `20px × 20px` |
| Borda | Unchecked | `2px solid var(--dss-gray-500)` |
| Borda | Checked | `2px solid var(--dss-action-primary)` |
| Ponto interno | Checked | `10px`, `var(--dss-action-primary)` |

**Toggle:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Track | Off | fundo `var(--dss-surface-muted)`, borda `2px solid var(--dss-gray-400)` |
| Track | On | fundo `var(--dss-action-primary)`, sem borda |
| Thumb | Off | `16px`, fundo `var(--dss-gray-500)` |
| Thumb | On | `24px`, fundo `var(--dss-text-inverse)` |

> **Observação crítica:** O estado **unchecked** dos três controles deve usar `var(--dss-gray-500)` (cinza médio), **não** a cor primária. A cor primária só aparece no estado **checked/on**. O que foi implementado anteriormente (primary no unchecked) diverge das três referências.

---

## 4. Chips e Badges

### O que as referências mostram

**Material Design 3** — Chip:
- Quatro variantes: Assist, Filter, Input, Suggestion.
- Formato: `border-radius: 8px` (não é pílula completa — é arredondado mas não oval).
- Altura: `32px`.
- Filter chip selecionado: fundo `secondary-container`, ícone de check à esquerda.
- Borda no estado padrão: `1px solid outline-variant`.
- `font-size: 14px`, `font-weight: 500`.

**IBM Carbon** — Tag:
- `border-radius: 24px` (pílula).
- Altura: `24px`.
- Fundo tintado por tipo (gray, blue, green, red, etc.).
- `font-size: 12px`.

**Salesforce Lightning** — Badge/Pill:
- `border-radius: 15px` (pílula).
- Altura: `20–24px`.
- Fundo colorido por tipo.

### Como o DSS deveria se parecer

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` — pílula |
| `height` | `32px` |
| `padding` | `0 var(--dss-spacing-3)` — 0 12px |
| Fundo (default/neutro) | `var(--dss-surface-muted)` |
| Texto (default/neutro) | `var(--dss-text-body)` |
| Fundo (primary/ativo) | `var(--dss-action-primary)` |
| Texto (primary/ativo) | `var(--dss-text-inverse)` |
| `font-size` | `var(--dss-font-size-xs)` — 12px |
| `font-weight` | `var(--dss-font-weight-medium)` — 500 |

---

## 5. Cards e Superfícies

### O que as referências mostram

**Material Design 3** — Card:
- Três variantes: **Elevated** (sombra `elevation 1`), **Filled** (fundo `surface-container-highest`, sem sombra), **Outlined** (borda `1px solid outline-variant`).
- `border-radius: 12px` em todos.
- Fundo: `surface-container-low` no Elevated.
- Hover no Elevated: `elevation 2` + overlay `on-surface` a 8%.
- Padding interno: `16px`.

**IBM Carbon** — Tile:
- `border-radius: 0` (sem arredondamento).
- Borda `1px solid #e0e0e0`.
- Fundo `#f4f4f4` (clickable tile) ou `#ffffff`.
- Hover: fundo `#e8e8e8`.

**Salesforce Lightning** — Card:
- `border-radius: 4px`.
- Sombra: `0 2px 2px rgba(0,0,0,0.1)`.
- Fundo branco.
- Header com `padding: 12px 16px`, borda inferior `1px solid #dddbda`.

### Como o DSS deveria se parecer

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-lg)` — 12px |
| Fundo | `var(--dss-surface-default)` |
| Sombra (elevated) | `var(--dss-elevation-1)` |
| Sombra (hover) | `var(--dss-elevation-2)` |
| Borda (outlined) | `1px solid var(--dss-gray-200)` |
| Padding interno | `var(--dss-spacing-4)` — 16px |

---

## 6. Tabs (Abas)

### O que as referências mostram

**Material Design 3** — Tabs:
- Duas variantes: **Primary** (indicador embaixo, `3px`, cor primária) e **Secondary** (indicador embaixo, `2px`, cor primária).
- Tab ativa: texto na cor primária, `font-weight: 500`.
- Tab inativa: texto `on-surface-variant` (cinza médio), `font-weight: 400`.
- Hover: overlay `on-surface` a 8%.
- `height: 48px`.
- Indicador: `border-radius: 3px 3px 0 0` na ponta.

**IBM Carbon** — Tabs:
- Indicador: borda inferior `2px solid #0f62fe` na aba ativa.
- Tab ativa: texto `#0f62fe`, `font-weight: 600`.
- Tab inativa: texto `#525252`.
- `height: 40px`.

**Salesforce Lightning** — Tabs:
- Indicador: borda inferior `2px solid #0176d3`.
- Tab ativa: texto `#0176d3`, `font-weight: 700`.
- `height: 44px`.

### Como o DSS deveria se parecer

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Indicador | Ativo | `3px solid var(--dss-action-primary)`, `border-radius: 3px 3px 0 0` |
| Texto | Ativo | `var(--dss-action-primary)`, `font-weight: 500` |
| Texto | Inativo | `var(--dss-text-subtle)`, `font-weight: 400` |
| Fundo hover | — | `var(--dss-surface-hover)` — rgba(0,0,0,0.04) |
| `height` | — | `var(--dss-touch-target-md)` — 44px |

---

## 7. Progresso e Spinners

### O que as referências mostram

**Material Design 3** — Linear Progress:
- Track: `4px` de altura, fundo `secondary-container` (cinza claro).
- Indicador: fundo `primary`.
- `border-radius: 4px` em ambos.
- Animação indeterminada: dois segmentos se movendo.

**Material Design 3** — Circular Progress:
- Traço: `4px` de espessura.
- Cor: `primary`.
- Animação: rotação + variação do arco.

**IBM Carbon** — Loading:
- Spinner circular, traço `4px`.
- Cor: `#0f62fe`.
- Track: `#c6c6c6`.

### Como o DSS deveria se parecer

**LinearProgress:**

| Propriedade | Valor DSS |
|---|---|
| Altura | `4px` |
| `border-radius` | `var(--dss-radius-full)` |
| Cor do indicador | `var(--dss-action-primary)` |
| Cor do track | `var(--dss-gray-200)` |

**CircularProgress / Spinner:**

| Propriedade | Valor DSS |
|---|---|
| Espessura do traço | `4px` |
| Cor | `var(--dss-action-primary)` |
| Cor do track | `var(--dss-gray-200)` |

---

## 8. Navegação (Breadcrumbs, Pagination, Stepper)

### O que as referências mostram

**Material Design 3** — Breadcrumbs (não tem componente nativo, mas padrão de link):
- Links: cor primária, sem sublinhado por padrão, sublinhado no hover.
- Separador: `/` ou `>` em `on-surface-variant`.
- Item atual: texto `on-surface` (escuro), sem link.

**IBM Carbon** — Breadcrumb:
- Links: `#0f62fe`, sem sublinhado, sublinhado no hover.
- Separador: `/` em `#c6c6c6`.
- Item atual: texto `#161616`, `font-weight: 400`.

**Salesforce Lightning** — Breadcrumbs:
- Links: `#0176d3`, sem sublinhado.
- Item atual: texto `#3e3e3c`, `font-weight: 700`.

**IBM Carbon** — Pagination:
- Página ativa: fundo `#0f62fe`, texto branco.
- Páginas inativas: fundo transparente, texto `#161616`.
- Hover: fundo `#e8e8e8`.
- `border-radius: 0` (Carbon) ou `4px`.

**Material Design 3** — Stepper (não nativo, mas padrão):
- Step ativo: círculo `24px`, fundo `primary`, número branco.
- Step concluído: círculo `24px`, fundo `primary`, ícone de check branco.
- Step inativo: círculo `24px`, borda `1px solid on-surface-variant`, número `on-surface-variant`.
- Linha conectora: `1px solid outline-variant`.

### Como o DSS deveria se parecer

**Breadcrumbs:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Cor do link | Repouso | `var(--dss-text-action)` — mapeia para `action-primary` |
| Decoração | Repouso | `none` |
| Decoração | Hover | `underline` |
| Cor do item atual | — | `var(--dss-text-body)` |
| `font-weight` item atual | — | `var(--dss-font-weight-medium)` |

**Pagination:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Fundo da página ativa | — | `var(--dss-action-primary)` |
| Texto da página ativa | — | `var(--dss-text-inverse)` |
| Fundo hover | — | `var(--dss-surface-hover)` |
| `border-radius` | — | `var(--dss-radius-sm)` — 4px |

**Stepper:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Círculo ativo | — | fundo `var(--dss-action-primary)`, texto `var(--dss-text-inverse)` |
| Círculo concluído | — | fundo `var(--dss-action-primary)`, ícone check branco |
| Círculo inativo | — | borda `1px solid var(--dss-gray-400)`, texto `var(--dss-text-subtle)` |
| Linha conectora | — | `1px solid var(--dss-gray-300)` |

---

## 9. Listas e Itens

### O que as referências mostram

**Material Design 3** — List:
- Item padrão: `height: 56px` (com suporte), `padding: 0 16px`.
- Item ativo/selecionado: fundo `secondary-container` (tintado), texto `on-secondary-container`.
- Hover: overlay `on-surface` a 8%.
- Divider: `1px solid outline-variant`.
- Leading element (avatar/ícone): `40px`, margem direita `16px`.

**IBM Carbon** — List:
- Item: `height: 40px`, `padding: 0 16px`.
- Hover: fundo `#e8e8e8`.
- Selecionado: fundo `#e8e8e8` + borda esquerda `4px solid #0f62fe`.

**Salesforce Lightning** — List:
- Item: `height: 32px`, `padding: 0 12px`.
- Hover: fundo `#f3f2f2`.
- Selecionado: texto `#0176d3`, `font-weight: 700`.

### Como o DSS deveria se parecer

| Propriedade | Estado | Valor DSS |
|---|---|---|
| `height` | — | `56px` (com suporte) / `48px` (simples) |
| `padding` | — | `0 var(--dss-spacing-4)` — 0 16px |
| Fundo hover | — | `var(--dss-surface-hover)` |
| Fundo ativo | — | `var(--dss-action-primary-surface)` — primary a 8% |
| Texto ativo | — | `var(--dss-action-primary)` |
| Divider | — | `1px solid var(--dss-gray-200)` |

---

## 10. Avatar e Indicadores

### O que as referências mostram

**Material Design 3** — Avatar (não nativo, mas padrão de profile picture):
- Circular, `40px` padrão.
- Sem imagem: fundo `primary-container`, iniciais em `on-primary-container`.
- Com imagem: `object-fit: cover`, `border-radius: 50%`.

**IBM Carbon** — Avatar:
- Circular, `32px` padrão.
- Sem imagem: fundo colorido por tipo/status.

**Material Design 3** — Badge:
- Pequeno (dot): `6px`, fundo `error`.
- Com número: `16px height`, `border-radius: 8px`, fundo `error` ou `primary`.
- `font-size: 11px`, `font-weight: 500`, texto branco.

### Como o DSS deveria se parecer

**Avatar:**

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `50%` |
| Tamanho padrão | `40px × 40px` |
| Fundo (sem imagem) | `var(--dss-action-primary-surface)` — primary a 8% |
| Texto/ícone (sem imagem) | `var(--dss-action-primary)` |

> **Observação:** O fundo do avatar sem imagem deve ser o tintado claro (`action-primary-surface`), não o `surface-muted` (cinza). Isso dá identidade visual ao componente sem ser agressivo.

**Badge:**

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` |
| `height` | `16px` |
| `min-width` | `16px` |
| `padding` | `0 4px` |
| Fundo | `var(--dss-action-primary)` |
| Texto | `var(--dss-text-inverse)` |
| `font-size` | `11px` |

---

## 11. Ponto Crítico: O que diverge do que foi implementado

| Componente | O que foi implementado | O que as referências indicam |
|---|---|---|
| **Checkbox/Radio unchecked** | Borda na cor `primary` | Borda em `gray-500` (cinza médio) — primary só no checked |
| **Toggle unchecked** | Track em `surface-muted` (cinza) | Track com borda `2px solid gray-400` + thumb cinza — correto |
| **Avatar sem imagem** | Fundo `surface-muted` (cinza) | Fundo `action-primary-surface` (tintado claro) |
| **Button border-radius** | `radius-full` aplicado | Correto — M3 usa pílula |
| **Input focus** | Label muda para primary | Correto — M3 e Carbon fazem isso |
| **Tabs indicador** | `currentColor` herdado | Deve ser explicitamente `3px solid action-primary` |

---

## 12. Resumo: Valores Concretos por Componente

| Componente | Propriedade | Valor correto |
|---|---|---|
| Button (primary) | background | `var(--dss-action-primary)` |
| Button (primary) | border-radius | `var(--dss-radius-full)` |
| Button (primary) | height | `44px` |
| Button (primary) | font-weight | `500` |
| Button (primary) | text-transform | `none` |
| Input | border (repouso) | `1px solid var(--dss-gray-400)` |
| Input | border (foco) | `2px solid var(--dss-action-primary)` |
| Input | border-radius | `var(--dss-radius-md)` — 8px |
| Input | label (foco) | `var(--dss-action-primary)` |
| Checkbox | borda (unchecked) | `2px solid var(--dss-gray-500)` |
| Checkbox | fundo (checked) | `var(--dss-action-primary)` |
| Radio | borda (unchecked) | `2px solid var(--dss-gray-500)` |
| Radio | borda (checked) | `2px solid var(--dss-action-primary)` |
| Toggle | track (off) | `var(--dss-surface-muted)` + borda `2px solid var(--dss-gray-400)` |
| Toggle | track (on) | `var(--dss-action-primary)` |
| Card | border-radius | `var(--dss-radius-lg)` — 12px |
| Card | box-shadow | `var(--dss-elevation-1)` |
| Tab ativa | color | `var(--dss-action-primary)` |
| Tab ativa | indicador | `3px solid var(--dss-action-primary)` |
| Tab inativa | color | `var(--dss-text-subtle)` |
| Avatar (sem imagem) | background | `var(--dss-action-primary-surface)` |
| Avatar (sem imagem) | color | `var(--dss-action-primary)` |
| Badge | background | `var(--dss-action-primary)` |
| Badge | border-radius | `var(--dss-radius-full)` |
| Breadcrumb link | color | `var(--dss-text-action)` |
| Breadcrumb link | hover | `text-decoration: underline` |
| Pagination ativa | background | `var(--dss-action-primary)` |
| Stepper ativo | background | `var(--dss-action-primary)` |
| LinearProgress | track | `var(--dss-gray-200)` |
| LinearProgress | indicador | `var(--dss-action-primary)` |
| Spinner | color | `var(--dss-action-primary)` |

---

## 13. Especificações Visuais Default — Componente por Componente

> **Propósito desta seção:** As seções 1–12 trataram majoritariamente de **cor**. Esta seção amplia a referência visual cobrindo **TODOS** os aspectos que constroem a UI default de cada componente DSS — dimensões, padding, gap, border-radius, espessura de stroke, sombra, tipografia, iconografia e estados. Estes valores correspondem 1:1 ao que está renderizado como **default** nos playgrounds das páginas de cada componente em `src/pages/components/`.
>
> **Regra de leitura:** Toda linha "Valor" abaixo é o estado **default** (sem variantes aplicadas, sem brand, sem cor semântica, sem feedback). É o ponto de partida visual neutro que o agente de implementação DEVE reproduzir na Layer 2 (`_base.scss`) antes de adicionar variantes.
>
> **Notação:** valores em px aparecem entre parênteses como referência ao token. Tokens DSS são a fonte canônica.

---

### 13.1 DssButton

| Aspecto | Valor default | Token |
|---|---|---|
| Variante default | `elevated` (filled) | — |
| `height` | 44px | `--dss-touch-target-md` |
| `min-width` | 64px | — |
| `padding` (horizontal) | 24px | `--dss-spacing-6` |
| `padding` (vertical) | 0 | — |
| `border-radius` | full (pílula) | `--dss-radius-full` |
| `border-width` | 0 (sem borda no filled) | `--dss-border-width-none` |
| `background` | action-primary (azul) | `--dss-action-primary` |
| `color` | branco | `--dss-text-inverse` |
| `font-family` | sans | `--dss-font-family-sans` |
| `font-size` | 14px | `--dss-font-size-sm` |
| `font-weight` | 500 | `--dss-font-weight-medium` |
| `letter-spacing` | 0.01em | — |
| `text-transform` | none | — |
| `line-height` | 1 | — |
| `gap` (ícone + label) | 8px | `--dss-spacing-2` |
| Tamanho do ícone | 20px | — |
| `box-shadow` | nenhum | — |
| Hover | `brightness(0.95)` | — |
| Focus | outline 3px action-primary, offset 2px | `--dss-focus-ring` |
| Active | `brightness(0.90)` | — |
| Disabled | `opacity: 0.38` | `--dss-opacity-disabled` |
| Transition | 200ms standard | `--dss-duration-200` |

---

### 13.2 DssFab (Floating Action Button)

| Aspecto | Valor default | Token |
|---|---|---|
| Forma | circular | — |
| `width` × `height` | 56px × 56px | — |
| `padding` | 0 | — |
| `border-radius` | full (50%) | `--dss-radius-full` |
| `background` | action-primary | `--dss-action-primary` |
| `color` (ícone) | branco | `--dss-text-inverse` |
| Tamanho do ícone | 24px | — |
| `box-shadow` | elevation-3 | `--dss-elevation-3` |
| Hover | elevation-4 + brightness(0.95) | `--dss-elevation-4` |
| Focus | outline 3px offset 2px | `--dss-focus-ring` |
| Variante `mini` | 40px × 40px, ícone 20px | — |
| Variante `extended` | height 48px, padding 0 20px, com label | — |

---

### 13.3 DssBtnGroup

| Aspecto | Valor default | Token |
|---|---|---|
| Layout | `display: inline-flex` | — |
| `gap` entre botões | 0 (botões coladas) | — |
| `border-radius` no grupo | full nas extremidades, 0 no meio | `--dss-radius-full` |
| `border-width` interna entre botões | 1px divisor | `--dss-border-width-thin` |
| Cor do divisor | branco a 20% opacity | — |
| Altura dos botões | 44px (`md`) | `--dss-touch-target-md` |
| Spread mode | botões ocupam largura total com `flex: 1` | — |

---

### 13.4 DssBtnDropdown

Herda **100%** do `DssButton` + acréscimos:

| Aspecto | Valor default | Token |
|---|---|---|
| Ícone caret (dropdown arrow) | 16px, à direita | — |
| `gap` entre label e caret | 4px | `--dss-spacing-1` |
| `padding-right` (com caret) | 16px | `--dss-spacing-4` |
| Painel popup `border-radius` | 8px | `--dss-radius-md` |
| Painel popup `box-shadow` | elevation-3 | `--dss-elevation-3` |
| Painel popup `padding` | 8px | `--dss-spacing-2` |
| Painel popup `background` | surface-default | `--dss-surface-default` |
| Painel popup `min-width` | largura do botão | — |
| Item do painel `height` | 40px | — |
| Item `padding` | 0 16px | `--dss-spacing-4` |

---

### 13.5 DssInput

| Aspecto | Valor default | Token |
|---|---|---|
| Variante default | `outlined` | — |
| `height` | 44px | `--dss-input-height-md` |
| `min-width` | 240px | — |
| `padding` (horizontal) | 16px | `--dss-spacing-4` |
| `padding` (vertical) | 8px | `--dss-spacing-2` |
| `border-width` (repouso) | 1px | `--dss-border-width-thin` |
| `border-width` (foco/erro) | 2px | `--dss-border-width-md` |
| `border-color` (repouso) | gray-400 | `--dss-gray-400` |
| `border-color` (hover) | gray-600 | `--dss-gray-600` |
| `border-color` (foco) | action-primary | `--dss-action-primary` |
| `border-radius` | 8px | `--dss-radius-md` |
| `background` | transparente | — |
| `color` (texto digitado) | text-body | `--dss-text-body` |
| `font-size` | 14px | `--dss-font-size-md` |
| `font-weight` | 400 (normal) | `--dss-font-weight-normal` |
| `line-height` | 1.5 | `--dss-line-height-normal` |
| Label flutuante: tamanho repouso | 14px | `--dss-font-size-md` |
| Label flutuante: tamanho ativo | 12px | `--dss-font-size-sm` |
| Label cor (repouso) | text-subtle | `--dss-text-subtle` |
| Label cor (foco) | action-primary | `--dss-action-primary` |
| Notch (fundo atrás do label) | surface-default, padding 0 4px | `--dss-spacing-1` |
| Placeholder cor | text-hint | `--dss-text-hint` |
| Ícone leading/trailing tamanho | 20px | — |
| `gap` entre input e ícones | 8px | `--dss-spacing-2` |
| Mensagem hint/erro: tamanho | 12px | `--dss-font-size-sm` |
| Mensagem hint/erro: margin-top | 4px | `--dss-spacing-1` |

---

### 13.6 DssCheckbox

| Aspecto | Valor default | Token |
|---|---|---|
| Tamanho do controle | 18px × 18px | — |
| `border-radius` | 4px | `--dss-radius-sm` |
| `border-width` (unchecked) | 2px | `--dss-border-width-md` |
| `border-color` (unchecked) | gray-500 | `--dss-gray-500` |
| `background` (unchecked) | transparente | — |
| `background` (checked) | action-primary | `--dss-action-primary` |
| `border-width` (checked) | 0 (sem borda visível) | — |
| Ícone check (checked) | 14px, branco | `--dss-text-inverse` |
| Estado indeterminate | fundo action-primary, traço horizontal branco 10px | — |
| Touch target (via padding/wrapper) | 44px × 44px | `--dss-touch-target-md` |
| `gap` entre checkbox e label | 8px | `--dss-spacing-2` |
| Label `font-size` | 14px | `--dss-font-size-md` |
| Label cor | text-body | `--dss-text-body` |
| Focus ring | outline 3px action-primary, offset 2px | `--dss-focus-ring` |

---

### 13.7 DssToggle (Switch)

| Aspecto | Valor default | Token |
|---|---|---|
| Track `width` × `height` | 52px × 32px | — |
| Track `border-radius` | full | `--dss-radius-full` |
| Track `border-width` (off) | 2px | `--dss-border-width-md` |
| Track `border-color` (off) | gray-400 | `--dss-gray-400` |
| Track `background` (off) | surface-muted | `--dss-surface-muted` |
| Track `background` (on) | action-primary | `--dss-action-primary` |
| Track `border-width` (on) | 0 | — |
| Thumb tamanho (off) | 16px | — |
| Thumb tamanho (on) | 24px | — |
| Thumb `background` (off) | gray-500 | `--dss-gray-500` |
| Thumb `background` (on) | branco | `--dss-text-inverse` |
| Thumb deslocamento | 4px da borda do track | `--dss-spacing-1` |
| Transição thumb | 200ms standard, easing spring | `--dss-duration-200` |
| `gap` toggle ↔ label | 12px | `--dss-spacing-3` |

---

### 13.8 DssRange (Slider)

| Aspecto | Valor default | Token |
|---|---|---|
| Track `height` | 4px | — |
| Track `border-radius` | full (9999px — EX-01) | `--dss-radius-full` |
| Track `background` (não preenchido) | gray-300 | `--dss-gray-300` |
| Track `background` (preenchido) | action-primary | `--dss-action-primary` |
| Thumb tamanho | 20px | — |
| Thumb `border-radius` | 50% | — |
| Thumb `background` | action-primary | `--dss-action-primary` |
| Thumb `box-shadow` | elevation-1 | `--dss-elevation-1` |
| Focus ring (thumb) | 8px halo action-primary 20% opacity | — |
| Touch target (área do thumb) | 44px | `--dss-touch-target-md` |
| Label de valor `font-size` | 12px | `--dss-font-size-xs` |
| Marks: tamanho | 4px ponto | — |
| Marks: cor | gray-400 | `--dss-gray-400` |

---

### 13.9 DssKnob

| Aspecto | Valor default | Token |
|---|---|---|
| Tamanho default (`md`) | 80px × 80px | — |
| Forma | circular | — |
| Track `stroke-width` | 8px | — |
| Track cor (não preenchido) | gray-200 | `--dss-gray-200` |
| Track cor (preenchido) | action-primary | `--dss-action-primary` |
| Label central `font-size` | 18px | `--dss-font-size-lg` |
| Label central `font-weight` | 500 | `--dss-font-weight-medium` |
| Label central cor | text-body | `--dss-text-body` |
| Tamanhos disponíveis | xs 40, sm 60, md 80, lg 120 | — |

---

### 13.10 DssChip

| Aspecto | Valor default | Token |
|---|---|---|
| `height` | 32px | `--dss-compact-control-height-md` |
| `padding` (horizontal) | 12px | `--dss-spacing-3` |
| `border-radius` | full (pílula) | `--dss-radius-full` |
| `border-width` | 1px | `--dss-border-width-thin` |
| `border-color` | gray-300 | `--dss-gray-300` |
| `background` | surface-muted | `--dss-surface-muted` |
| `color` | text-body | `--dss-text-body` |
| `font-size` | 12px | `--dss-font-size-xs` |
| `font-weight` | 500 | `--dss-font-weight-medium` |
| `gap` (ícone + label + remove) | 8px | `--dss-spacing-2` |
| Tamanho ícone leading | 16px | — |
| Botão de remoção: tamanho | 16px | — |
| Touch target (`::before`) | 44px | `--dss-touch-target-md` |
| Selected: `background` | action-primary | `--dss-action-primary` |
| Selected: `color` | branco | `--dss-text-inverse` |

---

### 13.11 DssBadge

| Aspecto | Valor default | Token |
|---|---|---|
| `min-height` | 24px (altura visual) | `--dss-compact-control-height-sm` |
| `min-width` | 24px | `--dss-compact-control-height-sm` |
| `padding` | 2px 4px | `--dss-spacing-0_5` / `--dss-spacing-1` |
| `border-radius` | full | `--dss-radius-full` |
| `border-width` | 0 | — |
| `background` | action-primary | `--dss-action-primary` |
| `color` | branco | `--dss-text-inverse` |
| `font-size` | 12px | `--dss-font-size-xs` |
| `font-weight` | 500 | `--dss-font-weight-medium` |
| `line-height` | 1 | — |
| Variante `dot` | 8px × 8px sem texto | — |
| `vertical-align` | middle | — |

---

### 13.12 DssAvatar

| Aspecto | Valor default | Token |
|---|---|---|
| Tamanho default (`md`) | 40px × 40px | — |
| Forma | circular | — |
| `border-radius` | 50% | — |
| `background` (sem imagem) | action-primary-surface (primary 8%) | `--dss-action-primary-surface` |
| `color` iniciais | action-primary | `--dss-action-primary` |
| Iniciais `font-size` | 14px (`md`) | `--dss-font-size-md` |
| Iniciais `font-weight` | 500 | `--dss-font-weight-medium` |
| Imagem `object-fit` | cover | — |
| Tamanhos | xs 24, sm 32, md 40, lg 48, xl 64 | — |
| Badge sobreposto: posição | top-right, offset -2px | — |

---

### 13.13 DssCard

| Aspecto | Valor default | Token |
|---|---|---|
| `border-radius` | 12px | `--dss-radius-lg` |
| `background` | surface-default | `--dss-surface-default` |
| `border-width` | 0 (variante elevated default) | — |
| `box-shadow` | elevation-1 | `--dss-elevation-1` |
| Hover (clickable) | elevation-2 | `--dss-elevation-2` |
| Section `padding` | 24px | `--dss-spacing-6` |
| Section divider (entre sections) | 1px solid gray-200 | `--dss-gray-200` |
| Actions `padding` | 16px | `--dss-spacing-4` |
| Actions `gap` entre botões | 8px | `--dss-spacing-2` |
| Variante `flat`: shadow | nenhum | — |
| Variante `outlined`: border | 1px solid gray-200 | `--dss-gray-200` |
| Variante `square`: radius | 0 | — |
| Transição | 200ms standard | `--dss-duration-200` |

---

### 13.14 DssDialog (Modal)

| Aspecto | Valor default | Token |
|---|---|---|
| Backdrop (overlay) | rgba(0,0,0,0.5) | `--dss-overlay-default` |
| Container `max-width` | 560px (`md`) | — |
| Container `border-radius` | 12px | `--dss-radius-lg` |
| Container `background` | surface-default | `--dss-surface-default` |
| Container `box-shadow` | elevation-5 | `--dss-elevation-5` |
| Container `padding` | 24px | `--dss-spacing-6` |
| Título `font-size` | 20px | `--dss-font-size-xl` |
| Título `font-weight` | 500 | `--dss-font-weight-medium` |
| Título `margin-bottom` | 16px | `--dss-spacing-4` |
| Conteúdo `font-size` | 14px | `--dss-font-size-md` |
| Footer actions `gap` | 8px | `--dss-spacing-2` |
| Footer actions `margin-top` | 24px | `--dss-spacing-6` |
| Footer alignment | flex-end | — |
| Animação entrada | scale 0.95→1 + fade 200ms | — |

---

### 13.15 DssDrawer

| Aspecto | Valor default | Token |
|---|---|---|
| Side default | `left` | — |
| `width` (vertical) | 280px | — |
| `height` (vertical) | 100vh | — |
| `background` | surface-default | `--dss-surface-default` |
| `box-shadow` | elevation-4 | `--dss-elevation-4` |
| `border-radius` | 0 | — |
| Backdrop | rgba(0,0,0,0.5) | `--dss-overlay-default` |
| Header `padding` | 16px 24px | `--dss-spacing-4` / `--dss-spacing-6` |
| Header `border-bottom` | 1px solid gray-200 | `--dss-gray-200` |
| Header `font-size` | 16px | `--dss-font-size-lg` |
| Content `padding` | 16px | `--dss-spacing-4` |
| Animação | slide 250ms standard | `--dss-duration-250` |
| Mini variant width | 56px | — |

---

### 13.16 DssMenu

| Aspecto | Valor default | Token |
|---|---|---|
| Container `min-width` | 200px | — |
| Container `border-radius` | 8px | `--dss-radius-md` |
| Container `background` | surface-default | `--dss-surface-default` |
| Container `box-shadow` | elevation-3 | `--dss-elevation-3` |
| Container `padding` | 8px 0 | `--dss-spacing-2` |
| Item `height` | 40px | — |
| Item `padding` | 0 16px | `--dss-spacing-4` |
| Item `font-size` | 14px | `--dss-font-size-md` |
| Item `color` | text-body | `--dss-text-body` |
| Item `gap` (ícone + label) | 12px | `--dss-spacing-3` |
| Ícone item tamanho | 20px | — |
| Hover `background` | surface-hover | `--dss-surface-hover` |
| Divider | 1px solid gray-200, margin 8px 0 | `--dss-gray-200` |
| Separador de seção `font-size` | 12px text-subtle | `--dss-font-size-sm` |
| Atalho de teclado: alinhamento | direita, color text-subtle | `--dss-text-subtle` |

---

### 13.17 DssTooltip

| Aspecto | Valor default | Token |
|---|---|---|
| `background` | gray-900 | `--dss-gray-900` |
| `color` | branco | `--dss-text-inverse` |
| `padding` | 6px 8px | `--dss-spacing-1_5` / `--dss-spacing-2` |
| `border-radius` | 4px | `--dss-radius-sm` |
| `font-size` | 12px | `--dss-font-size-xs` |
| `font-weight` | 400 | `--dss-font-weight-normal` |
| `max-width` | 240px | — |
| `box-shadow` | elevation-2 | `--dss-elevation-2` |
| Offset do trigger | 8px | `--dss-spacing-2` |
| Delay show | 500ms | — |
| Delay hide | 0ms | — |
| Animação | fade 150ms | `--dss-duration-150` |

---

### 13.18 DssTabs

| Aspecto | Valor default | Token |
|---|---|---|
| Container `height` | 44px | `--dss-touch-target-md` |
| Container `border-bottom` | 1px solid gray-200 | `--dss-gray-200` |
| Tab `padding` | 0 16px | `--dss-spacing-4` |
| Tab `font-size` | 14px | `--dss-font-size-md` |
| Tab `font-weight` (ativa) | 500 | `--dss-font-weight-medium` |
| Tab `font-weight` (inativa) | 400 | `--dss-font-weight-normal` |
| Tab color (ativa) | action-primary | `--dss-action-primary` |
| Tab color (inativa) | text-subtle | `--dss-text-subtle` |
| Indicador `height` | 3px | — |
| Indicador `border-radius` | 3px 3px 0 0 | — |
| Indicador `background` | action-primary | `--dss-action-primary` |
| Indicador animação | translateX 250ms standard | `--dss-duration-250` |
| Tab `gap` (ícone + label) | 8px | `--dss-spacing-2` |
| Hover `background` | surface-hover | `--dss-surface-hover` |
| Setas de navegação (arrow): color | text-subtle | `--dss-text-subtle` |
| Tab Panel `padding` | 24px | `--dss-spacing-6` |

---

### 13.19 DssToolbar

| Aspecto | Valor default | Token |
|---|---|---|
| `height` | 56px | — |
| `padding` (horizontal) | 16px | `--dss-spacing-4` |
| `background` | surface-default | `--dss-surface-default` |
| `border-bottom` | 1px solid gray-200 | `--dss-gray-200` |
| `box-shadow` | nenhum (flat default) | — |
| `gap` entre itens | 8px | `--dss-spacing-2` |
| Título `font-size` | 16px | `--dss-font-size-lg` |
| Título `font-weight` | 500 | `--dss-font-weight-medium` |
| Botões de ação tamanho | 40px (touch target compact) | — |
| Variante `elevated` | + box-shadow elevation-2 | `--dss-elevation-2` |
| Dense `height` | 48px | — |

---

### 13.20 DssHeader

| Aspecto | Valor default | Token |
|---|---|---|
| `height` | 64px | — |
| `padding` (horizontal) | 24px | `--dss-spacing-6` |
| `background` | surface-default | `--dss-surface-default` |
| `border-bottom` | 1px solid gray-200 | `--dss-gray-200` |
| `box-shadow` | elevation-1 | `--dss-elevation-1` |
| Logo `height` | 32px | — |
| Brand title `font-size` | 18px | `--dss-font-size-lg` |
| Brand title `font-weight` | 600 | `--dss-font-weight-semibold` |
| `gap` (logo + título) | 12px | `--dss-spacing-3` |
| Ações à direita `gap` | 8px | `--dss-spacing-2` |
| Avatar do usuário tamanho | 32px | — |

---

### 13.21 DssPage (Layout container)

| Aspecto | Valor default | Token |
|---|---|---|
| `min-height` | 100vh | — |
| `background` | surface-base | `--dss-surface-base` |
| `padding` | 24px | `--dss-spacing-6` |
| Container `max-width` | 1200px | — |
| Container alinhamento | center (margin auto) | — |
| Section `gap` vertical | 32px | `--dss-spacing-8` |

---

### 13.22 DssBar

| Aspecto | Valor default | Token |
|---|---|---|
| `min-height` | 44px | `--dss-touch-target-md` |
| `padding` | 8px 16px | `--dss-spacing-2` / `--dss-spacing-4` |
| `background` | surface-default | `--dss-surface-default` |
| `color` | text-body | `--dss-text-body` |
| `font-size` | 14px | `--dss-font-size-md` |
| `font-weight` | 400 | `--dss-font-weight-normal` |
| `border-radius` | 0 | — |
| `box-shadow` | elevation-1 | `--dss-elevation-1` |
| `gap` | 8px | `--dss-spacing-2` |
| Dense `min-height` | 32px | `--dss-compact-control-height-md` |

---

### 13.23 DssBreadcrumbsEl

| Aspecto | Valor default | Token |
|---|---|---|
| Container `height` | 32px | — |
| `gap` entre itens | 8px | `--dss-spacing-2` |
| Link `font-size` | 14px | `--dss-font-size-md` |
| Link `font-weight` | 400 | `--dss-font-weight-normal` |
| Link color | text-action (action-primary) | `--dss-text-action` |
| Link decoração (repouso) | none | — |
| Link decoração (hover) | underline | — |
| Separador (`/` ou `>`) color | gray-400 | `--dss-gray-400` |
| Separador `font-size` | 14px | `--dss-font-size-md` |
| Item atual color | text-body | `--dss-text-body` |
| Item atual `font-weight` | 500 | `--dss-font-weight-medium` |

---

### 13.24 DssPagination

| Aspecto | Valor default | Token |
|---|---|---|
| Item `width` × `height` | 32px × 32px | — |
| Item `border-radius` | 4px | `--dss-radius-sm` |
| Item `font-size` | 14px | `--dss-font-size-md` |
| Item `font-weight` (inativo) | 400 | `--dss-font-weight-normal` |
| Item `font-weight` (ativo) | 500 | `--dss-font-weight-medium` |
| Item color (inativo) | text-body | `--dss-text-body` |
| Item color (ativo) | branco | `--dss-text-inverse` |
| Item `background` (ativo) | action-primary | `--dss-action-primary` |
| Item `background` (hover inativo) | surface-hover | `--dss-surface-hover` |
| `gap` entre itens | 4px | `--dss-spacing-1` |
| Ícones de navegação tamanho | 20px | — |
| Ellipsis (...) color | text-subtle | `--dss-text-subtle` |

---

### 13.25 DssFile (File upload)

Herda visual de **DssInput** + acréscimos para drop zone:

| Aspecto | Valor default | Token |
|---|---|---|
| Drop zone `min-height` | 120px | — |
| Drop zone `border` | 2px dashed gray-400 | `--dss-gray-400` |
| Drop zone `border-radius` | 8px | `--dss-radius-md` |
| Drop zone `background` | surface-muted | `--dss-surface-muted` |
| Drop zone `padding` | 24px | `--dss-spacing-6` |
| Drop zone hover/dragover: border | 2px dashed action-primary | `--dss-action-primary` |
| Drop zone hover/dragover: background | action-primary-surface | `--dss-action-primary-surface` |
| Ícone upload tamanho | 32px | — |
| Lista de arquivos: item `padding` | 8px 12px | — |
| Lista item `gap` | 8px | `--dss-spacing-2` |
| Lista item `border-radius` | 4px | `--dss-radius-sm` |
| Botão remover tamanho | 24px | — |

---

### 13.26 DssForm

| Aspecto | Valor default | Token |
|---|---|---|
| Layout default | `vertical` | — |
| `gap` entre campos (gutter) | 16px | `--dss-spacing-4` |
| Density default | `md` (altura controles 44px) | `--dss-compact-control-height-md` |
| Layout `horizontal`: label width | 30% | — |
| Layout `inline`: `gap` | 12px | `--dss-spacing-3` |
| Submit/Reset `gap` | 8px | `--dss-spacing-2` |
| Submit area `margin-top` | 24px | `--dss-spacing-6` |
| Mensagem de validação `font-size` | 12px | `--dss-font-size-sm` |
| Mensagem de validação `margin-top` | 4px | `--dss-spacing-1` |
| Ícone de erro tamanho | 16px | — |

---

### 13.27 DssImg

| Aspecto | Valor default | Token |
|---|---|---|
| `width` | 100% do contêiner | — |
| `border-radius` | 0 (sem corte) | — |
| `object-fit` | cover | — |
| Placeholder (loading): `background` | gray-100 | `--dss-gray-100` |
| Placeholder (loading): animação shimmer | 1500ms | — |
| Erro (broken): `background` | gray-200 | `--dss-gray-200` |
| Erro: ícone placeholder | 32px gray-500 | `--dss-gray-500` |
| Ratio default | sem ratio fixo | — |
| Transição fade-in | 300ms ease | `--dss-duration-300` |

---

### 13.28 DssVideo

| Aspecto | Valor default | Token |
|---|---|---|
| Container `border-radius` | 8px | `--dss-radius-md` |
| Container `background` | gray-900 | `--dss-gray-900` |
| Container aspect-ratio | 16/9 | — |
| Controles `background` | rgba(0,0,0,0.7) gradient bottom | — |
| Controles `padding` | 12px 16px | — |
| Botão play tamanho | 40px | — |
| Ícone play tamanho | 24px | — |
| Slider de progresso `height` | 4px | — |
| Slider de progresso `background` | rgba(255,255,255,0.3) | — |
| Slider preenchido | action-primary | `--dss-action-primary` |
| Texto de tempo `font-size` | 12px branco | `--dss-font-size-xs` |
| Botão fullscreen tamanho | 32px | — |

---

### 13.29 DssCarrossel

| Aspecto | Valor default | Token |
|---|---|---|
| Container `border-radius` | 8px | `--dss-radius-md` |
| Container `background` | surface-default | `--dss-surface-default` |
| Slide `padding` | 24px | `--dss-spacing-6` |
| Setas (arrows): tamanho | 40px circular | — |
| Setas `background` | rgba(0,0,0,0.4) | — |
| Setas `color` | branco | `--dss-text-inverse` |
| Setas posição | 16px das bordas | `--dss-spacing-4` |
| Setas hover `background` | rgba(0,0,0,0.6) | — |
| Indicadores (dots): tamanho | 8px circular | — |
| Indicadores `gap` | 8px | `--dss-spacing-2` |
| Indicador inativo `background` | rgba(255,255,255,0.5) | — |
| Indicador ativo `background` | branco | `--dss-text-inverse` |
| Indicadores posição | 16px da borda inferior | `--dss-spacing-4` |
| Transição entre slides | 300ms ease-in-out | `--dss-duration-300` |

---

### 13.30 DssInfiniteScroll

Componente comportamental — sem UI visível própria, governa o gatilho de carregamento.

| Aspecto | Valor default | Token |
|---|---|---|
| Sentinel (trigger) `height` | 1px (invisível) | — |
| Offset (distância para disparar) | 500px antes do fim | — |
| Spinner de loading: tamanho | 32px | — |
| Spinner color | action-primary | `--dss-action-primary` |
| Spinner container `padding` | 24px | `--dss-spacing-6` |
| Spinner container alinhamento | center | — |
| Mensagem "fim da lista" `font-size` | 12px text-subtle | `--dss-text-subtle` |

---

## 14. Decisões Visuais Transversais (Aplicam a TODOS os componentes)

Estas regras complementam as especificações da Seção 13 e DEVEM ser aplicadas por padrão na ausência de instrução em contrário.

### 14.1 Hierarquia de border-radius

| Categoria | Token | Uso |
|---|---|---|
| Controles compactos quadrados (checkbox) | `--dss-radius-sm` (4px) | Checkbox, Pagination item |
| Controles interativos (input, menu, tooltip) | `--dss-radius-md` (8px) | Input, Select, Menu, Tooltip, Drop zone |
| Superfícies (card, dialog, drawer header) | `--dss-radius-lg` (12px) | Card, Dialog |
| Pílulas (botões, chips, badges, toggle) | `--dss-radius-full` | Button, Chip, Badge, Toggle, Slider track |
| Sem arredondamento (estrutural) | `0` | Page, Toolbar, Bar, Drawer container |

### 14.2 Hierarquia de elevation (box-shadow)

| Nível | Token | Uso |
|---|---|---|
| Nenhuma | — | Input, Chip, Badge, Checkbox, Toggle, Tabs |
| 1 (sutil) | `--dss-elevation-1` | Card default, Header, Bar |
| 2 (hover de card / toolbar elevated) | `--dss-elevation-2` | Card hover, Toolbar elevated, Tooltip |
| 3 (popups) | `--dss-elevation-3` | Menu, BtnDropdown panel, FAB |
| 4 (drawer) | `--dss-elevation-4` | Drawer, FAB hover |
| 5 (dialog) | `--dss-elevation-5` | Dialog, Modal |

### 14.3 Hierarquia de densidade (height)

| Token | Valor | Componentes |
|---|---|---|
| `--dss-compact-control-height-xs` | 16px | Badge dot |
| `--dss-compact-control-height-sm` | 24px | Badge, Bar dense |
| `--dss-compact-control-height-md` | 32px | Chip, Pagination, Breadcrumb, Bar |
| `--dss-touch-target-md` | 44px | Button, Input, Tabs, Toolbar action, Range thumb area |

> **Regra de ouro:** Componentes **interativos com hit-area direta do dedo** usam 44px. Componentes **informativos ou agrupados em containers maiores** podem usar 32px/24px com touch target compensado via `::before` (WCAG 2.5.5).

### 14.4 Hierarquia de spacing (gap interno)

| Contexto | Valor | Token |
|---|---|---|
| Ícone + label dentro do mesmo controle | 8px | `--dss-spacing-2` |
| Itens horizontais em lista compacta (toolbar, breadcrumb) | 8px | `--dss-spacing-2` |
| Itens verticais em formulário | 16px | `--dss-spacing-4` |
| Padding interno de superfícies (card section, dialog) | 24px | `--dss-spacing-6` |
| Padding lateral de containers (page, header) | 24px | `--dss-spacing-6` |
| Gap entre seções de página | 32px | `--dss-spacing-8` |

### 14.5 Hierarquia de stroke (border-width)

| Token | Valor | Uso |
|---|---|---|
| `--dss-border-width-thin` | 1px | Divisores, borda repouso de input/chip/card outlined |
| `--dss-border-width-md` | 2px | Borda de foco de input, borda de checkbox/radio unchecked, borda de toggle track off |
| `--dss-border-width-thick` | 3px | Indicador de tab ativa, focus ring outline |

### 14.6 Hierarquia de tipografia

| Contexto | font-size | font-weight | Token size |
|---|---|---|---|
| Badge, tooltip, hint, mensagem de erro | 12px | 500 (badge) / 400 (resto) | `--dss-font-size-xs` |
| Texto de controle (button, input, chip, menu, tab) | 14px | 500 (button/tab ativa) / 400 (input/menu) | `--dss-font-size-md` ou `--dss-font-size-sm` |
| Título de toolbar, item de menu destacado | 16px | 500 | `--dss-font-size-lg` |
| Título de header, knob central | 18px | 500–600 | `--dss-font-size-lg` |
| Título de dialog | 20px | 500 | `--dss-font-size-xl` |

### 14.7 Estados universais

| Estado | Aplicação universal |
|---|---|
| Hover | `brightness(0.95)` em superfícies coloridas / `background: surface-hover` em superfícies neutras |
| Active (pressed) | `brightness(0.90)` |
| Focus | `outline: 3px solid var(--dss-focus-ring)`, `outline-offset: 2px` |
| Disabled | `opacity: var(--dss-opacity-disabled)` (0.38), `cursor: not-allowed`, `pointer-events: none` |
| Loading | spinner action-primary no centro, conteúdo `aria-busy="true"` |

### 14.8 Iconografia

| Contexto | Tamanho |
|---|---|
| Badge dot interno | sem ícone |
| Chip leading/trailing | 16px |
| Input leading/trailing | 20px |
| Button leading/trailing | 20px |
| Menu item, tab | 20px |
| Toolbar action, FAB extended | 24px |
| FAB padrão | 24px |
| Avatar fallback (sem iniciais) | 60% do tamanho do avatar |
| Empty state (img broken, file drop) | 32px |

### 14.9 Animação e duração

| Contexto | Duração | Easing |
|---|---|---|
| Hover/focus em controles | 150ms | standard |
| Transição de cor/border em formulário | 200ms | standard |
| Slide (drawer, carrossel) | 250–300ms | standard |
| Spring (toggle thumb) | 250ms | spring |
| Fade (tooltip, dialog) | 150–200ms | standard |

---

## 15. Checklist de Implementação Visual Default

Antes de marcar um componente como concluído, o agente DEVE verificar:

- [ ] Dimensões (`height`, `width`, `min-*`) correspondem à Seção 13 do componente
- [ ] `padding` horizontal e vertical correspondem à Seção 13
- [ ] `gap` interno entre elementos (ícone + label, label + caret, etc.) está aplicado
- [ ] `border-radius` segue a hierarquia da Seção 14.1
- [ ] `border-width` segue a hierarquia da Seção 14.5
- [ ] `box-shadow` (se aplicável) segue a hierarquia da Seção 14.2
- [ ] Tipografia (`font-size`, `font-weight`, `line-height`) segue a Seção 14.6
- [ ] Tamanho dos ícones segue a Seção 14.8
- [ ] Estados hover/focus/active/disabled implementados conforme Seção 14.7
- [ ] Densidade (height) corresponde à categoria do componente (Seção 14.3)
- [ ] Cor neutra default aplicada (sem brand, sem feedback) — cor só entra via prop
- [ ] Touch target ≥ 44px (direto ou via `::before` para controles compactos)
- [ ] Transição aplicada conforme Seção 14.9
- [ ] Validação visual lado-a-lado com a página de documentação correspondente em `src/pages/components/`

> **Regra de fechamento:** Se qualquer item acima falhar, o componente NÃO está pronto para entrega — independentemente da cor estar correta.
