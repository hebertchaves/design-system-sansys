# Pré-prompt: DssResponsive

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssBadge (para componentes não-interativos) e DssChip (para interativos).

### Golden Context
O DssResponsive é um componente fundamental para garantir a adaptabilidade da interface do usuário em diferentes tamanhos de tela e dispositivos. Ele atua como um wrapper ou utilitário que permite a exibição condicional de conteúdo ou a aplicação de estilos específicos com base nos breakpoints definidos pelo Design System. Seu objetivo é simplificar a criação de layouts responsivos, abstraindo a complexidade das media queries e fornecendo uma API consistente para os desenvolvedores.
A necessidade de uma experiência de usuário fluida e consistente em múltiplos dispositivos é primordial. O DssResponsive centraliza a lógica de responsividade, promovendo a reutilização de código, a manutenção simplificada e a aderência aos padrões de design estabelecidos, evitando implementações ad-hoc de responsividade que poderiam levar a inconsistências visuais e técnicas.

### Justificativa
A necessidade de uma experiência de usuário fluida e consistente em múltiplos dispositivos é primordial. O DssResponsive centraliza a lógica de responsividade, promovendo a reutilização de código, a manutenção simplificada e a aderência aos padrões de design estabelecidos, evitando implementações ad-hoc de responsividade que poderiam levar a inconsistências visuais e técnicas.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Performance:** Garantir que a re-renderização ou a manipulação do DOM em mudanças de breakpoint não impacte negativamente a performance da aplicação.
*   **Compatibilidade:** Assegurar compatibilidade com os principais navegadores e versões, especialmente em relação ao suporte a recursos de CSS e JavaScript utilizados para detecção de breakpoint.
*   **Conflito de Estilos:** Prevenir conflitos com outras classes ou estilos de responsividade que possam ser aplicados diretamente, garantindo que a lógica do DssResponsive prevaleça ou se integre corretamente.
*   **Sobrecarga de Conteúdo:** Evitar que a exibição condicional de grandes blocos de conteúdo cause problemas de SEO ou acessibilidade se não for gerenciada corretamente.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssResponsive deve encapsular e estender as funcionalidades de responsividade do Quasar, como as classes de breakpoint (`lt-sm`, `gt-md`, etc.) e o `QResizeObserver` ou `Screen` plugin. A API do DSS deve ser mais declarativa e focada no comportamento desejado.

| Quasar API/Conceito | DSSResponsive Equivalente/Abstração |
| :------------------ | :---------------------------------- |
| `lt-sm`, `gt-md` classes | `breakpoint` prop (e.g., `:breakpoint="['md', 'lg']"` para mostrar apenas em MD e LG) |
| `QResizeObserver` | Interno, para detectar mudanças de tamanho e atualizar o estado responsivo. |
| `Screen` plugin (width, height, etc.) | `currentBreakpoint` (slot prop ou evento) |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssResponsive não deve introduzir estilos visuais diretos que utilizem tokens de espaçamento, raio ou duração, pois sua função é orquestrar a exibição de outros componentes. No entanto, ele pode influenciar a aplicação de classes CSS que, por sua vez, utilizam tokens do DSS.

*   **Espaçamento:** N/A (o espaçamento é gerenciado pelos componentes filhos ou layouts que o DssResponsive orquestra).
*   **Raio:** N/A.
*   **Duração:** N/A.
*   **Superfície:** N/A.

**Exemplo de uso indireto de tokens (via classes aplicadas):**

```html
<DssResponsive :breakpoint="['sm']">
  <DssCard class="dss-spacing-top-4">
    <!-- Conteúdo do card -->
  </DssCard>
</DssResponsive>
```

Tokens de cor de marca como `--dss-action-hub` e `--dss-action-hub-surface` devem ser usados em vez de `hub`.
Tokens de cor de marca como `--dss-action-water` e `--dss-action-water-surface` devem ser usados em vez de `water`.
Tokens de cor de marca como `--dss-action-waste` e `--dss-action-waste-surface` devem ser usados em vez de `waste`.

Tokens de espaçamento como `--dss-spacing-4` devem ser usados em vez de `--dss-spacing-4`.
Tokens de texto como `--dss-text-subtle` devem ser usados em vez de `--dss-text-subtle`.
Tokens de foco como `outline: 2px solid white` devem ser usados em vez de `outline: 2px solid white`.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade

*   **Conteúdo Oculto:** Quando o conteúdo é ocultado por responsividade, garantir que ele não seja apenas `display: none`, mas também inacessível para leitores de tela (e.g., `aria-hidden="true"` ou remoção do DOM, dependendo do contexto).
*   **Foco:** Se o DssResponsive gerenciar elementos interativos, garantir que o foco do teclado seja mantido ou redirecionado apropriadamente após mudanças de breakpoint.

### Estados

*   **`isMobile`:** Estado booleano que indica se o breakpoint atual corresponde a um dispositivo móvel (e.g., `xs`, `sm`).
*   **`isDesktop`:** Estado booleano que indica se o breakpoint atual corresponde a um dispositivo desktop (e.g., `md`, `lg`, `xl`).
*   **`currentBreakpoint`:** String que representa o breakpoint ativo (e.g., `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências

*   **Quasar Framework:** Utiliza as utilidades de responsividade e o sistema de breakpoints do Quasar.
*   **DssBreakpoints (futuro):** Pode depender de um módulo DSS que defina e gerencie os breakpoints de forma centralizada.

### Composição

O DssResponsive é um componente de composição, projetado para envolver outros componentes ou blocos de conteúdo. Ele pode ser usado para:

*   Exibir diferentes versões de um componente (e.g., `DssTable` para desktop, `DssList` para mobile).
*   Ajustar o layout de uma página (e.g., `DssGrid` com diferentes configurações de colunas).
*   Ocultar ou mostrar elementos específicos (e.g., um botão de ação que aparece apenas em mobile).

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Essencial Oculto:** Não deve ser usado para ocultar conteúdo que é essencial para a funcionalidade principal da aplicação em todos os breakpoints, a menos que uma alternativa acessível seja fornecida.
*   **Responsividade Complexa:** Para cenários de responsividade muito complexos que exigem manipulação direta do DOM ou lógica de layout altamente customizada, o DssResponsive pode não ser a solução ideal, e uma implementação manual pode ser necessária (com justificativa).
*   **Animações/Transições:** O DssResponsive não gerencia transições ou animações entre estados responsivos; isso deve ser tratado pelos componentes filhos ou por utilitários de transição dedicados.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios

*   **`breakpoint` (Array<String> ou String):** Define em quais breakpoints o conteúdo do slot padrão deve ser exibido. Ex: `['sm', 'md']` ou `'lg'`. Se vazio, exibe em todos.
*   **`hideOn` (Array<String> ou String):** Define em quais breakpoints o conteúdo deve ser ocultado. Ex: `['xs', 'sm']`.
*   **`showOn` (Array<String> ou String):** Define em quais breakpoints o conteúdo deve ser mostrado. Ex: `['md', 'lg']`.
*   **`tag` (String):** A tag HTML a ser renderizada como elemento raiz (padrão: `'div'`).

### Composite Logic

```vue
<template>
  <DssResponsive :showOn="['md', 'lg', 'xl']">
    <DssButton label="Ação Desktop" color="hub" />
  </DssResponsive>

  <DssResponsive :showOn="['xs', 'sm']">
    <DssFab icon="add" color="water" />
  </DssResponsive>

  <DssResponsive :hideOn="['sm']">
    <DssText color="subtle">Este texto não aparece em telas pequenas.</DssText>
  </DssResponsive>

  <DssResponsive v-slot="{ currentBreakpoint, isMobile }" :breakpoint="['sm', 'md']">
    <DssCard>
      <DssCardSection>
        <DssText>Breakpoint atual: {{ currentBreakpoint }}</DssText>
        <DssText v-if="isMobile">Você está em um dispositivo móvel.</DssText>
      </DssCardSection>
    </DssCard>
  </DssResponsive>
</template>

<script setup>
import { DssButton, DssFab, DssText, DssCard, DssCardSection } from '@dss/components';
</script>
```

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `currentBreakpoint` | O breakpoint ativo no momento (e.g., `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`). | String | — |
| `isXs` | `true` se o breakpoint atual for `xs`. | Boolean | — |
| `isSm` | `true` se o breakpoint atual for `sm`. | Boolean | — |
| `isMd` | `true` se o breakpoint atual for `md`. | Boolean | — |
| `isLg` | `true` se o breakpoint atual for `lg`. | Boolean | — |
| `isXl` | `true` se o breakpoint atual for `xl`. | Boolean | — |
| `isMobile` | `true` se o breakpoint atual for `xs` ou `sm`. | Boolean | — |
| `isDesktop` | `true` se o breakpoint atual for `md`, `lg` ou `xl`. | Boolean | — |

## 9. CONSIDERAÇÕES FINAIS

O DssResponsive é uma ferramenta poderosa para criar interfaces adaptáveis, mas deve ser usado com moderação. O uso excessivo de renderização condicional pode levar a um DOM complexo e difícil de manter. Sempre que possível, prefira o uso de CSS (media queries, flexbox, grid) para resolver problemas de layout responsivo, reservando o DssResponsive para casos onde a lógica de exibição ou o comportamento do componente precisam mudar significativamente com base no tamanho da tela.

Além disso, é importante lembrar que a responsividade não se trata apenas de ajustar o layout para diferentes tamanhos de tela, mas também de garantir que a experiência do usuário seja otimizada para cada dispositivo. Isso pode envolver a adaptação de interações (e.g., touch vs. mouse), a otimização de imagens e outros recursos, e a consideração de diferentes contextos de uso.

Ao utilizar o DssResponsive, certifique-se de testar a interface em uma variedade de dispositivos e tamanhos de tela para garantir que ela funcione conforme o esperado. Utilize as ferramentas de desenvolvedor do navegador para simular diferentes dispositivos e identificar possíveis problemas de layout ou comportamento.

Lembre-se também de manter a acessibilidade em mente ao criar interfaces responsivas. Certifique-se de que o conteúdo oculto não seja acessível por leitores de tela e que o foco do teclado seja gerenciado corretamente ao alternar entre diferentes visualizações.

Por fim, mantenha-se atualizado com as melhores práticas de design responsivo e as novidades do Design System para garantir que suas interfaces continuem a oferecer a melhor experiência possível aos usuários.
