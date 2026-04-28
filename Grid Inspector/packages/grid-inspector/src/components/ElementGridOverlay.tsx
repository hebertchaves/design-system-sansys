import { useEffect, useState } from 'react';

interface ElementGridOverlayProps {
  element: HTMLElement;
  config: {
    columns: number;
    gutterX: number;
    marginX: number;
    showColumns: boolean;
    showMargins: boolean;
  };
}

export function ElementGridOverlay({ element, config }: ElementGridOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  console.log('[ElementGridOverlay] Rendering with config:', config);

  useEffect(() => {
    const updateDimensions = () => {
      const rect = element.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
      console.log('[ElementGridOverlay] Dimensions updated:', rect.width, 'x', rect.height);
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);
  
  // 🆕 Force re-render when config changes
  useEffect(() => {
    console.log('[ElementGridOverlay] Config changed:', config);
  }, [config]);

  if (!config.showColumns && !config.showMargins) return null;

  const { width, height } = dimensions;
  const { columns, gutterX, marginX, showColumns, showMargins } = config;

  // Calculate column widths
  const contentWidth = width - (marginX * 2);
  const totalGutterWidth = gutterX * (columns - 1);
  const columnWidth = (contentWidth - totalGutterWidth) / columns;

  return (
    <div 
      className="pointer-events-none absolute inset-0 z-[9999]"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Margins */}
      {showMargins && (
        <>
          <div 
            className="absolute top-0 bottom-0 left-0 bg-orange-500/10 border-r-2 border-orange-400"
            style={{ width: `${marginX}px` }}
          />
          <div 
            className="absolute top-0 bottom-0 right-0 bg-orange-500/10 border-l-2 border-orange-400"
            style={{ width: `${marginX}px` }}
          />
        </>
      )}

      {/* Columns */}
      {showColumns && (
        <div 
          className="absolute top-0 bottom-0 flex"
          style={{ 
            left: `${marginX}px`,
            right: `${marginX}px`,
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="bg-blue-500/10 border-x border-blue-400/30"
              style={{
                width: `${columnWidth}px`,
                marginRight: i < columns - 1 ? `${gutterX}px` : '0',
              }}
            />
          ))}
        </div>
      )}

      {/* Info Badge */}
      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg">
        {columns} cols × {gutterX}px gutter
      </div>
    </div>
  );
}
