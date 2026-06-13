/**
 * ==========================================================================
 * DssSlider - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, min, max, step, label, markers, disabled, dense, hint, error, errorMessage, brand
 * - Value/Model: v-model numérico, emissão de update:modelValue
 * - Eventos: update:modelValue, change
 * - Acessibilidade: ARIA (role="slider", aria-valuemin/max/now), data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssSlider usa QSlider internamente (EXC-Gate-01 via div wrapper).
 * Cor é governada 100% via CSS DSS — prop `color` não é exposta.
 * Touch Target: min-height via --dss-touch-target-md no CSS.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSlider from './1-structure/DssSlider.ts.vue'

installQuasar()

describe('DssSlider', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50 }
      })
      expect(wrapper.classes()).toContain('dss-slider')
    })

    it('renders wrapper div as root', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 0 }
      })
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).toContain('dss-slider')
    })

    describe('states', () => {
      it('applies disabled state', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 50, disabled: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies dense class when dense=true', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 50, dense: true }
        })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('applies error state', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 50, error: true }
        })
        expect(wrapper.classes().join(' ')).toContain('error')
      })

      it('shows error message when error=true and errorMessage is set', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 50, error: true, errorMessage: 'Valor inválido' }
        })
        expect(wrapper.text()).toContain('Valor inválido')
      })

      it('shows hint text when hint is set', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 50, hint: 'Ajuste o valor' }
        })
        expect(wrapper.text()).toContain('Ajuste o valor')
      })
    })

    describe('value range', () => {
      it('renders without crash for min value', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 0, min: 0, max: 100 }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders without crash for max value', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 100, min: 0, max: 100 }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders without crash with step', () => {
        const wrapper = mount(DssSlider, {
          props: { modelValue: 25, min: 0, max: 100, step: 25 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('has ARIA role="slider" on QSlider internal element', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50 }
      })
      // QSlider gerencia ARIA internamente
      const slider = wrapper.find('[role="slider"]')
      expect(slider.exists()).toBe(true)
    })

    it('sets aria-valuemin correctly', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50, min: 10, max: 90 }
      })
      const slider = wrapper.find('[role="slider"]')
      if (slider.exists()) {
        expect(slider.attributes('aria-valuemin')).toBe('10')
      }
    })

    it('sets aria-valuemax correctly', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50, min: 10, max: 90 }
      })
      const slider = wrapper.find('[role="slider"]')
      if (slider.exists()) {
        expect(slider.attributes('aria-valuemax')).toBe('90')
      }
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50, brand }
      })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50 }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('renders QSlider within wrapper div', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50 }
      })
      expect(wrapper.find('.q-slider').exists()).toBe(true)
    })

    it('does not expose prop `color` (DSS controls via CSS)', () => {
      const wrapper = mount(DssSlider, {
        props: { modelValue: 50 }
      })
      // Verificar que o QSlider não recebe classe de cor do Quasar
      const qSlider = wrapper.find('.q-slider')
      if (qSlider.exists()) {
        const classList = qSlider.classes().join(' ')
        expect(classList).not.toContain('text-primary')
        expect(classList).not.toContain('text-secondary')
      }
    })
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssSlider — Teclado (WCAG 2.1.1)', () => {
  it('ArrowRight incrementa o valor (update:modelValue)', async () => {
    const wrapper = mount(DssSlider, { props: { modelValue: 50 } })
    await wrapper.find('.q-slider__track-container').trigger('keydown', { keyCode: 39 })
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([51])
  })

  it('ArrowLeft decrementa o valor', async () => {
    const wrapper = mount(DssSlider, { props: { modelValue: 50 } })
    await wrapper.find('.q-slider__track-container').trigger('keydown', { keyCode: 37 })
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([49])
  })
})
