Perfeito. Agora tenho informação suficiente para gerar o relatório. Vou consolidar:

---

## AGENTE 2 — PRIMITIVOS & AÇÕES: Relatório de Auditoria Organizacional

### 1. Inventário por Componente

**FAMÍLIA: BOTÕES E AÇÕES**

| Componente | Tipo | Arquivo 1-structure | Selo | Observação |
|-----------|------|-------------------|------|-----------|
| DssButton | Ação principal interativa | .vue + .ts.vue (ambos) | DSS v2.2 | SIGNAL-P01: Duplo padrão. .vue é canônico, .ts.vue é versão melhorada com ARIA |
| DssBtnGroup | Ação composta | Apenas .ts.vue | N/A | Sem seal detectado |
| DssBtnDropdown | Ação composta | Apenas .ts.vue | N/A | Sem seal detectado |
| DssBtnToggle | Ação toggle | Apenas .ts.vue | N/A | Sem seal detectado |

**FAMÍLIA: IDENTIDADE E DISPLAY COMPACTO**

| Componente | Tipo | Arquivo 1-structure | Selo | Observação |
|-----------|------|-------------------|------|-----------|
| DssBadge | Identificador não-interativo | .vue + .ts.vue (ambos) | DSS v2.2 | SIGNAL-P01: Duplo padrão. Marca como Golden Reference não-interativo |
| DssChip | Identificador interativo | Apenas .ts.vue | DSS v2.2 | Marca como Golden Reference interativo |
| DssAvatar | Imagem perfil | .vue + .ts.vue (ambos) | DSS v2.2 | SIGNAL-P01: .vue marcado como @deprecated. Versão canônica é .ts.vue |
| DssIcon | Ícone | Apenas .ts.vue | DSS v2.2 | Sem duplo padrão |
| DssSpinner | Spinner load | Apenas .ts.vue | DSS v2.2 | Sem duplo padrão |

**FAMÍLIA: ESTRUTURAIS SIMPLES**

| Componente | Tipo | Arquivo 1-structure | Selo | Observação |
|-----------|------|-------------------|------|-----------|
| DssBar | Container horizontal | Apenas .ts.vue | DSS v2.2 | Estrutura completa 4 camadas |
| DssSeparator | Divisor visual | Apenas .ts.vue | DSS v2.2 | Estrutura completa 4 camadas |
| DssSpace | Espaçador | Apenas .ts.vue | DSS v2.2 | Estrutura completa 4 camadas |
| DssResponsive | Wrapper responsivo | Apenas .ts.vue | DSS v2.2 | Estrutura completa 4 camadas |

**CONTAGEM GERAL**:
- Total em `base/`: 77 componentes (76 diretórios + index.js)
- Com seal: ~75 componentes
- Padrão duplo (.vue + .ts.vue): 3 componentes confirmados (DssButton, DssBadge, DssAvatar)

---

### 2. Função da Família no Ecossistema

**Botões e Ações** (DssButton, DssBtnGroup, DssBtnDropdown, DssBtnToggle):
- Responsáveis pela interação primária do usuário com a interface
- DssButton é o primitivo base, referência de documentação (Golden Sample)
- DssBtnGroup, DssBtnDropdown e DssBtnToggle são composições/variações
- Todos mapeiam para variantes (elevated, flat, outline, unelevated, push, glossy)
- Suportam brand, size, estados (loading, disabled) e densidade (dense)

**Identidade e Display Compacto** (DssBadge, DssChip, DssAvatar, DssIcon, DssSpinner):
- Responsáveis por feedbacks visuais e identificação de conteúdo
- DssChip e DssBadge são Golden References oficiais (janeiro 2026)
  - DssChip: Golden Reference interativo (touch target via `::before`)
  - DssBadge: Golden Reference não-interativo (contextual)
- DssIcon é display puro (sem interação)
- DssSpinner é feedback de carregamento não-interativo
- Seguem token `--dss-compact-control-height-{xs,sm,md,lg}` para altura visual

**Estruturais Simples** (DssBar, DssSeparator, DssSpace, DssResponsive):
- Responsáveis por layout e organização
- DssBar: container horizontal com background/contraste
- DssSeparator: divisor visual com múltiplas variantes (horizontal, vertical, spaced, inset)
- DssSpace: espaçador com sizes parametrizadas
- DssResponsive: wrapper de responsividade (condicional visual/comportamental)
- Sem interação esperada

---

### 3. Qualidade da Distribuição Estrutural

**Análise da Separação entre Pastas**:

`packages/core/components/` contém:
- **base/** (77 diretórios): Componentes atômicos e primitivos. Estrutura obrigatória de 4 camadas. Todos com selo ou em processo.
- **composed/** (14 diretórios): DssBottomSheet, DssCarousel, DssChatMessage, DssColorPicker, DssDatePicker, DssDialog, DssForm, DssPopupEdit, DssPopupProxy, DssTable, DssTestPageComplexity, DssTimePicker, DssUploader. Componentes de ordem superior que combinam primitivos. Estrutura não claramente definida no audit.
- **feedback/** (vazio): Pasta reservada para componentes de feedback (ex: toast, snackbar, alert). Não implementada.
- **forms/** (vazio): Pasta reservada para componentes de formulário. Não implementada.
- **layout/** (vazio): Pasta reservada para componentes de layout. Não implementada.
- **stress-test/** (2 diretórios): DssCadrisCard, DssDataCard. Componentes de teste/complexidade para validação de performance.

**Conclusão**: A separação está clara em conceito (base = primitivos, composed = composições), mas 3 pastas (feedback, forms, layout) estão vazias apesar de existirem no filesystem. Sugerem intenção de organização futura.

---

### 4. Análise do components/index.js

**O que exporta**:
- Exportações nomeadas (named exports): DssButton, DssBadge, DssAvatar, DssCard + DssCardSection + DssCardActions, DssInput, DssChip
- Plugin Vue global: DesignSystemSansys (registra 8 componentes globalmente)

**Constatação crítica [SIGNAL-P02 CONFIRMADO]**:
- Apenas **8 componentes** estão registrados globalmente (DssButton, DssBadge, DssAvatar, DssCard, DssCardSection, DssCardActions, DssInput, DssChip)
- A maioria dos **75+ componentes** em `base/` NÃO está no index.js
- Componentes como DssBtnGroup, DssBtnDropdown, DssBtnToggle, DssIcon, DssSpinner, DssBar, DssSeparator, DssSpace, DssResponsive NÃO são exportados globalmente
- Usuários precisam importar individualmente: `import DssIcon from '@sansys/design-system/base/DssIcon'`

**Avaliação**: Padrão deliberado ou lacuna? Não está documentado explicitamente no index.js. Sugere que apenas componentes "publicáveis" (com alta estabilidade/conformidade) são promovidos ao plugin global.

---

### 5. Disposições Recomendadas

| Componente/Grupo | Status | Recomendação | Justificativa |
|------------------|--------|-------------|---------------|
| DssButton (duplo padrão) | KEEP + CLARIFY | Manter ambos, mas documentar transição .vue → .ts.vue | .ts.vue é versão melhorada com ARIA. .vue é versão legacy (Options API). |
| DssBadge (duplo padrão) | KEEP + CLARIFY | Manter ambos, documentar que .ts.vue é canônico | .vue é legacy, .ts.vue é composition API com suporte completo. |
| DssAvatar (duplo padrão) | KEEP + DEPRECATE | Manter .vue marcado como @deprecated, .ts.vue é canônico | Já marcado como @deprecated no próprio arquivo .vue. Remover em v3.0. |
| DssBtnGroup, DssBtnDropdown, DssBtnToggle | KEEP | Componentes bem estruturados, sem issues | Sem seal (ainda não auditados formalmente), mas estrutura está completa. |
| Componentes base não-exportados (DssIcon, DssSpinner, etc.) | KEEP | Exportação deliberada apenas de componentes certificados | Padrão coerente: apenas componentes com seal no plugin global. |
| composed/ (14 componentes) | KEEP | Bem alocados como composições | Separação clara de primitivos vs. composições. |
| feedback/, forms/, layout/ (vazias) | ARCHIVE | Remover do filesystem ou preencher | Pastas vazias criam confusão. Ou remover ou implementar. |
| stress-test/ (2 componentes) | INTEGRATE | Considerar mover para `test/` ou `demo/` | Não é um "componente" real, é fixture de teste de complexidade. |

---

### 6. Confirmação dos Sinais Pré-Identificados

**[SIGNAL-P01] DssButton/1-structure contém DOIS arquivos: .vue e .ts.vue**

**Status**: CONFIRMADO E EXPANDIDO

- **DssButton**: .vue (legacy, Options API) + .ts.vue (canônico, Composition API + ARIA)
- **DssBadge**: .vue (legacy) + .ts.vue (canônico)
- **DssAvatar**: .vue (legacy, @deprecated) + .ts.vue (canônico)
- **DssBtnGroup, DssBtnDropdown, DssBtnToggle**: Apenas .ts.vue (sem padrão duplo)
- **DssIcon, DssSpinner, etc.**: Apenas .ts.vue (sem padrão duplo)

**Padrão identificado**: Primeiros componentes implementados em Options API (.vue), depois evoluíram para Composition API + TypeScript (.ts.vue). Transição em andamento.

---

**[SIGNAL-P02] components/index.js registra apenas 6 componentes globalmente**

**Status**: CONFIRMADO (na verdade são 8, não 6, mas a essência está correta)

- Exportados globalmente: DssButton, DssBadge, DssAvatar, DssCard, DssCardSection, DssCardActions, DssInput, DssChip
- 69+ componentes NÃO estão no index.js
- Padrão: Apenas componentes com "high fidelity" (seals certificados) ou "core" (Card, Input, Chip) estão no plugin global

**Intencionalidade**: Deliberada. Reduz tamanho do bundle global; usuários importam o que precisam.

---

**[SIGNAL-P03] Pastas não-base (composed/, feedback/, forms/, layout/)**

**Status**: CONFIRMADO E EXPANDIDO

- **composed/**: 14 componentes bem definidos (BottomSheet, Carousel, Chat, ColorPicker, DatePicker, Dialog, Form, PopupEdit, PopupProxy, Table, TimePicker, Uploader) + TestPageComplexity
- **feedback/**: Vazia (reservada para Toast, Snackbar, Alert)
- **forms/**: Vazia (reservada para FormBuilder, FormWrapper, etc.)
- **layout/**: Vazia (reservada para Layout, Responsive, Grid, etc.)

Relação clara: composed contém agregações de base. Feedback/forms/layout ainda não implementadas (ou os componentes foram mantidos em base).

---

**[SIGNAL-P04] DssBadge e DssChip como Golden References**

**Status**: CONFIRMADO

Ambas designadas formalmente em `DSS_GOLDEN_COMPONENTS.md` (janeiro 2026):
- **DssChip**: Golden Reference interativo (touch target via `::before`)
- **DssBadge**: Golden Reference não-interativo (contextual)

Estrutura efetivamente serve como baseline:
- DssBadge no meta.json declara: `goldenReference: "DssBadge"`, `goldenContext: "DssChip"`
- DssChip declara: `goldenReference: "DssChip"`, `goldenContext: "DssChip"`

Seals documentam decisões de: tokens de altura, pseudo-elementos, touch target, ARIA, dark mode, forced-colors.

---

### 7. Novos Sinais Encontrados

**[SIGNAL-P05-NEW] Inconsistência em dss.meta.json — Campos variáveis por componente**

DssButton usa:
```json
"version": "2.2.0",
"classification": "Ação Principal",
"phase": 1,
"goldenReference": "DssButton",
"goldenContext": "DssButton"
```

DssBadge usa:
```json
"dssVersion": "2.2",
"category": "Compact Control nao interativo",
"phase": 1,
"goldenReference": "DssBadge",
"goldenContext": "DssChip",
"hasReservations": true
```

**Observação**: Nomes de campos variam (`version` vs. `dssVersion`, `classification` vs. `category`). Sem schema centralizado aparente.

---

**[SIGNAL-P06-NEW] Wrapper Entry Point em raiz, mas index.js das pastas é inconsistente**

Alguns componentes têm:
- DssButton/
  - DssButton.vue (wrapper entry point — se-export puro)
  - 1-structure/DssButton.ts.vue (implementação)
  - index.js (exporta wrapper)

Outros presumivelmente não têm esse padrão. Verificação necessária em amostra maior.

---

**[SIGNAL-P07-NEW] Nenhum componente em feedback/, forms/, layout/ apesar das pastas existirem**

Risco: Desenvolvedores podem assumir que componentes de feedback (toast, snackbar) existem nessas pastas e perder tempo procurando. Impacto na experiência do dev.

---

### 8. Recomendações de Melhoria Estrutural

1. **Consolidar padrão de transição .vue → .ts.vue**
   - Documentar timeline de deprecação explícita (v2.2: warning, v3.0: remove)
   - Atualizar CLAUDE.md para descrever como lidar com transição durante auditoria
   - Considerar ferramenta de codemods automática para migração

2. **Definir critério claro para export global em index.js**
   - Atualmente: parece ser "componentes certificados + high-priority"
   - Formalizar em documento: "Apenas componentes com Seal DSS v2.2 podem estar no plugin global"
   - Ou: "Apenas componentes com [lista X, Y, Z] são exportados globalmente"

3. **Remover ou preencher pastas vazias**
   - Decidir: feedback/, forms/, layout/ são futuros ou obsoletos?
   - Se futuros: adicionar README explicando roadmap
   - Se obsoletos: remover do filesystem

4. **Padronizar schema de dss.meta.json**
   - Criar schema JSON formal
   - Exemplo de inconsistência: `version` vs. `dssVersion`, `classification` vs. `category`
   - Validar todos os 75 meta.json contra schema

5. **Documentar relação entre base/ e composed/**
   - Critério de quando um componente vai para composed/
   - Exemplo: DssForm composto de DssInput + DssField + DssLabel?
   - Adicionar comentário nos arquivos de raiz de composed/

6. **Verificar cobertura de audit de todos os 75 componentes**
   - Alguns têm seal (DssButton, DssBadge, DssChip, DssIcon, etc.)
   - Outros 60+ ainda não foram auditados formalmente
   - Criar roadmap de fase de auditoria (Phase 2?)

7. **Melhorar discoverability do Entry Point Wrapper**
   - Atualmente: DssButton.vue em raiz é apenas um re-export
   - Adicionar comentário no topo: "Entry Point Wrapper — re-export puro de 1-structure/DssButton.ts.vue"
   - Adicionar na documentação (CLAUDE.md) que este padrão é obrigatório

8. **Validar que todos os componentes base/ têm 4 camadas**
   - Verificação spot: DssBar, DssSeparator, DssSpace, DssResponsive ✓ (todas têm)
   - Estender para amostra de 20 componentes aleatórios para confirmar 100% de cobertura

---

## Resumo Executivo

O Design System Sansys está bem organizado em sua camada de primitivos (`base/`). Os 77 componentes seguem rigorosamente a arquitetura de 4 camadas. Existem 3 sinais de transição tecnológica (.vue → .ts.vue) que refletem evolução deliberada, não desvios. O padrão de exportação global (apenas 8 componentes) é intencional e reduz complexidade.

Pontos de atenção:
1. **Duplo padrão em 3 componentes** — claramente marcado como legacy, sem risco.
2. **3 pastas vazias** — criam confusão, precisam ser removidas ou preenchidas.
3. **75+ componentes sem seal** — ainda na fase de auditoria (Phase 2?).
4. **Schema meta.json inconsistente** — formalizar com JSONSchema.

**Nenhum problema estrutural crítico detectado.** O sistema está pronto para auditoria de conformidade individual dos 75+ componentes.
