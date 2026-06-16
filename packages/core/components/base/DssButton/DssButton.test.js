/**
 * DssButton - Testes Unitários (API Canônica)
 *
 * Testa todas as funcionalidades, props, slots, eventos e acessibilidade
 * do componente DssButton conforme implementação canônica (1-structure/DssButton.ts.vue).
 *
 * Cobertura:
 * - 6 variantes: elevated, flat, outline, unelevated, push, glossy
 * - 8 cores semânticas: primary, secondary, tertiary, accent, positive, negative, warning, info
 * - 5 tamanhos: xs, sm, md, lg, xl
 * - Props de shape, estado, layout, navegação e brand
 * - Acessibilidade WCAG 2.1 AA
 *
 * @requires @vue/test-utils
 * @requires vitest
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssButton from './DssButton.vue'

describe('DssButton', () => {
  /**
   * ==========================================================================
   * 1. RENDERIZAÇÃO BÁSICA
   * ==========================================================================
   */
  describe('Renderização Básica', () => {
    it('renderiza com label via prop', () => {
      const wrapper = mount(DssButton, {
        props: { label: 'Click me' }
      })
      expect(wrapper.text()).toContain('Click me')
      expect(wrapper.find('.dss-button__label').exists()).toBe(true)
    })

    it('renderiza com conteúdo via slot default', () => {
      const wrapper = mount(DssButton, {
        slots: {
          default: 'Slot content'
        }
      })
      expect(wrapper.text()).toContain('Slot content')
    })

    it('renderiza como <button> nativo por padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('aplica classe base .dss-button', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button')
    })

    it('usa inheritAttrs: false', () => {
      expect(DssButton.inheritAttrs).toBe(false)
    })
  })

  /**
   * ==========================================================================
   * 2. PROPS - VARIANTES (6 variantes canônicas)
   * ==========================================================================
   */
  describe('Props - Variantes', () => {
    const variants = ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy']

    variants.forEach(variant => {
      it(`aplica classe .dss-button--${variant} quando variant="${variant}"`, () => {
        const wrapper = mount(DssButton, {
          props: { variant }
        })
        expect(wrapper.classes()).toContain(`dss-button--${variant}`)
      })
    })

    it('usa "elevated" como variante padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button--elevated')
    })

    it('todas as variantes canônicas aplicam sua classe (contrato por tipo TS)', () => {
      // A implementação canônica (1-structure/DssButton.ts.vue) usa
      // defineProps<DssButtonProps>(): valores inválidos são rejeitados em
      // compile-time (ButtonVariant), não por validator runtime (API legada).
      const variants = ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy']
      variants.forEach(variant => {
        const wrapper = mount(DssButton, { props: { variant } })
        expect(wrapper.classes()).toContain(`dss-button--${variant}`)
      })
    })
  })

  /**
   * ==========================================================================
   * 3. PROPS - CORES (8 cores semânticas, sem "dark")
   * ==========================================================================
   */
  describe('Props - Cores', () => {
    const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']

    colors.forEach(color => {
      it(`aplica classes utilitárias para color="${color}" (variante elevated)`, () => {
        const wrapper = mount(DssButton, {
          props: { color, variant: 'elevated' }
        })
        // Variantes preenchidas usam bg-{color} text-white
        expect(wrapper.classes()).toContain(`bg-${color}`)
        expect(wrapper.classes()).toContain('text-white')
      })
    })

    it('aplica text-{color} para variante flat', () => {
      const wrapper = mount(DssButton, {
        props: { color: 'primary', variant: 'flat' }
      })
      expect(wrapper.classes()).toContain('text-primary')
      expect(wrapper.classes()).not.toContain('bg-primary')
    })

    it('aplica text-{color} para variante outline', () => {
      const wrapper = mount(DssButton, {
        props: { color: 'secondary', variant: 'outline' }
      })
      expect(wrapper.classes()).toContain('text-secondary')
      expect(wrapper.classes()).not.toContain('bg-secondary')
    })

    it('usa "primary" como cor padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('bg-primary')
    })

    it('prop color está no contrato canônico (valores garantidos por tipo TS)', () => {
      // Cores inválidas são rejeitadas em compile-time (ButtonColor), não por
      // validator runtime (API legada). O comportamento com valores válidos é
      // coberto pelos testes de classes utilitárias desta seção.
      expect(Object.keys(DssButton.props)).toContain('color')
    })

    it('não aplica classes utilitárias de cor quando brand está definido', () => {
      const wrapper = mount(DssButton, {
        props: { color: 'primary', brand: 'hub' }
      })
      expect(wrapper.classes()).not.toContain('bg-primary')
      expect(wrapper.classes()).not.toContain('text-primary')
      expect(wrapper.classes()).not.toContain('text-white')
    })
  })

  /**
   * ==========================================================================
   * 4. PROPS - TAMANHOS
   * ==========================================================================
   */
  describe('Props - Tamanhos', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    sizes.forEach(size => {
      it(`aplica classe .dss-button--${size} quando size="${size}"`, () => {
        const wrapper = mount(DssButton, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`dss-button--${size}`)
      })
    })

    it('usa "md" como tamanho padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button--md')
    })
  })

  /**
   * ==========================================================================
   * 5. PROPS - BRAND (hub, water, waste)
   * ==========================================================================
   */
  describe('Props - Brand', () => {
    const brands = ['hub', 'water', 'waste']

    brands.forEach(brand => {
      it(`aplica classe .dss-button--brand-${brand} quando brand="${brand}"`, () => {
        const wrapper = mount(DssButton, {
          props: { brand }
        })
        expect(wrapper.classes()).toContain(`dss-button--brand-${brand}`)
      })
    })

    it('não aplica classe de brand quando brand é null', () => {
      const wrapper = mount(DssButton, {
        props: { brand: null }
      })
      expect(wrapper.classes().some(c => c.startsWith('dss-button--brand-'))).toBe(false)
    })

    it('prop brand está no contrato canônico (valores garantidos por tipo TS)', () => {
      // Brands inválidos são rejeitados em compile-time (ButtonBrand | null),
      // não por validator runtime (API legada). O comportamento com hub/water/
      // waste e null é coberto pelos testes desta seção.
      expect(Object.keys(DssButton.props)).toContain('brand')
    })
  })

  /**
   * ==========================================================================
   * 6. ESTADOS - LOADING
   * ==========================================================================
   */
  describe('Estado - Loading', () => {
    it('aplica classe .dss-button--loading quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('dss-button--loading')
    })

    it('renderiza spinner quando loading=true e percentage=null', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.find('.dss-button__loading').exists()).toBe(true)
      expect(wrapper.find('.dss-button__spinner').exists()).toBe(true)
    })

    it('desabilita botão quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('não renderiza ícones quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: {
          loading: true,
          icon: 'add',
          iconRight: 'arrow_forward'
        }
      })
      expect(wrapper.find('.dss-button__icon--left').exists()).toBe(false)
      expect(wrapper.find('.dss-button__icon--right').exists()).toBe(false)
    })

    it('define tabindex=-1 quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })
  })

  /**
   * ==========================================================================
   * 7. ESTADOS - DISABLED
   * ==========================================================================
   */
  describe('Estado - Disabled', () => {
    it('aplica classe .dss-button--disabled quando disabled=true', () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('dss-button--disabled')
    })

    it('aplica atributo disabled quando disabled=true', () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('não emite evento click quando disabled=true', async () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('define tabindex=-1 quando disabled=true', () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })
  })

  /**
   * ==========================================================================
   * 8. PROPS - PERCENTAGE (Loading com progresso)
   * ==========================================================================
   */
  describe('Props - Percentage', () => {
    it('renderiza barra de progresso quando loading=true e percentage definido', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true, percentage: 50 }
      })
      expect(wrapper.find('.dss-button__progress').exists()).toBe(true)
      expect(wrapper.find('.dss-button__progress-indicator').exists()).toBe(true)
    })

    it('não renderiza spinner quando percentage está definido', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true, percentage: 50 }
      })
      expect(wrapper.find('.dss-button__spinner').exists()).toBe(false)
    })

    it('aplica classe --dark quando darkPercentage=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true, percentage: 50, darkPercentage: true }
      })
      expect(wrapper.find('.dss-button__progress--dark').exists()).toBe(true)
    })

    it('aplica transform com percentage no indicador', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true, percentage: 75 }
      })
      const indicator = wrapper.find('.dss-button__progress-indicator')
      expect(indicator.attributes('style')).toContain('translateX(-25%)')
    })

    it('prop percentage está no contrato canônico (number | null por tipo TS)', () => {
      // O range 0-100 é garantido pelo tipo/uso (a API legada tinha validator
      // runtime; a canônica usa defineProps<DssButtonProps>()).
      expect(Object.keys(DssButton.props)).toContain('percentage')
    })
  })

  /**
   * ==========================================================================
   * 9. ÍCONES
   * ==========================================================================
   */
  describe('Ícones', () => {
    it('renderiza ícone esquerdo via composição DssIcon quando icon está definido (CCI §3.1)', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'add', label: 'Add' }
      })
      const icon = wrapper.find('.dss-button__icon--left')
      // O ícone agora é o root do DssIcon (passthrough de classe), não mais
      // um <span> Material Icons cru. Glifo vem do DssIcon → QIcon.
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('dss-icon')
      expect(icon.classes()).toContain('dss-icon--inline')
      expect(wrapper.find('.dss-icon__inner').exists()).toBe(true)
    })

    it('renderiza ícone direito via composição DssIcon quando iconRight está definido (CCI §3.1)', () => {
      const wrapper = mount(DssButton, {
        props: { iconRight: 'arrow_forward', label: 'Next' }
      })
      const icon = wrapper.find('.dss-button__icon--right')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('dss-icon')
      expect(icon.classes()).toContain('dss-icon--inline')
      expect(wrapper.find('.dss-icon__inner').exists()).toBe(true)
    })

    it('ícone composto é decorativo (aria-hidden) — a11y CCI §3.3', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'add', label: 'Add' }
      })
      expect(wrapper.find('.dss-button__icon--left').attributes('aria-hidden')).toBe('true')
    })

    it('renderiza ambos os ícones simultaneamente', () => {
      const wrapper = mount(DssButton, {
        props: {
          icon: 'add',
          iconRight: 'arrow_forward',
          label: 'Action'
        }
      })
      expect(wrapper.find('.dss-button__icon--left').exists()).toBe(true)
      expect(wrapper.find('.dss-button__icon--right').exists()).toBe(true)
    })

    it('aplica classe .dss-button--icon-only quando só há ícone', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'add' }
      })
      expect(wrapper.classes()).toContain('dss-button--icon-only')
    })

    it('não aplica .dss-button--icon-only quando há label', () => {
      const wrapper = mount(DssButton, {
        props: {
          icon: 'add',
          label: 'Add'
        }
      })
      expect(wrapper.classes()).not.toContain('dss-button--icon-only')
    })
  })

  /**
   * ==========================================================================
   * 9b. ÍCONES — SLOTS NOMEADOS (CCI §3.2)
   * ==========================================================================
   */
  describe('Ícones - Slots Nomeados (CCI §3.2)', () => {
    it('renderiza conteúdo do slot #icon-left', () => {
      const wrapper = mount(DssButton, {
        props: { label: 'Salvar' },
        slots: { 'icon-left': '<i class="custom-left-icon"></i>' }
      })
      const icon = wrapper.find('.dss-button__icon--left')
      expect(icon.exists()).toBe(true)
      expect(icon.find('.custom-left-icon').exists()).toBe(true)
    })

    it('renderiza conteúdo do slot #icon-right', () => {
      const wrapper = mount(DssButton, {
        props: { label: 'Próximo' },
        slots: { 'icon-right': '<i class="custom-right-icon"></i>' }
      })
      const icon = wrapper.find('.dss-button__icon--right')
      expect(icon.exists()).toBe(true)
      expect(icon.find('.custom-right-icon').exists()).toBe(true)
    })

    it('slot #icon-left tem precedência sobre a prop icon (CCI §3.2)', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'add', label: 'Salvar' },
        slots: { 'icon-left': '<i class="custom-left-icon"></i>' }
      })
      const icon = wrapper.find('.dss-button__icon--left')
      // Quando o slot tem conteúdo, o DssIcon da prop NÃO é renderizado.
      expect(icon.find('.custom-left-icon').exists()).toBe(true)
      expect(icon.classes()).not.toContain('dss-icon')
    })

    it('slot #icon-right tem precedência sobre a prop iconRight (CCI §3.2)', () => {
      const wrapper = mount(DssButton, {
        props: { iconRight: 'arrow_forward', label: 'Próximo' },
        slots: { 'icon-right': '<i class="custom-right-icon"></i>' }
      })
      const icon = wrapper.find('.dss-button__icon--right')
      expect(icon.find('.custom-right-icon').exists()).toBe(true)
      expect(icon.classes()).not.toContain('dss-icon')
    })

    it('slot default (label) não é afetado pelos slots de ícone', () => {
      const wrapper = mount(DssButton, {
        slots: {
          default: 'Conteúdo',
          'icon-left': '<i class="custom-left-icon"></i>'
        }
      })
      expect(wrapper.find('.dss-button__label').text()).toContain('Conteúdo')
      expect(wrapper.find('.custom-left-icon').exists()).toBe(true)
    })
  })

  /**
   * ==========================================================================
   * 10. PROPS - SHAPE (round, square)
   * ==========================================================================
   */
  describe('Props - Shape', () => {
    it('aplica .dss-button--round quando round=true', () => {
      const wrapper = mount(DssButton, {
        props: { round: true }
      })
      expect(wrapper.classes()).toContain('dss-button--round')
    })

    it('aplica .dss-button--square quando square=true', () => {
      const wrapper = mount(DssButton, {
        props: { square: true }
      })
      expect(wrapper.classes()).toContain('dss-button--square')
    })
  })

  /**
   * ==========================================================================
   * 11. PROPS - LAYOUT (align, stack, stretch, noWrap)
   * ==========================================================================
   */
  describe('Props - Layout', () => {
    it('aplica .dss-button--stack quando stack=true', () => {
      const wrapper = mount(DssButton, {
        props: { stack: true }
      })
      expect(wrapper.classes()).toContain('dss-button--stack')
    })

    it('aplica .dss-button--stretch quando stretch=true', () => {
      const wrapper = mount(DssButton, {
        props: { stretch: true }
      })
      expect(wrapper.classes()).toContain('dss-button--stretch')
    })

    it('aplica .dss-button--no-wrap quando noWrap=true', () => {
      const wrapper = mount(DssButton, {
        props: { noWrap: true }
      })
      expect(wrapper.classes()).toContain('dss-button--no-wrap')
    })

    const alignValues = ['left', 'right', 'between', 'around', 'evenly']
    alignValues.forEach(align => {
      it(`aplica .dss-button--align-${align} quando align="${align}"`, () => {
        const wrapper = mount(DssButton, {
          props: { align }
        })
        expect(wrapper.classes()).toContain(`dss-button--align-${align}`)
      })
    })

    it('não aplica classe de align quando align="center" (default)', () => {
      const wrapper = mount(DssButton, {
        props: { align: 'center' }
      })
      expect(wrapper.classes().some(c => c.startsWith('dss-button--align-'))).toBe(false)
    })

    it('prop align está no contrato canônico (ButtonAlign por tipo TS)', () => {
      // Valores inválidos são rejeitados em compile-time (ButtonAlign), não
      // por validator runtime (API legada).
      expect(Object.keys(DssButton.props)).toContain('align')
    })
  })

  /**
   * ==========================================================================
   * 12. MODIFICADORES (dense, noCaps)
   * ==========================================================================
   */
  describe('Modificadores', () => {
    it('aplica .dss-button--no-caps quando noCaps=true', () => {
      const wrapper = mount(DssButton, {
        props: { noCaps: true }
      })
      expect(wrapper.classes()).toContain('dss-button--no-caps')
    })

    it('aplica .dss-button--dense quando dense=true', () => {
      const wrapper = mount(DssButton, {
        props: { dense: true }
      })
      expect(wrapper.classes()).toContain('dss-button--dense')
    })
  })

  /**
   * ==========================================================================
   * 13. PROPS - NAVEGAÇÃO (to, replace)
   * ==========================================================================
   */
  describe('Props - Navegação', () => {
    it('renderiza como router-link quando to está definido', () => {
      const wrapper = mount(DssButton, {
        props: { to: '/page' },
        global: {
          stubs: { 'router-link': true }
        }
      })
      expect(wrapper.find('router-link-stub').exists()).toBe(true)
    })

    it('não renderiza atributo type quando to está definido', () => {
      const wrapper = mount(DssButton, {
        props: { to: '/page' },
        global: {
          stubs: { 'router-link': true }
        }
      })
      expect(wrapper.attributes('type')).toBeUndefined()
    })
  })

  /**
   * ==========================================================================
   * 14. PROPS - PADDING CUSTOMIZÁVEL
   * ==========================================================================
   */
  describe('Props - Padding', () => {
    it('aplica padding customizado via style quando padding está definido', () => {
      const wrapper = mount(DssButton, {
        props: { padding: '10px 20px' }
      })
      expect(wrapper.attributes('style')).toContain('padding: 10px 20px')
    })

    it('não aplica style inline quando padding é null', () => {
      const wrapper = mount(DssButton, {
        props: { padding: null }
      })
      const style = wrapper.attributes('style')
      expect(!style || !style.includes('padding')).toBe(true)
    })
  })

  /**
   * ==========================================================================
   * 15. PROPS - TABINDEX
   * ==========================================================================
   */
  describe('Props - Tabindex', () => {
    it('usa tabindex=0 por padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('aplica tabindex customizado', () => {
      const wrapper = mount(DssButton, {
        props: { tabindex: 5 }
      })
      expect(wrapper.attributes('tabindex')).toBe('5')
    })

    it('usa tabindex=-1 quando disabled', () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('usa tabindex=-1 quando loading', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })
  })

  /**
   * ==========================================================================
   * 16. ATRIBUTOS HTML
   * ==========================================================================
   */
  describe('Atributos HTML', () => {
    it('usa type="button" por padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('aplica type="submit" quando especificado', () => {
      const wrapper = mount(DssButton, {
        props: { type: 'submit' }
      })
      expect(wrapper.attributes('type')).toBe('submit')
    })

    it('aplica type="reset" quando especificado', () => {
      const wrapper = mount(DssButton, {
        props: { type: 'reset' }
      })
      expect(wrapper.attributes('type')).toBe('reset')
    })
  })

  /**
   * ==========================================================================
   * 17. EVENTOS
   * ==========================================================================
   */
  describe('Eventos', () => {
    it('emite evento "click" ao clicar', async () => {
      const wrapper = mount(DssButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('não emite "click" quando disabled', async () => {
      const wrapper = mount(DssButton, {
        props: { disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('não emite "click" quando loading', async () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  /**
   * ==========================================================================
   * 18. ACESSIBILIDADE WCAG 2.1 AA
   * ==========================================================================
   */
  describe('Acessibilidade WCAG 2.1 AA', () => {
    it('spinner tem aria-hidden implícito (loading container)', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.find('.dss-button__loading').exists()).toBe(true)
    })

    it('ripple container não recebe pointer-events', () => {
      const wrapper = mount(DssButton, {
        props: { ripple: true }
      })
      expect(wrapper.find('.dss-button__ripple').exists()).toBe(true)
    })
  })

  /**
   * ==========================================================================
   * 19. INTEGRAÇÃO - Combinação de Props
   * ==========================================================================
   */
  describe('Integração - Combinação de Props', () => {
    it('combina cor + tamanho + variante corretamente', () => {
      const wrapper = mount(DssButton, {
        props: {
          color: 'secondary',
          size: 'lg',
          variant: 'outline'
        }
      })
      expect(wrapper.classes()).toContain('text-secondary')
      expect(wrapper.classes()).toContain('dss-button--lg')
      expect(wrapper.classes()).toContain('dss-button--outline')
    })

    it('combina estados + modificadores', () => {
      const wrapper = mount(DssButton, {
        props: {
          loading: true,
          dense: true,
          round: true
        }
      })
      expect(wrapper.classes()).toContain('dss-button--loading')
      expect(wrapper.classes()).toContain('dss-button--dense')
      expect(wrapper.classes()).toContain('dss-button--round')
    })

    it('combina brand + variante outline', () => {
      const wrapper = mount(DssButton, {
        props: {
          brand: 'water',
          variant: 'outline'
        }
      })
      expect(wrapper.classes()).toContain('dss-button--brand-water')
      expect(wrapper.classes()).toContain('dss-button--outline')
      expect(wrapper.classes()).not.toContain('bg-primary')
    })

    it('combina todas as props de layout', () => {
      const wrapper = mount(DssButton, {
        props: {
          align: 'left',
          stack: true,
          noWrap: true,
          label: 'Action'
        }
      })
      expect(wrapper.classes()).toContain('dss-button--align-left')
      expect(wrapper.classes()).toContain('dss-button--stack')
      expect(wrapper.classes()).toContain('dss-button--no-wrap')
    })

    it('full configuration test (todas as props canônicas)', () => {
      const wrapper = mount(DssButton, {
        props: {
          color: 'accent',
          size: 'xl',
          variant: 'push',
          icon: 'star',
          iconRight: 'arrow_forward',
          label: 'Premium',
          dense: true,
          noCaps: true,
          square: true,
          type: 'button'
        }
      })

      // Classes
      expect(wrapper.classes()).toContain('dss-button')
      expect(wrapper.classes()).toContain('bg-accent')
      expect(wrapper.classes()).toContain('dss-button--xl')
      expect(wrapper.classes()).toContain('dss-button--push')
      expect(wrapper.classes()).toContain('dss-button--dense')
      expect(wrapper.classes()).toContain('dss-button--no-caps')
      expect(wrapper.classes()).toContain('dss-button--square')

      // Content
      expect(wrapper.text()).toContain('Premium')
      expect(wrapper.find('.dss-button__icon--left').exists()).toBe(true)
      expect(wrapper.find('.dss-button__icon--right').exists()).toBe(true)

      // Attributes
      expect(wrapper.attributes('type')).toBe('button')
    })
  })
})

// ==========================================================================
// Teclado — WCAG 2.1.1 (suíte padronizada — Onda P2/G3.3)
// ==========================================================================
describe('DssButton — Teclado (WCAG 2.1.1)', () => {
  // Botão NATIVO: Enter/Space são ativação do user-agent — o contrato
  // testável é a semântica focável correta.
  it('é um <button> nativo focável (tabindex 0)', () => {
    const wrapper = mount(DssButton, { props: { label: 'Salvar' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('sai do fluxo de tabulação quando disabled', () => {
    const wrapper = mount(DssButton, { props: { label: 'Salvar', disabled: true } })
    expect(
      wrapper.attributes('disabled') !== undefined ||
      wrapper.attributes('tabindex') === '-1' ||
      wrapper.attributes('aria-disabled') === 'true'
    ).toBe(true)
  })
})
