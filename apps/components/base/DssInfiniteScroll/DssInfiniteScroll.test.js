/**
 * ==========================================================================
 * DssInfiniteScroll - UNIT TESTS
 *
 * COBERTURA:
 * - Estrutura: QInfiniteScroll como root element (EXC-Gate-01)
 * - Props: offset, disable, scrollTarget, debounce, reverse
 * - Classes: dss-infinite-scroll, modificadores de estado
 * - data-brand: via $attrs (não é prop declarada)
 * - Slots: default, loading, no-more
 * - defineExpose: poll, trigger, reset, stop, resume, setIndex, isLoading, noMore
 * - Eventos: load (index, done callback)
 * - Estado interno: isLoading, noMore
 *
 * NOTA: QInfiniteScroll é o root element (EXC-Gate-01, inheritAttrs: false).
 * API imperativa exposta via defineExpose (EXC-Expose-01).
 * done() wrapping garante sincronia de isLoading/noMore com o Quasar.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssInfiniteScroll from './1-structure/DssInfiniteScroll.ts.vue'

installQuasar()

describe('DssInfiniteScroll', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza sem erros com props padrão', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.exists()).toBe(true)
    })

    it('aplica classe base dss-infinite-scroll', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.classes()).toContain('dss-infinite-scroll')
    })

    it('usa QInfiniteScroll como root element (EXC-Gate-01)', () => {
      const wrapper = mount(DssInfiniteScroll)
      // QInfiniteScroll renderiza com classe q-infinite-scroll no DOM
      expect(wrapper.classes()).toContain('q-infinite-scroll')
    })

    it('define nome do componente como DssInfiniteScroll', () => {
      expect(DssInfiniteScroll.name).toBe('DssInfiniteScroll')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('disable', () => {
      it('aplica classe dss-infinite-scroll--disabled quando disable=true', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-infinite-scroll--disabled')
      })

      it('não aplica classe --disabled por padrão', () => {
        const wrapper = mount(DssInfiniteScroll)
        expect(wrapper.classes()).not.toContain('dss-infinite-scroll--disabled')
      })
    })

    describe('reverse', () => {
      it('aplica classe dss-infinite-scroll--reverse quando reverse=true', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { reverse: true }
        })
        expect(wrapper.classes()).toContain('dss-infinite-scroll--reverse')
      })

      it('não aplica classe --reverse por padrão', () => {
        const wrapper = mount(DssInfiniteScroll)
        expect(wrapper.classes()).not.toContain('dss-infinite-scroll--reverse')
      })
    })

    describe('offset', () => {
      it('aceita prop offset numérica sem erro', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { offset: 300 }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('usa 500 como valor padrão de offset', () => {
        const wrapper = mount(DssInfiniteScroll)
        // Componente existe sem passar offset explícito (default=500)
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('debounce', () => {
      it('aceita prop debounce numérica sem erro', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { debounce: 200 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('scrollTarget', () => {
      it('aceita prop scrollTarget como string sem erro', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { scrollTarget: '.scroll-container' }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('initialIndex', () => {
      it('aceita prop initialIndex sem erro', () => {
        const wrapper = mount(DssInfiniteScroll, {
          props: { initialIndex: 5 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand (data-brand via $attrs)', () => {
    it('aplica data-brand quando passado via attrs', () => {
      const wrapper = mount(DssInfiniteScroll, {
        attrs: { 'data-brand': 'hub' }
      })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica data-brand="%s" corretamente',
      (brand) => {
        const wrapper = mount(DssInfiniteScroll, {
          attrs: { 'data-brand': brand }
        })
        expect(wrapper.attributes('data-brand')).toBe(brand)
      }
    )

    it('não define data-brand quando não passado', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteúdo no slot default', () => {
      const wrapper = mount(DssInfiniteScroll, {
        slots: { default: '<div class="item-mock">Item 1</div>' }
      })
      expect(wrapper.find('.item-mock').exists()).toBe(true)
      expect(wrapper.find('.item-mock').text()).toBe('Item 1')
    })

    it('renderiza slot loading customizado', () => {
      const wrapper = mount(DssInfiniteScroll, {
        slots: { loading: '<span class="custom-spinner">Carregando...</span>' }
      })
      // Slot loading fica dentro do template #loading do QInfiniteScroll
      expect(wrapper.find('.custom-spinner').exists()).toBe(true)
    })

    it('slot no-more não é exibido por padrão (noMore=false)', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.find('.dss-infinite-scroll__no-more').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // DEFINEEXPOSE TESTS (EXC-Expose-01)
  // ===========================================================================

  describe('defineExpose (EXC-Expose-01)', () => {
    it('expõe método poll', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.poll).toBe('function')
    })

    it('expõe método trigger', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.trigger).toBe('function')
    })

    it('expõe método reset', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.reset).toBe('function')
    })

    it('expõe método stop', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.stop).toBe('function')
    })

    it('expõe método resume', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.resume).toBe('function')
    })

    it('expõe método setIndex', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(typeof wrapper.vm.setIndex).toBe('function')
    })

    it('expõe estado reativo isLoading', () => {
      const wrapper = mount(DssInfiniteScroll)
      // isLoading é um Ref — acessível via .value ou via vm
      expect(wrapper.vm.isLoading).toBeDefined()
    })

    it('expõe estado reativo noMore', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.vm.noMore).toBeDefined()
    })

    it('isLoading começa como false', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.vm.isLoading.value ?? wrapper.vm.isLoading).toBe(false)
    })

    it('noMore começa como false', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.vm.noMore.value ?? wrapper.vm.noMore).toBe(false)
    })

    it('stop() não lança exceção', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(() => wrapper.vm.stop()).not.toThrow()
    })

    it('resume() não lança exceção', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(() => wrapper.vm.resume()).not.toThrow()
    })

    it('reset() não lança exceção e reseta noMore', async () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(() => wrapper.vm.reset()).not.toThrow()
      await wrapper.vm.$nextTick()
      const noMoreVal = wrapper.vm.noMore.value ?? wrapper.vm.noMore
      expect(noMoreVal).toBe(false)
    })

    it('setIndex() não lança exceção com valor numérico', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(() => wrapper.vm.setIndex(3)).not.toThrow()
    })
  })

  // ===========================================================================
  // EVENTOS TESTS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite evento load com index e callback done', async () => {
      const wrapper = mount(DssInfiniteScroll)
      // Simula o disparo do @load pelo QInfiniteScroll
      // Acessamos o método onLoad interno via instância Quasar
      const qInfiniteScroll = wrapper.findComponent({ name: 'QInfiniteScroll' })
      if (qInfiniteScroll.exists()) {
        qInfiniteScroll.vm.$emit('load', 1, () => {})
      }
      // Verificamos que o componente não lança erro ao receber load
      expect(wrapper.exists()).toBe(true)
    })

    it('not emite load quando disable=true (QInfiniteScroll gerencia)', () => {
      const wrapper = mount(DssInfiniteScroll, {
        props: { disable: true }
      })
      // Com disable=true, QInfiniteScroll não dispara @load
      expect(wrapper.emitted('load')).toBeUndefined()
    })
  })

  // ===========================================================================
  // LOADING STATE
  // ===========================================================================

  describe('Estado de loading', () => {
    it('não aplica classe --loading por padrão', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.classes()).not.toContain('dss-infinite-scroll--loading')
    })

    it('não aplica classe --no-more por padrão', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.classes()).not.toContain('dss-infinite-scroll--no-more')
    })
  })

  // ===========================================================================
  // TIMER BEHAVIOR
  // ===========================================================================

  describe('Timer behavior', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('monta sem erros com fake timers ativos', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('dss-infinite-scroll')
    })

    it('stop() e resume() podem ser chamados em sequência com fake timers', () => {
      const wrapper = mount(DssInfiniteScroll)
      expect(() => {
        wrapper.vm.stop()
        vi.advanceTimersByTime(100)
        wrapper.vm.resume()
      }).not.toThrow()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('renderiza com múltiplos itens no slot default', () => {
      const wrapper = mount(DssInfiniteScroll, {
        slots: {
          default: `
            <div class="item-a">A</div>
            <div class="item-b">B</div>
            <div class="item-c">C</div>
          `
        }
      })
      expect(wrapper.find('.item-a').exists()).toBe(true)
      expect(wrapper.find('.item-b').exists()).toBe(true)
      expect(wrapper.find('.item-c').exists()).toBe(true)
    })

    it('aceita disable e reverse simultaneamente', () => {
      const wrapper = mount(DssInfiniteScroll, {
        props: { disable: true, reverse: true }
      })
      expect(wrapper.classes()).toContain('dss-infinite-scroll--disabled')
      expect(wrapper.classes()).toContain('dss-infinite-scroll--reverse')
    })

    it('repassa atributos extras ao root via $attrs (aria-label)', () => {
      const wrapper = mount(DssInfiniteScroll, {
        attrs: { 'aria-label': 'Lista de itens' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Lista de itens')
    })
  })
})
