import React from 'react';
import './dss-chip.css';

/**
 * ==========================================================================
 * DssChip - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Chip interativo com:
 * - Variantes (filled, outlined)
 * - Cores semânticas completas
 * - Avatar/ícone opcional
 * - Ação de delete
 * - Brandabilidade
 * - Estados interativos completos
 * @version 2.0 (React)
 */

export interface DssChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante visual */
  variant?: 'filled' | 'outlined';
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative' | 'warning' | 'info';
  /** Brand (hub, water, waste) - sobrescreve color */
  brand?: 'hub' | 'water' | 'waste';
  /** Label do chip */
  label: string;
  /** Ícone prefixo (Material Symbol) */
  icon?: string;
  /** Avatar URL */
  avatar?: string;
  /** Callback de delete */
  onDelete?: () => void;
  /** Callback de clique no chip (torna o chip clicável) */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssChip({
  variant = 'filled',
  color = 'primary',
  brand,
  label,
  icon,
  avatar,
  onDelete,
  onClick,
  disabled = false,
  className = '',
  ...props
}: DssChipProps) {
  const classes = [
    'dss-chip',
    `dss-chip--${variant}`,
    brand ? `dss-chip--brand-${brand}` : `dss-chip--${color}`,
    disabled && 'dss-chip--disabled',
    (onDelete || onClick) && !disabled && 'dss-chip--interactive',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={classes} 
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={onClick && !disabled ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    >
      {avatar && (
        <img src={avatar} alt="" className="dss-chip__avatar" />
      )}
      {icon && !avatar && (
        <span className="dss-chip__icon material-symbols-outlined">{icon}</span>
      )}
      <span className="dss-chip__label">{label}</span>
      {onDelete && !disabled && (
        <button
          type="button"
          className="dss-chip__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Remover"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  );
}