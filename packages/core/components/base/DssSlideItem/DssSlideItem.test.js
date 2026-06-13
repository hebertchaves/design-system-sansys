import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSlideItem from './DssSlideItem.vue'

installQuasarPlugin()

describe('DssSlideItem', () => {
  // --- Renderização base ---
  it('renderiza sem erros com props padrão', () => {
    const wrapper = mount(DssSlideItem, {
      slots: { default: '<div>Conteúdo</div>' },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.q-slide-item').exists()).toBe(true)
  })

  it('aplica classe dss-slide-item ao root', () => {
    const wrapper = mount(DssSlideItem, {
      slots: { default: '<div>Conteúdo</div>' },
    })
    expect(wrapper.find('.dss-slide-item').exists()).toBe(true)
  })

  // --- Props ---
  it('aplica classe dss-slide-item--disabled quando disable=true', () => {
    const wrapper = mount(DssSlideItem, {
      props: { disable: true },
      slots: { default: '<div>Conteúdo</div>' },
    })
    // Classe presente para uso futuro e identificação de estado
    expect(wrapper.find('.dss-slide-item--disabled').exists()).toBe(true)
  })

  it('não aplica pointer-events: none no conteúdo quando disabled (Gate de Responsabilidade)', () => {
    const wrapper = mount(DssSlideItem, {
      props: { disable: true },
      slots: { default: '<div>Conteúdo</div>' },
    })
    // O disable é gerenciado pelo QSlideItem — sem override CSS no container
    const content = wrapper.find('.q-slide-item__content')
    if (content.exists()) {
      expect(content.attributes('style') || '').not.toContain('pointer-events')
    }
  })

  it('injeta --dss-slide-item-left-bg correto para leftColor="error"', () => {
    const wrapper = mount(DssSlideItem, {
      props: { leftColor: 'error' },
      slots: { default: '<div>Conteúdo</div>' },
    })
    const style = wrapper.find('.dss-slide-item').attributes('style') || ''
    expect(style).toContain('--dss-slide-item-left-bg: var(--dss-feedback-error)')
  })

  it('injeta --dss-slide-item-right-bg correto para rightColor="success"', () => {
    const wrapper = mount(DssSlideItem, {
      props: { rightColor: 'success' },
      slots: { default: '<div>Conteúdo</div>' },
    })
    const style = wrapper.find('.dss-slide-item').attributes('style') || ''
    expect(style).toContain('--dss-slide-item-right-bg: var(--dss-feedback-success)')
  })

  // --- Slots ---
  it('renderiza slot default corretamente', () => {
    const wrapper = mount(DssSlideItem, {
      slots: { default: '<span class="conteudo-principal">Principal</span>' },
    })
    expect(wrapper.find('.conteudo-principal').exists()).toBe(true)
  })

  it('renderiza slot left quando fornecido', () => {
    const wrapper = mount(DssSlideItem, {
      props: { leftColor: 'error' },
      slots: {
        default: '<div>Item</div>',
        left: '<span class="acao-esquerda">Deletar</span>',
      },
    })
    expect(wrapper.find('.acao-esquerda').exists()).toBe(true)
  })

  it('renderiza slot right quando fornecido', () => {
    const wrapper = mount(DssSlideItem, {
      props: { rightColor: 'info' },
      slots: {
        default: '<div>Item</div>',
        right: '<span class="acao-direita">Arquivar</span>',
      },
    })
    expect(wrapper.find('.acao-direita').exists()).toBe(true)
  })

  // --- Eventos ---
  it('emite evento action quando acionado', async () => {
    const wrapper = mount(DssSlideItem, {
      props: { leftColor: 'error' },
      slots: {
        default: '<div>Item</div>',
        left: '<span>Deletar</span>',
      },
    })
    const qSlideItem = wrapper.findComponent({ name: 'QSlideItem' })
    await qSlideItem.vm.$emit('action', { side: 'left', reset: vi.fn() })
    expect(wrapper.emitted('action')).toBeTruthy()
    expect(wrapper.emitted('action')[0][0].side).toBe('left')
  })

  it('emite evento slide durante deslizamento', async () => {
    const wrapper = mount(DssSlideItem, {
      slots: { default: '<div>Item</div>' },
    })
    const qSlideItem = wrapper.findComponent({ name: 'QSlideItem' })
    await qSlideItem.vm.$emit('slide', { side: 'right', ratio: 0.5, isReset: false })
    expect(wrapper.emitted('slide')).toBeTruthy()
    expect(wrapper.emitted('slide')[0][0].ratio).toBe(0.5)
  })

  // --- defineExpose ---
  it('expõe método reset via defineExpose', () => {
    const wrapper = mount(DssSlideItem, {
      slots: { default: '<div>Item</div>' },
    })
    expect(typeof wrapper.vm.reset).toBe('function')
  })

  // --- Forwarding de atributos ---
  it('repassa atributos extras para o QSlideItem via $attrs', () => {
    const wrapper = mount(DssSlideItem, {
      attrs: { 'data-testid': 'slide-item-teste' },
      slots: { default: '<div>Item</div>' },
    })
    expect(wrapper.find('[data-testid="slide-item-teste"]').exists()).toBe(true)
  })
})
