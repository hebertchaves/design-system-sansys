import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBanner from './DssBanner.vue'

installQuasarPlugin()

describe('DssBanner', () => {

  // ─── Renderização base ───────────────────────────────────────────────────

  it('renderiza com classe base dss-banner', () => {
    const wrapper = mount(DssBanner)
    expect(wrapper.find('.dss-banner').exists()).toBe(true)
  })

  it('aplica variante default sem prop variant', () => {
    const wrapper = mount(DssBanner)
    expect(wrapper.find('.dss-banner--default').exists()).toBe(true)
  })

  it('renderiza conteúdo do slot default', () => {
    const wrapper = mount(DssBanner, {
      slots: { default: '<span class="msg">Mensagem de teste</span>' }
    })
    expect(wrapper.find('.msg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Mensagem de teste')
  })

  // ─── Props: variant ──────────────────────────────────────────────────────

  it.each(['default', 'info', 'success', 'warning', 'error'])(
    'aplica classe dss-banner--%s quando variant="%s"',
    (variant) => {
      const wrapper = mount(DssBanner, { props: { variant } })
      expect(wrapper.find(`.dss-banner--${variant}`).exists()).toBe(true)
    }
  )

  it('usa role="status" para variantes info e success', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'info' } })
    expect(wrapper.find('.dss-banner').attributes('role')).toBe('status')
  })

  it('usa role="alert" para variantes warning e error', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'warning' } })
    expect(wrapper.find('.dss-banner').attributes('role')).toBe('alert')
  })

  it('usa aria-live="polite" para info e success', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'success' } })
    expect(wrapper.find('.dss-banner').attributes('aria-live')).toBe('polite')
  })

  it('usa aria-live="assertive" para warning e error', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'error' } })
    expect(wrapper.find('.dss-banner').attributes('aria-live')).toBe('assertive')
  })

  // ─── Props: icon ─────────────────────────────────────────────────────────

  it('exibe ícone padrão da variante info quando sem prop icon', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'info' } })
    // DssIcon renderiza o ícone — verificamos sua presença
    expect(wrapper.find('.dss-banner__icon').exists()).toBe(true)
  })

  it('não exibe ícone no variant default sem prop icon', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'default' } })
    expect(wrapper.find('.dss-banner__icon').exists()).toBe(false)
  })

  it('exibe ícone customizado quando prop icon é fornecida', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'info', icon: 'update' } })
    expect(wrapper.find('.dss-banner__icon').exists()).toBe(true)
  })

  it('não exibe ícone quando icon="" explícito', () => {
    const wrapper = mount(DssBanner, { props: { variant: 'info', icon: '' } })
    expect(wrapper.find('.dss-banner__icon').exists()).toBe(false)
  })

  // ─── Props: dismissible ──────────────────────────────────────────────────

  it('exibe botão fechar quando dismissible=true', () => {
    const wrapper = mount(DssBanner, { props: { dismissible: true } })
    expect(wrapper.find('.dss-banner__dismiss').exists()).toBe(true)
  })

  it('não exibe botão fechar quando dismissible=false', () => {
    const wrapper = mount(DssBanner, { props: { dismissible: false } })
    expect(wrapper.find('.dss-banner__dismiss').exists()).toBe(false)
  })

  it('emite evento dismiss ao clicar no botão fechar', async () => {
    const wrapper = mount(DssBanner, { props: { dismissible: true } })
    await wrapper.find('.dss-banner__dismiss').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('usa dismissLabel como aria-label do botão fechar', () => {
    const wrapper = mount(DssBanner, {
      props: { dismissible: true, dismissLabel: 'Dispensar aviso' }
    })
    const btn = wrapper.find('.dss-banner__dismiss')
    expect(btn.attributes('aria-label')).toBe('Dispensar aviso')
  })

  it('usa "Fechar" como aria-label padrão do botão fechar', () => {
    const wrapper = mount(DssBanner, { props: { dismissible: true } })
    const btn = wrapper.find('.dss-banner__dismiss')
    expect(btn.attributes('aria-label')).toBe('Fechar')
  })

  // ─── Slots ───────────────────────────────────────────────────────────────

  it('renderiza slot actions customizado', () => {
    const wrapper = mount(DssBanner, {
      props: { dismissible: true },
      slots: { actions: '<button class="custom-action">Ação</button>' }
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
    // Com slot actions customizado, o botão dismiss padrão não aparece
    expect(wrapper.find('.dss-banner__dismiss').exists()).toBe(false)
  })

  it('renderiza slot avatar customizado', () => {
    const wrapper = mount(DssBanner, {
      slots: { avatar: '<span class="custom-icon">★</span>' }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // ─── Forwarding de props Quasar ─────────────────────────────────────────

  it('repassa dense=true ao QBanner', () => {
    const wrapper = mount(DssBanner, { props: { dense: true } })
    expect(wrapper.find('.q-banner--dense').exists()).toBe(true)
  })

  it('repassa rounded=true ao QBanner', () => {
    const wrapper = mount(DssBanner, { props: { rounded: true } })
    expect(wrapper.find('.rounded-borders').exists()).toBe(true)
  })

  it('repassa inlineActions=true ao QBanner', () => {
    const wrapper = mount(DssBanner, {
      props: { inlineActions: true, dismissible: true }
    })
    // Contrato real: a prop chega ao QBanner (a classe CSS depende da
    // presença simultânea do slot action no motor)
    expect(wrapper.findComponent({ name: 'QBanner' }).props('inlineActions')).toBe(true)
  })

  // ─── Forwarding de $attrs ────────────────────────────────────────────────

  it('encaminha atributos extras via v-bind="$attrs"', () => {
    const wrapper = mount(DssBanner, {
      attrs: { 'data-testid': 'main-banner' }
    })
    expect(wrapper.find('[data-testid="main-banner"]').exists()).toBe(true)
  })

  // ─── Paridade com Golden Component (DssBadge) ────────────────────────────

  it('defineOptions define o nome DssBanner', () => {
    expect(DssBanner.name).toBe('DssBanner')
  })

  it('não é interativo — root não possui tabindex', () => {
    const wrapper = mount(DssBanner)
    const root = wrapper.find('.dss-banner')
    // Banner não deve ter tabindex no elemento raiz
    expect(root.attributes('tabindex')).toBeUndefined()
  })

})
