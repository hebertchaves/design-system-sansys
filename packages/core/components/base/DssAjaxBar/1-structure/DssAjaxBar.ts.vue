<script setup lang="ts">
import { ref } from 'vue'
import { QAjaxBar } from 'quasar'
import type { AjaxBarProps, AjaxBarEmits } from '../types/ajaxbar.types'
import { useAjaxBarClasses } from '../composables/useAjaxBarClasses'

defineOptions({ name: 'DssAjaxBar', inheritAttrs: false })

const props = defineProps<AjaxBarProps>()
const emit = defineEmits<AjaxBarEmits>()

const { rootClasses } = useAjaxBarClasses(props)

const qAjaxBarRef = ref<InstanceType<typeof QAjaxBar> | null>(null)

// EXC-Expose-01: API imperativa exposta ao consumer para controle manual da barra.
// QAjaxBar gerencia o estado internamente; DssAjaxBar re-expõe os métodos públicos.
// Padrão idêntico a DssInfiniteScroll (EXC-Expose-01).
defineExpose({
  start: (speed?: number) => qAjaxBarRef.value?.start(speed),
  stop: () => qAjaxBarRef.value?.stop(),
  increment: (amount?: number) => qAjaxBarRef.value?.increment(amount),
  setProgress: (value: number) => qAjaxBarRef.value?.setProgress(value),
})
</script>

<template>
  <!--
    EXC-Gate-01: QAjaxBar como root element.
    QAjaxBar gerencia internamente: posicionamento fixed, animação de progresso,
    interceptação XHR/fetch (hijack), transições de visibilidade e role="progressbar".
    Duplicar esses mecanismos em wrapper div seria redundante e introduziria risco de
    posicionamento incorreto. Padrão consistente com DssInnerLoading (QInnerLoading root).

    EXC-Gate-02: color="primary" fixo + override de --q-color-primary via CSS.
    QAjaxBar usa background: var(--q-color-{color}). DSS não usa Quasar color names.
    Passamos color="primary" e sobrescrevemos --q-color-primary por brand context via CSS.
    Padrão idêntico ao DssPagination (--q-color-primary theming).

    v-bind="$attrs" antes do color explícito: em Vue 3, a binding explícita declarada
    DEPOIS do v-bind tem precedência para a mesma prop — garante que color="primary"
    sempre prevalece mesmo que consumer tente passar color via $attrs.
  -->
  <QAjaxBar
    ref="qAjaxBarRef"
    v-bind="$attrs"
    :class="rootClasses"
    :position="position"
    :size="size"
    :skip-hijack="skipHijack ?? false"
    :reverse="reverse ?? false"
    :hijack-filter="hijackFilter"
    color="primary"
    @start="emit('start')"
    @stop="emit('stop')"
  />
</template>
