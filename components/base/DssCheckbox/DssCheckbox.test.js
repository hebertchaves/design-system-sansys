/**
 * ==========================================================================
 * DssCheckbox - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, color, disable, dense, leftLabel, label
 * - Value/Model: boolean toggle, custom values, indeterminate, 3-state, array
 * - Eventos: update:modelValue
 * - Slots: default
 * - Acessibilidade: ARIA, keyboard, focus, tabindex
 * - Brands: Hub, Water, Waste
 *
 * GOLDEN COMPONENT: DssChip.test.js (padrao de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssCheckbox from './1-structure/DssCheckbox.ts.vue'

describe('DssCheckbox', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.classes()).toContain('dss-checkbox')
      expect(wrapper.classes()).toContain('dss-checkbox--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssCheckbox, {
        props: { label: 'Accept terms' }
      })
      expect(wrapper.find('.dss-checkbox__label').text()).toBe('Accept terms')
    })

    it('hides label span when no label and no slot', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.find('.dss-checkbox__label').exists()).toBe(false)
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssCheckbox, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`dss-checkbox--${size}`)
      })
    })

    // State tests
    describe('states', () => {
      it('applies disabled class', () => {
        const wrapper = mount(DssCheckbox, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--disabled')
      })

      it('sets disabled attribute on native input', () => {
        const wrapper = mount(DssCheckbox, {
          props: { disable: true }
        })
        expect(wrapper.find('.dss-checkbox__native').attributes('disabled')).toBeDefined()
      })

      it('applies dense class', () => {
        const wrapper = mount(DssCheckbox, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--dense')
      })

      it('applies left-label class', () => {
        const wrapper = mount(DssCheckbox, {
          props: { leftLabel: true, label: 'Left' }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--left-label')
      })

      it('applies checked class when modelValue is true', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: true }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--checked')
      })

      it('applies indeterminate class when modelValue is null', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: null }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--indeterminate')
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('toggles from false to true on change', async () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false }
      })
      await wrapper.find('.dss-checkbox__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('toggles from true to false on change', async () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      await wrapper.find('.dss-checkbox__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('supports custom trueValue/falseValue', async () => {
      const wrapper = mount(DssCheckbox, {
        props: {
          modelValue: 'no',
          trueValue: 'yes',
          falseValue: 'no'
        }
      })
      await wrapper.find('.dss-checkbox__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['yes'])
    })

    it('detects checked state with custom trueValue', () => {
      const wrapper = mount(DssCheckbox, {
        props: {
          modelValue: 'yes',
          trueValue: 'yes',
          falseValue: 'no'
        }
      })
      expect(wrapper.classes()).toContain('dss-checkbox--checked')
    })

    it('renders check icon when checked', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      expect(wrapper.find('.dss-checkbox__check').exists()).toBe(true)
      expect(wrapper.find('.dss-checkbox__check').text()).toBe('check')
    })

    it('renders dash icon when indeterminate', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      expect(wrapper.find('.dss-checkbox__dash').exists()).toBe(true)
      expect(wrapper.find('.dss-checkbox__dash').text()).toBe('remove')
    })

    it('does not render icons when unchecked', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.dss-checkbox__check').exists()).toBe(false)
      expect(wrapper.find('.dss-checkbox__dash').exists()).toBe(false)
    })

    // Three-state cycling
    describe('toggleIndeterminate', () => {
      it('cycles unchecked -> checked', async () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: false, toggleIndeterminate: true }
        })
        await wrapper.find('.dss-checkbox__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
      })

      it('cycles checked -> indeterminate', async () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: true, toggleIndeterminate: true }
        })
        await wrapper.find('.dss-checkbox__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
      })

      it('cycles indeterminate -> unchecked', async () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: null, toggleIndeterminate: true }
        })
        await wrapper.find('.dss-checkbox__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
      })
    })

    // Array model (group mode)
    describe('array model (group)', () => {
      it('adds val to array when not present', async () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: ['a', 'b'], val: 'c' }
        })
        await wrapper.find('.dss-checkbox__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b', 'c']])
      })

      it('removes val from array when present', async () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: ['a', 'b', 'c'], val: 'b' }
        })
        await wrapper.find('.dss-checkbox__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'c']])
      })

      it('is checked when val is in array', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: ['a', 'b'], val: 'b' }
        })
        expect(wrapper.classes()).toContain('dss-checkbox--checked')
      })

      it('is unchecked when val is not in array', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: ['a', 'b'], val: 'c' }
        })
        expect(wrapper.classes()).not.toContain('dss-checkbox--checked')
      })

      it('is never indeterminate in array mode', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: [], val: 'a' }
        })
        expect(wrapper.classes()).not.toContain('dss-checkbox--indeterminate')
      })
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits update:modelValue on change', async () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false }
      })
      await wrapper.find('.dss-checkbox__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })

    it('does not emit when disabled', async () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false, disable: true }
      })
      await wrapper.find('.dss-checkbox__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot as label content', () => {
      const wrapper = mount(DssCheckbox, {
        slots: { default: 'Custom Label' }
      })
      expect(wrapper.find('.dss-checkbox__label').text()).toBe('Custom Label')
    })

    it('slot overrides label prop', () => {
      const wrapper = mount(DssCheckbox, {
        props: { label: 'Prop Label' },
        slots: { default: 'Slot Label' }
      })
      expect(wrapper.find('.dss-checkbox__label').text()).toBe('Slot Label')
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders a native checkbox input', () => {
      const wrapper = mount(DssCheckbox)
      const input = wrapper.find('.dss-checkbox__native')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('checkbox')
    })

    it('root element is a label', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('sets aria-label on native input', () => {
      const wrapper = mount(DssCheckbox, {
        props: { ariaLabel: 'Toggle feature' }
      })
      expect(wrapper.find('.dss-checkbox__native').attributes('aria-label')).toBe('Toggle feature')
    })

    it('sets tabindex 0 by default on input', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.find('.dss-checkbox__native').attributes('tabindex')).toBe('0')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssCheckbox, {
        props: { disable: true }
      })
      expect(wrapper.find('.dss-checkbox__native').attributes('tabindex')).toBe('-1')
    })

    it('does NOT set tabindex on root label', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('does NOT set aria-checked on root label', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      expect(wrapper.attributes('aria-checked')).toBeUndefined()
    })

    it('check icon has aria-hidden="true"', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      expect(wrapper.find('.dss-checkbox__check').attributes('aria-hidden')).toBe('true')
    })

    it('dash icon has aria-hidden="true"', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      expect(wrapper.find('.dss-checkbox__dash').attributes('aria-hidden')).toBe('true')
    })

    it('control indicator has aria-hidden="true"', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.find('.dss-checkbox__control').attributes('aria-hidden')).toBe('true')
    })

    it('uses custom tabindex from prop', () => {
      const wrapper = mount(DssCheckbox, {
        props: { tabindex: 5 }
      })
      expect(wrapper.find('.dss-checkbox__native').attributes('tabindex')).toBe('5')
    })
  })

  // ===========================================================================
  // COLOR CLASSES TESTS
  // ===========================================================================

  describe('Color classes', () => {
    it('does not apply color classes when unchecked (no brand)', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false, color: 'primary' }
      })
      const control = wrapper.find('.dss-checkbox__control')
      expect(control.classes()).not.toContain('bg-primary')
    })

    it('applies brand color class when brand is set', () => {
      const wrapper = mount(DssCheckbox, {
        props: { brand: 'hub', color: 'primary' }
      })
      expect(wrapper.classes()).toContain('dss-checkbox--primary')
    })

    it('does not apply bg-* when brand is set', () => {
      const wrapper = mount(DssCheckbox, {
        props: { brand: 'hub', color: 'primary', modelValue: true }
      })
      const control = wrapper.find('.dss-checkbox__control')
      expect(control.classes()).not.toContain('bg-primary')
    })

    it('sets data-brand attribute', () => {
      const wrapper = mount(DssCheckbox, {
        props: { brand: 'water' }
      })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['primary', 'secondary', 'accent', 'positive', 'negative', 'warning', 'info'])(
      'supports %s color',
      (color) => {
        const wrapper = mount(DssCheckbox, {
          props: { brand: 'hub', color }
        })
        expect(wrapper.classes()).toContain(`dss-checkbox--${color}`)
      }
    )
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('check icon is a real <span> element, not a pseudo-element', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      const check = wrapper.find('.dss-checkbox__check')
      expect(check.element.tagName).toBe('SPAN')
      expect(check.classes()).toContain('material-icons')
    })

    it('dash icon is a real <span> element, not a pseudo-element', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      const dash = wrapper.find('.dss-checkbox__dash')
      expect(dash.element.tagName).toBe('SPAN')
      expect(dash.classes()).toContain('material-icons')
    })

    it('native input uses sr-only class pattern', () => {
      const wrapper = mount(DssCheckbox)
      const input = wrapper.find('.dss-checkbox__native')
      expect(input.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('handles rapid consecutive changes', async () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false }
      })
      const input = wrapper.find('.dss-checkbox__native')
      await input.trigger('change')
      await input.trigger('change')
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
    })

    it('handles modelValue starting as null', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      expect(wrapper.classes()).toContain('dss-checkbox--indeterminate')
      expect(wrapper.classes()).not.toContain('dss-checkbox--checked')
    })

    it('renders without label or slot', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.find('.dss-checkbox__label').exists()).toBe(false)
      expect(wrapper.find('.dss-checkbox__control').exists()).toBe(true)
    })
  })
})
