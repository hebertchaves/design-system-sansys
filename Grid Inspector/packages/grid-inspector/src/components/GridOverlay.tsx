import { useEffect, useState, RefObject } from 'react';

interface GridOverlayProps {
  columns: number;
  showAnnotations?: boolean;
  gutter?: number;
  margin?: number;
  padding?: number;
  gutterY?: number;
  marginY?: number;
  paddingY?: number;
  rowHeight?: number;
  rows?: number;
  type?: 'columnar' | 'modular' | 'asymmetric';
  contentRef?: RefObject<HTMLDivElement>;
  contentSelector?: string;
  layoutGutterY?: number;
  layoutMarginY?: number;
  showRows?: boolean;
  /** Row index to highlight (from clicking a violation in the panel) */
  highlightedElementIndex?: number | null;
}

export function GridOverlay({
  columns,
  showAnnotations = false,
  gutter = 24,
  margin = 48,
  padding = 24,
  gutterY = 24,
  marginY = 48,
  paddingY = 24,
  rowHeight: _rowHeight = 80,
  rows: _rows = 8,
  type = 'columnar',
  contentRef,
  contentSelector,
  layoutGutterY: _layoutGutterY = 0,
  layoutMarginY: _layoutMarginY = 0,
  showRows = true,
  highlightedElementIndex = null,
}: GridOverlayProps) {
  // 🔧 LER CSS VARIABLES PARA CONTROLES AVANÇADOS
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [showColumns, setShowColumns] = useState(true);
  
  // 🆕 SEPARAR CONTROLES X E Y
  const [showGapsX, setShowGapsX] = useState(true);
  const [showGapsY, setShowGapsY] = useState(true);
  const [showPaddingX, setShowPaddingX] = useState(true);
  const [showPaddingY, setShowPaddingY] = useState(true);
  const [showMarginX, setShowMarginX] = useState(true);
  const [showMarginY, setShowMarginY] = useState(true);
  
  const [containerMaxWidth, setContainerMaxWidth] = useState('1440px');
  
  // 🆕 AUTO COLUMN WIDTH - Controla se colunas usam 1fr ou largura fixa
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);

  // 🔧 CALCULAR LARGURA FIXA QUANDO AUTO = OFF (para não estourar o breakpoint)
  const calculateFixedColumnWidth = (): string => {
    if (autoColumnWidth) return '1fr';
    
    // Parse do breakpoint (ex: "1440px" -> 1440)
    const breakpointValue = parseInt(containerMaxWidth);
    if (isNaN(breakpointValue)) return '100px'; // fallback
    
    // Calcular espaço disponível: breakpoint - (2 * margin) - ((columns - 1) * gutter)
    const availableWidth = breakpointValue - (2 * margin) - ((columns - 1) * gutter);
    const columnWidth = availableWidth / columns;
    
    return `${columnWidth}px`;
  };

  // Full measured bounds of the content container (viewport-relative)
  const [contentBounds, setContentBounds] = useState<{
    top: number; height: number; left: number; width: number;
  } | null>(null);

  // Bounds of the actual layout container ([data-grid-body]) — respects max-width + centering.
  // Used for column area positioning so the overlay follows the layout when breakpoint narrows it.
  const [layoutBounds, setLayoutBounds] = useState<{
    top: number; height: number; left: number; width: number;
  } | null>(null);

  // Unique CSS grid rows detected from DOM children, grouped by top position
  const [componentRows, setComponentRows] = useState<Array<{ top: number; height: number }>>([]);

  useEffect(() => {
    const resolveTarget = (): Element | null => {
      if (contentRef?.current) return contentRef.current;
      if (contentSelector) return document.querySelector(contentSelector);
      return null;
    };

    const target = resolveTarget();
    if (!target) return;

    const measureComponents = () => {
      const container = resolveTarget();
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      setContentBounds({
        top: containerRect.top,
        height: containerRect.height,
        left: containerRect.left,
        width: containerRect.width,
      });

      // Measure layout container bounds ([data-grid-body]) separately.
      // This element has max-width + margin:auto applied, so its left/width
      // reflect the actual centered layout — not the full content area.
      const layoutEl = container.querySelector('[data-grid-body]');
      if (layoutEl) {
        const lr = layoutEl.getBoundingClientRect();
        setLayoutBounds({ top: lr.top, height: lr.height, left: lr.left, width: lr.width });
      } else {
        setLayoutBounds(null);
      }

      let gridElements: Element[];
      // Priority 1: element with data-grid-rows attribute — explicit DSS contract
      // Allows deeply-nested components to declare their own row container
      // regardless of how many wrapper levels exist between container and rows.
      const markedRowsContainer = container.querySelector('[data-grid-rows]');
      if (markedRowsContainer) {
        gridElements = Array.from(markedRowsContainer.children);
      } else if (contentSelector && !contentRef?.current) {
        gridElements = Array.from(container.children);
      } else {
        const firstChild = container.querySelector(':scope > *');
        if (!firstChild) return;
        gridElements = Array.from(firstChild.children);
      }

      if (gridElements.length === 0) return;

      // Group children that share the same CSS grid row (same top position ±2px)
      const rowMap = new Map<number, { top: number; height: number }>();
      const TOLERANCE = 2;

      gridElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const relTop = rect.top - containerRect.top;

        let matched: number | undefined;
        for (const [key] of rowMap) {
          if (Math.abs(key - relTop) <= TOLERANCE) { matched = key; break; }
        }

        if (matched === undefined) {
          rowMap.set(relTop, { top: relTop, height: rect.height });
        } else {
          const existing = rowMap.get(matched)!;
          if (rect.height > existing.height) rowMap.set(matched, { ...existing, height: rect.height });
        }
      });

      setComponentRows(Array.from(rowMap.values()).sort((a, b) => a.top - b.top));
    };

    measureComponents();

    const resizeObserver = new ResizeObserver(measureComponents);
    resizeObserver.observe(target as HTMLElement);
    // Also observe [data-grid-body] — its size changes when --dss-layout-max-width changes
    const layoutEl = (resolveTarget() as Element | null)?.querySelector('[data-grid-body]');
    if (layoutEl) resizeObserver.observe(layoutEl as HTMLElement);
    // Give CSS-var-triggered reflows time to settle before first measure
    const timeoutId = setTimeout(measureComponents, 300);

    // Re-measure on scroll (position changes aren't tracked by ResizeObserver)
    const onScroll = () => requestAnimationFrame(measureComponents);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef, contentSelector]);

  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === 'undefined') return;
      
      const root = getComputedStyle(document.documentElement);
      
      // Ler opacidade do overlay
      const opacity = root.getPropertyValue('--grid-overlay-opacity').trim();
      if (opacity) setOverlayOpacity(parseFloat(opacity) || 1);
      
      // Ler visibilidade de camadas
      const cols = root.getPropertyValue('--grid-show-columns').trim();
      if (cols) setShowColumns(cols === '1');
      
      // 🆕 Ler visibilidade separada para X e Y
      const gapsX = root.getPropertyValue('--grid-show-gaps-x').trim();
      if (gapsX) setShowGapsX(gapsX === '1');
      
      const gapsY = root.getPropertyValue('--grid-show-gaps-y').trim();
      if (gapsY) setShowGapsY(gapsY === '1');
      
      const padX = root.getPropertyValue('--grid-show-padding-x').trim();
      if (padX) setShowPaddingX(padX === '1');
      
      const padY = root.getPropertyValue('--grid-show-padding-y').trim();
      if (padY) {
        setShowPaddingY(padY === '1');
      }
      
      const marX = root.getPropertyValue('--grid-show-margin-x').trim();
      if (marX) setShowMarginX(marX === '1');
      
      const marY = root.getPropertyValue('--grid-show-margin-y').trim();
      if (marY) {
        setShowMarginY(marY === '1');
      }
      
      // 🆕 Ler container type e breakpoint width
      void root.getPropertyValue('--grid-container-type').trim(); // reserved for future use
      const breakpoint = root.getPropertyValue('--grid-breakpoint-width').trim();
      
      // 🔧 SEMPRE aplicar breakpoint como limite, a diferença está no comportamento do container
      if (breakpoint) {
        setContainerMaxWidth(breakpoint);
      } else {
        setContainerMaxWidth('1440px'); // fallback padrão
      }
      
      // 🆕 Ler auto column width
      const autoWidth = root.getPropertyValue('--grid-auto-column-width').trim();
      if (autoWidth) {
        setAutoColumnWidth(autoWidth === '1');
      }
    };

    updateFromCSSVars();
    
    // Observar mudanças nas CSS Variables
    const observer = new MutationObserver(updateFromCSSVars);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  const renderColumnarGrid = () => {
    // Outer area covers the full content container height (rows are measured relative to this).
    const outerStyle: React.CSSProperties = contentBounds
      ? { position: 'absolute', top: contentBounds.top, left: 0, right: 0, height: contentBounds.height, pointerEvents: 'none' }
      : { position: 'absolute', inset: 0, pointerEvents: 'none' };

    // Column area: prefer layoutBounds ([data-grid-body]) so that overlay columns
    // follow the layout when max-width + margin:auto are applied (breakpoint centering).
    // Falls back to contentBounds when no data-grid-body is present.
    const colBounds = layoutBounds || contentBounds;
    const columnAreaStyle: React.CSSProperties = colBounds
      ? { position: 'absolute', top: 0, bottom: 0, left: colBounds.left, width: colBounds.width, pointerEvents: 'none' }
      : { position: 'absolute', top: 0, bottom: 0, left: `${margin}px`, right: `${margin}px`, pointerEvents: 'none' };

    return (
      <div style={outerStyle}>
        {/* ── COLUMN AREA (anchored to actual content container) ── */}
        <div style={columnAreaStyle}>
          <div
            className="h-full grid relative"
            style={{
              gridTemplateColumns: `repeat(${columns}, ${calculateFixedColumnWidth()})`,
              gap: `${gutter}px`,
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <div
                key={i}
                className="relative h-full"
                style={{ zIndex: 15, pointerEvents: 'none' }}
              >
                {/* Camada de COLUNA (rose) */}
                {showColumns && (
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: `rgba(251, 207, 232, ${0.4 * overlayOpacity})`,
                      borderColor: `rgba(244, 114, 182, ${0.6 * overlayOpacity})`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      pointerEvents: 'none',
                    }}
                  >
                    {showAnnotations && (
                      <div
                        className="absolute top-2 left-2 text-xs font-mono font-bold z-10 px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${0.8 * overlayOpacity})`,
                          color: `rgba(190, 18, 60, ${overlayOpacity})`,
                          pointerEvents: 'none',
                        }}
                      >
                        {i + 1}
                      </div>
                    )}
                  </div>
                )}

                {/* Camada de PADDING (green) */}
                {showPaddingX && (
                  <div
                    className="absolute inset-0 border-dashed transition-all duration-300"
                    style={{
                      margin: `0 ${padding}px`,
                      backgroundColor: `rgba(187, 247, 208, ${0.6 * overlayOpacity})`,
                      borderColor: `rgba(74, 222, 128, ${0.7 * overlayOpacity})`,
                      borderWidth: '1px',
                      borderStyle: 'dashed',
                      pointerEvents: 'none',
                    }}
                  >
                    {showAnnotations && i === 0 && (
                      <div
                        className="absolute -top-5 left-0 text-xs font-mono font-semibold px-1.5 py-0.5 rounded shadow-sm"
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                          color: `rgba(21, 128, 61, ${overlayOpacity})`,
                          pointerEvents: 'none',
                        }}
                      >
                        {padding}px padding
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
        {/* ── End column area ── */}

        {/* ── MARGIN X: bands inside the layout container at `margin` px from each edge ── */}
        {/* Uses colBounds (layoutBounds preferred) so margin bands align with the column area */}
        {showMarginX && colBounds && margin > 0 && (
          <>
            {/* Left margin band */}
            <div
              style={{
                position: 'absolute', top: 0, bottom: 0,
                left: colBounds.left, width: margin,
                borderRight: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`,
                backgroundColor: `rgba(253,186,116,${0.25 * overlayOpacity})`,
                zIndex: 50, pointerEvents: 'none',
              }}
            >
              {showAnnotations && (
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontFamily: 'monospace', fontWeight: 600, background: `rgba(255,255,255,${0.9*overlayOpacity})`, color: `rgba(194,65,12,${overlayOpacity})`, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                  {margin}px
                </div>
              )}
            </div>
            {/* Right margin band */}
            <div
              style={{
                position: 'absolute', top: 0, bottom: 0,
                left: colBounds.left + colBounds.width - margin, width: margin,
                borderLeft: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`,
                backgroundColor: `rgba(253,186,116,${0.25 * overlayOpacity})`,
                zIndex: 50, pointerEvents: 'none',
              }}
            />
          </>
        )}

        {/* ── MARGIN Y: top/bottom bands inside the content bounds ── */}
        {showMarginY && marginY > 0 && (
          <>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: marginY, zIndex: 60, pointerEvents: 'none', borderBottom: `2px dashed rgba(249,115,22,${0.8*overlayOpacity})`, backgroundColor: `rgba(253,186,116,${0.12*overlayOpacity})` }}>
              {showAnnotations && <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, fontFamily: 'monospace', fontWeight: 600, background: `rgba(255,255,255,${0.9*overlayOpacity})`, color: `rgba(194,65,12,${overlayOpacity})`, padding: '2px 6px', borderRadius: 4, pointerEvents: 'none' }}>{marginY}px margin Y</div>}
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: marginY, zIndex: 60, pointerEvents: 'none', borderTop: `2px dashed rgba(249,115,22,${0.8*overlayOpacity})`, backgroundColor: `rgba(253,186,116,${0.12*overlayOpacity})` }} />
          </>
        )}

        {/* ── ROWS — one per CSS grid row (top already measured from DOM, no extra offset) ── */}
        {showRows && componentRows.map((row, i) => {
          const isHighlighted = highlightedElementIndex === i;
          return (
            <div
              key={`row-${i}`}
              style={{
                position: 'absolute', left: 0, right: 0, pointerEvents: 'none',
                top: row.top, height: row.height,
                zIndex: isHighlighted ? 30 : 20,
              }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundColor: isHighlighted ? `rgba(239,68,68,${0.25*overlayOpacity})` : `rgba(251,207,232,${0.3*overlayOpacity})`,
                  borderTop: `${isHighlighted ? 2 : 1}px solid rgba(${isHighlighted ? '239,68,68' : '244,114,182'},${isHighlighted ? 0.9 : 0.5}*${overlayOpacity})`,
                  borderBottom: `${isHighlighted ? 2 : 1}px solid rgba(${isHighlighted ? '239,68,68' : '244,114,182'},${isHighlighted ? 0.9 : 0.5}*${overlayOpacity})`,
                  outline: isHighlighted ? `2px solid rgba(239,68,68,0.8)` : 'none',
                }}
              >
                {showAnnotations && (
                  <div style={{ position: 'absolute', top: 4, right: 8, fontSize: 11, fontFamily: 'monospace', fontWeight: 700, background: `rgba(255,255,255,${0.8*overlayOpacity})`, color: `rgba(190,18,60,${overlayOpacity})`, padding: '2px 5px', borderRadius: 3, zIndex: 10, pointerEvents: 'none' }}>
                    Row {i + 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ── PADDING Y — dashed green lines inside each row ── */}
        {showPaddingY && paddingY > 0 && componentRows.map((row, i) => (
          <div
            key={`pad-y-${i}`}
            style={{ position: 'absolute', left: 0, right: 0, pointerEvents: 'none', top: row.top, height: row.height, zIndex: 25 }}
          >
            <div style={{ position: 'absolute', inset: `${paddingY}px 0`, pointerEvents: 'none', borderTop: `2px dashed rgba(34,197,94,${0.9*overlayOpacity})`, borderBottom: `2px dashed rgba(34,197,94,${0.9*overlayOpacity})` }}>
              {showAnnotations && i === 0 && (
                <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontFamily: 'monospace', fontWeight: 600, background: `rgba(255,255,255,${0.95*overlayOpacity})`, color: `rgba(21,128,61,${overlayOpacity})`, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                  {paddingY}px padding Y
                </div>
              )}
            </div>
          </div>
        ))}

        {/* ── GAP Y — band between consecutive rows, sized by gutterY prop ── */}
        {showGapsY && gutterY > 0 && componentRows.length > 1 && componentRows.slice(0, -1).map((row, i) => {
          const gapTop = row.top + row.height;
          return (
            <div
              key={`gap-y-${i}`}
              style={{
                position: 'absolute', left: 0, right: 0, pointerEvents: 'none',
                top: gapTop, height: gutterY, zIndex: 18,
                backgroundColor: `rgba(191,219,254,${0.6*overlayOpacity})`,
                borderTop: `1px solid rgba(96,165,250,${0.7*overlayOpacity})`,
                borderBottom: `1px solid rgba(96,165,250,${0.7*overlayOpacity})`,
              }}
            >
              {showAnnotations && i === 0 && (
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, fontFamily: 'monospace', fontWeight: 600, background: `rgba(255,255,255,${0.9*overlayOpacity})`, color: `rgba(37,99,235,${overlayOpacity})`, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                  {gutterY}px gap Y
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderModularGrid = () => {
    const moduleSize = 64;
    const rows = Math.floor(800 / (moduleSize + gutter));
    
    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      >
        <div 
          className="h-full mx-auto grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, ${moduleSize}px)`,
            gap: showGapsX ? `${gutter}px` : '0px',
            paddingLeft: `${margin}px`,
            paddingRight: `${margin}px`,
            maxWidth: containerMaxWidth
          }}
        >
          {Array.from({ length: columns * rows }).map((_, i) => (
            showColumns && (
              <div
                key={i}
                className="bg-emerald-200/40 border border-emerald-400/60 transition-all duration-300"
              />
            )
          ))}
        </div>
      </div>
    );
  };

  const renderAsymmetricGrid = () => {
    const asymmetricColumns = '2fr 3fr 2fr 5fr';
    
    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      >
        <div 
          className="h-full mx-auto grid"
          style={{
            gridTemplateColumns: asymmetricColumns,
            gap: showGapsX ? `${gutter}px` : '0px',
            paddingLeft: `${margin}px`,
            paddingRight: `${margin}px`,
            maxWidth: containerMaxWidth
          }}
        >
          {['2fr', '3fr', '2fr', '5fr'].map((size, i) => (
            showColumns && (
              <div
                key={i}
                className="bg-orange-200/40 border border-orange-400/60 relative transition-all duration-300"
              >
                {showAnnotations && (
                  <div className="absolute top-2 left-2 text-xs font-mono text-orange-700 font-bold bg-white/80 px-1.5 py-0.5 rounded">
                    {size}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  if (type === 'modular') return renderModularGrid();
  if (type === 'asymmetric') return renderAsymmetricGrid();
  return renderColumnarGrid();
}