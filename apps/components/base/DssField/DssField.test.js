/**
 * ==========================================================================
 * DssField - UNIT TESTS
 *
 * COBERTURA:
 * - Props: variant, label, hint, error, errorMessage, disable, readonly, dense, brand
 * - Estados: foco (focusin/focusout), erro, disabled
 * - Slots: default (controle), label, prepend, append, before, after, hint, error
 * - Acessibilidade: aria-describedby dinâmico, errorId, hintId, fieldId expose
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssField é um container de campo custom (SEM QField).
 * Detecta foco via eventos focusin/focusout borbulhantes do controle interno.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssField from './1-structure/DssField.ts.vue'

describe('DssField', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssField)
      expect(wrapper.classes()).toContain('dss-field')
    })

    describe('variant', () => {
      it.each(['outlined', 'filled', 'standout', 'borderless'])(
        'applies %s variant class',
        (variant) => {
          const wrapper = mount(DssField, { props: { variant } })
          expect(wrapper.classes().join(' ')).toContain(variant)
        }
      )
    })

    describe('states', () => {
      it('applies disabled class when disable=true', () => {
        const wrapper = mount(DssField, { props: { disable: true } })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies readonly class when readonly=true', () => {
        const wrapper = mount(DssField, { props: { readonly: true } })
        expect(wrapper.classes().join(' ')).toContain('readonly')
      })

      it('applies dense class when dense=true', () => {
        const wrapper = mount(DssField, { props: { dense: true } })
        expect(wrapper.classes().join(' ')).toContain('dense')
      })

      it('applies error class when error=true', () => {
        const wrapper = mount(DssField, { props: { error: true } })
        expect(wrapper.classes().join(' ')).toContain('error')
      })
    })

    describe('label', () => {
      it('renders label text', () => {
        const wrapper = mount(DssField, { props: { label: 'Nome' } })
        expect(wrapper.find('.dss-field__label').text()).toBe('Nome')
      })

      it('does not render label element when label is not provided', () => {
        const wrapper = mount(DssField)
        expect(wrapper.find('.dss-field__label').exists()).toBe(false)
      })
    })
  })

  // ===========================================================================
  // BOTTOM AREA TESTS
  // ===========================================================================

  describe('Bottom area', () => {
    it('shows hint text when hint is set and no error', () => {
      const wrapper = mount(DssField, {
        props: { hint: 'Dica útil' }
      })
      expect(wrapper.find('.dss-field__hint').text()).toContain('Dica útil')
    })

    it('shows error message when error=true and errorMessage is set', () => {
      const wrapper = mount(DssField, {
        props: { error: true, errorMessage: 'Campo inválido' }
      })
      expect(wrapper.find('.dss-field__error').text()).toContain('Campo inválido')
    })

    it('shows error message instead of hint when both are set and error=true', () => {
      const wrapper = mount(DssField, {
        props: { error: true, errorMessage: 'Erro!', hint: 'Dica' }
      })
      expect(wrapper.find('.dss-field__error').exists()).toBe(true)
      expect(wrapper.find('.dss-field__hint').exists()).toBe(false)
    })

    it('shows hint instead of error when error=false', () => {
      const wrapper = mount(DssField, {
        props: { error: false, errorMessage: 'Erro!', hint: 'Dica' }
      })
      expect(wrapper.find('.dss-field__hint').exists()).toBe(true)
      expect(wrapper.find('.dss-field__error').exists()).toBe(false)
    })

    it('hides bottom area when no hint or error', () => {
      const wrapper = mount(DssField)
      expect(wrapper.find('.dss-field__bottom').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // FOCUS STATE TESTS
  // ===========================================================================

  describe('Focus state', () => {
    it('applies focused class on focusin', async () => {
      const wrapper = mount(DssField)
      await wrapper.trigger('focusin')
      expect(wrapper.classes().join(' ')).toContain('focused')
    })

    it('does not apply focused class on focusin when disabled', async () => {
      const wrapper = mount(DssField, { props: { disable: true } })
      await wrapper.trigger('focusin')
      expect(wrapper.classes().join(' ')).not.toContain('focused')
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot (control area)', () => {
      const wrapper = mount(DssField, {
        slots: { default: '<input class="test-control" />' }
      })
      expect(wrapper.find('.test-control').exists()).toBe(true)
    })

    it('renders prepend slot content', () => {
      const wrapper = mount(DssField, {
        slots: { prepend: '<span class="test-prepend">prefix</span>' }
      })
      expect(wrapper.find('.dss-field__prepend').exists()).toBe(true)
      expect(wrapper.find('.test-prepend').exists()).toBe(true)
    })

    it('renders append slot content', () => {
      const wrapper = mount(DssField, {
        slots: { append: '<span class="test-append">suffix</span>' }
      })
      expect(wrapper.find('.dss-field__append').exists()).toBe(true)
    })

    it('renders before slot content', () => {
      const wrapper = mount(DssField, {
        slots: { before: '<span class="test-before">before</span>' }
      })
      expect(wrapper.find('.dss-field__before').exists()).toBe(true)
    })

    it('renders after slot content', () => {
      const wrapper = mount(DssField, {
        slots: { after: '<span class="test-after">after</span>' }
      })
      expect(wrapper.find('.dss-field__after').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('error region has role="alert"', () => {
      const wrapper = mount(DssField, {
        props: { error: true, errorMessage: 'Erro' }
      })
      expect(wrapper.find('.dss-field__error').attributes('role')).toBe('alert')
    })

    it('exposes fieldId via defineExpose', () => {
      const wrapper = mount(DssField)
      expect(wrapper.vm.fieldId).toBeTruthy()
    })

    it('exposes hintId via defineExpose', () => {
      const wrapper = mount(DssField)
      expect(wrapper.vm.hintId).toBeTruthy()
    })

    it('exposes errorId via defineExpose', () => {
      const wrapper = mount(DssField)
      expect(wrapper.vm.errorId).toBeTruthy()
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssField, { props: { brand } })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssField)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })
})
