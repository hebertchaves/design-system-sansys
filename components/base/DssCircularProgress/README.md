# DssCircularProgress

Indicador de progresso circular DSS — wrapper governado sobre `QCircularProgress` do Quasar.

## Instalação

```js
import { DssCircularProgress } from '@dss/components'
```

## Uso Básico

```vue
<!-- Determinado -->
<DssCircularProgress :value="70" />

<!-- Com rótulo central -->
<DssCircularProgress :value="70">70%</DssCircularProgress>

<!-- Indeterminado (loading) -->
<DssCircularProgress indeterminate />

<!-- Brand -->
<DssCircularProgress :value="50" brand="hub" />
```

## Tamanhos

```vue
<DssCircularProgress :value="50" size="xs" />  <!-- 40px -->
<DssCircularProgress :value="50" size="sm" />  <!-- 48px -->
<DssCircularProgress :value="50" size="md" />  <!-- 64px — padrão -->
<DssCircularProgress :value="50" size="lg" />  <!-- 80px -->
<DssCircularProgress :value="50" size="xl" />  <!-- 96px -->
```

## Cores Semânticas

```vue
<DssCircularProgress :value="70" color="primary" />
<DssCircularProgress :value="70" color="success" />
<DssCircularProgress :value="30" color="error" />
<DssCircularProgress :value="60" color="warning" />
```

## Links

- [Documentação Normativa](./DssCircularProgress.md)
- [API Reference](./DSSCIRCULARPROGRESS_API.md)
- [Exemplos](./DssCircularProgress.example.vue)
