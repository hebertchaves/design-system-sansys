/**
 * DssCompositionGroup — Testes Unitários
 *
 * Cobre os quatro domínios do TEMPLATE_FASE3 e, com prova por mutação, o
 * risco 5 da migração: a coleção de uma aba NUNCA ABERTA continua no DssForm
 * mestre (todas montadas, a inativa por v-show — não DssTabPanels).
 */
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssCompositionGroup from './DssCompositionGroup.vue'
import DssComposition from '../DssComposition/DssComposition.vue'
import DssForm from '../DssForm/DssForm.vue'

installQuasarPlugin()

const columns = [{ name: 'nome', label: 'Nome', field: 'nome', align: 'left' }]

function cadastro({ contatos = [{ id: 1, nome: 'Ana' }], enderecos = [], modelValue } = {}) {
  return mount(
    {
      components: { DssForm, DssCompositionGroup, DssComposition },
      template: `
        <DssForm ref="mestre">
          <DssCompositionGroup v-model="aba" brand="hub">
            <DssComposition name="contatos" label="Contatos" v-model="contatos"
                            :columns="columns" row-key="id" />
            <DssComposition name="enderecos" label="Endereços" v-model="enderecos"
                            :columns="columns" row-key="id" required />
          </DssCompositionGroup>
        </DssForm>
      `,
      data: () => ({ aba: modelValue ?? null, contatos, enderecos, columns }),
    },
    { attachTo: document.body },
  )
}

const abas = (wrapper) => wrapper.findAll('[role="tab"]')
const paineis = (wrapper) => wrapper.findAll('[role="tabpanel"]')

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DssCompositionGroup', () => {
  // ─── Renderização ─────────────────────────────────────────────────────────

  it('cria uma aba por coleção, na ordem do slot, com contagem e marca de obrigatória', async () => {
    const wrapper = cadastro({ contatos: [{ id: 1, nome: 'Ana' }, { id: 2, nome: 'Bia' }] })
    await nextTick()
    const rotulos = wrapper.findAllComponents({ name: 'DssTab' }).map((t) => t.props('label'))
    expect(rotulos).toEqual(['Contatos (2)', 'Endereços * (0)'])
  })

  it('abre a primeira aba quando nenhuma é escolhida', async () => {
    const wrapper = cadastro()
    await nextTick()
    const [contatos, enderecos] = paineis(wrapper)
    expect(contatos.isVisible()).toBe(true)
    expect(enderecos.element.style.display).toBe('none')
  })

  it('respeita a aba escolhida por v-model', async () => {
    const wrapper = cadastro({ modelValue: 'enderecos' })
    await nextTick()
    expect(paineis(wrapper)[0].element.style.display).toBe('none')
    expect(paineis(wrapper)[1].element.style.display).toBe('')
  })

  // ─── Propagação ───────────────────────────────────────────────────────────

  it('marca a raiz com data-brand e repassa a marca às abas', async () => {
    const wrapper = cadastro()
    await nextTick()
    expect(wrapper.find('.dss-composition-group').attributes('data-brand')).toBe('hub')
    expect(wrapper.findComponent({ name: 'DssTabs' }).props('brand')).toBe('hub')
  })

  // ─── Risco 5 — aba nunca aberta continua no formulário ────────────────────

  it('coleção obrigatória vazia numa aba NUNCA ABERTA reprova o mestre', async () => {
    const wrapper = cadastro({ enderecos: [] })
    await nextTick()
    // A aba ativa é "Contatos"; "Endereços" nunca foi aberta. Só a validação
    // é afirmada aqui — a visibilidade dos painéis tem teste próprio.
    expect(await wrapper.vm.$refs.mestre.validate()).toBe(false)
  })

  it('com a coleção obrigatória preenchida, o mestre aprova', async () => {
    const wrapper = cadastro({ enderecos: [{ id: 7, nome: 'Rua A' }] })
    await nextTick()
    expect(await wrapper.vm.$refs.mestre.validate()).toBe(true)
  })

  // ─── Estado inválido e ARIA ───────────────────────────────────────────────

  it('a aba da coleção inválida recebe alert e "com erro" no nome acessível', async () => {
    const wrapper = cadastro({ enderecos: [] })
    await nextTick()
    await wrapper.vm.$refs.mestre.validate()
    await nextTick()
    const tab = wrapper.findAllComponents({ name: 'DssTab' })[1]
    expect(tab.props('alert')).toBe('negative')
    expect(abas(wrapper)[1].attributes('aria-label')).toBe('Endereços, 0 registros, obrigatória, com erro')
  })

  it('o nome acessível começa pelo rótulo visível e diz a contagem por extenso', async () => {
    const wrapper = cadastro()
    await nextTick()
    expect(abas(wrapper)[0].attributes('aria-label')).toBe('Contatos, 1 registro')
  })

  it('aba e painel apontam um para o outro', async () => {
    const wrapper = cadastro()
    await nextTick()
    abas(wrapper).forEach((aba, i) => {
      const painel = paineis(wrapper)[i]
      expect(aba.attributes('aria-controls')).toBe(painel.attributes('id'))
      expect(painel.attributes('aria-labelledby')).toBe(aba.attributes('id'))
    })
  })

  it('a contagem acompanha o v-model de cada coleção', async () => {
    const wrapper = cadastro()
    await nextTick()
    wrapper.vm.contatos = [...wrapper.vm.contatos, { id: 2, nome: 'Bia' }]
    await nextTick()
    expect(wrapper.findAllComponents({ name: 'DssTab' })[0].props('label')).toBe('Contatos (2)')
  })

  it('troca de aba emite update:modelValue', async () => {
    const mudancas = []
    const wrapper = mount(DssCompositionGroup, {
      props: { 'onUpdate:modelValue': (v) => mudancas.push(v) },
      slots: { default: '<span />' },
    })
    wrapper.findComponent({ name: 'DssTabs' }).vm.$emit('update:modelValue', 'enderecos')
    expect(mudancas).toEqual(['enderecos'])
  })
})
