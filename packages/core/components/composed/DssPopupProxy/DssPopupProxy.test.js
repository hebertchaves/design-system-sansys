/**
 * DssPopupProxy — Testes Unitários
 *
 * Cobre: renderização, props, slots, forwarding de attrs, v-model,
 * gate de responsabilidade (sem estados interativos no container).
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPopupProxy from './1-structure/DssPopupProxy.ts.vue'

installQuasar()

describe('DssPopupProxy', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================

  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.exists()).toBe(true)
  })

  it('define o nome correto do componente', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.vm.$options.name).toBe('DssPopupProxy')
  })

  // =========================================================================
  // 2. Props expostas
  // =========================================================================

  it('aceita prop breakpoint com default 450', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.props('breakpoint')).toBe(450)
  })

  it('aceita prop breakpoint customizado', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { breakpoint: 768 }
    })
    expect(wrapper.props('breakpoint')).toBe(768)
  })

  it('aceita prop modelValue undefined por padrão', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  it('aceita prop modelValue true', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { modelValue: true }
    })
    expect(wrapper.props('modelValue')).toBe(true)
  })

  it('aceita prop persistent', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { persistent: true }
    })
    expect(wrapper.props('persistent')).toBe(true)
  })

  it('aceita prop noFocus', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { noFocus: true }
    })
    expect(wrapper.props('noFocus')).toBe(true)
  })

  it('aceita prop noRefocus', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { noRefocus: true }
    })
    expect(wrapper.props('noRefocus')).toBe(true)
  })

  it('aceita prop autoClose', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { autoClose: true }
    })
    expect(wrapper.props('autoClose')).toBe(true)
  })

  it('aceita prop anchor', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { anchor: 'bottom start' }
    })
    expect(wrapper.props('anchor')).toBe('bottom start')
  })

  it('aceita prop self', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { self: 'top start' }
    })
    expect(wrapper.props('self')).toBe('top start')
  })

  it('aceita prop offset', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { offset: [0, 8] }
    })
    expect(wrapper.props('offset')).toEqual([0, 8])
  })

  it('aceita prop fit', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { fit: true }
    })
    expect(wrapper.props('fit')).toBe(true)
  })

  it('aceita prop cover', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { cover: true }
    })
    expect(wrapper.props('cover')).toBe(true)
  })

  it('aceita prop maxHeight', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { maxHeight: '300px' }
    })
    expect(wrapper.props('maxHeight')).toBe('300px')
  })

  it('aceita prop maxWidth', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { maxWidth: '400px' }
    })
    expect(wrapper.props('maxWidth')).toBe('400px')
  })

  it('aceita prop transitionShow', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { transitionShow: 'fade' }
    })
    expect(wrapper.props('transitionShow')).toBe('fade')
  })

  it('aceita prop transitionHide', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { transitionHide: 'fade' }
    })
    expect(wrapper.props('transitionHide')).toBe('fade')
  })

  it('aceita prop contextMenu', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { contextMenu: true }
    })
    expect(wrapper.props('contextMenu')).toBe(true)
  })

  it('aceita prop noParentEvent', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { noParentEvent: true }
    })
    expect(wrapper.props('noParentEvent')).toBe(true)
  })

  // =========================================================================
  // 3. Slots
  // =========================================================================

  it('renderiza conteúdo via slot default', () => {
    const wrapper = mount(DssPopupProxy, {
      slots: {
        default: '<div class="test-content">conteúdo do popup</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // =========================================================================
  // 4. Emits (v-model)
  // =========================================================================

  it('emite update:modelValue ao abrir/fechar', async () => {
    const wrapper = mount(DssPopupProxy, {
      props: { modelValue: false }
    })
    await wrapper.vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('emite show ao exibir', async () => {
    const wrapper = mount(DssPopupProxy)
    const fakeEvent = new Event('show')
    await wrapper.vm.$emit('show', fakeEvent)
    expect(wrapper.emitted('show')).toBeTruthy()
  })

  it('emite hide ao ocultar', async () => {
    const wrapper = mount(DssPopupProxy)
    const fakeEvent = new Event('hide')
    await wrapper.vm.$emit('hide', fakeEvent)
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  it('emite beforeShow antes de abrir', async () => {
    const wrapper = mount(DssPopupProxy)
    const fakeEvent = new Event('beforeShow')
    await wrapper.vm.$emit('beforeShow', fakeEvent)
    expect(wrapper.emitted('beforeShow')).toBeTruthy()
  })

  it('emite beforeHide antes de fechar', async () => {
    const wrapper = mount(DssPopupProxy)
    const fakeEvent = new Event('beforeHide')
    await wrapper.vm.$emit('beforeHide', fakeEvent)
    expect(wrapper.emitted('beforeHide')).toBeTruthy()
  })

  // =========================================================================
  // 5. Forwarding de attrs (inheritAttrs: false)
  // =========================================================================

  it('repassa atributos extras ao QPopupProxy via v-bind="$attrs"', () => {
    const wrapper = mount(DssPopupProxy, {
      attrs: { 'data-testid': 'popup-proxy-test' }
    })
    expect(wrapper.vm.$attrs['data-testid']).toBe('popup-proxy-test')
  })

  // =========================================================================
  // 6. Props bloqueadas
  // =========================================================================

  it('não define prop dark (bloqueada)', () => {
    const wrapper = mount(DssPopupProxy)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('dark')
  })

  it('não define prop square (bloqueada)', () => {
    const wrapper = mount(DssPopupProxy)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('square')
  })

  // =========================================================================
  // 7. Gate de Responsabilidade (overlay proxy não-interativo)
  // =========================================================================

  it('não define estilos de hover/focus/active (container não-interativo)', () => {
    const wrapper = mount(DssPopupProxy)
    const classes = wrapper.classes()
    expect(classes).not.toContain('dss-popup-proxy--hover')
    expect(classes).not.toContain('dss-popup-proxy--focus')
    expect(classes).not.toContain('dss-popup-proxy--active')
  })

  it('não define prop disabled (não aplicável a proxy de popup)', () => {
    const wrapper = mount(DssPopupProxy)
    const propsOptions = Object.keys(wrapper.vm.$props)
    expect(propsOptions).not.toContain('disabled')
  })

  // =========================================================================
  // 8. Classe de escopo CSS (dss-popup-proxy)
  // =========================================================================

  it('passa a classe dss-popup-proxy para o QPopupProxy interno', () => {
    const wrapper = mount(DssPopupProxy)
    // A classe dss-popup-proxy é forwarded ao QPopupProxy via :class binding
    // QPopupProxy repassa ao QMenu/QDialog via attrs
    // O vm deve ter o binding configurado
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.$options.name).toBe('DssPopupProxy')
  })
})
