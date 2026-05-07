# Pré-prompt: DssTimePicker

## 1. CLASSIFICAÇÃO E CONTEXTO
- **Golden Reference:** DssChip
- **Golden Context:** O `DssTimePicker` é um componente de formulário interativo projetado para a seleção e entrada de horários. Ele atua como uma interface padronizada para capturar horas e minutos, garantindo que os dados inseridos sigam formatos de tempo válidos.
- **Justificativa:** Sendo um componente interativo de entrada de dados, ele herda padrões de interação, foco e feedback visual do `DssChip`, adaptando-os para a complexidade de validação e seleção de tempo.

## 2. RISCOS ARQUITETURAIS E GATES
- **Riscos:** Inconsistência na formatação de tempo (ex: 12h vs 24h), falhas na validação de limites (hora mínima e máxima permitida), e problemas de acessibilidade na navegação por teclado no menu de seleção.
- **Gates:** O componente deve suportar o formato de 24 horas por padrão, garantir validação em tempo real da entrada manual via teclado, e assegurar que o popup de seleção seja totalmente acessível via teclado e leitores de tela.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
- `v-model` -> `modelValue` (String, formato 'HH:mm')
- `mask` -> `mask` (String, padrão '##:##')
- `format24h` -> `format24h` (Boolean, padrão true)
- `disable` -> `disabled` (Boolean)
- `readonly` -> `readonly` (Boolean)
- `options` -> `options` (Function para restringir horas/minutos selecionáveis)
- `error` -> `error` (Boolean)
- `error-message` -> `errorMessage` (String)

## 4. GOVERNANÇA DE TOKENS E CSS
- **Espaçamento:** `--dss-spacing-2`, `--dss-spacing-4` (para padding interno do campo e margens no popup de seleção).
- **Raio de Borda:** `--dss-radius-md` (para o contêiner do input e bordas do popup).
- **Cores/Superfície:** `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-disabled`.
- **Transições:** `--dss-duration-250` (para animações de transição de estado como hover, focus e abertura/fechamento do popup).

## 5. ACESSIBILIDADE E ESTADOS
- **Acessibilidade:** O campo de entrada deve possuir `aria-label` adequado. O popup de seleção deve gerenciar o foco corretamente (focus trap) e permitir navegação pelas opções usando as setas do teclado, confirmando com Enter e cancelando com Escape.
- **Estados:**
  - `default`: Estado inicial, aguardando interação do usuário.
  - `hover`: Feedback visual ao posicionar o cursor sobre o campo.
  - `focus`: Destaque visual (anel de foco) quando o campo está ativo.
  - `disabled`: Opacidade reduzida, interações bloqueadas e remoção do fluxo de tabulação.
  - `error`: Estilização de erro (bordas/ícones vermelhos) e exibição da mensagem de erro associada.
  - `readonly`: Campo visível e focável, mas não editável.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO
- **Dependências:** `QInput` (para a base do campo de texto), `QPopupProxy` (para o gerenciamento do menu suspenso/dialog responsivo), `QTime` (para a interface visual de seleção de tempo do Quasar).
- **Composição:** O `DssTimePicker` compõe um campo de entrada de texto com um ícone de relógio (via `DssIcon`) que atua como gatilho para abrir o seletor de tempo.

## 7. EXCEÇÕES PREVISTAS
- Entradas manuais que não correspondam a um formato de tempo válido (ex: "25:99") devem acionar o estado de erro ou ser corrigidas/rejeitadas automaticamente dependendo da configuração de máscara.
- Em dispositivos móveis, o `QPopupProxy` deve adaptar a exibição do seletor de tempo para um dialog centralizado em vez de um menu suspenso, garantindo melhor usabilidade em telas menores.

## 8. SUPERFÍCIE DE PLAYGROUND
- **Controles:**
  - `modelValue` (Input de texto para testar o two-way binding)
  - `disabled` (Toggle)
  - `readonly` (Toggle)
  - `error` (Toggle)
  - `errorMessage` (Input de texto)
  - `format24h` (Toggle)
- **Composite Logic:** Verificar a precedência visual e funcional quando `disabled` e `error` estão ativos simultaneamente (o estado disabled deve prevalecer). Testar a formatação automática ao digitar.
- **Estados a Expor:** `default`, `hover`, `focus`, `disabled`, `error`, `readonly`.