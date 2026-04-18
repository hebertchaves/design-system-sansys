# DssFooter

Container estrutural inferior de página. Wrapper DSS governado sobre `QFooter` do Quasar. Par simétrico do `DssHeader`.

## Quando Usar

- Como âncora da base do layout de aplicação (um por página)
- Sempre dentro de um contexto `QLayout` (ou futuro `DssLayout`)
- Quando precisar de footer fixo com governança visual DSS
- Para copyright, links legais, navegação secundária e ações globais

## Quando NÃO Usar

- Como container genérico de conteúdo interno
- Para múltiplos footers por página (viola `role="contentinfo"`)
- Fora de um contexto de `QLayout`

## Instalação

```js
import DssFooter from '@dss/components/base/DssFooter'
```

## Uso Básico

```vue
<q-layout view="hHh lpR fFf">
  <q-page-container>
    <!-- conteúdo -->
  </q-page-container>
  <DssFooter>
    <DssToolbar>
      <span class="text-caption">© 2026 Sansys.</span>
      <DssSpace />
      <DssButton flat dense label="Privacidade" no-caps />
    </DssToolbar>
  </DssFooter>
</q-layout>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Aplica sombra de elevação projetada para cima (EXC-05) |
| `bordered` | `Boolean` | `false` | Aplica borda superior sutil |

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `color` | Fundo governado por `--dss-surface-default` |
| `height-hint` | Calculado automaticamente pelo Quasar |

## Props Repassadas via $attrs

| Prop Quasar | Descrição |
|-------------|-----------|
| `reveal` | Oculta/exibe o footer ao rolar a página |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do footer — exclusivamente `DssToolbar` |

## Variantes

### Sem decoração (padrão)
```vue
<DssFooter>...</DssFooter>
```

### Com elevação (sombra projetada para cima)
```vue
<DssFooter elevated>...</DssFooter>
```

### Com borda superior
```vue
<DssFooter bordered>...</DssFooter>
```

## Brand

Brand é responsabilidade do `DssToolbar` interno, não do `DssFooter`:

```vue
<DssFooter>
  <DssToolbar brand="hub">  <!-- brand aqui, não em DssFooter -->
    ...
  </DssToolbar>
</DssFooter>
```

## Múltiplos Toolbars

```vue
<DssFooter elevated>
  <DssToolbar>
    <!-- Navegação secundária: links, ações -->
  </DssToolbar>
  <DssToolbar dense>
    <!-- Copyright, informações legais -->
  </DssToolbar>
</DssFooter>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Cor de fundo padrão |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-border-width-thin` | Espessura da borda na variante `bordered` |
| `--dss-gray-200` | Cor da borda na variante `bordered` |

> **Nota EXC-05:** A variante `elevated` usa sombra hardcoded `0 -4px 6px rgba(0,0,0,0.30)` (equivalente invertido de `--dss-shadow-md`) pois o sistema DSS v2.2 não possui token `--dss-elevation-up-*`. Será substituída quando o token for adicionado ao catálogo.

## Acessibilidade

- `role="contentinfo"` aplicado nativamente pelo QFooter
- Deve haver apenas **um** DssFooter por página (landmark único)
- Use `aria-label` via `$attrs` quando necessário: `<DssFooter aria-label="Rodapé principal">`

## Diferenças em Relação ao DssHeader

| Aspecto | DssHeader | DssFooter |
|---------|-----------|-----------|
| Primitivo Quasar | `QHeader` | `QFooter` |
| Role ARIA | `banner` | `contentinfo` |
| Borda (bordered) | `border-bottom` | `border-top` |
| Sombra (elevated) | `--dss-elevation-2` (↓) | Inverted shadow (↑) EXC-05 |
| Posição | Topo da página | Base da página |

## Links

- [Documentação normativa](./DssFooter.md)
- [API Reference](./DSSFOOTER_API.md)
- [Exemplos](./DssFooter.example.vue)
- [Metadados](./dss.meta.json)
