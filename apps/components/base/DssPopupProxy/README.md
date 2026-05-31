# DssPopupProxy

Overlay responsivo DSS que adapta automaticamente entre popup flutuante (desktop) e modal (mobile) baseado no viewport.

## Quando usar

- Menus de ações atrelados a botões ou ícones
- Popups de confirmação que precisam funcionar em desktop e mobile
- Menus de contexto (clique-direito)

## Instalação

```js
import { DssPopupProxy } from '@dss/components'
```

## Uso Básico

```vue
<DssButton label="Ações">
  <DssPopupProxy v-model:open="show">
    <DssList>
      <DssItem label="Editar" clickable v-close-popup />
      <DssItem label="Excluir" clickable v-close-popup />
    </DssList>
  </DssPopupProxy>
</DssButton>
```

## Como funciona

O `DssPopupProxy` usa `QPopupProxy` do Quasar internamente. Ele:
- Em viewports **≥ breakpoint** (padrão: 450px): exibe como popup flutuante (`QMenu`)
- Em viewports **< breakpoint**: exibe como modal com backdrop (`QDialog`)

```vue
<!-- Forçar sempre modo menu (nunca dialog) -->
<DssPopupProxy :breakpoint="0" v-model:open="show">
  ...
</DssPopupProxy>

<!-- Popup de confirmação (não fecha ao clicar fora) -->
<DssPopupProxy persistent v-model:open="show">
  <DssCard class="q-pa-md">
    <p>Confirmar?</p>
    <DssButton label="Sim" v-close-popup />
  </DssCard>
</DssPopupProxy>

<!-- Context menu (clique-direito) -->
<div>
  Área de contexto
  <DssPopupProxy context-menu v-model:open="show">
    <DssList>
      <DssItem label="Copiar" clickable v-close-popup />
    </DssList>
  </DssPopupProxy>
</div>
```

## Controle Programático

```vue
<DssPopupProxy ref="proxyRef" v-model:open="show">
  ...
</DssPopupProxy>

<script setup>
const proxyRef = ref()
proxyRef.value?.show()   // abrir
proxyRef.value?.hide()   // fechar
proxyRef.value?.toggle() // alternar
</script>
```

## Links

- [Documentação completa](./DssPopupProxy.md)
- [API Reference](./DSSPOPUPPROXY_API.md)
- [Exemplos](./DssPopupProxy.example.vue)
