# DssSpinner

**Classificação:** Feedback de Status — indicador de carregamento
**Fase:** 1
**Golden Reference:** DssBadge (não interativo) | **Golden Context:** DssIcon
**Status:** Conformant — Selado 2026-03-24

---

## O que é

`DssSpinner` é o componente DSS para indicar estados de carregamento/processamento. É um wrapper direto dos componentes `QSpinner*` do Quasar, aplicando governança DSS de tokens, acessibilidade e brandabilidade.

## Quando usar

- Indicar carregamento de dados assíncronos (fetch, upload, processamento)
- Dentro de botões em estado loading (herda cor via `currentColor`)
- Sobreposição de seções durante atualizações de conteúdo
- Indicação de progresso indeterminado

## Quando NÃO usar

- Para progresso determinado (ex: upload 60%) → use barra de progresso
- Como único indicador de feedback sem contexto textual → adicione sempre um `ariaLabel` descritivo
- Para substituir estados disabled em formulários → use `disabled` nas props

---

## Instalação

```javascript
import { DssSpinner } from '@dss/components/DssSpinner'
```

## Uso básico

```vue
<template>
  <!-- Padrão: herda cor do contexto -->
  <DssSpinner aria-label="Carregando dados" />

  <!-- Com cor semântica DSS -->
  <DssSpinner color="primary" size="lg" aria-label="Processando" />

  <!-- Dentro de botão (herança de cor automática) -->
  <button style="color: white; background: var(--dss-action-primary)">
    <DssSpinner size="sm" aria-label="Salvando" />
    Salvando...
  </button>
</template>
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `type` | `SpinnerType` | `'standard'` | Variante gráfica (8 tipos disponíveis) |
| `color` | `SpinnerColor \| null` | `null` | Cor semântica DSS. `null` = herda currentColor |
| `size` | `SpinnerSize` | `'md'` | Tamanho via tokens `--dss-icon-size-*` |
| `thickness` | `number` | `5` | Espessura do traço (apenas `type='standard'`) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Contexto de brand |
| `ariaLabel` | `string` | `'Carregando'` | Texto acessível para screen readers |

## Acessibilidade

- `role="status"` + `aria-live="polite"` no wrapper
- `.dss-spinner__label` sr-only com texto customizável via `ariaLabel`
- `prefers-reduced-motion`: animação interrompida (WCAG 2.3.3)
- `forced-colors`: usa `ButtonText` do sistema (Windows HCM)
