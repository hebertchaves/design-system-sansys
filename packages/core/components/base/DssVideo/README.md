# DssVideo

Componente de embed de vídeo responsivo com aspect ratio controlado e border-radius via tokens DSS.

## Quando usar

- Incorporar vídeos do YouTube, Vimeo ou arquivos diretos em páginas de produto ou conteúdo
- Quando precisar de aspect ratio fixo (16:9, 4:3) sem layout shift
- Quando precisar de border-radius controlado via tokens (cards, modais, destaque editorial)

## Quando NÃO usar

- Players de vídeo com controles customizados (play, pause, volume) → solução standalone fora do escopo do QVideo
- Vídeos de fundo em containers complexos → CSS nativo (`background-video` pattern)
- SVGs animados → use `DssIcon`

## Instalação

```js
import { DssVideo } from '@dss/components'
```

## Uso básico

```vue
<DssVideo
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Tutorial de uso do produto"
  :ratio="16/9"
/>
```

## Com border-radius

```vue
<DssVideo
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Demo do produto"
  :ratio="16/9"
  radius="md"
/>
```

## Vídeo decorativo (sem title)

```vue
<DssVideo
  src="https://www.youtube.com/embed/VIDEO_ID"
  :decorative="true"
  :ratio="16/9"
/>
```

## Com overlay

```vue
<DssVideo src="https://www.youtube.com/embed/VIDEO_ID" title="Vídeo de produto" :ratio="16/9">
  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
    <span style="color:white;">Clique para assistir</span>
  </div>
</DssVideo>
```

## Modos disponíveis

| Prop | Valores | Descrição |
|------|---------|-----------|
| `ratio` | `16/9` (default), `4/3`, `1`, ou número | Aspect ratio do container |
| `radius` | `none`, `sm`, `md`, `lg`, `full` | Border-radius via tokens |

## Links

- [Documentação completa](./DssVideo.md)
- [API Reference](./DSSVIDEO_API.md)
- [Exemplos](./DssVideo.example.vue)
