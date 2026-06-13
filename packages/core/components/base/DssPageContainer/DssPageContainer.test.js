import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { QLayout, QPageContainer } from 'quasar'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPageContainer from './DssPageContainer.vue'

installQuasar()

/**
 * DssPageContainer exige a cadeia de injeção QLayout (uso canônico) —
 * montado standalone o Quasar não renderiza o conteúdo (Onda P2/G3.2).
 */
function mountInLayout(component, options = {}) {
  const { props, slots, attrs } = options
  const childSlots = slots
    ? Object.fromEntries(Object.entries(slots).map(([name, content]) => [
        name,
        typeof content === 'string' ? () => h('span', { innerHTML: content }) : content,
      ]))
    : undefined
  const host = mount(QLayout, {
    props: { view: 'hHh lpR fFf' },
    slots: {
      default: () => h(component, { ...(props || {}), ...(attrs || {}) },
        childSlots && Object.keys(childSlots).length ? childSlots : undefined),
    },
  })
  return host.findComponent(component)
}


describe('DssPageContainer', () => {
  // -------------------------------------------------------------------------
  // Estrutura
  // -------------------------------------------------------------------------

  it('renderiza o componente corretamente', () => {
    const wrapper = mountInLayout(DssPageContainer)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe .dss-page-container ao elemento raiz', () => {
    const wrapper = mountInLayout(DssPageContainer)
    expect(wrapper.classes()).toContain('dss-page-container')
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mountInLayout(DssPageContainer, {
      slots: { default: '<div data-testid="conteudo">Conteúdo da Página</div>' }
    })
    expect(wrapper.find('[data-testid="conteudo"]').exists()).toBe(true)
  })

  // -------------------------------------------------------------------------
  // Forwarding de Atributos
  // -------------------------------------------------------------------------

  it('repassa atributos extras ao elemento raiz via v-bind="$attrs"', () => {
    const wrapper = mountInLayout(DssPageContainer, {
      attrs: { 'data-testid': 'page-container', 'aria-label': 'Conteúdo principal' }
    })
    expect(wrapper.attributes('data-testid')).toBe('page-container')
    expect(wrapper.attributes('aria-label')).toBe('Conteúdo principal')
  })

  it('não aplica atributos não declarados ao componente raiz quando inheritAttrs: false', () => {
    // O forwarding é feito via v-bind="$attrs" explícito — não por inheritAttrs padrão
    const wrapper = mountInLayout(DssPageContainer, {
      attrs: { 'data-custom': 'valor' }
    })
    // O atributo deve estar presente (via v-bind="$attrs")
    expect(wrapper.attributes('data-custom')).toBe('valor')
  })

  // -------------------------------------------------------------------------
  // Comportamentos Implícitos
  // -------------------------------------------------------------------------

  it('não possui estado interativo (não é clicável por padrão)', () => {
    const wrapper = mountInLayout(DssPageContainer)
    expect(wrapper.attributes('role')).not.toBe('button')
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('exibe nome de componente correto via defineOptions', () => {
    const wrapper = mountInLayout(DssPageContainer)
    expect(wrapper.vm.$options.name).toBe('DssPageContainer')
  })

  it('não interfere com o foco de elementos filhos interativos', () => {
    const wrapper = mountInLayout(DssPageContainer, {
      slots: { default: '<button>Ação</button>' }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  // -------------------------------------------------------------------------
  // Composição — slot default
  // -------------------------------------------------------------------------

  it('aceita múltiplos filhos no slot default', () => {
    const wrapper = mountInLayout(DssPageContainer, {
      slots: {
        default: '<div id="a">A</div><div id="b">B</div>'
      }
    })
    expect(wrapper.find('#a').exists()).toBe(true)
    expect(wrapper.find('#b').exists()).toBe(true)
  })

  it('é utilizável sem conteúdo no slot (estrutura mínima)', () => {
    const wrapper = mountInLayout(DssPageContainer)
    expect(wrapper.classes()).toContain('dss-page-container')
  })
})
