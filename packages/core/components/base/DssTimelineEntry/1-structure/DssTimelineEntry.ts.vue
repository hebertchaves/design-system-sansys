<script lang="ts">
export default { name: 'DssTimelineEntry', inheritAttrs: false }
</script>

<script setup lang="ts">
import { useSlots, ref, onMounted, watch, nextTick } from 'vue'
import { QTimelineEntry } from 'quasar'
import type { DssTimelineEntryProps } from '../types/timeline-entry.types'
import { useTimelineEntryClasses } from '../composables/useTimelineEntryClasses'

const props = defineProps<DssTimelineEntryProps>()

const $slots = useSlots()
const { rootClasses } = useTimelineEntryClasses(props)

/**
 * ALT DO AVATAR — correção de a11y que só dá para fazer daqui (set/2026).
 *
 * O QTimelineEntry monta o marcador com `h('img', { class, src })` e NÃO passa
 * `alt` (conferido na fonte, `QTimelineEntry.js`). Um `<img>` sem `alt` é
 * anunciado por leitor de tela — normalmente lendo a URL —, e aqui a imagem é
 * ornamento: quem carrega o significado é o título da entrada.
 *
 * Não há prop nem slot para corrigir isso pela API do motor, então marcamos o
 * elemento renderizado como decorativo: `alt=""` (a forma correta para imagem
 * ornamental, diferente de omitir o atributo) e `aria-hidden`, espelhando o que
 * o próprio Quasar já faz no glifo de ícone.
 */
/* O ref aponta para a INSTÂNCIA do QTimelineEntry, não para o elemento — por
   isso o `$el`. */
const raiz = ref<{ $el?: HTMLElement } | null>(null)

function marcarAvatarComoDecorativo() {
  const el = raiz.value?.$el
  const img = el?.querySelector?.('.q-timeline__dot-img') as HTMLImageElement | null
  if (img && img.getAttribute('alt') === null) {
    img.setAttribute('alt', '')
    img.setAttribute('aria-hidden', 'true')
  }
}

onMounted(() => { void nextTick(marcarAvatarComoDecorativo) })
watch(() => props.avatar, () => { void nextTick(marcarAvatarComoDecorativo) })
</script>

<template>
  <QTimelineEntry
    ref="raiz"
    v-bind="$attrs"
    :class="rootClasses"
    :heading="heading"
    :tag="tag"
    :side="side"
    :icon="icon"
    :avatar="avatar"
    :title="title"
    :subtitle="subtitle"
    class="dss-timeline-entry"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
    <slot />
  </QTimelineEntry>
</template>
