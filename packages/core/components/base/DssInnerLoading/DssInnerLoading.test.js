/**
 * ==========================================================================
 * DssInnerLoading - UNIT TESTS
 *
 * COBERTURA:
 * - Props: showing, color, size, label, delay, brand
 * - Props BLOQUEADAS: NÃO expostas ao consumer (color/size/label controlados via slot/CSS)
 * - Estrutura: QInnerLoading como root element (EXC-Gate-01)
 * - Classes raiz: dss-inner-loading, dss-inner-loading--color-*,
 *                 dss-inner-loading--size-*, dss-inner-loading--brand-*,
 *                 dss-inner-loading--has-label
 * - role="status" + aria-live="polite" no root
 * - DssSpinner interno com aria-hidden="true" (semântica de status no root)
 * - Slot default: substitui DssSpinner + label quando preenchido
 * - data-brand: ativa cascade de tokens de brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssInnerLoading usa QInnerLoading como root (EXC-Gate-01).
 * CSS `color` como canal de cor — DssSpinner herda via currentColor (sem prop color).
 * defineEmits omitido — container não-emissor.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssInnerLoading from './1-structure/DssInnerLoading.ts.vue'

installQuasar()

describe('DssInnerLoading', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza sem erros com showing=true', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.exists()).toBe(true)
    })

    it('renderiza sem erros com showing=false', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: false } })
      expect(wrapper.exists()).toBe(true)
    })

    it('usa QInnerLoading como root element (EXC-Gate-01)', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      // QInnerLoading renderiza com classe q-inner-loading
      // Root do QInnerLoading é um <transition>; a classe vive no conteúdo
      expect(wrapper.find('.q-inner-loading').exists()).toBe(true)
    })

    it('aplica classe base dss-inner-loading', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.classes()).toContain('dss-inner-loading')
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE — ROLE E ARIA
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('root tem role="status"', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.attributes('role')).toBe('status')
    })

    it('root tem aria-live="polite"', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })

    it('root não tem role="progressbar" (responsabilidade do DssSpinner interno)', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.attributes('role')).not.toBe('progressbar')
    })

    it('componente não interativo — sem tabindex no root', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('aplica color padrão primary quando nenhuma prop de cor é passada', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.classes()).toContain('dss-inner-loading--color-primary')
    })

    it('aplica size padrão md quando nenhuma prop de tamanho é passada', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.classes()).toContain('dss-inner-loading--size-md')
    })

    describe('showing', () => {
      it('showing=true: overlay está no DOM', () => {
        const wrapper = mount(DssInnerLoading, { props: { showing: true } })
        expect(wrapper.classes()).toContain('dss-inner-loading')
      })

      it('showing=false: componente ainda é montado (visibilidade gerenciada pelo Quasar)', () => {
        const wrapper = mount(DssInnerLoading, { props: { showing: false } })
        // QInnerLoading gerencia a visibilidade internamente via Transition
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('color', () => {
      it.each(['primary', 'secondary', 'error', 'success', 'warning', 'info'])(
        'aplica classe dss-inner-loading--color-%s para color="%s"',
        (color) => {
          const wrapper = mount(DssInnerLoading, {
            props: { showing: true, color }
          })
          expect(wrapper.classes()).toContain(`dss-inner-loading--color-${color}`)
        }
      )
    })

    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg', 'xl'])(
        'aplica classe dss-inner-loading--size-%s para size="%s"',
        (size) => {
          const wrapper = mount(DssInnerLoading, {
            props: { showing: true, size }
          })
          expect(wrapper.classes()).toContain(`dss-inner-loading--size-${size}`)
        }
      )
    })

    describe('label', () => {
      it('aplica classe dss-inner-loading--has-label quando label é passado', () => {
        const wrapper = mount(DssInnerLoading, {
          props: { showing: true, label: 'Carregando...' }
        })
        expect(wrapper.classes()).toContain('dss-inner-loading--has-label')
      })

      it('não aplica classe has-label quando label não é passado', () => {
        const wrapper = mount(DssInnerLoading, { props: { showing: true } })
        expect(wrapper.classes()).not.toContain('dss-inner-loading--has-label')
      })

      it('renderiza label quando showing=true e label é passado', () => {
        const wrapper = mount(DssInnerLoading, {
          props: { showing: true, label: 'Processando' }
        })
        expect(wrapper.text()).toContain('Processando')
      })

      it('não renderiza label quando label não é passado', () => {
        const wrapper = mount(DssInnerLoading, { props: { showing: true } })
        expect(wrapper.find('.dss-inner-loading__label').exists()).toBe(false)
      })
    })

    describe('delay', () => {
      it('aceita delay em milissegundos sem erro', () => {
        const wrapper = mount(DssInnerLoading, {
          props: { showing: true, delay: 200 }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // SPINNER INTERNO
  // ===========================================================================

  describe('Spinner interno', () => {
    it('DssSpinner é renderizado dentro do overlay quando showing=true', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      // DssSpinner renderiza com classe dss-spinner
      const spinner = wrapper.find('.dss-spinner')
      expect(spinner.exists()).toBe(true)
    })

    it('DssSpinner interno tem aria-hidden="true"', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      const spinner = wrapper.find('.dss-spinner')
      if (spinner.exists()) {
        expect(spinner.attributes('aria-hidden')).toBe('true')
      }
    })
  })

  // ===========================================================================
  // SLOT TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('slot default substitui DssSpinner e label internos', () => {
      const wrapper = mount(DssInnerLoading, {
        props: { showing: true },
        slots: { default: '<div class="custom-content">Conteúdo customizado</div>' }
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Conteúdo customizado')
    })

    it('slot default substitui DssSpinner — spinner padrão não aparece', () => {
      const wrapper = mount(DssInnerLoading, {
        props: { showing: true },
        slots: { default: '<div class="meu-loading">...</div>' }
      })
      // DssSpinner padrão não deve aparecer quando slot é preenchido
      expect(wrapper.find('.dss-spinner').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('não define data-brand quando brand não é passado', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica classe brand para brand="%s"',
      (brand) => {
        const wrapper = mount(DssInnerLoading, {
          props: { showing: true, brand }
        })
        expect(wrapper.classes()).toContain(`dss-inner-loading--brand-${brand}`)
      }
    )

    it('não aplica classe de brand quando brand não é passado', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      const classStr = wrapper.classes().join(' ')
      expect(classStr).not.toContain('dss-inner-loading--brand-')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('label + slot default: slot prevalece (slot substitui label interno)', () => {
      const wrapper = mount(DssInnerLoading, {
        props: { showing: true, label: 'Texto padrão' },
        slots: { default: '<span class="override">Override</span>' }
      })
      expect(wrapper.find('.override').exists()).toBe(true)
      expect(wrapper.find('.dss-inner-loading__label').exists()).toBe(false)
    })

    it('showing alterna de true para false via reactive props', async () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      await wrapper.setProps({ showing: false })
      expect(wrapper.exists()).toBe(true)
    })

    it('showing alterna de false para true via reactive props', async () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: false } })
      await wrapper.setProps({ showing: true })
      expect(wrapper.exists()).toBe(true)
    })

    it('não emite eventos — container não-emissor (defineEmits omitido)', () => {
      const wrapper = mount(DssInnerLoading, { props: { showing: true } })
      // Sem eventos declarados: nenhum evento deve ser emitido
      expect(Object.keys(wrapper.emitted())).toHaveLength(0)
    })
  })
})
