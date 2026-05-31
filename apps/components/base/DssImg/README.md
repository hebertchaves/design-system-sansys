# DssImg

Componente de imagem com lazy loading, estados de carregamento/erro e border-radius via tokens DSS.

## Quando usar

- Imagens de produto, capa, avatar, banner ou qualquer conteúdo visual que precisa de lazy loading
- Quando precisar de um estado de loading consistente (spinner DSS) antes da imagem carregar
- Quando precisar de fallback visual em caso de erro de carregamento
- Quando precisar de border-radius controlado via tokens (thumbnails, avatares, cards)

## Quando NÃO usar

- SVGs inline complexos que precisam de manipulação de CSS → use `DssIcon`
- Background images em containers complexos → use CSS nativo (`background-image`)
- Quando `alt` não pode ser fornecido e a imagem não é decorativa → resolver o problema de acessibilidade primeiro

## Instalação

```js
import { DssImg } from '@dss/components'
```

## Uso básico

```vue
<DssImg
  src="https://exemplo.com/foto.jpg"
  alt="Descrição da imagem"
  :ratio="16/9"
/>
```

## Com fallback e border-radius

```vue
<DssImg
  src="https://exemplo.com/foto.jpg"
  alt="Foto do produto"
  :ratio="1"
  radius="md"
  fallback-src="https://exemplo.com/placeholder.jpg"
/>
```

## Imagem decorativa (sem alt text)

```vue
<DssImg
  src="https://exemplo.com/background.jpg"
  :decorative="true"
  fit="cover"
/>
```

## Com overlay

```vue
<DssImg src="https://exemplo.com/capa.jpg" alt="Capa do evento" :ratio="16/9">
  <div class="overlay">
    <span>Texto sobre a imagem</span>
  </div>
</DssImg>
```

## Modos disponíveis

| Prop | Valores | Descrição |
|------|---------|-----------|
| `fit` | `cover` (default), `contain`, `fill`, `none`, `scale-down` | Como a imagem se ajusta ao container |
| `loading` | `lazy` (default), `eager` | Comportamento de carregamento |
| `radius` | `none`, `sm`, `md`, `lg`, `full` | Border-radius via tokens |

## Links

- [Documentação completa](./DssImg.md)
- [API Reference](./DSSIMG_API.md)
- [Exemplos](./DssImg.example.vue)
