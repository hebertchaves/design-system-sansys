// DssCarousel — TypeScript interfaces

// ─── DssCarousel ─────────────────────────────────────────────────────────────

export interface DssCarouselProps {
  /** Slide atual via v-model (nome ou índice do QCarouselSlide) */
  modelValue: string | number
  /** Ativa animação de transição entre slides (padrão DSS: true) */
  animated?: boolean
  /** Permite swipe/arrasto para navegar (padrão DSS: true) */
  swipeable?: boolean
  /** Orientação vertical — slides empilham de cima para baixo */
  vertical?: boolean
  /** Loop infinito — ao atingir o último slide, retorna ao primeiro */
  infinite?: boolean
  /** Autoplay: true = 5000ms; Number = intervalo em ms */
  autoplay?: boolean | number
  /** Altura do carousel (ex: '200px', '50vh') — obrigatório para altura fixa */
  height?: string
  /** Espaçamento interno para não sobrepor as setas de navegação ao conteúdo */
  padding?: boolean
  /** Exibe setas de navegação anterior / próximo */
  arrows?: boolean
  /** Ícone Material Icons para a seta anterior */
  prevIcon?: string
  /** Ícone Material Icons para a seta próxima */
  nextIcon?: string
  /** Exibe pontos de paginação (indicadores de slide) */
  navigation?: boolean
  /** Posição dos pontos de paginação em relação ao carousel */
  navigationPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Ícone Material Icons para o indicador de paginação ativo */
  navigationActiveIcon?: string
  /** Ícone Material Icons para o indicador de paginação inativo */
  navigationIcon?: string
  /** Exibe miniaturas dos slides */
  thumbnails?: boolean
  /** Estilo visual dos botões de controle */
  controlType?: 'regular' | 'flat' | 'outline' | 'push' | 'unelevated'
  /** Ativa modo fullscreen */
  fullscreen?: boolean
  /** Mantém slides não visíveis no cache do Vue (KeepAlive) */
  keepAlive?: boolean
  /** Nomes dos slides incluídos no keep-alive */
  keepAliveInclude?: string | RegExp | (string | RegExp)[]
  /** Nomes dos slides excluídos do keep-alive */
  keepAliveExclude?: string | RegExp | (string | RegExp)[]
  /** Número máximo de slides mantidos no cache keep-alive */
  keepAliveMax?: number
  /**
   * Rótulo acessível para o landmark region do carousel.
   * RECOMENDADO para acessibilidade WCAG 2.1 AA.
   * Exemplo: "Galeria de imagens do produto"
   */
  ariaLabel?: string
}

export interface DssCarouselEmits {
  /** Disparado quando o slide visível muda */
  (e: 'update:modelValue', value: string | number): void
  /** Disparado antes da animação de transição de slide */
  (e: 'before-transition', newSlide: string | number, oldSlide: string | number): void
  /** Disparado após a animação de transição de slide completar */
  (e: 'transition', newSlide: string | number, oldSlide: string | number): void
  /** Disparado ao entrar/sair do modo fullscreen */
  (e: 'fullscreen', value: boolean): void
}

export interface DssCarouselSlots {
  /**
   * Conteúdo do carousel: componentes DssCarouselSlide e opcionalmente
   * QCarouselControl para controles customizados de navegação.
   */
  default: () => unknown
}

// ─── DssCarouselSlide ─────────────────────────────────────────────────────────

export interface DssCarouselSlideProps {
  /**
   * Nome único do slide — referenciado pelo v-model do DssCarousel.
   * Obrigatório para navegação correta.
   */
  name: string | number
  /** Desabilita este slide (pula na navegação automática) */
  disable?: boolean
  /** URL de imagem de fundo para o slide */
  imgSrc?: string
  /** Estilo inline da imagem de fundo */
  imgStyle?: Record<string, string> | string | Record<string, string>[]
  /** Classe CSS da imagem de fundo */
  imgClass?: Record<string, boolean> | string | (Record<string, boolean> | string)[]
}

export interface DssCarouselSlideSlots {
  /** Conteúdo do slide — qualquer markup ou componente DSS */
  default: () => unknown
}
