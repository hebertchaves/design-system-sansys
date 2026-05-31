# DssSeparator — API Reference

## Props

| Prop         | Tipo                                                                         | Default     | Validator                                              |
|--------------|------------------------------------------------------------------------------|-------------|--------------------------------------------------------|
| `vertical`   | `boolean`                                                                    | `false`     | —                                                      |
| `inset`      | `boolean \| 'item' \| 'item-thumbnail'`                                     | `false`     | `false`, `true`, `'item'`, `'item-thumbnail'`          |
| `spaced`     | `boolean`                                                                    | `false`     | —                                                      |
| `color`      | `'subtle' \| 'default' \| 'strong' \| 'primary' \| 'secondary'`            | `'default'` | Valores listados                                       |
| `size`       | `'hairline' \| 'thin' \| 'md' \| 'thick'`                                  | `'thin'`    | Valores listados                                       |
| `ariaHidden` | `boolean`                                                                    | `undefined` | —                                                      |

### `color` — Mapeamento de Tokens

| Valor       | Token CSS                | Valor Resolvido |
|-------------|--------------------------|-----------------|
| `subtle`    | `var(--dss-gray-100)`    | ~#f5f5f5        |
| `default`   | `var(--dss-gray-200)`    | ~#eeeeee        |
| `strong`    | `var(--dss-gray-300)`    | ~#e0e0e0        |
| `primary`   | `var(--dss-primary)`     | Varia por brand |
| `secondary` | `var(--dss-secondary)`   | Varia por brand |

> ⚠️ Os tokens `--dss-border-divider-*` foram removidos (Sprint Jan 2025).
> O componente usa os tokens gray diretamente.

### `size` — Mapeamento de Tokens

| Valor      | Token CSS                         | Valor   |
|------------|-----------------------------------|---------|
| `hairline` | `var(--dss-border-width-hairline)`| 0.5px   |
| `thin`     | `var(--dss-border-width-thin)`    | 1px     |
| `md`       | `var(--dss-border-width-md)`      | 2px     |
| `thick`    | `var(--dss-border-width-thick)`   | 3px     |

### `inset` — Mapeamento de Tokens

| Valor            | Token CSS                  | Valor | Contexto                     |
|------------------|----------------------------|-------|------------------------------|
| `true`           | `var(--dss-spacing-4)`     | 16px  | Indentação genérica          |
| `'item'`         | `var(--dss-spacing-14)`    | 56px  | Alinha com texto após ícone  |
| `'item-thumbnail'`| `var(--dss-spacing-16)`  | 64px  | Alinha após avatar/thumbnail |

## Slots

Nenhum. O `DssSeparator` é um elemento void (self-closing). Não aceita conteúdo.

## Events

Nenhum. O componente é não interativo.

## Atributos HTML (via inheritAttrs)

Todos os atributos HTML são forwarded para o elemento raiz (`<hr>` ou `<div>`):

```vue
<DssSeparator
  id="my-separator"
  class="custom-class"
  aria-hidden="true"
  data-testid="separator-1"
/>
```

## CSS Classes geradas

| Condição                         | Classe CSS                              |
|----------------------------------|-----------------------------------------|
| Sempre                           | `dss-separator`                         |
| `vertical=true`                  | `dss-separator--vertical`               |
| `spaced=true`                    | `dss-separator--spaced`                 |
| `color="subtle"`                 | `dss-separator--color-subtle`           |
| `color="strong"`                 | `dss-separator--color-strong`           |
| `color="primary"`                | `dss-separator--color-primary`          |
| `color="secondary"`              | `dss-separator--color-secondary`        |
| `size="hairline"`                | `dss-separator--size-hairline`          |
| `size="md"`                      | `dss-separator--size-md`                |
| `size="thick"`                   | `dss-separator--size-thick`             |
| `inset=true`                     | `dss-separator--inset`                  |
| `inset="item"`                   | `dss-separator--inset-item`             |
| `inset="item-thumbnail"`         | `dss-separator--inset-item-thumbnail`   |

> Nota: `color="default"` e `size="thin"` não geram classes modificadoras (defaults definidos na Layer 2).

## Elemento renderizado

| Condição         | Elemento HTML                                             |
|------------------|-----------------------------------------------------------|
| `vertical=false` | `<hr class="dss-separator ...">`                         |
| `vertical=true`  | `<div role="separator" aria-orientation="vertical" ...>` |

## Tokens utilizados (lista completa)

```
--dss-border-width-hairline  (0.5px)
--dss-border-width-thin      (1px)
--dss-border-width-md        (2px)
--dss-border-width-thick     (3px)
--dss-gray-100
--dss-gray-200               (default color)
--dss-gray-300
--dss-gray-400               (print)
--dss-primary
--dss-secondary
--dss-spacing-4              (16px — spaced + inset)
--dss-spacing-14             (56px — inset item)
--dss-spacing-16             (64px — inset item-thumbnail)
--dss-duration-150
--dss-easing-standard
--dss-hub-600                (brand Hub)
--dss-water-500              (brand Water)
--dss-waste-600              (brand Waste)
```
