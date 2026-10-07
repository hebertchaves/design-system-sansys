/**
 * DssContextHeader — Testes Unitários
 *
 * Cobre o que decide se o componente serve à tela de atendimento:
 * o badge de dois estados, a lista servida (e incompleta), a retração
 * coordenada, os nomes acessíveis e a fronteira declarada.
 *
 * Golden Reference: DssChip
 * Golden Context: DssPageShell
 */
import { describe, it, expect } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import DssContextHeader from './DssContextHeader.vue'
import { useContextHeader } from './composables'

const GRUPOS = [
  {
    name: 'pessoas',
    label: 'Pessoas',
    span: 2,
    items: [
      { name: 'proprietario', label: 'Proprietário', value: 'Fulano', action: { icon: 'badge', label: 'Visualizar cliente' } },
      { name: 'morador', label: 'Morador', value: 'Beltrano' },
      { name: 'endereco', label: 'Endereço', value: 'Rua X, 1' },
    ],
  },
  {
    name: 'situacao',
    items: [
      { name: 'agua', label: 'Ligação água', value: 'Ativa', tone: 'positive' },
      { name: 'esgoto', label: 'Ligação esgoto', value: 'Inativa', tone: 'negative' },
    ],
  },
]

// ==========================================================================
// 1. O arranjo
// ==========================================================================

describe('DssContextHeader — arranjo', () => {
  it('renderiza as três colunas', () => {
    const w = mount(DssContextHeader, { props: { identifier: '1-9', groups: GRUPOS } })
    expect(w.find('.dss-context-header__identity').exists()).toBe(true)
    expect(w.find('.dss-context-header__groups').exists()).toBe(true)
    expect(w.find('.dss-context-header__rail').exists()).toBe(true)
  })

  it('cada grupo vira um <dl> e cada informação um par dt/dd', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const listas = w.findAll('.dss-context-header__group')
    expect(listas).toHaveLength(2)
    expect(listas[0].element.tagName).toBe('DL')
    expect(w.findAll('dt')).toHaveLength(5)
    expect(w.findAll('dd')).toHaveLength(5)
  })

  it('o span do grupo vira flex-grow — é o que dá mais largura ao endereço', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const grupos = w.findAll('.dss-context-header__group')
    expect(grupos[0].attributes('style')).toContain('flex-grow: 2')
    expect(grupos[1].attributes('style')).toContain('flex-grow: 1')
  })

  it('a região tem nome — sem ele é mais um "grupo" no leitor de tela', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    expect(w.attributes('aria-label')).toBe('Contexto do atendimento')
  })
})

// ==========================================================================
// 2. O badge de dois estados
// ==========================================================================

describe('DssContextHeader — badge de registros', () => {
  it('sem registros o badge é o add_circle, não um contador', () => {
    const w = mount(DssContextHeader, { props: { recordsCount: 0 } })
    expect(w.find('.dss-context-header__records-badge--add').exists()).toBe(true)
    expect(w.find('.dss-badge').exists()).toBe(false)
  })

  it('com registros o badge vira contador', () => {
    const w = mount(DssContextHeader, { props: { recordsCount: 3 } })
    expect(w.find('.dss-context-header__records-badge--add').exists()).toBe(false)
    expect(w.find('.dss-context-header__records-badge').text()).toBe('3')
  })

  it('o ÍCONE não muda entre os dois estados — o destino do clique é o mesmo', () => {
    // O nome do glifo é ATRIBUTO do q-icon, não texto: no ambiente de unidade o
    // Quasar não está registrado, então `.text()` devolve string vazia. Medido —
    // a primeira versão deste teste afirmava `.text()` e reprovava por isso.
    const nomeDoIcone = (w) =>
      w.find('.dss-context-header__records-icon').element.querySelector('q-icon')?.getAttribute('name')

    const vazio = mount(DssContextHeader, { props: { recordsCount: 0 } })
    const cheio = mount(DssContextHeader, { props: { recordsCount: 5 } })
    expect(nomeDoIcone(vazio)).toBe('domain')
    expect(nomeDoIcone(cheio)).toBe('domain')
  })

  it('a contagem está no NOME do botão — o badge é aria-hidden', () => {
    const w = mount(DssContextHeader, { props: { recordsCount: 4 } })
    expect(w.find('.dss-context-header__records').attributes('aria-label')).toBe(
      'Ver 4 informações do imóvel',
    )
    expect(w.find('.dss-context-header__records-badge').attributes('aria-hidden')).toBe('true')
  })

  it('sem registros o nome do botão anuncia CADASTRAR, não "ver"', () => {
    const w = mount(DssContextHeader, { props: { recordsCount: 0 } })
    expect(w.find('.dss-context-header__records').attributes('aria-label')).toBe(
      'Adicionar informações do imóvel',
    )
  })

  it('o badge é IRMÃO do botão — <div role=status> dentro de <button> é inválido', () => {
    const w = mount(DssContextHeader, { props: { recordsCount: 2 } })
    expect(w.find('.dss-context-header__records .dss-badge').exists()).toBe(false)
    expect(w.find('.dss-context-header__records-badge').exists()).toBe(true)
  })
})

// ==========================================================================
// 3. A lista servida — e incompleta
// ==========================================================================

describe('DssContextHeader — informações', () => {
  it('o tom vai para data-tone, não para uma classe de cor', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const valores = w.findAll('.dss-context-header__value')
    expect(valores[0].attributes('data-tone')).toBe('neutral')
    expect(valores[3].attributes('data-tone')).toBe('positive')
    expect(valores[4].attributes('data-tone')).toBe('negative')
  })

  it('a ação de linha só existe quando declarada, e exige nome', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const acoes = w.findAll('.dss-context-header__item-action')
    expect(acoes).toHaveLength(1)
    expect(acoes[0].attributes('aria-label')).toBe('Visualizar cliente')
  })

  it('a ação emite item-action com o name da informação', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    await w.find('.dss-context-header__item-action').trigger('click')
    expect(w.emitted('item-action')).toEqual([['proprietario']])
  })

  it('o valor inteiro fica no title — truncar sem isso apaga informação', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    expect(w.find('.dss-context-header__value-text').attributes('title')).toBe('Fulano')
  })

  it('lista vazia não quebra: a coluna de informações existe, sem grupos', () => {
    const w = mount(DssContextHeader, { props: { groups: [] } })
    expect(w.find('.dss-context-header__groups').exists()).toBe(true)
    expect(w.findAll('.dss-context-header__group')).toHaveLength(0)
  })

  it('o slot item-[name] substitui o valor e recebe o item', () => {
    const w = mount(DssContextHeader, {
      props: { groups: GRUPOS },
      slots: { 'item-agua': '<b class="custom">{{ params.item.label }}</b>' },
    })
    expect(w.find('b.custom').exists()).toBe(true)
  })
})

// ==========================================================================
// 4. Retração
// ==========================================================================

describe('DssContextHeader — retração', () => {
  it('retraído, só as informações do resumo sobrevivem', () => {
    const w = mount(DssContextHeader, {
      props: { groups: GRUPOS, collapsed: true, summary: ['morador', 'endereco'] },
    })
    expect(w.findAll('dt').map((d) => d.text())).toEqual(['Morador:', 'Endereço:'])
  })

  it('o resumo respeita a ORDEM declarada, não a do documento', () => {
    const w = mount(DssContextHeader, {
      props: { groups: GRUPOS, collapsed: true, summary: ['endereco', 'morador'] },
    })
    expect(w.findAll('dt').map((d) => d.text())).toEqual(['Endereço:', 'Morador:'])
  })

  it('name inexistente no resumo é ignorado — dado incompleto é o caso normal', () => {
    const w = mount(DssContextHeader, {
      props: { groups: GRUPOS, collapsed: true, summary: ['morador', 'inexistente'] },
    })
    expect(w.findAll('dt')).toHaveLength(1)
  })

  it('sem summary, o default são as duas primeiras na ordem do documento', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS, collapsed: true } })
    expect(w.findAll('dt').map((d) => d.text())).toEqual(['Proprietário:', 'Morador:'])
  })

  it('a identidade e o botão de detalhes sobrevivem à retração', () => {
    const w = mount(DssContextHeader, {
      props: { identifier: '652701-9', groups: GRUPOS, collapsed: true },
    })
    expect(w.find('.dss-context-header__identifier').text()).toContain('652701-9')
    expect(w.find('.dss-context-header__details').exists()).toBe(true)
  })

  it('retraído, o trilho guarda só o gatilho de expandir', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS, collapsed: true } })
    expect(w.findAll('.dss-context-header__rail-btn')).toHaveLength(1)
  })

  it('o gatilho emite update:collapsed e declara aria-expanded', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const gatilho = w.findAll('.dss-context-header__rail-btn')[2]
    expect(gatilho.attributes('aria-expanded')).toBe('true')
    await gatilho.trigger('click')
    expect(w.emitted('update:collapsed')).toEqual([[true]])
  })

  it('sem v-model, o cabeçalho retrai sozinho', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS, collapsed: undefined } })
    await w.findAll('.dss-context-header__rail-btn')[2].trigger('click')
    expect(w.classes()).toContain('dss-context-header--collapsed')
  })

  it('a retração desce por inject, sem prop drilling', async () => {
    const Sonda = defineComponent({
      setup() {
        const { collapsed } = useContextHeader()
        return () => h('i', { 'data-sonda': collapsed.value ? 'sim' : 'nao' })
      },
    })
    const w = mount(DssContextHeader, {
      props: { groups: GRUPOS, collapsed: true, summary: ['agua'] },
      slots: { 'item-agua': Sonda },
    })
    expect(w.find('[data-sonda]').attributes('data-sonda')).toBe('sim')
  })
})

// ==========================================================================
// 5. Trilho — ações de sessão
// ==========================================================================

describe('DssContextHeader — trilho', () => {
  it('os três botões têm nome acessível', () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const nomes = w.findAll('.dss-context-header__rail-btn').map((b) => b.attributes('aria-label'))
    expect(nomes).toEqual([
      'Alterar atendimento',
      'Iniciar novo atendimento',
      'Minimizar cabeçalho',
    ])
  })

  it('a contagem de abertos entra no NOME, porque o badge é aria-hidden', () => {
    const w = mount(DssContextHeader, { props: { openCount: 2 } })
    expect(w.findAll('.dss-context-header__rail-btn')[0].attributes('aria-label')).toBe(
      'Alterar atendimento (2 em aberto)',
    )
    expect(w.find('.dss-context-header__rail-badge').attributes('aria-hidden')).toBe('true')
  })

  it('sem atendimentos abertos não há badge — mas o botão permanece', () => {
    const w = mount(DssContextHeader, { props: { openCount: 0 } })
    expect(w.find('.dss-context-header__rail-badge').exists()).toBe(false)
    expect(w.findAll('.dss-context-header__rail-btn')[0].exists()).toBe(true)
  })

  it('switch e create emitem os eventos de sessão', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const btns = w.findAll('.dss-context-header__rail-btn')
    await btns[0].trigger('click')
    await btns[1].trigger('click')
    expect(w.emitted('switch')).toHaveLength(1)
    expect(w.emitted('create')).toHaveLength(1)
  })

  it('o chevron é UM glifo nos dois estados — quem muda é o transform', () => {
    // Contrato da transição: alternar `arrow_up`/`arrow_down` é uma troca
    // INSTANTÂNEA no meio de uma animação contínua, e o pulo era o que se via.
    // O giro mora no CSS (`--gatilho`), que o jsdom não compõe — o que dá para
    // afirmar aqui, e é o que importa, é que o glifo NÃO troca.
    const glifo = (w) => {
      const btns = w.findAll('.dss-context-header__rail-btn')
      const gatilho = btns[btns.length - 1]
      return gatilho
        .find('.dss-context-header__rail-icon--gatilho')
        .element.querySelector('q-icon')
        ?.getAttribute('name')
    }

    const aberto = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const fechado = mount(DssContextHeader, { props: { groups: GRUPOS, collapsed: true } })
    expect(glifo(aberto)).toBe('keyboard_arrow_up')
    expect(glifo(fechado)).toBe('keyboard_arrow_up')
  })

  it('switchable/creatable/collapsible removem o botão correspondente', () => {
    const w = mount(DssContextHeader, {
      props: { switchable: false, creatable: false, collapsible: false },
    })
    expect(w.findAll('.dss-context-header__rail-btn')).toHaveLength(0)
  })
})

// ==========================================================================
// 6. Identidade
// ==========================================================================

describe('DssContextHeader — identidade', () => {
  it('o identificador tem rótulo para leitor de tela', () => {
    const w = mount(DssContextHeader, { props: { identifier: '652701-9' } })
    expect(w.find('.dss-context-header__sr-only').text()).toBe('Matrícula:')
  })

  it('os dois botões da identidade emitem eventos DIFERENTES — são modais diferentes', async () => {
    const w = mount(DssContextHeader, {})
    await w.find('.dss-context-header__records').trigger('click')
    await w.find('.dss-context-header__details').trigger('click')
    expect(w.emitted('open-records')).toHaveLength(1)
    expect(w.emitted('open-details')).toHaveLength(1)
  })

  it('o slot identity substitui o identificador', () => {
    const w = mount(DssContextHeader, {
      props: { identifier: '1-9' },
      slots: { identity: '<em class="custom">outro</em>' },
    })
    expect(w.find('em.custom').exists()).toBe(true)
    expect(w.find('.dss-context-header__identifier').text()).not.toContain('1-9')
  })
})

// ==========================================================================
// 7. Marca e atributos
// ==========================================================================

describe('DssContextHeader — marca e atributos', () => {
  it('brand emite data-brand no root — não pinta elemento (§K5)', () => {
    const w = mount(DssContextHeader, { props: { brand: 'water' } })
    expect(w.attributes('data-brand')).toBe('water')
    expect(w.classes()).toContain('dss-context-header--brand-water')
  })

  it('sem brand não há data-brand — a marca vem do ancestral', () => {
    const w = mount(DssContextHeader, {})
    expect(w.attributes('data-brand')).toBeUndefined()
  })

  it('inheritAttrs: false com v-bind explícito no root', () => {
    const w = mount(DssContextHeader, { attrs: { 'data-teste': 'x', id: 'ch-1' } })
    expect(w.attributes('data-teste')).toBe('x')
    expect(w.attributes('id')).toBe('ch-1')
  })
})

// ==========================================================================
// 8. Dicas
// ==========================================================================

describe('DssContextHeader — dicas', () => {
  /**
   * Afere o `v-show` no elemento, não o `isVisible()` do test-utils.
   *
   * `isVisible()` recorre aos ancestrais e consulta `getComputedStyle` — e numa
   * árvore DESANEXADA, que é onde o `mount` monta por padrão, ele devolveu
   * resultados que não batiam com o DOM: a sonda mostrou `style=""` (visível)
   * no mesmo instante em que `isVisible()` dizia `false`. O contrato real do
   * `DssTooltip` é a prop `visible`, que o Vue materializa como
   * `style="display: none"` — e é isso que se mede aqui.
   */
  const estaVisivel = (ancora) =>
    ancora.find('.dss-context-header__hint').element.getAttribute('style') !== 'display: none;'

  /**
   * Espera o estado chegar, em vez de afirmar depois de UM tick.
   *
   * O `trigger` do test-utils resolve após um `nextTick`, e aqui a mudança
   * atravessa DOIS componentes — o estado é do cabeçalho, o `v-show` é do
   * `DssTooltip`. Medido: com uma única espera, ora a asserção do mouse ora a
   * do foco reprovava, EM EXECUÇÕES DIFERENTES DO MESMO CÓDIGO. O navegador
   * mostra a dica nos dois casos; o que oscilava era o momento do flush.
   *
   * O laço não esconde defeito: se o estado nunca chegar, a última leitura
   * reprova do mesmo jeito.
   */
  const esperar = async (ancora, esperado) => {
    for (let i = 0; i < 5; i += 1) {
      if (estaVisivel(ancora) === esperado) return esperado
      await nextTick()
    }
    return estaVisivel(ancora)
  }

  it('a dica nasce invisível e aparece no hover — visible é obrigatório', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const ancora = w.findAll('.dss-context-header__hint-anchor')[0]
    expect(estaVisivel(ancora)).toBe(false)
    await ancora.trigger('mouseenter')
    expect(await esperar(ancora, true)).toBe(true)
    await ancora.trigger('mouseleave')
    expect(await esperar(ancora, false)).toBe(false)
  })

  it('a dica também abre por foco — WCAG 1.4.13 vale para teclado', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const ancora = w.findAll('.dss-context-header__hint-anchor')[0]
    await ancora.trigger('focusin')
    expect(await esperar(ancora, true)).toBe(true)
    await ancora.trigger('focusout')
    expect(await esperar(ancora, false)).toBe(false)
  })

  it('UMA dica por vez', async () => {
    const w = mount(DssContextHeader, { props: { groups: GRUPOS } })
    const ancoras = w.findAll('.dss-context-header__hint-anchor')
    await ancoras[0].trigger('mouseenter')
    await ancoras[1].trigger('mouseenter')
    await esperar(ancoras[1], true)
    const visiveis = w
      .findAll('.dss-context-header__hint')
      .filter((d) => d.element.getAttribute('style') !== 'display: none;')
    expect(visiveis).toHaveLength(1)
  })
})
