import { Grid3x3, LayoutDashboard, BookOpen, Settings, Target } from 'lucide-react';
import { useGridSystem } from '@/hooks';

interface GridGuideHeaderProps {
  activeSection: string;
  setActiveSection: (section: 'variations' | 'dashboard' | 'docs' | 'nested-test') => void;
}

export function GridGuideHeader({
  activeSection,
  setActiveSection,
}: GridGuideHeaderProps) {
  // ✅ Read from Context (for future features like grid toggle in header)
  const { showGrid, setShowGrid } = useGridSystem();
  
  console.log('[DEBUG] GridGuideHeader rendering, activeSection:', activeSection);
  
  const navItems = [
    { id: 'variations', label: 'Variações de Grid', icon: Grid3x3 },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'docs', label: 'Documentação', icon: BookOpen },
    { id: 'nested-test', label: 'Teste Aninhado', icon: Target },
  ];

  console.log('[DEBUG] navItems:', navItems.length, 'items');

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
      <div className="px-6 py-4">
        {/* Título */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Guia Visual de Grid</h1>
            <p className="text-sm text-slate-600">Sistema de Layout para UI Design Corporativo</p>
          </div>

          {/* Info sobre o Floating Inspector */}
          {['dashboard'].includes(activeSection) && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Settings size={16} className="text-blue-600" />
              <span className="text-xs text-blue-700 font-medium">
                Use o painel flutuante →
              </span>
            </div>
          )}
          
          {/* Info sobre Nested Grid Test */}
          {activeSection === 'nested-test' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
              <Target size={16} className="text-indigo-600" />
              <span className="text-xs text-indigo-700 font-medium">
                Ative "Selection Mode" no painel →
              </span>
            </div>
          )}
        </div>

        {/* Menu de Navegação */}
        <nav className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            console.log('[DEBUG] Rendering nav item:', item.id, 'isActive:', isActive);
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  console.log('[DEBUG] Clicked:', item.id);
                  setActiveSection(item.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}