<template>
  <!-- ==========================================================================
       DssEmptyState — o que a tela mostra quando NÃO há dados.

       `role="status"` + `aria-live="polite"` por padrão: o caso dominante é o
       estado vazio SUBSTITUIR um resultado (após busca, filtro ou exclusão), e
       essa troca precisa ser anunciada. Desligável via `announce` para quando o
       bloco já nasce na tela e nunca muda — anunciar conteúdo estático é ruído.
       ========================================================================== -->
  <div
    :class="rootClasses"
    :role="announce ? 'status' : undefined"
    :aria-live="announce ? 'polite' : undefined"
    :aria-label="ariaLabel || undefined"
  >
    <!-- Ilustração: slot tem precedência sobre a prop (CCI §3.2).
         O ícone é DECORATIVO — a informação está no título. -->
    <div v-if="$slots.icon || icon" class="dss-empty-state__icon">
      <slot name="icon">
        <DssIcon :name="icon" inline decorative />
      </slot>
    </div>

    <p v-if="$slots.title || title" class="dss-empty-state__title">
      <slot name="title">{{ title }}</slot>
    </p>

    <p v-if="$slots.description || description" class="dss-empty-state__description">
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Ação que tira o usuário do vazio — normalmente um DssButton -->
    <div v-if="$slots.action" class="dss-empty-state__action">
      <slot name="action" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * DssEmptyState — implementação canônica.
 *
 * NÃO é componente de erro nem de carregamento: estado vazio significa "a
 * operação funcionou e o resultado é zero". Para falha, use `error` no
 * componente de campo/lista; para "ainda não sei", DssSkeleton ou
 * DssInnerLoading.
 */
import DssIcon from '../../DssIcon/DssIcon.vue'
import { useEmptyStateClasses } from '../composables/useEmptyStateClasses'
import type { EmptyStateProps } from '../types/empty-state.types'

const props = withDefaults(defineProps<EmptyStateProps>(), {
  icon: '',
  title: '',
  description: '',
  size: 'md',
  variant: 'plain',
  announce: true,
  ariaLabel: '',
})

const { rootClasses } = useEmptyStateClasses(props)
</script>
