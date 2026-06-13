# Agent 1 Report — DSS Visual Properties Migration (sections 4.1–4.8)

## Summary
- Components assigned: 8
- Components processed successfully: 8
- Components with divergences: 7
- Components with errors: 0

## Components Processed

| Component | Properties extracted | Status | Notes |
|---|---|---|---|
| DssAjaxBar | 5 | ✅ OK | |
| DssAvatar | 7 | ✅ OK | border-radius uses geometric constant, not a --dss- token |
| DssBadge | 9 | ✅ OK | line-height token cell is literal `1` (no --dss- token) |
| DssBanner | 6 | ✅ OK | font-size in table is `--dss-font-size-sm` but computedTokens has `--dss-font-size-md` |
| DssBar | 7 | ✅ OK | |
| DssBreadcrumbs | 4 | ✅ OK | font-size in table is `--dss-font-size-md` but computedTokens has `--dss-font-size-sm` |
| DssBreadcrumbsEl | 7 | ✅ OK | text-decoration (hover) uses literal `underline`, not a --dss- token |
| DssBtnDropdown | 10 | ✅ OK | `item height` uses hardcoded `40px`; border-radius diverges from computedTokens |

## Divergences Detected

### DssAvatar
- **Hardcoded non-DSS token**: property `border-radius` uses `50% (constante geométrica)` instead of a `--dss-` token. This is a known geometric constant exception (circular avatar), not a DSS token. Documented as such in the source table.

### DssBadge
- **Hardcoded non-DSS token**: property `line-height` token cell contains the literal value `1` (a unitless number), not a `--dss-` token. No DSS line-height token corresponds to `1`; this appears to be an intentional structural exception for badge tight line-height.

### DssBanner
- **Font-size divergence**: The visual table specifies `--dss-font-size-sm` (value `14px`) for `font-size`, while `computedTokens.fontSize` in the existing JSON was `--dss-font-size-md`. The `visualProperties` array faithfully mirrors the table value (`--dss-font-size-sm`). The discrepancy between `computedTokens` and `visualProperties` should be reconciled — the table cites `Seção 3.2 tipografia` as justification for `--dss-font-size-sm`.

### DssBreadcrumbs
- **Font-size divergence**: The visual table specifies `--dss-font-size-md` (value `14px`) for `font-size`, while `computedTokens.fontSize` in the existing JSON was `--dss-font-size-sm`. The `visualProperties` array faithfully mirrors the table value (`--dss-font-size-md`). The discrepancy should be reconciled — the table references `Seção 13.23`, but the component's `tokensUsed` list only contains `--dss-font-size-sm`.

### DssBreadcrumbsEl
- **Hardcoded non-DSS token**: property `text-decoration (hover)` uses literal `underline` instead of a `--dss-` token. This matches exception EXC-02 already registered in the component's `dss.meta.json`, which states there is no DSS token for `text-decoration` and that `underline` is a WCAG-aligned convention.

### DssBtnDropdown
- **Hardcoded non-DSS token**: property `item height` token cell contains the literal value `40px` (hardcoded px value), not a `--dss-` token. No compact control height token covers this panel item height in the current DSS token catalog.
- **Border-radius divergence**: The visual table specifies `--dss-radius-full` (9999px) for trigger `border-radius`, while `computedTokens.borderRadius` in the existing JSON was `--dss-radius-md`. The `visualProperties` array faithfully mirrors the table value (`--dss-radius-full` for trigger, `--dss-radius-md` for panel). This is a meaningful architectural difference — the trigger button uses pill shape (`--dss-radius-full`) while the dropdown panel uses `--dss-radius-md`. The `computedTokens.borderRadius` field likely reflects the panel, not the trigger.

## Errors
None. All 8 JSON files parsed and updated successfully. No missing files or unexpected structure encountered.
