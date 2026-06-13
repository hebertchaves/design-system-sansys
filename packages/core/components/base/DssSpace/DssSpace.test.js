/**
 * ==========================================================================
 * DssSpace - UNIT TESTS
 *
 * COBERTURA:
 * - Renderização base sem props
 * - Props: size (SpaceSize token ou undefined)
 * - Classes DSS: dss-space, dss-space--size-{value} quando size presente
 * - aria-hidden="true" — SEMPRE presente (elemento de layout puro, não semântico)
 * - Sem slots (spacer puro)
 * - Sem brand (componente estrutural)
 * - Sem interatividade
 * - Modo flex-grow (sem size) vs modo tamanho fixo (com size)
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSpace from './1-structure/DssSpace.ts.vue'

installQuasar()

describe('DssSpace', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('monta sem erros sem nenhuma prop', () => {
      expect(() => mount(DssSpace)).not.toThrow()
    })

    it('aplica classe dss-space ao elemento raiz', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.classes()).toContain('dss-space')
    })

    it('elemento raiz é uma div', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.element.tagName).toBe('DIV')
    })
  })

  // ===========================================================================
  // aria-hidden OBRIGATÓRIO
  // ===========================================================================

  describe('aria-hidden', () => {
    it('possui aria-hidden="true" SEMPRE (elemento de layout puro)', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('aria-hidden="true" mantido mesmo com prop size', () => {
      const wrapper = mount(DssSpace, {
        props: { size: '4' }
      })
      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })
  })

  // ===========================================================================
  // PROPS — SIZE
  // ===========================================================================

  describe('Props — size', () => {
    describe('sem size (modo flex-grow)', () => {
      it('sem size — apenas classe base dss-space', () => {
        const wrapper = mount(DssSpace)
        expect(wrapper.classes()).toContain('dss-space')
        // NÃO deve ter modificador de tamanho
        const sizeClass = wrapper.classes().find(c => c.startsWith('dss-space--size-'))
        expect(sizeClass).toBeUndefined()
      })
    })

    describe('com size (modo tamanho fixo)', () => {
      it('size="4" aplica dss-space--size-4', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '4' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-4')
      })

      it('size="1" aplica dss-space--size-1', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '1' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-1')
      })

      it('size="px" aplica dss-space--size-px', () => {
        const wrapper = mount(DssSpace, {
          props: { size: 'px' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-px')
      })

      it('size="0_5" aplica dss-space--size-0_5', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '0_5' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-0_5')
      })

      it('size="8" aplica dss-space--size-8', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '8' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-8')
      })

      it('size="16" aplica dss-space--size-16', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '16' }
        })
        expect(wrapper.classes()).toContain('dss-space--size-16')
      })

      it('com size: mantém classe base dss-space', () => {
        const wrapper = mount(DssSpace, {
          props: { size: '4' }
        })
        expect(wrapper.classes()).toContain('dss-space')
        expect(wrapper.classes()).toContain('dss-space--size-4')
      })
    })

    describe('todos os tokens SpaceSize válidos', () => {
      const validSizes = [
        'px', '0_5', '1', '1_5', '2', '2_5', '3', '3_5',
        '4', '5', '6', '7', '8', '9', '10', '11', '12',
        '14', '16', '20', '24'
      ]

      it.each(validSizes)('size="%s" aplica classe dss-space--size-%s', (size) => {
        const wrapper = mount(DssSpace, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-space--size-${size}`)
      })
    })
  })

  // ===========================================================================
  // SEM SLOTS
  // ===========================================================================

  describe('Sem slots', () => {
    it('não renderiza conteúdo filho (spacer puro)', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.element.children).toHaveLength(0)
      expect(wrapper.text()).toBe('')
    })
  })

  // ===========================================================================
  // SEM BRAND / SEM INTERATIVIDADE
  // ===========================================================================

  describe('Sem brand / sem interatividade', () => {
    it('NÃO possui data-brand', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it('NÃO possui role interativo', () => {
      const wrapper = mount(DssSpace)
      const role = wrapper.attributes('role')
      expect(role).not.toBe('button')
      expect(role).not.toBe('link')
    })

    it('NÃO possui tabindex', () => {
      const wrapper = mount(DssSpace)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // ATTRS FORWARDING (inheritAttrs: true)
  // ===========================================================================

  describe('$attrs forwarding (inheritAttrs: true)', () => {
    it('data-testid é aplicado ao div raiz', () => {
      const wrapper = mount(DssSpace, {
        attrs: { 'data-testid': 'main-spacer' }
      })
      expect(wrapper.attributes('data-testid')).toBe('main-spacer')
    })

    it('id externo é aplicado ao div raiz', () => {
      const wrapper = mount(DssSpace, {
        attrs: { id: 'spacer-1' }
      })
      expect(wrapper.attributes('id')).toBe('spacer-1')
    })
  })
})
