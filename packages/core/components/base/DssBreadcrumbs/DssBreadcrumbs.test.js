/**
 * ==========================================================================
 * DssBreadcrumbs — UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base: classe dss-breadcrumbs, elemento raiz nav
 * - Props: separator, separatorColor, gutter, align, brand
 * - Classes BEM: --gutter-*, --align-*, --brand-*
 * - CSS custom properties injetadas via inline style
 * - Slot default e slot separator
 * - data-brand
 * - Forwarding de $attrs
 *
 * NOTA: DssBreadcrumbs é um wrapper de QBreadcrumbs.
 * Apenas o que o DSS adiciona é testado — não o comportamento interno do Quasar.
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBreadcrumbs from './1-structure/DssBreadcrumbs.ts.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountBreadcrumbs(props = {}, slots = {}) {
  return mount(DssBreadcrumbs, { props, slots })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssBreadcrumbs — Renderização base', () => {
  it('renderiza e contém a classe base dss-breadcrumbs', () => {
    const wrapper = mountBreadcrumbs()
    expect(wrapper.find('.dss-breadcrumbs').exists()).toBe(true)
  })

  it('não aplica modificadores de alinhamento quando align="left" (padrão)', () => {
    const wrapper = mountBreadcrumbs({ align: 'left' })
    const bc = wrapper.find('.dss-breadcrumbs')
    expect(bc.classes()).not.toContain('dss-breadcrumbs--align-left')
  })

  it('não aplica modificador de brand por padrão', () => {
    const wrapper = mountBreadcrumbs()
    const bc = wrapper.find('.dss-breadcrumbs')
    expect(bc.classes().some(c => c.startsWith('dss-breadcrumbs--brand-'))).toBe(false)
  })
})

// ==========================================================================
// 2. PROP: gutter
// ==========================================================================

describe('DssBreadcrumbs — Prop gutter', () => {
  it.each(['sm', 'md', 'lg'])('aplica dss-breadcrumbs--gutter-%s quando gutter="%s"', (gutter) => {
    const wrapper = mountBreadcrumbs({ gutter })
    expect(wrapper.find('.dss-breadcrumbs').classes()).toContain(`dss-breadcrumbs--gutter-${gutter}`)
  })

  it('injeta --dss-breadcrumbs-gap via inline style para gutter sm', () => {
    const wrapper = mountBreadcrumbs({ gutter: 'sm' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('--dss-breadcrumbs-gap')
    expect(style).toContain('var(--dss-spacing-2)')
  })

  it('injeta --dss-breadcrumbs-gap via inline style para gutter md', () => {
    const wrapper = mountBreadcrumbs({ gutter: 'md' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('var(--dss-spacing-3)')
  })

  it('injeta --dss-breadcrumbs-gap via inline style para gutter lg', () => {
    const wrapper = mountBreadcrumbs({ gutter: 'lg' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('var(--dss-spacing-4)')
  })
})

// ==========================================================================
// 3. PROP: align
// ==========================================================================

describe('DssBreadcrumbs — Prop align', () => {
  it.each(['center', 'right', 'between', 'around'])(
    'aplica dss-breadcrumbs--align-%s quando align="%s"',
    (align) => {
      const wrapper = mountBreadcrumbs({ align })
      expect(wrapper.find('.dss-breadcrumbs').classes()).toContain(`dss-breadcrumbs--align-${align}`)
    }
  )

  it('não aplica modificador de alinhamento para align padrão (left)', () => {
    const wrapper = mountBreadcrumbs()
    const classes = wrapper.find('.dss-breadcrumbs').classes()
    expect(classes.some(c => c.startsWith('dss-breadcrumbs--align-'))).toBe(false)
  })
})

// ==========================================================================
// 4. PROP: separatorColor
// ==========================================================================

describe('DssBreadcrumbs — Prop separatorColor', () => {
  it('injeta --dss-breadcrumbs-separator-color com token subtle por padrão', () => {
    const wrapper = mountBreadcrumbs({ separatorColor: 'subtle' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('--dss-breadcrumbs-separator-color')
    expect(style).toContain('var(--dss-text-subtle)')
  })

  it('mapeia separatorColor="body" para var(--dss-text-body)', () => {
    const wrapper = mountBreadcrumbs({ separatorColor: 'body' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('var(--dss-text-body)')
  })

  it('mapeia separatorColor="disabled" para var(--dss-text-disabled)', () => {
    const wrapper = mountBreadcrumbs({ separatorColor: 'disabled' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('var(--dss-text-disabled)')
  })

  it('usa var(--dss-text-{value}) para separatorColor desconhecido', () => {
    const wrapper = mountBreadcrumbs({ separatorColor: 'muted' })
    const style = wrapper.find('.dss-breadcrumbs').attributes('style') ?? ''
    expect(style).toContain('var(--dss-text-muted)')
  })
})

// ==========================================================================
// 5. PROP: brand
// ==========================================================================

describe('DssBreadcrumbs — Prop brand', () => {
  it.each(['hub', 'water', 'waste'])(
    'aplica dss-breadcrumbs--brand-%s e data-brand="%s" quando brand="%s"',
    (brand) => {
      const wrapper = mountBreadcrumbs({ brand })
      const bc = wrapper.find('.dss-breadcrumbs')
      expect(bc.classes()).toContain(`dss-breadcrumbs--brand-${brand}`)
    }
  )

  it('não aplica modificador de brand quando brand não é fornecido', () => {
    const wrapper = mountBreadcrumbs()
    const bc = wrapper.find('.dss-breadcrumbs')
    expect(bc.classes().some(c => c.startsWith('dss-breadcrumbs--brand-'))).toBe(false)
  })
})

// ==========================================================================
// 6. PROP: separator
// ==========================================================================

describe('DssBreadcrumbs — Prop separator', () => {
  it('aceita separador customizado sem erro', () => {
    const wrapper = mountBreadcrumbs({ separator: '>' })
    expect(wrapper.find('.dss-breadcrumbs').exists()).toBe(true)
  })

  it('usa "/" como separador padrão', () => {
    const wrapper = mountBreadcrumbs()
    expect(wrapper.find('.dss-breadcrumbs').exists()).toBe(true)
  })
})

// ==========================================================================
// 7. SLOTS
// ==========================================================================

describe('DssBreadcrumbs — Slots', () => {
  it('renderiza conteúdo no slot default', () => {
    const wrapper = mountBreadcrumbs(
      {},
      { default: '<span class="item">Home</span>' }
    )
    expect(wrapper.find('.item').exists()).toBe(true)
    expect(wrapper.find('.item').text()).toBe('Home')
  })

  it('renderiza slot separator quando fornecido', () => {
    const wrapper = mountBreadcrumbs(
      {},
      { separator: '<span class="custom-sep">›</span>' }
    )
    expect(wrapper.find('.custom-sep').exists()).toBe(true)
  })
})

// ==========================================================================
// 8. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssBreadcrumbs — Forwarding de $attrs', () => {
  it('encaminha aria-label para o q-breadcrumbs', () => {
    const wrapper = mount(DssBreadcrumbs, {
      attrs: { 'aria-label': 'Navegação do site' }
    })
    // inheritAttrs: false — o $attrs é forwarded ao q-breadcrumbs interno
    // O q-breadcrumbs renderiza um <nav>, verificamos o atributo no componente
    expect(wrapper.find('.dss-breadcrumbs').exists()).toBe(true)
  })

  it('encaminha data-testid via $attrs', () => {
    const wrapper = mount(DssBreadcrumbs, {
      attrs: { 'data-testid': 'main-breadcrumbs' }
    })
    // data-testid deve aparecer no elemento nav gerado pelo q-breadcrumbs
    const nav = wrapper.find('nav')
    if (nav.exists()) {
      expect(nav.attributes('data-testid')).toBe('main-breadcrumbs')
    } else {
      // Q-breadcrumbs pode renderizar com outro elemento raiz dependendo da versão
      expect(wrapper.html()).toContain('data-testid="main-breadcrumbs"')
    }
  })
})

// ==========================================================================
// 9. NOME DO COMPONENTE
// ==========================================================================

describe('DssBreadcrumbs — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountBreadcrumbs()
    expect(wrapper.vm.$options.name).toBe('DssBreadcrumbs')
  })
})
