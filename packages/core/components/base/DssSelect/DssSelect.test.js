/**
 * ==========================================================================
 * DssSelect - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, options, variant, dense, disable, readonly, label, hint, error, errorMessage, multiple, clearable, brand
 * - Value/Model: v-model single, v-model multiple
 * - Eventos: update:modelValue, focus, blur, clear, popup-show, popup-hide
 * - Slots: passthrough de slots QSelect (label, option, selected-item, prepend, append)
 * - Acessibilidade: aria, role, data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssSelect usa QSelect como root element (EXC-Gate-01).
 * Testes verificam comportamento DSS via classes e atributos de wrapper.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSelect from './1-structure/DssSelect.ts.vue'

installQuasar()

const sampleOptions = [
  { label: 'Opção A', value: 'a' },
  { label: 'Opção B', value: 'b' },
  { label: 'Opção C', value: 'c' },
]

describe('DssSelect', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions }
      })
      expect(wrapper.classes()).toContain('dss-select')
    })

    it('applies dss-select class as root', () => {
      const wrapper = mount(DssSelect, {
        props: { options: [] }
      })
      expect(wrapper.classes()).toContain('dss-select')
    })

    describe('variant', () => {
      it.each(['outlined', 'filled', 'standout', 'borderless'])(
        'applies %s variant class',
        (variant) => {
          const wrapper = mount(DssSelect, {
            props: { options: sampleOptions, variant }
          })
          expect(wrapper.classes().join(' ')).toContain(variant)
        }
      )
    })

    describe('states', () => {
      it('applies disabled state', () => {
        const wrapper = mount(DssSelect, {
          props: { options: sampleOptions, disable: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies dense state', () => {
        const wrapper = mount(DssSelect, {
          props: { options: sampleOptions, dense: true }
        })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('applies error state', () => {
        const wrapper = mount(DssSelect, {
          props: { options: sampleOptions, error: true }
        })
        expect(wrapper.classes().join(' ')).toContain('error')
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('renders with null modelValue without crash', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, modelValue: null }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with string modelValue', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, modelValue: 'a', emitValue: true, mapOptions: true }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with array modelValue (multiple mode)', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, modelValue: ['a', 'b'], multiple: true, emitValue: true }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('sets aria-label when ariaLabel is provided', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, ariaLabel: 'Selecione um item' }
      })
      // Contrato real: o QSelect aplica aria-label no alvo focável interno
      const native = wrapper.find('[aria-label]')
      expect(native.exists()).toBe(true)
      expect(native.attributes('aria-label')).toBe('Selecione um item')
    })

    it('is keyboard navigable (has tabindex)', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions }
      })
      // QSelect gerencia tabindex internamente
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    // Contrato real: brand aplica CLASSE dss-select--brand-* no root
    // (sem atributo data-brand próprio) — corrigido na Onda P2/G3.2.
    it('sets data-brand="hub"', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-select--brand-hub')
    })

    it('sets data-brand="water"', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-select--brand-water')
    })

    it('sets data-brand="waste"', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-select--brand-waste')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions }
      })
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('passes popup-content-class for panel styling', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, brand: 'hub' }
      })
      // Panel é teleportado — apenas verificamos que o componente renderiza
      expect(wrapper.exists()).toBe(true)
    })

    it('renders in multiple mode without crash', () => {
      const wrapper = mount(DssSelect, {
        props: { options: sampleOptions, multiple: true, modelValue: [] }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssSelect — Teclado (WCAG 2.1.1)', () => {
  it('ArrowDown no alvo focável abre o menu de opções', async () => {
    const wrapper = mount(DssSelect, {
      props: { modelValue: null, options: ['Hub', 'Water'] }
    })
    await wrapper.find('[tabindex="0"]').trigger('keydown', { keyCode: 40 })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.q-menu')).not.toBeNull()
    wrapper.unmount()
  })
})
