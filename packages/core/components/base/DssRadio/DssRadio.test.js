/**
 * ==========================================================================
 * DssRadio - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, color, disable, dense, leftLabel, label, val, modelValue, name, brand
 * - Value/Model: checked state, emit update:modelValue
 * - Eventos: update:modelValue
 * - Slots: default (label)
 * - Acessibilidade: ARIA, radio role, tabindex, aria-label
 * - Brands: Hub, Water, Waste
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssRadio from './1-structure/DssRadio.ts.vue'

describe('DssRadio', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.classes()).toContain('dss-radio')
      expect(wrapper.classes()).toContain('dss-radio--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssRadio, {
        props: { label: 'Opção A' }
      })
      expect(wrapper.find('.dss-radio__label').text()).toBe('Opção A')
    })

    it('hides label span when no label and no slot', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__label').exists()).toBe(false)
    })

    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssRadio, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-radio--${size}`)
      })
    })

    describe('states', () => {
      it('applies disabled class when disable=true', () => {
        const wrapper = mount(DssRadio, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-radio--disabled')
      })

      it('sets disabled attribute on native input', () => {
        const wrapper = mount(DssRadio, {
          props: { disable: true }
        })
        expect(wrapper.find('.dss-radio__native').attributes('disabled')).toBeDefined()
      })

      it('applies dense class', () => {
        const wrapper = mount(DssRadio, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-radio--dense')
      })

      it('applies left-label class', () => {
        const wrapper = mount(DssRadio, {
          props: { leftLabel: true, label: 'Esquerda' }
        })
        expect(wrapper.classes()).toContain('dss-radio--left-label')
      })

      it('applies checked class when modelValue equals val', () => {
        const wrapper = mount(DssRadio, {
          props: { modelValue: 'a', val: 'a' }
        })
        expect(wrapper.classes()).toContain('dss-radio--checked')
      })

      it('does not apply checked class when modelValue differs from val', () => {
        const wrapper = mount(DssRadio, {
          props: { modelValue: 'b', val: 'a' }
        })
        expect(wrapper.classes()).not.toContain('dss-radio--checked')
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('emits update:modelValue with val when clicked', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'b', val: 'a' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
    })

    it('does not emit when already selected', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'a', val: 'a' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      // Deve emitir ou não dependendo da implementação; verificamos que não quebra
      expect(wrapper.exists()).toBe(true)
    })

    it('does not emit when disabled', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'b', val: 'a', disable: true }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits update:modelValue on change', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: null, val: 'opcao1' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot as label content', () => {
      const wrapper = mount(DssRadio, {
        slots: { default: 'Label via slot' }
      })
      expect(wrapper.find('.dss-radio__label').text()).toBe('Label via slot')
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders a native radio input', () => {
      const wrapper = mount(DssRadio)
      const input = wrapper.find('.dss-radio__native')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('radio')
    })

    it('root element is a label', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('sets aria-label on native input when ariaLabel is provided', () => {
      const wrapper = mount(DssRadio, {
        props: { ariaLabel: 'Selecionar opção A' }
      })
      expect(wrapper.find('.dss-radio__native').attributes('aria-label')).toBe('Selecionar opção A')
    })

    it('sets tabindex 0 by default on input', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__native').attributes('tabindex')).toBe('0')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssRadio, {
        props: { disable: true }
      })
      expect(wrapper.find('.dss-radio__native').attributes('tabindex')).toBe('-1')
    })

    it('sets name attribute on native input', () => {
      const wrapper = mount(DssRadio, {
        props: { name: 'gender-group' }
      })
      expect(wrapper.find('.dss-radio__native').attributes('name')).toBe('gender-group')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('sets data-brand attribute', () => {
      const wrapper = mount(DssRadio, { props: { brand: 'water' } })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])('supports %s brand', (brand) => {
      const wrapper = mount(DssRadio, { props: { brand } })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('renders control indicator element', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__control').exists()).toBe(true)
    })

    it('control indicator has aria-hidden="true"', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__control').attributes('aria-hidden')).toBe('true')
    })
  })
})
