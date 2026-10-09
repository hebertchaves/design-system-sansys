# Architecture rules

- Table hover is owned by component layers, not global Quasar overrides; DssMarkupTable suppresses the engine's row overlay because it is informational, while DssTable retains its canonical interactive hover and selection.

- Global Quasar helpers must not style the DssCard container or its variants; the component's four layers own them to prevent legacy border, padding and hover leakage.

- The parallel NFAg screen shares one Vue/DSS SFC between its isolated screen query and direct sandbox mount; this verifies the actual pattern without an iframe or an invented core component contract.
- The parallel NFAg result card is the sole execution-state feedback surface across all scenarios and retries; this prevents duplicate banners as new states are introduced.

- The root TypeScript configuration extends the documentation portal configuration and scopes preview checking to portal sources; independent workspace checks remain responsible for Vue core, sandbox, and MCP validation.
- The governance presentation is an isolated documentation route with one slide registry and one fixed-resolution scaling component; original storyboard notes remain separate from concise on-screen content to preserve provenance without crowding slides.
- Root preview scripts invoke Vite directly with the portal root and configuration, avoiding workspace-script recursion under the sandbox's Bun runner; workspace build commands remain available for independent checks.
- The documentation portal emits its production assets to the repository-root dist directory because the preview and deployment harness consume that location.
- The parallel NFAg derives KPI counts, contextual feedback lists, adaptive summary layout and expansion filtering from the same reactive rows; shared filtering includes incomplete checks as alerts to prevent summary/list divergence.
