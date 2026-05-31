import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBar from './DssBar.vue'

installQuasarPlugin()

describe('DssBar', () => {

  // ─── Renderização base ───────────────────────────────────────────────────

  it('renderiza com classe base dss-bar', () => {
    const wrapper = mount(DssBar)
    expect(wrapper.find('.dss-bar').exists()).toBe(true)
  })

  it('renderiza conteúdo do slot default', () => {
    const wrapper = mount(DssBar, {
      slots: { default: '<span class="bar-content">Título</span>' }
    })
    expect(wrapper.find('.bar-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Título')
  })

  // ─── Props: dense ────────────────────────────────────────────────────────

  it('repassa dense=true ao QBar aplicando .q-bar--dense', () => {
    const wrapper = mount(DssBar, { props: { dense: true } })
    expect(wrapper.find('.q-bar--dense').exists()).toBe(true)
  })

  it('não aplica .q-bar--dense quando dense não é passado', () => {
    const wrapper = mount(DssBar)
    expect(wrapper.find('.q-bar--dense').exists()).toBe(false)
  })

  // ─── Props: elevated ─────────────────────────────────────────────────────

  it('aplica .dss-bar--elevated quando elevated=true', () => {
    const wrapper = mount(DssBar, { props: { elevated: true } })
    expect(wrapper.find('.dss-bar--elevated').exists()).toBe(true)
  })

  it('não aplica .dss-bar--elevated quando elevated não é passado', () => {
    const wrapper = mount(DssBar)
    expect(wrapper.find('.dss-bar--elevated').exists()).toBe(false)
  })

  // ─── Forwarding de $attrs ────────────────────────────────────────────────

  it('encaminha atributos extras via v-bind="$attrs"', () => {
    const wrapper = mount(DssBar, {
      attrs: { 'data-testid': 'system-bar' }
    })
    expect(wrapper.find('[data-testid="system-bar"]').exists()).toBe(true)
  })

  // ─── Não-interativo — sem tabindex no root ───────────────────────────────

  it('não possui tabindex no elemento raiz', () => {
    const wrapper = mount(DssBar)
    expect(wrapper.find('.dss-bar').attributes('tabindex')).toBeUndefined()
  })

  // ─── Paridade com Golden Component ───────────────────────────────────────

  it('defineOptions define o nome DssBar', () => {
    expect(DssBar.name).toBe('DssBar')
  })

})
