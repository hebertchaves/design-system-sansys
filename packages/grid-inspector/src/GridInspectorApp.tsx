/**
 * ==========================================================================
 * GRID INSPECTOR APP
 * ==========================================================================
 *
 * Main React component that wraps the Grid Inspector.
 * This component is framework-agnostic and can be injected anywhere.
 */

import React from 'react';
import { GridSystemProvider } from './contexts/GridSystemContext';
import { NestedGridProvider } from './contexts/NestedGridContext';
import { FloatingGridInspector } from './components/FloatingGridInspector';
import type { GridInspectorAppProps } from './types';

/**
 * Grid Inspector App Component
 *
 * Wraps FloatingGridInspector with necessary providers.
 * Can be injected into any React or non-React application.
 */
export function GridInspectorApp({ config = {}, debug = false }: GridInspectorAppProps) {
  if (debug) {
    console.log('[GridInspectorApp] Rendering with config:', config);
  }

  // Extract initial config values
  const initialBrand = config.brand;
  const initialTheme = config.theme || 'light';

  return (
    <div
      id="grid-inspector-root"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    >
      <GridSystemProvider initialBrand={initialBrand} initialTheme={initialTheme}>
        <NestedGridProvider>
          <FloatingGridInspector />
        </NestedGridProvider>
      </GridSystemProvider>
    </div>
  );
}
