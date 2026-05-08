# Pré-prompt de Criação de Componente DSS: DssFab

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente, garantindo que todas as diretrizes de design, acessibilidade e arquitetura sejam rigorosamente seguidas desde a concepção.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFab`
- **Família:** FAB (Composição de Primeiro Grau)
- **Nível de Composição:** Nível 2
- **Golden Reference:** `DssChip` (Golden Reference oficial para componentes interativos no Design System)
- **Golden Context:** `DssBtnDropdown` (baseline arquitetural — botão que expande um painel ou lista de ações secundárias)
- **Componente Quasar Base:** `QFab`
- **Dependências Diretas:** `DssButton`, `DssIcon`

**Justificativa da Fase 2:** O `DssFab` (Floating Action Button) foi reclassificado da Fase 1 para a Fase 2 devido à sua complexidade inerente. Ele gerencia estado interno (expandido/colapsado) e orquestra múltiplos componentes filhos (`DssFabAction`). Ele não é um simples wrapper de primitivo, mas um container interativo de ações que exige uma coordenação complexa de animações, estados e acessibilidade. A sua implementação requer atenção especial à consistência visual com os demais botões do sistema, garantindo uma experiência de usuário fluida e previsível.

O FAB é um elemento de destaque na interface, geralmente reservado para a ação primária de uma tela. Portanto, sua implementação deve ser robusta, performática e visualmente impecável, refletindo a identidade visual da marca através do uso correto de tokens.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Inconsistência Visual com DssButton

O `QFab` nativo do Quasar reconstrói parte do CSS de botões internamente, o que pode levar a divergências visuais significativas. O risco principal é que o `DssFab` destoe visualmente do `DssButton` em aspectos cruciais como tamanho, tipografia, hover states, elevação e transições.

**Mitigação:** O `DssFab` deve consumir estritamente os mesmos tokens de elevação (`--dss-elevation-2` para o estado padrão, `--dss-elevation-3` no estado de hover), border-radius (`--dss-radius-full`) e cores semânticas que o `DssButton`. Qualquer customização deve ser feita através de variáveis CSS globais do DSS, evitando hardcoding de valores. A tipografia do label (quando presente) deve seguir os tokens de tipografia de botões do DSS.

### 2.2. Gate de Responsabilidade v2.4

O `DssFab` é estritamente responsável por:
1. Gerenciar o estado de expansão (aberto/fechado) de forma reativa e previsível.
2. Orquestrar a direção da animação das ações filhas (`up`, `down`, `left`, `right`) garantindo fluidez e ausência de jank visual.
3. Fornecer o botão trigger principal com a iconografia e rótulos corretos, adaptando-se ao formato circular ou pill (Extended FAB).
4. Garantir que o foco seja mantido de forma acessível durante a navegação por teclado, permitindo que usuários de leitores de tela compreendam o estado do componente.

Ele **não é responsável** por:
1. Posicionamento fixo na tela (isso pertence ao `DssPageSticky`, que deve ser usado como wrapper quando o FAB precisar flutuar sobre o conteúdo).
2. Executar as ações finais de negócio (isso pertence aos `DssFabAction` filhos, que emitem os eventos apropriados para a aplicação consumidora).
3. Gerenciar o z-index global da aplicação (o z-index deve ser gerenciado pelo contexto onde o FAB é inserido, não hardcoded no componente).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-fab>`. O slot `default` é reservado exclusivamente para componentes `DssFabAction` (que será criado no Nível 3). Não é permitido injetar HTML arbitrário, texto solto ou outros componentes não homologados dentro do slot principal do `DssFab`. Esta restrição garante que a animação e o layout das ações filhas funcionem corretamente em todas as direções suportadas.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

*Nota: O DssFab não emite eventos próprios além dos nativos do Vue (ex: `@click`), pois o estado de expansão é gerenciado via `v-model` (evento `update:model-value`).*

**Visuais (Alinhadas ao DssButton):**
- `color` (String) - Cor semântica da marca (`hub`, `water`, `waste`, `positive`, `negative`, `warning`, `info`). Padrão: `hub`.
- `text-color` (String) - Cor do ícone e do texto. Deve contrastar adequadamente com a cor de fundo escolhida. Se não fornecida, deve ser calculada automaticamente com base na cor de fundo.
- `label` (String) - Texto exibido ao lado do ícone. A presença desta prop transforma automaticamente o FAB em um Extended FAB (formato pill).
- `icon` (String) - Ícone exibido quando o FAB está fechado. Padrão: `add`.
- `active-icon` (String) - Ícone exibido quando o FAB está aberto. Padrão: `close`.
- `hide-icon` (Boolean) - Oculta o ícone. Útil para FABs apenas com texto, embora esta prática não seja recomendada pelas diretrizes de design.
- `hide-label` (Boolean) - Oculta o label, forçando o formato circular padrão mesmo que a prop `label` esteja preenchida.
- `disable` (Boolean) - Desabilita o FAB, impedindo interações de mouse e teclado, e alterando sua opacidade visual.

**Comportamentais (Dropdown/Expansão):**
- `model-value` / `v-model` (Boolean) - Controla o estado aberto/fechado de forma programática, permitindo integração com o estado da aplicação.
- `direction` (String) - Direção de expansão das ações filhas. Valores permitidos: `up`, `down`, `left`, `right`. Padrão: `up`.
- `persistent` (Boolean) - Se verdadeiro, o FAB não fecha automaticamente ao clicar fora de sua área ou ao pressionar a tecla Esc.
- `vertical-actions-align` (String) - Alinhamento das ações quando a direção é vertical (`up` ou `down`). Valores permitidos: `left`, `center`, `right`. Padrão: `center`.

### 3.2. Props Bloqueadas (Governança DSS)

- `glossy`, `push`, `flat`, `outline`, `unelevated` → O FAB no DSS é **sempre** elevado (Material Design baseline). Variantes flat ou outline não fazem sentido semântico para uma ação flutuante primária e quebram a hierarquia visual estabelecida pelo Design System.
- `padding` → O padding deve ser governado exclusivamente por tokens internos do DSS, não exposto para manipulação externa.
- `square` → O FAB deve manter seu formato circular ou de pílula (pill), nunca quadrado. Bordas retas violam a linguagem visual do componente.

## 4. Governança de Tokens e CSS

A estilização do `DssFab` deve ser estritamente baseada nos tokens de design do DSS. Valores hardcoded (como `px`, `rem`, ou cores hexadecimais) são expressamente proibidos no CSS do componente.

- **Border Radius:** `border-radius: var(--dss-radius-full)` (garante o formato sempre circular ou pill, independentemente do conteúdo).
- **Elevação:** `box-shadow: var(--dss-elevation-2)` (estado padrão) e `var(--dss-elevation-3)` (estado de hover/active). A transição entre essas elevações deve ser suave.
- **Transição:** `transition: all var(--dss-duration-200) var(--dss-easing-standard)` (para animações suaves de expansão, hover e focus).
- **Dimensão Mínima (Touch Target):** `min-width` e `min-height` devem usar `var(--dss-spacing-14)` (56px) para garantir a usabilidade em dispositivos móveis e atender aos critérios de acessibilidade.
- **Padding (Extended FAB):** O padding horizontal da variante pill deve usar `var(--dss-spacing-4)` (16px) para garantir um respiro adequado ao redor do texto.
- **Cores de Fundo:** Utilizar `--dss-action-hub-surface` para o fundo padrão do componente.
- **Cores de Ação:** Utilizar `--dss-action-hub` para a cor principal de ação.
- **Cores de Texto:** Utilizar `--dss-text-subtle` para textos secundários, se aplicável.
- **Focus Ring (Dark Mode):** O catálogo não possui token específico para focus ring no dark mode. Usar `outline: 2px solid white` com a exceção `EXC-States-02` documentada, garantindo visibilidade em fundos escuros.
- **Tipografia:** O label do Extended FAB deve utilizar os tokens de tipografia de botão (`--dss-typography-button-weight`, `--dss-typography-button-size`, etc.).

## 5. Acessibilidade e Estados

A acessibilidade é um requisito não funcional crítico para o `DssFab`. O componente deve ser totalmente operável via teclado e compreensível por leitores de tela.

- **Role e ARIA:** O Quasar gerencia os atributos `aria-expanded` e `aria-haspopup` automaticamente. O DSS deve garantir que esses atributos não sejam sobrescritos e que o botão trigger possua um `aria-label` descritivo caso não haja texto visível.
- **Touch Target:** O botão trigger deve ter no mínimo 48x48px (garantido pelo tamanho padrão do FAB de 56px, definido pelos tokens de espaçamento).
- **Navegação por Teclado:** Quando expandido, o foco deve poder ser movido para as ações filhas usando a tecla `Tab`. O fechamento via `Esc` deve ser suportado nativamente.
- **Estados aplicáveis:** `default`, `hover`, `focus`, `active`, `disabled`, `expanded`.

**Tabela de Delegação de Estados:**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `hover` | DSS (CSS) | Visual | Pseudo-classe `:hover` no trigger, alterando a elevação para `--dss-elevation-3` |
| `focus` | DSS (CSS) | Visual | Pseudo-classe `:focus-visible` no trigger, aplicando o focus ring acessível |
| `active` | DSS (CSS) | Visual | Pseudo-classe `:active` no trigger, com leve redução de escala para feedback tátil |
| `disabled` | Quasar | Visual | Prop `disable` repassada ao `QFab`, aplicando opacidade reduzida e `pointer-events: none` |
| `expanded` | Quasar | Visual | Prop `model-value` / `v-model`, alternando os ícones e exibindo os filhos com animação |

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssFab.example.vue` deve cobrir exaustivamente os seguintes cenários para garantir a correta documentação e testes visuais automatizados:

1. **Padrão (Ícone apenas):** FAB circular com ícone `add`, expandindo para cima. Este é o caso de uso mais comum e deve ser o primeiro exemplo.
2. **Extended FAB (Ícone + Label):** FAB em formato pill com texto "Nova Ação". Demonstra a capacidade de acomodar rótulos textuais e a transição fluida entre os formatos.
3. **Direções de Expansão:** Demonstração de expansão para `right`, `left` e `down`, provando a flexibilidade do layout e a correta orientação das animações.
4. **Cores Semânticas:** Demonstração com as cores da marca (`hub`, `water`, `waste`), validando a aplicação correta dos tokens de cor e o contraste do texto.
5. **Estado Desabilitado:** Demonstração do FAB com a prop `disable` ativa, mostrando a correta aplicação de estilos de inatividade.
6. **Alinhamento Vertical:** Demonstração da prop `vertical-actions-align` com valores `left` e `right` para garantir que as ações filhas se alinhem corretamente em relação ao trigger.

*Nota: Como o `DssFabAction` ainda não existe, use `<q-fab-action>` nativo temporariamente nos exemplos para demonstrar a expansão, adicionando um comentário explicativo claro sobre esta dependência temporária.*

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de primitivo Quasar no exemplo

- **Regra Violada:** Gate de Composição v2.4 — Regra 2 (uso de primitivos Quasar em exemplos).
- **Justificativa:** O `DssFab` requer filhos para demonstrar seu comportamento de expansão. Como o `DssFabAction` (Nível 3) ainda não foi construído, o uso temporário de `<q-fab-action>` é estritamente necessário para a documentação visual e testes interativos. Esta exceção será removida assim que o `DssFabAction` for selado e disponibilizado no sistema.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders, designers e desenvolvedores entenderem e testarem o componente em tempo real, validando seu comportamento em diversos cenários.

### 8.1 Controles Obrigatórios

Os seguintes controles devem estar disponíveis na interface do playground para manipulação em tempo real:

- **Color**: Select com as cores semânticas da marca [`hub`, `water`, `waste`, `positive`, `negative`, `warning`, `info`]. A alteração deve refletir imediatamente no trigger e nas ações filhas (se aplicável).
- **Label**: Input de texto (vazio por padrão). Preenchê-lo transforma o FAB circular em um Extended FAB (formato pill), demonstrando a transição de largura.
- **Direction**: Select [`up`, `down`, `left`, `right`] — demonstra a flexibilidade de layout e a correta animação das ações filhas em diferentes orientações.
- **Disabled**: Toggle [true, false] — permite testar o estado inativo do componente, verificando a opacidade e a ausência de interatividade.
- **Icon**: Input de texto para alterar o ícone padrão (ex: `edit`, `delete`, `save`).
- **Active Icon**: Input de texto para alterar o ícone exibido quando o FAB está expandido (ex: `close`, `clear`).
- **Persistent**: Toggle [true, false] — permite testar o comportamento de fechamento ao clicar fora do componente.

### 8.2 Composite Logic

A lógica de composição no playground deve refletir cenários reais de uso e garantir que o componente seja testado de forma isolada:

- O `DssFab` **não deve** ser testado com posicionamento fixo (`absolute`/`fixed`) no playground padrão. Ele deve ser renderizado no fluxo normal do documento (dentro de um container com padding adequado, ex: `padding: 100px`) para provar que a expansão funciona independentemente do container e não quebra o layout adjacente.
- O playground **deve** injetar pelo menos 3 ações filhas (usando `q-fab-action` temporariamente) para demonstrar a coreografia de animação em cascata e o espaçamento correto entre os itens.
- A alteração da prop `direction` deve reposicionar as ações filhas dinamicamente, sem recarregar o componente, demonstrando a reatividade da implementação.
- O clique fora do componente deve fechar o FAB, a menos que a prop `persistent` esteja ativa.

### 8.3 Estados a Expor

A tabela abaixo define os estados visuais e comportamentais que devem ser facilmente reprodutíveis no playground:

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Colapsado** | Apenas o botão trigger principal é visível, exibindo o `icon` padrão. | Visual | Estado inicial padrão |
| **Expandido** | Ações filhas tornam-se visíveis com animação em cascata; o ícone do trigger muda para `active-icon`. | Comportamental | Clique no botão trigger |
| **Extended** | O FAB assume o formato pill (pílula) para acomodar o texto ao lado do ícone. | Visual | Preenchimento da prop `label` |
| **Disabled** | O componente apresenta opacidade reduzida e não responde a interações de mouse ou teclado. | Visual | Ativação do toggle `disable` |
| **Hover** | O componente apresenta uma elevação maior (`--dss-elevation-3`) para indicar interatividade. | Visual | Mouse over no botão trigger |
| **Focus** | O componente exibe um anel de foco claro para navegação por teclado. | Visual | Navegação via tecla `Tab` |
