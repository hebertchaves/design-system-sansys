<script lang="ts">
export default { name: 'DssBanner', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
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
  <!--
    SEM QBanner.

    Até out/2026 a raiz deste componente ERA o `<QBanner>`: já no primeiro elo
    da cadeia a UI saía da governança do DSS, e a estrutura interna
    (`.q-banner__avatar`, `__content`, `__actions`) era do Quasar. Três custos
    medidos nessa dependência:

    1. O respiro das ações vinha de um override global ao seletor interno
       (`themes/_quasar-overrides.scss`), aplicado a TODO banner. Com
       `inline-actions` ele empurrava o botão 6px abaixo do eixo e inflava a
       caixa em 12px — e não havia como condicionar, porque `inlineActions`
       era só repassada ao QBanner.
    2. Alinhamento e gap das três áreas só se governavam por seletor
       descendente de terceiro, registrado como EXC-Gate-01.
    3. A estrutura podia mudar entre versões do Quasar sem aviso — foi o que
       aconteceu no DssPagination, onde um wrapper apareceu e matou o seletor.

    O arranjo é um grid de três colunas: avatar · conteúdo · ações. Quando as
    ações são empilhadas, elas descem para a segunda linha da coluna do
    conteúdo. Nenhum componente de terceiro no caminho.
  -->
  <div
    v-bind="$attrs"
    :class="rootClasses"
    class="dss-banner"
    :role="ariaRole"
    :aria-live="(ariaLive as 'off' | 'polite' | 'assertive' | undefined)"
  >
    <div v-if="hasAvatarContent" class="dss-banner__avatar">
      <slot name="avatar">
        <DssIcon
          v-if="resolvedIcon"
          :name="resolvedIcon"
          size="md"
          class="dss-banner__icon"
          decorative
        />
      </slot>
    </div>

    <div class="dss-banner__content">
      <slot />
    </div>

    <div v-if="hasActionContent" class="dss-banner__actions">
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
    </div>
  </div>
</template>
