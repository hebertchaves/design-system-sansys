import { useEffect, useState } from 'react';

export function BaselineGridOverlay() {
  const [baselineSize, setBaselineSize] = useState(8);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === 'undefined') return;
      
      const root = getComputedStyle(document.documentElement);
      
      // Ler baseline grid size
      const baseline = root.getPropertyValue('--grid-baseline').trim();
      if (baseline) {
        setBaselineSize(parseInt(baseline) || 8);
      }
      
      // ✅ Ler visibilidade do baseline grid do controle
      const showBaseline = root.getPropertyValue('--grid-show-baseline').trim();
      setIsVisible(showBaseline === '1');
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

  if (!isVisible) return null;

  // Calcular número de linhas baseado na altura da viewport
  const lineCount = Math.ceil(window.innerHeight / baselineSize) + 10; // +10 para scroll

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {Array.from({ length: lineCount }).map((_, i) => (
        <div
          key={`baseline-${i}`}
          className="absolute left-0 right-0 border-t border-violet-300/20"
          style={{ 
            top: `${i * baselineSize}px`,
            height: '1px'
          }}
        />
      ))}
      
      {/* Indicador do baseline grid */}
      <div className="fixed bottom-16 left-4 bg-violet-600 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 z-50" style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col gap-0.5">
          <div className="w-8 h-px bg-violet-300"></div>
          <div className="w-8 h-px bg-violet-300"></div>
          <div className="w-8 h-px bg-violet-300"></div>
        </div>
        <span>Baseline Grid: {baselineSize}px</span>
      </div>
    </div>
  );
}