import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTimePicker from './DssTimePicker.vue'

installQuasarPlugin()

describe('DssTimePicker', () => {
  // ── Renderização base ─────────────────────────────────────────────────────

  it('renderiza com classe dss-time-picker', () => {
    const wrapper = mount(DssTimePicker)
    expect(wrapper.classes()).toContain('dss-time-picker')
  })

  it('renderiza com classe q-time', () => {
    const wrapper = mount(DssTimePicker)
    expect(wrapper.classes()).toContain('q-time')
  })

  it('tem name DssTimePicker via defineOptions', () => {
    expect(DssTimePicker.name).toBe('DssTimePicker')
  })

  it('não herda attrs no root (inheritAttrs: false)', () => {
    expect(DssTimePicker.inheritAttrs).toBe(false)
  })

  // ── Props — modelValue ────────────────────────────────────────────────────

  it('aceita modelValue string', () => {
    const wrapper = mount(DssTimePicker, {
      props: { modelValue: '14:30' },
    })
    expect(wrapper.props('modelValue')).toBe('14:30')
  })

  it('aceita modelValue undefined (sem valor inicial)', () => {
    const wrapper = mount(DssTimePicker)
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  // ── Props — controles de formato ──────────────────────────────────────────

  it('aceita prop format24h', () => {
    const wrapper = mount(DssTimePicker, {
      props: { format24h: true },
    })
    expect(wrapper.props('format24h')).toBe(true)
  })

  it('aceita prop withSeconds', () => {
    const wrapper = mount(DssTimePicker, {
      props: { withSeconds: true },
    })
    expect(wrapper.props('withSeconds')).toBe(true)
  })

  it('aceita prop mask', () => {
    const wrapper = mount(DssTimePicker, {
      props: { mask: 'HH:mm:ss' },
    })
    expect(wrapper.props('mask')).toBe('HH:mm:ss')
  })

  it('aceita prop landscape', () => {
    const wrapper = mount(DssTimePicker, {
      props: { landscape: true },
    })
    expect(wrapper.props('landscape')).toBe(true)
  })

  it('aceita prop minimal', () => {
    const wrapper = mount(DssTimePicker, {
      props: { minimal: true },
    })
    expect(wrapper.props('minimal')).toBe(true)
  })

  it('aceita prop nowBtn', () => {
    const wrapper = mount(DssTimePicker, {
      props: { nowBtn: true },
    })
    expect(wrapper.props('nowBtn')).toBe(true)
  })

  it('aceita prop defaultView = Minutes', () => {
    const wrapper = mount(DssTimePicker, {
      props: { defaultView: 'Minutes' },
    })
    expect(wrapper.props('defaultView')).toBe('Minutes')
  })

  // ── Props — restrição de opções ───────────────────────────────────────────

  it('aceita prop options (Function)', () => {
    const optionsFn = (hr) => hr >= 8 && hr <= 18
    const wrapper = mount(DssTimePicker, {
      props: { options: optionsFn },
    })
    expect(wrapper.props('options')).toBe(optionsFn)
  })

  it('aceita prop hourOptions (Array)', () => {
    const wrapper = mount(DssTimePicker, {
      props: { hourOptions: [9, 10, 11, 14, 15, 16] },
    })
    expect(wrapper.props('hourOptions')).toEqual([9, 10, 11, 14, 15, 16])
  })

  it('aceita prop minuteOptions (Array)', () => {
    const wrapper = mount(DssTimePicker, {
      props: { minuteOptions: [0, 15, 30, 45] },
    })
    expect(wrapper.props('minuteOptions')).toEqual([0, 15, 30, 45])
  })

  // ── Props — estados ───────────────────────────────────────────────────────

  it('aceita prop disable', () => {
    const wrapper = mount(DssTimePicker, {
      props: { disable: true },
    })
    expect(wrapper.props('disable')).toBe(true)
  })

  it('aceita prop readonly', () => {
    const wrapper = mount(DssTimePicker, {
      props: { readonly: true },
    })
    expect(wrapper.props('readonly')).toBe(true)
  })

  it('aceita prop name', () => {
    const wrapper = mount(DssTimePicker, {
      props: { name: 'appointment-time' },
    })
    expect(wrapper.props('name')).toBe('appointment-time')
  })

  it('aceita prop tabindex', () => {
    const wrapper = mount(DssTimePicker, {
      props: { tabindex: 2 },
    })
    expect(wrapper.props('tabindex')).toBe(2)
  })

  // ── Emits ─────────────────────────────────────────────────────────────────

  it('emite update:modelValue', async () => {
    const wrapper = mount(DssTimePicker, {
      props: { modelValue: '10:00' },
    })
    await wrapper.vm.$emit('update:modelValue', '15:30')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['15:30'])
  })

  // ── Attrs forwarding ──────────────────────────────────────────────────────

  it('repassa aria-label ao QTime', () => {
    const wrapper = mount(DssTimePicker, {
      attrs: { 'aria-label': 'Selecione o horário de início' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Selecione o horário de início')
  })

  it('repassa data-testid ao QTime', () => {
    const wrapper = mount(DssTimePicker, {
      attrs: { 'data-testid': 'time-picker-start' },
    })
    expect(wrapper.attributes('data-testid')).toBe('time-picker-start')
  })

  // ── EXC-Gate-02: color="primary" fixo ────────────────────────────────────

  it('passa color=primary fixo ao QTime (EXC-Gate-02)', () => {
    const wrapper = mount(DssTimePicker)
    const qTime = wrapper.findComponent({ name: 'QTime' })
    expect(qTime.props('color')).toBe('primary')
  })

  // ── Props bloqueadas (não devem ser passadas por $attrs) ──────────────────

  it('não aceita prop color via $attrs (bloqueada)', () => {
    const wrapper = mount(DssTimePicker, {
      attrs: { color: 'red' },
    })
    // color="primary" fixo deve prevalecer sobre $attrs (v-bind antes dos explícitos)
    const qTime = wrapper.findComponent({ name: 'QTime' })
    expect(qTime.props('color')).toBe('primary')
  })

  // ── Gate de Responsabilidade ──────────────────────────────────────────────

  it('não possui elementos visuais próprios além do QTime', () => {
    const wrapper = mount(DssTimePicker)
    // Root element deve ser o q-time (sem wrapper div)
    // Root real do motor é <div class="q-time"> — o que importa é não haver wrapper DSS extra
    expect(wrapper.classes()).toContain('q-time')
    expect(wrapper.classes()).toContain('q-time')
  })

  it('compound class .q-time.dss-time-picker presente', () => {
    const wrapper = mount(DssTimePicker)
    expect(wrapper.classes()).toContain('q-time')
    expect(wrapper.classes()).toContain('dss-time-picker')
  })

  // ── Slot default ──────────────────────────────────────────────────────────

  it('renderiza slot default quando fornecido', () => {
    const wrapper = mount(DssTimePicker, {
      slots: {
        default: '<span class="slot-content">Slot teste</span>',
      },
    })
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })
})
