/**
 * DssBrandLogo — Testes Unitários
 *
 * Cobre: renderização das 3 marcas, recorte por variant, resolução pelo
 * ancestral [data-brand], acessibilidade e o gate de responsabilidade
 * (o componente NÃO decide cor).
 *
 * Golden Reference: DssBadge (não-interativo)
 * Golden Context: DssIcon (primitivo de glifo)
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DssBrandLogo from './DssBrandLogo.vue'
import { BRAND_LOGOS } from '../../../assets/brand/logos'

const MARCAS = ['water', 'hub', 'waste']

// ==========================================================================
// 1. Renderização das marcas
// ==========================================================================

describe('DssBrandLogo — renderização', () => {
  it('renderiza um <svg> como elemento raiz', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water' } })
    expect(w.element.tagName.toLowerCase()).toBe('svg')
  })

  for (const marca of MARCAS) {
    it(`desenha a marca ${marca} com o viewBox e os paths dela`, () => {
      const w = mount(DssBrandLogo, { props: { brand: marca } })
      expect(w.attributes('viewBox')).toBe(BRAND_LOGOS[marca].viewBox)
      expect(w.findAll('path')).toHaveLength(BRAND_LOGOS[marca].paths.length)
    })
  }

  it('sem marca resolvida, não desenha path nenhum', () => {
    // Chutar a marca de um produto é pior que não desenhar.
    const w = mount(DssBrandLogo)
    expect(w.findAll('path')).toHaveLength(0)
  })

  it('preserva o opacity dos paths — é desenho, não decoração', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water' } })
    const comOpacity = BRAND_LOGOS.water.paths.filter((p) => p.opacity !== undefined)
    expect(comOpacity.length).toBeGreaterThan(0)
    const render = w.html()
    for (const p of comOpacity) expect(render).toContain(`opacity="${p.opacity}"`)
  })
})

// ==========================================================================
// 2. Recorte do desenho
// ==========================================================================

describe('DssBrandLogo — recorte por variant', () => {
  it('full renderiza todos os paths', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'hub', variant: 'full' } })
    expect(w.findAll('path')).toHaveLength(BRAND_LOGOS.hub.paths.length)
  })

  it('icon renderiza só os paths do símbolo', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'hub', variant: 'icon' } })
    const esperado = BRAND_LOGOS.hub.paths.filter((p) => p.role === 'icon').length
    expect(esperado).toBeGreaterThan(0)
    expect(w.findAll('path')).toHaveLength(esperado)
  })

  it('wordmark renderiza só os paths do nome', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'hub', variant: 'wordmark' } })
    const esperado = BRAND_LOGOS.hub.paths.filter((p) => p.role === 'wordmark').length
    expect(esperado).toBeGreaterThan(0)
    expect(w.findAll('path')).toHaveLength(esperado)
  })
})

// ==========================================================================
// 3. Resolução da marca pelo ancestral
// ==========================================================================

describe('DssBrandLogo — a marca vem da prop ou do ancestral MAIS PRÓXIMO', () => {
  const Hospedeiro = {
    components: { DssBrandLogo },
    props: { externa: String, interna: String, daProp: String },
    template: `
      <div :data-brand="externa">
        <div :data-brand="interna">
          <DssBrandLogo :brand="daProp" />
        </div>
      </div>
    `,
  }

  it('sem prop, herda do [data-brand] mais próximo — não do mais externo', async () => {
    const w = mount(Hospedeiro, {
      props: { externa: 'hub', interna: 'waste', daProp: undefined },
      attachTo: document.body,
    })
    await nextTick()
    expect(w.find('svg').attributes('viewBox')).toBe(BRAND_LOGOS.waste.viewBox)
    w.unmount()
  })

  it('a prop vence o ancestral', async () => {
    const w = mount(Hospedeiro, {
      props: { externa: 'hub', interna: 'waste', daProp: 'water' },
      attachTo: document.body,
    })
    await nextTick()
    expect(w.find('svg').attributes('viewBox')).toBe(BRAND_LOGOS.water.viewBox)
    w.unmount()
  })

  it('troca de marca em runtime: o logo acompanha o ancestral', async () => {
    const w = mount(Hospedeiro, {
      props: { externa: 'hub', interna: 'water', daProp: undefined },
      attachTo: document.body,
    })
    await nextTick()
    expect(w.find('svg').attributes('viewBox')).toBe(BRAND_LOGOS.water.viewBox)

    await w.setProps({ interna: 'waste' })
    await nextTick()
    await new Promise((r) => setTimeout(r, 0))
    expect(w.find('svg').attributes('viewBox')).toBe(BRAND_LOGOS.waste.viewBox)
    w.unmount()
  })
})

// ==========================================================================
// 4. Acessibilidade
// ==========================================================================

describe('DssBrandLogo — acessibilidade', () => {
  it('nomeia o logo com o nome da marca por padrão', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water' } })
    expect(w.attributes('role')).toBe('img')
    expect(w.attributes('aria-label')).toBe(BRAND_LOGOS.water.label)
    expect(w.attributes('aria-hidden')).toBeUndefined()
  })

  it('ariaLabel substitui o nome natural', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water', ariaLabel: 'Página inicial' } })
    expect(w.attributes('aria-label')).toBe('Página inicial')
  })

  it('decorative tira o logo da árvore de acessibilidade', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water', decorative: true } })
    expect(w.attributes('aria-hidden')).toBe('true')
    expect(w.attributes('role')).toBeUndefined()
    expect(w.attributes('aria-label')).toBeUndefined()
  })

  it('não entra na ordem de tabulação', () => {
    const w = mount(DssBrandLogo, { props: { brand: 'water' } })
    expect(w.attributes('focusable')).toBe('false')
  })
})

// ==========================================================================
// 5. Gate de responsabilidade
// ==========================================================================

describe('DssBrandLogo — gate de responsabilidade', () => {
  it('não declara cor: o fill é currentColor', () => {
    // A ausência de prop de cor é a decisão central do componente. Uma cor
    // fixa prenderia o logo e quebraria o uso sobre fundo colorido.
    const w = mount(DssBrandLogo, { props: { brand: 'water' } })
    expect(w.attributes('fill')).toBe('currentColor')
    expect(w.attributes('style')).toBeUndefined()
  })

  for (const tamanho of ['sm', 'md', 'lg', 'xl']) {
    it(`size="${tamanho}" aplica a classe de tamanho, não uma altura inline`, () => {
      const w = mount(DssBrandLogo, { props: { brand: 'water', size: tamanho } })
      expect(w.classes()).toContain(`dss-brand-logo--${tamanho}`)
      expect(w.attributes('height')).toBeUndefined()
    })
  }
})
