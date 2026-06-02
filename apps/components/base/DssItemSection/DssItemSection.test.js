/**
 * ==========================================================================
 * DssItemSection - UNIT TESTS
 *
 * COBERTURA:
 * - Props: avatar, thumbnail, side, top, noWrap
 * - Classes DSS: dss-item-section, variantes --avatar, --thumbnail, --side,
 *                --top, --nowrap
 * - Props passadas ao QItemSection: avatar, thumbnail, side, top, noWrap
 * - Slot: default (conteúdo da seção)
 * - Estrutura: QItemSection como elemento raiz (EXC-01)
 * - Sem brand próprio (herda via ancestral)
 * - Sem interatividade
 *
 * GOLDEN REFERENCE: DssAvatar (para seções de mídia)
 * GOLDEN CONTEXT: DssList (container pai da família)
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssItemSection from './1-structure/DssItemSection.ts.vue'

installQuasar()

describe('DssItemSection', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('monta sem erros', () => {
      expect(() => mount(DssItemSection)).not.toThrow()
    })

    it('aplica classe dss-item-section ao elemento raiz', () => {
      const wrapper = mount(DssItemSection)
      expect(wrapper.classes()).toContain('dss-item-section')
    })
  })

  // ===========================================================================
  // PROPS — VARIANTES
  // ===========================================================================

  describe('Props — Variantes', () => {
    describe('avatar', () => {
      it('avatar=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItemSection)
        expect(wrapper.classes()).not.toContain('dss-item-section--avatar')
      })

      it('avatar=true aplica dss-item-section--avatar', () => {
        const wrapper = mount(DssItemSection, {
          props: { avatar: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--avatar')
      })

      it('avatar=true é repassado ao QItemSection', () => {
        const wrapper = mount(DssItemSection, {
          props: { avatar: true }
        })
        const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
        expect(qItemSection.props('avatar')).toBe(true)
      })
    })

    describe('thumbnail', () => {
      it('thumbnail=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItemSection)
        expect(wrapper.classes()).not.toContain('dss-item-section--thumbnail')
      })

      it('thumbnail=true aplica dss-item-section--thumbnail', () => {
        const wrapper = mount(DssItemSection, {
          props: { thumbnail: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--thumbnail')
      })

      it('thumbnail=true é repassado ao QItemSection', () => {
        const wrapper = mount(DssItemSection, {
          props: { thumbnail: true }
        })
        const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
        expect(qItemSection.props('thumbnail')).toBe(true)
      })
    })

    describe('side', () => {
      it('side=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItemSection)
        expect(wrapper.classes()).not.toContain('dss-item-section--side')
      })

      it('side=true aplica dss-item-section--side', () => {
        const wrapper = mount(DssItemSection, {
          props: { side: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--side')
      })

      it('side=true é repassado ao QItemSection', () => {
        const wrapper = mount(DssItemSection, {
          props: { side: true }
        })
        const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
        expect(qItemSection.props('side')).toBe(true)
      })
    })

    describe('top', () => {
      it('top=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItemSection)
        expect(wrapper.classes()).not.toContain('dss-item-section--top')
      })

      it('top=true aplica dss-item-section--top', () => {
        const wrapper = mount(DssItemSection, {
          props: { top: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--top')
      })

      it('top=true é repassado ao QItemSection', () => {
        const wrapper = mount(DssItemSection, {
          props: { top: true }
        })
        const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
        expect(qItemSection.props('top')).toBe(true)
      })
    })

    describe('noWrap', () => {
      it('noWrap=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItemSection)
        expect(wrapper.classes()).not.toContain('dss-item-section--nowrap')
      })

      it('noWrap=true aplica dss-item-section--nowrap', () => {
        const wrapper = mount(DssItemSection, {
          props: { noWrap: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--nowrap')
      })

      it('noWrap=true é repassado ao QItemSection', () => {
        const wrapper = mount(DssItemSection, {
          props: { noWrap: true }
        })
        const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
        expect(qItemSection.props('noWrap')).toBe(true)
      })
    })

    describe('combinações de props', () => {
      it('side=true + top=true: ambas as classes aplicadas', () => {
        const wrapper = mount(DssItemSection, {
          props: { side: true, top: true }
        })
        expect(wrapper.classes()).toContain('dss-item-section--side')
        expect(wrapper.classes()).toContain('dss-item-section--top')
      })
    })
  })

  // ===========================================================================
  // PROPS PADRÃO (sem modificação)
  // ===========================================================================

  describe('Props padrão — estado default', () => {
    it('todas as props booleanas são false por padrão', () => {
      const wrapper = mount(DssItemSection)
      const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
      expect(qItemSection.props('avatar')).toBe(false)
      expect(qItemSection.props('thumbnail')).toBe(false)
      expect(qItemSection.props('side')).toBe(false)
      expect(qItemSection.props('top')).toBe(false)
      expect(qItemSection.props('noWrap')).toBe(false)
    })
  })

  // ===========================================================================
  // SLOT TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo do slot default', () => {
      const wrapper = mount(DssItemSection, {
        slots: { default: '<span class="avatar-mock">AV</span>' }
      })
      expect(wrapper.find('.avatar-mock').exists()).toBe(true)
      expect(wrapper.find('.avatar-mock').text()).toBe('AV')
    })

    it('renderiza múltiplos elementos no slot default', () => {
      const wrapper = mount(DssItemSection, {
        slots: {
          default: `
            <span class="label-text">Nome</span>
            <span class="caption-text">Cargo</span>
          `
        }
      })
      expect(wrapper.find('.label-text').exists()).toBe(true)
      expect(wrapper.find('.caption-text').exists()).toBe(true)
    })

    it('monta sem slot sem erros', () => {
      expect(() => mount(DssItemSection)).not.toThrow()
    })
  })

  // ===========================================================================
  // SEM BRAND PRÓPRIO
  // ===========================================================================

  describe('Sem brand próprio', () => {
    it('NÃO possui data-brand (brand é herdado via ancestral)', () => {
      const wrapper = mount(DssItemSection)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // NÃO-INTERATIVIDADE
  // ===========================================================================

  describe('Não-interatividade', () => {
    it('NÃO possui role interativo', () => {
      const wrapper = mount(DssItemSection)
      const role = wrapper.attributes('role')
      // Sem role explícito ou role neutro (não "button", "link", etc.)
      expect(role).not.toBe('button')
      expect(role).not.toBe('link')
    })

    it('NÃO possui tabindex', () => {
      const wrapper = mount(DssItemSection)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // ATTRS FORWARDING
  // ===========================================================================

  describe('$attrs forwarding', () => {
    it('repassa data-testid ao QItemSection', () => {
      const wrapper = mount(DssItemSection, {
        attrs: { 'data-testid': 'avatar-section' }
      })
      const qItemSection = wrapper.findComponent({ name: 'QItemSection' })
      expect(qItemSection.attributes('data-testid')).toBe('avatar-section')
    })
  })
})
