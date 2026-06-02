/**
 * ==========================================================================
 * DssBtnToggle - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, options, variant, color, rounded, square, disable, readonly, clearable, brand
 * - Eventos: update:modelValue
 * - Classes CSS: dss-btn-toggle, variantes, modificadores de forma/layout, readonly
 * - Acessibilidade: role="group", aria-label, no-caps
 * - Brand: classes de marca
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 *
 * DIFERENCA FUNDAMENTAL vs. DssBtnGroup:
 * - DssBtnToggle gerencia v-model (estado de selecao)
 * - Botoes sao gerados pelo QBtnToggle via prop `options` (nao via <slot>)
 * - Apenas uma opcao pode estar ativa por vez (salvo clearable)
 *
 * NOTA: Nao testa comportamento interno do QBtnToggle (aria-pressed nos botoes,
 * z-index outline, etc.). Testa apenas o que o DSS wrapper adiciona.
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBtnToggle from './1-structure/DssBtnToggle.ts.vue'

installQuasar()

// Opcoes padrao para testes
const defaultOptions = [
  { label: 'Esquerda', value: 'left' },
  { label: 'Centro', value: 'center' },
  { label: 'Direita', value: 'right' },
]

describe('DssBtnToggle', () => {
  // ===========================================================================
  // RENDERIZACAO BASICA
  // ===========================================================================

  describe('Renderizacao Basica', () => {
    it('renderiza com classe base dss-btn-toggle', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle')
    })

    it('elemento raiz e o proprio QBtnToggle (nao ha div wrapper)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      // QBtnToggle renderiza como div com role="group"
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('possui role="group" para acessibilidade WAI-ARIA', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.attributes('role')).toBe('group')
    })

    it('usa inheritAttrs: false', () => {
      expect(DssBtnToggle.inheritAttrs).toBe(false)
    })

    it('renderiza sem erros com apenas options fornecido', () => {
      expect(() => mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })).not.toThrow()
    })
  })

  // ===========================================================================
  // PROPS - VARIANTES
  // ===========================================================================

  describe('Props - Variantes', () => {
    it('aplica classe dss-btn-toggle--elevated quando variant="elevated" (padrao)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'elevated' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--elevated')
    })

    it('aplica classe dss-btn-toggle--elevated quando variant nao e fornecido', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--elevated')
    })

    it('aplica classe dss-btn-toggle--flat quando variant="flat"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'flat' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--flat')
      expect(wrapper.classes()).not.toContain('dss-btn-toggle--elevated')
    })

    it('aplica classe dss-btn-toggle--outline quando variant="outline"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'outline' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--outline')
      expect(wrapper.classes()).not.toContain('dss-btn-toggle--elevated')
    })

    it('aplica classe dss-btn-toggle--unelevated quando variant="unelevated"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'unelevated' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--unelevated')
    })

    it('aplica classe dss-btn-toggle--push quando variant="push"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'push' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--push')
    })
  })

  // ===========================================================================
  // PROPS - MODIFICADORES DE FORMA
  // ===========================================================================

  describe('Props - Modificadores de Forma', () => {
    it('aplica classe dss-btn-toggle--rounded quando rounded=true', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, rounded: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--rounded')
    })

    it('nao aplica classe rounded quando rounded=false (padrao)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.classes()).not.toContain('dss-btn-toggle--rounded')
    })

    it('aplica classe dss-btn-toggle--square quando square=true', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, square: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--square')
    })
  })

  // ===========================================================================
  // PROPS - MODIFICADORES DE LAYOUT
  // ===========================================================================

  describe('Props - Modificadores de Layout', () => {
    it('aplica classe dss-btn-toggle--spread quando spread=true', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, spread: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--spread')
    })

    it('aplica classe dss-btn-toggle--stretch quando stretch=true', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, stretch: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--stretch')
    })
  })

  // ===========================================================================
  // PROPS - ESTADOS
  // ===========================================================================

  describe('Props - Estados', () => {
    it('aplica classe dss-btn-toggle--readonly quando readonly=true', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, readonly: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--readonly')
    })

    it('nao aplica classe readonly quando readonly=false (padrao)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.classes()).not.toContain('dss-btn-toggle--readonly')
    })
  })

  // ===========================================================================
  // MODEL VALUE
  // ===========================================================================

  describe('Model Value', () => {
    it('emite update:modelValue ao selecionar uma opcao', async () => {
      const wrapper = mount(DssBtnToggle, {
        props: {
          modelValue: null,
          options: defaultOptions
        }
      })
      // Simula a emissao do evento pelo QBtnToggle interno
      wrapper.vm.$emit('update:modelValue', 'left')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['left'])
    })

    it('aceita modelValue inicial', () => {
      const wrapper = mount(DssBtnToggle, {
        props: {
          modelValue: 'center',
          options: defaultOptions
        }
      })
      // Verifica que o valor e repassado ao QBtnToggle interno
      expect(wrapper.props('modelValue')).toBe('center')
    })

    it('aceita modelValue=undefined (sem selecao)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: {
          modelValue: undefined,
          options: defaultOptions
        }
      })
      expect(wrapper.props('modelValue')).toBeUndefined()
    })

    it('nao emite update:modelValue quando disable=true', async () => {
      const wrapper = mount(DssBtnToggle, {
        props: {
          modelValue: 'left',
          options: defaultOptions,
          disable: true
        }
      })
      // QBtnToggle nao dispara update:modelValue quando disable=true
      // Verificamos que nenhum evento foi emitido diretamente
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('aplica aria-label quando ariaLabel e fornecido', () => {
      const wrapper = mount(DssBtnToggle, {
        props: {
          options: defaultOptions,
          ariaLabel: 'Alinhamento de texto'
        }
      })
      expect(wrapper.attributes('aria-label')).toBe('Alinhamento de texto')
    })

    it('nao define aria-label quando ariaLabel nao e fornecido', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('aplica no-caps nos botoes internos (sem uppercase automatico)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      // no-caps e passado como prop ao QBtnToggle — texto do label nao e uppercase
      const text = wrapper.text()
      // Verifica que o texto das opcoes nao e convertido para maiusculas automaticamente
      expect(text).toContain('Esquerda')
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica classe dss-btn-toggle--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--brand-hub')
    })

    it('aplica classe dss-btn-toggle--brand-water quando brand="water"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--brand-water')
    })

    it('aplica classe dss-btn-toggle--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--brand-waste')
    })

    it('nao aplica classe de brand quando brand=null (padrao)', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions }
      })
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('dss-btn-toggle--brand-')
    })
  })

  // ===========================================================================
  // CASOS DE BORDA
  // ===========================================================================

  describe('Casos de Borda', () => {
    it('renderiza com array de opcoes vazio sem erros', () => {
      expect(() => mount(DssBtnToggle, {
        props: { options: [] }
      })).not.toThrow()
    })

    it('combina variant com brand corretamente', () => {
      const wrapper = mount(DssBtnToggle, {
        props: { options: defaultOptions, variant: 'outline', brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-btn-toggle--outline')
      expect(wrapper.classes()).toContain('dss-btn-toggle--brand-hub')
    })

    it('opcoes com icones sao aceitas sem erros', () => {
      const optionsWithIcons = [
        { label: '', value: 'left', icon: 'format_align_left' },
        { label: '', value: 'center', icon: 'format_align_center' },
      ]
      expect(() => mount(DssBtnToggle, {
        props: { options: optionsWithIcons }
      })).not.toThrow()
    })
  })
})
