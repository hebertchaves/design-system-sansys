# Passagem de bastão — o que a onda de set/2026 aprendeu na marra

> **Para quem vai adequar os próximos componentes.** Este documento não repete o
> checklist: ele antecipa os **erros que já foram cometidos** nesta onda, com a
> medição que os expôs. Cada item aqui custou tempo real. Ler antes economiza o
> mesmo tempo.
>
> Companheiros: `DSS_UI_ADEQUACAO_CHECKLIST.md` (o que verificar) · `DEBITO_ABERTO.md`
> (o que já está achado) · este (como não se enganar ao verificar).

---

## 1. Regra zero: MEÇA, e desconfie da própria medição

O checklist já manda medir em vez de ler o SCSS. O que ele não dizia é que **a
medição também erra**. Toda conclusão desta onda que precisou ser retratada veio
de uma medição malfeita, não de leitura.

### 1.1 Transição: você lê o valor do meio da animação

**Mordeu duas vezes no mesmo dia.** O componente tem `transition: all 200ms`;
você muda um token e lê o computado no mesmo instante — recebe o valor
INTERMEDIÁRIO e conclui que "não reagiu".

Na segunda vez, isso me levou a afirmar que o hover do `DssButton` estava inerte
desde que eu o escrevera, e a gastar várias sondas caçando um culpado inexistente.

```js
// SEMPRE, antes de medir qualquer coisa que tenha transição:
const kill = document.createElement('style');
kill.textContent = '*, *::before, *::after { transition: none !important; animation: none !important }';
document.head.appendChild(kill);
// … meça …
kill.remove();
```

Componentes DSS-próprios costumam ter `transition`; wrappers de Quasar nem sempre.
Por isso o sintoma aparece **em um** e não nos outros — o que engana ainda mais.

### 1.2 `:hover` medido sem hover

`getComputedStyle` não simula estado. Ou você usa o `hover` do MCP com um `uid`
do snapshot (funciona, e foi como validei a rampa no FAB), ou você replica a
regra por atributo (`[data-probe]`) e mede — mas aí está testando a SUA regra, não
a do componente. Diga qual dos dois fez.

### 1.3 Canvas mente sobre fonte

Para métrica tipográfica, `measureText` usa a fonte que o CANVAS resolveu, que
pode não ser a da tela. Deu números que a tela não confirmava, duas vezes.

**Use o DOM:**

```js
// linha de base: inline-block de altura ZERO alinha o topo na baseline
const sonda = document.createElement('span');
sonda.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
// altura de maiúscula: a unidade `cap` vem da fonte que o BROWSER usa
const reg = document.createElement('span');
reg.style.cssText = 'display:inline-block;width:0;height:1cap;vertical-align:baseline';
```

**Armadilha dentro da armadilha:** a sonda precisa estar num contexto **inline**.
Dentro de um rótulo `display:flex` ela vira item flex e é CENTRALIZADA — o
resultado foi "baseline = centro do componente" em todos os tamanhos, que é
absurdo e por sorte óbvio. Embrulhe o texto num `<span style="display:inline">` e
ponha a sonda lá dentro.

### 1.4 Meça o ANTES; não deduza

Afirmei que as abas da tela Parcelamento "passaram de `FINANCEIRO` para
`Financeiro`". Falso: aquela página injeta `text-transform: none` por `:deep()` e
sempre venceu. Eu tinha medido só o DEPOIS, provado à parte que `.q-tab` solto é
`uppercase`, e **inferido** a transição — com um elemento sintético que estava
fora do escopo que continha o override.

Se for afirmar que algo mudou, meça os dois estados **no mesmo lugar**.

### 1.5 Cruze com a API antes de chamar de defeito

Reportei "`xl` menor que `lg`" no `DssChip` e no `DssPagination`. Nenhum dos dois
**tem** `xl` — `ChipSize` é `'xs'|'sm'|'md'|'lg'`. "Sem regra própria" é inócuo
num tamanho que não existe e grave no tamanho default. O `validate-scale.mjs` já
faz esse cruzamento; ao investigar à mão, faça igual.

### 1.6 Normalize nomes ao comparar com o Quasar

O Quasar usa kebab (`model-value`, `inline-label`), o DSS usa camel. Um
comparador ingênuo lista a MESMA prop como "ausente no DSS" e "exclusiva do DSS"
ao mesmo tempo. O de-para do `DssTabs` quase saiu mentindo por isso.

### 1.7 Teste a sua ferramenta antes de confiar no relatório

- O `validate-scale.mjs` nasceu com o mapa de tokens **torto** (não filtrei
  comentário dos arquivos de token, e eles citam nomes de token na prosa).
  Resolvia `--dss-font-size-md` como 14px e acusava empates que a medição no
  navegador desmentia. Hoje ele tem **auto-aferição**: confere valores conhecidos
  e ABORTA se não baterem.
- Teste de regressão também se testa: mutei o código de propósito para ver a
  suíte ficar vermelha. Sem isso, você entrega asserção decorativa — que é o mesmo
  defeito da prop inerte, uma camada acima.
- **Parser plano de CSS por regex trata conteúdo de `@media` como regra normal.**
  Me apontou um `background: none !important` que só vale em `forced-colors`.

---

## 2. Cascata, Quasar e por que seu CSS não pega

### 2.1 A ordem real de força

```
inline style
  < !important unlayered
    < !important LAYERED (@layer quasar)     ← o Quasar mora aqui
```

Para `!important`, a ordem de layer é **invertida**: layer mais cedo vence. Então
`@layer quasar { .bg-primary { background: … !important } }` vence CSS DSS
unlayered, inclusive `!important` do DSS.

**Consequência prática:** contra `.bg-*` do Quasar, declarar `background-color` é
inerte. Redefina a ENTRADA (`--q-<cor>`) e deixe o próprio Quasar recomputar — é
o que o mixin `utils/_hover-ramp.scss` faz.

### 2.2 Componente Quasar que escreve ESTILO INLINE

O `QPagination` escreve em cada botão:

```html
style="padding: 3px 2px; min-width: 0px; min-height: 0px;"
```

Inline vence qualquer folha. O token de altura estava declarado, resolvia para
28px e era **anulado**. Contra inline só existe `!important` — registrado como
`EXC-IMPORTANT-01` no componente, com a medição que o justifica (com ele 28px,
sem ele 40px).

Antes de concluir "o token não pega", **olhe o atributo `style` do elemento**.

### 2.3 `min-height` é PISO, não altura

Sozinho ele nunca encolhe nada. Se o conteúdo passa, o piso é ignorado em
silêncio. Para a altura vir do token, os três andam juntos:

```scss
min-height: var(--dss-touch-target-md);
padding-block: 0;                            // tira o padding do QBtn
line-height: var(--dss-line-height-md-tight); // tira o `em` do Quasar
```

Aconteceu em `DssPagination` **e** `DssBtnToggle` (41,152px = `2.572em` do `.q-btn`).

### 2.4 Geometria do Quasar é em `em` — escala com a SUA fonte

`.q-btn` usa `min-height: 2.572em` e `line-height: 1.715em`. Quando o DS mudou a
fonte para 16px, esses valores cresceram junto. Altura que "quase bate" o token
costuma ser `em` disfarçado.

### 2.5 O realce próprio do `.q-btn`

Dois efeitos que o DSS não pediu e competem com a rampa:

| efeito | origem | sintoma |
|---|---|---|
| véu de hover | `.q-hoverable:hover > .q-focus-helper` (`currentColor` .15 + `::after` BRANCO .4) | "brilho por cima" da cor |
| empurrão no clique | `.q-btn--actionable.q-btn--standard:active:before` (sombra maior) | parece `push` sem ninguém pedir |

Mixin `utils.sem-realce-quasar` resolve os dois. **Mas atenção:** zerar o
`box-shadow` do `:active::before` também mata a elevação de REPOUSO, que mora no
mesmo `::before` — o botão fica achatado ao clicar. Onde há elevação, o DSS
assume a sombra com token e declara o MESMO valor em repouso e active.

**E o foco fica.** Zere só o hover do helper. `DssBtnDropdown` não tem anel de
foco próprio — matar o helper inteiro troca incômodo visual por regressão de a11y.

### 2.6 O DSS tem as PRÓPRIAS `.bg-*` e `.text-*`

Em `utils/_colors.scss`, sem layer, lendo `--dss-action-*`. Ou seja: existem
DUAS `.bg-primary` no sistema. Qual pinta depende do elemento. Não presuma.

---

## 3. Padrões estruturais que se repetem

### 3.1 A armadilha do `md` — mordeu TRÊS vezes no mesmo componente

O `md` costuma ser o único tamanho **sem regra própria**, porque é o default e
"já está na base". Saudável — **enquanto a base declarar o valor DELE**. Quando a
base declara o valor de outro degrau, o `md` some da escala sem quebrar nada:

| onda | o que o `md` herdava | escala resultante |
|---|---|---|
| ícone | nada — caía no `inherit` do DssIcon | ícone do tamanho do texto (1,00×) |
| padding | `spacing-6` (24px) | 8 · 12 · **24** · 20 · 24 |
| fonte | `-sm` (14px) | 12 · 14 · **14** · 18 · 20 |

**Molde correto: `DssAvatar`** — a base declara o valor do tamanho default, e o
`md` segue sem regra. Uma fonte só para o valor.

**Exceção:** quando a regra base **não vence a cascata**. No `DssChip`,
`.dss-chip__icon` (0,1,0) empata com `.dss-icon--inline { font-size: inherit }` e
perde por ordem — ali o `md` PRECISA de regra própria. "Deixar na base" só vale se
a base ganhar.

Gate: `npm run validate:scale` (pre-commit, `0c-quater`).

### 3.2 `flex: 1` não estica na vertical

`flex: 1` cresce no eixo **principal**. Com o pai em `align-items: center`, o
filho fica na altura do CONTEÚDO, centrado. Se a label flutuante é `absolute`
ancorada nesse filho, todo o arranjo vertical acontece numa caixa menor que o
campo.

Foi a causa do gap espremido no `DssInput` (controle 36 numa caixa de 44) e no
`DssField` (32 em 44). Fix: `align-self: stretch`.

### 3.3 Espaçamento em duas vias

`gap` do flex **mais** `margin` no filho se SOMAM. No `DssChip` a distância real
ícone↔rótulo era 4·6·8·10 enquanto a escala declarada era 2·4·6·8 — eu tinha
medido a *propriedade* `gap`, não a distância pintada. E num chip `icon-only` a
margem vira peso morto de um lado só e descentraliza.

**Meça a distância entre as caixas, não a propriedade.**

### 3.3-b Margem no CAMPO é desalinhamento disfarçado de espaçamento

`themes/_quasar-overrides.scss` dava `margin-bottom: 16px` a toda `.q-field`. Lido
como "espaçamento entre campos", era na prática um desalinhamento:

- num container centrado, o que se centra é a caixa de MARGEM — o campo com margem
  sobe. Select e Input lado a lado fechavam em 18/34 contra 26/26;
- dentro do `DssForm`, que já declara `gap: var(--dss-form-gap)`, o espaçamento
  **dobrava** só para quem tinha a margem (32px contra 16px).

**Espaçamento entre irmãos é do CONTAINER** (`gap`/grid) — mesmo princípio do
`:deep()` proibido para layout: quem posiciona é o pai. Antes de remover uma
margem global, varra os consumidores reais; aqui os três já davam `gap`, e nada
precisou ser devolvido.

**E cuidado com a premissa de quem escreveu o débito** (inclusive você, semana
passada): a nota dizia que `DssInput`/`DssField` "não herdavam" a regra. Eles
simplesmente **não usam QField** — são `div`s DSS puros. Conferir no DOM (`el.classList
.contains('q-field')`) e no template custa 30 segundos e muda o diagnóstico.

Variante da mesma armadilha, no mesmo conserto: `margin-bottom` num botão dentro
de um grupo `align-items: flex-end` **levanta o botão** e empurra o irmão para
baixo. Em `flex-end`, margem de baixo é deslocamento, não folga.

### 3.3-c O CSS pode estar escopado num ancestral que NÃO contém o alvo

No `DssStep`, todo o cabeçalho (dot, título, linha, estados) vivia em
`.dss-step .q-stepper__*`. Parece óbvio que alcança — o cabeçalho é do passo. Só
que o QStepper renderiza o cabeçalho em DOIS lugares, conforme a orientação:

- **horizontal** (o padrão): tabs e dots vão para `.q-stepper__header`, que é
  IRMÃO dos passos — fora do `.dss-step`;
- **vertical**: cada tab fica dentro do seu `.dss-step`.

Resultado: o componente tinha duas aparências. Medido — tab de 72px e dot de 24px
no horizontal (Quasar cru) contra 44px e 32px no vertical (DSS). Ninguém tinha
notado porque as duas isoladamente parecem plausíveis.

**Como pegar isto em 30 segundos:** antes de confiar num seletor descendente,
pergunte ao DOM se ele casa —
`document.querySelectorAll('.dss-x .q-alvo').length` contra
`document.querySelectorAll('.q-alvo').length`. Divergiu, o escopo está errado.

E o corolário: **escope pelo ancestral que contém TODAS as montagens**. Aqui é o
container (`.dss-stepper`), não o filho.

### 3.3-d Estado do Quasar: a classe que você acha que existe pode não existir

Ainda no `DssStep`: os estados se penduravam em `&.q-stepper__step--active`. Essa
classe **nunca** é emitida — o Quasar marca a TAB (`.q-stepper__tab--active`),
não a raiz do passo. O bloco era inerte de nascença, nas duas orientações.

Três checagens que valem sempre, e custam um comando cada:

1. **A classe existe?** `document.querySelectorAll('.classe-que-vou-estilizar').length`
   — zero significa regra morta.
2. **A classe é EMITIDA pelo DSS?** confira o `use*Classes.ts`. No `DssStep`,
   `_brands.scss` inteiro mirava `.dss-step--brand-*`, que o composable não gera e
   que nem tem prop correspondente. Código morto desde o primeiro commit.
3. **A classe existe no QUASAR?** `grep -c "q-componente--variante" node_modules/quasar/dist/quasar.css`.
   O `_dense.scss` do `DssStep` mirava `.q-stepper--dense`: zero ocorrências, e o
   QStepper não tem prop `dense`. Não era escopo errado — era uma variante que
   nunca existiu.

### 3.3-e Reset universal do app vence o Quasar inteiro

`* { margin: 0; padding: 0 }` sem escopo, no app hospedeiro, **zera todo o
espaçamento interno declarado pelo Quasar** — especificidade zero não importa,
porque unlayered vence layered. No sandbox isso quebrava a timeline (ponto por
cima do texto) e deixa o sandbox divergente de produção nos dois sentidos.

Ao adequar um componente que apoia o layout na estrutura interna do Quasar:
compare o computado com o que `node_modules/quasar/dist/quasar.css` declara. Se o
CSS diz 40px e o DOM diz 0, é isto. A postura certa é o componente declarar a
própria reserva, tokenizada — não depender de o app ter ou não um reset.

### 3.4 Regra inerte: existe, compila, não faz nada

Colecionadas nesta onda:

- `.dss-button--no-caps { text-transform: none }` — repetia o `none` da base.
- Bloco `@media (prefers-color-scheme: dark)` do `DssItem` com CINCO declarações
  **idênticas** à base (os tokens já são temáticos).
- `margin` do ícone do chip, zerada na linha seguinte por `--left`/`--right`.
- `.dss-chip__icon` do `md`, vencida por ordem.

**Sintoma:** a prop existe, a doc promete, a tela não muda. **Teste:** mude o
valor para algo absurdo; se nada acontece, é inerte.

### 3.5 Prop `undefined` ≠ prop ausente

`DssTab` passava `:alert="props.alert"` com default `undefined`. O QTab renderiza
o ponto quando `alert !== false` — então **toda aba** tinha um
`.q-tab__alert text-undefined` de 10×10px. O DOM denunciava no nome da classe.

Default de booleano-ish que o Quasar consome deve ser `false`, não `undefined`.

### 3.6 Default herdado do Quasar que anula prop do DSS

`DssTabs` herdava `breakpoint: 600`. No Quasar, `justify.value = size < breakpoint`
— qualquer barra em painel comum nasce justificada e a prop `align` vira letra
morta. Os quatro tiles (left/center/right/justify) saíam TODOS justify.

Pior: a doc da prop no DSS dizia que `breakpoint` controlava as **setas**.
Conferido na fonte do Quasar: não controla. **Documentação herdada também mente.**

### 3.7 Bloqueio é decisão; ausência silenciosa não é

De-para do trio de tabs contra a `api.json` do Quasar:

```
QTabs       5 expostas ·  8 bloqueadas com motivo · 7 FALTANDO sem motivo
QTab        5 expostas ·  3 bloqueadas           · 2 FALTANDO
QRouteTab  10 expostas ·  5 bloqueadas           · 2 FALTANDO
```

As 11 "faltando" não tinham motivo registrado — só não tinham chegado ao wrapper.
Resultado: componente sem variação visual (`inlineLabel`, que põe ícone ao lado do
rótulo, simplesmente não existia).

**Faça o de-para em todo componente que embrulha Quasar.** Gere da `api.json`,
normalize kebab→camel, e classifique cada ausência: bloqueada (com motivo escrito)
ou esquecida.

### 3.8 Opinião de layout dentro do componente

`themes/_quasar-overrides.scss:143` dá `margin-bottom: 16px` a **toda** `.q-field`.
Num container centrado, quem é centrado é a caixa de MARGEM: o `DssSelect` fica
8px acima do `DssInput`, que não é `.q-field` e não herda a regra.

Espaçamento entre campos é do container, não do campo — mesmo princípio do
`:deep()` proibido para layout.

---

## 4. Ambiente e ferramentas — o que NÃO funciona aqui

| ferramenta | estado | o que fazer |
|---|---|---|
| `document.styleSheets` → `cssRules` | **não enumera** (retorna vazio) | bisecte por injeção, ou compile o SCSS e leia o arquivo |
| `el.style.x = …` no MCP | **ignorado** | injete `<style>` — isso funciona |
| `getComputedStyle` logo após mudar token | valor da transição | mate a transição antes |
| Vite + `defineProps<T>()` | **não reprocessa** o SFC quando só o arquivo de TIPOS muda | a lista compilada fica velha e a prop VAZA como atributo no DOM; exige restart do dev server |
| HMR em `/mnt/c` | stale recorrente | recarregar não basta; às vezes só restart resolve |
| vitest no WSL2 | dois timeouts: `6e4` e `WORKER_START_TIMEOUT = 9e4` | patch efêmero no `dist` + **reverter sempre** |

> O dev server é **do usuário**. Já matei o dele uma vez achando que era processo
> meu. Se precisar de restart, peça.

**Diagnóstico rápido de prop que não chega:** se o atributo kebab aparece no DOM
(`inline-label=""` na raiz), a prop **não foi reconhecida** — é build velho, não
erro de repasse.

---

## 5. O processo de adequação, na prática

### 5.1 PASSO ZERO existe e paga

Antes de medir qualquer coisa, procure o nome do componente em **Pendências por
componente** do `DEBITO_ABERTO.md`. No `DssItem` rendeu três achados já
diagnosticados — e economizou a investigação inteira de dois deles.

### 5.2 Débito envelhece

Um dos três estava **vencido**: dizia que `--dss-border-default` só existia no
dark e que o divisor sumia no claro, e que corrigir exigia uma DECISÃO de design.
O token ganhou definição semântica desde então. Medido: light `#e5e5e5`, dark
`#737373`.

**Reverifique antes de agir** — e ao fechar, marque como vencido **com a
medição**, para a decisão não ser cobrada de novo.

### 5.3 A página revela o que a leitura não revela

Duas vezes o defeito só apareceu com os componentes lado a lado na Playground:

- `DssItem`: **todo** rótulo saía azul de ação, e o item ativo ficava idêntico ao
  inativo. A causa estava escrita ao lado dela — a prop `color` nasce `'primary'`
  com o comentário "cor principal para itens **ativos**", e o composable aplicava
  em todo item.
- `DssBtnToggle`: 45 grupos em DUAS alturas (41,1 e 43,4), nenhuma batendo o token.

Monte a página cedo; ela é instrumento de diagnóstico, não vitrine.

### 5.4 Página CONSOME, não implementa

Só há CSS local quando ele é **conteúdo da demonstração** — largura fixa para
`align`/`spread` serem observáveis, contexto de lista para o `DssItem`, painel
abaixo da barra de abas. Casca (hero, nav, scroll-spy, tiles) vem do template.

### 5.5 Nem todo componente cabe no Preview Frame

O frame monta o SFC **sozinho**. `DssTab` e `DssRouteTab` não existem fora do
`DssTabs` — o Quasar recusa (`QTab needs to be child of QTabs`), e o crash **envenena
o iframe para o frame seguinte** (li o `DssTabs` como quebrado duas vezes por
isso; abra `/?frame=<Componente>` isolado antes de acusar).

Registre em vez de deixar frame quebrado no menu.

### 5.6 Testes que afirmam o comportamento errado

Ao consertar o `DssItem`, três testes diziam "aplica `text-primary` por padrão" —
travando o defeito. **Se o teste passa e o comportamento está errado, o teste é
parte do bug.** Reescreva afirmando o certo e diga isso no commit.

### 5.7 Gates, e o que cada um pega

```bash
npm run validate:scale         # empate/inversão na escala por tamanho (§N)
npm run validate:hover-tokens  # primitivo em estado, brightness, sequestro de ícone (§L/§M)
npm run validate:api-docs      # props novas que não entraram no README/API.md
npm run validate:scss-tokens   # token fantasma
npm run validate:css-meta      # CSS ↔ meta.json
npm run contracts:gate         # contrato emitido e schema-válido
npm run validate:type-check
cd apps/sandbox && npm run test:static   # análise estática do sandbox
```

`validate:api-docs` pegou as 11 props novas do trio de tabs faltando na doc —
esse gate paga sozinho ao expor API.

### 5.8 Commit e push

Mensagem explica **por que**, com a medição junto (antes → depois). Push nos dois
remotes; **GitLab só na branch de trabalho, nunca na main**.

---

## 6. Lista curta para colar na parede

1. Matou a transição antes de medir?
2. Mediu o ANTES no mesmo lugar do DEPOIS?
3. O tamanho/prop que você vai acusar **existe na API**?
4. Olhou o atributo `style` inline do elemento?
5. É `min-height` sem tirar o excesso?
6. A regra que você escreveu muda alguma coisa se você puser um valor absurdo?
7. Fez o de-para com a `api.json` do Quasar?
8. O teste que passou afirma o comportamento CERTO?
9. Procurou o componente no `DEBITO_ABERTO` antes de começar?
10. O débito que você leu ainda é verdade hoje?
