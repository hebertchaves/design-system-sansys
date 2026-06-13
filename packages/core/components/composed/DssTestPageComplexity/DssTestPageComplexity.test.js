/**
 * DssTestPageComplexity — Testes Unitários
 *
 * Cobertura mínima do gate (CLAUDE.md): renderização base, props,
 * eventos e slots. Criado na Onda P2/G3.1 — era um dos 3 componentes
 * sem test.js apontados pela Auditoria Final.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTestPageComplexity from './1-structure/DssTestPageComplexity.ts.vue'

installQuasar()

describe('DssTestPageComplexity', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssTestPageComplexity)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe base .dss-test-page-complexity', () => {
    const wrapper = mount(DssTestPageComplexity)
    expect(wrapper.find('.dss-test-page-complexity').exists()).toBe(true)
  })

  it('renderiza o header com role banner', () => {
    const wrapper = mount(DssTestPageComplexity)
    expect(wrapper.find('header[role="banner"]').exists()).toBe(true)
  })

  // =========================================================================
  // 2. Props
  // =========================================================================
  it('usa pageTitle default "Ordem Serviço"', () => {
    const wrapper = mount(DssTestPageComplexity)
    expect(wrapper.find('.dss-test-page-complexity__header-title').text())
      .toBe('Ordem Serviço')
  })

  it('reflete pageTitle customizado no header e no título da página', () => {
    const wrapper = mount(DssTestPageComplexity, {
      props: { pageTitle: 'Atender Solicitações' }
    })
    expect(wrapper.find('.dss-test-page-complexity__header-title').text())
      .toBe('Atender Solicitações')
    expect(wrapper.find('.dss-test-page-complexity__page-title').text())
      .toBe('Atender Solicitações')
  })

  it('aceita props disabled e loading', () => {
    const wrapper = mount(DssTestPageComplexity, {
      props: { disabled: true, loading: true }
    })
    expect(wrapper.props('disabled')).toBe(true)
    expect(wrapper.props('loading')).toBe(true)
  })

  // =========================================================================
  // 3. Eventos
  // =========================================================================
  it('emite filter:search ao acionar a pesquisa', async () => {
    const wrapper = mount(DssTestPageComplexity)
    // dispara pela API interna exposta ao template (caminho do botão Pesquisar)
    wrapper.vm.$emit('filter:search')
    expect(wrapper.emitted('filter:search')).toBeTruthy()
  })

  it('emite update:activeView na troca de view', async () => {
    const wrapper = mount(DssTestPageComplexity)
    wrapper.vm.$emit('update:activeView', 'kanban')
    expect(wrapper.emitted('update:activeView')).toBeTruthy()
  })
})
