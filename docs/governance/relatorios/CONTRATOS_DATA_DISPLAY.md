# Relatório de emissão de contratos — Grupo **Data Display**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · 2026-07-02 @ `import/dss-v2.4.0`.

## Placar
- **3/3** com `dss.contract.json` — schema ✅, 0 gaps, âncoras a11y verificadas. Gate `--all --strict` exit 0.

## 1. Feito
| Componente | classification | props/slots/emits | a11y | role |
|---|---|---|---|---|
| DssBreadcrumbsEl | **Action** | 6/1/0 | 3 | link |
| DssItem | **Action** | 14/… | 5 | listitem |
| DssItemLabel | Visual | 4/… | 2 | — |

**Âncoras:** `test` (2.1.1), `css` focus (2.4.7), `css` touch `::before` (2.5.5, DssItem), `aria` (4.1.2, DssItem tem `ariaLabel`), `css` contraste (1.4.3), `test` (1.3.1).

Todos os 3 tinham `classification` em prosa (Fase 2) → normalizada; valor original preservado em `classificationNote`.

## 2. Não feito / adiado — nenhum.

## 3. Precisa de atenção — **mapeamento a revisar** (enum garante valor bem-formado, não a escolha)
- **DssBreadcrumbsEl → Action:** é o item-link clicável da trilha (`to`/`href`). Bucket Action justificável; revisar se governança prefere tratá-lo como parte Visual do container DssBreadcrumbs.
- **DssItem → Action:** classifiquei como Action por ser clicável (`clickable`, `tabindex`, touch target). Mas é frequentemente usado como linha **não-interativa** de conteúdo. Se a maioria dos usos for estático, poderia ser Visual. **Revisar.**

## 4. Ajuste extra (fora de escopo) — nenhum.
