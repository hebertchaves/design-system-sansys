# Pré-prompt: DssVideo

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference

Para o componente `DssVideo`, que é um componente não-interativo de exibição de mídia, o **Golden Reference** é o `DssBadge`.

### Golden Context

O `DssVideo` é um componente para incorporar e exibir conteúdo de vídeo. Ele deve ser flexível para aceitar diferentes fontes de vídeo (locais, URLs externas como YouTube/Vimeo) e fornecer controles básicos de reprodução (play, pause, volume, tela cheia) quando aplicável. A sua principal função é a apresentação visual de conteúdo dinâmico, sem interação complexa além dos controles de mídia.

### Justificativa

A criação do `DssVideo` é justificada pela necessidade de padronizar a exibição de vídeos em todas as aplicações que utilizam o Design System. Isso garante uma experiência de usuário consistente, performance otimizada e conformidade com padrões de acessibilidade, além de reduzir o esforço de desenvolvimento ao reutilizar um componente bem definido e testado.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais

*   **Compatibilidade de Formatos:** Risco de não suportar todos os formatos de vídeo desejados ou codecs, levando a problemas de reprodução em diferentes navegadores/dispositivos.
*   **Performance:** Carregamento de vídeos grandes pode impactar a performance da página. Necessidade de lazy loading e otimização de recursos.
*   **Segurança (CORS/XSS):** Ao carregar vídeos de fontes externas, há riscos de segurança relacionados a Cross-Origin Resource Sharing (CORS) e Cross-Site Scripting (XSS).
*   **Acessibilidade:** Garantir que os controles de vídeo e o próprio vídeo sejam acessíveis para usuários com deficiência (legendas, audiodescrição, navegação por teclado).
*   **Dependência de Terceiros:** Se forem utilizadas bibliotecas ou APIs de terceiros (ex: YouTube Iframe API), há o risco de mudanças nessas APIs que possam quebrar o componente.

### Gates

*   **Gate 1: Prova de Conceito de Reprodução:** Demonstração de reprodução de vídeo local e de uma URL externa (YouTube) com controles básicos.
*   **Gate 2: Otimização de Performance:** Avaliação do impacto de performance com vídeos de diferentes tamanhos e implementação de estratégias de otimização (ex: lazy loading).
*   **Gate 3: Testes de Acessibilidade:** Validação completa da acessibilidade do componente, incluindo navegação por teclado, legendas e compatibilidade com leitores de tela.
*   **Gate 4: Testes de Segurança:** Análise de vulnerabilidades de segurança, especialmente ao lidar com conteúdo externo.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssVideo` será construído sobre o componente `QVideo` do Quasar, estendendo suas funcionalidades e aplicando o design do DSS.

| Propriedade Quasar (`QVideo`) | Propriedade DSS (`DssVideo`) | Descrição | Observações | Tipo | Padrão |
| :---------------------------- | :--------------------------- | :-------- | :---------- | :--- | :----- |
| `src`                         | `src`                        | URL ou caminho do vídeo. | Obrigatório. | `string` | `''` |
| `ratio`                       | `aspectRatio`                | Proporção do vídeo (ex: '16/9'). | Pode ser um token DSS para proporções comuns. | `string` | `'16/9'` |
| `autoplay`                    | `autoplay`                   | Inicia a reprodução automaticamente. | | `boolean` | `false` |
| `loop`                        | `loop`                       | Repete o vídeo. | | `boolean` | `false` |
| `controls`                    | `showControls`               | Exibe os controles nativos do vídeo. | O DSS pode adicionar controles customizados. | `boolean` | `true` |
| `volume`                      | `volume`                     | Volume inicial do vídeo (0 a 1). | | `number` | `0.5` |
| `muted`                       | `muted`                      | Inicia o vídeo mudo. | | `boolean` | `false` |
| `poster`                      | `poster`                     | Imagem de capa antes do vídeo carregar. | | `string` | `''` |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssVideo` utilizará exclusivamente tokens do Design System para espaçamento, raio de borda, cores de superfície e durações de transição.

### Espaçamento

*   **Margens e Preenchimentos Internos:** `--dss-spacing-X` (ex: `--dss-spacing-4` para padding interno, `--dss-spacing-8` para margem externa).

### Raio de Borda

*   **Bordas Arredondadas:** `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` (ex: `--dss-radius-md` para bordas padrão do player).

### Cores de Superfície

*   **Fundo do Player/Controles:** `--dss-surface-default`, `--dss-surface-variant`.

### Duração de Transição

*   **Transições de Controles:** `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300` (ex: `--dss-duration-250` para fade-in/out de controles).

**Tokens SEMÂNTICOS NÃO PERMITIDOS:** `--dss-padding-md`, `--dss-margin-lg`, `--dss-duration-base`.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade

*   **Controles de Teclado:** Todos os controles de reprodução devem ser navegáveis e operáveis via teclado (Tab, Enter, Espaço).
*   **Legendas e Audiodescrição:** Suporte para faixas de legendas (WebVTT) e audiodescrição, com opções de ativação/desativação.
*   **Atributos ARIA:** Uso adequado de `aria-label`, `aria-controls`, `aria-live` para informar o estado do player e dos controles a tecnologias assistivas.
*   **Foco Visual:** Indicação clara do elemento focado para navegação por teclado.

### Estados

*   **Carregando:** Indicador visual enquanto o vídeo está sendo carregado.
*   **Reproduzindo:** Ícone de pause visível, barra de progresso atualizando.
*   **Pausado:** Ícone de play visível.
*   **Erro:** Mensagem de erro clara e feedback visual em caso de falha na reprodução.
*   **Mudo:** Ícone de volume com indicação de mudo.
*   **Tela Cheia:** Botão de tela cheia com estado alternado.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências

*   **Quasar Framework:** `QVideo` (base do componente).
*   **Vue.js:** Para a reatividade e ciclo de vida do componente.
*   **Ícones DSS:** Para os ícones dos controles de reprodução (play, pause, volume, tela cheia).

### Composição

O `DssVideo` pode ser composto por:

*   `DssButton` (para controles de play/pause, volume, tela cheia).
*   `DssSlider` (para barra de progresso e controle de volume).
*   `DssIcon` (para os ícones dos controles).
*   `DssSpinner` (para o estado de carregamento).

## 7. EXCEÇÕES PREVISTAS

*   **Vídeos sem Controles:** Em casos específicos, o `DssVideo` pode ser configurado para não exibir controles, funcionando como um background de vídeo ou elemento puramente visual.
*   **Fontes Não Suportadas:** Se uma URL de vídeo for de um provedor não explicitamente suportado (ex: um serviço de streaming muito específico), o componente deve falhar graciosamente, talvez exibindo uma mensagem de erro ou um fallback.
*   **DRM (Digital Rights Management):** O `DssVideo` não terá suporte nativo a DRM. Vídeos protegidos por DRM precisarão de soluções externas ou customizadas.
*   **Eventos de Mídia Customizados:** Embora o componente forneça eventos básicos, eventos de mídia muito específicos (ex: `onseeking`, `onstalled`) podem não ser expostos diretamente, exigindo acesso ao elemento `video` nativo.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles

*   **`src` (string):** Campo de texto para inserir a URL ou caminho do vídeo.
*   **`aspectRatio` (string):** Dropdown com opções como '16/9', '4/3', '1/1'.
*   **`autoplay` (boolean):** Toggle switch para ativar/desativar autoplay.
*   **`loop` (boolean):** Toggle switch para ativar/desativar loop.
*   **`showControls` (boolean):** Toggle switch para exibir/ocultar controles.
*   **`volume` (number):** Slider para ajustar o volume (0 a 1).
*   **`muted` (boolean):** Toggle switch para ativar/desativar mudo.
*   **`poster` (string):** Campo de texto para inserir a URL da imagem de capa.

### Composite Logic

*   **Alternância de Ícones:** Lógica para alternar entre ícones de play/pause com base no estado de reprodução.
*   **Sincronização de Barra de Progresso:** Lógica para atualizar a barra de progresso com base no tempo atual do vídeo e duração total.
*   **Manipulação de Eventos:** Lógica para lidar com eventos de mídia (play, pause, ended, timeupdate, volumechange) e atualizar o estado interno do componente.
*   **Fallback de Erro:** Lógica para exibir uma mensagem de erro amigável se o vídeo não puder ser carregado ou reproduzido.

### Estados a Expor

*   **`isPlaying` (boolean):** Indica se o vídeo está reproduzindo.
*   **`currentTime` (number):** Tempo atual de reprodução do vídeo em segundos.
*   **`duration` (number):** Duração total do vídeo em segundos.
*   **`isMuted` (boolean):** Indica se o vídeo está mudo.
*   **`currentVolume` (number):** Volume atual do vídeo (0 a 1).
*   **`hasError` (boolean):** Indica se ocorreu um erro na reprodução do vídeo.
*   **`isLoading` (boolean):** Indica se o vídeo está carregando.