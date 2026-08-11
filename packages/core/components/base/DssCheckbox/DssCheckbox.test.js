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
import DssIcon from '../DssIcon/DssIcon.vue'

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
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])('applies %s size class', (size) => {
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

    // Regressao: modelValue estreitado (boolean|null|any[]) fazia o compilador do
    // Vue gerar um runtime check que REPROVAVA os valores que trueValue/falseValue
    // oferecem. Os testes acima ja usavam string e passavam — Vue warn nao reprova
    // vitest —, entao a asercao precisa ser sobre o WARN, nao sobre o comportamento.
    it('does not emit a Vue prop-type warn with custom values', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mount(DssCheckbox, {
        props: {
          modelValue: 'no',
          trueValue: 'yes',
          falseValue: 'no',
          indeterminateValue: 'maybe'
        }
      })
      const invalidProp = warn.mock.calls.filter((call) =>
        String(call[0]).includes('Invalid prop')
      )
      warn.mockRestore()
      expect(invalidProp).toEqual([])
    })

    it('renders check icon via DssIcon composition when checked (CCI §3.1)', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      const check = wrapper.find('.dss-checkbox__check')
      expect(check.exists()).toBe(true)
      // Glifo agora vem do DssIcon → QIcon (composição), não mais <span> cru.
      expect(check.classes()).toContain('dss-icon')
      expect(check.classes()).toContain('dss-icon--inline')
      expect(check.find('.dss-icon__inner').exists()).toBe(true)
    })

    it('renders dash icon via DssIcon composition when indeterminate (CCI §3.1)', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      const dash = wrapper.find('.dss-checkbox__dash')
      expect(dash.exists()).toBe(true)
      expect(dash.classes()).toContain('dss-icon')
      expect(dash.classes()).toContain('dss-icon--inline')
      expect(dash.find('.dss-icon__inner').exists()).toBe(true)
    })

    it('does not render icons when unchecked', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.dss-checkbox__check').exists()).toBe(false)
      expect(wrapper.find('.dss-checkbox__dash').exists()).toBe(false)
    })

    // Custom glyphs — CCI §7 (mudanca aditiva: checked/indeterminate)
    describe('icon customization (CCI §7)', () => {
      it('defaults checkedIcon to "check"', () => {
        const wrapper = mount(DssCheckbox, { props: { modelValue: true } })
        expect(wrapper.findComponent(DssIcon).props('name')).toBe('check')
      })

      it('defaults indeterminateIcon to "remove"', () => {
        const wrapper = mount(DssCheckbox, { props: { modelValue: null } })
        expect(wrapper.findComponent(DssIcon).props('name')).toBe('remove')
      })

      it('renders custom checkedIcon glyph', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: true, checkedIcon: 'done_all' }
        })
        expect(wrapper.findComponent(DssIcon).props('name')).toBe('done_all')
      })

      it('renders custom indeterminateIcon glyph', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: null, indeterminateIcon: 'horizontal_rule' }
        })
        expect(wrapper.findComponent(DssIcon).props('name')).toBe('horizontal_rule')
      })

      it('keeps unchecked empty even with custom icons (no unchecked-icon)', () => {
        const wrapper = mount(DssCheckbox, {
          props: { modelValue: false, checkedIcon: 'done_all', indeterminateIcon: 'horizontal_rule' }
        })
        expect(wrapper.findComponent(DssIcon).exists()).toBe(false)
      })
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

    // keepColor — escape hatch de cor no stroke em repouso (opt-in)
    describe('keepColor (escape hatch)', () => {
      it('does not apply keep-color class by default', () => {
        const wrapper = mount(DssCheckbox)
        expect(wrapper.classes()).not.toContain('dss-checkbox--keep-color')
      })

      it('applies keep-color class on root when enabled', () => {
        const wrapper = mount(DssCheckbox, { props: { keepColor: true } })
        expect(wrapper.classes()).toContain('dss-checkbox--keep-color')
      })

      it('colors the unchecked stroke via text-{color} (no brand, no fill)', () => {
        const wrapper = mount(DssCheckbox, {
          props: { keepColor: true, color: 'primary', modelValue: false }
        })
        const control = wrapper.find('.dss-checkbox__control')
        expect(control.classes()).toContain('text-primary')
        expect(control.classes()).not.toContain('bg-primary')
      })

      it('does not color the unchecked stroke when keepColor is off (default gray)', () => {
        const wrapper = mount(DssCheckbox, {
          props: { color: 'primary', modelValue: false }
        })
        const control = wrapper.find('.dss-checkbox__control')
        expect(control.classes()).not.toContain('text-primary')
      })

      it('checked state still fills (keepColor does not change active look)', () => {
        const wrapper = mount(DssCheckbox, {
          props: { keepColor: true, color: 'primary', modelValue: true }
        })
        const control = wrapper.find('.dss-checkbox__control')
        expect(control.classes()).toContain('bg-primary')
        expect(control.classes()).toContain('text-white')
      })

      it('defers to _brands.scss in brand mode (no utility classes on control)', () => {
        const wrapper = mount(DssCheckbox, {
          props: { keepColor: true, brand: 'hub', color: 'primary', modelValue: false }
        })
        const control = wrapper.find('.dss-checkbox__control')
        expect(control.classes()).not.toContain('text-primary')
        expect(wrapper.classes()).toContain('dss-checkbox--keep-color')
      })
    })
  })

  // ===========================================================================
  // ERROR TESTS (paridade com DssRadio/DssToggle)
  // ===========================================================================

  describe('Error', () => {
    it('applies error class when error is true', () => {
      const wrapper = mount(DssCheckbox, {
        props: { error: true, label: 'Obrigatorio' }
      })
      expect(wrapper.classes()).toContain('dss-checkbox--error')
    })

    it('does not apply error class by default', () => {
      const wrapper = mount(DssCheckbox, { props: { label: 'Normal' } })
      expect(wrapper.classes()).not.toContain('dss-checkbox--error')
    })

    it('renders the error message with role=alert', () => {
      const wrapper = mount(DssCheckbox, {
        props: { error: true, errorMessage: 'Campo obrigatorio' }
      })
      const msg = wrapper.find('.dss-checkbox__error')
      expect(msg.exists()).toBe(true)
      expect(msg.text()).toBe('Campo obrigatorio')
      expect(msg.attributes('role')).toBe('alert')
    })

    it('does not render the message when error is false', () => {
      const wrapper = mount(DssCheckbox, {
        props: { error: false, errorMessage: 'Campo obrigatorio' }
      })
      expect(wrapper.find('.dss-checkbox__error').exists()).toBe(false)
    })

    it('sets aria-invalid on the native input when error', () => {
      const wrapper = mount(DssCheckbox, { props: { error: true } })
      expect(wrapper.find('.dss-checkbox__native').attributes('aria-invalid')).toBe('true')
    })

    it('does not set aria-invalid by default', () => {
      const wrapper = mount(DssCheckbox)
      expect(wrapper.find('.dss-checkbox__native').attributes('aria-invalid')).toBeUndefined()
    })

    // O id gerado precisa CASAR com o aria-describedby: um describedby apontando
    // para um id inexistente e pior que nenhum — o leitor de tela anuncia nada.
    it('wires aria-describedby to the error message id', () => {
      const wrapper = mount(DssCheckbox, {
        props: { error: true, errorMessage: 'Campo obrigatorio' }
      })
      const describedBy = wrapper.find('.dss-checkbox__native').attributes('aria-describedby')
      const msgId = wrapper.find('.dss-checkbox__error').attributes('id')
      expect(describedBy).toBeTruthy()
      expect(describedBy).toBe(msgId)
    })

    it('has no aria-describedby when error has no message', () => {
      const wrapper = mount(DssCheckbox, { props: { error: true } })
      expect(
        wrapper.find('.dss-checkbox__native').attributes('aria-describedby')
      ).toBeUndefined()
    })

    // Erro vence cor e keepColor: um campo invalido nao exibe cor de acao em
    // repouso. Mesma regra do DssRadio/DssToggle.
    it('error suppresses the color utility class, even with keepColor', () => {
      const wrapper = mount(DssCheckbox, {
        props: { error: true, keepColor: true, color: 'primary' }
      })
      const control = wrapper.find('.dss-checkbox__control')
      expect(control.classes()).not.toContain('text-primary')
      expect(control.classes()).not.toContain('bg-primary')
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('check icon is a real element (DssIcon composition), not a pseudo-element', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: true }
      })
      const check = wrapper.find('.dss-checkbox__check')
      // Raiz do DssIcon é um <span> (single-root); o glifo é renderizado
      // pelo DssIcon → QIcon, não por pseudo-elemento.
      expect(check.element.tagName).toBe('SPAN')
      expect(check.classes()).toContain('dss-icon')
      expect(check.find('.dss-icon__inner').exists()).toBe(true)
    })

    it('dash icon is a real element (DssIcon composition), not a pseudo-element', () => {
      const wrapper = mount(DssCheckbox, {
        props: { modelValue: null }
      })
      const dash = wrapper.find('.dss-checkbox__dash')
      expect(dash.element.tagName).toBe('SPAN')
      expect(dash.classes()).toContain('dss-icon')
      expect(dash.find('.dss-icon__inner').exists()).toBe(true)
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

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssCheckbox — Teclado (WCAG 2.1.1)', () => {
  // Input NATIVO (checkbox): Space é ativação do user-agent — o contrato
  // testável é o input focável + ativação alterar o modelo.
  it('possui input nativo focável (tabindex 0)', () => {
    const wrapper = mount(DssCheckbox, { props: { modelValue: false, label: 'Aceito' } })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('tabindex')).toBe('0')
  })

  it('ativação do input nativo emite update:modelValue', async () => {
    const wrapper = mount(DssCheckbox, { props: { modelValue: false, label: 'Aceito' } })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })
})
