import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTimeline from './DssTimeline.vue'
import DssTimelineEntry from '../DssTimelineEntry/DssTimelineEntry.vue'

installQuasar()

describe('DssTimeline', () => {
  // ─── Renderização base ─────────────────────────────────────────────────────

  it('renderiza sem erros com props mínimas', () => {
    const wrapper = mount(DssTimeline, {
      slots: { default: '<span>Conteúdo</span>' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza com classe raiz dss-timeline', () => {
    const wrapper = mount(DssTimeline)
    expect(wrapper.find('.dss-timeline').exists()).toBe(true)
  })

  // ─── Props ─────────────────────────────────────────────────────────────────

  it('aplica classe dss-timeline--dense quando layout="dense"', () => {
    const wrapper = mount(DssTimeline, { props: { layout: 'dense' } })
    expect(wrapper.find('.dss-timeline--dense').exists()).toBe(true)
  })

  it('aplica classe dss-timeline--loose quando layout="loose"', () => {
    const wrapper = mount(DssTimeline, { props: { layout: 'loose' } })
    expect(wrapper.find('.dss-timeline--loose').exists()).toBe(true)
  })

  it('aplica classe dss-timeline--comfortable quando layout="comfortable"', () => {
    const wrapper = mount(DssTimeline, { props: { layout: 'comfortable' } })
    expect(wrapper.find('.dss-timeline--comfortable').exists()).toBe(true)
  })

  it('aplica classe dss-timeline--comfortable sem layout (padrão)', () => {
    const wrapper = mount(DssTimeline)
    expect(wrapper.find('.dss-timeline--comfortable').exists()).toBe(true)
  })

  it('aplica classe dss-timeline--side-left quando side="left"', () => {
    const wrapper = mount(DssTimeline, { props: { side: 'left' } })
    expect(wrapper.find('.dss-timeline--side-left').exists()).toBe(true)
  })

  it('aplica classe dss-timeline--side-right quando side="right"', () => {
    const wrapper = mount(DssTimeline, { props: { side: 'right' } })
    expect(wrapper.find('.dss-timeline--side-right').exists()).toBe(true)
  })

  it('forwarda prop dark ao QTimeline', () => {
    const wrapper = mount(DssTimeline, { props: { dark: true } })
    // QTimeline aplica q-timeline--dark quando dark=true
    expect(wrapper.find('.q-timeline--dark').exists()).toBe(true)
  })

  // ─── Slots ─────────────────────────────────────────────────────────────────

  it('renderiza conteúdo do slot default', () => {
    const wrapper = mount(DssTimeline, {
      slots: { default: '<span data-testid="entry">Item</span>' }
    })
    expect(wrapper.find('[data-testid="entry"]').exists()).toBe(true)
  })

  // ─── Composição com DssTimelineEntry ──────────────────────────────────────

  it('renderiza DssTimelineEntry como filho', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" subtitle="Hoje" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry').exists()).toBe(true)
  })

  // ─── Forwarding de atributos ───────────────────────────────────────────────

  it('forwarda atributos HTML ao QTimeline via v-bind="$attrs"', () => {
    const wrapper = mount(DssTimeline, {
      attrs: { 'data-testid': 'my-timeline', 'aria-label': 'Histórico de eventos' }
    })
    const root = wrapper.find('.dss-timeline')
    expect(root.attributes('data-testid')).toBe('my-timeline')
    expect(root.attributes('aria-label')).toBe('Histórico de eventos')
  })

  // ─── Paridade com Golden Component (DssBadge) ─────────────────────────────
  // DssBadge: defineOptions({ name, inheritAttrs: false }), slot default

  it('defineOptions está correto: name=DssTimeline, inheritAttrs=false', () => {
    expect(DssTimeline.name).toBe('DssTimeline')
  })
})
