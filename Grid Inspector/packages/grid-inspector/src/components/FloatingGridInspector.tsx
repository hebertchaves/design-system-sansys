import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isMcpConnected, setSimulatedViewportWidth } from '@/observability/mcp-validator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,

  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Grid3x3, Eye, Box, ChevronLeft, ChevronRight, X, ArrowLeftRight, ArrowUpDown, Layers, Info, AlertTriangle, CheckCircle, Download, Wifi, WifiOff, Palette } from 'lucide-react';
import { useGridSystem } from '@/hooks';
import { useNestedGrid } from '@/contexts/NestedGridContext';

// ✅ NO PROPS - All state from Context
type PanelSize = 'expanded' | 'minimized';

export function FloatingGridInspector() {
  // ✅ Read ALL grid state from Context
  const {
    overlay,
    setOverlay,
    component,
    setComponent,
    showGrid,
    setShowGrid,
    autoColumnWidth,
    setAutoColumnWidth,
    showRows,
    setShowRows,
    brand,
    setBrand,
    violations,
    highlightedElementIndex,
    setHighlightedElementIndex,
  } = useGridSystem();
  
  // 🆕 Nested Grid Context - para seleção de elementos específicos (opcional)
  
  // 🆕 Nested Grid Context - para seleção de elementos específicos
  const {
    isSelectionMode,
    setIsSelectionMode,
    setSelectedElement,
    selectedElementInfo,
    selectedGridConfig,
    updateSelectedGridConfig,
  } = useNestedGrid();
  
  // 🎯 Mode: Global Grid vs Element Grid
  const isEditingElement = isSelectionMode && selectedElementInfo !== null;
  
  // 🔗 Alias grid values - NOW switches between global and element!
  const gridColumns = isEditingElement ? selectedGridConfig.columns : overlay.columns;
  const gridGutter = isEditingElement ? selectedGridConfig.gutterX : overlay.gutter.x;
  const gridMargin = isEditingElement ? selectedGridConfig.marginX : overlay.margin.x;
  const gridPadding = overlay.padding.x;
  const gridGutterY = isEditingElement ? selectedGridConfig.gutterY : overlay.gutter.y;
  const gridMarginY = isEditingElement ? selectedGridConfig.marginY : overlay.margin.y;
  const gridPaddingY = overlay.padding.y;
  
  const componentGutter = component.gutter.x;
  const componentMargin = component.margin.x;
  const componentPadding = component.padding.x;
  const componentGutterY = component.gutter.y;
  const componentMarginY = component.margin.y;
  const componentPaddingY = component.padding.y;
  
  // 🔗 Alias setters - NOW switches between global and element!
  const setGridColumns = (val: number) => {
    console.log('[FloatingInspector] setGridColumns:', val, 'isEditingElement:', isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ columns: val });
    } else {
      setOverlay({ columns: val });
    }
  };
  const setGridGutter = (val: number) => {
    console.log('[FloatingInspector] setGridGutter:', val, 'isEditingElement:', isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ gutterX: val });
    } else {
      setOverlay({ gutter: { ...overlay.gutter, x: val } });
    }
  };
  const setGridMargin = (val: number) => {
    console.log('[FloatingInspector] setGridMargin:', val, 'isEditingElement:', isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ marginX: val });
    } else {
      setOverlay({ margin: { ...overlay.margin, x: val } });
    }
  };
  const setGridPadding = (val: number) => setOverlay({ padding: { ...overlay.padding, x: val } });
  const setGridGutterY = (val: number) => {
    if (isEditingElement) {
      updateSelectedGridConfig({ gutterY: val });
    } else {
      setOverlay({ gutter: { ...overlay.gutter, y: val } });
    }
  };
  const setGridMarginY = (val: number) => {
    if (isEditingElement) {
      updateSelectedGridConfig({ marginY: val });
    } else {
      setOverlay({ margin: { ...overlay.margin, y: val } });
    }
  };
  const setGridPaddingY = (val: number) => setOverlay({ padding: { ...overlay.padding, y: val } });
  
  const setComponentGutter = (val: number) => setComponent({ gutter: { ...component.gutter, x: val } });
  const setComponentMargin = (val: number) => setComponent({ margin: { ...component.margin, x: val } });
  const setComponentPadding = (val: number) => setComponent({ padding: { ...component.padding, x: val } });
  const setComponentGutterY = (val: number) => setComponent({ gutter: { ...component.gutter, y: val } });
  const setComponentMarginY = (val: number) => setComponent({ margin: { ...component.margin, y: val } });
  const setComponentPaddingY = (val: number) => setComponent({ padding: { ...component.padding, y: val } });
  
  const [panelSize, setPanelSize] = useState<PanelSize>('expanded');
  const [isVisible, setIsVisible] = useState(true);
  const [mcpConnected, setMcpConnected] = useState(false);

  // Poll MCP connection status every 5 s
  useEffect(() => {
    const check = () => setMcpConnected(isMcpConnected());
    check();
    const id = setInterval(check, 5000);
    return () => clearInterval(id);
  }, []);

  // Export current grid config + violations as a JSON report file
  const exportReport = useCallback(() => {
    const verdict =
      violations.some(v => v.severity === 'critical' || v.severity === 'high')
        ? 'non-compliant'
        : violations.length > 0
          ? 'warnings'
          : 'compliant';

    const report = {
      tool: '@sansys/grid-inspector',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      mcpSource: mcpConnected ? 'server' : 'client-side',
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
      },
      grid: {
        overlay: {
          columns: overlay.columns,
          gutter: overlay.gutter,
          margin: overlay.margin,
          padding: overlay.padding,
        },
        layout: {
          gutter: component.gutter,
          margin: component.margin,
          padding: component.padding,
        },
      },
      verdict,
      violations: violations.map(v => ({
        id: v.id,
        severity: v.severity,
        type: v.type,
        message: v.message,
        affectedProperty: v.affectedProperty ?? null,
        affectedValue: v.affectedValue ?? null,
      })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grid-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [overlay, component, violations, mcpConnected]);
  
  // 🔧 CONTROLES ADICIONAIS QUE SERÃO IMPLEMENTADOS
  const [overlayOpacity, setOverlayOpacity] = useState(60);
  const [showColumns, setShowColumns] = useState(true);
  
  // 🆕 REMOVER CONTROLES DE GAP - NÃO SÃO MAIS NECESSÁRIOS
  const [showPaddingZonesX, setShowPaddingZonesX] = useState(true);
  const [showPaddingZonesY, setShowPaddingZonesY] = useState(true);
  const [showMarginBoundariesX, setShowMarginBoundariesX] = useState(true);
  const [showMarginBoundariesY, setShowMarginBoundariesY] = useState(true);
  const [showBaselineGrid, setShowBaselineGrid] = useState(true);
  
  const [containerType, setContainerType] = useState<'fixed' | 'fluid'>('fluid');
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop' | 'ultra'>('desktop');
  const [baselineGrid, setBaselineGrid] = useState<'4px' | '8px'>('8px');
  const [densityMode, setDensityMode] = useState<'comfortable' | 'compact' | 'dense'>('comfortable');

  const columnOptions = [4, 6, 8, 10, 12, 16];

  // Inject a global style once so Radix UI portals (Select, Tooltip, etc.) appear above the inspector
  useEffect(() => {
    const id = 'grid-inspector-portal-zindex';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = '[data-radix-popper-content-wrapper],[data-radix-select-viewport]{z-index:1000001!important}[role="switch"]>span{background:white!important;box-shadow:0 1px 3px rgba(0,0,0,.25)!important}';
      document.head.appendChild(s);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  // Selection mode — capture-phase click listener so it fires before page handlers
  useEffect(() => {
    if (!isSelectionMode) return;

    const handleClick = (e: MouseEvent) => {
      const root = document.getElementById('grid-inspector-root');
      if (root && root.contains(e.target as Node)) return; // ignore clicks inside the panel
      e.preventDefault();
      e.stopPropagation();
      const el = e.target as HTMLElement;
      setSelectedElement(el);
      setIsSelectionMode(false);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isSelectionMode, setSelectedElement, setIsSelectionMode]);

  // Breakpoint presets: when the breakpoint changes, sync overlay + layout to standard DSS values
  const BREAKPOINT_PRESETS = {
    mobile:  { columns: 4,  gutterX: 8,  gutterY: 8,  marginX: 16, marginY: 0, paddingX: 8,  paddingY: 8,  viewportPx: 375  },
    tablet:  { columns: 8,  gutterX: 16, gutterY: 16, marginX: 24, marginY: 0, paddingX: 16, paddingY: 16, viewportPx: 768  },
    desktop: { columns: 12, gutterX: 16, gutterY: 16, marginX: 24, marginY: 0, paddingX: 24, paddingY: 24, viewportPx: 1440 },
    ultra:   { columns: 16, gutterX: 24, gutterY: 24, marginX: 40, marginY: 0, paddingX: 24, paddingY: 24, viewportPx: 1920 },
  } as const;

  const handleBreakpointChange = (bp: string) => {
    if (!bp) return;
    setBreakpoint(bp as keyof typeof BREAKPOINT_PRESETS);
    const p = BREAKPOINT_PRESETS[bp as keyof typeof BREAKPOINT_PRESETS];
    if (!p) return;
    // Simulate this viewport width for responsive MCP validation suggestions
    setSimulatedViewportWidth(p.viewportPx);
    setOverlay({
      columns: p.columns,
      gutter: { x: p.gutterX, y: p.gutterY },
      margin: { x: p.marginX, y: p.marginY },
      padding: { x: p.paddingX, y: p.paddingY },
    });
    setComponent({
      gutter: { x: p.gutterX, y: p.gutterY },
      margin: { x: p.marginX, y: p.marginY },
      padding: { x: p.paddingX, y: p.paddingY },
    });
  };

  // Apply data-brand to <html> whenever brand changes
  useEffect(() => {
    const root = document.documentElement;
    if (brand) {
      root.setAttribute('data-brand', brand);
    } else {
      root.removeAttribute('data-brand');
    }
  }, [brand]);

  const widthClass = {
    expanded: 'w-[400px]',
    minimized: 'w-[60px]',
  }[panelSize];

  // 📐 APLICAR CONTROLES NO DOM VIA CLASSES CSS E ATRIBUTOS
  // Isso será injetado no DOM usando useEffect ou classes globais
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // 🆕 Aplicar toggle GLOBAL do overlay (Show Grid Overlay)
    root.style.setProperty('--grid-overlay-visible', showGrid ? '1' : '0');
    
    // Aplicar opacidade do overlay
    root.style.setProperty('--grid-overlay-opacity', `${overlayOpacity / 100}`);
    
    // Aplicar visibilidade de camadas
    root.style.setProperty('--grid-show-columns', showColumns ? '1' : '0');
    root.style.setProperty('--grid-show-gaps-x', '0');
    root.style.setProperty('--grid-show-gaps-y', '0');
    root.style.setProperty('--grid-show-padding-x', showPaddingZonesX ? '1' : '0');
    root.style.setProperty('--grid-show-padding-y', showPaddingZonesY ? '1' : '0');
    root.style.setProperty('--grid-show-margin-x', showMarginBoundariesX ? '1' : '0');
    root.style.setProperty('--grid-show-margin-y', showMarginBoundariesY ? '1' : '0');
    
    // Aplicar container type
    root.style.setProperty('--grid-container-type', containerType);
    
    // 🆕 Aplicar auto column width (1fr vs largura fixa)
    root.style.setProperty('--grid-auto-column-width', autoColumnWidth ? '1' : '0');
    
    // 🆕 Aplicar gutter e margin para cálculo de larguras fixas
    root.style.setProperty('--grid-gutter-x', gridGutter.toString());
    root.style.setProperty('--grid-margin-x', gridMargin.toString());
    
    // Aplicar breakpoint
    const breakpointWidths = {
      mobile: '375px',
      tablet: '768px',
      desktop: '1440px',
      ultra: '1920px',
    };
    root.style.setProperty('--grid-breakpoint-width', breakpointWidths[breakpoint]);
    root.style.setProperty('--grid-container-max-width', containerType === 'fluid' ? '100%' : breakpointWidths[breakpoint]);

    // Aplicar density mode (multiplicador de spacing)
    const densityMultipliers = {
      comfortable: '1',
      compact: '0.75',
      dense: '0.5',
    };
    root.style.setProperty('--grid-density-multiplier', densityMultipliers[densityMode]);
    
    // Aplicar baseline grid
    root.style.setProperty('--grid-baseline', baselineGrid);
    root.style.setProperty('--grid-show-baseline', showBaselineGrid ? '1' : '0');

    // Layout CSS vars — afetam os componentes reais da página (NÃO a visualização do overlay)
    // Density multiplier scales all layout values
    const densityMult = { comfortable: 1, compact: 0.75, dense: 0.5 }[densityMode];
    root.style.setProperty('--dss-layout-gap-x', `${Math.round(componentGutter * densityMult)}px`);
    root.style.setProperty('--dss-layout-gap-y', `${Math.round(componentGutterY * densityMult)}px`);
    root.style.setProperty('--dss-layout-margin-x', `${Math.round(componentMargin * densityMult)}px`);
    root.style.setProperty('--dss-layout-margin-y', `${Math.round(componentMarginY * densityMult)}px`);
    root.style.setProperty('--dss-layout-padding-x', `${Math.round(componentPadding * densityMult)}px`);
    root.style.setProperty('--dss-layout-padding-y', `${Math.round(componentPaddingY * densityMult)}px`);
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{ position: 'fixed', top: '6rem', right: '1rem', zIndex: 1000000, pointerEvents: 'auto' }}
        className="fixed top-24 right-4 z-50 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl shadow-2xl transition-all"
        title="Show Grid Inspector"
      >
        <Grid3x3 size={20} />
      </button>
    );
  }

  if (panelSize === 'minimized') {
    return (
      <div
        style={{ position: 'fixed', top: '5rem', right: '1rem', zIndex: 1000000, pointerEvents: 'auto', width: '60px' }}
        className="fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 w-[60px] overflow-hidden"
      >
        <div className="p-3 border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setPanelSize('expanded')}
              className="p-2 hover:bg-white rounded-lg transition-all"
              title="Expand Panel"
            >
              <ChevronLeft size={16} className="text-slate-700" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white rounded-lg transition-all"
              title="Hide Panel"
            >
              <X size={16} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-2 space-y-3">
          <button
            className="w-full p-2 hover:bg-emerald-50 rounded-lg transition-all"
            title="Layout Grid"
            onClick={() => setPanelSize('expanded')}
          >
            <Box size={20} className="text-emerald-600 mx-auto" />
          </button>
          <button
            className="w-full p-2 hover:bg-purple-50 rounded-lg transition-all"
            title="Overlay Grid"
            onClick={() => setPanelSize('expanded')}
          >
            <Eye size={20} className="text-purple-600 mx-auto" />
          </button>
          <button
            className="w-full p-2 hover:bg-blue-50 rounded-lg transition-all"
            title="Visibility"
            onClick={() => setPanelSize('expanded')}
          >
            <Eye size={20} className="text-blue-600 mx-auto" />
          </button>
          <button
            className="w-full p-2 hover:bg-indigo-50 rounded-lg transition-all"
            title="Advanced"
            onClick={() => setPanelSize('expanded')}
          >
            <Layers size={20} className="text-indigo-600 mx-auto" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ position: 'fixed', top: '5rem', right: '1rem', zIndex: 1000000, pointerEvents: 'auto' }}
      className={`fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 ${widthClass} transition-all duration-300 max-h-[calc(100vh-6rem)] flex flex-col`}
    >
      {/* Header */}
      <div className={`px-5 py-3 border-b border-slate-200 flex-shrink-0 ${isEditingElement ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-50' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isEditingElement ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
              <Grid3x3 className="text-white" size={16} />
            </div>
            {panelSize === 'expanded' && (
              <div>
                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  Grid Inspector
                  {isEditingElement && (
                    <span className="text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded animate-pulse">
                      EDITING ELEMENT
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  {isEditingElement ? `📦 ${selectedElementInfo?.tagName} #${selectedElementInfo?.id}` : 'Layout & Overlay Controls'}
                  <span
                    title={mcpConnected ? 'MCP Server conectado' : 'MCP Server offline (validação local)'}
                    className={`flex items-center gap-0.5 text-[10px] font-bold px-1 py-0.5 rounded ${
                      mcpConnected ? 'text-emerald-700 bg-emerald-100' : 'text-slate-400 bg-slate-100'
                    }`}
                  >
                    {mcpConnected ? <Wifi size={9} /> : <WifiOff size={9} />}
                    MCP
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {panelSize === 'expanded' && (
              <button
                onClick={() => setPanelSize('minimized')}
                className="p-1.5 hover:bg-white rounded-lg transition-all"
                title="Minimize"
              >
                <ChevronRight size={14} className="text-slate-600" />
              </button>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-white rounded-lg transition-all"
              title="Close"
            >
              <X size={14} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="layout" className="w-full flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full grid grid-cols-5 rounded-none border-b border-slate-200 bg-slate-50 h-auto p-0 flex-shrink-0">
          <TabsTrigger 
            value="layout" 
            className="group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-emerald-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-emerald-600 py-3 transition-all duration-300 hover:bg-emerald-50/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              <Box size={14} className="text-emerald-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
              {panelSize === 'expanded' && <span className="text-xs font-semibold transition-colors duration-200">Layout</span>}
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="overlay" 
            className="group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 py-3 transition-all duration-300 hover:bg-purple-50/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              <Eye size={14} className="text-purple-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]" />
              {panelSize === 'expanded' && <span className="text-xs font-semibold transition-colors duration-200">Overlay</span>}
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="visibility" 
            className="group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 py-3 transition-all duration-300 hover:bg-blue-50/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              <Eye size={14} className="text-blue-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(37,99,235,0.3)]" />
              {panelSize === 'expanded' && <span className="text-xs font-semibold transition-colors duration-200">Show</span>}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-indigo-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-indigo-600 py-3 transition-all duration-300 hover:bg-indigo-50/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              <Layers size={14} className="text-indigo-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.3)]" />
              {panelSize === 'expanded' && <span className="text-xs font-semibold transition-colors duration-200">Adv</span>}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="group rounded-none data-[state=active]:bg-gradient-to-b data-[state=active]:from-red-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-red-500 py-3 transition-all duration-300 hover:bg-red-50/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              <div className="relative">
                <AlertTriangle size={14} className={violations.length > 0 ? 'text-red-500' : 'text-slate-400'} />
                {violations.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {violations.length > 9 ? '9+' : violations.length}
                  </span>
                )}
              </div>
              {panelSize === 'expanded' && (
                <span className={`text-xs font-semibold transition-colors duration-200 ${violations.length > 0 ? 'text-red-600' : ''}`}>
                  Alerts
                </span>
              )}
            </div>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1 — Layout (Real Components) */}
        <TabsContent value="layout" className="p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <Accordion type="multiple" defaultValue={['spacing-x', 'spacing-y']} className="w-full">
            
            {/* Grid Structure */}
            <AccordionItem value="grid-structure" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-emerald-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Grid3x3 size={14} className="text-emerald-600" />
                  <span>Grid Structure</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700 mb-2 block">Columns</Label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {columnOptions.map((count) => (
                        <button
                          key={count}
                          onClick={() => setGridColumns(count)}
                          className={`py-2 px-2 text-xs font-bold rounded-lg transition-all border-2 ${
                            gridColumns === count
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200/50'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {panelSize === 'expanded' && (
                    <>
                      {/* Container Type (70%) + Auto Column Width (30%) na mesma linha */}
                      <div className="flex items-center gap-3">
                        {/* Container Type - 70% do espaço */}
                        <div className="flex-[0.7] space-y-1.5">
                          <Label htmlFor="container-type" className="text-xs font-semibold text-slate-700">
                            Container Type
                          </Label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {(['fixed', 'fluid'] as const).map((ct) => (
                              <button
                                key={ct}
                                onClick={() => setContainerType(ct)}
                                className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all border-2 ${
                                  containerType === ct
                                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-md'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                                }`}
                              >
                                {ct === 'fixed' ? 'Fixed' : 'Fluid'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Auto Column Width - 30% do espaço com indicador visual e Tooltip */}
                        <div className="flex-[0.3] space-y-1.5">
                          <Label htmlFor="auto-column" className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                            Auto Column
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" className="p-0.5 hover:bg-slate-200 rounded transition-colors">
                                  <Info size={12} className="text-slate-500" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent 
                                side="right" 
                                className={`max-w-[280px] p-3 rounded-lg border transition-all ${
                                  autoColumnWidth
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                    : 'bg-slate-800 border-slate-700 text-white'
                                }`}
                                sideOffset={8}
                              >
                                <p className="text-xs font-bold mb-1.5">
                                  {autoColumnWidth ? '✓ Columns Flexíveis (1fr)' : '✗ Columns Fixas'}
                                </p>
                                <p className="text-xs opacity-90">
                                  {autoColumnWidth 
                                    ? 'Colunas se adaptam ao espaço disponível (grid-template-columns: repeat(N, 1fr))'
                                    : `Colunas têm largura fixa calculada: ${Math.floor(
                                        (() => {
                                          const bp = breakpoint === 'mobile' ? 375 : 
                                                     breakpoint === 'tablet' ? 768 : 
                                                     breakpoint === 'desktop' ? 1440 : 1920;
                                          return bp / gridColumns;
                                        })()
                                      )}px por coluna (${breakpoint === 'mobile' ? '375' : breakpoint === 'tablet' ? '768' : breakpoint === 'desktop' ? '1440' : '1920'}px ÷ ${gridColumns} colunas)`}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <div className="flex flex-col items-center gap-1">
                            <Switch
                              id="auto-column"
                              checked={autoColumnWidth}
                              onCheckedChange={setAutoColumnWidth}
                            />
                            <span className={`text-[10px] font-bold transition-colors ${
                              autoColumnWidth 
                                ? 'text-emerald-600' 
                                : 'text-slate-400'
                            }`}>
                              {autoColumnWidth ? '1fr' : 'Fixed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {panelSize === 'expanded' && (
              <AccordionItem value="breakpoints" className="border-b border-slate-100">
                <AccordionTrigger className="px-4 py-2.5 hover:bg-violet-50/50 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-violet-600" />
                    <span>Breakpoints</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Viewport</Label>
                    <ToggleGroup type="single" value={breakpoint} onValueChange={handleBreakpointChange} className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      <ToggleGroupItem value="mobile" className="text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight">
                        <span>Mobile</span>
                        <span className="text-[10px] opacity-70">375px</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="tablet" className="text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight">
                        <span>Tablet</span>
                        <span className="text-[10px] opacity-70">768px</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="desktop" className="text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight">
                        <span>Desktop</span>
                        <span className="text-[10px] opacity-70">1440px</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="ultra" className="text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight">
                        <span>Ultra</span>
                        <span className="text-[10px] opacity-70">1920px</span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <p className="text-xs text-slate-500">🔧 Define max-width do container</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Spacing Horizontal (Eixo X - AZUL) */}
            <AccordionItem value="spacing-x" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight size={14} className="text-blue-600" />
                  <span>Spacing X</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">Horizontal</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  
                  {/* Gap X - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Label className="text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                      Gap X
                    </Label>
                    <Slider
                      value={[componentGutter]}
                      onValueChange={([val]) => {
                        // ⚡ MIGRATED TO OBSERVABILITY: Update via GridSystemContext
                        setComponent({
                          gutter: { ...component.gutter, x: val }
                        });
                        // Keep prop setter for backward compatibility (will be removed in Phase 3)
                        setComponentGutter(val);
                      }}
                      min={0}
                      max={64}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    />
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap">{componentGutter}px</span>
                  </div>

                  {/* Padding L/R - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100">
                    <Label className="text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded"></div>
                      Padding L/R
                    </Label>
                    <Slider
                      value={[componentPadding]}
                      onValueChange={([val]) => setComponentPadding(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    />
                    <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap">{componentPadding}px</span>
                  </div>

                  {/* Margin - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100">
                    <Label className="text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded"></div>
                      Margin
                    </Label>
                    <Slider
                      value={[componentMargin]}
                      onValueChange={([val]) => setComponentMargin(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    />
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap">{componentMargin}px</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Spacing Vertical (Eixo Y - ROSE) */}
            <AccordionItem value="spacing-y" className="border-0">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-rose-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} className="text-rose-600" />
                  <span>Spacing Y</span>
                  <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">Vertical</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  
                  {/* Gap Y - BLUE (mesma cor de Gap X) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Label className="text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                      Gap Y
                    </Label>
                    <Slider
                      value={[componentGutterY]}
                      onValueChange={([val]) => setComponentGutterY(val)}
                      min={0}
                      max={64}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    />
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap">{componentGutterY}px</span>
                  </div>

                  {/* Padding T/B - FULL HORIZONTAL - GREEN (mesma cor de Padding L/R) */}
                  <div className="flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100">
                    <Label className="text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded"></div>
                      Padding T/B
                    </Label>
                    <Slider
                      value={[componentPaddingY]}
                      onValueChange={([val]) => setComponentPaddingY(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    />
                    <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap">{componentPaddingY}px</span>
                  </div>

                  {/* Margin Y - ORANGE (mesma cor de Margin X) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100">
                    <Label className="text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded"></div>
                      Margin Y
                    </Label>
                    <Slider
                      value={[componentMarginY]}
                      onValueChange={([val]) => setComponentMarginY(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    />
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap">{componentMarginY}px</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* TAB 2 — Overlay (Didactic Grid) */}
        <TabsContent value="overlay" className="p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          
          {/* 🆕 Element Editing Banner */}
          {isEditingElement && (
            <div className="mx-4 mt-4 mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-900">EDITING ELEMENT GRID</span>
              </div>
              <p className="text-xs text-green-700">
                🎯 <strong>{selectedElementInfo?.tagName}</strong> #{selectedElementInfo?.id}
              </p>
              <div className="flex gap-2 mt-2 text-[10px] font-mono">
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  {gridColumns} cols
                </span>
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  {gridGutter}px gutter
                </span>
                <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                  {gridMargin}px margin
                </span>
              </div>
              <p className="text-xs text-green-600 mt-2">
                Changes apply only to this element
              </p>
            </div>
          )}
          
          <Accordion type="multiple" defaultValue={['overlay-spacing-x', 'overlay-spacing-y']} className="w-full">
            
            {/* Overlay Spacing X */}
            <AccordionItem value="overlay-spacing-x" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight size={14} className="text-blue-600" />
                  <span>Overlay X</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">Horizontal</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  
                  {/* Gap X - BLUE (espelha Gap X do Layout) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Label className="text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                      Gap X
                    </Label>
                    <Slider
                      value={[gridGutter]}
                      onValueChange={([val]) => setGridGutter(val)}
                      min={0}
                      max={64}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    />
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap">{gridGutter}px</span>
                  </div>

                  {/* Padding X - GREEN (espelha Padding L/R do Layout) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100">
                    <Label className="text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded"></div>
                      Padding X
                    </Label>
                    <Slider
                      value={[gridPadding]}
                      onValueChange={([val]) => setGridPadding(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    />
                    <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap">{gridPadding}px</span>
                  </div>

                  {/* Margin X - ORANGE (espelha Margin L/R do Layout) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100">
                    <Label className="text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded"></div>
                      Margin X
                    </Label>
                    <Slider
                      value={[gridMargin]}
                      onValueChange={([val]) => setGridMargin(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    />
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap">{gridMargin}px</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Overlay Spacing Y */}
            <AccordionItem value="overlay-spacing-y" className="border-0">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-rose-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} className="text-rose-600" />
                  <span>Overlay Y</span>
                  <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">Vertical</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  
                  {/* Gap Y - BLUE (mesma cor de Gap X) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                    <Label className="text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                      Gap Y
                    </Label>
                    <Slider
                      value={[gridGutterY]}
                      onValueChange={([val]) => setGridGutterY(val)}
                      min={0}
                      max={64}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    />
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap">{gridGutterY}px</span>
                  </div>

                  {/* Padding Y - GREEN (espelha Padding T/B do Layout) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100">
                    <Label className="text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded"></div>
                      Padding Y
                    </Label>
                    <Slider
                      value={[gridPaddingY]}
                      onValueChange={([val]) => setGridPaddingY(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    />
                    <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap">{gridPaddingY}px</span>
                  </div>

                  {/* Margin Y - ORANGE (mesma cor de Margin X) - FULL HORIZONTAL */}
                  <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100">
                    <Label className="text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap">
                      <div className="w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded"></div>
                      Margin Y
                    </Label>
                    <Slider
                      value={[gridMarginY]}
                      onValueChange={([val]) => setGridMarginY(val)}
                      min={0}
                      max={96}
                      step={4}
                      className="flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    />
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap">{gridMarginY}px</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* TAB 3 — Visibility */}
        <TabsContent value="visibility" className="p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <Accordion type="multiple" defaultValue={['visibility-main', 'visibility-layers', 'element-grid-visibility']} className="w-full">
            
            {/* 🆕 Element Grid Visibility - Only when editing element */}
            {isEditingElement && (
              <AccordionItem value="element-grid-visibility" className="border-b border-slate-100 bg-green-50/30">
                <AccordionTrigger className="px-4 py-2.5 hover:bg-green-100/50 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-900">Element Grid Visibility</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-3">
                    <div className="p-2 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-xs text-green-800 font-semibold mb-2">
                        🎯 Editing: <strong>{selectedElementInfo?.tagName}</strong> #{selectedElementInfo?.id}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Label htmlFor="element-show-columns" className="text-xs font-semibold text-blue-900">
                        Show Columns
                      </Label>
                      <Switch
                        id="element-show-columns"
                        checked={selectedGridConfig.showColumns}
                        onCheckedChange={(val) => updateSelectedGridConfig({ showColumns: val })}
                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
                      />
                    </div>

                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200">
                      <Label htmlFor="element-show-margins" className="text-xs font-semibold text-orange-900">
                        Show Margins
                      </Label>
                      <Switch
                        id="element-show-margins"
                        checked={selectedGridConfig.showMargins}
                        onCheckedChange={(val) => updateSelectedGridConfig({ showMargins: val })}
                        className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="visibility-main" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-blue-600" />
                  <span>Overlay Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {/* Opacity (70%) + Show Overlay (30%) na mesma linha */}
                <div className="flex items-center gap-3">
                  {/* Opacity - 70% do espaço */}
                  <div className="flex-[0.7] space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-700">Opacity</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[overlayOpacity]}
                        onValueChange={([val]) => setOverlayOpacity(val)}
                        min={0}
                        max={100}
                        step={5}
                        className="flex-1 [&_[role=slider]]:bg-slate-600 [&_[role=slider]]:border-slate-700"
                      />
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded min-w-[45px] text-center">{overlayOpacity}%</span>
                    </div>
                  </div>
                  
                  {/* Show Overlay - 30% do espaço */}
                  <div className="flex-[0.3] space-y-1.5">
                    <Label htmlFor="show-grid" className="text-xs font-semibold text-slate-700">Show Overlay</Label>
                    <div className="flex items-center justify-center">
                      <Switch
                        id="show-grid"
                        checked={showGrid}
                        onCheckedChange={setShowGrid}
                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {showGrid && panelSize === 'expanded' && (
              <AccordionItem value="visibility-layers" className="border-b border-slate-100">
                <AccordionTrigger className="px-4 py-2.5 hover:bg-purple-50/50 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-purple-600" />
                    <span>Layer Visibility</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-3">
                    {/* Seção X (Horizontal) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-blue-100">
                        <ArrowLeftRight size={12} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-700">Horizontal (X)</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-rose-50 rounded-lg border border-rose-200">
                        <Label htmlFor="show-columns" className="text-xs font-semibold text-rose-900 flex items-center gap-2">
                          <div className="w-3 h-3 bg-rose-200/40 border border-rose-400 rounded"></div>
                          Columns
                        </Label>
                        <Switch
                          id="show-columns"
                          checked={showColumns}
                          onCheckedChange={setShowColumns}
                          className="data-[state=checked]:bg-rose-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                        <Label htmlFor="show-padding" className="text-xs font-semibold text-green-900 flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-200/60 border border-green-400 rounded"></div>
                          Padding L/R
                        </Label>
                        <Switch
                          id="show-padding"
                          checked={showPaddingZonesX}
                          onCheckedChange={setShowPaddingZonesX}
                          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200">
                        <Label htmlFor="show-margin" className="text-xs font-semibold text-orange-900 flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-dashed border-orange-500 rounded"></div>
                          Margin L/R
                        </Label>
                        <Switch
                          id="show-margin"
                          checked={showMarginBoundariesX}
                          onCheckedChange={setShowMarginBoundariesX}
                          className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                    </div>

                    {/* Seção Y (Vertical) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-rose-100">
                        <ArrowUpDown size={12} className="text-rose-600" />
                        <span className="text-xs font-bold text-rose-700">Vertical (Y)</span>
                      </div>
                      
                      {/* 🆕 ROW CONTROL - MOVIDO PARA VERTICAL (Y) COMO PRIMEIRA OPÇÃO */}
                      <div className="flex items-center justify-between p-2 bg-rose-50 rounded-lg border border-rose-200">
                        <Label htmlFor="show-rows" className="text-xs font-semibold text-rose-900 flex items-center gap-2">
                          <div className="w-3 h-3 bg-rose-200/40 border border-rose-400 rounded"></div>
                          Rows
                        </Label>
                        <Switch
                          id="show-rows"
                          checked={showRows}
                          onCheckedChange={setShowRows}
                          className="data-[state=checked]:bg-rose-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                      
                      {/* ✅ PADDING Y CONTROL - Connected to GridSection visualization - GREEN (mesma cor de Padding X) */}
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                        <Label htmlFor="show-padding-y" className="text-xs font-semibold text-green-900 flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          Padding T/B
                        </Label>
                        <Switch
                          id="show-padding-y"
                          checked={showPaddingZonesY}
                          onCheckedChange={setShowPaddingZonesY}
                          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200">
                        <Label htmlFor="show-margin-y" className="text-xs font-semibold text-orange-900 flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-dashed border-orange-500 rounded"></div>
                          Margin T/B
                        </Label>
                        <Switch
                          id="show-margin-y"
                          checked={showMarginBoundariesY}
                          onCheckedChange={setShowMarginBoundariesY}
                          className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                    </div>

                    {/* 🆕 Seção Baseline Grid */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-violet-100">
                        <ArrowUpDown size={12} className="text-violet-600" />
                        <span className="text-xs font-bold text-violet-700">Baseline Grid</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-violet-50 rounded-lg border border-violet-200">
                        <Label htmlFor="show-baseline" className="text-xs font-semibold text-violet-900 flex items-center gap-2">
                          <div className="w-3 h-3 border border-violet-400 rounded" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 92, 246, 0.3) 3px, rgba(139, 92, 246, 0.3) 4px)' }}></div>
                          Grid Lines ({baselineGrid})
                        </Label>
                        <Switch
                          id="show-baseline"
                          checked={showBaselineGrid}
                          onCheckedChange={setShowBaselineGrid}
                          className="data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-slate-300"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 pt-2">🔧 Controla quais camadas do overlay são visíveis em cada eixo</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </TabsContent>

        {/* TAB 4 — Advanced */}
        <TabsContent value="advanced" className="p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <Accordion type="multiple" defaultValue={['advanced-brand']} className="w-full">

            {/* Brand Selector */}
            <AccordionItem value="advanced-brand" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-pink-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Palette size={14} className="text-pink-600" />
                  <span>Brand DSS</span>
                  {brand && (
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: brand === 'hub' ? '#ef7a11' : brand === 'water' ? '#0e88e4' : '#0b8154' }}
                    >
                      {brand.toUpperCase()}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-700">Sansys Brand</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* None */}
                    <button
                      onClick={() => setBrand(undefined)}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 col-span-2 ${
                        !brand
                          ? 'bg-slate-200 text-slate-800 border-slate-400'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      None (brand-agnostic)
                    </button>
                    {/* Hub */}
                    <button
                      onClick={() => setBrand('hub')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 ${
                        brand === 'hub'
                          ? 'text-white border-[#ef7a11]'
                          : 'bg-white text-[#ef7a11] border-[#ef7a11]/40 hover:border-[#ef7a11] hover:bg-orange-50'
                      }`}
                      style={brand === 'hub' ? { background: '#ef7a11' } : {}}
                    >
                      Hub (Orange)
                    </button>
                    {/* Water */}
                    <button
                      onClick={() => setBrand('water')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 ${
                        brand === 'water'
                          ? 'text-white border-[#0e88e4]'
                          : 'bg-white text-[#0e88e4] border-[#0e88e4]/40 hover:border-[#0e88e4] hover:bg-blue-50'
                      }`}
                      style={brand === 'water' ? { background: '#0e88e4' } : {}}
                    >
                      Water (Blue)
                    </button>
                    {/* Waste */}
                    <button
                      onClick={() => setBrand('waste')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 col-span-2 ${
                        brand === 'waste'
                          ? 'text-white border-[#0b8154]'
                          : 'bg-white text-[#0b8154] border-[#0b8154]/40 hover:border-[#0b8154] hover:bg-green-50'
                      }`}
                      style={brand === 'waste' ? { background: '#0b8154' } : {}}
                    >
                      Waste (Green)
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Define <code className="font-mono bg-slate-100 px-1 rounded">data-brand</code> em{' '}
                    <code className="font-mono bg-slate-100 px-1 rounded">&lt;html&gt;</code> e habilita validação de tokens de cor por marca.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="advanced-grid" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-indigo-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Grid3x3 size={14} className="text-indigo-600" />
                  <span>Advanced Grid</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div>
                      <Label htmlFor="nested-grid" className="text-xs font-semibold text-indigo-900">
                        🎯 Selection Mode
                      </Label>
                      <p className="text-xs text-indigo-700">Clique para selecionar elementos</p>
                    </div>
                    <Switch
                      id="nested-grid"
                      checked={isSelectionMode}
                      onCheckedChange={setIsSelectionMode}
                      className="data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-slate-300"
                    />
                  </div>
                  
                  {/* Mostrar info do elemento selecionado */}
                  {isSelectionMode && selectedElementInfo && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-green-900">ELEMENTO SELECIONADO</span>
                      </div>
                      <p className="text-xs text-green-800"><strong>Tag:</strong> &lt;{selectedElementInfo.tagName}&gt;</p>
                      <p className="text-xs text-green-800"><strong>ID:</strong> {selectedElementInfo.id}</p>
                      <p className="text-xs text-green-800 break-all"><strong>Class:</strong> {selectedElementInfo.className.substring(0, 50)}...</p>
                    </div>
                  )}
                  
                  {isSelectionMode && !selectedElementInfo && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700">👆 Clique em qualquer elemento da página para inspecioná-lo</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-500">🔧 Ativa modo de seleção para manipular elementos específicos</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="advanced-baseline" className="border-b border-slate-100">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-violet-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} className="text-violet-600" />
                  <span>Baseline Grid</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-700">Grid Size</Label>
                  <ToggleGroup type="single" value={baselineGrid} onValueChange={(v) => v && setBaselineGrid(v as any)} className="grid grid-cols-2 gap-1.5">
                    <ToggleGroupItem value="4px" className="text-xs h-8 data-[state=on]:bg-violet-600 data-[state=on]:text-white">
                      4px
                    </ToggleGroupItem>
                    <ToggleGroupItem value="8px" className="text-xs h-8 data-[state=on]:bg-violet-600 data-[state=on]:text-white">
                      8px
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <p className="text-xs text-slate-500">🔧 Grid de linhas horizontais para alinhamento vertical</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="advanced-density" className="border-0">
              <AccordionTrigger className="px-4 py-2.5 hover:bg-emerald-50/50 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-emerald-600" />
                  <span>Density Mode</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-700">Spacing Density</Label>
                  <ToggleGroup type="single" value={densityMode} onValueChange={(v) => v && setDensityMode(v as any)} className="grid grid-cols-3 gap-1.5">
                    <ToggleGroupItem value="comfortable" className="text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white">
                      Comfort
                    </ToggleGroupItem>
                    <ToggleGroupItem value="compact" className="text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white">
                      Compact
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dense" className="text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white">
                      Dense
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                    <p className="text-xs text-emerald-900 font-semibold">Multiplier:</p>
                    <p className="text-xs text-emerald-700">
                      {densityMode === 'comfortable' && '100% (padrão)'}
                      {densityMode === 'compact' && '75% (reduzido)'}
                      {densityMode === 'dense' && '50% (denso)'}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">🔧 Aplica multiplicador global em todos os spacings</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* TAB 5 — Alerts (DSS compliance violations) */}
        <TabsContent value="alerts" className="p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {violations.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
              <CheckCircle size={32} className="text-emerald-500" />
              <p className="text-sm font-bold text-emerald-700">Nenhum erro detectado</p>
              <p className="text-xs text-slate-500">Todos os valores estão dentro dos tokens DSS</p>
              {/* Export button even when clean — useful for CI/handoff */}
              <button
                onClick={exportReport}
                className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-200 transition-all"
              >
                <Download size={11} />
                Exportar relatório
              </button>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-700">
                  {violations.length} {violations.length === 1 ? 'problema' : 'problemas'} detectado{violations.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2">
                  {highlightedElementIndex !== null && (
                    <button
                      onClick={() => setHighlightedElementIndex(null)}
                      className="text-[10px] text-slate-500 hover:text-slate-700 underline"
                    >
                      limpar seleção
                    </button>
                  )}
                  <button
                    onClick={exportReport}
                    title="Exportar relatório JSON"
                    className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded border border-slate-200 hover:border-red-200 transition-all"
                  >
                    <Download size={10} />
                    Export
                  </button>
                </div>
              </div>

              {violations.map((v) => {
                const severityConfig = {
                  critical: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-500' },
                  high:     { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-500' },
                  medium:   { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-500' },
                  low:      { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-400' },
                }[v.severity];

                const isActive = v.elementIndex !== undefined && highlightedElementIndex === v.elementIndex;

                return (
                  <div
                    key={v.id}
                    className={`p-2.5 rounded-lg border-2 transition-all duration-200 ${severityConfig.bg} ${
                      isActive ? 'border-red-500 shadow-md shadow-red-200/50' : severityConfig.border
                    } ${v.elementIndex !== undefined ? 'cursor-pointer hover:shadow-sm' : ''}`}
                    onClick={() => {
                      if (v.elementIndex !== undefined) {
                        setHighlightedElementIndex(isActive ? null : v.elementIndex);
                      }
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white flex-shrink-0 ${severityConfig.badge}`}>
                        {v.severity}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${severityConfig.text} leading-snug`}>{v.message}</p>
                        {v.affectedProperty && (
                          <code className="text-[10px] text-slate-500 mt-0.5 block truncate">
                            {v.affectedProperty}{v.affectedValue !== undefined ? `: ${v.affectedValue}px` : ''}
                          </code>
                        )}
                        {v.elementIndex !== undefined && (
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <span>↗</span> Clique para destacar no overlay
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <p className="text-[10px] text-slate-400 pt-1 text-center">
                Tokens DSS válidos: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px
              </p>
            </div>
          )}

          {/* Footer: MCP source indicator */}
          <div className={`px-3 py-2 border-t flex items-center gap-1.5 text-[10px] font-medium ${
            mcpConnected ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-400'
          }`}>
            {mcpConnected ? <Wifi size={10} /> : <WifiOff size={10} />}
            {mcpConnected ? 'Validação via MCP Server' : 'Validação local (MCP offline)'}
          </div>
        </TabsContent>
      </Tabs>

      {/* LEGENDA FIXA (só aparece quando showGrid = true) */}
      {showGrid && (
        <div className="border-t border-slate-200 p-3 bg-gradient-to-br from-slate-50 to-blue-50 flex-shrink-0">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            Color Legend
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-rose-200/40 border-2 border-rose-400 rounded"></div>
              <span className="text-xs text-slate-700 font-medium">Columns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 border-2 border-dashed border-green-500 rounded"></div>
              <span className="text-xs text-slate-700 font-medium">Padding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 border-2 border-dashed border-orange-500 rounded"></div>
              <span className="text-xs text-slate-700 font-medium">Margin</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}