import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssComposition from './DssComposition.vue'
import DssCompositions from './DssCompositions.vue'

installQuasarPlugin()
const columns = [{ name: 'nome', label: 'Nome', field: 'nome', align: 'left' }]
const rows = [{ id: 1, nome: 'Ana', available: true }, { id: 2, nome: 'Bruno', available: true }]

function factory(props = {}, slots = {}) {
  return mount(DssComposition, { props: { modelValue: rows, columns, ...props }, slots, attachTo: document.body })
}

describe('DssComposition', () => {
  it('compõe DssDataTable e aplica $attrs na raiz', () => {
    const wrapper = factory({}, {})
    expect(wrapper.find('.dss-composition').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DssDataTable' }).exists()).toBe(true)
  })

  it.each(['hub', 'water', 'waste'])('propaga data-brand %s', (brand) => {
    expect(factory({ brand }).find('.dss-composition').attributes('data-brand')).toBe(brand)
  })

  it('validate falha quando obrigatório e sem registros ativos', async () => {
    const wrapper = factory({ modelValue: [{ id: 1, nome: 'Ana', available: false }], required: true })
    expect(wrapper.vm.validate()).toBe(false)
    expect(wrapper.emitted('validate')[0]).toEqual([false])
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.dss-composition').attributes('aria-invalid')).toBe('true')
  })

  it('validate passa com registro ativo e resetValidation limpa o erro', async () => {
    const wrapper = factory({ required: true })
    expect(wrapper.vm.validate()).toBe(true)
    wrapper.vm.resetValidation()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.dss-composition--invalid').exists()).toBe(false)
  })

  it('inclusão emite novo array sem mutar a entrada', async () => {
    const source = [...rows]
    const wrapper = factory({ modelValue: source, createDraft: () => ({ nome: 'Carla', available: true }) })
    wrapper.vm.openAdd()
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ name: 'DssComposition' }).vm.$.setupState.saveDraft()
    const next = wrapper.emitted('update:modelValue')[0][0]
    expect(next).toHaveLength(3)
    expect(source).toHaveLength(2)
    expect(wrapper.emitted('change')[0][0].type).toBe('add')
  })

  it('validateDraft bloqueia salvamento inválido', async () => {
    const wrapper = factory({ createDraft: () => ({ nome: '' }), validateDraft: d => d.nome ? null : 'Informe o nome.' })
    wrapper.vm.openAdd()
    wrapper.vm.$.setupState.saveDraft()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('remove e inativa via confirmação', () => {
    const wrapper = factory({ operations: ['remove', 'toggle'] })
    const state = wrapper.vm.$.setupState
    state.askConfirm('inactivate', rows[0]); state.applyConfirm()
    expect(wrapper.emitted('update:modelValue')[0][0][0].available).toBe(false)
    state.askConfirm('remove', rows[1]); state.applyConfirm()
    expect(wrapper.emitted('update:modelValue')[1][0]).toHaveLength(1)
  })

  it('não oferece Adicionar sem a operação add', () => {
    expect(factory({ operations: ['edit'] }).text()).not.toContain('Adicionar')
  })
})

describe('DssCompositions', () => {
  it('renderiza abas com obrigatoriedade e contagem', () => {
    const wrapper = mount(DssCompositions, { props: { items: [{ name: 'a', label: 'Contatos', required: true, count: 2 }] } })
    expect(wrapper.text()).toContain('Contatos * (2)')
  })
})
