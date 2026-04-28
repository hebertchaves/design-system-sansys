import React from 'react';
import './dss-card.css';

/**
 * ==========================================================================
 * DssCard - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Container versátil para conteúdo com suporte a:
 * - 3 variantes visuais (elevated, filled, outlined)
 * - Cores semânticas completas
 * - Brandabilidade (hub, water, waste)
 * - Composição com DssCardSection e DssCardActions
 * - Suporte a cards clicáveis com acessibilidade
 * @version 2.0 (React)
 */

export interface DssCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante visual do card */
  variant?: 'elevated' | 'filled' | 'outlined';
  /** Cor semântica do card */
  color?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative' | 'warning' | 'info';
  /** Brand do card (hub, water, waste) - sobrescreve color */
  brand?: 'hub' | 'water' | 'waste';
  /** Torna o card clicável */
  clickable?: boolean;
  /** Conteúdo do card */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssCard({
  variant = 'elevated',
  color,
  brand,
  clickable = false,
  children,
  className = '',
  onClick,
  onKeyDown,
  ...props
}: DssCardProps) {
  const classes = [
    'dss-card',
    `dss-card--${variant}`,
    color && `dss-card--${color}`,
    brand && `dss-card--brand-${brand}`,
    (clickable || onClick) && 'dss-card--clickable',
    className
  ].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((clickable || onClick) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as any);
    }
    onKeyDown?.(e);
  };

  return (
    <div 
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={(clickable || onClick) ? 'button' : undefined}
      tabIndex={(clickable || onClick) ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * DssCardSection - Seção de conteúdo dentro do card
 */
export interface DssCardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título da seção (opcional) */
  title?: string;
  /** Subtítulo da seção (opcional) */
  subtitle?: string;
  /** Conteúdo da seção */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssCardSection({
  title,
  subtitle,
  children,
  className = '',
  ...props
}: DssCardSectionProps) {
  return (
    <div className={`dss-card__section ${className}`} {...props}>
      {title && <h3 className="dss-card__title">{title}</h3>}
      {subtitle && <p className="dss-card__subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

/**
 * DssCardActions - Seção de ações/botões dentro do card
 */
export interface DssCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alinhamento das ações */
  align?: 'left' | 'center' | 'right';
  /** Conteúdo (botões, etc.) */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssCardActions({
  align = 'right',
  children,
  className = '',
  ...props
}: DssCardActionsProps) {
  return (
    <div className={`dss-card__actions dss-card__actions--${align} ${className}`} {...props}>
      {children}
    </div>
  );
}