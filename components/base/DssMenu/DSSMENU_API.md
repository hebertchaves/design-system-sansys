# DssMenu — API Reference

**Versão DSS:** 2.2  
**Golden Reference:** DssTooltip  
**Golden Context:** DssList

---

## Props

### Props Expostas

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `modelValue` | `Boolean` | `false` | Não | Controle de visibilidade via v-model |
| `fit` | `Boolean` | `false` | Não | Menu adota a largura do elemento trigger |
| `cover` | `Boolean` | `false` | Não | Menu sobrepõe o elemento trigger |
| `anchor` | `MenuPosition` | `undefined` | Não | Ponto de ancoragem no elemento trigger |
| `self` | `MenuPosition` | `undefined` | Não | Ponto de alinhamento do próprio menu |
| `offset` | `[number, number]` | `undefined` | Não | Deslocamento `[x, y]` em pixels |

### Tipo MenuPosition

```typescript
type MenuPosition =
  | 'top left' | 'top middle' | 'top right' | 'top start' | 'top end'
  | 'center left' | 'center middle' | 'center right' | 'center start' | 'center end'
  | 'bottom left' | 'bottom middle' | 'bottom right' | 'bottom start' | 'bottom end'
```

### Props Bloqueadas

| Prop QMenu | Motivo do Bloqueio |
|------------|-------------------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]`. Uso direto quebraria consistência do sistema de temas DSS. |
| `square` | Cantos quadrados violam o token `--dss-radius-md`. A identidade visual de overlays DSS v2.2 usa bordas arredondadas. |

### Props Repassadas via `$attrs`

| Prop QMenu | Tipo | Descrição |
|------------|------|-----------|
| `transition-show` | `String` | Animação de abertura |
| `transition-hide` | `String` | Animação de fechamento |
| `max-height` | `String` | Altura máxima com scroll interno |
| `max-width` | `String` | Largura máxima |
| `persistent` | `Boolean` | Não fecha ao clicar fora ou pressionar Esc |
| `no-focus` | `Boolean` | Não transfere foco ao abrir |
| `touch-position` | `Boolean` | Posiciona no ponto de toque |
| `no-route-dismiss` | `Boolean` | Não fecha na mudança de rota |
| `auto-close` | `Boolean` | Fecha ao clicar em qualquer item filho |
| `separate-close-popup` | `Boolean` | Não propaga v-close-popup para menus pai |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `void` | Conteúdo do menu. Deve conter exclusivamente `DssList > DssItem`. |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Sincronização de v-model. Emitido quando QMenu muda estado de visibilidade. |
| `show` | `Event` | Emitido após o menu terminar de abrir (após animação de entrada). |
| `hide` | `Event` | Emitido após o menu terminar de fechar (após animação de saída). |

---

## Paridade com Golden Context (DssList)

| Aspecto | DssList | DssMenu | Diferença |
|---------|---------|---------|-----------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<...>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` | ✅ | ✅ | Igual |
| 4 camadas SCSS | ✅ | ✅ | Igual |
| `role` ARIA | `list` | `menu` (QMenu nativo) | **Intencional** — semântica distinta |
| Posição na DOM | In-place | Teleportado para `<body>` | **Intencional** — QMenu teleporta |
| CSS scoping | Scoped Vue | Global (components/index.scss) | **Intencional** — teleport requer global |
| Estados interativos | Não aplicáveis | Não aplicáveis | Igual |
| Brand delegation | Para DssItems | Para DssItems | Igual |
| Touch target | Opção B | Opção B | Igual |

---

## Paridade com Golden Reference (DssTooltip)

| Aspecto | DssTooltip | DssMenu | Diferença |
|---------|------------|---------|-----------|
| Overlay não-interativo | ✅ | ✅ | Igual |
| CSS Global | ✅ | ✅ | Igual |
| Dark mode ajuste | Brand adjustments | Borda sutil | **Intencional** — menu tem mais profundidade |
| Forced-colors | Canvas/CanvasText | Canvas/CanvasText | Igual |
| Print | `display: none` | `display: none` | Igual |
| Touch target | Opção B | Opção B | Igual |
| `role` | `tooltip` | `menu` | **Intencional** — semântica distinta |
| Visibilidade | Controlada externamente | v-model / QMenu nativo | **Intencional** — menu tem estado próprio |

---

**Design System Sansys — DSS v2.2**
