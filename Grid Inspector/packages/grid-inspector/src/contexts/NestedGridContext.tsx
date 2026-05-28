import { createContext, useContext, useState, ReactNode } from 'react';

export interface GridConfig {
  columns: number;
  gutterX: number;
  gutterY: number;
  marginX: number;
  marginY: number;
  paddingX: number;
  paddingY: number;
  showColumns: boolean;
  showRows: boolean;
  showMargins: boolean;
  showBaseline: boolean;
}

export const DEFAULT_GRID_CONFIG: GridConfig = {
  columns: 12,
  gutterX: 24,
  gutterY: 24,
  marginX: 48,
  marginY: 48,
  paddingX: 24,
  paddingY: 24,
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
  selectedElementKey: string | null;
  selectedGridConfig: GridConfig;
  updateSelectedGridConfig: (updates: Partial<GridConfig>) => void;
  elementGridConfigs: Map<string, GridConfig>;
  clearSelectedElement: () => void;
}

const NestedGridContext = createContext<NestedGridContextValue | null>(null);

// All CSS vars written to an element for scoped grid analysis
const ELEMENT_GRID_VARS = [
  '--element-grid-columns', '--element-grid-gutter-x', '--element-grid-gutter-y',
  '--element-grid-margin-x', '--element-grid-margin-y', '--element-grid-show-columns',
  '--element-grid-show-rows', '--element-grid-show-margins', '--element-grid-show-baseline',
  '--dss-layout-columns', '--dss-layout-gap-x', '--dss-layout-gap-y',
  '--dss-layout-margin-x', '--dss-layout-margin-y', '--dss-layout-padding-x', '--dss-layout-padding-y',
];

// Generate or retrieve a stable key for any element, with or without an id attribute
function getElementKey(element: HTMLElement): string {
  if (element.id) return `id:${element.id}`;
  if (!element.dataset.gridInspectorKey) {
    element.dataset.gridInspectorKey = `gi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }
  return `data:${element.dataset.gridInspectorKey}`;
}

// Write overlay renderer vars AND page layout vars so dual-fallbacks respond
function applyGridConfigToElement(element: HTMLElement, config: GridConfig) {
  // Overlay renderer vars
  element.style.setProperty('--element-grid-columns', String(config.columns));
  element.style.setProperty('--element-grid-gutter-x', `${config.gutterX}px`);
  element.style.setProperty('--element-grid-gutter-y', `${config.gutterY}px`);
  element.style.setProperty('--element-grid-margin-x', `${config.marginX}px`);
  element.style.setProperty('--element-grid-margin-y', `${config.marginY}px`);
  element.style.setProperty('--element-grid-show-columns', config.showColumns ? '1' : '0');
  element.style.setProperty('--element-grid-show-rows', config.showRows ? '1' : '0');
  element.style.setProperty('--element-grid-show-margins', config.showMargins ? '1' : '0');
  element.style.setProperty('--element-grid-show-baseline', config.showBaseline ? '1' : '0');

  // Page layout vars — override :root values via CSS cascade within this element's subtree
  element.style.setProperty('--dss-layout-columns', String(config.columns));
  element.style.setProperty('--dss-layout-gap-x', `${config.gutterX}px`);
  element.style.setProperty('--dss-layout-gap-y', `${config.gutterY}px`);
  element.style.setProperty('--dss-layout-margin-x', `${config.marginX}px`);
  element.style.setProperty('--dss-layout-margin-y', `${config.marginY}px`);
  element.style.setProperty('--dss-layout-padding-x', `${config.paddingX}px`);
  element.style.setProperty('--dss-layout-padding-y', `${config.paddingY}px`);
}

function removeElementGridVars(element: HTMLElement) {
  ELEMENT_GRID_VARS.forEach(v => element.style.removeProperty(v));
  delete element.dataset.gridInspectorKey;
}

export function NestedGridProvider({ children }: { children: ReactNode }) {
  const [selectedElement, setSelectedElementState] = useState<HTMLElement | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [elementGridConfigs, setElementGridConfigs] = useState<Map<string, GridConfig>>(new Map());

  const setSelectedElement = (element: HTMLElement | null) => {
    setSelectedElementState(element);
  };

  const selectedElementKey = selectedElement ? getElementKey(selectedElement) : null;

  const selectedElementInfo = selectedElement ? {
    id: selectedElement.id || selectedElement.dataset.gridInspectorKey || 'no-id',
    className: typeof selectedElement.className === 'string' ? selectedElement.className : 'no-class',
    tagName: selectedElement.tagName.toLowerCase(),
  } : null;

  const selectedGridConfig = selectedElementKey
    ? (elementGridConfigs.get(selectedElementKey) || DEFAULT_GRID_CONFIG)
    : DEFAULT_GRID_CONFIG;

  const updateSelectedGridConfig = (updates: Partial<GridConfig>) => {
    if (!selectedElement) {
      console.warn('[NestedGrid] No selected element to update');
      return;
    }

    const key = getElementKey(selectedElement);
    const currentConfig = elementGridConfigs.get(key) || DEFAULT_GRID_CONFIG;
    const newConfig = { ...currentConfig, ...updates };

    const newMap = new Map(elementGridConfigs);
    newMap.set(key, newConfig);
    setElementGridConfigs(newMap);

    applyGridConfigToElement(selectedElement, newConfig);
  };

  const clearSelectedElement = () => {
    if (selectedElement) {
      removeElementGridVars(selectedElement);
    }
    setSelectedElementState(null);
  };

  return (
    <NestedGridContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        isSelectionMode,
        setIsSelectionMode,
        selectedElementInfo,
        selectedElementKey,
        selectedGridConfig,
        updateSelectedGridConfig,
        elementGridConfigs,
        clearSelectedElement,
      }}
    >
      {children}
    </NestedGridContext.Provider>
  );
}

export function useNestedGrid() {
  const context = useContext(NestedGridContext);
  if (!context) {
    throw new Error('useNestedGrid must be used within NestedGridProvider');
  }
  return context;
}
