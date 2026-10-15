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
 * NOTA: DssPagination é um <div> que COMPÕE DssButton (out/2026). Antes
 * envolvia o QPagination; os testes que buscavam o componente interno foram
 * reescritos para verificar comportamento.
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
  // Antes este teste buscava o QPagination interno e emitia por ele — ou seja,
  // verificava a IMPLEMENTAÇÃO. Com a composição sobre DssButton o componente
  // interno deixou de existir; o que importa é o comportamento: clicar numa
  // página emite a página clicada.
  it('emite update:modelValue ao acionar uma página', async () => {
    const wrapper = mountPagination({ modelValue: 1, max: 5 })
    const alvo = wrapper.findAll('button').find((b) => b.text().trim() === '3')
    expect(alvo).toBeTruthy()
    await alvo.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([3])
  })

  it('não emite ao acionar a página que já é a atual', async () => {
    const wrapper = mountPagination({ modelValue: 3, max: 5 })
    const atual = wrapper.findAll('button').find((b) => b.text().trim() === '3')
    await atual.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // O estado atual precisa ser visível, não só anunciado: antes ativo e
  // inativo saíam com o MESMO fundo e diferiam apenas por sombra.
  //
  // Na variante PADRÃO todos os botões são preenchidos, e o que separa a
  // página atual é o degrau `-deep` da rampa — aplicado por CSS sobre
  // `[aria-current='true']`, não por prop. Por isso o teste de props cobre a
  // marcação, e a distinção de pele é verificada nas variantes `flat` e
  // `outline`, onde ela existe no nível da prop.
  it('na variante padrão todos os botões são preenchidos e só a atual é marcada', () => {
    const wrapper = mountPagination({ modelValue: 3, max: 5 })
    const paginas = wrapper.findAllComponents({ name: 'DssButton' })
      .filter((b) => /^\d+$/.test(String(b.props('label'))))
    expect(paginas.every((b) => b.props('variant') === 'unelevated')).toBe(true)
    const marcados = wrapper.findAll('[aria-current="true"]')
    expect(marcados.length).toBe(1)
    expect(marcados[0].text().trim()).toBe('3')
  })

  it.each([
    ['flat', { flat: true }, 'flat'],
    ['outline', { outline: true }, 'outline'],
  ])('na variante %s a atual é preenchida e as demais não', (_nome, props, peleInativa) => {
    const wrapper = mountPagination({ modelValue: 3, max: 5, ...props })
    const botoes = wrapper.findAllComponents({ name: 'DssButton' })
    const atual = botoes.find((b) => b.props('label') === '3')
    const outra = botoes.find((b) => b.props('label') === '2')
    expect(atual.props('variant')).toBe('unelevated')
    expect(atual.props('color')).toBe('primary')
    expect(outra.props('variant')).toBe(peleInativa)
  })

  // A variante precisa SIGNIFICAR: antes `padrão` e `flat` produziam o mesmo
  // desenho, porque o inativo era `flat` nos dois casos.
  it('padrão e flat não produzem a mesma pele', () => {
    const padrao = mountPagination({ modelValue: 1, max: 5 })
    const flat = mountPagination({ modelValue: 1, max: 5, flat: true })
    const pele = (w) => w.findAllComponents({ name: 'DssButton' })
      .find((b) => b.props('label') === '2').props('variant')
    expect(pele(padrao)).not.toBe(pele(flat))
  })

  it('compõe DssButton — nenhum QBtn cru na árvore', () => {
    const wrapper = mountPagination({ modelValue: 1, max: 5, boundaryLinks: true })
    expect(wrapper.findAllComponents({ name: 'DssButton' }).length).toBeGreaterThan(0)
    expect(wrapper.findComponent({ name: 'QPagination' }).exists()).toBe(false)
  })

  it('desabilita os controles de borda nas pontas', () => {
    const inicio = mountPagination({ modelValue: 1, max: 5, boundaryLinks: true })
    const anterior = inicio.findAllComponents({ name: 'DssButton' })
      .find((b) => b.props('ariaLabel') === 'Página anterior')
    expect(anterior.props('disabled')).toBe(true)
    const fim = mountPagination({ modelValue: 5, max: 5, boundaryLinks: true })
    const proxima = fim.findAllComponents({ name: 'DssButton' })
      .find((b) => b.props('ariaLabel') === 'Próxima página')
    expect(proxima.props('disabled')).toBe(true)
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

// ===========================================================================
// ÂNCORA a11y — WCAG 4.1.2 (dss.meta.json → a11y.wcag[].ariaAttrs)
// A página atual é anunciada por aria-current (escrito pelo próprio DSS). O
// teste exige que ele marque EXATAMENTE a página do model, e que se mova junto.
// ===========================================================================
describe('Âncora a11y 4.1.2 — aria-current', () => {
  const atual = (wrapper) => wrapper.findAll('[aria-current="true"]').map((b) => b.text().trim())

  it('aria-current marca só a página atual e acompanha o modelValue', async () => {
    const wrapper = mount(DssPagination, { props: { modelValue: 3, max: 5 } })
    expect(atual(wrapper)).toEqual(['3'])
    await wrapper.setProps({ modelValue: 5 })
    expect(atual(wrapper)).toEqual(['5'])
  })
})
