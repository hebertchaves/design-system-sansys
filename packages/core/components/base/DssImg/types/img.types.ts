// DssImg — TypeScript interfaces

export interface DssImgProps {
  /** URL da imagem a ser carregada */
  src?: string
  /** Texto alternativo — obrigatório para imagens não-decorativas (WCAG 1.1.1) */
  alt?: string
  /**
   * Marca a imagem como puramente decorativa.
   * Quando `true`, o `alt` é definido como `""` automaticamente
   * e leitores de tela ignoram o elemento.
   */
  decorative?: boolean
  /**
   * Proporção de aspecto da imagem (largura / altura).
   * Reserva o espaço antes do carregamento — evita CLS.
   * Ex: `16/9` = 1.778, `4/3` = 1.333, `1` = quadrado.
   */
  ratio?: number | string
  /** Como a imagem se ajusta ao container (object-fit) */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  /** Comportamento de carregamento. `lazy` adia até a imagem entrar na viewport */
  loading?: 'lazy' | 'eager'
  /** Imagem de fallback exibida quando `src` falha */
  fallbackSrc?: string
  /**
   * LQIP (Low Quality Image Placeholder): imagem de baixa qualidade exibida
   * enquanto a imagem principal carrega. Substitui o spinner padrão se fornecida.
   */
  placeholderSrc?: string
  /** Posição da imagem dentro do container (equivalente a background-position) */
  position?: string
  /**
   * Raio de borda (border-radius) do container.
   * Aplicado com `overflow: hidden` via QImg para clicar corretamente a imagem.
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /** Desativa a transição de fade-in ao carregar */
  noTransition?: boolean
}

export interface DssImgEmits {
  /** Disparado quando a imagem carregou com sucesso */
  (e: 'load'): void
  /** Disparado quando o carregamento da imagem falhou */
  (e: 'error'): void
}

export interface DssImgSlots {
  /** Overlay sobre a imagem carregada — renderizado acima do `<img>` */
  default: () => unknown
  /** Indicador de carregamento customizado — padrão: DssSpinner centralizado */
  loading: () => unknown
  /** Estado de erro customizado — padrão: ícone `broken_image` centralizado */
  error: () => unknown
}
