# Pré-prompt: DssUploader (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssUploader` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssUploader`
- **Família:** Upload / File Management
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssBadge` (componente não interativo em sua raiz)
- **Golden Context:** `DssCard` (container com borda, superfície e elevação)
- **Componente Quasar Base:** `QUploader`
- **Dependências Diretas:** `DssButton`, `DssIcon`, `DssLinearProgress` (Nível 1)

**Justificativa da Fase 2:** O `DssUploader` é um componente composto que orquestra seleção, visualização e envio de arquivos. Depende de componentes Fase 1 (`DssButton`, `DssIcon`, `DssLinearProgress`) para sua UI interna e delega toda a lógica de XHR/Fetch ao `QUploader`. A interatividade pertence **inteiramente** aos filhos `DssButton`.

---

## 2. Restrição Arquitetural Fundamental (EXC-01)

### 2.1. Slots `#header` e `#list` — Sobrescrita Obrigatória

Os slots `#header` e `#list` do `QUploader` **DEVEM ser sempre sobrescritos** internamente. Esta é a condição arquitetural fundamental do `DssUploader`.

**Motivo:** O `QUploader` nativo renderiza `QBtn`, `QIcon` e `QLinearProgress` em sua UI padrão. O Gate de Composição v2.4 (Gate de Responsabilidade) exige que nenhum componente Quasar nativo apareça no DOM final de um componente DSS.

**Consequência:** O consumidor **não pode** sobrescrever os slots `#header` ou `#list` externamente. O `DssUploader` não expõe slots públicos.

### 2.2. Delegação de Lógica de Rede

O `DssUploader` **não deve** reimplementar lógica de XHR, progresso, retry ou cancelamento. Toda essa responsabilidade pertence ao `QUploader`. O `DssUploader` apenas:
- Controla a aparência via CSS e tokens DSS
- Reconstrói a UI via slots obrigatórios
- Expõe uma API simplificada via `defineExpose`

---

## 3. Gate de Composição v2.4

### Rule 1 — Uso Direto de QUploader (Exceção Registrada)

`<q-uploader>` é usado diretamente no template — **exceção intencional e irremovível**. Esta exceção DEVE ser registrada em:
- `dss.meta.json` → campo `gateExceptions`
- `DssUploader.md §10` → subseção "Exceções aos Gates v2.4"

### Rule 2 — Sem `:deep()` para Filhos DSS

Proibido usar `:deep()` para estilizar `DssButton`, `DssIcon` ou `DssLinearProgress` internamente. Use as props desses componentes.

### Rule 3 — Imports via Entry Point Wrappers

```typescript
// ✅ CORRETO
import DssButton from '../../base/DssButton/DssButton.vue'
import DssIcon from '../../base/DssIcon/DssIcon.vue'
import DssLinearProgress from '../../base/DssLinearProgress/DssLinearProgress.vue'
```

---

## 4. API — Props e Eventos

### 4.1. Props de Upload (Delegadas ao QUploader)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `url` | `String` | — | URL de destino |
| `method` | `'POST' \| 'PUT'` | `'POST'` | Método HTTP |
| `headers` | `Record<string,string>` | — | Cabeçalhos HTTP |
| `factory` | `Function` | — | Configuração dinâmica por chamada |
| `multiple` | `Boolean` | `false` | Seleção múltipla |
| `accept` | `String` | — | Filtro de tipos (ex: `.pdf,image/*`) |
| `maxFiles` | `Number` | — | Limite de arquivos |
| `maxFileSize` | `Number` | — | Limite por arquivo (bytes) |
| `autoUpload` | `Boolean` | `false` | Upload automático ao adicionar |
| `batch` | `Boolean` | `false` | Envia em lote único |

### 4.2. Props DSS (Governadas pelo DssUploader)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'elevated' \| 'outline' \| 'subtle'` | `'elevated'` | Variante visual |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Contexto de marca |
| `label` | `String` | — | Texto da dropzone vazia |
| `disable` | `Boolean` | `false` | Desabilita toda interação |
| `readonly` | `Boolean` | `false` | Somente leitura |

### 4.3. Props Bloqueadas

Não expor ao consumidor: `color`, `text-color`, `flat`, `bordered`, `square`, `dark`, `hide-upload-btn`.

### 4.4. Eventos

`added`, `removed`, `rejected`, `uploading`, `uploaded`, `failed` — forwarded do QUploader.

### 4.5. Expose (ref methods)

`upload()`, `abort()`, `reset()`, `pickFiles()` — delegados ao ref interno do QUploader.

---

## 5. Governança de CSS e Tokens

### 5.1. Tokens Obrigatórios

- **Superfície:** `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-muted`
- **Borda:** `--dss-border-width-thin`, `--dss-gray-300`, `--dss-border-focus`
- **Raio:** `--dss-radius-lg` (alinhado ao DssCard)
- **Elevação:** `--dss-elevation-1` (variante elevated)
- **Feedback:** `--dss-feedback-success`, `--dss-feedback-error`
- **Acessibilidade:** `--dss-opacity-disabled`, `--dss-spacing-px` (sr-only)

### 5.2. EXC-Gate-01 — Resets de Seletores Quasar

Em `2-composition/_base.scss`, os seletores internos do QUploader DEVEM ser resetados:

```scss
&__engine {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  border-radius: 0 !important;
}
```

### 5.3. EXC-Gate-02 — Detecção de Drag via CSS `:has()`

```scss
.dss-uploader:has(.q-uploader--dnd) {
  background-color: var(--dss-surface-hover);
  border: var(--dss-border-focus);
}
```

### 5.4. Brand Cascade

`data-brand` no root div propaga para todos os filhos DSS via CSS cascade. **Não** passar prop `brand` para DssButton/DssIcon individualmente.

---

## 6. Variantes

| Variante | Box-shadow | Fundo | Borda |
|----------|-----------|-------|-------|
| `elevated` | `--dss-elevation-1` | `--dss-surface-default` | `--dss-gray-300` |
| `outline` | `none` | `--dss-surface-default` | `--dss-gray-300` |
| `subtle` | `none` | `--dss-surface-muted` | `--dss-gray-100` |

---

## 7. Acessibilidade (WCAG 2.1 AA)

- **Touch target:** N/A no root (não interativo). DssButton filhos têm touch target próprio.
- **Header:** `role="toolbar"` com `aria-label` dinâmico
- **Lista:** `role="list"` com `aria-label` de contagem
- **Região aria-live:** `role="status" aria-live="polite"` com `requestAnimationFrame` double-update
- **Ícones decorativos:** `decorative="true"` (aria-hidden)
- **Ícones de status:** `aria-label` descritivo obrigatório
- **Botão remover:** `aria-label="Remover {nome} da fila"`
- **Forced colors:** `CanvasText` para bordas, `LinkText`/`Mark` para status. **Proibido `forced-color-adjust: none`.**

---

## 8. Estados

| Estado | Implementação |
|--------|---------------|
| `disabled` | `--dss-opacity-disabled` + `pointer-events: none` |
| `readonly` | Oculta botões de ação via `v-if` |
| `drag-active` | CSS `:has(.q-uploader--dnd)` — EXC-Gate-02 |
| `uploading` | DssLinearProgress por item |
| `uploaded` | Ícone `check_circle` + `--dss-feedback-success` |
| `failed` | Ícone `error` + `--dss-feedback-error` |
| `hover` (root) | N/A — não interativo |
| `focus` (root) | N/A — foco pertence aos DssButton |
| `loading` (root) | N/A — DssLinearProgress é o indicador |

---

## 9. Playground Obrigatório (5 cenários)

1. Configurável com todos os controles (brand, variant, multiple, disable, auto-upload, simular erro)
2. Variante outline com validação de tipo (apenas PDF, max 5 MB)
3. Subtle + Brand Hub + auto-upload
4. Estado desabilitado
5. Brand Water + batch

A `factory` deve usar `setTimeout` para simular latência. Nenhuma requisição real a infraestrutura externa é obrigatória.

---

## 10. Histórico de Versões do Pré-prompt

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-07 | Claude Code | Pré-prompt inicial gerado após criação e auditoria do DssUploader |
