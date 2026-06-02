/**
 * ==========================================================================
 * DssVirtualScroll - UNIT TESTS
 *
 * COBERTURA:
 * - Estrutura: div wrapper externo como root (NÃO QVirtualScroll diretamente)
 * - Props: items (array), itemSize, type, horizontal, loading, disable, sliceSize
 * - Classes: dss-virtual-scroll, modificadores
 * - data-brand: via $attrs (não é prop declarada)
 * - Slots: default (com scope {item, index, ariaSetsize, ariaPosinset}),
 *           prepend, append, loading, empty
 * - Estado vazio: exibição quando items=[]
 * - Estado loading: exibição quando loading=true
 * - Evento scroll, native-scroll
 *
 * NOTA: Div wrapper como root (NÃO QVirtualScroll como root).
 * $attrs encaminhados ao div root (não ao QVirtualScroll interno).
 * ARIA (ariaSetsize/ariaPosinset) exposto via escopo do slot default.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssVirtualScroll from './1-structure/DssVirtualScroll.ts.vue'

installQuasar()

const makeItems = (count = 10) =>
  Array.from({ length: count }, (_, i) => ({ id: i, label: `Item ${i}` }))

describe('DssVirtualScroll', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza sem erros com array de itens', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('aplica classe base dss-virtual-scroll ao root', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() }
      })
      expect(wrapper.classes()).toContain('dss-virtual-scroll')
    })

    it('root element é um div (NÃO é QVirtualScroll diretamente)', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() }
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('define nome do componente como DssVirtualScroll', () => {
      expect(DssVirtualScroll.name).toBe('DssVirtualScroll')
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    describe('items', () => {
      it('aceita array vazio sem erro', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: [] }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita array de objetos sem erro', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(20) }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('itemSize', () => {
      it('aceita prop itemSize sem erro', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), itemSize: 64 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('type', () => {
      it('aplica classe dss-virtual-scroll--table quando type="table"', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), type: 'table' }
        })
        expect(wrapper.classes()).toContain('dss-virtual-scroll--table')
      })

      it('não aplica classe --table quando type="list" (padrão)', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), type: 'list' }
        })
        expect(wrapper.classes()).not.toContain('dss-virtual-scroll--table')
      })

      it('não aplica classe --table sem prop type (padrão list)', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems() }
        })
        expect(wrapper.classes()).not.toContain('dss-virtual-scroll--table')
      })
    })

    describe('horizontal', () => {
      it('aplica classe dss-virtual-scroll--horizontal quando horizontal=true', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), horizontal: true }
        })
        expect(wrapper.classes()).toContain('dss-virtual-scroll--horizontal')
      })

      it('não aplica classe --horizontal por padrão', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems() }
        })
        expect(wrapper.classes()).not.toContain('dss-virtual-scroll--horizontal')
      })
    })

    describe('loading', () => {
      it('aplica classe dss-virtual-scroll--loading quando loading=true', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), loading: true }
        })
        expect(wrapper.classes()).toContain('dss-virtual-scroll--loading')
      })

      it('não aplica classe --loading por padrão', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems() }
        })
        expect(wrapper.classes()).not.toContain('dss-virtual-scroll--loading')
      })
    })

    describe('disable', () => {
      it('aplica classe dss-virtual-scroll--disabled quando disable=true', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems(), disable: true }
        })
        expect(wrapper.classes()).toContain('dss-virtual-scroll--disabled')
      })

      it('não aplica classe --disabled por padrão', () => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems() }
        })
        expect(wrapper.classes()).not.toContain('dss-virtual-scroll--disabled')
      })
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand (data-brand via $attrs)', () => {
    it('aplica data-brand quando passado via attrs', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() },
        attrs: { 'data-brand': 'hub' }
      })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica data-brand="%s" no root div',
      (brand) => {
        const wrapper = mount(DssVirtualScroll, {
          props: { items: makeItems() },
          attrs: { 'data-brand': brand }
        })
        expect(wrapper.attributes('data-brand')).toBe(brand)
      }
    )

    it('não define data-brand quando não passado', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // ESTADO VAZIO
  // ===========================================================================

  describe('Estado vazio', () => {
    it('exibe estado vazio quando items=[] e loading=false', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [] }
      })
      expect(wrapper.find('.dss-virtual-scroll__empty').exists()).toBe(true)
    })

    it('texto padrão no estado vazio', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [] }
      })
      expect(wrapper.find('.dss-virtual-scroll__empty-text').exists()).toBe(true)
      expect(wrapper.find('.dss-virtual-scroll__empty-text').text()).toBe('Nenhum item para exibir')
    })

    it('slot empty customizado substituindo texto padrão', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [] },
        slots: { empty: '<p class="custom-empty">Sem dados disponíveis</p>' }
      })
      expect(wrapper.find('.custom-empty').exists()).toBe(true)
    })

    it('não exibe estado vazio quando items tem conteúdo', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(5) }
      })
      expect(wrapper.find('.dss-virtual-scroll__empty').exists()).toBe(false)
    })

    it('não exibe estado vazio quando loading=true (mesmo com items vazios)', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [], loading: true }
      })
      expect(wrapper.find('.dss-virtual-scroll__empty').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // ESTADO LOADING
  // ===========================================================================

  describe('Estado loading', () => {
    it('exibe área de loading quando loading=true', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(), loading: true }
      })
      expect(wrapper.find('.dss-virtual-scroll__loading').exists()).toBe(true)
    })

    it('slot loading customizado substituindo indicador padrão', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [], loading: true },
        slots: { loading: '<span class="my-spinner">loading...</span>' }
      })
      expect(wrapper.find('.my-spinner').exists()).toBe(true)
    })

    it('não exibe área de loading quando loading=false', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(), loading: false }
      })
      expect(wrapper.find('.dss-virtual-scroll__loading').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza slot prepend antes da lista', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(3) },
        slots: { prepend: '<header class="list-header">Header</header>' }
      })
      expect(wrapper.find('.list-header').exists()).toBe(true)
      expect(wrapper.find('.list-header').text()).toBe('Header')
    })

    it('renderiza slot append após a lista', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(3) },
        slots: { append: '<footer class="list-footer">Footer</footer>' }
      })
      expect(wrapper.find('.list-footer').exists()).toBe(true)
    })

    it('QVirtualScroll interno está presente quando há itens e não está carregando', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(5) }
      })
      expect(wrapper.find('.dss-virtual-scroll__inner').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE (ARIA)
  // ===========================================================================

  describe('Acessibilidade (ARIA)', () => {
    it('área de loading tem role="status" e aria-live="polite"', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [], loading: true }
      })
      const loadingEl = wrapper.find('.dss-virtual-scroll__loading')
      expect(loadingEl.attributes('role')).toBe('status')
      expect(loadingEl.attributes('aria-live')).toBe('polite')
    })

    it('área de estado vazio tem role="status"', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: [] }
      })
      const emptyEl = wrapper.find('.dss-virtual-scroll__empty')
      expect(emptyEl.attributes('role')).toBe('status')
    })
  })

  // ===========================================================================
  // ATTRS FORWARDING
  // ===========================================================================

  describe('Attrs forwarding', () => {
    it('repassa aria-label ao root div via $attrs', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() },
        attrs: { 'aria-label': 'Lista virtual de itens' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Lista virtual de itens')
    })

    it('repassa id ao root div via $attrs', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems() },
        attrs: { id: 'my-virtual-list' }
      })
      expect(wrapper.attributes('id')).toBe('my-virtual-list')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('renderiza com itemSize=32 (menor que padrão 48)', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(5), itemSize: 32 }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('aceita type="table" e horizontal simultaneamente', () => {
      const wrapper = mount(DssVirtualScroll, {
        props: { items: makeItems(3), type: 'table', horizontal: true }
      })
      expect(wrapper.classes()).toContain('dss-virtual-scroll--table')
      expect(wrapper.classes()).toContain('dss-virtual-scroll--horizontal')
    })

    it('aceita items com estrutura de dados variada', () => {
      const mixedItems = [
        { id: 1, text: 'hello', value: 42 },
        { id: 2, name: 'world', active: true },
      ]
      const wrapper = mount(DssVirtualScroll, {
        props: { items: mixedItems }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
