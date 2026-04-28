/**
 * ==========================================================================
 * GRID INSPECTOR TYPES
 * ==========================================================================
 */

export interface GridInspectorConfig {
  contentSelector?: string; // CSS selector for the grid content container
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

export interface GridViolation {
  id: string;
  type: 'spacing_token' | 'column_count' | 'overlay_layout_mismatch' | 'unknown';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  affectedProperty?: string;
  affectedValue?: number;
  /** Row index inside componentRows to highlight on click (undefined = no specific row) */
  elementIndex?: number;
}
