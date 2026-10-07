# DssBrandLogo

A marca Sansys — **Water**, **Hub** ou **Waste** — desenhada como SVG inline.

## Quick Start

```vue
<DssBrandLogo brand="water" size="lg" />
```

Dentro de uma página que já declara a marca, a prop é dispensável:

```vue
<div data-brand="water">
  <DssBrandLogo />   <!-- resolve sozinho pelo ancestral mais próximo -->
</div>
```

## Instalação

```js
import { DssBrandLogo } from '@dss/components'
```

## Quando usar

- Barra de aplicação, cabeçalho, rodapé — onde a identidade do produto aparece
- Tela de login e de abertura (`size="xl"`)
- Rail lateral retraído (`variant="icon"`, `size="sm"`)

## Quando NÃO usar

- **Como ícone genérico** — para símbolos de interface, use `DssIcon`
- **Como botão** — o logo não recebe clique nem foco (`pointer-events: none`).
  Para o logo que leva à home, embrulhe-o num link ou `DssButton`:
  ```vue
  <a href="/" aria-label="Página inicial"><DssBrandLogo decorative /></a>
  ```
- **Esperando que ele pinte a si mesmo** — a cor vem do host (ver abaixo)

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `brand` | `'water' \| 'hub' \| 'waste'` | — | Marca. Ausente, resolve pelo `[data-brand]` ancestral mais próximo |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Altura do logo; a largura acompanha a proporção |
| `variant` | `'full' \| 'icon' \| 'wordmark'` | `'full'` | Que parte do desenho exibir |
| `decorative` | `boolean` | `false` | Tira o logo da árvore de acessibilidade |
| `ariaLabel` | `string` | nome da marca | Substitui o nome acessível natural |

**Não existe prop de cor, e a ausência é a decisão central do componente.** Ver abaixo.

## A cor é de quem hospeda

O logo declara `fill: currentColor` e nada mais. Isso significa que o **mesmo desenho** sai
branco sobre a barra de marca e escuro sobre fundo claro, sem variante por tema e sem o
consumidor passar cor:

```vue
<!-- barra colorida: o logo sai branco porque o texto da barra é branco -->
<DssToolbar brand="water">
  <DssBrandLogo size="md" />
</DssToolbar>

<!-- fundo claro: o logo sai na cor do texto do contexto -->
<footer class="text-subtle">
  <DssBrandLogo size="sm" />
</footer>
```

Uma prop de cor prenderia o logo a um valor e quebraria o uso sobre fundo colorido — que é
o caso mais comum no Sansys. É também o que o protótipo do Figma fazia com
`filter: brightness(0) invert(1)`: só produz branco, e só funciona em logo monocromático.

## A marca é conteúdo, não pele

O resto da brandabilidade do DSS é cascata: `[data-brand]` remapeia tokens e a cor desce
sozinha. Aqui não dá — a marca decide **quais `<path>` existem no DOM**, e CSS não troca o
`d` de um path.

Por isso a resolução mora em JS, com duas fontes nesta ordem:

1. a prop `brand`;
2. o ancestral `[data-brand]` **mais próximo**.

> **O "mais próximo" é deliberado.** Um overlay teleportado herda a marca do *documento*
> (ver `useTeleportedBrand`), porque ele não tem ancestral útil. O logo vive na árvore: quem
> está mais perto é quem manda, e é isso que faz um bloco de marca mista funcionar.

Sem marca resolvida, o componente **não desenha nada**. Chutar a marca de um produto é pior
que não desenhar.

## Tamanhos

| Valor | Altura | Contexto real |
|---|---|---|
| `sm` | 16px | Rail retraído, rodapé |
| `md` | 20px | Barra densa, rail expandido |
| `lg` | 28px | **A app bar do Sansys** (`DssAppBar`), nas duas densidades |
| `xl` | 40px | Login, splash |

Os degraus saem dos contextos onde a marca de fato aparece, e não de uma escala inventada.
Quem manda é a **altura**: os três desenhos têm proporções diferentes (Water 154×42, Hub
120×42, Waste 156×42), então fixar largura deformaria dois dos três.

## Acessibilidade

- **Nome por padrão.** O logo é informativo e anunciado com o nome da marca, que vem dos
  dados (`assets/brand/logos.ts`) — não de o consumidor lembrar de escrever.
  É a diferença declarada em relação ao `DssIcon`, onde `ariaLabel` é obrigatório: um ícone
  não tem nome natural, um logo tem.
- **`decorative` para o caso concreto:** numa barra onde o nome do produto já aparece em
  texto ao lado, o logo anunciado duplicaria a leitura.
- **Não recebe foco** — `focusable="false"` e `pointer-events: none`.
- **Alto contraste:** em `forced-colors` o logo herda a cor do texto em vez de forçar a cor
  da marca. Preservar a marca contra a escolha de contraste do usuário é o que a WCAG não
  quer.

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-brand-logo-height-sm` | L3 | Altura `sm` |
| `--dss-brand-logo-height-md` | L3 | Altura `md` |
| `--dss-brand-logo-height-lg` | L3 | Altura `lg` |
| `--dss-brand-logo-height-xl` | L3 | Altura `xl` |
| `--dss-text-body` | L4 | Cor no `@media print` |

## Por que SVG inline

| Rota | Recolorir | Requisições | Veredito |
|---|---|---|---|
| **SVG inline** (esta) | `currentColor` | 0 | ✅ |
| `<img src>` | não aceita | 1 por marca | ✗ |
| `<img>` + `filter` | só branco, e só em logo monocromático | 1 por marca | ✗ |

O DSS troca de marca em **runtime** (`[data-brand]`), então as três precisam estar no bundle
de qualquer forma — dividir por marca não se aplica. Custo dos três: ~10,5 KB de `d`, antes
de gzip.

## Documentação

| Documento | Descrição |
|---|---|
| [DssBrandLogo.md](./DssBrandLogo.md) | Normativo — governança e decisões |
| [DSSBRANDLOGO_API.md](./DSSBRANDLOGO_API.md) | API Reference |
