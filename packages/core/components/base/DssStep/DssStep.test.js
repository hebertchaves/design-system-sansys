/**
 * ==========================================================================
 * DssStep — Testes unitários
 * ==========================================================================
 *
 * Golden Reference: DssTab
 * Golden Context: DssTabs
 *
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssStep from './DssStep.vue'

// Mock do QStep do Quasar para ambiente de teste
const QStepStub = {
  name: 'QStep',
  template: '<div class="q-step" v-bind="$attrs"><slot /></div>',
  props: ['name', 'title', 'caption', 'icon', 'activeIcon', 'doneIcon', 'errorIcon', 'done', 'error', 'disable', 'headerNav']
}

const globalConfig = {
  global: {
    stubs: { QStep: QStepStub }
  }
}

// --------------------------------------------------------------------------
// Testes de Estrutura
// --------------------------------------------------------------------------
describe('DssStep — Estrutura', () => {
  it('renderiza com classe base dss-step', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step')
  })

  it('aplica a prop name corretamente', () => {
    const wrapper = mount(DssStep, {
      props: { name: 'step-1' },
      ...globalConfig
    })
    // Nome é passado ao QStep via props
    expect(wrapper.findComponent({ name: 'QStep' }).props('name')).toBe('step-1')
  })

  it('renderiza slot default quando fornecido', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      slots: { default: '<p class="step-content">Conteúdo</p>' },
      ...globalConfig
    })
    expect(wrapper.find('.step-content').exists()).toBe(true)
  })
})

// --------------------------------------------------------------------------
// Testes de Classes CSS
// --------------------------------------------------------------------------
describe('DssStep — Classes CSS', () => {
  it('adiciona dss-step--done quando done=true', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, done: true },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--done')
  })

  it('adiciona dss-step--error quando error=true', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, error: true },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--error')
  })

  it('adiciona dss-step--disable quando disable=true', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, disable: true },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--disable')
  })

  it('adiciona dss-step--has-icon quando icon é fornecido', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, icon: 'home' },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--has-icon')
  })

  it('adiciona dss-step--has-caption quando caption é fornecido', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, caption: 'Subtítulo' },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--has-caption')
  })

  it('adiciona dss-step--header-nav quando headerNav=true', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, headerNav: true },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).toContain('dss-step--header-nav')
  })

  it('NÃO adiciona dss-step--done quando done=false (padrão)', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).not.toContain('dss-step--done')
  })

  it('NÃO adiciona dss-step--error quando error=false (padrão)', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.find('.q-step').classes()).not.toContain('dss-step--error')
  })
})

// --------------------------------------------------------------------------
// Testes de Props para QStep
// --------------------------------------------------------------------------
describe('DssStep — Forwarding de props para QStep', () => {
  it('passa title para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, title: 'Meu Passo' },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('title')).toBe('Meu Passo')
  })

  it('passa caption para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, caption: 'Subtítulo' },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('caption')).toBe('Subtítulo')
  })

  it('passa done=true para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, done: true },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('done')).toBe(true)
  })

  it('passa error=true para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, error: true },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('error')).toBe(true)
  })

  it('passa disable=true para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, disable: true },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('disable')).toBe(true)
  })

  it('passa headerNav=true para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1, headerNav: true },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('headerNav')).toBe(true)
  })

  it('passa icon, doneIcon e errorIcon para o QStep', () => {
    const wrapper = mount(DssStep, {
      props: {
        name: 1,
        icon: 'home',
        doneIcon: 'check_circle',
        errorIcon: 'error'
      },
      ...globalConfig
    })
    const qStepProps = wrapper.findComponent({ name: 'QStep' }).props()
    expect(qStepProps.icon).toBe('home')
    expect(qStepProps.doneIcon).toBe('check_circle')
    expect(qStepProps.errorIcon).toBe('error')
  })
})

// --------------------------------------------------------------------------
// Testes de Valores Padrão
// --------------------------------------------------------------------------
describe('DssStep — Valores padrão', () => {
  it('done é false por padrão', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('done')).toBe(false)
  })

  it('error é false por padrão', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('error')).toBe(false)
  })

  it('disable é false por padrão', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('disable')).toBe(false)
  })

  it('headerNav é false por padrão', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    expect(wrapper.findComponent({ name: 'QStep' }).props('headerNav')).toBe(false)
  })
})

// --------------------------------------------------------------------------
// Testes de Composable: useStepClasses
// --------------------------------------------------------------------------
describe('useStepClasses — Lógica de classes', () => {
  it('retorna apenas dss-step quando nenhuma prop de estado está ativa', () => {
    const wrapper = mount(DssStep, {
      props: { name: 1 },
      ...globalConfig
    })
    const classes = wrapper.find('.q-step').classes()
    expect(classes).toContain('dss-step')
    expect(classes).not.toContain('dss-step--done')
    expect(classes).not.toContain('dss-step--error')
    expect(classes).not.toContain('dss-step--disable')
    expect(classes).not.toContain('dss-step--has-icon')
    expect(classes).not.toContain('dss-step--has-caption')
    expect(classes).not.toContain('dss-step--header-nav')
  })

  it('combina múltiplas classes corretamente (done + has-icon + has-caption)', () => {
    const wrapper = mount(DssStep, {
      props: {
        name: 1,
        done: true,
        icon: 'check',
        caption: 'Concluído com sucesso'
      },
      ...globalConfig
    })
    const classes = wrapper.find('.q-step').classes()
    expect(classes).toContain('dss-step--done')
    expect(classes).toContain('dss-step--has-icon')
    expect(classes).toContain('dss-step--has-caption')
  })
})
