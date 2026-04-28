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
export declare function useGridSync(): void;
//# sourceMappingURL=useGridSync.d.ts.map