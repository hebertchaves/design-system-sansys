# Pré-prompt: DssUploader

**Status:** 🔒 Bloqueado (Aguardando selagem de DssButton, DssIcon, DssLinearProgress)
**Nível:** 2 (Composição de Primeiro Grau)
**Família:** Upload

---

## 1. CLASSIFICAÇÃO E CONTEXTO

O `DssUploader` é um componente composto da Fase 2 que orquestra a seleção, visualização e envio de arquivos. Ele combina botões de ação, lista de arquivos, ícones de status e barras de progresso em uma interface unificada.

- **Golden Reference:** `DssBadge` (Componente não interativo em sua raiz — a interatividade pertence aos botões filhos)
- **Golden Context:** `DssCard` (Container estrutural com borda, superfície e elevação)

**Justificativa da Fase 2:** O `DssUploader` não é um componente atômico. Ele orquestra múltiplos componentes DSS internos (`DssButton`, `DssIcon`, `DssLinearProgress`) e gerencia estado complexo (lista de arquivos, progresso de upload, status de erro/sucesso).

## 2. RISCOS ARQUITETURAIS E GATES

### Risco 1: Vazamento de Componentes Nativos
O `QUploader` do Quasar injeta botões nativos (`QBtn`), ícones nativos (`QIcon`) e barras de progresso nativas (`QLinearProgress`) em sua interface padrão. Se não for sobrescrito, o componente vazará elementos não governados para o produto final.
**Mitigação:** O `DssUploader` deve utilizar obrigatoriamente os slots do `QUploader` (`header`, `list`) para reconstruir a interface utilizando `DssButton`, `DssIcon` e `DssLinearProgress`.

### Risco 2: Inconsistência de Superfície e Borda
O `QUploader` possui estilos próprios de borda e sombra que divergem do padrão DSS.
**Mitigação:** Aplicar as classes e tokens de superfície do `DssCard` ao container principal do uploader.

### Gates Aplicáveis
- **Gate de Composição v2.4:** O componente deve repassar props visuais para seus filhos (ex: `disable` deve desabilitar os `DssButton` internos).
- **Gate de Responsabilidade:** O componente não deve reinventar a lógica de XHR/Fetch do Quasar, apenas envelopar a UI.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

### Props Mantidas (Pass-through)
- `url`, `method`, `headers`, `form-fields`, `with-credentials`, `send-raw` (Lógica de rede)
- `multiple`, `accept`, `max-files`, `max-file-size`, `max-total-size` (Validação)
- `auto-upload`, `batch`, `factory` (Comportamento)
- `disable`, `readonly` (Estado)

### Props Bloqueadas (Omitidas da API DSS)
- `color`, `text-color` (Cor do header é governada por tokens de superfície)
- `flat`, `bordered`, `square` (Aparência do container é governada pelo Golden Context `DssCard`)
- `hide-upload-btn` (Controle de UI deve ser feito via slots se necessário)

### Props Injetadas (Exclusivas DSS)
- `brand`: Aplica a cor da marca aos botões de ação e barras de progresso internas.
- `variant`: Define a aparência do container (`elevated`, `outline`, `subtle`).

## 4. GOVERNANÇA DE TOKENS E CSS

O componente deve utilizar estritamente os seguintes tokens do catálogo DSS:

- **Superfície do Container:** `--dss-surface-default`
- **Borda do Container:** `--dss-border-width-thin` solid `--dss-border-gray-300`
- **Raio da Borda:** `--dss-radius-card` (12px)
- **Superfície de Dropzone (Hover/Drag):** `--dss-surface-hover`
- **Espaçamento Interno (Padding):** `--dss-padding-4` (16px)
- **Espaçamento entre Itens (Gap):** `--dss-grid-gap-sm` (8px)
- **Tipografia (Títulos):** `--dss-text-body`
- **Tipografia (Tamanhos/Status):** `--dss-text-subtle`
- **Feedback de Erro:** `--dss-feedback-error` (para arquivos rejeitados)
- **Feedback de Sucesso:** `--dss-feedback-success` (para uploads concluídos)

> **Atenção:** Não invente tokens com sufixos semânticos (ex: `--dss-padding-md`). Use exatamente os tokens listados acima, que foram verificados no `DSS_TOKEN_REFERENCE.md`.

## 5. ACESSIBILIDADE E ESTADOS

- **Focus Ring:** O container principal (se for dropzone) deve receber `--dss-focus-shadow-primary` quando focado via teclado.
- **ARIA Labels:** Os botões internos reconstruídos via slot devem ter `aria-label` claros (ex: "Adicionar arquivos", "Fazer upload de todos", "Remover arquivo").
- **Anúncio de Status:** O status do upload (progresso, sucesso, erro) deve ser anunciado via `aria-live="polite"`.
- **High Contrast:** Garantir que as bordas do container e dos itens da lista usem `forced-color-adjust: none` e `SystemColor` keywords em `@media (forced-colors: active)`.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

O `DssUploader` depende criticamente de:
1. `DssButton` (para ações de adicionar, enviar, limpar)
2. `DssIcon` (para ícones de tipo de arquivo e status)
3. `DssLinearProgress` (para a barra de progresso individual e global)

**Regra de Ouro:** NENHUM componente nativo do Quasar (`QBtn`, `QIcon`, `QLinearProgress`) pode ser renderizado no DOM final. Tudo deve ser substituído via slots.

## 7. EXCEÇÕES PREVISTAS

### EXC-01: Uso de Slots Estruturais Obrigatórios
- **Justificativa:** Para evitar o vazamento de componentes nativos do Quasar, o `DssUploader` deve obrigatoriamente implementar os slots `header` e `list` internamente, não expondo a UI padrão do `QUploader`.

## 8. SUPERFÍCIE DE PLAYGROUND (Obrigatório)

O playground do `DssUploader` deve ser tratado como um artefato de primeira classe para demonstrar a orquestração complexa do componente.

### 8.1 Controles Obrigatórios
- **Brand:** Alternar a cor de destaque dos botões e barras de progresso.
- **Variant:** Alternar entre `elevated`, `outline` e `subtle` (aparência do container).
- **Multiple:** Alternar entre seleção única e múltipla.
- **Disable:** Desabilitar todo o componente.
- **Auto-upload:** Demonstrar o envio automático vs. manual.

### 8.2 Composite Logic
- O playground **deve** interceptar a prop `factory` ou `url` para simular um upload real (com delay de rede simulado via `setTimeout`).
- O playground **não deve** fazer requisições reais para URLs externas.
- A simulação deve demonstrar claramente a transição de estados: Selecionado → Fazendo Upload (com progresso) → Concluído / Erro.

### 8.3 Estados a Expor

| Estado | Descrição da Demonstração |
|--------|---------------------------|
| **Vazio (Dropzone)** | Estado inicial aguardando arquivos. |
| **Com Arquivos (Pendente)** | Arquivos selecionados, aguardando clique em "Upload". |
| **Em Progresso** | Upload em andamento, demonstrando o `DssLinearProgress` interno. |
| **Concluído (Sucesso)** | Upload finalizado, demonstrando feedback visual de sucesso. |
| **Erro de Validação** | Arquivo rejeitado (ex: tamanho excedido), demonstrando feedback de erro. |
| **Desabilitado** | Componente inteiro desabilitado, incluindo dropzone e botões. |

---
**Nota para o Chat de Execução:** Este componente exige a reconstrução completa da UI do `QUploader` via slots. Estude a documentação do Quasar sobre os slots `header` e `list` antes de iniciar a implementação.
