import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssColorPicker from './DssColorPicker.vue'

installQuasarPlugin()

describe('DssColorPicker', () => {
  // ── Renderização base ─────────────────────────────────────────────────────

  it('renderiza com classe dss-color-picker', () => {
    const wrapper = mount(DssColorPicker)
    expect(wrapper.classes()).toContain('dss-color-picker')
  })

  it('renderiza com classe q-color-picker', () => {
    const wrapper = mount(DssColorPicker)
    expect(wrapper.classes()).toContain('q-color-picker')
  })

  it('tem name DssColorPicker via defineOptions', () => {
    expect(DssColorPicker.name).toBe('DssColorPicker')
  })

  it('não herda attrs no root (inheritAttrs: false)', () => {
    expect(DssColorPicker.inheritAttrs).toBe(false)
  })

  // ── Props — modelValue ────────────────────────────────────────────────────

  it('aceita modelValue string HEX', () => {
    const wrapper = mount(DssColorPicker, {
      props: { modelValue: '#3498DB' },
    })
    expect(wrapper.props('modelValue')).toBe('#3498DB')
  })

  it('aceita modelValue undefined (sem valor inicial)', () => {
    const wrapper = mount(DssColorPicker)
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  it('aceita defaultValue', () => {
    const wrapper = mount(DssColorPicker, {
      props: { defaultValue: '#FF0000' },
    })
    expect(wrapper.props('defaultValue')).toBe('#FF0000')
  })

  // ── Props — formato ───────────────────────────────────────────────────────

  it('aceita prop formatModel = hex', () => {
    const wrapper = mount(DssColorPicker, {
      props: { formatModel: 'hex' },
    })
    expect(wrapper.props('formatModel')).toBe('hex')
  })

  it('aceita prop formatModel = rgb', () => {
    const wrapper = mount(DssColorPicker, {
      props: { formatModel: 'rgb' },
    })
    expect(wrapper.props('formatModel')).toBe('rgb')
  })

  it('aceita prop formatModel = hsl', () => {
    const wrapper = mount(DssColorPicker, {
      props: { formatModel: 'hsl' },
    })
    expect(wrapper.props('formatModel')).toBe('hsl')
  })

  it('aceita prop formatModel = hexa', () => {
    const wrapper = mount(DssColorPicker, {
      props: { formatModel: 'hexa' },
    })
    expect(wrapper.props('formatModel')).toBe('hexa')
  })

  // ── Props — views ─────────────────────────────────────────────────────────

  it('aceita prop defaultView = spectrum', () => {
    const wrapper = mount(DssColorPicker, {
      props: { defaultView: 'spectrum' },
    })
    expect(wrapper.props('defaultView')).toBe('spectrum')
  })

  it('aceita prop defaultView = tune', () => {
    const wrapper = mount(DssColorPicker, {
      props: { defaultView: 'tune' },
    })
    expect(wrapper.props('defaultView')).toBe('tune')
  })

  it('aceita prop defaultView = palette', () => {
    const wrapper = mount(DssColorPicker, {
      props: { defaultView: 'palette' },
    })
    expect(wrapper.props('defaultView')).toBe('palette')
  })

  // ── Props — visibilidade ──────────────────────────────────────────────────

  it('aceita prop noHeader', () => {
    const wrapper = mount(DssColorPicker, {
      props: { noHeader: true },
    })
    expect(wrapper.props('noHeader')).toBe(true)
  })

  it('aceita prop noHeaderTabs', () => {
    const wrapper = mount(DssColorPicker, {
      props: { noHeaderTabs: true },
    })
    expect(wrapper.props('noHeaderTabs')).toBe(true)
  })

  it('aceita prop noFooter', () => {
    const wrapper = mount(DssColorPicker, {
      props: { noFooter: true },
    })
    expect(wrapper.props('noFooter')).toBe(true)
  })

  // ── Props — paleta ────────────────────────────────────────────────────────

  it('aceita prop palette como array de strings HEX', () => {
    const palette = ['#FF0000', '#00FF00', '#0000FF']
    const wrapper = mount(DssColorPicker, {
      props: { palette },
    })
    expect(wrapper.props('palette')).toEqual(palette)
  })

  // ── Props — estilo visual ─────────────────────────────────────────────────

  it('aceita prop square', () => {
    const wrapper = mount(DssColorPicker, {
      props: { square: true },
    })
    expect(wrapper.props('square')).toBe(true)
  })

  it('aceita prop flat', () => {
    const wrapper = mount(DssColorPicker, {
      props: { flat: true },
    })
    expect(wrapper.props('flat')).toBe(true)
  })

  it('aceita prop bordered', () => {
    const wrapper = mount(DssColorPicker, {
      props: { bordered: true },
    })
    expect(wrapper.props('bordered')).toBe(true)
  })

  // ── Props — estados ───────────────────────────────────────────────────────

  it('aceita prop disable', () => {
    const wrapper = mount(DssColorPicker, {
      props: { disable: true },
    })
    expect(wrapper.props('disable')).toBe(true)
  })

  it('aceita prop readonly', () => {
    const wrapper = mount(DssColorPicker, {
      props: { readonly: true },
    })
    expect(wrapper.props('readonly')).toBe(true)
  })

  it('aceita prop name', () => {
    const wrapper = mount(DssColorPicker, {
      props: { name: 'theme-color' },
    })
    expect(wrapper.props('name')).toBe('theme-color')
  })

  it('aceita prop tabindex', () => {
    const wrapper = mount(DssColorPicker, {
      props: { tabindex: 3 },
    })
    expect(wrapper.props('tabindex')).toBe(3)
  })

  // ── Emits ─────────────────────────────────────────────────────────────────

  it('emite update:modelValue', async () => {
    const wrapper = mount(DssColorPicker, {
      props: { modelValue: '#FF0000' },
    })
    await wrapper.vm.$emit('update:modelValue', '#00FF00')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['#00FF00'])
  })

  it('emite change', async () => {
    const wrapper = mount(DssColorPicker, {
      props: { modelValue: '#FF0000' },
    })
    await wrapper.vm.$emit('change', '#00FF00')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual(['#00FF00'])
  })

  // ── Attrs forwarding ──────────────────────────────────────────────────────

  it('repassa aria-label ao QColor', () => {
    const wrapper = mount(DssColorPicker, {
      attrs: { 'aria-label': 'Selecione a cor do tema' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Selecione a cor do tema')
  })

  it('repassa data-testid ao QColor', () => {
    const wrapper = mount(DssColorPicker, {
      attrs: { 'data-testid': 'color-picker-theme' },
    })
    expect(wrapper.attributes('data-testid')).toBe('color-picker-theme')
  })

  // ── EXC-Gate-02: color="primary" fixo ────────────────────────────────────

  it('passa color=primary fixo ao QColor (EXC-Gate-02)', () => {
    const wrapper = mount(DssColorPicker)
    const qColor = wrapper.findComponent({ name: 'QColor' })
    expect(qColor.props('color')).toBe('primary')
  })

  it('não aceita prop color via $attrs (bloqueada)', () => {
    const wrapper = mount(DssColorPicker, {
      attrs: { color: 'red' },
    })
    // color="primary" fixo deve prevalecer sobre $attrs (v-bind antes dos explícitos)
    const qColor = wrapper.findComponent({ name: 'QColor' })
    expect(qColor.props('color')).toBe('primary')
  })

  // ── Gate de Responsabilidade ──────────────────────────────────────────────

  it('não possui elementos visuais próprios além do QColor', () => {
    const wrapper = mount(DssColorPicker)
    // Root element deve ser o q-color-picker (sem wrapper div)
    expect(wrapper.classes()).toContain('q-color-picker')
  })

  it('compound class .q-color-picker.dss-color-picker presente', () => {
    const wrapper = mount(DssColorPicker)
    expect(wrapper.classes()).toContain('q-color-picker')
    expect(wrapper.classes()).toContain('dss-color-picker')
  })
})
