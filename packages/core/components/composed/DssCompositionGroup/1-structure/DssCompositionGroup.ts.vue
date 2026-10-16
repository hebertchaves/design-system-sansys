<template>
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand || undefined"
  >
    <DssTabs
      :model-value="ativa ?? undefined"
      :aria-label="ariaLabel"
      :dense="dense"
      :brand="brand"
      align="left"
      @update:model-value="selecionar"
    >
      <DssTab
        v-for="colecao in colecoes"
        :key="colecao.name"
        :id="context.tabId(colecao.name)"
        :name="colecao.name"
        :label="rotuloVisivel(colecao)"
        :alert="colecao.invalid ? 'negative' : false"
        :aria-controls="context.panelId(colecao.name)"
        :aria-label="nomeAcessivel(colecao)"
      />
    </DssTabs>

    <!-- Painéis: as próprias DssComposition. TODAS ficam montadas; a inativa
         se esconde por v-show. Com DssTabPanels, a coleção de uma aba nunca
         aberta nem montaria — e sairia do DssForm (risco 5, provado no spike).
         Exceção declarada a "não reimplementar primitivo": o primitivo existe,
         mas montar sob demanda contradiz a decisão 3. -->
    <div class="dss-composition-group__panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCompositionGroup — várias coleções em abas, sem tirar nenhuma do form
 * ==========================================================================
 *
 * Migra o `JtCompositions`. Responsável por mostrar as coleções em abas, com
 * rótulo, contagem, obrigatoriedade e a aba marcada quando a coleção é
 * inválida. NÃO valida nada: cada DssComposition é um campo do DssForm mestre.
 */
import { computed, ref, watch } from 'vue'
import DssTabs from '../../../base/DssTabs/DssTabs.vue'
import DssTab from '../../../base/DssTab/DssTab.vue'
import type {
  DssCompositionGroupEmits,
  DssCompositionGroupItem,
  DssCompositionGroupProps,
  DssCompositionGroupSlots,
} from '../types/composition-group.types'
import { provideCompositionGroup, useCompositionGroupClasses } from '../composables'

defineOptions({ name: 'DssCompositionGroup', inheritAttrs: false })

const props = withDefaults(defineProps<DssCompositionGroupProps>(), {
  modelValue: null,
  ariaLabel: 'Coleções do cadastro',
  dense: true,
  brand: null,
})

const emit = defineEmits<DssCompositionGroupEmits>()
defineSlots<DssCompositionGroupSlots>()

const { rootClasses } = useCompositionGroupClasses()

const escolhida = ref<string | null>(props.modelValue)
watch(() => props.modelValue, (valor) => { escolhida.value = valor })

const ativaInterna = ref<string | null>(null)
const { context, colecoes } = provideCompositionGroup(ativaInterna)

// Aba ativa = a escolhida, se existir; senão a primeira coleção registrada.
const ativa = computed(() => {
  const nomes = colecoes.value.map((colecao) => colecao.name)
  if (escolhida.value && nomes.includes(escolhida.value)) return escolhida.value
  return nomes[0] ?? null
})
watch(ativa, (valor) => { ativaInterna.value = valor }, { immediate: true })

function selecionar(valor: string | number) {
  escolhida.value = String(valor)
  emit('update:modelValue', String(valor))
}

function rotuloVisivel(colecao: DssCompositionGroupItem) {
  return `${colecao.label}${colecao.required ? ' *' : ''} (${colecao.count})`
}

/**
 * O nome acessível COMEÇA pelo rótulo visível (WCAG 2.5.3) e diz o que o
 * visual só sugere: a contagem por extenso, a obrigatoriedade (o `*`) e o
 * erro (o `alert` é só um ponto colorido).
 */
function nomeAcessivel(colecao: DssCompositionGroupItem) {
  const partes = [colecao.label, `${colecao.count} ${colecao.count === 1 ? 'registro' : 'registros'}`]
  if (colecao.required) partes.push('obrigatória')
  if (colecao.invalid) partes.push('com erro')
  return partes.join(', ')
}
</script>

<style lang="scss" scoped>
@use '../DssCompositionGroup.module.scss';
</style>
