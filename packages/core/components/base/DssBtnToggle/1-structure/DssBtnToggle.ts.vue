<template>
  <!--
    SEM QBtnToggle.

    Até out/2026 a raiz deste componente ERA o `<q-btn-toggle>`, e os botões
    internos eram gerados pelo Quasar a partir da prop `options` — `q-btn`
    cru, fora da governança do DSS. O custo estava escrito no próprio arquivo:
    dois "gates pré-formalizados" (composição e responsabilidade) só para
    poder estilizar `.q-btn-item`, a classe interna de terceiro, e um bug de
    compilação que impedia repassar slots por opção.

    Agora cada opção é um `DssButton`. O grupo é `role="group"` e cada botão
    declara `aria-pressed` — que é o que a WAI-ARIA pede para alternância, e
    que o Quasar não emitia.
  -->
  <div
    v-bind="$attrs"
    :class="btnToggleClasses"
    role="group"
    :aria-label="ariaLabel || undefined"
  >
    <DssButton
      v-for="opcao in options"
      :key="String(opcao.value)"
      class="dss-btn-toggle__option"
      :class="{ 'dss-btn-toggle__option--selected': opcao.value === modelValue }"
      :label="opcao.label"
      :icon="opcao.icon"
      :icon-right="opcao.iconRight"
      :variant="peleDaOpcao(opcao)"
      :color="color || undefined"
      :disabled="disable || opcao.disable"
      :aria-pressed="opcao.value === modelValue ? 'true' : 'false'"
      v-bind="opcao.attrs"
      @click="selecionar(opcao)"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBtnToggle - Design System Sansys Button Toggle Component
 * ==========================================================================
 *
 * Container de seleção exclusiva que gerencia estado via v-model.
 * Agrupa botões que funcionam como radio buttons — apenas uma opção
 * pode estar ativa por vez (salvo uso de `clearable` para desmarcar).
 *
 * ARQUITETURA:
 * - Wrapper governado do QBtnToggle (Fase 2)
 * - Gerencia v-model de seleção
 * - Mapeia `variant` (string) para props booleanas do Quasar
 * - Touch target: delegado ao QBtnToggle interno (Opção B)
 * - Sem <style scoped>: necessário para seletores `.q-btn-item` (painel global)
 *
 * PRECEDENTE ARQUITETURAL:
 * - DssBtnGroup (irmão direto): mesma estrutura de container, gateExceptions
 * - DssBtnDropdown (sibling Fase 2): mesmo padrão de mapeamento de variante
 *
 * @see https://quasar.dev/vue-components/button-toggle
 *
 * @example
 * ```vue
 * <DssBtnToggle
 *   v-model="alinhamento"
 *   :options="[
 *     { label: 'Esquerda', value: 'left' },
 *     { label: 'Centro', value: 'center' },
 *     { label: 'Direita', value: 'right' },
 *   ]"
 *   variant="outline"
 *   aria-label="Alinhamento de texto"
 * />
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { BtnToggleProps, BtnToggleEmits, BtnToggleOption } from '../types/btn-toggle.types'
import DssButton from '../../DssButton/DssButton.vue'
import { useBtnToggleClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssBtnToggle',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<BtnToggleProps>(), {
  // Valor do v-model — sem default (undefined = nenhuma seleção)
  modelValue: undefined,

  // Variante visual
  variant: 'elevated',

  // Cores — primary como default (DSS Visual Standard: cor principal de ação)
  color: 'primary',
  toggleColor: 'primary',
  textColor: undefined,
  toggleTextColor: undefined,

  // Forma
  rounded: false,
  square: false,

  // Layout
  spread: false,
  stretch: false,

  // Interação
  disable: false,
  readonly: false,
  clearable: false,

  // Brand
  brand: null,

  // Acessibilidade
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<BtnToggleEmits>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

// `variantProps` (mapa variante → props booleanas do Quasar) saiu junto com
// o QBtnToggle: a pele de cada opção agora é decidida em `peleDaOpcao`.
const { btnToggleClasses } = useBtnToggleClasses(props)

/**
 * Pele de cada opção.
 *
 * A SELECIONADA é sempre preenchida (`unelevated`): o estado precisa de cor,
 * não só de borda ou sombra. As demais seguem a variante pedida — foi a mesma
 * correção aplicada ao DssPagination, onde ativo e inativo saíam idênticos e
 * a diferença vivia na sombra.
 */
function peleDaOpcao(opcao: BtnToggleOption) {
  if (opcao.value === props.modelValue) return 'unelevated'
  return props.variant === 'outline' ? 'outline' : 'flat'
}

function selecionar(opcao: BtnToggleOption) {
  if (props.disable || props.readonly || opcao.disable) return
  // `clearable` permite desmarcar clicando na opção já ativa.
  const proximo = opcao.value === props.modelValue && props.clearable ? null : opcao.value
  if (proximo !== props.modelValue) emit('update:modelValue', proximo)
}
</script>
