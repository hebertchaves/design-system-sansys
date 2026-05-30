import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssChatMessage from './DssChatMessage.vue'

// ==========================================================================
// DssChatMessage — Testes
// ==========================================================================

describe('DssChatMessage', () => {

  // ========================================================================
  // Renderização base
  // ========================================================================

  describe('renderização base', () => {
    it('renderiza com prop message', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Olá mundo' },
      })
      expect(wrapper.find('.dss-chat-message').exists()).toBe(true)
      expect(wrapper.text()).toContain('Olá mundo')
    })

    it('renderiza como article com role="listitem"', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Test' },
      })
      expect(wrapper.element.tagName).toBe('ARTICLE')
      expect(wrapper.attributes('role')).toBe('listitem')
    })

    it('aplica classe dss-chat-message--received por padrão', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Recebida' },
      })
      expect(wrapper.classes()).toContain('dss-chat-message--received')
      expect(wrapper.classes()).not.toContain('dss-chat-message--mine')
    })

    it('aplica classe dss-chat-message--mine quando isMine=true', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Enviada', isMine: true },
      })
      expect(wrapper.classes()).toContain('dss-chat-message--mine')
      expect(wrapper.classes()).not.toContain('dss-chat-message--received')
    })
  })

  // ========================================================================
  // Props
  // ========================================================================

  describe('props', () => {
    it('exibe nome do remetente em mensagens recebidas', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', senderName: 'Maria' },
      })
      expect(wrapper.find('.dss-chat-message__sender-name').exists()).toBe(true)
      expect(wrapper.find('.dss-chat-message__sender-name').text()).toBe('Maria')
    })

    it('não exibe nome do remetente em mensagens mine', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', senderName: 'Eu', isMine: true },
      })
      expect(wrapper.find('.dss-chat-message__sender-name').exists()).toBe(false)
    })

    it('exibe timestamp quando fornecido', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', timestamp: '10:30' },
      })
      expect(wrapper.find('.dss-chat-message__timestamp').exists()).toBe(true)
      expect(wrapper.find('.dss-chat-message__timestamp').text()).toBe('10:30')
    })

    it('exibe ícone de status quando status fornecido', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', status: 'read', isMine: true },
      })
      expect(wrapper.find('.dss-chat-message__status').exists()).toBe(true)
      expect(wrapper.find('.dss-chat-message__status').classes()).toContain('dss-chat-message__status--read')
    })

    it('aplica classe compacto quando compact=true', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', compact: true },
      })
      expect(wrapper.classes()).toContain('dss-chat-message--compact')
    })

    it('aplica classe selecionado quando selected=true', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', selected: true },
      })
      expect(wrapper.classes()).toContain('dss-chat-message--selected')
    })

    it('aplica classe disable quando disable=true', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', disable: true },
      })
      expect(wrapper.classes()).toContain('dss-chat-message--disable')
    })

    it('não exibe área de avatar quando showAvatar=false', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', showAvatar: false },
      })
      expect(wrapper.find('.dss-chat-message__avatar-area').exists()).toBe(false)
    })
  })

  // ========================================================================
  // Eventos
  // ========================================================================

  describe('eventos', () => {
    it('emite evento click ao clicar', async () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Clicável' },
      })
      await wrapper.find('.dss-chat-message').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('não emite click quando disable=true', async () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Desabilitado', disable: true },
      })
      await wrapper.find('.dss-chat-message').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('emite long-press após pointerdown sem pointermove', async () => {
      vi.useFakeTimers()
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Long press' },
      })
      await wrapper.find('.dss-chat-message').trigger('pointerdown')
      vi.advanceTimersByTime(500)
      expect(wrapper.emitted('long-press')).toBeTruthy()
      vi.useRealTimers()
    })

    it('cancela long-press ao mover ponteiro', async () => {
      vi.useFakeTimers()
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Cancelado' },
      })
      await wrapper.find('.dss-chat-message').trigger('pointerdown')
      await wrapper.find('.dss-chat-message').trigger('pointermove')
      vi.advanceTimersByTime(500)
      expect(wrapper.emitted('long-press')).toBeFalsy()
      vi.useRealTimers()
    })
  })

  // ========================================================================
  // Slots
  // ========================================================================

  describe('slots', () => {
    it('slot default substitui prop message', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Ignorado' },
        slots: { default: '<span class="custom-content">Conteúdo do slot</span>' },
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Conteúdo do slot')
    })

    it('slot actions renderiza área de ações', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Com ações' },
        slots: { actions: '<button class="action-btn">Responder</button>' },
      })
      expect(wrapper.find('.dss-chat-message__actions').exists()).toBe(true)
      expect(wrapper.find('.action-btn').exists()).toBe(true)
    })

    it('slot sender-name substitui texto do remetente', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', senderName: 'Original' },
        slots: { 'sender-name': '<strong class="custom-name">Customizado</strong>' },
      })
      expect(wrapper.find('.custom-name').exists()).toBe(true)
    })

    it('slot avatar substitui DssAvatar automático', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', avatarSrc: 'https://example.com/avatar.jpg' },
        slots: { avatar: '<div class="custom-avatar">🤖</div>' },
      })
      expect(wrapper.find('.custom-avatar').exists()).toBe(true)
    })
  })

  // ========================================================================
  // Acessibilidade
  // ========================================================================

  describe('acessibilidade', () => {
    it('gera aria-label com nome do remetente', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', senderName: 'Ana', timestamp: '10:00' },
      })
      const label = wrapper.attributes('aria-label')
      expect(label).toContain('Ana')
      expect(label).toContain('10:00')
    })

    it('metadados têm aria-hidden="true"', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', timestamp: '10:00', status: 'sent', isMine: true },
      })
      const meta = wrapper.find('.dss-chat-message__meta')
      expect(meta.attributes('aria-hidden')).toBe('true')
    })

    it('gera aria-label "Mensagem enviada" para isMine sem senderName', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', isMine: true },
      })
      expect(wrapper.attributes('aria-label')).toContain('Mensagem enviada')
    })

    it('inclui status no aria-label', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste', isMine: true, status: 'error' },
      })
      expect(wrapper.attributes('aria-label')).toContain('erro no envio')
    })
  })

  // ========================================================================
  // Forwarding ($attrs)
  // ========================================================================

  describe('forwarding de atributos', () => {
    it('repassa data-* para o elemento raiz', () => {
      const wrapper = mount(DssChatMessage, {
        props: { message: 'Teste' },
        attrs: { 'data-testid': 'minha-mensagem' },
      })
      expect(wrapper.attributes('data-testid')).toBe('minha-mensagem')
    })
  })
})
