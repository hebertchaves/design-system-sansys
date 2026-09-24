# 🤖 PRÉ-PROMPT: DssActionMenu (Fase 3)

> **Contexto:** Contrato de Interface para um componente composto da Fase 3. Orquestra
> múltiplos componentes DSS internos e coordena o estado compartilhado entre a barra e
> suas ações.

> ⚠️ **ESCRITO ANTES DE REABRIR O CÓDIGO LEGADO.** Este componente nasce de uma
> internalização (`jtech-action-menu`, do `framework-jtech`), e a ordem importa: o que
> ele **deve ser** é decidido aqui, no vocabulário do DSS. O legado só é consultado
> depois, e **apenas para verificar comportamento** — nunca para copiar forma (nomes de
> prop, estrutura de arquivo, defaults visuais).
>
> O motivo é concreto, não cerimonial: o componente de origem fixa `flat`, `no-caps`,
> `stretch` e `color="dark"` direto no template. Portar isso reintroduziria, num
> componente novo, a exceção de capitalização que o DSS acabou de normalizar
> (`--dss-text-transform-control: uppercase`, set/2026). Traduzir linha a linha é
> exatamente como a contaminação entra.
>
> **Este pré-prompt NÃO é retroativo.** Precede o código.

---

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO

- **Nome:** `DssActionMenu`
- **Fase:** Fase 3 — Componente Composto
- **Classificação:** `Action`
- **Golden Context:** `DssMultiselectAutocomplete` — único composto Fase 3 concluído no DSS;
  é dele que sai a régua de estrutura, contrato e cobertura.
- **Golden Reference:** `DssChip` (governança global de compacto **interativo**).
- **Justificativa:** O DSS tem `DssButton`, `DssBtnGroup`, `DssBtnDropdown`, `DssMenu` e
  `DssToolbar` — mas **não tem o padrão** de barra de ações em que um item pode abrir
  sub-ações. É uma composição recorrente de primitivos que já existem, que é a definição
  de um composto de Fase 3. Nenhum primitivo novo é necessário.

---

## 2️⃣ CONTRATO DE INTERFACE

### 2.1. Casos de Uso Negativos

O que este componente **NÃO** deve fazer:

- ❌ **Não gerencia navegação.** Um item que navega emite evento ou recebe `to`; o
  componente não conhece rota.
- ❌ **Não decide a permissão.** `disabled` é informado de fora. O componente não consulta
  perfil, papel nem regra de negócio.
- ❌ **Não faz overflow automático** ("mais ações" quando não cabe) neste incremento. Se
  vier, é decisão de design posterior — declarar como ausente é melhor que meia-entrega.
- ❌ **Não é `DssBtnDropdown`.** Aquele é UM botão com menu. Este é uma BARRA de ações em
  que *algumas* abrem sub-ações. Se o uso tem um só gatilho, o componente certo é o outro.
- ❌ **Não aninha além de um nível.** Sub-item não abre sub-sub-item. Menu em árvore é
  outro problema, e `DssTree` já existe.

### 2.2. Matriz de Composição

Componentes DSS permitidos internamente:

- ✅ `DssToolbar` — a faixa que hospeda as ações
- ✅ `DssButton` — cada ação (é ele quem já resolve variante, tamanho, marca, foco e ripple)
- ✅ `DssMenu` — o painel de sub-ações
- ✅ `DssList` · `DssItem` · `DssItemSection` · `DssItemLabel` — as sub-ações dentro do menu
- ✅ `DssSeparator` — separação entre grupos de ação, quando houver
- ✅ `DssTooltip` — dica por ação (opcional)
- ❌ **Proibido QComponent cru** no template (`<q-btn>`, `<q-menu>`, `<q-list>`…). O Cartão
  Composto exige compor DSS.
- ❌ Proibido `<div>`/`<span>` para **layout interno**; o arranjo é do `DssToolbar`.

### 2.3. Estado de Falha e Loading

- **Loading:** por AÇÃO, não pela barra. Uma ação em curso usa o `loading` do próprio
  `DssButton` — a barra não tem estado de carregamento próprio.
- **Vazio:** barra sem nenhuma ação **não renderiza** (nem a faixa). Uma toolbar vazia é
  ruído visual, e `DssEmptyState` é para região de conteúdo, não para barra de comando.

---

## 3️⃣ O GRANDE RISCO ARQUITETURAL

**Risco principal — sobreposição de overlay em superfície de comando.**
O `DssMenu` teleporta para o `<body>`. A barra costuma viver em cabeçalho `sticky`, dentro
de `DssLayout`/`DssHeader`, frequentemente sobre uma tabela com cabeçalho também fixo. É o
caso clássico de o painel abrir atrás de algo ou herdar tema errado por não ser descendente
no DOM.

**Mitigação:** tema e marca governados **globalmente** (`[data-theme]` no `<html>`,
`data-brand` no nó raiz), nunca presos a uma div interna — é a lição já registrada no
`PreviewSubject`, onde conteúdo teleportado resolvia o tema claro dentro de página escura.
Validar com a barra dentro de um `DssHeader` sticky, não isolada no palco.

**Risco secundário — propagação de `disabled`.**
Desabilitar a barra inteira deve desabilitar cada ação, inclusive as que abrem sub-menu, e
**impedir a abertura**. Prop drilling aqui gera o defeito silencioso de um menu que abre com
itens inertes.
**Mitigação:** `provide/inject` **tipado** no composable, conforme o Cartão Composto.
Proibido `$parent`, `$children` (não existe no Vue 3) ou varredura de `$refs`.

**Risco de fronteira — o que é do item e o que é da barra.**
Cor, tamanho e variante devem ser decididos **uma vez, na barra**, e herdados pelas ações.
Permitir que cada item sobrescreva produz barra heterogênea — e foi assim que o legado
acabou com `color="dark"` fixo por item.

---

## 4️⃣ MAPEAMENTO DE API (DSS vs QUASAR)

> A tabela declara a API **pretendida**. O mapeamento definitivo sai do
> `types/action-menu.types.ts` e é emitido no contrato — nunca escrito à mão.

| Prop/Slot/Event | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `variant` | DSS | Criar | Variante das ações, decidida na barra. Espelha `DssButton`. |
| `color` | DSS | Criar | Cor semântica da barra. Herdada por todas as ações. |
| `size` | DSS | Criar | Tamanho compartilhado. Ação individual **não** sobrescreve. |
| `brand` | DSS | Criar | Marca. Propagada via `data-brand` no nó raiz. |
| `disabled` | DSS | Criar | Desabilita a barra inteira, via `provide/inject`. |
| `dense` | Quasar | Expor | Densidade da toolbar; repassar ao `DssToolbar`. |
| `flat` / `no-caps` / `stretch` | Quasar | **Bloquear** | São decisões de **aparência** do DSS, não configuração do consumidor. `no-caps` em especial contradiz o default de capitalização vigente. |
| `color="dark"` | — | **Não portar** | Valor literal do legado. A cor sai do token semântico. |
| `default` (slot) | DSS | Criar | As ações. O consumidor monta com `DssActionMenuItem`. |
| `@action` | DSS | Criar | Emitido ao acionar, com o `name` da ação. Payload plano e serializável. |

**Subcomponentes previstos:** `DssActionMenuItem` (a ação) e, dentro dele, o slot de
sub-ações. A nomenclatura segue o padrão do DSS (`DssCardSection`, `DssTimelineEntry`) —
**não** `JtActionItem`.

---

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO

- **Layout:** proibido `:deep()`. O arranjo interno é responsabilidade do `DssToolbar`.
- **Atributos:** `inheritAttrs: false` **obrigatório**, com `v-bind="$attrs"` explícito no
  nó raiz correto. *(A base de origem tem zero usos — é ganho, não porte.)*
- **Comunicação visual:** `brand` via `data-brand` no elemento raiz; **nunca** por inject.
- **Comunicação de estado:** `disabled` via `provide/inject` tipado no composable.
- **Tokens:** zero hardcode. A barra não define cor própria — consome os semânticos e deixa
  o `DssButton` resolver a rampa de hover/active.

---

## 6️⃣ ACESSIBILIDADE E ESTADOS

> É aqui que está o trabalho substantivo. O componente de origem tem **zero** `aria-*`,
> `role`, `tabindex` e `@keydown`. Nada abaixo é porte: tudo é construção.

- **Papéis ARIA:** a barra é `role="toolbar"` com `aria-label`. Cada ação é um `<button>`
  nativo (via `DssButton`). A ação que abre sub-ações leva `aria-haspopup="menu"` e
  `aria-expanded`. O painel é `role="menu"`; cada sub-ação, `role="menuitem"`.
- **Teclado — na toolbar:** `←`/`→` movem entre ações (padrão de toolbar: **uma só parada
  de tabulação** para o conjunto, com `roving tabindex`). `Home`/`End` vão aos extremos.
- **Teclado — no menu aberto:** `↑`/`↓` entre sub-ações, `Enter`/`Espaço` aciona, `Esc`
  fecha **e devolve o foco ao gatilho**.
- **Foco:** ao abrir, o foco vai para a primeira sub-ação. Ao fechar por qualquer via
  (Esc, seleção, clique fora), volta ao botão que abriu. Anel de foco visível em todos.
- **Alvo de toque:** ≥ 44px (`--dss-touch-target-md`). **Não existe token de 48px** — a
  escala é 32/36/44/52/64.
- **Estados:** hover, focus-visible, active, disabled e `aria-disabled` coerente. Ação
  desabilitada permanece **focável** na toolbar (para ser anunciada) mas não acionável.

---

## 7️⃣ SUPERFÍCIE DE PLAYGROUND

O `.example.vue` deve demonstrar a orquestração, não peças soltas:

1. **Fluxo principal:** barra com 4–5 ações, duas delas com sub-ações.
2. **Barra desabilitada:** prova que `disabled` alcança as ações e **impede** a abertura.
3. **Dentro de `DssHeader` sticky, sobre conteúdo rolável:** é o cenário em que o overlay
   quebra — precisa estar no palco, não só na descrição.
4. **Três marcas** lado a lado.
5. **Claro e escuro**, com o menu **aberto** nos dois.

---

## 8️⃣ DEPENDÊNCIAS — O QUE AINDA NÃO FOI ADEQUADO

O `DssActionMenu` compõe 10 peças. **Duas passaram pela adequação de UI; oito não.**

| | Componente | Papel na composição |
|---|---|---|
| ✅ | `DssButton` | cada ação |
| ✅ | `DssItem` | cada sub-ação |
| ⬜ | `DssToolbar` | a faixa que hospeda |
| ⬜ | `DssMenu` | painel de sub-ações |
| ⬜ | `DssList` | container das sub-ações |
| ⬜ | `DssItemSection` | estrutura interna do item |
| ⬜ | `DssItemLabel` | rótulo do item |
| ⬜ | `DssIcon` | ícone da ação |
| ⬜ | `DssTooltip` | dica por ação |
| ⬜ | `DssSeparator` | separação entre grupos |

**Por que isto está no pré-prompt e não numa lista à parte:** um composto herda os defeitos
das peças. Se `DssMenu` ainda não teve a adequação de overlay em tema escuro, o
`DssActionMenu` vai exibir esse defeito — e quem olhar vai atribuí-lo ao composto. Foi
exatamente o padrão que a onda de adequação registrou: *"medir ao vivo revela o que ler o
SCSS esconde"*.

**Ordem sugerida para a fila seguinte**, por acoplamento ao caminho crítico:

1. **`DssMenu`** — é o overlay, onde mora o risco arquitetural principal. Adequar antes
   evita que o composto seja culpado por defeito da peça.
2. **`DssToolbar`** — a superfície da barra; define altura, densidade e alinhamento.
3. **`DssList` · `DssItemSection` · `DssItemLabel`** — trio do conteúdo do menu; fazem
   sentido na mesma passagem, são da mesma família.
4. **`DssIcon`** — usado por toda a barra; pequeno e de alcance amplo.
5. **`DssSeparator` · `DssTooltip`** — periféricos; não bloqueiam.

> ⚠️ **Decisão pendente, e é sua:** construir o `DssActionMenu` **antes** dessas oito
> adequações significa aceitar que o Preview Frame dele vai mostrar defeitos herdados
> durante um tempo. A alternativa — adequar as oito primeiro — atrasa a primeira
> internalização e adia a prova de que o caminho funciona. As duas são defensáveis; o que
> não é defensável é escolher sem registrar.

---

## 1️⃣1️⃣ REQUISITOS DE TESTES UNITÁRIOS 🔒 BLOQUEANTE

### 11.1. Renderização Básica
- Monta com N ações e renderiza N botões.
- Barra sem ações **não** renderiza a faixa.
- Ação com sub-ações renderiza o gatilho, e o painel começa **fechado**.

### 11.2. Propagação de Props Críticas
- `variant`, `color` e `size` da barra chegam a **todas** as ações.
- `brand` aparece como `data-brand` no nó raiz.
- `disabled` na barra desabilita cada ação **e impede a abertura** do sub-menu.

### 11.3. Lógica Composta
- Acionar emite `@action` com o `name` correto.
- Abrir um sub-menu **fecha** o que estiver aberto (um por vez).
- `Esc` fecha e o foco volta ao gatilho.

### 11.4. Acessibilidade (ARIA)
- Raiz com `role="toolbar"` e `aria-label`.
- Gatilho com `aria-haspopup="menu"` e `aria-expanded` refletindo o estado.
- Painel com `role="menu"`; sub-ações com `role="menuitem"`.
- `roving tabindex`: apenas **uma** parada de tabulação para a barra inteira.
- `←`/`→` movem o foco entre ações; `↑`/`↓` dentro do menu aberto.
