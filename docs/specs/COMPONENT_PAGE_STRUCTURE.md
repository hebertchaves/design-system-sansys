# Estrutura Padrão para Páginas de Componentes DSS

**Versão 2.4 — Junho 2026**

Este documento define a **estrutura normativa, visual e semântica** para todas as páginas de componentes do **Design System Sansys (DSS)**, e o **contrato de derivação** que torna essas páginas **consumidoras puras** dos artefatos canônicos do componente.

> **Natureza vinculante.** Este arquivo é a **fonte da verdade** para a geração de páginas de componentes. Qualquer host de documentação (e qualquer agente de IA que gere páginas) DEVE seguir este documento literalmente, sem inferências, simplificações ou reorganizações estruturais.

> **Mudança da v2.3 → v2.4.** A v2.3 instruía a IA a **redigir** cada seção (inferindo dos docs). A v2.4 inverte: cada seção **deriva** de um artefato canônico declarado; a página é uma **view pura**; nenhum conteúdo editorial vive no host/portal; o preview é **iframe sobre o componente real**, nunca reimplementação. Veja o **Contrato de Derivação** abaixo.

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
| 1 | Badges / selos | `docs/compliance/seals/…` + `catalog.json` | `build-catalog.cjs` ✅ |
| 2 | Título e descrição | `README.md` (H1 + intro) / `dss.meta.json` | ⚠️ gap (presença) |
| 3 | Quando usar / NÃO usar | `README.md` (seções) | ⚠️ gap (presença) |
| 4a | Playground — controles (props/valores) | `types/*.types.ts` (unions) + `dss.meta.json` (eixos) | `validate-api-docs.cjs` ✅ |
| 4b | Playground — **preview ao vivo** | **iframe sobre `DssX.example.vue`** | `validate-demo-registry.cjs` + contrato example.vue |
| 4c | Snippet de código | gerado do estado das props | mecânico |
| 5 | Estados interativos | `dss.meta.json` (`visualProperties`) | `sync-visual-contract.js` ✅ |
| 6 | Anatomia 4 camadas | arquivos SCSS reais + `dss.meta.json` | existência (parcial) |
| 7.1 | Props API & Eventos | `types/*.types.ts` + `DSSX_API.md` | `validate-api-docs.cjs` ✅ |
| 7.2 | Slots | `types/*.types.ts` + `DSSX_API.md` | `validate-api-docs.cjs` ✅ |
| 7.3 | Tokens (tipos) | `dss.meta.json` (`visualProperties` / `tokens`) | `sync-css-to-meta` + `sync-visual-contract` ✅ |
| 7.4 | Acessibilidade WCAG | `README.md` (prosa) | ⚠️ gap (presença) |
| 8 | Anti-patterns | `README.md` (prosa humana) | ⚠️ gap (presença) |
| 9 | Vinculantes DSS v2.2 | `dss.meta.json` (pseudo-elem / brightness / classificação) | ⚠️ gap (campo meta) |
| 10 | Referências normativas | links estáticos / `dss.meta.json` | mecânico |

> **Estado dos gates (jun/2026):** o esqueleto duro (API, slots, tokens, visual, preview, selos) **já é gated**. Os 5 ⚠️ são **prosa/meta** — fecham-se com gates de presença + backfill do conteúdo no doc canônico. Esses gates são **downstream deste contrato** (este doc os define; eles o aplicam).

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

> **Deriva de:** `docs/compliance/seals/…` + `catalog.json` · **Gate:** `build-catalog.cjs` ✅

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
DSS/docs/compliance/seals/<NomeDoComponente>/<NOME_DO_COMPONENTE>_SELO_v2.2.md
```

Regras:

- Se o arquivo existir → exibir o badge correspondente
- Se o arquivo NÃO existir → NÃO inferir conformidade
- É proibido assumir selo ou status sem arquivo explícito

---

### 2. Título e Descrição do Componente ⭐ OBRIGATÓRIO

> **Deriva de:** `README.md` (H1 + intro) / `dss.meta.json` · **Gate:** ⚠️ presença (a fechar)

Usar o componente de cabeçalho de página do host (`PageHeader` ou equivalente Vue).

#### 2.1 Título

- Nome do componente (ex: **DssAvatar**)
- Ícone representativo

#### 2.2 Descrição (Regra Reforçada)

A descrição é **parte crítica da documentação** e DEVE ser orientada a **produto e decisão de uso**. Ela mora no `README.md` do componente; a página a renderiza.

A descrição DEVE responder, em texto corrido:

1. Qual o **papel do componente no produto**
2. Que tipo de **ação, informação ou identidade** ele representa
3. Em quais **contextos de interface** ele aparece
4. Como ele se **relaciona com outros componentes**

##### Exemplo correto (referência normativa):

> **DssButton** é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar. Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso, podendo ser utilizado de forma isolada ou aninhado dentro de outros componentes interativos.

##### Exemplo incorreto (PROIBIDO):

> “Componente visual com suporte a tokens e WCAG.”

Regras:

- Mínimo de 2 frases
- Máximo de 4 frases
- Linguagem de UX + Produto
- Não listar features técnicas

---

### 3. Quando Usar / Quando NÃO Usar ⭐ OBRIGATÓRIO

> **Deriva de:** `README.md` (seções `## Quando usar` / `## Quando NÃO usar`) · **Gate:** ⚠️ presença (a fechar)

Seção orientada à **decisão de produto**.

#### Formato obrigatório

```markdown
#### ✅ Quando Usar

- Caso de uso orientado a produto
- Caso de uso orientado a UX
- Caso de uso recorrente

#### ❌ Quando NÃO Usar

| Cenário            | Alternativa Recomendada |
| ------------------ | ----------------------- |
| Cenário inadequado | `OutroComponente`       |
```

Regras:

- Mínimo de 3 itens em cada bloco
- Sempre indicar alternativa

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

### 7.4 Acessibilidade WCAG ⭐ OBRIGATÓRIO

> **Deriva de:** `README.md` (seção `## Acessibilidade`) · **Gate:** ⚠️ presença (a fechar)

- Tabela de conformidade WCAG
- Touch Target vs Altura Visual
- Media queries de acessibilidade

---

### 8. Anti-patterns ⭐ OBRIGATÓRIO

> **Deriva de:** `README.md` (prosa humana) · **Gate:** ⚠️ presença (a fechar)

- Mínimo de 3 usos incorretos
- Exemplo incorreto + correto
- Combinações não permitidas (se aplicável)

---

### 9. Vinculantes DSS v2.2 ⭐ OBRIGATÓRIO

> **Deriva de:** `dss.meta.json` (pseudo-elem / brightness / classificação) · **Gate:** ⚠️ campo meta (a fechar)

- Uso de pseudo-elementos (`::before` / `::after`)
- Declaração de `brightness()` (ou não uso)
- Classificação do componente (Action / Compact / Visual)

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
