import { ReactNode } from 'react';

interface GridSectionProps {
  children: ReactNode;
  showSpacing?: boolean;
  paddingY?: number;
  gutterY?: number;
  isFirst?: boolean;
  isLast?: boolean;
}

export function GridSection({ 
  children, 
  showSpacing = false, 
  paddingY = 0,
  gutterY = 0,
  isFirst = false,
  isLast = false
}: GridSectionProps) {
  return (
    <div className="relative transition-all duration-300">
      {/* Bordas ABRAÇANDO o conteúdo (como as bordas azuis das colunas) */}
      {showSpacing && (
        <div className="absolute inset-0 border-2 border-rose-300/25 pointer-events-none rounded-lg transition-all duration-300" style={{ zIndex: 50 }}></div>
      )}

      {/* Conteúdo da seção */}
      {children}
    </div>
  );
}