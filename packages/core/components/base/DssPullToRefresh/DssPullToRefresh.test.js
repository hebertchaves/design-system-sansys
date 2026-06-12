import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPullToRefresh from './DssPullToRefresh.vue'

installQuasarPlugin()

describe('DssPullToRefresh', () => {
  // ──────────────────────────────────────────────
  // Renderização base
  // ──────────────────────────────────────────────

  describe('renderização', () => {
    it('renderiza com slot default', () => {
      const wrapper = mount(DssPullToRefresh, {
        slots: { default: '<p>Conteúdo</p>' },
      })
      expect(wrapper.find('.dss-pull-to-refresh').exists()).toBe(true)
      expect(wrapper.text()).toContain('Conteúdo')
    })

    it('aplica classe raiz corretamente', () => {
      const wrapper = mount(DssPullToRefresh)
      expect(wrapper.classes()).toContain('dss-pull-to-refresh')
    })

    it('aplica classe de tamanho padrão (md)', () => {
      const wrapper = mount(DssPullToRefresh)
      expect(wrapper.classes()).toContain('dss-pull-to-refresh--md')
    })

    it('inclui o anunciador acessível (role="status")', () => {
      const wrapper = mount(DssPullToRefresh)
      const announcer = wrapper.find('[role="status"]')
      expect(announcer.exists()).toBe(true)
      expect(announcer.attributes('aria-live')).toBe('polite')
    })
  })

  // ──────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────

  describe('props', () => {
    it('size="sm" aplica classe correta', () => {
      const wrapper = mount(DssPullToRefresh, { props: { size: 'sm' } })
      expect(wrapper.classes()).toContain('dss-pull-to-refresh--sm')
      expect(wrapper.classes()).not.toContain('dss-pull-to-refresh--md')
    })

    it('size="lg" aplica classe correta', () => {
      const wrapper = mount(DssPullToRefresh, { props: { size: 'lg' } })
      expect(wrapper.classes()).toContain('dss-pull-to-refresh--lg')
    })

    it('disabled=true aplica classe de desabilitado', () => {
      const wrapper = mount(DssPullToRefresh, { props: { disabled: true } })
      expect(wrapper.classes()).toContain('dss-pull-to-refresh--disabled')
    })

    it('disabled=false não aplica classe de desabilitado', () => {
      const wrapper = mount(DssPullToRefresh, { props: { disabled: false } })
      expect(wrapper.classes()).not.toContain('dss-pull-to-refresh--disabled')
    })
  })

  // ──────────────────────────────────────────────
  // Eventos
  // ──────────────────────────────────────────────

  describe('eventos', () => {
    it('emite "refresh" com função done quando QPullToRefresh dispara @refresh', async () => {
      const wrapper = mount(DssPullToRefresh)

      // Simula emissão interna do Quasar QPullToRefresh
      const qPullToRefresh = wrapper.findComponent({ name: 'QPullToRefresh' })
      const doneSpy = vi.fn()
      await qPullToRefresh.vm.$emit('refresh', doneSpy)

      expect(wrapper.emitted('refresh')).toBeTruthy()
      expect(wrapper.emitted('refresh')).toHaveLength(1)
      expect(typeof wrapper.emitted('refresh')[0][0]).toBe('function')
    })

    it('aria-busy fica true durante refresh e false após chamar done', async () => {
      const wrapper = mount(DssPullToRefresh)
      const qPullToRefresh = wrapper.findComponent({ name: 'QPullToRefresh' })

      // Captura o done wrapper DSS
      let dssWrapperDone
      const done = vi.fn(() => {})
      await qPullToRefresh.vm.$emit('refresh', done)
      const emitted = wrapper.emitted('refresh')
      dssWrapperDone = emitted[0][0]

      await flushPromises()
      const announcer = wrapper.find('[role="status"]')
      expect(announcer.attributes('aria-busy')).toBe('true')

      // Chama done — deve resetar isRefreshing
      dssWrapperDone()
      await flushPromises()
      expect(announcer.attributes('aria-busy')).toBe('false')
    })
  })

  // ──────────────────────────────────────────────
  // Slots
  // ──────────────────────────────────────────────

  describe('slots', () => {
    it('slot default renderiza conteúdo arbitrário', () => {
      const wrapper = mount(DssPullToRefresh, {
        slots: {
          default: `
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          `,
        },
      })
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.findAll('li')).toHaveLength(2)
    })
  })

  // ──────────────────────────────────────────────
  // Forwarding de atributos
  // ──────────────────────────────────────────────

  describe('forwarding ($attrs)', () => {
    it('atributos HTML arbitrários são encaminhados ao root', () => {
      const wrapper = mount(DssPullToRefresh, {
        attrs: { 'data-testid': 'ptr-root', id: 'my-ptr' },
      })
      expect(wrapper.attributes('data-testid')).toBe('ptr-root')
      expect(wrapper.attributes('id')).toBe('my-ptr')
    })
  })
})
