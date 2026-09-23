<script setup lang="ts">
/**
 * ==========================================================================
 * DssHeader — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QHeader. Container estrutural superior de página.
 *
 * Responsabilidades:
 * - Encapsula <q-header> expondo apenas props semanticamente relevantes
 * - Bloqueia prop color (background governado por --dss-surface-default via CSS)
 * - Gerencia variantes de elevação (elevated) e borda (bordered)
 * - Container 100% não-interativo — estados de interação são dos filhos
 * - Slot default destinado exclusivamente a componentes DssToolbar
 *
 * Props bloqueadas:
 * - color: cor de fundo governada por token --dss-surface-default
 * - height-hint: calculado automaticamente pelo Quasar via conteúdo
 *
 * Props repassadas via $attrs (não declaradas como props DSS):
 * - reveal: oculta/exibe o header ao rolar a página (comportamento nativo QHeader)
 *
 * Gate de Responsabilidade v2.4:
 * - DssHeader é container estrutural puro — sem hover, focus, active próprios
 * - Interatividade é responsabilidade exclusiva dos componentes filhos (DssToolbar)
 * - Brand/cor são responsabilidade do DssToolbar interno, não do DssHeader
 *
 * @version 1.0.0
 */
import type { HeaderProps, HeaderSlots } from '../types/header.types'
import { useHeaderClasses } from '../composables'

defineOptions({ name: 'DssHeader', inheritAttrs: false })

const props = withDefaults(defineProps<HeaderProps>(), {
  modelValue: true,
  reveal: false,
  revealOffset: 250,
  elevated: false,
  bordered: false
})

/* Emits declarados INLINE, não via `HeaderEmits` importado (set/2026).
   O `@vue/compiler-sfc` resolve tipos importados a partir de um cache do arquivo
   de tipos que NÃO invalida por mtime — conferido: mudei o conteúdo, dei touch e
   troquei o especificador do import, e ele seguiu servindo a versão antiga (o
   módulo compilado listava só `elevated` e `bordered`). Com o tipo nomeado o
   módulo respondia 500 e derrubava o sandbox inteiro.
   A forma inline é equivalente e compila. `HeaderEmits` continua exportado em
   `types/header.types.ts`, que é o que a doc e o contrato leem — e é para lá que
   este `defineEmits` deve voltar depois de um restart do dev server. */
defineEmits<{
  (e: 'reveal', revealed: boolean): void
  (e: 'update:modelValue', value: boolean): void
}>()
defineSlots<HeaderSlots>()

const { headerClasses } = useHeaderClasses(props)
</script>

<template>
  <q-header
    :class="headerClasses"
    :model-value="modelValue"
    :reveal="reveal"
    :reveal-offset="revealOffset"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @reveal="$emit('reveal', $event)"
  >
    <slot />
  </q-header>
</template>
