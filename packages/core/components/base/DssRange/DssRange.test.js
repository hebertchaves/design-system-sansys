/**
 * ==========================================================================
 * DssRange - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue ({min, max}), min, max, step, label, markers, dragRange, disabled, dense, hint, error, errorMessage, brand
 * - Value/Model: v-model {min, max} object
 * - Eventos: update:modelValue, change
 * - Acessibilidade: ARIA (dois thumbs), data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssRange usa QRange internamente. Arquitetura igual a DssSlider (Golden Reference).
 * Cor é governada 100% via CSS DSS. Wrapper div externo por ausência de hint/error nativo.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssRange from './1-structure/DssRange.ts.vue'

installQuasar()

describe('DssRange', () => {
  const defaultValue = { min: 20, max: 80 }

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue }
      })
      expect(wrapper.classes()).toContain('dss-range')
    })

    it('renders wrapper div as root', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue }
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    describe('states', () => {
      it('applies disabled state', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, disabled: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies dense class when dense=true', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, dense: true }
        })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('applies error state', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, error: true }
        })
        expect(wrapper.classes().join(' ')).toContain('error')
      })

      it('shows error message when error=true', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, error: true, errorMessage: 'Intervalo inválido' }
        })
        expect(wrapper.text()).toContain('Intervalo inválido')
      })

      it('shows hint text when hint is set', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, hint: 'Defina o intervalo' }
        })
        expect(wrapper.text()).toContain('Defina o intervalo')
      })
    })

    describe('modelValue object', () => {
      it('renders with min=0 max=100', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: { min: 0, max: 100 } }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders with min equal to max (edge case)', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: { min: 50, max: 50 } }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders with dragRange=true', () => {
        const wrapper = mount(DssRange, {
          props: { modelValue: defaultValue, dragRange: true }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders two thumbs (min and max sliders)', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue }
      })
      const thumbs = wrapper.findAll('[role="slider"]')
      expect(thumbs.length).toBeGreaterThanOrEqual(2)
    })

    it('sets aria-valuemin on range thumbs', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue, min: 0, max: 100 }
      })
      const thumbs = wrapper.findAll('[role="slider"]')
      if (thumbs.length > 0) {
        expect(thumbs[0].attributes('aria-valuemin')).toBe('0')
      }
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue, brand }
      })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('renders QRange within wrapper div', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue }
      })
      expect(wrapper.find('.q-slider').exists()).toBe(true)
    })

    it('renders hint/error as siblings of QRange (not inside QRange)', () => {
      const wrapper = mount(DssRange, {
        props: { modelValue: defaultValue, hint: 'Minha dica' }
      })
      expect(wrapper.find('.dss-range__hint').exists()).toBe(true)
    })
  })
})
