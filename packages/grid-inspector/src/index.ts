/**
 * ==========================================================================
 * @sansys/grid-inspector
 * ==========================================================================
 *
 * Universal Grid Inspector for Design System validation.
 * Works as NPM package or Bookmarklet.
 *
 * Usage (NPM):
 *   import { injectGridInspector } from '@sansys/grid-inspector';
 *   import '@sansys/grid-inspector/dist/style.css'; // Import styles
 *   injectGridInspector();
 *
 * Usage (Bookmarklet):
 *   Just click the bookmarklet - auto-injects (CSS loaded from CDN)
 *
 * Architecture:
 * - Single codebase for both distributions
 * - ESM build for NPM (React as peer dependency)
 * - UMD build for Bookmarklet (React bundled)
 */

import { createRoot, Root } from 'react-dom/client';
import { GridInspectorApp } from './GridInspectorApp';
import type { GridInspectorConfig } from './types';
import './styles.css';

// ============================================================================
// GLOBAL STATE
// ============================================================================

let currentRoot: Root | null = null;
let containerElement: HTMLElement | null = null;

// ============================================================================
// PUBLIC API
// ============================================================================

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
export function injectGridInspector(options: InjectOptions = {}): void {
  const {
    target = document.body,
    config = {},
    debug = false,
    zIndex = 999999,
  } = options;

  if (debug) {
    console.log('[Grid Inspector] Injecting...', { options });
  }

  // Cleanup previous instance if exists
  if (currentRoot) {
    if (debug) {
      console.log('[Grid Inspector] Cleaning up previous instance');
    }
    ejectGridInspector();
  }

  // Create container
  containerElement = document.createElement('div');
  containerElement.id = 'sansys-grid-inspector-root';
  containerElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: ${zIndex};
  `;

  target.appendChild(containerElement);

  // Mount React app
  currentRoot = createRoot(containerElement);
  currentRoot.render(<GridInspectorApp config={config} debug={debug} />);

  if (debug) {
    console.log('[Grid Inspector] ✅ Injected successfully');
  }

  // Expose global API for bookmarklet control
  if (typeof window !== 'undefined') {
    (window as any).__SANSYS_GRID_INSPECTOR__ = {
      eject: ejectGridInspector,
      toggle: toggleGridInspector,
      version: '1.0.0',
    };
  }
}

/**
 * Removes Grid Inspector from the page.
 *
 * @example
 * ```typescript
 * ejectGridInspector();
 * ```
 */
export function ejectGridInspector(): void {
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot = null;
  }

  if (containerElement && containerElement.parentNode) {
    containerElement.parentNode.removeChild(containerElement);
    containerElement = null;
  }

  // Cleanup global API
  if (typeof window !== 'undefined') {
    delete (window as any).__SANSYS_GRID_INSPECTOR__;
  }
}

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
export function toggleGridInspector(options?: InjectOptions): void {
  if (currentRoot) {
    ejectGridInspector();
  } else {
    injectGridInspector(options);
  }
}

/**
 * Checks if Grid Inspector is currently active.
 */
export function isGridInspectorActive(): boolean {
  return currentRoot !== null;
}

// ============================================================================
// AUTO-INJECT FOR BOOKMARKLET
// ============================================================================

/**
 * Auto-inject when loaded as UMD bundle (bookmarklet).
 * Does nothing when loaded as ESM (NPM package).
 */
if (typeof window !== 'undefined' && (window as any).__SANSYS_GRID_INSPECTOR_BOOKMARKLET__) {
  // Bookmarklet mode - auto-inject
  console.log('[Grid Inspector] Bookmarklet mode detected - auto-injecting');
  injectGridInspector({ debug: true });

  // Show notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = '✅ Grid Inspector ativado';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { GridInspectorConfig, InjectOptions };
export { GridInspectorApp };
