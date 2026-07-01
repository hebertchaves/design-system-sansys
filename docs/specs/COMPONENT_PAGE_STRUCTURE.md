# Estrutura Padrão para Páginas de Componentes DSS

**Versão 2.5 — Julho 2026**

Este documento define a **estrutura normativa, visual e semântica** para todas as páginas de componentes do **Design System Sansys (DSS)**, e o **contrato de derivação** que torna essas páginas **consumidoras puras** dos artefatos canônicos do componente.

> **Natureza vinculante.** Este arquivo é a **fonte da verdade** para a geração de páginas de componentes. Qualquer host de documentação (e qualquer agente de IA que gere páginas) DEVE seguir este documento literalmente, sem inferências, simplificações ou reorganizações estruturais.

> **Mudança da v2.3 → v2.4.** A v2.3 instruía a IA a **redigir** cada seção (inferindo dos docs). A v2.4 inverte: cada seção **deriva** de um artefato canônico declarado; a página é uma **view pura**; nenhum conteúdo editorial vive no host/portal; o preview é **iframe sobre o componente real**, nunca reimplementação. Veja o **Contrato de Derivação** abaixo.

> **Mudança da v2.4 → v2.5 (reconciliação com D4 do Blueprint).** Distinção de **tiers por verificabilidade** (`DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` §4.2): (a) a **descrição** vira `identity.tagline` (editorial curta, presence-gate); (b) **Quando usar / NÃO usar** e os `example.vue` são **NÃO-NORMATIVOS** (editorial, sem gate de verdade); (c) **Acessibilidade** e **Anti-patterns** passam de *presença* para **verificação** (âncora `verifiedBy` = `aria`|`css`|`test`; anti-pattern deriva de princípio+gate + alternativa existence-checked). Nenhuma seção "escrita para passar" sobrevive ao gate de verificação.

---

## 🔒 Contrato de Derivação (Princípio Vinculante)

A página de um componente é uma **VIEW**. Ela **não inventa** e **não hospeda** conteúdo.

1. **Cada seção deriva de UM artefato canônico** (tabela de-para abaixo). A página lê dele; nunca redigita.
2. **Prosa humana mora no doc canônico do componente** (`README.md`), governado pelo piso mínimo do `CLAUDE.md` — a página apenas a **renderiza**. Nada editorial vive no host/portal.
3. **Preview = iframe sobre `DssX.example.vue`** (o componente real). ❌ NUNCA reimplementar o componente no host (em React, em HTML cru, ou em qualquer framework). Liga-se ao veredito do spike de isolamento: a barreira fiel é o **iframe** (isola campos *e* overlays teleportados).
4. **Derivação gated vence prosa livre.** Onde existe gate de drift, a seção é derivada e o gate impede defasagem. Onde a seção é prosa, vale um **gate mínimo de presença** (o header obrigatório existe no `README.md`) — não valida o texto, valida que a seção existe.

### De-para: Seção → Artefato dono → Gate de drift

| # | Seção | Artefato dono (fonte de verdade) | Gate de drift |
|---|---|---|---|
| 1 | Badges / selos | `docs/Compliance/seals/…` (arquivo físico) + `catalog.json` | `build-catalog.cjs` ✅ |
| 2 | Título e descrição | `contract.identity` (displayName + **tagline** ≤120c editorial) | presença (tagline existe) |
| 3 | Quando usar / NÃO usar | `README.md` (editorial) | **não-normativo** (sem gate) |
| 4a | Playground — controles (props/valores) | `types/*.types.ts` (unions) + `dss.meta.json` (eixos) | `validate-api-docs.cjs` ✅ |
| 4b | Playground — **preview ao vivo** | **iframe sobre `DssX.example.vue`** | `validate-demo-registry.cjs` + contrato example.vue |
| 4c | Snippet de código | gerado do estado das props | mecânico |
| 5 | Estados interativos | `dss.meta.json` (`visualProperties`) | `sync-visual-contract.js` ✅ |
| 6 | Anatomia 4 camadas | arquivos SCSS reais + `dss.meta.json` | existência (parcial) |
| 7.1 | Props API & Eventos | `types/*.types.ts` + `DSSX_API.md` | `validate-api-docs.cjs` ✅ |
| 7.2 | Slots | `types/*.types.ts` + `DSSX_API.md` | `validate-api-docs.cjs` ✅ |
| 7.3 | Tokens (tipos) | `dss.meta.json` (`visualProperties` / `tokens`) | `sync-css-to-meta` + `sync-visual-contract` ✅ |
| 7.4 | Acessibilidade WCAG | SFC/ARIA + SCSS + `*.test.js` (`contract.a11y`) | **verificação** (`verifiedBy`) |
| 8 | Anti-patterns | `contract.bindingRules` (princípios+gate) + alternativa existence-checked | **verificação** (deriva) |
| 9 | Vinculantes DSS v2.2 | `dss.meta.json` → `contract.bindingRules` + `identity.classification` | campo meta (`classification` obrigatório) |
| 10 | Referências normativas | links estáticos / `dss.meta.json` | mecânico |

> **Estado dos gates (jul/2026, pós-D4):** o esqueleto duro (API, slots, tokens, visual, preview, selos) **já é gated**. Descrição = presence-gate da `tagline`. Quando usar/NÃO = **não-normativo** (sem gate). a11y e anti-patterns = **gate de verificação** (âncora obrigatória, não presença) — dependem do **extrator CSS→meta de estados** e do **kit de asserções WCAG** (pré-requisitos, Blueprint §7.2). Esses gates são **downstream deste contrato** (este doc os define; eles o aplicam).

### Consolidação (enxugar, não somar)

Este contrato **absorve e supersede** os documentos abaixo, que devem ser marcados como deprecated e redirecionados para cá na onda de consolidação:

- `docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md`
- `docs/governance/PROMPT_DEFAULT_PREVIEW_EXTRACTION.md`
- `docs/specs/COMPONENT_DOCUMENTATION_CHECKLIST.md`
- `docs/PLAYGROUND_COMPLIANCE_CHECKLIST.md`
- `docs/PLAYGROUND_STANDARD.md` (referenciado na seção 4)

> 5 docs → 1 contrato. A remoção física é uma etapa separada (após o POC validar o contrato).

---

## 🧭 Princípios Estruturais (Leitura Obrigatória)

Antes de aplicar a hierarquia abaixo, o host/agente DEVE respeitar:

1. **A estrutura da página é definida por ESTE contrato** (não por imitar uma página existente).
2. **Não existe uma seção genérica chamada “Documentação Técnica”.**
3. Cada bloco colapsável representa **uma seção independente da página**, no mesmo nível hierárquico.
4. Seções técnicas **NÃO DEVEM ser agrupadas dentro de um único container colapsável**.
5. O objetivo da página é **orientar decisão, uso correto e implementação**, não apenas exibir API.

> ⚠️ Qualquer variação estrutural em relação a este documento é considerada **erro de conformidade**.

---

## 📋 Hierarquia Oficial de Seções

As páginas de componentes DEVEM seguir **exatamente** a ordem abaixo. Cada seção abre com sua linha de **derivação** (artefato dono · gate).

---

### 1. Badges de Metadados ⭐ OBRIGATÓRIO

> **Deriva de:** `docs/Compliance/seals/…` (arquivo físico) + `catalog.json` · **Gate:** `build-catalog.cjs` ✅

Exibidos no topo da página:

- Versão do componente (ex: `v2.3.0`)
- Compatibilidade (ex: `Quasar Compatible`)
- Status normativo:
  - `Selo DSS v2.2`
  - `Golden Component (normativo)` (se aplicável)
- Links de referência normativa

#### Fonte de verdade dos selos de conformidade

O host DEVE verificar explicitamente a existência de selos no caminho:

```
docs/Compliance/seals/<NomeDoComponente>/<NOME_DO_COMPONENTE>_SELO_v2.2.md
```

> **Item F (resolvido — F1).** A verdade do selo é o **arquivo físico** em `docs/Compliance/seals/…`
> (o disco e os 3 scripts — `build-catalog.cjs`, `generate-portal-landing-pages.js`, `hooks/pre-commit`
> — já são consistentes nesse casing). O emissor **deriva** o `sealPath` do arquivo físico (glob),
> **não** do campo `meta.seal` — que driftou (só 38/89 componentes, em formatos incompatíveis: path,
> id, version-string). Nada a migrar; nenhuma edição de `meta.seal` necessária.

Regras:

- Se o arquivo existir → exibir o badge correspondente
- Se o arquivo NÃO existir → NÃO inferir conformidade
- É proibido assumir selo ou status sem arquivo explícito

---

### 2. Título e Descrição do Componente ⭐ OBRIGATÓRIO

> **Deriva de:** `contract.identity` (displayName + tagline) · **Gate:** presença (a `tagline` existe)

Usar o componente de cabeçalho de página do host (`PageHeader` ou equivalente Vue).

#### 2.1 Título

- Nome do componente (ex: **DssAvatar**)
- Ícone representativo

#### 2.2 Descrição

> **Deriva de:** `contract.identity.tagline` · **Gate:** presença (a `tagline` existe)

A descrição da página é **UMA frase editorial curta** (`identity.tagline`, ≤120 chars), com
**presence-gate** (existe, não valida o texto). É a exceção mínima ao "só verificável" (Blueprint
D4): é *naming*, não orientação de uso, e mora no contrato para preservar a superfície única de leitura.

- ✅ Curta, linguagem de produto. Ex.: *"Ação primária de formulário."*
- ❌ Feature técnica. Ex.: *"Componente visual com suporte a tokens e WCAG."*

> **Narrativa estendida** (papel no produto, relação com outros componentes) é **editorial
> NÃO-NORMATIVA**: pode viver no `README.md`, sem gate de verdade — proveniência não certificável (D4).

---

### 3. Quando Usar / Quando NÃO Usar — NÃO-NORMATIVO (editorial)

> **Deriva de:** `README.md` (editorial) · **Gate:** nenhum (não-normativo, D4)

Orientação de uso é **autoridade de design do DSS**, não um fato derivável ou verificável
(proveniência não certificável — Blueprint D4). Portanto **sai do contrato** e **não tem gate de
verdade**. Pode viver no `README.md` como editorial, curada por autoridade de design; o
portal-como-verdade **não** a consome.

> Formato sugerido (não obrigatório): blocos ✅ Quando Usar / ❌ Quando NÃO Usar, este último com
> **alternativa** — o componente-alternativo é o único dado *existence-checkable*, reaproveitado por
> `contract.antiPatterns.instead`.

---

### 4. Playground Interativo ⭐ OBRIGATÓRIO

> **Deriva de:** controles ← `types/*.types.ts` + `dss.meta.json` · preview ← **iframe sobre `DssX.example.vue`** · **Gate:** `validate-api-docs.cjs` ✅ + `validate-demo-registry.cjs`

- **Preview central = iframe sobre o componente real** (`DssX.example.vue`). ❌ NUNCA um preview reimplementado no host.
- Controles interativos **derivados** dos type unions / meta (nunca arrays digitadas à mão).
- Código gerado em tempo real a partir do estado das props.
- Toggle Light / Dark Mode (propagado para dentro do iframe).
- Exclusividade Brand ↔ Color.

> O preview aparece **antes** de anatomia e documentação técnica. O contrato de isolamento (iframe) substitui o antigo `PLAYGROUND_STANDARD.md`.

---

### 5. Estados Interativos ⭐ OBRIGATÓRIO

> **Deriva de:** `dss.meta.json` (`visualProperties`) · **Gate:** `sync-visual-contract.js` ✅

Os estados DEVEM ser documentados em **uma tabela única**, clara e comparável.

#### Formato obrigatório

```markdown
| Estado   | Visual             | Interação             | Tokens Aplicados         | Acessibilidade  |
| -------- | ------------------ | --------------------- | ------------------------ | --------------- |
| Default  | Aparência padrão   | Pronto para interação | `--dss-*`                | —               |
| Hover    | Alteração visual   | Pointer over          | Tokens de hover          | —               |
| Focus    | Focus ring visível | Teclado               | `--dss-focus-ring`       | WCAG 2.4.7      |
| Active   | Pressionado        | Clique / toque        | Tokens de active         | —               |
| Disabled | Opacidade reduzida | Não interativo        | `--dss-opacity-disabled` | `aria-disabled` |
| Loading  | Feedback visual    | Bloqueia interação    | Tokens de estado         | `aria-busy`     |
```

Regras:

- Loading é obrigatório apenas se aplicável
- Tokens e critérios WCAG DEVEM ser explícitos

---

### 6. Anatomia 4 Camadas ⭐ OBRIGATÓRIO

> **Deriva de:** arquivos SCSS reais (`1-structure/`…`4-output/`) + `dss.meta.json` · **Gate:** existência (parcial)

Usar o componente `AnatomySection` (ou equivalente Vue) com as camadas:

1. Structure
2. Composition
3. Variants
4. Output

Cada camada DEVE declarar:

- Responsabilidades
- Arquivos relacionados
- Tipos de tokens envolvidos

---

## 7. Seções Técnicas (Colapsáveis e Independentes) ⭐ OBRIGATÓRIO

Cada item abaixo é uma **seção colapsável independente**, no mesmo nível hierárquico.

> ❌ É proibido agrupar essas seções dentro de um container genérico.

---

### 7.1 Props API & Eventos

> **Deriva de:** `types/*.types.ts` + `DSSX_API.md` · **Gate:** `validate-api-docs.cjs` ✅

- Tabela de Props (agrupadas por categoria)
- Tabela de Eventos emitidos

Regras:

- Se não houver eventos, declarar explicitamente a ausência

---

### 7.2 Slots

> **Deriva de:** `types/*.types.ts` + `DSSX_API.md` · **Gate:** `validate-api-docs.cjs` ✅

- Tabela de slots disponíveis
- Uso recomendado

Regras:

- Se não houver slots, declarar explicitamente

---

### 7.3 Tokens ⭐ OBRIGATÓRIO

> **Deriva de:** `dss.meta.json` (`visualProperties` / `tokens`) · **Gate:** `sync-css-to-meta` + `sync-visual-contract` ✅

Esta seção documenta **capacidade**, não instância.

❌ PROIBIDO listar tokens individuais

✅ OBRIGATÓRIO declarar **TIPOS DE TOKENS aceitos** pelo componente

#### Estrutura obrigatória

```markdown
### Tokens

Este componente aceita os seguintes tipos de tokens DSS:

| Tipo de Token    | Papel no Componente      | Referência             |
| ---------------- | ------------------------ | ---------------------- |
| Cores Semânticas | Estados e feedback       | DSS_TOKEN_REFERENCE.md |
| Brand Tokens     | Identidade visual        | DSS_TOKEN_REFERENCE.md |
| Dimensões        | Tamanhos e touch targets | DSS_TOKEN_REFERENCE.md |
| Tipografia       | Texto auxiliar           | DSS_TOKEN_REFERENCE.md |
| Bordas           | Forma visual             | DSS_TOKEN_REFERENCE.md |
| Motion           | Transições               | DSS_TOKEN_REFERENCE.md |
```

---

### 7.4 Acessibilidade WCAG ⭐ OBRIGATÓRIO — VERIFICADA

> **Deriva de:** `contract.a11y` (SFC/ARIA + SCSS + `*.test.js`) · **Gate:** **verificação** (`verifiedBy` obrigatório)

Cada critério WCAG carrega uma **âncora** (`verifiedBy` = `aria` | `css` | `test`) que **casa com a
implementação real** — não é prosa. Claim sem âncora **falha o gate** (mata o "escrever para passar").
Pré-requisito: **kit de asserções WCAG** reutilizável (Blueprint §7.2).

- Tabela WCAG derivada de `contract.a11y.wcag` (critério, nível, implementação, âncora)
- Touch Target vs Altura Visual (âncora `css` / computed)
- `aria` (role/estados) ancorado no SFC/DOM; teclado ancorado em `*.test.js`

---

### 8. Anti-patterns ⭐ OBRIGATÓRIO — DERIVADO

> **Deriva de:** `contract.antiPatterns` (princípios com gate + alternativa existence-checked) · **Gate:** **verificação** (deriva de `bindingRules`)

Sem prosa livre. Cada anti-pattern deriva de um **princípio vinculante com gate** (`rule` = P01…P14)
e/ou aponta um **componente-alternativo existence-checked** (`instead`). O racional (`why`) é a única
frase humana, opcional. Substitui o "mínimo 3 usos incorretos" redigido à mão (que não era verificável).

---

### 9. Vinculantes DSS v2.2 ⭐ OBRIGATÓRIO

> **Deriva de:** `dss.meta.json` → `contract.bindingRules` + `contract.identity.classification` · **Gate:** campo meta (`classification` OBRIGATÓRIO)

- Uso de pseudo-elementos (`::before` / `::after`) → `bindingRules` (P08)
- Declaração de `brightness()` (ou não uso) → `bindingRules` (P09)
- Classificação do componente (Action / Compact / Visual) → `identity.classification` (obrigatório no schema)

---

### 10. Referências Normativas ⭐ OBRIGATÓRIO

> **Deriva de:** links estáticos / `dss.meta.json` · **Gate:** mecânico

Links explícitos para:

- DSS_TOKEN_REFERENCE.md
- DSS_COMPONENT_ARCHITECTURE.md
- DSS_GOLDEN_COMPONENTS.md
- Selo de conformidade do componente (se existir)

---

### 11. Modo de Operação do Host (e de agentes geradores) ⭐ OBRIGATÓRIO

O host/agente DEVE:

- ❌ Não inferir tokens, selos ou status
- ❌ Não simplificar seções
- ❌ **Não reimplementar o componente** — o preview é sempre **iframe sobre `DssX.example.vue`**
- ✅ **Derivar** cada seção do artefato dono declarado no Contrato de Derivação
- ✅ Referenciar sempre documentos oficiais

---

**Mantido por:** Hebert Chaves
**Status:** Documento Normativo — Contrato de Derivação
**Versão:** 2.4.0
**Atualizado em:** Junho 2026
