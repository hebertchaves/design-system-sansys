/**
 * ==========================================================================
 * DssFab - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, icon, activeIcon, label, color, direction, disable, brand
 * - Eventos: update:modelValue, click, show, hide, before-show, before-hide
 * - Slots: default (DssFabAction filhos)
 * - Classes CSS: dss-fab, dss-fab--extended, dss-fab--direction-*, dss-fab--disabled
 * - Estrutura: div wrapper com dss-fab, QFab interno com dss-fab__qfab
 * - Brand: classes de marca no wrapper
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 *
 * NOTA: Nao testa comportamento interno do QFab (animacao de expansao,
 * posicionamento, acessibilidade WAI-ARIA dos filhos).
 * Testa apenas o que o DSS wrapper adiciona: classes, eventos propagados,
 * estrutura de dois niveis (div > QFab), brand.
 *
 * POSICIONAMENTO: Gerenciado pelo consumidor (tipicamente DssPageSticky).
 * NÃO testado aqui.
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssFab from './1-structure/DssFab.ts.vue'

installQuasar()

describe('DssFab', () => {
  // ===========================================================================
  // RENDERIZACAO BASICA
  // ===========================================================================

  describe('Renderizacao Basica', () => {
    it('renderiza com classe base dss-fab no wrapper', () => {
      const wrapper = mount(DssFab)
      expect(wrapper.classes()).toContain('dss-fab')
    })

    it('elemento raiz e uma div (wrapper externo)', () => {
      const wrapper = mount(DssFab)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('contem QFab interno com classe dss-fab__qfab', () => {
      const wrapper = mount(DssFab)
      expect(wrapper.find('.dss-fab__qfab').exists()).toBe(true)
    })

    it('usa inheritAttrs: false', () => {
      expect(DssFab.inheritAttrs).toBe(false)
    })

    it('renderiza sem erros com props padrao', () => {
      expect(() => mount(DssFab)).not.toThrow()
    })
  })

  // ===========================================================================
  // PROPS - ESTADO ABERTO/FECHADO (modelValue)
  // ===========================================================================

  describe('Props - modelValue (aberto/fechado)', () => {
    it('aceita modelValue=false (fechado, padrao)', () => {
      const wrapper = mount(DssFab, {
        props: { modelValue: false }
      })
      expect(wrapper.props('modelValue')).toBe(false)
    })

    it('aceita modelValue=true (aberto)', () => {
      const wrapper = mount(DssFab, {
        props: { modelValue: true }
      })
      expect(wrapper.props('modelValue')).toBe(true)
    })

    it('emite update:modelValue ao alternar estado', async () => {
      const wrapper = mount(DssFab, {
        props: { modelValue: false }
      })
      wrapper.find('.dss-fab__qfab').vm.$emit('update:modelValue', true)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('emite update:modelValue com false ao fechar', async () => {
      const wrapper = mount(DssFab, {
        props: { modelValue: true }
      })
      wrapper.find('.dss-fab__qfab').vm.$emit('update:modelValue', false)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })
  })

  // ===========================================================================
  // PROPS - CONTEUDO VISUAL
  // ===========================================================================

  describe('Props - Conteudo Visual', () => {
    it('nao aplica classe dss-fab--extended quando sem label', () => {
      const wrapper = mount(DssFab)
      expect(wrapper.classes()).not.toContain('dss-fab--extended')
    })

    it('aplica classe dss-fab--extended quando label e fornecido', () => {
      const wrapper = mount(DssFab, {
        props: { label: 'Criar' }
      })
      expect(wrapper.classes()).toContain('dss-fab--extended')
    })

    it('aplica classe dss-fab--extended para qualquer string de label', () => {
      const wrapper = mount(DssFab, {
        props: { label: 'Adicionar novo item' }
      })
      expect(wrapper.classes()).toContain('dss-fab--extended')
    })
  })

  // ===========================================================================
  // PROPS - DIRECAO DE EXPANSAO
  // ===========================================================================

  describe('Props - Direcao de Expansao', () => {
    it('nao aplica classe de direcao quando direction="up" (padrao)', () => {
      const wrapper = mount(DssFab, {
        props: { direction: 'up' }
      })
      expect(wrapper.classes()).not.toContain('dss-fab--direction-up')
    })

    it('aplica classe dss-fab--direction-down quando direction="down"', () => {
      const wrapper = mount(DssFab, {
        props: { direction: 'down' }
      })
      expect(wrapper.classes()).toContain('dss-fab--direction-down')
    })

    it('aplica classe dss-fab--direction-left quando direction="left"', () => {
      const wrapper = mount(DssFab, {
        props: { direction: 'left' }
      })
      expect(wrapper.classes()).toContain('dss-fab--direction-left')
    })

    it('aplica classe dss-fab--direction-right quando direction="right"', () => {
      const wrapper = mount(DssFab, {
        props: { direction: 'right' }
      })
      expect(wrapper.classes()).toContain('dss-fab--direction-right')
    })
  })

  // ===========================================================================
  // PROPS - ESTADO DISABLED
  // ===========================================================================

  describe('Props - Estado Disabled', () => {
    it('aplica classe dss-fab--disabled quando disable=true', () => {
      const wrapper = mount(DssFab, {
        props: { disable: true }
      })
      expect(wrapper.classes()).toContain('dss-fab--disabled')
    })

    it('nao aplica classe disabled quando disable=false (padrao)', () => {
      const wrapper = mount(DssFab)
      expect(wrapper.classes()).not.toContain('dss-fab--disabled')
    })
  })

  // ===========================================================================
  // EVENTOS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite click ao clicar no FAB', async () => {
      const wrapper = mount(DssFab)
      await wrapper.find('.dss-fab__qfab').trigger('click')
      expect(wrapper.emitted('click')).toBeDefined()
    })

    it('emite show ao abrir o FAB', async () => {
      const wrapper = mount(DssFab)
      wrapper.find('.dss-fab__qfab').vm.$emit('show')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('show')).toBeDefined()
    })

    it('emite hide ao fechar o FAB', async () => {
      const wrapper = mount(DssFab)
      wrapper.find('.dss-fab__qfab').vm.$emit('hide')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('hide')).toBeDefined()
    })

    it('emite before-show antes da abertura', async () => {
      const wrapper = mount(DssFab)
      wrapper.find('.dss-fab__qfab').vm.$emit('before-show')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('before-show')).toBeDefined()
    })

    it('emite before-hide antes do fechamento', async () => {
      const wrapper = mount(DssFab)
      wrapper.find('.dss-fab__qfab').vm.$emit('before-hide')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('before-hide')).toBeDefined()
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteudo do slot default (DssFabAction filhos)', () => {
      const wrapper = mount(DssFab, {
        slots: { default: '<div class="fab-action-mock">Acao</div>' }
      })
      expect(wrapper.find('.fab-action-mock').exists()).toBe(true)
    })

    it('renderiza multiplos filhos via slot default', () => {
      const wrapper = mount(DssFab, {
        slots: {
          default: `
            <div class="action-1">Acao 1</div>
            <div class="action-2">Acao 2</div>
          `
        }
      })
      expect(wrapper.find('.action-1').exists()).toBe(true)
      expect(wrapper.find('.action-2').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica classe dss-fab--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssFab, {
        props: { brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-fab--brand-hub')
    })

    it('aplica classe dss-fab--brand-water quando brand="water"', () => {
      const wrapper = mount(DssFab, {
        props: { brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-fab--brand-water')
    })

    it('aplica classe dss-fab--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssFab, {
        props: { brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-fab--brand-waste')
    })

    it('nao aplica classe de brand quando brand=null (padrao)', () => {
      const wrapper = mount(DssFab)
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('dss-fab--brand-')
    })

    it('classes de brand sao aplicadas no wrapper externo (div), nao no QFab interno', () => {
      const wrapper = mount(DssFab, {
        props: { brand: 'hub' }
      })
      // Classe de brand deve estar no wrapper raiz
      expect(wrapper.classes()).toContain('dss-fab--brand-hub')
      // QFab interno nao deve ter a classe de brand diretamente
      const qfab = wrapper.find('.dss-fab__qfab')
      expect(qfab.classes()).not.toContain('dss-fab--brand-hub')
    })
  })

  // ===========================================================================
  // CASOS DE BORDA
  // ===========================================================================

  describe('Casos de Borda', () => {
    it('combina label, disable e brand corretamente', () => {
      const wrapper = mount(DssFab, {
        props: { label: 'Criar', disable: true, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-fab--extended')
      expect(wrapper.classes()).toContain('dss-fab--disabled')
      expect(wrapper.classes()).toContain('dss-fab--brand-water')
    })

    it('combina direction com brand', () => {
      const wrapper = mount(DssFab, {
        props: { direction: 'right', brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-fab--direction-right')
      expect(wrapper.classes()).toContain('dss-fab--brand-waste')
    })
  })
})
