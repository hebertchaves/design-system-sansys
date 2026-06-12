import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTree from './DssTree.vue'

installQuasarPlugin()

const nodes = [
  {
    id: 'parent-1',
    label: 'Categoria A',
    children: [
      { id: 'child-1', label: 'Item 1' },
      { id: 'child-2', label: 'Item 2' }
    ]
  },
  {
    id: 'parent-2',
    label: 'Categoria B',
    disabled: true,
    children: [
      { id: 'child-3', label: 'Item 3' }
    ]
  }
]

describe('DssTree', () => {

  // ─── Renderização base ───────────────────────────────────────────────────

  it('renderiza com classe base dss-tree', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(wrapper.find('.dss-tree').exists()).toBe(true)
  })

  it('renderiza o QTree internamente', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(wrapper.find('.q-tree').exists()).toBe(true)
  })

  it('não aplica classe dss-tree--dense por padrão', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(wrapper.find('.dss-tree--dense').exists()).toBe(false)
  })

  // ─── Props: dense ─────────────────────────────────────────────────────────

  it('aplica classe dss-tree--dense quando dense=true', () => {
    const wrapper = mount(DssTree, { props: { nodes, dense: true } })
    expect(wrapper.find('.dss-tree--dense').exists()).toBe(true)
  })

  it('passa dense ao QTree quando dense=true', () => {
    const wrapper = mount(DssTree, { props: { nodes, dense: true } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('dense')).toBe(true)
  })

  // ─── Props: node-key e label-key (defaults) ──────────────────────────────

  it('usa nodeKey="id" por padrão', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('nodeKey')).toBe('id')
  })

  it('usa labelKey="label" por padrão', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('labelKey')).toBe('label')
  })

  it('aceita nodeKey customizado', () => {
    const nodesAlt = [{ uid: '1', name: 'Item', children: [] }]
    const wrapper = mount(DssTree, {
      props: { nodes: nodesAlt, nodeKey: 'uid', labelKey: 'name' }
    })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('nodeKey')).toBe('uid')
  })

  // ─── Props: accordion ────────────────────────────────────────────────────

  it('passa accordion ao QTree', () => {
    const wrapper = mount(DssTree, { props: { nodes, accordion: true } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('accordion')).toBe(true)
  })

  // ─── Props: noConnectors ─────────────────────────────────────────────────

  it('passa noConnectors ao QTree', () => {
    const wrapper = mount(DssTree, { props: { nodes, noConnectors: true } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('noConnectors')).toBe(true)
  })

  // ─── Props: tickStrategy ─────────────────────────────────────────────────

  it('não passa tickStrategy ao QTree quando tickStrategy="none" (padrão)', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    // DssTree passa undefined; o QTree aplica seu próprio default 'none'
    // (props() devolve o default do motor, nunca undefined)
    expect(qTree.props('tickStrategy')).toBe('none')
  })

  it('passa tickStrategy="leaf" ao QTree quando especificado', () => {
    const wrapper = mount(DssTree, {
      props: { nodes, tickStrategy: 'leaf' }
    })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('tickStrategy')).toBe('leaf')
  })

  // ─── Props: labels localizados ───────────────────────────────────────────

  it('usa noNodesLabel em português por padrão', () => {
    const wrapper = mount(DssTree, { props: { nodes: [] } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('noNodesLabel')).toBe('Nenhum nó disponível')
  })

  it('usa noResultsLabel em português por padrão', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('noResultsLabel')).toBe('Nenhum resultado para o filtro aplicado')
  })

  // ─── Props: filter ───────────────────────────────────────────────────────

  it('passa filter ao QTree', () => {
    const wrapper = mount(DssTree, { props: { nodes, filter: 'Item' } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    expect(qTree.props('filter')).toBe('Item')
  })

  // ─── Emits ───────────────────────────────────────────────────────────────

  it('emite update:selected ao selecionar nó', async () => {
    const wrapper = mount(DssTree, { props: { nodes, selected: null } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    await qTree.vm.$emit('update:selected', 'child-1')
    expect(wrapper.emitted('update:selected')).toBeTruthy()
    expect(wrapper.emitted('update:selected')[0]).toEqual(['child-1'])
  })

  it('emite update:expanded ao expandir nó', async () => {
    const wrapper = mount(DssTree, { props: { nodes, expanded: [] } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    await qTree.vm.$emit('update:expanded', ['parent-1'])
    expect(wrapper.emitted('update:expanded')).toBeTruthy()
  })

  it('emite update:ticked ao marcar nó', async () => {
    const wrapper = mount(DssTree, {
      props: { nodes, ticked: [], tickStrategy: 'leaf' }
    })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    await qTree.vm.$emit('update:ticked', ['child-1'])
    expect(wrapper.emitted('update:ticked')).toBeTruthy()
  })

  it('emite lazy-load ao expandir nó lazy', async () => {
    const lazyNodes = [{ id: 'lazy-1', label: 'Categoria', lazy: true }]
    const wrapper = mount(DssTree, { props: { nodes: lazyNodes } })
    const qTree = wrapper.findComponent({ name: 'QTree' })
    const lazyPayload = { node: lazyNodes[0], key: 'lazy-1', done: vi.fn(), fail: vi.fn() }
    await qTree.vm.$emit('lazy-load', lazyPayload)
    expect(wrapper.emitted('lazy-load')).toBeTruthy()
  })

  // ─── defineExpose ─────────────────────────────────────────────────────────

  it('expõe método expandAll via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.expandAll).toBe('function')
  })

  it('expõe método collapseAll via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.collapseAll).toBe('function')
  })

  it('expõe método getNodeByKey via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.getNodeByKey).toBe('function')
  })

  it('expõe método setExpanded via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.setExpanded).toBe('function')
  })

  it('expõe método setTicked via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.setTicked).toBe('function')
  })

  it('expõe método isExpanded via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.isExpanded).toBe('function')
  })

  it('expõe método getTickedNodes via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.getTickedNodes).toBe('function')
  })

  it('expõe método getExpandedNodes via ref', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(typeof wrapper.vm.getExpandedNodes).toBe('function')
  })

  // ─── Acessibilidade ───────────────────────────────────────────────────────

  it('renderiza role="tree" (gerenciado pelo QTree)', () => {
    const wrapper = mount(DssTree, { props: { nodes } })
    expect(wrapper.find('[role="tree"]').exists()).toBe(true)
  })

})
