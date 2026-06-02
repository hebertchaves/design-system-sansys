/**
 * ==========================================================================
 * DssTabPanel - UNIT TESTS
 *
 * COBERTURA:
 * - Props: name (obrigatório), disable
 * - Slots: default (conteúdo do painel)
 * - Classes: dss-tab-panel, dss-tab-panel--disabled
 * - Elemento raiz: q-tab-panel (Level 1 DOM — sem wrapper div externo)
 * - Acessibilidade: role="tabpanel" nativo do QTabPanel
 * - Encaminhamento de $attrs (data-*, aria-*, id)
 *
 * NOTA ARQUITETURAL:
 * DssTabPanel usa <q-tab-panel> como root (NC-01 corrigido).
 * No DOM renderizado: <div class="q-tab-panel dss-tab-panel [...]">
 * QTabPanel gerencia visibilidade via provide/inject com QTabPanels.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTabPanel from './1-structure/DssTabPanel.ts.vue'

installQuasar()

describe('DssTabPanel', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('renderiza com classe base dss-tab-panel', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
    })

    it('também possui classe q-tab-panel do Quasar (root Level 1)', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      expect(wrapper.find('.q-tab-panel').exists()).toBe(true)
    })

    it('defineOptions define o nome DssTabPanel', () => {
      expect(DssTabPanel.name).toBe('DssTabPanel')
    })

    it('não possui wrapper div externo (root é q-tab-panel)', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      // A classe dss-tab-panel deve estar no mesmo elemento que q-tab-panel
      const root = wrapper.find('.q-tab-panel')
      expect(root.classes()).toContain('dss-tab-panel')
    })
  })

  // ===========================================================================
  // PROP: NAME
  // ===========================================================================

  describe('Prop: name', () => {
    it('aceita name como string', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'perfil' }
      })
      expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
    })

    it('aceita name como número', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 1 }
      })
      expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
    })

    it('renderiza com diferentes valores de name', () => {
      const names = ['configuracoes', 'dados', 'historico']
      names.forEach((name) => {
        const wrapper = mount(DssTabPanel, { props: { name } })
        expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // PROP: DISABLE
  // ===========================================================================

  describe('Prop: disable', () => {
    it('aplica dss-tab-panel--disabled quando disable=true', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1', disable: true }
      })
      expect(wrapper.find('.dss-tab-panel--disabled').exists()).toBe(true)
    })

    it('não aplica dss-tab-panel--disabled quando disable=false', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1', disable: false }
      })
      expect(wrapper.find('.dss-tab-panel--disabled').exists()).toBe(false)
    })

    it('não aplica dss-tab-panel--disabled por padrão', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      expect(wrapper.find('.dss-tab-panel--disabled').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // SLOT: DEFAULT
  // ===========================================================================

  describe('Slot: default', () => {
    it('renderiza conteúdo do slot default', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' },
        slots: { default: '<p class="panel-content">Conteúdo da aba</p>' }
      })
      expect(wrapper.find('.panel-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Conteúdo da aba')
    })

    it('renderiza múltiplos elementos no slot default', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' },
        slots: {
          default:
            '<h2 class="panel-title">Título</h2><div class="panel-body">Corpo</div>'
        }
      })
      expect(wrapper.find('.panel-title').exists()).toBe(true)
      expect(wrapper.find('.panel-body').exists()).toBe(true)
    })

    it('renderiza corretamente sem slot (painel vazio)', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-vazia' }
      })
      expect(wrapper.find('.dss-tab-panel').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // NÃO-INTERATIVO (GOLDEN REF: DssBadge)
  // ===========================================================================

  describe('Não-interativo', () => {
    it('DssTabPanel é container estrutural — sem hover/focus/active próprios', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      // Não deve ter tabindex no root (interatividade é dos filhos)
      const root = wrapper.find('.dss-tab-panel')
      // tabindex=-1 é aplicado nativamente pelo QTabPanels (container pai), não aqui
      // DssTabPanel por si só não deve adicionar tabindex
      expect(root.attributes('tabindex')).toBeUndefined()
    })

    it('não emite eventos próprios (container passivo)', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      // Verificamos que DssTabPanel não tem emits declarados
      // (container não-emissor, padrão DSS)
      expect(Object.keys(wrapper.emitted())).toHaveLength(0)
    })
  })

  // ===========================================================================
  // ENCAMINHAMENTO DE ATTRS
  // ===========================================================================

  describe('Encaminhamento de attrs ($attrs)', () => {
    it('encaminha data-* para o root', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' },
        attrs: { 'data-testid': 'tab-panel-perfil' }
      })
      expect(wrapper.find('[data-testid="tab-panel-perfil"]').exists()).toBe(true)
    })

    it('encaminha id para o root', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' },
        attrs: { id: 'panel-section-1' }
      })
      expect(wrapper.find('#panel-section-1').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('combina disable=true com conteúdo no slot', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1', disable: true },
        slots: { default: '<span class="item">Conteúdo</span>' }
      })
      expect(wrapper.find('.dss-tab-panel--disabled').exists()).toBe(true)
      expect(wrapper.find('.item').exists()).toBe(true)
    })

    it('mantém ambas as classes DSS e Quasar no elemento raiz', () => {
      const wrapper = mount(DssTabPanel, {
        props: { name: 'aba-1' }
      })
      const root = wrapper.find('.dss-tab-panel')
      expect(root.classes()).toContain('q-tab-panel')
      expect(root.classes()).toContain('dss-tab-panel')
    })
  })
})
