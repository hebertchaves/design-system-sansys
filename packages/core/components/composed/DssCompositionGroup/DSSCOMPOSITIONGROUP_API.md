# DssCompositionGroup — API Reference

Tipos em `types/composition-group.types.ts` — **a fonte**; esta página é derivada.

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `modelValue` | `string \| null` | `null` | Nome da aba ativa (v-model opcional). Ausente, abre a primeira |
| `ariaLabel` | `string` | `'Coleções do cadastro'` | Nome da lista de abas |
| `dense` | `boolean` | `true` | Abas compactas (repassado ao `DssTabs`) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca: `data-brand` na raiz e repassada ao `DssTabs` |

## Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `string` | Troca de aba |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `default` | — | Somente `DssComposition`, cada uma com `name` |

## Métodos expostos

Nenhum. O grupo não valida: cada `DssComposition` é um campo do `DssForm` mestre.

## Contexto fornecido (provide/inject tipado)

`DSS_COMPOSITION_GROUP_KEY` → `DssCompositionGroupContext`: `register(item)`, `active`,
`tabId(name)`, `panelId(name)`. Cada `DssComposition` filha se registra com
`{ name, label, count, required, invalid }`.

## Tipos

`DssCompositionGroupProps`, `DssCompositionGroupItem`, `DssCompositionGroupContext`.

## Classes CSS

| Classe | Onde |
|---|---|
| `.dss-composition-group` | raiz |
| `.dss-composition-group__panels` | contêiner das coleções |
