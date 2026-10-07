# Sansys Water — Grid Master (dashboard)

> **Fonte:** Figma *Base Componentes — Sansys Water*, frame **`Grid master - dashboard`** (`1233:6030`), símbolo `container.base` (`1823:1062`), 1920 × 1080.
> **Implementação:** [`apps/sandbox/src/TestGridMasterDashboard.vue`](../../apps/sandbox/src/TestGridMasterDashboard.vue) — sandbox › Patterns › **Grid Master**.
> **Autoridade:** o Figma é **referência**; em conflito, o CSS do componente DSS prevalece (Constituição #6). Os desvios deliberados estão na última seção.

Este documento existe porque o grid master é a única peça do desenho que **não é uma tela** — é a regra de composição de todas elas. Sem as medidas mapeadas em token, cada tela reinventa a grade.

---

## 1. A grade, medida no Figma e traduzida em token

Toda medida abaixo foi lida dos nós do Figma, não estimada. A coluna **token** é o que a implementação usa.

### 1.1 Casca da aplicação

| Elemento | Nó | Medida | Token | Exato? |
|---|---|---|---|---|
| Header (app bar) | `1813:1328` | altura **40 px** | `--dss-spacing-10` | ✅ 40 px |
| Header — padding | — | 12 px esquerda · 20 px direita | `--dss-spacing-3` · `--dss-spacing-5` | ✅ |
| Header — gap dos ícones à direita | — | 35 px | `--dss-spacing-4` (16 px) | ⚠️ aproximado — ver §3 |
| Menu lateral esquerdo (rail) | `1233:6033` | largura **52 px** | `--dss-touch-target-lg` | ✅ 52 px |
| Gutter do conteúdo a partir do rail | `1233:6035` x=76 | 76 − 52 = **24 px** | `--dss-spacing-6` | ✅ 24 px |
| Breadcrumb | `1233:6035` | y=56 · altura 15 px | — | — |
| Board (superfície branca) | `1233:6041` | y=87 · **1818 × 969** | fluido | — |

### 1.2 Dentro do Board

| Elemento | Nó | Medida | Token | Exato? |
|---|---|---|---|---|
| Padding interno do Board | `1233:6044` x=24 | **24 px** | `--dss-spacing-6` | ✅ |
| Largura útil | — | 1770 px | fluido | — |
| Título de seção | `title.dinamic` | altura 23 px | `--dss-font-size-md` + sublinhado | — |
| Padding interno de card | `1815:7906` | **16 px** | `--dss-spacing-4` | ✅ |
| Barra de ações do fluxo | `1823:8287` | altura **60 px** · padding-bottom 24 | `--dss-spacing-6` | ✅ |

### 1.3 Grade de campos — 6 colunas

| Propriedade | Medida | Token | Exato? |
|---|---|---|---|
| Colunas | **6** | `grid-template-columns` | — |
| Largura da coluna | 278,33 px (linha de inputs) · 273 px (combobox) | fluido, `minmax` | — |
| **Gutter horizontal** | **20 px** | `--dss-spacing-5` | ✅ 20 px |
| **Gutter vertical entre linhas** | 52 − 36 = **16 px** | `--dss-spacing-4` | ✅ 16 px |
| **Altura de campo** | **36 px** | `dense` do DssInput/DssSelect | ✅ |

### 1.4 Tabela

| Propriedade | Medida | Token | Exato? |
|---|---|---|---|
| Altura da linha | **36 px** | `density="compact"` do DssMarkupTable | ✅ |
| Passo entre linhas | 37 px (36 + 1 de separador) | `--dss-border-width-thin` | ✅ |
| Cabeçalho | fundo azul, texto branco, caixa alta | `--dss-action-primary` + `--dss-text-inverse` | ✅ |

### 1.5 Botões do fluxo (`colect.button`)

| Botão | Cor no Figma | Nome no Figma | Token DSS | Exato? |
|---|---|---|---|---|
| CANCELAR | `#d41320` | Cores semênticas/soft-red | `--dss-feedback-error` (`#d8182e`) | ⚠️ ΔE pequeno |
| VOLTAR | `#bcbcbc` | Cores neutras/Cinza | **não existe** | ❌ ver §3 |
| PRÓXIMO | `#0e88e4` | Cores Primárias/Azull-100 | `--dss-water-500` = `--dss-action-primary` | ✅ idêntico |
| FINALIZAR | `#26a69a` | Cores semênticas/Soft-green | `--dss-secondary` | ✅ idêntico |

Geometria comum: **160 × 36 px**, raio 4 px, borda branca 1 px, rótulo Roboto Medium 16 px em caixa alta, gutter 20 px.
`160 px` = `--dss-spacing-40` ✅ · `36 px` = `--dss-touch-target-sm` ✅

### 1.6 Marca no header

O header do Figma carrega os três gradientes de marca sobrepostos — é o mesmo componente para os três produtos:

| Produto | Cor | Token |
|---|---|---|
| Water | `rgb(14,136,228)` = `#0e88e4` | `--dss-water-500` |
| Waste | `rgb(11,129,84)` = `#0b8154` | `--dss-waste-600` |
| Hub | `rgb(239,122,17)` = `#ef7a11` | `--dss-hub-600` |

Isso confirma que a barra é **brandeável por token**, não por cor fixa: `DssToolbar brand="water|waste|hub"` já entrega exatamente essas três cores.

---

## 2. Composição usada

```
DssLayout (view="hHh lpR fFf", container)
├── DssHeader
│   └── DssToolbar brand="water"          ← app bar 40 px, brandeável
└── DssPageContainer
    └── DssPage
        ├── nav.gm-rail                    ← rail 52 px (sem componente DSS — ver §3)
        └── div.gm-content
            ├── DssBreadcrumbs › DssBreadcrumbsEl ×3
            └── DssCard (Board)
                ├── DssCard (Filtros: DssInput ×3, DssChip removível ×10, DssButton)
                ├── DssCard (Status: 3 linhas tonalizadas)
                ├── DssCard (Prioridade: donut SVG + legenda)
                ├── DssCard (6 campos: DssInput ×5, DssSelect múltiplo)
                ├── DssCard (DssMarkupTable + DssCheckbox + DssChip + DssIcon)
                ├── DssCard (DssSelect ×12 + Limpar/Salvar)
                └── div.gm-actions (DssButton ×4)
```

---

## 3. Lacunas e desvios — o que o grid master pede e o DSS ainda não dá

| # | O que o desenho pede | Situação no DSS | O que a implementação fez |
|---|---|---|---|
| 1 | **Rail de navegação de 52 px** com ícones e separadores | Não existe componente. `DssDrawer` é gaveta, não rail fixo de ícones. | Montado como `<nav>` + `<button>` tokenizados na própria página. **Candidato a componente de Fase 3** — ele se repete em toda tela do Sansys. |
| 2 | **Botão cinza neutro** (VOLTAR) | `ButtonColor` tem `primary · secondary · tertiary · accent · positive · negative · warning · info` — **não tem neutro**. E branco sobre `#bcbcbc` dá **2,3:1**, reprovando WCAG 1.4.3. | Usa `variant="outline"`, que é o tratamento secundário do DSS. Constituição #4 não se rebaixa por refino estético. |
| 3 | **Gap de 35 px** entre os ícones do header | A escala de espaçamento é múltipla de 4 px: 32 (`-8`) ou 36 (`-9`). 35 não existe e não deve existir. | `--dss-spacing-4`. Divergência de 1 px por ícone, invisível e dentro da escala. |
| 4 | **Donut de prioridade** | Não há componente de gráfico no DSS. | SVG tokenizado na página, com `role="img"` e `aria-label` descrevendo todas as fatias. **Candidato a componente** se dashboards forem recorrentes. |
| 5 | **Container de 1200 px** (usado pela tela de Check-in) | Não existe token. O mais largo de layout é `--dss-layout-content-max-width-wide` (960 px). | `--dss-container-lg` (1280 px), da família de grade. Ver o bloco de interface do RF001. |
| 6 | Legenda do donut com **5 categorias e 5 cores** | — | O donut do Figma pinta um segmento **azul** que não consta da própria legenda. A implementação segue a legenda. **Inconsistência do mock**, não do DSS. |
| 7 | Breadcrumb com ícone | `DssBreadcrumbsEl` compõe `DssIcon` com `aria-hidden="true"` em vez da prop `decorative` — o `DssIcon` avisa em DEV a cada renderização. Mesmo defeito de `DssBanner`. | Nada a fazer na página: é do componente. Registrado como delta G em [`RF001_CHECKIN_NFAG_BLOCO_INTERFACE.md`](RF001_CHECKIN_NFAG_BLOCO_INTERFACE.md). 3 breadcrumbs → 3 avisos. |
| 8 | Botão **Pesquisar** laranja-avermelhado | `--dss-tertiary` (`#ff6607`) é o laranja de ação do DSS e `ButtonColor` aceita `tertiary`. `warning` (`#fabd14`) com texto branco reprovaria contraste. | `color="tertiary"`. |

---

## 4. O que isso implica para a tela de Check-in NFAg

A tela de Check-in foi implementada **antes** deste grid master e diverge dele em três pontos estruturais:

| Item | Check-in hoje | Grid master |
|---|---|---|
| Altura do app bar | 56 px (`--dss-form-control-height-lg`) | **40 px** (`--dss-spacing-10`) |
| Rail lateral | não tem | **52 px**, sempre presente |
| Superfície da página | cards soltos sobre `--dss-surface-muted` | **Board** branco único, com os cards dentro |

Alinhar a tela ao master é mudança de casca, não de conteúdo — e deve ser feita **depois** de decidir se o rail vira componente (§3.1), para não implementá-lo duas vezes.
