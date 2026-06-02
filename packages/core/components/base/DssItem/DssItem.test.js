/**
 * ==========================================================================
 * DssItem - UNIT TESTS
 *
 * COBERTURA:
 * - Props: label, caption, clickable, disabled, active, density, color, brand,
 *          inset, divider, ariaLabel, tabindex, leadingDecorative, trailingDecorative
 * - Classes DSS: dss-item, variantes --clickable, --disabled, --active,
 *                --default, --inset, --divider, --multiline, --brand-*, text-*
 * - Slots: leading, default, trailing
 * - aria-hidden em slots decorativos (leadingDecorative / trailingDecorative)
 * - Interatividade: role, tabindex, keyboard (enter/space), click event
 * - Estrutura: dss-item__leading, dss-item__content, dss-item__trailing
 * - data-brand
 *
 * GOLDEN CONTEXT: DssChip (interativo)
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssItem from './1-structure/DssItem.ts.vue'

installQuasar()

describe('DssItem', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('monta sem erros', () => {
      expect(() => mount(DssItem)).not.toThrow()
    })

    it('aplica classe dss-item ao elemento raiz', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.classes()).toContain('dss-item')
    })

    it('elemento raiz é uma div', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('aplica densidade padrão "default"', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.classes()).toContain('dss-item--default')
    })
  })

  // ===========================================================================
  // CONTEÚDO (label + caption)
  // ===========================================================================

  describe('Conteúdo', () => {
    it('renderiza label na área de conteúdo', () => {
      const wrapper = mount(DssItem, {
        props: { label: 'Configurações' }
      })
      expect(wrapper.find('.dss-item__label').exists()).toBe(true)
      expect(wrapper.find('.dss-item__label').text()).toBe('Configurações')
    })

    it('NÃO renderiza .dss-item__label sem label prop', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.find('.dss-item__label').exists()).toBe(false)
    })

    it('renderiza caption quando fornecido', () => {
      const wrapper = mount(DssItem, {
        props: { label: 'Ana Silva', caption: 'Administradora' }
      })
      expect(wrapper.find('.dss-item__caption').exists()).toBe(true)
      expect(wrapper.find('.dss-item__caption').text()).toBe('Administradora')
    })

    it('NÃO renderiza .dss-item__caption sem caption prop', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.find('.dss-item__caption').exists()).toBe(false)
    })

    it('caption aplica classe dss-item--multiline', () => {
      const wrapper = mount(DssItem, {
        props: { label: 'Título', caption: 'Subtítulo' }
      })
      expect(wrapper.classes()).toContain('dss-item--multiline')
    })

    it('sem caption NÃO aplica dss-item--multiline', () => {
      const wrapper = mount(DssItem, {
        props: { label: 'Apenas título' }
      })
      expect(wrapper.classes()).not.toContain('dss-item--multiline')
    })
  })

  // ===========================================================================
  // PROPS — ESTADOS
  // ===========================================================================

  describe('Props — Estados', () => {
    describe('clickable', () => {
      it('clickable=false por padrão — role="listitem"', () => {
        const wrapper = mount(DssItem)
        expect(wrapper.attributes('role')).toBe('listitem')
      })

      it('clickable=true aplica role="button"', () => {
        const wrapper = mount(DssItem, {
          props: { clickable: true }
        })
        expect(wrapper.attributes('role')).toBe('button')
      })

      it('clickable=true aplica classe dss-item--clickable', () => {
        const wrapper = mount(DssItem, {
          props: { clickable: true }
        })
        expect(wrapper.classes()).toContain('dss-item--clickable')
      })

      it('clickable=false NÃO aplica dss-item--clickable', () => {
        const wrapper = mount(DssItem)
        expect(wrapper.classes()).not.toContain('dss-item--clickable')
      })
    })

    describe('disabled', () => {
      it('disabled=true aplica dss-item--disabled', () => {
        const wrapper = mount(DssItem, {
          props: { disabled: true }
        })
        expect(wrapper.classes()).toContain('dss-item--disabled')
      })

      it('disabled=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItem)
        expect(wrapper.classes()).not.toContain('dss-item--disabled')
      })

      it('clickable+disabled: tabindex=-1', () => {
        const wrapper = mount(DssItem, {
          props: { clickable: true, disabled: true }
        })
        expect(wrapper.attributes('tabindex')).toBe('-1')
      })

      it('clickable+disabled: aria-disabled="true"', () => {
        const wrapper = mount(DssItem, {
          props: { clickable: true, disabled: true }
        })
        expect(wrapper.attributes('aria-disabled')).toBe('true')
      })

      it('static+disabled: aria-disabled NÃO presente', () => {
        const wrapper = mount(DssItem, {
          props: { clickable: false, disabled: true }
        })
        expect(wrapper.attributes('aria-disabled')).toBeUndefined()
      })
    })

    describe('active', () => {
      it('active=true aplica dss-item--active', () => {
        const wrapper = mount(DssItem, {
          props: { active: true }
        })
        expect(wrapper.classes()).toContain('dss-item--active')
      })

      it('active=false por padrão — sem classe modificadora', () => {
        const wrapper = mount(DssItem)
        expect(wrapper.classes()).not.toContain('dss-item--active')
      })
    })

    describe('inset', () => {
      it('inset=true aplica dss-item--inset', () => {
        const wrapper = mount(DssItem, {
          props: { inset: true }
        })
        expect(wrapper.classes()).toContain('dss-item--inset')
      })
    })

    describe('divider', () => {
      it('divider=true aplica dss-item--divider', () => {
        const wrapper = mount(DssItem, {
          props: { divider: true }
        })
        expect(wrapper.classes()).toContain('dss-item--divider')
      })
    })

    describe('density', () => {
      it.each(['default', 'compact', 'comfortable'])(
        'density="%s" aplica classe correspondente',
        (density) => {
          const wrapper = mount(DssItem, {
            props: { density }
          })
          expect(wrapper.classes()).toContain(`dss-item--${density}`)
        }
      )
    })

    describe('color', () => {
      it('sem brand: aplica text-primary por padrão', () => {
        const wrapper = mount(DssItem)
        expect(wrapper.classes()).toContain('text-primary')
      })

      it('sem brand: cor customizada aplica text-{color}', () => {
        const wrapper = mount(DssItem, {
          props: { color: 'secondary' }
        })
        expect(wrapper.classes()).toContain('text-secondary')
      })

      it('com brand: NÃO aplica classe text-*', () => {
        const wrapper = mount(DssItem, {
          props: { brand: 'hub', color: 'primary' }
        })
        expect(wrapper.classes()).not.toContain('text-primary')
      })
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('sem brand — NÃO aplica data-brand', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])('brand="%s" aplica data-brand', (brand) => {
      const wrapper = mount(DssItem, { props: { brand } })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })

    it('brand="hub" aplica classe dss-item--brand-hub', () => {
      const wrapper = mount(DssItem, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-item--brand-hub')
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza slot default no dss-item__content', () => {
      const wrapper = mount(DssItem, {
        slots: { default: '<span class="custom-content">Conteúdo</span>' }
      })
      const content = wrapper.find('.dss-item__content')
      expect(content.find('.custom-content').exists()).toBe(true)
    })

    it('slot default sobrescreve label+caption', () => {
      const wrapper = mount(DssItem, {
        props: { label: 'Label da prop', caption: 'Caption da prop' },
        slots: { default: '<span class="custom">Slot Override</span>' }
      })
      // Quando slot default é fornecido, label/caption ficam dentro do slot fallback
      // mas o slot de conteúdo é o slot default
      expect(wrapper.find('.custom').exists()).toBe(true)
    })

    it('slot leading cria dss-item__leading quando fornecido', () => {
      const wrapper = mount(DssItem, {
        slots: { leading: '<span class="icon-mock">icon</span>' }
      })
      expect(wrapper.find('.dss-item__leading').exists()).toBe(true)
      expect(wrapper.find('.icon-mock').exists()).toBe(true)
    })

    it('sem slot leading — NÃO renderiza dss-item__leading', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.find('.dss-item__leading').exists()).toBe(false)
    })

    it('slot trailing cria dss-item__trailing quando fornecido', () => {
      const wrapper = mount(DssItem, {
        slots: { trailing: '<span class="badge-mock">badge</span>' }
      })
      expect(wrapper.find('.dss-item__trailing').exists()).toBe(true)
      expect(wrapper.find('.badge-mock').exists()).toBe(true)
    })

    it('sem slot trailing — NÃO renderiza dss-item__trailing', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.find('.dss-item__trailing').exists()).toBe(false)
    })

    it('dss-item__content sempre está presente', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.find('.dss-item__content').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE — ARIA-HIDDEN EM SLOTS DECORATIVOS
  // ===========================================================================

  describe('Acessibilidade — aria-hidden em slots decorativos', () => {
    it('leadingDecorative=true: dss-item__leading tem aria-hidden="true"', () => {
      const wrapper = mount(DssItem, {
        props: { leadingDecorative: true },
        slots: { leading: '<span>icon</span>' }
      })
      expect(wrapper.find('.dss-item__leading').attributes('aria-hidden')).toBe('true')
    })

    it('leadingDecorative=false: dss-item__leading NÃO tem aria-hidden', () => {
      const wrapper = mount(DssItem, {
        props: { leadingDecorative: false },
        slots: { leading: '<span>icon</span>' }
      })
      expect(wrapper.find('.dss-item__leading').attributes('aria-hidden')).toBeUndefined()
    })

    it('trailingDecorative=true: dss-item__trailing tem aria-hidden="true"', () => {
      const wrapper = mount(DssItem, {
        props: { trailingDecorative: true },
        slots: { trailing: '<span>chevron</span>' }
      })
      expect(wrapper.find('.dss-item__trailing').attributes('aria-hidden')).toBe('true')
    })

    it('trailingDecorative=false: dss-item__trailing NÃO tem aria-hidden', () => {
      const wrapper = mount(DssItem, {
        props: { trailingDecorative: false },
        slots: { trailing: '<span>toggle</span>' }
      })
      expect(wrapper.find('.dss-item__trailing').attributes('aria-hidden')).toBeUndefined()
    })

    it('ariaLabel é aplicado ao elemento raiz quando fornecido', () => {
      const wrapper = mount(DssItem, {
        props: { ariaLabel: 'Ir para configurações' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Ir para configurações')
    })
  })

  // ===========================================================================
  // TABINDEX
  // ===========================================================================

  describe('Tabindex', () => {
    it('clickable=true: tabindex=0 por padrão', () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('static (não clickable): tabindex NÃO definido', () => {
      const wrapper = mount(DssItem)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('tabindex customizado via prop', () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true, tabindex: 3 }
      })
      expect(wrapper.attributes('tabindex')).toBe('3')
    })
  })

  // ===========================================================================
  // EVENTOS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite "click" quando clickable e clicado', async () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('NÃO emite "click" quando disabled', async () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true, disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('NÃO emite "click" quando não clickable', async () => {
      const wrapper = mount(DssItem)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emite "click" ao pressionar Enter (clickable)', async () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true }
      })
      await wrapper.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emite "click" ao pressionar Space (clickable)', async () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true }
      })
      await wrapper.trigger('keydown.space')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('NÃO emite "click" em Enter quando disabled', async () => {
      const wrapper = mount(DssItem, {
        props: { clickable: true, disabled: true }
      })
      await wrapper.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })
})
