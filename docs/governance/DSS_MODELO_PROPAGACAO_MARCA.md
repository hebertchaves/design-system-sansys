# Modelo de Propagação de Marca

**Status:** normativo · out/2026
**Substitui:** a parte prescritiva de `DSS_FRENTE_MARCA_PRIMITIVOS.md` (§4 e §6), que permanece válido como medição de origem
**Gate:** `scripts/validate-brand-form.cjs` (ver §8)

---

## 1. O problema, em uma frase

Um `DssButton` dentro de um card, numa página de marca Hub, ficava laranja — e ninguém sabia dizer se isso era bug ou feature, porque **não havia regra**.

A pergunta "este elemento deve receber a marca?" estava sendo respondida componente a componente, por quem escrevia o `_brands.scss` naquele dia. Cem componentes, cem decisões independentes, nenhuma escrita em lugar nenhum.

Este documento responde a pergunta **uma vez**, de forma que agente nenhum — humano ou IA — precise decidir de novo.

## 2. Por que não ficou superado antes

A intenção existia e estava comunicada desde o início do projeto. Mais que isso: estava **escrita e medida**.

- O **§K5 do checklist** manda a prop `brand` remapear o token semântico, nunca pintar o primitivo.
- O **`DSS_FRENTE_MARCA_PRIMITIVOS.md`** mediu a dívida inteira, nomeou a causa, escreveu a forma da correção e sugeriu um piloto de três componentes.

O que nunca existiu foi **um gate**. São 18 scripts de validação no repositório; nenhum valida a forma da marca. Dois a tocam de raspão (`validate-hover-tokens` pega primitivo em degrau de estado; `validate-scss-tokens` pega token fantasma), nenhum olha a questão central.

A consequência é medível. Quando a frente foi escrita, eram **92** componentes com `4-output/_brands.scss`. Hoje são **100**. Oito componentes novos entraram **depois** da dívida estar documentada, e entraram do jeito errado — porque documentação não barra commit.

> O próprio hook de pre-commit traz a frase, escrita para o gate estrutural: *"o gate é o que torna isso verdade em vez de intenção"*.
> Marca é o último eixo grande do DSS sem gate. Todos os eixos que ganharam gate convergiram; este não.

## 3. Dois eixos, não dois caminhos

O erro de modelagem é tratar marca como um interruptor (liga/desliga) aplicado ao componente. Marca não é um interruptor — são **dois eixos de cor que respondem a perguntas diferentes**:

| eixo | tokens | pergunta que responde | sob `[data-brand]` |
|---|---|---|---|
| **IDENTIDADE** | `--dss-brand-*` | "de que produto é esta tela?" | sempre segue a marca |
| **AÇÃO** | `--dss-action-*` | "qual o peso desta ação?" | segue a marca **só na zona de identidade** |

Hoje os dois estão colapsados: componentes alcançam `--dss-action-primary` sempre que querem "a cor da marca", mesmo quando o elemento **não é uma ação**.

Exemplo medido: a régua decorativa do `DssSectionTitle` consome `--dss-action-primary`. Não é ação, é ornamento de identidade. Por estar no eixo errado, ela perde a marca quando o eixo de ação for corrigido — e o remédio não é abrir exceção, é **mover para o eixo certo**.

### 3.1 O eixo de identidade já existe, e está inerte

`tokens/brand/_{hub,water,waste}.scss` já define **15 tokens** por marca:

```
--dss-brand-primary   -secondary  -tertiary  -accent
--dss-brand-light     -lighter    -dark      -darker
--dss-brand-hover     -disable    -deep
--dss-brand-background  -surface  -border    -text
```

**Consumidores em componentes: zero.** Quarenta e cinco declarações de token construídas, completas e nunca usadas — o mesmo padrão já registrado em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`.

Isso muda o custo da correção para melhor: **a migração não precisa inventar tokens**. O eixo está pronto. Falta ligá-lo.

> ⚠️ Pendência técnica para a etapa 1: `--dss-brand-*` hoje só existe sob `[data-brand]`. Precisa de fallback em `:root` (apontando para a escala semântica neutra) para ser consumível fora de contexto de marca sem cair para `unset`.

## 4. Três zonas

| zona | o que é | eixo de IDENTIDADE | eixo de AÇÃO |
|---|---|---|---|
| **casca** | AppBar, rail, drawer, footer, splash, login, tela de bloqueio | marca | **marca** |
| **conteúdo** | card, container, form, tabela, diálogo, painel | marca | **semântico** |
| **explícita** | qualquer componente com prop `brand="…"` | marca | marca |

A casca é a moldura do produto: ali a ação primária *é* identidade, e o usuário lê "este é o Hub". O conteúdo é onde o trabalho acontece: ali primary/secondary/warning/negative precisam significar **peso e risco**, não produto — um botão de excluir não pode mudar de cor porque o produto mudou.

A terceira zona é a válvula de escape, e é **explícita por construção**: alguém escreveu `brand="hub"` naquele componente. Instrução direta vence contexto, sempre.

Aplicado ao print que originou esta discussão:

| elemento | hoje | pelo modelo |
|---|---|---|
| AppBar e rail laranja | ✅ | casca → correto |
| KPIs azul/verde/âmbar/vermelho | ✅ | conteúdo, eixo de feedback → nunca foi tocado pela marca |
| **"EXECUTAR VERIFICAÇÃO" laranja** | ❌ | conteúdo, eixo de ação → **volta ao semântico** |
| **réguas de título laranja** | ⚠️ certo pelo motivo errado | eixo de identidade → **continuam laranja**, mas via `--dss-brand-*` |

## 5. A regra de decisão (mecânica, sem julgamento)

Quem escreve CSS de componente responde **duas** perguntas, nesta ordem:

**1. Este valor é cor de AÇÃO ou de IDENTIDADE?**
   - o elemento convida a clicar, ou comunica peso/risco/estado → **ação** → `--dss-action-*` / `--dss-feedback-*`
   - o elemento decora, delimita ou assina o produto → **identidade** → `--dss-brand-*`

**2. Primitivo de marca (`--dss-hub-600`) no CSS de componente?**
   - **nunca.** Sem exceção. Primitivo de marca vive em `tokens/brand/`, e só lá.

Note que o componente **não decide a zona**. Ele declara apenas a que eixo o valor pertence. A zona é decidida pela página, com um atributo — §6. É essa separação que tira a decisão das mãos de quem escreve o componente.

## 6. A mecânica: a barreira

A zona de conteúdo reseta o eixo de ação. Mecanicamente:

```scss
// packages/core/tokens/semantic/_brand-barrier.scss
[data-brand-zone="content"] {
  --dss-action-primary: var(--dss-primary);
  --dss-action-primary-hover: var(--dss-primary-hover);
  // … a rampa de ação inteira, re-resolvida do primitivo neutro
}
```

**Isto não é mecanismo novo.** É exatamente a recomputação já documentada e em produção em `tokens/semantic/_scopes.scss`, usada com intenção inversa:

> *"Custom property substitui seu `var()` no elemento ONDE É DECLARADA… os blocos semânticos passam a casar também nesses escopos, e a mesma expressão (`var(--dss-primary)`) resolve de novo."*

O `_scopes.scss` re-resolve para **propagar** tema e marca a subárvores. A barreira re-resolve para **interromper** a marca numa subárvore. Mesma física, dois sentidos.

Funciona porque `--dss-primary` **não é remapeado por `[data-brand]`** — verificado: zero ocorrências de `--dss-primary:` em `tokens/brand/`. O valor neutro continua disponível por baixo, intacto.

Por que um atributo e não uma classe: `data-*` é o canal que o DSS já usa para contexto visual em cascata (Cartão Composto — *"brand/contexto visual via `data-*` + cascata de CSS var"*), e um atributo é legível no DOM durante auditoria, o que uma classe utilitária não é.

### 6.1 Três coisas que a construção ensinou

**A ponte Quasar era pré-requisito, não risco futuro.** `--q-primary` vive em `themes/_quasar-tokens-mapping.scss` sob `scopes.$marcas`, que não incluía a barreira. Sem isso ela sairia pela metade: o DSS iria ao semântico e as utilitárias do Quasar (`.bg-primary { … !important }` em `@layer quasar`, que vencem o CSS DSS unlayered) continuariam brandeadas — inconsistente, **pior que não ter barreira**. As duas zonas entraram em `$marcas`.

**A lista de escopo não serve aqui — e o número disse por quê.** A primeira tentativa foi pôr a zona em `scopes.$primitivos`, como os temas fazem. Medido antes de aceitar: re-declararia **176 tokens para acertar ~9**, e **19 deles são sobrescritas do tema dark** — que voltariam ao valor claro dentro de qualquer zona de conteúdo no escuro. Seria uma regressão muda em todo componente desabilitado no escuro. Por isso a barreira é **explícita e pequena**, com a regra B4 garantindo que não fique para trás.

**A barreira cobre exatamente o que a marca move.** Dos 62 tokens que `[data-brand]` remapeia, 50 são do eixo de identidade e permanecem; dos 12 restantes, `secondary`/`tertiary`/`accent` já apontam para o semântico nas três marcas. Sobra a rampa `--dss-action-primary*`, mais `--dss-focus-primary` e a ponte.

### 6.2 Quem estabelece zona

Doze componentes, com o campo `brandZone` no `dss.meta.json` e o atributo no template. O atributo vem **antes** do `v-bind="$attrs"`, então vale por omissão e o consumidor ainda pode sobrescrever sem API nova.

| zona | componentes |
|---|---|
| `shell` | `DssToolbar` · `DssHeader` · `DssFooter` · `DssDrawer` |
| `content` | `DssCard` · `DssPage` · `DssPageContainer` · `DssDialog` · `DssMenu` · `DssPopupProxy` · `DssBottomSheet` |
| `both` | `DssPageShell` — o `rail` é casca, o `board` é conteúdo |

`DssPageShell` é o caso exemplar: tem as duas zonas dentro de si, e é literalmente o print.

`DssAppBar` **não** emite: delega a `DssHeader` e `DssToolbar`, que já emitem.

Os quatro que **teleportam** (`DssDialog`, `DssMenu`, `DssPopupProxy`, `DssBottomSheet`) escapam da cascata — renderizam no `body`, fora da subárvore da página. Por isso declaram a zona eles próprios, em vez de herdá-la. A marca, nesses, continua chegando por `:data-brand` via `$attrs`.

### 6.3 A cadeia de propagação do `brandZone`

A cadeia do DSS é `código → meta.json → derivados` (Constituição #6), e os scripts da
cadeia usam **whitelist de campos** — um campo novo no meta **não viaja sozinho**. O
`brandZone` precisou ser ligado elo a elo:

| elo | estado | como |
|---|---|---|
| `1-structure/*.ts.vue` | **fonte** | `data-brand-zone` no template, antes do `v-bind="$attrs"` |
| `dss.meta.json` | ✅ | campo `brandZone` (`shell` \| `content` \| `both`) |
| `dss.contract.schema.json` | ✅ | `identity.brandZone`, enum, **opcional** — o schema é `additionalProperties:false`, sem isto o contrato seria rejeitado |
| `dss.contract.json` | ✅ | emitido por `emit-contract.mjs`, só quando presente |
| MCP `query_component` | ✅ | linha **Brand Zone** com a explicação do efeito — é o canal que responde ao agente |
| gate B5 | ✅ | mantém meta ↔ template honestos, nos dois sentidos |

**Não propagados, de propósito:** `catalog.json` (seus consumidores são validadores de
portal/demo, que não decidem cor) e `DSS_REFERENCIA_VISUAL_ANALISE.md` (aquele doc é
tabela de *preview*, não índice de metadado — só consome `component`, `defaultPreview` e
`previewGroup`).

> ⚠️ **Lacuna conhecida:** `DssBottomSheet` tem `brandZone` no meta mas está na lista dos
> 8 componentes **sem `dss.contract.json`** (baseline de dívida pré-existente). A zona
> dele funciona — o atributo está no template —, mas não chega ao contrato até aquele
> débito ser zerado.

`DssExpansionItem` e `DssContextHeader` foram **deliberadamente deixados de fora**: o primeiro aparece dentro de drawers de navegação, onde marcá-lo como conteúdo quebraria a casca; o segundo herda bem de `DssPage`.

## 7. A prop `brand` passa a ser tri-estado

Hoje a prop tem dois valores úteis (`"hub"|"water"|"waste"`) e ausência. Ausência significa "herda", e **não existe forma de dizer "não herde"**. São 50 props `brand` declaradas sem essa possibilidade.

```ts
brand?: 'hub' | 'water' | 'waste' | 'none'
```

| valor | efeito |
|---|---|
| `"hub"` \| `"water"` \| `"waste"` | emite `data-brand` no root — instrução direta, vence a zona |
| ausente | herda o contexto (zona + marca ancestral) |
| `"none"` | aplica a barreira localmente — opt-out explícito |

Forma canônica da prop, **a única aceita** (§K5):

```vue
<div :data-brand="brand || undefined" :data-brand-zone="brand === 'none' ? 'content' : undefined">
```

O componente **não** ganha regra CSS própria por marca. Sem `.dss-x--brand-hub`, sem `4-output/_brands.scss` pintando. O atributo entra na cascata e os tokens fazem o resto — que é o que o §K5 pede desde sempre.

## 8. O gate

`scripts/validate-brand-form.cjs`, no pre-commit, com **baseline** — o padrão que o DSS já usa em `validate-scss-tokens` e `contract-missing-baseline.json`.

Reprova:

| regra | detecta |
|---|---|
| **B1** | `var(--dss-{hub,water,waste}-NNN)` em `packages/core/components/**` — primitivo de marca fora de `tokens/brand/` |
| **B2** | seletor `.dss-*--brand-{hub,water,waste}` que **pinta** (declara propriedade CSS) em vez de **remapear** (declara custom property) |
| **B3** | prop `brand` em `*.types.ts` cuja implementação não emite `data-brand` nem delega |
| **B4** | token remapeado por marca que a barreira **não reseta** — sem baseline, com allowlist justificada |
| **B5** | `brandZone` no meta ≠ `data-brand-zone` no template, nos dois sentidos |

B4 e B5 **não têm baseline**: são invariantes, não dívida. B4 fecha o furo mudo de alguém criar um token de marca novo e a barreira não acompanhar. B5 impede que o meta — documentação **derivada** (Constituição #6) — minta sobre o código.

O baseline congela as ocorrências de hoje: **nada novo passa**, e a dívida existente vira uma lista que só pode encolher. Isso inverte a dinâmica que produziu os 8 componentes novos entre a medição e agora.

## 9. Migração

A ordem importa — migrar antes de fixar o alvo é refazer depois.

| etapa | o que | bloqueia |
|---|---|---|
| **1** | este doc + gate com baseline + fallback `:root` do eixo de identidade | — |
| **2 ✅** | `brandZone` no meta + emissão do atributo nos 12 estabelecedores + B4/B5 | 1 |
| **3 ✅** | barreira ligada + ponte `--q-*` + e2e (11 testes, browser real) | 1, 2 |
| **4** | prop tri-estado com `"none"` + migração dos `_brands.scss`, em ondas | 1, 3 |

### 9.1 Etapa 4 — o que a execução ensinou

**Migração em lote mecânico não existe.** Medi antes de tentar e dois fatos barram o `sed`:

1. **Os degraus nem sempre casam com token.** Das 18 regras de marca dos 8 componentes
   analisados, **10 são exatas** (`--dss-brand-primary`, `--dss-brand-hover`,
   `--dss-text-brand-tertiary`) e 8 diferem — sempre em **uma única marca**.
2. **A topologia dos seletores difere por componente** — co-localizado, só-classe,
   descendente, tema+classe. Um transform cego mata regras.

**Decisões de valor são do dono do produto, não do agente.** As 8 divergentes
viraram três decisões, apresentadas com hex e contraste medidos:

| | regras | deslocamento | contraste (1.4.11) | status |
|---|---|---|---|---|
| **A** trio uniforme-600 | 5 | — | — | ✅ **A2**: token novo, zero mudança |
| **B** sombras no dark | 5 | waste 500→400 | 5,46 → **7,29** | ✅ aprovada |
| **C** Card `border-color` | 2 | hub 1 degrau | 1,94 → 1,51 | **pendente** |

#### A — resolvida criando o degrau que faltava, não deslocando cor

A pergunta parecia ser "o Avatar pode clarear no water?". Medindo o alcance, não
era sobre o Avatar: o trio uniforme-600 tem **5 usos em 3 componentes** —
`DssAvatar` (borda + ponto de status), `DssTab` (cor + outline) e **`DssToolbar`
(a barra de marca)**. Deslocar teria clareado a barra de marca do Water.

O eixo de identidade já tinha token uniforme em 50/100/200/300/400/800. O **600
era a lacuna mais usada**. Criado `--dss-brand-solid`:

```
--dss-brand-solid: hub-600 · water-600 · waste-600
```

Diferente de `--dss-brand-primary`, que alivia o water para 500 por espelhar o
eixo de AÇÃO (tom mais claro lê melhor como botão). Para **superfície sólida**
as três marcas usam 600.

> ⚠️ Dado que apareceu no caminho: no Water, a **barra de marca** (`water-600`,
> `#026cc7`) e o **botão primário** (`water-500`, `#0e88e4`) usam tons
> diferentes — e só no Water. Não é consequência da migração, é um estado
> anterior. Unificá-los é decisão de DESIGN, separada desta frente.

#### C — a borda do card é decoração, não indicador de estado

A dúvida era se a borda carregava significado (aí a reprovação na 1.4.11
importaria). Verificado no código: o `DssCard` **não tem estado selecionado
próprio**, e onde a seleção existe nas telas ela é pintada com
`--dss-surface-selected` — uma mistura a 12% da ação primária, no FUNDO. A borda
de marca é ornamento de identidade; quem carrega o estado é o tinte.

Isso libera a decisão C do argumento de acessibilidade. Segue pendente só por
ser mudança de cor visível.

**Ordem que funciona, por componente:**
1. inspecionar a topologia do seletor (compilar e olhar, não supor)
2. migrar a ROTA (classe → atributo) mantendo valores — não exige decisão nenhuma
3. converter PRIMITIVO → token, só onde o trio casa ou a decisão está aprovada
4. provar por CSS compilado (declarações por seletor) e por medição em browser

**O gate precisou ser corrigido três vezes pela própria migração** — cada vez que a
realidade andou, a regra que a descrevia ficou para trás:
- **B2** reprovava o estado final (arquivo sem declaração nenhuma)
- **B2** reprovava quem pinta com TOKEN (só primitivo é violação)
- **B3** casava `data-brand` dentro de comentário (faltava `stripComments` no `.vue`)

> Gate que passa por engano é pior que gate nenhum: ele **certifica o defeito**.

As etapas 2 e 3 saíram juntas de propósito: separadas, produziriam um estado intermediário **inerte** — metadado que nada lê, ou atributo que nada consome. Inércia é a doença que esta frente inteira está tratando.

**Verificado em browser real** (`apps/sandbox/tests/regression/e2e/brand-barrier.spec.ts`, 11/11), incluindo a tela do print: AppBar na marca, conteúdo semântico, e o rail reentrando a marca de dentro do conteúdo.

Piloto da etapa 4, herdado de `DSS_FRENTE_MARCA_PRIMITIVOS.md` §6 — `DssBadge` (simples), `DssButton` (completo), `DssChip` (múltiplos passos da escala).

### O que NÃO fazer

- Não migrar com `sed`. O mapeamento passo-da-escala → token semântico **não é mecânico** (um `_brands.scss` típico usa `-50` para fundo sutil, `-700` para hover e `-950` para texto).
- Não abrir exceção para um componente decorativo que "precisa ficar laranja". Ele não precisa de exceção, precisa do **eixo de identidade**.
- Não tratar a zona como decisão do componente. Zona é da página.

## 10. Medições

Out/2026, na raiz do repo.

| medida | valor |
|---|---|
| componentes com `4-output/_brands.scss` | **100** (eram 92 quando a dívida foi medida) |
| usos de primitivo de marca em componentes | **565** |
| `_brands.scss` que **remapeiam** (forma §K5) | **5** |
| `_brands.scss` que **pintam** (forma proibida) | **95** |
| componentes consumindo `--dss-action-*` | **70** |
| componentes consumindo `--dss-brand-*` | **0** |
| props `brand` declaradas | **50** |
| tokens remapeados por `[data-brand]` | **62** por marca |
| gates que validam a forma da marca | **0** |

```bash
find packages/core/components -path '*4-output/_brands.scss' | wc -l
grep -rhoE 'var\(--dss-(hub|water|waste)-[0-9]+' packages/core/components --include=*.scss | wc -l
grep -rlE 'var\(--dss-brand-(primary|surface|text|border)\)' packages/core/components --include=*.scss | wc -l
```

---

## §9.2 Requalificação da escala de marca (out/2026)

Com a liberdade de requalificar os degraus — mantida a régua de acessibilidade —
a escala foi medida papel a papel, contra o fundo certo de cada um.

### O que mudou

| token | marca | de → para | motivo |
|---|---|---|---|
| `--dss-action-primary` | hub | 600 → **700** | superfície de ação carrega texto branco; 600 dava **2,81:1** e reprovava a 1.4.3 — e até o piso de 3:1 de não-texto |
| `--dss-brand-solid` | hub | 600 → **700** | mesma superfície, mesmo motivo (AppBar, borda do avatar, aba ativa) |

Nada mais mudou de valor. Water e waste já passavam.

**Por que não bastava trocar a cor do texto.** Medido na rampa inteira do hub:

| texto | base 600 | hover 800 | active 900 |
|---|---|---|---|
| branco | **2,81 ❌** | 6,52 ✅ | 8,88 ✅ |
| escuro | 7,03 ✅ | **3,04 ❌** | **2,23 ❌** |

Nenhuma cor de texto sobrevive aos três estados com a base em 600 — ela teria de
trocar no hover, o que pisca. Com a base em 700 o branco passa em todos:
**4,52 / 6,52 / 8,88**, crescendo monotonicamente.

### O mapa completo, por papel

Exigência conforme o papel: **4,5:1** quando carrega texto (1.4.3), **3:1** quando
é elemento não-textual informativo (1.4.11), **nenhuma** quando é decoração.

| papel | exigência | hub | water | waste |
|---|---|---|---|---|
| `solid` superfície c/ texto branco | 4,5 | 700 · 4,52 ✅ | 600 · 5,29 ✅ | 600 · 4,90 ✅ |
| `hover` · `tertiary` · `deep` · `dark` | 4,5 | ✅ | ✅ | ✅ |
| `text` texto de marca em fundo claro | 4,5 | 900 · 8,88 ✅ | 800 · 9,02 ✅ | 900 · 10,28 ✅ |
| `accent` acento no dark | 3,0 | 400 · 7,79 ✅ | 400 · 5,75 ✅ | 400 · 7,29 ✅ |
| `light` · `lighter` · `surface` · `background` | 4,5¹ | ✅ | ✅ | ✅ |
| `border` · `secondary` | — | 1,26–1,88 | | |
| `disable` | isento | — | — | — |

¹ medido com texto escuro por cima, que é como se usa um tinte.

> ⚠️ **`border` e `secondary` não são defeito.** São tintes sutis por desenho, com
> **zero consumidores**. Mudar o valor deles seria inventar problema. A regra é:
> **nunca podem carregar informação** — nem texto, nem fronteira de componente que
> precise ser identificada. Para isso existe `--dss-brand-solid`.

### Dois achados que o trabalho produziu

**`-solid` e `-hover` coincidem no hub e no water.** Nenhum componente usa os dois
juntos hoje, então não há hover invisível em tela. Quem precisar de hover sobre
superfície sólida deve usar **`--dss-brand-tertiary`** (hub-800 · water-700 ·
waste-800), que difere do sólido nas três marcas.

**O alto contraste passou a alcançar a marca.** Os temas `hc`/`hcdark` re-apontavam
só o eixo de ação; agora cobrem também `--dss-brand-solid` e `--dss-brand-hover`.
Antes a barra de marca pintava com o primitivo cru e ficava de fora — é
literalmente a promessa da frente (d), agora cumprida para essas superfícies.

### A reentrada da casca mudou de lugar — e de natureza

O bloco `[data-brand-zone="shell"]` de `_brand-barrier.scss` mapeava cada token de
ação para um token de identidade "equivalente". Eram **dois mapas que precisavam
ficar em sincronia** — e não ficaram: ao requalificar o hub de 600 para 700, o mapa
passou a devolver a cor errada na casca aninhada, em silêncio. Quem pegou foi o e2e.

Agora cada arquivo de marca casa também `[data-brand="x"] [data-brand-zone="shell"]`
no próprio seletor. A reentrada **re-resolve o bloco inteiro da marca** — exata por
construção, sem mapa para manter. Mesmo mecanismo de `semantic/_scopes.scss`.

---

## §9.3 Varredura: "dois mapas que precisam concordar à mão"

Depois que o mapa de reentrada da casca quebrou em silêncio **menos de um dia**
depois de eu escrevê-lo, fiz uma varredura procurando a mesma classe de defeito
em outros lugares. Três formas, medidas:

| forma | resultado |
|---|---|
| paridade de tokens entre as 3 marcas | **0 assimetrias** (63 tokens) |
| paridade dentro de cada tema HC | **0 assimetrias** |
| **regra CSS para classe que ninguém gera** | **12 casos** |

A terceira é real e virou a regra **B6** do gate.

### Por que só essa virou gate

O espelho — "classe gerada sem regra CSS" — tem **102 casos**, e a maioria é
legítima: ganchos de estado para consumidor e teste (`--checked`, `--decorative`)
que não precisam de estilo. Gatear aquilo seria ruído. Já regra que nunca casa
é defeito sem ambiguidade.

### O que os 12 eram

| componente | o que era |
|---|---|
| `DssAvatar` (3) | bloco de **`forced-colors`** que eu esqueci de portar na migração de rota — ACESSIBILIDADE morrendo em silêncio |
| `DssTimeline` (3) | componente **nunca teve** prop `brand`; a metade de classe sempre foi morta |
| `DssCarousel` (3) | idem |
| `DssTestPageComplexity` (3) | fixture, fora de escopo por governança — no baseline |

Os de `Timeline` e `Carousel` renderam mais do que limpeza: ao colapsar os três
blocos num só, apareceu que **o ponto da Timeline é preenchimento saturado com
glifo branco** (superfície com texto, 4,5:1) e que **o indicador ativo do
Carousel comunica seleção** (não-texto informativo, 3:1). Ambos em `hub-600` =
**2,81:1**. Com `--dss-brand-solid` passam a 4,52:1.

> Esse é o padrão que se repete: o defeito de forma e o defeito de contraste
> moram no mesmo lugar, e encontrar um expõe o outro. Em quatro das cinco vezes
> nesta frente, o que estava morto era um bloco de acessibilidade.

---

## §9.4 O eixo de identidade tem DOIS NÍVEIS de contraste

A requalificação do hub (§9.2) expôs que um token só não dá conta: o piso muda
conforme o papel, e o **water** é o que separa os dois níveis.

| token | hub | water | waste | para quê | piso |
|---|---|---|---|---|---|
| `--dss-brand-primary` | 700 · 4,52 | **500 · 3,71** | 600 · 4,90 | **indicador** — borda, anel, sombra, acento | 3:1 (1.4.11) |
| `--dss-brand-solid` | 700 · 4,52 | **600 · 5,29** | 600 · 4,90 | **superfície e texto** — fundo que recebe texto, cor de texto | 4,5:1 (1.4.3) |

A diferença é só o water. O 500 lê melhor como ação e **passa** como indicador;
não passa como texto. Por isso dois tokens, não um.

> **Como escolher, em uma pergunta:** *tem texto em cima, ou É texto?* Se sim,
> `-solid`. Se é borda, anel, sombra ou acento, `-primary`.

Corrigi dois usos meus por causa disso: `DssTooltip` (fundo com texto branco) e
`DssIcon` (cor de texto) estavam em `-primary` e no water davam 3,71:1.

### A família de campos: 141 referências removidas de uma vez

`DssInput`, `DssFile`, `DssField`, `DssSelect` e `DssTextarea` tinham, juntas,
141 referências a primitivo — e todas **reimplementavam por marca o mesmo foco
que a Layer 3 já desenha**. A Layer 3 pinta com `var(--dss-action-primary)`, que
a camada de token remapeia por marca. A cor já chegava; o `_brands.scss` só
repetia os valores com o primitivo cru.

Os cinco foram a zero. O hub sai de 2,81:1 para 4,52:1 de carona, porque
`--dss-action-primary` foi requalificado.

**Os dois Quasar-rooted entraram junto.** `DssSelect` e `DssTextarea` não aceitam
`data-brand` no root — o Quasar roteia o atributo para o `<input>` nativo
interno. A saída foi **aliasar a classe na camada de token**:

```scss
[data-brand="hub"],
[data-brand="hub"] [data-brand-zone="shell"],
.dss-select--brand-hub,
.dss-textarea--brand-hub { … }
```

Não é invenção: `semantic/accessibility/_focus.scss` já fazia exatamente isso
para `--dss-focus-primary` desde jul/2026. Agora a classe remapeia a marca
INTEIRA, e as duas rotas entregam a mesma cor — verificado em browser.

Com isso a exceção B3 desses dois deixa de ser "não dá para corrigir" e passa a
ser "corrigido por outro caminho, documentado".

