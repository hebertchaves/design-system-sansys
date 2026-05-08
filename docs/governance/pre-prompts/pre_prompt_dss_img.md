# Pré-prompt: DssImg

## 1. CLASSIFICAÇÃO E CONTEXTO
- **Golden Reference:** DssBadge
- **Golden Context:** Exibição de imagens com suporte a lazy loading, placeholders, fallback de erro e proporções (aspect ratio) controladas.
- **Justificativa:** O `DssImg` encapsula o `q-img` do Quasar, garantindo que o carregamento de imagens siga as diretrizes de performance, acessibilidade (alt text obrigatório) e design (bordas arredondadas, proporções) do Design System, evitando o uso de tags `<img>` nativas sem tratamento de erro. O componente é essencial para garantir uma experiência visual consistente e robusta em toda a aplicação, lidando com os desafios comuns de carregamento de mídia na web.

## 2. RISCOS ARQUITETURAIS E GATES
- **Gate de Performance:** Imagens muito grandes podem impactar o LCP (Largest Contentful Paint). O componente deve suportar lazy loading por padrão e permitir configuração de `loading="eager"` apenas quando necessário, como em imagens acima da dobra (above the fold). O uso de formatos modernos como WebP e AVIF deve ser encorajado através da documentação.
- **Gate de Acessibilidade:** O atributo `alt` deve ser obrigatório ou fortemente encorajado para imagens não-decorativas. A falta de um texto alternativo adequado prejudica usuários de leitores de tela e a indexação por motores de busca.
- **Gate de Estabilidade:** Falhas no carregamento da imagem (erro 404, problemas de rede) não devem quebrar o layout. Um fallback visual (ícone ou cor de fundo) deve ser exibido de forma consistente, garantindo que a interface permaneça utilizável e esteticamente agradável mesmo em condições adversas.
- **Gate de Responsividade:** O componente deve se adaptar fluidamente a diferentes tamanhos de tela, respeitando as proporções definidas e evitando distorções na imagem.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
- `src` -> `src` (String, obrigatório): A URL da imagem a ser carregada.
- `alt` -> `alt` (String, obrigatório para acessibilidade): Texto alternativo que descreve a imagem.
- `ratio` -> `ratio` (Number/String, mapeado para proporções padrão do DSS, ex: 1, 4/3, 16/9, 21/9): Define a proporção da imagem, garantindo que o espaço seja reservado antes do carregamento completo, evitando layout shifts.
- `fit` -> `fit` (String, default: 'cover' - aceita 'contain', 'fill', 'none', 'scale-down'): Define como a imagem deve se ajustar ao container.
- `loading` -> `loading` (String, default: 'lazy'): Controla o comportamento de carregamento da imagem. 'lazy' adia o carregamento até que a imagem esteja próxima de entrar na viewport.
- `spinner-color` -> Omitido (O DSS define o spinner padrão internamente usando tokens de cor, garantindo consistência visual).
- `error-src` -> `fallbackSrc` (String, imagem de fallback em caso de erro): Permite especificar uma imagem alternativa caso a principal falhe.
- `position` -> `position` (String, default: '50% 50%'): Define o alinhamento da imagem dentro do container quando `fit` é 'cover' ou 'contain'.

## 4. GOVERNANÇA DE TOKENS E CSS
- **Raio de Borda:** Utilizar `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` para cantos arredondados, dependendo do contexto de uso (ex: avatares usam `full`, thumbnails usam `md`).
- **Superfície (Placeholder/Fallback):** Utilizar `--dss-surface-default` ou `--dss-surface-disabled` para o fundo enquanto a imagem carrega ou em caso de erro.
- **Cores de Marca:** Em casos específicos onde a imagem precisa interagir com as cores da marca, utilizar `--dss-action-hub`, `--dss-action-water`, `--dss-action-waste` e suas respectivas superfícies como `--dss-action-hub-surface`.
- **Transições:** Utilizar `--dss-duration-250` para o fade-in da imagem após o carregamento, proporcionando uma experiência visual suave.
- **Espaçamento:** Não aplicar margens internas (`padding`), o componente deve respeitar o container. Se necessário, usar `--dss-spacing-4` etc. no container pai.
- **Foco:** Se a imagem for interativa (ex: dentro de um botão ou link), o anel de foco deve ser gerenciado pelo elemento pai, ou usar `outline: 2px solid white` se estritamente necessário no próprio componente.

## 5. ACESSIBILIDADE E ESTADOS
- **Estados:**
  - *Loading:* Exibe um skeleton ou spinner com cor de superfície neutra. O espaço da imagem deve ser reservado para evitar Cumulative Layout Shift (CLS).
  - *Loaded:* Imagem exibida com transição suave (fade-in). O placeholder é removido.
  - *Error:* Exibe um ícone de erro ou imagem de fallback com `--dss-surface-disabled`. O usuário deve ser visualmente informado de que a imagem não pôde ser carregada.
- **Acessibilidade:**
  - O atributo `alt` deve descrever o conteúdo da imagem de forma concisa e clara.
  - Se a imagem for puramente decorativa, `alt=""` deve ser explicitamente passado (ou o componente deve tratar `decorative: true`), instruindo os leitores de tela a ignorá-la.
  - Ocultar placeholders e spinners de leitores de tela (`aria-hidden="true"`) para evitar ruído desnecessário durante a navegação.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO
- **Quasar:** `QImg` (núcleo do componente), `QIcon` (para fallback de erro), `QSpinner` (para loading).
- **DSS:** Pode utilizar `DssIcon` internamente para o estado de erro, caso o DSS possua um componente de ícone padronizado. O uso de componentes internos do DSS garante que as atualizações de design sejam propagadas automaticamente.

## 7. EXCEÇÕES PREVISTAS
- **Imagens SVG Inline:** O `DssImg` não é otimizado para SVGs inline complexos que precisam de manipulação de CSS (para isso, usar `DssIcon` ou similar). É focado em imagens raster (JPG, PNG, WebP) ou SVGs externos via `src`.
- **Imagens de Fundo:** Não deve ser usado como substituto para `background-image` em containers complexos, embora o `fit="cover"` cubra a maioria dos casos de uso simples. Para layouts muito complexos, o CSS nativo pode ser mais apropriado.
- **Imagens de Alta Frequência:** Em cenários onde dezenas de imagens pequenas são renderizadas simultaneamente (ex: uma grade densa de avatares), o overhead do componente pode ser notável. Nesses casos, uma abordagem mais leve pode ser necessária, embora o `DssImg` deva ser a escolha padrão.

## 8. SUPERFÍCIE DE PLAYGROUND
- **Controles Obrigatórios:**
  - `src` (Input de texto para URL da imagem)
  - `alt` (Input de texto)
  - `ratio` (Select: auto, 1, 4/3, 16/9, 21/9)
  - `fit` (Select: cover, contain, fill, none)
  - `radius` (Select: none, sm, md, lg, full)
  - `loading` (Select: lazy, eager)
  - `fallbackSrc` (Input de texto para URL da imagem de fallback)
- **Composite Logic:**
  - Alternar entre uma URL válida e uma URL quebrada para testar o estado de erro e o fallback visual.
  - Testar diferentes proporções (`ratio`) em um container com largura fixa para verificar se o espaço é reservado corretamente antes do carregamento.
  - Simular uma conexão lenta (throttling no navegador) para observar o estado de loading e a transição de fade-in.
- **Estados a Expor:**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Carregando (Loading) | O componente está aguardando o carregamento da imagem. Exibe um placeholder ou spinner, reservando o espaço necessário. | Funcional | Prop `loading=true` |
| Carregado com sucesso (Loaded) | A imagem foi carregada e exibida com sucesso, com uma transição suave. | Funcional | Operação concluída |
| Erro no carregamento (Error Fallback) | Ocorreu um erro ao carregar a imagem. Um fallback visual (ícone ou imagem alternativa) é exibido para manter a integridade do layout. | Funcional | Prop `error=true` ou validação |
