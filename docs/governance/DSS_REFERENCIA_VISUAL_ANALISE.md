# DSS — Contrato Visual Canônico

> **Status:** Normativo Vinculante (Hierarquia Nível 1)
> **Versão DSS:** v2.3.0
> **Autoridade:** Este documento é a ÚNICA fonte de verdade narrativa para o contrato visual default dos componentes DSS. Em caso de conflito com qualquer outro documento de documentação, este prevalece. Em caso de conflito com o CSS do componente, **o CSS prevalece** (Constituição #6 — CSS fonte de verdade — este documento é derivado: a cadeia de verdade é CSS → meta.json → este documento).
> **Sincronização:** Este documento é o espelho em Markdown dos campos `defaultPreview` contidos nos arquivos `dss.meta.json` de cada componente. Alterações no `defaultPreview` de qualquer componente DEVEM ser refletidas aqui simultaneamente.

---

## 1. Escopo e Definições

### 1.1 Definição de "Default Visual"

O **default visual** de um componente DSS é o aspecto visual exato renderizado quando **nenhuma prop de estilo é passada explicitamente** pelo consumidor. É o estado neutro de fábrica do componente.

O default visual NÃO inclui:
- Estados interativos (hover, focus, active, disabled) — estes são parte do contrato de estados.
- Variantes semânticas (error, success, warning) — estes são ativados por props.
- Brandabilidade (hub, water, waste) — estes são ativados por `data-brand`.

O default visual SIM inclui:
- Dimensões físicas computadas (min-height, min-width, padding, gap).
- Tokens de cor aplicados no estado neutro.
- Border-radius, border-width, box-shadow.
- Tipografia (font-size, font-weight, line-height).
- Qualquer ícone ou conteúdo estrutural presente sem props.

### 1.2 Fontes de Verdade: Human-Readable vs Machine-Readable

| Tipo | Arquivo | Audiência | Autoridade |
| :--- | :--- | :--- | :--- |
| **Machine-readable** | `dss.meta.json` → campo `defaultPreview` | MCP, ferramentas de validação visual | Fonte de código |
| **Human-readable** | Este documento (`DSS_REFERENCIA_VISUAL_ANALISE.md`) | Agentes de IA, engenheiros, designers | Espelho narrativo do JSON |
| **Árbitro visual** | CSS do componente (`2-composition/_base.scss` e camadas seguintes — Constituição #6) | Decisões visuais em caso de divergência | Supremo |

**Regra de sincronização:** Toda alteração no `defaultPreview` de um `dss.meta.json` DEVE ser refletida na entrada correspondente da Seção 4 deste documento na mesma PR.

### 1.3 Princípios de Coesão Visual

Estes princípios garantem unidade visual entre os 76 componentes do DSS:

1. **Cor Principal (Primary):** `--dss-action-primary` é a âncora visual para ações principais, estados ativos e foco.
2. **Forma (Border Radius):** Escala lógica — `--dss-radius-sm` (controles compactos), `--dss-radius-md` (formulários/menus), `--dss-radius-lg` (superfícies/cards), `--dss-radius-full` (pílulas/badges/botões).
3. **Tipografia:** `text-transform: none` como padrão. Pesos entre `normal` (400) e `medium` (500) conforme hierarquia.
4. **Feedback Visual:** Hover via `brightness(0.95)` em fundos coloridos, `--dss-surface-hover` em fundos neutros. Focus via `@include dss-focus-ring`.
5. **Bordas e Superfícies:** `--dss-border-width-thin` (1px) com `--dss-gray-300/400` para delimitação neutra. Fundos: `--dss-surface-default` ou `--dss-surface-muted`.

### 1.4 Diferença entre Default Visual, Default Funcional e Default Semântico

| Tipo | Definição | Exemplo (DssButton) |
| :--- | :--- | :--- |
| **Default Visual** | Aspecto visual sem props de estilo | `elevated`, `primary`, `md` |
| **Default Funcional** | Comportamento sem props comportamentais | `type="button"`, não-disabled |
| **Default Semântico** | Papel ARIA sem props de acessibilidade | `role="button"`, `tabindex="0"` |

---

## 2. Princípios Normativos do Design System

### 2.1 Token First (Constituição #1)

Nenhum valor hardcoded (px, rem, hex, rgb) deve aparecer em `_base.scss`, `_variants.scss` ou `_states.scss`. Todo valor visual deve ser expresso como `var(--dss-*)`.

**Tokens de referência obrigatórios por propriedade:**
- Cor → `--dss-action-*`, `--dss-text-*`, `--dss-surface-*`, `--dss-gray-*`
- Espaçamento → `--dss-spacing-*`, `--dss-padding-*`, `--dss-gap-*`
- Forma → `--dss-radius-*`
- Borda → `--dss-border-width-*`
- Sombra → `--dss-elevation-*`
- Tipografia → `--dss-font-size-*`, `--dss-font-weight-*`, `--dss-line-height-*`

### 2.2 CSS como Fonte de Verdade Visual (Constituição #6)

O **CSS do componente** (`2-composition/_base.scss` e camadas seguintes) é declarado normativamente como a **fonte de verdade visual** do DSS. Em caso de divergência entre o `defaultPreview` e o CSS, o CSS tem precedência. O campo `defaultPreview` reflete o CSS, e o CSS vence em caso de conflito.

Agentes DEVEM consultar o CSS compilado do componente em caso de ambiguidade sobre dimensões, espaçamentos ou cores. O Figma permanece como ferramenta integrável via MCP (como qualquer outra ferramenta de mercado), **sem autoridade normativa** sobre decisões visuais.

### 2.3 Neutralidade do Default

O estado default de qualquer componente usa cores neutras:
- **Fundo:** `--dss-surface-default` (branco/neutro claro) ou `--dss-surface-muted` (cinza muito claro)
- **Texto:** `--dss-text-body` (texto principal)
- **Ação:** `--dss-action-primary` (azul da marca — usado como fundo em componentes interativos primários)

Nenhum componente deve usar cor de feedback (error, success, warning) como default visual.

### 2.4 Referências de Mercado Adotadas

O DSS sintetiza padrões de três referências:

| Referência | Contribuição Principal |
| :--- | :--- |
| **Material Design 3** | Formato de pílula para botões, `border-radius: 12px` para cards, label flutuante em inputs, paleta tonal |
| **IBM Carbon** | Clareza de bordas em formulários, densidade controlada, contraste explícito no focus |
| **Salesforce Lightning** | Hierarquia de densidade, estados de hover/active por brightness, separação visual de itens de lista |

---

## 3. Tabela Mestre de Mapeamento de Tokens Canônicos

### 3.1 Padrões por Categoria de Componente

#### Controles de Ação (Button, Fab, BtnGroup, BtnDropdown, BtnToggle)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| background | `--dss-action-primary` | azul | Âncora primária (M3, Carbon) |
| color | `--dss-text-inverse` | branco | Contraste sobre primária |
| border-radius | `--dss-radius-full` | 9999px | Formato pílula (M3 Filled Button) |
| min-height | `--dss-touch-target-md` | 44px | WCAG 2.5.5 |
| font-size | `--dss-font-size-sm` | 14px | Legibilidade (M3, Carbon) |
| font-weight | `--dss-font-weight-medium` | 500 | Hierarquia tipográfica |
| shadow (elevated) | `--dss-elevation-1` | — | Separação do fundo (M3 Elevated) |

#### Formulários (Input, Select, Textarea, Field, File)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| border (repouso) | `--dss-gray-400` | 1px solid | Delimitação neutra (Carbon) |
| border (hover) | `--dss-gray-600` | 1px solid | Feedback de interatividade |
| border (foco) | `--dss-action-primary` | 2px solid | Destaque do campo ativo (M3) |
| border-radius | `--dss-radius-md` | 8px | Arredondamento sutil |
| min-height | `--dss-touch-target-md` | 44px | WCAG 2.5.5 |
| label-color (repouso) | `--dss-text-subtle` | — | Hierarquia visual menor |
| label-color (foco) | `--dss-action-primary` | — | Conexão visual com campo ativo |
| background | transparente | — | Variante outlined |

#### Compact Controls (Checkbox, Radio, Toggle, Chip, Badge)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| color (checked/ativo) | `--dss-action-primary` | — | Âncora primária |
| border (unchecked) | `--dss-gray-500` | 2px solid | Cinza médio (M3, não primary) |
| border-radius (checkbox) | `--dss-radius-sm` | 4px | Levemente arredondado (M3) |
| border-radius (badge/chip) | `--dss-radius-full` | 9999px | Formato pílula |
| touch-target | `--dss-touch-target-md` | 44px | Via `::before` (WCAG 2.5.5) |

#### Superfícies e Containers (Card, Dialog, Drawer, ExpansionItem)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| background | `--dss-surface-default` | branco/neutro | Legibilidade (M3) |
| border-radius | `--dss-radius-lg` | 12px | Arredondamento para containers (M3) |
| shadow (elevated) | `--dss-elevation-1` | — | Profundidade sutil (M3 Elevated) |
| shadow (dialog) | `--dss-elevation-5` | — | Modal sobre conteúdo |
| border (outlined) | `--dss-gray-200` | 1px solid | Delimitação discreta |

#### Navegação (Tabs, Breadcrumbs, Pagination, Stepper, Menu)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| item-ativo color | `--dss-action-primary` | — | Indicação de seleção |
| item-inativo color | `--dss-text-subtle` | — | Hierarquia menor |
| hover background | `--dss-surface-hover` | rgba(0,0,0,0.04) | Feedback de área clicável |
| min-height | `--dss-touch-target-md` | 44px | WCAG 2.5.5 |

#### Progresso e Feedback (LinearProgress, CircularProgress, Spinner, Skeleton, AjaxBar)
| Propriedade | Token DSS | Valor | Justificativa |
| :--- | :--- | :---: | :--- |
| color (indicador) | `--dss-action-primary` | — | Cor da marca (M3) |
| color (track) | `--dss-gray-200` | — | Track neutro discreto |
| skeleton background | `--dss-gray-200` | — | Placeholder neutro |
| skeleton shimmer | `--dss-gray-300` | — | Animação sutil |

### 3.2 Hierarquias de Decisão Visual

#### Border-Radius por Categoria
| Categoria | Token | Valor Computado |
| :--- | :--- | :---: |
| Controles compactos angulares (checkbox, pagination) | `--dss-radius-sm` | 4px |
| Formulários, menus, tooltips | `--dss-radius-md` | 8px |
| Superfícies containers (card, dialog) | `--dss-radius-lg` | 12px |
| Pílulas (button, chip, badge, toggle, fab) | `--dss-radius-full` | 9999px |
| Estruturais sem arredondamento | `0` | 0px |

#### Elevation (box-shadow) por Nível
| Nível | Token | Uso |
| :--- | :--- | :--- |
| 0 | — | Input, Chip, Badge, Checkbox, Toggle, Tabs |
| 1 | `--dss-elevation-1` | Card default, Header, Bar |
| 2 | `--dss-elevation-2` | Card hover, Toolbar elevated, Tooltip |
| 3 | `--dss-elevation-3` | Menu, BtnDropdown panel, FAB |
| 4 | `--dss-elevation-4` | Drawer |
| 5 | `--dss-elevation-5` | Dialog |

#### Altura (min-height) por Density
| Token | Valor | Uso |
| :--- | :---: | :--- |
| `--dss-compact-control-height-xs` | 16px | Badge dot |
| `--dss-compact-control-height-sm` | 24px | Badge numérico, ToolbarTitle |
| `--dss-compact-control-height-md` | 32px | Chip, Pagination item, BreadcrumbsEl |
| `--dss-touch-target-md` | 44px | Button, Input, Tabs, Item, Toolbar, Toolbar actions |

#### Spacing (gap interno) por Contexto
| Contexto | Token | Valor |
| :--- | :--- | :---: |
| Ícone + label dentro do controle | `--dss-spacing-2` | 8px |
| Itens horizontais compactos | `--dss-spacing-2` | 8px |
| Itens verticais em formulário | `--dss-spacing-4` | 16px |
| Padding interno de superfícies | `--dss-spacing-6` | 24px |
| Gap entre seções de página | `--dss-spacing-8` | 32px |

#### Stroke (border-width) por Uso
| Token | Valor | Uso |
| :--- | :---: | :--- |
| `--dss-border-width-thin` | 1px | Divisores, borda repouso de input/chip/card outlined |
| `--dss-border-width-md` | 2px | Borda foco de input, borda unchecked de checkbox/radio |
| `--dss-border-width-thick` | 3px | Indicador de tab ativa, focus ring outline |

#### Tipografia por Contexto
| Contexto | font-size | font-weight |
| :--- | :---: | :---: |
| Badge, tooltip, hint, mensagem de erro | 12px (`--dss-font-size-xs`) | 500 (badge) / 400 (resto) |
| Controles (button, input, chip, menu, tab) | 14px (`--dss-font-size-sm`/`-md`) | 500 (primary) / 400 (neutro) |
| Título de toolbar | 16px (`--dss-font-size-lg`) | 500 |
| Título de header, knob central | 18px (`--dss-font-size-lg`) | 500–600 |
| Título de dialog | 20px (`--dss-font-size-xl`) | 500 |

### 3.3 Tokens Proibidos

- ❌ Nunca usar valores hardcoded (hex, px, rem direto no SCSS)
- ❌ Nunca usar `--dss-dark` como cor de ação principal
- ❌ Nunca usar `--dss-gray-*` como cor de destaque/ativo
- ❌ Nunca usar `--dss-font-weight-regular` (token inexistente → usar `--dss-font-weight-normal`)
- ❌ Nunca usar `--dss-border-divider-*` (token inexistente → usar `--dss-gray-100/200/300`)
- ❌ Nunca usar `--dss-action-primary-rgb` (token inexistente → usar `--dss-surface-hover/active`)
- ❌ Nunca usar `--dss-success-500` (token inexistente → usar `--dss-feedback-success`)
- ❌ Nunca usar `--dss-input-height-md` em novos componentes (deprecated → usar `--dss-touch-target-md`)
- ❌ Nunca usar `--dss-padding-md/lg` (sufixo inválido → usar `--dss-padding-4`, `-6`, `-8` com sufixo numérico)
- ⚠️ Verificar existência de `--dss-compact-control-height-*` no catálogo de tokens antes de usar

---

## 4. Catálogo Canônico Componente-a-Componente

> **Regra de leitura:** Cada entrada abaixo espelha **fielmente** o campo `defaultPreview` do `dss.meta.json` do componente. A tabela de tokens é derivada do `defaultPreview.computedDimensions`, das hierarquias da Seção 3, e das especificações históricas da Seção 13 do documento original (onde disponível).
>
> **Componentes estruturais:** Os 16 componentes marcados como "Componente estrutural adaptativo" não possuem dimensões físicas fixas — seu tamanho é determinado pelo conteúdo e pelo layout pai. Não altere o `dss.meta.json` desses componentes.

---

### 4.1 DssAjaxBar
**Categoria:** Barra de progresso global para requisições assíncronas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** compliant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*
- **Conteúdo de Demonstração:** Barra de progresso de requisições AJAX

<!-- BEGIN:VISUAL-TABLE:DssAjaxBar -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `3px` | defaultPreview / QAjaxBar motor |
| **color (indicador)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **color (hub brand)** | `--dss-hub-600` | — | 4-output/_brands.scss |
| **color (water brand)** | `--dss-water-500` | — | 4-output/_brands.scss |
| **color (waste brand)** | `--dss-waste-600` | — | 4-output/_brands.scss |
<!-- END:VISUAL-TABLE:DssAjaxBar -->

---

### 4.2 DssAvatar
**Categoria:** Basico (Visual/Identity)
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `size="md"`
- **Conteúdo de Demonstração:** Iniciais 'AB'

<!-- BEGIN:VISUAL-TABLE:DssAvatar -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `40px` | defaultPreview |
| **min-width** | — | `40px` | defaultPreview |
| **border-radius** | `--dss-radius-circle` | `50%` | 1-structure/DssAvatar.ts.vue |
| **background (sem imagem)** | `--dss-action-primary-surface` | — | 2-composition/_base.scss |
| **color iniciais** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **font-size (md)** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssAvatar -->

---

### 4.3 DssBadge
**Categoria:** Compact Control não interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed) — Golden Reference não-interativo

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`
- **Conteúdo de Demonstração:** Label '99+'

<!-- BEGIN:VISUAL-TABLE:DssBadge -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-compact-control-height-sm` | `24px` | 2-composition/_base.scss |
| **min-width** | `--dss-compact-control-height-sm` | `24px` | 2-composition/_base.scss |
| **padding** | `--dss-spacing-0_5 / --dss-spacing-1` | `2px 4px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **background** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-xs` | `12px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
| **line-height** | 1 | — | Seção 13.11 |
<!-- END:VISUAL-TABLE:DssBadge -->

---

### 4.4 DssBanner
**Categoria:** Mensagem informativa contextual
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="default"`
- **Conteúdo de Demonstração:** Mensagem informativa com ação

<!-- BEGIN:VISUAL-TABLE:DssBanner -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `48px` | defaultPreview |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **border-width** | `--dss-border-width-thin` | `1px` | 4-output/_states.scss |
| **border-color** | `--dss-gray-200` | — | Padrão categoria Superfície |
| **padding** | `--dss-spacing-4` | `16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssBanner -->

---

### 4.5 DssBar
**Categoria:** Barra de sistema (estrutural horizontal)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Barra de sistema com conteúdo

<!-- BEGIN:VISUAL-TABLE:DssBar -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **padding** | `--dss-spacing-2 / --dss-spacing-4` | `8px 16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **color** | `--dss-text-body` | — | 2-composition/_base.scss |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-1` | — | 2-composition/_base.scss |
| **gap** | `--dss-spacing-2` | `8px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssBar -->

---

### 4.6 DssBreadcrumbs
**Categoria:** Container orquestrador de navegação (Breadcrumb Trail)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Home / Produtos / Detalhe

<!-- BEGIN:VISUAL-TABLE:DssBreadcrumbs -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `21px` | defaultPreview (altura do texto) |
| **gap** | `--dss-spacing-2` | `8px` | 1-structure/DssBreadcrumbs.ts.vue |
| **font-size** | `--dss-font-size-sm` | `14px` | 2-composition/_base.scss |
| **separador color** | `--dss-gray-400` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssBreadcrumbs -->

---

### 4.7 DssBreadcrumbsEl
**Categoria:** Elemento de trilha de navegação (Breadcrumb Item)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `label="Home"`
- **Conteúdo de Demonstração:** Item de breadcrumb 'Home'

<!-- BEGIN:VISUAL-TABLE:DssBreadcrumbsEl -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `17px` | defaultPreview |
| **font-size** | `--dss-font-size-md` | `14px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-weight (link)** | `--dss-font-weight-normal` | `400` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color (link)** | `--dss-text-action` | — | 2-composition/_base.scss |
| **color (item atual)** | `--dss-text-body` | — | 2-composition/_base.scss |
| **font-weight (item atual)** | `--dss-font-weight-medium` | `500` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **text-decoration (hover)** | underline | — | Seção 13.23 |
<!-- END:VISUAL-TABLE:DssBreadcrumbsEl -->

---

### 4.8 DssBtnDropdown
**Categoria:** Action Group composto (Botão com Dropdown Integrado)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `label="Opções"`
- **Conteúdo de Demonstração:** Botão 'Opções' com menu dropdown

<!-- BEGIN:VISUAL-TABLE:DssBtnDropdown -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **min-width** | `--dss-min-w-sm` | `160px` | 2-composition/_base.scss |
| **background** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **border-radius** | `--dss-radius-full` | `9999px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **painel border-radius** | `--dss-radius-md` | `8px` | 2-composition/_base.scss |
| **painel box-shadow** | `--dss-elevation-3` | — | 2-composition/_base.scss |
| **painel padding** | `--dss-spacing-2` | `8px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **painel background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **item height** | 40px | — | Seção 13.4 |
| **item padding** | `--dss-spacing-4` | `0 16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssBtnDropdown -->

---

### 4.9 DssBtnGroup
**Categoria:** Container de composição (Action Group)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** pre-audit

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Grupo com 3 botões

<!-- BEGIN:VISUAL-TABLE:DssBtnGroup -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap** | — | `0px` | Seção 13.3 (botões coladas) |
| **border-radius extremidades** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **divisor interno** | `--dss-border-width-thin` | `1px` | 3-variants/_flat.scss |
<!-- END:VISUAL-TABLE:DssBtnGroup -->

---

### 4.10 DssBtnToggle
**Categoria:** Container de seleção exclusiva (Grupo de Alternância)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Toggle entre opções A / B / C

<!-- BEGIN:VISUAL-TABLE:DssBtnToggle -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background (selecionado)** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background (não selecionado)** | `--dss-surface-default` | — | Estado neutro |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssBtnToggle -->

---

### 4.11 DssButton
**Categoria:** Action Control
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed) — Golden Sample (documentação)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="elevated"`, `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Label 'Action'

<!-- BEGIN:VISUAL-TABLE:DssButton -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **min-width** | `--dss-min-w-xs` | — | 2-composition/_base.scss |
| **padding (horizontal)** | `--dss-spacing-6` | `24px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-sm` | `9999px` | 2-composition/_base.scss |
| **border-width** | `--dss-border-width-none` | `0` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-sm` | `14px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
| **letter-spacing** | — | `0.01em` | Seção 13.1 |
| **gap (ícone + label)** | `--dss-spacing-2` | `8px` | 2-composition/_base.scss |
| **shadow** | `--dss-elevation-1` | — | 3-variants/_elevated.scss |
| **transition** | `--dss-duration-200` | `200ms` | 2-composition/_base.scss |
| **disabled opacity** | `--dss-opacity-disabled` | `0.4` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssButton -->

---

### 4.12 DssCard
**Categoria:** Basico (Surface/Container)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="elevated"`, `square=false`
- **Conteúdo de Demonstração:** DssCardSection com texto e ações

<!-- BEGIN:VISUAL-TABLE:DssCard -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `80px` | defaultPreview |
| **border-radius** | `--dss-radius-lg` | `12px` | 2-composition/_base.scss |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **border-width (outlined)** | `--dss-border-width-thin` | `1px` | 2-composition/_base.scss |
| **border-color (outlined)** | `--dss-gray-200` | — | 2-composition/_base.scss |
| **box-shadow (elevated)** | `--dss-elevation-1` | — | 2-composition/_base.scss |
| **box-shadow (hover)** | `--dss-elevation-2` | — | 3-variants/_bordered.scss |
| **section padding** | `--dss-spacing-6` | `24px` | 2-composition/_base.scss |
| **section divider** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **transition** | `--dss-duration-200` | `200ms` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssCard -->

---

### 4.13 DssCheckbox
**Categoria:** Compact Control interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Label 'Opção'

<!-- BEGIN:VISUAL-TABLE:DssCheckbox -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **controle tamanho** | 18px × 18px | — | Seção 13.6 |
| **border-radius** | `--dss-radius-sm` | `4px` | 2-composition/_base.scss |
| **border-width (unchecked)** | `--dss-border-width-md` | `2px` | 2-composition/_base.scss |
| **border-color (unchecked)** | `--dss-gray-500` | — | 2-composition/_base.scss |
| **background (checked)** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap (controle + label)** | `--dss-spacing-2` | `8px` | 2-composition/_base.scss |
| **label font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **label color** | `--dss-text-body` | — | 2-composition/_base.scss |
| **touch target** | `--dss-touch-target-md` | `44px` | Via `::before` (WCAG 2.5.5) |
<!-- END:VISUAL-TABLE:DssCheckbox -->

---

### 4.14 DssChip
**Categoria:** Compact Control interativo — Golden Reference interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="filled"`, `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Label 'Chip'

<!-- BEGIN:VISUAL-TABLE:DssChip -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-compact-control-height-md` | `28px` | 2-composition/_base.scss |
| **padding (horizontal)** | `--dss-spacing-3` | `12px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **border-width** | `--dss-border-width-thin` | `1px` | 4-output/_states.scss |
| **border-color** | `--dss-gray-300` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-surface-muted` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color** | `--dss-text-body` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-sm` | `12px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
| **gap** | `--dss-spacing-2` | `8px` | 2-composition/_base.scss |
| **selected background** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **selected color** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **touch target** | `--dss-touch-target-md` | `44px` | Via `::before` (WCAG 2.5.5) |
<!-- END:VISUAL-TABLE:DssChip -->

---

### 4.15 DssCircularProgress
**Categoria:** Indicador de progresso circular
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `value=0.7`, `size="md"`, `color="primary"`
- **Conteúdo de Demonstração:** Progresso circular 70%

<!-- BEGIN:VISUAL-TABLE:DssCircularProgress -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `56px` | defaultPreview |
| **min-width** | — | `56px` | defaultPreview |
| **stroke (círculo de progresso)** | `--dss-action-primary` | — | 3-variants/_colors.scss |
| **stroke (track)** | `--dss-gray-200` | — | 2-composition/_base.scss |
| **stroke-width** | — | `3` | EX-Structural-01 (sem token correspondente) |
| **size xs** | — | `40px` | SIZE_TOKEN_MAP |
| **size xl** | — | `96px` | SIZE_TOKEN_MAP |
<!-- END:VISUAL-TABLE:DssCircularProgress -->

---

### 4.16 DssDrawer
**Categoria:** Container estrutural lateral — painel de navegação
**Fase de Entrega:** Fase 2
**Status de Conformidade:** pending-audit

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma — side="left" default)*
- **Conteúdo de Demonstração:** Painel lateral com navegação

<!-- BEGIN:VISUAL-TABLE:DssDrawer -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | defaultPreview |
| **min-width** | — | `300px` | defaultPreview / Seção 13.15 |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-4` | — | 2-composition/_base.scss |
| **border-radius** | — | `0` | Seção 13.15 (estrutural) |
| **header padding** | `--dss-spacing-4 / --dss-spacing-6` | `16px 24px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **header border-bottom** | `--dss-gray-200` | `1px solid` | 3-variants/_bordered.scss |
| **content padding** | `--dss-spacing-4` | `16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **animação** | `--dss-duration-250` | `250ms` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssDrawer -->

---

### 4.17 DssExpansionItem
**Categoria:** Item expansível
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `label="Título"`, `icon="expand_more"`
- **Conteúdo de Demonstração:** Item expansível com conteúdo

<!-- BEGIN:VISUAL-TABLE:DssExpansionItem -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 3-variants/_variant.scss |
| **background** | `--dss-surface-default` | — | Padrão categoria Superfície |
| **hover background** | `--dss-surface-hover` | — | 2-composition/_base.scss |
| **padding** | `--dss-spacing-4` | `16px` | 2-composition/_base.scss |
| **border-bottom** | `--dss-gray-200` | `1px solid` | Divisor entre itens |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-normal` | `400` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssExpansionItem -->

---

### 4.18 DssFab
**Categoria:** Floating Action Button
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`, `icon="add"`
- **Conteúdo de Demonstração:** FAB com ícone 'add'

<!-- BEGIN:VISUAL-TABLE:DssFab -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `56px` | defaultPreview / Seção 13.2 |
| **min-width** | — | `56px` | defaultPreview / Seção 13.2 |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **background** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color (ícone)** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **box-shadow** | `--dss-elevation-3` | — | 2-composition/_base.scss |
| **box-shadow (hover)** | `--dss-elevation-4` | — | 2-composition/_base.scss |
| **ícone tamanho** | — | `24px` | Seção 13.2 |
<!-- END:VISUAL-TABLE:DssFab -->

---

### 4.19 DssFabAction
**Categoria:** Ação do FAB (sub-botão)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`, `icon="mail"`
- **Conteúdo de Demonstração:** FAB Action com ícone 'mail'

<!-- BEGIN:VISUAL-TABLE:DssFabAction -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `40px` | 2-composition/_base.scss |
| **min-width** | `--dss-touch-target-md` | `40px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **background** | `--dss-action-primary` | — | Padrão Action Control |
| **color** | `--dss-text-inverse` | `branco` | Padrão Action Control |
| **touch target** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssFabAction -->

---

### 4.20 DssField
**Categoria:** Wrapper estrutural de campo de formulário (chrome: label, borda, hint, error)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma — campo customizado)*
- **Conteúdo de Demonstração:** Campo de formulário customizado

<!-- BEGIN:VISUAL-TABLE:DssField -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **min-width** | — | `240px` | defaultPreview |
| **border** | `--dss-gray-400` | `1px solid` | 3-variants/_filled.scss |
| **border (foco)** | `--dss-action-primary` | `2px solid` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `8px` | 3-variants/_filled.scss |
| **label color** | `--dss-text-subtle` | — | Padrão formulário |
| **label color (foco)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **hint font-size** | `--dss-font-size-xs` | `12px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gray-800** | `--dss-gray-800` | — | 4-output/_states.scss |
<!-- END:VISUAL-TABLE:DssField -->

---

### 4.21 DssFile
**Categoria:** Action Control — campo de seleção de arquivos
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Seleção de arquivo

<!-- BEGIN:VISUAL-TABLE:DssFile -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **drop zone min-height** | — | `120px` | Seção 13.25 |
| **drop zone border** | `--dss-gray-400` | `2px dashed` | 3-variants/_filled.scss |
| **drop zone border-radius** | `--dss-radius-md` | `8px` | 3-variants/_filled.scss |
| **drop zone background** | `--dss-surface-muted` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **drop zone padding** | `--dss-spacing-6` | `24px` | 2-composition/_base.scss |
| **dragover border** | `--dss-action-primary` | `2px dashed` | 3-variants/_borderless.scss |
| **dragover background** | `--dss-action-primary-surface` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssFile -->

---

### 4.22 DssFooter
**Categoria:** Container estrutural de layout — footer fixo na base
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Rodapé com informações do sistema

<!-- BEGIN:VISUAL-TABLE:DssFooter -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **border-top** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **padding** | `--dss-spacing-4 / --dss-spacing-6` | `16px 24px` | Padrão estrutural |
<!-- END:VISUAL-TABLE:DssFooter -->

---

### 4.23 DssHeader
**Categoria:** Container estrutural de layout — header fixo ao topo
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Cabeçalho com logo e ações

<!-- BEGIN:VISUAL-TABLE:DssHeader -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **padding (horizontal)** | `--dss-spacing-6` | `24px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **border-bottom** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-1` | — | 2-composition/_base.scss |
| **brand title font-size** | `--dss-font-size-lg` | `18px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **brand title font-weight** | `--dss-font-weight-semibold` | `600` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap (logo + título)** | `--dss-spacing-3` | `12px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssHeader -->

---

### 4.24 DssIcon
**Categoria:** Elemento visual base não interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `name="star"`, `size="md"`
- **Conteúdo de Demonstração:** Ícone 'star' tamanho md

<!-- BEGIN:VISUAL-TABLE:DssIcon -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `24px` | defaultPreview |
| **min-width** | — | `24px` | defaultPreview |
| **color** | color: inherit | — | `[data-brand] .dss-icon` — herda cor do pai |
| **font-size (md)** | — | `24px` | size prop → font-size |
<!-- END:VISUAL-TABLE:DssIcon -->

---

### 4.25 DssImg
**Categoria:** Elemento de exibição de imagem
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `src="[URL da imagem]"`, `alt="[Descrição]"`, `fit="cover"`, `loading="lazy"`
- **Conteúdo de Demonstração:** Imagem com alt text acessível

<!-- BEGIN:VISUAL-TABLE:DssImg -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `150px` | defaultPreview |
| **min-width** | — | `200px` | defaultPreview |
| **border-radius** | 0 | — | Seção 13.27 (sem corte default) |
| **object-fit** | cover | — | Seção 13.27 |
| **placeholder background** | `--dss-gray-100` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **erro background** | `--dss-gray-200` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **erro ícone cor** | `--dss-gray-500` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **fade-in transition** | `--dss-duration-300` | `300ms` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssImg -->

---

### 4.26 DssInfiniteScroll
**Categoria:** Componente comportamental — scroll infinito
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `offset=500`, `debounce=100`
- **Conteúdo de Demonstração:** Lista com carregamento infinito

<!-- BEGIN:VISUAL-TABLE:DssInfiniteScroll -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | N/A — Componente estrutural adaptativo | — | — |
| **min-width** | N/A — Componente estrutural adaptativo | — | — |
| **spinner color** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **spinner container padding** | `--dss-spacing-6` | `24px` | 2-composition/_base.scss |
| **no-more font-size** | `--dss-font-size-xs` | `12px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **no-more color** | `--dss-text-subtle` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssInfiniteScroll -->

---

### 4.27 DssInnerLoading
**Categoria:** Overlay de loading para container
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `showing=true`
- **Conteúdo de Demonstração:** Overlay de carregamento interno

<!-- BEGIN:VISUAL-TABLE:DssInnerLoading -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `48px` | defaultPreview |
| **overlay background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **color (spinner)** | currentColor | — | DssSpinner herda via CSS color |
| **border-radius** | inherit | — | EX-Structural-01 |
| **line-height** | `--dss-line-height-xs` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssInnerLoading -->

---

### 4.28 DssInput
**Categoria:** Action Control interativo — campo de texto
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="outlined"`, `type="text"`, `dense=false`
- **Conteúdo de Demonstração:** Placeholder 'Digite aqui'

<!-- BEGIN:VISUAL-TABLE:DssInput -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-input-height-md` | `44px` | 2-composition/_base.scss |
| **min-width** | `--dss-min-w-lg` | `240px` | 2-composition/_base.scss |
| **padding (horizontal)** | `--dss-spacing-4` | `16px` | 2-composition/_base.scss |
| **padding (vertical)** | — | `0` | 2-composition/_base.scss |
| **border-width (repouso)** | `--dss-border-width-thin` | `1px` | 3-variants/_outlined.scss |
| **border-color (repouso)** | `--dss-gray-400` | — | 3-variants/_outlined.scss |
| **border-color (hover)** | `--dss-gray-600` | — | 3-variants/_outlined.scss |
| **border-color (foco)** | `--dss-action-primary` | — | 3-variants/_outlined.scss |
| **border-width (foco)** | `--dss-border-width-md` | `2px` | 3-variants/_outlined.scss |
| **border-radius** | `--dss-radius-sm` | `4px` | 3-variants/_outlined.scss |
| **box-shadow (foco)** | — | `0 0 0 1px` | 3-variants/_outlined.scss |
| **outline (foco a11y)** | `--dss-border-width-md` | `2px` | 4-output/_states.scss |
| **outline-offset (foco a11y)** | `--dss-spacing-1` | `4px` | 4-output/_states.scss |
| **color (texto)** | `--dss-text-primary` | — | 2-composition/_base.scss |
| **font-size** | `--dss-font-size-md` | `16px` | 2-composition/_base.scss |
| **transition** | `--dss-duration-150` | `150ms` | 2-composition/_base.scss |
| **label color (repouso)** | `--dss-text-secondary` | — | 2-composition/_base.scss |
| **label color (foco)** | `--dss-action-primary` | — | 3-variants/_outlined.scss |
<!-- END:VISUAL-TABLE:DssInput -->

---

### 4.29 DssItem
**Categoria:** Layout/List — item de lista interativo/não-interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** N/A

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Item com ícone e texto

<!-- BEGIN:VISUAL-TABLE:DssItem -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **padding** | `--dss-spacing-4` | `0 16px` | 2-composition/_base.scss |
| **hover background** | `--dss-surface-hover` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **color** | `--dss-text-body` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssItem -->

---

### 4.30 DssItemLabel
**Categoria:** Container tipográfico para itens de lista
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Rótulo de seção de lista

<!-- BEGIN:VISUAL-TABLE:DssItemLabel -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | N/A — Componente estrutural adaptativo | — | — |
| **min-width** | N/A — Componente estrutural adaptativo | — | — |
<!-- END:VISUAL-TABLE:DssItemLabel -->

---

### 4.31 DssItemSection
**Categoria:** Container de layout interno de DssItem
**Fase de Entrega:** Fase 2
**Status de Conformidade:** pronto-para-auditoria

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Seção de item (avatar, conteúdo ou ação)

<!-- BEGIN:VISUAL-TABLE:DssItemSection -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | N/A — Componente estrutural adaptativo | — | — |
| **min-width** | N/A — Componente estrutural adaptativo | — | — |
<!-- END:VISUAL-TABLE:DssItemSection -->

---

### 4.32 DssKnob
**Categoria:** Controle rotativo para seleção de valores numéricos
**Fase de Entrega:** Fase 2
**Status de Conformidade:** compliant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue=50`, `min=0`, `max=100`
- **Conteúdo de Demonstração:** Knob com valor 50%

<!-- BEGIN:VISUAL-TABLE:DssKnob -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 56px | — | defaultPreview / Seção 13.9 |
| **min-width** | 56px | — | defaultPreview / Seção 13.9 |
| **track cor (não preenchido)** | `--dss-gray-200` | — | 2-composition/_base.scss |
| **track cor (preenchido)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **label central font-size** | `--dss-font-size-lg` | `18px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **label central font-weight** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
| **label central color** | `--dss-text-body` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **focus outline** | `--dss-border-width-thick` | `3px` | 4-output/_states.scss |
<!-- END:VISUAL-TABLE:DssKnob -->

---

### 4.33 DssLayout
**Categoria:** Layout global — container raiz de página Quasar
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Layout de página completo (header + drawer + footer)

<!-- BEGIN:VISUAL-TABLE:DssLayout -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | — |
| **min-width** | — | — | — |
<!-- END:VISUAL-TABLE:DssLayout -->

---

### 4.34 DssLinearProgress
**Categoria:** Indicador de progresso linear
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `value=0.7`, `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Barra de progresso linear 70%

<!-- BEGIN:VISUAL-TABLE:DssLinearProgress -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-track-height-sm` | `4px` | 3-variants/_sizes.scss |
| **min-width** | `--dss-min-w-md` | `200px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **cor indicador** | `--dss-action-primary` | — | 3-variants/_colors.scss |
| **cor track** | `--dss-gray-200` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssLinearProgress -->

---

### 4.35 DssList
**Categoria:** Container de layout — lista de itens
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Lista com 3 itens

<!-- BEGIN:VISUAL-TABLE:DssList -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | — |
| **min-width** | — | — | — |
<!-- END:VISUAL-TABLE:DssList -->

---

### 4.36 DssMarkupTable
**Categoria:** Tabela de exibição semântica
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `density="standard"`, `bordered=true`, `separator="horizontal"`
- **Conteúdo de Demonstração:** Tabela com thead/tbody padrão

<!-- BEGIN:VISUAL-TABLE:DssMarkupTable -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **width** | 100% | — | defaultPreview |
| **border** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **th background** | `--dss-surface-muted` | — | Padrão tabela |
| **th font-weight** | `--dss-font-weight-medium` | `500` | Padrão tabela |
| **td padding** | `--dss-spacing-3 / --dss-spacing-4` | `12px 16px` | 2-composition/_base.scss |
| **tr hover background** | `--dss-surface-hover` | — | Padrão lista |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssMarkupTable -->

---

### 4.37 DssMenu
**Categoria:** Overlay de navegação — menu flutuante
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Menu com 3 itens

<!-- BEGIN:VISUAL-TABLE:DssMenu -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 200px | — | defaultPreview / Seção 13.16 |
| **min-width** | `--dss-min-w-md` | — | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `8px` | 2-composition/_base.scss |
| **background** | `--dss-surface-default` | — | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-3` | — | 2-composition/_base.scss |
| **padding** | `--dss-spacing-2` | `8px 0` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item height** | 40px | — | Seção 13.16 |
| **item padding** | `--dss-spacing-4` | `0 16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item font-size** | `--dss-font-size-md` | `14px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item color** | `--dss-text-body` | — | 2-composition/_base.scss |
| **hover background** | `--dss-surface-hover` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **divider** | `--dss-gray-200` | `1px solid` | 4-output/_states.scss |
<!-- END:VISUAL-TABLE:DssMenu -->

---

### 4.38 DssOptionGroup
**Categoria:** Container de seleção — grupo de controles (Radio, Checkbox ou Toggle)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `type="radio"`
- **Conteúdo de Demonstração:** Grupo de opções (radio/checkbox/toggle)

<!-- BEGIN:VISUAL-TABLE:DssOptionGroup -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap entre opções** | `--dss-spacing-2` | `8px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssOptionGroup -->

---

### 4.39 DssPage
**Categoria:** Layout global — container de conteúdo principal
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Área de conteúdo principal da página

<!-- BEGIN:VISUAL-TABLE:DssPage -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | — |
| **min-width** | — | — | — |
<!-- END:VISUAL-TABLE:DssPage -->

---

### 4.40 DssPageContainer
**Categoria:** Layout global — container de página com offset automático
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Container com largura máxima de conteúdo

<!-- BEGIN:VISUAL-TABLE:DssPageContainer -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | — |
| **min-width** | — | — | — |
<!-- END:VISUAL-TABLE:DssPageContainer -->

---

### 4.41 DssPageScroller
**Categoria:** Botão de scroll para o topo
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Botão de scroll para o topo

<!-- BEGIN:VISUAL-TABLE:DssPageScroller -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssPageScroller -->

---

### 4.42 DssPageSticky
**Categoria:** Elemento fixo na página (sticky positioning)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Elemento fixo na página

<!-- BEGIN:VISUAL-TABLE:DssPageSticky -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssPageSticky -->

---

### 4.43 DssPagination
**Categoria:** Navegação estrutural por páginas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** pending-audit

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue=1`, `max=10`
- **Conteúdo de Demonstração:** Página 1 de 10

<!-- BEGIN:VISUAL-TABLE:DssPagination -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item width × height** | — | `32px × 32px` | Seção 13.24 |
| **item border-radius** | `--dss-radius-sm` | `4px` | 2-composition/_base.scss |
| **item font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **item color (inativo)** | `--dss-text-body` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item color (ativo)** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **item background (ativo)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **item hover background** | `--dss-surface-hover` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap** | `--dss-spacing-1` | `4px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **theming** | --q-color-primary | — | EXC-Gate-02 (padrão QPagination) |
<!-- END:VISUAL-TABLE:DssPagination -->

---

### 4.44 DssParallax
**Categoria:** Efeito visual parallax
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `src="[URL da imagem]"`, `height=500`, `speed=0.5`
- **Conteúdo de Demonstração:** Seção com efeito parallax

<!-- BEGIN:VISUAL-TABLE:DssParallax -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 200px | — | defaultPreview |
| **background** | — | `[imagem de fundo]` | prop src (zero tokens — prop-driven) |
<!-- END:VISUAL-TABLE:DssParallax -->

*Nota: Componente usa prefers-reduced-motion via v-if/v-else (EXC-States-01 — CSS puro não suprime JS listeners QParallax).*

---

### 4.45 DssPopupProxy
**Categoria:** Proxy de popup responsivo (Dialog em mobile, Menu em desktop)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `breakpoint=450`
- **Conteúdo de Demonstração:** Proxy de popup

<!-- BEGIN:VISUAL-TABLE:DssPopupProxy -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssPopupProxy -->

*Nota: Componente delega renderização visual para DssDialog (mobile) ou DssMenu (desktop).*

---

### 4.46 DssPullToRefresh
**Categoria:** Gesto de arrastar para atualizar
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Puxe para atualizar

<!-- BEGIN:VISUAL-TABLE:DssPullToRefresh -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
| **handler color** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **handler border-radius** | `--dss-radius-circle` | `50%` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssPullToRefresh -->

---

### 4.47 DssRadio
**Categoria:** Compact Control interativo — seleção exclusiva
**Fase de Entrega:** Fase 1
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Label 'Opção'

<!-- BEGIN:VISUAL-TABLE:DssRadio -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **controle tamanho** | — | `20px × 20px` | Seção 3.1 Compact Controls |
| **border-radius** | `--dss-radius-circle` | `50%` | 2-composition/_base.scss |
| **border-width (unchecked)** | `--dss-border-width-md` | `2px` | 2-composition/_base.scss |
| **border-color (unchecked)** | `--dss-gray-500` | — | 2-composition/_base.scss |
| **border-color (checked)** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **ponto interno (checked)** | `--dss-action-primary` | `10px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **touch target** | `--dss-touch-target-md` | `44px` | Via `::before` (WCAG 2.5.5) |
<!-- END:VISUAL-TABLE:DssRadio -->

---

### 4.48 DssRange
**Categoria:** Action Control interativo — seleção de intervalo numérico
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `min=0`, `max=100`, `modelValue={min:25, max:75}`
- **Conteúdo de Demonstração:** Range de 25 a 75

<!-- BEGIN:VISUAL-TABLE:DssRange -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **min-width** | `--dss-min-w-md` | `200px` | 2-composition/_base.scss |
| **track height** | `--dss-track-height-sm` | `4px` | 2-composition/_base.scss |
| **track border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **track background** | `--dss-gray-300` | — | 4-output/_states.scss |
| **track preenchido** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **thumb tamanho** | `--dss-thumb-size-md` | `20px` | 2-composition/_base.scss |
| **thumb background** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **thumb shadow** | `--dss-elevation-1` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssRange -->

---

### 4.49 DssRating
**Categoria:** Controle de avaliação por ícones (estrelas ou customizados)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue=3`, `max=5`
- **Conteúdo de Demonstração:** Avaliação de 3 de 5 estrelas

<!-- BEGIN:VISUAL-TABLE:DssRating -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **min-width** | `--dss-min-w-sm` | — | 2-composition/_base.scss |
| **cor ícone (selecionado)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **cor ícone (hub)** | `--dss-hub-600` | — | 4-output/_brands.scss |
| **cor ícone (water)** | `--dss-water-500` | — | 4-output/_brands.scss |
| **cor ícone (waste)** | `--dss-waste-600` | — | 4-output/_brands.scss |
<!-- END:VISUAL-TABLE:DssRating -->

*Nota: Props `color`/`color-selected`/`color-half` BLOQUEADAS — governança 100% CSS.*

---

### 4.50 DssResponsive
**Categoria:** Wrapper condicional por breakpoint
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `show="sm"`
- **Conteúdo de Demonstração:** Wrapper condicional por breakpoint

<!-- BEGIN:VISUAL-TABLE:DssResponsive -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | N/A — Componente estrutural adaptativo | — | — |
| **min-width** | N/A — Componente estrutural adaptativo | — | — |
<!-- END:VISUAL-TABLE:DssResponsive -->

---

### 4.51 DssRouteTab
**Categoria:** Elemento interativo de navegação por abas com roteamento
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `label="Início"`, `to="/"`
- **Conteúdo de Demonstração:** Tab de rota 'Início'

<!-- BEGIN:VISUAL-TABLE:DssRouteTab -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **padding** | `--dss-spacing-4` | `0 16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color (ativo)** | `--dss-action-primary` | — | Padrão tab |
| **color (inativo)** | `--dss-text-subtle` | — | Padrão tab |
| **indicador** | `--dss-action-primary` | `3px solid` | Padrão tab |
| **CSS** | Herda `DssTab.module.scss` | — | Zero CSS duplicado |
<!-- END:VISUAL-TABLE:DssRouteTab -->

---

### 4.52 DssScrollArea
**Categoria:** Área com scrollbar customizada
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `visible="auto"`, `horizontal=false`
- **Conteúdo de Demonstração:** Área com scrollbar customizada

<!-- BEGIN:VISUAL-TABLE:DssScrollArea -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 200px | — | defaultPreview |
| **scrollbar track color** | `--dss-gray-200` | — | .q-scrollarea__bar descendant |
| **scrollbar thumb color** | `--dss-action-primary` | — | .q-scrollarea__thumb descendant |
| **opacity** | 1 !important | — | EXC-Gate-02: sobrescreve inline style JS |
<!-- END:VISUAL-TABLE:DssScrollArea -->

---

### 4.53 DssSelect
**Categoria:** Action Control interativo — campo de seleção
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="outlined"`
- **Conteúdo de Demonstração:** Placeholder 'Selecione uma opção'

<!-- BEGIN:VISUAL-TABLE:DssSelect -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **min-width** | `--dss-min-w-lg` | `240px` | 2-composition/_base.scss |
| **border** | `--dss-gray-400` | `1px solid` | 3-variants/_filled.scss |
| **border (foco)** | `--dss-action-primary` | `2px solid` | 3-variants/_borderless.scss |
| **border-radius** | `--dss-radius-sm` | `4px` | 3-variants/_outlined.scss |
| **painel popup** | .dss__panel + popup-content-class | — | Seletor teleportado (Seção 3 proibidos: no scoped) |
<!-- END:VISUAL-TABLE:DssSelect -->

---

### 4.54 DssSeparator
**Categoria:** Decorativo / Estrutural não interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Linha divisória horizontal

<!-- BEGIN:VISUAL-TABLE:DssSeparator -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `1px` | defaultPreview |
| **border-color** | currentColor | — | Herda cor do pai (flexível) |
| **border-width** | `--dss-border-width-thin` | `1px` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssSeparator -->

---

### 4.55 DssSkeleton
**Categoria:** Placeholder de carregamento (skeleton screen)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** granted (Conformant)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `type="text"`
- **Conteúdo de Demonstração:** Bloco de texto esqueleto

<!-- BEGIN:VISUAL-TABLE:DssSkeleton -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `24px` | defaultPreview |
| **min-width** | `--dss-min-w-md` | — | 2-composition/_base.scss |
| **background** | `--dss-surface-muted` | — | 2-composition/_base.scss |
| **shimmer color** | `--dss-gray-200` | — | 2-composition/_base.scss |
| **shimmer highlight** | `--dss-gray-300` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **border-radius** | `--dss-radius-sm` | `4px` | 2-composition/_base.scss |
| **prefers-contrast** | border: 1px solid currentColor | — | NC-01 (precedente DssBadge) |
<!-- END:VISUAL-TABLE:DssSkeleton -->

---

### 4.56 DssSlideItem
**Categoria:** Item com ações deslizáveis (esquerda/direita)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop)*
- **Conteúdo de Demonstração:** Item com ações deslizáveis (esquerda/direita)

<!-- BEGIN:VISUAL-TABLE:DssSlideItem -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `56px` | defaultPreview |
| **background** | `--dss-surface-default` | — | Padrão item |
| **ação background** | `--dss-action-primary` | — | Ação primária padrão |
<!-- END:VISUAL-TABLE:DssSlideItem -->

---

### 4.57 DssSlider
**Categoria:** Action Control interativo — campo de intervalo numérico
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `min=0`, `max=100`, `modelValue=50`
- **Conteúdo de Demonstração:** Slider com valor 50

<!-- BEGIN:VISUAL-TABLE:DssSlider -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 1-structure/DssSlider.ts.vue |
| **min-width** | `--dss-min-w-md` | `200px` | 2-composition/_base.scss |
| **track height** | `--dss-track-height-sm` | `4px` | 2-composition/_base.scss |
| **track border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **track background** | `--dss-gray-300` | — | 4-output/_states.scss |
| **track preenchido** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **thumb tamanho** | `--dss-thumb-size-md` | `20px` | 2-composition/_base.scss |
| **thumb background** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **thumb shadow** | `--dss-elevation-1` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **touch target** | `--dss-touch-target-md` | `44px` | 1-structure/DssSlider.ts.vue |
<!-- END:VISUAL-TABLE:DssSlider -->

---

### 4.58 DssSpace
**Categoria:** Elemento de layout puro não interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `size="md"`
- **Conteúdo de Demonstração:** Espaçamento visual entre elementos

<!-- BEGIN:VISUAL-TABLE:DssSpace -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssSpace -->

*Nota: 21 spacing tokens disponíveis via prop `size`.*

---

### 4.59 DssSpinner
**Categoria:** Feedback de status — indicador de carregamento
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `type="standard"`, `size="md"`
- **Conteúdo de Demonstração:** Spinner animado de carregamento

<!-- BEGIN:VISUAL-TABLE:DssSpinner -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `40px` | defaultPreview |
| **min-width** | — | `40px` | defaultPreview |
| **color** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **color (hub)** | `--dss-hub-600` | — | 4-output/_brands.scss |
| **color (water)** | `--dss-water-500` | — | 4-output/_brands.scss |
<!-- END:VISUAL-TABLE:DssSpinner -->

---

### 4.60 DssSplitter
**Categoria:** Divisor redimensionável (horizontal ou vertical)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue=50`, `orientation="horizontal"`
- **Conteúdo de Demonstração:** Divisor redimensionável 50/50

<!-- BEGIN:VISUAL-TABLE:DssSplitter -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `200px` | defaultPreview |
| **separator touch target** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **separator background** | `--dss-gray-200` | — | 2-composition/_base.scss |
| **tap highlight** | — | `-webkit-tap-highlight-color: transparent` | NC-02 (padrão DssChip) |
<!-- END:VISUAL-TABLE:DssSplitter -->

---

### 4.61 DssStep
**Categoria:** Elemento interativo de navegação em stepper (wizard)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma — step 1 por padrão)*
- **Conteúdo de Demonstração:** Etapa 1 — Informações básicas

<!-- BEGIN:VISUAL-TABLE:DssStep -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **círculo ativo** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **círculo inativo border** | `--dss-gray-400` | `1px solid` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **círculo inativo color** | `--dss-text-subtle` | — | 2-composition/_base.scss |
| **linha conectora** | `--dss-gray-300` | `1px solid` | 2-composition/_base.scss |
| **cor feedback (step concluído)** | `--dss-feedback-success` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssStep -->

---

### 4.62 DssStepper
**Categoria:** Container de navegação — Stepper/Wizard
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Fluxo com 3 etapas: Dados, Revisão, Confirmação

<!-- BEGIN:VISUAL-TABLE:DssStepper -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssStepper -->

*Nota: `_brands.scss` completamente comentado — brandabilidade via componentes filhos (DssStep).*

---

### 4.63 DssTab
**Categoria:** Elemento interativo de navegação por abas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** approved (Sealed)

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `label="Aba"`
- **Conteúdo de Demonstração:** Tab 'Início'

<!-- BEGIN:VISUAL-TABLE:DssTab -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | 2-composition/_base.scss |
| **padding** | `--dss-spacing-4` | `0 16px` | 2-composition/_base.scss |
| **font-size** | `--dss-font-size-md` | `14px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-weight (ativa)** | `--dss-font-weight-medium` | `500` | 2-composition/_base.scss |
| **font-weight (inativa)** | `--dss-font-weight-normal` | `400` | 2-composition/_base.scss |
| **color (ativa)** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **color (inativa)** | `--dss-text-subtle` | — | 2-composition/_base.scss |
| **indicador height** | `--dss-track-height-xs` | `2px` | 2-composition/_base.scss |
| **indicador background** | `--dss-action-primary` | — | 2-composition/_base.scss |
| **hover background** | `--dss-surface-hover` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssTab -->

---

### 4.64 DssTabPanel
**Categoria:** Container de conteúdo de aba (Tab Panel)
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Conteúdo do painel de aba

<!-- BEGIN:VISUAL-TABLE:DssTabPanel -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `48px` | defaultPreview |
| **padding** | `--dss-spacing-6` | `24px` | 2-composition/_base.scss |
| **background** | `--dss-surface-default` | — | Padrão categoria Superfície |
<!-- END:VISUAL-TABLE:DssTabPanel -->

---

### 4.65 DssTabPanels
**Categoria:** Container de painéis de abas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conforme

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Container de painéis de abas

<!-- BEGIN:VISUAL-TABLE:DssTabPanels -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `48px` | defaultPreview |
| **background** | `--dss-surface-default` | — | Padrão categoria Superfície |
<!-- END:VISUAL-TABLE:DssTabPanels -->

---

### 4.66 DssTabs
**Categoria:** Container de navegação (Tab Group)
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** 3 abas: Início, Perfil, Configurações

<!-- BEGIN:VISUAL-TABLE:DssTabs -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **border-bottom** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **indicador animação** | `--dss-duration-250` | `250ms` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **gap (ícone + label)** | `--dss-spacing-2` | `8px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **setas color** | `--dss-text-subtle` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssTabs -->

---

### 4.67 DssTextarea
**Categoria:** Action Control interativo — campo multilinhas
**Fase de Entrega:** Fase 1
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `variant="outlined"`
- **Conteúdo de Demonstração:** Placeholder 'Escreva sua mensagem aqui'

<!-- BEGIN:VISUAL-TABLE:DssTextarea -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | `88px` | defaultPreview (2+ linhas) |
| **min-width** | `--dss-min-w-lg` | `240px` | 2-composition/_base.scss |
| **border** | `--dss-gray-400` | `1px solid` | 3-variants/_borderless.scss |
| **border (foco)** | `--dss-action-primary` | `2px solid` | 3-variants/_borderless.scss |
| **border-radius** | `--dss-radius-md` | `8px` | 3-variants/_filled.scss |
| **padding** | `--dss-spacing-4` | `16px` | 2-composition/_base.scss |
| **font-size** | `--dss-font-size-md` | `14px` | 2-composition/_base.scss |
| **resize** | vertical | — | Comportamento padrão textarea |
<!-- END:VISUAL-TABLE:DssTextarea -->

---

### 4.68 DssTimeline
**Categoria:** Container de linha do tempo
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `side="right"`
- **Conteúdo de Demonstração:** 3 eventos na linha do tempo

<!-- BEGIN:VISUAL-TABLE:DssTimeline -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssTimeline -->

---

### 4.69 DssTimelineEntry
**Categoria:** Entrada individual de linha do tempo
**Fase de Entrega:** Fase 2
**Status de Conformidade:** conformant

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `title="Evento"`, `subtitle="Data"`, `icon="check"`
- **Conteúdo de Demonstração:** Entrada de timeline com ícone e conteúdo

<!-- BEGIN:VISUAL-TABLE:DssTimelineEntry -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **ícone background** | `--dss-action-primary` | — | Padrão step/timeline ativo |
| **ícone color** | `--dss-text-inverse` | `branco` | Padrão ação primária |
| **linha conectora** | `--dss-gray-300` | `1px solid` | Padrão linha temporal |
| **título font-weight** | `--dss-font-weight-medium` | `500` | Hierarquia tipográfica |
| **subtítulo color** | `--dss-text-subtle` | — | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssTimelineEntry -->

---

### 4.70 DssToggle
**Categoria:** Compact Control interativo — switch
**Fase de Entrega:** Fase 1
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `color="primary"`, `size="md"`
- **Conteúdo de Demonstração:** Label 'Ativar'

<!-- BEGIN:VISUAL-TABLE:DssToggle -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **track width** | `--dss-spacing-9` | `36px` | 2-composition/_base.scss |
| **track height** | `--dss-spacing-5` | `20px` | 2-composition/_base.scss |
| **track border-radius** | `--dss-radius-full` | `9999px` | 2-composition/_base.scss |
| **track border-width (off)** | `--dss-border-width-md` | `2px` | 2-composition/_base.scss |
| **track border-color (off)** | `--dss-gray-400` | — | 2-composition/_base.scss |
| **track background (off)** | `--dss-surface-muted` | — | 2-composition/_base.scss |
| **track background (on)** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **thumb tamanho (off)** | `--dss-thumb-size-sm` | `16px` | 2-composition/_base.scss |
| **thumb tamanho (on)** | `--dss-thumb-size-sm` | `16px` | 2-composition/_base.scss |
| **thumb background (off)** | `--dss-gray-500` | — | 2-composition/_base.scss |
| **thumb background (on)** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **transição** | `--dss-duration-200` | `200ms` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssToggle -->

---

### 4.71 DssToolbar
**Categoria:** Container estrutural horizontal — barra de ferramentas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Toolbar com título e ações

<!-- BEGIN:VISUAL-TABLE:DssToolbar -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-touch-target-md` | `44px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **padding (horizontal)** | `--dss-spacing-4` | `16px` | 2-composition/_base.scss |
| **background** | `--dss-surface-default` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **border-bottom** | `--dss-gray-200` | `1px solid` | 2-composition/_base.scss |
| **gap** | `--dss-spacing-2` | `8px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **título font-size** | `--dss-font-size-lg` | `16px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **título font-weight** | `--dss-font-weight-medium` | `500` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **variante elevated** | `--dss-elevation-2` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssToolbar -->

---

### 4.72 DssToolbarTitle
**Categoria:** Container tipográfico para barra de ferramentas
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Título da barra de ferramentas

<!-- BEGIN:VISUAL-TABLE:DssToolbarTitle -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-compact-control-height-sm` | `24px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **font-size** | `--dss-font-size-lg` | `16px` | Padrão toolbar title |
| **font-weight** | `--dss-font-weight-medium` | `500` | Padrão toolbar title |
| **color** | `--dss-text-body` | — | Padrão neutro |
<!-- END:VISUAL-TABLE:DssToolbarTitle -->

---

### 4.73 DssTooltip
**Categoria:** Elemento informativo contextual não interativo
**Fase de Entrega:** Fase 1
**Status de Conformidade:** sealed — Golden Reference não-interativo de contexto

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo)*
- **Conteúdo de Demonstração:** Tooltip 'Informação adicional'

<!-- BEGIN:VISUAL-TABLE:DssTooltip -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-compact-control-height-sm` | `24px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **background** | `--dss-gray-900` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **color** | `--dss-text-inverse` | `branco` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **padding** | `--dss-spacing-1_5 / --dss-spacing-2` | `6px 8px` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-sm` | `4px` | 2-composition/_base.scss |
| **font-size** | `--dss-font-size-xs` | `12px` | 2-composition/_base.scss |
| **font-weight** | `--dss-font-weight-normal` | `400` | 2-composition/_base.scss |
| **max-width** | `--dss-max-w-xs` | `240px` | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-2` | — | 2-composition/_base.scss |
| **animação** | `--dss-duration-150` | `150ms` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssTooltip -->

---

### 4.74 DssTree
**Categoria:** Árvore hierárquica com nós expansíveis
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `nodeKey="id"`, `labelKey="label"`
- **Conteúdo de Demonstração:** Árvore hierárquica com nós expansíveis

<!-- BEGIN:VISUAL-TABLE:DssTree -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | — | — | N/A — Componente estrutural adaptativo |
| **min-width** | — | — | N/A — Componente estrutural adaptativo |
<!-- END:VISUAL-TABLE:DssTree -->

---

### 4.75 DssVideo
**Categoria:** Elemento de exibição de vídeo
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `src="[URL do vídeo]"`, `title="[Descrição]"`, `ratio=1.78`
- **Conteúdo de Demonstração:** Vídeo 16:9 incorporado

<!-- BEGIN:VISUAL-TABLE:DssVideo -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 180px | — | defaultPreview / Seção 13.28 |
| **border-radius** | — | `0` | CSS real: sem border-radius no default — radius só existe nos variants (dss-video--radius-*) |
| **background** | — | — | Browser default: elemento <video> nativo tem fundo escuro — não aplicado via token DSS |
| **aspect-ratio** | 16/9 (número, não string) | — | NC-02 corrigida: `ratio=1.78` |
| **slider preenchido** | `--dss-action-primary` | — | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
| **texto de tempo font-size** | `--dss-font-size-xs` | `12px` | via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss |
<!-- END:VISUAL-TABLE:DssVideo -->

---

### 4.76 DssVirtualScroll
**Categoria:** Lista virtualizada de alto desempenho
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `items="[Array de itens]"`, `itemSize=48`, `type="list"`
- **Conteúdo de Demonstração:** Lista virtualizada com 1000 itens

<!-- BEGIN:VISUAL-TABLE:DssVirtualScroll -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | 200px | — | defaultPreview |
| **item default height** | 48px | — | defaultPreview / itemSize |
| **spinner color** | `--dss-action-primary` | — | CSS currentColor (padrão DssSpinner) |
<!-- END:VISUAL-TABLE:DssVirtualScroll -->

---

---

## 4-B. Componentes Compostos (adicionados na Onda P1 — Jun/2026)

> Entradas 4.77–4.88: os composed não possuíam seção declarativa neste
> documento (débito sistêmico D). Tabelas geradas a partir de
> `defaultPreview.visualProperties` via `npm run sync:visual-contract`.
### 4.77 DssBottomSheet
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssBottomSheet -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **box-shadow** | `--dss-shadow-modal` | `0 20px 60px rgba(0, 0, 0, 0.3)` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-lg` | `0.75rem` | 2-composition/_base.scss |
| **color** | `--dss-text-body` | `#454545` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssBottomSheet -->

---

### 4.78 DssCarousel
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssCarousel -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
| **background-color** | `--dss-surface-muted` | `#f5f5f5` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssCarousel -->

---

### 4.79 DssChatMessage
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssChatMessage -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **gap** | `--dss-spacing-2` | `0.5rem` | 2-composition/_base.scss |
| **transition** | `--dss-duration-200` | `200ms` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssChatMessage -->

---

### 4.80 DssColorPicker
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `formatModel="hex"`

<!-- BEGIN:VISUAL-TABLE:DssColorPicker -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssColorPicker -->

---

### 4.81 DssDatePicker
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue="2026/05/22"`

<!-- BEGIN:VISUAL-TABLE:DssDatePicker -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssDatePicker -->

---

### 4.82 DssDialog
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssDialog -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-5` | `0 25px 50px rgba(0, 0, 0, 0.45)` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-lg` | `0.75rem` | 2-composition/_base.scss |
| **color** | `--dss-text-body` | `#454545` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssDialog -->

---

### 4.83 DssForm
**Categoria:** Container de Formulário — wrapper governado sobre QForm do Quasar
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssForm -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **gap** | `--dss-form-gap` | `1rem` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssForm -->

---

### 4.84 DssPopupEdit
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssPopupEdit -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **box-shadow** | `--dss-elevation-3` | `0 10px 15px rgba(0, 0, 0, 0.35)` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
| **font-family** | `--dss-font-family-sans` | `'Inter', -apple-system, BlinkMacSystemFont,
                         'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssPopupEdit -->

---

### 4.85 DssTable
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssTable -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
| **color** | `--dss-text-body` | `#454545` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssTable -->

---

### 4.86 DssTestPageComplexity
**Categoria:** composed
**Fase de Entrega:** Fase 3
**Status de Conformidade:** review

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssTestPageComplexity -->
<!-- END:VISUAL-TABLE:DssTestPageComplexity -->

---

### 4.87 DssTimePicker
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** sealed

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `modelValue="14:30"`, `format24h=true`

<!-- BEGIN:VISUAL-TABLE:DssTimePicker -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-md` | `0.5rem` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssTimePicker -->

---

### 4.88 DssUploader
**Categoria:** Composto
**Fase de Entrega:** Fase 2
**Status de Conformidade:** in-progress

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** *(nenhuma prop de estilo — renderização padrão)*

<!-- BEGIN:VISUAL-TABLE:DssUploader -->
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **background-color** | `--dss-surface-default` | `#ffffff` | 2-composition/_base.scss |
| **border-radius** | `--dss-radius-lg` | `0.75rem` | 2-composition/_base.scss |
| **border-width** | `--dss-border-width-thin` | `1px` | 2-composition/_base.scss |
| **border-color** | `--dss-gray-300` | `#e5e5e5` | 2-composition/_base.scss |
<!-- END:VISUAL-TABLE:DssUploader -->

---

## 5. Governança e Processo de Atualização

### 5.1 Regra de Sincronização Obrigatória

Qualquer alteração no visual de um componente DSS EXIGE:

1. **Atualização do `dss.meta.json`** (`defaultPreview.props`, `defaultPreview.computedDimensions`)
2. **Atualização da entrada na Seção 4** deste documento
3. **Ambas as alterações na mesma PR** — nunca separadas

Violação desta regra é considerada **drift de contrato visual** e bloqueia o selo da próxima auditoria.

### 5.2 Como Adicionar Novos Componentes

Ao criar um novo componente DSS (Fase 3+):

1. Defina o `defaultPreview` completo no `dss.meta.json` **antes** de escrever qualquer SCSS.
2. Determine a categoria do componente e aplique os padrões da Seção 3.
3. Consulte o CSS do componente (`2-composition/_base.scss` e camadas seguintes) para confirmar dimensões e tokens (Constituição #6). O Figma pode ser consultado via MCP como apoio, sem autoridade decisória.
4. Adicione a entrada na Seção 4 deste documento com a tabela de tokens.
5. Execute `validateVisualContract` (quando disponível) para validar conformidade.

### 5.3 Componentes Estruturais Adaptativos

Os seguintes 16 componentes possuem `computedDimensions: {}` (objeto vazio) no `dss.meta.json`, pois seu tamanho é determinado pelo conteúdo e pelo layout pai. Não adicione `computedDimensions` a esses componentes:

`DssInfiniteScroll`, `DssItemLabel`, `DssItemSection`, `DssLayout`, `DssList`, `DssPage`, `DssPageContainer`, `DssPageScroller`, `DssPageSticky`, `DssPopupProxy`, `DssPullToRefresh`, `DssResponsive`, `DssSpace`, `DssStepper`, `DssTimeline`, `DssTree`

### 5.4 Hierarquia de Autoridade sobre Aspectos Visuais

Em caso de conflito entre fontes de informação visual:

1. **CSS do componente** (`2-composition/_base.scss` e camadas seguintes) — supremo (Constituição #6)
2. **`dss.meta.json` → `defaultPreview`** (machine-readable — espelho documentado do CSS)
3. **Este documento** (human-readable — derivado do meta.json via `npm run sync:visual-contract`)
4. **Qualquer outro documento** (subordinado)

> O **Figma está fora da cadeia de autoridade**: é ferramenta integrável via
> MCP, como qualquer outra ferramenta de mercado, sem poder decisório sobre
> aspectos visuais. Toda alteração visual começa no CSS; toda documentação é
> derivada (cadeia: **CSS → meta.json → este documento**).

<!-- BEGIN:AUTO-GENERATED — NÃO EDITAR MANUALMENTE -->
## Seção Auto-Gerada: Contratos Visuais Default

> Esta seção é regenerada automaticamente por `scripts/sync-visual-contract.js`.
> **Não edite manualmente** — as alterações serão sobrescritas na próxima execução.

| Componente | Grupo | Props Default | Dimensões | demoContent |
|---|---|---|---|---|
| DssAjaxBar | progresso | position:top, color:primary | minHeight:3px | Barra de progresso de requisições AJAX |
| DssAvatar | indicadores | size:md, icon:person | minHeight:48px, minWidth:48px | Iniciais 'AB' |
| DssBadge | indicadores | color:primary | minHeight:24px, minWidth:24px | Label '99+' |
| DssBanner | banners | variant:default, inline | minHeight:48px | Mensagem informativa com ação |
| DssBar | layout | rounded | minHeight:44px | Barra de sistema com conteúdo |
| DssBottomSheet | contextuais | — | — | — |
| DssBreadcrumbs | navegacao | — | minHeight:21px | Home / Produtos / Detalhe |
| DssBreadcrumbsEl | navegacao | label:Página | minHeight:17px | Item de breadcrumb 'Home' |
| DssBtnDropdown | acoes | label:Opções | minHeight:44px | Botão 'Opções' com menu dropdown |
| DssBtnGroup | acoes | — | minHeight:44px | Grupo com 3 botões |
| DssBtnToggle | acoes | modelValue:opcao1, options:[…] | minHeight:44px | Toggle entre opções A / B / C |
| DssButton | acoes | variant:elevated, color:primary, size:md | minHeight:44px, minWidth:44px | Label 'Action' |
| DssCard | cartoes | variant:elevated | minHeight:80px | DssCardSection com texto e ações |
| DssCarousel | contextuais | — | — | — |
| DssChatMessage | contextuais | — | — | — |
| DssCheckbox | form-controles | color:primary, size:md, label:Opção | minHeight:44px | Label 'Opção' |
| DssChip | acoes | variant:filled, color:primary, size:md, label:Chip | minHeight:28px | Label 'Chip' |
| DssCircularProgress | progresso | value:70, size:md, color:primary | minHeight:56px, minWidth:56px | Progresso circular 70% |
| DssColorPicker | contextuais | formatModel:hex | — | — |
| DssDataCard | contextuais | — | — | — |
| DssDatePicker | contextuais | modelValue:2026/05/22 | — | — |
| DssDialog | contextuais | — | — | — |
| DssDrawer | layout | persistent, width:150 | minHeight:100vh, minWidth:300px | Painel lateral com navegação |
| DssExpansionItem | navegacao | label:Expansível, icon:expand_more, modelValue | minHeight:44px | Item expansível com conteúdo |
| DssFab | acoes | color:primary, icon:add, label:Adicionar | minHeight:56px, minWidth:56px | FAB com ícone 'add' |
| DssFabAction | acoes | color:primary, icon:mail, label:Email | minHeight:40px, minWidth:40px | FAB Action com ícone 'mail' |
| DssField | contextuais | — | minHeight:44px, minWidth:240px | Campo de formulário customizado |
| DssFile | form-campos | label:Arquivo | minHeight:44px | Seleção de arquivo |
| DssFooter | layout | — | minHeight:44px | Rodapé com informações do sistema |
| DssForm | contextuais | — | gap:16px (via --dss-form-gap → --dss-spacing-4) | DssForm com DssInput e DssButton — container estrutural com gap semântico entre campos |
| DssHeader | layout | — | minHeight:44px | Cabeçalho com logo e ações |
| DssIcon | indicadores | name:star, size:md | minHeight:24px, minWidth:24px | Ícone 'star' tamanho md |
| DssImg | midia | src:https://placehold.co/200x120, alt:Imagem demonstrativa, fit:cover, loading:lazy, width:200px | minHeight:150px, minWidth:200px | Imagem com alt text acessível |
| DssInfiniteScroll | contextuais | offset:500, debounce:100 | — | Lista com carregamento infinito |
| DssInnerLoading | progresso | showing, label:Carregando... | minHeight:48px | Overlay de carregamento interno |
| DssInput | form-campos | variant:outlined, type:text, label:Campo, placeholder:Digite aqui | minHeight:44px, minWidth:240px | Placeholder 'Digite aqui' |
| DssItem | listas | — | minHeight:44px | Item com ícone e texto |
| DssItemLabel | listas | — | — | Rótulo de seção de lista |
| DssItemSection | listas | — | — | Seção de item (avatar, conteúdo ou ação) |
| DssKnob | indicadores | modelValue:50, min:0, max:100 | minHeight:56px, minWidth:56px | Knob com valor 50% |
| DssLayout | layout | style:height:200px;position:relative;overflow:hidden;display:block | — | Layout de página completo (header + drawer + footer) |
| DssLinearProgress | progresso | value:0.7, color:primary, size:md | minHeight:4px, minWidth:200px | Barra de progresso linear 70% |
| DssList | listas | — | — | Lista com 3 itens |
| DssMarkupTable | cartoes | density:standard, bordered, separator:horizontal | width:100% | Tabela com thead/tbody padrão |
| DssMenu | navegacao | — | minHeight:200px, minWidth:200px | Menu com 3 itens |
| DssOptionGroup | form-controles | type:radio, modelValue:opt1, options:[…] | minHeight:44px | Grupo de opções (radio/checkbox/toggle) |
| DssPage | layout | — | — | Área de conteúdo principal da página |
| DssPageContainer | layout | — | — | Container com largura máxima de conteúdo |
| DssPageScroller | layout | — | — | Botão de scroll para o topo |
| DssPageSticky | layout | position:bottom-right, offset:[…] | — | Elemento fixo na página |
| DssPagination | navegacao | modelValue:1, max:10 | minHeight:44px | Página 1 de 10 |
| DssParallax | contextuais | src:https://placehold.co/600x200, height:100, speed:0.5, alt:Imagem decorativa de fundo, decorative | minHeight:200px | Seção com efeito parallax |
| DssPopupEdit | contextuais | — | — | — |
| DssPopupProxy | contextuais | breakpoint:450 | — | Proxy de popup (Dialog em mobile, Menu em desktop) |
| DssPullToRefresh | contextuais | — | — | Puxe para atualizar |
| DssRadio | form-controles | color:primary, size:md, label:Opção, val:opcao | minHeight:44px | Label 'Opção' |
| DssRange | form-controles | min:0, max:100, modelValue:{…}, aria-label:Seleção de intervalo | minHeight:44px, minWidth:200px | Range de 25 a 75 |
| DssRating | indicadores | modelValue:3, max:5 | minHeight:44px, minWidth:160px | Avaliação de 3 de 5 estrelas |
| DssResponsive | contextuais | show:sm | — | Wrapper condicional por breakpoint |
| DssRouteTab | contextuais | label:Início, to:/, name:inicio | minHeight:44px | Tab de rota 'Início' |
| DssScrollArea | midia | visible:auto, style:height:100px;width:200px | minHeight:200px | Área com scrollbar customizada |
| DssSelect | form-campos | variant:outlined, label:Seleção, options:[…] | minHeight:44px, minWidth:240px | Placeholder 'Selecione uma opção' |
| DssSeparator | listas | — | minHeight:1px | Linha divisória horizontal |
| DssSkeleton | progresso | type:text, width:200px | minHeight:24px, minWidth:200px | Bloco de texto esqueleto (placeholder de carregamento) |
| DssSlideItem | listas | — | minHeight:56px | Item com ações deslizáveis (esquerda/direita) |
| DssSlider | form-controles | min:0, max:100, modelValue:50, aria-label:Seleção de valor | minHeight:44px, minWidth:200px | Slider com valor 50 |
| DssSpace | listas | size:md | — | Espaçamento visual entre elementos |
| DssSpinner | indicadores | type:standard, size:md | minHeight:40px, minWidth:40px | Spinner animado de carregamento |
| DssSplitter | midia | modelValue:50, orientation:horizontal, style:height:80px;width:240px | minHeight:200px | Divisor redimensionável 50/50 |
| DssStep | stepper | name:passo1, title:Passo 1 | minHeight:44px | Etapa 1 — Informações básicas |
| DssStepper | stepper | modelValue:passo1 | — | Fluxo com 3 etapas: Dados, Revisão, Confirmação |
| DssTab | navegacao | label:Aba, name:tab1 | minHeight:44px | Tab 'Início' |
| DssTable | contextuais | — | — | — |
| DssTabPanel | navegacao | name:inicio | minHeight:48px | Conteúdo do painel de aba |
| DssTabPanels | navegacao | modelValue:inicio | minHeight:48px | Container de painéis de abas |
| DssTabs | navegacao | modelValue:inicio | minHeight:44px | 3 abas: Início, Perfil, Configurações |
| DssTextarea | form-campos | variant:outlined, label:Mensagem, placeholder:Escreva aqui | minHeight:88px, minWidth:240px | Placeholder 'Escreva sua mensagem aqui' |
| DssTimeline | timeline | side:right | — | 3 eventos na linha do tempo |
| DssTimelineEntry | timeline | title:Evento, subtitle:Data, icon:check | minHeight:44px | Entrada de timeline com ícone e conteúdo |
| DssTimePicker | contextuais | modelValue:14:30, format24h | — | — |
| DssToggle | form-controles | color:primary, size:md, label:Ativar | minHeight:44px | Label 'Ativar' |
| DssToolbar | layout | — | minHeight:44px | Toolbar com título e ações |
| DssToolbarTitle | layout | — | minHeight:24px | Título da barra de ferramentas |
| DssTooltip | indicadores | — | minHeight:24px | Tooltip 'Informação adicional' |
| DssTree | arvore | nodeKey:id, labelKey:label, nodes:[…] | — | Árvore hierárquica com nós expansíveis |
| DssUploader | contextuais | — | — | — |
| DssVideo | contextuais | src:, title:[Descrição], ratio:1.78 | minHeight:180px | Vídeo 16:9 incorporado |
| DssVirtualScroll | contextuais | items:[…], itemSize:48, type:list | minHeight:200px | Lista virtualizada com 1000 itens |

_Gerado em: 2026-07-13T19:49:27.158Z_
<!-- END:AUTO-GENERATED -->
