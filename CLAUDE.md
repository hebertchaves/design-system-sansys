# CLAUDE.md — Design System Sansys (DSS)

Guia oficial para agentes de IA (Claude Code e similares) ao trabalhar no **Design System Sansys (DSS)**.

Este documento é **normativo**. O não cumprimento de qualquer regra aqui descrita invalida o componente criado.

---

## 📌 Contexto do Projeto

O **Design System Sansys (DSS)** é uma camada corporativa de design e engenharia construída **sobre o Quasar Framework**, e **não** uma biblioteca standalone.

O DSS fornece:
- Tokens semânticos
- Brandabilidade
- Governança visual e técnica
- Acessibilidade WCAG 2.1 AA
- Padronização de componentes Vue

### Produtos suportados
- **Sansys Hub** (laranja)
- **Sansys Water** (azul)
- **Sansys Waste** (verde)

---

## 📜 Natureza Normativa deste Documento (OBRIGATÓRIO)

Este arquivo (**CLAUDE.md**) é um **documento normativo vinculante** para qualquer agente de IA que produza, modifique ou revise código, documentação ou arquitetura do Design System Sansys (DSS).

⚠️ **IMPORTANTE**
- As regras aqui descritas NÃO são sugestões.
- O agente NÃO deve inferir, resumir ou reinterpretar requisitos.
- O não cumprimento de qualquer regra aqui descrita é considerado **erro de implementação**.

---

## 🚨 Leitura Obrigatória (ANTES de criar qualquer componente)

> ### 🎯 Adequando a UI de um componente (variantes / dark mode / cascade Quasar)?
> **Leia `docs/governance/DSS_UI_ADEQUACAO_CHECKLIST.md` ANTES de editar SCSS/variantes.**
> - **Razão:** padrões de erro de cascade DSS×Quasar, dark mode e standout recorreram
>   em DssInput/DssSelect; o checklist mapeia sintoma → causa-raiz → fix canônico.
> - **Gate (por componente, LIGHT e DARK):** rodar o "Gate de adequação" do checklist
>   antes de marcar a UI como pronta.

A criação de qualquer componente DSS **exige leitura prévia** dos seguintes arquivos, **nesta ordem**:

0. `docs/AGENT_QUICKSTART.md` *(ponto único de entrada — leia PRIMEIRO para orientação geral e mapa de navegação)*
1. `docs/reference/PRD_DSS.md`
2. `docs/reference/DSS_ARCHITECTURE.md`
3. `docs/reference/DSS_COMPONENT_ARCHITECTURE.md`
4. `docs/guides/DSS_IMPLEMENTATION_GUIDE.md`
5. `docs/reference/DSS_TOKEN_REFERENCE.md`
6. `docs/governance/CERTIFIED_COMPONENTS.md` *(índice de selos — 19/19 Fase 1 + 68/68 Fase 2)*
7. `docs/archive/reports/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md` *(arquivado pós-estabilização Fase 1)*
8. `docs/archive/reports/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md` *(arquivado pós-estabilização Fase 2)*
9. `.github/pull_request_template.md`
10. `docs/governance/DSS_MONOREPO_PATH_MAP.md` *(mapeamento canônico de caminhos do Monorepo — obrigatório para qualquer importação SCSS ou JS/TS entre pacotes)*
11. `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` *(Contrato Visual Canônico — espelho human-readable do campo `defaultPreview` de todos os `dss.meta.json`. A seção de dados é **auto-gerada** via `npm run sync:visual-contract`. Autoridade Nível 1 sobre aspectos visuais padrão. Ler sempre que implementar ou auditar o aspecto visual default de qualquer componente.)*
12. `docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md` *(Workflow do Preview Data-Driven — descreve os campos `previewGroup` e `demoSlots` do `dss.meta.json`, o componente `DemoRenderer.vue`, os scripts de manutenção e o pre-commit hook. Leitura obrigatória antes de modificar any campo de preview ou o sandbox.)*
13. `docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md` *(Contrato de Composição de Ícone — materializa o Princípio #14. Define o `DssIcon` como primitivo único de ícone, as regras de prop/slot/a11y, a proibição de glifo cru e o gate de verificação. Leitura obrigatória antes de implementar ou modificar qualquer renderização de ícone em componente.)*

⚠️ **IMPORTANTE**  
Nunca inferir padrões apenas observando um componente existente.  
O **DssButton é referência**, não fonte única de verdade.

---

## 🧱 Princípios Fundamentais do DSS (NÃO VIOLAR)

1. **Token First**
   - ❌ Nenhum valor hardcoded (px, rem, hex, rgb)
   - ✅ Sempre `var(--dss-*)`

2. **Sass Module System — @import PROIBIDO**
   - ❌ `@import` é **estritamente proibido** em todos os arquivos SCSS novos e refatorados
   - ✅ Usar `@use 'path/to/module' as alias;` para importações
   - ✅ Usar `@forward 'path/to/module';` para reexportações em orquestradores
   - Razão: `@import` está depreciado no Dart Sass 1.40+ e será removido no Sass 3.0 (Onda 3 migrou 100% do codebase)

3. **Cores seguem o padrão Quasar**
   - ❌ Não criar `_colors.scss` por componente
   - ❌ Não aplicar cores no SCSS
   - ✅ Classes utilitárias globais (`bg-*`, `text-*`)
   - ✅ Aplicação via computed properties no Vue

4. **Arquitetura em 4 Camadas (Obrigatória)**
   - Nenhuma camada pode ser omitida
   - Camadas com pouco conteúdo continuam existindo

5. **Acessibilidade não é opcional**
   - WCAG 2.1 AA
   - Focus visível
   - Touch target ≥ 48px
   - Navegação por teclado

6. **Brandabilidade**
   - Componentes reagem a `[data-brand="hub|water|waste"]`
   - Tokens de brand com fallback semântico

7. **Tokens Genéricos para Altura (VINCULANTE)**
   - ❌ NUNCA criar tokens específicos (`--dss-chip-height-*`, `--dss-badge-size-*`)
   - ✅ SEMPRE usar `--dss-compact-control-height-{xs,sm,md,lg}` para controles compactos
   - ⚠️ Altura visual ≠ Touch target (documentar separadamente)
   - 📖 Consulte [DSS_TOKEN_REFERENCE.md - Seção 7.13](#713-compact-controls---alturas-visuais)

8. **Convenção de Pseudo-elementos (VINCULANTE)**
   - `::before` → **RESERVADO** exclusivamente para touch target (WCAG 2.5.5)
   - `::after` → Efeitos visuais (hover, active, selected overlays)
   - ⚠️ NUNCA usar `::before` para efeitos visuais em variantes
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Convenção de Pseudo-elementos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#convenção-de-pseudo-elementos-normativa)

9. **Reutilização de Valores Não-Tokenizados (VINCULANTE)**
   - Valores de `brightness()` DEVEM reutilizar valores da tabela canônica
   - Valores permitidos: 0.85, 0.90, 0.92, 0.95 (light), 1.10, 1.20 (dark)
   - ❌ NUNCA criar valores arbitrários (ex.: 0.93, 0.88)
   - ⚠️ Novos valores exigem justificativa explícita e aprovação
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Valores Visuais Permitidos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#valores-visuais-permitidos-como-exceção-não-tokenizados)

10. **Modelo Golden — Governanca de Auditoria (VINCULANTE)**
   - ❌ NUNCA auditar componentes sem declarar um **Golden Context** (baseline de auditoria)
   - ✅ SEMPRE usar **Golden Reference** como baseline global para a categoria
   - ✅ SEMPRE usar **Golden Context** como baseline especifico para o componente auditado
   - ⚠️ Golden Sample (DssButton) e referencia de DOCUMENTACAO, NAO de arquitetura
   - 📖 Consulte [DSS_GOLDEN_COMPONENTS.md](docs/governance/DSS_GOLDEN_COMPONENTS.md)

   **Tres conceitos distintos:**
   - **Golden Reference** — Governanca global de categoria (DssChip interativo, DssBadge nao interativo)
   - **Golden Context** — Baseline especifico de auditoria (ex: DssCheckbox para DssRadio)
   - **Golden Sample** — Referencia de documentacao / Template 13.1 (DssButton)

   **Golden References Oficiais (Janeiro 2026):**
   - **DssChip** — Golden Reference interativo (touch target `::before`, pseudo-elementos)
   - **DssBadge** — Golden Reference nao interativo (decisoes contextuais)

11. **Entry Point Wrapper Obrigatorio (VINCULANTE)**
    - Todo componente DSS DEVE possuir um arquivo `DssNomeComponente.vue` na **raiz** do diretorio do componente
    - Este arquivo e um **re-export puro** — sem `<template>`, sem `<style>`, sem logica propria
    - Aponta para a implementacao canonica em `1-structure/DssNomeComponente.ts.vue`
    - ❌ NUNCA colocar implementacao no wrapper (NC-01 do DssButton foi exatamente isso)
    - ❌ NUNCA omitir o wrapper (mesmo que `index.js` exporte diretamente)
    - ✅ Formato canonico:
    ```vue
    <script>
    import DssNomeComponente from './1-structure/DssNomeComponente.ts.vue'
    export default DssNomeComponente
    </script>
    ```
    - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Passo 7](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#passo-7-entry-point-wrapper)

12. **CSS como Fonte de Verdade Visual (VINCULANTE)**
    - O **CSS do componente** (`2-composition/_base.scss` e camadas seguintes) é a **fonte de verdade visual primária** do DSS.
    - O `meta.json` (campo `visualProperties`) é o espelho documentado do CSS — deve refletir exatamente o que o CSS implementa.
    - `DSS_REFERENCIA_VISUAL_ANALISE.md` é derivado do `meta.json` via script automatizado — nunca é editado diretamente.
    - O Figma permanece como ferramenta integrável via MCP (como qualquer outra ferramenta de mercado), mas **não é árbitro de decisões visuais**.
    - Em caso de ambiguidade sobre como um componente deve se parecer, o agente DEVE consultar o CSS compilado do componente, não ferramentas externas.
    - ❌ NUNCA inferir dimensões, espaçamentos ou cores sem consultar o CSS real do componente.
    - ✅ SEMPRE representar no `meta.json` exatamente o que está implementado no CSS, usando os tokens DSS correspondentes (Princípio #1).
    - ✅ O campo `source` em `visualProperties` DEVE referenciar o arquivo CSS de origem (ex: `"2-composition/_base.scss"`), não documentos externos ou seções de ferramentas de design.
    - 📖 A cadeia de verdade é: **CSS → meta.json → DSS_REFERENCIA_VISUAL_ANALISE.md**. Toda documentação é derivada, toda alteração começa no CSS.

13. **Isolamento de CSS de Terceiros via Cascade Layers (VINCULANTE)**
    - ❌ CSS de terceiros (Quasar, fontes externas, bibliotecas de UI) NUNCA deve ser carregado fora de `@layer`
    - ❌ CSS DSS NUNCA é envolvido em `@layer` — permanece no escopo unlayered, que tem precedência absoluta
    - ✅ Todo CSS de terceiros DEVE ser servido dentro de `@layer vendor { ... }` (ex.: `@layer quasar { ... }`)
    - ✅ `!important` de terceiros fica contido dentro do layer — inofensivo para o DSS
    - ⚠️ Regras DSS unlayered vencem qualquer regra dentro de layer, independente de especificidade ou `!important`
    - 📖 Consulte [DSS_ARCHITECTURE.md — Princípio #13](docs/reference/DSS_ARCHITECTURE.md#princípio-13--isolamento-de-css-de-terceiros-via-cascade-layers-vinculante)

14. **Composição de Ícones (VINCULANTE)**
    - O DSS possui **um único primitivo de ícone**: o `DssIcon`. Nenhum componente reimplementa a renderização de glifo.
    - ✅ Todo prop de ícone (`icon`, `iconRight`, `iconSelected`, `iconRemove`, etc.) DEVE renderizar internamente `<DssIcon :name inline decorative />`
    - ❌ NUNCA renderizar glifo em `<span>` cru nem interpolar nome de ícone como texto em template
    - ❌ NUNCA declarar `font-family: 'Material Icons'` (ou outra fonte de ícone) em SCSS de componente — o glifo é responsabilidade do `DssIcon` → `QIcon`
    - ✅ Componentes com ícone expõem **slot(s) nomeado(s)** de escape (ex.: `#icon-left`); slot com conteúdo tem precedência sobre o prop; consumidor NUNCA escreve span de glifo à mão
    - ✅ Ícone embutido é `decorative` quando o host tem label/`aria-label`; `decorative` controla **somente** a11y (`aria-hidden`), NUNCA aparência
    - ⚠️ **Gate (deve retornar zero):** `grep -rn "Material Icons" packages/core/components/base/DssNomeComponente/**/*.scss`
    - 📖 Consulte [DSS_ICON_COMPOSITION_CONTRACT.md](docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md) *(Contrato de Composição de Ícone — Nível 1)*

---

## 🎯 Escopo Funcional Mínimo (DEFINIÇÃO OFICIAL)

### ⚠️ Regra crítica
> **Escopo funcional mínimo NÃO significa documentação mínima.**

### Definição correta

**Escopo funcional mínimo** é o menor conjunto de funcionalidades necessárias para que o componente cumpra **seu papel semântico, visual, comportamental e acessível**, com **todas essas responsabilidades explicitamente documentadas**.

### Escopo mínimo DEFINE:
- O que o componente faz
- O que ele NÃO faz
- Quais responsabilidades ele assume

### Escopo mínimo NÃO autoriza:
- ❌ Documentação superficial
- ❌ Omissão de estados
- ❌ Redução de exemplos
- ❌ Falta de contratos (props, slots, eventos)
- ❌ “Depois documenta”

📌 **Documentação nunca é considerada funcionalidade excedente.**

---

## 🏛️ Hierarquia de Autoridade do DSS (LEITURA OBRIGATÓRIA)

Os arquivos abaixo constituem o **corpo normativo do Design System Sansys**.
Todo trabalho DEVE estar em conformidade com eles.

### 🔒 Nível 1 — Normativos Vinculantes (Hard Rules)

Estes arquivos têm precedência máxima.  
Em caso de conflito, **NUNCA devem ser ignorados ou reinterpretados**.

1. **CLAUDE.md**  
   → Regras operacionais e comportamentais para agentes de IA

2. **PRD_DSS.md**  
   → Papel estratégico, governança, critérios de qualidade

3. **DSS_ARCHITECTURE.md**  
   → Estrutura do sistema, tokens, integração com Quasar

4. **DSS_COMPONENT_ARCHITECTURE.md**  
   → Arquitetura de 4 camadas, padrões obrigatórios, anti-patterns

5. **DSS_REFERENCIA_VISUAL_ANALISE.md** *(Contrato Visual Canônico)*  
   → Espelho human-readable do campo `visualProperties` de cada `dss.meta.json`. A seção de dados é auto-gerada — **nunca editar manualmente** a região delimitada por `<!-- BEGIN:AUTO-GENERATED -->`. Em caso de conflito com qualquer outro documento sobre visual padrão, **o CSS do componente prevalece** (Princípio #12). Este documento reflete o CSS; se divergir, o CSS é a verdade.

6. **DSS_ICON_COMPOSITION_CONTRACT.md** *(Contrato de Composição de Ícone — Princípio #14)*  
   → Autoridade máxima sobre renderização de ícone. Define o `DssIcon` como primitivo único, o contrato prop/slot/a11y e a proibição de glifo cru (`font-family: 'Material Icons'` em componente). Em caso de conflito sobre como um ícone deve ser renderizado, este documento e o CSS do componente prevalecem.

---

### 🔐 Nível 2 — Guias Técnicos Normativos (Obrigatórios)

Estes arquivos são **obrigatórios por especialidade**  
e NÃO podem ser tratados como material opcional.

5. **DSS_TOKEN_REFERENCE.md**  
   → Catálogo oficial de tokens  
   ⚠️ Tokens DEVEM ser citados com nome exato

6. **DSS_IMPLEMENTATION_GUIDE.md**  
   → Como aplicar tokens, classes, estados e acessibilidade

7. **DSS_ARCHITECTURE_GUIDE.md**  
   → Decisões arquiteturais detalhadas e racional técnico

8. **DSS_MONOREPO_PATH_MAP.md**  
   → Mapeamento canônico de caminhos do Monorepo: regras de importação JS/TS e Sass, relação entre `packages/core` e `apps/components`, aliases do Vite e checklist de conformidade  
   ⚠️ Consultar **sempre** que criar ou modificar importações entre pacotes

---

### 📌 Regra de Ouro

Se um comportamento, token, estado ou padrão:
- Não estiver documentado **explicitamente**
- Mas estiver implícito em um guia normativo

👉 **O agente DEVE documentá-lo**, não omiti-lo.


## 🏗️ Arquitetura Obrigatória (4 Camadas)

```
components/base/DssNomeComponente/
├── 1-structure/
│   └── DssNomeComponente.ts.vue      ← Layer 1: Implementacao canonica (Vue + TS)
├── 2-composition/
│   └── _base.scss                    ← Layer 2: Estilos base (apenas tokens genericos)
├── 3-variants/
│   ├── _variant.scss                 ← Layer 3: Variantes visuais (density, etc.)
│   └── index.scss                    ← Orchestrador L3
├── 4-output/
│   ├── _states.scss                  ← Layer 4: Dark mode, high contrast, forced-colors
│   ├── _brands.scss                  ← Layer 4: Hub, Water, Waste
│   └── index.scss                    ← Orchestrador L4
├── composables/
│   └── useXxxClasses.ts              ← Logica de classes (computed)
├── types/
│   └── xxx.types.ts                  ← TypeScript interfaces (Props, Emits, Slots)
├── DssNomeComponente.md              ← Documentacao normativa (Template 13.1)
├── DssNomeComponente.module.scss     ← ORCHESTRADOR PRINCIPAL: importa L2 → L3 → L4 (nessa ordem)
├── DssNomeComponente.example.vue     ← Exemplos interativos (min. 3 cenarios)
├── DssNomeComponente.vue             ← ENTRY POINT WRAPPER: re-export puro para 1-structure/
├── DSSNOMECOMPONENTE_API.md          ← API Reference (props, slots, events, tokens)
├── dss.meta.json                     ← Metadados: Golden Context, tokens, audit status, previewGroup, demoSlots
├── README.md                         ← Quick start e links
└── index.js                          ← Barrel export (exporta wrapper + types + composables)
```

**Regras estruturais:**
- Nenhum diretorio pode ser omitido (camadas com pouco conteudo continuam existindo)
- `DssNomeComponente.vue` e **obrigatorio** — re-export puro, sem template/style/logica
- `DssNomeComponente.module.scss` DEVE importar L2 → L3 → L4 **nessa ordem exata**
- `index.js` DEVE exportar o componente, types e composables

---

## 📚 Piso Mínimo OBRIGATÓRIO de Documentação (README.md)

Todo componente DSS, independente do escopo, **DEVE conter**:

1. Descrição clara do componente
   - O que representa
   - Quando usar
   - Quando NÃO usar

2. API completa
   - Props (com tipos e valores)
   - Slots (mesmo que seja apenas `default`)
   - Events (mesmo que seja “nenhum”)

3. Estados documentados
   - hover
   - focus
   - active
   - disabled
   - loading (ou justificar ausência)

4. Tokens utilizados
   - Lista explícita
   - Nomes exatos (`--dss-*`)

5. Exemplos
   - Mínimo: 3
   - Ideal: 5–7
   - Com brand e contexto real

📌 Se algo **não existir**, isso deve estar **explicitamente declarado**.

---

## 🚫 Anti-Patterns Críticos

### Código
- ❌ Inferir API completa do Quasar
- ❌ Criar tokens específicos de componente
- ❌ Aplicar cores no SCSS
- ❌ Ignorar estados
- ❌ Pular camadas
- ❌ Usar `::before` para efeitos visuais (reservado para touch target)
- ❌ Usar valores de brightness arbitrários (ex.: 0.93, 0.88) — reutilizar tabela canônica

### Documentação
- ❌ “100% compatível com a API do Quasar”
- ❌ “Replica todas as props do QComponent”
- ❌ Listar cores hex por brand
- ❌ Linguagem vaga (“cores de feedback”)

---

## ✅ Checklist de Validação Final (Gate Estrutural DSS)

O componente so e considerado valido — e elegivel para auditoria e selo — se **TODOS** os itens abaixo estiverem atendidos:

### Gate Estrutural (Bloqueante)
- [ ] **4 camadas existem** em completude (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`)
- [ ] **Entry Point Wrapper** (`DssNomeComponente.vue`) existe e e re-export puro
- [ ] **Orchestrador SCSS** (`DssNomeComponente.module.scss`) importa L2 → L3 → L4 na ordem
- [ ] **Barrel export** (`index.js`) exporta componente, types e composables
- [ ] **dss.meta.json** existe com `goldenReference`, `goldenContext`, `previewGroup` e `defaultPreview.demoSlots` declarados

### Gate Tecnico (Bloqueante)
- [ ] Nenhum valor hardcoded (Token First)
- [ ] Cores via classes utilitarias (nao no SCSS)
- [ ] Estados implementados e documentados (hover, focus, active, disabled)
- [ ] Acessibilidade validada (WCAG 2.1 AA, touch target, ARIA, teclado)
- [ ] SCSS compila sem erros (`npx sass DssNomeComponente.module.scss`)

### Gate Documental (Bloqueante para selo)
- [ ] Tokens listados com nomes exatos
- [ ] README completo (quick start, modos, exemplos)
- [ ] Documentação normativa (DssNomeComponente.md) com Template 13.1
- [ ] API Reference (DSSNOMECOMPONENTE_API.md) atualizada
- [ ] Exemplo funcional (DssNomeComponente.example.vue, min. 3 cenarios)
- [ ] **Arquivo de testes** (DssNomeComponente.test.js) existe com cobertura mínima: renderização base, props, eventos e slots — **gate de build BLOQUEANTE**. Execução: `npx vitest run --project unit` a partir de `packages/core` (projeto criado na Onda P0 — antes disso o gate não era executável). Cobertura de arquivos: 89/89 componentes (100%). Os arquivos `DssCadrisCard` e `DssTestPageComplexity` são fixtures/páginas de teste — não são componentes de uso e estão fora do escopo de cobertura por decisão de governança (jun/2026).

> **Nenhum componente pode receber selo DSS v2.2 sem passar por este gate.**
> Auditorias devem verificar este checklist ANTES de iniciar analise detalhada.

---

## 📌 Regra Final

> Se houver dúvida entre **simplificar demais** ou **explicitar melhor**,  
> **SEMPRE escolha explicitar melhor**.

Documentação clara hoje evita refatoração massiva amanhã.
