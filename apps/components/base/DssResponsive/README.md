# DssResponsive

Wrapper utilitário de responsividade do Design System Sansys. Exibe ou oculta conteúdo com base nos breakpoints da tela usando o Screen Plugin do Quasar.

## Instalação

```js
import { DssResponsive } from '@dss/components'
```

## Uso Básico

```vue
<!-- Visível apenas em md, lg, xl -->
<DssResponsive :show-on="['md', 'lg', 'xl']">
  <DssButton label="Ação Desktop" />
</DssResponsive>

<!-- Visível apenas em xs, sm -->
<DssResponsive :show-on="['xs', 'sm']">
  <DssFab icon="add" />
</DssResponsive>

<!-- Oculto apenas em xs -->
<DssResponsive :hide-on="['xs']">
  <DssText>Este texto não aparece em mobile pequeno.</DssText>
</DssResponsive>

<!-- Usando slot scope para lógica condicional -->
<DssResponsive v-slot="{ isMobile, currentBreakpoint }">
  <span>{{ isMobile ? 'Mobile' : 'Desktop' }} — {{ currentBreakpoint }}</span>
</DssResponsive>
```

## Composable Standalone

```typescript
import { useResponsiveState } from '@dss/components/DssResponsive'

const { currentBreakpoint, isMobile, isDesktop } = useResponsiveState()
```

## Pré-requisito

O Quasar **Screen Plugin** deve estar registrado no `quasar.config.js`:

```javascript
plugins: ['Screen']
```

Em ambientes SSR, o Screen Plugin não está disponível no servidor — consulte a seção de Limitação em SSR na [API Reference](./DSSRESPONSIVE_API.md).

## Links

- [Documentação completa](./DssResponsive.md)
- [API Reference](./DSSRESPONSIVE_API.md)
- [Exemplos](./DssResponsive.example.vue)
