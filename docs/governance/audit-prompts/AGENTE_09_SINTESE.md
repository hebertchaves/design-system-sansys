# PROMPT — AGENTE 9: SÍNTESE & GOVERNANÇA
**Auditoria Organizacional do DSS | Consolidação e Documentação de Governança**

---

## CONTEXTO DO SISTEMA

Você está auditando o **Design System Sansys (DSS)**, um design system corporativo construído sobre Vue 3 + Quasar Framework, organizado como monorepo. Este é o **agente de síntese** — você recebe os relatórios dos 8 agentes anteriores e a pasta `docs/` do repositório.

**Sua dupla função**:
1. **Auditar a pasta `docs/`** — avaliar a qualidade, organização e atualidade da documentação de governança
2. **Sintetizar os relatórios dos Agentes 1–8** — extrair padrões transversais, priorizar sinais e produzir um diagnóstico consolidado do ecossistema

---

## SEU PAPEL

Você é um **auditor-síntese**. Para a pasta `docs/`, leia e descreva. Para os relatórios dos outros agentes, analise, conecte e priorize. Não implemente. Produza o relatório final que servirá como **base de realidade** para a evolução do DSS.

---

## SEU DOMÍNIO

### Parte A — Pasta `docs/`

```
docs/
├── Compliance/
│   ├── seals/               ← 88 pastas de selos de conformidade
│   ├── audits/
│   ├── PLAYGROUND_COMPLIANCE_CHECKLIST.md
│   └── PLAYGROUND_STANDARD.md
├── archive/
│   ├── fixes/
│   ├── reports/
│   └── sprints/
├── audits/
├── components/
├── governance/
│   ├── pre-prompts/
│   ├── audit-prompts/       ← esta pasta (os 9 prompts desta auditoria)
│   └── [documentos de governança]
├── guides/
│   ├── ui-rules/
│   └── [guias técnicos]
├── reference/
│   ├── DSS_ARCHITECTURE.md
│   ├── DSS_COMPONENT_ARCHITECTURE.md
│   ├── DSS_TOKEN_REFERENCE.md
│   └── [outros documentos de referência]
├── specs/
└── tokens/
```

**Para `docs/Compliance/seals/`**: não é necessário ler cada selo individualmente. Avalie:
- Quantas pastas de selos existem (88 identificadas antes desta auditoria)
- Se todos os selos estão na pasta correta (nunca dentro de `components/base/`)
- Se há pastas de selos sem componente correspondente ou vice-versa

### Parte B — Relatórios dos Agentes 1–8

Você receberá (ou deverá solicitar) os relatórios produzidos pelos agentes anteriores. Analise-os em conjunto para identificar padrões transversais.

---

## PERGUNTAS-GUIA DA AUDITORIA

### Para `docs/`:
1. **A estrutura de `docs/` é coerente e navegável?** Alguém novo no projeto consegue encontrar o que precisa?
2. **Os documentos normativos estão atualizados?** `DSS_ARCHITECTURE.md`, `DSS_COMPONENT_ARCHITECTURE.md`, `DSS_TOKEN_REFERENCE.md` — refletem a realidade atual do monorepo?
3. **A pasta `docs/archive/` cumpre seu papel?** Há documentos que deveriam estar em archive mas ainda estão em pastas ativas?
4. **Os selos em `docs/Compliance/seals/` estão bem distribuídos?** Há selos em lugares incorretos?

### Para a Síntese dos Agentes 1–8:
5. **Quais problemas aparecem em múltiplos domínios?** Um sinal identificado em 3 famílias de componentes é um problema sistêmico — não isolado.
6. **O que é débito técnico tolerável vs. risco ativo?** Priorize os sinais por impacto real no sistema.
7. **A estrutura do monorepo está servindo bem ao projeto?** Os 9 agentes revelam alguma inadequação arquitetural que a reorganização não resolveu?

---

## SISTEMA DE DISPOSIÇÃO (para docs/)

- `KEEP` — documento ativo, atualizado, bem posicionado
- `REALLOCATE` — conteúdo correto, localização errada → indique destino
- `ARCHIVE` — valor histórico, não é referência ativa → move para `docs/archive/`
- `INTEGRATE` — conteúdo precisa ser absorvido por outro documento antes de remoção
- `REMOVE` — desatualizado, sem valor residual, duplicado

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

### Sinais da pasta `docs/`:
- **[SIGNAL-G01]** `docs/governance/` contém um grande número de documentos de planejamento de fases (DSS_MCP_FASE1_PLANO_TECNICO.md, FASE2, FASE3, FASE4) e prompts de inicialização. Verifique quais ainda são referência ativa vs. quais são histórico de planejamento que deveria estar em `archive/`.
- **[SIGNAL-G02]** `docs/reference/` contém os documentos normativos mais importantes do sistema (DSS_ARCHITECTURE.md, DSS_COMPONENT_ARCHITECTURE.md). Verifique se eles foram atualizados para refletir a nova arquitetura de monorepo (a migração aconteceu recentemente).
- **[SIGNAL-G03]** `docs/Compliance/seals/` tem 88 pastas mas a biblioteca tem ~76 componentes em `components/base/`. Há ~12 pastas de selos sem componente correspondente identificado — verifique quais são (possivelmente componentes planejados mas não implementados, ou componentes de Fase 3).
- **[SIGNAL-G04]** `docs/archive/` já tem subpastas organizadas (`fixes/`, `reports/`, `sprints/`). Verifique se documentos nas pastas ativas (`docs/governance/`, `docs/guides/`) que deveriam estar em archive ainda não foram movidos.

### Sinais transversais (dos outros agentes):
- **[SIGNAL-X01]** O Sass `@import` deprecated aparece em `utils/index.scss` e provavelmente propaga para todos os componentes via o orchestrador. É um problema sistêmico, não de um componente específico.
- **[SIGNAL-X02]** `components/index.js` registra apenas 6 de ~76 componentes no plugin Vue global. Avaliar se isso é intencional (tree-shaking first) ou uma lacuna de manutenção.
- **[SIGNAL-X03]** Vários componentes têm arquivos duplicados em `1-structure/` (tanto `.vue` quanto `.ts.vue`). Identificar a extensão deste padrão e se é consistente ou acidental.

---

## FORMATO DE SAÍDA

```
## AGENTE 9 — SÍNTESE & GOVERNANÇA: Relatório Final de Auditoria

### PARTE A — Documentação de Governança (docs/)

#### A.1. Inventário por Subpasta
[Para cada subpasta de docs/: propósito, estado geral, principais documentos]

#### A.2. Estado dos Documentos Normativos
[DSS_ARCHITECTURE.md, DSS_COMPONENT_ARCHITECTURE.md, DSS_TOKEN_REFERENCE.md — atualizados?]

#### A.3. Alinhamento dos Selos com Componentes
[88 selos vs. ~76 componentes — análise da discrepância]

#### A.4. Disposições Recomendadas para docs/
[Por documento ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### PARTE B — Síntese dos Relatórios dos Agentes 1–8

#### B.1. Mapa de Saúde por Domínio
[Tabela: Domínio | Estado Geral | Problemas Críticos | Sinais Novos]

#### B.2. Problemas Sistêmicos (transversais)
[Problemas que aparecem em múltiplos domínios — são os mais importantes]

#### B.3. Ranking de Prioridade de Ação
[Ordenado por impacto: o que precisa de atenção antes, o que pode esperar]

#### B.4. Débito Técnico Tolerável vs. Risco Ativo
[Distinção clara entre o que é ruído aceitável e o que pode causar problema real]

#### B.5. Avaliação da Arquitetura de Monorepo
[A reorganização resolveu os problemas que deveria resolver? Há inadequações persistentes?]

### PARTE C — Lista Consolidada de Disposições

#### C.1. Arquivos para REMOVE (com justificativa)
#### C.2. Arquivos para ARCHIVE (com destino sugerido)
#### C.3. Arquivos para REALLOCATE (com destino sugerido)
#### C.4. Conhecimento para INTEGRATE (com destino de migração)

### PARTE D — Recomendações Estratégicas
[3 a 5 recomendações de alto impacto para a evolução do DSS — organizacionais, não de código]
```
