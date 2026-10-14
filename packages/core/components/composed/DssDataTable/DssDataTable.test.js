import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssDataTable from './DssDataTable.vue'

installQuasarPlugin()
const columns = [{ name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true }]
const rows = [{ id: 1, name: 'Ana' }, { id: 2, name: 'Bruno' }]

function factory(props = {}, slots = {}) {
  return mount(DssDataTable, { props: { rows, columns, ...props }, slots })
}

describe('DssDataTable', () => {
  it('monta com contrato mínimo e compõe DssTable', () => {
    const wrapper = factory()
    expect(wrapper.find('.dss-data-table').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DssTable' }).exists()).toBe(true)
  })

  it.each(['hub', 'water', 'waste'])('propaga brand %s no nó raiz', (brand) => {
    expect(factory({ brand }).attributes('data-brand')).toBe(brand)
  })

  it('comunica loading e disabled na raiz e nos controles', () => {
    const wrapper = factory({ loading: true, disabled: true, selection: 'multiple' })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.findComponent({ name: 'DssTable' }).props('loading')).toBe(true)
  })

  it('seleciona uma linha e propaga update:modelValue', async () => {
    const wrapper = factory({ selection: 'multiple' })
    const checkbox = wrapper.findComponent({ name: 'DssCheckbox' })
    await checkbox.vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[rows[0]]])
  })

  it('emite request controlado no modo remoto ao filtrar', async () => {
    const wrapper = factory({ mode: 'remote', filter: '' })
    const input = wrapper.findComponent({ name: 'DssInput' })
    await input.vm.$emit('update:modelValue', 'Ana')
    expect(wrapper.emitted('update:filter')[0]).toEqual(['Ana'])
    expect(wrapper.emitted('request')[0][0].filter).toBe('Ana')
  })

  it('desabilita ação que exige seleção e emite após seleção', async () => {
    const action = { name: 'archive', label: 'Arquivar', requiresSelection: true }
    const empty = factory({ actions: [action] })
    expect(empty.findComponent({ name: 'DssButton' }).props('disabled')).toBe(true)
    const selected = factory({ actions: [action], modelValue: [rows[0]] })
    await selected.findComponent({ name: 'DssButton' }).trigger('click')
    expect(selected.emitted('action')[0][0]).toMatchObject({ action, rows: [rows[0]] })
  })

  it('controla expansão e emite solicitação de detalhes', async () => {
    const wrapper = factory({ expandable: true, expandedKeys: [] }, { 'expanded-row': '<div class="details">Detalhes</div>' })
    const expand = wrapper.findAllComponents({ name: 'DssButton' }).find(button => String(button.props('ariaLabel')).startsWith('Expandir'))
    expect(expand).toBeTruthy()
    await expand.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('update:expandedKeys')[0]).toEqual([[1]])
    expect(wrapper.emitted('expand-request')[0][0]).toMatchObject({ key: 1, expanded: true })
  })

  it('apresenta falha e permite solicitar nova tentativa', async () => {
    const wrapper = factory({ error: 'Serviço indisponível' })
    expect(wrapper.findComponent({ name: 'DssBanner' }).text()).toContain('Serviço indisponível')
    const retry = wrapper.findAllComponents({ name: 'DssButton' }).find(button => button.props('label') === 'Tentar novamente')
    await retry.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('request')).toBeTruthy()
  })

  it('expõe nome acessível e preserva slots de composição', () => {
    const wrapper = factory({ ariaLabel: 'Solicitações operacionais' }, { 'top-left': '<div class="custom-top">Lote</div>' })
    expect(wrapper.attributes('aria-label')).toBe('Solicitações operacionais')
    expect(wrapper.find('.custom-top').exists()).toBe(true)
  })
})
