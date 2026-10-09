# Check-in NFAg — parallel visual test

## Open and validate

In the Vue sandbox, choose **Patterns → Check-in NFAg · paralelo**.
The isolated page is also available at `/?screen=nfag-parallel` (starts without execution); add `&scenario=mixed` for populated data.
The sandbox mounts this actual SFC directly, with the original **sandbox · estado** button bar;
there is no iframe or fictitious core-component contract.
The layout follows current Grid Master: DssLayout → DssAppBar → DssPageContainer → DssPage
→ DssPageShell (rail, breadcrumb and board), containing compact outlined information cards.
The original `TestCheckinNFAg.vue` was preserved.

Authority: shared requirements, September 17 revision 02, §§5.1–5.2.
Eight scenarios: empty, loading, error, apt, alerts, mixed, timeout and stale.
The default is light/Water. Header controls offer light/dark and Hub/Water/Waste without clearing execution or filtering. All companies, identifiers and findings are fictional.

## Direct sandbox/layout revision evidence

### Integrated result, KPIs and expansions

- Execution-state feedback has one owner: the result card, across all eight scenarios (including read errors and stale results) and retries; no separate state banner is mounted. One bulk action derives its label/icon from all visible expanders; partial expansion offers expand-all and filtering reevaluates the action.
- Final verification (2026-10-09): Python Playwright/Chromium verified all eight semantic states without duplicate banners, then read-error → execution → three failed checks → bulk expansion → history dialog readback, without page errors. Screenshots of the error and stale result were inspected. All 48 static tests passed, including 12 NFAg tests.
- Ten permanent browser tests now cover scenario feedback, read-error retry and bulk expansion. The repository E2E runner was attempted but could not launch: its Playwright version requires Chromium headless shell revision 1223, while the environment supplies revision 1194. These tests are not reported as passed; the independent Python browser verification above did run successfully.
- Static DssMarkupTable findings keep header/body surfaces on hover through the canonical component guard and removal of legacy global hover. Grid Master's DssTable keeps its interactive selection/hover.
- Main cards use `--dss-spacing-2` (8px) on both axes. The flat situations card has no applied background override and does not clip KPI corners.
- Contextual pending rows drive equal result/KPI widths; the result separates its corrective instruction from the findings list. KPI feedback omits repeated numerals.
- Expansion tables mirror the original primary header, right-aligned status chips and accessible captions.
- Chromium verified five mixed findings, equal card widths, 8px padding, failure filtering retained after execution, history readback and apt/alerts/timeout/empty feedback states without page errors; all 12 NFAg tests passed.

- The issuer card was removed; the session uses the central demo company.
- Result feedback follows the full execution context (info, success, warning or error),
  independently of the active list filter.
- Four compact KPI controls filter the same reactive rows, include incomplete checks in alerts,
  retain the selected filter during execution and show blocking feedback beside the failure count.
- The original Check-in header hierarchy, rule/impact columns, findings and bulk expansion
  controls were absorbed without changing the original page or core components.
- All **48 static tests** passed (including **12 NFAg tests**); sandbox navigation passed.
- Chromium verified all four KPI counts, filter retention after execution, correction/report
  dialogs, history readback and all eight context tones, with no page errors.

- All 43 sandbox static tests and the sandbox-navigation gate passed.
- Chromium verified direct mounting without an iframe, the actual DssPageShell, all eight
  state buttons and eleven checks, in the sandbox's Patterns navigation.
- Execution → result → failure filter (three rows) → expansion → correction dialog →
  report dialog → history readback passed with no page errors.
- The screenshot of the actual sandbox was inspected; the original pattern remains unchanged.

## Evidence from the initial delivery (before direct sandbox/layout revision)

- Sandbox static regression: **43 tests passed**, including seven NFAg rule tests.
- `node scripts/validate-sandbox-nav.cjs --gate`: passed, 55 items and 55 views.
- `node scripts/validate-sfc-hygiene.cjs --gate`: passed for the gate's core scope.
- Additional scan of both new page SFCs: all style tokens exist; no raw Quasar templates,
  direct Layer 1 imports, dimensional inline styles, hardcoded colors or `:deep()`.
- Actual local MCP stdio calls: component/token lookup succeeded;
  `validate_composition` and token `check_compliance` reported compliant.
- MCP `validate_spec_readiness` reported **inconclusive** for the original requirements:
  missing recognized headings/explicit loading and surface declarations. This is not a passed gate;
  the document contains BDD and loading requirements that its recognizer did not identify.
- Chromium: empty → execute → completed result → failures filter → expansion → correction dialog
  → report dialog → history readback passed; all 16 theme/scenario combinations mounted
  with eleven rows and no page errors or document horizontal overflow.
- Sandbox navigation and actual SFC inside the iframe passed.

## Limits and remaining acceptance

This is a screen composition, not a newly sealed core component. The staged pre-commit hook
was not executed or a Git commit created; its applicable sandbox-navigation command was run
independently. Core contract emission and four-layer creation do not apply to a consumer page.

No hosted services were added. Execution is a short, sequential local animation, **not** proof of
four-way concurrency, ten-second deadlines or production performance. History lasts only for
this session and is cleared when switching sandbox scenario. Correction destinations are displayed in
an explanatory dialog, not connected routes. PDF is a preview dialog, not a PDF/A export.
The timeout scenario treats an incomplete check as an alert for demonstration; production
verdict handling for incomplete checks requires confirmation and an actual service contract.

Vue 2 host integration, permissions, real fiscal checks, 24-month audit retention,
6-month finding retention, PDF/A, production observability and performance remain unimplemented.
No credentials, SQL or database identifiers are displayed.

The revised screen exposes canonical light/dark appearances and three brands. This does not certify WCAG AA
or final visual acceptance; those still require DSS-level review plus user validation.

## Stakeholder verification — 2026-10-09

Independent Python Chromium checked six theme/brand combinations, initial empty history, execution, three-failure filtering, bulk expansion and report/history dialogs with inherited dark/Waste context. Returning to light/Water preserved result and filter. Captured states were inspected; no page errors occurred. The 48 static tests, navigation and SFC hygiene gates passed. This is not a WCAG contrast certification.
