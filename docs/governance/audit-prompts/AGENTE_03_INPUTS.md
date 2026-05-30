# PROMPT — AGENTE 3: INPUTS & CONTROLES
**Auditoria Organizacional do DSS | Família de Componentes de Entrada**

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

**Princípios críticos para esta família**:
- Componentes de input envolvem (`wrap`) os componentes Quasar correspondentes (QInput, QSelect, etc.) — não os reimplementam
- `DssField` é uma exceção: é custom (não usa QField) — usa foco via `focusin/focusout` bubbling
- Estados obrigatórios: hover, focus, active, disabled, loading (ou justificativa de ausência)
- Touch target ≥ 48px via `::before` (WCAG 2.5.5)
- `::before` é **exclusivo** para touch target — nunca para efeitos visuais

**Sistema de Selos**: pasta em `docs/Compliance/seals/DssNomeComponente/` com `DSSNOMECOMPONENTE_SELO_v2.2.md`.

---

## SEU PAPEL

Você é um **auditor observador**. Leia, entenda e descreva. Não implemente, não corrija. Avalie os componentes como **blocos** — estrutura geral, presença de arquivos, consistência e função no sistema.

---

## SEU DOMÍNIO

Analise os seguintes componentes em `packages/core/components/base/`:

**Inputs de Texto:**
- DssInput
- DssTextarea
- DssField *(custom — não usa QField)*

**Seletores e Escolhas:**
- DssSelect
- DssCheckbox
- DssRadio
- DssToggle
- DssOptionGroup

**Controles de Faixa:**
- DssSlider
- DssRange
- DssKnob
- DssRating

**Upload e Interação Especial:**
- DssFile
- DssPullToRefresh

**Para cada componente, verifique também** sua pasta de selo em:
`docs/Compliance/seals/DssNomeComponente/`

**Fora do escopo**: componentes não listados acima, `apps/`, `packages/mcp/`, `docs/`.

---

## PERGUNTAS-GUIA DA AUDITORIA

1. **O que este componente faz e como ele se relaciona com o Quasar subjacente?** É um wrapper de QInput, QSelect, etc.? Ou é custom?
2. **A estrutura está completa?** As 4 camadas existem? O Entry Point Wrapper existe? O `.test.js` cobre os casos básicos?
3. **O componente e seu selo estão alinhados?** O selo existe e está na pasta correta?
4. **A separação de responsabilidades está clara?** O componente delega para o Quasar ou recria funcionalidade que deveria ser do framework?
5. **Há arquivos obsoletos, duplicatas ou lacunas evidentes?**

---

## SISTEMA DE DISPOSIÇÃO

- `KEEP` — bem alocado, estrutura completa
- `REALLOCATE` — no lugar errado → indique destino
- `ARCHIVE` — valor histórico, não é referência ativa
- `INTEGRATE` — conhecimento precisa migrar antes de remoção
- `REMOVE` — sem valor residual

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

- **[SIGNAL-I01]** `DssInput/1-structure/` contém apenas `DssInput.ts.vue` (sem `DssInput.vue`), ao contrário de outros componentes que têm ambos. Isso causou um erro de build que foi corrigido no `components/index.js` (linha 51: `1-structure/DssInput.ts.vue`). Confirme se esta é a única exceção ou se outros componentes desta família têm o mesmo padrão.
- **[SIGNAL-I02]** `DssField` foi implementado como componente custom (não usa QField) com lógica de foco via eventos bubbling. Verifique se sua estrutura de 4 camadas e documentação refletem adequadamente essa exceção arquitetural.
- **[SIGNAL-I03]** `DssSelect` usa `popup-content-class` para teleportar o painel do dropdown — diferente de outros inputs. Verifique se essa característica está documentada no API.md e no meta.json como exceção (gateException).
- **[SIGNAL-I04]** `DssPullToRefresh` é o único componente desta família que envolve um gesto de interação mobile (pull gesture). Verifique se há documentação de acessibilidade que explique a limitação de teclado e a necessidade de um DssButton adjacente como alternativa.

---

## FORMATO DE SAÍDA

```
## AGENTE 3 — INPUTS & CONTROLES: Relatório de Auditoria Organizacional

### 1. Inventário por Componente
[Para cada componente: nome, tipo (wrapper/custom), arquivos presentes, selo (S/N), observação]

### 2. Função da Família no Ecossistema
[Papel desta família e como ela depende do Quasar Framework]

### 3. Padrão de Delegação ao Quasar
[Quais componentes delegam ao framework e quais são custom — e se isso está documentado]

### 4. Qualidade da Distribuição Estrutural
[Há inconsistências entre componentes da mesma família?]

### 5. Disposições Recomendadas
[Por componente ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### 6. Confirmação dos Sinais Pré-Identificados
[Para cada SIGNAL-I0X: CONFIRMADO / CONTRADITO / EXPANDIDO]

### 7. Novos Sinais Encontrados
[Marque como [SIGNAL-I0X-NEW]]

### 8. Recomendações de Melhoria Estrutural
[Sem código — apenas observações organizacionais]
```
