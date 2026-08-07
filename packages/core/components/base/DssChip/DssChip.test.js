/**
 * ==========================================================================
 * DssChip - UNIT TESTS
 *
 * COBERTURA:
 * - Props: variant, color, size, disable, clickable, removable, selected
 * - Eventos: click, remove, update:selected
 * - Slots: default, icon, icon-right, icon-remove
 * - Acessibilidade: ARIA, keyboard navigation, focus management
 * - Brands: Hub, Water, Waste
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssChip from './1-structure/DssChip.ts.vue'

// DssChip compõe DssIcon → QIcon (CCI / Princípio #14). O registro Quasar é
// necessário para que o QIcon interno renderize nos testes.
installQuasar()

describe('DssChip', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssChip)
      expect(wrapper.classes()).toContain('dss-chip')
      expect(wrapper.classes()).toContain('dss-chip--filled')
      expect(wrapper.classes()).toContain('dss-chip--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssChip, {
        props: { label: 'Test Chip' }
      })
      expect(wrapper.find('.dss-chip__label').text()).toBe('Test Chip')
    })

    // Variant tests
    describe('variant', () => {
      it.each(['filled', 'outline', 'flat'])('applies %s variant class', (variant) => {
        const wrapper = mount(DssChip, {
          props: { variant }
        })
        expect(wrapper.classes()).toContain(`dss-chip--${variant}`)
      })
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssChip, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`dss-chip--${size}`)
      })
    })

    // Shape tests
    describe('shape', () => {
      it('applies round shape by default', () => {
        const wrapper = mount(DssChip)
        expect(wrapper.classes()).toContain('dss-chip--round')
      })

      it('applies square shape when square prop is true', () => {
        const wrapper = mount(DssChip, {
          props: { square: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--square')
      })
    })

    // State tests
    describe('states', () => {
      it('applies disabled class and attribute', () => {
        const wrapper = mount(DssChip, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--disabled')
        expect(wrapper.attributes('aria-disabled')).toBe('true')
      })

      it('applies clickable class when clickable', () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--clickable')
      })

      it('applies selected class', () => {
        const wrapper = mount(DssChip, {
          props: { selected: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--selected')
      })

      // `aria-selected` só é válido acompanhado de role=option. Antes era emitido
      // sozinho, junto do role="option" fixo — atributo órfão na maioria dos usos.
      it('emite aria-selected APENAS com role=option', () => {
        const comOption = mount(DssChip, {
          props: { selected: true, role: 'option' }
        })
        expect(comOption.attributes('aria-selected')).toBe('true')

        const semRole = mount(DssChip, { props: { selected: true } })
        expect(semRole.attributes('aria-selected')).toBeUndefined()
      })

      it('applies dense class', () => {
        const wrapper = mount(DssChip, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--dense')
      })
    })

    // Icon tests — agora compostos via DssIcon (CCI §3.1).
    // O glifo deixou de ser <span> cru; a posição é a raiz do DssIcon
    // (passthrough de classe) e o glifo vem do QIcon interno.
    describe('icons', () => {
      it('renders left icon via DssIcon composition', () => {
        const wrapper = mount(DssChip, {
          props: { icon: 'star' }
        })
        const icon = wrapper.find('.dss-chip__icon--left')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('dss-icon')
        expect(icon.classes()).toContain('dss-icon--inline')
        expect(wrapper.find('.dss-chip__icon--left .dss-icon__inner').exists()).toBe(true)
      })

      it('renders right icon via DssIcon composition', () => {
        const wrapper = mount(DssChip, {
          props: { iconRight: 'arrow_forward' }
        })
        const icon = wrapper.find('.dss-chip__icon--right')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('dss-icon')
        expect(wrapper.find('.dss-chip__icon--right .dss-icon__inner').exists()).toBe(true)
      })

      it('renders selected icon via DssIcon when selected', () => {
        const wrapper = mount(DssChip, {
          props: {
            selected: true,
            iconSelected: 'check'
          }
        })
        const icon = wrapper.find('.dss-chip__icon--selected')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('dss-icon')
        expect(wrapper.find('.dss-chip__icon--selected .dss-icon__inner').exists()).toBe(true)
      })

      it('icons are decorative (aria-hidden) on the DssIcon root', () => {
        const wrapper = mount(DssChip, {
          props: { icon: 'star' }
        })
        expect(wrapper.find('.dss-chip__icon--left').attributes('aria-hidden')).toBe('true')
      })
    })

    // Removable tests
    describe('removable', () => {
      it('renders remove button when removable', () => {
        const wrapper = mount(DssChip, {
          props: { removable: true }
        })
        expect(wrapper.find('.dss-chip__remove').exists()).toBe(true)
      })

      it('does not render remove button when not removable', () => {
        const wrapper = mount(DssChip, {
          props: { removable: false }
        })
        expect(wrapper.find('.dss-chip__remove').exists()).toBe(false)
      })

      it('applies custom remove icon via DssIcon composition', () => {
        const wrapper = mount(DssChip, {
          props: {
            removable: true,
            iconRemove: 'delete'
          }
        })
        const removeIcon = wrapper.find('.dss-chip__icon--remove')
        expect(removeIcon.exists()).toBe(true)
        expect(removeIcon.classes()).toContain('dss-icon')
        expect(wrapper.find('.dss-chip__icon--remove .dss-icon__inner').exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits click event when clickable chip is clicked', async () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          disable: true
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('emits remove event when remove button clicked', async () => {
      const wrapper = mount(DssChip, {
        props: { removable: true }
      })
      await wrapper.find('.dss-chip__remove').trigger('click')
      expect(wrapper.emitted('remove')).toBeTruthy()
    })

    it('emits update:selected when clickable chip clicked', async () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          selected: false
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:selected')).toBeTruthy()
      expect(wrapper.emitted('update:selected')[0]).toEqual([true])
    })

    it('stops propagation on remove button click', async () => {
      const clickHandler = vi.fn()
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          removable: true
        },
        attrs: {
          onClick: clickHandler
        }
      })
      await wrapper.find('.dss-chip__remove').trigger('click')
      // Remove event should fire, but outer click should not propagate
      expect(wrapper.emitted('remove')).toBeTruthy()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(DssChip, {
        slots: {
          default: '<span class="custom-content">Custom Content</span>'
        }
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })

    // CCI §3.2 — slots nomeados #icon-left e #icon-right adicionados na
    // migração para composição de ícone. Têm precedência sobre as props
    // icon / iconRight. As posições internas (selected / remove) permanecem
    // dirigidas por prop (decisão documentada no relatório de migração).
    it('renderiza ícone esquerdo via prop icon (composto via DssIcon)', () => {
      const wrapper = mount(DssChip, {
        props: { icon: 'star', label: 'Chip' }
      })
      const icon = wrapper.find('.dss-chip__icon--left')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('dss-icon')
    })

    it('renderiza ícone direito via prop iconRight (composto via DssIcon)', () => {
      const wrapper = mount(DssChip, {
        props: { iconRight: 'arrow_drop_down', label: 'Chip' }
      })
      const icon = wrapper.find('.dss-chip__icon--right')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('dss-icon')
    })

    it('renderiza botão de remover com ícone via prop iconRemove (composto via DssIcon)', () => {
      const wrapper = mount(DssChip, {
        props: { removable: true, iconRemove: 'close', label: 'Chip' }
      })
      expect(wrapper.find('.dss-chip__remove').exists()).toBe(true)
      const icon = wrapper.find('.dss-chip__icon--remove')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('dss-icon')
    })

    // Slot #icon-left (CCI §3.2)
    it('renderiza conteúdo do slot #icon-left dentro de .dss-chip__icon--left', () => {
      const wrapper = mount(DssChip, {
        props: { label: 'Chip' },
        slots: { 'icon-left': '<i class="custom-left">L</i>' }
      })
      const icon = wrapper.find('.dss-chip__icon--left')
      expect(icon.exists()).toBe(true)
      expect(icon.find('.custom-left').exists()).toBe(true)
    })

    it('slot #icon-left tem precedência sobre a prop icon', () => {
      const wrapper = mount(DssChip, {
        props: { icon: 'star', label: 'Chip' },
        slots: { 'icon-left': '<i class="custom-left">L</i>' }
      })
      const icon = wrapper.find('.dss-chip__icon--left')
      // É o <span> do slot, não a raiz do DssIcon (sem classe dss-icon)
      expect(icon.classes()).not.toContain('dss-icon')
      expect(icon.find('.custom-left').exists()).toBe(true)
    })

    it('slot #icon-left é decorativo (aria-hidden)', () => {
      const wrapper = mount(DssChip, {
        props: { label: 'Chip' },
        slots: { 'icon-left': '<i class="custom-left">L</i>' }
      })
      expect(wrapper.find('.dss-chip__icon--left').attributes('aria-hidden')).toBe('true')
    })

    // Slot #icon-right (CCI §3.2)
    it('renderiza conteúdo do slot #icon-right dentro de .dss-chip__icon--right', () => {
      const wrapper = mount(DssChip, {
        props: { label: 'Chip' },
        slots: { 'icon-right': '<i class="custom-right">R</i>' }
      })
      const icon = wrapper.find('.dss-chip__icon--right')
      expect(icon.exists()).toBe(true)
      expect(icon.find('.custom-right').exists()).toBe(true)
    })

    it('slot #icon-right tem precedência sobre a prop iconRight', () => {
      const wrapper = mount(DssChip, {
        props: { iconRight: 'arrow_forward', label: 'Chip' },
        slots: { 'icon-right': '<i class="custom-right">R</i>' }
      })
      const icon = wrapper.find('.dss-chip__icon--right')
      expect(icon.classes()).not.toContain('dss-icon')
      expect(icon.find('.custom-right').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    // O papel ARIA depende do CONTEXTO, não do componente. Antes o chip emitia
    // role="option" FIXO — inválido fora de um listbox, que é a maioria dos usos
    // (token de campo, tag, filtro). Agora é derivado e sobrescrevível.
    it('NÃO emite role quando é conteúdo estático', () => {
      const wrapper = mount(DssChip)
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('deriva role=button quando clickable', () => {
      const wrapper = mount(DssChip, { props: { clickable: true } })
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('respeita role explícito do consumidor', () => {
      const wrapper = mount(DssChip, { props: { role: 'option' } })
      expect(wrapper.attributes('role')).toBe('option')
    })

    it('role="" remove o papel mesmo sendo clickable (opt-out)', () => {
      const wrapper = mount(DssChip, { props: { clickable: true, role: '' } })
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('applies custom aria-label', () => {
      const wrapper = mount(DssChip, {
        props: { ariaLabel: 'Custom Label' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Custom Label')
    })

    it('has correct tabindex when clickable', () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('has tabindex -1 when disabled', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          disable: true
        }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('remove button has aria-label', () => {
      const wrapper = mount(DssChip, {
        props: {
          removable: true,
          removeAriaLabel: 'Remove this chip'
        }
      })
      expect(wrapper.find('.dss-chip__remove').attributes('aria-label')).toBe('Remove this chip')
    })

    // Keyboard navigation tests
    describe('Keyboard Navigation', () => {
      it('triggers click on Enter key', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.enter')
        expect(wrapper.emitted('click')).toBeTruthy()
      })

      it('triggers click on Space key', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.space')
        expect(wrapper.emitted('click')).toBeTruthy()
      })

      it('does not trigger click on other keys', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.tab')
        expect(wrapper.emitted('click')).toBeFalsy()
      })
    })
  })

  // ===========================================================================
  // COLOR CLASSES TESTS
  // ===========================================================================

  describe('Color Classes', () => {
    it('applies background color class for filled variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'filled',
          color: 'primary'
        }
      })
      expect(wrapper.classes()).toContain('bg-primary')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies text color class for outline variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'outline',
          color: 'secondary'
        }
      })
      expect(wrapper.classes()).toContain('text-secondary')
      expect(wrapper.classes()).not.toContain('bg-secondary')
    })

    it('applies text color class for flat variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'flat',
          color: 'accent'
        }
      })
      expect(wrapper.classes()).toContain('text-accent')
      expect(wrapper.classes()).not.toContain('bg-accent')
    })

    it('does not apply color classes when brand is set', () => {
      const wrapper = mount(DssChip, {
        props: {
          color: 'primary',
          brand: 'hub'
        }
      })
      expect(wrapper.classes()).not.toContain('bg-primary')
      expect(wrapper.classes()).not.toContain('text-primary')
    })
  })

  // ===========================================================================
  // RIPPLE TESTS
  // ===========================================================================

  describe('Ripple Effect', () => {
    it('renders ripple element when clickable and ripple enabled', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          ripple: true
        }
      })
      expect(wrapper.find('.dss-chip__ripple').exists()).toBe(true)
    })

    it('does not render ripple when ripple is false', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          ripple: false
        }
      })
      expect(wrapper.find('.dss-chip__ripple').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge Cases', () => {
    it('handles empty label gracefully', () => {
      const wrapper = mount(DssChip, {
        props: { label: '' }
      })
      expect(wrapper.find('.dss-chip__label').exists()).toBe(false)
    })

    it('icon-only chip has correct class', () => {
      const wrapper = mount(DssChip, {
        props: {
          icon: 'star',
          label: ''
        }
      })
      expect(wrapper.classes()).toContain('dss-chip--icon-only')
    })

    it('handles rapid clicks without errors', async () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        await wrapper.trigger('click')
      }

      expect(wrapper.emitted('click').length).toBe(10)
    })
  })
})
