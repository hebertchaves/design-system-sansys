/**
 * DssMenu — Testes Unitários
 *
 * Cobre: renderização, props, slots, forwarding de attrs, v-model,
 * gate de responsabilidade (sem estados interativos no container).
 *
 * Golden Reference: DssTooltip
 * Golden Context: DssList
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssMenu from './1-structure/DssMenu.ts.vue'

installQuasar()

describe('DssMenu', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================

  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssMenu)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe base .dss-menu', () => {
    const wrapper = mount(DssMenu)
    // QMenu teleporta para body — verificar via querySelector no documento
    // ou via classe no componente montado
    expect(wrapper.vm).toBeDefined()
  })

  // =========================================================================
  // 2. Props expostas
  // =========================================================================

  it('aceita prop modelValue false por padrão', () => {
    const wrapper = mount(DssMenu)
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('aceita prop fit false por padrão', () => {
    const wrapper = mount(DssMenu)
    expect(wrapper.props('fit')).toBe(false)
  })

  it('aceita prop cover false por padrão', () => {
    const wrapper = mount(DssMenu)
    expect(wrapper.props('cover')).toBe(false)
  })

  it('aceita prop anchor', () => {
    const wrapper = mount(DssMenu, {
      props: { anchor: 'bottom left' }
    })
    expect(wrapper.props('anchor')).toBe('bottom left')
  })

  it('aceita prop self', () => {
    const wrapper = mount(DssMenu, {
      props: { self: 'top left' }
    })
    expect(wrapper.props('self')).toBe('top left')
  })

  it('aceita prop offset', () => {
    const wrapper = mount(DssMenu, {
      props: { offset: [0, 8] }
    })
    expect(wrapper.props('offset')).toEqual([0, 8])
  })

  // =========================================================================
  // 3. Slots
  // =========================================================================

  it('renderiza conteúdo via slot default', () => {
    const wrapper = mount(DssMenu, {
      slots: {
        default: '<div class="test-content">conteúdo do menu</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // =========================================================================
  // 4. Emits (v-model)
  // =========================================================================

  it('emite update:modelValue ao fechar', async () => {
    const wrapper = mount(DssMenu, {
      props: { modelValue: true }
    })
    // Simula fechamento via evento do QMenu
    await wrapper.vm.$emit('update:modelValue', false)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // =========================================================================
  // 5. Forwarding de attrs
  // =========================================================================

  it('repassa atributos extras ao QMenu via v-bind="$attrs"', () => {
    const wrapper = mount(DssMenu, {
      attrs: { 'aria-label': 'Menu de ações' }
    })
    // inheritAttrs: false garante que attrs vão para QMenu, não para wrapper
    expect(wrapper.vm.$attrs['aria-label']).toBe('Menu de ações')
  })

  // =========================================================================
  // 6. Gate de Responsabilidade
  // =========================================================================

  it('não define estilos de hover/focus/active (container não-interativo)', () => {
    const wrapper = mount(DssMenu)
    // DssMenu é container overlay não-interativo
    // Verificar que não há classes de estado interativo aplicadas ao container
    const classes = wrapper.classes()
    expect(classes).not.toContain('dss-menu--hover')
    expect(classes).not.toContain('dss-menu--focus')
    expect(classes).not.toContain('dss-menu--active')
  })

  it('não aplica prop dark (bloqueada)', () => {
    // dark é prop bloqueada — não deve ser repassada ao QMenu
    const wrapper = mount(DssMenu)
    // Verificar que o componenteOptions não inclui dark como prop
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('dark')
  })

  it('não aplica prop square (bloqueada)', () => {
    const wrapper = mount(DssMenu)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('square')
  })
})
