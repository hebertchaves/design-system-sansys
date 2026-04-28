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
/**
 * Valid DSS spacing tokens (multiples of 4)
 * Based on DSS Handoff v2.2 and common design system practices
 */
export declare const VALID_SPACING_TOKENS: number[];
/**
 * Valid grid column counts
 * Based on Material Design and CSS Grid conventions
 */
export declare const VALID_COLUMN_COUNTS: number[];
/**
 * Check if a spacing value is a valid DSS token
 *
 * SCOPE: Only checks and reports. Does NOT enforce.
 */
export declare function isValidSpacingToken(value: number): boolean;
/**
 * Check if a column count is valid
 *
 * SCOPE: Only checks and reports. Does NOT enforce.
 */
export declare function isValidColumnCount(columns: number): boolean;
/**
 * Observe spacing value and emit signal if non-token
 *
 * SCOPE: Purely observational. Does NOT modify or enforce.
 *
 * @param value - The spacing value to observe
 * @param property - Which property (e.g., 'gutter.x', 'margin.y')
 * @param context - Additional context (overlay/layout, etc.)
 */
export declare function observeSpacingToken(value: number, property: string, context: 'overlay' | 'layout'): void;
/**
 * Observe column count and emit signal if non-standard
 *
 * SCOPE: Purely observational. Does NOT modify or enforce.
 *
 * @param columns - The column count to observe
 */
export declare function observeColumnCount(columns: number): void;
/**
 * Observe all spacing values in a grid configuration
 *
 * Convenience function to check multiple spacing values at once.
 */
export declare function observeGridSpacing(gutter: {
    x: number;
    y: number;
}, margin: {
    x: number;
    y: number;
}, padding: {
    x: number;
    y: number;
}, context: 'overlay' | 'layout'): void;
//# sourceMappingURL=grid-rules-observer.d.ts.map