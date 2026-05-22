# DssTree — Documentação Normativa

> **Template 13.1 — Componente DSS v2.2**  
> **Família:** Navegação e Estrutura de Dados | **Fase:** 2 | **Nível:** 4  
> **Status:** Em andamento  
> **Golden Reference:** DssChip | **Golden Context:** DssExpansionItem

---

## 1. Identidade do Componente

**Nome:** DssTree  
**CSS Class:** `.dss-tree`  
**Quasar base:** `QTree`

### O que é

DssTree é uma árvore hierárquica interativa do Design System Sansys. Envolve o `QTree` do Quasar com governança de tokens DSS, acessibilidade WCAG, brandabilidade e API imperativa exposta via `defineExpose`.

### Quando usar

- Exibição de dados hierárquicos (menus de navegação, categorias aninhadas, estrutura de arquivos, permissões)
- Navegação em estrutura de pastas ou categorias aninhadas
- Seleção de um item em uma hierarquia (`v-model:selected`)
- Seleção múltipla via checkbox (`tick-strategy` + `v-model:ticked`)
- Carregamento assíncrono de filhos (lazy loading via `@lazy-load`)
- Visualização de árvores de dependências ou hierarquias organizacionais

### Quando NÃO usar

- Listas simples sem hierarquia → usar `DssList` + `DssItem`
- Navegação por abas → usar `DssTabs`
- Itens expansíveis sem hierarquia → usar `DssExpansionItem`
- Hierarquia com apenas 1 nível → usar `DssSelect` ou `DssOptionGroup`

---

## 2. Arquitetura

### Decisão: WRAP (não rebuild)

O DssTree envolve o `QTree` ao invés de reconstruir do zero.

**Justificativa:**
- `QTree` fornece expansão/colapso com animação nativa
- Acessibilidade WAI-ARIA gerenciada pelo Quasar (`role="tree"`, `aria-expanded`, `aria-level`)
- Navegação por teclado (`↑↓←→`, `Enter`, `Space`) nativa e robusta
- Lazy loading via callbacks assíncronos sem reimplementação
- Modo tick (checkbox) com estratégias `leaf`, `strict`, `leaf-filtered` sem reimplementação

**Estrutura DOM resultante:**
```html
<ul role="tree" class="q-tree dss-tree [modificadores]">
  <li role="treeitem" class="q-tree__node">
    <div role="button" class="q-tree__node-header">  <!-- EXC-Gate-01 -->
      <button class="q-tree__arrow">...</button>
      <div class="q-tree__label">Categoria A</div>
    </div>
    <ul role="group" class="q-tree__children">       <!-- EXC-Gate-01 -->
      ...
    </ul>
  </li>
</ul>
```

**Nota:** O `QTree` aplica a classe `.dss-tree` diretamente no `<ul role="tree">` via prop `:class`. Não existe wrapper div extra — a raiz do componente é o próprio `QTree`.

### Touch Target — Opção A

O DssTree adota **Opção A** (tamanho visual ≥ 44px) para nodes interativos:

| Abordagem | Quando usar | DssTree |
|-----------|-------------|---------|
| Opção A | Tamanho visual ≥ 44px | ✅ (`min-height: var(--dss-touch-target-md)`) |
| Opção B | Tamanho visual < 44px → `::before` | ❌ |

O cabeçalho do nó (`.q-tree__node-header`) tem `min-height: var(--dss-touch-target-md)` (48px). No modo `dense`, o mínimo é reduzido — documentado como trade-off de densidade (ver Seção 7).

---

## 3. Props

### Expostas (governadas pelo DSS)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `nodes` | `DssTreeNode[]` | *(obrigatória)* | Array de nós da árvore |
| `nodeKey` | `string` | `'id'` | Campo usado como chave única de cada nó |
| `labelKey` | `string` | `'label'` | Campo exibido como label do nó |
| `childrenKey` | `string` | `'children'` | Campo que contém filhos do nó |
| `selected` | `string\|null` | — | Chave do nó selecionado (`v-model:selected`) |
| `expanded` | `string[]` | — | Chaves dos nós expandidos (`v-model:expanded`) |
| `ticked` | `string[]` | — | Chaves dos nós marcados (`v-model:ticked`) |
| `accordion` | `boolean` | `false` | Modo accordion (apenas um nó expandido por vez) |
| `noConnectors` | `boolean` | `false` | Remove linhas de conexão entre nós |
| `defaultExpandAll` | `boolean` | `false` | Expande todos os nós na montagem |
| `filter` | `string` | — | Texto de filtro (filtra nós pelo label) |
| `filterMethod` | `Function` | — | Função de filtro customizada |
| `tickStrategy` | `DssTreeTickStrategy` | `'none'` | Estratégia de tick: `'none'`, `'strict'`, `'leaf'`, `'leaf-filtered'` |
| `noNodesLabel` | `string` | `'Nenhum nó disponível'` | Mensagem quando `nodes` está vazio |
| `noResultsLabel` | `string` | `'Nenhum resultado para o filtro aplicado'` | Mensagem quando filtro retorna vazio |
| `iconSize` | `string` | — | Tamanho dos ícones (padrão QTree) |
| `dense` | `boolean` | `false` | Modo de alta densidade |

### Bloqueadas (QTree API)

| Prop QTree | Justificativa |
|------------|---------------|
| `dark` | Tema escuro governado via `[data-theme='dark']` global |
| `color` | Cor governada via `--q-color-primary` override com tokens DSS |
| `control-color` | Cor do controle interno governada via `--q-color-primary` |
| `text-color` | Cor do texto governada via tokens DSS em cascata |
| `selected-color` | Cor de seleção governada via tokens DSS no estado `.q-tree__node-header--selected` |

---

## 4. Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:selected` | `string \| null` | Emitido ao selecionar/desselecionar um nó |
| `update:expanded` | `string[]` | Emitido ao expandir/colapsar nós |
| `update:ticked` | `string[]` | Emitido ao marcar/desmarcar nós (requer `tickStrategy`) |
| `lazy-load` | `DssTreeLazyLoadDetails` | Emitido ao expandir nó com `lazy: true` |
| `after-show` | `DssTreeNode` | Emitido após nó ser expandido |
| `after-hide` | `DssTreeNode` | Emitido após nó ser colapsado |

---

## 5. Slots

O DssTree encaminha **todos os slots do QTree** dinamicamente. Os slots são mapeados em tempo de execução via `v-for="(_, name) in $slots"`.

### Slots documentados do QTree

| Slot | Parâmetros | Descrição |
|------|-----------|-----------|
| `default-header` | `{ node, key, tree }` | Substitui o header de todos os nós |
| `default-body` | `{ node, key, tree }` | Conteúdo abaixo do header de todos os nós |
| `#[header-{key}]` | `{ node, key, tree }` | Header específico para nó com chave `{key}` |
| `#[body-{key}]` | `{ node, key, tree }` | Body específico para nó com chave `{key}` |

**Nota:** Os slots por nó (`#[header-{key}]`, `#[body-{key}]`) são slots dinâmicos nomeados pela chave do nó. Todos são encaminhados automaticamente pelo mecanismo de forwarding dinâmico.

---

## 6. API Imperativa (defineExpose)

Métodos expostos via `defineExpose` (EXC-Expose-01):

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `getNodeByKey` | `(key: string) => DssTreeNode` | Retorna nó pela chave |
| `getTickedNodes` | `() => DssTreeNode[]` | Retorna todos os nós marcados |
| `getExpandedNodes` | `() => DssTreeNode[]` | Retorna todos os nós expandidos |
| `isExpanded` | `(key: string) => boolean` | Verifica se nó está expandido |
| `isTicked` | `(key: string) => boolean` | Verifica se nó está marcado |
| `expandAll` | `() => void` | Expande todos os nós |
| `collapseAll` | `() => void` | Colapsa todos os nós |
| `setExpanded` | `(key: string, state: boolean) => void` | Define expansão de um nó |
| `setTicked` | `(key: string, state: boolean) => void` | Define marcação de um nó |

---

## 7. Variantes e Estados

### Variante: `dense`

Reduz o padding interno dos nós para layout compacto. A prop `dense` é encaminhada ao `QTree` (que aplica `.q-tree--dense` internamente) e adiciona `.dss-tree--dense` ao container para sobrescritas DSS.

**Diferenças:**
- `padding`: `var(--dss-spacing-1)` vertical (vs. `var(--dss-spacing-1_5)` padrão)
- `min-height`: reduzido (trade-off de densidade documentado)

### Estados Interativos (por nó)

| Estado | Aplicação |
|--------|-----------|
| `hover` | `.q-tree__node-header:hover` — `background-color: var(--dss-gray-50)` |
| `focus` | `.q-tree__node-header:focus-visible` — outline com `--dss-action-primary` |
| `active/selected` | `.q-tree__node-header--selected` — background + cor do label + peso |
| `disabled` | `.q-tree__node--disabled > .q-tree__node-header` — `opacity: var(--dss-opacity-disabled)` + `cursor: not-allowed` |

### Estados não aplicáveis ao container raiz

| Estado | Justificativa |
|--------|---------------|
| `hover (container)` | Hover aplicado individualmente em cada nó — não no container |
| `focus (container)` | Focus aplicado individualmente em cada nó navegável |
| `active (container)` | Interatividade pertence a cada nó individualmente |
| `loading` | Gerenciado pelo QTree internamente via lazy-load (spinner por nó) |

---

## 8. Acessibilidade

- **`role="tree"`** — aplicado automaticamente pelo QTree na raiz (`<ul role="tree">`)
- **`role="treeitem"`** — aplicado em cada nó (`<li role="treeitem">`)
- **`aria-expanded`** — gerenciado pelo QTree em cada nó expansível
- **`aria-level`** — indicando nível de profundidade na hierarquia
- **`aria-disabled`** — em nós com `disabled: true`
- **Navegação por teclado** — `↑↓` navega entre nós, `←→` expande/colapsa, `Enter`/`Space` seleciona
- **Touch target ≥ 48px** — `min-height: var(--dss-touch-target-md)` nos headers de nó
- **Focus visível** — `outline` com `var(--dss-border-width-md)` e `var(--dss-action-primary)` em `:focus-visible`

---

## 9. Tokens DSS Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Cor de seleção, ícone de expand ativo, spinner, `--q-color-primary` |
| `--dss-font-family-sans` | Fonte base da árvore |
| `--dss-font-size-md` | Tamanho de texto padrão dos nós |
| `--dss-font-size-sm` | Mensagens de estado vazio |
| `--dss-font-weight-semibold` | Label do nó selecionado |
| `--dss-text-body` | Cor padrão do texto |
| `--dss-gray-50` | Background de hover (light) |
| `--dss-gray-100` | Background de seleção (light) |
| `--dss-gray-200` | Cor das linhas de conexão (light) |
| `--dss-gray-700` | Cor do ícone de expand (light), texto de estado vazio |
| `--dss-gray-800` | Background de hover (dark) |
| `--dss-gray-700` | Background de seleção (dark) |
| `--dss-gray-200` | Texto em dark mode |
| `--dss-radius-sm` | Border-radius dos nós |
| `--dss-spacing-1` | Padding vertical dense |
| `--dss-spacing-1_5` | Padding vertical padrão |
| `--dss-spacing-2` | Gap horizontal, padding horizontal |
| `--dss-spacing-3` | Padding das mensagens de estado vazio |
| `--dss-spacing-4` | Indentação de filhos, padding horizontal de mensagens |
| `--dss-border-width-thin` | Borda em high contrast |
| `--dss-border-width-md` | Outline de focus |
| `--dss-duration-250` | Transição de hover e expand |
| `--dss-touch-target-md` | Min-height dos nós interativos |
| `--dss-opacity-disabled` | Opacidade de nós desabilitados (0.4) |
| `--dss-hub-50` | Background de seleção (Brand Hub) |
| `--dss-hub-200` | (reservado para expansão) |
| `--dss-hub-600` | `--q-color-primary` Brand Hub |
| `--dss-hub-700` | Label selecionado Brand Hub |
| `--dss-hub-900` | Background seleção dark Brand Hub |
| `--dss-water-50` | Background de seleção (Brand Water) |
| `--dss-water-200` | Texto selecionado dark Brand Water |
| `--dss-water-500` | `--q-color-primary` Brand Water |
| `--dss-water-700` | Label selecionado Brand Water |
| `--dss-water-900` | Background seleção dark Brand Water |
| `--dss-waste-50` | Background de seleção (Brand Waste) |
| `--dss-waste-200` | Texto selecionado dark Brand Waste |
| `--dss-waste-600` | `--q-color-primary` Brand Waste |
| `--dss-waste-700` | Label selecionado Brand Waste |
| `--dss-waste-900` | Background seleção dark Brand Waste |

---

## 10. Brandabilidade

O DssTree reage ao atributo `[data-brand]` via seletores descendentes:

| Brand | Seletor | Tokens aplicados |
|-------|---------|-----------------|
| Hub | `[data-brand='hub'] .dss-tree` | `--dss-hub-50/600/700/900/200` |
| Water | `[data-brand='water'] .dss-tree` | `--dss-water-50/500/700/900/200` |
| Waste | `[data-brand='waste'] .dss-tree` | `--dss-waste-50/600/700/900/200` |

O `--q-color-primary` é sobrescrito por brand para governar checkboxes internas (tick mode) e ícones de spinner (EXC-Gate-02). Dark mode por brand também é suportado.

---

## 11. Exceções Documentadas

### EXC-Gate-01 — Seletores Descendentes

**Motivo:** QTree renderiza uma árvore hierárquica complexa internamente. Os elementos `.q-tree__node-header`, `.q-tree__node`, `.q-tree__arrow`, `.q-tree__label`, `.q-tree__children`, `.q-tree__spinner` e outros são criados pelo Quasar e não podem ser alcançados por seletores de escopo Vue (`scoped`) ou por propriedades CSS customizadas equivalentes.

**Uso:** `.dss-tree .q-tree__node-header`, `.dss-tree .q-tree__arrow`, etc.

**Precedente:** DssMarkupTable (EXC-Gate-01), DssTable (EXC-Gate-01)

---

### EXC-Gate-02 — `--q-color-primary` Override

**Motivo:** QTree usa `--q-color-primary` internamente para: checkboxes de tick mode (QCheckbox interno), ícones de spinner de lazy loading, e indicadores de seleção ativa em algumas interações. DSS injeta a cor de ação via `--q-color-primary` para manter governança sem substituir subcomponentes internos.

**Uso:** `--q-color-primary: var(--dss-action-primary)` no escopo `.dss-tree`

**Precedente:** DssPagination (EXC-Gate-02), DssAjaxBar (EXC-Gate-02), DssTable (EXC-Gate-02)

---

### EXC-01 — Dark Mode Connectors com `rgba()`

**Motivo:** Os conectores (linhas `.q-tree__node::before` e `::after`) em dark mode usam `rgba(255,255,255,0.15)`. Não existe token DSS equivalente para separadores com opacidade em dark mode.

**Uso:** `border-color: rgba(255, 255, 255, 0.15)` em `[data-theme='dark'] .dss-tree`

**Precedente:** DssMarkupTable (EXC-01), DssTable (EXC-01)

---

### EXC-02 — `forced-colors` com System Color Keywords

**Motivo:** Em `@media (forced-colors: active)`, as palavras-chave de cor do sistema (`Canvas`, `ButtonText`, `Highlight`, `HighlightText`) são obrigatórias. Tokens CSS DSS são ignorados pelo user agent neste contexto.

**Precedente:** DssMarkupTable (EXC-02), DssTable (EXC-02)

---

### EXC-03 — Print: `display: block`

**Motivo:** Em `@media print`, o `.dss-tree` precisa de `display: block` para garantir renderização correta em impressão. Token não aplicável em contexto de impressão.

**Precedente:** DssMarkupTable (EXC-03), DssTable (EXC-03)

---

### EXC-04 — Print: `outline: 1px solid currentColor`

**Motivo:** Em `@media print`, nós selecionados e conectores usam `currentColor` para garantir visibilidade em impressão. Token não aplicável em contexto de impressão.

**Precedente:** DssMarkupTable (EXC-04), DssTable (EXC-04)

---

### EXC-Expose-01 — `defineExpose` com API Imperativa

**Motivo:** QTree expõe uma API imperativa essencial para controle programático: expandir/colapsar em massa, consultar estado, lazy loading, seleção programática. O DssTree encaminha todos os 9 métodos para o `qTreeRef` interno.

**Métodos:** `getNodeByKey`, `getTickedNodes`, `getExpandedNodes`, `isExpanded`, `isTicked`, `expandAll`, `collapseAll`, `setExpanded`, `setTicked`

**Precedente:** DssScrollArea, DssInfiniteScroll, DssTable (EXC-Expose-01)

---

## 12. Exemplos de Uso

### Seleção simples

```vue
<DssTree
  v-model:selected="selectedId"
  v-model:expanded="expandedKeys"
  :nodes="nodes"
  node-key="id"
/>
```

### Modo checkbox (tick)

```vue
<DssTree
  v-model:ticked="tickedKeys"
  :nodes="nodes"
  node-key="id"
  tick-strategy="leaf"
/>
```

### Filtro externo

```vue
<DssInput v-model="filter" label="Buscar" />
<DssTree
  :nodes="nodes"
  node-key="id"
  :filter="filter"
  default-expand-all
/>
```

### Lazy loading

```vue
<DssTree
  :nodes="rootNodes"
  node-key="id"
  @lazy-load="onLazyLoad"
/>

<script setup>
function onLazyLoad({ node, key, done, fail }) {
  fetchChildren(key)
    .then(children => done(children))
    .catch(() => fail())
}
</script>
```

### API imperativa

```vue
<DssTree ref="treeRef" :nodes="nodes" node-key="id" />
<DssButton @click="treeRef?.expandAll()">Expandir tudo</DssButton>
<DssButton @click="treeRef?.collapseAll()">Colapsar tudo</DssButton>
```

### Slot customizado por nó

```vue
<DssTree :nodes="nodes" node-key="id">
  <template #default-header="{ node }">
    <DssIcon :name="node.icon" />
    <span>{{ node.label }}</span>
    <DssBadge v-if="node.count" :label="String(node.count)" />
  </template>
</DssTree>
```

---

## 13. Composição Recomendada

- Usar `v-model:selected` para seleção simples de nó; `v-model:ticked` com `tick-strategy` para modo checkbox
- Para lazy loading: implementar `@lazy-load` recebendo `{ node, key, done, fail }` — chamar `done(children)` após carregar
- Para filtro: bindar `filter` com um `DssInput` externo — QTree aplica automaticamente
- Para personalização visual de nós individuais: usar `#[header-NODE_KEY_VALUE]` ou `#default-header`
- Usar `default-expand-all` apenas para árvores pequenas — em grandes datasets, usar `setExpanded` programaticamente
- Para acessibilidade: garantir que `label-key` aponte para campo com texto descritivo; não usar apenas ícones como label

---

## 14. Não Implementado (Fase 2 — Escopo Mínimo)

| Funcionalidade | Observação |
|----------------|------------|
| Drag & drop de nós | Requer `QTree` com plugin externo — fora do escopo DSS Fase 2 |
| Slot `#header-checkbox` | Customização do checkbox interno — substituído pela prop `tick-strategy` |
| Ícone por nó via `node.icon` | Suportado nativamente pelo QTree via campo `icon` no objeto nó |

---

## 15. Links

- [API Reference](./DSSTREE_API.md)
- [Exemplos](./DssTree.example.vue)
- [Tipos TypeScript](./types/tree.types.ts)
- [Composables](./composables/useTreeClasses.ts)
- [Golden Context: DssExpansionItem](../DssExpansionItem/DssExpansionItem.md)
