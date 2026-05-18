# DssParallax

Efeito de paralaxe para imagens de fundo — wrapper DSS governado sobre `QParallax` do Quasar.

## Instalação

```js
import { DssParallax } from '@dss/components'
```

## Uso Básico

```vue
<!-- Hero com paralaxe e overlay -->
<dss-parallax
  src="https://exemplo.com/imagem.jpg"
  :height="500"
  :speed="0.5"
  alt="Descrição da imagem de fundo"
>
  <h1 class="text-white text-h3">Título de destaque</h1>
</dss-parallax>

<!-- Paralaxe decorativa (sem alt necessário) -->
<dss-parallax
  src="https://exemplo.com/decorativo.jpg"
  :height="300"
  :decorative="true"
/>
```

## Acessibilidade

- Respeita `prefers-reduced-motion: reduce` — substitui automaticamente por fallback estático
- Fornece `alt` para imagens com conteúdo significativo (WCAG 1.1.1)
- Use `:decorative="true"` para paralaxe puramente visual

## Links

- [Documentação completa](./DssParallax.md)
- [API Reference](./DSSPARALLAX_API.md)
- [Exemplos interativos](./DssParallax.example.vue)
