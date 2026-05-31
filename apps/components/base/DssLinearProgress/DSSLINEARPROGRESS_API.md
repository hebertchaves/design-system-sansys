# DSSLINEARPROGRESS_API.md — DssLinearProgress API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `Number` | `undefined` | Valor do progresso (0.0 a 1.0). Omitir ativa o estado indeterminado. |
| `indeterminate` | `Boolean` | `false` | Força estado indeterminado independente de `value`. |
| `reverse` | `Boolean` | `false` | Inverte a direção do preenchimento (RTL ou animação reversa). |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'primary'` | Cor semântica DSS da barra de progresso. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Altura da barra via tokens DSS de spacing. |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Aplica contexto de brand Sansys ao modelo. |
| `stripe` | `Boolean` | `false` | Aplica padrão listrado à barra de progresso (nativo Quasar). |
| `disable` | `Boolean` | `false` | Reduz opacidade ao nível `--dss-opacity-disabled` (0.4). Componente não interativo. |

## Slots

Nenhum. Componente visual puro sem conteúdo projetado.

## Events

Nenhum. Componente não interativo — sem emissão de eventos.

## Acessibilidade (Gerenciada pelo Quasar)

O `QLinearProgress` gerencia automaticamente:
- `role="progressbar"`
- `aria-valuenow` (valor atual)
- `aria-valuemin="0"`
- `aria-valuemax="1"`

Em estado `indeterminate`, o Quasar omite `aria-valuenow` conforme ARIA spec.

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-surface-muted` | `#f5f5f5` (light) / `#737373` (dark) | Cor do track (fundo inativo) |
| `--dss-radius-full` | `9999px` | Border-radius da barra e do track |
| `--dss-opacity-disabled` | `0.4` | Opacidade no estado disabled |
| `--dss-duration-250` | `250ms` | Duração da transição de progresso |
| `--dss-easing-standard` | — | Curva de easing da transição |
| `--dss-spacing-1` | `4px` | Altura — size `xs` |
| `--dss-spacing-2` | `8px` | Altura — size `sm` |
| `--dss-spacing-3` | `12px` | Altura — size `md` (padrão) |
| `--dss-spacing-4` | `16px` | Altura — size `lg` |
| `--dss-spacing-6` | `24px` | Altura — size `xl` |
| `--dss-action-primary` | — | Cor do model — `color="primary"` |
| `--dss-action-secondary` | — | Cor do model — `color="secondary"` |
| `--dss-feedback-error` | — | Cor do model — `color="error"` |
| `--dss-feedback-success` | — | Cor do model — `color="success"` |
| `--dss-feedback-warning` | — | Cor do model — `color="warning"` |
| `--dss-feedback-info` | — | Cor do model — `color="info"` |
| `--dss-hub-600` / `--dss-hub-500` | — | Cor do model — brand `hub` (light/dark) |
| `--dss-water-500` / `--dss-water-400` | — | Cor do model — brand `water` (light/dark) |
| `--dss-waste-600` / `--dss-waste-500` | — | Cor do model — brand `waste` (light/dark) |

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-linear-progress` | Root wrapper |
| `.dss-linear-progress--size-{xs\|sm\|md\|lg\|xl}` | Variante de tamanho |
| `.dss-linear-progress--color-{primary\|secondary\|error\|success\|warning\|info}` | Variante de cor |
| `.dss-linear-progress--brand-{hub\|water\|waste}` | Variante de brand via prop |
| `.dss-linear-progress--indeterminate` | Estado indeterminado |
| `.dss-linear-progress--stripe` | Estado com listrado |
| `.dss-linear-progress--disabled` | Estado desabilitado |

## Exceções Registradas

| ID | Regra Violada | Justificativa |
|----|---------------|---------------|
| `EXC-Gate-01` | Gate de Composição v2.4 | Seletores `.q-linear-progress__track` e `.q-linear-progress__model` necessários para aplicar tokens DSS à estrutura interna do Quasar. |
| `EX-States-01` | Uso de `!important` | Necessário em `prefers-reduced-motion` para sobrescrever animações CSS internas do Quasar. WCAG 2.3.3. |
