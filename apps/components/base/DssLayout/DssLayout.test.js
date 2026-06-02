/**
 * ==========================================================================
 * DssLayout - UNIT TESTS
 *
 * COBERTURA:
 * - Props: view, container
 * - Classes DSS: dss-layout, dss-layout--container
 * - Slot: default (conteúdo da página)
 * - Estrutura: QLayout como elemento raiz (EXC-01)
 * - Forwarding: $attrs passados ao q-layout
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * GOLDEN CONTEXT: DssPage (container raiz de aplicação)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssLayout from './1-structure/DssLayout.ts.vue'

installQuasar()

describe('DssLayout', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('monta sem erros', () => {
      expect(() => mount(DssLayout)).not.toThrow()
    })

    it('aplica classe dss-layout ao elemento raiz', () => {
      const wrapper = mount(DssLayout)
      expect(wrapper.classes()).toContain('dss-layout')
    })

    it('NÃO aplica dss-layout--container por padrão', () => {
      const wrapper = mount(DssLayout)
      expect(wrapper.classes()).not.toContain('dss-layout--container')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('view', () => {
      it('repassa prop view padrão "hHh lpR fFf" ao q-layout', () => {
        const wrapper = mount(DssLayout)
        const qLayout = wrapper.findComponent({ name: 'QLayout' })
        expect(qLayout.props('view')).toBe('hHh lpR fFf')
      })

      it('repassa prop view customizada ao q-layout', () => {
        const wrapper = mount(DssLayout, {
          props: { view: 'lHh lpR lfr' }
        })
        const qLayout = wrapper.findComponent({ name: 'QLayout' })
        expect(qLayout.props('view')).toBe('lHh lpR lfr')
      })
    })

    describe('container', () => {
      it('container=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssLayout)
        expect(wrapper.classes()).not.toContain('dss-layout--container')
      })

      it('container=true aplica classe dss-layout--container', () => {
        const wrapper = mount(DssLayout, {
          props: { container: true }
        })
        expect(wrapper.classes()).toContain('dss-layout--container')
      })

      it('container=true repassa prop ao q-layout', () => {
        const wrapper = mount(DssLayout, {
          props: { container: true }
        })
        const qLayout = wrapper.findComponent({ name: 'QLayout' })
        expect(qLayout.props('container')).toBe(true)
      })
    })
  })

  // ===========================================================================
  // SLOT TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo do slot default', () => {
      const wrapper = mount(DssLayout, {
        slots: { default: '<div class="page-content">Conteúdo</div>' }
      })
      expect(wrapper.find('.page-content').exists()).toBe(true)
      expect(wrapper.find('.page-content').text()).toBe('Conteúdo')
    })

    it('renderiza múltiplos elementos no slot default', () => {
      const wrapper = mount(DssLayout, {
        slots: {
          default: `
            <div class="header-mock">Header</div>
            <div class="page-mock">Page</div>
          `
        }
      })
      expect(wrapper.find('.header-mock').exists()).toBe(true)
      expect(wrapper.find('.page-mock').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ATTRS FORWARDING
  // ===========================================================================

  describe('$attrs forwarding', () => {
    it('repassa aria-label para o q-layout', () => {
      const wrapper = mount(DssLayout, {
        attrs: { 'aria-label': 'Aplicação Principal' }
      })
      const qLayout = wrapper.findComponent({ name: 'QLayout' })
      expect(qLayout.attributes('aria-label')).toBe('Aplicação Principal')
    })

    it('repassa data-testid para o q-layout', () => {
      const wrapper = mount(DssLayout, {
        attrs: { 'data-testid': 'main-layout' }
      })
      const qLayout = wrapper.findComponent({ name: 'QLayout' })
      expect(qLayout.attributes('data-testid')).toBe('main-layout')
    })
  })

  // ===========================================================================
  // ESTRUTURA (EXC-01)
  // ===========================================================================

  describe('Estrutura — EXC-01 QLayout como elemento raiz', () => {
    it('elemento raiz é QLayout (não um div wrapper)', () => {
      const wrapper = mount(DssLayout)
      // QLayout renderiza como div.q-layout no DOM
      const rootEl = wrapper.element
      // A classe q-layout indica que é o próprio QLayout sem wrapper externo
      expect(rootEl.classList.contains('q-layout')).toBe(true)
    })

    it('prop dark NÃO é aceita (bloqueada pelo DSS)', () => {
      // DssLayout não declara prop dark — dark mode via [data-theme="dark"] global
      const wrapper = mount(DssLayout)
      const qLayout = wrapper.findComponent({ name: 'QLayout' })
      // Verifica que dark não foi passado explicitamente
      expect(qLayout.props('dark')).toBeFalsy()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('monta sem slot', () => {
      expect(() => mount(DssLayout)).not.toThrow()
    })

    it('mantém classes DSS ao receber view incomum', () => {
      const wrapper = mount(DssLayout, {
        props: { view: 'hhr lpr ffr' }
      })
      expect(wrapper.classes()).toContain('dss-layout')
    })
  })
})
