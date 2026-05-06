# DssLinearProgress

Wrapper DSS governado sobre `QLinearProgress` do Quasar. Indica progresso linear de uma operação — determinado (valor numérico) ou indeterminado (animação contínua).

**Quando usar:** carregamento de página, upload de arquivo, progresso de etapas.
**Quando NÃO usar:** progresso circular → use `DssSpinner`; indicador de etapas → use `DssStepper`.

## Instalação

```js
import { DssLinearProgress } from '@dss/components'
```

## Uso Básico

```vue
<!-- Determinado -->
<DssLinearProgress :value="0.7" />

<!-- Indeterminado -->
<DssLinearProgress indeterminate />

<!-- Com cor e tamanho -->
<DssLinearProgress :value="0.5" color="success" size="lg" />

<!-- Brand contextual -->
<div data-brand="hub">
  <DssLinearProgress :value="0.8" />
</div>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `Number` | `undefined` | Progresso (0.0–1.0). Omitir ativa estado indeterminado. |
| `indeterminate` | `Boolean` | `false` | Força estado indeterminado independente de `value`. |
| `reverse` | `Boolean` | `false` | Inverte a direção de preenchimento/animação. |
| `color` | `String` | `'primary'` | Cor semântica: `primary`, `secondary`, `error`, `success`, `warning`, `info`. |
| `size` | `String` | `'md'` | Altura: `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px). |
| `brand` | `String` | `undefined` | Brand: `hub`, `water`, `waste`. |
| `stripe` | `Boolean` | `false` | Aplica padrão listrado à barra de progresso. |
| `disable` | `Boolean` | `false` | Reduz opacidade ao nível desabilitado (não interativo). |

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia via `[data-theme="dark"]` |
| `track-color` | Governado por `--dss-surface-muted` |
| `rounded` | Governado por `--dss-radius-full` |

## Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Barra determinada com `value` |
| indeterminate | ✅ | Animação contínua |
| disabled | ✅ | Opacidade `--dss-opacity-disabled` (0.4) |
| hover | N/A | Não interativo |
| focus | N/A | Não interativo |
| active | N/A | Não interativo |

## Links

- [Documentação completa](./DssLinearProgress.md)
- [API Reference](./DSSLINEARPROGRESS_API.md)
- [Exemplos](./DssLinearProgress.example.vue)
