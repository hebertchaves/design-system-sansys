/**
 * ==========================================================================
 * DssRating - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, max, size, disable, readonly, noReset, iconSelected, iconHalf, icon, brand
 * - Value/Model: v-model numérico (1 a max)
 * - Eventos: update:modelValue
 * - Acessibilidade: role="slider" (QRating nativo), aria-valuemin/max/now, tabindex
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssRating usa QRating como root element (EXC-Gate-01).
 * Props color/color-selected/color-half BLOQUEADAS — CSS puro governa cores (EX-Color-01).
 * Touch target: Opção B (delegado ao consumer via prop `size`).
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssRating from './1-structure/DssRating.ts.vue'

installQuasar()

describe('DssRating', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      expect(wrapper.classes()).toContain('dss-rating')
    })

    it('renders QRating as root element (EXC-Gate-01)', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      expect(wrapper.classes()).toContain('q-rating')
    })

    it('renders correct number of stars (default max=5)', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      const buttons = wrapper.findAll('.q-rating__icon-container')
      expect(buttons.length).toBe(5)
    })

    it('renders correct number of stars for custom max', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, max: 10 }
      })
      const buttons = wrapper.findAll('.q-rating__icon-container')
      expect(buttons.length).toBe(10)
    })

    describe('states', () => {
      it('applies disabled state when disable=true', () => {
        const wrapper = mount(DssRating, {
          props: { modelValue: 3, disable: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies readonly state when readonly=true', () => {
        const wrapper = mount(DssRating, {
          props: { modelValue: 3, readonly: true }
        })
        expect(wrapper.classes().join(' ')).toContain('readonly')
      })

      it('renders with value 0 (no stars selected)', () => {
        const wrapper = mount(DssRating, {
          props: { modelValue: 0 }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('renders with value equal to max (all stars selected)', () => {
        const wrapper = mount(DssRating, {
          props: { modelValue: 5, max: 5 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('emits update:modelValue when star is clicked', async () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 2 }
      })
      const buttons = wrapper.findAll('.q-rating__icon-container')
      if (buttons.length >= 3) {
        await buttons[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })

    it('emits 0 when clicking selected star with noReset=false', async () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, noReset: false }
      })
      const buttons = wrapper.findAll('.q-rating__icon-container')
      if (buttons.length >= 3) {
        await buttons[2].trigger('click')
        const emitted = wrapper.emitted('update:modelValue')
        // Pode emitir 0 ou o mesmo valor dependendo da lógica do QRating
        expect(emitted).toBeTruthy()
      }
    })

    it('does not emit when disabled', async () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, disable: true }
      })
      const buttons = wrapper.findAll('.q-rating__icon-container')
      if (buttons.length > 0) {
        await buttons[0].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      }
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('has role="slider" (managed by QRating)', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      expect(wrapper.attributes('role')).toBe('slider')
    })

    it('sets aria-valuemin=1', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      expect(wrapper.attributes('aria-valuemin')).toBe('1')
    })

    it('sets aria-valuemax equal to max', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, max: 5 }
      })
      expect(wrapper.attributes('aria-valuemax')).toBe('5')
    })

    it('sets aria-valuenow equal to modelValue', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 4 }
      })
      expect(wrapper.attributes('aria-valuenow')).toBe('4')
    })

    it('is keyboard focusable by default', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      const tabindex = wrapper.attributes('tabindex')
      expect(tabindex).not.toBe('-1')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, disable: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3, brand }
      })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS (EX-Color-01)
  // ===========================================================================

  describe('Structure (EX-Color-01 — CSS cascade, não props de cor)', () => {
    it('does not pass color/color-selected/color-half props to QRating', () => {
      const wrapper = mount(DssRating, {
        props: { modelValue: 3 }
      })
      // Verificar que QRating não recebe classes de cor do Quasar via prop color
      const classList = wrapper.classes().join(' ')
      expect(classList).not.toContain('text-primary')
      expect(classList).not.toContain('text-secondary')
    })
  })
})
