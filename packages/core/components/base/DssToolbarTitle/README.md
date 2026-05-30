# DssToolbarTitle

Wrapper DSS governado sobre `QToolbarTitle`. Container tipográfico flexível para uso exclusivo dentro de `DssToolbar`.

## Quando usar

- Título principal de uma página, seção ou tela exibido dentro de uma `DssToolbar`
- Rótulo de contexto em barras de ferramentas de formulários, tabelas ou painéis

## Quando NÃO usar

- Fora de um `DssToolbar` — o componente depende do contexto flexbox e de brand do pai
- Como elemento de navegação — use `DssTab` ou `DssMenu`
- Para títulos de seção em conteúdo principal — use elementos HTML semânticos (`<h1>–<h6>`)

## Instalação

```js
import { DssToolbarTitle } from '@dss/components/DssToolbarTitle'
```

## Uso básico

```vue
<dss-toolbar>
  <q-btn flat round dense icon="menu" aria-label="Menu" />
  <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
  <q-space />
</dss-toolbar>
```

## Props

| Prop     | Tipo    | Padrão  | Descrição                                                              |
|----------|---------|---------|------------------------------------------------------------------------|
| `shrink` | Boolean | `false` | Impede que o título cresça para preencher o espaço disponível na toolbar. Útil quando há múltiplos elementos flexíveis. |

### Props bloqueadas (Governança DSS)

| Prop         | Motivo do bloqueio                                                                 |
|--------------|------------------------------------------------------------------------------------|
| `color`      | Cor governada pelo `DssToolbar` pai. Herdada automaticamente via `[data-brand]`.  |
| `active`     | `DssToolbarTitle` não possui estado ativo. Navegação é feita via `DssTab`/`DssMenu`. |

## Slots

| Slot       | Descrição                                                                                       |
|------------|-------------------------------------------------------------------------------------------------|
| `default`  | Conteúdo do título. Texto simples ou elementos inline. Para título de página use `<h1>` aqui. |
| `subtitle` | Subtítulo exibido abaixo do conteúdo principal (herdado do `QToolbarTitle`).                  |

## Eventos

Nenhum evento emitido. Componente não-interativo.

## Exemplos

### Título com brand

```vue
<dss-toolbar brand="hub">
  <dss-toolbar-title>Sansys Hub — Painel</dss-toolbar-title>
</dss-toolbar>
```

### Com shrink (múltiplos títulos)

```vue
<dss-toolbar>
  <dss-toolbar-title :shrink="true">Filtros</dss-toolbar-title>
  <q-space />
  <dss-toolbar-title>342 resultados encontrados</dss-toolbar-title>
</dss-toolbar>
```

### Título semântico de página (h1)

```vue
<dss-toolbar>
  <dss-toolbar-title>
    <h1>Dashboard Principal</h1>
  </dss-toolbar-title>
</dss-toolbar>
```

## Tokens utilizados

| Token                       | Propriedade CSS   |
|-----------------------------|-------------------|
| `--dss-font-family-sans`    | `font-family`     |
| `--dss-heading-4-size`      | `font-size`       |
| `--dss-heading-4-weight`    | `font-weight`     |
| `--dss-heading-4-line-height` | `line-height`   |

**Tokens herdados do DssToolbar pai:**

| Token                 | Contexto                                    |
|-----------------------|---------------------------------------------|
| `--dss-text-body`     | Cor de texto padrão (sem brand ativa)       |
| `--dss-text-inverse`  | Cor de texto sobre brand colorida           |

## Acessibilidade

- Componente **não-interativo** (Option B — sem touch target)
- Sem `role` adicional — semântica é definida pelo conteúdo do slot
- Truncamento via `text-overflow: ellipsis` preserva acessibilidade (texto completo disponível via leitores de tela)
- Cor de texto herdada do DssToolbar garante contraste adequado sobre qualquer brand

## Golden Reference

**DssItemLabel** — mesmo padrão de sobrescrita de tipografia nativa Quasar via seletor composto (EXC-01).

## Golden Context

**DssToolbar** — container pai direto e único contexto semântico válido.
