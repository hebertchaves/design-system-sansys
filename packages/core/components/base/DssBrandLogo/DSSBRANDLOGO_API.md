# DssBrandLogo — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `brand` | `'water' \| 'hub' \| 'waste'` | `undefined` | Marca a exibir. Ausente, resolve pelo `[data-brand]` ancestral mais próximo |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Altura do logo; a largura acompanha a proporção do desenho |
| `variant` | `'full' \| 'icon' \| 'wordmark'` | `'full'` | Recorte do desenho |
| `decorative` | `boolean` | `false` | Tira o logo da árvore de acessibilidade (`aria-hidden`) |
| `ariaLabel` | `string` | nome da marca | Substitui o nome acessível natural |

## Events

Nenhum. O logo não é interativo.

## Slots

Nenhum. O conteúdo é o desenho da marca, que vem dos dados.

## Props deliberadamente ausentes

| Prop | Por que não existe | Alternativa |
|---|---|---|
| `color` | A cor é de quem hospeda — ver README | Defina `color` no contexto; o logo herda |
| `width` | Fixar largura deformaria 2 dos 3 desenhos | Use `size`; a largura acompanha |
| `src` | O desenho vive no repositório, não numa URL | — |

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-brand-logo-height-sm` | L3 | Altura `sm` (16px) |
| `--dss-brand-logo-height-md` | L3 | Altura `md` (20px) |
| `--dss-brand-logo-height-lg` | L3 | Altura `lg` (28px) |
| `--dss-brand-logo-height-xl` | L3 | Altura `xl` (40px) |
| `--dss-text-body` | L4 | Cor no `@media print` |

## Dados das marcas

`packages/core/assets/brand/logos.ts` exporta `BRAND_LOGOS: Record<BrandKey, BrandLogo>`.

```ts
interface BrandLogo {
  label: string      // nome acessível — vai para o aria-label
  viewBox: string
  paths: { d: string; role: 'wordmark' | 'icon'; opacity?: number }[]
}
```

| Marca | viewBox | Paths |
|---|---|---|
| `water` | `0 0 154 42` | 4 |
| `hub` | `0 0 120 42` | 5 |
| `waste` | `0 0 156 42` | 5 |
