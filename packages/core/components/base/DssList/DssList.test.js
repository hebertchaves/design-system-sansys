/**
 * ==========================================================================
 * DssList - UNIT TESTS
 *
 * COBERTURA:
 * - Props: bordered, separator, padding, brand, ariaLabel, ariaLabelledby
 * - Classes DSS: dss-list, variantes --bordered, --separator, --padding, --brand-*
 * - data-brand: aplicado quando brand presente, ausente quando null
 * - Slot: default (DssItem filhos)
 * - Acessibilidade: role="list", aria-label, aria-labelledby
 * - Estrutura: div raiz (NÃO wraps QList — custom div com role="list")
 *
 * GOLDEN REFERENCE: DssBadge (não-interativo)
 * GOLDEN CONTEXT: DssCard (container estrutural)
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssList from './1-structure/DssList.ts.vue'

installQuasar()

describe('DssList', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('monta sem erros', () => {
      expect(() => mount(DssList)).not.toThrow()
    })

    it('aplica classe dss-list ao elemento raiz', () => {
      const wrapper = mount(DssList)
      expect(wrapper.classes()).toContain('dss-list')
    })

    it('elemento raiz é uma div', () => {
      const wrapper = mount(DssList)
      expect(wrapper.element.tagName).toBe('DIV')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('bordered', () => {
      it('bordered=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssList)
        expect(wrapper.classes()).not.toContain('dss-list--bordered')
      })

      it('bordered=true aplica dss-list--bordered', () => {
        const wrapper = mount(DssList, {
          props: { bordered: true }
        })
        expect(wrapper.classes()).toContain('dss-list--bordered')
      })
    })

    describe('separator', () => {
      it('separator=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssList)
        expect(wrapper.classes()).not.toContain('dss-list--separator')
      })

      it('separator=true aplica dss-list--separator', () => {
        const wrapper = mount(DssList, {
          props: { separator: true }
        })
        expect(wrapper.classes()).toContain('dss-list--separator')
      })
    })

    describe('padding', () => {
      it('padding=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssList)
        expect(wrapper.classes()).not.toContain('dss-list--padding')
      })

      it('padding=true aplica dss-list--padding', () => {
        const wrapper = mount(DssList, {
          props: { padding: true }
        })
        expect(wrapper.classes()).toContain('dss-list--padding')
      })
    })

    describe('brand', () => {
      it('sem brand — NÃO aplica data-brand', () => {
        const wrapper = mount(DssList)
        expect(wrapper.attributes('data-brand')).toBeUndefined()
      })

      it.each(['hub', 'water', 'waste'])('brand="%s" aplica data-brand corretamente', (brand) => {
        const wrapper = mount(DssList, {
          props: { brand }
        })
        expect(wrapper.attributes('data-brand')).toBe(brand)
      })

      it('brand="hub" aplica classe dss-list--brand-hub', () => {
        const wrapper = mount(DssList, {
          props: { brand: 'hub' }
        })
        expect(wrapper.classes()).toContain('dss-list--brand-hub')
      })

      it('brand="water" aplica classe dss-list--brand-water', () => {
        const wrapper = mount(DssList, {
          props: { brand: 'water' }
        })
        expect(wrapper.classes()).toContain('dss-list--brand-water')
      })

      it('brand="waste" aplica classe dss-list--brand-waste', () => {
        const wrapper = mount(DssList, {
          props: { brand: 'waste' }
        })
        expect(wrapper.classes()).toContain('dss-list--brand-waste')
      })
    })

    describe('combinações de props', () => {
      it('aplica múltiplas variantes simultaneamente', () => {
        const wrapper = mount(DssList, {
          props: { bordered: true, separator: true, padding: true }
        })
        expect(wrapper.classes()).toContain('dss-list--bordered')
        expect(wrapper.classes()).toContain('dss-list--separator')
        expect(wrapper.classes()).toContain('dss-list--padding')
      })
    })
  })

  // ===========================================================================
  // SLOT TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo do slot default', () => {
      const wrapper = mount(DssList, {
        slots: { default: '<li class="test-item">Item 1</li>' }
      })
      expect(wrapper.find('.test-item').exists()).toBe(true)
      expect(wrapper.find('.test-item').text()).toBe('Item 1')
    })

    it('renderiza múltiplos filhos no slot default', () => {
      const wrapper = mount(DssList, {
        slots: {
          default: `
            <div class="item-a">Item A</div>
            <div class="item-b">Item B</div>
            <div class="item-c">Item C</div>
          `
        }
      })
      expect(wrapper.find('.item-a').exists()).toBe(true)
      expect(wrapper.find('.item-b').exists()).toBe(true)
      expect(wrapper.find('.item-c').exists()).toBe(true)
    })

    it('monta sem slot sem erros', () => {
      expect(() => mount(DssList)).not.toThrow()
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('possui role="list"', () => {
      const wrapper = mount(DssList)
      expect(wrapper.attributes('role')).toBe('list')
    })

    it('aplica aria-label quando fornecido', () => {
      const wrapper = mount(DssList, {
        props: { ariaLabel: 'Lista de usuários' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Lista de usuários')
    })

    it('aplica aria-labelledby quando fornecido', () => {
      const wrapper = mount(DssList, {
        props: { ariaLabelledby: 'titulo-lista' }
      })
      expect(wrapper.attributes('aria-labelledby')).toBe('titulo-lista')
    })

    it('NÃO aplica aria-label por padrão', () => {
      const wrapper = mount(DssList)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })

  // ===========================================================================
  // NÃO-INTERATIVIDADE (container passivo)
  // ===========================================================================

  describe('Não-interatividade', () => {
    it('NÃO possui classes de estado interativo (hover, focus, active)', () => {
      const wrapper = mount(DssList)
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('--hover')
      expect(classes).not.toContain('--focus')
      expect(classes).not.toContain('--active')
      expect(classes).not.toContain('--disabled')
    })
  })
})
