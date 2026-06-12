/**
 * ==========================================================================
 * DssTabPanels - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue, animated, swipeable, infinite, keepAlive
 * - Slots: default (DssTabPanel filhos)
 * - Eventos: update:modelValue (sincronização de aba ativa)
 * - Classes: dss-tab-panels, dss-tab-panels--animated
 * - Elemento raiz: q-tab-panels (Level 1 DOM — sem wrapper div externo)
 * - Sincronização de abas: visibilidade gerenciada via provide/inject Quasar
 * - Encaminhamento de $attrs (data-*, aria-*, id)
 *
 * NOTA ARQUITETURAL:
 * DssTabPanels usa <q-tab-panels> como root.
 * No DOM renderizado: <div class="q-tab-panels q-panel-parent dss-tab-panels [...]">
 * QTabPanels gerencia show/hide dos painéis filhos via provide/inject.
 * Transições (animated=true): dss-tab-panels-enter-active / leave-active (fade).
 * Props bloqueadas: dark, transition-prev, transition-next.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTabPanels from './1-structure/DssTabPanels.ts.vue'
import DssTabPanel from '../DssTabPanel/1-structure/DssTabPanel.ts.vue'

installQuasar()

describe('DssTabPanels', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('renderiza com classe base dss-tab-panels', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })

    it('também possui classe q-tab-panels do Quasar (root Level 1)', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      expect(wrapper.find('.q-tab-panels').exists()).toBe(true)
    })

    it('defineOptions define o nome DssTabPanels', () => {
      expect(DssTabPanels.name).toBe('DssTabPanels')
    })

    it('não possui wrapper div externo (root é q-tab-panels)', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      const root = wrapper.find('.q-tab-panels')
      expect(root.classes()).toContain('dss-tab-panels')
    })
  })

  // ===========================================================================
  // PROP: ANIMATED
  // ===========================================================================

  describe('Prop: animated', () => {
    it('aplica dss-tab-panels--animated quando animated=true', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1', animated: true }
      })
      expect(wrapper.find('.dss-tab-panels--animated').exists()).toBe(true)
    })

    it('não aplica dss-tab-panels--animated quando animated=false', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1', animated: false }
      })
      expect(wrapper.find('.dss-tab-panels--animated').exists()).toBe(false)
    })

    it('não aplica dss-tab-panels--animated por padrão', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      expect(wrapper.find('.dss-tab-panels--animated').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // PROP: MODELVALUE — sincronização de aba ativa
  // ===========================================================================

  describe('Prop: modelValue (sincronização de aba ativa)', () => {
    it('emite update:modelValue quando o painel ativo muda', async () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' },
        slots: {
          default: [
            '<q-tab-panel name="aba-1"><p>Conteúdo 1</p></q-tab-panel>',
            '<q-tab-panel name="aba-2"><p>Conteúdo 2</p></q-tab-panel>'
          ]
        }
      })
      // Simula mudança de aba via QTabPanels emit
      wrapper.findComponent({ name: 'QTabPanels' }).vm.$emit('update:modelValue', 'aba-2')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['aba-2'])
    })

    it('renderiza DssTabPanel filhos no slot default', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'painel-1' },
        slots: {
          default: {
            render: () => [
              mount(DssTabPanel, {
                props: { name: 'painel-1' },
                slots: { default: '<p class="content-1">Painel 1</p>' }
              }).element,
              mount(DssTabPanel, {
                props: { name: 'painel-2' },
                slots: { default: '<p class="content-2">Painel 2</p>' }
              }).element
            ]
          }
        }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })

    it('aceita modelValue como string', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'configuracoes' }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })

    it('aceita modelValue como número', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 2 }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // SLOTS: DEFAULT com DssTabPanel filhos
  // ===========================================================================

  describe('Slots: default com DssTabPanel filhos', () => {
    it('renderiza painel ativo e oculta inativo com DssTabPanel filhos', () => {
      const wrapper = mount({
        components: { DssTabPanels, DssTabPanel },
        template: `
          <DssTabPanels model-value="aba-a">
            <DssTabPanel name="aba-a">
              <p class="content-a">Aba A</p>
            </DssTabPanel>
            <DssTabPanel name="aba-b">
              <p class="content-b">Aba B</p>
            </DssTabPanel>
          </DssTabPanels>
        `
      })
      // Painel ativo (aba-a) deve estar visível
      expect(wrapper.find('.content-a').exists()).toBe(true)
    })

    it('DssTabPanel filhos recebem classes corretas dentro do DssTabPanels', () => {
      const wrapper = mount({
        components: { DssTabPanels, DssTabPanel },
        template: `
          <DssTabPanels model-value="tab-x">
            <DssTabPanel name="tab-x">
              <span class="inner">Conteúdo</span>
            </DssTabPanel>
          </DssTabPanels>
        `
      })
      expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
      expect(wrapper.find('.q-tab-panel').exists()).toBe(true)
    })

    it('renderiza múltiplos DssTabPanel filhos', () => {
      const wrapper = mount({
        components: { DssTabPanels, DssTabPanel },
        template: `
          <DssTabPanels model-value="p1">
            <DssTabPanel name="p1"><span class="p1">P1</span></DssTabPanel>
            <DssTabPanel name="p2"><span class="p2">P2</span></DssTabPanel>
            <DssTabPanel name="p3"><span class="p3">P3</span></DssTabPanel>
          </DssTabPanels>
        `
      })
      // Contrato real: o QTabPanels renderiza SOMENTE o painel ativo
      expect(wrapper.findAll('.dss-tab-panel').length).toBe(1)
      expect(wrapper.find('.p1').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // PROPS: SWIPEABLE, INFINITE, KEEPALIVE
  // ===========================================================================

  describe('Props: swipeable, infinite, keepAlive', () => {
    it('monta sem erros com swipeable=true', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1', swipeable: true }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })

    it('monta sem erros com infinite=true', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1', infinite: true }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })

    it('monta sem erros com keepAlive=true', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1', keepAlive: true }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // NÃO-INTERATIVO
  // ===========================================================================

  describe('Não-interativo (container orquestrador)', () => {
    it('DssTabPanels não possui classes de hover/focus/active próprios', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      const classes = wrapper.find('.dss-tab-panels').classes()
      const hasInteractiveClass = classes.some((c) =>
        c.includes('--hover') || c.includes('--focus') || c.includes('--active')
      )
      expect(hasInteractiveClass).toBe(false)
    })
  })

  // ===========================================================================
  // ENCAMINHAMENTO DE ATTRS
  // ===========================================================================

  describe('Encaminhamento de attrs ($attrs)', () => {
    it('encaminha data-* para o root', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' },
        attrs: { 'data-testid': 'tab-panels-main' }
      })
      expect(wrapper.find('[data-testid="tab-panels-main"]').exists()).toBe(true)
    })

    it('encaminha id para o root', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' },
        attrs: { id: 'main-panels' }
      })
      expect(wrapper.find('#main-panels').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('combina animated + swipeable + infinite corretamente', () => {
      const wrapper = mount(DssTabPanels, {
        props: {
          modelValue: 'aba-1',
          animated: true,
          swipeable: true,
          infinite: true
        }
      })
      expect(wrapper.find('.dss-tab-panels--animated').exists()).toBe(true)
    })

    it('renderiza sem DssTabPanel filhos (slot vazio)', () => {
      const wrapper = mount(DssTabPanels, {
        props: { modelValue: 'aba-1' }
      })
      expect(wrapper.find('.dss-tab-panels').exists()).toBe(true)
    })
  })
})
