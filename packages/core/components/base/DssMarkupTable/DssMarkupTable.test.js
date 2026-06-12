/**
 * ==========================================================================
 * DssMarkupTable — Testes Unitários
 * ==========================================================================
 *
 * Cobertura mínima DSS v2.2:
 * - Renderização base
 * - Props
 * - Slots
 * - Classes CSS geradas
 * - Acessibilidade
 * - Paridade com Golden Reference (DssBadge)
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssMarkupTable from './DssMarkupTable.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

const defaultSlot = `
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>João Silva</td>
      <td>Ativo</td>
    </tr>
    <tr>
      <td>Maria Costa</td>
      <td>Inativo</td>
    </tr>
  </tbody>
`

const mountTable = (props = {}, slots = {}) => {
  return mount(DssMarkupTable, {
    props,
    slots: {
      default: defaultSlot,
      ...slots
    },
    global: {
      stubs: {}
    }
  })
}

// ==========================================================================
// RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssMarkupTable — Renderização Base', () => {
  it('renderiza sem erros com props padrão', () => {
    const wrapper = mountTable()
    expect(wrapper.exists()).toBe(true)
  })

  it('possui classe raiz dss-markup-table', () => {
    const wrapper = mountTable()
    expect(wrapper.classes()).toContain('dss-markup-table')
  })

  it('renderiza conteúdo do slot', () => {
    const wrapper = mountTable()
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('th').length).toBe(2)
    expect(wrapper.findAll('td').length).toBe(4)
  })

  it('renderiza um elemento de tabela semântico', () => {
    const wrapper = mountTable()
    expect(wrapper.find('table').exists()).toBe(true)
  })
})

// ==========================================================================
// PROPS — DENSITY
// ==========================================================================

describe('DssMarkupTable — Prop: density', () => {
  it('aplica classe compact quando density="compact"', () => {
    const wrapper = mountTable({ density: 'compact' })
    expect(wrapper.classes()).toContain('dss-markup-table--compact')
    expect(wrapper.classes()).not.toContain('dss-markup-table--comfortable')
  })

  it('aplica classe comfortable quando density="comfortable"', () => {
    const wrapper = mountTable({ density: 'comfortable' })
    expect(wrapper.classes()).toContain('dss-markup-table--comfortable')
    expect(wrapper.classes()).not.toContain('dss-markup-table--compact')
  })

  it('não aplica classe de density para standard (default)', () => {
    const wrapper = mountTable({ density: 'standard' })
    expect(wrapper.classes()).not.toContain('dss-markup-table--compact')
    expect(wrapper.classes()).not.toContain('dss-markup-table--comfortable')
  })

  it('dense=true passado para QMarkupTable quando density=compact', () => {
    const wrapper = mountTable({ density: 'compact' })
    // QMarkupTable adiciona q-markup-table--dense quando dense=true
    expect(wrapper.html()).toContain('dense')
  })
})

// ==========================================================================
// PROPS — VISUAL
// ==========================================================================

describe('DssMarkupTable — Props Visuais', () => {
  it('prop flat passa para QMarkupTable', () => {
    const wrapper = mountTable({ flat: true })
    expect(wrapper.html()).toContain('flat')
  })

  it('prop bordered passa para QMarkupTable', () => {
    const wrapper = mountTable({ bordered: true })
    expect(wrapper.html()).toContain('bordered')
  })

  it('prop square passa para QMarkupTable', () => {
    const wrapper = mountTable({ square: true })
    expect(wrapper.html()).toContain('square')
  })

  it('prop wrapCells passa para QMarkupTable como wrap-cells', () => {
    // Contrato real: wrapCells=false aplica q-table--no-wrap; true a REMOVE
    const wrapped = mountTable({ wrapCells: true })
    expect(wrapped.classes()).not.toContain('q-table--no-wrap')
    const noWrap = mountTable({ wrapCells: false })
    expect(noWrap.classes()).toContain('q-table--no-wrap')
  })
})

// ==========================================================================
// PROPS — SEPARATOR
// ==========================================================================

describe('DssMarkupTable — Prop: separator', () => {
  const separators = ['horizontal', 'vertical', 'cell', 'none']

  separators.forEach((sep) => {
    it(`aceita separator="${sep}" sem erros`, () => {
      const wrapper = mountTable({ separator: sep })
      expect(wrapper.exists()).toBe(true)
    })
  })
})

// ==========================================================================
// PROPS — BRAND
// ==========================================================================

describe('DssMarkupTable — Prop: brand', () => {
  it('aplica classe brand-hub quando brand="hub"', () => {
    const wrapper = mountTable({ brand: 'hub' })
    expect(wrapper.classes()).toContain('dss-markup-table--brand-hub')
  })

  it('aplica classe brand-water quando brand="water"', () => {
    const wrapper = mountTable({ brand: 'water' })
    expect(wrapper.classes()).toContain('dss-markup-table--brand-water')
  })

  it('aplica classe brand-waste quando brand="waste"', () => {
    const wrapper = mountTable({ brand: 'waste' })
    expect(wrapper.classes()).toContain('dss-markup-table--brand-waste')
  })

  it('não aplica classe de brand quando brand=null', () => {
    const wrapper = mountTable({ brand: null })
    expect(wrapper.classes().some(c => c.includes('brand'))).toBe(false)
  })
})

// ==========================================================================
// ATRIBUTOS HERDADOS (inheritAttrs: false + v-bind="$attrs")
// ==========================================================================

describe('DssMarkupTable — Forwarding de Atributos', () => {
  it('passa aria-label para o elemento raiz', () => {
    const wrapper = mountTable({}, {})
    // Testar via attrs
    const wrapper2 = mount(DssMarkupTable, {
      attrs: { 'aria-label': 'Tabela de usuários' },
      slots: { default: defaultSlot }
    })
    expect(wrapper2.html()).toContain('aria-label="Tabela de usuários"')
  })

  it('passa data-testid para o elemento raiz', () => {
    const wrapper = mount(DssMarkupTable, {
      attrs: { 'data-testid': 'users-table' },
      slots: { default: defaultSlot }
    })
    expect(wrapper.html()).toContain('data-testid="users-table"')
  })
})

// ==========================================================================
// SEM EMITS (NÃO-INTERATIVO)
// ==========================================================================

describe('DssMarkupTable — Sem Emits', () => {
  it('não emite nenhum evento por padrão', async () => {
    const wrapper = mountTable()
    // Nenhum emit registrado — componente puramente de exibição
    expect(Object.keys(wrapper.emitted())).toHaveLength(0)
  })
})

// ==========================================================================
// SLOTS
// ==========================================================================

describe('DssMarkupTable — Slots', () => {
  it('renderiza slot com tfoot', () => {
    const wrapper = mount(DssMarkupTable, {
      slots: {
        default: `
          <thead><tr><th scope="col">Nome</th></tr></thead>
          <tbody><tr><td>João</td></tr></tbody>
          <tfoot><tr><td>Total: 1</td></tr></tfoot>
        `
      }
    })
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('tfoot td').text()).toBe('Total: 1')
  })

  it('renderiza slot mínimo apenas com tbody', () => {
    const wrapper = mount(DssMarkupTable, {
      slots: {
        default: `<tbody><tr><td>Dado</td></tr></tbody>`
      }
    })
    expect(wrapper.find('tbody').exists()).toBe(true)
  })
})

// ==========================================================================
// PARIDADE COM GOLDEN REFERENCE (DssBadge)
// ==========================================================================

describe('DssMarkupTable — Paridade com DssBadge (Golden Reference)', () => {
  it('defineOptions name está definido como DssMarkupTable', () => {
    // Verifica que o componente tem name correto (via component options)
    expect(DssMarkupTable.__name || DssMarkupTable.name).toBeTruthy()
  })

  it('não emite eventos (padrão não-emissor — igual DssBadge)', () => {
    const wrapper = mountTable()
    expect(Object.keys(wrapper.emitted())).toHaveLength(0)
  })

  it('aceita props sem lançar warning', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    mountTable({
      density: 'compact',
      bordered: true,
      separator: 'cell',
      brand: 'hub'
    })
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('[Vue warn]')
    )
    consoleSpy.mockRestore()
  })
})

// ==========================================================================
// CENÁRIOS DO EXAMPLE.VUE
// ==========================================================================

describe('DssMarkupTable — Cenários do Example', () => {
  it('Cenário 1: Tabela Hub com bordered e density standard', () => {
    const wrapper = mountTable({
      bordered: true,
      density: 'standard',
      brand: 'hub'
    })
    expect(wrapper.classes()).toContain('dss-markup-table')
    expect(wrapper.classes()).toContain('dss-markup-table--brand-hub')
    expect(wrapper.classes()).not.toContain('dss-markup-table--compact')
  })

  it('Cenário 2: Tabela Water com separator cell', () => {
    const wrapper = mountTable({
      bordered: true,
      separator: 'cell',
      brand: 'water'
    })
    expect(wrapper.classes()).toContain('dss-markup-table--brand-water')
  })

  it('Cenário 3: Tabela Waste compact', () => {
    const wrapper = mountTable({
      density: 'compact',
      bordered: true,
      brand: 'waste'
    })
    expect(wrapper.classes()).toContain('dss-markup-table--compact')
    expect(wrapper.classes()).toContain('dss-markup-table--brand-waste')
  })

  it('Cenário 4: Tabela flat comfortable sem marca', () => {
    const wrapper = mountTable({
      flat: true,
      density: 'comfortable',
      separator: 'horizontal'
    })
    expect(wrapper.classes()).toContain('dss-markup-table--comfortable')
    expect(wrapper.classes().some(c => c.includes('brand'))).toBe(false)
  })
})
