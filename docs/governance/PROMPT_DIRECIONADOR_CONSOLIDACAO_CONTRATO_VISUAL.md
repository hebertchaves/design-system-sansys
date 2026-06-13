# 🤖 PROMPT DIRECIONADOR: Consolidação do Contrato Visual Canônico (Figma ↔ defaultPreview)

> **Autor:** Orquestrador Estratégico do DSS
> **Destinatário:** Claude Code CLI (com acesso ao repositório local + MCP do Figma se disponível)
> **Status:** Pronto para execução (Onda 6)
> **Estimativa:** 3-5 horas de trabalho contínuo
> **Pré-requisito:** Branch limpa, build verde, e leitura obrigatória de `docs/governance/DSS_MONOREPO_PATH_MAP.md`

---

## 🎯 Objetivo Estratégico

Atualmente, o DSS possui uma fragmentação conceitual e física sobre o que define o **aspecto visual padrão (default)** dos componentes. Essa informação está dividida entre **5 documentos de governança em Markdown** (que tentam explicar o visual para humanos) e o campo **`defaultPreview` no `dss.meta.json`** de cada componente (que tenta explicar o visual para máquinas, como o MCP e ferramentas de teste visual).

Este projeto unifica essas duas frentes sob uma única diretriz arquitetural clara:

1. **A representação machine-readable** do contrato visual é o campo `defaultPreview` em cada `dss.meta.json`.
2. **A representação human-readable** do contrato visual é o documento `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md`, que atua como a **ÚNICA fonte de verdade narrativa** e deve ser gerado a partir da leitura direta dos arquivos `dss.meta.json`.
3. **Os outros 4 documentos de visual defaults** são redundantes, causam drift de informação e devem ser mesclados no canônico e arquivados.

---

## 📂 Inventário de Documentos no Escopo

Localize, leia e processe os seguintes arquivos antes de iniciar qualquer alteração:

| # | Arquivo | Função Atual | Decisão Arquitetural |
|---|---------|--------------|----------------------|
| 1 | `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` | Análise componente-a-componente do default visual. | **CANÔNICO — Única fonte de verdade narrativa.** |
| 2 | `docs/governance/DSS_VISUAL_CONTRACT.md` | Estratégia das 3 camadas de validação visual. | **Manter como documento de estratégia, apontando para o canônico.** |
| 3 | `docs/governance/DSS_VISUAL_DEFAULTS_DEFINITION.md` | Define o conceito de "default visual". | **Mesclar no canônico (Seção 1) e arquivar.** |
| 4 | `docs/governance/DSS_VISUAL_DEFAULTS_STANDARD.md` | Standard de tokens e padrões por categoria. | **Mesclar no canônico (Seção 3) e arquivar.** |
| 5 | `docs/governance/DSS_VISUAL_DEFAULTS_AUDIT.md` | Auditoria de conformidade de componentes. | **Manter como *living doc* de status, apontando para o canônico.** |

---

## 🛠️ Execução Passo-a-Passo

### Passo 1 — Saneamento do `defaultPreview` (Os 16 Componentes Estruturais)

Fisicamente, todos os 76 componentes possuem o campo `defaultPreview` preenchido. No entanto, **16 componentes de layout estrutural ou comportamental** possuem o campo `computedDimensions` ausente (pois não possuem dimensões físicas fixas em pixels):

> `DssInfiniteScroll`, `DssItemLabel`, `DssItemSection`, `DssLayout`, `DssList`, `DssPage`, `DssPageContainer`, `DssPageScroller`, `DssPageSticky`, `DssPopupProxy`, `DssPullToRefresh`, `DssResponsive`, `DssSpace`, `DssStepper`, `DssTimeline`, `DssTree`.

1. **Ação:** NÃO altere o JSON desses componentes. Eles são estruturais e adaptativos por natureza. No documento canônico (Passo 2), documente explicitamente o campo `computedDimensions` desses componentes como:
   `computedDimensions: N/A (Componente estrutural adaptativo)`
2. Para todos os demais **60 componentes**, use o JSON de `defaultPreview` como a fonte de verdade absoluta para preencher as tabelas do catálogo.

---

### Passo 2 — Estrutura do Novo Documento Canônico

Reescreva completamente o arquivo `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` adotando a estrutura exata abaixo. **Toda a informação histórica relevante dos documentos mesclados deve ser preservada e reorganizada nessas seções.**

```markdown
# DSS — Contrato Visual Canônico

> **Status:** Normativo Vinculante (Hierarquia Nível 1)
> **Versão DSS:** v2.3.0
> **Autoridade:** Este documento é a ÚNICA fonte de verdade narrativa para o contrato visual default dos componentes DSS. Em caso de conflito com qualquer outro documento de documentação, este prevalece. Em caso de conflito com o Figma, o Figma prevalece (Princípio #12).
> **Sincronização:** Este documento é o espelho em Markdown dos campos `defaultPreview` contidos nos arquivos `dss.meta.json` de cada componente.

## 1. Escopo e Definições
*(Mesclar o conteúdo de DSS_VISUAL_DEFAULTS_DEFINITION.md)*
- Definição clara de "default visual" (aspecto visual básico quando nenhuma prop de estilo é passada).
- Diferença entre default visual, default funcional e default semântico.
- Unidade visual e consistência (regras de cantos/corners, margens e paddings inferidos).
- Relação formal entre este documento (human-readable) e o `defaultPreview` do `dss.meta.json` (machine-readable).

## 2. Princípios Normativos do Design System
*(Preservar a metodologia e princípios de referências de mercado do DSS_REFERENCIA_VISUAL_ANALISE.md original)*
- **Token First** (Princípio #1).
- **Figma como Árbitro** (Princípio #12).
- **Neutralidade do Default** (uso de `surface-default` e `text-body` como base neutra).

## 3. Tabela Mestre de Mapeamento de Tokens Canônicos
*(Mesclar o conteúdo de DSS_VISUAL_DEFAULTS_STANDARD.md)*
- Padrões visuais por categoria de componentes (Controles, Formulários, Compactos, Superfícies, Navegação, Progresso).
- Tabela mestre de propriedades padrão (min-height, padding, border-radius, border-width, font, etc.) e seus respectivos tokens padrão.
- Lista de **Tokens Proibidos** (valores hardcoded, cores de ação incorretas, etc.).

## 4. Catálogo Canônico Componente-a-Componente
*(Varrer os 76 componentes em `packages/core/components/base/` e gerar uma entrada para cada um baseando-se estritamente no `defaultPreview` do seu `dss.meta.json`)*

### 4.X DssNomeComponente
**Categoria:** {Action Control | Surface | Display | Form | Layout | ...}
**Fase de Entrega:** {Fase 1 | Fase 2 | Fase 3}
**Status de Conformidade:** {Sealed | Conformant}

**Configuração de Preview Padrão (defaultPreview):**
- **Props Aplicadas:** `props` declaradas no JSON.
- **Conteúdo de Demonstração:** `demoContent` aplicado.

**Tabela de Contrato de Tokens:**
| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |
| :--- | :--- | :---: | :--- |
| **min-height** | `--dss-...` | `XXpx` | defaultPreview / Figma |
| **min-width** | `--dss-...` | `XXpx` | defaultPreview / Figma |
| **padding** | `--dss-...` | `XXpx` | defaultPreview / SCSS |
| **gap** | `--dss-...` | `XXpx` | defaultPreview / SCSS |
| **border-radius** | `--dss-...` | `XXpx` | defaultPreview / SCSS |
| **border-width** | `--dss-...` | `XXpx` | defaultPreview / SCSS |
| **surface** | `--dss-...` | — | defaultPreview / SCSS |
| **text-color** | `--dss-...` | — | defaultPreview / SCSS |
| **shadow** | `--dss-...` | — | defaultPreview / SCSS |

*(Nota: Para os 16 componentes estruturais identificados no Passo 1, preencha a linha de `min-height`/`min-width` com "N/A — Componente estrutural adaptativo")*

## 5. Governança e Processo de Atualização
- Regra de sincronização obrigatória: qualquer alteração no visual de um componente exige a atualização simultânea do `dss.meta.json` (`defaultPreview`) e a regeneração da respectiva tabela neste documento.
- Como adicionar novos componentes mantendo a unidade visual (inferência de padrões).
```

---

### Passo 3 — Atualização dos Documentos Satélites

1. **`docs/governance/DSS_VISUAL_CONTRACT.md`:**
   Adicione o seguinte aviso de pointer no topo do arquivo, mantendo o restante do seu conteúdo estratégico de validação intacto:
   ```markdown
   > 📌 **Nota de Governança:** O contrato visual normativo e detalhado componente-a-componente foi consolidado em [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md). Este documento descreve exclusivamente a **estratégia e arquitetura de validação** (Camadas 1-3) desse contrato.
   ```

2. **`docs/governance/DSS_VISUAL_DEFAULTS_AUDIT.md`:**
   Adicione o seguinte aviso no topo do arquivo, mantendo o histórico de auditoria intacto:
   ```markdown
   > 📌 **Nota de Governança:** Este é um documento vivo de acompanhamento de status. O contrato normativo contra o qual esta auditoria é realizada reside em [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md).
   ```

---

### Passo 4 — Arquivamento Físico e Limpeza de Redundâncias

Mova os documentos que foram completamente consolidados e mesclados para a pasta de arquivos históricos usando o comando `git mv` para preservar o histórico do Git:

```bash
git mv docs/governance/DSS_VISUAL_DEFAULTS_DEFINITION.md docs/archive/governance/
git mv docs/governance/DSS_VISUAL_DEFAULTS_STANDARD.md docs/archive/governance/
```

Substitua o conteúdo original dos arquivos arquivados (agora em `docs/archive/governance/`) por um aviso simples de arquivamento apontando para o novo canônico:

```markdown
# {Título Original} — ARQUIVADO

> ⚠️ **Este documento foi consolidado e arquivado.**
> Todo o seu conteúdo normativo foi mesclado em [DSS_REFERENCIA_VISUAL_ANALISE.md](../../governance/DSS_REFERENCIA_VISUAL_ANALISE.md) como parte da Onda 6 de Saneamento Arquitetural.
> Mantido nesta pasta apenas para fins de referência histórica. Não faça alterações aqui.
```

---

### Passo 5 — Atualização do `CLAUDE.md`

Atualize o arquivo `CLAUDE.md` na raiz do projeto para refletir a nova realidade documental:

1. Na seção **"🚨 Leitura Obrigatória"**, certifique-se de que o item correspondente ao `DSS_REFERENCIA_VISUAL_ANALISE.md` descreva-o como o **Contrato Visual Canônico (human-readable do defaultPreview)**.
2. Na seção **"🏛️ Hierarquia de Autoridade"**, confirme que o `DSS_REFERENCIA_VISUAL_ANALISE.md` está listado no **Nível 1** como autoridade máxima sobre aspectos visuais padrão.
3. Remova qualquer referência aos arquivos arquivados (`DSS_VISUAL_DEFAULTS_DEFINITION.md` e `DSS_VISUAL_DEFAULTS_STANDARD.md`) das regras ativas do `CLAUDE.md`.

---

## ✅ Critérios de Aceite (Gate de Conclusão)

- [ ] O arquivo `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` foi completamente reescrito seguindo a estrutura de 5 seções descrita no Passo 2.
- [ ] O catálogo da Seção 4 contém **exatamente 76 componentes** (todos os componentes existentes em `packages/core/components/base/`).
- [ ] Cada componente no catálogo possui as informações de `props`, `demoContent` e a tabela de tokens preenchida a partir do seu respectivo `dss.meta.json`.
- [ ] Os 16 componentes estruturais estão documentados com `computedDimensions: N/A (Componente estrutural adaptativo)`.
- [ ] Os arquivos `DSS_VISUAL_DEFAULTS_DEFINITION.md` e `DSS_VISUAL_DEFAULTS_STANDARD.md` foram movidos para `docs/archive/governance/` via `git mv` e substituídos por pointers de arquivamento.
- [ ] Os arquivos `DSS_VISUAL_CONTRACT.md` e `DSS_VISUAL_DEFAULTS_AUDIT.md` contêm os avisos de governança apontando para o canônico.
- [ ] O `CLAUDE.md` foi atualizado com as novas regras e hierarquia.
- [ ] O build do portal de documentação passa sem erros (`npm run docs:build`).
- [ ] Zero links quebrados no repositório (verifique se nenhum arquivo ativo aponta para os caminhos antigos dos arquivos arquivados).

---

## 🚫 Anti-Patterns a Evitar

- ❌ Deletar os arquivos originais sem usar `git mv` (perda de histórico de commits).
- ❌ Inventar valores de tokens ou dimensões que não estejam declarados no `defaultPreview` do componente (o Markdown deve ser o espelho fiel do JSON).
- ❌ Deixar referências ou links quebrados para os arquivos arquivados nos demais guias de `docs/`.
- ❌ Alterar os arquivos `dss.meta.json` dos componentes (o escopo desta tarefa é **documentar o estado atual de forma canônica**, não alterar o código ou metadados dos componentes).

---

## 📢 Mensagem de Commit Padrão

```
docs(governance): consolida contrato visual em fonte unica canonica

- DSS_REFERENCIA_VISUAL_ANALISE.md reescrito como espelho do defaultPreview
- Mescla DEFINITION e STANDARD no canônico e move originais para archive/
- Adiciona avisos de governança em VISUAL_CONTRACT e VISUAL_DEFAULTS_AUDIT
- Atualiza CLAUDE.md com a nova hierarquia de autoridade visual
- Catalogados 76 componentes com mapeamento 100% fiel ao dss.meta.json
```
