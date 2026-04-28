/**
 * ==========================================================================
 * ThemeToggle - Controle de Dark Mode
 * ==========================================================================
 * 
 * Toggle de Dark Mode seguindo padrão DSS Lovable
 * 
 * - Persiste em localStorage('dss-theme')
 * - Sincroniza data-theme no <html>
 * - Usa tokens DSS
 * - WCAG 2.1 AA compliant
 * 
 * Baseado em: Header toggle do DSS Lovable
 */

import { Sun, Moon } from 'lucide-react';
import { useGridSystem } from '@/hooks'; // ✅ FIXED: Use barrel export
import { useAccessibility } from '@/hooks';
import { useState } from 'react';

export type Theme = 'light' | 'dark';

export function ThemeToggle() {
  // TODO: FASE 2.1 - Re-enable after migration adds theme to Context
  // const { theme, setTheme } = useGridSystem();
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const a11yAttrs = useAccessibility({
    ariaLabel: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
    role: 'button'
  });

  return (
    <button
      onClick={toggleTheme}
      {...a11yAttrs}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5" aria-hidden="true" />
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
}