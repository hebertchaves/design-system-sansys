# PROMPT — AGENTE 4: LAYOUT, ESTRUTURA & PÁGINA
**Auditoria Organizacional do DSS | Família de Componentes Estruturais**

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
- Componentes de layout são majoritariamente **não-interativos** — não têm hover/active (documentar explicitamente)
- DssCard é o Golden Context para componentes de superfície
- DssLayout, DssPage, DssHeader, DssFooter, DssDrawer formam o **esqueleto da aplicação** — dependência crítica
- `_brands.scss` pode ser intencionalmente vazio (sem comentário) em componentes não-brandáveis — isso é válido
- Componentes de página (`DssPage*`) geralmente têm CSS mínimo ou nenhum — estrutura via Quasar

**Sistema de Selos**: pasta em `docs/Compliance/seals/DssNomeComponente/` com `DSSNOMECOMPONENTE_SELO_v2.2.md`.

---

## SEU PAPEL

Você é um **auditor observador**. Leia, entenda e descreva. Não implemente. Avalie os componentes como **blocos** — estrutura geral, presença de arquivos, consistência e função no sistema.

---

## SEU DOMÍNIO

Analise os seguintes componentes em `packages/core/components/base/`:

**Superfícies e Contêineres:**
- DssCard *(Golden Context para superfícies)*
- DssList
- DssItem
- DssItemSection
- DssItemLabel

**Estrutura de Página (App Shell):**
- DssLayout
- DssPage
- DssPageContainer
- DssPageSticky
- DssPageScroller
- DssHeader
- DssFooter
- DssDrawer

**Toolbars e Ações Flutuantes:**
- DssToolbar
- DssToolbarTitle
- DssFab
- DssFabAction

**Para cada componente, verifique também** sua pasta de selo em:
`docs/Compliance/seals/DssNomeComponente/`

**Fora do escopo**: componentes não listados, `apps/`, `packages/mcp/`, `docs/`.

---

## PERGUNTAS-GUIA DA AUDITORIA

1. **Qual é o papel deste componente na hierarquia da aplicação?** É um container, uma superfície, parte do shell de navegação?
2. **A estrutura de 4 camadas está presente?** Para componentes sem CSS ativo, as camadas existem mesmo que com conteúdo mínimo?
3. **O componente e seu selo estão alinhados?** Se o componente tem pouco CSS, isso está justificado no selo?
4. **A relação entre componentes desta família está clara?** DssLayout → DssPage → DssPageContainer forma uma hierarquia explícita?
5. **Há arquivos obsoletos, duplicatas ou lacunas?**

---

## SISTEMA DE DISPOSIÇÃO

- `KEEP` — bem alocado, estrutura completa
- `REALLOCATE` — no lugar errado → indique destino
- `ARCHIVE` — valor histórico, não é referência ativa
- `INTEGRATE` — conhecimento precisa migrar antes de remoção
- `REMOVE` — sem valor residual

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

- **[SIGNAL-L01]** `DssLayout` tem SCSS intencionalmente vazio — toda a estrutura vem do Quasar. Verifique se este padrão (bloco SCSS vazio) está documentado no selo e se os outros componentes de página seguem o mesmo padrão com justificativa explícita.
- **[SIGNAL-L02]** `DssCard` é usado como Golden Context por vários componentes de outras famílias. Verifique se a estrutura do DssCard (4 camadas, `DssCardSection`, `DssCardActions`) está completa e se os sub-componentes têm seus próprios selos ou compartilham o do DssCard.
- **[SIGNAL-L03]** `DssFab` e `DssFabAction` são componentes interdependentes. Verifique se sua documentação deixa clara a relação de composição e se os selos refletem que DssFabAction é um filho exclusivo de DssFab.
- **[SIGNAL-L04]** `DssDrawer` tem um comportamento especial: `behavior="default"` após `v-bind` bloqueia override de propriedades. Verifique se essa exceção está documentada no API.md ou no meta.json como gateException.

---

## FORMATO DE SAÍDA

```
## AGENTE 4 — LAYOUT, ESTRUTURA & PÁGINA: Relatório de Auditoria Organizacional

### 1. Inventário por Componente
[Para cada componente: nome, tipo (interativo/não-interativo), arquivos presentes, selo (S/N), observação]

### 2. Hierarquia de Dependência da Família
[Como os componentes desta família se relacionam entre si — quem depende de quem]

### 3. Qualidade da Distribuição Estrutural
[As 4 camadas estão presentes mesmo quando têm conteúdo mínimo? Os casos especiais (CSS vazio) estão justificados?]

### 4. Disposições Recomendadas
[Por componente ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### 5. Confirmação dos Sinais Pré-Identificados
[Para cada SIGNAL-L0X: CONFIRMADO / CONTRADITO / EXPANDIDO]

### 6. Novos Sinais Encontrados
[Marque como [SIGNAL-L0X-NEW]]

### 7. Recomendações de Melhoria Estrutural
[Sem código — apenas observações organizacionais]
```
