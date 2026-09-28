/**
 * DssActionMenu — cobertura
 *
 * ESTRATÉGIA. O componente é uma BARRA que coordena ações; quase tudo que
 * importa é relação, não aparência. Os testes exercitam a fronteira real —
 * montam a barra com itens de verdade, como o consumidor faria — em vez de
 * alcançar internos.
 *
 * O QMenu (base do DssMenu) teleporta para o <body>, então o painel de
 * sub-ações NÃO está dentro do wrapper: é procurado no document.
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { h, nextTick, Comment, Text } from 'vue'
import DssActionMenu from './1-structure/DssActionMenu.ts.vue'
import DssActionMenuItem from './1-structure/DssActionMenuItem.ts.vue'
import DssActionMenuSubItem from './1-structure/DssActionMenuSubItem.ts.vue'

installQuasar()

/** Monta a barra com N ações simples, mais opcionalmente uma com sub-ações. */
function montar(props = {}, { comSubAcoes = false, itens = ['novo', 'editar'] } = {}) {
  return mount(DssActionMenu, {
    props: { ariaLabel: 'Ações do registro', ...props },
    attachTo: document.body,
    slots: {
      default: () => [
        ...itens.map((n) => h(DssActionMenuItem, { name: n, label: n, key: n })),
        ...(comSubAcoes
          ? [h(DssActionMenuItem, { name: 'exportar', label: 'Exportar' }, {
              default: () => [
                h(DssActionMenuSubItem, { name: 'pdf', label: 'PDF' }),
                h(DssActionMenuSubItem, { name: 'planilha', label: 'Planilha' }),
              ],
            })]
          : []),
      ],
    },
  })
}

// ── 11.1 Renderização básica ────────────────────────────────────────────────
describe('DssActionMenu — renderização', () => {
  it('renderiza uma ação por item do slot', () => {
    const w = montar({}, { itens: ['a', 'b', 'c'] })
    expect(w.findAll('[data-action-menu-item]')).toHaveLength(3)
    w.unmount()
  })

  it('aplica role=toolbar e aria-label na raiz', () => {
    const w = montar()
    expect(w.attributes('role')).toBe('toolbar')
    expect(w.attributes('aria-label')).toBe('Ações do registro')
    w.unmount()
  })

  it('o painel de sub-ações começa FECHADO', () => {
    const w = montar({}, { comSubAcoes: true })
    expect(document.querySelector('.dss-action-menu__sub')).toBeNull()
    w.unmount()
  })
})

// ── 11.2 Propagação de props críticas ───────────────────────────────────────
describe('DssActionMenu — propagação', () => {
  it('variant, color e size da barra chegam a TODAS as ações', () => {
    const w = montar({ variant: 'outline', color: 'negative', size: 'sm' }, { itens: ['a', 'b'] })
    for (const item of w.findAllComponents(DssActionMenuItem)) {
      const btn = item.findComponent({ name: 'DssButton' })
      expect(btn.props('variant')).toBe('outline')
      expect(btn.props('color')).toBe('negative')
      expect(btn.props('size')).toBe('sm')
    }
    w.unmount()
  })

  it('brand vira data-brand no nó raiz', () => {
    const w = montar({ brand: 'hub' })
    expect(w.attributes('data-brand')).toBe('hub')
    w.unmount()
  })

  it('disabled na barra desabilita cada ação', () => {
    const w = montar({ disabled: true }, { itens: ['a', 'b'] })
    for (const item of w.findAllComponents(DssActionMenuItem)) {
      expect(item.findComponent({ name: 'DssButton' }).props('disabled')).toBe(true)
    }
    w.unmount()
  })

  it('disabled na barra IMPEDE a abertura do sub-menu', async () => {
    // É o defeito clássico de prop drilling: o menu abre com itens inertes.
    const w = montar({ disabled: true }, { comSubAcoes: true })
    const gatilho = w.findAllComponents(DssActionMenuItem).at(-1)
    await gatilho.findComponent({ name: 'DssButton' }).trigger('click')
    await nextTick()
    expect(document.querySelector('.dss-action-menu__sub')).toBeNull()
    w.unmount()
  })
})

// ── 11.3 Lógica composta ────────────────────────────────────────────────────
describe('DssActionMenu — lógica composta', () => {
  it('acionar emite @action com o name correto', async () => {
    const w = montar({}, { itens: ['novo', 'editar'] })
    await w.findAllComponents(DssActionMenuItem)[1].findComponent({ name: 'DssButton' }).trigger('click')
    expect(w.emitted('action')).toBeTruthy()
    expect(w.emitted('action')[0]).toEqual(['editar'])
    w.unmount()
  })

  it('ação com sub-ações NÃO emite @action — apenas abre', async () => {
    const w = montar({}, { comSubAcoes: true })
    const gatilho = w.findAllComponents(DssActionMenuItem).at(-1)
    await gatilho.findComponent({ name: 'DssButton' }).trigger('click')
    expect(w.emitted('action')).toBeFalsy()
    w.unmount()
  })

  it('abrir um sub-menu fecha o anterior — um por vez', async () => {
    const w = mount(DssActionMenu, {
      props: { ariaLabel: 'Barra' },
      attachTo: document.body,
      slots: {
        default: () => ['um', 'dois'].map((n) =>
          h(DssActionMenuItem, { name: n, label: n, key: n }, {
            default: () => [h(DssActionMenuSubItem, { name: `${n}-sub`, label: `${n}-sub` })],
          })),
      },
    })
    const itens = w.findAllComponents(DssActionMenuItem)
    await itens[0].findComponent({ name: 'DssButton' }).trigger('click')
    await nextTick()
    await itens[1].findComponent({ name: 'DssButton' }).trigger('click')
    await nextTick()
    // O contexto guarda UM nome; o primeiro deixou de estar aberto.
    expect(itens[0].vm.aberto ?? false).toBeFalsy()
    w.unmount()
  })
})

// ── 11.4 Acessibilidade ─────────────────────────────────────────────────────
describe('DssActionMenu — acessibilidade', () => {
  it('gatilho com sub-ações declara aria-haspopup=menu', () => {
    const w = montar({}, { comSubAcoes: true })
    const btn = w.findAllComponents(DssActionMenuItem).at(-1).find('[data-action-menu-item]')
    expect(btn.attributes('aria-haspopup')).toBe('menu')
    w.unmount()
  })

  it('aria-expanded reflete o estado do sub-menu', async () => {
    const w = montar({}, { comSubAcoes: true })
    const item = w.findAllComponents(DssActionMenuItem).at(-1)
    expect(item.find('[data-action-menu-item]').attributes('aria-expanded')).toBe('false')
    await item.findComponent({ name: 'DssButton' }).trigger('click')
    await nextTick()
    expect(item.find('[data-action-menu-item]').attributes('aria-expanded')).toBe('true')
    w.unmount()
  })

  it('ação SEM sub-ações não declara aria-haspopup', () => {
    const w = montar()
    expect(w.find('[data-action-menu-item]').attributes('aria-haspopup')).toBeUndefined()
    w.unmount()
  })

  it('slot default VAZIO não conta como sub-ação', () => {
    // REGRESSÃO MEDIDA no Preview Frame: a semente monta todo item com um slot
    // `default` presente mas vazio, e `!!slots.default` fazia as QUATRO ações
    // anunciarem aria-haspopup="menu" — mentira para o leitor de tela.
    // A checagem passou a ser de CONTEÚDO, e este teste é o que trava a volta.
    const w = mount(DssActionMenu, {
      props: { ariaLabel: 'Barra' },
      attachTo: document.body,
      slots: {
        default: () => [
          // Os DOIS casos que a semente produz de verdade:
          //   [] — slot declarado e sem nós
          //   [Comment] — é o que `v-if` falso deixa no lugar
          h(DssActionMenuItem, { name: 'a', label: 'A' }, { default: () => [] }),
          h(DssActionMenuItem, { name: 'b', label: 'B' }, { default: () => [h(Comment)] }),
          h(DssActionMenuItem, { name: 'c', label: 'C' }, { default: () => [h(Text, '   ')] }),
        ],
      },
    })
    for (const btn of w.findAll('[data-action-menu-item]')) {
      expect(btn.attributes('aria-haspopup')).toBeUndefined()
    }
    w.unmount()
  })

  it('o label da ação é renderizado — o menu não pode ocupar o slot do botão', () => {
    // REGRESSÃO MEDIDA: com o DssMenu dentro do DssButton, o slot `default`
    // vencia a prop `label` e o rótulo sumia, restando só o ícone.
    const w = montar({}, { comSubAcoes: true })
    const gatilho = w.findAllComponents(DssActionMenuItem).at(-1)
    expect(gatilho.findComponent({ name: 'DssButton' }).props('label')).toBe('Exportar')
    expect(gatilho.text()).toContain('Exportar')
    w.unmount()
  })

  it('a sub-ação declara role=menuitem SEM o consumidor pedir', () => {
    // MEDIDO no Preview Frame: com DssItem cru, o consumidor precisava escrever
    // role e tabindex à mão. Quem esquecesse ganhava um menu que abre, parece
    // certo, e não é anunciado como menu. O papel passou a vir do DSS.
    const w = montar({}, { comSubAcoes: true })
    w.findAllComponents(DssActionMenuItem).at(-1).findComponent({ name: 'DssButton' }).trigger('click')
    return nextTick().then(() => {
      const itens = document.querySelectorAll('.dss-action-menu__sub [role="menuitem"]')
      expect(itens.length).toBe(2)
      for (const i of itens) expect(i.getAttribute('tabindex')).toBe('0')
      w.unmount()
    })
  })

  it('barra desabilitada expõe aria-disabled', () => {
    const w = montar({ disabled: true })
    expect(w.attributes('aria-disabled')).toBe('true')
    w.unmount()
  })

  it('ArrowRight move o foco para a próxima ação', async () => {
    const w = montar({}, { itens: ['a', 'b', 'c'] })
    const botoes = w.findAll('[data-action-menu-item]')
    botoes[0].element.focus()
    await w.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(botoes[1].element)
    w.unmount()
  })

  it('ArrowLeft na primeira ação circula para a última', async () => {
    const w = montar({}, { itens: ['a', 'b', 'c'] })
    const botoes = w.findAll('[data-action-menu-item]')
    botoes[0].element.focus()
    await w.trigger('keydown', { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(botoes[2].element)
    w.unmount()
  })

  it('a navegação por seta PULA ação desabilitada', async () => {
    // MEDIDO no navegador: <button disabled> não é focável, e sem o filtro o
    // foco TRAVAVA ao esbarrar numa ação desabilitada. Divergência do pré-prompt
    // §6, declarada no README.
    const w = mount(DssActionMenu, {
      props: { ariaLabel: 'Barra' },
      attachTo: document.body,
      slots: {
        default: () => [
          h(DssActionMenuItem, { name: 'a', label: 'A' }),
          h(DssActionMenuItem, { name: 'b', label: 'B', disabled: true }),
          h(DssActionMenuItem, { name: 'c', label: 'C' }),
        ],
      },
    })
    const botoes = w.findAll('[data-action-menu-item]')
    botoes[0].element.focus()
    await w.trigger('keydown', { key: 'ArrowRight' })
    // pula o desabilitado (índice 1) e vai direto ao 2
    expect(document.activeElement).toBe(botoes[2].element)
    w.unmount()
  })

  it('Home e End vão aos extremos', async () => {
    const w = montar({}, { itens: ['a', 'b', 'c'] })
    const botoes = w.findAll('[data-action-menu-item]')
    botoes[1].element.focus()
    await w.trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(botoes[2].element)
    await w.trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(botoes[0].element)
    w.unmount()
  })
})
