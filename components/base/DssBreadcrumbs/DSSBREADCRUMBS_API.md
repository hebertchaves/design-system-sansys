# DSSBREADCRUMBS_API — API Reference

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `separator` | `string` | `'/'` | Não | Caractere separador exibido entre os itens. Aceita texto (`/`, `>`, `›`) ou nome de ícone Material Icons para uso com slot `#separator`. |
| `separatorColor` | `string` | `'subtle'` | Não | Cor do separador. Aceita: `subtle` → `--dss-text-subtle`, `body` → `--dss-text-body`, `disabled` → `--dss-text-disabled`. Outros valores tentam `var(--dss-text-{value})`. |
| `gutter` | `'sm' \| 'md' \| 'lg'` | `'md'` | Não | Espaçamento entre os itens e os separadores. `sm` = 8px, `md` = 12px (padrão), `lg` = 16px. |
| `align` | `'left' \| 'center' \| 'right' \| 'between' \| 'around'` | `'left'` | Não | Alinhamento horizontal da trilha. Mapeia para `justify-content` do container flexbox via Quasar. |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Não | Marca Sansys. Aplica cor primária da marca aos separadores. |

## Props Bloqueadas

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `active-color` | A cor do item ativo é governada exclusivamente pelo `DssBreadcrumbsEl` filho via tokens `--dss-text-body` e `--dss-font-weight-semibold`. Gerenciar do container violaria o Gate de Responsabilidade v2.4. |
| `separator-class` | Os estilos do separador são governados pelo CSS DSS via seletor EXC-01 (`.dss-breadcrumbs .q-breadcrumbs__separator`). Permitir classes externas violaria a tokenização DSS. |

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => VNode[]` | Itens da trilha. Aceita **apenas** instâncias de `DssBreadcrumbsEl`. Uso de HTML nativo ou outros componentes viola o Gate de Composição v2.4. |
| `separator` | `() => VNode[]` | Separador customizado (ex: `DssIcon`). Quando fornecido, sobrepõe a prop `separator`. O `aria-hidden="true"` é aplicado pelo QBreadcrumbs nativamente no container do separador. |

## Emits

Sem eventos próprios. Eventos DOM nativos propagados via `inheritAttrs: false` + `v-bind="$attrs"`.

## Modifier Classes (BEM)

| Classe | Quando Aplicada |
|--------|----------------|
| `dss-breadcrumbs` | Sempre (classe base) |
| `dss-breadcrumbs--gutter-sm` | `gutter="sm"` |
| `dss-breadcrumbs--gutter-md` | `gutter="md"` (padrão) |
| `dss-breadcrumbs--gutter-lg` | `gutter="lg"` |
| `dss-breadcrumbs--align-center` | `align="center"` |
| `dss-breadcrumbs--align-right` | `align="right"` |
| `dss-breadcrumbs--align-between` | `align="between"` |
| `dss-breadcrumbs--align-around` | `align="around"` |
| `dss-breadcrumbs--brand-hub` | `brand="hub"` |
| `dss-breadcrumbs--brand-water` | `brand="water"` |
| `dss-breadcrumbs--brand-waste` | `brand="waste"` |

> **Nota:** `align="left"` não gera classe modificadora (é o comportamento padrão do QBreadcrumbs).

## CSS Custom Properties (Injetadas via Style Binding)

| Propriedade | Valores Possíveis | Padrão |
|-------------|------------------|--------|
| `--dss-breadcrumbs-gap` | `var(--dss-spacing-2\|3\|4)` | `var(--dss-spacing-3)` |
| `--dss-breadcrumbs-separator-color` | `var(--dss-text-*)` | `var(--dss-text-subtle)` |

Estas CSS custom properties são injetadas como `style` inline no template (Layer 1) e consumidas pelos seletores SCSS (Layer 2). Consumidores avançados podem sobrescrevê-las via CSS para personalização fora das props DSS.

## Tokens CSS Utilizados

| Token | Uso |
|-------|-----|
| `--dss-spacing-2` | Gutter sm (8px) — via CSS custom property |
| `--dss-spacing-3` | Gutter md (12px, padrão) — via CSS custom property |
| `--dss-spacing-4` | Gutter lg (16px) — via CSS custom property |
| `--dss-spacing-1` | Outline offset em prefers-contrast: high |
| `--dss-font-size-sm` | Tipografia dos separadores |
| `--dss-line-height-sm` | Line-height dos separadores |
| `--dss-text-subtle` | Cor dos separadores (default) — via CSS custom property |
| `--dss-text-body` | Cor dos separadores quando separatorColor="body" |
| `--dss-text-disabled` | Cor dos separadores quando separatorColor="disabled" |
| `--dss-border-width-thin` | Outline em prefers-contrast: high |
| `--dss-radius-sm` | Border-radius outline em prefers-contrast: high |
| `--dss-font-weight-bold` | Peso do separador em prefers-contrast: high |
| `--dss-hub-600` | Cor separador Hub (light mode) |
| `--dss-hub-400` | Cor separador Hub (dark mode) |
| `--dss-water-500` | Cor separador Water (light mode) |
| `--dss-water-400` | Cor separador Water (dark mode) |
| `--dss-waste-600` | Cor separador Waste (light mode) |
| `--dss-waste-500` | Cor separador Waste (dark mode) |

## Exceções CSS

| ID | Valor | Justificativa |
|----|-------|---------------|
| EXC-01 | Seletor `.dss-breadcrumbs .q-breadcrumbs__separator` | Necessário para estilizar separadores injetados pelo QBreadcrumbs. Registrado no pré-prompt oficial. |
| EXC-02 | Seletor composto `.dss-breadcrumbs.q-breadcrumbs` | Especificidade controlada para override de layout Quasar. Precedente: DssBreadcrumbsEl EXC-01. |
| EXC-03 | `GrayText` (system color keyword) | Forced-colors mode — tokens ignorados pelo browser. |
| EXC-04 | `--dss-line-height-sm` em vez de `--dss-line-height-md` | `--dss-line-height-md` não existe no catálogo DSS. Par canônico de `--dss-font-size-sm` é `--dss-line-height-sm`. |

## Gate de Composição v2.4 — Exceção Formal

| ID | Local | Justificativa |
|----|-------|---------------|
| GATE-EXC-01 | `2-composition/_base.scss`, `4-output/_brands.scss`, `4-output/_states.scss` | Seletores `.dss-breadcrumbs .q-breadcrumbs__separator` necessários para governar separadores injetados pelo QBreadcrumbs. Registrado no pré-prompt oficial. |

## Comportamentos Implícitos

- **`inheritAttrs: false`**: Atributos não declarados como props (incluindo `aria-label`) são forwarded para `<q-breadcrumbs>` via `v-bind="$attrs"`.
- **gutter="none"**: O DssBreadcrumbs passa `gutter="none"` ao QBreadcrumbs para desativar o sistema de gutter nativo (margin-based). O gap é controlado exclusivamente via `--dss-breadcrumbs-gap`.
- **aria-current**: Não gerenciado automaticamente. O consumidor deve declarar `aria-current="page"` no último `DssBreadcrumbsEl`.
- **aria-hidden nos separadores**: Aplicado nativamente pelo QBreadcrumbs — nenhuma ação necessária do consumidor.
- **Slot separator**: Quando não fornecido, o QBreadcrumbs usa a string da prop `separator` como texto separador.
