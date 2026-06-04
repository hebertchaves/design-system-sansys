# Agent 10 Report — DSS Visual Properties Migration (sections 4.70–4.76)

## Summary
- Components assigned: 7
- Components processed successfully: 7
- Components with divergences: 4
- Components with errors: 0

## Components Processed

| Component | Properties extracted | Status | Notes |
|---|---|---|---|
| DssToggle | 12 | ✅ OK | 2 hardcoded non-DSS tokens (track/thumb sizes); min-height matches computedDimensions |
| DssToolbar | 8 | ✅ OK | min-height matches computedDimensions (44px) |
| DssToolbarTitle | 4 | ✅ OK | min-height matches computedDimensions (24px) |
| DssTooltip | 10 | ✅ OK | 1 hardcoded token (max-width: 240px); min-height matches computedDimensions (24px) |
| DssTree | 2 | ✅ OK | Both properties are N/A (null); no computedDimensions to cross-check |
| DssVideo | 6 | ✅ OK | 3 hardcoded non-DSS tokens; min-height matches computedDimensions (180px) |
| DssVirtualScroll | 3 | ✅ OK | 2 hardcoded non-DSS tokens; min-height matches computedDimensions (200px) |

## Divergences Detected

### DssToggle
- **Hardcoded token**: property `track width × height` uses `52px × 32px` instead of a `--dss-` token
- **Hardcoded token**: property `thumb tamanho (off)` uses `16px` instead of a `--dss-` token
- **Hardcoded token**: property `thumb tamanho (on)` uses `24px` instead of a `--dss-` token

### DssTooltip
- **Hardcoded token**: property `max-width` uses `240px` instead of a `--dss-` token
- **Note**: `computedTokens.padding` references `--dss-spacing-1 --dss-spacing-2` but `visualProperties.padding` references `--dss-spacing-1_5 / --dss-spacing-2` (6px 8px). The visual table (Seção 13.17) is more specific and authoritative.

### DssVideo
- **Hardcoded token**: property `min-height` uses `180px` instead of a `--dss-` token
- **Hardcoded token**: property `aspect-ratio` uses `16/9 (número, não string)` — no `--dss-` token exists for this
- **Note**: `computedTokens.borderRadius` references `--dss-radius-sm` but `visualProperties.border-radius` references `--dss-radius-md`. Potential divergence between computedTokens and visual table specification.

### DssVirtualScroll
- **Hardcoded token**: property `min-height` uses `200px` instead of a `--dss-` token
- **Hardcoded token**: property `item default height` uses `48px` — matches `defaultPreview.props.itemSize=48` (expected, no token for this)

## Errors
None. All 7 JSON files were parsed and written successfully without structural errors.
