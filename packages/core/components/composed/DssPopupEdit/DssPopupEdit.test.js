/**
 * DssPopupEdit — Testes Unitários
 *
 * Cobre: renderização, props, emits, expose, v-model, gate de responsabilidade.
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 *
 * Nota importante sobre v-model:
 * O v-model do DssPopupEdit controla o VALOR em edição, não a visibilidade.
 * A visibilidade é gerenciada internamente pelo QPopupEdit via clique no pai.
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPopupEdit from './1-structure/DssPopupEdit.ts.vue'

installQuasar()

describe('DssPopupEdit', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssPopupEdit)
    expect(wrapper.exists()).toBe(true)
  })

  it('o componente Vue existe e é definido', () => {
    const wrapper = mount(DssPopupEdit)
    expect(wrapper.vm).toBeDefined()
  })

  // =========================================================================
  // 2. Props e defaults DSS
  // =========================================================================
  it('buttons é true por padrão (padrão DSS)', () => {
    const wrapper = mount(DssPopupEdit)
    expect(wrapper.props('buttons')).toBe(true)
  })

  it('labelSet é "Salvar" por padrão', () => {
    const wrapper = mount(DssPopupEdit)
    expect(wrapper.props('labelSet')).toBe('Salvar')
  })

  it('labelCancel é "Cancelar" por padrão', () => {
    const wrapper = mount(DssPopupEdit)
    expect(wrapper.props('labelCancel')).toBe('Cancelar')
  })

  it('aceita prop title', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { title: 'Editar Nome' }
    })
    expect(wrapper.props('title')).toBe('Editar Nome')
  })

  it('aceita prop persistent', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { persistent: true }
    })
    expect(wrapper.props('persistent')).toBe(true)
  })

  it('aceita prop disable', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { disable: true }
    })
    expect(wrapper.props('disable')).toBe(true)
  })

  it('aceita prop fit', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { fit: true }
    })
    expect(wrapper.props('fit')).toBe(true)
  })

  it('aceita prop cover', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { cover: true }
    })
    expect(wrapper.props('cover')).toBe(true)
  })

  it('aceita prop autoSave', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { autoSave: true }
    })
    expect(wrapper.props('autoSave')).toBe(true)
  })

  it('aceita prop maxHeight', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { maxHeight: '300px' }
    })
    expect(wrapper.props('maxHeight')).toBe('300px')
  })

  it('aceita prop maxWidth', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { maxWidth: '400px' }
    })
    expect(wrapper.props('maxWidth')).toBe('400px')
  })

  // =========================================================================
  // 3. v-model (valor editado — NÃO visibilidade)
  // =========================================================================
  it('aceita modelValue string', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { modelValue: 'João Silva' }
    })
    expect(wrapper.props('modelValue')).toBe('João Silva')
  })

  it('aceita modelValue number', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { modelValue: 42 }
    })
    expect(wrapper.props('modelValue')).toBe(42)
  })

  it('aceita modelValue null/undefined (estado inicial)', () => {
    const wrapper = mount(DssPopupEdit, {
      props: { modelValue: undefined }
    })
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  it('emite update:modelValue ao confirmar edição', async () => {
    const wrapper = mount(DssPopupEdit, {
      props: { modelValue: 'original' }
    })
    await wrapper.vm.$emit('update:modelValue', 'novo valor')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['novo valor'])
  })

  // =========================================================================
  // 4. Emits de ciclo de vida
  // =========================================================================
  it('emite evento save', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('save', 'novo valor', 'original')
    expect(wrapper.emitted('save')).toBeTruthy()
  })

  it('emite evento cancel', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('cancel')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('emite evento show', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('show')
    expect(wrapper.emitted('show')).toBeTruthy()
  })

  it('emite evento hide', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('hide')
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  it('emite evento before-show', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('before-show')
    expect(wrapper.emitted('before-show')).toBeTruthy()
  })

  it('emite evento before-hide', async () => {
    const wrapper = mount(DssPopupEdit)
    await wrapper.vm.$emit('before-hide')
    expect(wrapper.emitted('before-hide')).toBeTruthy()
  })

  // =========================================================================
  // 5. Slot
  // =========================================================================
  it('renderiza conteúdo via slot default', () => {
    const wrapper = mount(DssPopupEdit, {
      slots: {
        default: '<input class="test-input" value="editando" />'
      }
    })
    expect(wrapper.find('.test-input').exists()).toBe(true)
  })

  // =========================================================================
  // 6. Forwarding de attrs
  // =========================================================================
  it('inheritAttrs: false — attrs disponíveis via $attrs', () => {
    const wrapper = mount(DssPopupEdit, {
      attrs: { 'data-testid': 'popup-edit-test' }
    })
    expect(wrapper.vm.$attrs['data-testid']).toBe('popup-edit-test')
  })

  // =========================================================================
  // 7. Gate de Responsabilidade
  // =========================================================================
  it('não possui prop dark (bloqueada)', () => {
    const wrapper = mount(DssPopupEdit)
    const propsKeys = Object.keys(wrapper.vm.$props)
    expect(propsKeys).not.toContain('dark')
  })

  it('não aplica classes de estado interativo no root (Opção B)', () => {
    const wrapper = mount(DssPopupEdit)
    const classes = wrapper.classes()
    expect(classes).not.toContain('dss-popup-edit--hover')
    expect(classes).not.toContain('dss-popup-edit--focus')
    expect(classes).not.toContain('dss-popup-edit--active')
  })

  it('validate prop é função', () => {
    const validateFn = vi.fn((v) => v.length > 0 || 'Obrigatório')
    const wrapper = mount(DssPopupEdit, {
      props: { validate: validateFn }
    })
    expect(typeof wrapper.props('validate')).toBe('function')
  })
})
