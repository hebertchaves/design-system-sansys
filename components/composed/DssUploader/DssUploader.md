# DssUploader — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssUploader` é um componente composto de upload de arquivos do Design System
Sansys. Combina seleção de arquivos, visualização de fila, barras de progresso individuais
e ações de controle em uma interface unificada com identidade visual DSS completa.

**Quando usar:**
- Formulários que exigem anexo de documentos, imagens ou outros arquivos
- Fluxos de onboarding com submissão de comprovantes
- Qualquer interface onde o usuário precise enviar arquivos para o servidor

**Quando NÃO usar:**
- Quando apenas a seleção de arquivo é necessária (sem upload) → use `DssFile`
- Quando o upload já é tratado por outro mecanismo (ex: S3 presigned URL via JS puro)
- Quando o número de arquivos excede dezenas — considere um componente de tabela de upload

---

## 2. Classificação DSS

- **Tipo:** Composite (Composição de Primeiro Grau — Fase 2)
- **Categoria:** Upload / File Management
- **Fase:** 2
- **Interativo:** Não em sua raiz. Interatividade pertence aos filhos DssButton.
- **Golden Reference:** DssBadge (componente não interativo em sua raiz)
- **Golden Context:** DssCard (container com borda, superfície e elevação)

---

## 3. Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA)

### `inheritAttrs: false`
`$attrs` (class extra, id, data-*, aria-* adicionais) são encaminhados ao div
root via `v-bind="$attrs"`. O `QUploader` interno NÃO recebe `$attrs`.

### EXC-01: Slots estruturais obrigatórios
Os slots `header` e `list` do `QUploader` são SEMPRE sobrescritos internamente.
Isso impede que `QBtn`, `QIcon` e `QLinearProgress` nativos do Quasar sejam
renderizados no DOM final. O consumidor NÃO pode sobrescrever esses slots.

### Delegação de rede ao Quasar
`QUploader` gerencia toda a lógica de XHR/Fetch, progresso, retry e cancelamento.
`DssUploader` não reimplementa nenhuma dessas lógicas — apenas expõe uma API
de controle simplificada via `defineExpose`.

### Delegação de brand via CSS cascade
Definir `data-brand` no root div propaga automaticamente o brand para `DssButton`,
`DssIcon` e `DssLinearProgress` filhos via CSS `[data-brand]` cascade. Não é
necessário passar a prop `brand` explicitamente para os filhos.

### Drag-and-drop
`QUploader` gerencia internamente o drag via `.q-uploader--dnd` class no seu root.
`DssUploader` reage via CSS `:has(.q-uploader--dnd)` (EXC-Gate-02) sem lógica JS
adicional.

### `aria-live` para status
Uma região `role="status" aria-live="polite"` visualmente oculta (`.dss-uploader__sr-status`)
anuncia mudanças de estado (arquivo adicionado, upload concluído, falha) para
leitores de tela. A atualização é feita com `requestAnimationFrame` para garantir
que o DOM seja atualizado antes do anúncio.

---

## 4. API

### Props
*(ver DSSUPLOADER_API.md)*

### Slots
Nenhum slot público. Composição via props e eventos.

### Events
*(ver DSSUPLOADER_API.md)*

### Expose (ref methods)
*(ver DSSUPLOADER_API.md)*

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| disabled | ✅ | Opacidade reduzida via `--dss-opacity-disabled` + `pointer-events: none` |
| readonly | ✅ | Oculta botões de ação; exibe arquivos |
| drag-active | ✅ | Via CSS `:has(.q-uploader--dnd)` — EXC-Gate-02 |
| file-uploading | ✅ | DssLinearProgress por item na lista |
| file-uploaded | ✅ | Ícone `check_circle` com `--dss-feedback-success` |
| file-failed | ✅ | Ícone `error` com `--dss-feedback-error` |
| hover (root) | N/A | Não interativo — pertence aos filhos DssButton |
| focus (root) | N/A | Não interativo — foco pertence aos botões internos |
| active (root) | N/A | Não interativo |
| loading (root) | N/A | DssLinearProgress nos itens é o indicador |

---

## 6. Variantes

| Variante | Descrição |
|----------|-----------|
| `elevated` | Container com sombra `--dss-elevation-1`. Padrão. |
| `outline` | Apenas borda `--dss-gray-300`, sem sombra. |
| `subtle` | Fundo `--dss-surface-muted`, borda `--dss-gray-100`, sem sombra. |

---

## 7. Tokens Utilizados

*(lista completa em DSSUPLOADER_API.md — seção "Tokens Utilizados")*

Tokens principais:
- `--dss-surface-default` / `--dss-surface-hover` / `--dss-surface-muted`
- `--dss-radius-lg` (12px — alinhado ao DssCard)
- `--dss-border-focus` (drag state)
- `--dss-feedback-success` / `--dss-feedback-error` (status de item)
- `--dss-opacity-disabled` (estado desabilitado)

---

## 8. Acessibilidade

- **WCAG 2.1 AA**: compliant
- **Touch target**: N/A no root (não interativo). DssButton filhos têm touch target próprio.
- **ARIA**:
  - Header com `role="toolbar"` e `aria-label` dinâmico
  - Lista com `role="list"` e `aria-label` com contagem de arquivos
  - Região `role="status" aria-live="polite"` para anúncios de mudança de estado
  - Ícones decorativos com `decorative="true"` (aria-hidden)
  - Ícones de status com `aria-label` descritivo
  - Botão de remoção com `aria-label="Remover {nome} da fila"`
- **Navegação por teclado**: gerenciada pelos filhos DssButton (Tab, Enter, Space)
- **Forced Colors (HCM)**: borda `CanvasText`, status `LinkText`/`Mark`
- **Reduced Motion**: todas as transições desabilitadas via `transition: none !important`

---

## 9. Paridade com Golden Components

### Comparação com DssBadge (Golden Reference)

| Aspecto | DssBadge | DssUploader | Justificativa |
|---------|----------|-------------|---------------|
| Interatividade no root | Não | Não | ✅ Igual |
| `inheritAttrs: false` | Sim | Sim | ✅ Igual |
| `defineOptions` | Sim | Sim | ✅ Igual |
| Touch target `::before` | N/A | N/A | ✅ Igual — nenhum é interativo |
| `defineEmits` | Não | Sim | ✅ Diferente / justificado: DssUploader emite eventos de upload que consumidores precisam |
| `aria-hidden` em decorativos | Sim | Sim (via DssIcon `decorative`) | ✅ Igual |

### Comparação com DssCard (Golden Context)

| Aspecto | DssCard | DssUploader | Justificativa |
|---------|---------|-------------|---------------|
| Variantes (`elevated`, `outline`) | Sim | Sim (`+ subtle`) | ✅ Igual + extensão justificada |
| `border-radius: --dss-radius-lg` | Sim | Sim | ✅ Igual |
| Brand via `[data-brand]` | Sim | Sim | ✅ Igual |
| Sem hover/active no root | Sim | Sim | ✅ Igual |
| Sombra de marca | Sim | Sim | ✅ Igual |
| `overflow: hidden` | Sim | Sim | ✅ Igual |

---

## 10. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-01 | StructuralSlot | `1-structure/DssUploader.ts.vue` | Slots `header` e `list` obrigatoriamente sobrescritos para evitar vazamento de componentes nativos Quasar |
| EXC-Gate-01 | QuasarInternalSelector | `2-composition/_base.scss` | Reset dos seletores `.q-uploader`, `.q-uploader__header`, `.q-uploader__list` — necessário para que o container DSS controle borda, sombra e fundo |
| EXC-Gate-02 | CSSHasSelector | `3-variants/_variant.scss`, `4-output/_brands.scss` | `:has(.q-uploader--dnd)` detecta estado de drag sem JS adicional |

---

## 11. Matriz de Composição DSS

### Componentes internos (governados pelo DssUploader)
- ✅ **DssButton** — ações do header (Fase 1, selado)
- ✅ **DssIcon** — ícone de dropzone e tipo/status de arquivo (Fase 1, selado)
- ✅ **DssLinearProgress** — barra de progresso individual (Fase 1, selado)

### Componentes recomendados em composição externa
- **DssCard** → contexto estrutural adicional (padding, seção)
- **DssInput** → formulários com metadados + upload
- **DssButton** → ação de submit do formulário pai

### Lacunas identificadas
- ⚪ **DssNotification** — feedback de upload concluído/falha fora do componente (roadmap)
- ⚪ **DssDialog** — confirmação de remoção em lote (roadmap)

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-07 | Claude Code | Criação inicial — DssUploader Fase 2 |
