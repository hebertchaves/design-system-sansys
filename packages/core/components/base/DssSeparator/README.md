# DssSeparator

Separador standalone do Design System Sansys. Divide visualmente seções, layouts ou blocos de conteúdo independentes.

## Quick Start

```vue
<DssSeparator />
```

```vue
<!-- Com variações -->
<DssSeparator color="primary" size="md" spaced />
<DssSeparator vertical />
<DssSeparator inset="item" />
```

## Props

| Prop        | Tipo                                       | Default     | Descrição |
|-------------|--------------------------------------------|-------------|-----------|
| `vertical`  | `boolean`                                  | `false`     | Orientação vertical |
| `inset`     | `boolean \| 'item' \| 'item-thumbnail'`   | `false`     | Indentação nas extremidades |
| `spaced`    | `boolean`                                  | `false`     | Margem de respiro ao redor (16px) |
| `color`     | `'subtle' \| 'default' \| 'strong' \| 'primary' \| 'secondary'` | `'default'` | Cor semântica |
| `size`      | `'hairline' \| 'thin' \| 'md' \| 'thick'` | `'thin'`    | Espessura da linha |
| `ariaHidden`| `boolean`                                  | `undefined` | Remove do accessibility tree |

## Quando usar

- ✅ Separar blocos de conteúdo em layouts de página
- ✅ Dividir seções em painéis e sidebars
- ✅ Separar itens em toolbars (vertical)
- ✅ Criar respiro visual entre grupos de formulário

## Quando NÃO usar

- ❌ **Dentro de `<DssCard>`** — DssCard gerencia seus próprios dividers automaticamente via CSS
- ❌ Substituir padding/margin para criar espaçamento — use as props de spacing dos containers
- ❌ Elementos interativos — o separador é puramente decorativo/estrutural

## Acessibilidade

- Renderiza `<hr>` (horizontal) com `role="separator"` implícito
- Renderiza `<div role="separator" aria-orientation="vertical">` para vertical
- Aceita `aria-hidden="true"` quando puramente decorativo
- Atributos HTML são forwarded automaticamente via `inheritAttrs: true`

## Dark Mode

Dark mode gerenciado automaticamente via `[data-theme="dark"]`.
A cor de divisor em dark mode usa `rgba(255,255,255,0.12)` (EXC-01 — padrão Material Design).

## Tokens utilizados

- `--dss-border-width-hairline` / `thin` / `md` / `thick`
- `--dss-gray-100` / `--dss-gray-200` / `--dss-gray-300`
- `--dss-primary` / `--dss-secondary`
- `--dss-spacing-4` / `--dss-spacing-14` / `--dss-spacing-16`
- `--dss-duration-150` / `--dss-easing-standard`
