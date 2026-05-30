<script setup lang="ts">
/**
 * DssImg — Implementação Canônica
 *
 * Wrapper DSS governado sobre QImg do Quasar.
 * Golden Reference: DssBadge (componente não interativo — padrão de governança).
 * Golden Context:   DssInfiniteScroll (container comportamental não interativo,
 *                   Família Scroll e Visualização, mesmo nível arquitetural).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados ao
 *   QImg via v-bind="$attrs". QImg é o root element efetivo.
 *   Atributos Quasar avançados não declarados em Props (ex: img-class, img-style,
 *   srcset, sizes, no-native-menu) também fluem por $attrs — funcionalidade
 *   avançada disponível sem expor na API DSS.
 *
 * QImg como root element (EXC-Gate-01):
 *   QImg é o root element do DssImg. Sem div wrapper intermediário.
 *   Justificativa: evita DOM desnecessário, preserva overflow:hidden nativo
 *   do QImg (necessário para border-radius clip correto) e o aspect ratio
 *   padding trick do QImg.
 *
 * alt + decorative:
 *   `alt` é obrigatório para imagens não-decorativas (WCAG 1.1.1 — Nível A).
 *   Para imagens puramente decorativas, use `decorative=true` — isso define
 *   alt="" automaticamente, instruindo leitores de tela a ignorar a imagem.
 *   Em dev mode, uma advertência é emitida se nenhum dos dois for fornecido.
 *
 * Slots loading/error:
 *   Slot #loading: exibido pelo QImg enquanto a imagem carrega. Default: DssSpinner.
 *   Slot #error: exibido quando src falha E fallbackSrc não está disponível.
 *   Default: ícone broken_image via DssIcon.
 *   Ambos têm aria-hidden="true" — o feedback acessível é o alt text do <img>.
 *
 * overflow: hidden:
 *   QImg aplica overflow:hidden internamente via classe Quasar.
 *   Nosso CSS de border-radius funciona corretamente sem redeclarar overflow.
 *
 * Props bloqueadas (não expostas ao consumidor):
 *   - spinner-color, spinner-size, no-spinner: gerenciados internamente via DssSpinner.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, focus, active: imagens não são interativas.
 *   - disabled: sem semântica de disable em elementos de mídia.
 *   - error: gerenciado internamente pelo QImg + slot #error + evento @error.
 */

import { computed } from 'vue'
import { QImg } from 'quasar'
import DssSpinner from '../../DssSpinner/DssSpinner.vue'
import DssIcon from '../../DssIcon/DssIcon.vue'
import type { DssImgProps, DssImgEmits } from '../types/img.types'
import { useImgClasses } from '../composables/useImgClasses'

defineOptions({ name: 'DssImg', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssImgProps>(), {
  fit:     'cover',
  loading: 'lazy',
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<DssImgEmits>()

// ─── Acessibilidade: alt computado ────────────────────────────────────────────
//
// Se `decorative` for true → alt="" (screen readers ignoram o elemento).
// Caso contrário, usa o valor de `alt` (pode ser string vazia se intencional).
// Em desenvolvimento, adverte se nenhuma das duas opções for fornecida.

const computedAlt = computed<string>(() => {
  if (props.decorative === true) return ''
  if (props.alt !== undefined) return props.alt
  if (import.meta.env?.DEV) {
    console.warn(
      '[DssImg] O prop `alt` é obrigatório para imagens não-decorativas (WCAG 1.1.1).\n' +
      'Use `:decorative="true"` para imagens puramente decorativas.',
    )
  }
  return ''
})

// ─── Classes ──────────────────────────────────────────────────────────────────

const { rootClasses } = useImgClasses(props)

// ─── Handlers ─────────────────────────────────────────────────────────────────

function onLoad() {
  emit('load')
}

function onError() {
  emit('error')
}
</script>

<template>
  <!--
    QImg é o root element do DssImg.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-*, srcset, sizes,
    img-class, img-style e outros atributos Quasar avançados.
    :class="rootClasses": aplica dss-img + modificadores de radius.

    Não há div wrapper — QImg já renderiza como <div> e aplica overflow:hidden
    internamente. Os slots #loading e #error são mapeados para o slot DSS.
  -->
  <q-img
    v-bind="$attrs"
    :class="rootClasses"
    :src="src"
    :alt="computedAlt"
    :ratio="ratio"
    :fit="fit"
    :loading="loading"
    :error-src="fallbackSrc ?? undefined"
    :placeholder-src="placeholderSrc ?? undefined"
    :position="position"
    :no-transition="noTransition"
    @load="onLoad"
    @error="onError"
  >
    <!--
      Slot default: overlay sobre a imagem carregada.
      Renderizado pelo QImg como camada acima do <img>.
    -->
    <slot />

    <!--
      Slot #loading do QImg: exibido enquanto a imagem carrega.
      O DssSpinner é decorativo — o feedback acessível é o alt do <img>.
    -->
    <template #loading>
      <slot name="loading">
        <div class="dss-img__loading" aria-hidden="true">
          <dss-spinner size="sm" />
        </div>
      </slot>
    </template>

    <!--
      Slot #error do QImg: exibido quando src falha e fallbackSrc não resolve.
      O ícone broken_image é decorativo — o alt do <img> comunica o erro
      para leitores de tela.
    -->
    <template #error>
      <slot name="error">
        <div class="dss-img__error" aria-hidden="true">
          <dss-icon name="broken_image" />
        </div>
      </slot>
    </template>
  </q-img>
</template>
