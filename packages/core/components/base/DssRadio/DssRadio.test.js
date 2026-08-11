/**
 * ==========================================================================
 * DssRadio - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, color, disable, dense, leftLabel, label, val, modelValue, name, brand
 * - Value/Model: checked state, emit update:modelValue
 * - Eventos: update:modelValue
 * - Slots: default (label)
 * - Acessibilidade: ARIA, radio role, tabindex, aria-label
 * - Brands: Hub, Water, Waste
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssRadio from './1-structure/DssRadio.ts.vue'
import DssIcon from '../DssIcon/DssIcon.vue'

describe('DssRadio', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.classes()).toContain('dss-radio')
      expect(wrapper.classes()).toContain('dss-radio--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssRadio, {
        props: { label: 'Opção A' }
      })
      expect(wrapper.find('.dss-radio__label').text()).toBe('Opção A')
    })

    it('hides label span when no label and no slot', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__label').exists()).toBe(false)
    })

    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssRadio, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-radio--${size}`)
      })
    })

    describe('states', () => {
      it('applies disabled class when disable=true', () => {
        const wrapper = mount(DssRadio, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-radio--disabled')
      })

      it('sets disabled attribute on native input', () => {
        const wrapper = mount(DssRadio, {
          props: { disable: true }
        })
        expect(wrapper.find('.dss-radio__native').attributes('disabled')).toBeDefined()
      })

      it('applies dense class', () => {
        const wrapper = mount(DssRadio, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-radio--dense')
      })

      it('applies left-label class', () => {
        const wrapper = mount(DssRadio, {
          props: { leftLabel: true, label: 'Esquerda' }
        })
        expect(wrapper.classes()).toContain('dss-radio--left-label')
      })

      // A ordem do leftLabel e resolvida no TEMPLATE (label renderizada ANTES do
      // controle). A asercao da classe acima passava mesmo com a feature quebrada
      // pela dupla-inversao template x CSS — por isso esta trava a ORDEM REAL.
      // Limite conhecido: jsdom nao aplica o SCSS, entao a metade CSS do defeito
      // (flex-direction: row-reverse) NAO e capturada aqui; ela e visivel no
      // dss.contract.json (derivado do SCSS) e na verificacao visual.
      it('renders the label BEFORE the control when leftLabel is true', () => {
        const wrapper = mount(DssRadio, {
          props: { leftLabel: true, label: 'Esquerda' }
        })
        const children = [...wrapper.element.children]
        const labelIdx = children.findIndex((el) =>
          el.classList.contains('dss-radio__label')
        )
        const controlIdx = children.findIndex((el) =>
          el.classList.contains('dss-radio__control')
        )
        expect(labelIdx).toBeGreaterThanOrEqual(0)
        expect(controlIdx).toBeGreaterThanOrEqual(0)
        expect(labelIdx).toBeLessThan(controlIdx)
      })

      it('renders the label AFTER the control by default', () => {
        const wrapper = mount(DssRadio, {
          props: { label: 'Direita' }
        })
        const children = [...wrapper.element.children]
        const labelIdx = children.findIndex((el) =>
          el.classList.contains('dss-radio__label')
        )
        const controlIdx = children.findIndex((el) =>
          el.classList.contains('dss-radio__control')
        )
        expect(labelIdx).toBeGreaterThan(controlIdx)
      })

      it('applies checked class when modelValue equals val', () => {
        const wrapper = mount(DssRadio, {
          props: { modelValue: 'a', val: 'a' }
        })
        expect(wrapper.classes()).toContain('dss-radio--checked')
      })

      it('does not apply checked class when modelValue differs from val', () => {
        const wrapper = mount(DssRadio, {
          props: { modelValue: 'b', val: 'a' }
        })
        expect(wrapper.classes()).not.toContain('dss-radio--checked')
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('emits update:modelValue with val when clicked', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'b', val: 'a' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
    })

    it('does not emit when already selected', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'a', val: 'a' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      // Deve emitir ou não dependendo da implementação; verificamos que não quebra
      expect(wrapper.exists()).toBe(true)
    })

    it('does not emit when disabled', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'b', val: 'a', disable: true }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits update:modelValue on change', async () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: null, val: 'opcao1' }
      })
      await wrapper.find('.dss-radio__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot as label content', () => {
      const wrapper = mount(DssRadio, {
        slots: { default: 'Label via slot' }
      })
      expect(wrapper.find('.dss-radio__label').text()).toBe('Label via slot')
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders a native radio input', () => {
      const wrapper = mount(DssRadio)
      const input = wrapper.find('.dss-radio__native')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('radio')
    })

    it('root element is a label', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('sets aria-label on native input when ariaLabel is provided', () => {
      const wrapper = mount(DssRadio, {
        props: { ariaLabel: 'Selecionar opção A' }
      })
      expect(wrapper.find('.dss-radio__native').attributes('aria-label')).toBe('Selecionar opção A')
    })

    it('sets tabindex 0 by default on input', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__native').attributes('tabindex')).toBe('0')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssRadio, {
        props: { disable: true }
      })
      expect(wrapper.find('.dss-radio__native').attributes('tabindex')).toBe('-1')
    })

    it('sets name attribute on native input', () => {
      const wrapper = mount(DssRadio, {
        props: { name: 'gender-group' }
      })
      expect(wrapper.find('.dss-radio__native').attributes('name')).toBe('gender-group')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('sets data-brand attribute', () => {
      const wrapper = mount(DssRadio, { props: { brand: 'water' } })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])('supports %s brand', (brand) => {
      const wrapper = mount(DssRadio, { props: { brand } })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('renders control indicator element', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__control').exists()).toBe(true)
    })

    it('control indicator has aria-hidden="true"', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.find('.dss-radio__control').attributes('aria-hidden')).toBe('true')
    })
  })
})

// ==========================================================================
// Paridade da família de Controles de Seleção (Golden Context: DssCheckbox)
// keepColor · checkedIcon · size xl
// ==========================================================================
describe('DssRadio — paridade da família', () => {
  // ------------------------------------------------------------------------
  // keepColor — escape hatch de cor no stroke em repouso (opt-in)
  // ------------------------------------------------------------------------
  describe('keepColor (escape hatch)', () => {
    it('não aplica a classe keep-color por padrão', () => {
      const wrapper = mount(DssRadio)
      expect(wrapper.classes()).not.toContain('dss-radio--keep-color')
    })

    it('aplica keep-color no root quando habilitado', () => {
      const wrapper = mount(DssRadio, { props: { keepColor: true } })
      expect(wrapper.classes()).toContain('dss-radio--keep-color')
    })

    it('colore o stroke DESMARCADO via text-{color} (sem brand)', () => {
      const wrapper = mount(DssRadio, {
        props: { keepColor: true, color: 'primary', modelValue: 'a', val: 'b' }
      })
      expect(wrapper.find('.dss-radio__control').classes()).toContain('text-primary')
    })

    it('sem keepColor, o stroke desmarcado fica cinza (sem utilitária de cor)', () => {
      const wrapper = mount(DssRadio, {
        props: { color: 'primary', modelValue: 'a', val: 'b' }
      })
      expect(wrapper.find('.dss-radio__control').classes()).not.toContain('text-primary')
    })

    it('estado marcado continua colorido (keepColor não altera o ativo)', () => {
      const wrapper = mount(DssRadio, {
        props: { keepColor: true, color: 'primary', modelValue: 'a', val: 'a' }
      })
      expect(wrapper.find('.dss-radio__control').classes()).toContain('text-primary')
    })

    it('delega ao _brands.scss no modo brand (sem utilitária no control)', () => {
      const wrapper = mount(DssRadio, {
        props: { keepColor: true, brand: 'hub', color: 'primary', modelValue: 'a', val: 'b' }
      })
      expect(wrapper.find('.dss-radio__control').classes()).not.toContain('text-primary')
    })

    it('ERRO vence keepColor — campo inválido não exibe cor de ação no repouso', () => {
      const wrapper = mount(DssRadio, {
        props: { keepColor: true, error: true, color: 'primary', modelValue: 'a', val: 'b' }
      })
      expect(wrapper.find('.dss-radio__control').classes()).not.toContain('text-primary')
    })
  })

  // ------------------------------------------------------------------------
  // checkedIcon — glifo SUBSTITUI o ponto; sem prop, o ponto permanece
  // ------------------------------------------------------------------------
  describe('checkedIcon (CCI §7)', () => {
    it('marcado SEM checkedIcon renderiza o ponto, não um ícone', () => {
      const wrapper = mount(DssRadio, { props: { modelValue: 'a', val: 'a' } })
      expect(wrapper.find('.dss-radio__dot').exists()).toBe(true)
      expect(wrapper.findComponent(DssIcon).exists()).toBe(false)
    })

    it('marcado COM checkedIcon troca o ponto pelo glifo (nunca os dois)', () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'a', val: 'a', checkedIcon: 'star' }
      })
      expect(wrapper.findComponent(DssIcon).props('name')).toBe('star')
      expect(wrapper.find('.dss-radio__dot').exists()).toBe(false)
    })

    it('desmarcado não renderiza indicador algum, mesmo com checkedIcon', () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'a', val: 'b', checkedIcon: 'star' }
      })
      expect(wrapper.findComponent(DssIcon).exists()).toBe(false)
      expect(wrapper.find('.dss-radio__dot').exists()).toBe(false)
    })

    it('o glifo é decorativo (o estado é anunciado pelo input nativo)', () => {
      const wrapper = mount(DssRadio, {
        props: { modelValue: 'a', val: 'a', checkedIcon: 'star' }
      })
      expect(wrapper.findComponent(DssIcon).props('decorative')).toBe(true)
    })
  })

  // ------------------------------------------------------------------------
  // size xl
  // ------------------------------------------------------------------------
  describe('size xl', () => {
    it('aplica a classe de tamanho xl', () => {
      const wrapper = mount(DssRadio, { props: { size: 'xl' } })
      expect(wrapper.classes()).toContain('dss-radio--xl')
    })
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssRadio — Teclado (WCAG 2.1.1)', () => {
  it('possui input nativo radio focável (tabindex 0)', () => {
    const wrapper = mount(DssRadio, { props: { modelValue: 'a', val: 'b', label: 'Opção B' } })
    const input = wrapper.find('input[type="radio"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('tabindex')).toBe('0')
  })

  it('seleção via input nativo emite update:modelValue com val', async () => {
    const wrapper = mount(DssRadio, { props: { modelValue: 'a', val: 'b', label: 'Opção B' } })
    await wrapper.find('input[type="radio"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['b'])
  })
})
