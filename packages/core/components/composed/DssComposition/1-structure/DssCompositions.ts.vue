<template>
  <div class="dss-compositions" :data-brand="brand || undefined" v-bind="$attrs">
    <DssTabs :model-value="current" :aria-label="ariaLabel" align="left" dense @update:model-value="select">
      <DssTab
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
        :label="tabLabel(item)"
        :alert="item.invalid ? 'negative' : false"
      />
    </DssTabs>
    <DssSeparator />
    <DssTabPanels :model-value="current" keep-alive>
      <DssTabPanel v-for="item in items" :key="item.name" :name="item.name">
        <slot :name="item.name" :item="item" />
      </DssTabPanel>
    </DssTabPanels>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import DssTabs from '../../../base/DssTabs/DssTabs.vue'
import DssTab from '../../../base/DssTab/DssTab.vue'
import DssTabPanels from '../../../base/DssTabPanels/DssTabPanels.vue'
import DssTabPanel from '../../../base/DssTabPanel/DssTabPanel.vue'
import DssSeparator from '../../../base/DssSeparator/DssSeparator.vue'
import type { DssCompositionsItem, DssCompositionsProps } from '../types/composition.types'

defineOptions({ name: 'DssCompositions', inheritAttrs: false })

const props = withDefaults(defineProps<DssCompositionsProps>(), {
  modelValue: undefined,
  ariaLabel: 'Composições',
  brand: null,
})
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const local = ref(props.modelValue ?? props.items[0]?.name ?? '')
watch(() => props.modelValue, v => { if (v) local.value = v })
const current = computed(() => local.value)

function select(value: string | number) {
  local.value = String(value)
  emit('update:modelValue', String(value))
}
function tabLabel(item: DssCompositionsItem) {
  return `${item.label}${item.required ? ' *' : ''}${typeof item.count === 'number' ? ` (${item.count})` : ''}`
}
</script>

<style lang="scss" scoped>
@use '../DssComposition.module.scss';
</style>
