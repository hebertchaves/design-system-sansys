# Pré-prompt: DssSlideItem

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssBadge

**Golden Context:** O DssSlideItem é um componente fundamental para estruturar e exibir conteúdo dentro de um DssSlide. Ele atua como um contêiner flexível, permitindo a organização de diferentes tipos de informação de forma padronizada e responsiva, garantindo a consistência visual e funcionalidade em apresentações ou carrosséis. Este componente não é interativo por si só, mas serve como base para agrupar elementos que podem ou não ser interativos. A sua estrutura é pensada para suportar desde textos simples até composições complexas com imagens, vídeos e formulários.

**Justificativa:** A criação do DssSlideItem visa padronizar a composição interna dos slides, desacoplando a lógica de apresentação do conteúdo específico. Isso promove a reutilização, facilita a manutenção e garante uma experiência de usuário coesa em todas as instâncias de slides que utilizam o Design System. A padronização de itens de slide permite que os desenvolvedores foquem no conteúdo, enquanto o sistema garante o alinhamento, espaçamento e comportamento responsivo. Além disso, o uso de um componente dedicado facilita a aplicação de animações e transições consistentes entre os itens de um mesmo slide.

## 2. RISCOS ARQUITETURAIS E GATES

**Riscos Arquiteturais:**
*   **Acoplamento excessivo:** Risco de o DssSlideItem se tornar excessivamente acoplado ao DssSlide, dificultando sua reutilização em outros contextos ou a evolução independente. O componente deve ser capaz de funcionar de forma autônoma, mesmo que seu uso principal seja dentro de um carrossel.
*   **Performance:** Conteúdo complexo ou grande número de DssSlideItems em um único slide pode impactar negativamente a performance de renderização e transição. É crucial otimizar a renderização do DOM e evitar re-renderizações desnecessárias.
*   **Flexibilidade de Layout:** Dificuldade em acomodar layouts variados e requisitos de conteúdo dinâmico sem comprometer a simplicidade da API. O componente deve oferecer opções suficientes de customização sem se tornar um "faz-tudo" complexo.
*   **Responsividade Quebrada:** Itens de slide que não se adaptam corretamente a diferentes tamanhos de tela, causando overflow ou sobreposição de conteúdo. A responsividade deve ser tratada de forma intrínseca, utilizando flexbox ou grid layout.

**Gates:**
*   **Gate 1 (Design Review):** Validação do design do componente para garantir que ele seja agnóstico ao seu pai (DssSlide) e que sua API permita flexibilidade de layout através de slots nomeados e props de alinhamento.
*   **Gate 2 (Performance Testing):** Testes de carga e performance para garantir que o componente mantenha um bom desempenho mesmo com conteúdo rico e em cenários de múltiplos itens. Medição do tempo de renderização inicial e durante transições.
*   **Gate 3 (Accessibility Audit):** Auditoria de acessibilidade para garantir que o DssSlideItem e seu conteúdo sejam navegáveis e compreensíveis por tecnologias assistivas, especialmente em relação à ordem de leitura e foco.
*   **Gate 4 (Responsiveness Check):** Verificação rigorosa em diferentes viewports (mobile, tablet, desktop) para garantir que o DssSlideItem se comporte de maneira fluida e previsível, sem quebra de layout.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O Quasar não possui um componente diretamente equivalente a um item de slide isolado, geralmente utilizando divs ou componentes de layout genéricos dentro de um `q-carousel-slide`. Portanto, o DssSlideItem é uma abstração específica do DSS, criada para preencher essa lacuna e fornecer uma API mais semântica e controlada.

**Props do DSS:**
*   `name` (String, obrigatório): Identificador único para o item do slide, útil para navegação, controle de estado e referências em testes automatizados.
*   `align` (String, default: 'center'): Alinhamento do conteúdo interno. Valores aceitos: 'left', 'center', 'right', 'justify'. Afeta o alinhamento horizontal dos elementos filhos.
*   `verticalAlign` (String, default: 'middle'): Alinhamento vertical do conteúdo. Valores aceitos: 'top', 'middle', 'bottom'.
*   `padding` (Boolean, default: true): Aplica padding padrão ao redor do conteúdo, utilizando os tokens de espaçamento do DSS.
*   `dark` (Boolean, default: false): Adapta o item para contextos escuros, invertendo as cores de fundo e texto conforme definido pelos tokens.
*   `fullHeight` (Boolean, default: false): Força o item a ocupar 100% da altura do seu contêiner pai.

**Slots:**
*   `default`: O conteúdo principal do item do slide. É o slot mais utilizado para inserir textos, imagens e outros componentes.
*   `header`: Conteúdo opcional para o cabeçalho do item, geralmente utilizado para títulos ou breadcrumbs.
*   `footer`: Conteúdo opcional para o rodapé do item, útil para botões de ação ou informações adicionais.

**Eventos:**
*   `click`: Emitido quando o usuário clica no item do slide. Útil se o item inteiro precisar atuar como um botão de navegação.
*   `focus`: Emitido quando o item recebe foco (se aplicável).

## 4. GOVERNANÇA DE TOKENS E ESTILIZAÇÃO

A estilização do DssSlideItem deve ser estritamente baseada nos Design Tokens do DSS, garantindo consistência com a identidade visual da marca (hub, water, waste). O uso de valores hardcoded (magic numbers) é estritamente proibido.

**Tokens Utilizados:**
*   **Espaçamento:**
    *   Padding interno padrão: `--dss-spacing-4` (substituindo o antigo `--dss-spacing-4`).
    *   Padding interno reduzido (opcional): `--dss-spacing-2`.
    *   Margem entre itens (se aplicável no contexto do pai): `--dss-spacing-2`.
*   **Cores e Superfícies:**
    *   Cor de fundo padrão: `--dss-surface-base`.
    *   Cor de fundo em destaque (hub): `--dss-action-hub-surface` (substituindo `--dss-action-hub-surface`).
    *   Cor do texto principal: `--dss-text-base`.
    *   Cor do texto secundário: `--dss-text-subtle` (substituindo `--dss-text-subtle`).
    *   Cor de ação principal: `--dss-action-hub` (substituindo `--dss-action-hub`).
*   **Bordas e Sombras:**
    *   Raio da borda: `--dss-radius-md`.
    *   Sombra padrão: `--dss-shadow-sm`.
    *   Sombra em hover (se interativo): `--dss-shadow-md`.

**Nomenclatura de Brand:**
*   As cores de marca devem utilizar a nomenclatura correta: `hub` (principal), `water` (secundária/informativa), `waste` (destaque/alerta).
*   Evitar o uso de termos genéricos como "hub", "water" ou "waste" na definição de temas ou variantes do componente.

## 5. ACESSIBILIDADE E SEMÂNTICA

O DssSlideItem deve ser construído com foco na acessibilidade, garantindo que o conteúdo seja compreensível para todos os usuários, independentemente de suas capacidades visuais ou motoras.

**Diretrizes:**
*   **Semântica HTML:** Utilizar tags semânticas apropriadas. Por padrão, um `<div>` é aceitável, mas se o item representar um artigo independente, `<article>` deve ser considerado. Se for uma seção de um documento maior, `<section>` é mais adequado.
*   **Aria Attributes:**
    *   Se o item for parte de uma lista (como em um carrossel), garantir que a estrutura pai utilize `role="list"` e o item `role="listitem"`.
    *   Utilizar `aria-labelledby` apontando para o ID do título interno, ou `aria-describedby` para descrições adicionais, melhorando a experiência com leitores de tela.
*   **Foco e Navegação:**
    *   Como o DssSlideItem geralmente não é interativo, ele não deve receber foco por padrão (`tabindex="-1"` ou ausente).
    *   Se contiver elementos interativos (links, botões), garantir que a ordem de tabulação seja lógica e previsível.
    *   Evitar o uso de `outline: 2px solid white`; se necessário, utilizar `outline: 2px solid white` para alto contraste em temas escuros, garantindo visibilidade do foco.

## 6. COMPORTAMENTO E ESTADOS

O DssSlideItem é primariamente um componente de apresentação, mas seu comportamento visual pode ser alterado através de props para se adaptar a diferentes necessidades de design.

**Estados:**
*   **Padrão:** Exibe o conteúdo com o padding e alinhamento configurados. Ocupa o espaço necessário para seu conteúdo, a menos que `fullHeight` seja utilizado.
*   **Sem Padding:** Quando `padding="false"`, o conteúdo ocupa toda a área do item, encostando nas bordas. Ideal para imagens full-bleed, mapas ou componentes customizados que gerenciam seu próprio espaçamento interno.
*   **Dark Mode:** Quando `dark="true"`, as cores de fundo e texto são ajustadas para garantir contraste adequado em fundos escuros, utilizando os tokens específicos para o tema dark.

**Comportamento Responsivo:**
*   O componente deve se adaptar fluidamente à largura do seu contêiner pai (DssSlide).
*   Em telas menores (mobile), o conteúdo interno pode precisar ser reorganizado (ex: empilhamento vertical em vez de horizontal). Isso deve ser facilitado pelo uso de flexbox no DssSlideItem, permitindo que os filhos fluam naturalmente.
*   O uso de media queries dentro do componente deve ser minimizado, preferindo abordagens de layout fluido (ex: `flex-wrap: wrap`).

## 7. TESTES E QUALIDADE

A qualidade e estabilidade do DssSlideItem devem ser garantidas através de uma suíte de testes abrangente, cobrindo diferentes aspectos do componente.

**Tipos de Testes:**
*   **Testes Unitários (Vitest/Vue Test Utils):**
    *   Verificar a renderização correta com diferentes combinações de props (`align`, `verticalAlign`, `padding`, `dark`, `fullHeight`).
    *   Garantir que os slots (`default`, `header`, `footer`) renderizem o conteúdo fornecido corretamente nos locais esperados.
    *   Verificar a emissão de eventos (`click`, `focus`) quando aplicável.
*   **Testes de Integração:**
    *   Testar o comportamento do DssSlideItem quando inserido dentro de um DssSlide e DssCarousel.
    *   Verificar se o alinhamento e espaçamento são mantidos em diferentes cenários de composição complexa.
*   **Testes Visuais (Cypress/Percy):**
    *   Capturar snapshots do componente em seus diferentes estados e variações para prevenir regressões visuais indesejadas após atualizações de CSS ou tokens.
*   **Testes de Acessibilidade (axe-core):**
    *   Utilizar ferramentas automatizadas para verificar violações de acessibilidade, como contraste de cores insuficiente ou falta de atributos ARIA necessários.

## 8. SUPERFÍCIE DE PLAYGROUND

A superfície de playground (Storybook ou similar) permite a exploração interativa do componente DssSlideItem, facilitando o entendimento de suas capacidades, variações e integração com outros componentes.

**Controles Obrigatórios:**
*   `name` (Input Text): Permite definir o identificador do item.
*   `align` (Select: 'left', 'center', 'right', 'justify'): Controla o alinhamento horizontal do conteúdo.
*   `verticalAlign` (Select: 'top', 'middle', 'bottom'): Controla o alinhamento vertical do conteúdo.
*   `padding` (Toggle): Ativa ou desativa o padding interno (`--dss-spacing-4`).
*   `dark` (Toggle): Alterna o modo escuro do item.
*   `fullHeight` (Toggle): Força o item a ocupar 100% da altura.
*   `brandColor` (Select: 'hub', 'water', 'waste', 'none'): Aplica uma cor de marca ao fundo do item para fins de demonstração e validação de contraste.

**Composite Logic:**
A lógica de composição do DssSlideItem no playground deve demonstrar cenários reais de uso, integrando-o com outros componentes do DSS.
*   **Exemplo Concreto (Card de Informação):** Um DssSlideItem contendo um `DssTypography` (variante 'h3') no slot `header` para o título, um parágrafo de texto no slot `default`, e um `DssButton` (variante 'hub') no slot `footer`. A alteração da prop `align` deve refletir imediatamente no posicionamento de todos esses elementos internos. A alternância da prop `padding` deve mostrar a diferença entre um layout contido e um layout que toca as bordas. A aplicação da prop `dark` deve inverter as cores do texto e do fundo, mantendo a legibilidade.

**Estados a Expor:**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Item com padding e alinhamento centralizado. | Visual | Padrão (renderização inicial) |
| Sem Padding | Item sem espaçamento interno, ideal para imagens full-bleed. | Visual | — |
| Alinhado à Esquerda | Conteúdo alinhado à esquerda e ao topo. | Visual | — |
| Dark Mode | Item adaptado para contextos escuros. | Visual | `[data-theme="dark"]` ativo |
| Altura Total | Item ocupando 100% da altura disponível. | Visual | — |
| Brand Hub | Item com destaque na cor da marca principal (hub). | Visual | Prop `brand="hub"` ou `[data-brand="hub"]` |
| Brand Water | Item com destaque na cor secundária (water). | Visual | Prop `brand="water"` ou `[data-brand="water"]` |
| Brand Waste | Item com destaque na cor de alerta (waste). | Visual | Prop `brand="waste"` ou `[data-brand="waste"]` |
