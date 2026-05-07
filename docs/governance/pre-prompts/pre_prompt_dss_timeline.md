# Pré-prompt: DssTimeline

## 1. CLASSIFICAÇÃO E CONTEXTO
### Golden Reference
DssBadge

### Golden Context
O componente `DssTimeline` é utilizado para exibir uma série de eventos em ordem cronológica, vertical ou horizontalmente. Ele permite a visualização clara de marcos, etapas de processos, histórico de atividades ou qualquer sequência temporal de informações. Cada item da timeline pode conter um ícone, um título, uma descrição e um slot para conteúdo adicional.

### Justificativa
A necessidade de um componente de timeline padronizado no Design System surge da frequente demanda por representações visuais de progressão e histórico em diversas aplicações. A padronização garante consistência visual, experiência de usuário unificada e otimiza o desenvolvimento, evitando a recriação de lógicas e estilos em diferentes contextos.

## 2. RISCOS ARQUITETURAIS E GATES
- **Performance**: Timelines com muitos itens podem impactar a performance, especialmente em dispositivos móveis ou com renderização complexa de slots. A virtualização ou lazy loading deve ser considerada para grandes conjuntos de dados.
- **Flexibilidade de Conteúdo**: Garantir que os slots de conteúdo sejam flexíveis o suficiente para acomodar diversos tipos de informação sem quebrar o layout ou a acessibilidade.
- **Responsividade**: O layout da timeline deve se adaptar elegantemente a diferentes tamanhos de tela, especialmente a transição entre layouts verticais e horizontais, se aplicável.
- **Interatividade**: Se os itens da timeline forem interativos (clicáveis, expansíveis), a gestão de estados e eventos deve ser clara e consistente.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
O `DssTimeline` será construído com base no `QTimeline` do Quasar, abstraindo e padronizando suas propriedades e slots para aderir à linguagem do Design System.

| Propriedade Quasar (QTimeline) | Propriedade DSS (DssTimeline) | Observações |
| :----------------------------- | :---------------------------- | :---------- |
| `layout`                       | `orientation`                 | `vertical` (padrão), `horizontal` |
| `side`                         | `alignment`                   | `left`, `right`, `both` (para vertical); `top`, `bottom` (para horizontal) |
| `color`                        | `lineColor`                   | Mapeado para tokens de cor do DSS, ex: `--dss-color-primary-500` |
| `dark`                         | `isDark`                      | Booleano para modo escuro |
| `items` (slot)                 | `DssTimelineItem` (componente) | Cada item da timeline será um subcomponente `DssTimelineItem` |

**DssTimelineItem (baseado em QTimelineEntry)**

| Propriedade Quasar (QTimelineEntry) | Propriedade DSS (DssTimelineItem) | Observações |
| :---------------------------------- | :-------------------------------- | :---------- |
| `icon`                              | `icon`                            | Nome do ícone do DSS |
| `title`                             | `title`                           | Título do evento |
| `subtitle`                          | `subtitle`                        | Subtítulo ou data/hora |
| `body` (slot)                       | `default` (slot)                  | Conteúdo principal do item |
| `side`                              | `itemAlignment`                   | Sobrescreve `alignment` do `DssTimeline` para o item específico |
| `color`                             | `dotColor`                        | Cor do ponto do item, mapeado para tokens de cor do DSS |

## 4. GOVERNANÇA DE TOKENS E CSS
O `DssTimeline` e seus subcomponentes (`DssTimelineItem`) devem utilizar exclusivamente os tokens de design do DSS para espaçamento, raio, cores e durações de transição.

- **Espaçamento**: `--dss-spacing-X` (ex: `--dss-spacing-4` para padding interno, `--dss-spacing-8` para margens entre itens).
- **Raio**: `--dss-radius-md` para cantos arredondados de cards dentro dos itens da timeline.
- **Cores**: `--dss-surface-default` para o fundo dos itens, `--dss-color-primary-500` para a linha e pontos ativos, `--dss-color-neutral-400` para linha e pontos inativos.
- **Duração**: `--dss-duration-250` para transições de hover ou expansão de itens.

**Exemplos de uso de tokens:**
```css
.dss-timeline-item {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-md);
  padding: var(--dss-spacing-8);
  margin-bottom: var(--dss-spacing-16);
}

.dss-timeline-line {
  background-color: var(--dss-color-neutral-400);
}

.dss-timeline-dot {
  background-color: var(--dss-color-primary-500);
  transition: background-color var(--dss-duration-250) ease-in-out;
}
```

## 5. ACESSIBILIDADE E ESTADOS
- **Semântica**: Utilizar elementos HTML semânticos (`<ol>`, `<li>`) ou atributos ARIA (`role=