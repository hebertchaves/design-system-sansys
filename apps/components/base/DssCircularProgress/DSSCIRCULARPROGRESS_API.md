# DSSCIRCULARPROGRESS_API.md — DssCircularProgress API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Number` | `undefined` | Valor atual do progresso (min..max). Omitir com `indeterminate=true` ativa animação contínua |
| `min` | `Number` | `0` | Valor mínimo do intervalo de progresso |
| `max` | `Number` | `100` | Valor máximo do intervalo de progresso |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'primary'` | Cor semântica DSS do arco de progresso |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do componente via tokens DSS |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Contexto de brand Sansys — sobrescreve `color` |
| `indeterminate` | `Boolean` | `false` | Animação contínua (progresso desconhecido) |
| `thickness` | `Number` | `0.2` | Espessura do traço relativa ao raio (0–1) |
| `angle` | `Number` | `0` | Ângulo de início do arco em graus |
| `reverse` | `Boolean` | `false` | Inverte a direção do preenchimento/animação |
| `instantFeedback` | `Boolean` | `false` | Remove transição de valor (sem animação de fill) |
| `disable` | `Boolean` | `false` | Reduz opacidade ao nível desabilitado (não interativo) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo renderizado no centro do círculo (ex: rótulo percentual, ícone). Quando presente, `show-value` é ativado automaticamente no QCircularProgress interno |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | Nenhum evento emitido. QCircularProgress não expõe eventos DSS controláveis |

## Props Bloqueadas (não expostas ao consumidor)

| Prop Quasar | Motivo do bloqueio |
|-------------|-------------------|
| `color` | Governado via CSS DSS — EXC-Gate-01 (`.q-circular-progress__circle { stroke: var(--dss-...) }`) |
| `track-color` | Governado por `--dss-surface-muted` — sem divergência permitida |
| `dark` | Gerenciado por `[data-theme="dark"]` em `4-output/_states.scss` |
| `center-color` | Sem semântica DSS — fundo transparente herdado do container |
| `font-size` | Proporção Quasar padrão (`0.25em`) é adequada e proporcional ao tamanho |
| `rounded` | Cap style do arco mantido no padrão Quasar (round caps) |
| `show-value` | Auto-detectado pela presença do slot default |

## Composable Exportado

### `useCircularProgressClasses(props)`

Retorna as classes CSS computadas do componente.

```typescript
import { useCircularProgressClasses } from '@dss/components/DssCircularProgress'

const { rootClasses } = useCircularProgressClasses(props)
// rootClasses: ComputedRef<(string | Record<string, boolean>)[]>
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-circular-progress` | Root element |
| `.dss-circular-progress--size-{xs\|sm\|md\|lg\|xl}` | Variante de tamanho |
| `.dss-circular-progress--color-{primary\|secondary\|...}` | Variante de cor semântica |
| `.dss-circular-progress--brand-{hub\|water\|waste}` | Variante de brand |
| `.dss-circular-progress--indeterminate` | Estado indeterminado |
| `.dss-circular-progress--disabled` | Estado desabilitado |

## Mapeamento de Tamanhos

| Prop `size` | Token CSS | Valor computado |
|-------------|-----------|-----------------|
| `xs` | `--dss-spacing-10` | 40px |
| `sm` | `--dss-spacing-12` | 48px |
| `md` | `--dss-spacing-16` | 64px *(padrão)* |
| `lg` | `--dss-spacing-20` | 80px |
| `xl` | `--dss-spacing-24` | 96px |

## Tokens Utilizados

| Propriedade | Token | Camada |
|-------------|-------|--------|
| Track (trilha de fundo) | `--dss-surface-muted` | `2-composition/_base.scss` |
| Opacidade disabled | `--dss-opacity-disabled` | `2-composition/_base.scss` |
| Tamanho xs | `--dss-spacing-10` | `1-structure` (prop :size) |
| Tamanho sm | `--dss-spacing-12` | `1-structure` (prop :size) |
| Tamanho md | `--dss-spacing-16` | `1-structure` (prop :size) |
| Tamanho lg | `--dss-spacing-20` | `1-structure` (prop :size) |
| Tamanho xl | `--dss-spacing-24` | `1-structure` (prop :size) |
| Cor primary | `--dss-action-primary` | `3-variants/_colors.scss` |
| Cor secondary | `--dss-action-secondary` | `3-variants/_colors.scss` |
| Cor error | `--dss-feedback-error` | `3-variants/_colors.scss` |
| Cor success | `--dss-feedback-success` | `3-variants/_colors.scss` |
| Cor warning | `--dss-feedback-warning` | `3-variants/_colors.scss` |
| Cor info | `--dss-feedback-info` | `3-variants/_colors.scss` |
| Brand hub (light) | `--dss-hub-600` | `4-output/_brands.scss` |
| Brand hub (dark) | `--dss-hub-500` | `4-output/_states.scss` |
| Brand water (light) | `--dss-water-500` | `4-output/_brands.scss` |
| Brand water (dark) | `--dss-water-400` | `4-output/_states.scss` |
| Brand waste (light) | `--dss-waste-600` | `4-output/_brands.scss` |
| Brand waste (dark) | `--dss-waste-500` | `4-output/_states.scss` |

## Comportamentos Implícitos

### `show-value` automático
O QCircularProgress só renderiza conteúdo do slot quando `show-value=true`. O DssCircularProgress detecta automaticamente a presença do slot default via `useSlots()` e configura `show-value` sem exigir declaração manual do consumidor.

### `inheritAttrs: false`
`$attrs` (id, class extra, data-*, aria-* adicionais) são encaminhados ao root element `div` via `v-bind="$attrs"`. O QCircularProgress interno NÃO recebe $attrs diretamente.

### Cor via CSS (não via prop Quasar)
A prop `color` do QCircularProgress NÃO é utilizada. A cor do arco é governada exclusivamente via CSS DSS targeting `.q-circular-progress__circle { stroke: var(--dss-...) }`. Isso garante que os tokens DSS sejam aplicados em vez do sistema de cores Quasar (`--q-primary` etc.).

## Comparação com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssCircularProgress | Justificativa da divergência |
|---------|----------|---------------------|------------------------------|
| `defineOptions` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` | ✅ | ✅ | Idêntico |
| `v-bind="$attrs"` no root | ✅ | ✅ | Idêntico |
| `-webkit-tap-highlight-color` | ✅ | ✅ | Idêntico |
| Touch target `::before` | ❌ | ❌ | Idêntico — ambos não interativos |
| `defineEmits` omitido | ✅ | ✅ | Idêntico — nenhum emite |
| Slot default | ❌ | ✅ | **Diferente** — slot para rótulo central no círculo |
| Brandability | ❌ | ✅ | **Diferente** — progresso tem contexto brand semântico |
| Indeterminate | ❌ | ✅ | **Diferente** — estado específico de loading |
