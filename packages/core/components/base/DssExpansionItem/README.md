# DssExpansionItem

Item expansível com header interativo e painel colapsável. Wrapper governado sobre o `QExpansionItem` do Quasar.

## Instalação

```js
import { DssExpansionItem } from '@dss/components'
```

## Uso Básico

```vue
<DssExpansionItem label="Pergunta frequente" aria-label="Expandir: Pergunta frequente">
  <p>Resposta detalhada que aparece ao expandir o item.</p>
</DssExpansionItem>
```

## Com ícone e caption

```vue
<DssExpansionItem
  icon="settings"
  label="Configurações"
  caption="Gerencie preferências"
  aria-label="Expandir: Configurações"
>
  <!-- conteúdo -->
</DssExpansionItem>
```

## Accordion (exclusividade de expansão)

```vue
<DssExpansionItem group="faq" label="Item 1">...</DssExpansionItem>
<DssExpansionItem group="faq" label="Item 2">...</DssExpansionItem>
<DssExpansionItem group="faq" label="Item 3">...</DssExpansionItem>
```

## Controlled (v-model)

```vue
<DssExpansionItem v-model="isOpen" label="Item controlado">
  <!-- conteúdo -->
</DssExpansionItem>
```

## Com Brand

```vue
<div data-brand="hub">
  <DssExpansionItem label="Módulo Hub" brand="hub" icon="hub">
    <!-- conteúdo -->
  </DssExpansionItem>
</div>
```

## Links

- [Documentação completa](./DssExpansionItem.md)
- [API Reference](./DSSEXPANSIONITEM_API.md)
- [Exemplos interativos](./DssExpansionItem.example.vue)
