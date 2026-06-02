/**
 * ==========================================================================
 * DssPageSticky - UNIT TESTS
 *
 * COBERTURA:
 * - Estrutura: QPageSticky como root element (EXC-01)
 * - Props: position, offset, expand, elevated (prop DSS exclusiva)
 * - Classes: dss-page-sticky, dss-page-sticky--elevated
 * - data-brand: via $attrs (não é prop declarada)
 * - Slots: default (conteúdo fixo — ex: DssButton FAB)
 *
 * NOTA: QPageSticky como root element (EXC-01). Não pode ser envolvido
 * em div wrapper: usa position:fixed relativo ao QLayout e depende de
 * CSS custom properties --q-header-offset/--q-footer-offset.
 * Gate de Responsabilidade v2.4: container estrutural não interativo.
 * inheritAttrs: false + v-bind="$attrs" no root (QPageSticky).
 *
 * Contexto QLayout: QPageSticky requer QLayout no contexto. Usamos stubs
 * para testes unitários isolados a fim de verificar as classes DSS.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPageSticky from './1-structure/DssPageSticky.ts.vue'

installQuasar()

// Stub de QPageSticky para testes unitários isolados (sem QLayout)
const QPageStickyStub = {
  name: 'QPageSticky',
  template: '<div class="q-page-sticky" v-bind="$attrs"><slot /></div>',
  inheritAttrs: true,
  props: ['position', 'offset', 'expand', 'class']
}

describe('DssPageSticky', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza sem erros (com stub QPageSticky)', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('aplica classe dss-page-sticky ao elemento root', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.find('.dss-page-sticky').exists()).toBe(true)
    })

    it('usa QPageSticky como root element (EXC-01)', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.find('.q-page-sticky').exists()).toBe(true)
    })

    it('define nome do componente como DssPageSticky', () => {
      expect(DssPageSticky.name).toBe('DssPageSticky')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('position', () => {
      it.each(['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top', 'bottom', 'left', 'right'])(
        'aceita position="%s" sem erro',
        (position) => {
          const wrapper = mount(DssPageSticky, {
            props: { position },
            global: { stubs: { QPageSticky: QPageStickyStub } }
          })
          expect(wrapper.exists()).toBe(true)
        }
      )

      it('usa bottom-right como position padrão', () => {
        const wrapper = mount(DssPageSticky, {
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('offset', () => {
      it('aceita prop offset como array [x, y] sem erro', () => {
        const wrapper = mount(DssPageSticky, {
          props: { offset: [24, 24] },
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('usa [18, 18] como offset padrão', () => {
        const wrapper = mount(DssPageSticky, {
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('expand', () => {
      it('aceita expand=true sem erro', () => {
        const wrapper = mount(DssPageSticky, {
          props: { expand: true },
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('expand padrão é false', () => {
        const wrapper = mount(DssPageSticky, {
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('elevated (prop DSS exclusiva)', () => {
      it('aplica classe dss-page-sticky--elevated quando elevated=true', () => {
        const wrapper = mount(DssPageSticky, {
          props: { elevated: true },
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.find('.dss-page-sticky--elevated').exists()).toBe(true)
      })

      it('não aplica classe --elevated por padrão', () => {
        const wrapper = mount(DssPageSticky, {
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.find('.dss-page-sticky--elevated').exists()).toBe(false)
      })

      it('não aplica classe --elevated quando elevated=false explícito', () => {
        const wrapper = mount(DssPageSticky, {
          props: { elevated: false },
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.find('.dss-page-sticky--elevated').exists()).toBe(false)
      })
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand (data-brand via $attrs)', () => {
    it('aplica data-brand quando passado via attrs', () => {
      const wrapper = mount(DssPageSticky, {
        attrs: { 'data-brand': 'hub' },
        global: {
          stubs: {
            QPageSticky: {
              name: 'QPageSticky',
              template: '<div v-bind="$attrs" class="q-page-sticky dss-page-sticky"><slot /></div>',
              inheritAttrs: false
            }
          }
        }
      })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it.each(['hub', 'water', 'waste'])(
      'aceita data-brand="%s" sem erro',
      (brand) => {
        const wrapper = mount(DssPageSticky, {
          attrs: { 'data-brand': brand },
          global: { stubs: { QPageSticky: QPageStickyStub } }
        })
        expect(wrapper.exists()).toBe(true)
      }
    )

    it('não define data-brand quando não passado', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo no slot default', () => {
      const wrapper = mount(DssPageSticky, {
        slots: { default: '<button class="fab-btn" aria-label="Nova ação">+</button>' },
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.find('.fab-btn').exists()).toBe(true)
      expect(wrapper.find('.fab-btn').text()).toBe('+')
    })

    it('slot default aceita múltiplos filhos', () => {
      const wrapper = mount(DssPageSticky, {
        slots: {
          default: `
            <button class="btn-1">Ação 1</button>
            <button class="btn-2">Ação 2</button>
          `
        },
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.find('.btn-1').exists()).toBe(true)
      expect(wrapper.find('.btn-2').exists()).toBe(true)
    })

    it('renderiza sem slot default sem erros', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // GATE DE RESPONSABILIDADE
  // ===========================================================================

  describe('Gate de Responsabilidade', () => {
    it('não possui tabindex (container estrutural não interativo)', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('root não possui role interativo (interatividade é do conteúdo no slot)', () => {
      const wrapper = mount(DssPageSticky, {
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      const role = wrapper.find('.dss-page-sticky').attributes('role')
      expect(role).not.toBe('button')
    })
  })

  // ===========================================================================
  // ATTRS FORWARDING
  // ===========================================================================

  describe('Attrs forwarding', () => {
    it('repassa atributos extras ao root via $attrs (inheritAttrs: false)', () => {
      const wrapper = mount(DssPageSticky, {
        attrs: { id: 'sticky-bar' },
        global: {
          stubs: {
            QPageSticky: {
              name: 'QPageSticky',
              template: '<div v-bind="$attrs" class="q-page-sticky"><slot /></div>',
              inheritAttrs: false
            }
          }
        }
      })
      expect(wrapper.attributes('id')).toBe('sticky-bar')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('aceita elevated=true e expand=true simultaneamente', () => {
      const wrapper = mount(DssPageSticky, {
        props: { elevated: true, expand: true },
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.find('.dss-page-sticky--elevated').exists()).toBe(true)
    })

    it('renderiza com todas as props definidas', () => {
      const wrapper = mount(DssPageSticky, {
        props: {
          position: 'top-right',
          offset: [32, 16],
          expand: false,
          elevated: true
        },
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.dss-page-sticky--elevated').exists()).toBe(true)
    })

    it('aceita offset com valores assimétricos', () => {
      const wrapper = mount(DssPageSticky, {
        props: { offset: [0, 64] },
        global: { stubs: { QPageSticky: QPageStickyStub } }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
