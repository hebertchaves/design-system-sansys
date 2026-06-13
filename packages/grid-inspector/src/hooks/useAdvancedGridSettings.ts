import { useEffect, useState } from 'react';

/**
 * Hook para ler configurações avançadas do Grid Inspector
 * e sincronizar com o layout real
 */
export function useAdvancedGridSettings() {
  // 🔧 TODOS OS ESTADOS DECLARADOS PRIMEIRO (Rules of Hooks)
  const [containerType, setContainerType] = useState<'fixed' | 'fluid'>('fluid');
  const [breakpointWidth, setBreakpointWidth] = useState('1440px');
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);
  const [gutter, setGutter] = useState(24);
  const [margin, setMargin] = useState(48);

  // 🔧 EFFECT DEPOIS DOS ESTADOS (Rules of Hooks)
  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === 'undefined') return;
      
      const root = getComputedStyle(document.documentElement);
      
      // Ler container type
      const type = root.getPropertyValue('--grid-container-type').trim();
      if (type) {
        setContainerType(type as 'fixed' | 'fluid');
      }
      
      // Ler breakpoint width
      const width = root.getPropertyValue('--grid-breakpoint-width').trim();
      if (width) {
        setBreakpointWidth(width);
      }
      
      // Ler auto column width
      const autoCol = root.getPropertyValue('--grid-auto-column-width').trim();
      if (autoCol) {
        setAutoColumnWidth(autoCol === '1');
      }
      
      // Ler gutter e margin do overlay para calcular larguras fixas
      const gutterVal = root.getPropertyValue('--grid-gutter-x').trim();
      if (gutterVal) {
        setGutter(parseInt(gutterVal) || 24);
      }
      
      const marginVal = root.getPropertyValue('--grid-margin-x').trim();
      if (marginVal) {
        setMargin(parseInt(marginVal) || 48);
      }
    };

    updateFromCSSVars();
    
    // Observar mudanças nas CSS Variables
    const observer = new MutationObserver(updateFromCSSVars);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });
    
    // Polling para garantir sincronia
    const interval = setInterval(updateFromCSSVars, 300);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  /**
   * Retorna o valor correto para gridTemplateColumns baseado no autoColumnWidth
   * @param columns - Número de colunas
   * @param fixedWidth - Largura fixa quando auto=false (padrão: 100px) - DEPRECATED, agora calcula automaticamente
   */
  const getGridTemplateColumns = (columns: number, fixedWidth: number = 100) => {
    if (autoColumnWidth) {
      return `repeat(${columns}, 1fr)`;
    } else {
      // 🔧 CALCULAR largura fixa baseada no espaço disponível para não estourar o breakpoint
      const breakpointValue = parseInt(breakpointWidth);
      if (isNaN(breakpointValue)) {
        return `repeat(${columns}, ${fixedWidth}px)`; // fallback
      }
      
      // Espaço disponível = breakpoint - (2 * margin) - ((columns - 1) * gutter)
      const availableWidth = breakpointValue - (2 * margin) - ((columns - 1) * gutter);
      const columnWidth = Math.floor(availableWidth / columns);
      
      return `repeat(${columns}, ${columnWidth}px)`;
    }
  };

  return {
    containerType,
    breakpointWidth,
    autoColumnWidth,
    getGridTemplateColumns,
  };
}
