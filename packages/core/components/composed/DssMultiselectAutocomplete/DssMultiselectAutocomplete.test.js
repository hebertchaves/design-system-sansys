/**
 * DssMultiselectAutocomplete — smoke test (Incremento 1)
 *
 * Cobre: montagem, composição (DssSelect/QSelect como base), chips removíveis
 * por valor selecionado, e o contrato de remoção (update:modelValue + remove).
 * O comportamento "selecionado sobe ao topo" (Incremento 2) ainda não existe.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssMultiselectAutocomplete from './1-structure/DssMultiselectAutocomplete.ts.vue'
import DssChip from '../../base/DssChip/DssChip.vue'

// QSelect (base do DssSelect) usa useVirtualScroll → exige Quasar instalado.
installQuasar()

const options = ['Maçã', 'Banana', 'Cereja']

describe('DssMultiselectAutocomplete', () => {
  it('monta e compõe um campo de seleção (DssSelect/QSelect como base)', () => {
    const w = mount(DssMultiselectAutocomplete, {
      props: { options, modelValue: [] },
    })
    expect(w.find('.dss-multiselect-autocomplete').exists()).toBe(true)
    expect(w.find('.q-select').exists()).toBe(true)
  })

  it('renderiza um DssChip removível por valor selecionado', () => {
    const w = mount(DssMultiselectAutocomplete, {
      props: { options, modelValue: ['Banana', 'Cereja'] },
    })
    const chips = w.findAllComponents(DssChip)
    expect(chips.length).toBe(2)
    expect(w.text()).toContain('Banana')
  })

  it('remover um chip emite update:modelValue (sem o valor) e remove', async () => {
    const w = mount(DssMultiselectAutocomplete, {
      props: { options, modelValue: ['Banana', 'Cereja'] },
    })
    // Simula o clique no × do primeiro chip (Banana)
    await w.findAllComponents(DssChip)[0].vm.$emit('remove')
    expect(w.emitted('update:modelValue')?.[0]?.[0]).toEqual(['Cereja'])
    expect(w.emitted('remove')?.[0]).toEqual(['Banana'])
  })

  it('respeita chipsRemovable=false (chips não removíveis)', () => {
    const w = mount(DssMultiselectAutocomplete, {
      props: { options, modelValue: ['Banana'], chipsRemovable: false },
    })
    expect(w.findAllComponents(DssChip)[0].props('removable')).toBe(false)
  })
})
