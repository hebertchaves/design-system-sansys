import { useEffect, Component, type ReactNode, type ErrorInfo } from 'react';
import { GridSystemProvider } from './contexts/GridSystemContext';
import { NestedGridProvider } from './contexts/NestedGridContext';
import { FloatingGridInspector } from './components/FloatingGridInspector';
import { GridOverlay } from './components/GridOverlay';
import { BaselineGridOverlay } from './components/BaselineGridOverlay';
import { useGridSystem } from './hooks';
import type { GridInspectorAppProps, GridViolation } from './types';

// DSS token validation constants
const DSS_SPACING_TOKENS = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64];
const DSS_COLUMN_COUNTS = [4, 8, 12, 16];

function isToken(v: number) {
  return DSS_SPACING_TOKENS.includes(Math.round(v));
}

// Error boundary — catches render errors so they're visible instead of silent
class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[GridInspector] Render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 999999,
          background: '#fee2e2',
          border: '1px solid #dc2626',
          borderRadius: 8,
          padding: '12px 16px',
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#dc2626',
          maxWidth: 360,
          pointerEvents: 'auto',
        }}>
          <strong>GridInspector — Erro de Render</strong>
          <br />
          {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

// Inner bridge — validates values and updates violations whenever sliders change
function ViolationBridge() {
  const { component, overlay, setViolations } = useGridSystem();

  useEffect(() => {
    const v: GridViolation[] = [];
    let n = 0;

    const check = (value: number, prop: string, label: string) => {
      if (!isToken(value)) {
        v.push({
          id: `v-${++n}`,
          type: 'spacing_token',
          severity: 'medium',
          message: `${label}: ${Math.round(value)}px não é um token DSS (use múltiplos de 4)`,
          affectedProperty: prop,
          affectedValue: Math.round(value),
        });
      }
    };

    check(component.gutter.x, 'layout.gutter.x', 'Gap X');
    check(component.gutter.y, 'layout.gutter.y', 'Gap Y');
    check(component.padding.x, 'layout.padding.x', 'Padding L/R');
    check(component.padding.y, 'layout.padding.y', 'Padding T/B');
    check(component.margin.x, 'layout.margin.x', 'Margin X');

    if (!DSS_COLUMN_COUNTS.includes(overlay.columns)) {
      v.push({
        id: `v-${++n}`,
        type: 'column_count',
        severity: 'low',
        message: `Colunas: ${overlay.columns} fora do padrão DSS (padrões: ${DSS_COLUMN_COUNTS.join(', ')})`,
        affectedProperty: 'overlay.columns',
        affectedValue: overlay.columns,
      });
    }

    setViolations(v);
  }, [component, overlay]);

  return null;
}

// Passes overlay props from context to the props-based GridOverlay component
interface GridOverlayBridgeProps {
  contentSelector?: string;
}

function GridOverlayBridge({ contentSelector }: GridOverlayBridgeProps) {
  const { overlay, showGrid, showRows, highlightedElementIndex } = useGridSystem();

  if (!showGrid) return null;

  return (
    <>
      <GridOverlay
        columns={overlay.columns}
        gutter={overlay.gutter.x}
        margin={overlay.margin.x}
        padding={overlay.padding.x}
        gutterY={overlay.gutter.y}
        marginY={overlay.margin.y}
        paddingY={overlay.padding.y}
        showRows={showRows}
        showAnnotations={true}
        contentSelector={contentSelector}
        highlightedElementIndex={highlightedElementIndex}
      />
      <BaselineGridOverlay />
    </>
  );
}

export function GridInspectorApp({ config = {}, debug = false }: GridInspectorAppProps) {
  if (debug) {
    console.log('[GridInspectorApp] Rendering with config:', config);
  }

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
        // Neutralise --dss-layout-* vars so they don't cascade into the floating panel
        ['--dss-layout-gap-x' as string]: '0px',
        ['--dss-layout-gap-y' as string]: '0px',
        ['--dss-layout-margin-x' as string]: '0px',
        ['--dss-layout-margin-y' as string]: '0px',
        ['--dss-layout-padding-x' as string]: '0px',
        ['--dss-layout-padding-y' as string]: '0px',
      } as React.CSSProperties}
    >
      <AppErrorBoundary>
        <GridSystemProvider initialConfig={config}>
          <NestedGridProvider>
            <ViolationBridge />
            <FloatingGridInspector />
            <GridOverlayBridge contentSelector={config.contentSelector} />
          </NestedGridProvider>
        </GridSystemProvider>
      </AppErrorBoundary>
    </div>
  );
}
