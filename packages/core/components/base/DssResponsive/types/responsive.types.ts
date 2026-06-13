// DssResponsive — TypeScript interfaces

export type DssBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface DssResponsiveProps {
  /** Breakpoints on which to show the slot content. Alias for showOn. */
  breakpoint?: DssBreakpoint[]
  /** Breakpoints on which to show the slot content. Takes priority over hideOn. */
  showOn?: DssBreakpoint[]
  /** Breakpoints on which to hide the slot content. */
  hideOn?: DssBreakpoint[]
  /** HTML tag to render as the wrapper element. */
  tag?: string
}

export interface DssResponsiveSlotScope {
  /** Active breakpoint identifier. */
  currentBreakpoint: DssBreakpoint
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  /** True when currentBreakpoint is xs or sm. */
  isMobile: boolean
  /** True when currentBreakpoint is md, lg, or xl. */
  isDesktop: boolean
}

export interface DssResponsiveSlots {
  default: (scope: DssResponsiveSlotScope) => unknown
}
