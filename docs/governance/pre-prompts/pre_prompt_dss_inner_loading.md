# Pré-prompt: DssInnerLoading

## 1. CLASSIFICAÇÃO E CONTEXTO
- **Golden Reference:** DssBadge
- **Golden Context:** O `DssInnerLoading` é um componente de feedback visual utilizado para indicar que o conteúdo de um contêiner específico está sendo carregado ou processado. Ele aplica uma camada de sobreposição (overlay) sobre o contêiner pai, bloqueando interações enquanto exibe um indicador de progresso (spinner).
- **Justificativa:** Classificado como não-interativo, sua Golden Reference é o `DssBadge`. Diferente de um loading de página inteira, ele atua localmente, exigindo controle preciso de posicionamento e contexto de empilhamento (z-index) em relação ao seu contêiner pai.

## 2. RISCOS ARQUITETURAIS E GATES
- **Riscos:**
  - O contêiner pai não possuir `position: relative`, fazendo com que o overlay vaze para a tela inteira.
  - Falta de contraste entre o indicador de carregamento e o fundo do overlay.
  - Interceptação incorreta de eventos de clique, permitindo que o usuário interaja com o conteúdo bloqueado.
- **Gates:**
  - O componente deve forçar ou depender de um contexto de empilhamento correto no pai.
  - O overlay deve bloquear todos os eventos de ponteiro (`pointer-events: all`).
  - Transições de visibilidade devem ser suaves para evitar flashes abruptos na interface.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
- **Props Mantidas/Adaptadas:**
  - `showing` (Boolean): Controla a exibição do loading.
  - `color` (String): Define a cor do spinner/texto, mapeado para as cores semânticas do DSS.
  - `size` (String): Tamanho do indicador de carregamento.
  - `label` (String): Texto opcional exibido abaixo ou ao lado do spinner.
- **Props Removidas/Omitidas:**
  - Props de customização de spinner específicas do Quasar que não se alinham ao padrão visual único do DSS.
- **Eventos:**
  - Nenhum evento emitido, pois é um componente estritamente de feedback visual.

## 4. GOVERNANÇA DE TOKENS E CSS
- **Cores e Backgrounds:**
  - Fundo do overlay: `--dss-surface-default` (com opacidade aplicada via CSS para permitir leve transparência, se definido pelo design).
- **Espaçamento e Posicionamento:**
  - Espaçamento entre spinner e label (se houver): `--dss-spacing-4`.
  - O componente deve usar `position: absolute`, com `top: 0`, `left: 0`, `width: 100%`, `height: 100%`.
- **Bordas:**
  - Herda o raio do contêiner pai ou utiliza `--dss-radius-md` para garantir que o overlay não ultrapasse bordas arredondadas.
- **Animação e Transição:**
  - Transição de entrada/saída (fade): `--dss-duration-250`.

## 5. ACESSIBILIDADE E ESTADOS
- **Acessibilidade (a11y):**
  - O contêiner pai deve receber `aria-busy="true"` quando o loading estiver ativo.
  - O componente deve possuir `role="alert"` ou `role="status"` e `aria-live="polite"` para anunciar o estado de carregamento aos leitores de tela.
- **Estados:**
  - **Ativo (Showing):** Overlay visível, spinner animado, interações com o fundo bloqueadas.
  - **Inativo:** Componente oculto (`opacity: 0` e `pointer-events: none`), permitindo interação normal com o contêiner pai.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO
- **Dependências Internas:**
  - `DssSpinner` (ou o componente de spinner oficial do DSS) para a representação visual do carregamento.
- **Composição:**
  - Deve fornecer um slot `default` para permitir a substituição do spinner padrão por conteúdo customizado (ex: barra de progresso, ícone animado ou mensagem complexa).

## 7. EXCEÇÕES PREVISTAS
- **Uso em Componentes Pequenos:** Quando aplicado em contêineres muito pequenos (como botões ou chips), o tamanho do spinner e o espaçamento devem ser reduzidos para evitar transbordamento.
- **Fundos Escuros/Claros:** O overlay deve garantir contraste adequado para o spinner independentemente do tema atual (Light/Dark).

## 8. SUPERFÍCIE DE PLAYGROUND
- **Controles:**
  - `showing` (Boolean) - Toggle para ativar/desativar o loading.
  - `label` (String) - Input de texto para a mensagem de carregamento.
  - `size` (Select) - Controle de tamanho do spinner.
- **Composite Logic:**
  - Um `DssCard` ou contêiner genérico com texto e botões, onde o `DssInnerLoading` é ativado para demonstrar o bloqueio visual e funcional do conteúdo interno.
- **Estados a Expor:**
  - Padrão (Apenas spinner).
  - Com Label (Spinner + Texto explicativo).
  - Customizado (Usando slot para exibir um ícone diferente no lugar do spinner).