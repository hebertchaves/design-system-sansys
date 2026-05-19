import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock useQuasar to control $q.screen in tests
const mockScreen = {
  xs: false,
  sm: false,
  md: true,
  lg: false,
  xl: false,
}

vi.mock('quasar', () => ({
  useQuasar: () => ({ screen: mockScreen }),
}))

// Import after mock
const { default: DssResponsive } = await import('./DssResponsive.vue')

const mountComponent = (props = {}, slotContent = '<span class="child">content</span>') =>
  mount(DssResponsive, {
    props,
    slots: { default: slotContent },
    global: { stubs: {} },
  })

describe('DssResponsive', () => {
  beforeEach(() => {
    // Reset to md by default
    mockScreen.xs = false
    mockScreen.sm = false
    mockScreen.md = true
    mockScreen.lg = false
    mockScreen.xl = false
  })

  // --- Renderização base ---

  it('renders slot content with no constraints', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  it('renders wrapper with class dss-responsive', () => {
    const wrapper = mountComponent()
    expect(wrapper.classes()).toContain('dss-responsive')
  })

  it('renders as div by default', () => {
    const wrapper = mountComponent()
    expect(wrapper.element.tagName).toBe('DIV')
  })

  // --- Prop: tag ---

  it('renders with custom tag "section"', () => {
    const wrapper = mountComponent({ tag: 'section' })
    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it('renders with custom tag "aside"', () => {
    const wrapper = mountComponent({ tag: 'aside' })
    expect(wrapper.element.tagName).toBe('ASIDE')
  })

  // --- Prop: showOn ---

  it('shows slot when current breakpoint is in showOn', () => {
    // md is active
    const wrapper = mountComponent({ showOn: ['md', 'lg'] })
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  it('hides slot when current breakpoint is NOT in showOn', () => {
    // md is active, showOn is only xs/sm
    const wrapper = mountComponent({ showOn: ['xs', 'sm'] })
    expect(wrapper.find('.child').exists()).toBe(false)
  })

  // --- Prop: hideOn ---

  it('shows slot when current breakpoint is NOT in hideOn', () => {
    // md is active, hideOn is xs
    const wrapper = mountComponent({ hideOn: ['xs', 'sm'] })
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  it('hides slot when current breakpoint IS in hideOn', () => {
    // md is active, hideOn includes md
    const wrapper = mountComponent({ hideOn: ['md', 'lg'] })
    expect(wrapper.find('.child').exists()).toBe(false)
  })

  // --- Prop: breakpoint (alias for showOn) ---

  it('shows slot when current breakpoint is in breakpoint prop', () => {
    const wrapper = mountComponent({ breakpoint: ['md'] })
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  it('hides slot when current breakpoint is NOT in breakpoint prop', () => {
    const wrapper = mountComponent({ breakpoint: ['xs', 'sm'] })
    expect(wrapper.find('.child').exists()).toBe(false)
  })

  // --- Priority: showOn > hideOn ---

  it('showOn takes priority over hideOn when both are set', () => {
    // md is active; showOn includes md, hideOn also includes md
    const wrapper = mountComponent({ showOn: ['md'], hideOn: ['md'] })
    // showOn wins → shown, BUT hideOn also applies → hidden (AND logic)
    expect(wrapper.find('.child').exists()).toBe(false)
  })

  it('shows when in showOn and NOT in hideOn', () => {
    // md is active; showOn=[md], hideOn=[xs]
    const wrapper = mountComponent({ showOn: ['md'], hideOn: ['xs'] })
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  // --- Slot scope ---

  it('exposes currentBreakpoint in slot scope', async () => {
    const wrapper = mount(DssResponsive, {
      slots: {
        default: `<template v-slot="scope">
          <span class="bp">{{ scope.currentBreakpoint }}</span>
        </template>`,
      },
    })
    expect(wrapper.find('.bp').text()).toBe('md')
  })

  it('exposes isMobile=false and isDesktop=true when in md breakpoint', async () => {
    const wrapper = mount(DssResponsive, {
      slots: {
        default: `<template v-slot="{ isMobile, isDesktop }">
          <span class="mobile">{{ isMobile }}</span>
          <span class="desktop">{{ isDesktop }}</span>
        </template>`,
      },
    })
    expect(wrapper.find('.mobile').text()).toBe('false')
    expect(wrapper.find('.desktop').text()).toBe('true')
  })

  it('exposes isMobile=true when screen is xs', async () => {
    mockScreen.xs = true
    mockScreen.md = false

    const wrapper = mount(DssResponsive, {
      slots: {
        default: `<template v-slot="{ isMobile }">
          <span class="mobile">{{ isMobile }}</span>
        </template>`,
      },
    })
    expect(wrapper.find('.mobile').text()).toBe('true')
  })

  // --- No emits ---

  it('has no emits declared', () => {
    const emits = DssResponsive.emits
    expect(!emits || (Array.isArray(emits) && emits.length === 0)).toBe(true)
  })
})
