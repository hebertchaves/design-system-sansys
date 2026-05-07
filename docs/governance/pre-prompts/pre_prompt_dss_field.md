# Pré-prompt: DssField

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference:** DssChip
*   **Golden Context:** Componente de entrada de dados (input) para formulários.
*   **Justificativa:** O DssField encapsula a lógica de um campo de formulário, fornecendo funcionalidades como validação, rótulos, mensagens de erro e estados de interação, alinhado com a experiência de usuário e identidade visual do DSS. Ele serve como base para outros componentes de entrada, como DssInput, DssSelect, etc.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos:**
    *   Acoplamento excessivo com bibliotecas de validação externas.
    *   Dificuldade em estender para tipos de entrada complexos (ex: upload de arquivos, editores rich text).
    *   Performance em formulários com muitos campos.
    *   Sobrecarga de props, dificultando a manutenção.
*   **Gates:**
    *   Deve ser agnóstico a bibliotecas de validação, permitindo integração flexível.
    *   Deve fornecer slots ou mecanismos de composição para renderizar diferentes tipos de inputs.
    *   Deve ter uma API clara e concisa para gerenciar estados de erro e sucesso.
    *   Deve suportar acessibilidade (rótulos, mensagens de erro, estados).

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade Quasar (QField) | Propriedade DSS (DssField) | Tipo | Descrição |
| :-------------------------- | :------------------------- | :--- | :-------- |
| `label`                     | `label`                    | String | Rótulo do campo. |
| `hint`                      | `hint`                     | String | Texto de dica. |
| `error`                     | `error`                    | Boolean | Indica estado de erro. |
| `error-message`             | `errorMessage`             | String | Mensagem de erro. |
| `rules`                     | `rules`                    | Array<Function> | Regras de validação. |
| `dense`                     | `size`                     | 'sm' \| 'md' \| 'lg' | Tamanho do campo. |
| `square`                    | `rounded`                  | Boolean | Borda arredondada (inverso de `square`). |
| `outlined`                  | `variant`                  | 'outlined' \| 'filled' \| 'standard' | Estilo visual. |
| `disable`                   | `disabled`                 | Boolean | Campo desabilitado. |
| `readonly`                  | `readonly`                 | Boolean | Campo somente leitura. |
| `loading`                   | `loading`                  | Boolean | Estado de carregamento. |
| `clearable`                 | `clearable`                | Boolean | Permite limpar o campo. |
| `counter`                   | `counter`                  | Boolean | Exibe contador de caracteres. |
| `maxlength`                 | `maxLength`                | Number | Limite de caracteres. |
| `prefix`                    | `prefix`                   | Slot | Conteúdo antes do input. |
| `suffix`                    | `suffix`                   | Slot | Conteúdo depois do input. |
| `bottom-slots`              | `bottomSlots`              | Slot | Slots na parte inferior do campo. |
| `before`                    | `before`                   | Slot | Slot antes do campo. |
| `after`                     | `after`                    | Slot | Slot depois do campo. |
| `append`                    | `append`                   | Slot | Slot para adicionar conteúdo ao final do campo. |
| `prepend`                   | `prepend`                  | Slot | Slot para adicionar conteúdo ao início do campo. |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssField deve utilizar exclusivamente os tokens numéricos/padrão do DSS para espaçamento, raio, duração e cores de superfície. Exemplos de uso:

*   **Espaçamento:** `--dss-spacing-4` (para padding interno), `--dss-spacing-8` (para margens entre elementos).
*   **Raio:** `--dss-radius-md` (para bordas arredondadas padrão), `--dss-radius-sm` (para elementos menores).
*   **Duração:** `--dss-duration-250` (para transições de estado, como foco ou hover).
*   **Cores de Superfície:** `--dss-surface-default` (para o fundo do campo), `--dss-surface-hover` (para estado de hover), `--dss-surface-active` (para estado ativo).
*   **Cores de Borda:** `--dss-border-default` (para borda padrão), `--dss-border-error` (para estado de erro).

**NUNCA** inventar tokens com sufixos semânticos que não existem (ex: `--dss-padding-md`, `--dss-duration-base`).

## 5. ACESSIBILIDADE E ESTADOS

O DssField deve garantir acessibilidade completa, incluindo:

*   **Rótulos:** Associados corretamente ao input via `for`/`id` ou `aria-labelledby`.
*   **Mensagens de Erro:** Visíveis e associadas ao input via `aria-describedby`.
*   **Estados:**
    *   **Normal:** Estado padrão do campo.
    *   **Foco (`:focus`):** Indicação visual clara ao receber foco.
    *   **Hover (`:hover`):** Indicação visual ao passar o mouse.
    *   **Desabilitado (`:disabled`):** Campo não interativo, com estilo visual adequado e `aria-disabled=