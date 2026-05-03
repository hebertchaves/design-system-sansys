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

A criação de qualquer componente DSS **exige leitura prévia** dos seguintes arquivos, **nesta ordem**:

1. `docs/PRD_DSS.md`
2. `docs/reference/DSS_ARCHITECTURE.md`
3. `docs/reference/DSS_COMPONENT_ARCHITECTURE.md`
4. `docs/guides/DSS_IMPLEMENTATION_GUIDE.md`
5. `docs/guides/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md`
6. `docs/guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md`
7. `.github/pull_request_template.md`

⚠️ **IMPORTANTE**  
Nunca inferir padrões apenas observando um componente existente.  
O **DssButton é referência**, não fonte única de verdade.

---

## 🧱 Princípios Fundamentais do DSS (NÃO VIOLAR)

1. **Token First**
   - ❌ Nenhum valor hardcoded (px, rem, hex, rgb)
   - ✅ Sempre `var(--dss-*)`

2. **Cores seguem o padrão Quasar**
   - ❌ Não criar `_colors.scss` por componente
   - ❌ Não aplicar cores no SCSS
   - ✅ Classes utilitárias globais (`bg-*`, `text-*`)
   - ✅ Aplicação via computed properties no Vue

3. **Arquitetura em 4 Camadas (Obrigatória)**
   - Nenhuma camada pode ser omitida
   - Camadas com pouco conteúdo continuam existindo

4. **Acessibilidade não é opcional**
   - WCAG 2.1 AA
   - Focus visível
   - Touch target ≥ 48px
   - Navegação por teclado

5. **Brandabilidade**
   - Componentes reagem a `[data-brand="hub|water|waste"]`
   - Tokens de brand com fallback semântico

6. **Tokens Genéricos para Altura (VINCULANTE)**
   - ❌ NUNCA criar tokens específicos (`--dss-chip-height-*`, `--dss-badge-size-*`)
   - ✅ SEMPRE usar `--dss-compact-control-height-{xs,sm,md,lg}` para controles compactos
   - ⚠️ Altura visual ≠ Touch target (documentar separadamente)
   - 📖 Consulte [DSS_TOKEN_REFERENCE.md - Seção 7.13](#713-compact-controls---alturas-visuais)

7. **Convenção de Pseudo-elementos (VINCULANTE)**
   - `::before` → **RESERVADO** exclusivamente para touch target (WCAG 2.5.5)
   - `::after` → Efeitos visuais (hover, active, selected overlays)
   - ⚠️ NUNCA usar `::before` para efeitos visuais em variantes
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Convenção de Pseudo-elementos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#convenção-de-pseudo-elementos-normativa)

8. **Reutilização de Valores Não-Tokenizados (VINCULANTE)**
   - Valores de `brightness()` DEVEM reutilizar valores da tabela canônica
   - Valores permitidos: 0.85, 0.90, 0.92, 0.95 (light), 1.10, 1.20 (dark)
   - ❌ NUNCA criar valores arbitrários (ex.: 0.93, 0.88)
   - ⚠️ Novos valores exigem justificativa explícita e aprovação
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Valores Visuais Permitidos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#valores-visuais-permitidos-como-exceção-não-tokenizados)

9. **Modelo Golden — Governanca de Auditoria (VINCULANTE)**
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

10. **Entry Point Wrapper Obrigatorio (VINCULANTE)**
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

11. **Figma como Árbitro Visual (VINCULANTE)**
    - O Figma é a **fonte de verdade visual** do DSS, não apenas uma referência.
    - Em caso de ambiguidade sobre como um componente deve se parecer (ex: qual token de padding usar quando o `withDefaults` não especifica), o agente DEVE consultar o protótipo do Figma via MCP.
    - O contrato estático (`defaultPreview` no `dss.meta.json`) reflete o Figma, mas o Figma tem precedência em caso de divergência.
    - ❌ NUNCA inventar ou inferir dimensões, espaçamentos ou cores baseadas em "bom senso" ou "padrões web" se o Figma estiver disponível.
    - ✅ SEMPRE traduzir os valores absolutos do Figma (px, hex) para os tokens DSS correspondentes (Princípio #1).

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
├── dss.meta.json                     ← Metadados: Golden Context, tokens, audit status
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
- [ ] **dss.meta.json** existe com `goldenReference` e `goldenContext` declarados

### Gate Tecnico (Bloqueante)
- [ ] Nenhum valor hardcoded (Token First)
- [ ] Cores via classes utilitarias (nao no SCSS)
- [ ] Estados implementados e documentados (hover, focus, active, disabled)
- [ ] Acessibilidade validada (WCAG 2.1 AA, touch target, ARIA, teclado)
- [ ] SCSS compila sem erros (`npx sass DssNomeComponente.module.scss`)

### Gate Documental (Bloqueante para selo)
- [ ] Tokens listados com nomes exatos
- [ ] README completo (quick start, modos, exemplos)
- [ ] Documentacao normativa (DssNomeComponente.md) com Template 13.1
- [ ] API Reference (DSSNOMECOMPONENTE_API.md) atualizada
- [ ] Exemplo funcional (DssNomeComponente.example.vue, min. 3 cenarios)

> **Nenhum componente pode receber selo DSS v2.2 sem passar por este gate.**
> Auditorias devem verificar este checklist ANTES de iniciar analise detalhada.

---

## 📌 Regra Final

> Se houver dúvida entre **simplificar demais** ou **explicitar melhor**,  
> **SEMPRE escolha explicitar melhor**.

Documentação clara hoje evita refatoração massiva amanhã.
