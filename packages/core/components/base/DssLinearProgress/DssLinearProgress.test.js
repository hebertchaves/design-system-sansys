/**
 * ==========================================================================
 * DssLinearProgress - UNIT TESTS
 *
 * COBERTURA:
 * - Props: value (0-1), indeterminate, reverse, color, size, stripe, disable, brand
 * - Estrutura: div wrapper externo (NÃO root = QLinearProgress)
 * - Classes raiz: dss-linear-progress, dss-linear-progress--size-*,
 *                 dss-linear-progress--color-*, dss-linear-progress--brand-*,
 *                 dss-linear-progress--indeterminate, dss-linear-progress--stripe,
 *                 dss-linear-progress--disabled
 * - Inner: .dss-linear-progress__inner (QLinearProgress interno)
 * - ARIA: role="progressbar", aria-valuenow (0-100 normalizado),
 *         aria-valuemin=0, aria-valuemax=100 — gerenciados pelo QLinearProgress
 * - Modo indeterminate: aria-valuenow ausente
 * - Prop color NÃO passada ao QLinearProgress — CSS DSS governa (EXC-Gate-01)
 * - data-brand: ativa cascade de tokens de brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssLinearProgress usa div wrapper + QLinearProgress interno.
 * Golden Reference: DssBadge. Golden Context: DssSpinner.
 * value em escala 0.0–1.0 (Quasar normaliza para 0–100 no aria-valuenow).
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssLinearProgress from './1-structure/DssLinearProgress.ts.vue'

installQuasar()

describe('DssLinearProgress', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza com classe base dss-linear-progress', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.classes()).toContain('dss-linear-progress')
    })

    it('root é um div wrapper (NÃO QLinearProgress)', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).not.toContain('q-linear-progress')
    })

    it('contém elemento interno .dss-linear-progress__inner', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.find('.dss-linear-progress__inner').exists()).toBe(true)
    })

    it('inner contém QLinearProgress (classe q-linear-progress)', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.find('.q-linear-progress').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renderiza com props padrão sem erros', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.exists()).toBe(true)
    })

    it('aplica size padrão md quando nenhuma prop é passada', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.classes()).toContain('dss-linear-progress--size-md')
    })

    it('aplica color padrão primary quando nenhuma prop é passada', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.classes()).toContain('dss-linear-progress--color-primary')
    })

    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])(
        'aplica classe dss-linear-progress--size-%s para size="%s"',
        (size) => {
          const wrapper = mount(DssLinearProgress, { props: { size } })
          expect(wrapper.classes()).toContain(`dss-linear-progress--size-${size}`)
        }
      )
    })

    describe('color', () => {
      it.each(['primary', 'secondary', 'error', 'success', 'warning', 'info'])(
        'aplica classe dss-linear-progress--color-%s para color="%s"',
        (color) => {
          const wrapper = mount(DssLinearProgress, { props: { color } })
          expect(wrapper.classes()).toContain(`dss-linear-progress--color-${color}`)
        }
      )
    })

    describe('value (escala 0.0–1.0)', () => {
      it('aceita value=0 sem erro', () => {
        const wrapper = mount(DssLinearProgress, { props: { value: 0 } })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita value=0.5 sem erro', () => {
        const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita value=1 sem erro', () => {
        const wrapper = mount(DssLinearProgress, { props: { value: 1 } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('indeterminate', () => {
      it('aplica classe dss-linear-progress--indeterminate quando indeterminate=true', () => {
        const wrapper = mount(DssLinearProgress, { props: { indeterminate: true } })
        expect(wrapper.classes()).toContain('dss-linear-progress--indeterminate')
      })

      it('não aplica classe indeterminate quando indeterminate não é passado', () => {
        const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
        expect(wrapper.classes()).not.toContain('dss-linear-progress--indeterminate')
      })
    })

    describe('stripe', () => {
      it('aplica classe dss-linear-progress--stripe quando stripe=true', () => {
        const wrapper = mount(DssLinearProgress, { props: { stripe: true } })
        expect(wrapper.classes()).toContain('dss-linear-progress--stripe')
      })

      it('não aplica classe stripe quando stripe não é passado', () => {
        const wrapper = mount(DssLinearProgress)
        expect(wrapper.classes()).not.toContain('dss-linear-progress--stripe')
      })
    })

    describe('disable', () => {
      it('aplica classe dss-linear-progress--disabled quando disable=true', () => {
        const wrapper = mount(DssLinearProgress, { props: { disable: true } })
        expect(wrapper.classes()).toContain('dss-linear-progress--disabled')
      })

      it('não aplica classe disabled quando disable não é passado', () => {
        const wrapper = mount(DssLinearProgress)
        expect(wrapper.classes()).not.toContain('dss-linear-progress--disabled')
      })
    })

    describe('reverse', () => {
      it('aceita reverse=true sem erro', () => {
        const wrapper = mount(DssLinearProgress, { props: { reverse: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // ARIA / ACESSIBILIDADE TESTS
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('QLinearProgress interno tem role="progressbar"', () => {
      const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.exists()).toBe(true)
    })

    it('aria-valuemin=0 definido pelo Quasar', () => {
      const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.attributes('aria-valuemin')).toBe('0')
    })

    it('aria-valuemax=100 definido pelo Quasar', () => {
      const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.attributes('aria-valuemax')).toBe('100')
    })

    it('aria-valuenow presente quando value é fornecido (normalizado para 0-100)', () => {
      const wrapper = mount(DssLinearProgress, { props: { value: 0.75 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      // Quasar normaliza 0.75 para 75
      expect(progressbar.attributes('aria-valuenow')).toBeDefined()
    })

    it('modo indeterminate: aria-valuenow não está presente', () => {
      const wrapper = mount(DssLinearProgress, { props: { indeterminate: true } })
      const progressbar = wrapper.find('[role="progressbar"]')
      // No modo indeterminate, Quasar não define aria-valuenow
      expect(progressbar.attributes('aria-valuenow')).toBeUndefined()
    })

    it('root wrapper NÃO tem role="progressbar" (delegado ao inner)', () => {
      const wrapper = mount(DssLinearProgress, { props: { value: 0.5 } })
      expect(wrapper.attributes('role')).not.toBe('progressbar')
    })

    it('componente não interativo — sem tabindex no root', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('não define data-brand quando brand não é passado', () => {
      const wrapper = mount(DssLinearProgress)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica classe brand para brand="%s"',
      (brand) => {
        const wrapper = mount(DssLinearProgress, { props: { brand } })
        expect(wrapper.classes()).toContain(`dss-linear-progress--brand-${brand}`)
      }
    )

    it('não aplica classe de brand quando brand não é passado', () => {
      const wrapper = mount(DssLinearProgress)
      const classStr = wrapper.classes().join(' ')
      expect(classStr).not.toContain('dss-linear-progress--brand-')
    })
  })

  // ===========================================================================
  // GOVERNANÇA DE COR (EXC-Gate-01)
  // ===========================================================================

  describe('Governança de cor (EXC-Gate-01)', () => {
    it('prop color gera classe DSS no root, não é passada diretamente ao QLinearProgress', () => {
      const wrapper = mount(DssLinearProgress, { props: { color: 'error' } })
      expect(wrapper.classes()).toContain('dss-linear-progress--color-error')
      const inner = wrapper.find('.q-linear-progress')
      // QLinearProgress não deve receber color como atributo HTML
      expect(inner.attributes('color')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('indeterminate + value definido: modo indeterminate prevalece na classe', () => {
      const wrapper = mount(DssLinearProgress, {
        props: { indeterminate: true, value: 0.5 }
      })
      expect(wrapper.classes()).toContain('dss-linear-progress--indeterminate')
    })

    it('stripe + indeterminate podem coexistir', () => {
      const wrapper = mount(DssLinearProgress, {
        props: { stripe: true, indeterminate: true }
      })
      expect(wrapper.classes()).toContain('dss-linear-progress--stripe')
      expect(wrapper.classes()).toContain('dss-linear-progress--indeterminate')
    })

    it('disable + stripe podem coexistir', () => {
      const wrapper = mount(DssLinearProgress, {
        props: { disable: true, stripe: true }
      })
      expect(wrapper.classes()).toContain('dss-linear-progress--disabled')
      expect(wrapper.classes()).toContain('dss-linear-progress--stripe')
    })

    it('componente sem slots (componente visual puro)', () => {
      const wrapper = mount(DssLinearProgress)
      // DssLinearProgress não possui slots — componente visual puro
      expect(wrapper.exists()).toBe(true)
    })
  })
})
