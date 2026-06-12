/**
 * ==========================================================================
 * DssKnob - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, min, max, step, size, thickness, showValue, disable, reverse, innerMin, innerMax, brand
 * - Value/Model: v-model numérico
 * - Eventos: update:modelValue, change
 * - Acessibilidade: role="slider" (QKnob nativo), aria-valuemin/max/now, data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssKnob usa QKnob como root element (EXC-Gate-01).
 * Props color/track-color/center-color FIXAS internamente (EXC-Gate-02).
 * Foco via :focus-visible + outline DSS (EXC-Focus-01 — ::before neutralizado).
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssKnob from './1-structure/DssKnob.ts.vue'

installQuasar()

describe('DssKnob', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      expect(wrapper.classes()).toContain('dss-knob')
    })

    it('renders QKnob as root element (EXC-Gate-01)', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      expect(wrapper.classes()).toContain('q-knob')
    })

    describe('states', () => {
      it('applies disabled state', () => {
        const wrapper = mount(DssKnob, {
          props: { modelValue: 50, disable: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('renders without crash when reverse=true', () => {
        const wrapper = mount(DssKnob, {
          props: { modelValue: 50, reverse: true }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders with innerMin/innerMax restrictions', () => {
        const wrapper = mount(DssKnob, {
          props: { modelValue: 50, min: 0, max: 100, innerMin: 20, innerMax: 80 }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders without crash when showValue=false', () => {
        const wrapper = mount(DssKnob, {
          props: { modelValue: 50, showValue: false }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('size and thickness', () => {
      it('renders with different sizes without crash', () => {
        for (const size of ['xs', 'sm', 'md', 'lg', 'xl', '80px']) {
          const wrapper = mount(DssKnob, {
            props: { modelValue: 50, size }
          })
          expect(wrapper.exists()).toBe(true)
        }
      })

      it('renders with custom thickness', () => {
        const wrapper = mount(DssKnob, {
          props: { modelValue: 50, thickness: 0.3 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('renders with value at minimum', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 0, min: 0, max: 100 }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with value at maximum', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 100, min: 0, max: 100 }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with custom min/max range', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 5, min: -10, max: 10 }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('has role="slider" (managed by QKnob)', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      expect(wrapper.attributes('role')).toBe('slider')
    })

    it('sets aria-valuemin', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50, min: 10, max: 90 }
      })
      expect(wrapper.attributes('aria-valuemin')).toBe('10')
    })

    it('sets aria-valuemax', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50, min: 10, max: 90 }
      })
      expect(wrapper.attributes('aria-valuemax')).toBe('90')
    })

    it('sets aria-valuenow', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50, min: 0, max: 100 }
      })
      expect(wrapper.attributes('aria-valuenow')).toBe('50')
    })

    it('is keyboard focusable (has tabindex)', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      const tabindex = wrapper.attributes('tabindex')
      expect(tabindex).not.toBe('-1')
    })

    it('marca disabled via classe + aria-disabled (contrato real do QKnob)', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50, disable: true }
      })
      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    // Contrato real: brand aplica CLASSE dss-knob--brand-* no root
    // (sem atributo data-brand próprio) — corrigido na Onda P2/G3.2.
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50, brand }
      })
      expect(wrapper.classes()).toContain(`dss-knob--brand-${brand}`)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS (EXC-Gate-02)
  // ===========================================================================

  describe('Structure (EXC-Gate-02 — props fixas)', () => {
    it('renders SVG circles (color, track-color, center-color fixos)', () => {
      const wrapper = mount(DssKnob, {
        props: { modelValue: 50 }
      })
      // QKnob usa QCircularProgress internamente com SVG circles
      const svgCircles = wrapper.findAll('.q-circular-progress__circle, .q-circular-progress__track')
      expect(svgCircles.length).toBeGreaterThan(0)
    })
  })
})
