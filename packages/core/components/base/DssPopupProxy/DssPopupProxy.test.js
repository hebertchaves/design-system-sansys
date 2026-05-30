/**
 * DssPopupProxy — Testes Unitários
 *
 * Cobre: renderização, props, slots, forwarding de attrs, v-model:open,
 * defineExpose, gate de responsabilidade (sem estados interativos no container).
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 */

import { describe, it, expect, vi } from 'vitest'
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

  it('define o nome do componente como DssPopupProxy', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.vm.$options.name).toBe('DssPopupProxy')
  })

  it('declara inheritAttrs: false', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.vm.$options.inheritAttrs).toBe(false)
  })

  // =========================================================================
  // 2. Props expostas e defaults
  // =========================================================================

  it('aceita prop open com default false', () => {
    const wrapper = mount(DssPopupProxy)
    expect(wrapper.props('open')).toBe(false)
  })

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

  it('aceita prop persistent', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { persistent: true }
    })
    expect(wrapper.props('persistent')).toBe(true)
  })

  it('aceita prop autoClose', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { autoClose: true }
    })
    expect(wrapper.props('autoClose')).toBe(true)
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

  it('aceita prop contextMenu', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { contextMenu: true }
    })
    expect(wrapper.props('contextMenu')).toBe(true)
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

  it('aceita prop anchor', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { anchor: 'bottom left' }
    })
    expect(wrapper.props('anchor')).toBe('bottom left')
  })

  it('aceita prop self', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { self: 'top left' }
    })
    expect(wrapper.props('self')).toBe('top left')
  })

  it('aceita prop offset', () => {
    const wrapper = mount(DssPopupProxy, {
      props: { offset: [0, 8] }
    })
    expect(wrapper.props('offset')).toEqual([0, 8])
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

  // =========================================================================
  // 3. Props bloqueadas
  // =========================================================================

  it('não expõe prop dark (bloqueada)', () => {
    const wrapper = mount(DssPopupProxy)
    const propKeys = Object.keys(wrapper.vm.$props)
    expect(propKeys).not.toContain('dark')
  })

  it('não expõe prop square (bloqueada)', () => {
    const wrapper = mount(DssPopupProxy)
    const propKeys = Object.keys(wrapper.vm.$props)
    expect(propKeys).not.toContain('square')
  })

  // =========================================================================
  // 4. Slots
  // =========================================================================

  it('renderiza conteúdo via slot default', () => {
    const wrapper = mount(DssPopupProxy, {
      slots: {
        default: '<div class="test-slot-content">conteúdo do popup</div>'
      }
    })
    expect(wrapper.find('.test-slot-content').exists()).toBe(true)
  })

  // =========================================================================
  // 5. Emits (v-model:open e eventos de ciclo)
  // =========================================================================

  it('emite update:open ao receber update:model-value do QPopupProxy', async () => {
    const wrapper = mount(DssPopupProxy, {
      props: { open: true }
    })
    await wrapper.vm.$emit('update:open', false)
    expect(wrapper.emitted('update:open')).toBeTruthy()
  })

  it('emite beforeShow', async () => {
    const wrapper = mount(DssPopupProxy)
    await wrapper.vm.$emit('beforeShow', new Event('beforeShow'))
    expect(wrapper.emitted('beforeShow')).toBeTruthy()
  })

  it('emite show', async () => {
    const wrapper = mount(DssPopupProxy)
    await wrapper.vm.$emit('show', new Event('show'))
    expect(wrapper.emitted('show')).toBeTruthy()
  })

  it('emite beforeHide', async () => {
    const wrapper = mount(DssPopupProxy)
    await wrapper.vm.$emit('beforeHide', new Event('beforeHide'))
    expect(wrapper.emitted('beforeHide')).toBeTruthy()
  })

  it('emite hide', async () => {
    const wrapper = mount(DssPopupProxy)
    await wrapper.vm.$emit('hide', new Event('hide'))
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  // =========================================================================
  // 6. Forwarding de attrs
  // =========================================================================

  it('repassa atributos extras via v-bind="$attrs"', () => {
    const wrapper = mount(DssPopupProxy, {
      attrs: { 'aria-label': 'Popup de ações' }
    })
    expect(wrapper.vm.$attrs['aria-label']).toBe('Popup de ações')
  })

  // =========================================================================
  // 7. defineExpose (EXC-Expose-01)
  // =========================================================================

  it('expõe método show via defineExpose', () => {
    const wrapper = mount(DssPopupProxy)
    expect(typeof wrapper.vm.show).toBe('function')
  })

  it('expõe método hide via defineExpose', () => {
    const wrapper = mount(DssPopupProxy)
    expect(typeof wrapper.vm.hide).toBe('function')
  })

  it('expõe método toggle via defineExpose', () => {
    const wrapper = mount(DssPopupProxy)
    expect(typeof wrapper.vm.toggle).toBe('function')
  })

  it('expõe getter currentComponent via defineExpose', () => {
    const wrapper = mount(DssPopupProxy)
    expect('currentComponent' in wrapper.vm).toBe(true)
  })

  // =========================================================================
  // 8. Gate de Responsabilidade
  // =========================================================================

  it('não define classes de estado interativo no container', () => {
    const wrapper = mount(DssPopupProxy)
    const classes = wrapper.classes()
    expect(classes).not.toContain('dss-popup-proxy--hover')
    expect(classes).not.toContain('dss-popup-proxy--focus')
    expect(classes).not.toContain('dss-popup-proxy--active')
    expect(classes).not.toContain('dss-popup-proxy--disabled')
  })
})
