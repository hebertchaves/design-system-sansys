# Pré-prompt: DssFooter (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssFooter` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFooter`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** `DssBadge` (componente não-interativo)
- **Golden Context:** `DssHeader` (componente com Selo v2.2 de mesma família e arquitetura). *Nota: Golden Context original era DssLayout, corrigido para DssHeader conforme definição formal de Golden Context.*
- **Componente Quasar Base:** `QFooter`
- **Dependência Direta:** `DssToolbar` (Nível 1)

**Justificativa da Fase 2:** O `DssFooter` é o container inferior de layout de página, par simétrico do `DssHeader`. Como componente de Nível 3, ele orquestra componentes de Nível 1 (`DssToolbar`) e interage diretamente com o sistema de layout do Quasar (`QLayout`).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout e Z-Index
Assim como o `QHeader`, o `QFooter` nativo injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página e gerencia seu próprio `z-index` para ficar sobreposto ao conteúdo rolado. O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais e drawers.

**Mitigação:** O `DssFooter` **não deve** alterar o `z-index` nativo nem as propriedades de posicionamento (`position: fixed/absolute`) aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation) e cores de fundo.

### 2.2. Gate de Responsabilidade v2.4
O `DssFooter` é um **container estrutural de layout 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo no rodapé da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo rolado.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-footer>`. O slot `default` é destinado **exclusivamente** a componentes `DssToolbar` (ou `DssTabs` em cenários específicos de navegação global). O uso de HTML nativo ou texto solto diretamente no `DssFooter` viola a governança de Nível 3.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

O `DssFooter` expõe um conjunto limitado e controlado de propriedades para garantir sua integridade arquitetural e evitar customizações que possam comprometer o layout global da aplicação. As props permitidas são:

- **`elevated`** (`Boolean`, padrão: `false`)
  - **Descrição:** Quando `true`, aplica uma sombra sutil na parte superior do footer, simulando uma elevação em relação ao conteúdo da página. Esta sombra utiliza o token `--dss-elevation-2` ou `--dss-shadow-md` (com a direção invertida para projetar para cima), proporcionando um destaque visual sem interferir no fluxo do documento. É ideal para cenários onde o footer precisa se diferenciar claramente do conteúdo principal.
  - **Exemplo de Uso:** `<DssFooter elevated />`
  - **Governança:** Esta prop é um booleano simples que mapeia diretamente para uma classe CSS interna que aplica os estilos de sombra definidos pelos tokens de elevação do DSS. Não deve ser utilizada em conjunto com a prop `bordered`.

- **`bordered`** (`Boolean`, padrão: `false`)
  - **Descrição:** Quando `true`, aplica uma borda superior fina e discreta ao footer. Esta borda utiliza os tokens `--dss-border-width-sm` e `--dss-border-subtle`, oferecendo uma alternativa mais "flat" e minimalista à elevação. É útil para designs que buscam uma separação visual limpa sem o uso de sombras.
  - **Exemplo de Uso:** `<DssFooter bordered />`
  - **Governança:** Similar à prop `elevated`, esta prop ativa uma classe CSS que aplica os estilos de borda. Não deve ser utilizada em conjunto com a prop `elevated`.

- **`reveal`** (`Boolean`, padrão: `false`)
  - **Descrição:** Habilita um comportamento dinâmico onde o footer se esconde automaticamente quando o usuário rola a página para baixo e reaparece quando rola para cima. Este comportamento é nativo do componente `QFooter` do Quasar e é repassado diretamente via `$attrs`. É particularmente útil em aplicações móveis ou em páginas com muito conteúdo, onde o espaço vertical é premium.
  - **Exemplo de Uso:** `<DssFooter reveal />`
  - **Governança:** Esta prop é um pass-through direto para o `QFooter` subjacente. O agente deve garantir que a implementação não adicione lógica extra que possa alterar o comportamento padrão de `reveal` do Quasar, mantendo a previsibilidade e a performance.

### 3.2. Props Bloqueadas (Governança DSS)

Para manter a consistência e evitar comportamentos inesperados, algumas propriedades do `QFooter` nativo são explicitamente bloqueadas ou desencorajadas no `DssFooter`:

- **`height-hint`**
  - **Descrição:** Esta prop, presente no `QFooter` do Quasar, permite sugerir uma altura para o componente. No `DssFooter`, ela é **bloqueada** porque a altura do footer deve ser calculada automaticamente com base no conteúdo (`DssToolbar`) e no sistema de layout do Quasar. A definição manual de altura poderia levar a problemas de responsividade e alinhamento.
  - **Governança:** O agente deve garantir que esta prop não seja exposta ou utilizada internamente no `DssFooter`.

- **`class` / `style` (internas do Quasar)**
  - **Descrição:** Embora o `DssFooter` deva aceitar classes e estilos via `$attrs` para permitir customizações externas controladas, ele **não deve** expor props específicas como `class` ou `style` diretamente. Isso evita que o componente seja estilizado de forma arbitrária, potencialmente quebrando a integridade visual do Design System.
  - **Governança:** Customizações de estilo devem ser feitas através de tokens de design e props controladas, ou via `$attrs` para casos de uso muito específicos e justificados. O agente deve priorizar o uso de tokens e mixins do DSS para estilização.

## 4. Governança de Tokens e CSS

O `DssFooter` deve utilizar os seguintes tokens de design para garantir a consistência visual e a aderência aos padrões do Design System Sansys:

- **Elevação (Elevated):**
  - **Tokens:** `--dss-elevation-2` ou `--dss-shadow-md`.
  - **Descrição:** Para a propriedade `elevated`, o `DssFooter` deve aplicar uma sombra que simule uma elevação sutil. É crucial notar que, como o token de sombra invertida (`--dss-elevation-up-*`) não está disponível, uma exceção (EXC-05) deve ser documentada. Esta exceção permitirá o uso de um valor equivalente invertido de `--dss-shadow-md` para garantir que a sombra seja projetada para cima, conforme o comportamento esperado para footers e navbars. Isso assegura que o componente se destaque do conteúdo de forma padronizada.
  - **Governança:** O agente deve garantir que a implementação CSS para a elevação utilize esses tokens e que a exceção seja claramente justificada e documentada, evitando a introdução de valores hardcoded sem controle.

- **Borda (Bordered):**
  - **Tokens:** `--dss-border-width-sm` (para a espessura), `solid` (para o estilo da linha) e `--dss-border-subtle` (para a cor).
  - **Descrição:** Para a propriedade `bordered`, o `DssFooter` deve aplicar uma borda superior discreta. Esta borda, com espessura `sm` e cor `subtle`, oferece uma alternativa visualmente mais leve à elevação, ideal para layouts que demandam uma separação mais limpa e menos proeminente. A borda deve ser aplicada especificamente no `border-top` do componente.
  - **Governança:** A aplicação desses tokens deve ser direta e não deve ser sobrescrita por estilos arbitrários. A consistência na aplicação de bordas é fundamental para a coesão visual do DSS.

- **Cor de Fundo:**
  - **Token:** `--dss-surface-base`.
  - **Descrição:** O `QFooter` nativo do Quasar aplica a cor `hub` por padrão. No entanto, o `DssFooter` deve sobrescrever essa cor para `--dss-surface-base` (que representa um fundo branco/escuro padrão, dependendo do tema). A responsabilidade pela cor de `brand` (como `hub`, `water`, `waste`) deve ser delegada ao `DssToolbar` interno, permitindo que o footer atue como um container neutro e adaptável.
  - **Governança:** O agente deve garantir que a sobrescrita da cor de fundo seja feita de forma eficaz, possivelmente utilizando `!important` conforme documentado na EXC-02, para garantir que `--dss-surface-base` seja o valor dominante. A delegação da cor de `brand` para o `DssToolbar` é um ponto crítico de governança.

## 5. Acessibilidade e Estados

A acessibilidade é um pilar fundamental no Design System Sansys. Para o `DssFooter`, as seguintes diretrizes devem ser rigorosamente seguidas:

- **Role Semântico:**
  - **Descrição:** O `QFooter` do Quasar, por padrão, atribui o atributo `role="contentinfo"` ao elemento HTML do footer. Esta semântica é crucial e deve ser preservada no `DssFooter`. O `contentinfo` role identifica o rodapé como uma "landmark" (marco) na página, indicando que ele contém informações de contato, direitos autorais, links de privacidade, etc. Isso é vital para usuários de tecnologias assistivas, que podem navegar pela página usando essas landmarks.
  - **Governança:** O agente deve garantir que o `DssFooter` mantenha o `role="contentinfo"` e que nenhuma sobrescrita ou remoção desse atributo ocorra, a menos que haja uma justificativa formal e aprovada que altere a natureza semântica do componente.

- **Estados Aplicáveis e Interatividade:**
  - **Descrição:** O `DssFooter` é concebido como um **container estrutural de layout 100% não-interativo**. Isso significa que ele não deve possuir ou responder a estados de interação típicos de componentes interativos, como `:hover`, `:focus` ou `:active`. Os únicos "estados" que se aplicam ao `DssFooter` são aqueles relacionados à sua apresentação visual, como `elevated` (com sombra) e `bordered` (com borda superior).
  - **Governança:** O agente deve validar que o CSS e a lógica do componente não introduzam estilos ou comportamentos interativos para o `DssFooter` em si. Qualquer interatividade deve ser delegada aos componentes internos (como `DssToolbar` ou links contidos nele), que são projetados para lidar com esses estados de forma acessível.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssFooter.example.vue` deve cobrir uma variedade de cenários para demonstrar a flexibilidade e o uso correto do componente. Cada exemplo deve ser autocontido e ilustrar um caso de uso específico:

1.  **Básico:**
    -   **Descrição:** Um footer simples, contendo um `DssToolbar` com informações básicas como texto de copyright, links de política de privacidade ou termos de uso. Este exemplo deve focar na estrutura mínima necessária para um footer funcional.
    -   **Código de Exemplo (Vue.js):**
        ```vue
        <template>
          <DssFooter>
            <DssToolbar>
              <p>&copy; 2026 Sansys. Todos os direitos reservados.</p>
              <DssButton flat label="Política de Privacidade" />
            </DssToolbar>
          </DssFooter>
        </template>
        ```

2.  **Elevated:**
    -   **Descrição:** Demonstra o `DssFooter` com a propriedade `elevated` ativada, exibindo a sombra projetada para cima. Este cenário é importante para visualizar como o footer se destaca do conteúdo da página, especialmente em layouts com rolagem.
    -   **Código de Exemplo (Vue.js):**
        ```vue
        <template>
          <DssFooter elevated>
            <DssToolbar>
              <p>Footer elevado com destaque visual.</p>
            </DssToolbar>
          </DssFooter>
        </template>
        ```

3.  **Bordered:**
    -   **Descrição:** Apresenta o `DssFooter` com a propriedade `bordered` ativada, mostrando a borda superior sutil. Este exemplo contrasta com o `elevated`, oferecendo uma alternativa de separação visual mais discreta.
    -   **Código de Exemplo (Vue.js):**
        ```vue
        <template>
          <DssFooter bordered>
            <DssToolbar>
              <p>Footer com borda superior para separação sutil.</p>
            </DssToolbar>
          </DssFooter>
        </template>
        ```

4.  **Com Brand (Cores de Marca):**
    -   **Descrição:** Ilustra como a cor de `brand` (como `hub`, `water`, `waste`) é aplicada ao `DssToolbar` interno, e não diretamente ao `DssFooter`. Este exemplo reforça a governança de tokens, onde o footer permanece neutro e o toolbar assume a responsabilidade pela identidade visual da marca.
    -   **Código de Exemplo (Vue.js):**
        ```vue
        <template>
          <DssFooter>
            <DssToolbar brand="hub">
              <p>Footer com toolbar de marca 'hub'.</p>
            </DssToolbar>
          </DssFooter>
        </template>
        ```

5.  **Com Múltiplos Toolbars:**
    -   **Descrição:** Um cenário mais complexo onde o `DssFooter` contém dois `DssToolbar` empilhados. Isso pode ser útil para organizar diferentes seções de conteúdo no rodapé, como navegação secundária e informações de copyright separadas.
    -   **Código de Exemplo (Vue.js):**
        ```vue
        <template>
          <DssFooter>
            <DssToolbar>
              <DssButton flat label="Mapa do Site" />
              <DssButton flat label="Contato" />
            </DssToolbar>
            <DssToolbar>
              <p>&copy; 2026 Sansys. Versão 2.0</p>
            </DssToolbar>
          </DssFooter>
        </template>
        ```

> **Nota para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe, os exemplos do `DssFooter` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 300px">` nativo temporariamente, para que o footer renderize corretamente no Storybook/Playground.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssFooter` requer um contexto de layout para funcionar (elevação, posicionamento fixo). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas no arquivo `DssFooter.example.vue`** para fins de demonstração. O código fonte do componente (`DssFooter.ts.vue`) permanece 100% aderente aos gates. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md — exemplo.vue tem contexto de scaffolding.

### EXC-02: Uso de !important para sobrescrever background-color do QFooter
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** O `QFooter` do Quasar aplica `bg-hub !important` via sistema de classes utilitárias quando a prop `color` não é passada. Para que `--dss-surface-base` governe o fundo, é necessário `!important`. A prop `color` do `QFooter` é bloqueada no `DssFooter` (governança DSS). Este `!important` é estritamente contido no escopo do elemento `.dss-footer` e não afeta filhos.

### EXC-03: System color keywords em forced-colors mode
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Em forced-colors mode, system color keywords (`Canvas`, `CanvasText`, `ButtonFace`) são obrigatórios, pois tokens CSS são ignorados pelo navegador. Padrão canônico DSS.

### EXC-04: Valores hardcoded em @media print
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Em impressão monocromática, tokens CSS podem não ser resolvidos. Valores hardcoded garantem legibilidade. `position: static` cancela o `position: fixed` do `QFooter` para evitar que o footer apareça flutuando na impressão. Precedente: `DssHeader`, `DssToolbar`.

---

## 8. Superfície de Playground

Para garantir a testabilidade e a documentação interativa do `DssFooter`, a superfície de playground (Storybook/Docs) deve expor os seguintes controles e estados:

### 8.1. Controles Obrigatórios

- **`elevated` (Boolean):** Um toggle para ativar/desativar a elevação do footer.
- **`bordered` (Boolean):** Um toggle para ativar/desativar a borda superior do footer.
- **Conteúdo do Slot (Texto/Componente):** Um controle para simular diferentes conteúdos dentro do `DssToolbar` aninhado, permitindo testar a flexibilidade do footer com textos curtos, longos ou outros componentes.

### 8.2. Composite Logic (Lógica Concreta)

O playground deve demonstrar a interação do `DssFooter` com seu conteúdo interno (`DssToolbar`) e o layout geral da página. Exemplos de lógica a serem testados:

- **Altura Dinâmica:** Verificar se a altura do `DssFooter` se ajusta automaticamente ao conteúdo do `DssToolbar` sem a necessidade de props de altura explícitas.
- **Comportamento `reveal`:** Simular a rolagem da página para cima e para baixo para validar o comportamento de `reveal` (footer escondendo e reaparecendo).
- **Z-Index:** Confirmar que o `DssFooter` mantém seu `z-index` nativo e não interfere com modais ou drawers que possam ser abertos sobre ele.

### 8.3. Estados a Expor

| Estado | Descrição |
| :--- | :--- |
| `default` | Footer padrão, sem elevação ou borda, com fundo `--dss-surface-base`. |
| `elevated` | Footer com sombra projetada para cima (`--dss-elevation-2` / `--dss-shadow-md` invertida). |
| `bordered` | Footer com borda superior sutil (`--dss-border-width-sm` solid `--dss-border-subtle`). |
| `reveal` | Footer que se esconde ao rolar para baixo e reaparece ao rolar para cima. |
