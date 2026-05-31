import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssToolbarTitle from './DssToolbarTitle.vue'

installQuasar()

describe('DssToolbarTitle', () => {
  // -------------------------------------------------------------------------
  // Estrutura
  // -------------------------------------------------------------------------

  it('renderiza o componente corretamente', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Título da Página' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe .dss-toolbar-title ao elemento raiz', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Título' }
    })
    expect(wrapper.classes()).toContain('dss-toolbar-title')
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Meu Título' }
    })
    expect(wrapper.text()).toContain('Meu Título')
  })

  it('renderiza o slot subtitle quando fornecido', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: {
        default: 'Título Principal',
        subtitle: 'Subtítulo aqui'
      }
    })
    expect(wrapper.text()).toContain('Subtítulo aqui')
  })

  // -------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------

  it('não aplica classe --shrink por padrão', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Título' }
    })
    expect(wrapper.classes()).not.toContain('dss-toolbar-title--shrink')
  })

  it('aplica a classe .dss-toolbar-title--shrink quando shrink=true', () => {
    const wrapper = mount(DssToolbarTitle, {
      props: { shrink: true },
      slots: { default: 'Título' }
    })
    expect(wrapper.classes()).toContain('dss-toolbar-title--shrink')
  })

  it('não aplica classe --shrink quando shrink=false', () => {
    const wrapper = mount(DssToolbarTitle, {
      props: { shrink: false },
      slots: { default: 'Título' }
    })
    expect(wrapper.classes()).not.toContain('dss-toolbar-title--shrink')
  })

  // -------------------------------------------------------------------------
  // Forwarding de Atributos
  // -------------------------------------------------------------------------

  it('repassa atributos extras ao elemento raiz via v-bind="$attrs"', () => {
    const wrapper = mount(DssToolbarTitle, {
      attrs: { 'data-testid': 'titulo-pagina' },
      slots: { default: 'Título' }
    })
    expect(wrapper.attributes('data-testid')).toBe('titulo-pagina')
  })

  // -------------------------------------------------------------------------
  // Comportamentos Implícitos
  // -------------------------------------------------------------------------

  it('não possui estado interativo (não é clicável por padrão)', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Título' }
    })
    // O componente não deve ter role="button" ou similar
    expect(wrapper.attributes('role')).not.toBe('button')
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('exibe nome de componente correto via defineOptions', () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: 'Título' }
    })
    expect(wrapper.vm.$options.name).toBe('DssToolbarTitle')
  })

  // -------------------------------------------------------------------------
  // Acessibilidade
  // -------------------------------------------------------------------------

  it('não interfere com o foco de elementos filhos interativos', async () => {
    const wrapper = mount(DssToolbarTitle, {
      slots: { default: '<button>Ação</button>' }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })
})
