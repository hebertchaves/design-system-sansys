# DssTextarea

Campo de texto multilinhas do Design System Sansys. Wrapper do `QInput` com `type="textarea"` fixado internamente.

## Instalação

```javascript
import { DssTextarea } from '@dss/components/DssTextarea'
```

## Uso Básico

```vue
<!-- Textarea simples -->
<DssTextarea
  v-model="description"
  label="Descrição"
  hint="Descreva em poucas palavras"
/>

<!-- Autogrow com limite de altura -->
<DssTextarea
  v-model="notes"
  label="Notas"
  autogrow
  max-height="300px"
/>

<!-- Com erro -->
<DssTextarea
  v-model="message"
  label="Mensagem"
  :error="hasError"
  error-message="Mínimo de 20 caracteres"
/>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `string` | `''` | Valor (v-model) |
| `variant` | `'outlined' \| 'filled' \| 'standout' \| 'borderless'` | `'outlined'` | Variante visual |
| `dense` | `boolean` | `false` | Versão compacta |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys |
| `label` | `string` | `''` | Label flutuante |
| `stackLabel` | `boolean` | `false` | Label sempre no topo |
| `placeholder` | `string` | `''` | Placeholder |
| `hint` | `string` | `''` | Texto de ajuda |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `rules` | `TextareaRule[]` | `undefined` | Regras de validação — entram no `validate()` do `DssForm` |
| `lazyRules` | `boolean \| 'ondemand'` | `false` | Quando as regras rodam sozinhas |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilitado |
| `readonly` | `boolean` | `false` | Somente leitura |
| `loading` | `boolean` | `false` | Loading |
| `required` | `boolean` | `false` | Obrigatório (aria-required) |
| `clearable` | `boolean` | `false` | Botão de limpar |
| `autogrow` | `boolean` | `false` | Cresce com o conteúdo |
| `rows` | `number \| string` | `1` | Linhas iniciais (default single-line; aumentar é indicação explícita) |
| `maxHeight` | `string` | — | Altura máxima (ex.: `'300px'`) |
| `ariaLabel` | `string` | — | Label de acessibilidade |
| `clearAriaLabel` | `string` | `'Clear textarea'` | aria-label do botão de limpar |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado |

## Quando NÃO usar

- Para inputs de linha única → use `DssInput`
- Quando `type` precisar variar → use `DssInput` (que aceita `type` como prop)
- Fora de formulários → prefira `<p>` para textos estáticos

## Links

- [Documentação completa](./DssTextarea.md)
- [API Reference](./DSSTEXTAREA_API.md)
- [Exemplos interativos](./DssTextarea.example.vue)

## Validação dentro de um `DssForm`

Declarar `rules` faz este campo entrar no `validate()` e no `submit()` do `DssForm` ancestral.
O motor é o do QField que este componente encapsula — as regras já funcionavam por `$attrs`,
mas **fora da API declarada**: quem lia a documentação não tinha como saber que existiam.
Desde set/2026 o canal é explícito, tipado e repassado no template.

```vue
<DssForm ref="form" @submit.prevent="enviar">
  <DssTextarea v-model="obs" label="Observações" :rules="[v => !!v || 'Obrigatório']" />
  <DssButton type="submit" label="Enviar" color="primary" />
</DssForm>
```

Cada regra recebe o valor e devolve `true` (aprovado), `false` (reprovado sem mensagem) ou uma
`string` (reprovado, e a string é a mensagem) — ou uma `Promise` dessas. O tipo é mais estreito
que o dos campos de construção explícita (`DssInput`, `DssCheckbox`…): aqui a regra vai direto
ao Quasar, cujo `ValidationRule` não admite retorno vazio.

**`lazyRules`** decide quando a regra roda sozinha: `false` (padrão) a cada mudança do valor,
`true` só ao perder o foco, `'ondemand'` apenas via `validate()`.
