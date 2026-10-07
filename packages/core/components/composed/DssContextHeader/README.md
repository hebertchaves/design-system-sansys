# DssContextHeader

O cabeçalho de **contexto do atendimento**: a faixa que acompanha o atendente por toda a jornada e diz, em qualquer tela, quem está sendo atendido.

```
EXPANDIDO
┌──────────┬────────────────────────────────────────────────┬─────┐
│   [🏢²]  │ Proprietário: …⊡   Rota: …      Água: Ativa    │ [⇄²]│
│ 652701-9 │ Morador: …⊡        Local: …     Esgoto: Inat.  │ [ + ]│
│[+DETALHES]│ Endereço: …       Cobrança: …   Lixo: …        │ [ ^ ]│
└──────────┴────────────────────────────────────────────────┴─────┘

RETRAÍDO
┌──────────────────────────────┬──────────────────────────┬─────┐
│ [🏢²] 652701-9 [+DETALHES]   │ Morador: …   Endereço: … │ [ v ]│
└──────────────────────────────┴──────────────────────────┴─────┘
```

---

## Quando usar

- Telas de **atendimento** em que o operador navega por vários módulos sem trocar de cliente: o cabeçalho é a única peça que não muda de tela para tela.
- Qualquer fluxo com um **registro em foco** (matrícula, protocolo, contrato) cujos dados precisam ficar à vista enquanto se trabalha em outra coisa.

## Quando **não** usar

- Para a barra do produto (logo, busca global, conta) — isso é `DssAppBar`.
- Para filtrar uma tabela — isso é `DssDataBoard`.
- Para o miolo da página (rail de módulos + trilha + conteúdo) — isso é `DssPageShell`.
- Para exibir um registro em uma lista de registros — isso é uma linha de `DssTable` ou um `DssCard`.

---

## Anatomia: três colunas que não negociam entre si

| coluna | comporta-se como | por quê |
|---|---|---|
| **Identidade** | fixa (`flex: 0 0 auto`) | carrega dois alvos de toque de 44px; ceder largura reprovaria a WCAG 2.5.5 |
| **Informações** | elástica (`flex: 1 1 auto`) | é a única parte cujo conteúdo varia de tamanho |
| **Trilho** | fixo (`flex: 0 0 auto`) | três alvos de 44px empilhados, ocupando a altura inteira |

---

## API

### Props

| prop | tipo | default | descrição |
|---|---|---|---|
| `identifier` | `string` | `''` | O número que o operador dita ao telefone. Sobrevive à retração. |
| `identifierLabel` | `string` | `'Matrícula'` | Rótulo visualmente oculto, lido antes do número. |
| `identityIcon` | `string` | `'domain'` | Ícone da coluna de identidade. |
| `recordsCount` | `number` | `0` | Quantos registros existem no modal de informações. Zero desenha o badge de **adicionar**; a partir de 1, o **contador**. |
| `recordsAddLabel` | `string` | `'Adicionar informações do imóvel'` | Nome acessível do botão sem registros. |
| `recordsLabel` | `string` | `'Ver {n} informações do imóvel'` | Nome acessível com registros; `{n}` é interpolado. |
| `detailsLabel` | `string` | `'Detalhes'` | Rótulo do botão. O DSS aplica caixa alta por token — não escreva em maiúsculas. |
| `detailsIcon` | `string` | `'add'` | Ícone do botão de detalhes. |
| `detailsTooltip` | `string` | `'Ver detalhes do cadastro'` | Dica do botão de detalhes. |
| `groups` | `ContextHeaderGroup[]` | `[]` | As informações do registro, agrupadas em colunas. |
| `summary` | `string[]` | `[]` | Quais informações continuam visíveis quando retraído. Vazio: as duas primeiras. |
| `collapsed` | `boolean \| undefined` | `undefined` | `v-model:collapsed`. **`undefined` significa "ninguém controla"** — o cabeçalho retrai sozinho. |
| `collapsible` | `boolean` | `true` | Mostra o gatilho de retrair/expandir. |
| `openCount` | `number` | `0` | Atendimentos em aberto. Alimenta o badge **e** o nome do botão de alternar. |
| `switchable` | `boolean` | `true` | Mostra o botão de alternar atendimento. |
| `creatable` | `boolean` | `true` | Mostra o botão de novo atendimento. |
| `switchIcon` | `string` | `'switch_account'` | Ícone do botão de alternar. |
| `switchLabel` | `string` | `'Alterar atendimento'` | Dica e base do nome acessível. |
| `createIcon` | `string` | `'add'` | Ícone do botão de novo atendimento. |
| `createLabel` | `string` | `'Iniciar novo atendimento'` | Dica e nome acessível. |
| `collapseLabel` | `string` | `'Minimizar cabeçalho'` | Dica do gatilho quando expandido. |
| `expandLabel` | `string` | `'Maximizar cabeçalho'` | Dica do gatilho quando retraído. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Emite `data-brand` no root e **remapeia** o token (§K5). |
| `ariaLabel` | `string` | `'Contexto do atendimento'` | Nome acessível da região. |

### Tipos

```ts
interface ContextHeaderGroup {
  name: string                 // chave estável
  label?: string               // nome acessível do grupo (não desenhado)
  items: ContextHeaderItem[]
  span?: number                // vira flex-grow; default 1
}

interface ContextHeaderItem {
  name: string                 // nomeia o slot item-* e o payload de item-action
  label: string
  value?: string
  tone?: 'neutral' | 'positive' | 'negative' | 'info'
  action?: { icon: string; label: string }   // label = dica E nome acessível
}
```

### Eventos

| evento | payload | quando |
|---|---|---|
| `update:collapsed` | `boolean` | o gatilho do trilho foi acionado |
| `open-records` | — | o ícone do imóvel foi acionado (abre o modal de registros) |
| `open-details` | — | o botão de detalhes foi acionado (abre **outro** modal) |
| `switch` | — | alternar entre atendimentos em aberto |
| `create` | — | iniciar um novo atendimento |
| `item-action` | `string` (o `name`) | a ação de uma linha foi acionada |

### Slots

| slot | escopo | descrição |
|---|---|---|
| `identity` | — | substitui o identificador na coluna de identidade |
| `item-[name]` | `{ item, collapsed }` | substitui o valor de uma informação |

### Composable

```ts
import { useContextHeader } from '@sansys/design-system'

const { collapsed, expanded } = useContextHeader()
```

Qualquer descendente — inclusive conteúdo que chegou por slot — injeta o estado de retração sem receber prop de ninguém (§1.2). `collapsed` é `Readonly`: quem recolhe é o cabeçalho.

---

## Estados

| estado | implementado | onde |
|---|---|---|
| hover | sim | `4-output/_states.scss` — `--dss-surface-hover` nos controles claros, `--dss-action-primary-hover` no trilho |
| focus | sim | anel de 3px; no trilho é `--dss-action-primary-text` com deslocamento negativo |
| active | sim | `--dss-surface-active` / `--dss-action-primary-focus` |
| collapsed | sim | `3-variants/_collapsed.scss` |
| collapsing | sim | `data-dss-collapsing` no root, durante a transição (ver abaixo) |
| forced-colors | sim | borda explícita no contêiner e no trilho |
| reduced-motion | sim | transições desligadas |
| disabled | **não aplicável** | o cabeçalho é contexto permanente; desabilitá-lo esconderia quem está sendo atendido |
| loading | **não aplicável** | carregamento é estado de quem serve os dados; enquanto não chegam, `groups` é uma lista vazia |

---

## A transição entre expandido e retraído

Retrair **não** é esconder conteúdo: é trocar de arranjo. A lista inteira de
informações sai, entra o resumo, e a identidade deita. A troca é instantânea
por natureza — classe entra, layout muda — e sozinha ela salta.

A suavidade vem de três camadas, e cada uma mora onde pertence:

| camada | mecanismo | onde |
|---|---|---|
| **altura** | sanfona medida: trava a altura anterior, mede a nova, transita em pixels | `useCollapseHeight` (JS) |
| **conteúdo** | esmaece ao entrar, enquanto a caixa ainda se move | `data-dss-collapsing` + `@keyframes` |
| **chevron** | UM glifo que gira 180° | `transform` no `--gatilho` |

**Por que a altura não é CSS.** `auto → auto` não interpola, e as saídas
conhecidas não servem a este caso: `grid-template-rows: 1fr → 0fr` pressupõe
que o conteúdo apenas some (aqui ele muda de lugar — durante a transição um
campo saltaria para o lado do título antes de desaparecer); `max-block-size`
exige um teto chutado; `interpolate-size: allow-keywords` resolve de verdade,
mas só em Chromium. Sobra medir, que é a receita clássica de sanfona e funciona
em todo navegador.

**Por que o chevron gira.** A versão anterior alternava `keyboard_arrow_up` e
`keyboard_arrow_down`: uma troca instantânea no meio de uma transição contínua.
O que se via era o ícone pulando enquanto o resto deslizava.

**O gatilho não esmaece.** Esmaecer o botão que a pessoa acabou de clicar é
perder o único ponto fixo da cena — por isso o trilho fica de fora da animação
de conteúdo.

### Afinando o tempo

```css
/* Num CONTÊINER, não no componente. */
.minha-tela {
  --dss-collapse-duration: var(--dss-duration-slow);   /* 300ms */
  --dss-collapse-easing: var(--dss-easing-decelerate);
}
```

Os dois canais governam as três camadas de uma vez: o composable lê a duração
por `getComputedStyle`, e o CSS usa as mesmas variáveis.

Os tokens moram no `:root` e o componente **não** os redeclara — de propósito.
Uma custom property declarada no próprio elemento vence a que vem do ancestral,
e a peça deixaria de ser afinável de fora; medido, um contêiner que pedia 500ms
continuava em 250ms.

### Movimento reduzido

`prefers-reduced-motion: reduce` desliga as três: o composable consulta a
preferência e não trava altura nenhuma, e o `4-output/_states.scss` zera o
esmaecimento e o giro. A troca volta a ser instantânea — que é o que a
preferência pede. Nenhuma informação depende da animação: o estado também é
anunciado por `aria-expanded`.

---

## Acessibilidade

- **4.1.2** — todo botão sem rótulo visível declara `aria-label`. As contagens entram no **nome** (`Alterar atendimento (2 em aberto)`), porque os badges são `aria-hidden`: sem isso o leitor de tela anuncia o número duas vezes, na segunda sem dizer de que ele é contagem.
- **1.3.1** — cada grupo é um `<dl>` e cada informação um par `<dt>`/`<dd>`. O leitor de tela anuncia "Ligação água, Ativa" em vez de dois textos soltos.
- **1.4.3** — os tons de status usam canais remapeados por tema. Medido sobre `--dss-surface-default`: claro 6,94:1 (positive) · 8,01:1 (negative) · 5,35:1 (info); escuro 11,75:1 · 7,83:1 · 11,80:1.
- **1.4.1** — o tom nunca é o único canal: o peso da fonte acompanha a cor.
- **2.5.5** — botão de registros e ladrilhos do trilho: 44×44px, a caixa visual **é** o alvo. A ação de linha tem 20px visuais e o alvo de 44px no `::before`.
- **1.4.13** — as dicas abrem por `mouseenter` **e** `focusin`.
- **2.1.1** — todos os controles são `<button>` nativos; não há handler de teclado próprio que possa engolir a tecla.

---

## Tokens

`--dss-touch-target-md` · `--dss-icon-size-lg/md/sm` · `--dss-compact-control-height-xs` · `--dss-surface-default/hover/active` · `--dss-action-primary` e derivados · `--dss-text-body/secondary/action` · `--dss-feedback-error` · `--dss-positive-deep/-light` · `--dss-negative-hover/-light` · `--dss-info-deep/-light` · `--dss-border-width-thin` · `--dss-border-subtle` · `--dss-radius-md/sm/circle` · `--dss-spacing-*` · `--dss-font-size-sm` · `--dss-font-weight-bold/semibold` · `--dss-line-height-sm-tight` · `--dss-focus-ring-*` · `--dss-focus-primary` · `--dss-z-index-20` · `--dss-duration-fast` · `--dss-easing-standard`

Canais de contexto próprios (remapeáveis pelo host):

```
--dss-context-header-tone-positive
--dss-context-header-tone-negative
--dss-context-header-tone-info
```

Movimento — tokens do `:root` (`tokens/semantic/_motion.scss`), **não**
declarados no componente, para que qualquer contêiner da tela possa
redeclarar e a herança mande:

```
--dss-collapse-duration    /* --dss-duration-base (250ms) */
--dss-collapse-easing      /* --dss-easing-standard       */
```

---

## Exemplos

### 1. O mínimo

```vue
<DssContextHeader identifier="652701-9" :groups="grupos" />
```

### 2. Com os dois modais

```vue
<DssContextHeader
  identifier="652701-9"
  :records-count="informacoesDoImovel.length"
  :groups="grupos"
  @open-records="modalRegistros = true"
  @open-details="modalDetalhes = true"
/>
```

### 3. Retração controlada

```vue
<DssContextHeader
  v-model:collapsed="cabecalhoRetraido"
  identifier="652701-9"
  :groups="grupos"
  :summary="['morador', 'endereco']"
/>
```

### 4. Ações de sessão

```vue
<DssContextHeader
  identifier="652701-9"
  :open-count="atendimentosAbertos.length"
  :groups="grupos"
  @switch="abrirListaDeAtendimentos"
  @create="iniciarAtendimento"
/>
```

### 5. Valor customizado por slot

```vue
<DssContextHeader :groups="grupos">
  <template #item-debito="{ item }">
    <DssChip size="sm" color="warning" :label="item.value" />
  </template>
</DssContextHeader>
```

### 6. Marca

```vue
<DssContextHeader brand="water" identifier="652701-9" :groups="grupos" />
```

A marca também chega por cascata, de um ancestral com `[data-brand]` — a prop só existe para o caso de uma peça com marca diferente da página.

### 7. Na tela real

```vue
<DssLayout view="hHh lpR fFf" container>
  <DssAppBar brand="water" title="Atendimento" />

  <DssPageContainer>
    <DssPage>
      <DssContextHeader
        v-model:collapsed="retraido"
        :identifier="matricula"
        :records-count="registros.length"
        :open-count="abertos.length"
        :groups="grupos"
        :summary="['morador', 'endereco']"
        @open-records="abrirRegistros"
        @open-details="abrirDetalhes"
        @switch="abrirTrocaDeAtendimento"
        @create="novoAtendimento"
        @item-action="abrirFicha"
      />

      <DssPageShell rail-aria-label="Módulos do atendimento">
        <!-- … -->
      </DssPageShell>
    </DssPage>
  </DssPageContainer>
</DssLayout>
```

---

## O que ele **não** faz — e é deliberado

| não faz | por quê |
|---|---|
| Não abre modal nenhum | emite `open-records` e `open-details`; são justamente esses dois modais que mudam entre produtos |
| Não busca dados | `groups` chega pronto; buscar aqui o acoplaria à API de um produto |
| Não lista os atendimentos abertos | emite `switch` e informa a contagem; a lista e a troca são da página |
| Não quebra linha no valor | trunca em uma linha, com o valor inteiro no `title`; a altura da faixa é o recurso escasso |
| Não oferece tom `warning` | não há contraste seguro entre o amarelo da paleta e fundo claro (regra em `tokens/globals.scss`) |
| Retraído, esconde alternar e criar | a faixa retraída existe para devolver altura, não para manter três alvos de 44px |
