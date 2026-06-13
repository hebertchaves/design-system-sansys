# Pré-prompt: DssBar

## 1. CLASSIFICAÇÃO E CONTEXTO

**Fase:** 2 — **Nível:** 1 — **Independente**
**Família:** Notificações e Alertas
**Motor Quasar:** `QBar` (NÃO QToolbar — DssToolbar já encapsula QToolbar)

### Golden Reference
O `DssBar` é um componente **não-interativo** (container). O componente em si não responde a hover/focus/active — apenas os elementos internos possuem interação. Portanto, **DssBadge** é o **Golden Reference** para DssBar (padrão de componente não-interativo, consistente com DssMarkupTable, DssToolbar).

### Golden Context
O **Golden Context** para auditar DssBar é **DssToolbar** — container horizontal de sistema, mesmo padrão de motor+wrapper, mesma estrutura não-interativa com suporte a brandabilidade. Use DssToolbar como baseline arquitetural durante auditoria.

### Justificativa
A criação do `DssBar` visa padronizar barras de sistema (título de janela desktop/Electron, barra superior mobile) no Design System. Motor `QBar` é distinto de `QToolbar` (DssToolbar): QBar é usado para barras de sistema de baixo nível (window chrome, system UI), enquanto QToolbar é para toolbars de navegação de aplicação. A integração com Vue.js/Quasar assegura a reatividade e a performance esperadas.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
- **Acoplamento excessivo:** Risco de o `DssBar` se tornar um "componente monolítico" que tenta resolver muitos problemas, resultando em um acoplamento forte com a lógica da aplicação. Deve-se garantir que ele seja o mais agnóstico possível em relação à lógica de negócio.
- **Performance:** O `DssBar` pode conter múltiplos elementos interativos e reativos. A renderização excessiva ou a manipulação ineficiente do DOM podem impactar a performance, especialmente em dispositivos móveis ou com conexões lentas.
- **Flexibilidade vs. Padronização:** Encontrar o equilíbrio entre oferecer flexibilidade suficiente para diferentes casos de uso (ex: barra com busca, barra com menu, barra com ações) e manter a padronização visual e de comportamento do DSS.

### Gates
- **Revisão de API:** A API do `DssBar` deve ser revisada para garantir que seja intuitiva, extensível e que não exponha detalhes de implementação internos do Quasar.
- **Testes de Performance:** Realizar testes de performance rigorosos para garantir que o componente não cause gargalos na renderização da aplicação.
- **Testes de Acessibilidade:** Validação completa de acessibilidade (WCAG 2.1 AA) para todos os estados e interações do componente.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssBar` é construído sobre o componente **`QBar`** do Quasar (NÃO QToolbar). QBar é a barra de sistema de baixo nível do Quasar — usada para window title bars, Electron chrome e barras de sistema mobile.

**API real do QBar:**

| Propriedade Quasar (QBar) | Propriedade DSS (DssBar) | Tipo | Descrição | Status |
|---|---|---|---|---|
| `dense` | `dense` | `Boolean` | Modo compacto — reduz altura e padding. | ✅ Exposta |
| `dark` | — | `Boolean` | Aplica dark theme ao QBar. | ❌ Bloqueada — DSS usa `[data-theme="dark"]` global |
| `glossy` | — | `Boolean` | Aparência brilhante. | ❌ Bloqueada — não faz parte do vocabulário visual DSS |
| — | `elevated` | `Boolean` | Sombra de elevação (`--dss-shadow-md`). | ✅ DSS-própria (não existe no QBar) |
| `default` slot | `default` slot | Slot | Conteúdo da barra. | ✅ Re-exposto diretamente |

**Decisões de bloqueio:**
- `dark`: Bloqueada — DSS gerencia dark mode via cascade global de tokens
- `glossy`: Bloqueada — efeito visual fora do vocabulário DSS
- `backgroundColor`/`textColor` como props: Bloqueadas — cores via brands CSS (`[data-brand]`) e tokens de superfície

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBar` deve utilizar exclusivamente tokens de design do DSS. Tokens fantasmas NÃO devem ser usados.

### Tokens Reais Utilizados na Implementação:
- **Padding:** `--dss-padding-4` (16px, padrão) · `--dss-padding-2` (8px, dense) — **NUNCA** `--dss-spacing-*` para padding
- **Gap:** `--dss-gap-2` (8px entre itens) — **NUNCA** `--dss-spacing-*` para gap
- **Altura:** `--dss-touch-target-md` (48px normal) · `--dss-compact-control-height-sm` (dense)
- **Tipografia:** `--dss-font-family-sans` · `--dss-font-size-md` · `--dss-font-weight-normal` · `--dss-line-height-md`
- **Superfície:** `--dss-surface-default` (fundo padrão) · `--dss-text-body` (texto padrão)
- **Brands:** `--dss-hub-600` · `--dss-water-500` · `--dss-waste-600` · `--dss-text-inverse`
- **Sombra:** `--dss-shadow-md` (elevação)
- **Borda:** `--dss-border-width-thin` · `--dss-gray-700`

### Tokens que NÃO existem (não usar):
- ~~`--dss-spacing-4`~~ → usar `--dss-padding-4`
- ~~`--dss-action-hub-surface`~~ → não existe; usar `[data-brand="hub"] .dss-bar { background: var(--dss-hub-600) }`
- ~~`--dss-text-on-surface`~~ → não existe; usar `--dss-text-body` (claro) ou `--dss-text-inverse` (sobre brand)

## 5. ACESSIBILIDADE E ESTADOS

### Decisão de Touch Target
DssBar é **container não-interativo** — a barra em si não tem touch target. Elementos internos (DssButton, DssIcon) possuem touch target próprio de 48px. Opção B (delegação ao consumer) — conforme DssBadge.

### Estados Implementados / N/A:
| Estado | Status | Justificativa |
|--------|--------|---------------|
| default | ✅ | Estado inicial |
| dense | ✅ | `dense=true` → QBar `.q-bar--dense` |
| elevated | ✅ | `elevated=true` → `.dss-bar--elevated` + `--dss-shadow-md` |
| hover | N/A | Barra não tem cursor próprio — delegado a filhos |
| focus | N/A | Barra não é focável — delegado a filhos |
| active | N/A | Barra não tem estado pressionado |
| disabled | N/A | Container não é desabilitável |
| loading | N/A | Componente estrutural |

### Delegação de ARIA
DssBar não impõe atributos ARIA no root — consumer é responsável por adicionar `role="banner"`, `aria-label`, etc. conforme contexto de uso. Documentar explicitamente no componente.

### Acessibilidade implementada:
- `forced-colors: active`: `ButtonFace`/`ButtonText` (EXC-States-01, sem `forced-color-adjust: none` no container)
- `prefers-contrast: more`: `border-bottom` com `--dss-gray-700`
- `prefers-reduced-motion`: N/A (sem animações)

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS:
- `DssButton`: Para botões de ação dentro da barra.
- `DssIcon`: Para ícones visuais.
- `DssInput`: Opcionalmente, para campos de busca.
- `DssMenu`: Opcionalmente, para menus de contexto ou dropdowns.

### Composição:
O `DssBar` é um componente de composição, permitindo que outros componentes do DSS sejam aninhados dentro dele para construir diferentes layouts e funcionalidades. Ele deve fornecer slots bem definidos para facilitar essa composição.

## 7. EXCEÇÕES PREVISTAS

- **Barras de ferramentas contextuais:** Para casos onde uma barra de ferramentas muito específica e temporária é necessária (ex: edição de texto), pode-se considerar a criação de um componente mais especializado ou o uso direto do `QToolbar` com estilização ad-hoc, se a complexidade de adaptação do `DssBar` for muito alta. No entanto, a preferência é sempre por estender o `DssBar`.
- **Layouts de página completos:** O `DssBar` é focado na barra superior. Para layouts de página que incluem sidebars, footers e outras regiões, o `DssLayout` deve ser utilizado como componente principal, que pode então incorporar o `DssBar`.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
- **`dark` (Checkbox):** Alterna entre tema claro e escuro.
- **`dense` (Checkbox):** Ativa/desativa o modo compacto.
- **`backgroundColor` (Dropdown/Color Picker):** Seleciona a cor de fundo da barra (com opções de tokens DSS como `--dss-surface-default`, `--dss-surface-hub`, `--dss-surface-water`, `--dss-surface-waste`).
- **`textColor` (Dropdown/Color Picker):** Seleciona a cor do texto/ícones (com opções de tokens DSS como `--dss-text-on-surface`, `--dss-text-hub`, `--dss-text-water`, `--dss-text-waste`).
- **`fixed` (Checkbox):** Fixa a barra no topo.
- **`elevated` (Checkbox):** Adiciona elevação (sombra).
- **Conteúdo do Slot `default` (Textarea):** Permite inserir texto ou outros componentes (ex: `DssButton`, `DssIcon`) para visualização.
- **Conteúdo do Slot `left` (Textarea):** Permite inserir conteúdo no lado esquerdo da barra.
- **Conteúdo do Slot `right` (Textarea):** Permite inserir conteúdo no lado direito da barra.

### Composite Logic
O playground deve demonstrar a composição do `DssBar` com outros componentes do DSS. Exemplos concretos:
- Um `DssBar` contendo um `DssIcon` à esquerda, um título no centro e um `DssButton` à direita.
- Um `DssBar` com um `DssInput` (campo de busca) no slot `default`.
- Um `DssBar` fixo e elevado, com diferentes cores de fundo e texto, utilizando os tokens de brand `hub`, `water` e `waste`.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Visualização inicial do componente com as propriedades padrão. | Visual | Padrão (renderização inicial) |
| Fixed | Indicar se a barra está fixada ou não. | Visual | — |
| Elevated | Indicar se a barra possui elevação. | Visual | — |
| Hover/Focus/Active | Demonstrar os estados de interatividade dos elementos internos (ex: `DssButton` ou `DssIcon` aninhados). | Visual | Mouse over |
| Tokens CSS | Mostrar os valores CSS finais resultantes dos tokens DSS selecionados. | Visual | — |

---garantindo o uso correto de `--dss-spacing-4`, `--dss-text-subtle`, `--dss-action-hub`, `--dss-action-hub-surface` e `outline: 2px solid white`. |

---
*Fim do documento.*
