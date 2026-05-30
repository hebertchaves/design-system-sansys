import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssFooter from './1-structure/DssFooter.ts.vue'

installQuasar()

describe('DssFooter', () => {
  // -----------------------------------------------------------------------
  // Estrutura e renderização
  // -----------------------------------------------------------------------

  it('renderiza sem erros', () => {
    const wrapper = mount(DssFooter, {
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica classe dss-footer ao elemento raiz', () => {
    const wrapper = mount(DssFooter, {
      global: { stubs: { QFooter: { template: '<footer class="q-footer"><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer').exists()).toBe(true)
  })

  it('define nome do componente como DssFooter', () => {
    expect(DssFooter.name).toBe('DssFooter')
  })

  // -----------------------------------------------------------------------
  // Props
  // -----------------------------------------------------------------------

  it('não aplica --elevated por padrão', () => {
    const wrapper = mount(DssFooter, {
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer--elevated').exists()).toBe(false)
  })

  it('aplica dss-footer--elevated quando prop elevated=true', () => {
    const wrapper = mount(DssFooter, {
      props: { elevated: true },
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer--elevated').exists()).toBe(true)
  })

  it('não aplica --bordered por padrão', () => {
    const wrapper = mount(DssFooter, {
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer--bordered').exists()).toBe(false)
  })

  it('aplica dss-footer--bordered quando prop bordered=true', () => {
    const wrapper = mount(DssFooter, {
      props: { bordered: true },
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer--bordered').exists()).toBe(true)
  })

  it('aceita elevated e bordered simultaneamente', () => {
    const wrapper = mount(DssFooter, {
      props: { elevated: true, bordered: true },
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.dss-footer--elevated').exists()).toBe(true)
    expect(wrapper.find('.dss-footer--bordered').exists()).toBe(true)
  })

  // -----------------------------------------------------------------------
  // Slots
  // -----------------------------------------------------------------------

  it('renderiza conteúdo no slot default', () => {
    const wrapper = mount(DssFooter, {
      slots: { default: '<div class="toolbar-mock">toolbar</div>' },
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    expect(wrapper.find('.toolbar-mock').exists()).toBe(true)
    expect(wrapper.find('.toolbar-mock').text()).toBe('toolbar')
  })

  // -----------------------------------------------------------------------
  // Attrs forwarding (inheritAttrs: false + v-bind="$attrs")
  // -----------------------------------------------------------------------

  it('repassa atributos extras via $attrs ao QFooter', () => {
    const wrapper = mount(DssFooter, {
      attrs: { 'aria-label': 'Rodapé principal' },
      global: { stubs: { QFooter: { template: '<footer v-bind="$attrs"><slot /></footer>', inheritAttrs: true } } }
    })
    const footer = wrapper.find('footer')
    expect(footer.attributes('aria-label')).toBe('Rodapé principal')
  })

  // -----------------------------------------------------------------------
  // Gate de Responsabilidade — container não-interativo
  // -----------------------------------------------------------------------

  it('não possui listeners de interação (hover, focus, active)', () => {
    const wrapper = mount(DssFooter, {
      global: { stubs: { QFooter: { template: '<footer><slot /></footer>' } } }
    })
    const footer = wrapper.find('.dss-footer')
    expect(footer.attributes('onclick')).toBeUndefined()
    expect(footer.attributes('tabindex')).toBeUndefined()
  })
})
