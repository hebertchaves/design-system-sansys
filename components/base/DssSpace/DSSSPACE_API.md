# DssSpace — API Reference

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `size` | `SpaceSize \| undefined` | `undefined` | Não | Tamanho fixo via token `--dss-spacing-{size}`. Quando ausente: flex-grow (ocupa espaço disponível). |

### Tipo SpaceSize

```typescript
type SpaceSize =
  | 'px'   // var(--dss-spacing-px)  = 1px
  | '0_5'  // var(--dss-spacing-0_5) = 2px
  | '1'    // var(--dss-spacing-1)   = 4px
  | '1_5'  // var(--dss-spacing-1_5) = 6px
  | '2'    // var(--dss-spacing-2)   = 8px
  | '2_5'  // var(--dss-spacing-2_5) = 10px
  | '3'    // var(--dss-spacing-3)   = 12px
  | '3_5'  // var(--dss-spacing-3_5) = 14px
  | '4'    // var(--dss-spacing-4)   = 16px
  | '5'    // var(--dss-spacing-5)   = 20px
  | '6'    // var(--dss-spacing-6)   = 24px
  | '7'    // var(--dss-spacing-7)   = 28px
  | '8'    // var(--dss-spacing-8)   = 32px
  | '9'    // var(--dss-spacing-9)   = 36px
  | '10'   // var(--dss-spacing-10)  = 40px
  | '11'   // var(--dss-spacing-11)  = 44px
  | '12'   // var(--dss-spacing-12)  = 48px
  | '14'   // var(--dss-spacing-14)  = 56px
  | '16'   // var(--dss-spacing-16)  = 64px
  | '20'   // var(--dss-spacing-20)  = 80px
  | '24'   // var(--dss-spacing-24)  = 96px
```

---

## Slots

Nenhum. `DssSpace` é um elemento de layout puro sem conteúdo.

---

## Events

Nenhum. `DssSpace` é não interativo.

---

## Classes CSS Geradas

| Classe | Quando | Efeito |
|--------|--------|--------|
| `dss-space` | Sempre | Base: `flex: 1 1 auto`, `min-width: 0`, `min-height: 0` |
| `dss-space--size-{value}` | Quando `size` está presente | `flex: 0 0 auto` + dimensão via `--dss-spacing-{value}` |

---

## Composable

### `useSpaceClasses(props: SpaceProps): { spaceClasses: ComputedRef<string[]> }`

Retorna as classes CSS computadas com base nas props.

```typescript
import { useSpaceClasses } from '@dss/components/DssSpace'

const { spaceClasses } = useSpaceClasses({ size: '4' })
// → ['dss-space', 'dss-space--size-4']

const { spaceClasses: growClasses } = useSpaceClasses({})
// → ['dss-space']
```

---

## Tokens Utilizados

Todos os tokens são `--dss-spacing-*` do catálogo DSS:

```
--dss-spacing-px, --dss-spacing-0_5, --dss-spacing-1, --dss-spacing-1_5,
--dss-spacing-2, --dss-spacing-2_5, --dss-spacing-3, --dss-spacing-3_5,
--dss-spacing-4, --dss-spacing-5, --dss-spacing-6, --dss-spacing-7,
--dss-spacing-8, --dss-spacing-9, --dss-spacing-10, --dss-spacing-11,
--dss-spacing-12, --dss-spacing-14, --dss-spacing-16, --dss-spacing-20,
--dss-spacing-24
```

---

## Acessibilidade

| Atributo | Valor | Tipo | Descrição |
|----------|-------|------|-----------|
| `aria-hidden` | `"true"` | Estático | Sempre presente. DssSpace é invisível para tecnologias assistivas. |

Nenhum `role`, `aria-label` ou `aria-orientation` — componente de layout puro.
