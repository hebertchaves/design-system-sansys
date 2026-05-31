# DssCadrisCard — API Reference

> Fase 3 — Componente Composto | Golden Context: DssDataCard | Golden Reference: DssBadge

## Props

### `rows`
- **Tipo:** `CadrisRow[]`
- **Padrão:** `[]`
- **Descrição:** Linhas de dados exibidas na tabela. Array vazio aciona o estado vazio.

### `loading`
- **Tipo:** `boolean`
- **Padrão:** `false`
- **Descrição:** Ativa estado de carregamento. Exibe skeleton na tabela e loading no botão Pesquisar. Desabilita interação com filtros.

### `pagination`
- **Tipo:** `CadrisPagination | undefined`
- **Padrão:** `undefined`
- **Descrição:** Objeto de paginação. Compatível com `v-model:pagination`. Quando `undefined`, a paginação não é renderizada.

```ts
interface CadrisPagination {
  page: number        // Página atual (1-based)
  rowsPerPage: number // Registros por página
  rowsNumber: number  // Total de registros
}
```

### `disable`
- **Tipo:** `boolean`
- **Padrão:** `false`
- **Descrição:** Desabilita toda a interação do componente. Propagado via `provide/inject` (`CADRIS_CARD_DISABLED_KEY`) para os componentes internos sem prop drilling.

### `documentoOptions`
- **Tipo:** `SelectOption[]`
- **Padrão:** `[]`
- **Descrição:** Opções para o select "Documento".

```ts
interface SelectOption {
  label: string
  value: string
}
```

### `aterroOptions`
- **Tipo:** `SelectOption[]`
- **Padrão:** `[]`
- **Descrição:** Opções para o select "Aterro".

---

## Emits

### `search`
- **Payload:** `CadrisFilters`
- **Quando:** Ao clicar em "Pesquisar".
- **Responsabilidade do pai:** Executar a busca e atualizar `rows` e `pagination`.

```ts
interface CadrisFilters {
  cadri: string
  gerador: string
  documento: string | null
  aterro: string | null
}
```

### `close`
- **Payload:** —
- **Quando:** Ao clicar em "FECHAR" (toolbar ou ações).
- **Efeito interno:** Reseta os filtros antes de emitir.
- **Responsabilidade do pai:** Ocultar ou destruir o componente.

### `update:pagination`
- **Payload:** `CadrisPagination`
- **Quando:** Ao navegar entre páginas.
- **Uso com v-model:** `v-model:pagination="paginationObj"`.

---

## Slots

### `toolbar-actions`
- **Tipo:** `() => unknown`
- **Posição:** Toolbar, após o título "Cadris" e antes do botão fechar.
- **Uso:** Inserir ações adicionais (ex: botão exportar, filtro rápido).

```vue
<DssCadrisCard ...>
  <template #toolbar-actions>
    <DssButton variant="flat" icon="download" aria-label="Exportar" />
  </template>
</DssCadrisCard>
```

---

## Composables exportados

### `useCadrisCardClasses(props)`
Retorna `{ rootClasses }` — computed com classes BEM reativas.

### `useCadrisFilters()`
Retorna `{ filters, resetFilters }` — estado reativo dos filtros.

### `useCadrisPagination(pagination, emit)`
Retorna `{ totalPages, hasPrev, hasNext, pageLabel, visiblePages, goToPage, goToPrev, goToNext }`.

### `provideCadrisCardDisabled(disabled: Ref<boolean>)`
Fornece estado de disabled para toda a árvore interna.

### `injectCadrisCardDisabled()`
Injeta estado de disabled de um ancestral `DssCadrisCard`.

### `CADRIS_CARD_DISABLED_KEY`
Chave de injeção tipada: `InjectionKey<Ref<boolean>>`.

---

## Comportamentos implícitos

### inheritAttrs: false
`class`, `style` e outros atributos do consumidor são repassados ao `DssCard` raiz via `v-bind="$attrs"`. Nenhum atributo cai no elemento raiz do template automaticamente.

### Filtros persistentes por sessão
Os filtros (`useCadrisFilters`) são reativos e persistem durante a vida do componente. Ao clicar em FECHAR, `resetFilters()` é chamado antes de emitir `@close`.

### Janela deslizante de paginação
`visiblePages` exibe até 5 páginas centralizadas na página atual. Com ≤ 5 páginas totais, exibe todas.

### Estado N/A
- `indeterminate`: não aplicável (não há seleção de itens).
- `error`: não aplicável (erros de API são responsabilidade do pai).
- `focus`: gerenciado pelos componentes filhos (DssInput, DssSelect, DssButton).

---

## Tokens utilizados

| Token | Usado em |
|---|---|
| `--dss-surface-muted` | Fundo do cabeçalho da tabela |
| `--dss-surface-subtle` | Fundo de linhas alternadas |
| `--dss-surface-hover` | Fundo de linha em hover |
| `--dss-text-primary` | Texto de células e cabeçalhos |
| `--dss-text-secondary` | Texto secundário (empty, label de página) |
| `--dss-gray-200` | Bordas divisórias entre seções |
| `--dss-gray-300` | Borda inferior do cabeçalho da tabela |
| `--dss-gray-600` | Borda do cabeçalho em dark mode |
| `--dss-gray-700` | Bordas de linhas em dark mode |
| `--dss-font-size-sm` | Fonte da tabela e paginação |
| `--dss-font-size-md` | Fonte da mensagem empty state |
| `--dss-font-weight-medium` | Peso do status e mensagem empty |
| `--dss-font-weight-semibold` | Peso dos cabeçalhos da tabela e título |
| `--dss-line-height-normal` | Altura de linha das células |
| `--dss-spacing-4` | Gap do status (ícone + texto) |
| `--dss-spacing-8` | Gap do skeleton |
| `--dss-spacing-12` | Padding vertical das células |
| `--dss-spacing-16` | Padding horizontal das células e skeleton |
| `--dss-spacing-24` | Padding horizontal do empty state |
| `--dss-spacing-48` | Padding vertical do empty state |
| `--dss-border-radius-sm` | Células do skeleton |
| `--dss-opacity-disabled` | Estado disabled (0.4) |
| `--dss-duration-150` | Transição de hover nas linhas |
| `--dss-duration-1000` | Animação de shimmer do skeleton |
| `--dss-easing-standard` | Curva de easing das transições |
