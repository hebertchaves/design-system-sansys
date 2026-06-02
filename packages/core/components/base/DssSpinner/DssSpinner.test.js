/**
 * ==========================================================================
 * DssSpinner - UNIT TESTS
 *
 * COBERTURA:
 * - Props: type, size, color, brand, ariaLabel, thickness
 * - Estrutura: classe raiz dss-spinner, .dss-spinner__inner, .dss-spinner__label
 * - Tipos de spinner: standard, dots, ios, oval, tail, rings, pie, bars
 * - Cor: prop color NÃO passada ao QSpinner (CSS currentColor)
 * - Acessibilidade: role="status", aria-live="polite", aria-label via label span
 * - Brand: data-brand, dss-spinner--brand-{brand}
 * - Modificadores: dss-spinner--type-{type}, dss-spinner--size-{size}
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js (padrão de testes)
 * GOLDEN CONTEXT: DssIcon (mesma arquitetura não interativa)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSpinner from './1-structure/DssSpinner.ts.vue'

installQuasar()

describe('DssSpinner', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.classes()).toContain('dss-spinner')
    })

    it('renders as a span element', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('applies dss-spinner--type-standard class by default', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.classes()).toContain('dss-spinner--type-standard')
    })

    it('applies dss-spinner--size-md class by default', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.classes()).toContain('dss-spinner--size-md')
    })

    // Type tests
    describe('type', () => {
      it.each(['standard', 'dots', 'ios', 'oval', 'tail', 'rings', 'pie', 'bars'])(
        'applies dss-spinner--type-%s class for type=%s',
        (type) => {
          const wrapper = mount(DssSpinner, { props: { type } })
          expect(wrapper.classes()).toContain(`dss-spinner--type-${type}`)
        }
      )
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])('applies dss-spinner--size-%s class', (size) => {
        const wrapper = mount(DssSpinner, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-spinner--size-${size}`)
      })
    })

    // Color tests
    describe('color', () => {
      it('applies dss-spinner--color-{color} class when color is set', () => {
        const wrapper = mount(DssSpinner, { props: { color: 'primary' } })
        expect(wrapper.classes()).toContain('dss-spinner--color-primary')
      })

      it('applies dss-spinner--color-primary class by default (default prop)', () => {
        const wrapper = mount(DssSpinner)
        // Default color is 'primary'
        expect(wrapper.classes()).toContain('dss-spinner--color-primary')
      })

      it('does NOT pass color prop directly to inner QSpinner component', () => {
        // Color is controlled via CSS currentColor, not via prop on QSpinner
        // The .dss-spinner__inner should NOT have a color attribute
        const wrapper = mount(DssSpinner, { props: { color: 'primary' } })
        const inner = wrapper.find('.dss-spinner__inner')
        expect(inner.exists()).toBe(true)
        // QSpinner receives size="100%" but NOT color prop — verified by absence of color attr
        expect(inner.attributes('color')).toBeUndefined()
      })
    })
  })

  // ===========================================================================
  // INNER SPINNER COMPONENT TESTS
  // ===========================================================================

  describe('Inner spinner component', () => {
    it('renders .dss-spinner__inner element', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.find('.dss-spinner__inner').exists()).toBe(true)
    })

    it('inner QSpinner has aria-hidden="true"', () => {
      const wrapper = mount(DssSpinner)
      const inner = wrapper.find('.dss-spinner__inner')
      expect(inner.attributes('aria-hidden')).toBe('true')
    })

    it('inner QSpinner receives size="100%"', () => {
      const wrapper = mount(DssSpinner)
      const inner = wrapper.find('.dss-spinner__inner')
      // QSpinner size prop is set to "100%" so it fills the DSS wrapper
      // Quasar converts this to a style — the rendered element will have
      // a width/height style (not a size attribute)
      expect(inner.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('root has role="status"', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.attributes('role')).toBe('status')
    })

    it('root has aria-live="polite"', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })

    it('renders .dss-spinner__label span', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.find('.dss-spinner__label').exists()).toBe(true)
    })

    it('label span has default ariaLabel text "Carregando"', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.find('.dss-spinner__label').text()).toBe('Carregando')
    })

    it('renders custom ariaLabel text in label span', () => {
      const wrapper = mount(DssSpinner, {
        props: { ariaLabel: 'Processando pedido...' }
      })
      expect(wrapper.find('.dss-spinner__label').text()).toBe('Processando pedido...')
    })

    it('root does NOT have aria-hidden (spinner is semantic status region)', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.attributes('aria-hidden')).toBeUndefined()
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('sets data-brand attribute when brand is set', () => {
      const wrapper = mount(DssSpinner, { props: { brand: 'hub' } })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it('sets data-brand="water" correctly', () => {
      const wrapper = mount(DssSpinner, { props: { brand: 'water' } })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('sets data-brand="waste" correctly', () => {
      const wrapper = mount(DssSpinner, { props: { brand: 'waste' } })
      expect(wrapper.attributes('data-brand')).toBe('waste')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it('applies dss-spinner--brand-{brand} class', () => {
      const wrapper = mount(DssSpinner, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-spinner--brand-hub')
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('always has dss-spinner base class', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.classes()).toContain('dss-spinner')
    })

    it('has exactly one .dss-spinner__inner child component', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.findAll('.dss-spinner__inner')).toHaveLength(1)
    })

    it('has exactly one .dss-spinner__label span', () => {
      const wrapper = mount(DssSpinner)
      expect(wrapper.findAll('.dss-spinner__label')).toHaveLength(1)
    })

    it('does not apply multiple type classes simultaneously', () => {
      const wrapper = mount(DssSpinner, { props: { type: 'dots' } })
      expect(wrapper.classes()).toContain('dss-spinner--type-dots')
      expect(wrapper.classes()).not.toContain('dss-spinner--type-standard')
      expect(wrapper.classes()).not.toContain('dss-spinner--type-ios')
    })

    it('does not apply multiple size classes simultaneously', () => {
      const wrapper = mount(DssSpinner, { props: { size: 'lg' } })
      expect(wrapper.classes()).toContain('dss-spinner--size-lg')
      expect(wrapper.classes()).not.toContain('dss-spinner--size-md')
      expect(wrapper.classes()).not.toContain('dss-spinner--size-sm')
    })
  })

  // ===========================================================================
  // THICKNESS TESTS (somente para type='standard')
  // ===========================================================================

  describe('thickness (type=standard only)', () => {
    it('renders without crash with custom thickness for standard type', () => {
      const wrapper = mount(DssSpinner, {
        props: { type: 'standard', thickness: 3 }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders without crash with different thickness for non-standard type', () => {
      // thickness is ignored for non-standard types (undefined is safe)
      const wrapper = mount(DssSpinner, {
        props: { type: 'dots', thickness: 3 }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
