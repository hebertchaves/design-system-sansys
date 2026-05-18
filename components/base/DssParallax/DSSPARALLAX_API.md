# DSSPARALLAX_API.md — DssParallax API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `String` | `undefined` | URL da imagem de fundo para o efeito de paralaxe |
| `height` | `Number` | `500` | Altura do componente em pixels |
| `speed` | `Number` | `0.5` | Velocidade do efeito: `0` = sem movimento, `1` = movimento completo |
| `scrollTarget` | `String \| Element` | `window` | CSS selector ou referência DOM para o container de scroll |
| `alt` | `String` | `undefined` | Texto alternativo para a imagem (WCAG 1.1.1) — obrigatório quando a imagem transmite conteúdo |
| `decorative` | `Boolean` | `false` | Marca a paralaxe como puramente decorativa — suprime o aviso de `alt` ausente |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo renderizado como overlay sobre o efeito de paralaxe (ex: título, botão, card) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | Nenhum evento emitido. QParallax não expõe eventos controláveis pelo DSS |

## Composables Exportados

### `useReducedMotion()`

Detecta e rastreia `prefers-reduced-motion: reduce`.

```typescript
import { useReducedMotion } from '@dss/components/DssParallax'

const { isReducedMotion } = useReducedMotion()
// isReducedMotion: Ref<boolean>
```

Útil quando o consumidor precisa ajustar outros elementos da página com base na preferência de movimento do usuário.

### `useParallaxClasses()`

Retorna as classes CSS computadas do componente. Não recebe parâmetros enquanto DssParallax não possuir variantes CSS configuráveis.

```typescript
import { useParallaxClasses } from '@dss/components/DssParallax'

const { rootClasses } = useParallaxClasses()
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-parallax` | Root element — aplicado em ambos QParallax e fallback estático |
| `.dss-parallax--static` | Modificador aplicado ao fallback estático quando `prefers-reduced-motion: reduce` está ativo |

## Comportamentos Implícitos

### prefers-reduced-motion
Quando `prefers-reduced-motion: reduce` está ativo no sistema operacional do usuário, o componente substitui o QParallax por um `<div>` estático com `background-image` via CSS. Esta troca:
- Evita registro de scroll listeners desnecessários
- Respeita WCAG 2.3.3 (Animação de Interação — Nível AAA)
- É reativa: se o usuário alterar a preferência, o componente se adapta sem recarregar a página

### inheritAttrs: false
`$attrs` (id, class extra, data-*, aria-* adicionais) são encaminhados ao root element ativo (QParallax ou div estático) via `v-bind="$attrs"`.

### Imagem de fundo e leitores de tela
CSS `background-image` é invisível a leitores de tela por natureza (não gera nenhum event no accessibility tree). Para imagens que transmitem conteúdo significativo, forneça `alt` — um `<span class="dss-sr-only">` com o texto é inserido dentro do componente.

## Tokens Utilizados

Nenhum token `var(--dss-*)` é utilizado neste componente. As propriedades visuais são totalmente prop-driven ou valores estruturais fixos:

| Propriedade | Fonte | Justificativa |
|-------------|-------|---------------|
| `background-image` | Prop `src` (style binding) | URL de imagem — não tokenizável |
| `height` | Prop `height` (style binding) | Dimensão definida pelo consumidor — não tokenizável |
| `background-size: cover` | Valor estrutural fixo | Comportamento de cover não tem equivalente em token DSS |
| `background-position: center` | Valor estrutural fixo | Posição padrão para parallax — não tokenizável |
| `-webkit-tap-highlight-color: transparent` | Valor hardcoded estrutural | Consistência com Golden Reference (DssBadge). Aceito pelo DSS como exceção estrutural canônica |

## Comportamento do Slot com Múltiplos Filhos Diretos

> ⚠️ **Nota de comportamento:** O QParallax (branch ativo) e o fallback estático (branch `prefers-reduced-motion`) diferem no tratamento de múltiplos filhos diretos no slot.
>
> - **QParallax ativo:** O slot é encapsulado no container interno do Quasar, que centraliza todo o conteúdo como um bloco único.
> - **Fallback estático:** O CSS `.dss-parallax--static > *:not(.dss-sr-only)` aplica `position: absolute; inset: 0; flex; center` a **cada filho direto individualmente** — eles ficam sobrepostos.
>
> **Recomendação:** Sempre envolva o conteúdo do slot em um único elemento raiz (ex: `<div>`). Isso garante comportamento idêntico nos dois modos.
>
> ```html
> <!-- ✅ Correto — um filho direto no slot -->
> <dss-parallax src="...">
>   <div style="display: flex; gap: 16px;">
>     <h1>Título</h1>
>     <q-btn label="Ação" />
>   </div>
> </dss-parallax>
>
> <!-- ⚠️ Cuidado — múltiplos filhos diretos se comportam diferente no fallback -->
> <dss-parallax src="...">
>   <h1>Título</h1>
>   <q-btn label="Ação" />
> </dss-parallax>
> ```

## Comparação com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssParallax | Justificativa da divergência |
|---------|----------|-------------|------------------------------|
| `defineOptions` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` | ✅ | ✅ | Idêntico |
| `-webkit-tap-highlight-color` | ✅ | ✅ | Idêntico |
| Elemento interativo | ❌ | ❌ | Idêntico — ambos não interativos |
| Touch target `::before` | ❌ | ❌ | Idêntico — sem touch target necessário |
| Estados hover/focus/active | ❌ | ❌ | Idêntico — não aplicável |
| Fallback prefers-reduced-motion | ❌ | ✅ | Diferente — paralaxe requer tratamento específico de movimento |
