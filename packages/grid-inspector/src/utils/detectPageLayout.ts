/**
 * detectPageLayout
 *
 * Reads the real computed CSS values of the content container BEFORE
 * the inspector sets any CSS vars. Must be called synchronously inside
 * injectGridInspector, before createRoot().render().
 */

export interface DetectedLayout {
  columns: number;
  gapX: number;
  gapY: number;
  marginX: number;
  marginY: number;
  paddingX: number;
  paddingY: number;
}

export function detectPageLayout(contentSelector?: string): DetectedLayout | null {
  if (!contentSelector || typeof document === 'undefined') return null;

  const container = document.querySelector(contentSelector) as HTMLElement | null;
  if (!container) return null;

  const s = getComputedStyle(container);

  // Column count from resolved gridTemplateColumns
  const gtc = s.gridTemplateColumns;
  const columns =
    gtc && gtc !== 'none' && gtc.trim() !== ''
      ? gtc.trim().split(/\s+/).length
      : 12;

  const gapX = parseFloat(s.columnGap) || 0;
  const gapY = parseFloat(s.rowGap) || 0;

  // In test.html convention: the grid's padding-left IS the "margin X" layout var
  const marginX = parseFloat(s.paddingLeft) || 0;
  // margin-top of the container is the "margin Y" layout var
  const marginY = parseFloat(s.marginTop) || 0;

  // Padding = first child element (card) padding
  const firstChild = container.children[0] as HTMLElement | null;
  const cs = firstChild ? getComputedStyle(firstChild) : null;
  const paddingX = cs ? parseFloat(cs.paddingLeft) || 0 : 0;
  const paddingY = cs ? parseFloat(cs.paddingTop) || 0 : 0;

  return { columns, gapX, gapY, marginX, marginY, paddingX, paddingY };
}
