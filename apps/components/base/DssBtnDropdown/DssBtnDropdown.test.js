/**
 * ==========================================================================
 * DssBtnDropdown - UNIT TESTS
 *
 * COBERTURA:
 * - Props: label, icon, variant, size, color, disable, split, rounded, dense, loading, brand
 * - Events: click, show, hide, before-show, before-hide
 * - Slots: default (conteudo do painel), label (trigger customizado)
 * - Classes CSS: dss-btn-dropdown, variantes, estados
 * - Brand: classes de marca, data-brand (via attrs)
 * - Estrutura: div wrapper + QBtnDropdown interno
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 * NOTA: Nao testa comportamento interno do QBtnDropdown (posicionamento, animacao).
 * Testa apenas o que o DSS adiciona: classes, eventos propagados, slots, brand.
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssBtnDropdown from './1-structure/DssBtnDropdown.ts.vue'

installQuasar()

describe('DssBtnDropdown', () => {
  // ===========================================================================
  // RENDERIZACAO BASICA
  // ===========================================================================

  describe('Renderizacao Basica', () => {
    it('renderiza com classe base dss-btn-dropdown', () => {
      const wrapper = mount(DssBtnDropdown)
      expect(wrapper.classes()).toContain('dss-btn-dropdown')
    })

    it('elemento raiz e uma div', () => {
      const wrapper = mount(DssBtnDropdown)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('contém elemento QBtnDropdown interno com classe dss-btn-dropdown__trigger', () => {
      const wrapper = mount(DssBtnDropdown)
      expect(wrapper.find('.dss-btn-dropdown__trigger').exists()).toBe(true)
    })

    it('renderiza label via prop', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { label: 'Opcoes' }
      })
      expect(wrapper.text()).toContain('Opcoes')
    })

    it('usa inheritAttrs: false', () => {
      expect(DssBtnDropdown.inheritAttrs).toBe(false)
    })
  })

  // ===========================================================================
  // PROPS - VARIANTES
  // ===========================================================================

  describe('Props - Variantes', () => {
    it('nao aplica classe de variante para elevated (padrao)', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { variant: 'elevated' }
      })
      expect(wrapper.classes()).not.toContain('dss-btn-dropdown--elevated')
    })

    it('aplica classe dss-btn-dropdown--flat quando variant="flat"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { variant: 'flat' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--flat')
    })

    it('aplica classe dss-btn-dropdown--outline quando variant="outline"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { variant: 'outline' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--outline')
    })

    it('aplica classe dss-btn-dropdown--unelevated quando variant="unelevated"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { variant: 'unelevated' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--unelevated')
    })
  })

  // ===========================================================================
  // PROPS - MODIFICADORES DE FORMA
  // ===========================================================================

  describe('Props - Modificadores de Forma', () => {
    it('aplica classe dss-btn-dropdown--rounded quando rounded=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { rounded: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--rounded')
    })

    it('aplica classe dss-btn-dropdown--square quando square=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { square: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--square')
    })

    it('aplica classe dss-btn-dropdown--dense quando dense=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { dense: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--dense')
    })

    it('aplica classe dss-btn-dropdown--split quando split=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { split: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--split')
    })
  })

  // ===========================================================================
  // PROPS - ESTADOS
  // ===========================================================================

  describe('Props - Estados', () => {
    it('aplica classe dss-btn-dropdown--disabled quando disable=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { disable: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--disabled')
    })

    it('nao aplica classe disabled quando disable=false', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { disable: false }
      })
      expect(wrapper.classes()).not.toContain('dss-btn-dropdown--disabled')
    })

    it('aplica classe dss-btn-dropdown--loading quando loading=true', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--loading')
    })

    it('nao aplica classe loading quando loading=false', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { loading: false }
      })
      expect(wrapper.classes()).not.toContain('dss-btn-dropdown--loading')
    })
  })

  // ===========================================================================
  // EVENTOS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite evento click ao clicar no trigger', async () => {
      const wrapper = mount(DssBtnDropdown)
      const trigger = wrapper.find('.dss-btn-dropdown__trigger')
      await trigger.trigger('click')
      expect(wrapper.emitted('click')).toBeDefined()
    })

    it('nao emite click quando disable=true', async () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { disable: true }
      })
      const trigger = wrapper.find('.dss-btn-dropdown__trigger')
      await trigger.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emite show quando painel e aberto', async () => {
      const wrapper = mount(DssBtnDropdown)
      // Simula o evento show propagado pelo QBtnDropdown
      wrapper.find('.dss-btn-dropdown__trigger').vm.$emit('show')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('show')).toBeDefined()
    })

    it('emite hide quando painel e fechado', async () => {
      const wrapper = mount(DssBtnDropdown)
      wrapper.find('.dss-btn-dropdown__trigger').vm.$emit('hide')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('hide')).toBeDefined()
    })

    it('emite before-show antes da abertura do painel', async () => {
      const wrapper = mount(DssBtnDropdown)
      wrapper.find('.dss-btn-dropdown__trigger').vm.$emit('before-show')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('before-show')).toBeDefined()
    })

    it('emite before-hide antes do fechamento do painel', async () => {
      const wrapper = mount(DssBtnDropdown)
      wrapper.find('.dss-btn-dropdown__trigger').vm.$emit('before-hide')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('before-hide')).toBeDefined()
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteudo do slot default (painel do dropdown)', () => {
      const wrapper = mount(DssBtnDropdown, {
        slots: { default: '<div class="panel-content">Menu item</div>' }
      })
      expect(wrapper.find('.panel-content').exists()).toBe(true)
    })

    it('renderiza conteudo do slot label no trigger', () => {
      const wrapper = mount(DssBtnDropdown, {
        slots: { label: '<span class="custom-label">Custom Trigger</span>' }
      })
      expect(wrapper.find('.custom-label').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica classe dss-btn-dropdown--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--brand-hub')
    })

    it('aplica classe dss-btn-dropdown--brand-water quando brand="water"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--brand-water')
    })

    it('aplica classe dss-btn-dropdown--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-btn-dropdown--brand-waste')
    })

    it('nao aplica classe de brand quando brand=null (padrao)', () => {
      const wrapper = mount(DssBtnDropdown)
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('dss-btn-dropdown--brand-')
    })
  })

  // ===========================================================================
  // POPUP-CONTENT-CLASS (painel teleportado)
  // ===========================================================================

  describe('Painel teleportado', () => {
    it('QBtnDropdown interno recebe popup-content-class="dss-btn-dropdown__panel"', () => {
      const wrapper = mount(DssBtnDropdown)
      const trigger = wrapper.find('.dss-btn-dropdown__trigger')
      // popup-content-class e repassado como atributo ao QBtnDropdown
      expect(trigger.attributes('popup-content-class')).toBe('dss-btn-dropdown__panel')
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('repassa aria-label para o QBtnDropdown quando ariaLabel e definido', () => {
      const wrapper = mount(DssBtnDropdown, {
        props: { ariaLabel: 'Abrir menu de opcoes' }
      })
      const trigger = wrapper.find('.dss-btn-dropdown__trigger')
      expect(trigger.attributes('aria-label')).toBe('Abrir menu de opcoes')
    })

    it('nao define aria-label quando ariaLabel e undefined', () => {
      const wrapper = mount(DssBtnDropdown)
      const trigger = wrapper.find('.dss-btn-dropdown__trigger')
      expect(trigger.attributes('aria-label')).toBeUndefined()
    })
  })
})
