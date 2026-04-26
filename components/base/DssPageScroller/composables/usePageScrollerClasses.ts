// ==========================================================================
// DssPageScroller — usePageScrollerClasses
// ==========================================================================
// Classes são estáticas — sem variantes de modificador.
// Retorna array readonly sem computed (zero dependências reativas).

export function usePageScrollerClasses() {
  const scrollerClasses = ['dss-page-scroller'] as const
  return { scrollerClasses }
}
