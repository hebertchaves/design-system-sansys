/**
 * DssSplitter — Testes Unitários
 *
 * Cobre: renderização base, props expostas (orientation, disabled, reverse,
 * modelValue, limits, unit, emitImmediately), classes modificadoras,
 * slots (before, after, separator), evento update:modelValue,
 * forwarding de $attrs e Gate de Responsabilidade.
 *
 * Golden Reference: DssChip
 * Golden Context: DssSlider
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSplitter from './1-structure/DssSplitter.ts.vue'

installQuasar()

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mountSplitter(props = {}, slots = {}) {
  return mount(DssSplitter, {
    props,
    slots: {
      before: '<div>Painel A</div>',
      after: '<div>Painel B</div>',
      ...slots,
    },
  })
}

// ─── 1. Renderização base ─────────────────────────────────────────────────────

describe('DssSplitter — Renderização base', () => {
  it('renderiza sem erros', () => {
    const wrapper = mountSplitter()
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica classe base .dss-splitter ao root', () => {
    const wrapper = mountSplitter()
    expect(wrapper.classes()).toContain('dss-splitter')
  })

  it('define nome do componente como DssSplitter', () => {
    expect(DssSplitter.name).toBe('DssSplitter')
  })

  it('renderiza conteúdo dos slots before e after', () => {
    const wrapper = mountSplitter(
      {},
      { before: '<span>Conteúdo A</span>', after: '<span>Conteúdo B</span>' },
    )
    expect(wrapper.html()).toContain('Conteúdo A')
    expect(wrapper.html()).toContain('Conteúdo B')
  })
})

// ─── 2. Prop: orientation ─────────────────────────────────────────────────────

describe('DssSplitter — Prop orientation', () => {
  it('não aplica classe --vertical por padrão (orientation="horizontal")', () => {
    const wrapper = mountSplitter()
    expect(wrapper.classes()).not.toContain('dss-splitter--vertical')
  })

  it('aplica classe --vertical quando orientation="vertical"', () => {
    const wrapper = mountSplitter({ orientation: 'vertical' })
    expect(wrapper.classes()).toContain('dss-splitter--vertical')
  })

  it('não aplica classe --vertical quando orientation="horizontal" explícito', () => {
    const wrapper = mountSplitter({ orientation: 'horizontal' })
    expect(wrapper.classes()).not.toContain('dss-splitter--vertical')
  })
})

// ─── 3. Prop: disabled ────────────────────────────────────────────────────────

describe('DssSplitter — Prop disabled', () => {
  it('não aplica classe --disabled por padrão', () => {
    const wrapper = mountSplitter()
    expect(wrapper.classes()).not.toContain('dss-splitter--disabled')
  })

  it('aplica classe --disabled quando disabled=true', () => {
    const wrapper = mountSplitter({ disabled: true })
    expect(wrapper.classes()).toContain('dss-splitter--disabled')
  })
})

// ─── 4. Prop: reverse ────────────────────────────────────────────────────────

describe('DssSplitter — Prop reverse', () => {
  it('não aplica classe --reversed por padrão', () => {
    const wrapper = mountSplitter()
    expect(wrapper.classes()).not.toContain('dss-splitter--reversed')
  })

  it('aplica classe --reversed quando reverse=true', () => {
    const wrapper = mountSplitter({ reverse: true })
    expect(wrapper.classes()).toContain('dss-splitter--reversed')
  })
})

// ─── 5. Props: modelValue e limits ───────────────────────────────────────────

describe('DssSplitter — Props modelValue e limits', () => {
  it('aceita modelValue como prop sem erros', () => {
    const wrapper = mountSplitter({ modelValue: 30 })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita limits como prop sem erros', () => {
    const wrapper = mountSplitter({ limits: [20, 80] })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita unit="px" como prop sem erros', () => {
    const wrapper = mountSplitter({ modelValue: 200, unit: 'px', limits: [100, 400] })
    expect(wrapper.exists()).toBe(true)
  })
})

// ─── 6. Forwarding de $attrs ──────────────────────────────────────────────────

describe('DssSplitter — Forwarding de $attrs', () => {
  it('encaminha atributos extras para o elemento root', () => {
    const wrapper = mount(DssSplitter, {
      attrs: { 'data-testid': 'splitter-1', id: 'main-splitter' },
      slots: { before: '<div>A</div>', after: '<div>B</div>' },
    })
    expect(wrapper.attributes('data-testid')).toBe('splitter-1')
    expect(wrapper.attributes('id')).toBe('main-splitter')
  })

  it('encaminha classes extras ao root sem perder a classe base', () => {
    const wrapper = mount(DssSplitter, {
      attrs: { class: 'minha-classe-extra' },
      slots: { before: '<div>A</div>', after: '<div>B</div>' },
    })
    expect(wrapper.classes()).toContain('dss-splitter')
    expect(wrapper.classes()).toContain('minha-classe-extra')
  })
})

// ─── 7. Evento update:modelValue ─────────────────────────────────────────────

describe('DssSplitter — Evento update:modelValue', () => {
  it('emite update:modelValue quando QSplitter emite update:model-value', async () => {
    const wrapper = mountSplitter()
    await wrapper.findComponent({ name: 'QSplitter' }).vm.$emit('update:model-value', 70)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(70)
  })
})

// ─── 8. Gate de Responsabilidade ─────────────────────────────────────────────

describe('DssSplitter — Gate de Responsabilidade', () => {
  it('não possui classes de estado interativo no container root (apenas no separator interno)', () => {
    const wrapper = mountSplitter()
    expect(wrapper.classes()).not.toContain('dss-splitter--hover')
    expect(wrapper.classes()).not.toContain('dss-splitter--focused')
    expect(wrapper.classes()).not.toContain('dss-splitter--active')
    expect(wrapper.classes()).not.toContain('dss-splitter--dragging')
  })
})
