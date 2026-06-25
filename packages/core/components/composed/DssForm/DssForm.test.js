import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { QForm } from 'quasar'
import DssForm from './DssForm.vue'

installQuasarPlugin({ components: { QForm } })

// ==========================================================================
// Helpers
// ==========================================================================

function mountForm(props = {}, slots = {}) {
  return mount(DssForm, {
    props,
    slots: {
      default: slots.default ?? '<div data-testid="slot-content">Campo</div>'
    },
    global: {
      stubs: {}
    }
  })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssForm — Renderização Base', () => {
  it('renderiza um elemento <form> nativo', () => {
    const wrapper = mountForm()
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('aplica a classe dss-form no <form>', () => {
    const wrapper = mountForm()
    expect(wrapper.find('form').classes()).toContain('dss-form')
  })

  it('aplica a classe q-form no <form> (motor QForm)', () => {
    const wrapper = mountForm()
    expect(wrapper.find('form').classes()).toContain('q-form')
  })

  it('renderiza o slot default', () => {
    const wrapper = mountForm()
    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true)
  })

  it('renderiza múltiplos filhos no slot default', () => {
    const wrapper = mount(DssForm, {
      slots: {
        default: `
          <input data-testid="field-1" />
          <input data-testid="field-2" />
        `
      }
    })
    expect(wrapper.find('[data-testid="field-1"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="field-2"]').exists()).toBe(true)
  })

  it('tem name DssForm definido via defineOptions', () => {
    const wrapper = mountForm()
    expect(wrapper.vm.$options.name).toBe('DssForm')
  })
})

// ==========================================================================
// 2. PROPS
// ==========================================================================

describe('DssForm — Props', () => {
  describe('autofocus', () => {
    it('não aplica autofocus por padrão', () => {
      const wrapper = mountForm()
      expect(wrapper.find('form').attributes('autofocus')).toBeUndefined()
    })

    it('repassa autofocus=true ao QForm quando definido', () => {
      const wrapper = mountForm({ autofocus: true })
      // QForm gerencia o atributo internamente
      expect(wrapper.props('autofocus')).toBe(true)
    })
  })

  describe('greedy', () => {
    it('não ativa greedy por padrão', () => {
      const wrapper = mountForm()
      // prop boolean declarada: default do Vue é false (não undefined)
      expect(wrapper.props('greedy')).toBe(false)
    })

    it('repassa greedy=true ao QForm quando definido', () => {
      const wrapper = mountForm({ greedy: true })
      expect(wrapper.props('greedy')).toBe(true)
    })
  })

  describe('noErrorFocus', () => {
    it('não ativa noErrorFocus por padrão', () => {
      const wrapper = mountForm()
      expect(wrapper.props('noErrorFocus')).toBe(false)
    })

    it('repassa noErrorFocus=true ao QForm quando definido', () => {
      const wrapper = mountForm({ noErrorFocus: true })
      expect(wrapper.props('noErrorFocus')).toBe(true)
    })
  })
})

// ==========================================================================
// 3. ATTRS FORWARDING (inheritAttrs: false + v-bind="$attrs")
// ==========================================================================

describe('DssForm — Attrs Forwarding', () => {
  it('repassa id ao elemento <form>', async () => {
    const wrapper = mount(DssForm, {
      attrs: { id: 'my-form' },
      slots: { default: '<div />' }
    })
    expect(wrapper.find('form').attributes('id')).toBe('my-form')
  })

  it('repassa aria-label ao elemento <form>', async () => {
    const wrapper = mount(DssForm, {
      attrs: { 'aria-label': 'Formulário de contato' },
      slots: { default: '<div />' }
    })
    expect(wrapper.find('form').attributes('aria-label')).toBe('Formulário de contato')
  })

  it('repassa data-testid ao elemento <form>', async () => {
    const wrapper = mount(DssForm, {
      attrs: { 'data-testid': 'contact-form' },
      slots: { default: '<div />' }
    })
    expect(wrapper.find('form').attributes('data-testid')).toBe('contact-form')
  })
})

// ==========================================================================
// 4. EMITS
// ==========================================================================

describe('DssForm — Emits', () => {
  it('emite submit quando o formulário é enviado', async () => {
    const wrapper = mountForm()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('emite reset quando o formulário é resetado', async () => {
    const wrapper = mountForm()
    await wrapper.find('form').trigger('reset')
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })

  it('o evento submit inclui o SubmitEvent como payload', async () => {
    const wrapper = mountForm()
    await wrapper.find('form').trigger('submit')
    const [event] = wrapper.emitted('submit')[0]
    expect(event).toBeInstanceOf(Event)
  })

  it('reemite reset do QForm (sem payload — QForm é () => void)', async () => {
    const wrapper = mountForm()
    // O QForm emite 'reset' pelo seu pipeline interno (resetValidation),
    // não pelo evento DOM nativo, e SEM payload — exercitamos o forwarding.
    wrapper.findComponent(QForm).vm.$emit('reset')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('reset')).toBeTruthy()
    expect(wrapper.emitted('reset')[0]).toEqual([])
  })

  it('emite validationError encaminhando a ref do componente do QForm', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    // O QForm fornece APENAS a ref do primeiro componente inválido (1 arg).
    const mockRef = { type: 'DssInput' }
    qFormInstance.$emit('validation-error', mockRef)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('validationError')).toBeTruthy()
    const [ref] = wrapper.emitted('validationError')[0]
    expect(ref).toBe(mockRef)
  })

  it('emite validationSuccess quando QForm dispara validation-success', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    // Simula o evento de validation-success emitido pelo QForm internamente
    qFormInstance.$emit('validation-success')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('validationSuccess')).toBeTruthy()
  })
})

// ==========================================================================
// 5. DEFINEEXPOSE — API Imperativa (EXC-Expose-01)
// ==========================================================================

describe('DssForm — defineExpose (API Imperativa)', () => {
  it('expõe o método validate', () => {
    const wrapper = mountForm()
    expect(typeof wrapper.vm.validate).toBe('function')
  })

  it('expõe o método resetValidation', () => {
    const wrapper = mountForm()
    expect(typeof wrapper.vm.resetValidation).toBe('function')
  })

  it('expõe o método submit', () => {
    const wrapper = mountForm()
    expect(typeof wrapper.vm.submit).toBe('function')
  })

  it('expõe o método reset', () => {
    const wrapper = mountForm()
    expect(typeof wrapper.vm.reset).toBe('function')
  })

  it('validate delega ao QForm interno', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    const validateSpy = vi.spyOn(qFormInstance, 'validate').mockResolvedValue(true)

    await wrapper.vm.validate()
    expect(validateSpy).toHaveBeenCalled()
  })

  it('resetValidation delega ao QForm interno', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    const spy = vi.spyOn(qFormInstance, 'resetValidation').mockImplementation(() => {})

    wrapper.vm.resetValidation()
    expect(spy).toHaveBeenCalled()
  })

  it('submit delega ao QForm interno', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    const spy = vi.spyOn(qFormInstance, 'submit').mockImplementation(() => {})

    wrapper.vm.submit()
    expect(spy).toHaveBeenCalled()
  })

  it('reset delega ao QForm interno', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    const spy = vi.spyOn(qFormInstance, 'reset').mockImplementation(() => {})

    wrapper.vm.reset()
    expect(spy).toHaveBeenCalled()
  })

  it('validate retorna Promise<boolean>', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    vi.spyOn(qFormInstance, 'validate').mockResolvedValue(true)

    const result = await wrapper.vm.validate()
    expect(result).toBe(true)
  })

  it('validate com shouldFocus=false delega o parâmetro', async () => {
    const wrapper = mountForm()
    const qFormInstance = wrapper.findComponent(QForm).vm
    const validateSpy = vi.spyOn(qFormInstance, 'validate').mockResolvedValue(false)

    await wrapper.vm.validate(false)
    expect(validateSpy).toHaveBeenCalledWith(false)
  })
})

// ==========================================================================
// 6. GATE DE RESPONSABILIDADE — Sem lógica de negócio
// ==========================================================================

describe('DssForm — Gate de Responsabilidade', () => {
  it('não renderiza elementos visuais além do <form>', () => {
    const wrapper = mountForm()
    const form = wrapper.find('form')
    // Apenas o slot content deve estar dentro do form
    expect(form.find('[data-testid="slot-content"]').exists()).toBe(true)
    // Não deve ter botões, ícones, labels próprios do componente
    expect(form.find('button').exists()).toBe(false)
    expect(form.find('label').exists()).toBe(false)
    expect(form.find('input').exists()).toBe(false)
  })

  it('não possui estados hover, focus ou active no root', () => {
    const wrapper = mountForm()
    const formClasses = wrapper.find('form').classes()
    // DssForm não deve adicionar classes de estado interativo
    expect(formClasses.some(c => c.includes('hover'))).toBe(false)
    expect(formClasses.some(c => c.includes('focus'))).toBe(false)
    expect(formClasses.some(c => c.includes('active'))).toBe(false)
  })
})

// ==========================================================================
// 7. CSS CLASS — Composição de Classes
// ==========================================================================

describe('DssForm — CSS Classes', () => {
  it('compound class .q-form.dss-form é aplicada', () => {
    const wrapper = mountForm()
    const form = wrapper.find('form')
    expect(form.classes()).toContain('q-form')
    expect(form.classes()).toContain('dss-form')
  })

  it('não adiciona classes de variante sem props correspondentes', () => {
    const wrapper = mountForm()
    const classes = wrapper.find('form').classes()
    expect(classes).not.toContain('dss-form--greedy')
    expect(classes).not.toContain('dss-form--autofocus')
  })
})
