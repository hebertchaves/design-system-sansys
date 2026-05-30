# DssFab

Floating Action Button governado pelo DSS — wrapper sobre QFab com tokens de elevação, transição e brandabilidade.

## Instalação

```js
import { DssFab } from '@dss/components'
```

## Uso Básico

```vue
<DssFab icon="add" color="primary">
  <!-- DssFabAction (Nível 3) — temporariamente q-fab-action -->
  <q-fab-action color="primary" icon="mail" label="E-mail" />
  <q-fab-action color="secondary" icon="alarm" label="Lembrete" />
</DssFab>
```

## v-model (Estado aberto/fechado)

```vue
<DssFab v-model="isOpen" icon="add" active-icon="close" color="primary">
  <q-fab-action color="primary" icon="star" />
</DssFab>
```

## Extended FAB (Ícone + Label)

```vue
<DssFab icon="add" color="primary" label="Nova Ação">
  <q-fab-action color="primary" icon="mail" />
</DssFab>
```

## Direções

```vue
<!-- Expandir para direita -->
<DssFab icon="share" color="secondary" direction="right">
  <q-fab-action color="secondary" icon="facebook" />
</DssFab>

<!-- Expandir para baixo -->
<DssFab icon="menu" color="info" direction="down">
  <q-fab-action color="info" icon="settings" />
</DssFab>
```

## Brandabilidade

```vue
<DssFab icon="add" color="primary" brand="hub">...</DssFab>
<DssFab icon="add" color="info" brand="water">...</DssFab>
<DssFab icon="add" color="positive" brand="waste">...</DssFab>
```

## Disabled

```vue
<DssFab icon="add" color="primary" disable>
  <q-fab-action color="primary" icon="mail" />
</DssFab>
```

## Links

- [Documentação completa](./DssFab.md)
- [API Reference](./DSSFAB_API.md)
- [Exemplos interativos](./DssFab.example.vue)

## Nota sobre DssFabAction

O slot default atualmente aceita `<q-fab-action>` nativamente enquanto o `DssFabAction` (Nível 3) não é criado. Após o `DssFabAction` ser selado, os exemplos serão atualizados.
