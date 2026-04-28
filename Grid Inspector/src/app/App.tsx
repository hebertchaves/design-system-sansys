import { useState } from 'react';
import { GridGuideHeader } from '@/app/components/GridGuideHeader';
import { FloatingGridInspector } from '@/app/components/FloatingGridInspector';
import { GridVariations } from '@/app/components/GridVariations';
import { DashboardExample } from '@/app/components/examples/DashboardExample';
import { GridDocumentation } from '@/app/components/GridDocumentation';
import NestedGridTest from '@/app/pages/NestedGridTest';
import { useGridSystem, GridSystemProvider } from '@/hooks'; // ✅ Import Provider
import { NestedGridProvider } from '@/app/contexts/NestedGridContext'; // 🆕 Import NestedGrid Provider
import '@/app/components/dss/tokens/dss-tokens.css'; // 🎨 Tokens DSS

console.log('[DIAGNOSTIC v2.1.2] 📦 App.tsx module loaded');

// ✅ Inner component that uses the Context
function AppContent() {
  console.log('[DIAGNOSTIC v2.1.2] AppContent rendering');
  
  // ✅ ONLY non-grid state remains - v2.1.1
  const [activeSection, setActiveSection] = useState<'variations' | 'dashboard' | 'docs' | 'nested-test'>('variations');
  
  // ✅ Read showInspector from Context - v2.1.1
  const { showInspector } = useGridSystem();
  
  console.log('[DIAGNOSTIC v2.1.2] useGridSystem() succeeded, showInspector:', showInspector);

  // Páginas que devem mostrar o Floating Inspector
  const showFloatingInspector = ['dashboard', 'nested-test'].includes(activeSection);
  
  return (
    <div className="min-h-screen bg-slate-200">
      <GridGuideHeader 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        {activeSection === 'variations' && (
          <GridVariations />
        )}

        {activeSection === 'dashboard' && (
          <DashboardExample />
        )}

        {activeSection === 'docs' && (
          <GridDocumentation />
        )}

        {activeSection === 'nested-test' && (
          <NestedGridTest />
        )}
      </main>

      {/* Floating Grid Inspector - Aparece nas páginas demonstrativas */}
      {showFloatingInspector && showInspector && (
        <FloatingGridInspector />
      )}
    </div>
  );
}

export default function App() {
  return (
    <GridSystemProvider>
      <NestedGridProvider>
        <AppContent />
      </NestedGridProvider>
    </GridSystemProvider>
  );
}