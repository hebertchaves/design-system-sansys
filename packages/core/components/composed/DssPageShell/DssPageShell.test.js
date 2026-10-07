/**
 * DssPageShell — Testes Unitários
 *
 * Cobre: o arranjo, as regiões condicionais, o board, e o rail — nome
 * acessível obrigatório, aria-current e o separador que a tela de origem
 * perdeu por CSS inválido.
 *
 * Golden Reference: DssChip
 * Golden Context: DssCard
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssPageShell from './DssPageShell.vue'
import DssPageShellRailItem from './1-structure/DssPageShellRailItem.ts.vue'

// ==========================================================================
// 1. O arranjo
// ==========================================================================

describe('DssPageShell — arranjo', () => {
  it('renderiza a coluna de conteúdo mesmo sem rail', () => {
    const w = mount(DssPageShell, { slots: { default: '<p>conteúdo</p>' } })
    expect(w.find('.dss-page-shell__content').exists()).toBe(true)
    expect(w.find('.dss-page-shell__rail').exists()).toBe(false)
  })

  it('o rail só existe quando o slot é fornecido', () => {
    const w = mount(DssPageShell, { slots: { rail: '<li>x</li>' } })
    expect(w.find('.dss-page-shell__rail').exists()).toBe(true)
  })

  it('a trilha só existe quando o slot é fornecido', () => {
    const sem = mount(DssPageShell, { slots: { default: 'x' } })
    expect(sem.find('.dss-page-shell__breadcrumb').exists()).toBe(false)

    const com = mount(DssPageShell, { slots: { breadcrumb: '<nav>t</nav>' } })
    expect(com.find('.dss-page-shell__breadcrumb').exists()).toBe(true)
  })

  it('o rail é um <nav> com nome — dois <nav> sem nome são indistinguíveis', () => {
    const w = mount(DssPageShell, { slots: { rail: '<li>x</li>' } })
    const nav = w.find('.dss-page-shell__rail')
    expect(nav.element.tagName).toBe('NAV')
    expect(nav.attributes('aria-label')).toBe('Módulos do sistema')
  })

  it('railAriaLabel personaliza o nome do rail', () => {
    const w = mount(DssPageShell, {
      props: { railAriaLabel: 'Módulos do Faturamento' },
      slots: { rail: '<li>x</li>' },
    })
    expect(w.find('.dss-page-shell__rail').attributes('aria-label')).toBe('Módulos do Faturamento')
  })

  it('os itens do rail ficam numa lista', () => {
    const w = mount(DssPageShell, { slots: { rail: '<li class="i-x">x</li>' } })
    expect(w.find('ul.dss-page-shell__rail-list .i-x').exists()).toBe(true)
  })
})

// ==========================================================================
// 2. Board
// ==========================================================================

describe('DssPageShell — board', () => {
  it('board é o padrão', () => {
    const w = mount(DssPageShell, { slots: { default: 'x' } })
    expect(w.classes()).toContain('dss-page-shell--board')
  })

  it('board=false devolve a coluna nua', () => {
    const w = mount(DssPageShell, { props: { board: false }, slots: { default: 'x' } })
    expect(w.classes()).not.toContain('dss-page-shell--board')
    // o container continua existindo — o que sai é a SUPERFÍCIE
    expect(w.find('.dss-page-shell__board').exists()).toBe(true)
  })
})

// ==========================================================================
// 3. Rail item — o nome acessível não é opcional
// ==========================================================================

describe('DssPageShellRailItem — nome acessível', () => {
  it('o label vira nome acessível E dica de mouse', () => {
    // O rail só mostra ícones. Botão cujo único conteúdo é ícone decorativo
    // não existe para quem usa leitor de tela.
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    expect(w.find('.dss-page-shell__rail-label').text()).toBe('Início')
    expect(w.find('button').attributes('title')).toBe('Início')
  })

  it('o ícone é decorativo — quem nomeia é o label', () => {
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    expect(w.find('.dss-icon').attributes('aria-hidden')).toBe('true')
  })

  it('renderiza um <li> com <button> dentro', () => {
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    expect(w.element.tagName).toBe('LI')
    expect(w.find('button').attributes('type')).toBe('button')
  })

  it('o ícone é dimensionado pelo RAIL, não pela prop `size` nem pela página', () => {
    // No modo `inline` o DssIcon NÃO emite classe de tamanho (CCI §2.2): usa
    // `1em` e `font-size: inherit`, e quem decide é a font-size do host.
    //
    // Duas coisas que este teste tranca, e que já quebraram uma vez:
    //  1. o ícone é `inline` — nenhuma classe `dss-icon--<size>` sai daqui.
    //     Enquanto isso valer, passar `size` ao DssIcon é INERTE, e foi esse
    //     `size="sm"` morto que escondeu o defeito;
    //  2. o ícone carrega `dss-page-shell__rail-icon`, que é o gancho por onde
    //     a Layer 2 declara a font-size. Sem a classe, o ícone volta a herdar
    //     a tipografia de quem montar a tela — medido no grid master: 14px,
    //     32% de um item de 44px, porque a PÁGINA declarava 14px.
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    const icone = w.find('.dss-icon')
    expect(icone.classes()).toContain('dss-icon--inline')
    expect(icone.classes()).toContain('dss-page-shell__rail-icon')
    expect(icone.classes().some(c => /^dss-icon--(2xs|xs|sm|md|lg|xl)$/.test(c))).toBe(false)
  })
})

// ==========================================================================
// 4. Rail item — estado ativo
// ==========================================================================

describe('DssPageShellRailItem — o estado ativo não vive só na cor', () => {
  it('active marca aria-current="page"', () => {
    // Pintar sem marcar deixaria a informação só na cor — WCAG 1.4.1.
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início', active: true } })
    expect(w.find('button').attributes('aria-current')).toBe('page')
    expect(w.find('button').classes()).toContain('dss-page-shell__rail-item--active')
  })

  it('sem active não há aria-current', () => {
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    expect(w.find('button').attributes('aria-current')).toBeUndefined()
  })
})

// ==========================================================================
// 5. Rail item — interação
// ==========================================================================

describe('DssPageShellRailItem — interação', () => {
  it('emite click', async () => {
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'Início' } })
    await w.find('button').trigger('click')
    expect(w.emitted('click')).toHaveLength(1)
  })

  it('disabled desabilita o botão', () => {
    const w = mount(DssPageShellRailItem, { props: { icon: 'home', label: 'X', disabled: true } })
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })
})
