# DSSPAGESCROLLER_API.md — DssPageScroller API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `position` | `PageScrollerPosition` | `'bottom-right'` | Posição na tela onde o elemento flutuante é ancorado. Repassada ao QPageScroller. |
| `offset` | `[number, number]` | `[18, 18]` | Deslocamento `[x, y]` em pixels a partir da posição definida. |
| `scrollOffset` | `Number` | `1000` | Pixels rolados antes do componente se tornar visível. |
| `duration` | `Number` | `250` | Duração da animação de scroll suave em ms. Padrão 250 = `--dss-duration-base`. Forçado a 0 se `prefers-reduced-motion: reduce`. |
| `reverse` | `Boolean` | `false` | Quando `true`, o componente aparece ao rolar na direção oposta (para cima). |

### Tipo: PageScrollerPosition

```typescript
type PageScrollerPosition =
  | 'top-right' | 'top-left'
  | 'bottom-right' | 'bottom-left'
  | 'top' | 'bottom' | 'left' | 'right'
```

### Props Bloqueadas (Governança DSS)

Nenhuma prop nativa precisa ser bloqueada. Todas as props relevantes do QPageScroller
são expostas com governança DSS (padrões ajustados).

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do scroller. Recomendado: `DssButton` (round, com ícone). O `aria-label` deve ser definido no botão interno. |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| — | — | Nenhum evento emitido diretamente. O clique é gerenciado pelo QPageScroller internamente. |

## Comportamentos Implícitos

| Comportamento | Descrição |
|---------------|-----------|
| `v-bind="$attrs"` | Atributos não declarados como props são repassados ao `<q-page-scroller>` raiz. Útil para `aria-label`, `data-*`, classes adicionais. |
| Visibilidade | Controlada internamente pelo QPageScroller com base no scroll do container pai. |
| Scroll suave | Ao clicar no slot, QPageScroller executa scroll suave até a posição de origem com duração `effectiveDuration`. |
| `prefers-reduced-motion` | Detectado via `window.matchMedia`. Quando ativo, `effectiveDuration` é forçado a 0 (scroll instantâneo). |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-z-index-sticky` | 1020 | z-index do container `.dss-page-scroller` |

**Tokens referenciados apenas em documentação (não no SCSS):**

| Token | Valor | Descrição |
|-------|-------|-----------|
| `--dss-duration-base` | 250ms | Padrão da prop `duration` — governa o valor JS passado ao QPageScroller |

## Classes CSS

| Classe | Descrição |
|--------|-----------|
| `.dss-page-scroller` | Classe raiz — aplicada ao `<q-page-scroller>` |

## Contexto Estrutural Obrigatório

DssPageScroller requer a cadeia de contexto Quasar para funcionar corretamente:

```
DssLayout > DssPageContainer > DssPage > DssPageScroller
```

Fora dessa hierarquia, o QPageScroller não detecta o scroll corretamente.
