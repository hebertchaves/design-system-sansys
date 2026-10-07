# DssContextHeader — Documento Normativo

> **Status:** `draft` (out/2026). Nasceu da tela de atendimento do Sansys Water, a partir de
> oito nós do Figma **e da descrição funcional que os corrige** — o protótipo está velho, e o
> que vale dele é o funcionamento, a posição dos elementos e a separação dos contêineres.

## 1. Papel

Dizer, em **qualquer** tela da jornada, quem está sendo atendido — e oferecer as ações sobre a
sessão de atendimento. É a única peça que não muda quando o operador troca de módulo.

## 2. O recorte

| Camada | Componente |
|---|---|
| casca externa | `DssLayout` — de quem monta a tela |
| barra do produto | `DssAppBar` |
| **contexto do atendimento** | **`DssContextHeader`** |
| miolo da página | `DssPageShell` |
| filtro de uma tabela | `DssDataBoard` |

O cabeçalho **não** absorve nenhum dos vizinhos. Ele é irmão do `DssPageShell`, não pai: o
contexto do atendimento sobrevive à troca de módulo, e o miolo da página não.

## 3. O eixo de variação decide o mecanismo (§1.6)

| eixo | mecanismo | por quê |
|---|---|---|
| pele (cor, marca) | token via `[data-brand]` | é skin |
| quais informações, quais grupos | **config** (`groups`) | a lista é SERVIDA por atendimento |
| como UMA informação é desenhada | **slot** `item-[name]` | é conteúdo livre |
| a estrutura e a retração | **composto** | é o que não varia |

A lista ser config e não marcação é a decisão central. Filiais pedem campos diferentes, e o
mesmo cliente rende listas diferentes conforme a completude do cadastro — um template fixo
teria que ser reescrito por filial. É o mesmo contrato das `columns` do `DssTable`.

## 4. Os três grupos existem para proteger o sentido

Sem agrupamento, um campo ausente faria o primeiro item do assunto seguinte subir para o lugar
dele, e o operador leria "Rota Leitura" onde esperava "Endereço". Como dado incompleto é o
caso **normal** aqui, o agrupamento não é estética: é o que impede uma leitura errada.

## 5. Decisões que custaram medição

**O ícone do imóvel não muda entre os dois estados do badge.** Sem registros o badge é o
`add_circle`; a partir de um, o contador. O destino do clique é o mesmo modal nos dois casos,
então um ícone diferente anunciaria um destino que não existe.

**Os badges são `aria-hidden` e as contagens entram no NOME do botão.** Sem isso o leitor de
tela anuncia o número duas vezes, e na segunda sem dizer de que ele é contagem.

**Os badges são IRMÃOS dos botões, não filhos.** O `DssBadge` é um `<div role="status"
aria-live>`; dentro de um `<button>` o HTML não permite conteúdo de fluxo, e uma região viva
aninhada num controle é anunciada fora de hora. Sobreposto por `absolute` +
`pointer-events: none`, o clique atravessa e o alvo continua sendo um só.

**O item é `grid`, não `flex`.** Em flex, a redução é proporcional à base, e o rótulo — que é o
texto mais longo — encolhia **mais** que o valor: `Proprie… Mora… End… Localiz…`. Em grid, a
faixa `minmax(0, 1fr)` do valor absorve a falta de espaço até zero, e só então a faixa `auto`
do rótulo é comprimida. A prioridade vira propriedade do layout.

**O grupo tem piso de largura.** Sem ele, numa faixa de 280px as colunas eram espremidas abaixo
do próprio conteúdo e os textos se **sobrepunham** — item de flex não encolhe abaixo do
min-content, então vazava do grupo em vez de caber nele.

**`collapsed` tem default `undefined`, não `false`.** Com `false` a prop nunca é nula, o `??`
interno nunca cai para o espelho local e o gatilho fica **mudo** em toda tela que não amarra
`v-model:collapsed`. O mesmo defeito existia no `DssDataBoard`, de onde este código nasceu, e
foi corrigido junto.

**A retração é animada em três camadas, e nenhuma delas é `height: auto`.**
`auto → auto` não interpola. `grid-template-rows: 1fr → 0fr` pressupõe que o
conteúdo apenas some — aqui ele muda de LUGAR, e durante a transição um campo
saltaria para o lado do título antes de desaparecer. `max-block-size` exige um
teto chutado. `interpolate-size: allow-keywords` resolve, mas só em Chromium.
Sobra medir: o `useCollapseHeight` trava a altura anterior, mede a nova e
transita em pixels; o conteúdo, que já trocou de arranjo, fica recortado pelo
`overflow: hidden` do root. A segunda camada é o esmaecimento do conteúdo novo
(`data-dss-collapsing` + `@keyframes`), e a terceira é o chevron, que GIRA em
vez de trocar de glifo — alternar `arrow_up`/`arrow_down` é uma troca
instantânea no meio de uma transição contínua, e o pulo era o que se via. O
gatilho fica fora do esmaecimento: esmaecer o botão que a pessoa acabou de
clicar é perder o único ponto fixo da cena.

**O anel de foco do trilho não é `--dss-focus-primary`.** Esse token é remapeado por marca com
a premissa "anel sobre fundo branco", e o ladrilho é pintado com a cor da marca: anel e fundo
ficariam a 1,00:1. É o mesmo defeito já medido no `DssToolbar`. Lá o anel é
`--dss-action-primary-text` com deslocamento negativo.

**Os tons de status não usam os tokens de feedback puros.** `--dss-positive` (#4dd228) dá 1,9:1
sobre branco, e isso é texto — WCAG 1.4.3, 4,5:1. Os tons usam canais remapeados por tema:
`-deep`/`-hover` no claro, `-light` no escuro. Medido: 6,94 · 8,01 · 5,35 no claro; 11,75 ·
7,83 · 11,80 no escuro.

**Não existe tom `warning`.** A regra de a11y declarada em `tokens/globals.scss` é explícita:
não há contraste seguro entre o amarelo da paleta e fundo claro — nem `--dss-warning-deep`
fecha 4,5:1 (máx. 4,36). Oferecer o tom seria oferecer um valor que reprova em todo tema claro.

## 6. Exceções de gate

Os `px` e hex apontados pelo scan da Constituição #1 em `2-composition/_base.scss` e
`4-output/_states.scss` estão **todos em comentário** — são as contas de contraste e os valores
medidos que justificam a escolha dos tokens. Nenhum valor literal chega ao CSS.

## 7. O que o componente NÃO faz

| não faz | por quê |
|---|---|
| Não abre modal nenhum | emite `open-records` e `open-details`; são justamente esses dois que mudam entre produtos |
| Não busca dados | `groups` chega pronto; buscar aqui o acoplaria à API de um produto |
| Não lista os atendimentos abertos | emite `switch` e informa a contagem; a lista é da página |
| Não quebra linha no valor | trunca em uma linha, com o valor inteiro no `title`; a altura da faixa é o recurso escasso |
| Retraído, esconde alternar e criar | a faixa retraída existe para devolver altura, não para manter três alvos de 44px |
| Não tem estado `disabled` nem `loading` | é contexto permanente; desabilitar esconderia quem está sendo atendido, e carregamento é estado de quem serve os dados |
| Não anima o CONTEÚDO item a item | a troca de arranjo continua instantânea; o que suaviza é a altura mais um esmaecimento do bloco. Animar cada informação exigiria FLIP e tornaria a peça frágil a qualquer mudança de lista — que é justamente o que varia aqui |
