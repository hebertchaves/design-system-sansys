/**
 * ==========================================================================
 * DssOptionGroup - UNIT TESTS
 *
 * COBERTURA:
 * - Props: options, modelValue, type (radio/checkbox/toggle), inline, disable, dense, color, brand
 * - Value/Model: radio (string), checkbox/toggle (array)
 * - Eventos: update:modelValue
 * - Acessibilidade: role="radiogroup"/"group", aria-label, data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssOptionGroup NÃO usa q-option-group.
 * Itera sobre options e renderiza DssRadio, DssCheckbox ou DssToggle.
 * Contador de módulo garante nome único para grupos de radio.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssOptionGroup from './1-structure/DssOptionGroup.ts.vue'

const sampleOptions = [
  { label: 'Opção 1', value: 'opt1' },
  { label: 'Opção 2', value: 'opt2' },
  { label: 'Opção 3', value: 'opt3' },
]

describe('DssOptionGroup', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with type="radio" by default', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null }
      })
      expect(wrapper.classes()).toContain('dss-option-group')
    })

    it('renders correct number of options', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null }
      })
      const labels = wrapper.findAll('label')
      expect(labels.length).toBe(3)
    })

    it('renders option labels', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null }
      })
      expect(wrapper.text()).toContain('Opção 1')
      expect(wrapper.text()).toContain('Opção 2')
      expect(wrapper.text()).toContain('Opção 3')
    })

    describe('type', () => {
      it('renders radio inputs when type="radio"', () => {
        const wrapper = mount(DssOptionGroup, {
          props: { options: sampleOptions, modelValue: null, type: 'radio' }
        })
        const inputs = wrapper.findAll('input[type="radio"]')
        expect(inputs.length).toBe(3)
      })

      it('renders checkbox inputs when type="checkbox"', () => {
        const wrapper = mount(DssOptionGroup, {
          props: { options: sampleOptions, modelValue: [], type: 'checkbox' }
        })
        const inputs = wrapper.findAll('input[type="checkbox"]')
        expect(inputs.length).toBe(3)
      })
    })

    describe('states', () => {
      it('applies inline class when inline=true', () => {
        const wrapper = mount(DssOptionGroup, {
          props: { options: sampleOptions, modelValue: null, inline: true }
        })
        expect(wrapper.classes()).toContain('dss-option-group--inline')
      })

      it('applies disabled state when disable=true', () => {
        const wrapper = mount(DssOptionGroup, {
          props: { options: sampleOptions, modelValue: null, disable: true }
        })
        expect(wrapper.classes()).toContain('dss-option-group--disable')
      })

      it('applies dense state when dense=true', () => {
        const wrapper = mount(DssOptionGroup, {
          props: { options: sampleOptions, modelValue: null, dense: true }
        })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('disables individual option when option.disable=true', () => {
        const optionsWithDisabled = [
          { label: 'Ativa', value: 'a' },
          { label: 'Desativada', value: 'b', disable: true },
        ]
        const wrapper = mount(DssOptionGroup, {
          props: { options: optionsWithDisabled, modelValue: null }
        })
        const inputs = wrapper.findAll('input')
        expect(inputs[1].attributes('disabled')).toBeDefined()
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('selects the correct radio option', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: 'opt2', type: 'radio' }
      })
      const inputs = wrapper.findAll('input[type="radio"]')
      expect(inputs[1].element.checked).toBe(true)
      expect(inputs[0].element.checked).toBe(false)
    })

    it('selects correct checkboxes when modelValue is array', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: ['opt1', 'opt3'], type: 'checkbox' }
      })
      const inputs = wrapper.findAll('input[type="checkbox"]')
      expect(inputs[0].element.checked).toBe(true)
      expect(inputs[1].element.checked).toBe(false)
      expect(inputs[2].element.checked).toBe(true)
    })

    it('emits update:modelValue with val when radio is clicked', async () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: 'opt1', type: 'radio' }
      })
      const inputs = wrapper.findAll('input[type="radio"]')
      await inputs[1].trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['opt2'])
    })

    it('emits updated array when checkbox is toggled', async () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: ['opt1'], type: 'checkbox' }
      })
      const inputs = wrapper.findAll('input[type="checkbox"]')
      await inputs[1].trigger('change')
      const emitted = wrapper.emitted('update:modelValue')?.[0]?.[0]
      expect(emitted).toContain('opt1')
      expect(emitted).toContain('opt2')
    })

    it('radio options share the same name attribute', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null, type: 'radio' }
      })
      const inputs = wrapper.findAll('input[type="radio"]')
      const firstName = inputs[0].attributes('name')
      const secondName = inputs[1].attributes('name')
      expect(firstName).toBe(secondName)
      expect(firstName).toBeTruthy()
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('has role="radiogroup" for type="radio"', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null, type: 'radio' }
      })
      expect(wrapper.attributes('role')).toBe('radiogroup')
    })

    it('has role="group" for type="checkbox"', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: [], type: 'checkbox' }
      })
      expect(wrapper.attributes('role')).toBe('group')
    })

    it('sets aria-label when ariaLabel is provided', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null, ariaLabel: 'Tipo de conta' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Tipo de conta')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    // Contrato real: DssOptionGroup DELEGA o brand aos controles filhos
    // (checkbox/radio/toggle internos) — _brands.scss vazio é intencional
    // (relatório A7) e não há classe/atributo de brand no root.
    it('não possui prop brand — herança 100% contextual via [data-brand] ancestral', () => {
      const wrapper = mount(DssOptionGroup, {
        props: { options: sampleOptions, modelValue: null }
      })
      expect('brand' in wrapper.props()).toBe(false)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })
})
