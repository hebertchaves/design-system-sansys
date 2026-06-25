/**
 * DssScrollArea — Testes Unitários
 *
 * Cobre: renderização base, props expostas (visible, horizontal, barDelay, label),
 * classes modificadoras, slot default, evento scroll, forwarding de $attrs,
 * ARIA (role="region"/aria-label via prop label) e API imperativa (defineExpose).
 *
 * Golden Reference: DssBadge
 * Golden Context: DssVirtualScroll
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssScrollArea from './1-structure/DssScrollArea.ts.vue'

installQuasar()

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mountArea(props = {}, slots = {}) {
  return mount(DssScrollArea, {
    props,
    slots: { default: '<p>Conteúdo de teste</p>', ...slots },
  })
}

// ─── 1. Renderização base ─────────────────────────────────────────────────────

describe('DssScrollArea — Renderização base', () => {
  it('renderiza sem erros', () => {
    const wrapper = mountArea()
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica classe base .dss-scroll-area ao root', () => {
    const wrapper = mountArea()
    expect(wrapper.classes()).toContain('dss-scroll-area')
  })

  it('define nome do componente como DssScrollArea', () => {
    expect(DssScrollArea.name).toBe('DssScrollArea')
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mountArea({}, { default: '<span>Texto rolável</span>' })
    expect(wrapper.html()).toContain('Texto rolável')
  })
})

// ─── 2. Prop: visible ─────────────────────────────────────────────────────────

describe('DssScrollArea — Prop visible', () => {
  it('não aplica modificadores de visibilidade por padrão (visible="auto")', () => {
    const wrapper = mountArea()
    expect(wrapper.classes()).not.toContain('dss-scroll-area--always-visible')
    expect(wrapper.classes()).not.toContain('dss-scroll-area--never-visible')
  })

  it('aplica classe --always-visible quando visible="always"', () => {
    const wrapper = mountArea({ visible: 'always' })
    expect(wrapper.classes()).toContain('dss-scroll-area--always-visible')
  })

  it('aplica classe --never-visible quando visible="never"', () => {
    const wrapper = mountArea({ visible: 'never' })
    expect(wrapper.classes()).toContain('dss-scroll-area--never-visible')
  })

  it('não aplica modificadores quando visible="auto" explícito', () => {
    const wrapper = mountArea({ visible: 'auto' })
    expect(wrapper.classes()).not.toContain('dss-scroll-area--always-visible')
    expect(wrapper.classes()).not.toContain('dss-scroll-area--never-visible')
  })
})

// ─── 3. Prop: horizontal ──────────────────────────────────────────────────────

describe('DssScrollArea — Prop horizontal', () => {
  it('não aplica classe --horizontal por padrão', () => {
    const wrapper = mountArea()
    expect(wrapper.classes()).not.toContain('dss-scroll-area--horizontal')
  })

  it('aplica classe --horizontal quando horizontal=true', () => {
    const wrapper = mountArea({ horizontal: true })
    expect(wrapper.classes()).toContain('dss-scroll-area--horizontal')
  })
})

// ─── 4. Prop: label (ARIA) ────────────────────────────────────────────────────

describe('DssScrollArea — Prop label (ARIA)', () => {
  it('não adiciona role ou aria-label sem prop label', () => {
    const wrapper = mountArea()
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('adiciona role="region" quando label é fornecida', () => {
    const wrapper = mountArea({ label: 'Lista de resultados' })
    expect(wrapper.attributes('role')).toBe('region')
  })

  it('adiciona aria-label com o valor da prop label', () => {
    const wrapper = mountArea({ label: 'Lista de resultados' })
    expect(wrapper.attributes('aria-label')).toBe('Lista de resultados')
  })
})

// ─── 5. Forwarding de $attrs (inheritAttrs: false) ────────────────────────────

describe('DssScrollArea — Forwarding de $attrs', () => {
  it('encaminha atributos extras para o elemento root', () => {
    const wrapper = mount(DssScrollArea, {
      attrs: { 'data-testid': 'scroll-area-1', id: 'meu-scroll' },
      slots: { default: '<p>Conteúdo</p>' },
    })
    expect(wrapper.attributes('data-testid')).toBe('scroll-area-1')
    expect(wrapper.attributes('id')).toBe('meu-scroll')
  })

  it('encaminha classes extras ao root sem perder a classe base', () => {
    const wrapper = mount(DssScrollArea, {
      attrs: { class: 'minha-classe-extra' },
      slots: { default: '<p>Conteúdo</p>' },
    })
    expect(wrapper.classes()).toContain('dss-scroll-area')
    expect(wrapper.classes()).toContain('minha-classe-extra')
  })
})

// ─── 6. Evento scroll ─────────────────────────────────────────────────────────

describe('DssScrollArea — Evento scroll', () => {
  it('emite evento scroll mapeando a posição do payload do QScrollArea', async () => {
    const wrapper = mountArea()
    // Payload REAL do @scroll do QScrollArea (verticalPosition/horizontalPosition).
    const qScrollInfo = {
      verticalPosition: 100,
      horizontalPosition: 0,
      verticalPercentage: 0.5,
      horizontalPercentage: 0,
    }
    await wrapper.findComponent({ name: 'QScrollArea' }).vm.$emit('scroll', qScrollInfo)
    expect(wrapper.emitted('scroll')).toBeTruthy()
    // DssScrollArea mapeia para a abstração { position: { top, left } }.
    expect(wrapper.emitted('scroll')[0][0]).toEqual({ position: { top: 100, left: 0 } })
  })
})

// ─── 7. API imperativa (defineExpose) ─────────────────────────────────────────

describe('DssScrollArea — API imperativa (defineExpose)', () => {
  it('expõe método getScrollTarget', () => {
    const wrapper = mountArea()
    expect(typeof wrapper.vm.getScrollTarget).toBe('function')
  })

  it('expõe método getScrollPosition', () => {
    const wrapper = mountArea()
    expect(typeof wrapper.vm.getScrollPosition).toBe('function')
  })

  it('expõe método scrollTo', () => {
    const wrapper = mountArea()
    expect(typeof wrapper.vm.scrollTo).toBe('function')
  })

  it('expõe método scrollBy', () => {
    const wrapper = mountArea()
    expect(typeof wrapper.vm.scrollBy).toBe('function')
  })

  it('expõe método setScrollPosition', () => {
    const wrapper = mountArea()
    expect(typeof wrapper.vm.setScrollPosition).toBe('function')
  })

  // Regressão: scrollTo/scrollBy chamavam scrollAreaRef.value.scrollTo/scrollBy,
  // métodos que NÃO existem no QScrollArea (lançavam TypeError). Agora delegam
  // a setScrollPosition. Smoke test garante que invocar não lança.
  it('scrollTo não lança ao ser invocado (delega a setScrollPosition)', () => {
    const wrapper = mountArea()
    expect(() => wrapper.vm.scrollTo(100, 300)).not.toThrow()
    expect(() => wrapper.vm.scrollTo(100, 300, 'horizontal')).not.toThrow()
  })

  it('scrollBy não lança ao ser invocado (lê posição + soma delta)', () => {
    const wrapper = mountArea()
    expect(() => wrapper.vm.scrollBy(50)).not.toThrow()
    expect(() => wrapper.vm.scrollBy(50, 300, 'horizontal')).not.toThrow()
  })
})

// ─── 8. Gate de Responsabilidade ─────────────────────────────────────────────

describe('DssScrollArea — Gate de Responsabilidade', () => {
  it('não define estados interativos no container (sem hover/focus/active diretos)', () => {
    // O componente é container não-interativo.
    // Verificamos que não há classes de estado interativo no próprio container.
    const wrapper = mountArea()
    expect(wrapper.classes()).not.toContain('dss-scroll-area--hover')
    expect(wrapper.classes()).not.toContain('dss-scroll-area--focused')
    expect(wrapper.classes()).not.toContain('dss-scroll-area--active')
  })
})
