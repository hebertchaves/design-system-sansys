# DSSVIRTUALSCROLL_API.md — DssVirtualScroll API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | **required** | Array de dados a serem virtualizados. Deve ser reativo. |
| `itemSize` | `Number` | `48` | Tamanho estimado de cada item em pixels (height para vertical, width para horizontal). |
| `type` | `'list' \| 'table'` | `'list'` | Tipo semântico — define `role` ARIA no container. |
| `scrollTarget` | `String \| Element \| null` | `undefined` | Seletor CSS ou referência DOM para um container de scroll pai externo. |
| `sliceSize` | `Number` | `undefined` | Número de itens renderizados simultaneamente no DOM. Omitir para usar default do Quasar. |
| `horizontal` | `Boolean` | `false` | Habilita rolagem horizontal em vez de vertical. |
| `loading` | `Boolean` | `false` | Exibe estado de carregamento (substitui a lista). |
| `disable` | `Boolean` | `false` | Desabilita o componente (pointer-events: none + opacidade reduzida). |

## Slots

| Slot | Escopo | Description |
|------|--------|-------------|
| `default` | `{ item: T, index: number, ariaSetsize: number, ariaPosinset: number }` | Template de cada item virtualizado. Obrigatório. Consumidor deve aplicar `role="listitem"` (ou `role="row"` para tabela) e os atributos `aria-setsize` / `aria-posinset` expostos. |
| `prepend` | — | Conteúdo fixo antes da lista (ex: cabeçalho, filtros). Renderizado em todos os estados (normal, loading, empty). |
| `append` | — | Conteúdo fixo após a lista (ex: rodapé, botão de carregar mais). Renderizado em todos os estados. |
| `loading` | — | Substitui o spinner CSS padrão no estado de carregamento. Use para injetar `DssSpinner` quando disponível. |
| `empty` | — | Substitui o texto padrão "Nenhum item para exibir" no estado vazio. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `scroll` | `{ index: number, from: number, to: number, direction: 'increase' \| 'decrease' }` | Emitido a cada evento de scroll virtual do Quasar. |
| `native-scroll` | `Event` | Evento de scroll nativo do DOM — exposto para casos avançados. |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-spacing-2` | 8px | Largura/altura da scrollbar |
| `--dss-spacing-6` | 24px | Padding do estado loading |
| `--dss-spacing-8` | 32px | Padding do estado empty e tamanho do spinner |
| `--dss-spacing-px` | 1px | Borda do spinner de loading |
| `--dss-radius-full` | 9999px | Border-radius da scrollbar thumb e spinner |
| `--dss-surface-muted` | #f5f5f5 (light) | Cor da scrollbar e track do spinner |
| `--dss-text-subtle` | var(--dss-dark-light) | Texto do estado vazio |
| `--dss-opacity-disabled` | 0.4 | Opacidade no estado desabilitado |
| `--dss-duration-500` | 500ms | Duração da animação do spinner |
| `--dss-action-hub` | — | Cor do spinner e scrollbar no brand Hub (4-output/_brands.scss) |
| `--dss-action-water` | — | Cor do spinner e scrollbar no brand Water (4-output/_brands.scss) |
| `--dss-action-waste` | — | Cor do spinner e scrollbar no brand Waste (4-output/_brands.scss) |

> **Nota spinner:** A cor de destaque do spinner usa `currentColor` no base (herda cor do texto do container). Cada brand sobrescreve com `--dss-action-{brand}` via `4-output/_brands.scss`.

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-virtual-scroll` | Root element |
| `.dss-virtual-scroll__inner` | Wrapper direto do QVirtualScroll |
| `.dss-virtual-scroll__loading` | Container do estado de carregamento |
| `.dss-virtual-scroll__loading-indicator` | Spinner CSS padrão |
| `.dss-virtual-scroll__empty` | Container do estado vazio |
| `.dss-virtual-scroll__empty-text` | Texto padrão do estado vazio |
| `.dss-virtual-scroll--horizontal` | Modificador: rolagem horizontal |
| `.dss-virtual-scroll--loading` | Modificador: estado loading ativo |
| `.dss-virtual-scroll--disabled` | Modificador: estado desabilitado |
| `.dss-virtual-scroll--table` | Modificador: tipo tabela |

## Uso de ARIA pelo Consumidor

O `DssVirtualScroll` expõe `ariaSetsize` e `ariaPosinset` via escopo de slot para que o consumidor os aplique corretamente:

```vue
<DssVirtualScroll :items="myItems">
  <template #default="{ item, index, ariaSetsize, ariaPosinset }">
    <div
      role="listitem"
      :aria-setsize="ariaSetsize"
      :aria-posinset="ariaPosinset"
    >
      {{ item.label }}
    </div>
  </template>
</DssVirtualScroll>
```

Isso garante conformidade WCAG 2.1 AA para listas virtualizadas, onde o DOM contém apenas um subconjunto dos itens totais.
