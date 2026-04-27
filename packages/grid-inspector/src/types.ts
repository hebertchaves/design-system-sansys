/**
 * ==========================================================================
 * GRID INSPECTOR TYPES
 * ==========================================================================
 */

export interface GridInspectorConfig {
  overlay: {
    columns: number;
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
    visible: boolean;
  };
  layout: {
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
    autoColumnWidth: boolean;
  };
  brand?: 'hub' | 'water' | 'waste';
  theme: 'light' | 'dark';
}

export interface GridInspectorAppProps {
  config?: Partial<GridInspectorConfig>;
  debug?: boolean;
}
