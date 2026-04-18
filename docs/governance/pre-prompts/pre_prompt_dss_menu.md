# Pré-prompt: DssMenu (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssMenu` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssMenu`
- **Família:** Navegação / Overlays
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssTooltip` (como overlay flutuante)
- **Golden Context:** `DssList` (container estrutural de itens)
- **Componente Quasar Base:** `QMenu`
- **Dependência Direta:** `DssList`, `DssItem` (Nível 1)

**Justificativa da Fase 2:** O `DssMenu` é um overlay flutuante que orquestra listas de navegação ou ações. Como componente de Nível 2, ele depende de componentes de Nível 1 (`DssList`, `DssItem`) para seu conteúdo interno e interage com o sistema de posicionamento flutuante do Quasar.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Z-Index e Posicionamento
O `QMenu` nativo injeta o menu no final do `<body>` (teleport) e gerencia seu próprio `z-index` e posicionamento absoluto baseado no elemento âncora. O risco é que a sobrescrita de estilos quebre o cálculo de posicionamento do Quasar ou cause problemas de empilhamento (z-index) com modais e tooltips.

**Mitigação:** O `DssMenu` **não deve** alterar o `z-index` nativo (que já usa a escala correta do Quasar) nem as propriedades de posicionamento (`position`, `top`, `left`). As customizações devem se restringir a bordas, border-radius, sombras (elevation) e cores de fundo.

### 2.2. Gate de Responsabilidade v2.4
O `DssMenu` é um **container de overlay 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é fornecer a superfície flutuante (fundo, sombra, borda arredondada) e gerenciar a visibilidade (abrir/fechar). A interatividade de navegação pertence exclusivamente aos `DssItem`s contidos nele.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-menu>`. O slot `default` é destinado **exclusivamente** a componentes `DssList` (que por sua vez contêm `DssItem`s) ou conteúdo estruturado equivalente. O uso de HTML nativo ou texto solto diretamente no `DssMenu` viola a governança de Nível 2.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `modelValue` (Boolean) - Controla a visibilidade do menu (v-model).
- `fit` (Boolean) - Faz o menu ter a mesma largura do elemento âncora.
- `cover` (Boolean) - Faz o menu cobrir o elemento âncora.
- `anchor` (String) - Ponto de ancoragem no elemento pai (ex: `bottom left`).
- `self` (String) - Ponto de ancoragem no próprio menu (ex: `top left`).
- `offset` (Array) - Deslocamento [x, y] em pixels.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueada. O DSS gerencia dark mode via CSS global (`[data-theme="dark"]`).
- `square` - Bloqueada. Menus no DSS sempre têm bordas arredondadas (`--dss-radius-md`).
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.

## 4. Governança de Tokens e CSS

O `DssMenu` deve utilizar os seguintes tokens:
- **Elevação (Shadow):** `--dss-elevation-3` (sombra padrão para popovers/menus flutuantes).
- **Border Radius:** `--dss-radius-md` (arredondamento padrão para menus).
- **Cor de Fundo:** `--dss-surface-default` (fundo branco/escuro padrão).
- **Borda (opcional/dark mode):** Em dark mode, menus flutuantes frequentemente precisam de uma borda sutil (`--dss-border-width-thin` solid `--dss-gray-200`) para se destacar do fundo escuro, já que sombras são menos visíveis.

## 5. Acessibilidade e Estados

- **Role:** O `QMenu` nativamente recebe `role="menu"`. O `DssMenu` deve preservar essa semântica.
- **Aria-label:** Recomendado via `$attrs`: `<DssMenu aria-label="Menu de opções">`.
- **Foco:** O Quasar gerencia o foco automaticamente ao abrir o menu (movendo para o primeiro item focável). O `DssMenu` não deve interferir nisso.
- **Estados aplicáveis:** `dark mode`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssMenu.example.vue` deve cobrir:
1. **Básico:** Menu simples aberto ao clicar em um `DssButton`, contendo um `DssList` com `DssItem`s.
2. **Com Ícones:** Menu contendo itens com ícones (leading slot do `DssItem`).
3. **Com Separadores:** Menu contendo itens divididos por `DssSeparator`.
4. **Posicionamento Customizado:** Menu usando as props `anchor` e `self` para abrir à direita do botão em vez de abaixo.
5. **Fit:** Menu usando a prop `fit` para ter a mesma largura de um botão longo.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de !important para sobrescrever background-color e box-shadow
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** O `QMenu` do Quasar aplica estilos nativos de sombra e fundo. Para garantir que os tokens DSS (`--dss-surface-default` e `--dss-elevation-3`) tenham precedência absoluta sobre os estilos do Quasar, o uso de `!important` no escopo do `.dss-menu` é permitido e recomendado. Precedente: `DssHeader`, `DssToolbar`.
