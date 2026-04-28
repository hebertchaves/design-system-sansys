import { GridInspectorApp } from './GridInspectorApp';
import { GridInspectorConfig } from './types';

export interface InjectOptions {
    /** Target element to append Grid Inspector (default: document.body) */
    target?: HTMLElement;
    /** Initial configuration */
    config?: Partial<GridInspectorConfig>;
    /** Enable debug logging */
    debug?: boolean;
    /** Z-index for the inspector (default: 999999) */
    zIndex?: number;
}
/**
 * Injects Grid Inspector into the current page.
 *
 * Can be called multiple times - will cleanup previous instance.
 *
 * @example
 * ```typescript
 * // Basic usage
 * injectGridInspector();
 *
 * // With options
 * injectGridInspector({
 *   config: {
 *     overlay: { columns: 12, gutter: { x: 24, y: 24 } }
 *   },
 *   debug: true
 * });
 * ```
 */
export declare function injectGridInspector(options?: InjectOptions): void;
/**
 * Removes Grid Inspector from the page.
 *
 * @example
 * ```typescript
 * ejectGridInspector();
 * ```
 */
export declare function ejectGridInspector(): void;
/**
 * Toggles Grid Inspector visibility.
 * If not injected, injects it. If injected, ejects it.
 *
 * @example
 * ```typescript
 * // Keyboard shortcut
 * window.addEventListener('keydown', (e) => {
 *   if (e.ctrlKey && e.shiftKey && e.key === 'G') {
 *     toggleGridInspector();
 *   }
 * });
 * ```
 */
export declare function toggleGridInspector(options?: InjectOptions): void;
/**
 * Checks if Grid Inspector is currently active.
 */
export declare function isGridInspectorActive(): boolean;
export type { GridInspectorConfig };
export { GridInspectorApp };
//# sourceMappingURL=index.d.ts.map