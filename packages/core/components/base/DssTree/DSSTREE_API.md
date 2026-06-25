# DssTree — API Reference

> Motor: `QTree` (Quasar) | CSS Class: `.dss-tree`

---

## Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `nodes` | `DssTreeNode[]` | — | ✅ | Array de nós da árvore |
| `nodeKey` | `string` | `'id'` | — | Campo usado como chave única de cada nó |
| `labelKey` | `string` | `'label'` | — | Campo exibido como label do nó |
| `childrenKey` | `string` | `'children'` | — | Campo que contém filhos do nó |
| `selected` | `string \| null` | — | — | Chave do nó selecionado (v-model:selected) |
| `expanded` | `string[]` | — | — | Chaves dos nós expandidos (v-model:expanded) |
| `ticked` | `string[]` | — | — | Chaves dos nós marcados (v-model:ticked) |
| `accordion` | `boolean` | `false` | — | Apenas um nó expandido por vez |
| `noConnectors` | `boolean` | `false` | — | Remove linhas de conexão entre nós |
| `defaultExpandAll` | `boolean` | `false` | — | Expande todos os nós na montagem |
| `filter` | `string` | — | — | Texto de filtro (filtra nós pelo label) |
| `filterMethod` | `Function` | — | — | Função de filtro customizada `(node, filter, update) => boolean` |
| `tickStrategy` | `DssTreeTickStrategy` | `'none'` | — | Estratégia de tick: `'none'` \| `'strict'` \| `'leaf'` \| `'leaf-filtered'` |
| `noNodesLabel` | `string` | `'Nenhum nó disponível'` | — | Mensagem quando `nodes` está vazio |
| `noResultsLabel` | `string` | `'Nenhum resultado para o filtro aplicado'` | — | Mensagem quando filtro não retorna resultados |
| `iconSize` | `string` | — | — | Tamanho dos ícones dos nós |
| `dense` | `boolean` | `false` | — | Modo de alta densidade |

---

## Props Bloqueadas

| Prop QTree | Justificativa |
|------------|---------------|
| `dark` | DSS gerencia dark mode via `[data-theme='dark']` global. Usar atributo de tema no elemento pai. |
| `color` | Cor governada via `--q-color-primary` override com tokens DSS (EXC-Gate-02). |
| `control-color` | Cor do controle interno governada via `--q-color-primary` override. |
| `text-color` | Cor do texto governada via tokens DSS em cascata. |
| `selected-color` | Cor de seleção governada via tokens DSS no estado `.q-tree__node-header--selected`. |

---

## Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:selected` | `string \| null` | Emitido ao selecionar/desselecionar um nó |
| `update:expanded` | `string[]` | Emitido ao expandir/colapsar nós |
| `update:ticked` | `string[]` | Emitido ao marcar/desmarcar nós (requer `tick-strategy`) |
| `lazy-load` | `DssTreeLazyLoadDetails` | Emitido ao expandir nó com `lazy: true` |
| `after-show` | — | Emitido após nó ser expandido (sem payload — QTree não fornece o nó) |
| `after-hide` | — | Emitido após nó ser colapsado (sem payload — QTree não fornece o nó) |

---

## Slots

Todos os slots do QTree são encaminhados dinamicamente. Os slots abaixo são os principais documentados.

| Slot | Parâmetros | Descrição |
|------|-----------|-----------|
| `default-header` | `{ node: DssTreeNode, key: string, tree: object }` | Substitui o header de todos os nós |
| `default-body` | `{ node: DssTreeNode, key: string, tree: object }` | Conteúdo abaixo do header de todos os nós |
| `#[header-{nodeKey}]` | `{ node: DssTreeNode, key: string, tree: object }` | Header para nó específico identificado por `nodeKey` |
| `#[body-{nodeKey}]` | `{ node: DssTreeNode, key: string, tree: object }` | Body para nó específico identificado por `nodeKey` |

---

## defineExpose — API Imperativa

Referenciável via `ref`:

```vue
<DssTree ref="treeRef" :nodes="nodes" node-key="id" />
```

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `getNodeByKey` | `(key: string) => DssTreeNode \| undefined` | Retorna um nó pela chave |
| `getTickedNodes` | `() => DssTreeNode[]` | Retorna todos os nós marcados |
| `getExpandedNodes` | `() => DssTreeNode[]` | Retorna todos os nós expandidos |
| `isExpanded` | `(key: string) => boolean` | Verifica se um nó está expandido |
| `isTicked` | `(key: string) => boolean` | Verifica se um nó está marcado |
| `expandAll` | `() => void` | Expande todos os nós |
| `collapseAll` | `() => void` | Colapsa todos os nós |
| `setExpanded` | `(key: string, state: boolean) => void` | Define expansão programática de um nó |
| `setTicked` | `(key: string, state: boolean) => void` | Define marcação programática de um nó |

---

## Tipos TypeScript

```typescript
// Estratégia de tick
export type DssTreeTickStrategy = 'none' | 'strict' | 'leaf' | 'leaf-filtered'

// Estrutura de um nó
export interface DssTreeNode {
  [key: string]: unknown
  label?: string
  children?: DssTreeNode[]
  disabled?: boolean
  lazy?: boolean
  icon?: string
  expandedIcon?: string
  collapsedIcon?: string
  noTick?: boolean
  body?: string
  header?: string
}

// Payload do evento lazy-load
export interface DssTreeLazyLoadDetails {
  node: DssTreeNode
  key: string
  done: (children?: DssTreeNode[]) => void
  fail: () => void
}
```

---

## Tokens DSS

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Seleção, ícone ativo, spinner, `--q-color-primary` |
| `--dss-font-family-sans` | Fonte base |
| `--dss-font-size-md` | Texto dos nós |
| `--dss-font-size-sm` | Mensagens de estado vazio |
| `--dss-font-weight-semibold` | Label selecionado |
| `--dss-text-body` | Cor padrão do texto |
| `--dss-gray-50` | Background de hover (light) |
| `--dss-gray-100` | Background de seleção (light) |
| `--dss-gray-200` | Cor dos connectors (light); texto dark |
| `--dss-gray-700` | Ícone expand (light); texto de estado vazio; seleção dark |
| `--dss-gray-800` | Background de hover (dark) |
| `--dss-radius-sm` | Border-radius dos nós |
| `--dss-spacing-1` | Padding vertical dense |
| `--dss-spacing-1_5` | Padding vertical padrão |
| `--dss-spacing-2` | Gap e padding horizontal |
| `--dss-spacing-3` | Padding das mensagens de estado vazio |
| `--dss-spacing-4` | Indentação filhos; padding horizontal mensagens |
| `--dss-border-width-thin` | Borda em high contrast |
| `--dss-border-width-md` | Outline de focus |
| `--dss-duration-250` | Transição hover/expand |
| `--dss-touch-target-md` | Min-height dos headers dos nós |
| `--dss-opacity-disabled` | Opacidade de nós desabilitados |
| `--dss-hub-50` | Background seleção Brand Hub |
| `--dss-hub-200` | Texto seleção dark Brand Hub |
| `--dss-hub-600` | `--q-color-primary` Brand Hub |
| `--dss-hub-700` | Label selecionado Brand Hub |
| `--dss-hub-900` | Background seleção dark Brand Hub |
| `--dss-water-50` | Background seleção Brand Water |
| `--dss-water-200` | Texto seleção dark Brand Water |
| `--dss-water-500` | `--q-color-primary` Brand Water |
| `--dss-water-700` | Label selecionado Brand Water |
| `--dss-water-900` | Background seleção dark Brand Water |
| `--dss-waste-50` | Background seleção Brand Waste |
| `--dss-waste-200` | Texto seleção dark Brand Waste |
| `--dss-waste-600` | `--q-color-primary` Brand Waste |
| `--dss-waste-700` | Label selecionado Brand Waste |
| `--dss-waste-900` | Background seleção dark Brand Waste |

---

## Exceções aos Gates v2.4

| ID | Resumo |
|----|--------|
| EXC-Gate-01 | Seletores descendentes `.dss-tree .q-tree__*` — DOM interno do QTree não acessível de outra forma |
| EXC-Gate-02 | `--q-color-primary: var(--dss-action-primary)` — governa checkboxes e spinner internos |
| EXC-01 | Dark mode connectors: `rgba(255,255,255,0.15)` — sem token DSS equivalente |
| EXC-02 | `forced-colors`: system color keywords obrigatórias (`Canvas`, `ButtonText`, etc.) |
| EXC-03 | Print: `display: block` no container |
| EXC-04 | Print: `outline: 1px solid currentColor` em seleção e connectors |
| EXC-Expose-01 | `defineExpose` com 9 métodos de API imperativa do QTree |
