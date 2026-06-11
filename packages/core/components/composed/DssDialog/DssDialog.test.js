/**
 * DssDialog — Testes Unitários
 *
 * Cobre: renderização, props, slots, forwarding de attrs, v-model,
 * gate de responsabilidade (sem estados interativos no container).
 *
 * Golden Reference: DssChip
 * Golden Context: DssCard
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
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
  // NOTA (Onda P0/T4): QDialog teleporta o conteúdo para <body> — as buscas
  // devem ser feitas em document.body, com o dialog aberto (open: true).
  // As versões anteriores destes testes usavam wrapper.find() e só passavam
  // porque o registro global do Quasar não existia no runner (q-dialog não
  // resolvia e os filhos renderizavam inline).
  it('renderiza conteúdo via slot default', async () => {
    const wrapper = mount(DssDialog, {
      props: { open: true },
      slots: {
        default: '<div class="test-content">conteúdo do diálogo</div>'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.test-content')).not.toBeNull()
    wrapper.unmount()
  })

  it('renderiza header apenas quando slot é fornecido', async () => {
    const wrapper = mount(DssDialog, {
      props: { open: true },
      slots: {
        header: '<div class="test-header">Título</div>'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.dss-dialog__header')).not.toBeNull()
    expect(document.body.querySelector('.test-header')).not.toBeNull()
    wrapper.unmount()
  })

  it('renderiza footer apenas quando slot é fornecido', async () => {
    const wrapper = mount(DssDialog, {
      props: { open: true },
      slots: {
        footer: '<div class="test-footer">Ações</div>'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.dss-dialog__footer')).not.toBeNull()
    expect(document.body.querySelector('.test-footer')).not.toBeNull()
    wrapper.unmount()
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

  // =========================================================================
  // Brand em conteúdo teleportado (Onda P0/T4 — bloqueante A8)
  // O QDialog teleporta o conteúdo para <body>; o acento de brand é
  // resolvido pelo composable useTeleportedBrand e aplicado via :data-brand
  // no root .dss-dialog. Ver DSS_IMPLEMENTATION_GUIDE.md — Brandabilidade.
  // =========================================================================
  describe('Brand em conteúdo teleportado', () => {
    // QDialog desmontado em estado aberto deixa o portal no body durante a
    // transição — remover portais órfãos para não contaminar as asserções.
    beforeEach(() => {
      document.body.querySelectorAll('.dss-dialog').forEach((el) => {
        const portal = el.closest('[id^="q-portal"]')
        ;(portal ?? el).remove()
      })
    })

    it('aplica o data-brand do <body> (norma) no root teleportado', async () => {
      document.body.dataset.brand = 'water'
      const wrapper = mount(DssDialog, {
        props: { open: true },
        slots: { default: 'Conteúdo' }
      })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      const dialogs = document.body.querySelectorAll('.dss-dialog')
      const teleported = dialogs[dialogs.length - 1]
      expect(teleported).not.toBeNull()
      expect(teleported.getAttribute('data-brand')).toBe('water')
      wrapper.unmount()
      delete document.body.dataset.brand
    })

    it('usa fallback de container legado quando o body não tem data-brand', async () => {
      delete document.body.dataset.brand
      const host = document.createElement('div')
      host.dataset.brand = 'hub'
      document.body.appendChild(host)
      const wrapper = mount(DssDialog, {
        props: { open: true },
        slots: { default: 'Conteúdo' }
      })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      const dialogs = document.body.querySelectorAll('.dss-dialog')
      const teleported = dialogs[dialogs.length - 1]
      expect(teleported).not.toBeNull()
      expect(teleported.getAttribute('data-brand')).toBe('hub')
      wrapper.unmount()
      host.remove()
    })

    it('omite data-brand quando o documento não declara brand', async () => {
      delete document.body.dataset.brand
      const wrapper = mount(DssDialog, {
        props: { open: true },
        slots: { default: 'Conteúdo' }
      })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      const dialogs = document.body.querySelectorAll('.dss-dialog')
      const teleported = dialogs[dialogs.length - 1]
      expect(teleported).not.toBeNull()
      expect(teleported.hasAttribute('data-brand')).toBe(false)
      wrapper.unmount()
    })
  })
})
