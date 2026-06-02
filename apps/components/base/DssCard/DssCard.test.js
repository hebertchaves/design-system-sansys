/**
 * ==========================================================================
 * DssCard - UNIT TESTS
 *
 * COBERTURA:
 * - Props: variant, square, clickable, dark, brand
 * - Slots: default
 * - Eventos: click (somente quando clickable=true)
 * - Acessibilidade: tabindex, role, teclado (Enter, Space)
 * - Brands: Hub, Water, Waste
 * - Variantes visuais: elevated, flat, bordered, outlined
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssCard from './1-structure/DssCard.ts.vue'

installQuasar()

describe('DssCard', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('renders with classe base dss-card', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.classes()).toContain('dss-card')
    })

    it('aplica variante default elevated', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.classes()).toContain('dss-card--elevated')
    })

    it('elemento raiz é uma div', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('defineOptions define o nome DssCard', () => {
      expect(DssCard.name).toBe('DssCard')
    })
  })

  // ===========================================================================
  // PROPS — VARIANT
  // ===========================================================================

  describe('Props: variant', () => {
    it.each(['elevated', 'flat', 'bordered', 'outlined'])(
      'aplica classe dss-card--%s para variant="%s"',
      (variant) => {
        const wrapper = mount(DssCard, { props: { variant } })
        expect(wrapper.classes()).toContain(`dss-card--${variant}`)
      }
    )
  })

  // ===========================================================================
  // PROPS — SQUARE
  // ===========================================================================

  describe('Props: square', () => {
    it('aplica dss-card--square quando square=true', () => {
      const wrapper = mount(DssCard, { props: { square: true } })
      expect(wrapper.classes()).toContain('dss-card--square')
    })

    it('não aplica dss-card--square quando square=false', () => {
      const wrapper = mount(DssCard, { props: { square: false } })
      expect(wrapper.classes()).not.toContain('dss-card--square')
    })
  })

  // ===========================================================================
  // PROPS — DARK
  // ===========================================================================

  describe('Props: dark', () => {
    it('aplica dss-card--dark quando dark=true', () => {
      const wrapper = mount(DssCard, { props: { dark: true } })
      expect(wrapper.classes()).toContain('dss-card--dark')
    })

    it('não aplica dss-card--dark quando dark=false', () => {
      const wrapper = mount(DssCard, { props: { dark: false } })
      expect(wrapper.classes()).not.toContain('dss-card--dark')
    })
  })

  // ===========================================================================
  // PROPS — CLICKABLE
  // ===========================================================================

  describe('Props: clickable', () => {
    it('aplica dss-card--clickable quando clickable=true', () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      expect(wrapper.classes()).toContain('dss-card--clickable')
    })

    it('não aplica dss-card--clickable quando clickable=false', () => {
      const wrapper = mount(DssCard, { props: { clickable: false } })
      expect(wrapper.classes()).not.toContain('dss-card--clickable')
    })

    it('adiciona tabindex="0" quando clickable=true', () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('não adiciona tabindex quando clickable=false', () => {
      const wrapper = mount(DssCard, { props: { clickable: false } })
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('adiciona role="article" quando clickable=true', () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      expect(wrapper.attributes('role')).toBe('article')
    })

    it('não adiciona role quando clickable=false', () => {
      const wrapper = mount(DssCard, { props: { clickable: false } })
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('card não-clicável não tem tabindex', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EVENTOS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite click ao clicar quando clickable=true', async () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('não emite click ao clicar quando clickable=false', async () => {
      const wrapper = mount(DssCard, { props: { clickable: false } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emite click ao pressionar Enter quando clickable=true', async () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      await wrapper.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emite click ao pressionar Space quando clickable=true', async () => {
      const wrapper = mount(DssCard, { props: { clickable: true } })
      await wrapper.trigger('keydown.space')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('não emite click ao pressionar Enter quando clickable=false', async () => {
      const wrapper = mount(DssCard, { props: { clickable: false } })
      await wrapper.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo do slot default', () => {
      const wrapper = mount(DssCard, {
        slots: { default: '<span class="content">Conteúdo do card</span>' }
      })
      expect(wrapper.find('.content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Conteúdo do card')
    })

    it('renderiza múltiplos filhos no slot default', () => {
      const wrapper = mount(DssCard, {
        slots: {
          default: '<div class="header">Título</div><div class="body">Corpo</div>'
        }
      })
      expect(wrapper.find('.header').exists()).toBe(true)
      expect(wrapper.find('.body').exists()).toBe(true)
    })

    it('renderiza corretamente sem slot default', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.classes()).toContain('dss-card')
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica dss-card--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssCard, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-card--brand-hub')
    })

    it('aplica dss-card--brand-water quando brand="water"', () => {
      const wrapper = mount(DssCard, { props: { brand: 'water' } })
      expect(wrapper.classes()).toContain('dss-card--brand-water')
    })

    it('aplica dss-card--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssCard, { props: { brand: 'waste' } })
      expect(wrapper.classes()).toContain('dss-card--brand-waste')
    })

    it('não aplica classe de brand quando brand=null', () => {
      const wrapper = mount(DssCard, { props: { brand: null } })
      expect(wrapper.classes().some((c) => c.startsWith('dss-card--brand-'))).toBe(false)
    })

    it('não aplica classe de brand por padrão', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.classes().some((c) => c.startsWith('dss-card--brand-'))).toBe(false)
    })
  })

  // ===========================================================================
  // NÃO-INTERATIVO (GOLDEN REF: DssBadge)
  // ===========================================================================

  describe('Não-interativo por padrão', () => {
    it('card padrão não possui states de hover/active interativos (sem clickable)', () => {
      const wrapper = mount(DssCard)
      expect(wrapper.classes()).not.toContain('dss-card--clickable')
      expect(wrapper.attributes('tabindex')).toBeUndefined()
      expect(wrapper.attributes('role')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('combina variant + square + brand corretamente', () => {
      const wrapper = mount(DssCard, {
        props: { variant: 'flat', square: true, brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-card--flat')
      expect(wrapper.classes()).toContain('dss-card--square')
      expect(wrapper.classes()).toContain('dss-card--brand-hub')
    })

    it('combina clickable + brand corretamente', () => {
      const wrapper = mount(DssCard, {
        props: { clickable: true, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-card--clickable')
      expect(wrapper.classes()).toContain('dss-card--brand-water')
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('encaminha atributos extras via v-bind="$attrs"', () => {
      const wrapper = mount(DssCard, {
        attrs: { 'data-testid': 'meu-card' }
      })
      expect(wrapper.attributes('data-testid')).toBe('meu-card')
    })
  })
})
