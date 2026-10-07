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

## Validação dentro de um `DssForm`

Declarar `rules` faz este campo entrar no `validate()` e no `submit()` do `DssForm` ancestral.
O motor é o do QSelect que este componente encapsula — as regras já funcionavam por `$attrs`,
mas **fora da API declarada**: quem lia a documentação não tinha como saber que existiam.
Desde set/2026 o canal é explícito, tipado e repassado no template.

```vue
<DssForm ref="form" @submit.prevent="enviar">
  <DssSelect v-model="perfil" label="Perfil" :options="perfis"
             :rules="[v => !!v || 'Selecione um perfil']" />
  <DssButton type="submit" label="Enviar" color="primary" />
</DssForm>
```

Cada regra recebe o valor e devolve `true` (aprovado), `false` (reprovado sem mensagem) ou uma
`string` (reprovado, e a string é a mensagem) — ou uma `Promise` dessas. O tipo é mais estreito
que o dos campos de construção explícita (`DssInput`, `DssCheckbox`…): aqui a regra vai direto
ao Quasar, cujo `ValidationRule` não admite retorno vazio.

`lazyRules` decide quando a regra roda sozinha: `false` (padrão) a cada mudança do valor,
`true` só ao perder o foco, `'ondemand'` apenas via `validate()`.

## Links

- [API Reference](./DSSSELECT_API.md)
- [Documentação Normativa](./DssSelect.md)
- [Exemplos](./DssSelect.example.vue)
