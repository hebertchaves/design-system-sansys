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
  contentRef?: RefObject<HTMLDivElement>; // 🆕 REF para detectar elementos reais
  layoutGutterY?: number; // 🆕 Gap Y do layout real (para compensar na medição)
  layoutMarginY?: number; // 🆕 Margin Y do layout real (para compensar na medição)
  showRows?: boolean; // 🆕 Controle de visibilidade dos rows
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
  rowHeight = 80,
  rows = 8,
  type = 'columnar',
  contentRef,
  layoutGutterY = 0,
  layoutMarginY = 0,
  showRows = true
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

  // 🆕 DETECTAR ELEMENTOS DO LAYOUT REAL - State para armazenar posições dos componentes
  const [componentRows, setComponentRows] = useState<Array<{ top: number; height: number }>>([]);

  // 🆕 EFFECT para medir componentes reais do layout
  useEffect(() => {
    if (!contentRef?.current) return;

    const measureComponents = () => {
      const container = contentRef.current;
      if (!container) return;

      // 🔧 Encontrar TODOS os filhos do primeiro wrapper (GridSections e outros componentes)
      // Vamos mais fundo: pegar o primeiro filho > seus filhos (GridSections)
      const firstChild = container.querySelector(':scope > *');
      if (!firstChild) return;
      
      const gridElements = Array.from(firstChild.children);
      
      if (gridElements.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const rows: Array<{ top: number; height: number }> = [];

      gridElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top;
        
        // 🎯 COMPENSAR o gap Y e margin Y do layout para manter o overlay independente
        // Subtrair: margin Y do layout + gap Y acumulado (index * layoutGutterY)
        const compensatedTop = relativeTop - layoutMarginY - (index * layoutGutterY);
        
        rows.push({
          top: compensatedTop,
          height: rect.height
        });
      });

      setComponentRows(rows);
    };

    // Medir na montagem
    measureComponents();

    // Remedir quando o layout mudar
    const resizeObserver = new ResizeObserver(measureComponents);
    resizeObserver.observe(contentRef.current);

    // Remedir quando os props de grid mudarem
    const timeoutId = setTimeout(measureComponents, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [contentRef, gutterY, marginY, paddingY, layoutGutterY, layoutMarginY]); // Remedir quando props Y mudarem

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
      const containerType = root.getPropertyValue('--grid-container-type').trim();
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
    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      >
        <div 
          className="h-full mx-auto relative"
          style={{
            paddingLeft: `${margin}px`,
            paddingRight: `${margin}px`,
            maxWidth: containerMaxWidth
          }}
        >
          {/* Container do GRID (sem gap CSS - apenas visual) */}
          <div 
            className="h-full grid relative"
            style={{
              gridTemplateColumns: `repeat(${columns}, ${calculateFixedColumnWidth()})`,
              gap: `${gutter}px`, // Gap do CSS Grid para espaçamento real
            }}
          >
            {/* COLUNAS - RENDERIZADAS COM Z-INDEX ALTO */}
            {Array.from({ length: columns }).map((_, i) => (
              <div
                key={i}
                className="relative h-full"
                style={{ zIndex: 15 }} // z-index para ficar acima do conteúdo base mas abaixo de Gap Y/Padding Y
              >
                {/* Camada de COLUNA (rose) */}
                {showColumns && (
                  <div 
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: `rgba(251, 207, 232, ${0.4 * overlayOpacity})`, // rose-200/40 com opacidade dinâmica
                      borderColor: `rgba(244, 114, 182, ${0.6 * overlayOpacity})`, // rose-400/60 com opacidade dinâmica
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    {showAnnotations && (
                      <div 
                        className="absolute top-2 left-2 text-xs font-mono font-bold z-10 px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${0.8 * overlayOpacity})`,
                          color: `rgba(190, 18, 60, ${overlayOpacity})` // rose-700
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
                      backgroundColor: `rgba(187, 247, 208, ${0.6 * overlayOpacity})`, // green-200/60 com opacidade dinâmica
                      borderColor: `rgba(74, 222, 128, ${0.7 * overlayOpacity})`, // green-400/70 com opacidade dinâmica
                      borderWidth: '1px',
                      borderStyle: 'dashed'
                    }}
                  >
                    {showAnnotations && i === 0 && (
                      <div 
                        className="absolute -top-5 left-0 text-xs font-mono font-semibold px-1.5 py-0.5 rounded shadow-sm"
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                          color: `rgba(21, 128, 61, ${overlayOpacity})` // green-700
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
          
          {/* Indicador visual de GAP (blue) - CAMADA INFERIOR */}
          {showGapsX && gutter > 0 && showAnnotations && (
            <div 
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{ 
                left: `${margin}px`,
                right: `${margin}px`,
                zIndex: 3 // z-index INFERIOR às colunas (5)
              }}
            >
              {Array.from({ length: columns - 1 }).map((_, i) => {
                // Calcular largura de cada coluna
                const containerWidth = `calc(100% - ${margin * 2}px)`;
                const columnWidth = `calc((100% - ${gutter * (columns - 1)}px) / ${columns})`;
                
                return (
                  <div
                    key={`gap-${i}`}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `calc(${i + 1} * (${columnWidth} + ${gutter}px) - ${gutter}px)`,
                      width: `${gutter}px`,
                      backgroundColor: `rgba(191, 219, 254, ${0.6 * overlayOpacity})`, // blue-200/60 com opacidade dinâmica
                      borderLeftWidth: '1px',
                      borderRightWidth: '1px',
                      borderLeftColor: `rgba(96, 165, 250, ${0.7 * overlayOpacity})`, // blue-400/70 com opacidade dinâmica
                      borderRightColor: `rgba(96, 165, 250, ${0.7 * overlayOpacity})`, // blue-400/70 com opacidade dinâmica
                      borderLeftStyle: 'solid',
                      borderRightStyle: 'solid'
                    }}
                  >
                    {i === 0 && (
                      <div 
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono font-semibold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                          color: `rgba(37, 99, 235, ${overlayOpacity})` // blue-600
                        }}
                      >
                        {gutter}px gap
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Container para indicadores de margem (X e Y) */}
        <div 
          className="absolute mx-auto"
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            maxWidth: containerMaxWidth,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {/* Margens laterais (X) - Orange - MOVIDAS PARA DENTRO DO CONTAINER CENTRALIZADO */}
          {showMarginX && showAnnotations && (
            <>
              <div 
                className="absolute left-0 top-0 bottom-0 border-r-2 border-dashed transition-all duration-300" 
                style={{ 
                  width: `${margin}px`,
                  borderRightColor: `rgba(249, 115, 22, ${0.6 * overlayOpacity})`, // orange-500/60 com opacidade dinâmica
                  zIndex: 50
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono font-semibold px-2 py-1 rounded shadow-sm whitespace-nowrap"
                  style={{ 
                    backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                    color: `rgba(194, 65, 12, ${overlayOpacity})` // orange-700
                  }}
                >
                  {margin}px margin
                </div>
              </div>
              <div 
                className="absolute right-0 top-0 bottom-0 border-l-2 border-dashed transition-all duration-300" 
                style={{ 
                  width: `${margin}px`,
                  borderLeftColor: `rgba(249, 115, 22, ${0.6 * overlayOpacity})`, // orange-500/60 com opacidade dinâmica
                  zIndex: 50
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono font-semibold px-2 py-1 rounded shadow-sm whitespace-nowrap"
                  style={{ 
                    backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                    color: `rgba(194, 65, 12, ${overlayOpacity})` // orange-700
                  }}
                >
                  {margin}px margin
                </div>
              </div>
            </>
          )}

          {/* Margem Y Superior - ORANGE dashed (alinhado com Margin L/R) */}
          {showMarginY && showAnnotations && marginY > 0 && (
            <div 
              className="absolute left-0 right-0 top-0 border-b-2 border-dashed transition-all duration-300" 
              style={{ 
                height: `${marginY}px`, 
                zIndex: 60,
                borderBottomColor: `rgba(249, 115, 22, ${0.8 * overlayOpacity})` // orange-500/80 com opacidade dinâmica
              }}
              data-grid-debug="margin-y-top"
            >
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono font-semibold px-2 py-1 rounded shadow-sm" 
                style={{ 
                  zIndex: 65,
                  backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                  color: `rgba(194, 65, 12, ${overlayOpacity})` // orange-700
                }}
              >
                {marginY}px margin Y [TOP]
              </div>
            </div>
          )}

          {/* Margem Y Inferior - ORANGE dashed (alinhado com Margin L/R) */}
          {showMarginY && showAnnotations && marginY > 0 && (
            <div 
              className="absolute left-0 right-0 bottom-0 border-t-2 border-dashed transition-all duration-300" 
              style={{ 
                height: `${marginY}px`, 
                zIndex: 60,
                borderTopColor: `rgba(249, 115, 22, ${0.8 * overlayOpacity})` // orange-500/80 com opacidade dinâmica
              }}
              data-grid-debug="margin-y-bottom"
            >
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono font-semibold px-2 py-1 rounded shadow-sm" 
                style={{ 
                  zIndex: 65,
                  backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                  color: `rgba(194, 65, 12, ${overlayOpacity})` // orange-700
                }}
              >
                {marginY}px margin Y [BOTTOM]
              </div>
            </div>
          )}

          {/* 🆕 PADDING Y AGORA É RENDERIZADO DENTRO DE CADA ROW - Ver linha ~496 */}
          {/* Removido: Linhas globais antigas de Padding Y (tracejado grosso) que não respondiam ao Margin Y */}
          {/* Removido: Gap Y estático antigo - Agora usamos gaps dinâmicos entre rows (ver linha ~486) */}

          {/* 🆕 PADDING Y - Independente do toggle "Rows", controlado apenas por "Padding T/B" */}
          {showPaddingY && paddingY > 0 && componentRows.length > 0 && componentRows.map((row, i) => (
            <div
              key={`padding-y-${i}`}
              className="absolute left-0 right-0 pointer-events-none transition-all duration-300"
              style={{ 
                top: `${marginY + row.top + (i * gutterY)}px`,
                height: `${row.height}px`,
                zIndex: 25
              }}
            >
              {/* Linhas tracejadas de Padding Y (superior e inferior) */}
              <div 
                className="absolute inset-0 border-dashed transition-all duration-300"
                style={{ 
                  margin: `${paddingY}px 0`,
                  borderColor: `rgba(34, 197, 94, ${0.9 * overlayOpacity})`, // green-500/90 (mais evidente)
                  borderTopWidth: '2px', // Aumentado de 1px para 2px
                  borderBottomWidth: '2px', // Aumentado de 1px para 2px
                  borderTopStyle: 'dashed',
                  borderBottomStyle: 'dashed'
                }}
              >
                {/* Label do Padding Y - aparece em TODOS os rows */}
                {showAnnotations && (
                  <div 
                    className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold px-2 py-1 rounded shadow-sm whitespace-nowrap"
                    style={{ 
                      backgroundColor: `rgba(255, 255, 255, ${0.95 * overlayOpacity})`,
                      color: `rgba(21, 128, 61, ${overlayOpacity})` // green-700
                    }}
                  >
                    {paddingY}px padding Y
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 🆕 ROWS DINÂMICOS - Sincronizados com componentes reais do layout */}
          {showRows && componentRows.length > 0 && componentRows.map((row, i) => (
            <div
              key={`dynamic-row-${i}`}
              className="absolute left-0 right-0 pointer-events-none transition-all duration-300"
              style={{ 
                top: `${marginY + row.top + (i * gutterY)}px`, // 🎯 Adicionar marginY do overlay + gutterY acumulado
                height: `${row.height}px`,
                zIndex: 20
              }}
            >
              {/* Overlay de ROW (rose) - mesma cor das colunas */}
              <div 
                className="absolute inset-0 transition-all duration-300"
                style={{ 
                  backgroundColor: `rgba(251, 207, 232, ${0.3 * overlayOpacity})`, // rose-200/30
                  borderTopColor: `rgba(244, 114, 182, ${0.5 * overlayOpacity})`, // rose-400/50
                  borderBottomColor: `rgba(244, 114, 182, ${0.5 * overlayOpacity})`,
                  borderTopWidth: '1px',
                  borderBottomWidth: '1px',
                  borderTopStyle: 'solid',
                  borderBottomStyle: 'solid'
                }}
              >
                {showAnnotations && i === 0 && (
                  <div 
                    className="absolute top-1 right-2 text-xs font-mono font-bold z-10 px-1.5 py-0.5 rounded"
                    style={{ 
                      backgroundColor: `rgba(255, 255, 255, ${0.8 * overlayOpacity})`,
                      color: `rgba(190, 18, 60, ${overlayOpacity})` // rose-700
                    }}
                  >
                    Row {i + 1}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 🆕 GAP Y entre ROWS - Renderizado dinamicamente entre componentes */}
          {showGapsY && gutterY > 0 && showAnnotations && componentRows.length > 1 && componentRows.slice(0, -1).map((row, i) => (
            <div
              key={`dynamic-gap-y-${i}`}
              className="absolute left-0 right-0 pointer-events-none transition-all duration-300"
              style={{ 
                top: `${marginY + row.top + row.height + (i * gutterY)}px`, // 🎯 Adicionar marginY do overlay + posição + gaps acumulados
                height: `${gutterY}px`,
                zIndex: 18,
                backgroundColor: `rgba(191, 219, 254, ${0.6 * overlayOpacity})`, // blue-200/60
                borderTopColor: `rgba(96, 165, 250, ${0.7 * overlayOpacity})`, // blue-400/70
                borderBottomColor: `rgba(96, 165, 250, ${0.7 * overlayOpacity})`,
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid'
              }}
            >
              {i === 0 && (
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono font-semibold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
                  style={{ 
                    backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                    color: `rgba(37, 99, 235, ${overlayOpacity})` // blue-600
                  }}
                >
                  {gutterY}px gap Y
                </div>
              )}
            </div>
          ))}
        </div>
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