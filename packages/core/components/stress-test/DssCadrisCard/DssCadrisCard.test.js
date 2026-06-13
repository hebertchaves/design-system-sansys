/**
 * DssCadrisCard — Testes Unitários
 *
 * Cobertura mínima do gate (CLAUDE.md): renderização base, props,
 * eventos e slots. Criado na Onda P2/G3.1 — era um dos 3 componentes
 * sem test.js apontados pela Auditoria Final, e o único gap que impedia
 * a certificação deste componente (relatório A10).
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssCadrisCard from './1-structure/DssCadrisCard.ts.vue'

installQuasar()

const rows = [
  { id: 1, nome: 'Item A' },
  { id: 2, nome: 'Item B' },
]

describe('DssCadrisCard', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssCadrisCard)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe base .dss-cadris-card', () => {
    const wrapper = mount(DssCadrisCard)
    expect(wrapper.find('.dss-cadris-card').exists()).toBe(true)
  })

  it('renderiza o título "Cadris" no header', () => {
    const wrapper = mount(DssCadrisCard)
    expect(wrapper.find('.dss-cadris-card__header-title').text()).toBe('Cadris')
  })

  // =========================================================================
  // 2. Props
  // =========================================================================
  it('aceita rows e estado vazio por padrão', () => {
    const wrapper = mount(DssCadrisCard)
    expect(wrapper.props('rows')).toEqual([])
  })

  it('aceita rows com dados', () => {
    const wrapper = mount(DssCadrisCard, { props: { rows } })
    expect(wrapper.props('rows')).toHaveLength(2)
  })

  it('aceita prop loading', () => {
    const wrapper = mount(DssCadrisCard, { props: { loading: true } })
    expect(wrapper.props('loading')).toBe(true)
  })

  // =========================================================================
  // 3. Eventos
  // =========================================================================
  it('emite close ao acionar o botão de fechar', async () => {
    const wrapper = mount(DssCadrisCard)
    const btn = wrapper.find('.dss-cadris-card__header-close')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
