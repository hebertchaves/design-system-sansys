/**
 * ==========================================================================
 * DssInput - UNIT TESTS
 *
 * COBERTURA:
 * - Props: type, label, placeholder, hint, variant, color, dense, clearable, loading, readonly, disabled, error, errorMessage, brand
 * - Value/Model: v-model (string/number), clearable
 * - Eventos: update:modelValue, focus, blur
 * - Slots: label, prepend, append, before, after, hint, error
 * - Acessibilidade: ARIA, aria-invalid, aria-disabled, aria-required, tabindex
 * - Brands: Hub, Water, Waste
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssInput from './1-structure/DssInput.ts.vue'

describe('DssInput', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.classes()).toContain('dss-input')
    })

    it('renders label when provided', () => {
      const wrapper = mount(DssInput, {
        props: { label: 'Nome completo' }
      })
      expect(wrapper.find('label').text()).toBe('Nome completo')
    })

    it('sets placeholder on native input', () => {
      const wrapper = mount(DssInput, {
        props: { placeholder: 'Digite aqui' }
      })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBeTruthy()
    })

    it('sets type attribute on native input', () => {
      const wrapper = mount(DssInput, {
        props: { type: 'email' }
      })
      expect(wrapper.find('input').attributes('type')).toBe('email')
    })

    describe('variant', () => {
      it.each(['outlined', 'filled', 'standout', 'borderless'])(
        'applies %s variant class',
        (variant) => {
          const wrapper = mount(DssInput, { props: { variant } })
          expect(wrapper.classes().join(' ')).toContain(variant)
        }
      )
    })

    describe('states', () => {
      it('applies disabled attribute when disabled', () => {
        const wrapper = mount(DssInput, {
          props: { disabled: true }
        })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
      })

      it('applies readonly attribute when readonly', () => {
        const wrapper = mount(DssInput, {
          props: { readonly: true }
        })
        expect(wrapper.find('input').attributes('readonly')).toBeDefined()
      })

      it('applies dense class when dense=true', () => {
        const wrapper = mount(DssInput, {
          props: { dense: true }
        })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('shows error message when error=true and errorMessage is set', () => {
        const wrapper = mount(DssInput, {
          props: { error: true, errorMessage: 'Campo obrigatório' }
        })
        expect(wrapper.text()).toContain('Campo obrigatório')
      })

      it('shows hint text when hint is set', () => {
        const wrapper = mount(DssInput, {
          props: { hint: 'Mínimo 8 caracteres' }
        })
        expect(wrapper.text()).toContain('Mínimo 8 caracteres')
      })

      it('shows loading spinner when loading=true', () => {
        const wrapper = mount(DssInput, {
          props: { loading: true }
        })
        expect(wrapper.find('.dss-input__loading').exists()).toBe(true)
      })

      it('shows clear button when clearable=true and has value', () => {
        const wrapper = mount(DssInput, {
          props: { clearable: true, modelValue: 'texto' }
        })
        expect(wrapper.find('.dss-input__clear').exists()).toBe(true)
      })

      it('hides clear button when value is empty', () => {
        const wrapper = mount(DssInput, {
          props: { clearable: true, modelValue: '' }
        })
        expect(wrapper.find('.dss-input__clear').exists()).toBe(false)
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('emits update:modelValue on input', async () => {
      const wrapper = mount(DssInput, {
        props: { modelValue: '' }
      })
      const input = wrapper.find('input')
      await input.setValue('novo valor')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('reflects modelValue in native input', () => {
      const wrapper = mount(DssInput, {
        props: { modelValue: 'valor inicial' }
      })
      expect(wrapper.find('input').element.value).toBe('valor inicial')
    })

    it('emits empty string when clear button is clicked', async () => {
      const wrapper = mount(DssInput, {
        props: { clearable: true, modelValue: 'algo' }
      })
      await wrapper.find('.dss-input__clear').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted[0][0]).toBe('')
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits focus event on input focus', async () => {
      const wrapper = mount(DssInput, { props: { modelValue: '' } })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event on input blur', async () => {
      const wrapper = mount(DssInput, { props: { modelValue: '' } })
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders prepend slot content', () => {
      const wrapper = mount(DssInput, {
        slots: { prepend: '<span class="test-prepend">icon</span>' }
      })
      expect(wrapper.find('.test-prepend').exists()).toBe(true)
    })

    it('renders append slot content', () => {
      const wrapper = mount(DssInput, {
        slots: { append: '<span class="test-append">icon</span>' }
      })
      expect(wrapper.find('.test-append').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('sets aria-label on native input when ariaLabel is provided', () => {
      const wrapper = mount(DssInput, {
        props: { ariaLabel: 'E-mail do usuário' }
      })
      expect(wrapper.find('input').attributes('aria-label')).toBe('E-mail do usuário')
    })

    it('sets aria-invalid when error=true', () => {
      const wrapper = mount(DssInput, {
        props: { error: true }
      })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('sets aria-disabled when disabled=true', () => {
      const wrapper = mount(DssInput, {
        props: { disabled: true }
      })
      expect(wrapper.find('input').attributes('aria-disabled')).toBe('true')
    })

    it('sets aria-required when required=true', () => {
      const wrapper = mount(DssInput, {
        props: { required: true }
      })
      expect(wrapper.find('input').attributes('aria-required')).toBe('true')
    })

    it('sets aria-readonly when readonly=true', () => {
      const wrapper = mount(DssInput, {
        props: { readonly: true }
      })
      expect(wrapper.find('input').attributes('aria-readonly')).toBe('true')
    })

    it('sets aria-busy when loading=true', () => {
      const wrapper = mount(DssInput, {
        props: { loading: true }
      })
      expect(wrapper.find('input').attributes('aria-busy')).toBe('true')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssInput, {
        props: { disabled: true }
      })
      expect(wrapper.find('input').attributes('tabindex')).toBe('-1')
    })

    it('loading spinner has role="status"', () => {
      const wrapper = mount(DssInput, {
        props: { loading: true }
      })
      expect(wrapper.find('.dss-input__loading').attributes('role')).toBe('status')
    })

    it('error region has role="alert"', () => {
      const wrapper = mount(DssInput, {
        props: { error: true, errorMessage: 'Erro' }
      })
      expect(wrapper.find('.dss-input__error').attributes('role')).toBe('alert')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    // Contrato real: brand aplica CLASSE dss-input--brand-* no root
    // (sem atributo data-brand próprio) — corrigido na Onda P2/G3.2.
    it('sets data-brand="hub" when brand=hub', () => {
      const wrapper = mount(DssInput, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-input--brand-hub')
    })

    it('sets data-brand="water" when brand=water', () => {
      const wrapper = mount(DssInput, { props: { brand: 'water' } })
      expect(wrapper.classes()).toContain('dss-input--brand-water')
    })

    it('sets data-brand="waste" when brand=waste', () => {
      const wrapper = mount(DssInput, { props: { brand: 'waste' } })
      expect(wrapper.classes()).toContain('dss-input--brand-waste')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssInput — Teclado (WCAG 2.1.1)', () => {
  it('possui input nativo focável que recebe digitação', async () => {
    const wrapper = mount(DssInput, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('tabindex')).not.toBe('-1')
    await input.setValue('teclado')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['teclado'])
  })
})
