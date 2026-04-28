import { ReactNode, useEffect, useState, useRef } from 'react';
import { GridOverlay } from './GridOverlay';
import { BaselineGridOverlay } from './BaselineGridOverlay';

interface GridPageWrapperProps {
  children: ReactNode;
  showGrid: boolean;
  gridColumns: number;
  gridGutter: number;
  gridMargin: number;
  gridPadding: number;
  gridGutterY: number;
  gridMarginY: number;
  gridPaddingY: number;
  layoutGutterY?: number; // 🆕 Gap Y do layout real (para compensar no overlay)
  layoutMarginY?: number; // 🆕 Margin Y do layout real (para compensar no overlay)
  showRows?: boolean; // 🆕 Controle de visibilidade dos rows
}

export function GridPageWrapper({
  children,
  showGrid,
  gridColumns,
  gridGutter,
  gridMargin,
  gridPadding,
  gridGutterY,
  gridMarginY,
  gridPaddingY,
  layoutGutterY,
  layoutMarginY,
  showRows,
}: GridPageWrapperProps) {
  // 🆕 REF para o container de conteúdo
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 🔧 LER CSS VARIABLES PARA CONTROLES AVANÇADOS
  const [containerType, setContainerType] = useState<'fixed' | 'fluid'>('fluid');
  const [breakpointWidth, setBreakpointWidth] = useState('1440px');

  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === 'undefined') return;
      
      const root = getComputedStyle(document.documentElement);
      
      // Ler container type
      const type = root.getPropertyValue('--grid-container-type').trim();
      if (type) {
        console.log('📦 Container Type mudou para:', type);
        setContainerType(type as 'fixed' | 'fluid');
      }
      
      // Ler breakpoint width
      const width = root.getPropertyValue('--grid-breakpoint-width').trim();
      if (width) {
        console.log('📐 Breakpoint Width mudou para:', width);
        setBreakpointWidth(width);
      }
    };

    updateFromCSSVars();
    
    // Observar mudanças nas CSS Variables com polling adicional
    const observer = new MutationObserver(updateFromCSSVars);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });
    
    // 🆕 POLLING adicional para garantir sincronia
    const interval = setInterval(updateFromCSSVars, 500);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Aplicar max-width baseado no containerType e breakpoint
  const containerStyle = {
    // 🆕 SEMPRE aplicar max-width do breakpoint, mas no Fixed é rígido e no Fluid é apenas limite máximo
    maxWidth: breakpointWidth,
    margin: '0 auto',
    transition: 'max-width 0.3s ease-in-out',
    // 🆕 No modo Fluid, permite encolher abaixo do breakpoint (responsivo)
    // No modo Fixed, mantém a largura fixa
    width: containerType === 'fixed' ? breakpointWidth : '100%',
  };

  return (
    <div className="min-h-screen relative bg-slate-100">
      {/* Baseline Grid Overlay (sempre renderizado, controla visibilidade internamente) */}
      <BaselineGridOverlay />
      
      {/* Grid Overlay Horizontal + Vertical */}
      {showGrid && (
        <GridOverlay
          columns={gridColumns}
          gutter={gridGutter}
          margin={gridMargin}
          padding={gridPadding}
          gutterY={gridGutterY}
          marginY={gridMarginY}
          paddingY={gridPaddingY}
          rows={8}
          showAnnotations={true}
          contentRef={contentRef}
          layoutGutterY={layoutGutterY}
          layoutMarginY={layoutMarginY}
          showRows={showRows}
        />
      )}
      
      {/* Conteúdo da página com container responsivo */}
      <div className="relative grid-content-wrapper z-10" style={containerStyle} ref={contentRef}>
        {children}
      </div>

      {/* Indicador visual do container type (apenas quando showGrid ativo) */}
      {showGrid && containerType === 'fixed' && (
        <div className="fixed bottom-4 left-4 z-50 bg-violet-600 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-violet-300 rounded-full animate-pulse"></div>
          Fixed Container: {breakpointWidth}
        </div>
      )}
    </div>
  );
}