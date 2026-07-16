# Relatório de emissão de contratos — Grupo **Form/Input**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · gerado em 2026-07-02 @ `import/dss-v2.4.0`.
> Backfill do `dss.meta.json` (`classification` só onde ausente + `tagline` + bloco `a11y`
> verificado) → emissão + validação de `dss.contract.json`. Nenhum valor de token/visual/runtime
> alterado.

## Placar

- **23/23** componentes do grupo com `dss.contract.json` emitido, **schema-válido**, **0 gaps**,
  **0 âncoras a11y reprovadas**.
- `node scripts/emit-contract.mjs --all --strict` → **exit 0** (25/25 no repo: 23 novos + DssInput +
  DssSelect já existentes).

## 1. Feito (emitidos — schema ✅, 0 gaps, a11y N/N verificados)

| Componente | classification | props/slots/emits | estados | tokens | a11y (wcag verificados) |
|---|---|---|---|---|---|
| DssBadge | Visual¹ | 11/1/0 | 2 | 24 | 1 |
| DssBtnDropdown | Action² | 22/2/0 | 5 | 178 | 3 |
| DssBtnGroup | Action² | 11/1/0 | 5 | 177 | 3 |
| DssBtnToggle | Action² | 16/0/1 | 5 | 177 | 3 |
| DssButton | (existente) | 26/3/1 | 6 | 60 | 3 |
| DssCheckbox | Action¹ | 15/1/1 | 5 | 46 | 4 |
| DssChip | Compact¹ | 20/3/3 | 5 | 60 | 5 |
| DssField | Action¹ | 15/8/0 | 5 | 41 | 2 |
| DssFile | Action¹ | 20/4/5 | 4 | 48 | 4 |
| DssIcon | Visual¹ | 9/1/0 | 1 | 10 | 2 |
| DssKnob | Action¹ | 18/1/3 | 4 | 15 | 2 |
| DssOptionGroup | Action² | 11/0/1 | 5 | 174 | 4 |
| DssRadio | Action² | 14/1/1 | 5 | 43 | 4 |
| DssRange | Action¹ | 16/0/2 | 5 | 35 | 3 |
| DssRouteTab | Action² | 10/1/0 | 4 | 20 | 3 |
| DssSeparator | Visual¹ | 6/0/0 | 1 | 17 | 1 |
| DssSlider | Action¹ | 20/0/2 | 3 | 35 | 3 |
| DssSpace | Visual¹ | 1/0/0 | 1 | 21 | 1 |
| DssStep | Action² | 11/1/0 | 4 | 37 | 3 |
| DssTab | Action² | 5/1/0 | 4 | 22 | 3 |
| DssTextarea | Action¹ | 21/7/4 | 5 | 45 | 4 |
| DssToggle | Action² | 15/1/1 | 5 | 59 | 4 |
| DssTooltip | Visual¹ | 7/1/0 | 1 | 20 | 1 |

¹ `classification` backfillado por este trabalho (estava ausente). ² já presente no meta — preservado.

**Âncoras a11y usadas (todas verificadas antes de escrever, via `wcag-kit`):**
- `test` (2.1.1 teclado) — `Dss<Nome>.test.js` existe nos 23.
- `css` focus ring (2.4.7, `:focus`+`outline`) — só onde a regra existe no CSS compilado do componente.
- `css` touch target (2.5.5, `::before`+`min-height`) — Checkbox, Chip, Radio, Toggle.
- `css` contraste (1.4.3, `text-primary`/`gray-50` = 9.59 AA) — **só** onde o texto default é
  escuro-sobre-claro.
- `aria` (4.1.2 / 1.1.1 / 1.3.1) — só onde há prop aria genuína (`ariaLabel`, `ariaHidden`, etc.).

## 2. Não feito / adiado

Nenhum. Os 23 do grupo foram emitidos.

## 3. Precisa de atenção (decisões/claims a revisar, não bloqueiam o gate)

- **`phase` driftado corrigido:** `DssRadio` (`"Fase 1"` → `1`) e `DssToggle` (`"1"` → `1`) tinham
  `phase` como string, reprovando o schema (`identity.phase must be integer`). Normalizado para
  inteiro — correção de metadado, não de visual/runtime.
- **Contraste deliberadamente NÃO reivindicado** onde o texto default fica sobre superfície
  colorida/escura (o par `text-primary`/`gray-50` seria falso): DssButton, DssBtnDropdown,
  DssBtnGroup, DssBtnToggle, DssBadge, DssTooltip. Esses usam apenas âncoras `test`/`css-focus`/`aria`.
- **a11y mínima (1 critério) nos não-interativos** DssBadge, DssSeparator, DssSpace, DssTooltip —
  correto por natureza (schema exige `wcag` minItems 1). DssSpace usa 1.3.1/`test` (spacer
  presentacional, sem papel/rótulo).
- **DssField com `role: ""`** — é moldura de campo (envolve o controle real), sem papel próprio;
  a11y ancorada em contraste + 3.3.2 (associação rótulo/dica/erro via `test`).
- **Âncora `aria` é frouxa no emissor:** `verifyA11y` aceita qualquer prop que case `/aria|required/i`
  — inclusive `variant` (contém a substring "aria"). Para não depender disso, só reivindiquei 4.1.2
  onde há prop aria **genuína**; onde não havia (DssKnob, DssRouteTab, DssStep, DssTab), usei
  `test`/`css` em vez de `aria`. **Sugestão de robustez:** apertar o regex do emissor para nomes de
  prop aria reais.

## 4. Precisa de ajuste extra (fora do escopo deste handoff — dívida de componente)

- **Focus ring ausente no CSS próprio** de vários interativos (`:focus`+`outline` = 0 na sondagem):
  DssCheckbox, DssRadio, DssToggle, DssField, DssRange, DssSlider. Checkbox/Radio/Toggle mitigam com
  touch target `::before`, mas a **visibilidade de foco** desses controles depende de regra
  global/Quasar, não do componente — verificar na adequação de UI (Onda Higiene) se o anel de foco
  aparece de fato (LIGHT + DARK). DssRange/DssSlider não têm nem outline nem `::before` no CSS próprio.
- **Débito de contraste `action-primary` + branco** (texto normal falha AA em hub/water/default) já
  registrado no blueprint (§6-O / frente c1, aguardando decisão da equipe). Por isso o contraste de
  texto sobre superfície de ação **não** foi reivindicado nos botões — evita claim que reprovaria.

## Comandos de reprodução

```
node scripts/emit-contract.mjs --all --strict   # exit 0, 25/25
```
