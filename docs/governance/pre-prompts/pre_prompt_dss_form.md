# Pré-prompt: DssForm

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip

### Golden Context
DssDialog

### Justificativa do Golden Context
DssDialog é o Golden Context mais próximo para DssForm: ambos usam um componente Quasar como motor direto (EXC-Gate-01), ambos expõem métodos imperativos via `defineExpose` (EXC-Expose-01 — DssDialog expõe o motor QDialog; DssForm expõe `validate/resetValidation/submit/reset` do QForm), ambos são containers estruturais não-interativos no root (Gate de Responsabilidade), e ambos utilizam `inheritAttrs: false` + `v-bind="$attrs"` ao motor Quasar. A diferença central é que DssForm renderiza como `<form>` nativo (semântica HTML) enquanto DssDialog teleporta para `<body>`.

### Justificativa
A necessidade do `DssForm` surge da demanda por uma solução padronizada e robusta para a criação de formulários. Ele abstrai a complexidade de gerenciamento de estado, validação e acessibilidade, permitindo que os desenvolvedores se concentrem na lógica de negócio. Ao encapsular essas funcionalidades, o `DssForm` promove a reutilização, reduz erros e garante a conformidade com as diretrizes do Design System, resultando em interfaces mais consistentes e de alta qualidade. Além disso, centraliza o tratamento de erros e o feedback visual, melhorando a experiência do usuário.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance em formulários complexos**: Formulários com muitos campos e validações aninhadas podem impactar o desempenho. O uso de reatividade excessiva ou validações síncronas pesadas pode causar lentidão na interface.
*   **Acoplamento com lógica de negócio**: Risco de o componente `DssForm` se tornar excessivamente acoplado à lógica de validação específica de um domínio, dificultando sua reutilização e manutenção.
*   **Extensibilidade de validação**: Dificuldade em estender o sistema de validação para atender a requisitos complexos ou personalizados sem modificar o core do componente.
*   **Gerenciamento de estado global**: Desafios na sincronização do estado do formulário com um estado global (e.g., Vuex, Pinia) sem introduzir complexidade desnecessária ou re-renderizações excessivas.

### Gates
*   **Gate de Performance**: Testes de performance obrigatórios para formulários com mais de 20 campos, garantindo que o tempo de resposta da UI permaneça abaixo de 100ms para interações críticas (digitação, validação).
*   **Gate de Validação**: O sistema de validação deve ser plugável e baseado em regras, permitindo a adição de novas regras sem alteração do core do `DssForm`. Deve haver cobertura de testes unitários para todas as regras de validação padrão.
*   **Gate de Acessibilidade**: Auditoria de acessibilidade (WCAG 2.1 AA) para garantir que todos os elementos do formulário sejam navegáveis por teclado, tenham rótulos e mensagens de erro apropriados para leitores de tela.
*   **Gate de Documentação**: Documentação completa sobre como estender o `DssForm` com validações personalizadas e como integrá-lo com soluções de gerenciamento de estado.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Funcionalidade Quasar | Componente/Prop Quasar | Equivalente DSS | Observações |
| :-------------------- | :--------------------- | :-------------- | :---------- |
| Contêiner de Formulário | `QForm`                | `DssForm`       | O `DssForm` encapsula a funcionalidade de `QForm`, adicionando validações e gerenciamento de estado padronizados pelo DSS. |
| Validação de Campos   | `rules` (em `QInput`, `QSelect`, etc.) | `validation` (prop no `DssForm` ou nos `DssInput`s internos) | O `DssForm` orquestra a validação de seus filhos, permitindo validações em nível de formulário e de campo. |
| Estado de Carregamento | `submitting` (prop em `QForm`) | `loading` (prop no `DssForm`) | Indica que o formulário está em processo de submissão. |
| Reset de Formulário   | `resetValidation()` (método de `QForm`) | `reset()` (método de `DssForm`) | Reseta o estado de validação e os valores dos campos para o estado inicial. |
| Submissão de Formulário | `@submit` (evento de `QForm`) | `@submit` (evento de `DssForm`) | Evento disparado quando o formulário é submetido e validado com sucesso. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssForm` é um container estrutural leve — QForm renderiza como `<form>` HTML nativo sem superfície visual. CSS é mínimo.

**Tokens utilizados (implementação canônica)**:
- `--dss-form-gap` — gap entre campos do formulário (`tokens/semantic/_spacing.scss`, mapeia para `--dss-spacing-4`)
- Demais tokens de espaçamento: `--dss-gap-3`, `--dss-gap-4`, `--dss-gap-6` (quando necessário)

**DssForm NÃO usa** (responsabilidade dos filhos):
- Tokens de cor/superfície (`--dss-surface-default`, `--dss-hub-600`, etc.) — a cor pertence aos campos internos
- Tokens de sombra ou elevation — DssForm não tem superfície elevada
- Tokens de radius — DssForm não tem borda ou cantos arredondados próprios

**Tokens que NÃO existem no DSS (nunca usar)**:
- `--dss-action-hub` → Use `--dss-hub-600`
- `--dss-action-water` → Use `--dss-water-600`
- `--dss-action-waste` → Use `--dss-waste-600`
- `--dss-surface-alt` → Use `--dss-surface-variant` (se existir) ou `--dss-gray-100`
- `--dss-surface-inverted` → Não existe; use `--dss-surface-default` no escopo correto
- `--dss-text-subtle` → Use `--dss-text-secondary`
- `--dss-duration-150/200/300` → Use `--dss-duration-fast` ou `--dss-duration-normal` (verificar catálogo)
- `--dss-color-hub` → Use `--dss-hub-600`
- Valores hardcoded de px, rem, hex, rgb → Sempre `var(--dss-*)`

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Navegação por Teclado**: Todos os campos dentro do `DssForm` devem ser navegáveis sequencialmente via `Tab` e `Shift+Tab`. A submissão deve ser possível via `Enter`.
*   **Rótulos Explícitos**: Cada campo de entrada deve ter um rótulo (`<label>`) associado explicitamente via `for`/`id` ou `aria-labelledby`.
*   **Mensagens de Erro**: Mensagens de erro de validação devem ser associadas aos campos correspondentes via `aria-describedby` e serem visualmente perceptíveis e claras.
*   **Estados ARIA**: Utilização de atributos ARIA como `aria-invalid`, `aria-required`, `aria-disabled` para comunicar o estado dos campos a tecnologias assistivas.
*   **Foco Visível**: Indicação clara do elemento em foco (outline) para usuários de teclado.

### Estados
*   **Default**: Estado inicial do formulário, sem interações ou validações aplicadas.
*   **Preenchido**: Campos com valores inseridos pelo usuário.
*   **Focado**: Um campo de entrada está em foco.
*   **Inválido/Erro**: Um ou mais campos não atendem às regras de validação. Mensagens de erro são exibidas.
*   **Válido**: Todos os campos atendem às regras de validação.
*   **Desabilitado**: O formulário ou campos específicos estão desabilitados e não podem ser interagidos.
*   **Carregando/Submetendo**: O formulário está em processo de submissão, e a interação pode ser bloqueada temporariamente.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas (outros componentes DSS)
*   `DssInput`, `DssTextarea`, `DssSelect`, `DssCheckbox`, `DssRadio`, `DssToggle`, `DssSlider`, `DssFile` (campos de entrada — todas já seladas Fase 1)
*   `DssButton` (para submissão e ações do formulário — já selado Fase 1)
*   `DssSpinner` (para indicar estado de carregamento — já selado Fase 1)
*   `DssValidationMessage` — **NÃO EXISTE no DSS**. Mensagens de erro são exibidas pelos próprios campos (`DssInput`, `DssSelect`, etc.) via prop `error-message`. Documentar como lacuna de Fase 3 se demandado.

### Dependências Externas
*   **Vue.js**: Framework principal.
*   **Quasar Framework**: Utilizado para componentes base e utilitários (internamente, abstraído pelo DSS).
*   **Vuelidate (ou similar)**: Biblioteca de validação (se for utilizada uma externa, caso contrário, a validação será interna ao DSS).

### Composição
O `DssForm` atua como um orquestrador, compondo múltiplos `DssInput`s e `DssButton`s. Ele gerencia o estado de validação de seus filhos e expõe métodos para submissão e reset. A composição deve ser flexível, permitindo que qualquer componente de entrada do DSS seja aninhado dentro do `DssForm`.

## 7. EXCEÇÕES PREVISTAS

*   **Validação Assíncrona**: Cenários onde a validação de um campo depende de uma chamada de API (e.g., verificar unicidade de um email). O `DssForm` deve suportar a exibição de estados de carregamento e erro para validações assíncronas.
*   **Formulários Multi-passo**: Embora o `DssForm` seja projetado para um único passo, ele deve ser capaz de ser utilizado como um bloco fundamental em uma composição maior para formulários multi-passo, sem quebrar sua funcionalidade intrínseca.
*   **Campos Condicionais**: Formulários onde a visibilidade ou obrigatoriedade de campos muda dinamicamente com base em outras entradas. O `DssForm` deve reagir corretamente a essas mudanças, ajustando suas regras de validação e estado.
*   **Integração com Upload de Arquivos**: Se o formulário incluir upload de arquivos, o `DssForm` deve fornecer um mecanismo para integrar o estado de upload (progresso, sucesso, erro) sem sobrecarregar sua API principal.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   **Prop `loading`**: Um toggle para simular o estado de submissão do formulário.
*   **Prop `disabled`**: Um toggle para desabilitar/habilitar todos os campos do formulário.
*   **Prop `autofocus`**: Um toggle para aplicar o foco automático ao primeiro campo do formulário.
*   **Botão `Reset`**: Para resetar o formulário aos seus valores e estado de validação iniciais.
*   **Botão `Submit`**: Para acionar a validação e submissão do formulário.
*   **Prop `color`**: Seleção de cor de destaque do formulário, utilizando as cores da marca: `hub`, `water`, `waste`.

### Composite Logic
*   **Validação em Tempo Real**: Demonstração de validação de campos enquanto o usuário digita (on-the-fly), exibindo mensagens de erro concretas como "Email inválido" ou "Campo obrigatório".
*   **Validação de Formulário Completo**: Exemplo de como o formulário se comporta quando o botão de submissão é clicado com campos inválidos, destacando os campos com erro.
*   **Interação com `DssInput`s**: Exibição de como diferentes tipos de `DssInput` (texto, seleção, checkbox) se integram e são validados dentro do `DssForm`.
*   **Feedback de Submissão**: Simulação de um feedback visual (e.g., spinner, mensagem de sucesso/erro) após a submissão do formulário, utilizando as cores `hub` para sucesso e `waste` para erro.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `isValid` | Indica se todos os campos do formulário são válidos. | boolean | — |
| `isDirty` | Indica se algum campo do formulário foi modificado pelo usuário. | boolean | — |
| `isSubmitting` | Indica se o formulário está em processo de submissão. | boolean | — |
| `errors` | Um objeto contendo mensagens de erro para cada campo inválido. | object | Prop `error=true` ou validação |
| `values` | Um objeto contendo os valores atuais de todos os campos do formulário. | object | — |
| `brandColor` | A cor de marca atual aplicada ao formulário (`hub`, `water`, `waste`). | string | — |
