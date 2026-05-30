# DssHeader

Container estrutural superior de página. Wrapper DSS governado sobre `QHeader` do Quasar.

## Quando Usar

- Como âncora do topo do layout de aplicação (um por página)
- Sempre dentro de um contexto `QLayout` (ou futuro `DssLayout`)
- Quando precisar de header fixo com governança visual DSS

## Quando NÃO Usar

- Como container genérico de conteúdo interno
- Para múltiplos headers por página (viola `role="banner"`)
- Fora de um contexto de `QLayout`

## Instalação

```js
import DssHeader from '@dss/components/base/DssHeader'
```

## Uso Básico

```vue
<q-layout view="hHh lpR fFf">
  <DssHeader>
    <DssToolbar>
      <DssButton flat round icon="menu" aria-label="Menu" />
      <span class="text-subtitle1">Minha Aplicação</span>
      <DssSpace />
      <DssButton flat round icon="account_circle" aria-label="Perfil" />
    </DssToolbar>
  </DssHeader>
  <q-page-container>
    <!-- conteúdo -->
  </q-page-container>
</q-layout>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Aplica sombra de elevação (`--dss-elevation-2`) |
| `bordered` | `Boolean` | `false` | Aplica borda inferior sutil |

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `color` | Fundo governado por `--dss-surface-default` |
| `height-hint` | Calculado automaticamente pelo Quasar |

## Props Repassadas via $attrs

| Prop Quasar | Descrição |
|-------------|-----------|
| `reveal` | Oculta/exibe o header ao rolar a página |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do header — exclusivamente `DssToolbar` |

## Variantes

### Sem decoração (padrão)
```vue
<DssHeader>...</DssHeader>
```

### Com elevação
```vue
<DssHeader elevated>...</DssHeader>
```

### Com borda inferior
```vue
<DssHeader bordered>...</DssHeader>
```

## Brand

Brand é responsabilidade do `DssToolbar` interno, não do `DssHeader`:

```vue
<DssHeader>
  <DssToolbar brand="hub">  <!-- brand aqui, não em DssHeader -->
    ...
  </DssToolbar>
</DssHeader>
```

## Múltiplos Toolbars

```vue
<DssHeader elevated>
  <DssToolbar>
    <!-- Ações globais: logo, perfil, notificações -->
  </DssToolbar>
  <DssToolbar dense>
    <!-- Navegação de seção: tabs, breadcrumb -->
  </DssToolbar>
</DssHeader>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Cor de fundo padrão |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-elevation-2` | Sombra da variante `elevated` |
| `--dss-border-width-thin` | Espessura da borda na variante `bordered` |
| `--dss-gray-200` | Cor da borda na variante `bordered` |

## Acessibilidade

- `role="banner"` aplicado nativamente pelo QHeader
- Deve haver apenas **um** DssHeader por página (landmark único)
- Use `aria-label` via `$attrs` quando necessário: `<DssHeader aria-label="Cabeçalho principal">`

## Links

- [Documentação normativa](./DssHeader.md)
- [API Reference](./DSSHEADER_API.md)
- [Exemplos](./DssHeader.example.vue)
- [Metadados](./dss.meta.json)
