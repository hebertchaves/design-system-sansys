/**
 * ==========================================================================
 * Grid Rules Observer - Token Compliance
 * ==========================================================================
 * 
 * This module provides utilities to observe whether spacing values
 * align with DSS tokens.
 * 
 * SCOPE DISCIPLINE:
 * - ✅ CHECK if values match tokens
 * - ✅ EMIT signals when non-token values detected
 * - ❌ NEVER enforce token usage
 * - ❌ NEVER modify values
 * - ❌ NEVER block user input
 * 
 * Based on DSS Handoff v2.2:
 * "Spacing tokens are multiples of 4: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64"
 * 
 * NOTE: Without access to governance documents, this implements
 * commonly accepted DSS spacing rules. May need adjustment.
 */

import { emitGridViolation } from '@/observability/dss-signals';

/**
 * Valid DSS spacing tokens (multiples of 4)
 * Based on DSS Handoff v2.2 and common design system practices
 */
export const VALID_SPACING_TOKENS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
];

/**
 * Valid grid column counts
 * Based on Material Design and CSS Grid conventions
 */
export const VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24];

/**
 * Check if a spacing value is a valid DSS token
 * 
 * SCOPE: Only checks and reports. Does NOT enforce.
 */
export function isValidSpacingToken(value: number): boolean {
  return VALID_SPACING_TOKENS.includes(value);
}

/**
 * Check if a column count is valid
 * 
 * SCOPE: Only checks and reports. Does NOT enforce.
 */
export function isValidColumnCount(columns: number): boolean {
  return VALID_COLUMN_COUNTS.includes(columns);
}

/**
 * Observe spacing value and emit signal if non-token
 * 
 * SCOPE: Purely observational. Does NOT modify or enforce.
 * 
 * @param value - The spacing value to observe
 * @param property - Which property (e.g., 'gutter.x', 'margin.y')
 * @param context - Additional context (overlay/layout, etc.)
 */
export function observeSpacingToken(
  value: number,
  property: string,
  context: 'overlay' | 'layout'
): void {
  if (!isValidSpacingToken(value)) {
    // OBSERVABILITY: Emit signal that non-token value detected
    // This is informational only. System continues to work.
    emitGridViolation(
      'spacing_token',
      'medium',
      {
        affectedProperty: property,
        actual: value,
        expected: VALID_SPACING_TOKENS,
        location: context,
      },
      `Value ${value}px does not match DSS spacing tokens. Valid tokens: ${VALID_SPACING_TOKENS.join(', ')}`
    );
  }
}

/**
 * Observe column count and emit signal if non-standard
 * 
 * SCOPE: Purely observational. Does NOT modify or enforce.
 * 
 * @param columns - The column count to observe
 */
export function observeColumnCount(columns: number): void {
  if (!isValidColumnCount(columns)) {
    // OBSERVABILITY: Emit signal that non-standard column count detected
    emitGridViolation(
      'column_count',
      'low',
      {
        affectedProperty: 'columns',
        actual: columns,
        expected: VALID_COLUMN_COUNTS,
        location: 'overlay',
      },
      `Column count ${columns} is not a common convention. Standard counts: ${VALID_COLUMN_COUNTS.join(', ')}`
    );
  }
}

/**
 * Observe all spacing values in a grid configuration
 * 
 * Convenience function to check multiple spacing values at once.
 */
export function observeGridSpacing(
  gutter: { x: number; y: number },
  margin: { x: number; y: number },
  padding: { x: number; y: number },
  context: 'overlay' | 'layout'
): void {
  observeSpacingToken(gutter.x, 'gutter.x', context);
  observeSpacingToken(gutter.y, 'gutter.y', context);
  observeSpacingToken(margin.x, 'margin.x', context);
  observeSpacingToken(margin.y, 'margin.y', context);
  observeSpacingToken(padding.x, 'padding.x', context);
  observeSpacingToken(padding.y, 'padding.y', context);
}
