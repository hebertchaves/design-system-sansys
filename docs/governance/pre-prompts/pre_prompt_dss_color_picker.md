# Pré-prompt: DssColorPicker

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip (componente interativo)

### Golden Context
Componente de seleção de cor, parte do grupo de Formulários e Inputs, que permite ao usuário escolher uma cor através de uma interface visual.

### Justificativa
Padronizar a experiência de seleção de cores em todas as aplicações do Design System, garantindo consistência visual, funcionalidade robusta e acessibilidade. O DssColorPicker deve ser intuitivo e flexível para diferentes casos de uso, desde a seleção de cores primárias até a personalização avançada.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos
- **Complexidade de Formatos:** Dificuldade em gerenciar e converter entre diferentes formatos de cor (HEX, RGB, HSL, RGBA) de forma consistente.
- **Performance:** Lentidão na renderização ou interação com paletas de cores muito grandes ou complexas.
- **Acessibilidade:** Falha em atender aos padrões WCAG para contraste, navegação por teclado e leitores de tela.
- **Customização:** Dificuldade em permitir customizações de paleta e interface sem quebrar a consistência do DSS.
- **Dependência de Terceiros:** Forte acoplamento com a implementação do Quasar, dificultando futuras migrações ou substituições.

### Gates
- **Validação de Formato:** Implementação de validação rigorosa para todos os formatos de cor suportados.
- **Testes de Performance:** Testes automatizados para garantir que o componente mantenha alta performance com diversas configurações de paleta.
- **Auditoria de Acessibilidade:** Auditoria completa de acessibilidade (WCAG 2.1 AA) para garantir conformidade.
- **API Clara e Extensível:** Definição de uma API clara que permita customização controlada sem comprometer a integridade do DSS.
- **Encapsulamento:** Garantir que a lógica interna do Quasar seja encapsulada, expondo apenas a API do DSS.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade/Evento Quasar (QColorPicker) | Propriedade/Evento DSS (DssColorPicker) | Descrição                                                                 |
| :--------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------ |
| `v-model`                                | `v-model` ou `modelValue`               | Valor da cor selecionada (HEX, RGB, HSL, RGBA).                           |
| `@update:modelValue`                     | `@update:modelValue`                    | Evento emitido quando o valor da cor é alterado.                         |
| `disable`                                | `disabled`                              | Desabilita o componente, impedindo interação.                             |
| `readonly`                               | `readonly`                              | Torna o componente somente leitura, impedindo alterações.                 |
| `no-header`                              | `hideHeader`                            | Oculta o cabeçalho do seletor de cores.                                   |
| `no-footer`                              | `hideFooter`                            | Oculta o rodapé do seletor de cores.                                      |
| `default-value`                          | `defaultValue`                          | Valor inicial da cor quando o componente é montado.                       |
| `format`                                 | `colorFormat`                           | Formato de exibição e retorno da cor (e.g., 'hex', 'rgb', 'hsl', 'hexa'). |
| `palette`                                | `colorPalette`                          | Array de cores pré-definidas para a paleta.                               |
| `square`                                 | `square`                                | Define se o seletor de cores deve ter bordas quadradas.                   |
| `flat`                                   | `flat`                                  | Remove sombras e bordas para um estilo mais plano.                        |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssColorPicker deve utilizar exclusivamente tokens de design do DSS para espaçamento, raio de borda, cores de superfície, tipografia e durações de transição. Não serão permitidos valores hardcoded ou tokens semânticos não existentes no DSS.

### Exemplos de Tokens a Serem Utilizados
- **Espaçamento:** `--dss-spacing-4` (para padding interno), `--dss-spacing-8` (para margens entre elementos internos).
- **Raio de Borda:** `--dss-radius-md` (para cantos arredondados do componente ou de seus elementos internos).
- **Cores de Superfície:** `--dss-surface-default` (para o fundo principal), `--dss-surface-variant` (para elementos secundários).
- **Cores de Borda:** `--dss-border-default`.
- **Cores de Texto:** `--dss-text-primary`, `--dss-text-secondary`.
- **Duração de Transição:** `--dss-duration-250` (para animações de hover ou focus).
- **Sombras:** `--dss-shadow-1` (para elevação do componente).

### Proibido
- `--dss-padding-md` (sufixo semântico não permitido para padding).
- `--dss-duration-base` (sufixo semântico não permitido para duração).
- Valores em `px`, `rem`, `em` diretamente no CSS do componente sem serem derivados de tokens.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- **Navegação por Teclado:** O componente deve ser totalmente navegável via teclado (Tab, Shift+Tab, setas para seleção de cores).
- **Rótulos ARIA:** Uso adequado de `aria-label`, `aria-labelledby`, `aria-describedby` para fornecer contexto a leitores de tela.
- **Contraste de Cores:** Garantir que o contraste entre o texto e o fundo, e entre os elementos interativos, atenda aos requisitos WCAG 2.1 AA.
- **Indicação de Foco:** O estado de foco deve ser claramente visível e consistente com o DSS.
- **Mensagens de Erro:** Mensagens de erro devem ser associadas ao campo e anunciadas por leitores de tela.

### Estados
- **Default:** Estado padrão do componente.
- **Hover:** Quando o cursor do mouse está sobre o componente ou elementos interativos internos.
- **Focus:** Quando o componente ou um de seus elementos internos está em foco (via teclado ou clique).
- **Active:** Quando o componente está sendo ativado (e.g., clicado).
- **Disabled:** O componente não pode ser interagido e deve ter uma aparência visualmente desabilitada.
- **Readonly:** O componente exibe um valor, mas não permite alterações.
- **Error:** Indica que o valor selecionado é inválido ou há um problema (com feedback visual e, opcionalmente, mensagem).
- **Success:** Indica que o valor selecionado é válido (com feedback visual).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas
- **Quasar QColorPicker:** O componente será construído sobre o `QColorPicker` do Quasar, abstraindo sua API para a interface do DSS.

### Composição (Exemplos)
- **DssInput:** Pode ser utilizado para exibir o valor da cor selecionada em formato HEX ou RGB, permitindo também a entrada manual.
- **DssButton:** Botões como "Limpar" ou "Confirmar" podem ser compostos dentro do DssColorPicker ou em um contexto que o utilize.
- **DssPopover/DssDialog:** O DssColorPicker pode ser encapsulado dentro de um popover ou dialog para uma experiência de seleção mais controlada.

## 7. EXCEÇÕES PREVISTAS

- **Cor Inválida:** Tentativa de definir uma cor com um formato ou valor inválido. O componente deve lidar com isso graciosamente, talvez revertendo para o último valor válido ou um valor padrão.
- **Paleta Vazia:** Se a propriedade `colorPalette` for fornecida como um array vazio, o componente deve exibir o seletor completo sem paleta pré-definida ou um estado de fallback.
- **Conflito de Formato:** Se `colorFormat` for definido para um formato que não pode representar o `modelValue` atual sem perda de dados (e.g., `rgb` para uma cor com transparência `rgba`).
- **Desempenho em Dispositivos Antigos:** Possíveis problemas de desempenho em navegadores ou dispositivos mais antigos devido à complexidade da interface de seleção de cores.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
O playground deve expor os seguintes controles para testar o DssColorPicker:
- `v-model` (para definir e observar a cor selecionada)
- `disabled` (checkbox para habilitar/desabilitar o componente)
- `readonly` (checkbox para tornar o componente somente leitura)
- `colorFormat` (dropdown com opções: 'hex', 'rgb', 'hsl', 'hexa', 'rgba', 'hsla')
- `colorPalette` (campo de texto para inserir um array de cores HEX, e.g., `['#FF0000', '#00FF00', '#0000FF']`)
- `hideHeader` (checkbox para ocultar o cabeçalho)
- `hideFooter` (checkbox para ocultar o rodapé)
- `square` (checkbox para definir bordas quadradas)
- `flat` (checkbox para estilo plano)

### Composite Logic
- **Exibição de Formatos:** Um exemplo de como o `modelValue` pode ser exibido em diferentes formatos (HEX, RGB, HSL) fora do componente, reagindo às mudanças.
- **Validação:** Demonstração de como integrar o DssColorPicker com um sistema de validação de formulário, mostrando estados de erro/sucesso.
- **Paletas Dinâmicas:** Exemplo de como carregar paletas de cores dinamicamente ou permitir que o usuário crie sua própria paleta.

### Estados a Expor
- **Cor Selecionada:** O valor atual do `v-model`.
- **Estado de Habilitação:** `disabled` (true/false).
- **Estado de Somente Leitura:** `readonly` (true/false).
- **Formato Atual:** O `colorFormat` selecionado.
- **Paleta Ativa:** A `colorPalette` sendo utilizada.