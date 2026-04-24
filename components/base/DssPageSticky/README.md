# DssPageSticky

Wrapper DSS governado sobre `QPageSticky`. Permite fixar elementos (FAB, banners, CTAs) em posições específicas da viewport, com z-index e elevação controlados por tokens DSS.

## Instalação

```js
import { DssPageSticky } from '@dss/components'
```

## Uso Básico

```vue
<DssLayout>
  <DssPageContainer>
    <DssPage>
      <!-- Conteúdo da página -->

      <!-- FAB no canto inferior direito -->
      <DssPageSticky position="bottom-right" :offset="[18, 18]">
        <DssButton round icon="add" color="primary" />
      </DssPageSticky>
    </DssPage>
  </DssPageContainer>
</DssLayout>
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `position` | `PageStickyPosition` | `'bottom-right'` | Posição na viewport |
| `offset` | `[number, number]` | `[18, 18]` | Deslocamento `[x, y]` em pixels |
| `expand` | `Boolean` | `false` | Expande para toda a largura/altura da borda |
| `elevated` | `Boolean` | `false` | Aplica sombra (`--dss-elevation-2`) |

## Casos de Uso

**FAB (Floating Action Button):**
```vue
<DssPageSticky position="bottom-right" :offset="[18, 18]">
  <DssButton round icon="add" color="primary" />
</DssPageSticky>
```

**Banner persistente:**
```vue
<DssPageSticky position="bottom" :expand="true" :offset="[0, 0]">
  <div>Aceite os termos de uso. <DssButton flat label="Aceitar" /></div>
</DssPageSticky>
```

**Com elevação:**
```vue
<DssPageSticky position="bottom-right" :elevated="true">
  <DssButton round icon="chat" color="secondary" />
</DssPageSticky>
```

## Z-Index DSS

O componente aplica `--dss-z-index-sticky` (1020) por padrão:
- Acima de dropdowns (1000) e conteúdo de página (1)
- Abaixo de modais (1050) e tooltips (1070)

## Links

- [Documentação completa](./DssPageSticky.md)
- [API Reference](./DSSPAGESTICKY_API.md)
- [Exemplos](./DssPageSticky.example.vue)
