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
- **Cores/Superfície:** `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-disabled`, `--dss-action-hub`, `--dss-action-hub-surface`.
- **Texto:** `--dss-text-subtle` (para placeholders e dicas).
- **Foco:** `outline: 2px solid white` (para anel de foco).
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
- **Controles Obrigatórios:**
  - `modelValue` (Input de texto para testar o two-way binding)
  - `disabled` (Toggle)
  - `readonly` (Toggle)
  - `error` (Toggle)
  - `errorMessage` (Input de texto)
  - `format24h` (Toggle)
- **Composite Logic:** Verificar a precedência visual e funcional quando `disabled` e `error` estão ativos simultaneamente (o estado disabled deve prevalecer). Testar a formatação automática ao digitar.
- **Estados a Expor:**
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `default` | Estado inicial, aguardando interação do usuário. | Visual | Padrão (renderização inicial) |
| `hover` | Feedback visual ao posicionar o cursor sobre o campo. | Visual | Mouse over |
| `focus` | Destaque visual (anel de foco) quando o campo está ativo. | Visual | Navegação por teclado (Tab) |
| `disabled` | Opacidade reduzida, interações bloqueadas e remoção do fluxo de tabulação. | Visual | Prop `disable=true` |
| `error` | Estilização de erro (bordas/ícones vermelhos) e exibição da mensagem de erro associada. | Funcional | Prop `error=true` ou validação |
| `readonly` | Campo visível e focável, mas não editável. | Visual | Prop `readonly=true` |

## 9. DETALHAMENTO DE IMPLEMENTAÇÃO E EXPANSÃO
Para garantir que o componente seja robusto e atenda a todos os requisitos de design e funcionalidade, os seguintes detalhes adicionais devem ser considerados durante a implementação:

### 9.1. Validação de Entrada
A validação de entrada deve ser rigorosa. O componente deve aceitar apenas caracteres numéricos e o separador de dois pontos (`:`). Qualquer outro caractere deve ser ignorado ou rejeitado imediatamente. A máscara `##:##` deve ser aplicada dinamicamente à medida que o usuário digita.

### 9.2. Comportamento do Popup
O popup de seleção de tempo deve ser acionado tanto pelo clique no ícone de relógio quanto pelo foco no campo de entrada, dependendo da configuração. O popup deve fechar automaticamente após a seleção de um horário válido ou quando o usuário clicar fora da área do componente (click outside).

### 9.3. Integração com Formulários
O `DssTimePicker` deve integrar-se perfeitamente com bibliotecas de gerenciamento de formulários, como VeeValidate ou Vuelidate. Ele deve emitir eventos apropriados (`update:modelValue`, `blur`, `focus`) para permitir a validação em nível de formulário.

### 9.4. Internacionalização (i18n)
Embora o formato de 24 horas seja o padrão, o componente deve suportar internacionalização para permitir a exibição no formato de 12 horas (AM/PM) quando necessário. As strings de acessibilidade (ex: "Abrir seletor de tempo") devem ser traduzíveis.

### 9.5. Testes Unitários e E2E
A cobertura de testes deve incluir:
- Renderização correta em todos os estados (`default`, `disabled`, `error`, etc.).
- Validação de entrada manual (aceitação de valores válidos, rejeição de inválidos).
- Abertura e fechamento do popup.
- Seleção de tempo via interface visual.
- Navegação por teclado e acessibilidade.

### 9.6. Documentação e Exemplos
A documentação do componente deve incluir exemplos claros de uso para todos os cenários comuns, incluindo:
- Uso básico.
- Com validação de erro.
- Desabilitado e somente leitura.
- Com restrição de horas/minutos selecionáveis (usando a prop `options`).

### 9.7. Considerações de Performance
O componente deve ser otimizado para evitar re-renderizações desnecessárias, especialmente quando usado em listas longas ou formulários complexos. O uso de `QPopupProxy` deve ser lazy-loaded se possível para reduzir o tempo de carregamento inicial.

### 9.8. Evolução Futura
Possíveis melhorias futuras incluem:
- Suporte a seleção de intervalos de tempo (range picker).
- Integração com seleção de data (datetime picker).
- Temas personalizados para diferentes contextos de uso.

### 9.9. Alinhamento com o Design System
O `DssTimePicker` deve seguir estritamente as diretrizes visuais do Design System Sansys. Qualquer desvio deve ser justificado e aprovado pela equipe de design. O uso de tokens de design (`--dss-*`) é obrigatório para garantir consistência e facilidade de manutenção.

### 9.10. Feedback Visual e Microinterações
As microinterações, como a mudança de cor ao passar o mouse (hover) ou o anel de foco ao clicar, devem ser suaves e responsivas. A duração das transições (`--dss-duration-250`) deve ser respeitada para manter a harmonia com outros componentes do sistema.

### 9.11. Suporte a Dispositivos Móveis
A experiência em dispositivos móveis deve ser cuidadosamente testada. O teclado numérico deve ser acionado automaticamente quando o usuário focar no campo de entrada em um dispositivo móvel. O dialog de seleção de tempo deve ser dimensionado adequadamente para evitar rolagem desnecessária.

### 9.12. Tratamento de Fuso Horário
Se o componente for usado em contextos onde o fuso horário é relevante, ele deve ser capaz de exibir e capturar o tempo no fuso horário correto, possivelmente integrando-se com bibliotecas de manipulação de datas como date-fns ou moment.js.

### 9.13. Customização de Ícones
O ícone de relógio padrão deve ser customizável através de slots ou props, permitindo que os desenvolvedores usem ícones diferentes se necessário, desde que estejam dentro do conjunto de ícones aprovado pelo Design System.

### 9.14. Comportamento de Limpeza (Clearable)
O componente deve suportar uma prop `clearable` que exibe um ícone de "X" quando há um valor selecionado, permitindo que o usuário limpe o campo rapidamente com um único clique.

### 9.15. Conclusão
O `DssTimePicker` é um componente crítico para a entrada de dados precisos. Sua implementação deve ser feita com atenção aos detalhes, garantindo uma experiência de usuário fluida, acessível e consistente com o restante do Design System Sansys.
