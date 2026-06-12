/**
 * ==========================================================================
 * DssPagination — UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base: div wrapper com classe dss-pagination
 * - Props: modelValue, max, maxPages, disable, readonly, size, flat, outline, round, brand
 * - Classes BEM geradas pelo composable usePaginationClasses
 * - Evento: update:modelValue
 * - data-brand
 * - ARIA: role="navigation", aria-label
 * - Props bloqueadas: color e active-color são governadas pelo DSS
 *
 * NOTA: DssPagination usa um <div> wrapper com QPagination interno.
 * Testa apenas o que o DSS adiciona — não o comportamento de paginação do Quasar.
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPagination from './1-structure/DssPagination.ts.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountPagination(props = {}) {
  return mount(DssPagination, {
    props: { modelValue: 1, max: 10, ...props }
  })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssPagination — Renderização base', () => {
  it('renderiza com a classe base dss-pagination', () => {
    const wrapper = mountPagination()
    expect(wrapper.classes()).toContain('dss-pagination')
  })

  it('aplica dss-pagination--md como tamanho padrão', () => {
    const wrapper = mountPagination()
    expect(wrapper.classes()).toContain('dss-pagination--md')
  })

  it('renderiza o elemento raiz como <div>', () => {
    const wrapper = mountPagination()
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('não aplica modificadores opcionais por padrão', () => {
    const wrapper = mountPagination()
    expect(wrapper.classes()).not.toContain('dss-pagination--flat')
    expect(wrapper.classes()).not.toContain('dss-pagination--outline')
    expect(wrapper.classes()).not.toContain('dss-pagination--round')
    expect(wrapper.classes()).not.toContain('dss-pagination--disabled')
    expect(wrapper.classes()).not.toContain('dss-pagination--readonly')
  })
})

// ==========================================================================
// 2. PROP: size
// ==========================================================================

describe('DssPagination — Prop size', () => {
  it.each(['xs', 'sm', 'md', 'lg'])(
    'aplica dss-pagination--%s quando size="%s"',
    (size) => {
      const wrapper = mountPagination({ size })
      expect(wrapper.classes()).toContain(`dss-pagination--${size}`)
    }
  )
})

// ==========================================================================
// 3. PROPS: variantes visuais
// ==========================================================================

describe('DssPagination — Props de variante', () => {
  it('aplica dss-pagination--flat quando flat=true', () => {
    const wrapper = mountPagination({ flat: true })
    expect(wrapper.classes()).toContain('dss-pagination--flat')
  })

  it('não aplica dss-pagination--flat quando flat=false', () => {
    const wrapper = mountPagination({ flat: false })
    expect(wrapper.classes()).not.toContain('dss-pagination--flat')
  })

  it('aplica dss-pagination--outline quando outline=true', () => {
    const wrapper = mountPagination({ outline: true })
    expect(wrapper.classes()).toContain('dss-pagination--outline')
  })

  it('aplica dss-pagination--round quando round=true', () => {
    const wrapper = mountPagination({ round: true })
    expect(wrapper.classes()).toContain('dss-pagination--round')
  })
})

// ==========================================================================
// 4. PROP: disable / readonly
// ==========================================================================

describe('DssPagination — Props de estado', () => {
  it('aplica dss-pagination--disabled quando disable=true', () => {
    const wrapper = mountPagination({ disable: true })
    expect(wrapper.classes()).toContain('dss-pagination--disabled')
  })

  it('não aplica dss-pagination--disabled quando disable=false', () => {
    const wrapper = mountPagination({ disable: false })
    expect(wrapper.classes()).not.toContain('dss-pagination--disabled')
  })

  it('aplica dss-pagination--readonly quando readonly=true', () => {
    const wrapper = mountPagination({ readonly: true })
    expect(wrapper.classes()).toContain('dss-pagination--readonly')
  })

  it('não aplica dss-pagination--readonly quando readonly=false', () => {
    const wrapper = mountPagination({ readonly: false })
    expect(wrapper.classes()).not.toContain('dss-pagination--readonly')
  })
})

// ==========================================================================
// 5. PROP: brand + data-brand
// ==========================================================================

describe('DssPagination — Prop brand', () => {
  it.each(['hub', 'water', 'waste'])(
    'define data-brand="%s" no elemento raiz quando brand="%s"',
    (brand) => {
      const wrapper = mountPagination({ brand })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    }
  )

  it('não define data-brand quando brand não é fornecido', () => {
    const wrapper = mountPagination()
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })
})

// ==========================================================================
// 6. EVENTOS
// ==========================================================================

describe('DssPagination — Eventos', () => {
  it('emite update:modelValue quando QPagination emite', async () => {
    const wrapper = mountPagination({ modelValue: 1, max: 5 })
    // Busca o componente QPagination interno e emite o evento
    const qPagination = wrapper.findComponent({ name: 'QPagination' })
    expect(qPagination.exists()).toBe(true)
    await qPagination.vm.$emit('update:modelValue', 3)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([3])
  })
})

// ==========================================================================
// 7. ACESSIBILIDADE ARIA
// ==========================================================================

describe('DssPagination — Acessibilidade', () => {
  it('define role="navigation" no elemento raiz', () => {
    const wrapper = mountPagination()
    expect(wrapper.attributes('role')).toBe('navigation')
  })

  it('define aria-label padrão em português', () => {
    const wrapper = mountPagination()
    expect(wrapper.attributes('aria-label')).toBe('Navegação por páginas')
  })

  it('usa aria-label customizado quando ariaLabel é fornecido', () => {
    const wrapper = mountPagination({ ariaLabel: 'Páginas de resultados' })
    expect(wrapper.attributes('aria-label')).toBe('Páginas de resultados')
  })
})

// ==========================================================================
// 8. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssPagination — Forwarding de $attrs', () => {
  it('encaminha data-testid para o elemento raiz', () => {
    const wrapper = mount(DssPagination, {
      props: { modelValue: 1, max: 5 },
      attrs: { 'data-testid': 'pager' }
    })
    expect(wrapper.attributes('data-testid')).toBe('pager')
  })
})

// ==========================================================================
// 9. NOME DO COMPONENTE
// ==========================================================================

describe('DssPagination — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountPagination()
    expect(wrapper.vm.$options.name).toBe('DssPagination')
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssPagination — Teclado (WCAG 2.1.1)', () => {
  it('botões de página são <button> nativos focáveis', () => {
    const wrapper = mount(DssPagination, { props: { modelValue: 2, max: 5 } })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('tabindex') !== '-1')).toBe(true)
  })

  it('ativação de um botão de página emite update:modelValue', async () => {
    const wrapper = mount(DssPagination, { props: { modelValue: 2, max: 5 } })
    const target = wrapper.findAll('button').find(b => b.text().trim() === '3')
    expect(target).toBeTruthy()
    await target.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([3])
  })
})
