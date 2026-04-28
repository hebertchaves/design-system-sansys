import { createContext, useContext, useState, ReactNode } from 'react';

interface GridConfig {
  columns: number;
  gutterX: number;
  gutterY: number;
  marginX: number;
  marginY: number;
  showColumns: boolean;
  showRows: boolean;
  showMargins: boolean;
  showBaseline: boolean;
}

const DEFAULT_GRID_CONFIG: GridConfig = {
  columns: 12,
  gutterX: 24,
  gutterY: 24,
  marginX: 48,
  marginY: 48,
  showColumns: true,
  showRows: false,
  showMargins: true,
  showBaseline: false,
};

interface NestedGridContextValue {
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
  isSelectionMode: boolean;
  setIsSelectionMode: (active: boolean) => void;
  selectedElementInfo: {
    id: string;
    className: string;
    tagName: string;
  } | null;
  
  // 🆕 Grid config for selected element
  selectedGridConfig: GridConfig;
  updateSelectedGridConfig: (updates: Partial<GridConfig>) => void;
  elementGridConfigs: Map<string, GridConfig>;
}

const NestedGridContext = createContext<NestedGridContextValue | null>(null);

export function NestedGridProvider({ children }: { children: ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [elementGridConfigs, setElementGridConfigs] = useState<Map<string, GridConfig>>(new Map());
  
  console.log('[NestedGrid] isSelectionMode:', isSelectionMode, 'selectedElement:', selectedElement?.id);
  
  const selectedElementInfo = selectedElement ? {
    id: selectedElement.id || 'no-id',
    className: selectedElement.className || 'no-class',
    tagName: selectedElement.tagName.toLowerCase(),
  } : null;

  // Get grid config for selected element (or default)
  const selectedGridConfig = selectedElement?.id 
    ? (elementGridConfigs.get(selectedElement.id) || DEFAULT_GRID_CONFIG)
    : DEFAULT_GRID_CONFIG;

  // Update grid config for selected element
  const updateSelectedGridConfig = (updates: Partial<GridConfig>) => {
    if (!selectedElement?.id) {
      console.warn('[NestedGrid] No selected element to update');
      return;
    }
    
    const currentConfig = elementGridConfigs.get(selectedElement.id) || DEFAULT_GRID_CONFIG;
    const newConfig = { ...currentConfig, ...updates };
    
    console.log('[NestedGrid] Updating config for', selectedElement.id, 'from:', currentConfig, 'to:', newConfig);
    
    // ✅ Create new Map with updated config
    const newMap = new Map(elementGridConfigs);
    newMap.set(selectedElement.id, newConfig);
    setElementGridConfigs(newMap);
    
    // 🔥 Apply CSS variables directly to the element
    applyGridConfigToElement(selectedElement, newConfig);
  };

  return (
    <NestedGridContext.Provider 
      value={{ 
        selectedElement, 
        setSelectedElement,
        isSelectionMode,
        setIsSelectionMode,
        selectedElementInfo,
        selectedGridConfig,
        updateSelectedGridConfig,
        elementGridConfigs,
      }}
    >
      {children}
    </NestedGridContext.Provider>
  );
}

// 🎨 Apply grid config as CSS variables to element
function applyGridConfigToElement(element: HTMLElement, config: GridConfig) {
  element.style.setProperty('--element-grid-columns', String(config.columns));
  element.style.setProperty('--element-grid-gutter-x', `${config.gutterX}px`);
  element.style.setProperty('--element-grid-gutter-y', `${config.gutterY}px`);
  element.style.setProperty('--element-grid-margin-x', `${config.marginX}px`);
  element.style.setProperty('--element-grid-margin-y', `${config.marginY}px`);
  element.style.setProperty('--element-grid-show-columns', config.showColumns ? '1' : '0');
  element.style.setProperty('--element-grid-show-rows', config.showRows ? '1' : '0');
  element.style.setProperty('--element-grid-show-margins', config.showMargins ? '1' : '0');
  element.style.setProperty('--element-grid-show-baseline', config.showBaseline ? '1' : '0');
}

export function useNestedGrid() {
  const context = useContext(NestedGridContext);
  if (!context) {
    throw new Error('useNestedGrid must be used within NestedGridProvider');
  }
  return context;
}