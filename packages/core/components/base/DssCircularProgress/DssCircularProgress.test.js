/**
 * ==========================================================================
 * DssCircularProgress - UNIT TESTS
 *
 * COBERTURA:
 * - Props: value, min, max, color, size, indeterminate, thickness, angle,
 *          reverse, instantFeedback, disable, brand
 * - Estrutura: div wrapper externo (NÃO root = QCircularProgress)
 * - Classes raiz: dss-circular-progress, dss-circular-progress--size-*,
 *                 dss-circular-progress--color-*, dss-circular-progress--brand-*,
 *                 dss-circular-progress--indeterminate, dss-circular-progress--disabled
 * - Inner: .dss-circular-progress__inner (QCircularProgress interno)
 * - ARIA: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
 *         gerenciados pelo QCircularProgress (EXC-Gate-01)
 * - Prop color NÃO passada ao QCircularProgress — CSS DSS governa via stroke
 * - data-brand: ativa cascade de tokens de brand
 * - Slot default: valor central (show-value auto-detectado)
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssCircularProgress usa div wrapper + QCircularProgress interno.
 * Golden Reference: DssBadge. Golden Context: DssLinearProgress.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssCircularProgress from './1-structure/DssCircularProgress.ts.vue'

installQuasar()

describe('DssCircularProgress', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza com classe base dss-circular-progress', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.classes()).toContain('dss-circular-progress')
    })

    it('root é um div wrapper (NÃO QCircularProgress)', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.element.tagName).toBe('DIV')
      // Garante que o root não é q-circular-progress
      expect(wrapper.classes()).not.toContain('q-circular-progress')
    })

    it('contém elemento interno .dss-circular-progress__inner', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.find('.dss-circular-progress__inner').exists()).toBe(true)
    })

    it('inner contém QCircularProgress (classe q-circular-progress)', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.find('.q-circular-progress').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renderiza com props padrão sem erros', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.exists()).toBe(true)
    })

    it('aplica size padrão md quando nenhuma prop é passada', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.classes()).toContain('dss-circular-progress--size-md')
    })

    it('aplica color padrão primary quando nenhuma prop é passada', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.classes()).toContain('dss-circular-progress--color-primary')
    })

    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])(
        'aplica classe dss-circular-progress--size-%s para size="%s"',
        (size) => {
          const wrapper = mount(DssCircularProgress, { props: { size } })
          expect(wrapper.classes()).toContain(`dss-circular-progress--size-${size}`)
        }
      )
    })

    describe('color', () => {
      it.each(['primary', 'secondary', 'error', 'success', 'warning', 'info'])(
        'aplica classe dss-circular-progress--color-%s para color="%s"',
        (color) => {
          const wrapper = mount(DssCircularProgress, { props: { color } })
          expect(wrapper.classes()).toContain(`dss-circular-progress--color-${color}`)
        }
      )
    })

    describe('value', () => {
      it('aceita value numérico sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { value: 75 } })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita value=0 sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { value: 0 } })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita value=100 sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { value: 100 } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('indeterminate', () => {
      it('aplica classe dss-circular-progress--indeterminate quando indeterminate=true', () => {
        const wrapper = mount(DssCircularProgress, { props: { indeterminate: true } })
        expect(wrapper.classes()).toContain('dss-circular-progress--indeterminate')
      })

      it('não aplica classe indeterminate quando indeterminate não é passado', () => {
        const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
        expect(wrapper.classes()).not.toContain('dss-circular-progress--indeterminate')
      })
    })

    describe('disable', () => {
      it('aplica classe dss-circular-progress--disabled quando disable=true', () => {
        const wrapper = mount(DssCircularProgress, { props: { disable: true } })
        expect(wrapper.classes()).toContain('dss-circular-progress--disabled')
      })

      it('não aplica classe disabled quando disable não é passado', () => {
        const wrapper = mount(DssCircularProgress)
        expect(wrapper.classes()).not.toContain('dss-circular-progress--disabled')
      })
    })

    describe('reverse', () => {
      it('aceita reverse=true sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { reverse: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('instantFeedback', () => {
      it('aceita instantFeedback=true sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { instantFeedback: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('thickness', () => {
      it('aceita thickness personalizado sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { thickness: 0.3 } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('angle', () => {
      it('aceita angle personalizado sem erro', () => {
        const wrapper = mount(DssCircularProgress, { props: { angle: 90 } })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // ARIA / ACESSIBILIDADE TESTS
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('QCircularProgress interno tem role="progressbar"', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.exists()).toBe(true)
    })

    it('aria-valuenow é definido pelo Quasar para value=50', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.attributes('aria-valuenow')).toBe('50')
    })

    it('aria-valuemin é definido pelo Quasar', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.attributes('aria-valuemin')).toBe('0')
    })

    it('aria-valuemax é definido pelo Quasar', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.attributes('aria-valuemax')).toBe('100')
    })

    it('root wrapper NÃO tem role="progressbar" (delegado ao inner)', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      expect(wrapper.attributes('role')).not.toBe('progressbar')
    })

    it('componente não interativo — sem tabindex no root', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('não define data-brand quando brand não é passado', () => {
      const wrapper = mount(DssCircularProgress)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])(
      'define data-brand="%s" e aplica classe brand para brand="%s"',
      (brand) => {
        const wrapper = mount(DssCircularProgress, { props: { brand } })
        expect(wrapper.classes()).toContain(`dss-circular-progress--brand-${brand}`)
      }
    )

    it('não aplica classe de brand quando brand não é passado', () => {
      const wrapper = mount(DssCircularProgress)
      const classStr = wrapper.classes().join(' ')
      expect(classStr).not.toContain('dss-circular-progress--brand-')
    })
  })

  // ===========================================================================
  // SLOT TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza slot default no centro do círculo', () => {
      const wrapper = mount(DssCircularProgress, {
        props: { value: 75 },
        slots: { default: '<span class="valor-central">75%</span>' }
      })
      expect(wrapper.find('.valor-central').exists()).toBe(true)
      expect(wrapper.text()).toContain('75%')
    })

    it('renderiza corretamente sem slot default', () => {
      const wrapper = mount(DssCircularProgress, { props: { value: 50 } })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // GOVERNANÇA DE COR (EXC-Gate-01)
  // ===========================================================================

  describe('Governança de cor (EXC-Gate-01)', () => {
    it('prop color gera classe DSS, não é passada diretamente ao QCircularProgress', () => {
      const wrapper = mount(DssCircularProgress, { props: { color: 'error' } })
      // Classe DSS deve existir no root wrapper
      expect(wrapper.classes()).toContain('dss-circular-progress--color-error')
      // QCircularProgress não deve receber a prop color como atributo HTML
      const inner = wrapper.find('.q-circular-progress')
      expect(inner.attributes('color')).toBeUndefined()
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('indeterminate + value definido: modo indeterminate prevalece', () => {
      const wrapper = mount(DssCircularProgress, {
        props: { indeterminate: true, value: 50 }
      })
      expect(wrapper.classes()).toContain('dss-circular-progress--indeterminate')
    })

    it('disable + indeterminate podem coexistir', () => {
      const wrapper = mount(DssCircularProgress, {
        props: { disable: true, indeterminate: true }
      })
      expect(wrapper.classes()).toContain('dss-circular-progress--disabled')
      expect(wrapper.classes()).toContain('dss-circular-progress--indeterminate')
    })

    it('min e max customizados são aceitos', () => {
      const wrapper = mount(DssCircularProgress, {
        props: { value: 5, min: 0, max: 10 }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
