/**
 * ==========================================================================
 * DssBtnGroup - UNIT TESTS
 *
 * COBERTURA:
 * - Props: flat, outline, push, unelevated, rounded, square, glossy, spread, stretch, brand
 * - Slot: default (botoes filhos)
 * - Classes CSS: dss-btn-group, variantes de estilo, modificadores de layout/forma
 * - Acessibilidade: role="group", aria-label
 * - Brand: classes de marca
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 * NOTA: Nao testa comportamento interno do QBtnGroup (border-radius de filhos,
 * gaps, etc.). Testa apenas o que o DSS wrapper adiciona: classes, role, slots.
 *
 * REGRA DE OURO (Prop Sync):
 * Props de estilo do DssBtnGroup NAO sao propagadas automaticamente para os
 * filhos — o consumidor e responsavel por sincronizar as props.
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBtnGroup from './1-structure/DssBtnGroup.ts.vue'

installQuasar()

describe('DssBtnGroup', () => {
  // ===========================================================================
  // RENDERIZACAO BASICA
  // ===========================================================================

  describe('Renderizacao Basica', () => {
    it('renderiza com classe base dss-btn-group', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.classes()).toContain('dss-btn-group')
    })

    it('elemento raiz e uma div', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('possui role="group" para acessibilidade WAI-ARIA', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.attributes('role')).toBe('group')
    })

    it('usa inheritAttrs: false', () => {
      expect(DssBtnGroup.inheritAttrs).toBe(false)
    })

    it('renderiza sem erros com props padrao', () => {
      expect(() => mount(DssBtnGroup)).not.toThrow()
    })
  })

  // ===========================================================================
  // PROPS - VARIANTES DE ESTILO
  // ===========================================================================

  describe('Props - Variantes de Estilo', () => {
    it('aplica classe dss-btn-group--flat quando flat=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { flat: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--flat')
    })

    it('nao aplica classe flat quando flat=false (padrao)', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.classes()).not.toContain('dss-btn-group--flat')
    })

    it('aplica classe dss-btn-group--outline quando outline=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { outline: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--outline')
    })

    it('nao aplica classe outline quando outline=false (padrao)', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.classes()).not.toContain('dss-btn-group--outline')
    })

    it('aplica classe dss-btn-group--push quando push=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { push: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--push')
    })

    it('aplica classe dss-btn-group--unelevated quando unelevated=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { unelevated: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--unelevated')
    })

    it('aplica classe dss-btn-group--glossy quando glossy=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { glossy: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--glossy')
    })
  })

  // ===========================================================================
  // PROPS - MODIFICADORES DE FORMA
  // ===========================================================================

  describe('Props - Modificadores de Forma', () => {
    it('aplica classe dss-btn-group--rounded quando rounded=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { rounded: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--rounded')
    })

    it('aplica classe dss-btn-group--square quando square=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { square: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--square')
    })
  })

  // ===========================================================================
  // PROPS - MODIFICADORES DE LAYOUT
  // ===========================================================================

  describe('Props - Modificadores de Layout', () => {
    it('aplica classe dss-btn-group--spread quando spread=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { spread: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--spread')
    })

    it('aplica classe dss-btn-group--stretch quando stretch=true', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { stretch: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--stretch')
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteudo do slot default', () => {
      const wrapper = mount(DssBtnGroup, {
        slots: { default: '<button class="child-btn">Botao 1</button>' }
      })
      expect(wrapper.find('.child-btn').exists()).toBe(true)
    })

    it('renderiza multiplos filhos via slot default', () => {
      const wrapper = mount(DssBtnGroup, {
        slots: {
          default: `
            <button class="btn-a">A</button>
            <button class="btn-b">B</button>
            <button class="btn-c">C</button>
          `
        }
      })
      expect(wrapper.find('.btn-a').exists()).toBe(true)
      expect(wrapper.find('.btn-b').exists()).toBe(true)
      expect(wrapper.find('.btn-c').exists()).toBe(true)
    })

    it('renderiza sem filhos sem erros', () => {
      expect(() => mount(DssBtnGroup)).not.toThrow()
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('aplica aria-label quando fornecido via prop ariaLabel', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { ariaLabel: 'Acoes de formatacao' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Acoes de formatacao')
    })

    it('nao define aria-label quando ariaLabel nao e fornecido', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('grupo em si nao e focusavel (sem tabindex proprio)', () => {
      const wrapper = mount(DssBtnGroup)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica classe dss-btn-group--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--brand-hub')
    })

    it('aplica classe dss-btn-group--brand-water quando brand="water"', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--brand-water')
    })

    it('aplica classe dss-btn-group--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--brand-waste')
    })

    it('nao aplica classe de brand quando brand=null (padrao)', () => {
      const wrapper = mount(DssBtnGroup)
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('dss-btn-group--brand-')
    })
  })

  // ===========================================================================
  // CASOS DE BORDA
  // ===========================================================================

  describe('Casos de Borda', () => {
    it('combina multiplas props de variante simultaneamente', () => {
      // Embora nao seja uso recomendado, o componente nao impede combinacoes
      const wrapper = mount(DssBtnGroup, {
        props: { flat: true, rounded: true, spread: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--flat')
      expect(wrapper.classes()).toContain('dss-btn-group--rounded')
      expect(wrapper.classes()).toContain('dss-btn-group--spread')
    })

    it('combina brand com variante de estilo', () => {
      const wrapper = mount(DssBtnGroup, {
        props: { outline: true, brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-btn-group--outline')
      expect(wrapper.classes()).toContain('dss-btn-group--brand-hub')
    })
  })
})
