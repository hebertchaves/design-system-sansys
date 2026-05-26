# Definição de Valores Visuais Padrão (DSS)

Este documento estabelece os valores visuais padrão (defaults) para os componentes do Design System Sansys (DSS), baseando-se em referências de mercado (Material Design 3, IBM Carbon, Salesforce Lightning) e garantindo coesão visual através do uso exclusivo de tokens DSS.

## Princípios de Coesão Visual

Para garantir que os componentes tenham unidade visual entre si, os seguintes princípios foram estabelecidos:

1.  **Cor Principal (Primary):** A cor `--dss-action-primary` (ou `--dss-primary`) é a âncora visual para ações principais, estados ativos e foco.
2.  **Forma (Border Radius):** Adoção de um arredondamento sutil e consistente para a maioria dos componentes (`--dss-radius-md` ou `--dss-radius-sm`), com exceção de botões de ação principal que adotam formato de pílula (`--dss-radius-full`) para maior destaque, alinhando-se às tendências modernas.
3.  **Tipografia:** Uso de `text-transform: none` como padrão para melhorar a legibilidade, com pesos de fonte variando entre `Regular` e `Medium` dependendo da hierarquia da informação.
4.  **Feedback Visual (Hover/Focus):** Uso consistente de overlays de opacidade para hover (`--dss-opacity-hover`) e anéis de foco (`@include dss-focus-ring`) para acessibilidade.
5.  **Bordas e Superfícies:** Uso de `--dss-border-width-thin` (1px) com cores neutras (`--dss-gray-300` ou `--dss-gray-400`) para delimitação, e superfícies neutras (`--dss-surface-default`, `--dss-surface-muted`) para fundos.

## Definição por Grupo de Componentes

### 1. Componentes de Ação (Button, FAB, BtnGroup, BtnToggle, BtnDropdown)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Variante Default** | `elevated` (com cor `primary`) | Ações principais devem ter destaque (Material 3, Carbon). |
| **Cor Principal** | `--dss-action-primary` | Consenso de mercado para a ação principal. |
| **Border Radius** | `--dss-radius-full` (Pill) | Tendência moderna (Material 3) para botões de ação principal. |
| **Tipografia** | `text-transform: none`, `font-weight: medium` | Legibilidade superior ao uppercase (Carbon, Lightning). |
| **Hover/Active** | Overlay com `--dss-opacity-hover` / `--dss-opacity-active` | Padrão consistente de feedback visual. |
| **Focus** | `@include dss-focus-ring('primary')` | Acessibilidade (WCAG). |

### 2. Componentes de Formulário (Input, Select, Textarea, FileInput)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Variante Default** | `outlined` | Maior clareza de delimitação do campo (Carbon, Lightning). |
| **Border Radius** | `--dss-radius-md` | Arredondamento sutil e consistente. |
| **Cor da Borda (Default)** | `--dss-gray-300` | Delimitação neutra. |
| **Cor da Borda (Hover)** | `--dss-gray-400` | Feedback sutil de interatividade. |
| **Cor da Borda (Focus)** | `--dss-action-primary` (2px) | Destaque claro do campo ativo (Material 3, Carbon). |
| **Cor do Label (Focus)** | `--dss-action-primary` | Conexão visual entre o label e o campo ativo. |

### 3. Controles de Seleção (Checkbox, Radio, Toggle, Slider)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Cor Principal (Checked)** | `--dss-action-primary` | Consenso de mercado para estado selecionado. |
| **Cor da Borda (Unchecked)**| `--dss-action-primary` | Indica interatividade mesmo quando não selecionado (Carbon). |
| **Border Radius (Checkbox)**| `--dss-radius-sm` | Pequeno arredondamento. |
| **Border Radius (Radio)** | `50%` (Circular) | Padrão universal para seleção única. |
| **Toggle Track (Unchecked)**| `--dss-surface-muted` | Fundo neutro para estado inativo. |
| **Focus** | `@include dss-focus-ring('primary')` | Acessibilidade (WCAG). |

### 4. Indicadores e Feedback (Badge, Avatar, Spinner, Progress)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Cor Principal (Spinner/Progress)** | `--dss-action-primary` | Indicadores de carregamento devem usar a cor da marca. |
| **Cor de Fundo (Avatar Default)** | `--dss-surface-muted` | Fundo neutro quando não há imagem. |
| **Border Radius (Badge)** | `--dss-radius-full` | Formato de pílula para contadores/notificações. |
| **Border Radius (Avatar)** | `50%` (Circular) | Padrão universal para avatares. |

### 5. Superfície e Layout (Card, Dialog, Drawer, Banner)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Variante Default (Card)** | `elevated` | Separação visual do fundo (Material 3). |
| **Elevação (Card Default)** | `--dss-elevation-1` | Sombra sutil para profundidade. |
| **Border Radius (Card/Dialog)**| `--dss-radius-lg` | Arredondamento maior para superfícies contêineres. |
| **Cor de Fundo** | `--dss-surface-default` | Branco/Neutro claro para legibilidade. |

### 6. Navegação e Estrutura (Tabs, Breadcrumbs, Menu, List)

| Propriedade | Valor Padrão (Token DSS) | Justificativa (Referência de Mercado) |
| :--- | :--- | :--- |
| **Cor do Link/Item Ativo** | `--dss-action-primary` | Indicação clara de seleção/interatividade. |
| **Cor do Texto (Inativo)** | `--dss-text-subtle` | Hierarquia visual menor para itens não selecionados. |
| **Hover (Menu/List Item)** | `--dss-surface-hover` | Feedback visual de área clicável. |
| **Indicador (Tabs)** | Borda inferior com `--dss-action-primary` | Padrão universal para abas. |

## Validação de Coesão

A aplicação destes valores garante que:
- A cor primária (`--dss-action-primary`) atua como o fio condutor de interatividade em todo o sistema.
- O arredondamento (`border-radius`) segue uma escala lógica: `sm` para pequenos controles (checkbox), `md` para campos de entrada, `lg` para superfícies (cards) e `full` para ações principais (botões).
- O feedback de interação (hover/focus) é previsível e acessível em todos os componentes.
