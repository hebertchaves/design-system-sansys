# DSS — Blueprint da Cadeia de Fonte Única

> **Status:** Alvo arquitetural ratificado (2026-06-30) · **Branch:** `import/dss-v2.4.0`
> **Natureza:** Documento de governança — define *onde queremos chegar* na amarração entre
> documento, governança, automação, código, playground e portal. As decisões marcadas
> **🔒 BATIDA** são vinculantes. O schema do contrato (§4) é **provisório** e será refinado;
> divergências detectadas no refino devem ser ajustadas aqui para manter alinhamento.

---

## 1. Propósito

Antes de tocar (readequar) qualquer componente, fechar a **base de apresentação e governança**
para que um componente tenha **o mesmo aspecto visual** independente de quem monta a tela
(humano ou agente de IA). Este blueprint é o passo "deixar claro onde chegar" da amarração total.

A divergência de produção **nunca entra pelo componente** (mesmas props + mesma versão = pixels
idênticos — Princípios #1/#12). Ela entra pela **camada de consumo**: override local, Quasar cru,
slot off-token, ou — o caso do portal — **reimplementação** do componente em vez de consumo do real.

---

## 2. A cadeia (moldura)

```
documento   →  fonte de verdade
governança  →  dita as regras
automação   →  propaga a informação
código      →  materializa
playground  →  apresenta
portal      →  comunica
```

Regra de ouro: **todos consomem a MESMA fonte de verdade e conversam entre si.**

```
FONTE DE VERDADE (dono ÚNICO por eixo)
  visual  →  CSS / SCSS L1–L4         (Princípio #12: CSS é supremo)
  API     →  types/*.types.ts          (nome, tipo, default, emits, slots)
  prosa   →  README.md (uso) + Dss<Nome>.md (normativo)
  selo    →  docs/Compliance/seals/*
        │
   GOVERNANÇA  dita schema + ownership + presença de prosa (gate)
        ▼
   AUTOMAÇÃO propaga  →  dss.contract.json   ← DERIVADO, nunca editado à mão, gated
        │              (a ÚNICA superfície de leitura dos consumidores)
        ▼
   ┌──────────────┬────────────────────┬─────────────────────┐
  CÓDIGO         PLAYGROUND            PORTAL
  materializa    apresenta             comunica
  (SFC real)    (host Vue passivo,    (consumidor PURO do
                SFC real via          MESMO contrato +
                iframe-barreira)      iframe do SFC real)
```

---

## 3. Decisões ratificadas

### 🔒 D1 — O contrato é DERIVADO, nunca autorado
`dss.contract.json` **não substitui** os donos por eixo. É o **agregado derivado** deles,
produzido por um gate que lê os donos reais (CSS→meta, `types.ts`, headings de prosa, selos).
Um contrato autorado à mão apenas moveria a fábrica de drift um nível acima.
- Cadeia do Princípio #12 (CSS → meta) permanece **intacta**.
- O contrato vira a **superfície única de leitura** de playground e portal — eles param de inferir.
- Resolve o tie-breaker (cada dado tem 1 dono por eixo; não há "meta vs `.md`" competindo).

### 🔒 D2 — Portal: Vue host + iframe do SFC real
A barreira de isolamento é **iframe (cross-realm)** — única que contém **overlays teleportados**
(QMenu/Dialog/Tooltip/DatePicker que vão para `document.body`). Veredito do spike de 2026-06-29:
shadow DOM isola campos mas **vaza overlays**.
- Casca Vue+DSS fora do iframe; **componente real dentro**. Mata as 89 reimplementações React.
- 89 páginas → **1 template** que deriva do contrato. React deixa de ser necessário para isolamento.
- Custo: cross-realm (entry próprio + `postMessage` de tema/brand) — confirmado funcional no spike.

### 🔒 D3 — Home da prosa: dividida por natureza
- Prosa **normativa/vinculante** (acessibilidade aplicada, anti-patterns, regras) → `Dss<Nome>.md`.
- **Orientação de uso** (quando usar / quando NÃO usar, descrição de produto, exemplos) → `README.md`.
- Gate de prosa = **presença de header**, NÃO validação de texto.

### 🔒 D4 — Contrato carrega só verdade verificável; orientação de uso é não-normativa
Refina D3. A **proveniência** da orientação de uso não é certificável, e *"quando usar"* é
**autoridade de design do DSS** — não um fato derivável do Quasar (o Quasar documenta a API, não
"use para login"). Empírico: 88/90 `*.example.vue` não têm marcador de fonte. Logo:
- `purpose.*` (quando usar / não usar / descrição) e `examples[]` **saem do contrato verificado**
  → **editorial não-normativo** (podem viver no README rotulados, sem gate de verdade).
- A prosa que **fica** só entra se for **verificável**: `a11y.wcag` (âncora em ARIA/token/teste) e
  `antiPatterns` (subconjunto = princípios com gate + `alternatives.component` existence-checked).
  O gate vira **verificação** (casar com a implementação), NÃO presença — texto sem âncora **falha**,
  matando o "escrever para passar".
- Os 90 `*.example.vue` permanecem como **demo NON-NORMATIVO** (ilustração técnica consumida pelo
  sandbox), fora do contrato e do portal-como-verdade. Promoção a normativo exige curadoria de
  autoridade de design.
- **Exceção mínima (título da página):** toda página precisa de UMA frase "o que é o componente".
  Ela vira `identity.tagline` — editorial curta (≤120 chars), com **presence-gate** (existe, não
  valida texto), **DENTRO** do contrato para preservar a superfície única de leitura. É *naming*,
  não orientação de uso. **Não extraível do Quasar** (`api.json` traz só `meta.docsUrl` + descrição
  por-prop, nunca descrição de componente).

---

## 4. Schema do contrato (provisório — a refinar)

Origem: proposta do Lovable, reenquadrada como **derivada**. `~30%` dos campos já existem
(`dss.meta.json` + `types.ts`); `~70%` precisam ser promovidos de prosa para campo estruturado —
o padrão `inject-default-preview.cjs` (que já faz isso para `visualProperties`) é replicável.

```jsonc
{
  "$schema": "dss-component-contract@1",
  "name": "DssButton",
  "version": "2.2.0",

  "identity": {
    "displayName": "Button",          // ⚠️ FALTA campo no meta (hoje inferido do nome)
    "tagline": "Ação primária de formulário.", // editorial ≤120c, presence-gate (decisão tagline)
    "category": "Form/Action",        // ✅ meta.category
    "classification": "Atomic Interactive", // ✅ meta.classification (agora OBRIGATÓRIO no schema)
    "phase": 1,                       // ✅ meta.phase
    "status": "approved",             // ✅ meta.status
    "goldenReference": "DssChip",     // ✅ meta.goldenReference
    "goldenContext": "DssChip",       // ✅
    "isGoldenSampleFor": ["documentation"] // ⚠️ FALTA (hoje implícito)
  },
  "audit": {
    "status": "approved", "date": "2026-02-13", "ncs": 0, "gaps": 0,
    "sealPath": "docs/Compliance/seals/...", // derivado do arquivo físico (F1), não de meta.seal (driftado)
    "history": [ { "date": "...", "auditor": "...", "outcome": "..." } ] // ⚠️ FALTA
  },

  // ⛔ purpose = NÃO-NORMATIVO (D4 / §4.2) — editorial, FORA do contrato verificado.
  //    Pode viver no README rotulado; nunca fonte de verdade. `alternatives.component`
  //    é existence-checked e reaproveitado por antiPatterns.
  "purpose": {
    "summary": "...", "useWhen": ["..."], "doNotUseWhen": ["..."],
    "alternatives": [{ "component": "DssChip", "reason": "..." }]
  },

  "api": {
    "props": [
      { "name": "color", "type": "'primary'|'warning'|...", "default": "primary",
        "required": false, "description": "...",
        "controlHint": "select",      // DERIVADO do type/validValues (§4.1.1) — saída, nunca autorado
        "affects": ["visual.background", "visual.text"],
        "validValues": ["..."] }
    ],                                // ⚠️ PARCIAL — types.ts tem nome/tipo; default/desc fragmentados
    "emits": [ { "name": "click", "payload": "MouseEvent", "description": "..." } ], // ⚠️ PARCIAL
    "slots": [ { "name": "default", "scope": null, "description": "...", "example": "..." } ], // ⚠️ PARCIAL
    "exposedRefs": [],                // ⚠️ FALTA
    "vModel": { "prop": "modelValue", "event": "update:modelValue" } // ⚠️ FALTA estruturado
  },

  "visual": {
    "defaultPreview": { "props": {}, "slots": {} }, // ✅ meta.defaultPreview
    "dimensions": { "minHeight": { "token": "--dss-...", "value": "44px" } },
    "states": {                       // ⚠️ FALTA estruturado (hoje só no SCSS)
      "default": {}, "hover": {}, "focus": {}, "active": {}, "disabled": {}, "loading": {}
    },
    "variants": { "size": { "xs": {}, "sm": {}, "md": {}, "lg": {} }, "density": {} },
    "brands": { "hub": { "tokensOverridden": ["--dss-action-primary"] }, "water": {}, "waste": {} }
  },

  "tokens": {
    "categories": ["spacing", "color.action", "typography.button"], // ⚠️ FALTA (hoje lista plana)
    "instances": [ { "name": "--dss-action-primary", "usedIn": ["base", "hover"],
                     "ref": "DSS_TOKEN_REFERENCE.md#action-primary" } ]
  },

  "a11y": {                           // MUST-VERIFICADO (§4.2): cada claim exige `verifiedBy`
    "wcag": [ { "criterion": "2.5.5", "level": "AAA", "implementation": "touch target ::before 48x48",
                "verifiedBy": "css" } ], // âncora: "css" (SCSS/computed) | "aria" (DOM) | "test" (*.test.js)
    "aria": { "role": "button", "states": ["aria-pressed", "aria-disabled"] }, // âncora: SFC/DOM
    "keyboard": [ { "key": "Enter", "action": "activate" } ] // âncora: *.test.js
  },

  // ⛔ examples = NÃO-NORMATIVO (D4 / §4.2) — demo ilustrativo, FORA do contrato.
  //    Snippet do playground vem do estado real dos knobs, não daqui.

  "antiPatterns": [ { "rule": "P08", "instead": "DssLink", "why": "..." } ], // MUST-VERIFICADO: deriva de bindingRules (gate) + alternativa existence-checked
  "bindingRules": [ { "id": "P01", "name": "Token First", "appliesTo": ["visual.states"] },
                    { "id": "P14", "name": "Icon Composition", "appliesTo": ["api.props.icon"] } ], // ⚠️ FALTA

  "dependencies": { "dss": ["DssIcon", "DssBadge"], "quasar": ["QBtn"], "external": [] }, // ⚠️ PARCIAL

  "sources": {                        // paths para o consumidor resolver (iframe/anatomia)
    "structure": "1-structure/DssButton.ts.vue",
    "scss": { "L2": "2-composition/_base.scss", "L3": "3-variants/_variant.scss",
              "L4": ["4-output/_states.scss", "4-output/_brands.scss"] },
    "types": "types/button.types.ts",
    "docs": { "normative": "DssButton.md", "api": "DSSBUTTON_API.md", "readme": "README.md" },
    "examples": "DssButton.example.vue",
    "tests": "DssButton.test.js",
    "seal": "docs/Compliance/seals/DssButton/...md"
  }
}
```

---

## 4.1 Contrato de consumo do Playground (leitura master)

O playground (montado no portal) é um consumidor **EXAUSTIVO e FIEL** do contrato. Ele combina
a **completude dos `Test*.vue` do sandbox** (que apresentam tudo) com a **interatividade do
playground do portal** — porém a completude agora é **DERIVADA** do contrato, não digitada à mão
(o sandbox hoje digita `VARIANTS/TYPES/SLOTS` → fonte de drift).

**Base consumida (explícita):** `dss.contract.json` — a *leitura master* / superfície única.
Sem inferência, sem template universal de controles.

**O que é consumido e como vira UI:**

| Campo do contrato | Vira no playground | Regra |
|---|---|---|
| `api.props[]` | Um controle por prop (widget = `controlHint`, senão inferido do `type`) | **TODA** prop vira knob; valor inicial = `prop.default` |
| `api.props[].validValues` (enum: cor, feedback…) | Opções do seletor (cores, feedback) | Exatamente os valores do enum — **nem mais, nem menos** |
| `visual.variants.size` | Seletor de tamanho | **SÓ** quando o componente declara variantes de tamanho |
| `visual.variants.density` / outras | Seletor correspondente | **SÓ** quando declarado na fonte |
| `api.emits[]` | Painel/log de eventos (registra ao emitir) | **TODO** evento aparece; `payload` type exibido |
| `api.slots[]` | Toggle/preenchedor de slot (conteúdo demo) | **TODO** slot exposto; slot com conteúdo > prop |
| `sources.structure` | Mount do **SFC real** no iframe | Render fiel; controles → `postMessage` |

**Regra de exaustividade-fiel (resolve o knob fantasma):** renderizar um controle para **CADA**
prop / slot / evento / variante que **EXISTE no contrato** — nem **fantasma** (controle para prop
inexistente, o erro do Playground v3.2) nem **omissão** (prop sem controle). A completude é
**limitada pela fonte de verdade**: *"quando indicado na fonte"* = **presença no contrato**.
Sem variante de tamanho declarada → sem seletor de tamanho. 5 cores no enum → exatamente 5 cores.

### 4.1.1 Derivação do `controlHint` (🔒 BATIDA)

O widget de cada knob é **derivado** da forma do `type` + `validValues` (Opção A), **nunca**
autorado por prop (sem JSDoc tag manual). Coerência: é uma **função da API** — não consegue
divergir do tipo, e não abre nova superfície de drift (D1). O `controlHint` no contrato é
**campo de saída** que o emitter computa, não input.

**Tabela de convenção (dona = governança/emitter):**

| Forma no `types.ts` | Widget derivado |
|---|---|
| `boolean` | toggle |
| union de string-literais (2–4) | segmented |
| union de string-literais (5+) | select |
| union que casa categoria de token (`color` / `feedback` / `brand`) | picker semântico |
| `number` | stepper |
| `string` livre | text input |
| `string` "longo" (ex.: `modelValue` de textarea) | textarea |

Desambiguação usa **apenas sinal já derivado** (os próprios `validValues`, vindos do tipo) —
nunca anotação nova.

**Válvula de escape (estreita, governada):** ambiguidade irredutível (ex.: `number` slider vs
stepper) resolve-se, em ordem: (1) **enriquecer o próprio tipo** para voltar a ser derivável;
(2) último caso, **override centralizado no mapa de convenção do emitter** (um lugar, auditável)
— **nunca** tags soltas por componente.

**Playground = só o explorador exaustivo (4b)** sobre a API. A seção "Casos de uso curados" (4a)
**sai**: `examples[]` é não-normativo (ver D4 / §4.2). Consome `api` + `visual.variants`.
O **snippet** vem da **configuração real dos knobs** (API real exercida), **não** de um exemplo
curado — honesto, sem alegar "uso recomendado".

**Por que isto era impossível antes:** a completude do sandbox era *fiel mas digitada* (drift);
a interatividade do portal era *inferida* (fantasma). O contrato unifica — **completude derivada**
(fiel, sem digitar) **+ interatividade sobre o SFC real no iframe**.

### 4.1.2 Nomenclatura: Playground (portal) ≠ Sandbox (🔒 BATIDA)

A palavra "playground" está sobrecarregada. Dois consumidores distintos, **nomes fixos**:
- **Playground (portal)** — explorador **exaustivo-fiel**, iframe do **SFC real**, controles
  derivados de `api`, snippet vindo do **estado dos knobs**. Consome o **contrato**.
- **Sandbox (`Test*.vue`)** — host de desenvolvimento que consome os `*.example.vue`
  **NON-NORMATIVOS**. Nunca fonte de snippet oficial nem de "uso recomendado".

Sem essa distinção formal, alguém tenta promover snippet de sandbox a snippet oficial.

---

## 4.2 Política de tiers e gate de verificação (🔒 BATIDA)

O contrato carrega **apenas verdade verificável ou derivável**. Três tipos de gate, por natureza
do dado:

| Tier | Campos | Gate | Se falhar |
|---|---|---|---|
| **MUST-derivado** | `identity`, `audit`, `api.*`, `visual.*`, `tokens`, `sources` | derivável da fonte | **BLOQUEIA** emissão |
| **MUST-verificado** | `a11y.wcag`, `antiPatterns` | claim casa com âncora real | **BLOQUEIA** (texto sem âncora falha) |
| **Editorial (não-normativo)** | `purpose.*` (quando usar/não, descrição), `examples[]` | — | não entra no contrato; vive no README rotulado, sem gate de verdade |

**Gate de verificação (a chave anti-ruído).** Para MUST-verificado o gate não checa *presença de
texto* — checa **correspondência com a implementação**:
- `a11y.wcag[].verifiedBy` é **obrigatório** e aponta para: `"aria"` (atributo no SFC/DOM),
  `"css"` (token/regra no SCSS ou computed-style medível), ou `"test"` (caso no `*.test.js`).
  Claim sem âncora → **falha**. Ferramenta automática (axe/lighthouse) cobre o estrutural; o MCP
  mede contraste/`::before` na instância renderizada.
- `antiPatterns[]` deriva dos `bindingRules` aplicáveis (cada um com gate próprio: Token First,
  `::before`, glifo cru, `@import`) + `alternatives.component` **existence-checked**. Sem prosa livre.

**Examples = demo NON-NORMATIVO.** Os 90 `*.example.vue` permanecem no repo como **ilustração
técnica** (rotulados), consumidos pelo sandbox, **fora** do contrato e do portal-como-verdade.
Nunca "uso recomendado". Racional: proveniência não certificável + *"quando usar"* é autoridade de
design do DSS, não fato do Quasar (D4). Promoção a normativo exige curadoria de autoridade de design.

**Consequência no playground/portal:** some a seção "Casos de uso curados"; o playground é só o
explorador exaustivo-fiel (4b) sobre o SFC real; o snippet vem da configuração real dos knobs.

---

## 5. Mapa dono → propaga → consome

| Seção da página | Dono (fonte) | Propaga (gate) | Campo no contrato | Status |
|---|---|---|---|---|
| Título / displayName | `dss.meta.json` | sync | `identity.displayName` | ⚠️ campo falta |
| Descrição (produto) | `README.md` (editorial) | — | `purpose.summary` | ⛔ não-normativo (D4) |
| Badges / selos | `seals/*.md` + `meta.status` | build-catalog | `audit` | ✅ existe |
| Quando usar / NÃO | `README.md` (editorial) | — | *(fora do contrato)* | ⛔ não-normativo (D4) |
| Preview ao vivo | **SFC real** | **iframe renderer** | *(mount real, não dado)* | 🔜 frame |
| Controles / knobs | `types/*.types.ts` | **build types→JSON** | `api.props.controlHint` | ⚠️ gate falta |
| Estados visuais | CSS `_states.scss` | sync-css-to-meta | `visual.states` | ⚠️ estruturar |
| Anatomia 4 camadas | estrutura SCSS real | derive (presença) | `sources` | ✅ derivável |
| Props & Eventos | `types/*.types.ts` | validate-api-docs ✅ | `api.props/emits` | ✅ existe |
| Slots | `types/*.types.ts` | validate-api-docs ✅ | `api.slots` | ✅ existe |
| Tokens | CSS→meta | sync-token-values | `tokens.categories/instances` | ⚠️ falta categoria |
| Acessibilidade | SFC/ARIA + SCSS + `*.test.js` | **gate de verificação** | `a11y.wcag` (+`verifiedBy`) | ⚠️ estruturar+ancorar |
| Anti-patterns | `bindingRules` (princípios c/ gate) | derive+verify | `antiPatterns` | ⚠️ estruturar |
| Regras vinculantes | `meta` + CLAUDE.md | derive | `bindingRules.appliesTo` | ⚠️ falta link |
| Snippet | estado dos knobs (API real) | runtime | *(do playground)* | ✅ honesto |
| Exemplos | `*.example.vue` | — | *(fora do contrato)* | ⛔ demo não-normativo (D4) |

---

## 6. Superfície a fechar antes dos componentes

**Documento (fonte de verdade)**
- (C) Criar/promover campos: `displayName`, `description` (produto), `tokenTypes`/categorias,
  `visual.states` estruturado, `a11y.wcag` estruturado, `bindingRules.appliesTo`, `examples` estruturados.
- (E) Home da prosa: split — normativo no `.md`, uso no `README`.

**Governança (regras)**
- (A) Schema do contrato + JSON Schema validável.
- (I) Registrar a regra "estrutural vence humano onde competem" e forçá-la em CI (mata o tie-breaker).
- (J) Consolidação documental 5→1 (o contrato v2.4 já absorve `DSS_DEFAULT_PREVIEW_WORKFLOW`,
  `PROMPT_DEFAULT_PREVIEW_EXTRACTION`, `COMPONENT_DOCUMENTATION_CHECKLIST`,
  `PLAYGROUND_COMPLIANCE_CHECKLIST`, `PLAYGROUND_STANDARD`; **remoção física é etapa pós-POC**).
- (L) "Definition of Done de derivação" no fluxo de adequação de UI.

**Automação (propaga)**
- (B) O gate que **emite** o contrato a partir dos donos por eixo.
- (N) ✅ **Resolvido:** `scripts/extract-css-states.mjs` compila o `.module.scss`→CSS plano (sass) e
  deriva `visual.states` (postcss + sourcemap p/ `source`). 88/88 compilam; saída 100% conforme ao
  schema. **Reframe do diagnóstico:** o risco "reprova ~80 componentes" não se aplica — o schema exige
  só o *container* `states`, não estados específicos; um não-interativo tem só `default`. O gap real
  era o **meta** (`visualProperties` sub-povoado), que o contrato **contorna** derivando do CSS.
- (O) ✅ **Resolvido:** `scripts/wcag-kit.mjs` — âncora `css` sem browser (O1): `expectContrastAA`/
  `checkContrast` (token-math WCAG por brand/theme) + `hasCssRule` (focus ring / touch target no CSS
  compilado). Prova: reproduz o achado do Storybook — action-primary+branco falha AA (hub **2.81 ❌**,
  azuis 3.7–3.8 só grande/UI, waste 4.9 ✅). Âncoras `aria`/`test` vivem na camada de teste (wiring = passo 2).
  ⚠️ **Débito de componente descoberto:** contraste de `action-primary`+branco falha AA em hub/water/default
  (texto normal) — a tratar na fase de componentes, não agora.
- (D) Build `types.ts → controls.json` (mata os knobs fantasma do Playground v3.2).
- (E) Gates de prosa por natureza: **verificação** em a11y (7.4) e anti-patterns (8);
  vinculantes (9) **derivam** de meta; descrição/quando-usar (2/3) são **não-normativos** (sem gate).
- (F) ✅ **Resolvido (F1):** `sealPath` = **arquivo físico** `docs/Compliance/seals/…` (casing alinhado
  ao disco/scripts); o emissor **deriva** do arquivo, não do `meta.seal` driftado (38/89, 4 formatos).
  Nada a migrar. *(Higiene CRLF→LF segue pendente à parte.)*

**Código / Playground / Portal**
- (G) **Preview Frame**: arquitetura do iframe — entry próprio + `postMessage` de tema/brand +
  conter overlays teleportados. *(O "assassino silencioso" — resolver antes de migrar
  Select/DatePicker/ColorPicker/Dialog/BottomSheet/Menu/Tooltip.)*
- (H) Snippet vem do **estado real dos knobs** (API exercida); `examples[]` não alimenta o contrato.
- (M) Rotular os 90 `*.example.vue` como **NON-NORMATIVO** (demo ilustrativo) e mantê-los fora do
  portal-como-verdade; sandbox segue consumindo.

**Volume (após espinha provada)**
- (K) Ancoragem da prosa **verificável**: `a11y.wcag` + `verifiedBy` por componente. Orientação de
  uso (quando usar/não) **não** é backfillada (não-normativa, D4).

---

## 7. Sequência (por dependência) — atualizada pós-revisão da equipe

1. ✅ **Schema fechado** (`dss.contract.schema.json` validável, provado com Ajv). **Feito.**
2. **Pré-requisitos BLOQUEANTES do emissor** (correção de sequência da revisão — antes eram backlog):
   - ✅ **Extrator CSS→meta de estados** (`scripts/extract-css-states.mjs`): compila `.module.scss`→CSS
     plano e deriva `visual.states` (pseudo-classes + BEM `--state`, excluindo `[data-theme]`), com
     `source` via sourcemap. 88/88 compilam. **Correção do diagnóstico:** o schema exige só o container
     `states`, então nada é "reprovado" por não ter loading; cada componente tem os estados que o CSS
     realmente tem (default 86, hover/focus 42, active 32, disabled 36, loading 4 — de 88).
   - ✅ **Kit de asserções WCAG** (`scripts/wcag-kit.mjs`): `expectContrastAA(fgToken,bgToken,{brand,theme})`
     (resolve o token→cor e calcula o ratio WCAG, sem render) + `hasCssRule` (presença de focus ring/
     touch target no CSS compilado). Reproduz o achado do Storybook sem React. Âncoras aria/test = camada de teste.
3. **Gate emissor** lendo os donos por eixo, validado no **DssInput**. Riscos a cravar:
   trio de overlays (Select + Dialog aninhado + Tooltip) no iframe; parser de `displayName` com siglas
   (`DssSPCReport`) + override no meta (teste-primeiro); `sealPath` **derivado do arquivo físico**
   (F1, casing `Compliance` alinhado ao disco — sem migração); `tokens[]` legado em **migração de 2 fases**.
4. **Preview Frame** (iframe: entry + `postMessage` de tema/brand + conter overlays) + snippet dos knobs.
5. Gates de prosa (verificação a11y/anti-patterns) + higiene (CRLF→LF, casing, `types→controls JSON`).
6. Governança escrita (I/J/L) + **reconciliação da spec com D4** (feita, v2.5) + backfill verificável (K).

> A espinha (contrato + emissor + frame) é **provada no DssInput** antes de escalar.
> DssButton só vira referência se passar antes pela adequação de UI da família Select.

---

## 8. Referências

- `docs/specs/COMPONENT_PAGE_STRUCTURE.md` v2.4 — contrato de derivação das 11 seções (downstream desta cadeia).
- `docs/governance/PROMPT_DIRECIONADOR_CONSOLIDACAO_SANDBOX_ISOLAMENTO.md` — origem do spike de isolamento.
- `CLAUDE.md` — Princípios #1 (Token First), #12 (CSS fonte de verdade), #13 (Cascade Layers), #14 (Composição de Ícone).
- Spike de isolamento (2026-06-29): veredito iframe > shadow DOM (overlays teleportados).
- POC DssInput (2026-06-29): derivação validada; achados de gap que alimentam §6.
