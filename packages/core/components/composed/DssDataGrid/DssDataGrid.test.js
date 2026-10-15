import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssDataGrid from './DssDataGrid.vue'

installQuasarPlugin()

const fields = [
  { name: 'nome', label: 'Nome' },
  { name: 'cpf', label: 'CPF' },
  { name: 'cadastro', label: 'Cadastro', visibility: 'hidden' },
]
const rows = [
  { id: 1, nome: 'Ana Souza', cpf: '000.000.000-01', cadastro: '12/03/2024' },
  { id: 2, nome: 'Bruno Lima', cpf: '000.000.000-02', cadastro: '04/07/2023' },
]

function factory(props = {}, slots = {}) {
  return mount(DssDataGrid, { props: { rows, fields, ...props }, slots })
}

describe('DssDataGrid', () => {
  it('monta com contrato mínimo e usa lista, não tabela', () => {
    const wrapper = factory()
    expect(wrapper.find('.dss-data-grid').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.findAll('.dss-data-grid__item')).toHaveLength(2)
  })

  it('vincula rótulo e valor de cada campo por dt/dd', () => {
    const wrapper = factory()
    const primeiro = wrapper.findAll('.dss-data-grid__card')[0]
    const rotulos = primeiro.findAll('dt').map((dt) => dt.text())
    const valores = primeiro.findAll('dd').map((dd) => dd.text())
    expect(rotulos).toContain('Nome')
    expect(rotulos).toContain('CPF')
    expect(valores).toContain('Ana Souza')
    expect(valores).toContain('000.000.000-01')
  })

  it.each(['hub', 'water', 'waste'])('propaga brand %s no nó raiz', (brand) => {
    expect(factory({ brand }).attributes('data-brand')).toBe(brand)
  })

  it('comunica loading e disabled na raiz', () => {
    const wrapper = factory({ loading: true, disabled: true })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('anuncia a contagem de registros em região viva', () => {
    const wrapper = factory({ total: 40 })
    const contagem = wrapper.find('.dss-data-grid__count')
    expect(contagem.attributes('aria-live')).toBe('polite')
    expect(contagem.text()).toBe('2 de 40 registros')
  })

  // A origem declarava `visibility: 'hidden'` e empurrava um campo sintético
  // `showhide` rotulado "MORE" que nada renderizava. Aqui o revelador existe.
  // `v-show`, não `v-if`: o bloco revelado precisa EXISTIR mesmo recolhido,
  // senão o `aria-controls` do botão aponta para um id inexistente.
  // Recolhido: o bloco EXISTE e está oculto por estilo, não removido do DOM.
  // `v-show`, não `v-if` — com `v-if` o `aria-controls` do botão apontaria
  // para um id ausente do DOM enquanto fechado, que é pior do que não
  // declarar a relação. A abertura é verificada no teste seguinte.
  //
  // A ocultação é medida pelo `style`, não por `isVisible()`: nesta versão do
  // Vue Test Utils, ler `isVisible()` de um elemento ANTES de mudar o estado
  // envenena a leitura posterior do mesmo elemento (medido: a leitura prévia
  // faz o `isVisible()` pós-clique devolver `false` com o bloco já visível).
  it('guarda campo oculto atrás do revelador, com aria-expanded e aria-controls', () => {
    const wrapper = factory()
    const primeiro = wrapper.findAll('.dss-data-grid__card')[0]
    const extra = primeiro.find('.dss-data-grid__fields--extra')
    expect(extra.exists()).toBe(true)
    expect(extra.attributes('style')).toContain('display: none')
    expect(extra.findAll('dt').map((dt) => dt.text())).toContain('Cadastro')

    const visiveis = primeiro.find('.dss-data-grid__fields:not(.dss-data-grid__fields--extra)')
    expect(visiveis.findAll('dt').map((dt) => dt.text())).not.toContain('Cadastro')

    const revelador = primeiro.find('.dss-data-grid__card-foot button')
    expect(revelador.attributes('aria-expanded')).toBe('false')
    expect(revelador.attributes('aria-controls')).toBe(extra.attributes('id'))
  })

  it('revela um card sem revelar os demais', async () => {
    const wrapper = factory()
    await wrapper.findAll('.dss-data-grid__card-foot button')[0].trigger('click')
    const botoes = wrapper.findAll('.dss-data-grid__card-foot button')
    expect(botoes[0].attributes('aria-expanded')).toBe('true')
    expect(botoes[1].attributes('aria-expanded')).toBe('false')
    const blocos = wrapper.findAll('.dss-data-grid__fields--extra')
    expect(blocos[0].isVisible()).toBe(true)
    expect(blocos[1].isVisible()).toBe(false)
  })

  // A origem usava `props.row.name` como rótulo do checkbox: o título só
  // existia como nome de um controle, e o campo precisava chamar-se `name`.
  it('dá título próprio ao card e nome contextual ao checkbox', () => {
    const wrapper = factory({ selection: 'multiple' })
    expect(wrapper.find('.dss-data-grid__card-title').text()).toBe('Ana Souza')
    expect(wrapper.findComponent({ name: 'DssCheckbox' }).props('ariaLabel'))
      .toBe('Selecionar Ana Souza')
  })

  it('aceita titleField explícito', () => {
    const wrapper = factory({ titleField: 'cpf', selection: 'single' })
    expect(wrapper.find('.dss-data-grid__card-title').text()).toBe('000.000.000-01')
  })

  it('seleciona um card e propaga update:modelValue', async () => {
    const wrapper = factory({ selection: 'multiple' })
    await wrapper.findComponent({ name: 'DssCheckbox' }).vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[rows[0]]])
  })

  it('troca a seleção em modo single em vez de acumular', async () => {
    const wrapper = factory({ selection: 'single', modelValue: [rows[0]] })
    const caixas = wrapper.findAllComponents({ name: 'DssCheckbox' })
    await caixas[1].vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[rows[1]]])
  })

  it('não renderiza paginação quando cabe em uma página', () => {
    expect(factory().find('.dss-data-grid__pagination').exists()).toBe(false)
  })

  it('fatia localmente e emite update:page ao paginar', async () => {
    const muitos = Array.from({ length: 7 }, (_, i) => ({ id: i + 1, nome: `Pessoa ${i + 1}`, cpf: `cpf-${i}` }))
    const wrapper = mount(DssDataGrid, { props: { rows: muitos, fields, rowsPerPage: 3 } })
    expect(wrapper.findAll('.dss-data-grid__item')).toHaveLength(3)
    const paginacao = wrapper.findComponent({ name: 'DssPagination' })
    expect(paginacao.props('max')).toBe(3)
    await paginacao.vm.$emit('update:modelValue', 2)
    expect(wrapper.emitted('update:page')[0]).toEqual([2])
    expect(wrapper.emitted('request')).toBeFalsy()
  })

  // Em remoto `rows` JÁ é a página: fatiar de novo esconderia registros.
  it('em remoto não refatia a página e emite request', async () => {
    const wrapper = factory({ rowsNumber: 40, rowsPerPage: 2, page: 1 })
    expect(wrapper.findAll('.dss-data-grid__item')).toHaveLength(2)
    expect(wrapper.findComponent({ name: 'DssPagination' }).props('max')).toBe(20)
    await wrapper.findComponent({ name: 'DssPagination' }).vm.$emit('update:modelValue', 3)
    expect(wrapper.emitted('request')[0]).toEqual([{ page: 3, rowsPerPage: 2 }])
  })

  it('apresenta vazio com saída quando há filtro aplicado', async () => {
    const wrapper = factory({ rows: [], filterLabel: 'Setor Norte' })
    expect(wrapper.find('.dss-empty-state').exists()).toBe(true)
    const limpar = wrapper.findAllComponents({ name: 'DssButton' })
      .find((botao) => botao.props('label') === 'Limpar filtro')
    await limpar.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('clear-filter')).toBeTruthy()
  })

  it('apresenta falha e permite solicitar nova tentativa', async () => {
    const wrapper = factory({ error: 'Serviço indisponível' })
    expect(wrapper.findComponent({ name: 'DssBanner' }).text()).toContain('Serviço indisponível')
    expect(wrapper.findAll('.dss-data-grid__item')).toHaveLength(0)
    const tentar = wrapper.findAllComponents({ name: 'DssButton' })
      .find((botao) => botao.props('label') === 'Tentar novamente')
    await tentar.vm.$emit('click', new MouseEvent('click'))
    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('request')).toBeTruthy()
  })

  it('emite clear-filter ao remover o chip do filtro', async () => {
    const wrapper = factory({ filterLabel: 'Equipe CL250' })
    await wrapper.findComponent({ name: 'DssChip' }).vm.$emit('remove')
    expect(wrapper.emitted('clear-filter')).toBeTruthy()
  })

  it('não muta as props recebidas', () => {
    const camposOriginais = JSON.parse(JSON.stringify(fields))
    const linhasOriginais = JSON.parse(JSON.stringify(rows))
    factory({ selection: 'multiple' })
    expect(JSON.parse(JSON.stringify(fields))).toEqual(camposOriginais)
    expect(JSON.parse(JSON.stringify(rows))).toEqual(linhasOriginais)
  })

  it('preserva o slot item e os slots de composição', () => {
    const wrapper = factory({}, {
      item: '<div class="custom-card">custom</div>',
      'head-start': '<span class="legenda">Legenda</span>',
    })
    expect(wrapper.findAll('.custom-card')).toHaveLength(2)
    expect(wrapper.find('.legenda').exists()).toBe(true)
  })
})
