# DssContextHeader — API Reference

Fase 3 · Composto · `packages/core/components/composed/DssContextHeader`

```ts
import { DssContextHeader, useContextHeader } from '@sansys/design-system'
import type {
  ContextHeaderProps,
  ContextHeaderGroup,
  ContextHeaderItem,
  ContextHeaderItemAction,
  ContextHeaderTone,
  ContextHeaderBrand,
  ContextHeaderContext,
} from '@sansys/design-system'
```

---

## Props

| prop | tipo | default |
|---|---|---|
| `identifier` | `string` | `''` |
| `identifierLabel` | `string` | `'Matrícula'` |
| `identityIcon` | `string` | `'domain'` |
| `recordsCount` | `number` | `0` |
| `recordsAddLabel` | `string` | `'Adicionar informações do imóvel'` |
| `recordsLabel` | `string` | `'Ver {n} informações do imóvel'` |
| `detailsLabel` | `string` | `'Detalhes'` |
| `detailsIcon` | `string` | `'add'` |
| `detailsTooltip` | `string` | `'Ver detalhes do cadastro'` |
| `groups` | `ContextHeaderGroup[]` | `[]` |
| `summary` | `string[]` | `[]` |
| `collapsed` | `boolean \| undefined` | `undefined` |
| `collapsible` | `boolean` | `true` |
| `openCount` | `number` | `0` |
| `switchable` | `boolean` | `true` |
| `creatable` | `boolean` | `true` |
| `switchIcon` | `string` | `'switch_account'` |
| `switchLabel` | `string` | `'Alterar atendimento'` |
| `createIcon` | `string` | `'add'` |
| `createLabel` | `string` | `'Iniciar novo atendimento'` |
| `collapseLabel` | `string` | `'Minimizar cabeçalho'` |
| `expandLabel` | `string` | `'Maximizar cabeçalho'` |
| `brand` | `ContextHeaderBrand \| null` | `null` |
| `ariaLabel` | `string` | `'Contexto do atendimento'` |

### `collapsed` é tri-estado

`undefined` significa **"ninguém controla"** — o cabeçalho usa o espelho interno e o gatilho funciona sozinho. `true`/`false` dão a palavra final ao consumidor. O default **não** pode ser `false`: com ele a prop nunca é nula, o `??` interno nunca cai para o espelho e o gatilho fica mudo em toda tela sem `v-model:collapsed`.

---

## Tipos

```ts
type ContextHeaderBrand = 'hub' | 'water' | 'waste'

type ContextHeaderTone = 'neutral' | 'positive' | 'negative' | 'info'
// `warning` não existe: tokens/globals.scss declara que não há contraste
// seguro entre o amarelo da paleta e fundo claro (máx. 4,36:1).

interface ContextHeaderItemAction {
  icon: string
  label: string   // dica E nome acessível — obrigatório
}

interface ContextHeaderItem {
  name: string
  label: string
  value?: string
  tone?: ContextHeaderTone
  action?: ContextHeaderItemAction
}

interface ContextHeaderGroup {
  name: string
  label?: string
  items: ContextHeaderItem[]
  span?: number   // vira flex-grow
}
```

---

## Eventos

| evento | payload |
|---|---|
| `update:collapsed` | `boolean` |
| `open-records` | — |
| `open-details` | — |
| `switch` | — |
| `create` | — |
| `item-action` | `string` — o `name` da informação |

---

## Slots

| slot | escopo |
|---|---|
| `identity` | — |
| `item-[name]` | `{ item: ContextHeaderItem; collapsed: boolean }` |

---

## Composable

```ts
function useContextHeader(): {
  collapsed: Readonly<Ref<boolean>>
  expanded: ComputedRef<boolean>
}
```

Injetável por qualquer descendente. Fora de um `DssContextHeader` devolve `collapsed: false` / `expanded: true` — o descendente continua montável isolado, inclusive no Preview Frame.

---

## Classes públicas

| classe | papel |
|---|---|
| `.dss-context-header` | root; define os canais de tom |
| `.dss-context-header--collapsed` | estado retraído |
| `.dss-context-header--brand-{hub\|water\|waste}` | ponto de ancoragem; sem regra por design |
| `.dss-context-header__identity` | coluna de identidade |
| `.dss-context-header__records` | botão do ícone do imóvel |
| `.dss-context-header__records-badge` | badge sobre o ícone (irmão do botão) |
| `.dss-context-header__records-badge--add` | o badge no estado sem registros |
| `.dss-context-header__identifier` | o identificador |
| `.dss-context-header__details` | botão de detalhes |
| `.dss-context-header__groups` | coluna elástica |
| `.dss-context-header__group` | um `<dl>` |
| `.dss-context-header__item` | o par rótulo/valor |
| `.dss-context-header__label` | `<dt>` |
| `.dss-context-header__value` | `<dd>`; carrega `data-tone` |
| `.dss-context-header__value-text` | o texto que trunca |
| `.dss-context-header__item-action` | ação de linha |
| `.dss-context-header__rail` | trilho de sessão |
| `.dss-context-header__rail-slot` | âncora de um ladrilho |
| `.dss-context-header__rail-btn` | o ladrilho |
| `.dss-context-header__rail-badge` | badge de atendimentos abertos |
| `.dss-context-header__hint-anchor` | contexto de posicionamento da dica |
| `.dss-context-header__hint` | a dica |

---

## Canais de contexto

| var | default (claro) | default (escuro) |
|---|---|---|
| `--dss-context-header-tone-positive` | `--dss-positive-deep` | `--dss-positive-light` |
| `--dss-context-header-tone-negative` | `--dss-negative-hover` | `--dss-negative-light` |
| `--dss-context-header-tone-info` | `--dss-info-deep` | `--dss-info-light` |

Remapeáveis pelo host; os defaults estão medidos contra `--dss-surface-default` nos dois temas (mínimo 5,35:1).

### Movimento

| token | default | governa |
|---|---|---|
| `--dss-collapse-duration` | `--dss-duration-base` (250ms) | altura, esmaecimento e giro do chevron |
| `--dss-collapse-easing` | `--dss-easing-standard` | altura e giro do chevron |

Estes dois moram no `:root` (`tokens/semantic/_motion.scss`) e o componente **não** os redeclara: uma custom property declarada no próprio elemento vence a que vem do ancestral, e a peça deixaria de ser afinável de fora. Redeclare em um **contêiner**, não no componente.

São lidos pelo `useCollapseHeight` via `getComputedStyle` **e** pelo CSS — um só lugar governa o tempo da retração inteira.

---

## Atributo de estado

| atributo | quando | para quê |
|---|---|---|
| `data-dss-collapsing` | no root, durante a transição de retração | engancha o esmaecimento do conteúdo; é posto e retirado pelo `useCollapseHeight` |
