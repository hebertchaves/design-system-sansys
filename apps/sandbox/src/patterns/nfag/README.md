# Check-in NFAg — parallel visual test

## Open and validate

In the Vue sandbox, choose **Patterns → Check-in NFAg · paralelo**.
The isolated page is also available at `/?screen=nfag-parallel&scenario=mixed&theme=light`.
The wrapper embeds this actual SFC; it does not generate a fictitious core-component contract.
The original `TestCheckinNFAg.vue` was preserved.

Authority: shared requirements, September 17 revision 02, §§5.1–5.2.
Eight scenarios: empty, loading, error, apt, alerts, mixed, timeout and stale.
Both themes are selectable. All companies, identifiers and findings are fictional.

## Evidence from this delivery

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
this session and is cleared when switching company. Correction destinations are displayed in
an explanatory dialog, not connected routes. PDF is a preview dialog, not a PDF/A export.
The timeout scenario treats an incomplete check as an alert for demonstration; production
verdict handling for incomplete checks requires confirmation and an actual service contract.

Vue 2 host integration, permissions, real fiscal checks, 24-month audit retention,
6-month finding retention, PDF/A, production observability and performance remain unimplemented.
No credentials, SQL or database identifiers are displayed.

Visual review exposed low-contrast caption/secondary-text combinations in the canonical dark
appearance. The consumer does not override component internals to hide that issue; WCAG AA
and final visual acceptance are **not certified** and require DSS-level review plus user validation.
