/**
 * ==========================================================================
 * useGridSync - Grid Synchronization Observer
 * ==========================================================================
 * 
 * This hook observes the relationship between Grid Overlay and Component Layout
 * and emits signals when they are out of sync.
 * 
 * SCOPE DISCIPLINE:
 * - ✅ OBSERVE state differences
 * - ✅ EMIT signals when differences detected
 * - ❌ NEVER enforce synchronization
 * - ❌ NEVER modify state automatically
 * - ❌ NEVER determine what is "correct"
 * 
 * The hook simply reports facts. External systems decide what to do.
 */

import { useEffect } from 'react';
import { useGridSystem } from '@/contexts/GridSystemContext';
import { emitGridComplianceCheck, emitGridViolation } from '@/observability/dss-signals';

/**
 * Hook to observe grid synchronization
 * 
 * Emits signals when:
 * - Overlay and Layout values differ
 * - Initial sync check on mount
 * 
 * Does NOT:
 * - Enforce synchronization
 * - Modify values
 * - Determine if differences are "violations"
 */
export function useGridSync() {
  const { overlay, component: layout, theme } = useGridSystem();

  useEffect(() => {
    // OBSERVABILITY: Check sync between overlay and layout on mount
    emitGridComplianceCheck(
      'sync',
      {
        overlay,
        layout,
        theme
      },
      'initialization'
    );
  }, []); // Run once on mount

  useEffect(() => {
    // OBSERVABILITY: Detect differences between overlay and layout
    // This is purely observational - we don't enforce anything
    
    const differences: string[] = [];
    
    if (overlay.gutter.x !== layout.gutter.x) {
      differences.push('gutter.x');
    }
    
    if (overlay.gutter.y !== layout.gutter.y) {
      differences.push('gutter.y');
    }
    
    if (overlay.margin.x !== layout.margin.x) {
      differences.push('margin.x');
    }
    
    if (overlay.margin.y !== layout.margin.y) {
      differences.push('margin.y');
    }
    
    if (overlay.padding.x !== layout.padding.x) {
      differences.push('padding.x');
    }
    
    if (overlay.padding.y !== layout.padding.y) {
      differences.push('padding.y');
    }
    
    // If differences exist, emit a grid_violation signal
    // Note: This module doesn't decide if differences are "wrong"
    // It only reports that they exist
    if (differences.length > 0) {
      emitGridViolation(
        'overlay_layout_mismatch',
        'medium',
        {
          affectedProperty: differences.join(', '),
          expected: { layout },
          actual: { overlay },
          location: 'GridSystemContext',
        },
        `Overlay and Layout differ in: ${differences.join(', ')}`
      );
    }
  }, [overlay, layout, theme]); // Re-check when any value changes
}
