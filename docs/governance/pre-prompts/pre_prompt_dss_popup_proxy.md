# Pré-prompt: DssPopupProxy

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip

### Golden Context
O DssPopupProxy é um componente de utilidade que atua como um invólucro para elementos interativos que precisam exibir conteúdo flutuante (popups, menus, tooltips) de forma controlada e acessível. Ele gerencia o estado de abertura/fechamento, posicionamento e interações de foco, desacoplando a lógica do popup do seu conteúdo e gatilho. Seu principal objetivo é padronizar a experiência de popups no DSS, garantindo consistência visual e comportamental, além de conformidade com padrões de acessibilidade.

### Justificativa
A necessidade de um componente DssPopupProxy surge da complexidade inerente ao gerenciamento de popups em aplicações web. A padronização de popups é crucial para a coesão do Design System, evitando implementações inconsistentes e problemas de acessibilidade. Este componente encapsula a lógica de interação, posicionamento e acessibilidade, permitindo que os desenvolvedores se concentrem no conteúdo do popup, enquanto o DSS garante a experiência do usuário e a conformidade técnica.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
- **Performance**: Múltiplos popups abertos simultaneamente ou popups com conteúdo complexo podem impactar a performance da renderização.
- **Acessibilidade**: Falha em gerenciar corretamente o foco, atributos ARIA e navegação por teclado pode tornar o componente inacessível.
- **Conflitos de Posicionamento**: Em cenários complexos (scroll, redimensionamento, popups aninhados), o posicionamento pode falhar ou causar reflows indesejados.
- **Acoplamento**: Risco de acoplamento excessivo com componentes Quasar subjacentes, dificultando futuras migrações ou customizações.

### Gates
- **Revisão de Design**: Validação da experiência do usuário e aderência aos padrões visuais do DSS.
- **Revisão de Código**: Garantia de boas práticas de Vue.js/Quasar, modularidade e manutenibilidade.
- **Auditoria de Acessibilidade**: Testes rigorosos de teclado, leitores de tela e conformidade com WCAG.
- **Testes de Performance**: Avaliação do impacto em cenários de uso intensivo.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssPopupProxy encapsulará a funcionalidade de `QPopupProxy` e `QMenu` do Quasar, expondo uma API simplificada e alinhada ao DSS.

| Quasar (QPopupProxy/QMenu) | DSS (DssPopupProxy) | Descrição | Notas |
| :------------------------- | :------------------ | :-------- | :---- |
| `v-model:show`             | `v-model:open`      | Controla a visibilidade do popup. | Propriedade reativa para abrir/fechar. |
| `target`                   | `target`            | Elemento DOM que aciona o popup. | Pode ser um seletor CSS ou referência de template. |
| `anchor`                   | `anchor`            | Ponto de ancoragem do popup em relação ao target. | Ex: `top middle`, `bottom start`. |
| `self`                     | `self`              | Ponto de ancoragem do popup em relação a si mesmo. | Ex: `top middle`, `bottom start`. |
| `offset`                   | `offset`            | Deslocamento em pixels do popup. | Array `[x, y]`. |
| `persistent`               | `persistent`        | Impede o fechamento ao clicar fora. | Booleano. |
| `auto-close`               | `autoClose`         | Fecha o popup ao clicar em seu conteúdo. | Booleano. |
| `no-focus`                 | `noFocus`           | Impede que o popup capture o foco. | Booleano. |
| `no-refocus`               | `noRefocus`         | Impede que o foco retorne ao target. | Booleano. |
| `transition-show`          | `transitionShow`    | Transição de entrada. | String de nome de transição. |
| `transition-hide`          | `transitionHide`    | Transição de saída. | String de nome de transição. |
| `content-class`            | `contentClass`      | Classe CSS para o container do conteúdo. | Para estilização interna. |
| `content-style`            | `contentStyle`      | Estilo CSS para o container do conteúdo. | Para estilização interna. |
| `max-height`               | `maxHeight`         | Altura máxima do conteúdo. | String CSS (ex: `200px`). |
| `max-width`                | `maxWidth`          | Largura máxima do conteúdo. | String CSS (ex: `300px`). |
| `fit`                      | `fit`               | Ajusta a largura do popup ao target. | Booleano. |
| `cover`                    | `cover`             | Cobre o target completamente. | Booleano. |
| `scroll-target`            | `scrollTarget`      | Elemento para escutar eventos de scroll. | Seletor CSS ou referência. |
| `@before-show`             | `@beforeShow`       | Emitido antes de o popup ser exibido. | Evento. |
| `@show`                    | `@show`             | Emitido quando o popup é exibido. | Evento. |
| `@before-hide`             | `@beforeHide`       | Emitido antes de o popup ser ocultado. | Evento. |
| `@hide`                    | `@hide`             | Emitido quando o popup é ocultado. | Evento. |
| `default` slot             | `default` slot      | Conteúdo do popup. | Slot para o conteúdo principal. |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssPopupProxy utilizará os tokens de design do DSS para espaçamento, raio de borda, cores de superfície e durações de transição, garantindo a consistência visual.

- **Espaçamento Interno (Padding)**: `--dss-spacing-4`, `--dss-spacing-8`, `--dss-spacing-16` (aplicados ao conteúdo interno do popup, se necessário).
- **Raio de Borda (Border Radius)**: `--dss-radius-md` (para o container do popup).
- **Cor de Superfície (Background Color)**: `--dss-surface-default` (para o fundo do popup).
- **Sombra (Box Shadow)**: `--dss-shadow-2` (para dar profundidade ao popup).
- **Duração da Transição (Transition Duration)**: `--dss-duration-250` (para as transições de show/hide).
- **Z-index**: Gerenciado internamente para garantir que o popup esteja acima de outros elementos da interface.

**Tokens Proibidos (Exemplos a evitar)**: `--dss-padding-md`, `--dss-duration-base`, `--dss-color-popup-bg`.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- **Foco**: O foco será gerenciado para mover-se para o conteúdo do popup quando aberto e retornar ao elemento que o acionou quando fechado (a menos que `noRefocus` seja `true`).
- **ARIA**: Atributos `role=