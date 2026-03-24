# DssFile — Documentação Normativa DSS v2.4

**Versão**: 1.0.0 | **Status**: pending-audit | **Fase**: 1

---

## 1. Identidade e Papel Semântico

O `DssFile` é um **componente de Action Control** do tipo campo de seleção de arquivos. Permite ao usuário selecionar um ou mais arquivos do sistema de arquivos local, com suporte a drag-and-drop, validação de tipo e tamanho, e integração completa com o vocabulário visual do DSS.

**Categoria**: Action Control — campo de seleção de arquivos
**Papel semântico**: `<input type="file">` encapsulado via `QFile` (Quasar)
**Implementação**: Wrapper controlado do `QFile`, que por sua vez encapsula `<input type="file">` nativo

### O que este componente faz

- Abre o seletor de arquivos nativo ao clicar no campo
- Aceita arquivos por drag-and-drop (estado `dragging` com feedback visual)
- Exibe o nome do arquivo selecionado dentro do campo
- Valida tipo (`accept`), tamanho (`maxFileSize`) e quantidade (`maxFiles`)
- Emite arquivos rejeitados via evento `rejected` para tratamento externo
- Exibe label flutuante, hint e mensagem de erro (identidade visual = DssInput)
- Suporta botão de limpar (`clearable`) com `aria-label` customizável
- Reage a `[data-brand]` ancestral ou prop `brand` para brandabilidade

### O que este componente NÃO faz

- Não realiza upload para servidor — delega ao código de aplicação
- Não exibe progresso de upload — use componente de Progress Bar dedicado
- Não pré-visualiza imagens — use DssImg ou componente de preview externo
- Não valida conteúdo do arquivo (apenas MIME type e tamanho)
- Não reimplementa `<input type="file">` — delega 100% ao QFile

---

## 2. Golden Component

### Golden Reference: DssChip (interativo)

**DssChip** é o **Golden Reference oficial** para componentes interativos do DSS (designação formal — `DSS_GOLDEN_COMPONENTS.md §1.1`). DssFile é um Action Control interativo com touch target próprio (Opção A), portanto está na cadeia de governança do DssChip.

O que o Golden Reference DssChip estabelece para DssFile:
- **Touch Target**: Opção A — `min-height: var(--dss-input-height-md)` (44px)
- **Pseudo-elemento** `::before`: NÃO utilizado (DssFile usa QFile nativo para interatividade)
- **Focus ring**: obrigatório via `outline` em `:focus-visible`

### Golden Context: DssInput

`DssInput` (selado ≥ 2026-02-04) é o **Golden Context** de DssFile — baseline de auditoria mais próximo por:

- Identidade visual idêntica (mesmos tokens `--dss-input-height-md/sm`)
- Mesmas 4 variantes: outlined, filled, standout, borderless
- Mesmo sistema de label flutuante, hint e error
- Mesmo sistema de composables (`useState`, `useClasses`, `useActions`)
- Mesma brandabilidade via `[data-brand]` ancestral
- Mesma estrutura de 4 camadas SCSS

**Diferença principal**: DssFile gerencia `File | File[] | null` (não `string`). O QFile tem lógica própria de abertura de diálogo e validação de arquivos — o DssFile não reimplementa nada disso.

---

## 3. Touch Target

**Estratégia**: Opção A — componente INTERATIVO

O DssFile implementa touch target próprio via `min-height: var(--dss-input-height-md)` (44px) em `.dss-file__field`, em conformidade com WCAG 2.5.5 (AA).

Modo compacto (`dense=true`): `min-height: var(--dss-input-height-sm)` (36px) — abaixo de 44px. Uso restrito a contextos onde a densidade é necessária e o usuário não está em dispositivo de toque (ex: tabelas administrativas).

`::before` **NÃO é utilizado** — o QFile é renderizado como sobreposição transparente sobre o campo visual, agindo diretamente como área clicável.

---

## 4. Arquitetura: Wrapper do QFile

### Decisão Arquitetural: QFile Transparente

O `QFile` é renderizado em modo `borderless` com `position: absolute; inset: 0; opacity: 0` sobre o campo visual. Isso permite:

1. O QFile gerencia toda a lógica de seleção (diálogo, validação, drag-and-drop nativo)
2. O DssFile apresenta a interface visual conforme o design system
3. Não há reimplementação de `<input type="file">` — 100% delegado ao Quasar

```
[.dss-file (wrapper DSS)]
  ├── [q-file (invisible, position: absolute, z-index: 1)]
  │     └── Lógica de seleção, validação, drag-and-drop
  ├── [.dss-file__field (visual, aria-hidden: true)]
  │     ├── [.dss-file__label] — label flutuante
  │     ├── [.dss-file__drop-hint] — dica de drag (sem valor)
  │     └── [.dss-file__value] — nome do arquivo (com valor)
  ├── [.dss-file__drag-overlay] — overlay "Solte aqui" (dragging=true)
  └── [.dss-file__bottom] — hint / errorMessage
```

### Decisão Arquitetural: `aria-hidden` no campo visual

O `.dss-file__field` recebe `aria-hidden="true"` porque o QFile subjacente já possui `<input type="file">` nativo com label acessível. Duplicar a informação para screen readers causaria anúncio duplo.

### Decisão Arquitetural: Cor via CSS, não via prop

A prop `color` do QFile não é repassada. A cor de foco e accent é controlada exclusivamente pelo SCSS DSS via tokens `--dss-action-primary` e tokens de brand.

---

## 5. Estados

| Estado | Implementação | Observação |
|--------|--------------|-----------|
| default | Campo vazio com dica de drop | Borda normal |
| hover | Borda escurecida | `--dss-gray-600` (outlined) |
| focus | Borda action-primary + ring | WCAG 2.4.7 |
| dragging | Borda tracejada + fundo hover + overlay | Feedback visual de drag |
| filled | Nome do arquivo exibido | `hasValue = true` |
| disabled | opacity 0.4 + `pointer-events: none` | `--dss-opacity-disabled` |
| readonly | Borda tracejada + sem interação | Sem dica de drop |
| active | **Não aplicável** | DssFile não tem estado `active` semanticamente distinto. O clique abre o seletor nativo — sem feedback de "pressionado". Alinhado ao Golden Context DssInput. |
| error | Borda `--dss-feedback-error` + mensagem | Prioridade absoluta sobre brand |
| dark | Ajustes de superfície e texto | Via `[data-theme="dark"]` |
| high-contrast | Borda forçada em `currentColor` | `prefers-contrast: more` |
| reduced-motion | Transições desabilitadas | `prefers-reduced-motion: reduce` |
| print | Remove backgrounds, clear, drag hint | `@media print` |
| forced-colors | Cores de sistema (ButtonText, Highlight) | Windows HCM |

---

## 6. Acessibilidade

### ARIA e semântica nativa

- O `<input type="file">` dentro do QFile é o elemento nativo — semanticamente correto para screen readers
- `accept` é lido por screen readers como restrição do campo
- `disabled` e `readonly` são repassados ao QFile → `<input>` nativo
- `aria-label` via prop `ariaLabel` é repassado ao QFile
- `aria-describedby` ligado ao `hintId` ou `errorId` para hint/error

### Botão de limpar

O botão `×` tem `aria-label="Remover arquivo selecionado"` (customizável via `clearAriaLabel`). Em interfaces com múltiplos DssFile, customize: `clearAriaLabel="Remover comprovante de residência"`.

### Drag-and-drop

O estado de drag é puramente visual — não afeta a experiência de screen readers. Usuários de teclado ativam o seletor de arquivo nativo via `Enter` ou `Space` no campo focado.

### Focus ring

```scss
// Foco via :has(:focus-visible) — aplicado em cada variante
.dss-file:has(:focus-visible) .dss-file__field {
  outline: var(--dss-border-width-md) solid var(--dss-focus-ring);
  outline-offset: var(--dss-spacing-1);
}
```

---

## 7. Validação e Eventos de Rejeição

O DssFile **não exibe automaticamente erros de rejeição**. O evento `rejected` deve ser tratado pela aplicação:

```vue
<DssFile
  v-model="file"
  accept=".pdf"
  :max-file-size="5242880"
  :error="hasError"
  :error-message="errorMessage"
  @rejected="handleRejected"
/>

<script setup>
const hasError = ref(false)
const errorMessage = ref('')

function handleRejected(rejections) {
  hasError.value = true
  const first = rejections[0]
  if (first.failedPropValidation === 'max-file-size') {
    errorMessage.value = `"${first.file.name}" excede 5MB`
  } else if (first.failedPropValidation === 'accept') {
    errorMessage.value = `"${first.file.name}" não é um PDF`
  }
}
</script>
```

**Valores de `failedPropValidation`**: `'accept'`, `'max-file-size'`, `'max-files'`

---

## 8. Brandabilidade

```vue
<!-- Via prop (accent color no foco e drag) -->
<DssFile brand="hub" label="Relatório Hub" />

<!-- Via ancestral [data-brand] -->
<div data-brand="water">
  <DssFile label="Planta hidráulica" />
</div>
```

O erro **sempre** usa `--dss-feedback-error` independentemente de brand.

### Tokens de brand utilizados

| Brand | Foco/Drag | Label foco | Hint |
|-------|-----------|------------|------|
| Hub | `--dss-hub-600` | `--dss-hub-700` | `--dss-hub-700` |
| Water | `--dss-water-500` | `--dss-water-600` | `--dss-water-700` |
| Waste | `--dss-waste-600` | `--dss-waste-700` | `--dss-waste-800` |

**Nota**: Tokens numéricos usados porque tokens semânticos de brand (`--dss-{brand}-primary`) não existem ainda. Precedente: DssInput (Golden Context).

---

## 9. Anti-Patterns

1. **Usar DssFile sem tratar `rejected`** — arquivos inválidos são silenciosamente descartados sem feedback visual. Sempre conecte `@rejected` quando `accept`, `maxFileSize` ou `maxFiles` forem definidos.

2. **Passar `accept="*"` e validar no servidor apenas** — informe o usuário antecipadamente sobre restrições. `accept` no cliente melhora UX mesmo que a validação final seja no servidor.

3. **Omitir `clearAriaLabel` com múltiplos DssFile na mesma página** — `"Remover arquivo selecionado"` é genérico. Com múltiplos campos: `clearAriaLabel="Remover RG"`, `clearAriaLabel="Remover comprovante"`.

4. **Usar `readonly` para simular desabilitado** — `disabled` aplica `opacity: var(--dss-opacity-disabled)` e comunica semanticamente ao usuário. `readonly` não altera opacidade e é adequado apenas quando o arquivo pode ser visualizado mas não substituído.

5. **Definir `modelValue` como `string` (path de arquivo)** — o `modelValue` do DssFile é sempre `File | File[] | null`. Caminhos de arquivo do servidor devem ser exibidos em componente separado (ex: lista de anexos com link), não no DssFile.

---

## 10. Paridade com Golden Context (DssInput)

| Critério | DssInput | DssFile | Observação |
|----------|----------|---------|------------|
| Touch Target | 44px (`--dss-input-height-md`) | 44px (`--dss-input-height-md`) | Idêntico |
| `::before` | Não utilizado | Não utilizado | Idêntico |
| Variantes | outlined, filled, standout, borderless | outlined, filled, standout, borderless | Idêntico |
| Label flutuante | ✅ | ✅ | Idêntico |
| Hint / error | ✅ | ✅ | Idêntico |
| Brand tokens | Hub/Water/Waste numéricos | Hub/Water/Waste numéricos | Idêntico |
| Dark mode | ✅ | ✅ | Idêntico |
| forced-colors | `ButtonText`, `Highlight` | `ButtonText`, `Highlight` | Idêntico |
| Composables | `useInputState/Classes/Actions` | `useFileState/Classes/Actions` | Padrão idêntico |
| `modelValue` | `string \| number` | `File \| File[] \| null` | **Diferente** — natureza do dado |
| Drag-and-drop | Não aplicável | Estado `dragging` com overlay | **Adição** — específico de file |
| `rejected` event | Não aplicável | `@rejected` + failedPropValidation | **Adição** — validação de arquivo |
| Wrapper Quasar | QInput (não usado) | QFile (transparente, posição absoluta) | **Diferente** — QFile gerencia diálogo |
| `loading` state | ✅ spinner | Não aplicável (Fase 1) | **Diferença** — upload é externo |

---

## 11. Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EX-01 | `2px` | `4-output/_states.scss` (forced-colors, drag-overlay) | Mínimo para visibilidade de borda tracejada em Windows HCM. O sistema operacional pode substituir `var(--dss-border-width-*)` — 2px explícito garante visibilidade. Não tokenizável. Precedente: DssInput, DssIcon. |

---

## 12. Uso em Componentes Futuros

- **DssForm** (Fase 2): Integração com validação de formulário, campo de arquivo obrigatório.
- **DssUploader** (Fase 3): Componente dedicado de upload com barra de progresso e preview, que utilizará DssFile internamente para seleção.
- **DssAttachmentList** (Fase 3): Lista de arquivos anexados com ícones por tipo, que complementa o DssFile após a seleção.

---

## 13. Referências

- [DSSFILE_API.md](./DSSFILE_API.md) — API Reference completa
- [DssInput.md](../DssInput/DssInput.md) — Golden Context
- [DSS_GOLDEN_COMPONENTS.md](../../docs/governance/DSS_GOLDEN_COMPONENTS.md) — Modelo Golden
- [QFile — Quasar](https://quasar.dev/vue-components/file) — Documentação oficial
