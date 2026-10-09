# Architecture rules

- The root TypeScript configuration extends the documentation portal configuration and scopes preview checking to portal sources; independent workspace checks remain responsible for Vue core, sandbox, and MCP validation.
- The governance presentation is an isolated documentation route with one slide registry and one fixed-resolution scaling component; original storyboard notes remain separate from concise on-screen content to preserve provenance without crowding slides.
- Root preview scripts invoke Vite directly with the portal root and configuration, avoiding workspace-script recursion under the sandbox's Bun runner; workspace build commands remain available for independent checks.
- The documentation portal emits its production assets to the repository-root dist directory because the preview and deployment harness consume that location.