# DSSMULTISELECTAUTOCOMPLETE_API.md — DssMultiselectAutocomplete API Reference

## Props

### Model e opções

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `any[]` | `[]` | Valores selecionados. **Sempre array** — o componente é sempre múltiplo. Use com `v-model`. |
| `options` | `any[]` | `[]` | Lista de opções. Aceita primitivos (`string`, `number`) ou objetos. |
| `optionValue` | `string \| ((option: any) => any)` | `'value'` | Campo ou função que extrai o **valor** de cada opção. Usado por `emitValue`/`mapOptions`. |
| `optionLabel` | `string \| ((option: any) => string)` | `'label'` | Campo ou função que extrai o **rótulo** exibido. |
| `emitValue` | `boolean` | `false` | Emite apenas `optionValue` em vez do objeto inteiro. |
| `mapOptions` | `boolean` | `false` | Mapeia os valores emitidos de volta para objetos. Requer `emitValue`. |

> **Divergência deliberada do QSelect:** no Quasar, `emitValue` sem `mapOptions` faz o
> campo exibir o **valor cru** (`2` em vez de `"Curitiba"`). Aqui o rótulo é resolvido de
> volta pela lista de `options` — no campo **e** na seção "Selecionados", que assim nunca
> discordam sobre o mesmo valor. `mapOptions` continua útil para o que o Quasar faz com o
> model, mas não é mais necessário só para exibir o rótulo.

### Autocomplete

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `inputDebounce` | `number \| string` | `300` | Debounce (ms) do filtro. Aplica-se tanto ao filtro local quanto a `loadOptions`. |
| `loadOptions` | `(query: string) => any[] \| Promise<any[]>` | `undefined` | Busca **assíncrona** (server-side). Quando fornecida **substitui** o filtro local por substring. Em erro, o ciclo do QSelect é abortado. |
| `loadMore` | `(query: string, loaded: number) => any[] \| Promise<any[]>` | `undefined` | Carregamento **incremental**. Chamado ao rolar perto do fim da lista virtualizada. Recebe a query atual e quantos itens já carregados (offset); o retorno é **anexado**. Retornar `[]` sinaliza fim. |

### Conteúdo e estados

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | `''` | Rótulo do campo. |
| `placeholder` | `string` | `''` | Placeholder do input de busca. |
| `loading` | `boolean` | `false` | Indicador de carregamento. Soma-se ao estado interno de `loadOptions`. |
| `disable` | `boolean` | `false` | Desabilita o campo. Chips deixam de ser removíveis. |
| `readonly` | `boolean` | `false` | Somente leitura. Chips deixam de ser removíveis. |
| `clearable` | `boolean` | `false` | Exibe botão de limpar toda a seleção. |

### Chips e seção de selecionados

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `chipsRemovable` | `boolean` | `true` | Torna os chips removíveis (botão × + evento `remove`). |
| `showSelectedSummary` | `boolean` | `false` | Exibe a seção "Selecionados" **fixa** no topo do painel, com todos os valores como tokens `outline` removíveis. Opt-in. |

### Brand e acessibilidade

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override. Propagado ao `DssSelect`, que reinjeta no menu teleportado via `popup-content-class`. |
| `ariaLabel` | `string` | `undefined` | Label ARIA do campo (`role="combobox"`). |

### Props repassadas

Props não declaradas acima chegam ao `DssSelect`/`QSelect` via `$attrs` — entre elas `hint`, `error`, `error-message`, `rules`, `dense`, `class`, `style`.

### Props que este componente deliberadamente NÃO expõe

- **Alternar seleção múltipla** — é sempre múltipla; é a identidade do componente.
- **Desligar o input de busca** — é sempre autocomplete; idem.
- **Limitar quantos chips o campo mostra** — a quantidade é **medida** em runtime
  (`ResizeObserver`), não configurada. Um número fixo ignora a largura real e erra nas
  duas pontas: desperdiça espaço num campo largo e expulsa o input de busca num estreito.
- **Forçar modo escuro** — dark mode é governado globalmente via `[data-theme="dark"]`.

---

## Slots

| Slot | Escopo | Conteúdo padrão |
|------|--------|-----------------|
| `option` | `{ opt, selected, toggleOption, index }` | `DssItem` com `DssCheckbox` decorativo no slot `leading` + rótulo |
| `selected-item` | `{ opt, index, removeAtIndex }` | `DssChip` `flat` removível; e o contador `+N` na última posição |

O slot fornecido pelo consumidor **tem precedência** sobre o padrão DSS.

Demais slots do `QSelect`/`DssSelect` (`label`, `prepend`, `append`, `before`, `after`, `no-option`, `hint`, `error`…) são repassados por forwarding dinâmico.

> **Atenção ao sobrescrever `selected-item`:** o colapso de uma linha depende dos chips internos que o padrão renderiza. Com o slot substituído, a medição deixa de valer e garantir que o campo não cresça passa a ser responsabilidade do consumidor.

---

## Events

| Evento | Payload | Quando é emitido |
|--------|---------|------------------|
| `update:modelValue` | `any[]` | A seleção muda: marcar/desmarcar opção, remover chip (campo ou seção), limpar. Use com `v-model`. |
| `remove` | `any` | Um valor é removido por chip — tanto no campo quanto na seção "Selecionados". Emitido **junto** com `update:modelValue`. |
| `focus` | `FocusEvent` | Campo recebe foco. |
| `blur` | `FocusEvent` | Campo perde foco. |
| `clear` | — | Seleção inteira limpa via `clearable`. |
| `popup-show` | — | Dropdown abriu. |
| `popup-hide` | — | Dropdown fechou. |

---

## Métodos expostos (`ref`)

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `focus` | `() => void` | Foca o campo. |
| `blur` | `() => void` | Remove o foco do campo. |
| `showPopup` | `() => void` | Abre o dropdown. |
| `hidePopup` | `() => void` | Fecha o dropdown. |
| `selectRef` | `Ref<any>` | Referência ao `DssSelect` interno. |

```vue
<script setup>
const campo = ref(null)
// Tab não entra nas opções — abrir por método é o caminho para testes de teclado
campo.value.showPopup()
</script>

<DssMultiselectAutocomplete ref="campo" v-model="v" :options="o" />
```

---

## CSS Classes

| Classe | Onde | Descrição |
|--------|------|-----------|
| `.dss-multiselect-autocomplete` | raiz (QSelect) | Escopo do componente. Também aplica o campo de uma linha. |
| `.dss-multiselect-autocomplete__option` | opção | `DssItem` de cada opção do dropdown |
| `.dss-multiselect-autocomplete__chip` | campo e seção | Token de valor selecionado |
| `.dss-multiselect-autocomplete__chip--overflowed` | campo | Chip que não coube na linha (fora do fluxo) |
| `.dss-multiselect-autocomplete__chip--counter` | campo | Contador `+N` / total |
| `.dss-multiselect-autocomplete__selected` | painel | Seção "Selecionados" (sticky no topo) |
| `.dss-multiselect-autocomplete__selected-label` | painel | Rótulo "Selecionados (N)" |
| `.dss-multiselect-autocomplete__selected-tokens` | painel | Lista de tokens, com scroll próprio |
| `.dss-multiselect-autocomplete__loading-more` | painel | Rodapé "Carregando mais…" |

---

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary-surface` | Fundo do hover da opção (primary 8%) |
| `--dss-surface-selected` | Fundo da opção selecionada (primary 12%) |
| `--dss-surface-default` | Fundo da seção "Selecionados" |
| `--dss-text-body` | Rótulo da opção |
| `--dss-text-secondary` | Rótulo da seção e do rodapé de carregamento |
| `--dss-focus-primary` | Anel de foco por teclado na opção |
| `--dss-border-width-md` | Espessura do anel de foco |
| `--dss-border-width-thin` | Borda inferior da seção |
| `--dss-gray-200` | Cor da borda da seção |
| `--dss-font-size-xs` | Rótulo da seção e rodapé |
| `--dss-font-weight-medium` | Peso do rótulo da seção |
| `--dss-spacing-1` | Gap entre tokens |
| `--dss-spacing-2` · `--dss-spacing-3` | Paddings da seção e do rodapé |
| `--dss-touch-target-md` | Cálculo da folga vertical dos tokens |
| `--dss-compact-control-height-sm` | Cálculo da folga vertical dos tokens |

---

## Acessibilidade

| Aspecto | Implementação |
|---------|---------------|
| Role | `combobox` + `aria-multiselectable` no campo; `option` + `aria-selected` em cada item |
| Checkbox da opção | `aria-hidden` — decorativo. A fonte de verdade é `aria-selected` |
| Teclado | Setas navegam (via `aria-activedescendant`), Enter/Espaço alternam, Escape fecha, Backspace remove o último token com a busca vazia |
| Foco | Tab **não entra** nas opções: o foco permanece no campo |
| Contador | Rótulo visual abreviado (`+3` / `5`); `aria-label` sempre por extenso |
| Touch target | Folga vertical nos tokens derivada de `(--dss-touch-target-md − --dss-compact-control-height-sm) / 2` |

---

## Ver também

- [Documentação completa](./DssMultiselectAutocomplete.md)
- [Exemplos](./DssMultiselectAutocomplete.example.vue)
- [DssSelect](../../base/DssSelect/DSSSELECT_API.md) — Golden Context
- [DssChip](../../base/DssChip/DSSCHIP_API.md) — Golden Reference
