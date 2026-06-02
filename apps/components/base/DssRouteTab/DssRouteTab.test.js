/**
 * ==========================================================================
 * DssRouteTab — UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base: classe dss-tab (infraestrutura visual compartilhada com DssTab)
 * - Props: name, label, icon, alert, disable, to, exact, replace, href, target
 * - Classes BEM: --icon, --has-icon, --has-label, --alert, --disable
 * - Props bloqueadas: ripple (sempre false), no-caps, color, text-color
 * - Slot default
 * - Forwarding de $attrs
 *
 * NOTA: DssRouteTab é um wrapper de QRouteTab com integração Vue Router.
 * O teste usa stubs para isolar o roteamento — não testa o comportamento
 * de navegação interna do Quasar/Vue Router.
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js
 * GOLDEN CONTEXT: DssTab.test.js (mesmas classes .dss-tab por design)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssRouteTab from './1-structure/DssRouteTab.ts.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

const routerStubs = {
  RouterLink: { template: '<a><slot /></a>' },
  RouterView: { template: '<div />' }
}

function mountRouteTab(props = {}, slots = {}) {
  return mount(DssRouteTab, {
    props: { name: 'home', ...props },
    slots,
    global: { stubs: routerStubs }
  })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssRouteTab — Renderização base', () => {
  it('renderiza com a classe base dss-tab', () => {
    const wrapper = mountRouteTab()
    expect(wrapper.classes()).toContain('dss-tab')
  })

  it('não aplica modificadores quando nenhuma prop de variante é fornecida', () => {
    const wrapper = mountRouteTab()
    expect(wrapper.classes()).not.toContain('dss-tab--icon')
    expect(wrapper.classes()).not.toContain('dss-tab--has-icon')
    expect(wrapper.classes()).not.toContain('dss-tab--has-label')
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
    expect(wrapper.classes()).not.toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 2. PROP: name
// ==========================================================================

describe('DssRouteTab — Prop name', () => {
  it('aceita name como string', () => {
    const wrapper = mountRouteTab({ name: 'home' })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita name como número', () => {
    const wrapper = mountRouteTab({ name: 1 })
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 3. PROP: label
// ==========================================================================

describe('DssRouteTab — Prop label', () => {
  it('aplica dss-tab--has-label quando label é fornecido', () => {
    const wrapper = mountRouteTab({ label: 'Início' })
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('não aplica dss-tab--has-label quando label é undefined', () => {
    const wrapper = mountRouteTab({ label: undefined })
    expect(wrapper.classes()).not.toContain('dss-tab--has-label')
  })
})

// ==========================================================================
// 4. PROP: icon
// ==========================================================================

describe('DssRouteTab — Prop icon', () => {
  it('aplica dss-tab--has-icon quando icon é fornecido', () => {
    const wrapper = mountRouteTab({ icon: 'home' })
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
  })

  it('aplica dss-tab--icon quando icon é fornecido sem label (aba somente ícone)', () => {
    const wrapper = mountRouteTab({ icon: 'home' })
    expect(wrapper.classes()).toContain('dss-tab--icon')
  })

  it('não aplica dss-tab--icon quando icon e label são fornecidos', () => {
    const wrapper = mountRouteTab({ icon: 'home', label: 'Início' })
    expect(wrapper.classes()).not.toContain('dss-tab--icon')
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('não aplica dss-tab--has-icon quando icon não é fornecido', () => {
    const wrapper = mountRouteTab()
    expect(wrapper.classes()).not.toContain('dss-tab--has-icon')
  })
})

// ==========================================================================
// 5. PROP: alert
// ==========================================================================

describe('DssRouteTab — Prop alert', () => {
  it('aplica dss-tab--alert quando alert=true', () => {
    const wrapper = mountRouteTab({ alert: true })
    expect(wrapper.classes()).toContain('dss-tab--alert')
  })

  it('aplica dss-tab--alert quando alert é uma string de cor', () => {
    const wrapper = mountRouteTab({ alert: 'orange' })
    expect(wrapper.classes()).toContain('dss-tab--alert')
  })

  it('não aplica dss-tab--alert quando alert=false', () => {
    const wrapper = mountRouteTab({ alert: false })
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
  })

  it('não aplica dss-tab--alert quando alert é undefined', () => {
    const wrapper = mountRouteTab({ alert: undefined })
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
  })
})

// ==========================================================================
// 6. PROP: disable
// ==========================================================================

describe('DssRouteTab — Prop disable', () => {
  it('aplica dss-tab--disable quando disable=true', () => {
    const wrapper = mountRouteTab({ disable: true })
    expect(wrapper.classes()).toContain('dss-tab--disable')
  })

  it('não aplica dss-tab--disable quando disable=false', () => {
    const wrapper = mountRouteTab({ disable: false })
    expect(wrapper.classes()).not.toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 7. PROPS DE ROTEAMENTO
// ==========================================================================

describe('DssRouteTab — Props de roteamento', () => {
  it('aceita prop to como string sem erro', () => {
    const wrapper = mountRouteTab({ to: '/pagina' })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita prop to como objeto de rota sem erro', () => {
    const wrapper = mountRouteTab({ to: { name: 'home' } })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita prop href como URL externa sem erro', () => {
    const wrapper = mountRouteTab({ href: 'https://example.com' })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita prop exact=true sem erro', () => {
    const wrapper = mountRouteTab({ to: '/home', exact: true })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita prop replace=true sem erro', () => {
    const wrapper = mountRouteTab({ to: '/home', replace: true })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita target="_blank" com href', () => {
    const wrapper = mountRouteTab({ href: 'https://example.com', target: '_blank' })
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 8. CLASSES COMPOSTAS
// ==========================================================================

describe('DssRouteTab — Classes compostas', () => {
  it('aplica dss-tab, --has-icon e --has-label juntos', () => {
    const wrapper = mountRouteTab({ icon: 'home', label: 'Início' })
    expect(wrapper.classes()).toContain('dss-tab')
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('aplica --disable e --alert simultaneamente sem conflito', () => {
    const wrapper = mountRouteTab({ alert: true, disable: true })
    expect(wrapper.classes()).toContain('dss-tab--alert')
    expect(wrapper.classes()).toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 9. SLOT DEFAULT
// ==========================================================================

describe('DssRouteTab — Slot default', () => {
  it('renderiza conteúdo customizado no slot default', () => {
    const wrapper = mount(DssRouteTab, {
      props: { name: 'test' },
      slots: { default: '<span class="custom-tab">Custom</span>' },
      global: { stubs: routerStubs }
    })
    expect(wrapper.find('.custom-tab').exists()).toBe(true)
    expect(wrapper.find('.custom-tab').text()).toBe('Custom')
  })
})

// ==========================================================================
// 10. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssRouteTab — Forwarding de $attrs', () => {
  it('encaminha data-testid para o elemento raiz', () => {
    const wrapper = mount(DssRouteTab, {
      props: { name: 'test' },
      attrs: { 'data-testid': 'route-tab-item' },
      global: { stubs: routerStubs }
    })
    expect(wrapper.attributes('data-testid')).toBe('route-tab-item')
  })
})

// ==========================================================================
// 11. NOME DO COMPONENTE
// ==========================================================================

describe('DssRouteTab — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountRouteTab()
    expect(wrapper.vm.$options.name).toBe('DssRouteTab')
  })
})
