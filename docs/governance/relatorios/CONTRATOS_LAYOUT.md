# Relatório de emissão de contratos — Grupo **Layout**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · 2026-07-02 @ `import/dss-v2.4.0`.

## Placar
- **10/10** com `dss.contract.json` — schema ✅, 0 gaps, âncoras a11y verificadas. Gate `--all --strict` exit 0.

## 1. Feito
| Componente | classification | a11y | role (marco/landmark) |
|---|---|---|---|
| DssCard | Visual | 3 | — (superfície) |
| DssFooter | Visual | 2 | contentinfo |
| DssHeader | Visual | 2 | banner |
| DssItemSection | Visual | 2 | — |
| DssLayout | Visual | 1 | — (container raiz) |
| DssList | Visual | 4 | list |
| DssPage | Visual | 2 | main |
| DssPageContainer | Visual | 1 | — |
| DssToolbar | Visual | 2 | toolbar |
| DssToolbarTitle | Visual | 1 | — |

**Âncoras:** `test` (1.3.1, estrutura de marco/landmark), `css` contraste (1.4.3, onde há texto),
`css` focus (2.4.7, DssCard/DssList têm outline), `aria` (4.1.2, DssList tem `ariaLabel`/`ariaLabelledby`).
Todos tinham `classification` em prosa (Fase 2) → normalizada; original preservado em `classificationNote`.

## 2. Não feito / adiado — nenhum.

## 3. Precisa de atenção — **mapeamento a revisar**
- **DssCard → Visual:** classifiquei como superfície (Visual), mas o componente expõe `clickable`
  (com `:focus` outline no CSS). Se a variante clicável for de primeira classe, poderia ser **Action**.
  **Revisar.**
- **DssList → Visual:** container de lista (não-interativo), embora agrupe itens interativos (DssItem).
  Mantido Visual; confirmar.
- Marcos de landmark (`banner`/`contentinfo`/`main`/`toolbar`) atribuídos pela natureza do componente
  — validar contra o role real emitido pelo QLayout/QHeader/QFooter/QPage subjacente.

## 4. Ajuste extra (fora de escopo)
- Vários wrappers de layout expõem **0 props tipadas** (DssFooter, DssHeader, DssLayout, DssPage,
  DssPageContainer) — passam tudo via `$attrs`/Quasar. A superfície de API do contrato fica vazia;
  vale avaliar se deveriam tipar props (idem DssDrawer no grupo Navigation).
