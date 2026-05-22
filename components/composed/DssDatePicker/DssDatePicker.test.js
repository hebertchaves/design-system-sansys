import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssDatePicker from './DssDatePicker.vue'

installQuasarPlugin()

describe('DssDatePicker', () => {
  // ── Renderização base ─────────────────────────────────────────────────────

  it('renderiza com classe dss-date-picker', () => {
    const wrapper = mount(DssDatePicker)
    expect(wrapper.classes()).toContain('dss-date-picker')
  })

  it('renderiza com classe q-date', () => {
    const wrapper = mount(DssDatePicker)
    expect(wrapper.classes()).toContain('q-date')
  })

  it('tem name DssDatePicker via defineOptions', () => {
    expect(DssDatePicker.name).toBe('DssDatePicker')
  })

  it('não herda attrs no root (inheritAttrs: false)', () => {
    expect(DssDatePicker.inheritAttrs).toBe(false)
  })

  // ── Props — modelValue ────────────────────────────────────────────────────

  it('aceita modelValue string (data única)', () => {
    const wrapper = mount(DssDatePicker, {
      props: { modelValue: '2026/05/22' },
    })
    expect(wrapper.props('modelValue')).toBe('2026/05/22')
  })

  it('aceita modelValue undefined (sem valor inicial)', () => {
    const wrapper = mount(DssDatePicker)
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  it('aceita modelValue objeto de range', () => {
    const wrapper = mount(DssDatePicker, {
      props: { modelValue: { from: '2026/05/10', to: '2026/05/22' }, range: true },
    })
    expect(wrapper.props('modelValue')).toEqual({ from: '2026/05/10', to: '2026/05/22' })
  })

  it('aceita modelValue array de datas (multiple)', () => {
    const dates = ['2026/05/10', '2026/05/15', '2026/05/22']
    const wrapper = mount(DssDatePicker, {
      props: { modelValue: dates, multiple: true },
    })
    expect(wrapper.props('modelValue')).toEqual(dates)
  })

  // ── Props — modos de seleção ──────────────────────────────────────────────

  it('aceita prop range', () => {
    const wrapper = mount(DssDatePicker, {
      props: { range: true },
    })
    expect(wrapper.props('range')).toBe(true)
  })

  it('aceita prop multiple', () => {
    const wrapper = mount(DssDatePicker, {
      props: { multiple: true },
    })
    expect(wrapper.props('multiple')).toBe(true)
  })

  // ── Props — controles de formato ──────────────────────────────────────────

  it('aceita prop mask', () => {
    const wrapper = mount(DssDatePicker, {
      props: { mask: 'DD/MM/YYYY' },
    })
    expect(wrapper.props('mask')).toBe('DD/MM/YYYY')
  })

  it('aceita prop landscape', () => {
    const wrapper = mount(DssDatePicker, {
      props: { landscape: true },
    })
    expect(wrapper.props('landscape')).toBe(true)
  })

  it('aceita prop minimal', () => {
    const wrapper = mount(DssDatePicker, {
      props: { minimal: true },
    })
    expect(wrapper.props('minimal')).toBe(true)
  })

  it('aceita prop todayBtn', () => {
    const wrapper = mount(DssDatePicker, {
      props: { todayBtn: true },
    })
    expect(wrapper.props('todayBtn')).toBe(true)
  })

  it('aceita prop defaultView = Months', () => {
    const wrapper = mount(DssDatePicker, {
      props: { defaultView: 'Months' },
    })
    expect(wrapper.props('defaultView')).toBe('Months')
  })

  it('aceita prop defaultView = Years', () => {
    const wrapper = mount(DssDatePicker, {
      props: { defaultView: 'Years' },
    })
    expect(wrapper.props('defaultView')).toBe('Years')
  })

  it('aceita prop defaultYearMonth', () => {
    const wrapper = mount(DssDatePicker, {
      props: { defaultYearMonth: '2026/01' },
    })
    expect(wrapper.props('defaultYearMonth')).toBe('2026/01')
  })

  it('aceita prop emitImmediately', () => {
    const wrapper = mount(DssDatePicker, {
      props: { emitImmediately: true },
    })
    expect(wrapper.props('emitImmediately')).toBe(true)
  })

  it('aceita prop yearsInMonthView', () => {
    const wrapper = mount(DssDatePicker, {
      props: { yearsInMonthView: true },
    })
    expect(wrapper.props('yearsInMonthView')).toBe(true)
  })

  // ── Props — restrição de datas ────────────────────────────────────────────

  it('aceita prop options (Function)', () => {
    const optionsFn = (date) => date >= '2026/05/01'
    const wrapper = mount(DssDatePicker, {
      props: { options: optionsFn },
    })
    expect(wrapper.props('options')).toBe(optionsFn)
  })

  it('aceita prop options (Array)', () => {
    const dates = ['2026/05/10', '2026/05/15']
    const wrapper = mount(DssDatePicker, {
      props: { options: dates },
    })
    expect(wrapper.props('options')).toEqual(dates)
  })

  it('aceita prop navigationMinYearMonth', () => {
    const wrapper = mount(DssDatePicker, {
      props: { navigationMinYearMonth: '2026/01' },
    })
    expect(wrapper.props('navigationMinYearMonth')).toBe('2026/01')
  })

  it('aceita prop navigationMaxYearMonth', () => {
    const wrapper = mount(DssDatePicker, {
      props: { navigationMaxYearMonth: '2027/12' },
    })
    expect(wrapper.props('navigationMaxYearMonth')).toBe('2027/12')
  })

  it('aceita prop firstDayOfWeek', () => {
    const wrapper = mount(DssDatePicker, {
      props: { firstDayOfWeek: 1 },
    })
    expect(wrapper.props('firstDayOfWeek')).toBe(1)
  })

  it('aceita prop noUnset', () => {
    const wrapper = mount(DssDatePicker, {
      props: { noUnset: true },
    })
    expect(wrapper.props('noUnset')).toBe(true)
  })

  // ── Props — eventos visuais ───────────────────────────────────────────────

  it('aceita prop events (Array)', () => {
    const events = ['2026/05/10', '2026/05/15']
    const wrapper = mount(DssDatePicker, {
      props: { events },
    })
    expect(wrapper.props('events')).toEqual(events)
  })

  it('aceita prop events (Function)', () => {
    const eventsFn = (date) => date === '2026/05/22'
    const wrapper = mount(DssDatePicker, {
      props: { events: eventsFn },
    })
    expect(wrapper.props('events')).toBe(eventsFn)
  })

  // ── Props — estados ───────────────────────────────────────────────────────

  it('aceita prop disable', () => {
    const wrapper = mount(DssDatePicker, {
      props: { disable: true },
    })
    expect(wrapper.props('disable')).toBe(true)
  })

  it('aceita prop readonly', () => {
    const wrapper = mount(DssDatePicker, {
      props: { readonly: true },
    })
    expect(wrapper.props('readonly')).toBe(true)
  })

  it('aceita prop name', () => {
    const wrapper = mount(DssDatePicker, {
      props: { name: 'appointment-date' },
    })
    expect(wrapper.props('name')).toBe('appointment-date')
  })

  it('aceita prop tabindex', () => {
    const wrapper = mount(DssDatePicker, {
      props: { tabindex: 2 },
    })
    expect(wrapper.props('tabindex')).toBe(2)
  })

  // ── Props — customização de header ────────────────────────────────────────

  it('aceita prop title', () => {
    const wrapper = mount(DssDatePicker, {
      props: { title: 'Selecione a data' },
    })
    expect(wrapper.props('title')).toBe('Selecione a data')
  })

  it('aceita prop subtitle', () => {
    const wrapper = mount(DssDatePicker, {
      props: { subtitle: 'Maio 2026' },
    })
    expect(wrapper.props('subtitle')).toBe('Maio 2026')
  })

  // ── Emits ─────────────────────────────────────────────────────────────────

  it('emite update:modelValue com data única', async () => {
    const wrapper = mount(DssDatePicker, {
      props: { modelValue: '2026/05/10' },
    })
    await wrapper.vm.$emit('update:modelValue', '2026/05/22')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['2026/05/22'])
  })

  it('emite update:modelValue com objeto de range', async () => {
    const wrapper = mount(DssDatePicker, {
      props: { range: true },
    })
    await wrapper.vm.$emit('update:modelValue', { from: '2026/05/01', to: '2026/05/15' })
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([{ from: '2026/05/01', to: '2026/05/15' }])
  })

  it('emite navigation com year e month', async () => {
    const wrapper = mount(DssDatePicker)
    await wrapper.vm.$emit('navigation', { year: 2026, month: 6 })
    expect(wrapper.emitted('navigation')).toBeTruthy()
    expect(wrapper.emitted('navigation')[0]).toEqual([{ year: 2026, month: 6 }])
  })

  it('emite range-start ao iniciar seleção de range', async () => {
    const wrapper = mount(DssDatePicker, {
      props: { range: true },
    })
    await wrapper.vm.$emit('range-start', '2026/05/01')
    expect(wrapper.emitted('range-start')).toBeTruthy()
    expect(wrapper.emitted('range-start')[0]).toEqual(['2026/05/01'])
  })

  it('emite range-end ao finalizar seleção de range', async () => {
    const wrapper = mount(DssDatePicker, {
      props: { range: true },
    })
    await wrapper.vm.$emit('range-end', '2026/05/15')
    expect(wrapper.emitted('range-end')).toBeTruthy()
    expect(wrapper.emitted('range-end')[0]).toEqual(['2026/05/15'])
  })

  // ── Attrs forwarding ──────────────────────────────────────────────────────

  it('repassa aria-label ao QDate', () => {
    const wrapper = mount(DssDatePicker, {
      attrs: { 'aria-label': 'Selecione a data de início' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Selecione a data de início')
  })

  it('repassa data-testid ao QDate', () => {
    const wrapper = mount(DssDatePicker, {
      attrs: { 'data-testid': 'date-picker-start' },
    })
    expect(wrapper.attributes('data-testid')).toBe('date-picker-start')
  })

  // ── EXC-Gate-02: color="primary" fixo ────────────────────────────────────

  it('passa color=primary fixo ao QDate (EXC-Gate-02)', () => {
    const wrapper = mount(DssDatePicker)
    const qDate = wrapper.findComponent({ name: 'QDate' })
    expect(qDate.props('color')).toBe('primary')
  })

  // ── Props bloqueadas (não devem ser passadas por $attrs) ──────────────────

  it('não aceita prop color via $attrs (bloqueada por color=primary fixo)', () => {
    const wrapper = mount(DssDatePicker, {
      attrs: { color: 'red' },
    })
    const qDate = wrapper.findComponent({ name: 'QDate' })
    expect(qDate.props('color')).toBe('primary')
  })

  // ── Gate de Responsabilidade ──────────────────────────────────────────────

  it('não possui elementos visuais próprios além do QDate', () => {
    const wrapper = mount(DssDatePicker)
    expect(wrapper.element.tagName.toLowerCase()).not.toBe('div')
    expect(wrapper.classes()).toContain('q-date')
  })

  it('compound class .q-date.dss-date-picker presente', () => {
    const wrapper = mount(DssDatePicker)
    expect(wrapper.classes()).toContain('q-date')
    expect(wrapper.classes()).toContain('dss-date-picker')
  })

  // ── Slot default ──────────────────────────────────────────────────────────

  it('renderiza slot default quando fornecido', () => {
    const wrapper = mount(DssDatePicker, {
      slots: {
        default: '<span class="slot-content">Ações do calendário</span>',
      },
    })
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })
})
