/**
 * DssEmptyState - Testes Unitários
 *
 * Cobertura mínima exigida pelo gate: renderização base, props, slots e
 * acessibilidade. O componente não emite eventos — a ausência é testada
 * explicitamente, para que uma emissão acidental futura reprove aqui.
 *
 * @requires @vue/test-utils
 * @requires vitest
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssEmptyState from './1-structure/DssEmptyState.ts.vue'

const stubs = { DssIcon: { name: 'DssIcon', props: ['name'], template: '<i class="dss-icon">{{ name }}</i>' } }

const montar = (options = {}) => mount(DssEmptyState, { global: { stubs }, ...options })

describe('DssEmptyState', () => {
  /**
   * ==========================================================================
   * 1. RENDERIZAÇÃO BÁSICA
   * ==========================================================================
   */
  describe('Renderização Básica', () => {
    it('renderiza como <div> nativo', () => {
      expect(montar().element.tagName).toBe('DIV')
    })

    it('aplica a classe base .dss-empty-state', () => {
      expect(montar().classes()).toContain('dss-empty-state')
    })

    it('aplica size e variant padrão (md / plain)', () => {
      const classes = montar().classes()
      expect(classes).toContain('dss-empty-state--md')
      expect(classes).toContain('dss-empty-state--plain')
    })

    it('não renderiza os elementos internos sem conteúdo', () => {
      const w = montar()
      expect(w.find('.dss-empty-state__icon').exists()).toBe(false)
      expect(w.find('.dss-empty-state__title').exists()).toBe(false)
      expect(w.find('.dss-empty-state__description').exists()).toBe(false)
      expect(w.find('.dss-empty-state__action').exists()).toBe(false)
    })
  })

  /**
   * ==========================================================================
   * 2. PROPS
   * ==========================================================================
   */
  describe('Props', () => {
    it('renderiza title', () => {
      const w = montar({ props: { title: 'Nenhuma solicitação encontrada' } })
      expect(w.find('.dss-empty-state__title').text()).toBe('Nenhuma solicitação encontrada')
    })

    it('renderiza description', () => {
      const w = montar({ props: { description: 'Ajuste os filtros.' } })
      expect(w.find('.dss-empty-state__description').text()).toBe('Ajuste os filtros.')
    })

    it('renderiza o ícone via DssIcon quando icon é informado', () => {
      const w = montar({ props: { icon: 'inbox' } })
      expect(w.find('.dss-empty-state__icon').exists()).toBe(true)
      expect(w.findComponent({ name: 'DssIcon' }).props('name')).toBe('inbox')
    })

    it.each(['sm', 'md', 'lg'])('aplica a classe de size %s', (size) => {
      expect(montar({ props: { size } }).classes()).toContain(`dss-empty-state--${size}`)
    })

    it.each(['plain', 'bordered'])('aplica a classe de variant %s', (variant) => {
      expect(montar({ props: { variant } }).classes()).toContain(`dss-empty-state--${variant}`)
    })
  })

  /**
   * ==========================================================================
   * 3. SLOTS
   * ==========================================================================
   */
  describe('Slots', () => {
    it('slot icon tem precedência sobre a prop icon', () => {
      const w = montar({
        props: { icon: 'inbox' },
        slots: { icon: '<svg class="ilustracao" />' }
      })
      expect(w.find('.ilustracao').exists()).toBe(true)
      expect(w.findComponent({ name: 'DssIcon' }).exists()).toBe(false)
    })

    it('slot title substitui a prop title', () => {
      const w = montar({ props: { title: 'via prop' }, slots: { title: 'via slot' } })
      expect(w.find('.dss-empty-state__title').text()).toBe('via slot')
    })

    it('slot description substitui a prop description', () => {
      const w = montar({ props: { description: 'via prop' }, slots: { description: 'via slot' } })
      expect(w.find('.dss-empty-state__description').text()).toBe('via slot')
    })

    it('slot action renderiza dentro de __action', () => {
      const w = montar({ slots: { action: '<button>Limpar filtros</button>' } })
      expect(w.find('.dss-empty-state__action button').text()).toBe('Limpar filtros')
    })

    it('slot default renderiza conteúdo adicional', () => {
      const w = montar({ slots: { default: '<p class="extra">nota</p>' } })
      expect(w.find('.extra').exists()).toBe(true)
    })
  })

  /**
   * ==========================================================================
   * 4. EVENTOS
   * ==========================================================================
   */
  describe('Eventos', () => {
    it('não emite nenhum evento — o componente não é interativo', () => {
      const w = montar({ props: { title: 'Vazio' } })
      expect(Object.keys(w.emitted())).toHaveLength(0)
    })
  })

  /**
   * ==========================================================================
   * 5. ACESSIBILIDADE
   * ==========================================================================
   */
  describe('Acessibilidade', () => {
    it('anuncia como status por padrão (WCAG 4.1.3)', () => {
      const w = montar({ props: { title: 'Vazio' } })
      expect(w.attributes('role')).toBe('status')
      expect(w.attributes('aria-live')).toBe('polite')
    })

    it('announce=false remove role e aria-live', () => {
      const w = montar({ props: { title: 'Vazio', announce: false } })
      expect(w.attributes('role')).toBeUndefined()
      expect(w.attributes('aria-live')).toBeUndefined()
    })

    it('aplica aria-label quando informado', () => {
      const w = montar({ props: { ariaLabel: 'Lista de solicitações vazia' } })
      expect(w.attributes('aria-label')).toBe('Lista de solicitações vazia')
    })

    it('não emite aria-label vazio', () => {
      expect(montar().attributes('aria-label')).toBeUndefined()
    })
  })
})
