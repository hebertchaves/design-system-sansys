import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssHeader from './1-structure/DssHeader.ts.vue'

installQuasar()

describe('DssHeader', () => {
  // -----------------------------------------------------------------------
  // Estrutura e renderização
  // -----------------------------------------------------------------------

  it('renderiza sem erros', () => {
    const wrapper = mount(DssHeader, {
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica classe dss-header ao elemento raiz', () => {
    const wrapper = mount(DssHeader, {
      global: { stubs: { QHeader: { template: '<header class="q-header"><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header').exists()).toBe(true)
  })

  it('define nome do componente como DssHeader', () => {
    expect(DssHeader.name).toBe('DssHeader')
  })

  // -----------------------------------------------------------------------
  // Props
  // -----------------------------------------------------------------------

  it('não aplica --elevated por padrão', () => {
    const wrapper = mount(DssHeader, {
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header--elevated').exists()).toBe(false)
  })

  it('aplica dss-header--elevated quando prop elevated=true', () => {
    const wrapper = mount(DssHeader, {
      props: { elevated: true },
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header--elevated').exists()).toBe(true)
  })

  it('não aplica --bordered por padrão', () => {
    const wrapper = mount(DssHeader, {
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header--bordered').exists()).toBe(false)
  })

  it('aplica dss-header--bordered quando prop bordered=true', () => {
    const wrapper = mount(DssHeader, {
      props: { bordered: true },
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header--bordered').exists()).toBe(true)
  })

  it('aceita elevated e bordered simultaneamente', () => {
    const wrapper = mount(DssHeader, {
      props: { elevated: true, bordered: true },
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.dss-header--elevated').exists()).toBe(true)
    expect(wrapper.find('.dss-header--bordered').exists()).toBe(true)
  })

  // -----------------------------------------------------------------------
  // Slots
  // -----------------------------------------------------------------------

  it('renderiza conteúdo no slot default', () => {
    const wrapper = mount(DssHeader, {
      slots: { default: '<div class="toolbar-mock">toolbar</div>' },
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    expect(wrapper.find('.toolbar-mock').exists()).toBe(true)
    expect(wrapper.find('.toolbar-mock').text()).toBe('toolbar')
  })

  // -----------------------------------------------------------------------
  // Attrs forwarding (inheritAttrs: false + v-bind="$attrs")
  // -----------------------------------------------------------------------

  it('repassa atributos extras via $attrs ao QHeader', () => {
    const wrapper = mount(DssHeader, {
      attrs: { 'aria-label': 'Cabeçalho principal' },
      global: { stubs: { QHeader: { template: '<header v-bind="$attrs"><slot /></header>', inheritAttrs: true } } }
    })
    const header = wrapper.find('header')
    expect(header.attributes('aria-label')).toBe('Cabeçalho principal')
  })

  // -----------------------------------------------------------------------
  // Gate de Responsabilidade — container não-interativo
  // -----------------------------------------------------------------------

  it('não possui listeners de interação (hover, focus, active)', () => {
    const wrapper = mount(DssHeader, {
      global: { stubs: { QHeader: { template: '<header><slot /></header>' } } }
    })
    const header = wrapper.find('.dss-header')
    expect(header.attributes('onclick')).toBeUndefined()
    expect(header.attributes('tabindex')).toBeUndefined()
  })
})
