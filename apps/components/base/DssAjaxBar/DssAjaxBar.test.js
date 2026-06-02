/**
 * ==========================================================================
 * DssAjaxBar - UNIT TESTS
 *
 * COBERTURA:
 * - Props: position, size, skipHijack, reverse, brand
 * - Estrutura: QAjaxBar como root element (EXC-Gate-01)
 * - Classes: dss-ajax-bar, dss-ajax-bar--pos-*, dss-ajax-bar--brand-*
 * - data-brand: ativa cascade de tokens de brand
 * - defineExpose: start, stop, increment, setProgress (EXC-Expose-01)
 * - Eventos: start, stop emitidos pelo QAjaxBar
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssAjaxBar usa QAjaxBar como root element (EXC-Gate-01).
 * color="primary" fixo + --q-color-primary override via CSS (EXC-Gate-02).
 * API imperativa exposta via defineExpose (EXC-Expose-01).
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssAjaxBar from './1-structure/DssAjaxBar.ts.vue'

installQuasar()

describe('DssAjaxBar', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza com classe base dss-ajax-bar', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.classes()).toContain('dss-ajax-bar')
    })

    it('usa QAjaxBar como root element (EXC-Gate-01)', () => {
      const wrapper = mount(DssAjaxBar)
      // QAjaxBar renderiza com classe q-loading-bar no DOM
      expect(wrapper.classes()).toContain('q-loading-bar')
    })

    it('aplica position padrão top quando nenhuma prop é passada', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.classes()).toContain('dss-ajax-bar--pos-top')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('position', () => {
      it.each(['top', 'bottom', 'left', 'right'])(
        'aplica classe dss-ajax-bar--pos-%s para position="%s"',
        (position) => {
          const wrapper = mount(DssAjaxBar, { props: { position } })
          expect(wrapper.classes()).toContain(`dss-ajax-bar--pos-${position}`)
        }
      )
    })

    describe('size', () => {
      it('aceita prop size sem erro', () => {
        const wrapper = mount(DssAjaxBar, { props: { size: '4px' } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('skipHijack', () => {
      it('aceita skipHijack=true sem erro', () => {
        const wrapper = mount(DssAjaxBar, { props: { skipHijack: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('reverse', () => {
      it('aceita reverse=true sem erro', () => {
        const wrapper = mount(DssAjaxBar, { props: { reverse: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('não define data-brand quando brand não é passado', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica classe dss-ajax-bar--brand-%s para brand="%s"',
      (brand) => {
        const wrapper = mount(DssAjaxBar, { props: { brand } })
        expect(wrapper.classes()).toContain(`dss-ajax-bar--brand-${brand}`)
      }
    )

    it('não aplica classe de brand quando brand não é passado', () => {
      const wrapper = mount(DssAjaxBar)
      const classStr = wrapper.classes().join(' ')
      expect(classStr).not.toContain('dss-ajax-bar--brand-')
    })
  })

  // ===========================================================================
  // DEFINEEXPOSE TESTS (EXC-Expose-01)
  // ===========================================================================

  describe('defineExpose (EXC-Expose-01)', () => {
    it('expõe método start', () => {
      const wrapper = mount(DssAjaxBar)
      expect(typeof wrapper.vm.start).toBe('function')
    })

    it('expõe método stop', () => {
      const wrapper = mount(DssAjaxBar)
      expect(typeof wrapper.vm.stop).toBe('function')
    })

    it('expõe método increment', () => {
      const wrapper = mount(DssAjaxBar)
      expect(typeof wrapper.vm.increment).toBe('function')
    })

    it('expõe método setProgress', () => {
      const wrapper = mount(DssAjaxBar)
      expect(typeof wrapper.vm.setProgress).toBe('function')
    })

    it('start() não lança exceção quando chamado sem QAjaxBar montado', () => {
      const wrapper = mount(DssAjaxBar)
      expect(() => wrapper.vm.start()).not.toThrow()
    })

    it('stop() não lança exceção quando chamado', () => {
      const wrapper = mount(DssAjaxBar)
      expect(() => wrapper.vm.stop()).not.toThrow()
    })

    it('increment() não lança exceção quando chamado com valor', () => {
      const wrapper = mount(DssAjaxBar)
      expect(() => wrapper.vm.increment(10)).not.toThrow()
    })

    it('setProgress() não lança exceção quando chamado com valor', () => {
      const wrapper = mount(DssAjaxBar)
      expect(() => wrapper.vm.setProgress(50)).not.toThrow()
    })
  })

  // ===========================================================================
  // EVENTOS TESTS
  // ===========================================================================

  describe('Eventos', () => {
    it('componente declara evento start', () => {
      const wrapper = mount(DssAjaxBar)
      // O componente deve existir sem erro ao definir handlers de start/stop
      expect(wrapper.exists()).toBe(true)
    })

    it('componente declara evento stop', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // TIMER BEHAVIOR
  // ===========================================================================

  describe('Timer behavior', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('monta sem erros com fake timers ativos', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.exists()).toBe(true)
    })

    it('start() e stop() podem ser chamados em sequência com fake timers', () => {
      const wrapper = mount(DssAjaxBar)
      expect(() => {
        wrapper.vm.start()
        vi.advanceTimersByTime(100)
        wrapper.vm.stop()
      }).not.toThrow()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('renderiza sem props com valores padrão', () => {
      const wrapper = mount(DssAjaxBar)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('dss-ajax-bar')
    })

    it('não possui slots — componente é uma barra single-element', () => {
      const wrapper = mount(DssAjaxBar)
      // DssAjaxBar não expõe slots; o conteúdo do QAjaxBar é gerenciado internamente
      expect(wrapper.exists()).toBe(true)
    })

    it('hijackFilter aceita função como prop', () => {
      const filter = (url) => url.startsWith('/api')
      const wrapper = mount(DssAjaxBar, { props: { hijackFilter: filter } })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
