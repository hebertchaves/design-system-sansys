/**
 * ==========================================================================
 * DssIcon - UNIT TESTS
 *
 * COBERTURA:
 * - Props: name, size, color, decorative, ariaLabel, brand, spin, pulse
 * - Acessibilidade: role=img vs aria-hidden, aria-label
 * - Estrutura: classe raiz, .dss-icon__inner, data-brand
 * - Brands: Hub, Water, Waste
 * - Modificadores: spin, pulse, decorative
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js (padrão de testes)
 * GOLDEN CONTEXT: DssBadge (componente não interativo)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssIcon from './1-structure/DssIcon.ts.vue'

installQuasar()

describe('DssIcon', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.classes()).toContain('dss-icon')
      expect(wrapper.classes()).toContain('dss-icon--md')
    })

    it('renders as a span element', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])('applies dss-icon--%s size class', (size) => {
        const wrapper = mount(DssIcon, { props: { name: 'home', size } })
        expect(wrapper.classes()).toContain(`dss-icon--${size}`)
      })

      it('applies md size class by default', () => {
        const wrapper = mount(DssIcon, { props: { name: 'home' } })
        expect(wrapper.classes()).toContain('dss-icon--md')
      })
    })

    // Inline mode tests (CCI §2.2 — sizing dirigido pelo host)
    describe('inline mode', () => {
      it('applies dss-icon--inline class when inline=true', () => {
        const wrapper = mount(DssIcon, { props: { name: 'home', inline: true } })
        expect(wrapper.classes()).toContain('dss-icon--inline')
      })

      it('does NOT emit the size token class when inline=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', inline: true, size: 'lg' }
        })
        expect(wrapper.classes()).not.toContain('dss-icon--lg')
        expect(wrapper.classes()).not.toContain('dss-icon--md')
      })

      it('does not apply inline class by default', () => {
        const wrapper = mount(DssIcon, { props: { name: 'home' } })
        expect(wrapper.classes()).not.toContain('dss-icon--inline')
      })
    })

    // Color tests
    describe('color', () => {
      it('applies text-{color} class when color prop is set (no brand)', () => {
        const wrapper = mount(DssIcon, { props: { name: 'home', color: 'primary' } })
        expect(wrapper.classes()).toContain('text-primary')
      })

      it('does not apply text-{color} class when brand is set', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', color: 'primary', brand: 'hub' }
        })
        expect(wrapper.classes()).not.toContain('text-primary')
      })

      it('does not apply any color class when color is null', () => {
        const wrapper = mount(DssIcon, { props: { name: 'home' } })
        // No text-* class should be present (color defaults to null)
        const classes = wrapper.classes()
        const hasColorClass = classes.some(c => c.startsWith('text-') && c !== 'text-')
        expect(hasColorClass).toBe(false)
      })
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    describe('non-decorative (default)', () => {
      it('sets role="img" when decorative is false', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: false, ariaLabel: 'Home' }
        })
        expect(wrapper.attributes('role')).toBe('img')
      })

      it('sets aria-label when decorative is false and ariaLabel is provided', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: false, ariaLabel: 'Ir para o início' }
        })
        expect(wrapper.attributes('aria-label')).toBe('Ir para o início')
      })

      it('does not set aria-hidden when decorative is false', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: false }
        })
        expect(wrapper.attributes('aria-hidden')).toBeUndefined()
      })
    })

    describe('decorative mode', () => {
      it('sets aria-hidden="true" when decorative=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: true }
        })
        expect(wrapper.attributes('aria-hidden')).toBe('true')
      })

      it('does not set role when decorative=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: true }
        })
        expect(wrapper.attributes('role')).toBeUndefined()
      })

      it('does not set aria-label when decorative=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: true, ariaLabel: 'Ignored' }
        })
        expect(wrapper.attributes('aria-label')).toBeUndefined()
      })

      it('applies dss-icon--decorative class when decorative=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: true }
        })
        expect(wrapper.classes()).toContain('dss-icon--decorative')
      })

      // CCI §2.1 — decorative e SOMENTE a11y; nao aplica estilo inline de opacidade
      it('does not set an inline opacity style when decorative=true', () => {
        const wrapper = mount(DssIcon, {
          props: { name: 'home', decorative: true }
        })
        expect(wrapper.element.style.opacity).toBe('')
      })
    })
  })

  // ===========================================================================
  // EMBEDDED COMPOSITION TESTS (CCI §2.4 — passthrough de classe do host)
  // ===========================================================================

  describe('Embedded composition', () => {
    it('merges a host-provided class onto the root span', () => {
      const wrapper = mount(DssIcon, {
        props: { name: 'home', inline: true, decorative: true },
        attrs: { class: 'dss-button__icon dss-button__icon--left' }
      })
      expect(wrapper.classes()).toContain('dss-icon')
      expect(wrapper.classes()).toContain('dss-button__icon')
      expect(wrapper.classes()).toContain('dss-button__icon--left')
    })
  })

  // ===========================================================================
  // INNER QICON TESTS
  // ===========================================================================

  describe('Inner QIcon', () => {
    it('renders .dss-icon__inner element', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.find('.dss-icon__inner').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('applies hub brand class', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home', brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-icon--brand-hub')
    })

    it('applies water brand class', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home', brand: 'water' } })
      expect(wrapper.classes()).toContain('dss-icon--brand-water')
    })

    it('applies waste brand class', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home', brand: 'waste' } })
      expect(wrapper.classes()).toContain('dss-icon--brand-waste')
    })

    it('does not apply brand class when brand is null', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.classes()).not.toContain('dss-icon--brand-hub')
      expect(wrapper.classes()).not.toContain('dss-icon--brand-water')
      expect(wrapper.classes()).not.toContain('dss-icon--brand-waste')
    })
  })

  // ===========================================================================
  // ANIMATION MODIFIER TESTS
  // ===========================================================================

  describe('Animation modifiers', () => {
    it('applies dss-icon--spin class when spin=true', () => {
      const wrapper = mount(DssIcon, { props: { name: 'refresh', spin: true } })
      expect(wrapper.classes()).toContain('dss-icon--spin')
    })

    it('applies dss-icon--pulse class when pulse=true', () => {
      const wrapper = mount(DssIcon, { props: { name: 'refresh', pulse: true } })
      expect(wrapper.classes()).toContain('dss-icon--pulse')
    })

    it('does not apply spin class by default', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.classes()).not.toContain('dss-icon--spin')
    })

    it('does not apply pulse class by default', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home' } })
      expect(wrapper.classes()).not.toContain('dss-icon--pulse')
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('always has dss-icon base class', () => {
      const wrapper = mount(DssIcon, { props: { name: 'star' } })
      expect(wrapper.classes()).toContain('dss-icon')
    })

    it('does not apply multiple size classes simultaneously', () => {
      const wrapper = mount(DssIcon, { props: { name: 'home', size: 'lg' } })
      expect(wrapper.classes()).toContain('dss-icon--lg')
      expect(wrapper.classes()).not.toContain('dss-icon--md')
      expect(wrapper.classes()).not.toContain('dss-icon--sm')
    })
  })
})
