# DssSplitter

Divisor redimensionável entre dois painéis. Baseado no `QSplitter` do Quasar, com governança DSS de tokens, brandabilidade e acessibilidade WCAG 2.1 AA.

## Instalação

```js
import { DssSplitter } from '@dss/components'
```

## Uso Básico

```vue
<DssSplitter v-model="splitSize" style="height: 400px;">
  <template #before>
    <div>Painel Esquerdo</div>
  </template>
  <template #after>
    <div>Painel Direito</div>
  </template>
</DssSplitter>
```

## Modos

### Horizontal (padrão) — painéis lado a lado
```vue
<DssSplitter v-model="size" :limits="[20, 80]" style="height: 300px;">
  <template #before><DssCard>Esquerdo</DssCard></template>
  <template #after><DssCard>Direito</DssCard></template>
</DssSplitter>
```

### Vertical — painéis empilhados
```vue
<DssSplitter v-model="size" orientation="vertical" style="height: 400px;">
  <template #before><DssCard>Topo</DssCard></template>
  <template #after><DssCard>Base</DssCard></template>
</DssSplitter>
```

### Desabilitado
```vue
<DssSplitter v-model="size" disabled style="height: 300px;">
  <template #before>Painel A</template>
  <template #after>Painel B</template>
</DssSplitter>
```

### Tamanho fixo em pixels
```vue
<DssSplitter v-model="sidebarWidth" unit="px" :limits="[120, 400]" style="height: 100%;">
  <template #before><nav>Sidebar</nav></template>
  <template #after><main>Conteúdo</main></template>
</DssSplitter>
```

## Links

- [Documentação completa](./DssSplitter.md)
- [API Reference](./DSSSPLITTER_API.md)
- [Exemplos interativos](./DssSplitter.example.vue)
