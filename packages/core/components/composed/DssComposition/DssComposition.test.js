/**
 * DssComposition — Testes Unitários
 *
 * Cobre os quatro domínios do TEMPLATE_FASE3 (renderização, propagação,
 * lógica composta, ARIA) e, com prova por mutação, os riscos declarados na
 * migração (MIGRATION_JTECH_COMPOSITION.md):
 *   1 — a coleção participa do validate() do DssForm mestre
 *   2 — os campos do modal NÃO participam do mestre
 *   4 — o valor do consumidor nunca é mutado; toda mudança é array novo
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssComposition from './DssComposition.vue'
import DssForm from '../DssForm/DssForm.vue'
import DssDataTableClaudeCode from '../DssDataTableClaudeCode/DssDataTableClaudeCode.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssCompositionGroup from '../DssCompositionGroup/DssCompositionGroup.vue'

installQuasarPlugin()

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left' },
]
const linhas = () => [
  { id: 1, nome: 'Ana Souza', telefone: '1111-1111' },
  { id: 2, nome: 'Bruno Lima', telefone: '2222-2222' },
]

function factory(props = {}, slots = {}) {
  return mount(DssComposition, {
    props: { modelValue: linhas(), columns, rowKey: 'id', label: 'Contatos', ...props },
    slots,
    attachTo: document.body,
  })
}

/** Dispara uma ação como o DataTable dispara: o contrato entre as duas peças. */
function acionar(wrapper, action, rows = [], row) {
  wrapper.findComponent(DssDataTableClaudeCode).vm.$emit('action', { action, rows, row })
  return nextTick()
}

function botao(wrapper, rotulo) {
  return wrapper.findAllComponents({ name: 'DssButton' }).find((b) => b.props('label') === rotulo)
}

/** Formulário mestre real: DssForm + DssComposition + DssInput no modal. */
function mestre({ valor = [], required = true, campoDoModalObrigatorio = true } = {}) {
  return mount(
    {
      components: { DssForm, DssComposition, DssInput },
      template: `
        <DssForm ref="mestre">
          <DssComposition
            ref="colecao"
            v-model="valor"
            :columns="columns"
            row-key="id"
            label="Contatos"
            :required="required"
            :new-record="() => ({ id: 99, nome: '' })"
          >
            <template #form="{ record }">
              <DssInput v-model="record.nome" label="Nome" :rules="regrasDoModal" />
            </template>
          </DssComposition>
        </DssForm>
      `,
      data: () => ({
        valor,
        columns,
        required,
        regrasDoModal: campoDoModalObrigatorio ? [(v) => !!v || 'Informe o nome'] : [],
      }),
    },
    { attachTo: document.body },
  )
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('DssComposition', () => {
  // ─── Renderização ─────────────────────────────────────────────────────────

  it('monta como grupo rotulado e compõe o DssDataTableClaudeCode', () => {
    const wrapper = factory()
    const raiz = wrapper.find('.dss-composition')
    expect(raiz.attributes('role')).toBe('group')
    expect(raiz.attributes('aria-label')).toBe('Contatos')
    const tabela = wrapper.findComponent(DssDataTableClaudeCode)
    expect(tabela.props('rows')).toHaveLength(2)
    expect(tabela.props('title')).toBe('Contatos')
    expect(tabela.props('rowKey')).toBe('id')
  })

  it('dentro do grupo, é o tabpanel da própria aba e fica montada mesmo inativa', async () => {
    const wrapper = mount(
      {
        components: { DssCompositionGroup, DssComposition },
        template: `
          <DssCompositionGroup>
            <DssComposition name="a" label="A" :model-value="[]" :columns="columns" row-key="id" />
            <DssComposition name="b" label="B" :model-value="[]" :columns="columns" row-key="id" />
          </DssCompositionGroup>
        `,
        data: () => ({ columns }),
      },
      { attachTo: document.body },
    )
    await nextTick()
    const [a, b] = wrapper.findAll('.dss-composition')
    expect(a.attributes('role')).toBe('tabpanel')
    expect(a.attributes('aria-label')).toBeUndefined()
    const abaA = wrapper.findAll('[role="tab"]')[0]
    expect(a.attributes('aria-labelledby')).toBe(abaA.attributes('id'))
    // Inativa: escondida, mas MONTADA (no DOM) — senão sairia do DssForm.
    expect(b.exists()).toBe(true)
    expect(b.element.style.display).toBe('none')
  })

  it('oferece Incluir na barra e Editar/Excluir nas linhas por padrão', () => {
    const tabela = factory().findComponent(DssDataTableClaudeCode)
    expect(tabela.props('actions').map((a) => a.intent)).toEqual(['add'])
    expect(tabela.props('rowActions').map((a) => a.intent)).toEqual(['edit', 'remove'])
  })

  // ─── Propagação ───────────────────────────────────────────────────────────

  it('repassa loading, error, disabled e brand à tabela', () => {
    const tabela = factory({ loading: true, error: 'Falhou', disabled: true, brand: 'water' })
      .findComponent(DssDataTableClaudeCode)
    expect(tabela.props('loading')).toBe(true)
    expect(tabela.props('error')).toBe('Falhou')
    expect(tabela.props('disabled')).toBe(true)
    expect(tabela.props('brand')).toBe('water')
  })

  it('marca a raiz com data-brand', () => {
    expect(factory({ brand: 'waste' }).find('.dss-composition').attributes('data-brand')).toBe('waste')
  })

  it('somente leitura não oferece nenhuma ação', () => {
    const tabela = factory({ readonly: true }).findComponent(DssDataTableClaudeCode)
    expect(tabela.props('actions')).toEqual([])
    expect(tabela.props('rowActions')).toEqual([])
  })

  it('repassa rowActions em forma de função (decisão D)', () => {
    const decidir = (row) => (row.id === 1 ? [{ name: 'x', label: 'X' }] : [])
    expect(factory({ rowActions: decidir }).findComponent(DssDataTableClaudeCode).props('rowActions')).toBe(decidir)
  })

  // ─── Risco 1 — participa do DssForm mestre ────────────────────────────────

  it('coleção obrigatória vazia reprova o validate() do DssForm mestre', async () => {
    const wrapper = mestre({ valor: [] })
    await nextTick()
    expect(await wrapper.vm.$refs.mestre.validate()).toBe(false)
  })

  it('coleção obrigatória com um registro aprova o mestre', async () => {
    const wrapper = mestre({ valor: [{ id: 1, nome: 'Ana' }] })
    await nextTick()
    expect(await wrapper.vm.$refs.mestre.validate()).toBe(true)
  })

  // ─── Risco 2 — o modal não vaza para o mestre ─────────────────────────────

  it('campo obrigatório vazio no modal aberto NÃO reprova o mestre', async () => {
    const wrapper = mestre({ valor: [{ id: 1, nome: 'Ana' }] })
    await nextTick()
    await acionar(wrapper.findComponent(DssComposition), { name: 'add', label: 'Incluir', intent: 'add' })
    await flushPromises()
    // O modal está aberto, com o DssInput obrigatório vazio dentro dele.
    expect(wrapper.findComponent(DssInput).exists()).toBe(true)
    expect(await wrapper.vm.$refs.mestre.validate()).toBe(true)
  })

  it('o formulário do modal valida os PRÓPRIOS campos antes de salvar', async () => {
    const wrapper = mestre({ valor: [] })
    const colecao = wrapper.findComponent(DssComposition)
    await acionar(colecao, { name: 'add', label: 'Incluir', intent: 'add' })
    await botao(wrapper, 'Salvar').trigger('click')
    await flushPromises()
    // Nome vazio: o DssForm do modal reprova e nada é incluído.
    expect(colecao.emitted('update:modelValue')).toBeUndefined()
  })

  // ─── Lógica composta — incluir, editar, remover ───────────────────────────

  it('incluir abre o modal com newRecord e emite um array NOVO ao salvar', async () => {
    const valor = linhas()
    const wrapper = mestre({ valor, required: false, campoDoModalObrigatorio: false })
    const colecao = wrapper.findComponent(DssComposition)
    await acionar(colecao, { name: 'add', label: 'Incluir', intent: 'add' })
    await wrapper.findComponent(DssInput).setValue('Carla Dias')
    await botao(wrapper, 'Salvar').trigger('click')
    await flushPromises()

    const [emitido] = colecao.emitted('update:modelValue').at(-1)
    expect(emitido).toHaveLength(3)
    expect(emitido.at(-1)).toEqual({ id: 99, nome: 'Carla Dias' })
    expect(emitido).not.toBe(valor)
    expect(valor).toHaveLength(2)
  })

  it('editar trabalha num rascunho e substitui a linha pela chave ao salvar', async () => {
    const valor = linhas()
    const original = valor[1]
    const wrapper = mestre({ valor, required: false, campoDoModalObrigatorio: false })
    const colecao = wrapper.findComponent(DssComposition)
    await acionar(colecao, { name: 'edit', label: 'Editar', intent: 'edit' }, [original], original)
    await wrapper.findComponent(DssInput).setValue('Bruno L.')
    expect(original.nome).toBe('Bruno Lima') // o rascunho não toca o registro
    await botao(wrapper, 'Salvar').trigger('click')
    await flushPromises()

    const [emitido] = colecao.emitted('update:modelValue').at(-1)
    expect(emitido.map((l) => l.nome)).toEqual(['Ana Souza', 'Bruno L.'])
    expect(original.nome).toBe('Bruno Lima')
  })

  it('excluir pede confirmação e só emite depois do "sim"', async () => {
    const wrapper = factory()
    const alvo = wrapper.props('modelValue')[0]
    await acionar(wrapper, { name: 'remove', label: 'Excluir', intent: 'remove' }, [alvo], alvo)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(document.body.textContent).toContain('Excluir registro')

    // O botão de confirmação leva o rótulo da ação.
    const confirmar = wrapper.findAllComponents({ name: 'DssButton' })
      .filter((b) => b.props('label') === 'Excluir').at(-1)
    await confirmar.trigger('click')
    const [emitido] = wrapper.emitted('update:modelValue').at(-1)
    expect(emitido.map((l) => l.id)).toEqual([2])
  })

  it('cancelar a confirmação não emite nada', async () => {
    const wrapper = factory()
    const alvo = wrapper.props('modelValue')[0]
    await acionar(wrapper, { name: 'remove', label: 'Excluir', intent: 'remove' }, [alvo], alvo)
    await botao(wrapper, 'Cancelar').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('confirm: false executa sem perguntar', async () => {
    const wrapper = factory()
    const alvo = wrapper.props('modelValue')[0]
    await acionar(wrapper, { name: 'remove', label: 'Excluir', intent: 'remove', confirm: false }, [alvo], alvo)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })

  it('inativar confirma e entrega a INTENÇÃO, sem mudar o valor (decisão C)', async () => {
    const wrapper = factory()
    const alvo = wrapper.props('modelValue')[1]
    const acao = { name: 'inactivate', label: 'Inativar', intent: 'inactivate' }
    await acionar(wrapper, acao, [alvo], alvo)
    expect(wrapper.emitted('inactivate')).toBeUndefined()
    const confirmar = wrapper.findAllComponents({ name: 'DssButton' })
      .filter((b) => b.props('label') === 'Inativar').at(-1)
    await confirmar.trigger('click')
    expect(wrapper.emitted('inactivate')[0][0]).toMatchObject({ action: acao, row: alvo })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('detalhar e ação sem intent entregam o dado ao consumidor', async () => {
    const wrapper = factory()
    const alvo = wrapper.props('modelValue')[0]
    await acionar(wrapper, { name: 'detail', label: 'Detalhar', intent: 'detail' }, [alvo], alvo)
    await acionar(wrapper, { name: 'exportar', label: 'Exportar' }, [alvo])
    expect(wrapper.emitted('detail')[0][0].row).toBe(alvo)
    expect(wrapper.emitted('action')[0][0].action.name).toBe('exportar')
  })

  it('avisa em DEV quando o registro incluído não traz a chave', async () => {
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = factory({ newRecord: () => ({ nome: '' }) }, {
      form: '<span class="campo" />',
    })
    await acionar(wrapper, { name: 'add', label: 'Incluir', intent: 'add' })
    await botao(wrapper, 'Salvar').trigger('click')
    await flushPromises()
    expect(aviso.mock.calls.flat().join(' ')).toContain('sem a chave "id"')
  })

  // ─── ARIA e estado inválido ───────────────────────────────────────────────

  it('inválida: aria-invalid na raiz e descrição apontando a mensagem', async () => {
    const wrapper = factory({ modelValue: [], required: true })
    expect(await wrapper.vm.validate()).toBe(false)
    await nextTick()
    const raiz = wrapper.find('.dss-composition')
    expect(raiz.attributes('aria-invalid')).toBe('true')
    const idDoErro = raiz.attributes('aria-describedby')
    const banner = wrapper.find(`#${idDoErro}`)
    expect(banner.exists()).toBe(true)
    expect(banner.text()).toContain('Inclua ao menos um registro.')
  })

  it('não nasce pintada de erro antes de validar', () => {
    const raiz = factory({ modelValue: [], required: true }).find('.dss-composition')
    expect(raiz.attributes('aria-invalid')).toBeUndefined()
  })

  it('desabilitada ou somente leitura não valida (paridade QField)', async () => {
    expect(await factory({ modelValue: [], required: true, disabled: true }).vm.validate()).toBe(true)
    expect(await factory({ modelValue: [], required: true, readonly: true }).vm.validate()).toBe(true)
  })
})
