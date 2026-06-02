/**
 * ==========================================================================
 * DssVideo - UNIT TESTS
 *
 * COBERTURA:
 * - Props: src, ratio (número), title, decorative, radius
 * - Acessibilidade: title obrigatório (WCAG 4.1.2 — iframe title)
 * - Estrutura: classe raiz dss-video, QVideo como root element (EXC-Gate-01)
 * - Brands: data-brand via $attrs (inheritAttrs: false)
 * - NOTA: Props nativas <video> (autoplay, controls, loop, muted) NÃO
 *   suportadas — QVideo é iframe embedded, não elemento <video>
 * - prop `ratio` é número (ex: 16/9), NÃO string "16/9"
 *
 * GOLDEN REFERENCE: DssCheckbox.test.js (padrão de testes)
 * GOLDEN CONTEXT: DssImg (mesma família Mídia e Visualização)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssVideo from './1-structure/DssVideo.ts.vue'

installQuasar()

describe('DssVideo', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders without crash with src and title', () => {
      const wrapper = mount(DssVideo, {
        props: {
          src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'Vídeo de demonstração'
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('applies dss-video class to root element', () => {
      const wrapper = mount(DssVideo, {
        props: {
          src: 'https://www.youtube.com/embed/abc123',
          title: 'Test video'
        }
      })
      expect(wrapper.classes()).toContain('dss-video')
    })

    // Ratio tests
    describe('ratio (number, not string)', () => {
      it('accepts numeric ratio 16/9 (default)', () => {
        const wrapper = mount(DssVideo, {
          props: {
            src: 'https://www.youtube.com/embed/abc',
            title: 'Test'
          }
        })
        // Default ratio is 16/9 = 1.7777... (number)
        expect(wrapper.exists()).toBe(true)
      })

      it('accepts numeric ratio 4/3', () => {
        const wrapper = mount(DssVideo, {
          props: {
            src: 'https://www.youtube.com/embed/abc',
            title: 'Test',
            ratio: 4 / 3
          }
        })
        expect(wrapper.exists()).toBe(true)
      })

      it('accepts numeric ratio 1 (square)', () => {
        const wrapper = mount(DssVideo, {
          props: {
            src: 'https://www.youtube.com/embed/abc',
            title: 'Test',
            ratio: 1
          }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    // Radius modifier
    describe('radius', () => {
      it('applies dss-video--radius-{radius} class when radius is set', () => {
        const wrapper = mount(DssVideo, {
          props: {
            src: 'https://example.com/video',
            title: 'Test',
            radius: 'lg'
          }
        })
        expect(wrapper.classes()).toContain('dss-video--radius-lg')
      })

      it('does not apply radius class when radius is not set', () => {
        const wrapper = mount(DssVideo, {
          props: { src: 'https://example.com/video', title: 'Test' }
        })
        const classes = wrapper.classes()
        const hasRadiusClass = classes.some(c => c.startsWith('dss-video--radius-'))
        expect(hasRadiusClass).toBe(false)
      })

      it('does not apply radius class when radius="none"', () => {
        const wrapper = mount(DssVideo, {
          props: { src: 'https://example.com/video', title: 'Test', radius: 'none' }
        })
        expect(wrapper.classes()).not.toContain('dss-video--radius-none')
      })
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS (WCAG 4.1.2)
  // ===========================================================================

  describe('Accessibility (WCAG 4.1.2)', () => {
    it('renders with title for non-decorative video', () => {
      const wrapper = mount(DssVideo, {
        props: {
          src: 'https://www.youtube.com/embed/abc',
          title: 'Vídeo institucional Sansys'
        }
      })
      // title is passed to QVideo which sets it on the iframe
      expect(wrapper.exists()).toBe(true)
    })

    it('renders without crash when decorative=true (title becomes empty string)', () => {
      const wrapper = mount(DssVideo, {
        props: {
          src: 'https://www.youtube.com/embed/abc',
          decorative: true
        }
      })
      // computedTitle = '' when decorative=true
      expect(wrapper.exists()).toBe(true)
    })

    it('renders without crash when no title provided (dev warning only, no crash)', () => {
      // In non-DEV mode, computedTitle returns '' and no crash
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc' }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // ===========================================================================
  // BRAND TESTS (via $attrs — inheritAttrs: false)
  // ===========================================================================

  describe('Brand via attrs', () => {
    it('forwards data-brand="hub" to QVideo root', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' },
        attrs: { 'data-brand': 'hub' }
      })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it('forwards data-brand="water" correctly', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' },
        attrs: { 'data-brand': 'water' }
      })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('forwards data-brand="waste" correctly', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' },
        attrs: { 'data-brand': 'waste' }
      })
      expect(wrapper.attributes('data-brand')).toBe('waste')
    })

    it('does not set data-brand when not provided', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('always renders dss-video base class', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' }
      })
      expect(wrapper.classes()).toContain('dss-video')
    })

    it('QVideo is the root element (no wrapper div)', () => {
      // QVideo renders as a div wrapping an iframe; DssVideo delegates to it
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' }
      })
      // QVideo root element is a div (Quasar behavior)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('renders slot content when provided', () => {
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' },
        slots: { default: '<div class="video-overlay">Live</div>' }
      })
      expect(wrapper.find('.video-overlay').exists()).toBe(true)
    })

    it('does NOT support native video props (autoplay is ignored — QVideo is iframe)', () => {
      // Verify that passing HTML video-only attrs does not crash the component
      // QVideo wraps an iframe (YouTube/Vimeo embed), not a native <video>
      const wrapper = mount(DssVideo, {
        props: { src: 'https://www.youtube.com/embed/abc', title: 'Test' },
        attrs: { autoplay: true }
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
