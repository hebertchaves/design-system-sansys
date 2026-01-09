/**
 * DssButton - Testes Unitários
 *
 * Testa todas as funcionalidades, props, slots, eventos e acessibilidade
 * do componente DssButton seguindo as melhores práticas do DSS.
 *
 * @requires @vue/test-utils
 * @requires vitest ou jest
 */

import { describe, it, expect, beforeEach } from 'vitest'
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

    it('renderiza como <button> nativo', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('aplica classe base .dss-button', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button')
    })
  })

  /**
   * ==========================================================================
   * 2. PROPS - CORES
   * ==========================================================================
   */
  describe('Props - Cores', () => {
    const colors = ['primary', 'secondary', 'tertiary', 'accent', 'dark', 'positive', 'negative', 'warning', 'info']

    colors.forEach(color => {
      it(`aplica classe .dss-button--${color} quando color="${color}"`, () => {
        const wrapper = mount(DssButton, {
          props: { color }
        })
        expect(wrapper.classes()).toContain(`dss-button--${color}`)
      })
    })

    it('usa "primary" como cor padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button--primary')
    })

    it('rejeita cores inválidas (validator)', () => {
      // Teste de validação - deve falhar em desenvolvimento
      const validator = DssButton.props.color.validator
      expect(validator('primary')).toBe(true)
      expect(validator('invalid')).toBe(false)
    })
  })

  /**
   * ==========================================================================
   * 3. PROPS - TAMANHOS
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
   * 4. PROPS - VARIANTES
   * ==========================================================================
   */
  describe('Props - Variantes', () => {
    const variants = ['filled', 'outlined', 'flat', 'unelevated']

    variants.forEach(variant => {
      it(`aplica classe .dss-button--${variant} quando variant="${variant}"`, () => {
        const wrapper = mount(DssButton, {
          props: { variant }
        })
        expect(wrapper.classes()).toContain(`dss-button--${variant}`)
      })
    })

    it('usa "filled" como variante padrão', () => {
      const wrapper = mount(DssButton)
      expect(wrapper.classes()).toContain('dss-button--filled')
    })
  })

  /**
   * ==========================================================================
   * 5. ESTADOS - LOADING
   * ==========================================================================
   */
  describe('Estado - Loading', () => {
    it('aplica classe .dss-button--loading quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('dss-button--loading')
    })

    it('renderiza spinner quando loading=true', () => {
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

    it('aplica aria-busy="true" quando loading=true', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.attributes('aria-busy')).toBe('true')
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
  })

  /**
   * ==========================================================================
   * 6. ESTADOS - DISABLED
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
  })

  /**
   * ==========================================================================
   * 7. ÍCONES
   * ==========================================================================
   */
  describe('Ícones', () => {
    it('renderiza ícone esquerdo quando icon está definido', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'add' }
      })
      expect(wrapper.find('.dss-button__icon--left').exists()).toBe(true)
      expect(wrapper.find('.dss-button__icon--left').text()).toBe('add')
    })

    it('renderiza ícone direito quando iconRight está definido', () => {
      const wrapper = mount(DssButton, {
        props: { iconRight: 'arrow_forward' }
      })
      expect(wrapper.find('.dss-button__icon--right').exists()).toBe(true)
      expect(wrapper.find('.dss-button__icon--right').text()).toBe('arrow_forward')
    })

    it('renderiza ambos os ícones simultaneamente', () => {
      const wrapper = mount(DssButton, {
        props: {
          icon: 'add',
          iconRight: 'arrow_forward'
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
   * 8. SLOTS
   * ==========================================================================
   */
  describe('Slots', () => {
    it('renderiza slot de ícone esquerdo customizado', () => {
      const wrapper = mount(DssButton, {
        props: { icon: 'default' },
        slots: {
          icon: '<svg class="custom-icon">Custom</svg>'
        }
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.find('.custom-icon').text()).toBe('Custom')
    })

    it('renderiza slot de ícone direito customizado', () => {
      const wrapper = mount(DssButton, {
        props: { iconRight: 'default' },
        slots: {
          'icon-right': '<svg class="custom-icon-right">Custom Right</svg>'
        }
      })
      expect(wrapper.find('.custom-icon-right').exists()).toBe(true)
    })
  })

  /**
   * ==========================================================================
   * 9. EVENTOS
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

    it('passa o evento nativo para o handler', async () => {
      const wrapper = mount(DssButton)
      await wrapper.trigger('click')
      const clickEvents = wrapper.emitted('click')
      expect(clickEvents[0][0]).toBeInstanceOf(Event)
    })
  })

  /**
   * ==========================================================================
   * 10. MODIFICADORES
   * ==========================================================================
   */
  describe('Modificadores', () => {
    it('aplica .dss-button--no-caps quando noCaps=true', () => {
      const wrapper = mount(DssButton, {
        props: { noCaps: true }
      })
      expect(wrapper.classes()).toContain('dss-button--no-caps')
    })

    it('aplica .dss-button--round quando round=true', () => {
      const wrapper = mount(DssButton, {
        props: { round: true }
      })
      expect(wrapper.classes()).toContain('dss-button--round')
    })

    it('aplica .dss-button--dense quando dense=true', () => {
      const wrapper = mount(DssButton, {
        props: { dense: true }
      })
      expect(wrapper.classes()).toContain('dss-button--dense')
    })

    it('aplica .dss-button--block quando block=true', () => {
      const wrapper = mount(DssButton, {
        props: { block: true }
      })
      expect(wrapper.classes()).toContain('dss-button--block')
    })
  })

  /**
   * ==========================================================================
   * 11. ATRIBUTOS HTML
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
   * 12. ACESSIBILIDADE WCAG 2.1 AA
   * ==========================================================================
   */
  describe('Acessibilidade WCAG 2.1 AA', () => {
    it('aplica aria-label quando fornecido', () => {
      const wrapper = mount(DssButton, {
        props: { ariaLabel: 'Submit form' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Submit form')
    })

    it('aplica aria-busy="true" quando loading', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('spinner tem aria-hidden="true"', () => {
      const wrapper = mount(DssButton, {
        props: { loading: true }
      })
      expect(wrapper.find('.dss-button__loading').attributes('aria-hidden')).toBe('true')
    })

    it('ícones têm aria-hidden="true"', () => {
      const wrapper = mount(DssButton, {
        props: {
          icon: 'add',
          iconRight: 'arrow_forward'
        }
      })
      expect(wrapper.find('.dss-button__icon--left').attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('.dss-button__icon--right').attributes('aria-hidden')).toBe('true')
    })

    it('botão icon-only DEVE ter aria-label', () => {
      // Teste para garantir que desenvolvedores usem aria-label em botões icon-only
      const wrapper = mount(DssButton, {
        props: {
          icon: 'delete',
          ariaLabel: 'Delete item'
        }
      })
      expect(wrapper.attributes('aria-label')).toBe('Delete item')
    })
  })

  /**
   * ==========================================================================
   * 13. INTEGRAÇÃO - Múltiplas Props Combinadas
   * ==========================================================================
   */
  describe('Integração - Combinação de Props', () => {
    it('combina cor + tamanho + variante corretamente', () => {
      const wrapper = mount(DssButton, {
        props: {
          color: 'secondary',
          size: 'lg',
          variant: 'outlined'
        }
      })
      expect(wrapper.classes()).toContain('dss-button--secondary')
      expect(wrapper.classes()).toContain('dss-button--lg')
      expect(wrapper.classes()).toContain('dss-button--outlined')
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

    it('full configuration test', () => {
      const wrapper = mount(DssButton, {
        props: {
          color: 'accent',
          size: 'xl',
          variant: 'flat',
          icon: 'star',
          iconRight: 'arrow_forward',
          label: 'Premium',
          dense: true,
          noCaps: true,
          ariaLabel: 'Upgrade to premium',
          type: 'button'
        }
      })

      // Classes
      expect(wrapper.classes()).toContain('dss-button')
      expect(wrapper.classes()).toContain('dss-button--accent')
      expect(wrapper.classes()).toContain('dss-button--xl')
      expect(wrapper.classes()).toContain('dss-button--flat')
      expect(wrapper.classes()).toContain('dss-button--dense')
      expect(wrapper.classes()).toContain('dss-button--no-caps')

      // Content
      expect(wrapper.text()).toContain('Premium')
      expect(wrapper.find('.dss-button__icon--left').exists()).toBe(true)
      expect(wrapper.find('.dss-button__icon--right').exists()).toBe(true)

      // Attributes
      expect(wrapper.attributes('aria-label')).toBe('Upgrade to premium')
      expect(wrapper.attributes('type')).toBe('button')
    })
  })
})
