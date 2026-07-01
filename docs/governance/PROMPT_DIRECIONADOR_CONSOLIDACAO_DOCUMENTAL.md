# 🤖 PROMPT DIRECIONADOR: Consolidação Documental do Contrato Visual DSS

> **Autor:** Lovable Agent (revisão de arquitetura)
> **Destinatário:** Claude Code CLI (com acesso ao Figma via MCP + repo local)
> **Status:** Pronto para execução
> **Estimativa:** 4-6 horas de trabalho contínuo
> **Pré-requisito:** Branch limpa, build verde, MCP Figma autenticado no arquivo `u2XlRujP4RwNqAAgIDaoJA`

---

## 🎯 Objetivo Estratégico

Hoje o DSS tem **6 documentos sobrepostos** tratando do mesmo assunto — o contrato visual default dos componentes — causando:

1. **Drift silencioso:** atualizar um doc não atualiza os outros
2. **Ambiguidade para agentes de IA:** qual doc é a verdade quando divergem?
3. **Custo de manutenção O(n):** cada componente novo exige editar 4 arquivos
4. **Falha do Princípio #12 (CLAUDE.md):** "Figma é árbitro" só funciona se houver UM contrato consultável

A entrega desta tarefa estabelece **UMA ÚNICA FONTE DE VERDADE** para o contrato visual, com os demais documentos transformados em *pointers* ou arquivados.

---

## 📂 Documentos no Escopo (Inventário Atual)

Localize, leia integralmente e mapeie o conteúdo de cada arquivo abaixo **antes** de qualquer escrita:

| # | Arquivo | Função atual | Decisão proposta |
|---|---------|--------------|------------------|
| 1 | `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` | Análise componente-a-componente do default visual (padding, spacing, stroke, radius) | **CANÔNICO — fonte única** |
| 2 | `docs/governance/DSS_VISUAL_CONTRACT.md` | Estratégia das 3 camadas (defaultPreview + Figma + validação) | **Manter como *strategy doc*, apontar para canônico** |
| 3 | `docs/governance/DSS_VISUAL_DEFAULTS_DEFINITION.md` | Define o que é "default" | **Mesclar no canônico (seção "Definições")** |
| 4 | `docs/governance/DSS_VISUAL_DEFAULTS_STANDARD.md` | Standard de tokens canônicos | **Mesclar no canônico (seção "Tabela de Mapeamento")** |
| 5 | `docs/governance/DSS_VISUAL_DEFAULTS_AUDIT.md` | Auditoria de quem está/não está conforme | **Manter como *living doc* de status, apontar para canônico** |
| 6 | `docs/governance/PROMPT_DEFAULT_PREVIEW_EXTRACTION.md` | Prompt operacional Figma→JSON | **Manter como operacional, referenciar canônico no Passo 2** |

**⚠️ Não delete nada antes de mesclar.** Use `git mv` quando arquivar (ver Passo 6).

---

## 🛠️ Execução Passo-a-Passo

### Passo 1 — Leitura e Diff Map (obrigatório, não pular)

1.1. Leia integralmente os 6 arquivos listados acima.
1.2. Crie um arquivo temporário `/tmp/dss-doc-diffmap.md` com tabela:

```markdown
| Conceito | Doc 1 | Doc 2 | Doc 3 | Doc 4 | Doc 5 | Doc 6 | Divergência? |
|----------|-------|-------|-------|-------|-------|-------|--------------|
| Token de altura padrão controles | 44px | 44px | 48px | 44px | — | 44px | ⚠️ Doc 3 |
| ... | ... |
```

1.3. Para cada divergência, **a verdade é o Figma**. Resolva consultando o MCP no arquivo `u2XlRujP4RwNqAAgIDaoJA` (nodes `159-358`, `159-2468`, `160-3333`, `160-4259`). Registre a resolução no diffmap.

1.4. **NÃO PROSSIGA** até o diffmap estar 100% resolvido. Pergunte ao orquestrador se houver ambiguidade não resolvível pelo Figma.

---

### Passo 2 — Estrutura do Documento Canônico

Reescreva `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` adotando esta estrutura **exata** (seções obrigatórias, nesta ordem):

```markdown
# DSS — Contrato Visual Canônico

> **Status:** Normativo Vinculante (Hierarquia Nível 1)
> **Última sincronização com Figma:** {DATA}
> **Versão DSS:** 2.2
> **Autoridade:** Este documento é a ÚNICA fonte de verdade para o contrato visual default
> dos componentes DSS. Em caso de conflito com qualquer outro documento, este prevalece.
> Em caso de conflito entre este documento e o Figma, o Figma prevalece (Princípio #12).

## 1. Escopo e Definições
- O que é "default visual" (extraído de DSS_VISUAL_DEFAULTS_DEFINITION.md)
- Diferença entre default visual, default funcional e default semântico
- Relação com `dss.meta.json.defaultPreview`

## 2. Princípios Normativos
- Token First (referência ao Princípio #1)
- Figma como árbitro (Princípio #12)
- Neutralidade do default (surface-default + text-body)

## 3. Tabela Mestre de Mapeamento Figma → Token DSS
(mesclar de DSS_VISUAL_DEFAULTS_STANDARD.md + PROMPT_DEFAULT_PREVIEW_EXTRACTION.md Passo 2)
- Tabela única, sem duplicação
- Coluna: Propriedade | Valor Figma | Token DSS | Componentes que aplicam

## 4. Catálogo Componente-a-Componente
Para CADA um dos ~90 componentes do `packages/core/components/`, seção fixa:

### 4.X DssNomeComponente
**Categoria:** {Action Control | Surface | Display | ...}
**Golden Reference:** {DssChip | DssBadge}
**Status de auditoria:** {sealed | conformant | pending}

**Contrato Visual Default:**
| Propriedade | Token DSS | Valor Resolvido | Fonte Figma |
|-------------|-----------|-----------------|-------------|
| min-height  | --dss-form-control-height-md | 44px | node 159-358 |
| padding-x   | --dss-spacing-3 | 12px | node 159-358 |
| padding-y   | --dss-spacing-2 | 8px  | node 159-358 |
| border-radius | --dss-radius-md | 8px | node 159-358 |
| border-width | --dss-border-width-thin | 1px | node 159-358 |
| font-size | --dss-font-size-md | 16px | node 159-358 |
| font-weight | --dss-font-weight-medium | 500 | node 159-358 |
| line-height | --dss-line-height-normal | 1.5 | node 159-358 |
| surface | --dss-surface-default | — | — |
| text-color | --dss-text-body | — | — |
| shadow | --dss-shadow-sm | — | node 159-358 |
| gap (se aplicável) | --dss-spacing-2 | 8px | node 159-358 |

**Touch target:** {44px nativo | 48px via ::before | N/A não-interativo}
**Exceções permitidas:** {lista de valores não-tokenizados justificados}
**Sincronizado com `dss.meta.json.defaultPreview`:** ✅ / ❌ (link para PR de correção se ❌)

## 5. Processo de Atualização
- Como atualizar este documento quando o Figma muda
- Como atualizar quando um novo componente é adicionado
- Quem aprova (governança)

## 6. Documentos Relacionados (não-normativos)
- DSS_VISUAL_CONTRACT.md — Estratégia de validação (3 camadas)
- DSS_VISUAL_DEFAULTS_AUDIT.md — Status de conformidade em tempo real
- PROMPT_DEFAULT_PREVIEW_EXTRACTION.md — Procedimento operacional Figma→JSON

## 7. Changelog
| Data | Mudança | Autor | Componentes afetados |
```

---

### Passo 3 — Preenchimento do Catálogo (Seção 4)

3.1. Liste todos os componentes em `packages/core/components/base/` e `packages/core/components/composed/`.

3.2. Para cada componente:
- Leia o `dss.meta.json` (campo `defaultPreview` + `tokensUsed`)
- Leia o `2-composition/_base.scss` para extrair valores reais aplicados
- **Cruze com o Figma** via MCP quando o componente tiver node correspondente
- Resolva cada token para seu valor px/rem real consultando `packages/core/tokens/`

3.3. Se o `defaultPreview` no `dss.meta.json` estiver **incompleto ou divergente** do Figma:
- **NÃO altere o `dss.meta.json` neste passo** (isso é trabalho de outra onda)
- Marque `Sincronizado: ❌` e adicione linha no Apêndice A com o gap

3.4. Crie **Apêndice A — Gaps de Sincronização** ao final do doc canônico, listando todos os componentes com `❌`, em ordem de prioridade (Phase 1 > Phase 2 > Phase 3).

---

### Passo 4 — Transformação dos Documentos Satélites

**4.1. `DSS_VISUAL_DEFAULTS_DEFINITION.md` e `DSS_VISUAL_DEFAULTS_STANDARD.md`**
Após mesclar o conteúdo no canônico, **substitua o corpo** desses dois arquivos por:

```markdown
# {Título original} — ARQUIVADO

> ⚠️ Este documento foi consolidado em
> [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md) (Seção {N}).
> Mantido apenas para referência histórica. Não atualize aqui.
```

**4.2. `DSS_VISUAL_CONTRACT.md`**
Mantenha o conteúdo (é estratégia, não contrato). Adicione no topo:

```markdown
> 📌 O **contrato** está em [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md).
> Este documento descreve a **estratégia de validação** desse contrato (Camadas 1-3).
```

**4.3. `DSS_VISUAL_DEFAULTS_AUDIT.md`**
Mantenha. Adicione no topo:

```markdown
> 📌 Auditoria de conformidade contra [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md).
> Este arquivo é *living* — atualizado a cada PR que afete um componente.
```

**4.4. `PROMPT_DEFAULT_PREVIEW_EXTRACTION.md`**
Mantenha. No Passo 2, substitua a tabela de mapeamento por:

```markdown
Use a **Tabela Mestre** definida em
[DSS_REFERENCIA_VISUAL_ANALISE.md § 3](./DSS_REFERENCIA_VISUAL_ANALISE.md#3-tabela-mestre-de-mapeamento-figma--token-dss).
NÃO duplique a tabela aqui.
```

---

### Passo 5 — Atualização do `CLAUDE.md`

5.1. Em `CLAUDE.md`, seção "🚨 Leitura Obrigatória", adicione como **item 11**:

```markdown
11. `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` *(Contrato Visual Canônico — fonte única de verdade para defaults visuais; consulte antes de implementar qualquer componente)*
```

5.2. Em "🏛️ Hierarquia de Autoridade", Nível 1, adicione como item 5:

```markdown
5. **DSS_REFERENCIA_VISUAL_ANALISE.md**
   → Contrato visual default (componente-a-componente)
   ⚠️ Em conflito, prevalece sobre qualquer outro doc visual; só perde para o Figma
```

---

### Passo 6 — Arquivamento Físico (último passo)

Mova os documentos que viraram apenas pointers para `docs/archive/`:

```bash
git mv docs/governance/DSS_VISUAL_DEFAULTS_DEFINITION.md docs/archive/governance/
git mv docs/governance/DSS_VISUAL_DEFAULTS_STANDARD.md docs/archive/governance/
```

Mantenha em `docs/governance/`:
- `DSS_REFERENCIA_VISUAL_ANALISE.md` (canônico)
- `DSS_VISUAL_CONTRACT.md` (estratégia)
- `DSS_VISUAL_DEFAULTS_AUDIT.md` (living)
- `PROMPT_DEFAULT_PREVIEW_EXTRACTION.md` (operacional)

Atualize todos os `*.md` do repositório que linkam para os arquivos arquivados (use `rg -l` para encontrar).

---

## ✅ Critérios de Aceite (Gate de Conclusão)

- [ ] `DSS_REFERENCIA_VISUAL_ANALISE.md` contém as 7 seções listadas no Passo 2
- [ ] Seção 4 cobre 100% dos componentes em `packages/core/components/{base,composed}/`
- [ ] Cada entrada componente-a-componente tem tabela completa (11+ linhas de propriedades quando aplicável)
- [ ] Apêndice A lista todos os gaps `defaultPreview` ≠ Figma com prioridade
- [ ] `/tmp/dss-doc-diffmap.md` anexado ao PR como evidência
- [ ] `CLAUDE.md` atualizado nos 2 pontos (Leitura Obrigatória + Hierarquia)
- [ ] 2 arquivos movidos para `docs/archive/governance/`
- [ ] Zero links quebrados (`rg "DSS_VISUAL_DEFAULTS_(DEFINITION|STANDARD)" docs/` retorna apenas os arquivos arquivados)
- [ ] Build do docs-portal passa (`npm run docs:build`)

---

## 🚫 Anti-Patterns desta Tarefa

- ❌ Reescrever o canônico sem ler os 6 docs originais (perde decisões históricas)
- ❌ Resolver divergências "por bom senso" sem consultar o Figma (viola Princípio #12)
- ❌ Alterar `dss.meta.json` de componentes (escopo de outra onda — só **documentar** o gap)
- ❌ Deletar arquivos sem `git mv` (perde histórico)
- ❌ Pular o diffmap (Passo 1) — é o único garantidor de não-regressão

---

## 📢 Commit Final

```
docs(governance): consolida contrato visual em fonte unica canonica

- DSS_REFERENCIA_VISUAL_ANALISE.md elevado a Nivel 1 da hierarquia
- Mescla DEFINITION + STANDARD no canonico (arquivados)
- VISUAL_CONTRACT, AUDIT e PROMPT_EXTRACTION viram pointers
- CLAUDE.md atualizado (leitura obrigatoria + hierarquia)
- Apendice A lista N gaps de sincronizacao Figma vs dss.meta.json
```

Envie o relatório ao orquestrador com:
1. Número total de componentes catalogados
2. Número de gaps identificados no Apêndice A
3. Divergências resolvidas via Figma (do diffmap)
4. Arquivos modificados / movidos / criados
