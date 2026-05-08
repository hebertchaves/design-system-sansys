## Pré-prompt de Criação de Componente DSS: DssTabPanels

## 1. Classificação e Contexto
- **Nome do Componente:** `DssTabPanels`
- **Família:** Tabs
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssBadge` (como container de conteúdo estrutural não-interativo)
- **Golden Context:** `DssTabs` — orquestrador irmão da família Tabs; o `DssTabPanels` é sempre usado em conjunto com `DssTabs` para garantir a sincronização do `v-model` entre abas e painéis.
- **Componente Quasar Base:** `QTabPanels`

> **Nota de Governança (GAP-05 — corrigido em 2026-04-09):** O Golden Context original declarava "Layouts de página ou DssCard" — ambíguo. A implementação do componente confirmou que o contexto canônico é `DssTabs`. O `DssBadge` permanece como Golden Reference (container estrutural não-interativo), não como Golden Context.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Animações e Transições
O `QTabPanels` nativo suporta animações de transição entre painéis (`animated`, `transition-prev`, `transition-next`). O maior risco é o uso de transições que não estejam alinhadas com os tokens de motion do DSS ou que violem preferências de acessibilidade (`prefers-reduced-motion`). É crucial que o `DssTabPanels` ofereça uma experiência de usuário fluida e acessível, evitando movimentos bruscos ou excessivos que possam causar desconforto ou desorientação.

**Mitigação:** O `DssTabPanels` deve governar as transições de forma rigorosa. Se a prop `animated` for `true`, o componente deve utilizar transições suaves e direcionalmente agnósticas (ex: fade) que respeitem os tokens de duração e easing do DSS. Especificamente, `--dss-duration-200` para a duração padrão e `--dss-easing-standard` para a curva de aceleração. Além disso, o CSS do componente deve incluir uma media query para desativar completamente as animações se `prefers-reduced-motion: reduce` estiver ativo no sistema operacional do usuário, utilizando `--dss-duration-0` para anular qualquer transição. Esta abordagem garante conformidade com as diretrizes de acessibilidade e uma experiência consistente com o Design System.

> **Nota de Governança (GAP-04 — corrigido em 2026-04-09):** Os tokens `--dss-motion-duration-standard` e `--dss-motion-easing-standard` **não existem** no catálogo DSS. Os tokens canônicos corretos são:
> - Duração: `--dss-duration-200` (animação padrão) e `--dss-duration-0` (reduced-motion)
> - Easing: `--dss-easing-standard`
> - Background transparente: usar a keyword CSS `transparent` diretamente — o token `--dss-surface-transparent` **não existe**.

### 2.2. Gate de Responsabilidade v2.4
O `DssTabPanels` é um **container orquestrador não-interativo**. Sua principal responsabilidade é gerenciar qual painel está visível com base no `v-model` recebido, mas ele próprio não possui estados de `:hover`, `:focus` ou `:active` no seu container visual. A interatividade, como foco e ativação, pertence exclusivamente aos componentes filhos (`DssTabPanel`) e ao conteúdo que eles encapsulam. Isso garante uma clara separação de responsabilidades e evita comportamentos inesperados de foco ou interação no container principal.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper do `<q-tab-panels>`. Como é um componente de Nível 2, ele **DEVE** restringir seu slot default para aceitar apenas componentes `DssTabPanel`. O uso de tags HTML nativas ou outros componentes diretamente no slot do `DssTabPanels` é estritamente proibido. Esta regra assegura a integridade da composição e a previsibilidade do comportamento do componente, garantindo que apenas elementos compatíveis e controlados pelo DSS sejam aninhados.

**Exceção prevista (EXC-01):** O uso de `<q-tab-panels>` diretamente no template é uma exceção formal ao Gate de Composição v2.4 Regra 1. Justificativa: o `QTabPanels` gerencia a visibilidade dos painéis via `provide/inject` com os `QTabPanel` filhos — funcionalidade que não pode ser reimplementada sem o componente Quasar. Esta exceção deve ser registrada em `gateExceptions.compositionGateV24.templateStructure` no `dss.meta.json`.

**Exceção prevista (EXC-02):** O bloco `<style>` sem `scoped` é necessário para as classes de transição Vue (`.dss-tab-panels-enter-active`, etc.) que são aplicadas pelo Vue runtime nos filhos do slot — fora do escopo `data-v-xxx` do root. Esta exceção deve ser registrada em `gateExceptions.compositionGateV24.styleBlock` no `dss.meta.json`.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `modelValue` (String/Number, `required`) - Controla o painel ativo. É a prop principal para sincronização com `DssTabs`.
- `animated` (Boolean, `default: false`) - Habilita transições visuais suaves entre os painéis. Quando `true`, as transições seguem os tokens de motion do DSS.
- `swipeable` (Boolean, `default: false`) - Permite a navegação entre os painéis através de gestos de deslize (swipe) em dispositivos touch. Essencial para usabilidade mobile.
- `infinite` (Boolean, `default: false`) - Quando `true`, permite a navegação contínua entre os painéis, onde o último painel leva ao primeiro e vice-versa. Ideal para carrosséis de conteúdo.
- `keep-alive` (Boolean, `default: false`) - Mantém o estado dos painéis inativos na memória (DOM), evitando a remontagem e remountagem de componentes filhos a cada troca de painel. Útil para formulários ou conteúdos complexos que precisam preservar o estado.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueado. O modo escuro (dark mode) é uma configuração global do DSS e deve ser governado centralmente, não por componentes individuais. Isso garante uma experiência visual consistente em toda a aplicação.
- `transition-prev`, `transition-next` - Bloqueados. As transições entre painéis são padronizadas pelo DSS quando a prop `animated` é `true`. A customização individual dessas transições é restrita para manter a coesão visual e de movimento do sistema.

## 4. Governança de Tokens e CSS

> **Atenção:** Use apenas tokens que existem no catálogo `DSS_TOKEN_REFERENCE.md`. Os tokens abaixo foram validados na implementação do componente e são os únicos permitidos para uso direto.

- **Background:** O background deve ser `transparent` por padrão (keyword CSS direta — o token `--dss-surface-transparent` não existe no catálogo DSS). Esta escolha garante que o `DssTabPanels` se adapte ao seu contexto sem impor um fundo próprio.
- **Duração de transição:** `--dss-duration-200` (padrão para animações suaves) e `--dss-duration-0` (quando `prefers-reduced-motion: reduce` está ativo, garantindo acessibilidade).
- **Easing de transição:** `--dss-easing-standard` (curva de aceleração padrão do DSS para movimentos consistentes).
- **Contraste forçado:** `1px solid ButtonText` (system keyword — EXC canônica do DSS, com precedente em `DssTabs` e `DssBadge`). Essencial para garantir visibilidade em modos de alto contraste, conforme diretrizes de acessibilidade.
- **Espaçamento Interno:** `--dss-spacing-4` (substitui `--dss-spacing-4`). Utilizado para definir o espaçamento interno padrão dos painéis, garantindo alinhamento com a grade de espaçamento do DSS.
- **Cor do Texto:** `--dss-text-subtle` (substitui `--dss-text-subtle`). Usado para textos secundários ou de menor destaque dentro dos painéis, mantendo a hierarquia visual da tipografia do DSS.
- **Foco:** `outline: 2px solid white` (substitui `outline: 2px solid white`). Aplicado para indicar o estado de foco de elementos interativos dentro dos painéis, proporcionando uma indicação clara e acessível para navegação por teclado.
- **Cor de Ação Principal:** `--dss-action-hub` (substitui `--dss-action-hub`). Define a cor principal para elementos de ação, como botões ou links importantes, dentro dos painéis.
- **Superfície de Ação Principal:** `--dss-action-hub-surface` (substitui `--dss-action-hub-surface`). Utilizada para o fundo de elementos de ação principal, criando um contraste adequado e destacando a interatividade.

## 5. Acessibilidade e Estados

- **Role:** O `QTabPanels` não possui um role ARIA específico que exija sobrescrita direta no container. No entanto, é fundamental que os painéis internos (`DssTabPanel`) gerenciem corretamente o atributo `role="tabpanel"` para indicar sua função semântica aos leitores de tela e outras tecnologias assistivas. A associação entre `DssTabs` e `DssTabPanels` deve ser feita via `aria-controls` e `aria-labelledby` para garantir a navegação contextual.
- **Motion:** É obrigatório respeitar a preferência do usuário `@media (prefers-reduced-motion: reduce)` desativando completamente as transições com `--dss-duration-0`. Esta medida é crucial para usuários com sensibilidade a movimentos e para garantir a conformidade com as WCAG (Web Content Accessibility Guidelines).
- **Contraste:** Implementar `@media (forced-colors: active)` com `1px solid ButtonText` para garantir visibilidade em modo de alto contraste. Isso assegura que os contornos e bordas dos elementos sejam claramente distinguíveis, mesmo quando as cores são remapeadas pelo sistema operacional.
- **Navegação por Teclado:** A navegação entre os painéis deve ser intuitiva e totalmente acessível via teclado. O foco deve ser gerenciado de forma lógica, permitindo que os usuários naveguem entre os painéis e seus conteúdos usando as teclas de seta e Tab, conforme as melhores práticas de ARIA para componentes de abas.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssTabPanels.example.vue` deve cobrir os seguintes cenários para demonstrar a funcionalidade completa e o uso correto do componente:
1.  **Básico:** Navegação simples entre painéis sem animação. Este cenário valida a funcionalidade fundamental de troca de conteúdo.
2.  **Animado:** Navegação com a prop `animated` ativa, demonstrando as transições suaves e controladas pelos tokens do DSS.
3.  **Swipeable:** Navegação por swipe (gestos de deslize), útil para dispositivos móveis e interfaces touch, validando a responsividade do componente.
4.  **Keep Alive:** Demonstração de preservação de estado em inputs ou outros componentes interativos dentro dos painéis, mostrando como o `keep-alive` evita a perda de dados ou o re-render desnecessário.
5.  **Conteúdo Dinâmico:** Exemplo de como o `DssTabPanels` lida com a renderização de conteúdo que muda dinamicamente dentro dos painéis, como dados carregados via API.
6.  **Integração com DssTabs:** Um exemplo completo mostrando a orquestração entre `DssTabs` e `DssTabPanels`, incluindo a sincronização do `v-model` e a ativação de painéis correspondentes às abas selecionadas.

> **Isenção DSS:** Arquivos `.example.vue` são isentos de Token First e Gate de Composição para scaffolding de contexto. Adicionar este comentário no `<script setup>` do arquivo de exemplo.

## 7. Boas Práticas e Considerações de Performance

- **Virtualização de Conteúdo:** Para cenários com um grande número de painéis ou conteúdo complexo em cada painel, considere a implementação de virtualização de conteúdo. Isso pode ser alcançado carregando o conteúdo dos painéis sob demanda ou usando componentes que otimizam a renderização de grandes listas, minimizando o impacto na performance inicial e no uso de memória.
- **Carregamento Lazy (Lazy Loading):** Utilize o carregamento lazy para o conteúdo dos painéis que não são visíveis inicialmente. Isso pode ser feito com a prop `keep-alive` em conjunto com um carregamento condicional do conteúdo interno, garantindo que apenas o necessário seja renderizado no momento certo, otimizando o tempo de carregamento da página.
- **Otimização de Imagens e Mídia:** Dentro dos painéis, otimize todas as imagens e mídias. Use formatos de imagem modernos (WebP, AVIF), compressão adequada e carregamento responsivo (`srcset`, `sizes`). Para vídeos, considere atributos como `preload="none"` e `poster` para melhorar a performance.
- **Evitar Re-renders Desnecessários:** Estruture os componentes filhos de forma a evitar re-renders desnecessários. Utilize `v-if` ou `v-show` de forma estratégica e, se aplicável, memoize componentes ou dados para garantir que as atualizações ocorram apenas quando estritamente necessário.
- **Testes de Performance:** Inclua testes de performance nos pipelines de CI/CD para o `DssTabPanels`, monitorando métricas como tempo de carregamento, interatividade e uso de CPU/memória, especialmente em cenários com muitos painéis ou conteúdo rico.

## 8. Superfície de Playground

Esta seção detalha os elementos essenciais para a construção e teste do `DssTabPanels` em um ambiente de playground, garantindo que todas as funcionalidades e estados sejam explorados de forma abrangente.

### 8.1. Controles Obrigatórios
Para uma exploração completa do `DssTabPanels`, o playground deve expor os seguintes controles interativos:

- **`modelValue` (String/Number):** Um seletor (dropdown ou botões de rádio) que permita ao usuário alternar entre os diferentes IDs dos painéis, simulando a seleção de abas. Deve refletir o painel atualmente ativo.
- **`animated` (Checkbox):** Um checkbox para ativar ou desativar as transições entre os painéis. Isso permite testar a suavidade das animações e a conformidade com `prefers-reduced-motion`.
- **`swipeable` (Checkbox):** Um checkbox para habilitar ou desabilitar a funcionalidade de deslize. Essencial para testar a interação em dispositivos touch e a navegação alternativa.
- **`infinite` (Checkbox):** Um checkbox para ativar ou desativar a navegação infinita. Permite verificar o comportamento de loop entre o primeiro e o último painel.
- **`keep-alive` (Checkbox):** Um checkbox para controlar a preservação do estado dos painéis inativos. O playground deve incluir inputs ou outros elementos de estado para demonstrar claramente o efeito desta prop.
- **Conteúdo dos Painéis (Textarea/Input):** Uma área de texto ou input para cada painel, permitindo que o usuário insira conteúdo arbitrário e teste como o `DssTabPanels` renderiza diferentes tipos de informação.

### 8.2. Composite Logic (Concreta, Não Genérica)
O playground deve demonstrar a lógica de composição do `DssTabPanels` de forma concreta, focando na sua interação com `DssTabs` e `DssTabPanel`:

- **Sincronização `v-model`:** O playground deve exibir um componente `DssTabs` e um `DssTabPanels` que compartilham o mesmo `v-model`. A seleção de uma aba no `DssTabs` deve automaticamente ativar o painel correspondente no `DssTabPanels`, e vice-versa (se aplicável, embora o `DssTabPanels` seja passivo).
- **Restrição de Slot:** O playground deve tentar renderizar um elemento não-`DssTabPanel` diretamente no slot do `DssTabPanels` e demonstrar visualmente (ou via console de erro, se possível) que isso é proibido, reforçando o Gate de Composição.
- **Conteúdo Interno de `DssTabPanel`:** Cada `DssTabPanel` dentro do `DssTabPanels` deve conter exemplos de componentes DSS aninhados (ex: `DssButton`, `DssInput`, `DssBadge`) para validar que o conteúdo interno é renderizado corretamente e herda os tokens de contexto adequados.
- **Comportamento de Transição:** Ao alternar entre painéis com `animated` ativo, o playground deve visualmente destacar a aplicação dos tokens `--dss-duration-200` e `--dss-easing-standard` nas transições.

### 8.3. Estados a Expor
Os seguintes estados devem ser claramente visualizáveis e inspecionáveis no playground, preferencialmente através de um painel de debug ou exibição de dados em tempo real:

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Painel Ativo | O identificador (`name`) do painel atualmente visível. | Visual | String ou Number (corresponde ao `modelValue`). |
| Transição Ativa | Indica se uma animação de transição está em andamento. | Visual | Boolean (`true`/`false`). |
| `prefers-reduced-motion` | Reflete a preferência do usuário por movimento reduzido. | Visual | Boolean (`true`/`false`). |
| `forced-colors: active` | Indica se o modo de cores forçadas está ativo. | Visual | Boolean (`true`/`false`). |
| Conteúdo `keep-alive` | Demonstração do estado de inputs ou outros elementos em painéis inativos. | Visual | Valores dos inputs/estados persistentes. |
| Cor de Fundo | Cor de fundo do container do `DssTabPanels`. | Visual | `transparent` |
| Cor de Ação Hub | Cor utilizada para elementos de ação principal. | Visual | `--dss-action-hub` |
| Superfície de Ação Hub | Cor de fundo para superfícies de ação principal. | Visual | `--dss-action-hub-surface` |
| Espaçamento | Espaçamento interno aplicado aos painéis. | Visual | `--dss-spacing-4` |
| Cor de Texto Sutil | Cor para textos secundários. | Visual | `--dss-text-subtle` |
| Foco | Estilo de foco aplicado a elementos interativos. | Visual | `outline: 2px solid white` |
