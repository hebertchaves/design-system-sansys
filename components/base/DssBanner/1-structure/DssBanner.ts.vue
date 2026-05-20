<script lang="ts">
export default { name: 'DssBanner', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { QBanner } from 'quasar'
import type { DssBannerProps, DssBannerEmits } from '../types/banner.types'
import { useBannerClasses } from '../composables/useBannerClasses'
import DssIcon from '../../DssIcon/DssIcon.vue'
import DssButton from '../../DssButton/DssButton.vue'

const props = defineProps<DssBannerProps>()
const emit = defineEmits<DssBannerEmits>()
const slots = useSlots()

const { rootClasses, ariaRole, ariaLive } = useBannerClasses(props)

// Ícones padrão por variante — omitido em 'default' para não poluir visualmente
const DEFAULT_ICONS: Record<string, string> = {
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
}

const resolvedIcon = computed<string>(() => {
  if (props.icon !== undefined) return props.icon
  return DEFAULT_ICONS[props.variant ?? 'default'] ?? ''
})

const hasAvatarContent = computed(() => !!(resolvedIcon.value || slots.avatar))
const hasActionContent = computed(() => !!(props.dismissible || slots.actions))

function handleDismiss() {
  emit('dismiss')
}
</script>

<template>
  <QBanner
    v-bind="$attrs"
    :class="rootClasses"
    :dense="dense"
    :rounded="rounded"
    :inline-actions="inlineActions"
    :role="ariaRole"
    :aria-live="ariaLive"
    class="dss-banner"
  >
    <!-- Área de ícone/avatar -->
    <template v-if="hasAvatarContent" #avatar>
      <slot name="avatar">
        <DssIcon
          v-if="resolvedIcon"
          :name="resolvedIcon"
          size="md"
          class="dss-banner__icon"
          aria-hidden="true"
        />
      </slot>
    </template>

    <!-- Conteúdo principal -->
    <slot />

    <!-- Ações: botão fechar ou slot customizado -->
    <template v-if="hasActionContent" #action>
      <slot name="actions">
        <DssButton
          v-if="dismissible"
          variant="flat"
          :round="true"
          icon="close"
          size="sm"
          class="dss-banner__dismiss"
          :aria-label="dismissLabel ?? 'Fechar'"
          @click="handleDismiss"
        />
      </slot>
    </template>
  </QBanner>
</template>
