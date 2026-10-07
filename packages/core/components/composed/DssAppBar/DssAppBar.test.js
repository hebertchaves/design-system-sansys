/**
 * DssAppBar — Testes Unitários
 *
 * Cobre: a estrutura invariante, a propagação de marca por data-brand,
 * o divisor condicional, o evento de menu e o gate de responsabilidade.
 *
 * Golden Reference: DssChip
 * Golden Context: DssToolbar
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssAppBar from './DssAppBar.vue'

installQuasar()

// O DssHeader exige um QLayout ancestral — é uma não-use documentada dele.
// Sem a casca, o componente monta vazio e TODO teste aqui passaria por engano.
//
// Os slots são INLINE no template da casca, e não via a opção `slots` do mount:
// aquela entrega os slots ao componente MONTADO (a casca), não ao DssAppBar
// dentro dele. Passar por lá faz o slot sumir sem erro — e três testes deste
// arquivo passaram a mentir antes de eu perceber.
function montar(props = {}, slotsMarkup = {}) {
  const templatesDeSlot = Object.entries(slotsMarkup)
    .map(([nome, markup]) => `<template #${nome}>${markup}</template>`)
    .join('')

  return mount(
    {
      components: { DssAppBar },
      props: ['p'],
      template: `
        <q-layout view="hHh lpR fFf">
          <DssAppBar v-bind="p">${templatesDeSlot}</DssAppBar>
        </q-layout>
      `,
    },
    { props: { p: props }, attachTo: document.body },
  )
}

// ==========================================================================
// 1. A estrutura invariante
// ==========================================================================

describe('DssAppBar — estrutura', () => {
  it('monta dentro de um QLayout', () => {
    const w = montar({ title: 'Solicitações' })
    expect(w.find('.dss-app-bar').exists()).toBe(true)
    w.unmount()
  })

  it('renderiza as peças na ordem: menu → marca → divisor → título', () => {
    const w = montar({ title: 'Solicitações' })
    const inicio = w.find('.dss-app-bar__start')
    const classes = [...inicio.element.children].map((c) => c.className)
    expect(classes[0]).toContain('dss-app-bar__menu')
    expect(classes[1]).toContain('dss-app-bar__brand')
    expect(classes[2]).toContain('dss-app-bar__divider')
    expect(classes[3]).toContain('dss-app-bar__title')
    w.unmount()
  })

  it('o título é um <h1> — o nome do módulo É o título da tela', () => {
    const w = montar({ title: 'Solicitações' })
    expect(w.find('.dss-app-bar__title').element.tagName).toBe('H1')
    expect(w.find('.dss-app-bar__title').text()).toBe('Solicitações')
    w.unmount()
  })

  it('menu=false remove o botão de menu', () => {
    const w = montar({ title: 'X', menu: false })
    expect(w.find('.dss-app-bar__menu').exists()).toBe(false)
    w.unmount()
  })
})

// ==========================================================================
// 2. O divisor é condicional
// ==========================================================================

describe('DssAppBar — o divisor só existe quando há o que separar', () => {
  it('sem título, não há divisor', () => {
    const w = montar({})
    expect(w.find('.dss-app-bar__divider').exists()).toBe(false)
    expect(w.find('.dss-app-bar__title').exists()).toBe(false)
    w.unmount()
  })

  it('com título, há divisor', () => {
    const w = montar({ title: 'Solicitações' })
    expect(w.find('.dss-app-bar__divider').exists()).toBe(true)
    w.unmount()
  })

  it('título via slot também traz o divisor', () => {
    const w = montar({}, { title: '<span class="t-custom">Módulo</span>' })
    expect(w.find('.dss-app-bar__divider').exists()).toBe(true)
    expect(w.find('.t-custom').exists()).toBe(true)
    w.unmount()
  })
})

// ==========================================================================
// 3. Marca: uma prop, dois efeitos
// ==========================================================================

describe('DssAppBar — a marca chega ao logo sem prop drilling', () => {
  for (const marca of ['water', 'hub', 'waste']) {
    it(`brand="${marca}" propaga [data-brand] e o logo resolve sozinho`, async () => {
      const w = montar({ brand: marca, title: 'Módulo' })
      await nextTick()
      // O DssToolbar marca o próprio root; o DssBrandLogo lê o ancestral mais
      // próximo. Nenhuma prop de marca é passada ao logo.
      expect(w.find(`[data-brand="${marca}"]`).exists()).toBe(true)
      w.unmount()
    })
  }

  it('sem marca, o logo não desenha — melhor que desenhar a errada', async () => {
    const w = montar({ title: 'Módulo' })
    await nextTick()
    expect(w.findAll('.dss-brand-logo path')).toHaveLength(0)
    w.unmount()
  })
})

// ==========================================================================
// 4. Eventos e slots
// ==========================================================================

describe('DssAppBar — eventos e slots', () => {
  it('emite menu ao clicar no botão de menu', async () => {
    const w = mount(
      {
        components: { DssAppBar },
        template: `
          <q-layout view="hHh lpR fFf">
            <DssAppBar title="X" @menu="$emit('bateu')" />
          </q-layout>
        `,
      },
      { attachTo: document.body },
    )
    await w.find('.dss-app-bar__menu').trigger('click')
    expect(w.emitted('bateu')).toBeTruthy()
    w.unmount()
  })

  it('as ações só existem quando o slot é fornecido', () => {
    const sem = montar({ title: 'X' })
    expect(sem.find('.dss-app-bar__end').exists()).toBe(false)
    sem.unmount()

    const com = montar({ title: 'X' }, { actions: '<button class="a-x">a</button>' })
    expect(com.find('.dss-app-bar__end').exists()).toBe(true)
    expect(com.find('.a-x').exists()).toBe(true)
    com.unmount()
  })

  it('o slot brand substitui o logo', () => {
    const w = montar({ brand: 'water', title: 'X' }, { brand: '<span class="b-x">marca</span>' })
    expect(w.find('.b-x').exists()).toBe(true)
    expect(w.find('.dss-brand-logo').exists()).toBe(false)
    w.unmount()
  })
})

// ==========================================================================
// 5. Densidade e gate de responsabilidade
// ==========================================================================

describe('DssAppBar — densidade e responsabilidade', () => {
  it('compact é o padrão — é a barra do Sansys em produção', () => {
    const w = montar({ title: 'X' })
    expect(w.find('.dss-app-bar').classes()).toContain('dss-app-bar--compact')
    w.unmount()
  })

  it('standard troca a classe de densidade', () => {
    const w = montar({ title: 'X', density: 'standard' })
    expect(w.find('.dss-app-bar').classes()).toContain('dss-app-bar--standard')
    w.unmount()
  })

  it('o botão de menu é `md` nas DUAS densidades — 44px é o piso da WCAG 2.5.5', () => {
    // O DssButton não estende o alvo de toque por pseudo-elemento: o tamanho
    // visual É a área de clique. O `sm` entrega 36px e reprova a 2.5.5.
    // Foi por isso que a barra compacta subiu de 40px para 48px — e é por isso
    // que este teste não aceita `sm` em densidade nenhuma.
    for (const density of ['compact', 'standard']) {
      const w = montar({ title: 'X', density })
      const classes = w.find('.dss-app-bar__menu').classes()
      expect(classes).toContain('dss-button--md')
      expect(classes).not.toContain('dss-button--sm')
      w.unmount()
    }
  })

  it('o logo é decorativo por padrão: o nome do módulo já é anunciado', async () => {
    const w = montar({ brand: 'water', title: 'Solicitações' })
    await nextTick()
    expect(w.find('.dss-brand-logo').attributes('aria-hidden')).toBe('true')
    w.unmount()
  })

  it('não reimplementa primitivo: compõe DssToolbar e DssButton', () => {
    const w = montar({ brand: 'water', title: 'X' })
    expect(w.find('.dss-toolbar').exists()).toBe(true)
    expect(w.find('.dss-button').exists()).toBe(true)
    w.unmount()
  })
})
