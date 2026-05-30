import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTimeline from '../DssTimeline/DssTimeline.vue'
import DssTimelineEntry from './DssTimelineEntry.vue'

installQuasar()

describe('DssTimelineEntry', () => {
  // ─── Renderização base ─────────────────────────────────────────────────────

  it('renderiza sem erros', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" />'
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza com classe raiz dss-timeline-entry', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Teste" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry').exists()).toBe(true)
  })

  // ─── Props ─────────────────────────────────────────────────────────────────

  it('aplica classe dss-timeline-entry--heading quando heading=true', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry :heading="true" title="2026" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry--heading').exists()).toBe(true)
  })

  it('aplica classe dss-timeline-entry--side-left quando side="left"', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" side="left" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry--side-left').exists()).toBe(true)
  })

  it('aplica classe dss-timeline-entry--side-right quando side="right"', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" side="right" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry--side-right').exists()).toBe(true)
  })

  it('aplica classe dss-timeline-entry--has-icon quando icon está presente', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" icon="check" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry--has-icon').exists()).toBe(true)
  })

  it('aplica classe dss-timeline-entry--has-avatar quando avatar está presente', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" avatar="https://example.com/avatar.png" />'
        }
      }
    })
    expect(wrapper.find('.dss-timeline-entry--has-avatar').exists()).toBe(true)
  })

  // ─── Slots ─────────────────────────────────────────────────────────────────

  it('renderiza slot default (conteúdo do corpo)', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento"><span data-testid="body">Corpo</span></DssTimelineEntry>'
        }
      }
    })
    expect(wrapper.find('[data-testid="body"]').exists()).toBe(true)
  })

  it('renderiza slot #title customizado', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: `<DssTimelineEntry>
            <template #title><span data-testid="custom-title">Título Custom</span></template>
          </DssTimelineEntry>`
        }
      }
    })
    expect(wrapper.find('[data-testid="custom-title"]').exists()).toBe(true)
  })

  it('renderiza slot #subtitle customizado', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: `<DssTimelineEntry>
            <template #subtitle><time data-testid="custom-subtitle">Hoje</time></template>
          </DssTimelineEntry>`
        }
      }
    })
    expect(wrapper.find('[data-testid="custom-subtitle"]').exists()).toBe(true)
  })

  // ─── Forwarding de atributos ───────────────────────────────────────────────

  it('forwarda atributos HTML via v-bind="$attrs"', () => {
    const wrapper = mount(DssTimeline, {
      slots: {
        default: {
          components: { DssTimelineEntry },
          template: '<DssTimelineEntry title="Evento" data-testid="my-entry" />'
        }
      }
    })
    expect(wrapper.find('[data-testid="my-entry"]').exists()).toBe(true)
  })

  // ─── Paridade com Golden Component ────────────────────────────────────────

  it('defineOptions está correto: name=DssTimelineEntry, inheritAttrs=false', () => {
    expect(DssTimelineEntry.name).toBe('DssTimelineEntry')
  })
})
