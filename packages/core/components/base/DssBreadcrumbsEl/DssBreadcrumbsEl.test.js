/**
 * ==========================================================================
 * DssBreadcrumbsEl — UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base: classe dss-breadcrumbs-el
 * - Dualidade clicável/estático: --clickable (com `to`/`href`) vs --current (sem)
 * - Props: label, icon, disable, to, href, tag
 * - Estado disabled: classe --disabled
 * - Slot default: sobrepõe prop label
 * - Forwarding de $attrs
 *
 * NOTA: DssBreadcrumbsEl é um wrapper de QBreadcrumbsEl.
 * Apenas o que o DSS adiciona é testado — não o roteamento interno do Quasar.
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBreadcrumbsEl from './1-structure/DssBreadcrumbsEl.ts.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountEl(props = {}, slots = {}) {
  return mount(DssBreadcrumbsEl, { props, slots })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssBreadcrumbsEl — Renderização base', () => {
  it('renderiza com a classe base dss-breadcrumbs-el', () => {
    const wrapper = mountEl()
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el')
  })

  it('aplica dss-breadcrumbs-el--current quando não há to nem href (item estático)', () => {
    const wrapper = mountEl()
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--current')
  })

  it('não aplica dss-breadcrumbs-el--clickable por padrão (sem to/href)', () => {
    const wrapper = mountEl()
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--clickable')
  })

  it('não aplica dss-breadcrumbs-el--disabled por padrão', () => {
    const wrapper = mountEl()
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--disabled')
  })
})

// ==========================================================================
// 2. DUALIDADE CLICÁVEL / ESTÁTICO
// ==========================================================================

describe('DssBreadcrumbsEl — Dualidade clicável/estático', () => {
  it('aplica --clickable e não --current quando to é fornecido', () => {
    const wrapper = mountEl({ to: '/home' })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--clickable')
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--current')
  })

  it('aplica --clickable e não --current quando href é fornecido', () => {
    const wrapper = mountEl({ href: 'https://example.com' })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--clickable')
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--current')
  })

  it('aplica --current e não --clickable quando nem to nem href são fornecidos', () => {
    const wrapper = mountEl({ label: 'Página Atual' })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--current')
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--clickable')
  })

  it('aceita to como objeto de rota e aplica --clickable', () => {
    const wrapper = mountEl({ to: { name: 'home' } })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--clickable')
  })
})

// ==========================================================================
// 3. PROP: label
// ==========================================================================

describe('DssBreadcrumbsEl — Prop label', () => {
  it('renderiza o texto do label no conteúdo do elemento', () => {
    const wrapper = mountEl({ label: 'Início' })
    expect(wrapper.text()).toContain('Início')
  })

  it('renderiza sem erro quando label não é fornecido', () => {
    const wrapper = mountEl()
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 4. PROP: icon
// ==========================================================================

describe('DssBreadcrumbsEl — Prop icon', () => {
  it('renderiza DssIcon quando icon é fornecido', () => {
    const wrapper = mountEl({ icon: 'home' })
    // DssIcon renderiza um elemento com classe material-icons ou dss-icon
    expect(wrapper.html()).toContain('home')
  })

  it('não renderiza ícone quando icon não é fornecido', () => {
    const wrapper = mountEl({ label: 'Texto simples' })
    // Não deve haver DssIcon no DOM
    expect(wrapper.find('.dss-icon').exists()).toBe(false)
  })

  it('ícone tem aria-hidden="true" quando fornecido', () => {
    const wrapper = mountEl({ icon: 'home', label: 'Início' })
    // O DssIcon interno deve ter aria-hidden para não duplicar informação
    const icon = wrapper.find('[aria-hidden="true"]')
    expect(icon.exists()).toBe(true)
  })
})

// ==========================================================================
// 5. PROP: disable
// ==========================================================================

describe('DssBreadcrumbsEl — Prop disable', () => {
  it('aplica dss-breadcrumbs-el--disabled quando disable=true', () => {
    const wrapper = mountEl({ disable: true })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--disabled')
  })

  it('não aplica dss-breadcrumbs-el--disabled quando disable=false', () => {
    const wrapper = mountEl({ disable: false })
    expect(wrapper.classes()).not.toContain('dss-breadcrumbs-el--disabled')
  })

  it('pode ser simultaneamente --disabled e --clickable (to com disable)', () => {
    const wrapper = mountEl({ to: '/home', disable: true })
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--disabled')
    expect(wrapper.classes()).toContain('dss-breadcrumbs-el--clickable')
  })
})

// ==========================================================================
// 6. SLOTS
// ==========================================================================

describe('DssBreadcrumbsEl — Slots', () => {
  it('renderiza conteúdo do slot default quando fornecido', () => {
    const wrapper = mountEl(
      { label: 'Label prop' },
      { default: '<strong>Slot Content</strong>' }
    )
    expect(wrapper.find('strong').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('Slot Content')
  })

  it('usa prop label como fallback quando slot não é fornecido', () => {
    const wrapper = mountEl({ label: 'Home' })
    expect(wrapper.text()).toContain('Home')
  })
})

// ==========================================================================
// 7. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssBreadcrumbsEl — Forwarding de $attrs', () => {
  it('encaminha aria-current para o elemento interno', () => {
    const wrapper = mount(DssBreadcrumbsEl, {
      attrs: { 'aria-current': 'page' }
    })
    // inheritAttrs: false — $attrs é forwarded ao q-breadcrumbs-el interno
    expect(wrapper.html()).toContain('aria-current')
  })

  it('encaminha data-testid via $attrs', () => {
    const wrapper = mount(DssBreadcrumbsEl, {
      attrs: { 'data-testid': 'bc-item' }
    })
    expect(wrapper.html()).toContain('data-testid="bc-item"')
  })
})

// ==========================================================================
// 8. NOME DO COMPONENTE
// ==========================================================================

describe('DssBreadcrumbsEl — Metadados', () => {
  it('usa name QBreadcrumbsEl — contrato do motor (separadores do QBreadcrumbs)', () => {
    // O QBreadcrumbs injeta separadores identificando filhos por
    // vnode.type.name === 'QBreadcrumbsEl'. O name interno é intencional
    // (NC corrigida na Onda P2/G3.2 — sem ele, separadores nunca renderizam).
    const wrapper = mountEl()
    expect(wrapper.vm.$options.name).toBe('QBreadcrumbsEl')
  })
})
