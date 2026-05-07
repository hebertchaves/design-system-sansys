# Pré-prompt: DssImg

## 1. CLASSIFICAÇÃO E CONTEXTO
- **Golden Reference:** DssBadge
- **Golden Context:** Exibição de imagens com suporte a lazy loading, placeholders, fallback de erro e proporções (aspect ratio) controladas.
- **Justificativa:** O `DssImg` encapsula o `q-img` do Quasar, garantindo que o carregamento de imagens siga as diretrizes de performance, acessibilidade (alt text obrigatório) e design (bordas arredondadas, proporções) do Design System, evitando o uso de tags `<img>` nativas sem tratamento de erro.

## 2. RISCOS ARQUITETURAIS E GATES
- **Gate de Performance:** Imagens muito grandes podem impactar o LCP (Largest Contentful Paint). O componente deve suportar lazy loading por padrão e permitir configuração de `loading="eager"` apenas quando necessário.
- **Gate de Acessibilidade:** O atributo `alt` deve ser obrigatório ou fortemente encorajado para imagens não-decorativas.
- **Gate de Estabilidade:** Falhas no carregamento da imagem (erro 404) não devem quebrar o layout; um fallback visual (ícone ou cor de fundo) deve ser exibido.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
- `src` -> `src` (String, obrigatório)
- `alt` -> `alt` (String, obrigatório para acessibilidade)
- `ratio` -> `ratio` (Number/String, mapeado para proporções padrão do DSS, ex: 1, 4/3, 16/9)
- `fit` -> `fit` (String, default: 'cover' - aceita 'contain', 'fill', 'none', 'scale-down')
- `loading` -> `loading` (String, default: 'lazy')
- `spinner-color` -> Omitido (O DSS define o spinner padrão internamente usando tokens de cor)
- `error-src` -> `fallbackSrc` (String, imagem de fallback em caso de erro)

## 4. GOVERNANÇA DE TOKENS E CSS
- **Raio de Borda:** Utilizar `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` para cantos arredondados.
- **Superfície (Placeholder/Fallback):** Utilizar `--dss-surface-default` ou `--dss-surface-disabled` para o fundo enquanto a imagem carrega ou em caso de erro.
- **Transições:** Utilizar `--dss-duration-250` para o fade-in da imagem após o carregamento.
- **Espaçamento:** Não aplicar margens internas (`padding`), o componente deve respeitar o container. Se necessário, usar `--dss-spacing-4` etc. no container pai.

## 5. ACESSIBILIDADE E ESTADOS
- **Estados:**
  - *Loading:* Exibe um skeleton ou spinner com cor de superfície neutra.
  - *Loaded:* Imagem exibida com transição suave (fade-in).
  - *Error:* Exibe um ícone de erro ou imagem de fallback com `--dss-surface-disabled`.
- **Acessibilidade:**
  - O atributo `alt` deve descrever o conteúdo da imagem.
  - Se a imagem for puramente decorativa, `alt=""` deve ser explicitamente passado (ou o componente deve tratar `decorative: true`).
  - Ocultar placeholders e spinners de leitores de tela (`aria-hidden="true"`).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO
- **Quasar:** `QImg`, `QIcon` (para fallback de erro), `QSpinner` (para loading).
- **DSS:** Pode utilizar `DssIcon` internamente para o estado de erro, caso o DSS possua um componente de ícone padronizado.

## 7. EXCEÇÕES PREVISTAS
- **Imagens SVG Inline:** O `DssImg` não é otimizado para SVGs inline complexos que precisam de manipulação de CSS (para isso, usar `DssIcon` ou similar). É focado em imagens raster (JPG, PNG, WebP) ou SVGs externos via `src`.
- **Imagens de Fundo:** Não deve ser usado como substituto para `background-image` em containers complexos, embora o `fit="cover"` cubra a maioria dos casos de uso.

## 8. SUPERFÍCIE DE PLAYGROUND
- **Controles:**
  - `src` (Input de texto para URL da imagem)
  - `alt` (Input de texto)
  - `ratio` (Select: auto, 1, 4/3, 16/9, 21/9)
  - `fit` (Select: cover, contain, fill, none)
  - `radius` (Select: none, sm, md, lg, full)
- **Composite Logic:**
  - Alternar entre uma URL válida e uma URL quebrada para testar o estado de erro e o fallback.
  - Testar diferentes proporções (`ratio`) em um container com largura fixa.
- **Estados a Expor:**
  - Carregando (Loading)
  - Carregado com sucesso (Loaded)
  - Erro no carregamento (Error Fallback)