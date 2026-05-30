/**
 * ==========================================================================
 * DssToolbar — Testes Unitários e Comportamentais
 * ==========================================================================
 *
 * Cobre:
 * 1. Estrutura — renderização base e classes obrigatórias
 * 2. Props DSS — inset, brand
 * 3. data-brand — propagação do atributo de herança
 * 4. Pass-through ($attrs) — aria-label, dense
 * 5. Slots — renderização do conteúdo padrão
 * 6. Classes CSS geradas — todas as combinações
 * 7. Props bloqueadas — dark, glossy, color, text-color não propagados
 * 8. Acessibilidade — role, aria-label
 * 9. Dark mode — ausência de estilos interativos
 *
 * Framework: Vitest + Vue Test Utils
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssToolbar from './DssToolbar.vue'

installQuasar()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Monta DssToolbar com props/slots opcionais.
 */
function mountToolbar(props = {}, slots = {}) {
  return mount(DssToolbar, {
    props,
    slots: slots.default
      ? { default: slots.default }
      : {},
  })
}

// ---------------------------------------------------------------------------
// 1. Estrutura base
// ---------------------------------------------------------------------------

describe('DssToolbar — Estrutura base', () => {
  it('renderiza o elemento raiz com classes obrigatórias', () => {
    const wrapper = mountToolbar()
    const root = wrapper.element

    expect(root.classList).toContain('q-toolbar')
    expect(root.classList).toContain('dss-toolbar')
  })

  it('renderiza como div (elemento nativo do QToolbar)', () => {
    const wrapper = mountToolbar()
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('possui role="toolbar" herdado nativamente do QToolbar', () => {
    const wrapper = mountToolbar()
    expect(wrapper.attributes('role')).toBe('toolbar')
  })

  it('não possui brand class por padrão', () => {
    const wrapper = mountToolbar()
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-hub')
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-water')
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-waste')
  })

  it('não possui data-brand por padrão', () => {
    const wrapper = mountToolbar()
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })

  it('não possui classe inset por padrão', () => {
    const wrapper = mountToolbar()
    expect(wrapper.element.classList).not.toContain('dss-toolbar--inset')
  })
})

// ---------------------------------------------------------------------------
// 2. Prop: inset
// ---------------------------------------------------------------------------

describe('DssToolbar — Prop: inset', () => {
  it('adiciona classe dss-toolbar--inset quando inset=true', () => {
    const wrapper = mountToolbar({ inset: true })
    expect(wrapper.element.classList).toContain('dss-toolbar--inset')
  })

  it('não adiciona classe dss-toolbar--inset quando inset=false', () => {
    const wrapper = mountToolbar({ inset: false })
    expect(wrapper.element.classList).not.toContain('dss-toolbar--inset')
  })

  it('não adiciona classe dss-toolbar--inset quando inset não fornecido (padrão false)', () => {
    const wrapper = mountToolbar()
    expect(wrapper.element.classList).not.toContain('dss-toolbar--inset')
  })
})

// ---------------------------------------------------------------------------
// 3. Prop: brand — classes CSS
// ---------------------------------------------------------------------------

describe('DssToolbar — Prop: brand (classes)', () => {
  it('adiciona classe dss-toolbar--brand-hub quando brand="hub"', () => {
    const wrapper = mountToolbar({ brand: 'hub' })
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-hub')
  })

  it('adiciona classe dss-toolbar--brand-water quando brand="water"', () => {
    const wrapper = mountToolbar({ brand: 'water' })
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-water')
  })

  it('adiciona classe dss-toolbar--brand-waste quando brand="waste"', () => {
    const wrapper = mountToolbar({ brand: 'waste' })
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-waste')
  })

  it('não adiciona classe brand quando brand não fornecido', () => {
    const wrapper = mountToolbar()
    const classList = wrapper.element.classList
    expect(classList).not.toContain('dss-toolbar--brand-hub')
    expect(classList).not.toContain('dss-toolbar--brand-water')
    expect(classList).not.toContain('dss-toolbar--brand-waste')
  })

  it('não adiciona classe brand-hub quando brand="water"', () => {
    const wrapper = mountToolbar({ brand: 'water' })
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-hub')
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-waste')
  })
})

// ---------------------------------------------------------------------------
// 4. Prop: brand — atributo data-brand
// ---------------------------------------------------------------------------

describe('DssToolbar — Prop: brand (data-brand)', () => {
  it('adiciona data-brand="hub" quando brand="hub"', () => {
    const wrapper = mountToolbar({ brand: 'hub' })
    expect(wrapper.attributes('data-brand')).toBe('hub')
  })

  it('adiciona data-brand="water" quando brand="water"', () => {
    const wrapper = mountToolbar({ brand: 'water' })
    expect(wrapper.attributes('data-brand')).toBe('water')
  })

  it('adiciona data-brand="waste" quando brand="waste"', () => {
    const wrapper = mountToolbar({ brand: 'waste' })
    expect(wrapper.attributes('data-brand')).toBe('waste')
  })

  it('não adiciona data-brand quando brand não fornecido', () => {
    const wrapper = mountToolbar()
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })

  it('não adiciona data-brand quando brand=undefined explícito', () => {
    const wrapper = mountToolbar({ brand: undefined })
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// 5. Pass-through: $attrs
// ---------------------------------------------------------------------------

describe('DssToolbar — Pass-through via $attrs', () => {
  it('propaga aria-label para o elemento raiz', () => {
    const wrapper = mountToolbar({}, {
      attrs: { 'aria-label': 'Barra de navegação' }
    })
    // Montagem direta com attrs
    const w = mount(DssToolbar, {
      attrs: { 'aria-label': 'Barra de navegação' }
    })
    expect(w.attributes('aria-label')).toBe('Barra de navegação')
  })

  it('propaga atributos data-* para o elemento raiz', () => {
    const w = mount(DssToolbar, {
      attrs: { 'data-testid': 'main-toolbar' }
    })
    expect(w.attributes('data-testid')).toBe('main-toolbar')
  })

  it('aplica q-toolbar--dense quando dense=true é passado via attrs', () => {
    const w = mount(DssToolbar, {
      attrs: { dense: true }
    })
    // QToolbar deve adicionar q-toolbar--dense
    expect(w.element.classList).toContain('q-toolbar--dense')
  })
})

// ---------------------------------------------------------------------------
// 6. Slots
// ---------------------------------------------------------------------------

describe('DssToolbar — Slots', () => {
  it('renderiza o slot default', () => {
    const wrapper = mount(DssToolbar, {
      slots: {
        default: '<span class="test-content">Conteúdo</span>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Conteúdo')
  })

  it('renderiza múltiplos elementos no slot default', () => {
    const wrapper = mount(DssToolbar, {
      slots: {
        default: '<span class="item-1">A</span><span class="item-2">B</span>'
      }
    })
    expect(wrapper.find('.item-1').exists()).toBe(true)
    expect(wrapper.find('.item-2').exists()).toBe(true)
  })

  it('renderiza sem erros quando slot default está vazio', () => {
    const wrapper = mountToolbar()
    expect(wrapper.exists()).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// 7. Combinações de props
// ---------------------------------------------------------------------------

describe('DssToolbar — Combinações de props', () => {
  it('aplica inset e brand-hub simultaneamente', () => {
    const wrapper = mountToolbar({ inset: true, brand: 'hub' })
    const classList = wrapper.element.classList

    expect(classList).toContain('dss-toolbar')
    expect(classList).toContain('dss-toolbar--inset')
    expect(classList).toContain('dss-toolbar--brand-hub')
    expect(wrapper.attributes('data-brand')).toBe('hub')
  })

  it('aplica inset e brand-water simultaneamente', () => {
    const wrapper = mountToolbar({ inset: true, brand: 'water' })
    const classList = wrapper.element.classList

    expect(classList).toContain('dss-toolbar--inset')
    expect(classList).toContain('dss-toolbar--brand-water')
  })

  it('aplica inset e brand-waste simultaneamente', () => {
    const wrapper = mountToolbar({ inset: true, brand: 'waste' })
    const classList = wrapper.element.classList

    expect(classList).toContain('dss-toolbar--inset')
    expect(classList).toContain('dss-toolbar--brand-waste')
  })
})

// ---------------------------------------------------------------------------
// 8. Props bloqueadas — não devem vazar para o DOM
// ---------------------------------------------------------------------------

describe('DssToolbar — Props bloqueadas (não propagadas)', () => {
  it('não propaga prop "dark" como atributo DOM', () => {
    const w = mount(DssToolbar, { props: { dark: true } })
    // "dark" não é prop declarada — não deve aparecer como atributo
    expect(w.attributes('dark')).toBeUndefined()
  })

  it('não propaga prop "glossy" como atributo DOM', () => {
    const w = mount(DssToolbar, { props: { glossy: true } })
    expect(w.attributes('glossy')).toBeUndefined()
  })

  it('não propaga prop "color" como atributo DOM', () => {
    const w = mount(DssToolbar, { props: { color: 'primary' } })
    expect(w.attributes('color')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// 9. Reatividade — atualização de props
// ---------------------------------------------------------------------------

describe('DssToolbar — Reatividade', () => {
  it('adiciona classe brand quando brand muda de undefined para "hub"', async () => {
    const wrapper = mountToolbar({ brand: undefined })
    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-hub')

    await wrapper.setProps({ brand: 'hub' })

    expect(wrapper.element.classList).toContain('dss-toolbar--brand-hub')
    expect(wrapper.attributes('data-brand')).toBe('hub')
  })

  it('remove classe brand quando brand muda de "hub" para undefined', async () => {
    const wrapper = mountToolbar({ brand: 'hub' })
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-hub')

    await wrapper.setProps({ brand: undefined })

    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-hub')
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })

  it('troca corretamente de brand-hub para brand-water', async () => {
    const wrapper = mountToolbar({ brand: 'hub' })
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-hub')

    await wrapper.setProps({ brand: 'water' })

    expect(wrapper.element.classList).not.toContain('dss-toolbar--brand-hub')
    expect(wrapper.element.classList).toContain('dss-toolbar--brand-water')
    expect(wrapper.attributes('data-brand')).toBe('water')
  })

  it('adiciona classe inset quando inset muda de false para true', async () => {
    const wrapper = mountToolbar({ inset: false })
    expect(wrapper.element.classList).not.toContain('dss-toolbar--inset')

    await wrapper.setProps({ inset: true })

    expect(wrapper.element.classList).toContain('dss-toolbar--inset')
  })
})

// ---------------------------------------------------------------------------
// 10. Acessibilidade
// ---------------------------------------------------------------------------

describe('DssToolbar — Acessibilidade', () => {
  it('possui role="toolbar" no elemento raiz', () => {
    const wrapper = mountToolbar()
    expect(wrapper.attributes('role')).toBe('toolbar')
  })

  it('aria-label propagado via $attrs é acessível para screen readers', () => {
    const w = mount(DssToolbar, {
      attrs: { 'aria-label': 'Barra de ações do documento' }
    })
    expect(w.attributes('aria-label')).toBe('Barra de ações do documento')
  })

  it('elemento não possui tabindex (não é interativo)', () => {
    const wrapper = mountToolbar()
    // Container não-interativo não deve ter tabindex
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// 11. Snapshot — estrutura estável
// ---------------------------------------------------------------------------

describe('DssToolbar — Snapshot', () => {
  it('snapshot: toolbar padrão', () => {
    const wrapper = mountToolbar()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('snapshot: toolbar brand hub', () => {
    const wrapper = mountToolbar({ brand: 'hub' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('snapshot: toolbar inset + brand water', () => {
    const wrapper = mountToolbar({ inset: true, brand: 'water' })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
