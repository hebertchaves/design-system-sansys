# DssSelect

Componente oficial do Design System Sansys para **campos de seleção** (dropdowns). Wrapper governado do `QSelect` do Quasar.

## Quick Start

```vue
<DssSelect
  v-model="valor"
  :options="opcoes"
  label="Selecione"
/>
```

## Instalação

```js
import { DssSelect } from '@dss/components/base/DssSelect'
```

## Quando usar

- Quando o usuário deve escolher **uma ou mais opções** de uma lista pré-definida
- Listas com mais de 5 itens (para listas menores, considere `DssRadio`)
- Formulários de cadastro, filtros, configurações

## Quando NÃO usar

- Para input de texto livre → use `DssInput`
- Para texto multilinhas → use `DssTextarea`
- Para escolha binária simples → use `DssCheckbox` ou `DssToggle`
- Para listas de até 5 itens visíveis → use `DssRadio`

## Variantes

```vue
<!-- Outlined (padrão) -->
<DssSelect v-model="val" :options="opts" label="Campo" />

<!-- Filled -->
<DssSelect v-model="val" :options="opts" label="Campo" variant="filled" />

<!-- Standout -->
<DssSelect v-model="val" :options="opts" label="Campo" variant="standout" />

<!-- Borderless -->
<DssSelect v-model="val" :options="opts" label="Campo" variant="borderless" />
```

## Seleção múltipla

```vue
<DssSelect
  v-model="selecionados"
  :options="opcoes"
  label="Múltiplos"
  multiple
  use-chips
/>
```

## Com objetos e emitValue

```vue
<DssSelect
  v-model="idSelecionado"
  :options="[{ label: 'Item A', value: 1 }, { label: 'Item B', value: 2 }]"
  option-label="label"
  option-value="value"
  emit-value
  map-options
  label="Selecione"
/>
```

## Brandabilidade

```vue
<DssSelect v-model="val" :options="opts" brand="hub" label="Hub" />
<DssSelect v-model="val" :options="opts" brand="water" label="Water" />
<DssSelect v-model="val" :options="opts" brand="waste" label="Waste" />
```

## Links

- [API Reference](./DSSSELECT_API.md)
- [Documentação Normativa](./DssSelect.md)
- [Exemplos](./DssSelect.example.vue)
