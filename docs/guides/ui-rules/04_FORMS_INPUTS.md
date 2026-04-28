# Módulo 4: Formulários & Inputs

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para a construção de formulários, alinhamento de campos, agrupamento lógico e validação usando os componentes da Fase 1 (`DssInput`, `DssSelect`, `DssCheckbox`, etc.) e Fase 2 (`DssOptionGroup`).

## 4.1. Estrutura e Alinhamento de Campos

Os formulários devem ser estruturados usando o sistema de grid do Quasar (`row`, `col-*`) para garantir alinhamento perfeito e responsividade.

- **✅ OBRIGATÓRIO:** Usar `q-col-gutter-md` (16px) ou `q-col-gutter-sm` (8px) para o espaçamento entre campos de formulário.
- **✅ OBRIGATÓRIO:** Em telas mobile (`xs`), todos os campos devem ocupar 100% da largura (`col-12`), empilhando-se verticalmente.
- **✅ OBRIGATÓRIO:** Campos relacionados (ex: CEP, Cidade, Estado) devem ser agrupados na mesma linha em telas maiores (`col-md-4`, `col-md-6`, etc.).
- **❌ PROIBIDO:** Usar margens manuais (`q-mt-md`, `q-ml-sm`) para separar campos de formulário. O espaçamento deve ser gerenciado exclusivamente pelo gutter do grid.

## 4.2. Agrupamento Lógico (Fieldsets)

Formulários longos devem ser divididos em seções lógicas para reduzir a carga cognitiva.

- **✅ OBRIGATÓRIO:** Usar títulos (`text-h6` ou `text-subtitle1`) para separar grupos de campos.
- **✅ OBRIGATÓRIO:** O espaçamento antes de um novo grupo de campos (acima do título) deve ser maior que o espaçamento entre os campos (`--dss-spacing-6` ou `--dss-spacing-8`).
- **✅ OBRIGATÓRIO:** Para formulários muito complexos, considerar o uso de `DssStepper` ou `DssTabs` para dividir o preenchimento em etapas.
- **❌ PROIBIDO:** Criar formulários com mais de 15 campos visíveis simultaneamente sem nenhum tipo de agrupamento visual ou quebra de seção.

## 4.3. Validação e Feedback

O feedback de validação deve ser claro, imediato e acessível.

- **✅ OBRIGATÓRIO:** Usar a prop `rules` nativa do Quasar nos componentes `DssInput` e `DssSelect` para validação inline.
- **✅ OBRIGATÓRIO:** Mensagens de erro devem ser descritivas (ex: "O CPF deve conter 8 dígitos" em vez de apenas "Inválido").
- **✅ OBRIGATÓRIO:** O botão de submissão primário deve refletir o estado do formulário (ex: desabilitado ou com loading spinner durante o envio).
- **❌ PROIBIDO:** Confiar apenas na cor vermelha para indicar erro. A mensagem de texto é obrigatória para conformidade com WCAG 2.1 AA.

## 4.4. Checkboxes, Radios e Toggles

A escolha do controle correto depende do número de opções e da natureza da seleção.

- **✅ OBRIGATÓRIO:** Usar `DssCheckbox` para seleções múltiplas independentes.
- **✅ OBRIGATÓRIO:** Usar `DssRadio` ou `DssOptionGroup` para seleção única mutuamente exclusiva.
- **✅ OBRIGATÓRIO:** Usar `DssToggle` para ações que têm efeito imediato (ex: ativar/desativar uma configuração), sem necessidade de clicar em "Salvar".
- **❌ PROIBIDO:** Usar `DssToggle` em formulários longos onde o usuário precisa clicar em "Salvar" no final. Nesses casos, use `DssCheckbox` ou `DssRadio`.

## 4.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se o espaçamento entre os campos de formulário corresponde aos tokens de gutter permitidos (8px ou 16px).
2. Se os campos estão alinhados corretamente na grade de colunas.
3. Se o espaçamento entre grupos lógicos (fieldsets) é maior que o espaçamento entre campos individuais.
