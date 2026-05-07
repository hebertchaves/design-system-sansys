# Pré-prompt: DssParallax

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssBadge

### Golden Context
O DssParallax é um componente de exibição que permite criar efeitos visuais de paralaxe em elementos da interface do usuário. Ele é projetado para ser usado em conjunto com rolagem, onde o conteúdo de fundo se move em uma velocidade diferente do conteúdo em primeiro plano, criando uma ilusão de profundidade. É um componente não-interativo, focado puramente na apresentação visual.

### Justificativa
O DssParallax é essencial para adicionar dinamismo e modernidade às interfaces, melhorando a experiência do usuário através de efeitos visuais atraentes. Ele permite a criação de seções de herói, banners e outros elementos visuais que reagem à rolagem de forma suave e performática, sem a necessidade de implementações complexas e personalizadas em cada projeto.

## 2. RISCOS ARQUITETURAIS E GATES

- **Performance:** O uso excessivo ou incorreto de efeitos de paralaxe pode impactar negativamente a performance da página, especialmente em dispositivos móveis ou com recursos limitados. Deve-se garantir que a implementação seja otimizada e que o componente ofereça controles para mitigar esses riscos (ex: desabilitar em dispositivos de baixa performance).
- **Acessibilidade:** Efeitos de movimento podem causar desconforto ou tontura em alguns usuários. É crucial que o componente respeite as preferências de movimento reduzido do sistema operacional (`prefers-reduced-motion`) e ofereça uma alternativa estática ou menos intensa quando necessário.
- **Compatibilidade entre navegadores:** Garantir que o efeito de paralaxe funcione consistentemente em diferentes navegadores e plataformas, considerando as variações na implementação de APIs de rolagem e renderização.
- **Complexidade de uso:** O componente deve ser fácil de configurar e usar, evitando a exposição de detalhes de implementação complexos para o desenvolvedor. A API deve ser intuitiva e bem documentada.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Quasar Componente/Propriedade | DSS Componente/Propriedade | Observações |
| :---------------------------- | :------------------------- | :---------- |
| `QParallax`                   | `DssParallax`              | Componente principal. |
| `src`                         | `src`                      | URL da imagem de fundo. |
| `height`                      | `height`                   | Altura do componente. |
| `speed`                       | `speed`                    | Velocidade do efeito de paralaxe (0 a 1). |
| `factor`                      | `factor`                   | Fator de rolagem para o efeito. |
| `scroll-target`               | `scrollTarget`             | Elemento alvo para rolagem. |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssParallax deve utilizar exclusivamente os tokens numéricos/padrão do DSS para espaçamento, raio, duração e cores de superfície. NENHUM token com sufixo semântico não existente deve ser inventado.

**Exemplos de uso de tokens:**

- `padding`: `--dss-spacing-16` (para espaçamento interno)
- `border-radius`: `--dss-radius-md`
- `background-color`: `--dss-surface-default`
- `transition-duration`: `--dss-duration-250`

**Tokens permitidos:**

- **Espaçamento:** `--dss-spacing-1` a `--dss-spacing-96`
- **Raio:** `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full`
- **Duração:** `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300`
- **Superfície:** `--dss-surface-default`, `--dss-surface-variant`, `--dss-surface-inverse` (e outros tokens de superfície definidos no DSS)

## 5. ACESSIBILIDADE E ESTADOS

- **`prefers-reduced-motion`:** O componente DEVE detectar e respeitar a preferência do usuário por movimento reduzido. Quando detectado, o efeito de paralaxe deve ser desabilitado ou substituído por uma transição estática/suave.
- **Foco e Navegação por Teclado:** Como um componente não-interativo, o DssParallax não deve receber foco ou interferir na navegação por teclado. Se houver conteúdo interativo dentro do paralaxe, este deve ser acessível de forma independente.
- **Conteúdo Alternativo:** Para imagens de fundo importantes, garantir que haja um texto alternativo (`alt text`) apropriado para leitores de tela.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

- **Dependências:** O DssParallax pode depender de bibliotecas de utilitários para detecção de rolagem e cálculo de posição, como o `Intersection Observer API` ou bibliotecas de animação otimizadas. A dependência do Quasar `QParallax` é a principal.
- **Composição:** O DssParallax é um componente de composição, projetado para envolver outros elementos de conteúdo. Ele não deve ter lógica de negócios interna, mas sim fornecer um contêiner para a aplicação do efeito de paralaxe. Pode ser composto com `DssImg` ou `DssVideo` para o conteúdo de fundo.

## 7. EXCEÇÕES PREVISTAS

- **Conteúdo Interativo Interno:** Embora o DssParallax seja não-interativo, ele pode conter elementos interativos. Nesses casos, a acessibilidade e o comportamento desses elementos devem ser gerenciados pelos próprios componentes internos, sem interferência do DssParallax.
- **Desempenho Crítico:** Em cenários de desempenho extremamente crítico, onde cada milissegundo conta, o uso do DssParallax pode ser desaconselhado ou exigir otimizações adicionais específicas do projeto.
- **Navegadores Antigos:** O suporte a navegadores muito antigos que não possuem APIs modernas de rolagem ou animação pode ser limitado ou exigir polyfills, o que deve ser uma exceção documentada.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles

- **`src` (String):** URL da imagem de fundo.
- **`height` (String/Number):** Altura do componente (ex: '300px', '50vh', 300).
- **`speed` (Number):** Velocidade do efeito de paralaxe (0 a 1, padrão: 0.5).
- **`factor` (Number):** Fator de rolagem para o efeito (padrão: 0.1).
- **`scrollTarget` (String/HTMLElement):** Seletor CSS ou referência direta ao elemento que será o alvo da rolagem. Padrão: `window`.
- **`alt` (String):** Texto alternativo para a imagem de fundo, para acessibilidade.

### Composite Logic

O DssParallax deve encapsular um slot padrão (`<slot />`) para o conteúdo que será exibido sobre o efeito de paralaxe. A lógica interna deve calcular a posição do fundo com base na rolagem do `scrollTarget` e aplicar transformações CSS para criar o efeito de paralaxe, respeitando o `speed` e `factor` configurados. Deve haver uma lógica para desabilitar o efeito se `prefers-reduced-motion` for detectado.

### Estados a Expor

- **`isReducedMotion` (Boolean):** Indica se a preferência de movimento reduzido do usuário está ativa.
- **`isIntersecting` (Boolean):** Indica se o componente está visível na viewport (útil para otimizações de carregamento).
- **`scrollPosition` (Number):** Posição de rolagem atual do `scrollTarget` (para depuração ou lógica avançada de composição).