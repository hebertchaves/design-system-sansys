# DssList

Container de layout não-interativo para agrupamento de itens de lista (DssItem) e separadores (DssSeparator).

## Quando Usar

- Para agrupar uma sequência de `DssItem` com contexto visual compartilhado (bordas, separadores)
- Quando precisar comunicar semanticamente `role="list"` ao assistive technology
- Em menus de navegação, listas de configurações, feeds de conteúdo

## Quando NÃO Usar

- **Não usar** para listas de uma única coluna sem agrupamento visual — use `DssItem` diretamente
- **Não usar** para tabelas de dados — use `DssTable` (Fase 3)
- **Não usar** para menus contextuais flutuantes — use `q-menu` com `DssItem`

## Instalação

```js
import { DssList } from '@dss/components/base/DssList'
```

## Uso Básico

```vue
<DssList>
  <DssItem label="Primeiro item" />
  <DssItem label="Segundo item" />
  <DssItem label="Terceiro item" />
</DssList>
```

## Com Bordas e Separadores

```vue
<DssList bordered separator>
  <DssItem label="Ana Silva" caption="Administradora" clickable />
  <DssItem label="Bruno Souza" caption="Desenvolvedor" clickable />
</DssList>
```

> **⚠️ Atenção — `separator` + `<DssSeparator>` manual:**
> Não use a prop `separator=true` em conjunto com `<DssSeparator>` inserido manualmente no slot. O CSS da prop `separator` aplica `border-top` em **todos** os filhos diretos (incluindo o `<DssSeparator>`), causando **dupla separação visual**. Escolha uma das duas abordagens:
>
> ```vue
> <!-- ✅ Opção A: separadores automáticos via prop -->
> <DssList separator>
>   <DssItem label="A" />
>   <DssItem label="B" />
> </DssList>
>
> <!-- ✅ Opção B: separadores explícitos e controlados -->
> <DssList>
>   <DssItem label="A" />
>   <DssSeparator />
>   <DssItem label="B" />
> </DssList>
> ```

## Com Padding

```vue
<DssList padding bordered>
  <DssItem label="Configurações" clickable />
  <DssItem label="Sair" clickable />
</DssList>
```

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `bordered` | `Boolean` | `false` | Aplica borda externa com border-radius |
| `padding` | `Boolean` | `false` | Aplica padding vertical nas extremidades |
| `separator` | `Boolean` | `false` | Divisores automáticos entre itens filhos |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Acento de marca (requer `bordered`) |
| `ariaLabel` | `String` | `undefined` | Label acessível para leitores de tela |
| `ariaLabelledby` | `String` | `undefined` | ID do elemento que rotula a lista |

**Props bloqueadas:**
- `dark` — gerenciado via `[data-theme="dark"]` global
- `dense` — controlado individualmente nos `DssItem`s

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da lista. Espera `DssItem` e/ou `DssSeparator` como filhos. |

### Eventos

Nenhum. DssList é não-interativo.

## Acessibilidade

- Renderiza com `role="list"` nativamente
- Filhos `DssItem` assumem `role="listitem"` automaticamente
- Suporta `aria-label` e `aria-labelledby`
- Navegação por teclado pertence aos filhos (`DssItem` clickable)

## Tokens Utilizados

**Base:** `--dss-font-family-sans` · `--dss-font-size-md` · `--dss-text-body` · `--dss-text-inverse`

**Bordas e separadores:** `--dss-border-width-thin` · `--dss-border-width-md` · `--dss-border-width-thick` · `--dss-gray-200` · `--dss-gray-300`

**Layout:** `--dss-radius-md` · `--dss-spacing-2`

**Brand Hub:** `--dss-hub-300` · `--dss-hub-400` · `--dss-hub-600`

**Brand Water:** `--dss-water-200` · `--dss-water-400` · `--dss-water-500`

**Brand Waste:** `--dss-waste-200` · `--dss-waste-500` · `--dss-waste-600`

## Referências

- [Golden Reference: DssBadge](../DssBadge/README.md)
- [Golden Context: DssCard](../DssCard/README.md)
- [Composição: DssItem](../DssItem/README.md)
- [Composição: DssSeparator](../DssSeparator/README.md)
