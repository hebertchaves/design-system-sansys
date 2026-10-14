import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssDataTableClaudeCode from './DssDataTableClaudeCode.vue'

installQuasarPlugin()

const columns = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left', sortable: true },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' },
]
const rows = [
  { id: 1, protocolo: '65665262', situacao: 'Atrasada' },
  { id: 2, protocolo: '65665263', situacao: 'No prazo' },
]
const statusMap = {
  Atrasada: { tone: 'error', icon: 'notification_important' },
  'No prazo': { tone: 'success', icon: 'schedule' },
}

function factory(props = {}, slots = {}) {
  return mount(DssDataTableClaudeCode, { props: { rows, columns, ...props }, slots })
}

describe('DssDataTableClaudeCode', () => {
  it('monta com contrato mínimo e compõe DssTable dentro de um DssCard', () => {
    const wrapper = factory()
    expect(wrapper.find('.dss-data-table-cc').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DssCard' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DssTable' }).exists()).toBe(true)
  })

  it('renderiza cabeçalho e células a partir de columns e rows', () => {
    const wrapper = factory()
    const cabecalhos = wrapper.findAll('th').map((th) => th.text())
    expect(cabecalhos.some((texto) => texto.includes('Protocolo'))).toBe(true)
    const celulas = wrapper.findAll('tbody td').map((td) => td.text())
    expect(celulas).toContain('65665262')
    expect(celulas).toContain('65665263')
  })

  it.each(['hub', 'water', 'waste'])('propaga brand %s no nó raiz', (brand) => {
    expect(factory({ brand }).attributes('data-brand')).toBe(brand)
  })

  it('comunica loading e disabled na raiz', () => {
    const wrapper = factory({ loading: true, disabled: true })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.findComponent({ name: 'DssTable' }).props('loading')).toBe(true)
  })

  it('nomeia os controles pelo contexto da linha e do bloco', () => {
    const wrapper = factory({
      selection: 'multiple',
      expandable: true,
      rowActions: [{ name: 'edit', label: 'Editar', icon: 'edit' }],
      filterLabel: 'Equipe CL250',
    })
    expect(wrapper.findComponent({ name: 'DssCheckbox' }).props('ariaLabel'))
      .toBe('Selecionar linha 1')
    const rotulos = wrapper.findAllComponents({ name: 'DssButton' })
      .map((botao) => botao.props('ariaLabel'))
      .filter(Boolean)
    expect(rotulos).toContain('Expandir linha 1')
    expect(wrapper.find('[role="toolbar"]').attributes('aria-label')).toBe('Ações da tabela')
    expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Ações da linha 1')
    expect(wrapper.findComponent({ name: 'DssChip' }).props('ariaLabel'))
      .toBe('Remover filtro Equipe CL250')
  })

  it('anuncia a contagem de registros em região viva', () => {
    const wrapper = factory({ total: 12 })
    const contagem = wrapper.find('.dss-data-table-cc__count')
    expect(contagem.attributes('aria-live')).toBe('polite')
    expect(contagem.text()).toBe('2 de 12 registros')
  })

  it('não inventa denominador quando total não é informado', () => {
    expect(factory().find('.dss-data-table-cc__count').text()).toBe('2 registros')
  })

  it('pinta a situação como chip com rótulo e ícone, nunca só com cor', () => {
    const wrapper = factory({ statusColumn: 'situacao', statusMap, selection: 'single' })
    const chips = wrapper.findAllComponents({ name: 'DssChip' })
    const atrasada = chips.find((chip) => chip.props('label') === 'Atrasada')
    expect(atrasada).toBeTruthy()
    expect(atrasada.props('icon')).toBe('notification_important')
    expect(atrasada.props('color')).toBe('negative')
  })

  it('cai em neutro e sem ícone para situação não declarada no statusMap', () => {
    const wrapper = factory({ statusColumn: 'situacao', statusMap: {}, selection: 'single' })
    const chip = wrapper.findAllComponents({ name: 'DssChip' })
      .find((item) => item.props('label') === 'Atrasada')
    expect(chip.props('color')).toBe('neutral')
    expect(chip.props('icon')).toBeFalsy()
  })

  // O contrato de quatro estados herdado do JtDataTable. `single` e `any`
  // divergem no teto: 2 selecionadas desativam `single`, não `any`.
  it.each([
    ['none', 0, false], ['none', 1, false], ['none', 2, false],
    ['single', 0, true], ['single', 1, false], ['single', 2, true],
    ['multi', 0, true], ['multi', 1, false], ['multi', 2, false],
    ['any', 0, true], ['any', 1, false], ['any', 2, false],
  ])('modo %s com %i selecionada(s) → desabilitado=%s', (mode, qtd, esperado) => {
    const wrapper = factory({
      actions: [{ name: 'acao', label: 'Ação', mode }],
      modelValue: rows.slice(0, qtd),
    })
    expect(wrapper.findComponent({ name: 'DssButton' }).props('disabled')).toBe(esperado)
  })

  it('seleciona uma linha e propaga update:modelValue', async () => {
    const wrapper = factory({ selection: 'multiple' })
    await wrapper.findComponent({ name: 'DssCheckbox' }).vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[rows[0]]])
  })

  it('controla expansão e emite solicitação de detalhes', async () => {
    const wrapper = factory({ expandable: true, expandedKeys: [] }, {
      'expanded-row': '<div class="detalhe">Detalhes</div>',
    })
    const expandir = wrapper.findAllComponents({ name: 'DssButton' })
      .find((botao) => String(botao.props('ariaLabel')).startsWith('Expandir'))
    await expandir.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('update:expandedKeys')[0]).toEqual([[1]])
    expect(wrapper.emitted('expand-request')[0][0]).toMatchObject({ key: 1, expanded: true })
  })

  it('emite clear-filter ao remover o chip do filtro aplicado', async () => {
    const wrapper = factory({ filterLabel: 'Setor Norte' })
    await wrapper.findComponent({ name: 'DssChip' }).vm.$emit('remove')
    expect(wrapper.emitted('clear-filter')).toBeTruthy()
  })

  it('apresenta falha e permite solicitar nova tentativa', async () => {
    const wrapper = factory({ error: 'Serviço indisponível' })
    expect(wrapper.findComponent({ name: 'DssBanner' }).text()).toContain('Serviço indisponível')
    const tentar = wrapper.findAllComponents({ name: 'DssButton' })
      .find((botao) => botao.props('label') === 'Tentar novamente')
    await tentar.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('request')).toBeTruthy()
  })

  it('preserva os slots de composição do cabeçalho', () => {
    const wrapper = factory({ ariaLabel: 'Solicitações operacionais' }, {
      'head-start': '<div class="legenda">Legenda</div>',
    })
    expect(wrapper.attributes('aria-label')).toBe('Solicitações operacionais')
    expect(wrapper.find('.legenda').exists()).toBe(true)
  })
})
