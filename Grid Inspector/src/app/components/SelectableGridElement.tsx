import { useEffect, useRef } from 'react';
import { useNestedGrid } from '../contexts/NestedGridContext';
import { ElementGridOverlay } from './ElementGridOverlay';

interface SelectableGridElementProps {
  children: React.ReactNode;
  elementId: string;
  className?: string;
}

export function SelectableGridElement({ children, elementId, className = '' }: SelectableGridElementProps) {
  const { 
    isSelectionMode, 
    selectedElement, 
    setSelectedElement,
    elementGridConfigs,
  } = useNestedGrid();
  const elementRef = useRef<HTMLDivElement>(null);

  console.log('[SelectableElement]', elementId, 'isSelectionMode:', isSelectionMode);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleClick = (e: MouseEvent) => {
      if (!isSelectionMode) return;
      
      console.log('[SelectableElement] Clicked:', elementId);
      e.stopPropagation();
      e.preventDefault();
      
      setSelectedElement(element);
    };

    element.addEventListener('click', handleClick);
    return () => element.removeEventListener('click', handleClick);
  }, [isSelectionMode, setSelectedElement, elementId]);

  const isSelected = selectedElement === elementRef.current;
  const isHoverable = isSelectionMode && !isSelected;

  // Get grid config for this element
  const gridConfig = elementGridConfigs.get(elementId);
  
  console.log('[SelectableElement]', elementId, 'gridConfig:', gridConfig, 'isSelected:', isSelected);

  return (
    <div
      ref={elementRef}
      id={elementId}
      className={`
        ${className}
        ${isSelectionMode ? 'cursor-pointer' : ''}
        ${isHoverable ? 'hover:ring-4 hover:ring-blue-400 hover:ring-opacity-50' : ''}
        ${isSelected ? 'ring-4 ring-green-500 ring-opacity-70 relative' : ''}
        transition-all duration-150
      `}
      style={{
        position: 'relative',
      }}
    >
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-t z-50 pointer-events-none">
          ✓ SELECTED
        </div>
      )}
      
      {/* 🆕 Grid Overlay when selected and configured */}
      {isSelected && elementRef.current && gridConfig && (
        <ElementGridOverlay 
          element={elementRef.current}
          config={gridConfig}
        />
      )}
      
      {children}
    </div>
  );
}