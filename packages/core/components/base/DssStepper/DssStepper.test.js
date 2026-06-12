/**
 * ==========================================================================
 * DssStepper — UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base: div raiz com classe dss-stepper
 * - Props: modelValue, vertical, flat, bordered, animated, headerNav, brand, ariaLabel
 * - Classes BEM: --vertical, --horizontal, --flat, --bordered, --brand-*
 * - Modo padrão horizontal (vertical=false → dss-stepper--horizontal)
 * - data-brand no elemento raiz para cascade CSS nos DssStep filhos
 * - Evento: update:modelValue
 * - Slots: default e message
 * - Props bloqueadas: dark, color, active-color, done-color, error-color, inactive-color
 * - Forwarding de $attrs
 * - ARIA: aria-label via q-stepper interno
 *
 * NOTA: DssStepper usa <div> como root (Gate de Composição v2.4 — conforme).
 * O <q-stepper> interno gerencia state management e keyboard navigation.
 * Apenas o que o DSS adiciona é testado.
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js
 * GOLDEN CONTEXT: DssTabs.test.js (mesmo padrão div wrapper + Quasar interno)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssStepper from './1-structure/DssStepper.ts.vue'
import { h } from 'vue'
import { QStep } from 'quasar'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountStepper(props = {}, slots = {}) {
  return mount(DssStepper, { props, slots })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssStepper — Renderização base', () => {
  it('renderiza com a classe base dss-stepper', () => {
    const wrapper = mountStepper()
    expect(wrapper.classes()).toContain('dss-stepper')
  })

  it('renderiza o elemento raiz como <div>', () => {
    const wrapper = mountStepper()
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('aplica dss-stepper--horizontal por padrão (vertical=false)', () => {
    const wrapper = mountStepper()
    expect(wrapper.classes()).toContain('dss-stepper--horizontal')
    expect(wrapper.classes()).not.toContain('dss-stepper--vertical')
  })

  it('não aplica modificadores opcionais por padrão', () => {
    const wrapper = mountStepper()
    expect(wrapper.classes()).not.toContain('dss-stepper--flat')
    expect(wrapper.classes()).not.toContain('dss-stepper--bordered')
    expect(wrapper.classes().some(c => c.startsWith('dss-stepper--brand-'))).toBe(false)
  })
})

// ==========================================================================
// 2. PROP: vertical
// ==========================================================================

describe('DssStepper — Prop vertical', () => {
  it('aplica dss-stepper--vertical quando vertical=true', () => {
    const wrapper = mountStepper({ vertical: true })
    expect(wrapper.classes()).toContain('dss-stepper--vertical')
  })

  it('não aplica dss-stepper--horizontal quando vertical=true', () => {
    const wrapper = mountStepper({ vertical: true })
    expect(wrapper.classes()).not.toContain('dss-stepper--horizontal')
  })

  it('aplica dss-stepper--horizontal quando vertical=false', () => {
    const wrapper = mountStepper({ vertical: false })
    expect(wrapper.classes()).toContain('dss-stepper--horizontal')
    expect(wrapper.classes()).not.toContain('dss-stepper--vertical')
  })
})

// ==========================================================================
// 3. PROP: flat
// ==========================================================================

describe('DssStepper — Prop flat', () => {
  it('aplica dss-stepper--flat quando flat=true', () => {
    const wrapper = mountStepper({ flat: true })
    expect(wrapper.classes()).toContain('dss-stepper--flat')
  })

  it('não aplica dss-stepper--flat quando flat=false', () => {
    const wrapper = mountStepper({ flat: false })
    expect(wrapper.classes()).not.toContain('dss-stepper--flat')
  })
})

// ==========================================================================
// 4. PROP: bordered
// ==========================================================================

describe('DssStepper — Prop bordered', () => {
  it('aplica dss-stepper--bordered quando bordered=true', () => {
    const wrapper = mountStepper({ bordered: true })
    expect(wrapper.classes()).toContain('dss-stepper--bordered')
  })

  it('não aplica dss-stepper--bordered quando bordered=false', () => {
    const wrapper = mountStepper({ bordered: false })
    expect(wrapper.classes()).not.toContain('dss-stepper--bordered')
  })
})

// ==========================================================================
// 5. PROP: brand + data-brand
// ==========================================================================

describe('DssStepper — Prop brand', () => {
  it.each(['hub', 'water', 'waste'])(
    'define data-brand="%s" e aplica dss-stepper--brand-%s quando brand="%s"',
    (brand) => {
      const wrapper = mountStepper({ brand })
      expect(wrapper.attributes('data-brand')).toBe(brand)
      expect(wrapper.classes()).toContain(`dss-stepper--brand-${brand}`)
    }
  )

  it('não define data-brand quando brand não é fornecido', () => {
    const wrapper = mountStepper()
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })

  it('não define data-brand quando brand=null', () => {
    const wrapper = mountStepper({ brand: null })
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })
})

// ==========================================================================
// 6. PROP: modelValue
// ==========================================================================

describe('DssStepper — Prop modelValue', () => {
  it('aceita modelValue como string sem erro', () => {
    const wrapper = mountStepper({ modelValue: 'passo-1' })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita modelValue como número sem erro', () => {
    const wrapper = mountStepper({ modelValue: 1 })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza sem modelValue (undefined padrão)', () => {
    const wrapper = mountStepper()
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 7. EVENTO: update:modelValue
// ==========================================================================

describe('DssStepper — Evento update:modelValue', () => {
  it('emite update:modelValue quando QStepper emite', async () => {
    const wrapper = mountStepper({ modelValue: 'passo-1' })
    const qStepper = wrapper.findComponent({ name: 'QStepper' })
    expect(qStepper.exists()).toBe(true)
    await qStepper.vm.$emit('update:modelValue', 'passo-2')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['passo-2'])
  })

  it('emite update:modelValue com valor numérico', async () => {
    const wrapper = mountStepper({ modelValue: 1 })
    const qStepper = wrapper.findComponent({ name: 'QStepper' })
    await qStepper.vm.$emit('update:modelValue', 2)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([2])
  })
})

// ==========================================================================
// 8. PROPS: animated e headerNav
// ==========================================================================

describe('DssStepper — Props animated e headerNav', () => {
  it('aceita animated=true sem erro', () => {
    const wrapper = mountStepper({ animated: true })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita headerNav=true sem erro', () => {
    const wrapper = mountStepper({ headerNav: true })
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 9. PROP: ariaLabel
// ==========================================================================

describe('DssStepper — Prop ariaLabel', () => {
  it('passa aria-label para o QStepper interno quando ariaLabel é fornecido', () => {
    const wrapper = mountStepper({ ariaLabel: 'Processo de cadastro' })
    const qStepper = wrapper.findComponent({ name: 'QStepper' })
    expect(qStepper.exists()).toBe(true)
    // Verifica que a prop chegou ao QStepper
    expect(wrapper.html()).toContain('aria-label')
  })

  it('não define aria-label quando ariaLabel não é fornecido', () => {
    const wrapper = mountStepper()
    const qStepper = wrapper.findComponent({ name: 'QStepper' })
    // aria-label undefined não deve aparecer como atributo
    expect(qStepper.attributes('aria-label')).toBeUndefined()
  })
})

// ==========================================================================
// 10. SLOTS
// ==========================================================================

describe('DssStepper — Slots', () => {
  it('renderiza conteúdo no slot default', () => {
    // O QStepper renderiza apenas filhos QStep — conteúdo solto é descartado
    const wrapper = mountStepper(
      { modelValue: 's1' },
      { default: () => h(QStep, { name: 's1', title: 'Passo 1' }, () => h('div', { class: 'step-content' }, 'Passo')) }
    )
    expect(wrapper.find('.step-content').exists()).toBe(true)
  })

  it('renderiza slot message quando fornecido', () => {
    const wrapper = mountStepper(
      {},
      { message: '<div class="message-content">Mensagem global</div>' }
    )
    expect(wrapper.find('.message-content').exists()).toBe(true)
  })
})

// ==========================================================================
// 11. CLASSES COMPOSTAS
// ==========================================================================

describe('DssStepper — Classes compostas', () => {
  it('aplica flat e bordered simultaneamente sem conflito', () => {
    const wrapper = mountStepper({ flat: true, bordered: true })
    expect(wrapper.classes()).toContain('dss-stepper--flat')
    expect(wrapper.classes()).toContain('dss-stepper--bordered')
  })

  it('aplica brand e vertical simultaneamente', () => {
    const wrapper = mountStepper({ brand: 'hub', vertical: true })
    expect(wrapper.classes()).toContain('dss-stepper--brand-hub')
    expect(wrapper.classes()).toContain('dss-stepper--vertical')
    expect(wrapper.attributes('data-brand')).toBe('hub')
  })
})

// ==========================================================================
// 12. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssStepper — Forwarding de $attrs', () => {
  it('encaminha data-testid para o elemento raiz', () => {
    const wrapper = mount(DssStepper, {
      attrs: { 'data-testid': 'checkout-stepper' }
    })
    expect(wrapper.attributes('data-testid')).toBe('checkout-stepper')
  })
})

// ==========================================================================
// 13. NOME DO COMPONENTE
// ==========================================================================

describe('DssStepper — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountStepper()
    expect(wrapper.vm.$options.name).toBe('DssStepper')
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssStepper — Teclado (WCAG 2.1.1)', () => {
  it('LIMITAÇÃO DO MOTOR: cabeçalhos do QStepper não recebem foco nativo', () => {
    // O QStepper renderiza os cabeçalhos como divs clicáveis SEM tabindex —
    // navegação por teclado entre etapas não é provida pelo motor (alerta
    // WCAG 2.1.1 registrado; este teste trava o contrato para sinalizar
    // qualquer mudança futura do Quasar).
    const wrapper = mountStepper(
      { modelValue: 's1' },
      { default: () => [
        h(QStep, { name: 's1', title: 'Etapa 1' }, () => 'a'),
        h(QStep, { name: 's2', title: 'Etapa 2' }, () => 'b'),
      ] }
    )
    const headers = wrapper.findAll('.q-stepper__tab')
    expect(headers.length).toBe(2)
    expect(headers.every(t => t.attributes('tabindex') === undefined)).toBe(true)
  })
})
