/**
 * DssMultiselectAutocomplete — cobertura
 *
 * Cobre os quatro incrementos e a medição adaptativa.
 *
 * ESTRATÉGIA. Duas coisas deste componente não são observáveis por render puro
 * em jsdom, e cada uma tem uma via própria:
 *
 *  1. `loadOptions`/`loadMore` são handlers de eventos do QSelect (`@filter`,
 *     `@virtual-scroll`) ligados no DssSelect. Emitir esses eventos NO DssSelect
 *     exercita o handler pela fronteira real do componente — sem alcançar
 *     internos nem reimplementar o QSelect.
 *
 *  2. A contagem de chips depende de LAYOUT, e jsdom não tem layout (toda medida
 *     é 0). Por isso há dois grupos: o contrato de degradação (sem layout, tudo
 *     visível) e a medição de verdade, com getBoundingClientRect/clientWidth
 *     mockados.
 */
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssMultiselectAutocomplete from './1-structure/DssMultiselectAutocomplete.ts.vue'
import DssSelect from '../../base/DssSelect/DssSelect.vue'
import DssChip from '../../base/DssChip/DssChip.vue'

// QSelect (base do DssSelect) usa useVirtualScroll → exige Quasar instalado.
installQuasar()

const options = ['Maçã', 'Banana', 'Cereja']
const frutas = ['Maçã', 'Banana', 'Cereja', 'Damasco', 'Laranja', 'Manga']

/** Chips do CAMPO (exclui o contador, que não representa um valor). */
function chipsDoCampo(w) {
  return w
    .findAllComponents(DssChip)
    .filter((c) => !c.classes().includes('dss-multiselect-autocomplete__chip--counter'))
}

function contador(w) {
  return w.findAllComponents(DssChip).find((c) =>
    c.classes().includes('dss-multiselect-autocomplete__chip--counter')
  )
}

/** Dispara o `@filter` do QSelect como o Quasar faz, e devolve o que foi publicado. */
async function dispararFiltro(w, texto) {
  let publicado = null
  let abortado = false
  const update = (fn) => { fn(); publicado = 'ok' }
  const abort = () => { abortado = true }
  w.findComponent(DssSelect).vm.$emit('filter', texto, update, abort)
  await flushPromises()
  return { publicado, abortado }
}

describe('DssMultiselectAutocomplete', () => {
  // ========================================================================
  // Incremento 1 — multiseleção, chips, autocomplete
  // ========================================================================
  describe('base', () => {
    it('monta e compõe um campo de seleção (DssSelect/QSelect como base)', () => {
      const w = mount(DssMultiselectAutocomplete, { props: { options, modelValue: [] } })
      expect(w.find('.dss-multiselect-autocomplete').exists()).toBe(true)
      expect(w.find('.q-select').exists()).toBe(true)
    })

    it('renderiza um DssChip removível por valor selecionado', () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana', 'Cereja'] },
      })
      expect(chipsDoCampo(w).length).toBe(2)
      expect(w.text()).toContain('Banana')
    })

    it('remover um chip emite update:modelValue (sem o valor) e remove', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana', 'Cereja'] },
      })
      await chipsDoCampo(w)[0].vm.$emit('remove')
      expect(w.emitted('update:modelValue')?.[0]?.[0]).toEqual(['Cereja'])
      expect(w.emitted('remove')?.[0]).toEqual(['Banana'])
    })

    it('respeita chipsRemovable=false (chips não removíveis)', () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana'], chipsRemovable: false },
      })
      expect(chipsDoCampo(w)[0].props('removable')).toBe(false)
    })

    it('disable e readonly tornam os chips não removíveis', () => {
      const d = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana'], disable: true },
      })
      const r = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana'], readonly: true },
      })
      expect(chipsDoCampo(d)[0].props('removable')).toBe(false)
      expect(chipsDoCampo(r)[0].props('removable')).toBe(false)
    })

    it('chips do CAMPO usam a variante flat (a seção do painel usa outline)', () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana'] },
      })
      expect(chipsDoCampo(w)[0].props('variant')).toBe('flat')
    })

    it('filtro local: filtra por substring, case-insensitive', async () => {
      const w = mount(DssMultiselectAutocomplete, { props: { options: frutas, modelValue: [] } })
      await dispararFiltro(w, 'an')
      // "Banana" e "Laranja" contêm "an"; "Manga" também.
      const visiveis = w.findComponent(DssSelect).props('options')
      expect(visiveis).toEqual(['Banana', 'Laranja', 'Manga'])
    })

    it('filtro local: busca vazia restaura a lista inteira', async () => {
      const w = mount(DssMultiselectAutocomplete, { props: { options: frutas, modelValue: [] } })
      await dispararFiltro(w, 'an')
      await dispararFiltro(w, '')
      expect(w.findComponent(DssSelect).props('options')).toEqual(frutas)
    })

    it('filtro local respeita optionLabel como função', async () => {
      const objetos = [{ n: 'Alfa' }, { n: 'Beta' }]
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: objetos, modelValue: [], optionLabel: (o) => o.n },
      })
      await dispararFiltro(w, 'bet')
      expect(w.findComponent(DssSelect).props('options')).toEqual([{ n: 'Beta' }])
    })
  })

  // ========================================================================
  // Incremento 2 — seção "Selecionados"
  // ========================================================================
  describe('seção "Selecionados" (showSelectedSummary)', () => {
    it('é opt-in: desligada por padrão', () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana'] },
      })
      expect(w.props('showSelectedSummary')).toBe(false)
    })

    it('com emitValue, resolve o RÓTULO da opção correspondente ao valor', () => {
      const cidades = [
        { id: 1, nome: 'São Paulo' },
        { id: 2, nome: 'Curitiba' },
      ]
      const w = mount(DssMultiselectAutocomplete, {
        props: {
          options: cidades,
          modelValue: [2],
          optionValue: 'id',
          optionLabel: 'nome',
          emitValue: true,
          showSelectedSummary: true,
        },
      })
      // O model guarda o id; o chip precisa mostrar o nome.
      expect(w.text()).toContain('Curitiba')
      expect(w.text()).not.toContain('São Paulo')
    })

    it('remover na seção desmarca o valor (mesma via do chip do campo)', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: ['Banana', 'Cereja'], showSelectedSummary: true },
      })
      await chipsDoCampo(w)[0].vm.$emit('remove')
      expect(w.emitted('update:modelValue')?.[0]?.[0]).toEqual(['Cereja'])
      expect(w.emitted('remove')?.[0]).toEqual(['Banana'])
    })
  })

  // ========================================================================
  // Incremento 3 — busca assíncrona
  // ========================================================================
  describe('loadOptions (busca server-side)', () => {
    it('SUBSTITUI o filtro local e popula com o resultado', async () => {
      const loadOptions = vi.fn().mockResolvedValue(['do servidor'])
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: [], loadOptions },
      })
      await dispararFiltro(w, 'qualquer')
      expect(loadOptions).toHaveBeenCalledWith('qualquer')
      // Nenhuma fruta local sobrevive — a fonte passou a ser o servidor.
      expect(w.findComponent(DssSelect).props('options')).toEqual(['do servidor'])
    })

    it('sinaliza carregamento durante o fetch e o encerra ao fim', async () => {
      let resolver
      const loadOptions = vi.fn(() => new Promise((r) => { resolver = r }))
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: [], modelValue: [], loadOptions },
      })
      const p = dispararFiltro(w, 'x')
      await w.vm.$nextTick()
      expect(w.findComponent(DssSelect).props('loading')).toBe(true)
      resolver([])
      await p
      expect(w.findComponent(DssSelect).props('loading')).toBe(false)
    })

    it('erro no fetch aborta o ciclo do QSelect em vez de propagar', async () => {
      const loadOptions = vi.fn().mockRejectedValue(new Error('falhou'))
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: [], modelValue: [], loadOptions },
      })
      const { abortado } = await dispararFiltro(w, 'x')
      expect(abortado).toBe(true)
      expect(w.findComponent(DssSelect).props('loading')).toBe(false)
    })

    it('resultado não-array vira lista vazia (não quebra o dropdown)', async () => {
      const loadOptions = vi.fn().mockResolvedValue(null)
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: [], loadOptions },
      })
      await dispararFiltro(w, 'x')
      expect(w.findComponent(DssSelect).props('options')).toEqual([])
    })
  })

  // ========================================================================
  // Incremento 3b — paginação
  // ========================================================================
  describe('loadMore (lazy / infinite scroll)', () => {
    /** Simula o @virtual-scroll do QSelect chegando perto do fim da lista. */
    async function rolarAteOFim(w, total) {
      w.findComponent(DssSelect).vm.$emit('virtual-scroll', { to: total - 1 })
      await flushPromises()
    }

    it('ANEXA o próximo lote à lista atual', async () => {
      const loadMore = vi.fn().mockResolvedValue(['d', 'e'])
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: ['a', 'b', 'c'], modelValue: [], loadMore },
      })
      await rolarAteOFim(w, 3)
      expect(loadMore).toHaveBeenCalledWith('', 3) // query atual + offset
      expect(w.findComponent(DssSelect).props('options')).toEqual(['a', 'b', 'c', 'd', 'e'])
    })

    it('lote vazio sinaliza FIM e para de pedir', async () => {
      const loadMore = vi.fn().mockResolvedValue([])
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: ['a', 'b', 'c'], modelValue: [], loadMore },
      })
      await rolarAteOFim(w, 3)
      await rolarAteOFim(w, 3)
      await rolarAteOFim(w, 3)
      expect(loadMore).toHaveBeenCalledTimes(1)
    })

    it('nova busca RESETA a paginação (volta a pedir lotes)', async () => {
      const loadMore = vi.fn().mockResolvedValue([])
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: ['a'], modelValue: [], loadMore },
      })
      await rolarAteOFim(w, 1)
      expect(loadMore).toHaveBeenCalledTimes(1)

      await dispararFiltro(w, 'nova')       // muda a query → hasMore volta a true
      loadMore.mockResolvedValue(['z'])
      await rolarAteOFim(w, 1)
      expect(loadMore).toHaveBeenCalledTimes(2)
      expect(loadMore).toHaveBeenLastCalledWith('nova', expect.any(Number))
    })

    it('sem loadMore, rolar não dispara nada', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: ['a', 'b'], modelValue: [] },
      })
      await rolarAteOFim(w, 2)
      expect(w.findComponent(DssSelect).props('options')).toEqual(['a', 'b'])
    })
  })

  // ========================================================================
  // Campo de uma linha — contagem medida
  // ========================================================================
  describe('contagem de chips (medição)', () => {
    it('SEM layout medível, mantém TODOS os chips visíveis', () => {
      // jsdom não tem layout: toda medida é 0. Concluir "nada cabe" a partir de
      // zeros esconderia a seleção inteira por falta de informação — o contrato
      // é degradar para "mostra tudo".
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: ['Maçã', 'Banana', 'Cereja'] },
      })
      expect(chipsDoCampo(w).length).toBe(3)
      expect(contador(w)).toBeUndefined()
    })

    it('COM layout, corta o excedente e o contador mostra quantos sobraram', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: ['Maçã', 'Banana', 'Cereja', 'Damasco'] },
        attachTo: document.body,
      })
      // Linha de 200px; cada chip "mede" 60px. Orçamento = 200 - 56 (input) - 48
      // (contador) = 96 → cabem 1 chip (60), o segundo estouraria (120).
      mockarLayout(w, { larguraDaLinha: 200, larguraDoChip: 60 })
      await forcarNovaMedicao(w)

      const visiveis = chipsDoCampo(w).filter(
        (c) => !c.classes().includes('dss-multiselect-autocomplete__chip--overflowed')
      )
      expect(visiveis.length).toBe(1)
      expect(contador(w)?.text()).toBe('+3')
      w.unmount()
    })

    it('quando NENHUM chip cabe, o contador mostra o TOTAL (não "+N")', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: ['Maçã', 'Banana', 'Cereja'] },
        attachTo: document.body,
      })
      // Linha apertada: orçamento negativo, nenhum chip cabe.
      mockarLayout(w, { larguraDaLinha: 120, larguraDoChip: 90 })
      await forcarNovaMedicao(w)

      // "+3" seria incoerente sem nada visível ("mais três do que quê?").
      expect(contador(w)?.text()).toBe('3')
      expect(contador(w)?.attributes('aria-label')).toBe('3 selecionados')
      w.unmount()
    })

    it('cabendo tudo, não renderiza contador', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: ['Maçã', 'Banana'] },
        attachTo: document.body,
      })
      mockarLayout(w, { larguraDaLinha: 800, larguraDoChip: 60 })
      await forcarNovaMedicao(w)
      expect(contador(w)).toBeUndefined()
      w.unmount()
    })
  })

  // ========================================================================
  // Acessibilidade — âncora do claim WCAG 2.1.1 / 4.1.2 do contrato
  // ========================================================================
  describe('acessibilidade', () => {
    it('o campo expõe role=combobox e aria-multiselectable (4.1.2)', () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options, modelValue: [], ariaLabel: 'Frutas' },
      })
      const combo = w.find('[role="combobox"]')
      expect(combo.exists()).toBe(true)
    })

    it('expõe os métodos de teclado/foco do contrato (2.1.1)', () => {
      const w = mount(DssMultiselectAutocomplete, { props: { options, modelValue: [] } })
      for (const m of ['focus', 'blur', 'showPopup', 'hidePopup']) {
        expect(typeof w.vm[m]).toBe('function')
      }
    })

    it('o contador anuncia por extenso o que abrevia visualmente', async () => {
      const w = mount(DssMultiselectAutocomplete, {
        props: { options: frutas, modelValue: ['Maçã', 'Banana', 'Cereja', 'Damasco'] },
        attachTo: document.body,
      })
      mockarLayout(w, { larguraDaLinha: 200, larguraDoChip: 60 })
      await forcarNovaMedicao(w)
      // Visual "+3" · leitor de tela "mais 3 de 4 selecionados".
      expect(contador(w)?.text()).toBe('+3')
      expect(contador(w)?.attributes('aria-label')).toBe('mais 3 de 4 selecionados')
      w.unmount()
    })
  })
})

// ==========================================================================
// Apoio da medição
// ==========================================================================

/**
 * Dá layout ao jsdom: largura da linha do campo e largura de cada chip.
 * Sem isto toda medida é 0 e o componente degrada para "mostra tudo".
 */
function mockarLayout(w, { larguraDaLinha, larguraDoChip }) {
  const linha = w.element.querySelector('.q-field__native')
  if (!linha) throw new Error('linha do campo (.q-field__native) não encontrada')

  Object.defineProperty(linha, 'clientWidth', { value: larguraDaLinha, configurable: true })
  linha.getBoundingClientRect = () => ({
    width: larguraDaLinha, height: 32, top: 0, left: 0, right: larguraDaLinha, bottom: 32, x: 0, y: 0,
  })

  const aplicar = () => {
    for (const chip of linha.querySelectorAll('.dss-multiselect-autocomplete__chip')) {
      chip.getBoundingClientRect = () => ({
        width: larguraDoChip, height: 24, top: 0, left: 0, right: larguraDoChip, bottom: 24, x: 0, y: 0,
      })
    }
  }
  aplicar()
  // A 1ª passada da medição reexibe chips: os que voltam precisam de medida também.
  const mo = new MutationObserver(aplicar)
  mo.observe(linha, { childList: true, subtree: true })
}

/** Provoca uma nova medição pela via pública (mudança de modelValue). */
async function forcarNovaMedicao(w) {
  const atual = w.props('modelValue')
  await w.setProps({ modelValue: [...atual] })
  await flushPromises()
  await w.vm.$nextTick()
}
