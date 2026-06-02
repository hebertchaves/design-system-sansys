/**
 * ==========================================================================
 * DssFabAction - UNIT TESTS
 *
 * COBERTURA:
 * - Props: label, icon, color, externalLabel, labelPosition, disable, brand
 * - Eventos: click
 * - Slots: icon (icone customizado)
 * - Classes CSS: dss-fab-action, dss-fab-action--extended, dss-fab-action--disabled,
 *                dss-fab-action--has-external-label, dss-fab-action--label-{position}
 * - Estrutura: div wrapper com dss-fab-action, QFabAction interno com dss-fab-action__qaction
 * - Brand: classes de marca no wrapper
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 *
 * NOTA: Nao testa comportamento interno do QFabAction (animacao de entrada/saida,
 * router-link, gerenciamento de label externo). Testa apenas o que o DSS wrapper
 * adiciona: classes, evento click propagado, estrutura de dois niveis, brand.
 *
 * CONTEXTO DE USO: DssFabAction e sempre filho de DssFab (via slot default).
 * O DssFab gerencia a expansao; DssFabAction executa a acao especifica.
 *
 * TOUCH TARGET: Expandido via ::before em .q-fab__action para WCAG 2.5.5.
 * Nao testado em testes unitarios (requer inspeção visual ou E2E).
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssFabAction from './1-structure/DssFabAction.ts.vue'

installQuasar()

describe('DssFabAction', () => {
  // ===========================================================================
  // RENDERIZACAO BASICA
  // ===========================================================================

  describe('Renderizacao Basica', () => {
    it('renderiza com classe base dss-fab-action no wrapper', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.classes()).toContain('dss-fab-action')
    })

    it('elemento raiz e uma div (wrapper externo)', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('contem QFabAction interno com classe dss-fab-action__qaction', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.find('.dss-fab-action__qaction').exists()).toBe(true)
    })

    it('usa inheritAttrs: false', () => {
      expect(DssFabAction.inheritAttrs).toBe(false)
    })

    it('renderiza sem erros com props padrao', () => {
      expect(() => mount(DssFabAction)).not.toThrow()
    })
  })

  // ===========================================================================
  // PROPS - LABEL INLINE
  // ===========================================================================

  describe('Props - Label Inline', () => {
    it('nao aplica classe dss-fab-action--extended quando sem label', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.classes()).not.toContain('dss-fab-action--extended')
    })

    it('aplica classe dss-fab-action--extended quando label e fornecido', () => {
      const wrapper = mount(DssFabAction, {
        props: { label: 'Editar' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--extended')
    })

    it('aplica dss-fab-action--extended para qualquer string de label', () => {
      const wrapper = mount(DssFabAction, {
        props: { label: 'Nova mensagem' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--extended')
    })
  })

  // ===========================================================================
  // PROPS - LABEL EXTERNO
  // ===========================================================================

  describe('Props - Label Externo', () => {
    it('nao aplica classe has-external-label quando externalLabel nao e fornecido', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.classes()).not.toContain('dss-fab-action--has-external-label')
    })

    it('aplica classe dss-fab-action--has-external-label quando externalLabel e fornecido', () => {
      const wrapper = mount(DssFabAction, {
        props: { externalLabel: 'Compartilhar' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--has-external-label')
    })

    it('aplica classe de posicao do label quando externalLabel e labelPosition sao definidos', () => {
      const wrapper = mount(DssFabAction, {
        props: { externalLabel: 'Editar', labelPosition: 'right' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--label-right')
    })

    it('usa labelPosition="left" como padrao ao ter externalLabel', () => {
      const wrapper = mount(DssFabAction, {
        props: { externalLabel: 'Deletar' }
      })
      // labelPosition padrao e "left"
      expect(wrapper.classes()).toContain('dss-fab-action--label-left')
    })

    it.each(['left', 'right', 'top', 'bottom'])(
      'aplica classe dss-fab-action--label-%s quando labelPosition="%s" com externalLabel',
      (position) => {
        const wrapper = mount(DssFabAction, {
          props: { externalLabel: 'Acao', labelPosition: position }
        })
        expect(wrapper.classes()).toContain(`dss-fab-action--label-${position}`)
      }
    )
  })

  // ===========================================================================
  // PROPS - ESTADO DISABLED
  // ===========================================================================

  describe('Props - Estado Disabled', () => {
    it('aplica classe dss-fab-action--disabled quando disable=true', () => {
      const wrapper = mount(DssFabAction, {
        props: { disable: true }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--disabled')
    })

    it('nao aplica classe disabled quando disable=false (padrao)', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.classes()).not.toContain('dss-fab-action--disabled')
    })
  })

  // ===========================================================================
  // EVENTOS
  // ===========================================================================

  describe('Eventos', () => {
    it('emite click ao clicar no FabAction', async () => {
      const wrapper = mount(DssFabAction)
      await wrapper.find('.dss-fab-action__qaction').trigger('click')
      expect(wrapper.emitted('click')).toBeDefined()
    })

    it('emite click com o evento de mouse correto', async () => {
      const wrapper = mount(DssFabAction)
      await wrapper.find('.dss-fab-action__qaction').trigger('click')
      const clickEmissions = wrapper.emitted('click')
      expect(clickEmissions).toHaveLength(1)
    })

    it('nao emite click quando disable=true', async () => {
      const wrapper = mount(DssFabAction, {
        props: { disable: true }
      })
      await wrapper.find('.dss-fab-action__qaction').trigger('click')
      // QFabAction desabilitado nao propaga o evento click
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emite click multiplas vezes em cliques consecutivos', async () => {
      const wrapper = mount(DssFabAction)
      const qaction = wrapper.find('.dss-fab-action__qaction')
      await qaction.trigger('click')
      await qaction.trigger('click')
      await qaction.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(3)
    })
  })

  // ===========================================================================
  // SLOTS
  // ===========================================================================

  describe('Slots', () => {
    it('renderiza conteudo do slot icon quando fornecido', () => {
      const wrapper = mount(DssFabAction, {
        slots: { icon: '<span class="custom-icon">star</span>' }
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })

    it('nao renderiza slot icon quando nao e fornecido', () => {
      const wrapper = mount(DssFabAction)
      expect(wrapper.find('.custom-icon').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // BRAND
  // ===========================================================================

  describe('Brand', () => {
    it('aplica classe dss-fab-action--brand-hub quando brand="hub"', () => {
      const wrapper = mount(DssFabAction, {
        props: { brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--brand-hub')
    })

    it('aplica classe dss-fab-action--brand-water quando brand="water"', () => {
      const wrapper = mount(DssFabAction, {
        props: { brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--brand-water')
    })

    it('aplica classe dss-fab-action--brand-waste quando brand="waste"', () => {
      const wrapper = mount(DssFabAction, {
        props: { brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--brand-waste')
    })

    it('nao aplica classe de brand quando brand=null (padrao)', () => {
      const wrapper = mount(DssFabAction)
      const classes = wrapper.classes().join(' ')
      expect(classes).not.toContain('dss-fab-action--brand-')
    })

    it('classes de brand sao aplicadas no wrapper externo (div), nao no QFabAction interno', () => {
      const wrapper = mount(DssFabAction, {
        props: { brand: 'hub' }
      })
      // Classe de brand deve estar no wrapper raiz
      expect(wrapper.classes()).toContain('dss-fab-action--brand-hub')
      // QFabAction interno nao deve ter a classe de brand diretamente
      const qaction = wrapper.find('.dss-fab-action__qaction')
      expect(qaction.classes()).not.toContain('dss-fab-action--brand-hub')
    })
  })

  // ===========================================================================
  // CASOS DE BORDA
  // ===========================================================================

  describe('Casos de Borda', () => {
    it('combina label, disable e brand corretamente', () => {
      const wrapper = mount(DssFabAction, {
        props: { label: 'Editar', disable: true, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--extended')
      expect(wrapper.classes()).toContain('dss-fab-action--disabled')
      expect(wrapper.classes()).toContain('dss-fab-action--brand-water')
    })

    it('combina externalLabel com brand', () => {
      const wrapper = mount(DssFabAction, {
        props: { externalLabel: 'Compartilhar', brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--has-external-label')
      expect(wrapper.classes()).toContain('dss-fab-action--brand-waste')
    })

    it('label inline e externalLabel podem coexistir', () => {
      const wrapper = mount(DssFabAction, {
        props: { label: 'Editar', externalLabel: 'Editar item', labelPosition: 'right' }
      })
      expect(wrapper.classes()).toContain('dss-fab-action--extended')
      expect(wrapper.classes()).toContain('dss-fab-action--has-external-label')
      expect(wrapper.classes()).toContain('dss-fab-action--label-right')
    })
  })
})
