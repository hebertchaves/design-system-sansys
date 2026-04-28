import React from 'react';
import './dss-badge.css';

/**
 * DssBadge - Badge component DSS
 * 
 * Wrapper DSS baseado no QBadge, com API pública governada pelo Design System Sansys.
 * 
 * FUNCIONALIDADES:
 * - Cores semânticas completas + brandabilidade
 * - Variantes: default, transparent, outline, rounded
 * - Floating badge (notificações)
 * - Dot indicator (vazio)
 * - Multi-line support
 * - Alinhamento vertical
 * 
 * @version 2.3 (React adaptation)
 * @see https://github.com/hebertchaves/design-system-sansys/tree/main/components/base/DssBadge
 */

export interface DssBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Conteúdo do badge */
  label?: string | number;
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info';
  /** Cor do texto (sobrescreve cor padrão) */
  textColor?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info' | 'white' | 'dark';
  /** Brand (hub, water, waste) */
  brand?: 'hub' | 'water' | 'waste';
  /** Badge posicionado de forma absoluta (top-right) */
  floating?: boolean;
  /** Alinhamento vertical */
  align?: 'top' | 'middle' | 'bottom';
  /** Badge com fundo transparente */
  transparent?: boolean;
  /** Badge com borda colorida (sem preenchimento) */
  outline?: boolean;
  /** Badge com bordas mais arredondadas */
  rounded?: boolean;
  /** Permite texto em múltiplas linhas */
  multiLine?: boolean;
  /** ARIA label para screen readers */
  ariaLabel?: string;
  /** Children (substitui label) */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssBadge({
  label,
  color = 'primary',
  textColor,
  brand,
  floating = false,
  align,
  transparent = false,
  outline = false,
  rounded = false,
  multiLine = false,
  ariaLabel,
  children,
  className = '',
  ...props
}: DssBadgeProps) {
  // Badge vazio = dot indicator
  const isEmpty = !label && !children;

  const classes = [
    'dss-badge',
    `dss-badge--${color}`,
    textColor && `dss-badge--text-${textColor}`,
    brand && `dss-badge--brand-${brand}`,
    floating && 'dss-badge--floating',
    align && `dss-badge--align-${align}`,
    transparent && 'dss-badge--transparent',
    outline && 'dss-badge--outline',
    rounded && 'dss-badge--rounded',
    multiLine && 'dss-badge--multi-line',
    isEmpty && 'dss-badge--empty',
    className
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      {children || label}
    </span>
  );
}