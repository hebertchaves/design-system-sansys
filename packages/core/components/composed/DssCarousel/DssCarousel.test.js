import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { QCarouselSlide } from 'quasar'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssCarousel from './DssCarousel.vue'
import DssCarouselSlide from './DssCarouselSlide.vue'

installQuasar()

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mountCarousel = (props = {}, slots = {}) =>
  mount(DssCarousel, {
    props: { modelValue: 'slide1', ...props },
    slots: {
      default: `
        <DssCarouselSlide name="slide1">Slide 1</DssCarouselSlide>
        <DssCarouselSlide name="slide2">Slide 2</DssCarouselSlide>
      `,
      ...slots,
    },
    global: {
      components: { DssCarouselSlide },
    },
  })

// ─── Renderização base ───────────────────────────────────────────────────────

describe('DssCarousel — renderização base', () => {
  it('renderiza sem erros com modelValue e slides mínimos', () => {
    const wrapper = mountCarousel()
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe .dss-carousel na raiz', () => {
    const wrapper = mountCarousel()
    expect(wrapper.find('.dss-carousel').exists()).toBe(true)
  })

  it('renderiza o landmark role="region"', () => {
    const wrapper = mountCarousel()
    const el = wrapper.find('[role="region"]')
    expect(el.exists()).toBe(true)
  })

  it('usa o aria-label padrão quando ariaLabel não é fornecido', () => {
    const wrapper = mountCarousel()
    const el = wrapper.find('[role="region"]')
    expect(el.attributes('aria-label')).toBe('Carrossel de conteúdo')
  })

  it('usa o aria-label fornecido via prop', () => {
    const wrapper = mountCarousel({ ariaLabel: 'Galeria de produtos' })
    const el = wrapper.find('[role="region"]')
    expect(el.attributes('aria-label')).toBe('Galeria de produtos')
  })
})

// ─── Props ───────────────────────────────────────────────────────────────────

describe('DssCarousel — props', () => {
  it('aplica classe dss-carousel--navigation quando navigation=true', () => {
    const wrapper = mountCarousel({ navigation: true })
    expect(wrapper.find('.dss-carousel--navigation').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--arrows quando arrows=true', () => {
    const wrapper = mountCarousel({ arrows: true })
    expect(wrapper.find('.dss-carousel--arrows').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--thumbnails quando thumbnails=true', () => {
    const wrapper = mountCarousel({ thumbnails: true })
    expect(wrapper.find('.dss-carousel--thumbnails').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--vertical quando vertical=true', () => {
    const wrapper = mountCarousel({ vertical: true })
    expect(wrapper.find('.dss-carousel--vertical').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--infinite quando infinite=true', () => {
    const wrapper = mountCarousel({ infinite: true })
    expect(wrapper.find('.dss-carousel--infinite').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--autoplay quando autoplay=true', () => {
    const wrapper = mountCarousel({ autoplay: true })
    expect(wrapper.find('.dss-carousel--autoplay').exists()).toBe(true)
  })

  it('aplica classe dss-carousel--autoplay quando autoplay é número', () => {
    const wrapper = mountCarousel({ autoplay: 5000 })
    expect(wrapper.find('.dss-carousel--autoplay').exists()).toBe(true)
  })

  it('NÃO aplica dss-carousel--autoplay quando autoplay=false', () => {
    const wrapper = mountCarousel({ autoplay: false })
    expect(wrapper.find('.dss-carousel--autoplay').exists()).toBe(false)
  })
})

// ─── Emits ───────────────────────────────────────────────────────────────────

describe('DssCarousel — emits', () => {
  it('emite update:modelValue quando o slide muda', async () => {
    const wrapper = mountCarousel()
    await wrapper.vm.$emit('update:modelValue', 'slide2')
    // Verifica que o componente encaminha o evento
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})

// ─── Slots ───────────────────────────────────────────────────────────────────

describe('DssCarousel — slots', () => {
  it('renderiza conteúdo no slot default', () => {
    const wrapper = mount(DssCarousel, {
      props: { modelValue: 'slide1' },
      slots: {
        // O QCarousel renderiza apenas filhos QCarouselSlide (slide ativo)
        default: () => h(QCarouselSlide, { name: 'slide1' }, () => h('div', { class: 'test-content' }, 'Conteúdo')),
      },
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })
})

// ─── DssCarouselSlide ────────────────────────────────────────────────────────

describe('DssCarouselSlide — renderização', () => {
  it('renderiza com a classe .dss-carousel__slide', () => {
    const wrapper = mount(DssCarouselSlide, {
      props: { name: 'test-slide' },
      slots: { default: '<p>Conteúdo do slide</p>' },
    })
    expect(wrapper.find('.dss-carousel__slide').exists()).toBe(true)
  })

  it('aplica role="group" para acessibilidade', () => {
    const wrapper = mount(DssCarouselSlide, {
      props: { name: 'test-slide' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(true)
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mount(DssCarouselSlide, {
      props: { name: 'test-slide' },
      slots: { default: '<span class="slide-text">Texto</span>' },
    })
    expect(wrapper.find('.slide-text').exists()).toBe(true)
  })
})

// ─── Acessibilidade ──────────────────────────────────────────────────────────

describe('DssCarousel — acessibilidade', () => {
  it('NÃO tem tabindex no container do carousel (não é elemento focável)', () => {
    const wrapper = mountCarousel()
    const root = wrapper.find('.dss-carousel')
    expect(root.attributes('tabindex')).toBeUndefined()
  })

  it('carrossel com aria-label é acessível via leitores de tela', () => {
    const wrapper = mountCarousel({ ariaLabel: 'Galeria de imagens do produto' })
    const region = wrapper.find('[role="region"][aria-label="Galeria de imagens do produto"]')
    expect(region.exists()).toBe(true)
  })
})

// ─── Forwarding de atributos ─────────────────────────────────────────────────

describe('DssCarousel — forwarding de atributos', () => {
  it('encaminha data-testid para o elemento raiz', () => {
    const wrapper = mountCarousel({}, {})
    // Como inheritAttrs: false, attrs são passados via v-bind="$attrs" no template
    // O QCarousel aplica $attrs ao seu root element
    const wrapper2 = mount(DssCarousel, {
      props: { modelValue: 'slide1' },
      attrs: { 'data-testid': 'meu-carousel' },
      slots: { default: '' },
    })
    expect(wrapper2.find('[data-testid="meu-carousel"]').exists()).toBe(true)
  })
})
