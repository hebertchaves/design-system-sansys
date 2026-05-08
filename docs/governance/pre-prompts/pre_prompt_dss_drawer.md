# Pré-prompt: DssDrawer (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssDrawer` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade, aprimorando a robustez e a consistência do componente.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssDrawer`
- **Família:** Layout (Estrutura de Página)
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau) - Componentes de Nível 3 orquestram componentes de Nível 2 e interagem com sistemas de layout mais amplos.
- **Golden Reference:** `DssBadge` (como componente não-interativo de referência para governança de estados e estilo).
- **Golden Context:** `DssHeader` (componente com Selo v2.2 de mesma família e arquitetura, servindo como base para padrões de layout e responsividade).
- **Componente Quasar Base:** `QDrawer` - O `DssDrawer` atua como um wrapper estilizado e governado sobre esta funcionalidade base.
- **Dependência Direta:** `DssList`, `DssMenu` (Nível 2) - Estes componentes são tipicamente aninhados dentro do `DssDrawer` para fornecer funcionalidade de navegação.

**Justificativa da Fase 2:** O `DssDrawer` é o painel lateral de navegação (sidebar) essencial para a estrutura de aplicações. Como componente de Nível 3, ele orquestra componentes de Nível 2 (`DssList`, `DssMenu`) e interage diretamente com o sistema de layout do Quasar (`QLayout`), sendo crucial para a experiência do usuário em termos de navegação e organização de conteúdo. Sua implementação nesta fase garante a fundação para layouts mais complexos.

---

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout, Z-Index e Backdrop
O `QDrawer` nativo injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página, gerencia seu próprio `z-index` e cria um elemento de backdrop quando em modo overlay (mobile). O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar, cause problemas de empilhamento (z-index), ou altere a opacidade padrão do backdrop, comprometendo a integridade visual e funcional do layout.

**Mitigação:** O `DssDrawer` **não deve** alterar o `z-index` nativo nem as propriedades de posicionamento aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation), cores de fundo e largura padrão. O backdrop deve usar o token `--dss-opacity-backdrop` (0.75) caso o Quasar permita customização via CSS, ou aceitar o padrão nativo se for hardcoded. É fundamental que o `DssDrawer` respeite o fluxo de layout do Quasar para evitar conflitos.

### 2.2. Gate de Responsabilidade v2.4
O `DssDrawer` é um **container estrutural de layout 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo na lateral da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo principal. A interatividade de navegação pertence exclusivamente aos `DssList` e `DssItem`s contidos nele. Qualquer tentativa de adicionar interatividade direta ao `DssDrawer` violará este gate.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-drawer>`. O slot `default` é destinado **exclusivamente** a componentes de navegação (`DssList`, `DssMenu`) ou cabeçalhos de seção. O uso de HTML nativo ou texto solto diretamente no `DssDrawer` viola a governança de Nível 3, pois compromete a modularidade e a reutilização. Apenas componentes DSS de Nível 2 ou inferior são permitidos diretamente no slot.

---

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `modelValue` (Boolean) - Controla a visibilidade do drawer (v-model). Essencial para a gestão programática do estado de abertura/fechamento.
- `side` (String) - Lado do drawer: `left` (padrão) ou `right`. Permite flexibilidade na posição do painel lateral.
- `overlay` (Boolean) - Força o drawer a sobrepor o conteúdo da página em vez de empurrá-lo. Crucial para a responsividade em dispositivos móveis.
- `elevated` (Boolean) - Aplica a sombra padrão de elevação do DSS, conferindo profundidade visual ao componente.
- `bordered` (Boolean) - Aplica uma borda sutil separando o drawer do conteúdo principal, melhorando a distinção visual.
- `mini` (Boolean) - Modo minimizado (apenas ícones). Ideal para otimizar o espaço em tela e manter a navegação acessível.
- `width` (Number) - Largura do drawer em pixels (padrão: 256px, equivalente a `--dss-spacing-64`). Permite ajustar a largura conforme a necessidade do layout.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueada. O DSS gerencia dark mode via CSS global (`[data-theme="dark"]`), garantindo uma abordagem centralizada e consistente para temas.
- `behavior` - Bloqueada. O comportamento responsivo é padronizado pelo DSS (desktop = empurra conteúdo, mobile = overlay), assegurando uma experiência de usuário unificada em diferentes dispositivos.
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso. Isso evita a proliferação de props de estilo e mantém o foco na API funcional do componente.

---

## 4. Governança de Tokens e CSS

O `DssDrawer` deve utilizar os seguintes tokens, garantindo a consistência visual e a aderência ao Design System:
- **Largura Padrão:** 256px (equivalente a `--dss-spacing-64`). Este token padroniza a largura e facilita a manutenção.
- **Elevação (Elevated):** `--dss-elevation-2` (sombra padrão para painéis laterais). Garante que a elevação visual siga o padrão do DSS.
- **Borda (Bordered):** `--dss-border-width-thin` solid `--dss-gray-200`. Se `side="left"`, aplica `border-right`. Se `side="right"`, aplica `border-left`. Esta regra assegura a aplicação correta da borda conforme a posição do drawer.
- **Cor de Fundo:** O `QDrawer` nativo aplica fundo branco. O `DssDrawer` deve garantir o uso de `--dss-surface-default` para suportar dark mode corretamente. Este token é crucial para a adaptabilidade do tema.
- **Backdrop:** `--dss-opacity-backdrop` (0.75) para o fundo escuro quando em modo overlay/mobile. **Token confirmado** no catálogo DSS_TOKEN_REFERENCE.md linha 569, documentado explicitamente para uso em "modal/dialog/drawer". Nenhuma reserva necessária. Este token garante a consistência visual do overlay.

**Nomenclatura de Brand:**
Para garantir a consistência na nomenclatura de brand, os termos `hub`, `water` e `waste` devem ser substituídos por `hub`, `water` e `waste`, respectivamente, em todos os contextos relevantes, especialmente na definição de tokens e estilos. Por exemplo, se houver menção a `--dss-action-hub`, deve ser corrigido para `--dss-action-hub`.

**Correção de Tokens Fantasmas:**
Os seguintes tokens devem ser corrigidos para suas versões padronizadas:
- `--dss-spacing-4` deve ser substituído por `--dss-spacing-4`.
- `--dss-text-subtle` deve ser substituído por `--dss-text-subtle`.
- `outline: 2px solid white` deve ser removido ou substituído por `outline: 2px solid white` para acessibilidade e consistência.
- `--dss-action-hub` deve ser substituído por `--dss-action-hub`.
- `--dss-action-hub-surface` deve ser substituído por `--dss-action-hub-surface`.

---

## 5. Acessibilidade e Estados

- **Role:** O `QDrawer` não aplica um role específico nativamente na maioria dos casos. O `DssDrawer` deve aplicar `role="navigation"` se for usado primariamente para navegação, ou `role="complementary"` se for um painel lateral de informações. Como o uso principal é navegação, recomenda-se `role="navigation"` por padrão para melhorar a semântica e a experiência de usuários de tecnologias assistivas.
- **Aria-label:** Recomendado via `$attrs`: `<DssDrawer aria-label="Menu principal">`. O `aria-label` fornece um nome acessível ao componente, crucial para a navegação por leitores de tela.
- **Estados aplicáveis:** `elevated`, `bordered`, `mini`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container, reforçando seu papel como elemento não-interativo. A interatividade é delegada aos componentes internos.

---

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssDrawer.example.vue` deve cobrir os seguintes cenários para validação e demonstração da funcionalidade do componente:
1. **Básico:** Drawer esquerdo simples contendo um `DssList` de navegação. Demonstra a funcionalidade fundamental do componente.
2. **Elevated:** Drawer com a prop `elevated` ativa (com sombra). Ilustra a aplicação da elevação visual.
3. **Bordered:** Drawer com a prop `bordered` ativa (com borda lateral). Mostra a distinção visual através da borda.
4. **Mini Mode:** Drawer com a prop `mini` ativa (apenas ícones visíveis). Demonstra o modo compacto para otimização de espaço.
5. **Right Side:** Drawer posicionado à direita (`side="right"`). Apresenta a flexibilidade de posicionamento do drawer.

> **Nota para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe, os exemplos do `DssDrawer` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 400px">` nativo temporariamente, para que o drawer renderize corretamente no Storybook/Playground. Esta é uma medida provisória para garantir a testabilidade.
>
> **Atenção:** O Exemplo 5 (`side="right"`) deve usar obrigatoriamente `view="hHh lpR fFf"` (uppercase `R`) — **não** `view="hHh lpr fFf"` (lowercase `r`). O `R` maiúsculo indica que o drawer direito ocupa a altura total entre header e footer. O `r` minúsculo posiciona o drawer abaixo do header, quebrando o layout visual esperado. (NC-01 da auditoria — corrigido neste pré-prompt.) Esta distinção é crítica para a correta renderização do layout.

---

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssDrawer` requer um contexto de layout para funcionar (posicionamento, injeção de margens). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas no arquivo `DssDrawer.example.vue`** para fins de demonstração. O código fonte do componente (`DssDrawer.ts.vue`) permanece 100% aderente aos gates. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md. Esta exceção é temporária e será revista com a implementação do `DssLayout`.

### EXC-02: Uso de !important para sobrescrever background-color
- **Regra Violada:** Nenhuma (mas documentada para clareza e para estabelecer um precedente).
- **Justificativa:** Para garantir que `--dss-surface-default` governe o fundo e suporte dark mode corretamente, é necessário `!important` no escopo do `.dss-drawer`. Precedente: `DssHeader`, `DssFooter`. Esta abordagem é adotada para garantir a prioridade dos tokens do DSS sobre estilos nativos ou de terceiros.

---

## 8. Superfície de Playground

Para garantir a correta validação e interação do `DssDrawer` no ambiente de desenvolvimento (Storybook/Playground), são definidos os seguintes controles, lógica e estados a expor. Esta seção é crucial para a testabilidade e documentação interativa do componente.

### 8.1. Controles Obrigatórios (Storybook Controls)

Os seguintes controles devem ser expostos no Storybook para permitir a manipulação interativa das propriedades do `DssDrawer`. Estes controles facilitam a exploração de todos os estados e variações do componente:

- `modelValue`: Boolean (default: `true`) - Controla a abertura e fechamento do drawer. Essencial para simular a interação do usuário.
- `side`: Radio Button (opções: `left`, `right`, default: `left`) - Define a posição do drawer. Permite testar layouts com o drawer em ambos os lados.
- `overlay`: Boolean (default: `false`) - Alterna entre o modo overlay e o modo que empurra o conteúdo. Crucial para testar o comportamento responsivo.
- `elevated`: Boolean (default: `false`) - Ativa/desativa a elevação visual (sombra). Demonstra o efeito de profundidade.
- `bordered`: Boolean (default: `false`) - Ativa/desativa a borda sutil. Permite visualizar a separação visual.
- `mini`: Boolean (default: `false`) - Ativa/desativa o modo minimizado (apenas ícones). Útil para testar a adaptabilidade em telas menores.
- `width`: Number (min: 100, max: 500, step: 10, default: 256) - Ajusta a largura do drawer em pixels. Permite testar diferentes configurações de largura.

### 8.2. Composite Logic (Lógica Concreta)

A lógica de composição do `DssDrawer` deve ser demonstrada com exemplos concretos, não genéricos. O Storybook deve incluir histórias que ilustrem as seguintes composições:

- **Navegação Padrão:** Um `DssDrawer` contendo um `DssList` com `DssItem`s para navegação principal (e.g., Dashboard, Configurações, Perfil). Este é o cenário de uso mais comum.
- **Menu de Contexto:** Um `DssDrawer` à direita (`side="right"`) contendo um `DssMenu` com opções contextuais para uma seção específica da aplicação (e.g., Filtros Avançados, Detalhes do Item). Demonstra o uso do drawer como um painel auxiliar.
- **Drawer Minimizado com Ícones:** Um `DssDrawer` no modo `mini` com `DssList`s que exibem apenas ícones, expandindo ao passar o mouse (se aplicável ao `DssList` interno). Ilustra a funcionalidade de economia de espaço.
- **Integração com DssHeader/DssFooter:** Embora o `DssLayout` ainda não esteja pronto, demonstrar como o `DssDrawer` se encaixa visualmente com placeholders para `DssHeader` e `DssFooter` (usando o `<q-layout>` temporário) é vital para prever a integração futura.

### 8.3. Estados a Expor (Tabela)

Os seguintes estados visuais e funcionais do `DssDrawer` devem ser claramente documentados e demonstráveis no Storybook:

| Estado | Descrição | Prop/Token Relacionado | Observações |
|---|---|---|---|
| **Aberto** | O drawer está visível e acessível. | `modelValue: true` | Estado padrão de visibilidade. |
| **Fechado** | O drawer está oculto. | `modelValue: false` | Oculto para economizar espaço ou quando não é necessário. |
| **Elevado** | O drawer exibe uma sombra para indicar elevação. | `elevated: true`, `--dss-elevation-2` | Confere profundidade visual, separando-o do conteúdo principal. |
| **Com Borda** | O drawer exibe uma borda sutil em seu lado oposto ao conteúdo. | `bordered: true`, `--dss-border-width-thin` | Ajuda na distinção visual e organização do layout. |
| **Minimizado** | O drawer está em um estado compacto, geralmente mostrando apenas ícones. | `mini: true` | Otimiza o espaço em tela, mantendo a navegação acessível. |
| **Overlay** | O drawer sobrepõe o conteúdo da página, ideal para mobile. | `overlay: true` | Comportamento responsivo, geralmente ativado automaticamente em telas pequenas. |
| **Lado Esquerdo** | O drawer está posicionado no lado esquerdo da tela. | `side: 'left'` | Posição padrão para navegação principal. |
| **Lado Direito** | O drawer está posicionado no lado direito da tela. | `side: 'right'` | Usado para menus contextuais ou painéis auxiliares. | 

---

## 9. Histórico

| Data | Evento |
|------|--------|
| 2026-04-19 | Pré-prompt criado pelo Chat Estratégico (Manus) |
| 2026-04-19 | Componente implementado pelo Claude |
| 2026-04-19 | Auditoria DSS v2.5 executada — 1 NC não-bloqueante, 5 GAPs identificados |
| 2026-04-19 | NC-01 corrigida no pré-prompt (view string do Exemplo 5); GAP-01 e GAP-02 documentados |
| 2026-05-08 | Auditoria e correção de pré-prompt (Manus) - Atualização de Golden Reference, tokens, nomenclatura de brand, expansão de conteúdo e adição da Seção 8. |
