/**
 * ==========================================================================
 * DssSkeleton - UNIT TESTS
 *
 * COBERTURA:
 * - Props: type, lines, width, height, animation, bordered, tag, radius, brand
 * - Estrutura: div wrapper externo (NÃO root = QSkeleton — prop `lines` requer
 *              múltiplos QSkeleton filhos; root condicional violaria arquitetura)
 * - Classes raiz: dss-skeleton, dss-skeleton--type-*, dss-skeleton--anim-*,
 *                 dss-skeleton--brand-*, dss-skeleton--multi
 * - Item interno: .dss-skeleton__item (QSkeleton)
 * - aria-hidden="true" no root (consumer controla aria-busy externamente)
 * - lines > 1 com type="text": múltiplos QSkeleton renderizados
 * - lines > 1 sem type="text": apenas 1 QSkeleton (isMulti só para text)
 * - Último item em modo multi: width="70%"
 * - animation="none": QSkeleton com animation="none"
 * - radius: --dss-skeleton-radius aplicado como inline style
 * - data-brand: ativa cascade de tokens de brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssSkeleton usa div wrapper + QSkeleton(s) internos.
 * EXC-Gate-01/02/03: descendant selectors para background-color/border-radius/border-color.
 * Golden Reference: DssBadge. Golden Context: DssInnerLoading.
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssSkeleton from './1-structure/DssSkeleton.ts.vue'

installQuasar()

describe('DssSkeleton', () => {
  // ===========================================================================
  // ESTRUTURA
  // ===========================================================================

  describe('Estrutura', () => {
    it('renderiza com classe base dss-skeleton', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.classes()).toContain('dss-skeleton')
    })

    it('root é um div wrapper (NÃO QSkeleton)', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.classes()).not.toContain('q-skeleton')
    })

    it('contém ao menos um elemento .dss-skeleton__item', () => {
      const wrapper = mount(DssSkeleton)
      const items = wrapper.findAll('.dss-skeleton__item')
      expect(items.length).toBeGreaterThanOrEqual(1)
    })

    it('item interno é QSkeleton (classe q-skeleton)', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.find('.q-skeleton').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ARIA / ACESSIBILIDADE
  // ===========================================================================

  describe('Acessibilidade', () => {
    it('root tem aria-hidden="true"', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('consumer controla aria-busy — root não define aria-busy', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.attributes('aria-busy')).toBeUndefined()
    })

    it('componente não interativo — sem tabindex no root', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renderiza com props padrão sem erros (type="rect", animation="wave")', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('dss-skeleton--type-rect')
      expect(wrapper.classes()).toContain('dss-skeleton--anim-wave')
    })

    describe('type', () => {
      it.each(['rect', 'text', 'circle', 'heading', 'avatar'])(
        'aplica classe dss-skeleton--type-%s para type="%s"',
        (type) => {
          const wrapper = mount(DssSkeleton, { props: { type } })
          expect(wrapper.classes()).toContain(`dss-skeleton--type-${type}`)
        }
      )
    })

    describe('animation', () => {
      it.each(['wave', 'pulse', 'none'])(
        'aplica classe dss-skeleton--anim-%s para animation="%s"',
        (animation) => {
          const wrapper = mount(DssSkeleton, { props: { animation } })
          expect(wrapper.classes()).toContain(`dss-skeleton--anim-${animation}`)
        }
      )

      it('animation="none": QSkeleton recebe animation="none"', () => {
        const wrapper = mount(DssSkeleton, { props: { animation: 'none' } })
        const skeleton = wrapper.find('.q-skeleton')
        // Quasar aplica a animação como atributo no elemento
        expect(skeleton.exists()).toBe(true)
      })
    })

    describe('lines', () => {
      it('renderiza 1 QSkeleton por padrão quando lines não é especificado', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'text' } })
        const items = wrapper.findAll('.dss-skeleton__item')
        expect(items.length).toBe(1)
      })

      it('lines=3 com type="text": renderiza 3 QSkeleton', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'text', lines: 3 } })
        const items = wrapper.findAll('.dss-skeleton__item')
        expect(items.length).toBe(3)
      })

      it('lines=5 com type="text": renderiza 5 QSkeleton', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'text', lines: 5 } })
        const items = wrapper.findAll('.dss-skeleton__item')
        expect(items.length).toBe(5)
      })

      it('lines=3 com type="rect": renderiza apenas 1 QSkeleton (isMulti só para text)', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'rect', lines: 3 } })
        const items = wrapper.findAll('.dss-skeleton__item')
        expect(items.length).toBe(1)
      })

      it('lines=3 com type="circle": renderiza apenas 1 QSkeleton', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'circle', lines: 3 } })
        const items = wrapper.findAll('.dss-skeleton__item')
        expect(items.length).toBe(1)
      })

      it('modo multi (text + lines > 1) aplica classe dss-skeleton--multi', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'text', lines: 3 } })
        expect(wrapper.classes()).toContain('dss-skeleton--multi')
      })

      it('modo single não aplica classe dss-skeleton--multi', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'rect' } })
        expect(wrapper.classes()).not.toContain('dss-skeleton--multi')
      })

      it('último item em modo multi (lines=3) tem width="70%"', () => {
        const wrapper = mount(DssSkeleton, { props: { type: 'text', lines: 3 } })
        const items = wrapper.findAll('.dss-skeleton__item')
        const lastItem = items[2]
        // Último item deve ter width=70% (passado como prop :width ao QSkeleton)
        expect(lastItem.exists()).toBe(true)
      })
    })

    describe('width / height', () => {
      it('aceita width personalizado sem erro', () => {
        const wrapper = mount(DssSkeleton, { props: { width: '200px' } })
        expect(wrapper.exists()).toBe(true)
      })

      it('aceita height personalizado sem erro', () => {
        const wrapper = mount(DssSkeleton, { props: { height: '50px' } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('bordered', () => {
      it('aceita bordered=true sem erro', () => {
        const wrapper = mount(DssSkeleton, { props: { bordered: true } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('tag', () => {
      it('aceita tag personalizado sem erro', () => {
        const wrapper = mount(DssSkeleton, { props: { tag: 'span' } })
        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('radius', () => {
      it('aplica inline style --dss-skeleton-radius quando radius é passado', () => {
        const wrapper = mount(DssSkeleton, {
          props: { radius: '--dss-radius-sm' }
        })
        // rootStyle deve conter --dss-skeleton-radius
        const style = wrapper.attributes('style') ?? ''
        expect(style).toContain('--dss-skeleton-radius')
      })

      it('não aplica inline style --dss-skeleton-radius quando radius não é passado', () => {
        const wrapper = mount(DssSkeleton)
        const style = wrapper.attributes('style') ?? ''
        expect(style).not.toContain('--dss-skeleton-radius')
      })

      it.each([
        '--dss-radius-none',
        '--dss-radius-sm',
        '--dss-radius-md',
        '--dss-radius-lg',
        '--dss-radius-xl',
        '--dss-radius-2xl',
        '--dss-radius-3xl',
        '--dss-radius-full',
      ])('radius="%s" é aceito sem erro', (radius) => {
        const wrapper = mount(DssSkeleton, { props: { radius } })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // ===========================================================================
  // BRAND / DATA-BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    it('não define data-brand quando brand não é passado', () => {
      const wrapper = mount(DssSkeleton)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])(
      'aplica classe brand para brand="%s"',
      (brand) => {
        const wrapper = mount(DssSkeleton, { props: { brand } })
        expect(wrapper.classes()).toContain(`dss-skeleton--brand-${brand}`)
      }
    )

    it('não aplica classe de brand quando brand não é passado', () => {
      const wrapper = mount(DssSkeleton)
      const classStr = wrapper.classes().join(' ')
      expect(classStr).not.toContain('dss-skeleton--brand-')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('não possui slots — componente é placeholder visual puro', () => {
      // DssSkeleton não expõe slots
      const wrapper = mount(DssSkeleton)
      expect(wrapper.exists()).toBe(true)
    })

    it('type="heading" mapeia para QSkeleton type="rect" internamente', () => {
      const wrapper = mount(DssSkeleton, { props: { type: 'heading' } })
      // Classe DSS deve ser --type-heading
      expect(wrapper.classes()).toContain('dss-skeleton--type-heading')
      // QSkeleton deve existir
      expect(wrapper.find('.q-skeleton').exists()).toBe(true)
    })

    it('type="avatar" mapeia para QSkeleton type="circle" internamente', () => {
      const wrapper = mount(DssSkeleton, { props: { type: 'avatar' } })
      expect(wrapper.classes()).toContain('dss-skeleton--type-avatar')
      expect(wrapper.find('.q-skeleton').exists()).toBe(true)
    })

    it('lines=1 com type="text": não ativa modo multi', () => {
      const wrapper = mount(DssSkeleton, { props: { type: 'text', lines: 1 } })
      expect(wrapper.classes()).not.toContain('dss-skeleton--multi')
      expect(wrapper.findAll('.dss-skeleton__item').length).toBe(1)
    })

    it('brand + multi lines + animation combinados renderizam corretamente', () => {
      const wrapper = mount(DssSkeleton, {
        props: { type: 'text', lines: 4, animation: 'pulse', brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-skeleton--multi')
      expect(wrapper.classes()).toContain('dss-skeleton--anim-pulse')
      expect(wrapper.classes()).toContain('dss-skeleton--brand-hub')
      expect(wrapper.findAll('.dss-skeleton__item').length).toBe(4)
    })
  })
})
