/**
 * DssSectionTitle — Testes Unitários
 *
 * Cobre: nível vs tamanho como eixos separados, o traço de marca, a cor de
 * acento, o remapeamento de token por brand (§K5) e o gate de responsabilidade.
 *
 * Golden Reference: DssBadge (não-interativo)
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssSectionTitle from './DssSectionTitle.vue'

// ==========================================================================
// 1. Nível e tamanho são eixos SEPARADOS
// ==========================================================================

describe('DssSectionTitle — nível e tamanho são independentes', () => {
  for (const n of [1, 2, 3, 4]) {
    it(`level=${n} renderiza <h${n}>`, () => {
      const w = mount(DssSectionTitle, { props: { level: n, label: 'T' } })
      expect(w.element.tagName).toBe(`H${n}`)
    })
  }

  it('level=2 é o padrão — o nível mais comum de seção', () => {
    const w = mount(DssSectionTitle, { props: { label: 'T' } })
    expect(w.element.tagName).toBe('H2')
  })

  it('o tamanho NÃO muda a tag: <h3> pode ser grande', () => {
    // É o ponto do eixo separado. Forçar nível e tamanho juntos empurra quem
    // monta a tela a escolher a tag errada para conseguir o tamanho certo.
    const w = mount(DssSectionTitle, { props: { level: 3, size: 'lg', label: 'T' } })
    expect(w.element.tagName).toBe('H3')
    expect(w.classes()).toContain('dss-section-title--lg')
  })

  it('a tag NÃO muda o tamanho: <h1> pode ser pequeno', () => {
    const w = mount(DssSectionTitle, { props: { level: 1, size: 'sm', label: 'T' } })
    expect(w.element.tagName).toBe('H1')
    expect(w.classes()).toContain('dss-section-title--sm')
  })
})

// ==========================================================================
// 2. Conteúdo
// ==========================================================================

describe('DssSectionTitle — conteúdo', () => {
  it('renderiza a prop label', () => {
    const w = mount(DssSectionTitle, { props: { label: 'Verificações' } })
    expect(w.text()).toBe('Verificações')
  })

  it('o slot default tem precedência sobre label', () => {
    const w = mount(DssSectionTitle, {
      props: { label: 'ignorado' },
      slots: { default: '<span class="t-x">do slot</span>' },
    })
    expect(w.find('.t-x').exists()).toBe(true)
    expect(w.text()).not.toContain('ignorado')
  })
})

// ==========================================================================
// 3. Cor do traço
// ==========================================================================

describe('DssSectionTitle — cor do traço', () => {
  it('brand é o padrão', () => {
    const w = mount(DssSectionTitle, { props: { label: 'T' } })
    expect(w.classes()).toContain('dss-section-title--accent-brand')
  })

  for (const a of ['info', 'success', 'warning', 'error']) {
    it(`accent="${a}" aplica a classe de estado`, () => {
      const w = mount(DssSectionTitle, { props: { label: 'T', accent: a } })
      expect(w.classes()).toContain(`dss-section-title--accent-${a}`)
    })
  }
})

// ==========================================================================
// 4. Brand remapeia TOKEN, não pinta borda (§K5)
// ==========================================================================

describe('DssSectionTitle — a prop brand remapeia o token', () => {
  for (const b of ['hub', 'water', 'waste']) {
    it(`brand="${b}" aplica a classe de remapeamento`, () => {
      const w = mount(DssSectionTitle, { props: { label: 'T', brand: b } })
      expect(w.classes()).toContain(`dss-section-title--brand-${b}`)
    })
  }

  it('sem brand, nenhuma classe de marca é aplicada', () => {
    const w = mount(DssSectionTitle, { props: { label: 'T' } })
    expect(w.classes().some((c) => c.startsWith('dss-section-title--brand-'))).toBe(false)
  })

  it('não escreve cor inline: quem pinta é o CSS, via token', () => {
    // §K5: pintar direto é o que tornou a prop `color` do DssLinearProgress
    // inerte dentro de página brandeada.
    const w = mount(DssSectionTitle, { props: { label: 'T', brand: 'water', accent: 'error' } })
    expect(w.attributes('style')).toBeUndefined()
  })
})

// ==========================================================================
// 5. Gate de responsabilidade
// ==========================================================================

describe('DssSectionTitle — gate de responsabilidade', () => {
  it('não renderiza elemento além do cabeçalho', () => {
    const w = mount(DssSectionTitle, { props: { label: 'T' } })
    expect(w.element.children).toHaveLength(0)
  })

  it('repassa atributos extras ao cabeçalho', () => {
    const w = mount(DssSectionTitle, { props: { label: 'T' }, attrs: { id: 'secao-1' } })
    expect(w.attributes('id')).toBe('secao-1')
  })

  it('level fora de 1–4 cai em h2 em vez de gerar tag inválida', () => {
    const w = mount(DssSectionTitle, { props: { level: 9, label: 'T' } })
    expect(w.element.tagName).toBe('H2')
  })
})
