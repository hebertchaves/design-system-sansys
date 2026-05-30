# DSSSCROLLAREA_API.md — DssScrollArea API Reference

## Props

| Prop | Tipo | Default | Obrigatória | Descrição |
|------|------|---------|-------------|-----------|
| `visible` | `'auto' \| 'always' \| 'never'` | `'auto'` | Não | Controla visibilidade da scrollbar. `'auto'` = mostra ao hover/scroll; `'always'` = sempre visível; `'never'` = sempre oculta (scroll ainda funciona) |
| `horizontal` | `Boolean` | `false` | Não | Habilita rolagem horizontal. O conteúdo deve ter largura definida (via `width: max-content` ou similar) para o scroll funcionar |
| `barDelay` | `Number` | `1000` | Não | Tempo em milissegundos antes da scrollbar se ocultar após o scroll terminar. Referência semântica: `--dss-duration-250` (250ms), `--dss-duration-1000` (1000ms) |
| `scrollTarget` | `Element \| String` | `undefined` | Não | Elemento DOM ou seletor CSS a ser usado como alvo de detecção de scroll. Quando fornecido, o scroll é detectado a partir deste elemento externo |
| `label` | `String` | `undefined` | Não | Label acessível para a região de scroll. Quando fornecida, adiciona `role="region"` e `aria-label` ao root, criando uma landmark ARIA identificável por leitores de tela |

## Slots

| Slot | Scoped | Descrição |
|------|--------|-----------|
| `default` | Não | Conteúdo a ser rolado. Pode ser qualquer elemento HTML ou componente DSS. A altura/largura do conteúdo determina se o scroll é ativado. |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `scroll` | `ScrollPayload` | Emitido durante a rolagem. Inclui posição atual, direção, delta e ponto de inflexão. |

### ScrollPayload

```typescript
interface ScrollPayload {
  position: { top: number; left: number }  // Posição atual de scroll (px)
  direction?: 'up' | 'down' | 'left' | 'right'  // Direção do scroll
  delta?: { top: number; left: number }  // Variação desde o último evento
  inflectionPoint?: { top: number; left: number }  // Ponto onde a direção inverteu
  overflow?: boolean  // Se o scroll chegou ao limite
}
```

## Métodos (via template ref)

| Método | Parâmetros | Retorno | Descrição |
|--------|------------|---------|-----------|
| `getScrollTarget()` | — | `Element` | Retorna o elemento DOM subjacente de scroll |
| `getScrollPosition()` | — | `{ top: number, left: number }` | Retorna a posição atual de scroll nos dois eixos |
| `scrollTo(offset, duration?, axis?)` | `offset: number`, `duration?: number`, `axis?: 'vertical' \| 'horizontal'` | `void` | Rola para uma posição absoluta. `duration=0` = instantâneo |
| `scrollBy(offset, duration?, axis?)` | `offset: number`, `duration?: number`, `axis?: 'vertical' \| 'horizontal'` | `void` | Rola por um delta relativo à posição atual |
| `setScrollPosition(axis, offset, duration?)` | `axis: 'vertical' \| 'horizontal'`, `offset: number`, `duration?: number` | `void` | Define posição em um eixo específico com animação opcional |

### Exemplo de uso de ref

```vue
<template>
  <DssScrollArea ref="areaRef" style="height: 300px;">
    <!-- conteúdo -->
  </DssScrollArea>
  <button @click="areaRef.scrollTo(0, 300)">Voltar ao topo</button>
</template>

<script setup>
import { ref } from 'vue'
const areaRef = ref(null)
</script>
```

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-scroll-area` | Classe raiz (sempre presente) |
| `.dss-scroll-area--horizontal` | Ativo quando `horizontal=true` |
| `.dss-scroll-area--always-visible` | Ativo quando `visible='always'` |
| `.dss-scroll-area--never-visible` | Ativo quando `visible='never'` |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-gray-400` | #d4d4d4 | Cor padrão do scrollbar thumb |
| `--dss-gray-500` | #a3a3a3 | Cor do thumb em hover |
| `--dss-gray-600` | #737373 | Thumb no dark mode |
| `--dss-gray-700` | #525252 | Thumb hover em high-contrast |
| `--dss-gray-900` | #0a0a0a | Thumb hover em high-contrast máximo |
| `--dss-gray-300` | #e5e5e5 | Track em high-contrast |
| `--dss-radius-full` | 9999px | Shape pill do thumb |
| `--dss-spacing-2` | 8px | Espessura da barra de scroll |
| `--dss-duration-250` | 250ms | Transição de cor/opacidade |
| `--dss-easing-ease-out` | — | Curva de animação |
| `--dss-action-hub` | — | Thumb em brand="hub" |
| `--dss-action-water` | — | Thumb em brand="water" |
| `--dss-action-waste` | — | Thumb em brand="waste" |

## Props Bloqueadas (não expostas do QScrollArea)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `bar-style` | Governado via CSS DSS (EXC-Gate-02) |
| `thumb-style` | Governado via CSS DSS (EXC-Gate-02) |
| `vertical-bar-style` | Governado via CSS DSS |
| `horizontal-bar-style` | Governado via CSS DSS |
| `vertical-thumb-style` | Governado via CSS DSS |
| `horizontal-thumb-style` | Governado via CSS DSS |
| `dark` | Governado via tokens em 4-output/_states.scss |
| `content-active-style` | Gerenciado internamente pelo Quasar; não necessário |
