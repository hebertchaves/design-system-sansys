// DssParallax — TypeScript interfaces

export interface DssParallaxProps {
  /** URL da imagem de fundo para o efeito de paralaxe */
  src?: string
  /**
   * Altura do componente em pixels.
   * @default 500
   */
  height?: number
  /**
   * Velocidade do efeito de paralaxe.
   * 0 = sem movimento (fundo estático), 1 = movimento na mesma velocidade do scroll.
   * @default 0.5
   */
  speed?: number
  /**
   * Elemento alvo para o cálculo de scroll.
   * Aceita CSS selector ou referência ao elemento DOM.
   * Quando não definido, usa `window`.
   */
  scrollTarget?: string | Element
  /**
   * Texto alternativo para acessibilidade (WCAG 1.1.1).
   * Obrigatório para paralaxe que transmite conteúdo significativo.
   * Em dev mode, aviso é emitido se nem `alt` nem `decorative` forem fornecidos.
   */
  alt?: string
  /**
   * Marca o componente como puramente decorativo.
   * Quando `true`, nenhum texto alternativo é necessário — a imagem
   * de fundo é invisível a leitores de tela por natureza (CSS background).
   */
  decorative?: boolean
}

export interface DssParallaxSlots {
  /**
   * Conteúdo renderizado como overlay sobre o efeito de paralaxe.
   * Ex: título de hero, chamada para ação, badge.
   */
  default: () => unknown
}
