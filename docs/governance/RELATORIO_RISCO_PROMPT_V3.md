# Relatório de Risco: Impacto da Omissão Normativa no Prompt v3.0

**Data:** 26 de Abril de 2026
**Autor:** Manus AI
**Contexto:** Identificação de componentes criados sob o `prompt_criacao_v3.0.txt` ou pre-prompts recentes que omitiram a seção de "Documentos Normativos (Leitura Obrigatória)".

## 1. O Problema Identificado

Durante a transição do `prompt_criacao_v2.5.txt` para o `prompt_criacao_v3.0.txt` (focado na Fase 3 e MCP-First Workflow), o bloco que exigia a leitura obrigatória dos documentos canônicos do DSS (`CLAUDE.md`, `DSS_TOKEN_REFERENCE.md`, `DSS_COMPONENT_ARCHITECTURE.md`, etc.) foi acidentalmente removido.

Simultaneamente, os pre-prompts criados a partir de meados de abril (como `DssToolbar`, `DssStepper`, `DssHeader`, etc.) deixaram de incluir essa seção internamente, pois assumiam que o prompt principal (v2.5 ou v3.0) já faria essa exigência.

**Consequência:** O agente executor, ao não receber a instrução explícita para ler a documentação normativa, passou a operar por heurística — baseando-se no código de outros componentes já existentes no repositório, o que aumenta o risco de desvios arquiteturais, uso de tokens hardcoded e quebra de padrões de acessibilidade.

## 2. Linha do Tempo e Componentes Afetados

A janela de risco principal ocorreu entre **16 de Abril e 24 de Abril de 2026**. Os seguintes componentes foram criados ou refatorados nesse período sem a instrução normativa explícita:

| Data | Componente | Status de Auditoria | Nível de Risco |
|---|---|---|---|
| 16/04 | `DssToolbar` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 16/04 | `DssStep` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 17/04 | `DssHeader` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 18/04 | `DssFooter` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 19/04 | `DssDrawer` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 20/04 | `DssLayout` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 20/04 | `DssStepper` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 21/04 | `DssToolbarTitle` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 22/04 | `DssPage` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 22/04 | `DssPageContainer` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 24/04 | `DssPageSticky` | ✅ Selado (v2.2) | **Baixo** (Auditado e corrigido) |
| 24/04 | `DssDataCard` | ⚠️ Stress Test | **Médio** (Corrigido em 24/04) |
| 24/04 | `DssCadrisCard` | ⚠️ Stress Test | **Médio** (Criado hoje) |

## 3. Análise de Impacto e Aderência

Apesar da omissão da leitura normativa no prompt, a auditoria técnica revela que **não houve perda catastrófica de qualidade** nos componentes da Fase 2/3. Isso ocorreu por três motivos:

1. **MCP-First Workflow:** O uso da tool `generate_component_scaffold` garantiu que a estrutura de 4 camadas, o wrapper puro e os arquivos de documentação fossem criados corretamente, mesmo sem a leitura do `DSS_COMPONENT_ARCHITECTURE.md`.
2. **Auditorias Rigorosas:** Todos os componentes listados acima (exceto os de stress test) passaram por auditorias formais subsequentes que emitiram os selos `_SEAL_v2.2.md`. Durante essas auditorias, o agente auditor *tinha* acesso às regras e forçou as correções necessárias.
3. **Validação de Tokens:** A tool `validate_component_code` capturou a maioria dos desvios de tokens em tempo de execução.

### 3.1. Desvios Encontrados (Falsos Positivos)

Durante a varredura, encontramos valores hexadecimais hardcoded (`#fff`, `#000`) nos arquivos `4-output/_states.scss` de quase todos esses componentes. No entanto, **isso não é uma violação**. Conforme o `DSS_IMPLEMENTATION_GUIDE.md`, o uso de cores de sistema hardcoded é obrigatório e canônico dentro das media queries `@media (forced-colors: active)` e `@media print` (documentado como EXC-03 e EXC-04 nos selos).

### 3.2. O Risco Real: Tokens Inexistentes

O maior impacto da falta de leitura do `DSS_TOKEN_REFERENCE.md` foi a invenção de tokens pelo modelo (alucinação baseada em padrões comuns de mercado). Identificamos que o agente tentou usar tokens como:
- `--dss-container-padding`
- `--dss-icon-size-lg`
- `--dss-touch-target-md`
- `--dss-z-index-sticky`

Felizmente, a maioria desses tokens **realmente existe** no catálogo do DSS (ex: `touch-target-md` na linha 1202, `z-index-sticky` na linha 1397). O único token problemático recorrente foi o `--dss-focus-ring` (sem sufixo), que é um mixin/variável interna, mas foi usado diretamente em componentes como `DssAvatar`, `DssButton`, `DssInput`, etc.

## 4. Conclusão e Resolução

A omissão da seção normativa no `prompt_criacao_v3.0.txt` foi uma falha de governança grave, pois delegou a conformidade arquitetural à heurística do modelo e às ferramentas de validação pós-código, em vez de garantir o alinhamento *a priori*.

**Ação Tomada:**
O arquivo `prompt_criacao_v3.0.txt` foi corrigido hoje (26/04/2026). A seção `0.1️⃣ DOCUMENTOS NORMATIVOS (LEITURA OBRIGATÓRIA)` foi restaurada no topo do prompt, garantindo que os próximos componentes da Fase 3 (como `DssDialog`, `DssTable`, etc.) leiam os documentos canônicos antes de gerar qualquer código.

Os componentes já criados estão seguros, pois foram blindados pelas auditorias formais que emitiram seus respectivos selos.
