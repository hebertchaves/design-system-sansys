# DssCadrisCard — Documentação Normativa DSS v2.2

> **Fase 3 — Componente Composto Complexo (Stress Test)**
> Golden Reference: DssBadge | Golden Context: DssDataCard
> Status: Pronto para Auditoria

---

## 1. Identificação e Classificação

| Campo | Valor |
|---|---|
| **Nome** | `DssCadrisCard` |
| **Fase DSS** | Fase 3 — Composto Complexo |
| **Classificação** | Composite / Data / Search |
| **Versão** | 1.0.0 |
| **Golden Reference** | DssBadge (nao interativo) |
| **Golden Context** | DssDataCard (composição profunda) |

---

## 2. Escopo Funcional

### O que faz

- Exibe uma interface completa de pesquisa e listagem de registros de Cadri
- Orquestra filtros de busca (Cadri, Gerador, Documento, Aterro)
- Renderiza tabela de dados com ARIA completo (role="table", columnheader, etc.)
- Gerencia estados: loading (skeleton), vazio, disabled
- Exibe paginação com janela deslizante de até 5 páginas
- Propaga `disable` internamente via `provide/inject` sem prop drilling

### O que NÃO faz

- **Não faz chamadas de API.** Emite `@search` com filtros para o componente pai gerenciar.
- **Não armazena cache de resultados.** Cada busca é delegada ao pai.
- **Não gerencia erros de rede.** Erros são responsabilidade do pai.
- **Não força larguras fixas em pixels.** Layout é responsivo via Quasar grid.
- **Não usa cores hardcoded.** Cores de status via classes utilitárias Quasar.

---

## 3. Arquitetura — Padrões Fase 3

### OBJ-01: inheritAttrs: false + v-bind="$attrs"

```typescript
defineOptions({ name: 'DssCadrisCard', inheritAttrs: false })
// No template:
<DssCard v-bind="attrs" :class="rootClasses">
```

`$attrs` é repassado ao `DssCard` raiz via `v-bind="attrs"`. Atributos como `class`, `style`, `data-*` chegam ao container correto.

### OBJ-02: Slots Tipados

```typescript
// types/cadriscard.types.ts
export interface DssCadrisCardSlots {
  'toolbar-actions'(): unknown
}
```

Slot `toolbar-actions` permite extensão da toolbar sem modificar o componente. Posição: após o título "Cadris", antes do botão fechar.

### OBJ-03: provide/inject tipado

```typescript
// composables/useCadrisCard.ts
export const CADRIS_CARD_DISABLED_KEY: InjectionKey<Ref<boolean>> = Symbol('dss-cadris-card-disabled')
export function provideCadrisCardDisabled(disabled: Ref<boolean>): void { provide(CADRIS_CARD_DISABLED_KEY, disabled) }
export function injectCadrisCardDisabled(): Ref<boolean> { return inject(CADRIS_CARD_DISABLED_KEY, { value: false } as Ref<boolean>) }
```

A prop `disable` é fornecida via `CADRIS_CARD_DISABLED_KEY` para toda a árvore interna. Componentes filhos (DssButton, DssInput, DssSelect) podem consumir sem prop drilling.

### OBJ-04: CSS Variables / [data-brand]

Brand propagado via atributo `[data-brand]` no `DssCard` raiz (herdado via `v-bind="$attrs"` do consumidor). A Layer 4 `_brands.scss` usa seletores descendant para personalização.

**Padrão correto:**
```scss
[data-brand='hub'] .dss-cadris-card__thead th { border-bottom-color: var(--dss-hub-primary); }
```

### OBJ-05: Sem :deep() para layout

Layout interno controlado inteiramente por classes BEM `.dss-cadris-card__*` no wrapper do componente pai. Nenhum uso de `:deep()` para layout em todo o SCSS.

---

## 4. Contrato de Interface (Fase 3)

### 4.1 Casos de Uso Negativos

- ❌ Não deve fazer chamadas de API diretamente
- ❌ Não deve forçar larguras fixas em pixels que quebrem responsividade
- ❌ Não deve usar cores hardcoded no SCSS (ex: `#3b82f6`)

### 4.2 Matriz de Composição

| Componente | Permitido | Uso |
|---|---|---|
| `DssCard` | ✅ | Container principal (raiz) |
| `DssToolbar` | ✅ | Cabeçalho "Cadris" |
| `DssToolbarTitle` | ✅ | Título na toolbar |
| `DssInput` | ✅ | Campos Cadri e Gerador |
| `DssSelect` | ✅ | Selects Documento e Aterro |
| `DssButton` | ✅ | Pesquisar, FECHAR, paginação |
| `DssIcon` | ✅ | Status e empty state |
| `DssSpace` | ✅ | Separador flexbox na toolbar |
| `<table>` nativo | ✅ | Listagem de dados (sem DssTable) |
| `DssTable` | N/A | Componente não existe na Fase 3 |
| `DssPagination` | N/A | Componente não existe — composição com DssButton |

### 4.3 Estado de Falha e Loading

- **Loading:** Skeleton com animação shimmer na área de tabela. Botão Pesquisar assume estado loading. Filtros ficam desabilitados.
- **Empty:** Ícone `search_off` + mensagem + hint centralizados na área de tabela.
- **Disabled:** Todos os controles desabilitados via `provide/inject`. Opacidade `var(--dss-opacity-disabled)` no container.
- **Error:** Não gerenciado pelo componente — responsabilidade do pai.

---

## 5. Risco Arquitetural: Dark Mode na Tabela

### Risco identificado

Cabeçalho da tabela usando cor primária fixa (azul) quebraria no dark mode.

### Mitigação aplicada

- Fundo do cabeçalho: `var(--dss-surface-muted)` — adapta automaticamente no dark mode
- Texto do cabeçalho: `var(--dss-text-primary)` — adapta automaticamente
- Linhas alternadas: `var(--dss-surface-subtle)` — adapta automaticamente
- Hover das linhas: `var(--dss-surface-hover)` — adapta automaticamente
- Cores de status (ativo/inativo): classes Quasar `text-positive` / `text-negative` — gerenciadas pelo sistema de temas Quasar, não hardcoded no SCSS

---

## 6. Acessibilidade

### ARIA Roles

| Elemento | Role | Atributo |
|---|---|---|
| `<table>` | `role="table"` | `aria-label="Lista de Cadris"` |
| `<thead>` | — | — |
| `<tr>` | `role="row"` | — |
| `<th>` | `role="columnheader"` | `scope="col"` |
| `<td>` | `role="cell"` | — |
| Skeleton | `role="status"` | `aria-busy="true"` |
| Empty | `role="status"` | `aria-label="Nenhum resultado encontrado"` |
| Paginação | `role="navigation"` | `aria-label="Paginação de Cadris"` |
| Ícones decorativos | — | `aria-hidden="true"` |

### Gerenciamento de Foco

Fluxo lógico de foco:
1. Toolbar: título → slot-actions → botão fechar
2. Filtros: input Cadri → input Gerador → select Documento → select Aterro
3. Ações: botão Pesquisar → botão FECHAR
4. Tabela: células (via tab natural do browser)
5. Paginação: botão anterior → páginas → botão próximo

Foco não fica preso em elementos desabilitados (tabindex gerenciado pelos componentes filhos).

### Contraste WCAG AA

| Elemento | Foreground | Background | Status |
|---|---|---|---|
| Cabeçalho tabela | `--dss-text-primary` | `--dss-surface-muted` | ✅ via tokens |
| Células | `--dss-text-primary` | `--dss-surface-default` | ✅ via tokens |
| Status Ativo | `text-positive` (Quasar) | `--dss-surface-default` | ✅ via Quasar theme |
| Status Inativo | `text-negative` (Quasar) | `--dss-surface-default` | ✅ via Quasar theme |
| Botão Pesquisar | cor do botão warning | — | ✅ via DssButton |

---

## 7. Tokens Utilizados

Listagem 1:1 com o código SCSS. Nenhum token documentado aqui que não exista no SCSS.

| Token | Camada | Propriedade CSS |
|---|---|---|
| `--dss-surface-muted` | L2 | `background-color` (thead) |
| `--dss-surface-subtle` | L2 | `background-color` (linhas alternadas) |
| `--dss-surface-hover` | L2 | `background-color` (hover de linha) |
| `--dss-text-primary` | L2 | `color` (células, cabeçalhos) |
| `--dss-text-secondary` | L2 | `color` (empty state, label de página) |
| `--dss-gray-200` | L2 | `border-color` (divisórias, linhas) |
| `--dss-gray-300` | L2 | `border-color` (cabeçalho tabela) |
| `--dss-gray-600` | L4 (dark) | `border-color` (dark mode) |
| `--dss-gray-700` | L4 (dark) | `border-color` (dark mode linhas) |
| `--dss-font-size-sm` | L2 | `font-size` (tabela, paginação) |
| `--dss-font-size-md` | L2 | `font-size` (empty message) |
| `--dss-font-weight-medium` | L2 | `font-weight` (status, empty) |
| `--dss-font-weight-semibold` | L2 | `font-weight` (cabeçalhos, título) |
| `--dss-line-height-normal` | L2 | `line-height` (células) |
| `--dss-spacing-4` | L2 | `gap` (status) |
| `--dss-spacing-8` | L2 | `gap` (skeleton) |
| `--dss-spacing-12` | L2 | `padding` (células) |
| `--dss-spacing-16` | L2 | `padding` (células horizontal, skeleton) |
| `--dss-spacing-24` | L2 | `padding` (empty horizontal) |
| `--dss-spacing-48` | L2 | `padding` (empty vertical) |
| `--dss-border-radius-sm` | L2 | `border-radius` (skeleton cells) |
| `--dss-opacity-disabled` | L4 | `opacity` (estado disabled) |
| `--dss-duration-150` | L2 | `transition` (hover de linha) |
| `--dss-duration-1000` | L2 | `animation` (shimmer) |
| `--dss-easing-standard` | L2 | `transition` (hover) |

---

## 8. Exceções DSS

| ID | Valor | Local | Justificativa |
|---|---|---|---|
| EX-01 | `forced-color-adjust: none` em `.dss-cadris-card__status` | L4 `_states.scss` | Ícones de status coloridos precisam de adaptação manual no forced-colors; cores de status (positive/negative) são aplicadas via Quasar, não via SCSS local. |

---

## 9. Reconciliação Transversal

### SCSS ↔ Documentação
- Todos os 25 tokens no SCSS estão documentados na Seção 7. ✅
- Nenhum token documentado que não existe no código. ✅

### Código ↔ Documentação
- Todos os 5 padrões Fase 3 implementados e documentados (OBJ-01 a OBJ-05). ✅
- Todos os 3 emits, 6 props, 1 slot documentados com tipos exatos. ✅

### Golden ↔ Componente
- **DssBadge (Golden Reference):** Entry Point Wrapper canônico ✅, 4 camadas ✅, Touch target N/A (Composite, não Compact Control) ✅
- **DssDataCard (Golden Context):** inheritAttrs:false ✅, provide/inject ✅, slots dinâmicos ✅, paginação com janela deslizante ✅

---

## 10. Declaração Final

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> Esta declaração indica que o componente passou pela Reconciliação Transversal obrigatória e atende estruturalmente aos requisitos da Fase 3. A auditoria formal, com emissão de Selo DSS v2.2, é prerrogativa exclusiva do processo de auditoria técnica.
