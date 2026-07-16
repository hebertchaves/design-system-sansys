# Relatório de emissão de contratos — Grupo **Overlay**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · 2026-07-02 @ `import/dss-v2.4.0`.

## Placar
- **1/1** com `dss.contract.json` — schema ✅, 0 gaps, âncoras a11y verificadas. Gate `--all --strict` exit 0.

## 1. Feito
| Componente | classification | props/slots/emits | estados | tokens | a11y | role |
|---|---|---|---|---|---|---|
| DssInnerLoading | Visual¹ | 6/1/0 | 1 | — | 1 | status |

¹ backfillada (estava ausente).

**a11y:** overlay de carregamento não-interativo → `role=status`, `aria-busy`. 1.3.1 (`test`): região que oculta o conteúdo pai enquanto `showing`.

## 2. Não feito / adiado — nenhum.
## 3. Precisa de atenção — nenhum ponto frágil.
## 4. Ajuste extra (fora de escopo) — nenhum.
