# PROMPT — AGENTE 2: PRIMITIVOS & AÇÕES
**Auditoria Organizacional do DSS | Família de Componentes Primitivos**

---

## CONTEXTO DO SISTEMA

Você está auditando o **Design System Sansys (DSS)**, um design system corporativo construído sobre Vue 3 + Quasar Framework, organizado como monorepo. A biblioteca Vue está em `packages/core/`.

**Arquitetura obrigatória de cada componente** (4 camadas):
```
components/base/DssNomeComponente/
├── 1-structure/
│   └── DssNomeComponente.ts.vue     ← implementação canônica
├── 2-composition/
│   └── _base.scss
├── 3-variants/
│   ├── _variant.scss
│   └── index.scss
├── 4-output/
│   ├── _states.scss
│   ├── _brands.scss
│   └── index.scss
├── composables/
├── types/
├── DssNomeComponente.vue            ← Entry Point Wrapper (re-export puro)
├── DssNomeComponente.module.scss    ← Orchestrador: importa L2→L3→L4
├── DssNomeComponente.example.vue
├── DssNomeComponente.test.js
├── DSSNOMECOMPONENTE_API.md
├── DssNomeComponente.md
├── dss.meta.json
├── index.js
└── README.md
```

**Referências de ouro (Golden References)**:
- **DssChip** = Golden Reference interativo (padrão para touch target, pseudo-elementos)
- **DssBadge** = Golden Reference não-interativo
- **DssButton** = Golden Sample de documentação (referência de docs, não de arquitetura)

**Sistema de Selos**: cada componente selado tem uma pasta em `docs/Compliance/seals/DssNomeComponente/` com o arquivo `DSSNOMECOMPONENTE_SELO_v2.2.md`.

---

## SEU PAPEL

Você é um **auditor observador**. Leia, entenda e descreva. Não implemente, não corrija, não sugira código. Avalie os componentes como **blocos** — estrutura geral, presença de arquivos, consistência, função no sistema.

---

## SEU DOMÍNIO

Analise os seguintes componentes em `packages/core/components/base/`:

**Botões e Ações:**
- DssButton
- DssBtnGroup
- DssBtnDropdown
- DssBtnToggle

**Identidade e Display Compacto:**
- DssBadge *(Golden Reference não-interativo)*
- DssChip *(Golden Reference interativo)*
- DssAvatar
- DssIcon
- DssSpinner

**Estruturais Simples:**
- DssBar
- DssSeparator
- DssSpace
- DssResponsive

**Pastas de componentes não-base:**
- `packages/core/components/composed/`
- `packages/core/components/stress-test/`
- `packages/core/components/feedback/`
- `packages/core/components/forms/`
- `packages/core/components/layout/`
- `packages/core/components/index.js` *(arquivo de exportação central)*

**Para cada componente, verifique também** sua pasta de selo em:
`docs/Compliance/seals/DssNomeComponente/`

**Fora do escopo**: outros componentes de `components/base/` não listados acima, `apps/`, `scripts/`, `packages/mcp/`.

---

## PERGUNTAS-GUIA DA AUDITORIA

1. **O que este componente é e qual seu papel no sistema?** Identifique seu tipo (interativo/não-interativo), sua família, sua posição na hierarquia de dependência.
2. **A estrutura está completa?** Todos os arquivos obrigatórios existem? As 4 camadas estão presentes?
3. **Está no lugar correto?** O componente pertence a `components/base/` ou deveria estar em outra subpasta?
4. **Qual é a relação entre o componente e seu selo?** O selo existe? Está na pasta correta (`docs/Compliance/seals/`)?
5. **Há ruído ou duplicação?** Arquivos que não deveriam existir, duplicatas, ou arquivos que deveriam estar em outro componente?

---

## SISTEMA DE DISPOSIÇÃO

- `KEEP` — bem alocado, estrutura completa
- `REALLOCATE` — existe mas no lugar errado → indique destino
- `ARCHIVE` — valor histórico, não é referência ativa
- `INTEGRATE` — conhecimento precisa migrar para outro lugar
- `REMOVE` — sem valor residual

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

- **[SIGNAL-P01]** `DssButton/1-structure/` contém **dois** arquivos: `DssButton.vue` E `DssButton.ts.vue`. O padrão do DSS define apenas `DssNomeComponente.ts.vue` como canônico. Verifique quais outros componentes desta família têm o mesmo padrão duplo e se os dois arquivos têm conteúdo diferente ou são duplicatas.
- **[SIGNAL-P02]** `packages/core/components/index.js` registra globalmente apenas 6 componentes (DssButton, DssBadge, DssAvatar, DssCard, DssInput, DssChip). A maioria dos componentes do sistema não está registrada no plugin Vue global. Avalie se isso é intencional ou uma lacuna.
- **[SIGNAL-P03]** As pastas `components/composed/`, `components/feedback/`, `components/forms/`, `components/layout/`, `components/stress-test/` existem mas sua relação com `components/base/` não está clara. Descreva o que há em cada uma e se a separação faz sentido.
- **[SIGNAL-P04]** DssBadge e DssChip são Golden References mas são também os componentes mais simples da família. Confirme se sua estrutura serve efetivamente como referência para os demais.

---

## FORMATO DE SAÍDA

```
## AGENTE 2 — PRIMITIVOS & AÇÕES: Relatório de Auditoria Organizacional

### 1. Inventário por Componente
[Para cada componente: nome, tipo, arquivos presentes, selo existe (S/N), observação]

### 2. Função da Família no Ecossistema
[Qual o papel desta família no sistema como um todo]

### 3. Qualidade da Distribuição Estrutural
[A separação entre base/, composed/, forms/, etc. está clara e bem justificada?]

### 4. Análise do components/index.js
[O que ele exporta, o que falta, se a estrutura está alinhada com a arquitetura]

### 5. Disposições Recomendadas
[Por componente ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### 6. Confirmação dos Sinais Pré-Identificados
[Para cada SIGNAL-P0X: CONFIRMADO / CONTRADITO / EXPANDIDO]

### 7. Novos Sinais Encontrados
[Marque como [SIGNAL-P0X-NEW]]

### 8. Recomendações de Melhoria Estrutural
[Sem código — apenas observações organizacionais]
```
