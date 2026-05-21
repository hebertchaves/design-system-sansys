# DssCarousel

Componente de navegação de slides do Design System Sansys.
Wrapper governado sobre `QCarousel` + `QCarouselSlide` do Quasar.

## Instalação

```js
import { DssCarousel, DssCarouselSlide } from '@dss/components'
```

## Uso básico

```vue
<DssCarousel v-model="slide" navigation aria-label="Galeria de produtos">
  <DssCarouselSlide name="slide1">
    Conteúdo do slide 1
  </DssCarouselSlide>
  <DssCarouselSlide name="slide2">
    Conteúdo do slide 2
  </DssCarouselSlide>
</DssCarousel>
```

## Com setas e autoplay

```vue
<DssCarousel
  v-model="slide"
  arrows
  navigation
  :autoplay="5000"
  infinite
  height="200px"
  aria-label="Destaque rotativo"
>
  <DssCarouselSlide name="a">...</DssCarouselSlide>
  <DssCarouselSlide name="b">...</DssCarouselSlide>
</DssCarousel>
```

## Com imagens (galeria)

```vue
<DssCarousel v-model="slide" thumbnails arrows aria-label="Fotos do produto">
  <DssCarouselSlide name="foto1" img-src="/img/foto1.jpg" />
  <DssCarouselSlide name="foto2" img-src="/img/foto2.jpg" />
</DssCarousel>
```

## Brand Hub

```vue
<div data-brand="hub">
  <DssCarousel v-model="slide" navigation>
    ...
  </DssCarousel>
</div>
```

## Links

- [Documentação completa](./DssCarousel.md)
- [API Reference](./DSSCAROUSEL_API.md)
- [Exemplos interativos](./DssCarousel.example.vue)
