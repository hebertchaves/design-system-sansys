# Plano — Frente 1 (contêineres) e Frente 2 (casca do sistema)

> **Origem:** duas frentes propostas após a onda Check-in NFAg / Grid Master.
> **Estado:** plano de execução · aguarda as decisões do §2 antes do primeiro commit.
> **Linha de base medida:** `TestGridMasterDashboard.vue` 434 linhas de CSS (48% do arquivo)
> e `TestCheckinNFAg.vue` 536 (38%) — **970 linhas que hoje moram na página**, com a app bar
> repetida 18×, a tabela 31× e os painéis 19×. É esse número que as duas frentes derrubam.

---

## 1. A pergunta da Frente 2, respondida

> *"criar componentes específicos mais 'completos', ou deixar o default com variações por prop?"*

**Nem um nem outro como regra geral. O que decide é o EIXO DE VARIAÇÃO.**

| O que varia entre Water / Hub / Waste | Mecanismo | Por quê — com precedente medido |
|---|---|---|
| **Pele** (cor, marca) | token, via `[data-brand]` **e** prop `brand` | `DssToolbar brand="water"` já faz isso: pinta a barra com `--dss-water-600` e remapeia `--dss-action-primary` para os filhos. No Grid Master o app bar azul saiu **sem uma linha de override na página** |
| **Conteúdo** (quais ícones, qual título, qual logo) | slot | Conteúdo em prop vira reimplementação de slot. O `DssButton` já aprendeu isso: `label` era *fallback* do slot e descartava conteúdo em silêncio |
| **Estrutura** (a ordem burger → logo → divisor → título → espaçador → ações) | **composto novo** | Estrutura invariante é exatamente o que `components/composed/` existe para ser. Expressá-la como props (`burgerIcon`, `logoSrc`, `actions[]`) seria reimplementar slots mal |

**Tradução prática:** o `DssHeader` **continua o primitivo** — não ganha props de conteúdo.
Nasce um **`DssAppBar` (composto)** que fixa a estrutura das cinco peças, delega a pele ao
`brand` e o conteúdo aos slots. Mesma lógica para `DssSectionTitle` (título + sublinhado de
marca) e para o board/painel.

### O contra-exemplo que justifica o cuidado

A tentação de "criar o componente específico" é o que produziu o `IconButton` do menu — item
escrito para um catálogo **planejado**, que nunca existiu no disco. E o `DssDataCard`, que é
fixture de `stress-test` e aparece no protótipo de produção como se fosse componente.

Por isso a regra tem uma cláusula: **composto novo só nasce com a cadeia fechada** — contrato
emitido, página Playground, Preview Frame com semente, e o gate `validate:sandbox-nav` verde.
Sem isso, o que nasce é promessa.

### Bloqueio conhecido: a regra R3 impede o `DssAppBar` hoje

`ui-rules.schema.json` declara `DssToolbar.allowed_children = [DssButton, DssIcon, DssTabs,
DssBreadcrumbs, text]`. Foi por isso que, no Grid Master, o divisor virou um `<span>` e o
`DssAvatar` saiu da barra. **Um `DssAppBar` com logo dentro do toolbar reprova no
`validate_composition`** enquanto o schema não admitir `DssBrandLogo`. Alterar o schema é ato
de governança e entra no plano como item explícito, não como efeito colateral.

---

## 2. O que muda o escopo — decidir antes de codar

Quatro coisas que a frente assume e o disco contradiz.

| # | Achado | Consequência |
|---|---|---|
| **D1** | **`DssContainer` não existe** — e não é esquecimento: foi **adiado por decisão registrada** em `docs/archive/fixes/PLANO_ACAO_GRID_LAYOUT.md` (itens 12.6–12.11), com a justificativa *"Adiado — Classes CSS suficientes"*. Vale igual para `DssGrid` e `DssSpacer`. | "Adequar `DssContainer`" é **criar**, e significa **reabrir uma decisão**. Precisa de aval explícito e de um motivo novo — o Grid Master mostrou que a grade de 6 colunas com gutter de 20px hoje é CSS de página, o que é argumento a favor, mas é decisão de produto |
| **D2** | **`DssDialog` e `DssForm` não têm `dss.contract.json`** | Sem contrato não há knobs no Preview Frame nem semente — e, pior, **estão isentos do gate**: `emit-contract --all` só varre pastas que já têm contrato (linha 65). São 10 compostos nesse estado |
| **D3** | **Não existe um único SVG de marca no repositório.** O protótipo usava `assets/sansys-water-flat-horizontal.png` (PNG, fora do repo) e o Figma forçava a cor com `filter: brightness(0) invert(1)` | Os 3 SVGs são **insumo bloqueante** da Frente 2. E o `filter` do Figma só funciona em logo monocromático — destrói qualquer marca com mais de uma cor |
| **D4** | **`DssTable` está adequado, não "completo" para aninhar.** Fechei a adequação nesta onda (página, contrato, seed), mas os slots `top`/`header`/`body`/`bottom` não foram exercitados com componentes DSS dentro | Frente 1 para o `DssTable` = **provar o aninhamento**, não refazer a adequação |

### Sobre os SVGs (D3) — recomendação

**Inline via um `DssBrandLogo`, com `fill="currentColor"`.** Razões, na ordem que importa:

1. **Recolorir por token, não por hack.** Com `currentColor` o logo herda a cor do host — é o
   mesmo mecanismo do `DssIcon` (CCI §2.3) e já está provado no sistema. O `filter: brightness(0)
   invert(1)` do protótipo só produz branco, e só em logo monocromático.
2. **Zero requisição.** `<img src>` custa um round-trip por marca e **não** aceita recolorir.
3. **O peso é irrelevante aqui.** São 3 marcas e um *wordmark* fica na casa de 1–3 KB. Como o
   DSS troca marca em runtime (`[data-brand]`, e o próprio playground tem o seletor
   Neutro/Hub/Water/Waste), **as 3 precisam estar no bundle de qualquer forma** — code-splitting
   por marca não se aplica.

**Alternativa a medir, não a assumir:** se algum dos logos **não** for monocromático, o
`currentColor` não serve e a rota passa a ser `<img>` + `mask-image`. Por isso o plano tem um
item de medição antes da implementação, não depois.

---

## 3. Checklist de execução

Sequência escolhida por **dependência real**, não por ordem das frentes. Três decisões de
eficiência a registrar:

- **O buraco do gate vem primeiro.** Enquanto `--all` ignorar pasta sem contrato, tudo o que
  nascer nestas frentes **nasce isento**. Fechar antes faz todo o resto ser coberto de graça.
- **Contêiner antes de casca.** A casca (Frente 2) compõe os contêineres (Frente 1). Inverter
  obriga a refazer.
- **Dentro da Frente 1, do mais simples ao que aninha mais.** `Container` não depende de
  ninguém; `Form` depende dos campos; `Dialog` aninha os dois e ainda carrega o risco de
  overlay/teleport. Construir nessa ordem deixa o padrão pronto quando chega o caso difícil.

### Bloco 0 — destravar ✅ EXECUTADO (set/2026)

- [x] **0.1** Decidir **D1**: reabrir ou manter o adiamento de `DssContainer`/`DssGrid`/`DssSpacer`.
      *Insumo para a decisão: a grade de 6 colunas com gutter de 20px do grid master hoje é CSS de página em 2 telas.*
- [x] **0.2** Decidir a regra do §1 (estrutura → composto · pele → token · conteúdo → slot) e
      registrá-la em `DSS_GUIA_COMPOSICAO_FASE3.md` como 6º padrão.
- [x] **0.3** **Fechar o buraco do gate de contrato** — `emit-contract --all` passa a varrer
      toda pasta de componente, e a ausência de contrato vira falha, não isenção.
      *Impacto imediato: os 10 compostos sem contrato aparecem.*
- [x] **0.4** Obter os **3 SVGs de marca** (Water, Hub, Waste) e verificar se são monocromáticos.
      *Decide a rota de D3. Bloqueia toda a Frente 2.*
- [x] **0.5** ✅ **EXECUTADO junto com o 2.1** (ver Bloco 2). Era: — `schemaIntegrity` do `validate_composition`
      marca como inexistente todo componente citado no schema que não esteja no catálogo, e
      `healthy` exige a lista vazia (`packages/mcp/src/lib/uiRules.ts:255,266`). Fazer agora
      deixaria o schema declarando-se quebrado até o `DssBrandLogo` existir — e o próximo
      agente perseguiria um fantasma. Executa junto com 2.1.

#### Resultado do Bloco 0

| Item | O que ficou |
|---|---|
| **0.1** | Decisão reaberta. `DssContainer` **criado** — 23 arquivos, 4 camadas, contrato válido, 34 testes, página Playground. Ver o achado da colisão abaixo |
| **0.2** | 6º padrão registrado em `DSS_GUIA_COMPOSICAO_FASE3.md §1.6`. As referências normativas vivas passaram de "5 padrões" para "6" (CLAUDE.md, o próprio guia, FASEAMENTO, FASE3_TODO). **Selos e o índice de certificados ficaram intactos** — afirmam o que foi auditado na época, e reescrevê-los falsificaria registro |
| **0.3** | Ratchet em `emit-contract.mjs`: ausência de contrato deixou de ser isenção. Baseline com os 10 compostos conhecidos em `scripts/contract-missing-baseline.json`. **Provado que reprova:** componente novo sem contrato → `exit 1`. O gate saltou de 80 para **82** componentes |
| **0.4** | 3 logos extraídos de `site-jtech` para `packages/core/assets/brand/logos.ts` — 14 paths, 10,7 KB de `d`. Estrutura compatível: todos com altura 42, wordmark e ícone em paths separados |
| **0.5** | Reposicionado (ver acima) |

#### O achado do 0.1: `.dss-container` já tinha dono

O componente foi adiado em abr/2026 com a justificativa *"classes CSS suficientes"*. A
classe existe mesmo — `.dss-container` em `utils/_layout-helpers.scss`, com teto que
acompanha o breakpoint. Ao criar o componente com o nome natural (`.dss-container`),
**dois donos passaram a disputar um nome**, e a disputa se resolvia por ordem de bundle:
medido no sandbox, `size="sm"` rendia **1280px** em vez de 608.

Três correções, nesta ordem:

1. **O componente nem estava no bundle.** `components/index.scss` agrega por `@forward`
   e o `DssContainer` não fora registrado — o CSS nunca embarcou. Esse é o passo que
   qualquer componente novo precisa e que nenhum gate cobre hoje.
2. **Absorver em vez de competir.** `size="responsive"` reproduz exatamente o
   comportamento da utilitária, que fica redundante. A utilitária **não foi removida**:
   este monorepo não é o único consumidor do DSS, e apagar classe pública sem medir uso
   nos repositórios de produto seria quebrar às cegas. Ficou marcada como superseded, com
   a migração escrita.
3. **Vencer por especificidade, não por ordem.** As variantes passaram a
   `.dss-container.dss-container--size-*` (0,2,0). Empate resolvido por ordem é refém de
   qual bundle carrega por último — e o sandbox carrega dois. Mesmo padrão que o
   `DssToolbar` já usa.

*Medido depois:* 608 · 960 · 1280 · 1600 · sem teto · responsivo, e respiro 0/8/16/24/32/40.

> **Débito registrado:** nenhum gate verifica que um componente novo foi agregado em
> `components/index.scss`. O sintoma é mudo — o componente monta, e só o CSS falta.
> Candidato natural a `validate:component-registry`.

### Bloco 1 — Frente 1: os contêineres

Para **cada** componente, o fechamento é o mesmo (Cartão Composto + gate de adequação):
contrato emitido · `classification`/`tagline`/`a11y` backfillados · página Playground ·
Preview Frame com semente · `validate_composition` da árvore de aninhamento.

- [x] **1.1 `DssContainer`** *(condicionado a 0.1)* — **feito no Bloco 0** (ver o achado da colisão de nome).
      Medido: 608 · 960 · 1280 · 1600 · sem teto · responsivo; respiro 0/8/16/24/32/40.
- [x] **1.2 `DssForm`** — contrato emitido · meta backfillado · página Playground (7 seções) ·
      aninhamento `validate_composition` = **compliant** · console limpo.
      **Achado corrigido:** a validação do container não alcançava metade dos campos. Ver abaixo.
- [x] **1.3 `DssDialog`** — contrato emitido · meta backfillado · página Playground (7 seções,
      organizadas pelos três riscos do guia) · `DssForm` e `DssTable` aninhados e medidos ·
      Preview Frame montando o SFC real. **Dois achados abaixo.**
- [x] **1.4 `DssTable`** *(D4 — adequação já fechada)* — os quatro slots exercitados com DSS
      dentro, e o custo de altura **medido nas três densidades**. Achado abaixo.

#### O achado do 1.2: a validação do `DssForm` reprova ABERTO em metade dos campos

O motor de validação é o do QForm, e o QForm valida os componentes **Quasar** que se
registram nele. Os campos do DSS não são todos wrappers de Quasar — e é isso que decide
quem participa. Medido com uma regra que **sempre** reprova, nos dois planos (teste unitário
e navegador), com o mesmo resultado:

| Campo | Motor por baixo | `DssForm.validate()` | Veredito |
|---|---|---|---|
| `DssInput` | `<input>` nativo (construção explícita) | **`true`** | regra IGNORADA |
| `DssCheckbox` | `<input>` nativo | **`true`** | regra IGNORADA |
| `DssSelect` | `QSelect` | `false` | regra aplicada |
| `DssTextarea` | `QInput` | `false` | regra aplicada |

Pelo mesmo critério, `DssToggle`, `DssRadio` e `DssField` também renderizam `<input>` nativo
e não participam; `DssFile` renderiza `q-file` e participa.

Três consequências que importam:

1. **A falha é na direção perigosa.** Não é "a validação não roda": é "a validação
   responde `true`". Um formulário com campo obrigatório vazio se declara válido e submete.
2. **O sintoma é mudo.** Nenhum erro de console, nenhum aviso. A prop `rules` num `DssInput`
   não é prop declarada — cai em `$attrs` e pousa como atributo de DOM no `<input>`, onde
   não significa nada. `DSSINPUT_API.md:405` já registra `rules` como bloqueada
   ("validação deve ser externa"), mas o `DssForm` não sabe disso e o consumidor também não.
3. **Não é conserto de container.** O `DssForm` está correto no que lhe cabe. Fechar o buraco
   exige que os campos de construção explícita se registrem no formulário — mexer em
   `DssInput`, `DssCheckbox`, `DssToggle`, `DssRadio` e `DssField`, todos **selados**. É
   decisão de governança, não efeito colateral do Bloco 1.

A seção 03 da página `TestForm.vue` existe para manter isso **visível e medível** em vez de
escrito: cada tile tem a regra que sempre reprova e um botão que imprime o veredito.

#### ✅ RESOLVIDO — rota (a), com aval para mexer nos selados

A escolha foi **registrar os campos nativos no motor do QForm**, e não construir um motor
paralelo. Razão: o `useFormChild` é ponto de extensão **público** do Quasar (`quasar@2.19.3`),
e a Constituição já proíbe reimplementar primitivo. A rota (b) duplicaria o motor; a (c)
manteria o `DssForm` prometendo um `validate()` que não alcança.

**O que nasceu:** `packages/core/composables/useFieldValidation.ts` — um composable global que
acrescenta ao campo só o que o QForm espera de um filho (`validate()`, `resetValidation()`),
com a **mesma semântica de regra do QField**, para `rules` significar a mesma coisa em
qualquer campo do sistema.

| Campo | Antes | Depois |
|---|---|---|
| `DssInput` · `DssCheckbox` · `DssToggle` · `DssRadio` | `true` — regra ignorada | **`false` — regra aplicada** |
| `DssSelect` · `DssTextarea` | `false` | `false` |

Medido nos dois planos: 6/6 no navegador (seção 03 da página) e 9 casos novos em
`DssForm.test.js`.

**`DssField` ficou de fora — e é o correto.** É moldura (rótulo flutuante, borda, área de
hint e erro) e **não tem `modelValue`**: quem guarda o valor é o controle que o consumidor
monta no slot. Registrar a moldura faria o `validate()` perguntar a quem não tem resposta.
Foram 4 componentes, não 5.

**A trava foi provada a reprovar:** com o `useFormChild` desligado, os 4 casos dos campos
nativos ficam vermelhos e os 2 de Quasar seguem verdes — exatamente o recorte do defeito.

**Duas decisões deliberadas de escopo:**

1. **Sem `provide/inject` de estado de bloco.** O §1.2 do guia de Fase 3 vale para `disabled`/
   `readonly`/`loading` propagados do container para os filhos — e o `DssForm` não ganhou
   essas props. O que foi resolvido é registro de validação, que o Quasar já faz por injeção
   própria. Acrescentar um segundo canal de injeção seria o motor paralelo pela porta dos fundos.
2. **`rules` só em forma de função.** O QField também aceita a string de um padrão nomeado
   (`:rules="['email']"`), que depende do registro de `testPattern` do Quasar — canal que o
   DSS não expõe. Aceitar a string faria a regra falhar em silêncio, que é o defeito original.
   Forma não suportada emite aviso em desenvolvimento.

> **Entra na fila de selo:** `DssInput`, `DssCheckbox`, `DssToggle`, `DssRadio` e `DssForm`
> estão selados e mudaram. Quem constrói não sela.

#### Dois defeitos menores corrigidos de passagem

- **`DssForm.example.vue` não importava nenhum dos 8 componentes que usa** — renderizava
  vazio. Era um dos 4 arquivos de exemplo no débito conhecido. Corrigido; os 4 cenários
  agora montam na seção 07 da página.
- **`flat` e `outline` usados como props do `DssButton`**, que não as tem (`variant` tem).
  Como o `DssButton` renderiza `<button>` nativo, as duas pousavam como atributo inerte e os
  botões saíam no estilo padrão. Trocado por `variant="flat"` / `variant="outline"`.

> **Débito registrado:** `validate:sandbox-tags` varre o sandbox, não os `.example.vue` do
> core — foi por isso que 8 tags sem import passaram despercebidas. Estender o gate ao core
> fecharia a mesma classe de defeito nos 3 exemplos restantes.

#### Os achados do 1.3

**1. Região opcional congelava na primeira renderização.** O `DssDialog` decidia header e
footer por `computed(() => !!slots.header)`. O computed **não rastreia** o objeto de slots —
ele resolvia uma vez e congelava. Slot que passava a existir depois da montagem nunca
aparecia; slot que deixava de existir nunca sumia. Alcança uso real, não só o frame:

```vue
<DssDialog>
  <template v-if="temTitulo" #header>…</template>   <!-- nunca aparecia -->
</DssDialog>
```

Corrigido lendo `$slots` direto no template, que é reavaliado a cada renderização. Dois
casos novos em `DssDialog.test.js`, **provados a reprovar**: com o computed de volta, os dois
ficam vermelhos. `useSlots()` e `computed` saíram do arquivo — viraram código morto.

**2. A marca do overlay é a do DOCUMENTO, e o ancestral local não manda.** O
`useTeleportedBrand` resolve em duas etapas: `data-brand` no `<body>`/`<html>` (norma) e, na
falta dele, **o primeiro `[data-brand]` do documento inteiro**. Não é defeito — é o que o
composable declara. Mas é armadilha silenciosa em página de marca mista: todo overlay sai com
a marca do primeiro bloco do DOM, não com a do bloco que o abriu. Documentado no README do
componente e medido na seção 03 da página.

**Medições que fecham os três riscos do guia de Fase 3:**

| Risco | O que foi medido | Resultado |
|---|---|---|
| **2.1** cascata em overlay | `<body data-brand="water">` → nó teleportado | `data-brand="water"`, botão do footer `rgb(14,136,228)` — nas 3 marcas |
| **2.2** overflow e scroll | `DssTable` de 60 linhas dentro do overlay | corpo rola (2307px em caixa de 762px); header e footer parados; o overlay **não** rola |
| **2.3** teclado | ESC real, via teclado do navegador | padrão fecha; `disableEsc` resiste e a saída passa a ser do footer |

**Aninhamento provado.** `DssForm` dentro do overlay, com o botão de salvar no **footer** —
fora do `<form>`, alcançável só pela API imperativa. `validate()` atravessa o teleporte e
responde `false` com as regras aplicadas: o `provide/inject` do Vue segue a árvore de
COMPONENTES, não a do DOM. Só o primeiro campo inválido exibe mensagem, que é o
comportamento não-*greedy* correto.

#### Sinal de demanda: `maximized-width` foi INVENTADA em três páginas

O gate `validate:dss-props` pegou `<DssDialog maximized-width="640px">` em
`TestAtenderSolicitacoes`, `TestAtenderSolicitacoesClaude` e `TestParcelamento`. A prop não
existe **nem no DssDialog nem no QDialog** — era atributo de DOM inerte. Duplamente inerte,
aliás: a largura de verdade vinha do filho (`.detail-modal { max-width: min(560px, 95vw) }`).
Removida das três.

O que interessa não é o erro, é o padrão: **três páginas, escritas em momentos diferentes,
chegaram sozinhas ao mesmo nome**. O `DssDialog` não tem controle de largura — só o mínimo de
280px e o teto de 90vw —, e quem monta tela precisa de um. Hoje a saída é declarar
`max-width` no filho, o que devolve para a página uma decisão que era do contêiner: é
exatamente a métrica que o item 3.2 vai medir.

**Decisão para você, não tomada aqui:** dar ao `DssDialog` um eixo de largura (`size` com a
escala de teto do `DssContainer`, ou `maxWidth` por token) é adicionar API a componente
**selado**. Tem evidência de demanda real, mas é escolha de produto — e o §1.6 do guia diz
que o eixo de variação decide: se a largura varia por CASO DE USO e não por marca ou
conteúdo, ela é prop, não slot nem token de tema.

#### Três correções de passagem

- **`DssDialog.example.vue` reescrito.** Montava tudo com `<button>` cru e `style` inline —
  39 atributos de estilo e um `class="q-btn"` —, o anti-padrão que o Cartão Composto proíbe
  nominalmente. Medido depois: **0 Quasar cru, 0 estilo inline**. Ainda carregava o token
  fantasma `--dss-hub-primary` com hex de *fallback*.
- **Tabela de tokens do README corrigida.** Listava `--dss-hub-primary`, `--dss-water-primary`
  e `--dss-waste-primary` — **três tokens que não existem**. O `_brands.scss` fora colapsado
  para `--dss-action-primary` e a tabela não acompanhou. Também citava `--dss-gray-100` onde
  o CSS usa `--dss-border-subtle`.
- **`previewHtml` tokenizado.** É uma imitação estática do diálogo, usada só pela galeria de
  defaults — que genuinamente não hospeda um modal: **medido**, ao remover o `previewHtml` o
  cartão cai para `⚠ DssDialog`, porque o componente nem está no `REGISTRY` do `DemoRenderer`.
  A imitação fica, mas os `8px`/`20px`/`rgba(0,0,0,.18)`/`white` viraram `var(--dss-*)`, para
  não divergir do componente no primeiro ajuste de token. Resta um `320px`, que é a largura
  da célula da galeria. A atestação de verdade mora no Preview Frame, que agora monta o SFC
  real com `open: true` e semente nas três regiões.

#### O achado do 1.4: a coluna de ações custa 8px por linha, e o custo não depende da densidade

A altura da linha do `DssTable` **não é declarada** — não existe `height` em `td` nenhum. Ela
é o padding da densidade mais o que for **mais alto** dentro da célula. Medido:

| Densidade | Só texto | Com `DssChip` + `DssButton` | Custo |
|---|---|---|---|
| `compact` | 38px | 46px | **+8px** |
| `standard` | 50px | 58px | **+8px** |
| `comfortable` | 58px | 66px | **+8px** |

Decomposto no `compact`: 6px de padding + 24px de *line-height* + 6px + 1px de borda = 37,5px.
Troque o texto por um `DssButton` e os 24px do *line-height* dão lugar aos 32px do botão. **O
custo é idêntico nas três densidades**, porque o que muda entre elas é o padding, não o teto do
conteúdo.

**Não é defeito, e é importante que não seja tratado como um.** Encolher o botão para caber
quebraria o alvo de toque (WCAG 2.5.5); a linha crescer é o certo. Mas vira decisão de layout:
o grid master do Sansys Water pede 36px de linha, e uma coluna de ações não cabe nisso. O
item 3.1 vai esbarrar nisso ao refazer a tela — e agora esbarra com o número na mão.

**Aninhamento provado nos quatro slots**, com componente DSS dentro de cada um: `top` com
`DssToolbar` + `DssButton`, `header` com a linha de `<th>` reescrita, `body-cell-[coluna]` com
`DssChip`, `bottom` com o rodapé próprio. O repasse de slots é **dinâmico** — não há lista
fixa no `DssTable`: o que o QTable aceita, ele repassa, inclusive os de nome derivado.

#### O segundo achado do 1.4: o Preview Frame ligava o v-model como `null`

Encontrado ao conferir o console no fim do item — o frame do `DssTable` mostrava palco em
branco e `Unhandled error during execution of render function at <QTable>`.

O `PreviewSubject` mantém `model = ref(null)` e ligava o v-model **sempre**. Em Vue, prop
passada explicitamente como `null` é um valor fornecido, e portanto **anula o default do
componente**. O contrato do `DssTable` não declara default para `modelValue`, então o frame
mandava `null`, isso vencia o `modelValue: () => []` do componente, o QTable recebia
`selected = null` e o render estourava.

Não é defeito do `DssTable`: é do frame, e alcança qualquer componente cujo v-model tenha
default não-nulo e não declarado no contrato. Corrigido ligando o v-model só quando há valor.
Verificado em cinco frames (`DssTable`, `DssInput`, `DssCheckbox`, `DssSelect`, `DssToggle`,
`DssForm`), console limpo.

**O gate não pegaria.** O `validate:demo-seeds` confere que a semente cita componentes e props
que existem — não que o componente monte. Frame que estoura no render é verde para ele.

#### Correção de passagem

**`DssTable.example.vue` reescrito.** Montava o filtro com `<q-input>`, a troca de densidade
com `<q-btn-toggle>` e o ícone com `<q-icon>` — Quasar CRU dentro de um componente DSS, o
mesmo anti-padrão do `DssDialog.example.vue`. Carregava ainda um
`style="width: var(--dss-spacing-6)"` no campo de filtro: **24px de largura para digitar**.
Medido depois: **0 Quasar cru, 0 estilo inline** (eram 3 e 10). Ganhou o cenário 5, que é
onde o custo de altura fica visível em uso real.

#### Fechamento do Bloco 1 — o que a Frente 1 entregou

Quatro contêineres, e o padrão que se repetiu nos quatro:

| Item | O que se provou | O que se achou |
|---|---|---|
| **1.1 `DssContainer`** | 6 tetos e 6 respiros, medidos | o nome `.dss-container` já tinha dono; o componente nem estava no bundle |
| **1.2 `DssForm`** | 6 campos aninhados, validação alcançando todos | `validate()` reprovava **aberto** em 4 dos 6 campos |
| **1.3 `DssDialog`** | os 3 riscos do guia de Fase 3, medidos um a um | região opcional congelava na 1ª renderização |
| **1.4 `DssTable`** | os 4 slots com DSS dentro; custo de altura nas 3 densidades | a coluna de ações custa 8px por linha, sempre |

**O padrão:** em três dos quatro, o defeito era **mudo**. Nenhum erro de console, nenhum
teste vermelho — o componente montava e respondia. `validate()` dizia `true`; a região do
header simplesmente não aparecia; o CSS do `DssContainer` não embarcava. O que os expôs não
foi ler o código: foi **montar e medir**. As páginas de Playground das quatro peças existem
para que a próxima regressão não seja muda também.

**Dois exemplos de uso reescritos** (`DssDialog`, `DssTable`), ambos pelo mesmo motivo:
montavam Quasar cru e `style` inline dentro de um componente DSS. Somados, 49 atributos de
estilo inline e 4 componentes Quasar crus viraram zero. O arquivo de exemplo é a superfície
de uso documentada — se ele mostra `<button>` cru, é isso que o consumidor copia.

**Cinco componentes selados mudaram de comportamento** (`DssInput`, `DssCheckbox`,
`DssToggle`, `DssRadio`, `DssDialog`) e três mudaram só a declaração de API (`DssForm`,
`DssTextarea`, `DssSelect`). Todos na fila de reemissão de selo — quem constrói não sela.

### Bloco 2 — Frente 2: a casca

- [x] **2.1 `DssBrandLogo`** *(depende de 0.4)* — criado: 4 camadas, contrato válido, 21 testes,
      página Playground (8 seções), registrado no bundle e na galeria. **Item 0.5 executado
      junto** — ver abaixo.
#### O que o 2.1 entregou

**A decisão central é a ausência de uma prop.** O `DssBrandLogo` não tem `color`. Ele declara
`fill: currentColor` e nada mais, e por isso o MESMO markup sai em quatro cores diferentes
conforme o contexto. Medido na seção 02 da página, com um único
`<DssBrandLogo brand="water" />` repetido:

| Contexto | `fill` resolvido |
|---|---|
| sobre a cor da marca | `rgb(255, 255, 255)` |
| sobre fundo claro | `rgb(69, 69, 69)` — `--dss-text-body` |
| sobre fundo escuro | `rgb(255, 255, 255)` |
| sobre texto sutil | `rgb(115, 115, 115)` — `--dss-text-subtle` |

Uma prop de cor prenderia o logo a um valor e quebraria o caso mais comum no Sansys, que é o
logo sobre a barra colorida da marca. É também o que o protótipo do Figma fazia com
`filter: brightness(0) invert(1)`: só produz branco, e só em logo monocromático.

**A marca é conteúdo, não pele.** É a única faceta da brandabilidade do DSS que não sai por
cascata: a marca decide quais `<path>` existem no DOM, e CSS não troca o `d` de um path. Por
isso a resolução mora em JS — prop, depois o `[data-brand]` **mais próximo**.

O "mais próximo" é deliberado e é onde este componente difere do `DssDialog`: lá o conteúdo é
teleportado para fora da árvore e herda a marca do DOCUMENTO; aqui o logo vive na árvore.
Medido com marcas aninhadas: `hub` por fora, `waste` por dentro → desenhou `waste`.

**Sem marca resolvida, não desenha.** Chutar a marca de um produto é pior que não desenhar —
um Water que aparece como Hub numa tela de produção é erro que ninguém percebe até o cliente
ver.

**Tamanhos medidos** (`md` = 20px é o do app bar de 40px do grid master):

| size | Medido | Contexto |
|---|---|---|
| `sm` | 46 × 16 px | rail retraído |
| `md` | 57 × 20 px | app bar de 40px |
| `lg` | 80 × 28 px | header de 64px |
| `xl` | 114 × 40 px | login, splash |

Larguras diferentes por marca na mesma altura (Water 103, Hub 80, Waste 104 em `lg`): é por
isso que quem manda é a altura — fixar largura deformaria dois dos três desenhos.

#### Item 0.5 — executado, e o sequenciamento estava certo

`DssBrandLogo` entrou em `DssToolbar.allowed_children` no `ui-rules.schema.json`. A árvore que
bloqueava o `DssAppBar` — `DssHeader › DssToolbar › [burger, logo, título, ações]` — agora é
**`compliant`**, e o `schemaIntegrity` segue **íntegro**: 54 componentes citados, todos no
catálogo de 95.

O plano tinha razão em mover este item para cá: feito antes, o schema teria passado semanas
declarando-se quebrado, porque `schemaIntegrity` reprova componente citado que não existe no
catálogo.

#### Dois buracos que o 2.1 revelou, ambos do `DssContainer`

Nasceram no Bloco 0 e só apareceram agora, porque o catálogo estava desatualizado e os
escondia:

1. **Fora do `DemoRenderer`.** O gate `validate:demo-registry` reprovou assim que o catálogo
   foi reconstruído — `DssBrandLogo` e `DssContainer` não estavam no registry da galeria.
   Registrados.
2. **Meta com a chave errada.** O `DssContainer` usa `name` onde os outros 92 usam
   `component`, e a galeria filtra por `component`. Resultado: nenhum cartão, nenhum erro,
   nenhum aviso. Já existia um normalizador em `scripts/update-meta-preview.cjs` que faz
   exatamente essa correção — este meta só nunca passou por ele. Corrigido; a galeria foi de
   92 para 93 cartões.

#### E um que NÃO dá para consertar sem falsificar registro

O quadro de adequação (`build-adequacao-status.cjs`) monta a lista de componentes de Fase 1/2
lendo o **índice de selos**, que por construção só lista componente já selado. Todo componente
criado depois das ondas de selagem é invisível: hoje `DssContainer`, `DssBrandLogo` e
`DssActionMenu`.

Escrever linha no índice de selos para resolver seria falsificar o que foi auditado — e selo é
de outro agente. Registrado em `DEBITO_ABERTO.md` com as duas saídas possíveis; a barata é o
quadro passar a derivar a lista do `catalog.json`, que já é gerado do disco.

- [x] **2.2 `DssAppBar`** — criado: composto de 4 camadas, contrato válido, 18 testes, página
      Playground (7 seções). Altura de 40px com token novo. **A composição se provou — ver abaixo.**
#### O que o 2.2 provou: uma prop, dois efeitos

É o resultado que justifica a Frente 2 inteira. `brand` vai ao `DssToolbar`, e de lá saem
**duas** coisas sem ninguém repassar nada:

| `brand` | Logo desenhado | Fundo da barra |
|---|---|---|
| `water` | water | `rgb(2, 108, 199)` — `--dss-water-600` |
| `hub` | hub | `rgb(239, 122, 17)` — `--dss-hub-600` |
| `waste` | waste | `rgb(11, 129, 84)` — `--dss-waste-600` |

O `DssBrandLogo` dentro da barra **não recebe prop de marca nenhuma**. O `DssToolbar` propaga
`[data-brand]` no próprio root e o logo resolve pelo ancestral mais próximo. É o §1.3 do guia
— contexto visual por `data-*` e cascata, não por `provide/inject` — e é exatamente por isso
que o `DssBrandLogo` foi feito para ler o ancestral **mais próximo** e não o documento.

**Estrutura medida:** `menu → brand → divider → title → ações`, altura **40px**. A ordem que
o 2.2 existe para fixar.

**Altura:** `compact` 40px (padrão, medido no grid master) e `standard` 64px. O token
`--dss-layout-header-height-compact` nasceu aqui: dos dois degraus que existiam, 64px e 48px,
nenhum cobria os 40.

#### Quatro decisões do composto, e por que não foram props

Todas seguem o §1.6 — **o eixo de variação decide**:

| O que varia entre produtos | Mecanismo | O que NÃO foi feito |
|---|---|---|
| Cor | token, via `brand` | prop `color` na barra |
| Logo | dados + `[data-brand]` | prop `logoSrc` |
| Ícones da direita | slot `actions` | prop `actions[]` — seria reimplementar slot, mal |
| Ordem das peças | **o composto** | props `burgerIcon`/`logoPosition` no `DssHeader` |

O `DssHeader` continua o primitivo: não ganhou prop de conteúdo nenhuma.

**O divisor não é um `DssSeparator`**, e é a regra R3 que está certa: aqui o traço é
decoração de barra, não separação semântica entre grupos. Sai da árvore com `aria-hidden`, e
só existe quando há título para separar — medido: sem título, divisor ausente.

**O logo é `decorative` por padrão.** O nome do produto já é anunciado pelo título do módulo
ao lado; informativo aqui faria o leitor de tela ler a marca duas vezes. Quem precisa do logo
nomeado (link para a home) usa o slot `brand`, e aí o nome é do link — medido:
`"Página inicial do Sansys Water"` no `<a>`, `aria-hidden=true` no logo.

#### Um defeito meu, e o que ele ensinou

Três testes passaram a mentir antes de eu perceber. O helper `montar()` entregava os slots à
**casca** (`q-layout`) via a opção `slots` do `mount`, não ao `DssAppBar` dentro dela — então
o slot sumia e o teste do slot verificava o nada. Corrigido inlinando os slots no template da
casca.

Vale registrar porque é o mesmo padrão que a Frente 1 encontrou quatro vezes, agora do lado
do teste: **ausência silenciosa**. O teste não quebrou, não avisou — passou.

- [x] **2.3 `DssSectionTitle`** — criado: 4 camadas, contrato válido, 22 testes, página
      Playground (6 seções). **A distância do traço foi medida — ver abaixo.**
#### O que o 2.3 entregou, e o erro que a medição pegou

O requisito era que a distância entre o texto e o traço fosse **mínima**. Mínima não é zero,
e o valor certo não sai do olho — sai da métrica da fonte.

**Medição ótica** (do fim da TINTA do descendente ao topo do traço; linha de base obtida por
marcador inline de altura zero, fonte real, `line-height: tight`):

| `size` | fonte | `padding: 0` | `padding: 2px` (o token) | `padding: 4px` (telas atuais) |
|---|---|---|---|---|
| `sm` | 14px | **0,5px** | 2,5px | 4,5px |
| `md` | 16px | 1,0px | 3,0px | 5,0px |
| `lg` | 18px | 1,5px | 3,5px | 5,5px |

Com `padding: 0` o traço **não encosta** — mas em `sm` sobra meio pixel, que na prática é
colisão de subpixel. E a folga que resta vem só da meia-entrelinha: ela encolhe junto com a
fonte, então quanto menor o título, mais apertado. `--dss-section-title-rule-gap` = **2px**
devolve 2,5–3,5px em todos os tamanhos — mínimo e estável. As telas atuais usam o dobro.

> **Eu escrevi a justificativa errada primeiro.** A primeira versão do token dizia que a
> tinta alcançava o fim da caixa da fonte e que `0` encostaria no glifo. A medição seguinte
> mostrou 1,5px de folga em `lg` — o valor 2px estava certo, a RAZÃO não. Corrigido no token,
> no README, no normativo e na sonda da página. Deduzir a linha de base por meia-entrelinha
> errava; o marcador inline de altura zero é o jeito confiável.

**`line-height: tight` virou parte do contrato,** não escolha estética: entrelinha maior
empurraria o traço por meia-entrelinha, e o respiro deixaria de ser governado pelo token.

#### Nível e tamanho são eixos separados

`level` decide a TAG, `size` decide a aparência. Juntar os dois é o atalho que quebra a
hierarquia de cabeçalhos: quem precisa de um `<h3>` grande escreve `<h1>` para conseguir o
tamanho, e a navegação por cabeçalhos do leitor de tela passa a mentir (WCAG 1.3.1 · 2.4.6).
Medido no DOM: `level=1 · size=sm` → `<h1>` a 14px; `level=3 · size=lg` → `<h3>` a 18px.

#### O traço segue a marca por TOKEN (§K5)

Os dois caminhos convergem — medido:

| | `water` | `hub` | `waste` |
|---|---|---|---|
| `[data-brand]` ancestral | `rgb(14,136,228)` | `rgb(239,122,17)` | `rgb(11,129,84)` |
| prop `brand` | `rgb(14,136,228)` | `rgb(239,122,17)` | `rgb(11,129,84)` |

A prop **remapeia `--dss-action-primary`**; não pinta a borda. É o §K5, e o custo de ignorá-lo
já foi medido no `DssLinearProgress`, onde a prop `color` virava inerte dentro de
`[data-brand]`.

As cores de estado **não brandeiam**, e é correto: dentro de `[data-brand="water"]`, só
`accent="brand"` muda de cor — `error` continua `rgb(216,24,46)` em Water, Hub e Waste.
Significado não muda com a marca.

#### ✅ DECIDIDO no 3.1: o traço segue a MARCA — o âmbar do Figma foi descartado

Nas duas telas o traço era `--dss-feedback-warning` (âmbar), com o comentário "acento do
Figma". O componente usa **`brand` como padrão** — é o que foi pedido, e a Constituição #6 diz
que o Figma não é árbitro visual.

**A decisão de produto veio no Bloco 3.1: fica a marca.** As nove ocorrências nas duas telas
usam o default. `accent="warning"` continua existindo para quando o âmbar significar alerta de
fato — que é o que a prop diz. Gastá-lo como identidade visual queimaria a cor de estado em
títulos que não falam de estado nenhum.

- [x] **2.4 `DssPageShell`** — criado: composto de 4 camadas + subcomponente
      `DssPageShellRailItem`, contrato válido, 15 testes, página Playground (6 seções).
      **Corrigiu três defeitos da tela de origem — ver abaixo.**

#### O que o 2.4 entregou

O rail se repetia em **toda** tela do Sansys e não existia como componente. Agora existe, com
o subcomponente `DssPageShellRailItem` — porque a alternativa era o consumidor escrever
`<button>` cru com um `DssIcon` dentro, que é o que as telas faziam, e sem nome acessível.

**Medido:**

| | Valor |
|---|---|
| Rail | 52px (`--dss-touch-target-lg`) |
| Item | 52 × 44px — o piso da WCAG 2.5.5 |
| Fundo da página | `rgb(245,245,245)` — `--dss-surface-muted` |
| Board | `rgb(255,255,255)` com moldura de 1px |

**O rail acompanha a marca com a Layer 4 de brands VAZIA** — ele consome os três tokens de
ação, e `[data-brand]` remapeia:

| | fundo | separador | item ativo |
|---|---|---|---|
| `water` | `rgb(7,74,133)` | `rgb(3,86,161)` | `rgb(14,136,228)` |
| `hub` | `rgb(122,54,20)` | `rgb(152,70,20)` | `rgb(239,122,17)` |
| `waste` | `rgb(10,74,52)` | `rgb(10,91,62)` | `rgb(11,129,84)` |

#### Os três defeitos da tela de origem que o componente corrige

1. **Os separadores do rail NÃO EXISTIAM.** A tela escrevia
   `border-bottom: 1px solid var(--dss-border-water-700)`, e esse token é um **shorthand
   completo** (`1px solid <cor>`), não uma cor. A declaração virava
   `1px solid 1px solid #0356a1` — inválida, descartada pelo navegador, sem erro. **Medido na
   tela: `border-bottom-width: 0px`, `style: none`.** No componente:
   `1px solid rgb(3,86,161)`.
2. **O rail estava preso à marca Water.** Mesmo token. Numa tela Hub ou Waste o separador
   sairia azul.
3. **`height: 100vh` no rail.** A viewport inteira ignora que existe uma barra de aplicação
   acima, e o rail transbordava exatamente a altura dela. O componente usa `position: sticky`
   + `align-self: flex-start` + `max-block-size: 100vh`, que resolve sem a conta.

Mais um de higiene: a tela reimplementava `.gm-sr-only` à mão, embora o DSS já tenha o mixin
`dss-visually-hidden`.

#### O recorte: o shell é o MIOLO, não a casca

| Camada | Quem |
|---|---|
| casca externa | `DssLayout` — de quem monta a tela |
| barra superior | `DssAppBar` (2.2) |
| **miolo** | **`DssPageShell`** |
| conteúdo | slots |

Absorver o `DssLayout` aqui travaria o shell num único arranjo de página e o tornaria inútil
em modal, aba ou preview. O **board**, esse sim, foi absorvido: o cartão branco sobre o fundo
rebaixado é o arranjo padrão das telas e estava duplicado como `.gm-board` em cada uma.
`board={false}` devolve a coluna nua.

#### Fechamento do Bloco 2 — a casca

| Item | O que nasceu | O que se provou |
|---|---|---|
| **2.1 `DssBrandLogo`** | o desenho da marca, sem prop de cor | mesmo markup, 4 cores conforme o contexto |
| **2.2 `DssAppBar`** | a estrutura das 5 peças | uma prop, dois efeitos: pele **e** logo |
| **2.3 `DssSectionTitle`** | o título com traço de marca | a distância mínima, medida em 3 tamanhos |
| **2.4 `DssPageShell`** | o rail que não existia | 3 defeitos mudos da tela de origem, corrigidos |

**O padrão da frente:** as quatro peças encaixaram sem adaptador. O `DssAppBar` passa `brand`
ao `DssToolbar`, que propaga `[data-brand]`; o `DssBrandLogo` lê o ancestral **mais próximo** e
desenha a marca certa; o `DssPageShell` e o `DssSectionTitle` consomem os mesmos tokens de
ação e acompanham. Nenhum dos quatro tem uma regra de brand na Layer 4 que pinte algo — os
dois que a têm (`DssSectionTitle`) só **remapeiam** o token, que é o §K5.

**Nenhum entra na fila de selo:** os quatro nasceram `draft` e nunca foram selados.

### Bloco 3 — provar nas telas reais ✅ EXECUTADO (set/2026)

- [x] **3.1** Refazer `TestGridMasterDashboard.vue` e `TestCheckinNFAg.vue` consumindo os compostos.
- [x] **3.2** **Medir a queda de CSS de página** contra a linha de base (434 + 536 = 970 linhas).
      *É a métrica de sucesso das duas frentes: CSS que sai da página e entra no componente
      deixa de ser reinventado na próxima tela.*
- [x] **3.3** Rodar a bateria: `validate:sandbox-nav`, `validate:sandbox-tags`,
      `emit-contract --all --strict`, `validate:scss-tokens`, `build-adequacao-status --check`,
      `validate:type-check` — e o console do navegador limpo nas duas telas, LIGHT e DARK.

**Resultado medido (3.2).** Linhas de CSS *real* no `<style>` (sem linhas vazias nem
comentário de linha):

| Tela | Antes | Depois | Queda |
|---|---|---|---|
| Grid Master | 343 | 184 | **−159 (−46%)** |
| Check-in NFAg | 432 | 357 | −75 (−17%) |
| **Total** | **775** | **541** | **−234 (−30%)** |

Contando o bloco `<style>` inteiro — que é como o plano fixou a linha de base: **976 → 701**.

**Por que o Check-in caiu menos.** O `DssPageShell` **não serve** àquela tela, e isso é
resultado, não falha: o Check-in não tem rail, e as faixas de trilha e de cabeçalho são
*full-bleed* sobre o fundo rebaixado, enquanto o shell monta uma coluna única com board
dentro. Forçá-lo ali seria o risco "composto vira fachada" previsto na seção 4. O que o
Check-in consumiu foi `DssAppBar`, `DssSectionTitle` e `DssContainer`. O que restou dele é
conteúdo real da tela — `.cn-check` (72 linhas), `.cn-tile` (51) — e as 45 linhas de
`.cn-table`, que são a lacuna registrada abaixo.

**Onde o CSS foi parar, no Grid Master:**

| Saiu da página | Entrou em | Linhas |
|---|---|---|
| `.gm-appbar` + 6 sub-blocos | `DssAppBar` | 43 |
| `.gm-rail` + `__list` + `__item` | `DssPageShell` + `RailItem` | 34 |
| `.gm-table` + 7 sub-blocos | `DssTable` | 43 |
| `.gm-title` (6 ocorrências) | `DssSectionTitle` | 11 |
| `.gm-content` · `.gm-board` · `.gm-shell` | `DssPageShell` | 17 |
| `.gm-sr-only` | `DssPageShell` (mixin) / `DssTable` | 11 |

**O que o Bloco 3 revelou, que nenhum gate pegava** — detalhe em `DEBITO_ABERTO.md`:

1. **`DssToolbar` reprovava a WCAG 1.4.3 no tema escuro** — 3,74:1. Corrigido, 5,29:1.
2. **`DssAppBar` era invisível na galeria de defaults e no Preview Frame** — `QHeader` fora
   de `QLayout`. Corrigido.
3. **A conversão para `DssTable` apagou os nomes acessíveis** das caixas de seleção.
   Corrigido na tela; a lacuna do componente fica registrada.
4. **Cabeçalho de tabela sólido da marca não existe no DSS** — as duas telas o
   reimplementavam, ~88 linhas somadas.

---

## 4. Riscos

| Risco | Mitigação |
|---|---|
| **Composto vira fachada** — encapsula a estrutura mas o consumidor volta a sobrescrever CSS | A métrica do 3.2 pega: se as linhas de CSS da página não caírem, o composto não absorveu o que devia |
| **Proliferação de componentes específicos** (o padrão `IconButton`) | A cláusula do §1: composto novo só nasce com contrato, página, frame e gate verde |
| **`DssContainer` recriar o que classes utilitárias já fazem** | É literalmente a justificativa do adiamento em D1. A decisão 0.1 precisa de argumento novo, não de esquecimento do antigo |
| **Alterar R3 abrir a porta para qualquer filho no toolbar** | 0.5 admite **só** `DssBrandLogo`, nominalmente — não relaxa a regra |
| **Os 10 compostos sem contrato virarem um muro no 0.3** | Fechar o gate expõe todos de uma vez. Ou se aceita a fila como débito registrado, ou o 0.3 vira ratchet com baseline, como o `validate:scss-tokens` já faz |
