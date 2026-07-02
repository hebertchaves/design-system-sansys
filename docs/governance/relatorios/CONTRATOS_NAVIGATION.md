# Relatório de emissão de contratos — Grupo **Navigation**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · gerado em 2026-07-02 @ `import/dss-v2.4.0`.

## Placar

- **9/9** componentes do grupo com `dss.contract.json` emitido — **schema ✅, 0 gaps, 0 âncoras a11y
  reprovadas**.
- `node scripts/emit-contract.mjs --all --strict` → **exit 0** (35/35 no repo).

## 1. Feito

| Componente | classification | props/slots/emits | estados | tokens | a11y | role |
|---|---|---|---|---|---|---|
| DssBreadcrumbs | Visual | 5/2/0 | 1 | 13 | 2 | navigation |
| DssDrawer | Visual | 0/0/0 | 1 | 11 | 1 | complementary |
| DssMarkupTable | Visual | 7/1/0 | 5 | 189 | 3 | table |
| DssMenu | Visual | 6/1/0 | 1 | 13 | 2 | menu |
| DssPagination | Action | 14/0/1 | 3 | 25 | 4 | navigation |
| DssStepper | Visual | 8/2/1 | 1 | 5 | 3 | group |
| DssTabPanel | Visual | 2/1/0 | 5 | 175 | 3 | tabpanel |
| DssTabPanels | Visual | 5/1/1 | 5 | 174 | 3 | — |
| DssTabs | Action | 7/1/1 | 5 | 181 | 4 | tablist |

**Âncoras a11y** (todas verificadas antes de escrever): `test` (2.1.1 teclado nos interativos),
`css` focus ring (2.4.7, onde existe no CSS compilado), `css` contraste (1.4.3, `text-primary`/`gray-50`),
`aria` (4.1.2, só com prop aria genuína), `test` (1.3.1, estrutura semântica de container).

## 2. Não feito / adiado
Nenhum. Os 9 foram emitidos.

## 3. Precisa de atenção — **decisão de governança tomada, sinalizar**

- **Normalização de `classification` (Fase 2 → taxonomia).** Estes metas de Fase 2 traziam
  `classification` em **convenção diferente** da taxonomia do handoff (`Action|Compact|Visual`):
  - prosa arquitetural longa (ex.: DssBreadcrumbs, DssStepper, DssTabs…);
  - **objeto** `{type, category, interactive}` em `DssMarkupTable` (reprovava o schema `type: string`);
  - `null` em `DssPagination` (viraria string vazia → gap).

  **Ação:** normalizei `classification` para a taxonomia e **preservei o valor anterior** em
  `classificationNote` (convenção `*Note` já usada nesses arquivos) — não-destrutivo. Verifiquei que
  **o único leitor de `meta.classification` no repo é `emit-contract.mjs`** (`grep` global), então a
  normalização não quebra outro consumidor. **Recomendo ratificar** a taxonomia atribuída:
  Breadcrumbs/Drawer/MarkupTable/Menu/Stepper/TabPanel/TabPanels = **Visual** (containers
  não-interativos); Pagination/Tabs = **Action** (interativos com navegação por teclado).

- **`aria` frouxa no emissor** (idem Form/Input): reivindiquei 4.1.2/`aria` só onde há prop aria
  genuína (Pagination, Stepper, Tabs). Onde não havia (Breadcrumbs, Drawer, MarkupTable, Menu,
  TabPanel, TabPanels), ancorei em `css`/`test`.

- **DssDrawer expõe 0 props** no `types` (passa tudo via `$attrs`/Quasar). a11y mínima (1.3.1/`test`)
  — honesta para um shell de layout, mas a superfície de API do contrato fica vazia; vale revisar se
  o wrapper deveria tipar props.

## 4. Precisa de ajuste extra (fora de escopo — dívida de componente)

- **Blocos `accessibility`/`ariaRole`/`ariaLabel` legados** já existem em vários metas de Fase 2 (ex.:
  DssBreadcrumbs, DssMarkupTable) numa forma **não-verificável** (prosa). O bloco `a11y` que adicionei
  é o formato **verificado** (`verifiedBy`) exigido pelo contrato; os dois coexistem. Consolidar/retirar
  o bloco legado é higiene documental futura, fora deste handoff.
- **Focus ring** em containers com foco (MarkupTable, TabPanel, TabPanels, Tabs têm `:focus` outline;
  Menu/Drawer/Stepper/Breadcrumbs não no CSS próprio) — a visibilidade de foco de Menu/Drawer depende
  de gestão do Quasar; verificar na adequação de UI.
