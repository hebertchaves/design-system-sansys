## Plano: Página do componente DssForm

Criar `src/pages/components/DssFormPage.tsx` seguindo a estrutura normativa COMPONENT_PAGE_STRUCTURE.md v2.3 e o padrão de playground v3.2, usando como baseline as páginas Golden já existentes (DssButtonPage, DssCheckboxPage).

### Estrutura da página (seções independentes colapsáveis)

1. **Badges de metadados** — versão, Quasar Compatible, status normativo
2. **PageHeader** — título "DssForm" com ícone `ClipboardListIcon`, descrição orientada a produto (2–4 frases) explicando que DssForm é o wrapper de formulários do DSS que orquestra validação, submissão e agrupamento de campos (`DssInput`, `DssSelect`, `DssCheckbox`, `DssRadio`, etc.)
3. **Quando Usar / Quando NÃO Usar** — com tabela de alternativas
4. **Playground Interativo (v3.2)** — controles 4–6 colunas:
   - Layout: `vertical` | `horizontal` | `inline`
   - Density: `xs` | `sm` | `md` | `lg`
   - Gutter: `sm` | `md` | `lg`
   - Validação: `eager` | `lazy` | `on-submit`
   - Toggles: `noErrorIcon`, `noResetFocus`, `autofocus`, `greedy`
   - Seletores mutuamente exclusivos Brand / Color / Feedback (sem "None", sem `disabled`)
   - Preview renderiza um mini-formulário (Input + Select + Checkbox + botões Submit/Reset)
   - Geração de código em tempo real + toggle Light/Dark
5. **Estados Interativos** — tabela única (Default, Validating, Valid, Invalid, Submitting, Disabled)
6. **Anatomia 4 Camadas** (AnatomySection): Structure (form semântico + ARIA), Composition (gutter, alinhamento), Variants (layouts e densidades), Output (dark mode, forced-colors, reduced-motion)
7. **Seções técnicas colapsáveis independentes**:
   - 7.1 Props API & Eventos (submit, reset, validation-error)
   - 7.2 Slots (default)
   - 7.3 Tokens (tabela de tipos: dimensões, espaçamentos, feedback)
   - 7.4 Acessibilidade WCAG (1.3.1, 2.4.6, 3.3.1, 3.3.3, 4.1.2)
8. **Anti-patterns** — mínimo 3 (ex: usar DssForm como container visual, validação só por cor, formulários longos sem agrupamento)
9. **Vinculantes DSS v2.2** — classificação (Compact/Container), uso de pseudo-elementos (N/A), brightness (N/A)
10. **Referências Normativas** — links para `04_FORMS_INPUTS.md`, DSS_TOKEN_REFERENCE, DSS_COMPONENT_ARCHITECTURE

### Integração

- Registrar rota `/components/dss-form` em `src/App.tsx`
- Adicionar entrada "DssForm" no `src/components/navigation/DSSSidebar.tsx` com ícone `ClipboardListIcon`

### Compliance

Executar mentalmente o `PLAYGROUND_COMPLIANCE_CHECKLIST.md` (8 seções) comparando lado a lado com `DssCheckboxPage` (Golden de formulário) antes de finalizar.

### Arquivos afetados

- `src/pages/components/DssFormPage.tsx` (criar)
- `src/App.tsx` (rota)
- `src/components/navigation/DSSSidebar.tsx` (navegação)
