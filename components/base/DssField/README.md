# DssField

Wrapper estrutural de campo de formulário do Design System Sansys (DSS).

Fornece o chrome visual de campo — label flutuante, borda variante, hint, erro — para qualquer controle interno via slot.

## Instalação

```js
import { DssField } from '@dss/components'
```

## Uso Básico

```vue
<!-- Input nativo com chrome DSS -->
<DssField label="Nome" hint="Seu nome completo" :has-value="!!nome" brand="hub">
  <template #default="{ fieldId }">
    <input :id="fieldId" v-model="nome" type="text" />
  </template>
</DssField>
```

## Variantes

```vue
<!-- Outlined (padrão) -->
<DssField variant="outlined" label="Campo" />

<!-- Filled -->
<DssField variant="filled" label="Campo" />

<!-- Borderless (sem borda) -->
<DssField variant="borderless" label="Campo" />

<!-- Standout -->
<DssField variant="standout" label="Campo" />
```

## Com Erro

```vue
<DssField label="Email" :error="temErro" error-message="Email inválido">
  <template #default="{ fieldId }">
    <input :id="fieldId" v-model="email" type="email" />
  </template>
</DssField>
```

## Label Empilhada (stackLabel)

```vue
<!-- Para controles com conteúdo sempre visível (select, datepicker) -->
<DssField label="Categoria" stack-label has-value>
  <template #default="{ fieldId }">
    <select :id="fieldId" v-model="categoria">...</select>
  </template>
</DssField>
```

## Anti-patterns

```vue
<!-- ❌ NÃO use DssField + DssInput (DssInput já tem chrome próprio) -->
<DssField label="Nome">
  <DssInput v-model="nome" label="Nome" />  <!-- chrome duplicado -->
</DssField>

<!-- ✅ Use DssInput standalone -->
<DssInput v-model="nome" label="Nome" hint="Seu nome" />
```

## Links

- [Documentação completa](./DssField.md)
- [API Reference](./DSSFIELD_API.md)
- [Exemplos](./DssField.example.vue)
