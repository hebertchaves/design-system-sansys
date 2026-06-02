/**
 * ==========================================================================
 * DssSeparator - UNIT TESTS
 *
 * COBERTURA:
 * - Props: vertical, inset, spaced, color, size, ariaHidden
 * - Classes: dss-separator, dss-separator--vertical, dss-separator--spaced,
 *            dss-separator--inset, dss-separator--inset-item,
 *            dss-separator--inset-item-thumbnail,
 *            dss-separator--color-{color}, dss-separator--size-{size}
 * - Elemento raiz: <hr> (horizontal) ou <div role="separator"> (vertical)
 * - Acessibilidade: role="separator" (vertical), aria-orientation="vertical",
 *                   aria-hidden (decorativo)
 * - Variantes de cor: subtle, default, strong, primary, secondary
 * - Variantes de espessura: hairline, thin, md, thick
 * - Variantes de inset: false, true, 'item', 'item-thumbnail'
 *
 * NOTA ARQUITETURAL:
 * DssSeparator NÃO envolve QSeparator — usa <component :is> diretamente.
 * Horizontal: <hr class="dss-separator">
 * Vertical: <div role="separator" aria-orientation="vertical" class="dss-separator dss-separator--vertical">
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSeparator from './1-structure/DssSeparator.ts.vue'

installQuasar()

describe('DssSeparator', () => {
  // ===========================================================================
  // RENDERIZAÇÃO BASE
  // ===========================================================================

  describe('Renderização base', () => {
    it('renderiza com classe base dss-separator', () => {
      const wrapper = mount(DssSeparator)
      expect(wrapper.classes()).toContain('dss-separator')
    })

    it('renderiza como <hr> por padrão (horizontal)', () => {
      const wrapper = mount(DssSeparator)
      expect(wrapper.element.tagName).toBe('HR')
    })

    it('defineOptions define o nome DssSeparator', () => {
      expect(DssSeparator.name).toBe('DssSeparator')
    })

    it('não aplica classes de cor default quando color="default"', () => {
      const wrapper = mount(DssSeparator)
      // A classe de cor só é aplicada quando diferente do default
      expect(wrapper.classes()).not.toContain('dss-separator--color-default')
    })

    it('não aplica classe de tamanho quando size="thin" (default)', () => {
      const wrapper = mount(DssSeparator)
      expect(wrapper.classes()).not.toContain('dss-separator--size-thin')
    })
  })

  // ===========================================================================
  // PROP: VERTICAL
  // ===========================================================================

  describe('Prop: vertical', () => {
    it('renderiza como <div> quando vertical=true', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: true } })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('aplica dss-separator--vertical quando vertical=true', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: true } })
      expect(wrapper.classes()).toContain('dss-separator--vertical')
    })

    it('aplica role="separator" quando vertical=true', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: true } })
      expect(wrapper.attributes('role')).toBe('separator')
    })

    it('aplica aria-orientation="vertical" quando vertical=true', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: true } })
      expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    })

    it('NÃO aplica role quando vertical=false (hr tem semântica nativa)', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: false } })
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('NÃO aplica aria-orientation quando vertical=false', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: false } })
      expect(wrapper.attributes('aria-orientation')).toBeUndefined()
    })

    it('não aplica dss-separator--vertical quando vertical=false', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: false } })
      expect(wrapper.classes()).not.toContain('dss-separator--vertical')
    })
  })

  // ===========================================================================
  // PROP: SPACED
  // ===========================================================================

  describe('Prop: spaced', () => {
    it('aplica dss-separator--spaced quando spaced=true', () => {
      const wrapper = mount(DssSeparator, { props: { spaced: true } })
      expect(wrapper.classes()).toContain('dss-separator--spaced')
    })

    it('não aplica dss-separator--spaced quando spaced=false', () => {
      const wrapper = mount(DssSeparator, { props: { spaced: false } })
      expect(wrapper.classes()).not.toContain('dss-separator--spaced')
    })

    it('não aplica dss-separator--spaced por padrão', () => {
      const wrapper = mount(DssSeparator)
      expect(wrapper.classes()).not.toContain('dss-separator--spaced')
    })
  })

  // ===========================================================================
  // PROP: INSET
  // ===========================================================================

  describe('Prop: inset', () => {
    it('aplica dss-separator--inset quando inset=true', () => {
      const wrapper = mount(DssSeparator, { props: { inset: true } })
      expect(wrapper.classes()).toContain('dss-separator--inset')
    })

    it('aplica dss-separator--inset-item quando inset="item"', () => {
      const wrapper = mount(DssSeparator, { props: { inset: 'item' } })
      expect(wrapper.classes()).toContain('dss-separator--inset-item')
    })

    it('aplica dss-separator--inset-item-thumbnail quando inset="item-thumbnail"', () => {
      const wrapper = mount(DssSeparator, { props: { inset: 'item-thumbnail' } })
      expect(wrapper.classes()).toContain('dss-separator--inset-item-thumbnail')
    })

    it('não aplica classe de inset quando inset=false', () => {
      const wrapper = mount(DssSeparator, { props: { inset: false } })
      const insetClasses = wrapper
        .classes()
        .filter((c) => c.includes('inset'))
      expect(insetClasses).toHaveLength(0)
    })

    it('não aplica classe de inset por padrão', () => {
      const wrapper = mount(DssSeparator)
      const insetClasses = wrapper
        .classes()
        .filter((c) => c.includes('inset'))
      expect(insetClasses).toHaveLength(0)
    })
  })

  // ===========================================================================
  // PROP: COLOR
  // ===========================================================================

  describe('Prop: color', () => {
    it.each(['subtle', 'strong', 'primary', 'secondary'])(
      'aplica dss-separator--color-%s quando color="%s"',
      (color) => {
        const wrapper = mount(DssSeparator, { props: { color } })
        expect(wrapper.classes()).toContain(`dss-separator--color-${color}`)
      }
    )

    it('não aplica classe de cor quando color="default" (valor padrão)', () => {
      const wrapper = mount(DssSeparator, { props: { color: 'default' } })
      expect(wrapper.classes()).not.toContain('dss-separator--color-default')
    })
  })

  // ===========================================================================
  // PROP: SIZE
  // ===========================================================================

  describe('Prop: size', () => {
    it.each(['hairline', 'md', 'thick'])(
      'aplica dss-separator--size-%s quando size="%s"',
      (size) => {
        const wrapper = mount(DssSeparator, { props: { size } })
        expect(wrapper.classes()).toContain(`dss-separator--size-${size}`)
      }
    )

    it('não aplica classe de tamanho quando size="thin" (valor padrão)', () => {
      const wrapper = mount(DssSeparator, { props: { size: 'thin' } })
      expect(wrapper.classes()).not.toContain('dss-separator--size-thin')
    })
  })

  // ===========================================================================
  // ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('aplica aria-hidden="true" quando ariaHidden=true', () => {
      const wrapper = mount(DssSeparator, { props: { ariaHidden: true } })
      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('não aplica aria-hidden quando ariaHidden é undefined', () => {
      const wrapper = mount(DssSeparator)
      // undefined é passado como ariaHidden, o binding :aria-hidden="undefined" não renderiza
      expect(wrapper.attributes('aria-hidden')).toBeUndefined()
    })

    it('<hr> horizontal tem semântica nativa de separador (sem role explícito)', () => {
      const wrapper = mount(DssSeparator)
      expect(wrapper.element.tagName).toBe('HR')
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('<div> vertical recebe role="separator" explícito', () => {
      const wrapper = mount(DssSeparator, { props: { vertical: true } })
      expect(wrapper.attributes('role')).toBe('separator')
    })
  })

  // ===========================================================================
  // ENCAMINHAMENTO DE ATTRS (inheritAttrs: true)
  // ===========================================================================

  describe('Encaminhamento de attrs (inheritAttrs: true)', () => {
    it('encaminha data-* para o elemento raiz', () => {
      const wrapper = mount(DssSeparator, {
        attrs: { 'data-testid': 'separador-principal' }
      })
      expect(wrapper.attributes('data-testid')).toBe('separador-principal')
    })

    it('encaminha id para o elemento raiz', () => {
      const wrapper = mount(DssSeparator, {
        attrs: { id: 'sep-divisor' }
      })
      expect(wrapper.attributes('id')).toBe('sep-divisor')
    })

    it('encaminha aria-label para o elemento raiz', () => {
      const wrapper = mount(DssSeparator, {
        attrs: { 'aria-label': 'Divisor de seção' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Divisor de seção')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('combina vertical + spaced + inset corretamente', () => {
      const wrapper = mount(DssSeparator, {
        props: { vertical: true, spaced: true, inset: true }
      })
      expect(wrapper.classes()).toContain('dss-separator--vertical')
      expect(wrapper.classes()).toContain('dss-separator--spaced')
      expect(wrapper.classes()).toContain('dss-separator--inset')
    })

    it('combina color + size corretamente', () => {
      const wrapper = mount(DssSeparator, {
        props: { color: 'primary', size: 'thick' }
      })
      expect(wrapper.classes()).toContain('dss-separator--color-primary')
      expect(wrapper.classes()).toContain('dss-separator--size-thick')
    })

    it('horizontal com inset="item" não aplica inset-item-thumbnail', () => {
      const wrapper = mount(DssSeparator, { props: { inset: 'item' } })
      expect(wrapper.classes()).toContain('dss-separator--inset-item')
      expect(wrapper.classes()).not.toContain('dss-separator--inset-item-thumbnail')
    })

    it('vertical com color="subtle" aplica ambas as classes', () => {
      const wrapper = mount(DssSeparator, {
        props: { vertical: true, color: 'subtle' }
      })
      expect(wrapper.classes()).toContain('dss-separator--vertical')
      expect(wrapper.classes()).toContain('dss-separator--color-subtle')
    })
  })
})
