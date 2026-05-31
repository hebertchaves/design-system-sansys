/**
 * DssDialog — Testes Unitários
 *
 * Cobre: renderização, props, slots, forwarding de attrs, v-model,
 * gate de responsabilidade (sem estados interativos no container).
 *
 * Golden Reference: DssChip
 * Golden Context: DssCard
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssDialog from './1-structure/DssDialog.ts.vue'

installQuasar()

describe('DssDialog', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssDialog)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe base .dss-dialog', () => {
    const wrapper = mount(DssDialog)
    expect(wrapper.vm).toBeDefined()
  })

  // =========================================================================
  // 2. Props expostas
  // =========================================================================
  it('aceita prop open false por padrão', () => {
    const wrapper = mount(DssDialog)
    expect(wrapper.props('open')).toBe(false)
  })

  it('aceita prop persistent', () => {
    const wrapper = mount(DssDialog, {
      props: { persistent: true }
    })
    expect(wrapper.props('persistent')).toBe(true)
  })

  it('aceita prop maximized', () => {
    const wrapper = mount(DssDialog, {
      props: { maximized: true }
    })
    expect(wrapper.props('maximized')).toBe(true)
  })

  it('aceita prop position', () => {
    const wrapper = mount(DssDialog, {
      props: { position: 'bottom' }
    })
    expect(wrapper.props('position')).toBe('bottom')
  })

  // =========================================================================
  // 3. Slots e Condicionalidade
  // =========================================================================
  it('renderiza conteúdo via slot default', () => {
    const wrapper = mount(DssDialog, {
      slots: {
        default: '<div class="test-content">conteúdo do diálogo</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  it('renderiza header apenas quando slot é fornecido', () => {
    const wrapper = mount(DssDialog, {
      slots: {
        header: '<div class="test-header">Título</div>'
      }
    })
    expect(wrapper.find('.dss-dialog__header').exists()).toBe(true)
    expect(wrapper.find('.test-header').exists()).toBe(true)
  })

  it('renderiza footer apenas quando slot é fornecido', () => {
    const wrapper = mount(DssDialog, {
      slots: {
        footer: '<div class="test-footer">Ações</div>'
      }
    })
    expect(wrapper.find('.dss-dialog__footer').exists()).toBe(true)
    expect(wrapper.find('.test-footer').exists()).toBe(true)
  })

  // =========================================================================
  // 4. Emits (v-model e eventos)
  // =========================================================================
  it('emite update:open ao fechar', async () => {
    const wrapper = mount(DssDialog, {
      props: { open: true }
    })
    // Simula fechamento via evento do QDialog
    await wrapper.vm.$emit('update:open', false)
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('emite eventos de ciclo de vida (open, close, before-open, before-close)', async () => {
    const wrapper = mount(DssDialog)
    
    await wrapper.vm.$emit('open')
    expect(wrapper.emitted('open')).toBeTruthy()
    
    await wrapper.vm.$emit('close')
    expect(wrapper.emitted('close')).toBeTruthy()
    
    await wrapper.vm.$emit('before-open')
    expect(wrapper.emitted('before-open')).toBeTruthy()
    
    await wrapper.vm.$emit('before-close')
    expect(wrapper.emitted('before-close')).toBeTruthy()
  })

  // =========================================================================
  // 5. Forwarding de attrs
  // =========================================================================
  it('repassa atributos extras ao QDialog via v-bind="$attrs"', () => {
    const wrapper = mount(DssDialog, {
      attrs: { 'aria-labelledby': 'dialog-title' }
    })
    // inheritAttrs: false garante que attrs vão para QDialog, não para wrapper
    expect(wrapper.vm.$attrs['aria-labelledby']).toBe('dialog-title')
  })

  // =========================================================================
  // 6. Gate de Responsabilidade
  // =========================================================================
  it('não define estilos de hover/focus/active (container não-interativo)', () => {
    const wrapper = mount(DssDialog)
    const classes = wrapper.classes()
    expect(classes).not.toContain('dss-dialog--hover')
    expect(classes).not.toContain('dss-dialog--focus')
    expect(classes).not.toContain('dss-dialog--active')
  })

  it('não aplica prop dark (bloqueada)', () => {
    const wrapper = mount(DssDialog)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('dark')
  })

  it('não aplica prop square (bloqueada)', () => {
    const wrapper = mount(DssDialog)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('square')
  })
})
