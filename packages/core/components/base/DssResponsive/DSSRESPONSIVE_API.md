# DSSRESPONSIVE_API.md — DssResponsive API Reference

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `showOn` | `DssBreakpoint[]` | `undefined` | Breakpoints where the slot is visible. Takes priority over `hideOn`. |
| `hideOn` | `DssBreakpoint[]` | `undefined` | Breakpoints where the slot is hidden. Used when `showOn` is not set. |
| `breakpoint` | `DssBreakpoint[]` | `undefined` | Alias for `showOn`. If both `showOn` and `breakpoint` are set, `showOn` wins. |
| `tag` | `String` | `'div'` | HTML tag used for the wrapper element when visible. |

```typescript
type DssBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### Prop Priority

```
showOn → hideOn → breakpoint → (always visible)
```

If `showOn` and `hideOn` are both set, the slot is visible only when the breakpoint
is in `showOn` AND NOT in `hideOn`.

---

## Slots

### `default`

The main content area. Receives responsive state as slot scope.

**Slot Scope:**

| Property | Type | Description |
|---|---|---|
| `currentBreakpoint` | `DssBreakpoint` | Active breakpoint: `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` |
| `isXs` | `Boolean` | `true` when current breakpoint is `xs` |
| `isSm` | `Boolean` | `true` when current breakpoint is `sm` |
| `isMd` | `Boolean` | `true` when current breakpoint is `md` |
| `isLg` | `Boolean` | `true` when current breakpoint is `lg` |
| `isXl` | `Boolean` | `true` when current breakpoint is `xl` |
| `isMobile` | `Boolean` | `true` when current breakpoint is `xs` or `sm` |
| `isDesktop` | `Boolean` | `true` when current breakpoint is `md`, `lg`, or `xl` |

**Usage:**

```vue
<DssResponsive v-slot="{ currentBreakpoint, isMobile }">
  <span>{{ isMobile ? 'Mobile' : 'Desktop' }} — {{ currentBreakpoint }}</span>
</DssResponsive>
```

---

## Events

None — `DssResponsive` is a non-emitting container.

---

## Tokens Used

None. `DssResponsive` is a logic-only wrapper with no visual output of its own.

---

## Composable Export

`useResponsiveState` is also exported from `index.js` for standalone use:

```typescript
import { useResponsiveState } from '@dss/components/DssResponsive'

const { currentBreakpoint, isMobile, isDesktop } = useResponsiveState()
```

---

## CSS Classes

| Class | Description |
|---|---|
| `.dss-responsive` | Root element (applied only when visible — v-if) |

No modifier classes. Visual styling is entirely delegated to slotted content.

---

## Considerações de Acessibilidade

### Gerenciamento de Foco após Mudança de Breakpoint

Quando `isVisible` transita de `false → true` (ex: usuário rotaciona o dispositivo ou expande a janela), elementos interativos que aparecem no DOM não recebem foco automaticamente. **O consumidor é responsável** por redirecionar o foco se necessário.

```vue
<!-- Padrão recomendado para elementos críticos -->
<DssResponsive :show-on="['md', 'lg', 'xl']" ref="responsiveContainer">
  <DssInput ref="desktopInput" label="Campo apenas desktop" />
</DssResponsive>
```

Caso o contexto exija foco automático, use `watch` no composable `useResponsiveState`:

```typescript
import { useResponsiveState } from '@dss/components/DssResponsive'
import { watch } from 'vue'

const { isDesktop } = useResponsiveState()
watch(isDesktop, (val) => {
  if (val) nextTick(() => desktopInputRef.value?.focus())
})
```

### Limitação em SSR (Server-Side Rendering)

`DssResponsive` usa `useQuasar()` internamente, que depende do Quasar Screen Plugin estar ativo. Em aplicações com SSR (Quasar SSR mode):

- O Screen Plugin não está disponível no servidor — `$q.screen` retorna valores padrão (todos `false`).
- Por padrão, em SSR o conteúdo é **sempre renderizado** no servidor (sem breakpoint real) e a visibilidade é ajustada no cliente após hidratação.
- Use `$q.platform.is.server` para condicionais SSR-safe antes de instanciar DssResponsive em contextos críticos.

**Pré-requisito:** Quasar Screen Plugin deve estar registrado no `quasar.config.js`:
```javascript
plugins: ['Screen']
```
