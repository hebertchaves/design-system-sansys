/**
 * ==========================================================================
 * DssAvatar - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, icon, src, color, textColor, square, rounded, brand, ariaLabel, status
 * - Estrutura: classe raiz, elementos internos, data-brand
 * - Acessibilidade: role=img, aria-label, aria-hidden em ícones
 * - Slots: default (iniciais, imagem customizada)
 * - Brands: Hub, Water, Waste
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js (padrão de testes)
 * GOLDEN CONTEXT: DssBadge (componente não interativo)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssAvatar from './1-structure/DssAvatar.ts.vue'

installQuasar()

describe('DssAvatar', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.classes()).toContain('dss-avatar')
      expect(wrapper.classes()).toContain('dss-avatar--md')
    })

    it('renders as a div element', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])('applies %s size class', (size) => {
        const wrapper = mount(DssAvatar, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-avatar--${size}`)
      })

      it('applies md size class by default when no size given', () => {
        const wrapper = mount(DssAvatar)
        expect(wrapper.classes()).toContain('dss-avatar--md')
      })
    })

    // Color tests
    describe('color', () => {
      it('applies bg-primary class by default', () => {
        const wrapper = mount(DssAvatar)
        expect(wrapper.classes()).toContain('bg-primary')
      })

      it('applies bg-{color} class for custom color', () => {
        const wrapper = mount(DssAvatar, { props: { color: 'secondary' } })
        expect(wrapper.classes()).toContain('bg-secondary')
      })

      it('applies text-white class when color is set', () => {
        const wrapper = mount(DssAvatar, { props: { color: 'primary' } })
        expect(wrapper.classes()).toContain('text-white')
      })

      it('applies textColor override class', () => {
        const wrapper = mount(DssAvatar, {
          props: { color: 'primary', textColor: 'accent' }
        })
        expect(wrapper.classes()).toContain('text-accent')
      })
    })

    // Shape tests
    describe('shape', () => {
      it('applies square class when square=true', () => {
        const wrapper = mount(DssAvatar, { props: { square: true } })
        expect(wrapper.classes()).toContain('dss-avatar--square')
      })

      it('applies rounded class when rounded=true', () => {
        const wrapper = mount(DssAvatar, { props: { rounded: true } })
        expect(wrapper.classes()).toContain('dss-avatar--rounded')
      })

      it('does not apply square class by default', () => {
        const wrapper = mount(DssAvatar)
        expect(wrapper.classes()).not.toContain('dss-avatar--square')
      })
    })
  })

  // ===========================================================================
  // ICON TESTS
  // ===========================================================================

  describe('Icon rendering', () => {
    it('renders .dss-avatar__icon span when icon prop is set', () => {
      const wrapper = mount(DssAvatar, { props: { icon: 'person' } })
      const icon = wrapper.find('.dss-avatar__icon')
      expect(icon.exists()).toBe(true)
    })

    it('renders the icon name as text content', () => {
      const wrapper = mount(DssAvatar, { props: { icon: 'person' } })
      expect(wrapper.find('.dss-avatar__icon').text()).toBe('person')
    })

    it('icon span has material-icons class', () => {
      const wrapper = mount(DssAvatar, { props: { icon: 'account_circle' } })
      const icon = wrapper.find('.dss-avatar__icon')
      expect(icon.classes()).toContain('material-icons')
    })

    it('icon span has aria-hidden="true"', () => {
      const wrapper = mount(DssAvatar, { props: { icon: 'person' } })
      const icon = wrapper.find('.dss-avatar__icon')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('does not render .dss-avatar__icon when icon is not set', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.find('.dss-avatar__icon').exists()).toBe(false)
    })

    it('renders .dss-avatar__content when icon is not set', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.find('.dss-avatar__content').exists()).toBe(true)
    })

    it('does not render .dss-avatar__content when icon is set', () => {
      const wrapper = mount(DssAvatar, { props: { icon: 'person' } })
      expect(wrapper.find('.dss-avatar__content').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('sets role="img" when ariaLabel is provided', () => {
      const wrapper = mount(DssAvatar, {
        props: { ariaLabel: 'Avatar do usuário João' }
      })
      expect(wrapper.attributes('role')).toBe('img')
    })

    it('does not set role when ariaLabel is not provided', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('sets aria-label attribute when ariaLabel is provided', () => {
      const wrapper = mount(DssAvatar, {
        props: { ariaLabel: 'Avatar de Maria' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Avatar de Maria')
    })

    it('does not set aria-label when ariaLabel is not provided', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('applies hub brand class', () => {
      const wrapper = mount(DssAvatar, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-avatar--brand-hub')
    })

    it('applies water brand class', () => {
      const wrapper = mount(DssAvatar, { props: { brand: 'water' } })
      expect(wrapper.classes()).toContain('dss-avatar--brand-water')
    })

    it('applies waste brand class', () => {
      const wrapper = mount(DssAvatar, { props: { brand: 'waste' } })
      expect(wrapper.classes()).toContain('dss-avatar--brand-waste')
    })

    it('does not apply any brand class when brand is null', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.classes()).not.toContain('dss-avatar--brand-hub')
      expect(wrapper.classes()).not.toContain('dss-avatar--brand-water')
      expect(wrapper.classes()).not.toContain('dss-avatar--brand-waste')
    })
  })

  // ===========================================================================
  // STATUS TESTS
  // ===========================================================================

  describe('Status indicator', () => {
    it('renders .dss-avatar__status span when status is set', () => {
      const wrapper = mount(DssAvatar, { props: { status: 'online' } })
      expect(wrapper.find('.dss-avatar__status').exists()).toBe(true)
    })

    it('applies status modifier class', () => {
      const wrapper = mount(DssAvatar, { props: { status: 'away' } })
      expect(wrapper.find('.dss-avatar__status').classes()).toContain('dss-avatar__status--away')
    })

    it('applies with-status class on root when status is set', () => {
      const wrapper = mount(DssAvatar, { props: { status: 'busy' } })
      expect(wrapper.classes()).toContain('dss-avatar--with-status')
    })

    it('does not render status span when status is null', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.find('.dss-avatar__status').exists()).toBe(false)
    })

    it.each(['online', 'away', 'busy', 'offline'])('supports status %s', (status) => {
      const wrapper = mount(DssAvatar, { props: { status } })
      expect(wrapper.find(`.dss-avatar__status--${status}`).exists()).toBe(true)
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot inside .dss-avatar__content', () => {
      const wrapper = mount(DssAvatar, {
        slots: { default: 'AB' }
      })
      expect(wrapper.find('.dss-avatar__content').text()).toBe('AB')
    })

    it('slot is not rendered when icon prop is set', () => {
      const wrapper = mount(DssAvatar, {
        props: { icon: 'person' },
        slots: { default: 'AB' }
      })
      // When icon is set, .dss-avatar__content is not rendered
      expect(wrapper.find('.dss-avatar__content').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(DssAvatar)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emits click event with MouseEvent payload', async () => {
      const wrapper = mount(DssAvatar)
      await wrapper.trigger('click')
      const emitted = wrapper.emitted('click')
      expect(emitted?.[0][0]).toBeInstanceOf(MouseEvent)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('root element is a div', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('always renders with dss-avatar base class', () => {
      const wrapper = mount(DssAvatar)
      expect(wrapper.classes()).toContain('dss-avatar')
    })

    it('does not apply multiple size classes simultaneously', () => {
      const wrapper = mount(DssAvatar, { props: { size: 'lg' } })
      expect(wrapper.classes()).toContain('dss-avatar--lg')
      expect(wrapper.classes()).not.toContain('dss-avatar--md')
      expect(wrapper.classes()).not.toContain('dss-avatar--sm')
    })
  })
})
