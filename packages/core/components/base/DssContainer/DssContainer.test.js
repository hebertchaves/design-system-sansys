/**
 * ==========================================================================
 * DssContainer - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, padding, gap, centered, tag, brand
 * - Classes: dss-container e os modificadores --size-*, --padding-*, --gap-*,
 *            --centered, --brand-*
 * - Elemento raiz: `tag` dinâmica (div por padrão; main/section/article)
 * - Slot default
 * - Brand pela prop: emite `data-brand` no root (norma §K1 do checklist)
 * - `inheritAttrs: false` com repasse explícito de $attrs
 *
 * GOLDEN CONTEXT: DssPageContainer (estrutura); DssSeparator.test.js (padrão)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssContainer from './1-structure/DssContainer.ts.vue'

installQuasar()

describe('DssContainer', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('renderiza com a classe base dss-container', () => {
      const w = mount(DssContainer)
      expect(w.classes()).toContain('dss-container')
    })

    it('renderiza uma <div> por padrão', () => {
      const w = mount(DssContainer)
      expect(w.element.tagName).toBe('DIV')
    })

    it('renderiza o conteúdo do slot default', () => {
      const w = mount(DssContainer, { slots: { default: '<p class="filho">oi</p>' } })
      expect(w.find('.filho').exists()).toBe(true)
      expect(w.text()).toContain('oi')
    })

    it('aplica os padrões: size lg, padding md, gap none, centered', () => {
      const w = mount(DssContainer)
      expect(w.classes()).toContain('dss-container--size-lg')
      expect(w.classes()).toContain('dss-container--padding-md')
      expect(w.classes()).toContain('dss-container--gap-none')
      expect(w.classes()).toContain('dss-container--centered')
    })
  })

  // ===========================================================================
  // SEMÂNTICA — a prop `tag` (âncora do claim WCAG 1.3.1)
  // ===========================================================================

  describe('Semântica via prop tag', () => {
    it.each(['main', 'section', 'article', 'aside'])('renderiza <%s> quando tag é passada', (tag) => {
      const w = mount(DssContainer, { props: { tag } })
      expect(w.element.tagName).toBe(tag.toUpperCase())
    })

    it('preserva as classes ao trocar a tag', () => {
      const w = mount(DssContainer, { props: { tag: 'main', size: 'md' } })
      expect(w.element.tagName).toBe('MAIN')
      expect(w.classes()).toContain('dss-container--size-md')
    })
  })

  // ===========================================================================
  // VARIANTES
  // ===========================================================================

  describe('size', () => {
    it.each(['sm', 'md', 'lg', 'xl', 'fluid', 'responsive'])('emite a classe de size %s', (size) => {
      const w = mount(DssContainer, { props: { size } })
      expect(w.classes()).toContain(`dss-container--size-${size}`)
    })
  })

  describe('padding', () => {
    it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl'])('emite a classe de padding %s', (padding) => {
      const w = mount(DssContainer, { props: { padding } })
      expect(w.classes()).toContain(`dss-container--padding-${padding}`)
    })
  })

  describe('gap', () => {
    it.each(['none', 'sm', 'md', 'lg', 'xl'])('emite a classe de gap %s', (gap) => {
      const w = mount(DssContainer, { props: { gap } })
      expect(w.classes()).toContain(`dss-container--gap-${gap}`)
    })
  })

  describe('centered', () => {
    it('emite --centered por padrão', () => {
      expect(mount(DssContainer).classes()).toContain('dss-container--centered')
    })

    it('NÃO emite --centered quando centered é false', () => {
      const w = mount(DssContainer, { props: { centered: false } })
      expect(w.classes()).not.toContain('dss-container--centered')
    })
  })

  // ===========================================================================
  // BRAND — pela prop, com data-brand no root (§K1)
  // ===========================================================================

  describe('brand', () => {
    it.each(['hub', 'water', 'waste'])('emite classe e data-brand para %s', (brand) => {
      const w = mount(DssContainer, { props: { brand } })
      expect(w.classes()).toContain(`dss-container--brand-${brand}`)
      expect(w.attributes('data-brand')).toBe(brand)
    })

    it('não emite data-brand nem classe de marca sem a prop', () => {
      const w = mount(DssContainer)
      expect(w.attributes('data-brand')).toBeUndefined()
      expect(w.classes().some((c) => c.startsWith('dss-container--brand-'))).toBe(false)
    })
  })

  // ===========================================================================
  // ATTRS — inheritAttrs: false com repasse explícito
  // ===========================================================================

  describe('$attrs', () => {
    it('repassa atributos arbitrários ao root', () => {
      const w = mount(DssContainer, { attrs: { id: 'trilho', 'data-teste': 'x' } })
      expect(w.attributes('id')).toBe('trilho')
      expect(w.attributes('data-teste')).toBe('x')
    })

    it('soma a classe externa às do componente, sem substituir', () => {
      const w = mount(DssContainer, { attrs: { class: 'minha-classe' } })
      expect(w.classes()).toContain('minha-classe')
      expect(w.classes()).toContain('dss-container')
    })
  })
})
