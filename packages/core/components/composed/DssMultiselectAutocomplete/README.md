# DssMultiselectAutocomplete

Seleção múltipla com autocomplete — composto Fase 3, sobre o `DssSelect`.

Filtra digitando, marca com checkbox e mostra o que foi escolhido em chips. O campo **nunca cresce em altura**: os chips ficam numa linha só e o excedente vira um contador, medido conforme a largura real.

## Instalação

```js
import { DssMultiselectAutocomplete } from '@dss/components'
```

## Uso básico

```vue
<DssMultiselectAutocomplete
  v-model="frutas"
  :options="['Maçã', 'Banana', 'Cereja', 'Damasco']"
  label="Frutas"
  placeholder="Digite para filtrar…"
/>
```

## Opções como objetos

```vue
<DssMultiselectAutocomplete
  v-model="cidadeIds"
  :options="cidades"
  option-value="id"
  option-label="nome"
  emit-value
  map-options
  clearable
  label="Cidades"
/>
```

## Coluna estreita

Com `show-selected-summary`, a seleção passa a ser vista e gerida numa seção fixa no topo do painel — o campo se mantém em uma linha mesmo em ~260px.

```vue
<div style="width: 260px">
  <DssMultiselectAutocomplete
    v-model="categorias"
    :options="opcoes"
    label="Categorias"
    show-selected-summary
  />
</div>
```

## Busca no servidor

`loadOptions` substitui o filtro local; `loadMore` pagina ao rolar.

```vue
<DssMultiselectAutocomplete
  v-model="clientes"
  :load-options="(q) => api.get('/clientes', { params: { q } })"
  :load-more="(q, loaded) => api.get('/clientes', { params: { q, offset: loaded } })"
  option-value="id"
  option-label="nome"
  emit-value
  label="Clientes"
/>
```

## Quando NÃO usar

- Seleção única → `DssSelect`
- Lista curta e fixa, toda visível → `DssCheckbox` em grupo
- Criar opções a partir do texto digitado — o componente não faz isso

## Links

- [Documentação completa](./DssMultiselectAutocomplete.md)
- [API Reference](./DSSMULTISELECTAUTOCOMPLETE_API.md)
- [Exemplos](./DssMultiselectAutocomplete.example.vue)
