# Pré-prompt: DssMenu (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssMenu` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade, acessibilidade e consistência visual do sistema.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssMenu`
- **Família:** Navegação / Overlays
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssBadge` (para componentes não-interativos) e `DssChip` (para componentes interativos)
- **Golden Context:** `DssList` (container estrutural de itens)
- **Componente Quasar Base:** `QMenu`
- **Dependência Direta:** `DssList`, `DssItem` (Nível 1)

**Justificativa da Fase 2:** O `DssMenu` é um overlay flutuante que orquestra listas de navegação ou ações. Como componente de Nível 2, ele depende de componentes de Nível 1 (`DssList`, `DssItem`) para seu conteúdo interno e interage com o sistema de posicionamento flutuante do Quasar. A implementação deve ser robusta e seguir as diretrizes de acessibilidade e governança do DSS, garantindo que o componente se comporte de maneira previsível em diferentes contextos de uso, resoluções de tela e temas (light/dark).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Z-Index e Posicionamento
O `QMenu` nativo injeta o menu no final do `<body>` (teleport) e gerencia seu próprio `z-index` e posicionamento absoluto baseado no elemento âncora. O risco é que a sobrescrita de estilos quebre o cálculo de posicionamento do Quasar ou cause problemas de empilhamento (z-index) com modais, tooltips e outros overlays.

**Mitigação:** O `DssMenu` **não deve** alterar o `z-index` nativo (que já usa a escala correta do Quasar) nem as propriedades de posicionamento (`position`, `top`, `left`, `bottom`, `right`, `transform`). As customizações devem se restringir estritamente a bordas, border-radius, sombras (elevation) e cores de fundo. Qualquer tentativa de manipular o posicionamento via CSS resultará em falha no gate de qualidade.

### 2.2. Gate de Responsabilidade v2.4
O `DssMenu` é um **container de overlay 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é fornecer a superfície flutuante (fundo, sombra, borda arredondada) e gerenciar a visibilidade (abrir/fechar). A interatividade de navegação pertence exclusivamente aos `DssItem`s contidos nele. O `DssMenu` atua apenas como um palco para o conteúdo.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-menu>`. O slot `default` é destinado **exclusivamente** a componentes `DssList` (que por sua vez contêm `DssItem`s) ou conteúdo estruturado equivalente aprovado pelo DSS. O uso de HTML nativo (como `<ul>`, `<li>`, `<div>`) ou texto solto diretamente no `DssMenu` viola a governança de Nível 2 e deve ser bloqueado no code review.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
As seguintes props do Quasar são permitidas e devem ser expostas pelo `DssMenu`:
- `modelValue` (Boolean) - Controla a visibilidade do menu (v-model).
- `fit` (Boolean) - Faz o menu ter a mesma largura do elemento âncora. Útil para dropdowns em formulários.
- `cover` (Boolean) - Faz o menu cobrir o elemento âncora.
- `anchor` (String) - Ponto de ancoragem no elemento pai (ex: `bottom left`, `top right`).
- `self` (String) - Ponto de ancoragem no próprio menu (ex: `top left`, `bottom right`).
- `offset` (Array) - Deslocamento [x, y] em pixels para ajustes finos de posicionamento.
- `persistent` (Boolean) - Impede que o menu seja fechado ao clicar fora dele ou pressionar Escape.
- `auto-close` (Boolean) - Fecha o menu automaticamente ao clicar em qualquer elemento interno.
- `transition-show` (String) - Transição de entrada. Deve usar os padrões do DSS.
- `transition-hide` (String) - Transição de saída. Deve usar os padrões do DSS.
- `max-height` (String) - Altura máxima do menu antes de aplicar scroll interno.
- `max-width` (String) - Largura máxima do menu.

### 3.2. Props Bloqueadas (Governança DSS)
As seguintes props são estritamente proibidas e não devem ser expostas:
- `dark` - Bloqueada. O DSS gerencia dark mode via CSS global (`[data-theme="dark"]`).
- `square` - Bloqueada. Menus no DSS sempre têm bordas arredondadas (`--dss-radius-md`).
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.
- `color` - Bloqueada. A cor do menu é definida pelos tokens de superfície.
- `content-class` / `content-style` - Bloqueadas para evitar injeção de estilos não padronizados.

### 3.3. Eventos Expostos
- `update:modelValue` - Emitido quando a visibilidade do menu muda.
- `show` - Emitido após a animação de abertura ser concluída.
- `before-show` - Emitido antes da animação de abertura iniciar.
- `hide` - Emitido após a animação de fechamento ser concluída.
- `before-hide` - Emitido antes da animação de fechamento iniciar.

## 4. Governança de Tokens e CSS

O `DssMenu` deve utilizar os seguintes tokens rigorosamente, sem criar valores hardcoded:

- **Elevação (Shadow):** `--dss-elevation-3` (sombra padrão para popovers/menus flutuantes).
- **Border Radius:** `--dss-radius-md` (arredondamento padrão para menus).
- **Cor de Fundo:** `--dss-surface-default` (fundo branco/escuro padrão).
- **Espaçamento Interno:** `--dss-spacing-4` (para paddings internos, substituindo o antigo `--dss-spacing-4`).
- **Cor do Texto:** `--dss-text-subtle` (para textos secundários, substituindo o antigo `--dss-text-subtle`).
- **Ação Principal:** `--dss-action-hub` (para itens de destaque, substituindo o antigo `--dss-action-hub`).
- **Superfície de Ação:** `--dss-action-hub-surface` (para fundos de itens de destaque, substituindo o antigo `--dss-action-hub-surface`).
- **Borda (opcional/dark mode):** Em dark mode, menus flutuantes frequentemente precisam de uma borda sutil (`--dss-border-width-thin` solid `--dss-gray-200`) para se destacar do fundo escuro, já que sombras são menos visíveis.
- **Foco:** Para elementos interativos internos, usar `outline: 2px solid white` em dark mode (substituindo o antigo `outline: 2px solid white`).

### 4.1. Nomenclatura de Brand
A nomenclatura de brand deve seguir o padrão DSS atualizado. As antigas nomenclaturas ("hub", "water", "waste") estão obsoletas e devem ser substituídas por:
- `hub` (antigo hub) - Usado para ações principais do sistema.
- `water` (antigo water) - Usado para ações secundárias ou informativas.
- `waste` (antigo waste) - Usado para ações destrutivas ou de alerta.

## 5. Acessibilidade e Estados

- **Role:** O `QMenu` nativamente recebe `role="menu"`. O `DssMenu` deve preservar essa semântica para leitores de tela.
- **Aria-label:** Recomendado via `$attrs`: `<DssMenu aria-label="Menu de opções">`.
- **Foco:** O Quasar gerencia o foco automaticamente ao abrir o menu (movendo para o primeiro item focável). O `DssMenu` não deve interferir nisso.
- **Estados aplicáveis:** `dark mode`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.
- **Navegação por Teclado:** O menu deve suportar navegação por setas (ArrowUp, ArrowDown) para os itens internos, e a tecla Escape deve fechar o menu e retornar o foco para o elemento âncora.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssMenu.example.vue` deve cobrir exaustivamente os seguintes cenários para garantir a qualidade do componente:

1. **Básico:** Menu simples aberto ao clicar em um `DssButton`, contendo um `DssList` com `DssItem`s.
2. **Com Ícones:** Menu contendo itens com ícones (leading slot do `DssItem`).
3. **Com Separadores:** Menu contendo itens divididos por `DssSeparator`.
4. **Posicionamento Customizado:** Menu usando as props `anchor` e `self` para abrir à direita do botão em vez de abaixo.
5. **Fit:** Menu usando a prop `fit` para ter a mesma largura de um botão longo.
6. **Auto-close:** Menu que fecha automaticamente ao clicar em um item interno.
7. **Persistent:** Menu que não fecha ao clicar fora dele, exigindo uma ação explícita (como um botão "Fechar" interno).
8. **Dark Mode:** Demonstração do menu em um contexto de tema escuro, evidenciando a borda sutil.
9. **Scroll Interno:** Menu com muitos itens, demonstrando o comportamento de scroll com `max-height`.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de !important para sobrescrever background-color e box-shadow
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** O `QMenu` do Quasar aplica estilos nativos de sombra e fundo com alta especificidade. Para garantir que os tokens DSS (`--dss-surface-default` e `--dss-elevation-3`) tenham precedência absoluta sobre os estilos do Quasar, o uso de `!important` no escopo do `.dss-menu` é permitido e recomendado. Precedente: `DssHeader`, `DssToolbar`.

## 8. Superfície de Playground

A superfície de playground deve expor os controles necessários para testar todas as variações do `DssMenu` interativamente, permitindo que designers e desenvolvedores validem o comportamento do componente em tempo real.

### 8.1. Controles Obrigatórios
- `modelValue` (Boolean) - Toggle para abrir/fechar o menu programaticamente.
- `fit` (Boolean) - Toggle para ativar/desativar a largura igual ao âncora.
- `cover` (Boolean) - Toggle para ativar/desativar a cobertura do âncora.
- `anchor` (Select) - Opções de ancoragem (ex: `bottom left`, `top right`, `center middle`).
- `self` (Select) - Opções de auto-ancoragem (ex: `top left`, `bottom right`, `center middle`).
- `auto-close` (Boolean) - Toggle para fechar ao clicar em um item.
- `persistent` (Boolean) - Toggle para persistência (não fechar ao clicar fora).
- `brand` (Select) - Opções de brand para itens de destaque: `hub`, `water`, `waste`.

### 8.2. Composite Logic
A lógica de composição do playground deve incluir um botão âncora (`DssButton`) e o `DssMenu` contendo um `DssList` com vários `DssItem`s. A mudança da prop `brand` no playground deve refletir na cor dos itens de destaque dentro do menu, utilizando as classes utilitárias do DSS para `hub`, `water` e `waste`.

```vue
<template>
  <div class="playground-container dss-spacing-4">
    <DssButton label="Abrir Menu de Opções" color="hub">
      <DssMenu
        v-model="isMenuOpen"
        :fit="isFit"
        :cover="isCover"
        :anchor="anchorPosition"
        :self="selfPosition"
        :auto-close="isAutoClose"
        :persistent="isPersistent"
      >
        <DssList>
          <DssItem clickable v-close-popup>
            <DssItemSection>Perfil do Usuário</DssItemSection>
          </DssItem>
          <DssItem clickable v-close-popup>
            <DssItemSection>Configurações</DssItemSection>
          </DssItem>
          <DssSeparator />
          <DssItem clickable v-close-popup :class="`text-${selectedBrand}`">
            <DssItemSection>Ação de Destaque ({{ selectedBrand }})</DssItemSection>
          </DssItem>
        </DssList>
      </DssMenu>
    </DssButton>
  </div>
</template>
```

### 8.3. Estados a Expor

A tabela abaixo define os estados que devem ser expostos no playground para validação visual e funcional:

| Estado | Descrição | Props Envolvidas |
|---|---|---|
| **Default** | Menu padrão com comportamento de popover, abrindo abaixo do botão. | Nenhuma |
| **Fit** | Menu com a mesma largura do botão âncora, ideal para selects customizados. | `fit="true"` |
| **Cover** | Menu cobrindo o botão âncora, ocultando-o enquanto aberto. | `cover="true"` |
| **Persistent** | Menu que não fecha ao clicar fora, exigindo interação com os itens. | `persistent="true"` |
| **Auto-close** | Menu que fecha automaticamente ao clicar em qualquer item interno. | `auto-close="true"` |
| **Brand Hub** | Item de destaque com a cor da brand Hub (ação principal). | `brand="hub"` |
| **Brand Water** | Item de destaque com a cor da brand Water (ação secundária). | `brand="water"` |
| **Brand Waste** | Item de destaque com a cor da brand Waste (ação destrutiva). | `brand="waste"` |
