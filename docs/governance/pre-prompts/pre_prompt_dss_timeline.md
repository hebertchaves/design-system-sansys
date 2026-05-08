# Pré-prompt: DssTimeline

## 1. CLASSIFICAÇÃO E CONTEXTO
### Golden Reference
DssBadge

### Golden Context
O componente `DssTimeline` é utilizado para exibir uma série de eventos em ordem cronológica, vertical ou horizontalmente. Ele permite a visualização clara de marcos, etapas de processos, histórico de atividades ou qualquer sequência temporal de informações. Cada item da timeline pode conter um ícone, um título, uma descrição e um slot para conteúdo adicional.
Este componente é fundamental para interfaces que necessitam demonstrar evolução de status, rastreamento de pedidos, histórico de interações de usuários ou fluxos de aprovação complexos. A clareza visual proporcionada por uma linha do tempo bem estruturada reduz a carga cognitiva do usuário ao analisar sequências de eventos.

### Justificativa
A necessidade de um componente de timeline padronizado no Design System surge da frequente demanda por representações visuais de progressão e histórico em diversas aplicações. A padronização garante consistência visual, experiência de usuário unificada e otimiza o desenvolvimento, evitando a recriação de lógicas e estilos em diferentes contextos.
Além disso, a implementação de um componente centralizado permite a aplicação de correções de acessibilidade e melhorias de performance de forma global, beneficiando todos os produtos que o consomem. A manutenção de um único componente robusto é preferível à proliferação de implementações ad-hoc.

## 2. RISCOS ARQUITETURAIS E GATES
- **Performance**: Timelines com muitos itens podem impactar a performance, especialmente em dispositivos móveis ou com renderização complexa de slots. A virtualização ou lazy loading deve ser considerada para grandes conjuntos de dados. A renderização de centenas de nós DOM simultaneamente deve ser evitada.
- **Flexibilidade de Conteúdo**: Garantir que os slots de conteúdo sejam flexíveis o suficiente para acomodar diversos tipos de informação sem quebrar o layout ou a acessibilidade. O conteúdo injetado não deve transbordar o contêiner do item.
- **Responsividade**: O layout da timeline deve se adaptar elegantemente a diferentes tamanhos de tela, especialmente a transição entre layouts verticais e horizontais, se aplicável. Em telas menores, um layout alternado (`both`) pode precisar ser forçado para um layout de lado único (`left` ou `right`) para economizar espaço horizontal.
- **Interatividade**: Se os itens da timeline forem interativos (clicáveis, expansíveis), a gestão de estados e eventos deve ser clara e consistente. O feedback visual de interação (hover, active, focus) deve ser imediato e perceptível.
- **Acessibilidade**: A estrutura DOM deve refletir a natureza sequencial dos dados. O uso inadequado de tags semânticas pode prejudicar a experiência de usuários que dependem de tecnologias assistivas.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
O `DssTimeline` será construído com base no `QTimeline` do Quasar, abstraindo e padronizando suas propriedades e slots para aderir à linguagem do Design System.

| Propriedade Quasar (QTimeline) | Propriedade DSS (DssTimeline) | Observações |
| :----------------------------- | :---------------------------- | :---------- |
| `layout`                       | `orientation`                 | `vertical` (padrão), `horizontal`. Define a direção principal da linha do tempo. |
| `side`                         | `alignment`                   | `left`, `right`, `both` (para vertical); `top`, `bottom` (para horizontal). Controla o posicionamento dos itens em relação à linha central. |
| `color`                        | `lineColor`                   | Mapeado para tokens de cor do DSS, ex: `--dss-action-hub`. Define a cor da linha conectora. |
| `dark`                         | `isDark`                      | Booleano para modo escuro. Ajusta automaticamente as cores de fundo e texto para contraste adequado. |
| `items` (slot)                 | `DssTimelineItem` (componente) | Cada item da timeline será um subcomponente `DssTimelineItem`. |

**DssTimelineItem (baseado em QTimelineEntry)**

| Propriedade Quasar (QTimelineEntry) | Propriedade DSS (DssTimelineItem) | Observações |
| :---------------------------------- | :-------------------------------- | :---------- |
| `icon`                              | `icon`                            | Nome do ícone do DSS a ser exibido no marcador do item. |
| `title`                             | `title`                           | Título principal do evento. |
| `subtitle`                          | `subtitle`                        | Subtítulo, frequentemente utilizado para exibir a data ou hora do evento. |
| `body` (slot)                       | `default` (slot)                  | Conteúdo principal e detalhado do item. |
| `side`                              | `itemAlignment`                   | Sobrescreve a propriedade `alignment` do `DssTimeline` pai para este item específico. |
| `color`                             | `dotColor`                        | Cor do marcador (ponto) do item, mapeado para tokens de cor do DSS. |
| `avatar`                            | `avatar`                          | URL ou componente de avatar para substituir o ícone padrão. |

## 4. GOVERNANÇA DE TOKENS E CSS
O `DssTimeline` e seus subcomponentes (`DssTimelineItem`) devem utilizar exclusivamente os tokens de design do DSS para espaçamento, raio, cores e durações de transição.

- **Espaçamento**: `--dss-spacing-X` (ex: `--dss-spacing-4` para padding interno, `--dss-spacing-8` para margens entre itens).
- **Raio**: `--dss-radius-md` para cantos arredondados de cards dentro dos itens da timeline.
- **Cores**: `--dss-surface-default` para o fundo dos itens, `--dss-action-hub` para a linha e pontos ativos, `--dss-color-neutral-400` para linha e pontos inativos.
- **Tipografia**: `--dss-text-subtle` para subtítulos e datas, garantindo hierarquia visual adequada.
- **Duração**: `--dss-duration-250` para transições de hover ou expansão de itens.
- **Bordas**: `--dss-border-width-sm` para bordas de itens, `--dss-border-color-default` para a cor da borda.
- **Sombras**: `--dss-shadow-sm` para itens em destaque ou interativos.

**Exemplos de uso de tokens:**
```css
.dss-timeline {
  display: flex;
  flex-direction: column;
  padding: var(--dss-spacing-4);
}

.dss-timeline--horizontal {
  flex-direction: row;
}

.dss-timeline-item {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-md);
  padding: var(--dss-spacing-8);
  margin-bottom: var(--dss-spacing-16);
  position: relative;
}

.dss-timeline-item__title {
  color: var(--dss-text-hub);
  font-weight: var(--dss-font-weight-bold);
}

.dss-timeline-item__subtitle {
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
  margin-bottom: var(--dss-spacing-4);
}

.dss-timeline-line {
  background-color: var(--dss-color-neutral-400);
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.dss-timeline-dot {
  background-color: var(--dss-action-hub);
  transition: background-color var(--dss-duration-250) ease-in-out;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.dss-timeline-dot--water {
  background-color: var(--dss-action-water);
}

.dss-timeline-dot--waste {
  background-color: var(--dss-action-waste);
}

.dss-timeline-item:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}
```

## 5. ACESSIBILIDADE E ESTADOS
- **Semântica**: Utilizar elementos HTML semânticos (`<ol>`, `<li>`) ou atributos ARIA (`role="list"`, `role="listitem"`) para garantir que leitores de tela identifiquem a timeline como uma lista de itens sequenciais.
- **Foco**: Se os itens forem interativos, garantir que recebam foco adequadamente e que o estado de foco seja visível (ex: `outline: 2px solid white`). O gerenciamento de foco deve seguir a ordem lógica do DOM.
- **Contraste**: Assegurar que as cores de texto e fundo atendam aos requisitos de contraste da WCAG (mínimo de 4.5:1 para texto normal).
- **Leitores de Tela**: Fornecer texto alternativo para ícones e avatares utilizando `aria-label` ou `aria-hidden="true"` quando forem puramente decorativos.
- **Navegação por Teclado**: Usuários devem ser capazes de navegar entre os itens interativos da timeline usando as teclas `Tab` e `Shift+Tab`. Se a timeline for um widget complexo, setas direcionais podem ser implementadas para navegação interna.
- **Avisos de Atualização**: Se a timeline for atualizada dinamicamente (ex: novos eventos chegando em tempo real), utilizar `aria-live="polite"` no contêiner para anunciar as mudanças aos leitores de tela sem interromper o usuário abruptamente.
- **Estados**:
  - **Ativo/Atual**: Destacar visualmente o item atual ou ativo na timeline, possivelmente utilizando um ícone diferente ou uma cor de destaque como `--dss-action-hub`.
  - **Concluído**: Indicar visualmente itens que já ocorreram, utilizando cores mais suaves ou ícones de "check".
  - **Futuro**: Indicar visualmente itens que ainda não ocorreram, utilizando estilos desabilitados ou cores neutras.

## 6. COMPOSIÇÃO E SLOTS
O `DssTimeline` deve ser composto por um contêiner principal e subcomponentes `DssTimelineItem`. A arquitetura deve permitir a injeção de conteúdo rico sem quebrar a estrutura da linha do tempo.

- **Slots do DssTimeline**:
  - `default`: Slot principal para renderizar os `DssTimelineItem`. Este slot deve aceitar apenas componentes do tipo `DssTimelineItem` para garantir a integridade estrutural.

- **Slots do DssTimelineItem**:
  - `default`: Slot para o conteúdo principal do item (texto, imagens, outros componentes). Este é o espaço de maior flexibilidade.
  - `title`: Slot para customizar o título do item, permitindo a inclusão de badges ou ícones junto ao texto.
  - `subtitle`: Slot para customizar o subtítulo ou data/hora, útil para formatações complexas de data.
  - `icon`: Slot para customizar o ícone do ponto, permitindo o uso de SVGs customizados ou componentes de ícone complexos.
  - `opposite`: Em layouts alternados (`alignment="both"`), um slot `opposite` pode ser disponibilizado no `DssTimelineItem` para renderizar conteúdo no lado oposto ao conteúdo principal (ex: exibir a data no lado esquerdo e o conteúdo no lado direito).

## 7. BOAS PRÁTICAS E ANTI-PATTERNS
**Boas Práticas:**
- Utilizar a timeline para representar sequências lógicas e cronológicas claras.
- Manter o conteúdo dos itens conciso e direto, evitando longos blocos de texto que dificultam a escaneabilidade.
- Utilizar ícones significativos para ajudar na rápida identificação do tipo de evento (ex: ícone de envelope para envio de email, ícone de check para aprovação).
- Garantir que a ordem dos itens seja lógica (geralmente do mais antigo para o mais recente, ou vice-versa, dependendo do contexto).

**Anti-patterns:**
- Utilizar a timeline para exibir listas de itens não relacionados ou sem ordem cronológica. Para isso, utilize um componente de lista padrão.
- Sobrecarregar os itens com muito texto ou conteúdo complexo, dificultando a leitura e a compreensão da sequência.
- Utilizar cores inconsistentes para representar diferentes estados ou tipos de eventos, o que pode confundir o usuário.
- Ocultar informações críticas dentro de itens expansíveis sem fornecer um resumo adequado no estado colapsado.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
- `orientation`: Select (`vertical`, `horizontal`) - Define a direção da timeline.
- `alignment`: Select (`left`, `right`, `both`, `top`, `bottom`) - Define o alinhamento dos itens.
- `lineColor`: Select (`hub`, `water`, `waste`, `neutral`) - Define a cor da linha conectora.
- `isDark`: Toggle (boolean) - Alterna entre os modos claro e escuro.
- `dense`: Toggle (boolean) - Reduz o espaçamento entre os itens para layouts mais compactos.

### Composite Logic
A lógica de composição do `DssTimeline` no playground deve permitir a adição dinâmica de `DssTimelineItem`. O usuário deve poder configurar as propriedades de cada item individualmente, como `title`, `subtitle`, `icon` e `dotColor`. A renderização deve refletir imediatamente as mudanças nas propriedades do contêiner principal e dos itens.
O playground deve incluir um botão "Adicionar Item" que insere um novo `DssTimelineItem` com dados mockados na sequência. Também deve ser possível remover itens existentes para testar o comportamento do componente com diferentes quantidades de dados. A interação de arrastar e soltar (drag and drop) pode ser implementada para reordenar os itens no playground, demonstrando a flexibilidade do componente.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Timeline vertical com itens alinhados à esquerda | Visual | `orientation="vertical"`, `alignment="left"` |
| Horizontal | Timeline com layout horizontal e itens no topo | Visual | `orientation="horizontal"`, `alignment="top"` |
| Alternado | Timeline vertical com itens alternando lados | Visual | `orientation="vertical"`, `alignment="both"` |
| Cores de Marca | Timeline utilizando cores da marca para os pontos | Visual | `lineColor="neutral"`, `dotColor="hub"`, `dotColor="water"`, `dotColor="waste"` |
| Modo Escuro | Timeline renderizada em modo escuro com contraste ajustado | Visual | `isDark=true` |
| Denso | Timeline com espaçamento reduzido entre os itens | Visual | `dense=true` |
| Com Ícones | Timeline onde cada item possui um ícone específico | Visual | `icon="check"`, `icon="warning"`, `icon="info"` |
| Conteúdo Rico | Timeline com slots customizados contendo imagens e botões | Visual | `default` slot preenchido com HTML complexo |
