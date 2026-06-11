import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTable from './DssTable.vue'

installQuasarPlugin()

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
  { name: 'cargo', label: 'Cargo', field: 'cargo', align: 'left' }
]

const rows = [
  { id: 1, nome: 'Ana Souza', cargo: 'Engenheira' },
  { id: 2, nome: 'Bruno Lima', cargo: 'Designer' },
  { id: 3, nome: 'Carla Melo', cargo: 'Analista' }
]

describe('DssTable', () => {

  // ─── Renderização base ───────────────────────────────────────────────────

  it('renderiza com classe base dss-table', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(wrapper.find('.dss-table').exists()).toBe(true)
  })

  it('renderiza o QTable internamente', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(wrapper.find('.q-table__container').exists()).toBe(true)
  })

  it('não aplica classe de density por padrão (standard)', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(wrapper.find('.dss-table--compact').exists()).toBe(false)
    expect(wrapper.find('.dss-table--comfortable').exists()).toBe(false)
  })

  // ─── Props: density ──────────────────────────────────────────────────────

  it('aplica classe dss-table--compact quando density="compact"', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, density: 'compact' } })
    expect(wrapper.find('.dss-table--compact').exists()).toBe(true)
  })

  it('aplica classe dss-table--comfortable quando density="comfortable"', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, density: 'comfortable' } })
    expect(wrapper.find('.dss-table--comfortable').exists()).toBe(true)
  })

  it('passa dense=true ao QTable quando density="compact"', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, density: 'compact' } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('dense')).toBe(true)
  })

  it('passa dense=false ao QTable quando density="standard"', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, density: 'standard' } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('dense')).toBe(false)
  })

  // ─── Props: selection ────────────────────────────────────────────────────

  it('não força selection no QTable quando selection="none" (padrão)', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    // DssTable passa undefined; o QTable aplica seu próprio default 'none'.
    // (props('selection') devolve o default do QTable, nunca undefined.)
    expect(qTable.props('selection')).toBe('none')
  })

  it('passa selection="multiple" ao QTable quando especificado', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, selection: 'multiple' } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('selection')).toBe('multiple')
  })

  it('passa selection="single" ao QTable quando especificado', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, selection: 'single' } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('selection')).toBe('single')
  })

  // ─── Props: loading ──────────────────────────────────────────────────────

  it('aplica classe dss-table--loading quando loading=true', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, loading: true } })
    expect(wrapper.find('.dss-table--loading').exists()).toBe(true)
  })

  it('passa loading ao QTable', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, loading: true } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('loading')).toBe(true)
  })

  // ─── Props: labels localizados ───────────────────────────────────────────

  it('usa noDataLabel em português por padrão', () => {
    const wrapper = mount(DssTable, { props: { rows: [], columns } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('noDataLabel')).toBe('Nenhum dado disponível')
  })

  it('usa noResultsLabel em português por padrão', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('noResultsLabel')).toBe('Nenhum resultado encontrado para o filtro aplicado')
  })

  it('aceita noDataLabel customizado', () => {
    const wrapper = mount(DssTable, { props: { rows: [], columns, noDataLabel: 'Vazio' } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('noDataLabel')).toBe('Vazio')
  })

  // ─── Props: bordered e flat ──────────────────────────────────────────────

  it('passa bordered ao QTable', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, bordered: true } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('bordered')).toBe(true)
  })

  it('passa flat ao QTable', () => {
    const wrapper = mount(DssTable, { props: { rows, columns, flat: true } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    expect(qTable.props('flat')).toBe(true)
  })

  // ─── Emits ───────────────────────────────────────────────────────────────

  it('emite update:modelValue ao selecionar linha', async () => {
    const wrapper = mount(DssTable, {
      props: { rows, columns, selection: 'multiple', modelValue: [] }
    })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    await qTable.vm.$emit('update:selected', [rows[0]])
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[rows[0]]])
  })

  it('emite request ao paginar em modo server-side', async () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    const reqPayload = { pagination: { page: 2, rowsPerPage: 10 } }
    await qTable.vm.$emit('request', reqPayload)
    expect(wrapper.emitted('request')).toBeTruthy()
  })

  it('emite row-click ao clicar em linha', async () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    const qTable = wrapper.findComponent({ name: 'QTable' })
    await qTable.vm.$emit('row-click', new MouseEvent('click'), rows[0], 0)
    expect(wrapper.emitted('row-click')).toBeTruthy()
  })

  // ─── Slots ───────────────────────────────────────────────────────────────

  it('projeta slot top-right corretamente', () => {
    const wrapper = mount(DssTable, {
      props: { rows, columns },
      slots: { 'top-right': '<button class="test-btn">Filtrar</button>' }
    })
    expect(wrapper.find('.test-btn').exists()).toBe(true)
  })

  it('projeta slot no-data corretamente', () => {
    const wrapper = mount(DssTable, {
      props: { rows: [], columns },
      slots: { 'no-data': '<span class="empty-msg">Sem dados</span>' }
    })
    expect(wrapper.find('.empty-msg').exists()).toBe(true)
  })

  // ─── defineExpose ─────────────────────────────────────────────────────────

  it('expõe método clearSelection via ref', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(typeof wrapper.vm.clearSelection).toBe('function')
  })

  it('expõe método sort via ref', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(typeof wrapper.vm.sort).toBe('function')
  })

  it('expõe método requestServerInteraction via ref', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(typeof wrapper.vm.requestServerInteraction).toBe('function')
  })

  it('expõe método resetVirtualScroll via ref', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(typeof wrapper.vm.resetVirtualScroll).toBe('function')
  })

  it('expõe método scrollTo via ref', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(typeof wrapper.vm.scrollTo).toBe('function')
  })

  // ─── Acessibilidade ───────────────────────────────────────────────────────

  it('renderiza table element semanticamente correto', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renderiza thead e tbody', () => {
    const wrapper = mount(DssTable, { props: { rows, columns } })
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
  })

  // =========================================================================
  // Slots dinâmicos (Onda P0/T5 — NC-A9-01)
  // O contrato Quasar de células personalizadas usa nomes dinâmicos
  // (body-cell-[name]); a lista fixa anterior os descartava silenciosamente.
  // =========================================================================
  describe('Slots dinâmicos body-cell-[name]', () => {
    it('repassa slot body-cell-[name] ao QTable (ações por linha)', () => {
      const wrapper = mount(DssTable, {
        props: { rows, columns },
        slots: {
          [`body-cell-${columns[0].name}`]:
            '<td class="celula-acoes"><button class="acao-editar">editar</button></td>'
        }
      })
      expect(wrapper.find('.acao-editar').exists()).toBe(true)
    })

    it('repassa slot header-cell-[name] ao QTable', () => {
      const wrapper = mount(DssTable, {
        props: { rows, columns },
        slots: {
          [`header-cell-${columns[0].name}`]:
            '<th class="header-custom">Coluna Custom</th>'
        }
      })
      expect(wrapper.find('.header-custom').exists()).toBe(true)
    })

    it('mantém slots nomeados estáticos funcionando (top)', () => {
      const wrapper = mount(DssTable, {
        props: { rows, columns },
        slots: {
          top: '<div class="topo-custom">Topo</div>'
        }
      })
      expect(wrapper.find('.topo-custom').exists()).toBe(true)
    })
  })

})
