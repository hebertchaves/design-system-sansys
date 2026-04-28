import React from 'react';
import './dss-avatar.css';

/**
 * DssAvatar - Avatar component DSS
 * 
 * Wrapper DSS baseado no QAvatar, com API pública governada pelo Design System Sansys.
 * 
 * FUNCIONALIDADES:
 * - 5 tamanhos (xs: 32px, sm: 40px, md: 48px, lg: 64px, xl: 80px)
 * - 3 formas (circular [padrão], square, rounded)
 * - 8 cores semânticas + brandabilidade (hub, water, waste)
 * - Status indicator (online, away, busy, offline)
 * - Suporte a: imagem, iniciais, ícone, slot customizado
 * - Clicável (onClick)
 * - Avatar groups com overlap
 * - Acessibilidade WCAG 2.1 AA
 * 
 * @version 2.2 (React adaptation)
 * @see https://github.com/hebertchaves/design-system-sansys/tree/main/components/base/DssAvatar
 */

export interface DssAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tamanho do avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** URL da imagem */
  src?: string;
  /** Iniciais do nome (ex: "HC") */
  initials?: string;
  /** Ícone Material Icon (ex: "person", "business") */
  icon?: string;
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info';
  /** Cor do texto/ícone */
  textColor?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info' | 'white' | 'dark';
  /** Brand (hub, water, waste) */
  brand?: 'hub' | 'water' | 'waste';
  /** Forma quadrada (border-radius: 0) */
  square?: boolean;
  /** Forma arredondada (border-radius: 8px) */
  rounded?: boolean;
  /** Status indicator */
  status?: 'online' | 'away' | 'busy' | 'offline';
  /** Alt text para imagem */
  alt?: string;
  /** ARIA label para screen readers */
  ariaLabel?: string;
  /** Children (conteúdo customizado) */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
  /** Callback de click (torna o avatar clicável) */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function DssAvatar({
  size = 'md',
  src,
  initials,
  icon,
  color,
  textColor,
  brand,
  square = false,
  rounded = false,
  status,
  alt = 'Avatar',
  ariaLabel,
  children,
  className = '',
  onClick,
  ...props
}: DssAvatarProps) {
  const classes = [
    'dss-avatar',
    `dss-avatar--${size}`,
    square && 'dss-avatar--square',
    rounded && 'dss-avatar--rounded',
    color && `bg-${color}`,
    textColor && `text-${textColor}`,
    brand && `dss-avatar--brand-${brand}`,
    status && 'dss-avatar--with-status',
    onClick && 'dss-avatar--clickable',
    className
  ].filter(Boolean).join(' ');

  // Renderiza conteúdo baseado na prioridade
  const renderContent = () => {
    // 1. Children customizado
    if (children) {
      return <div className="dss-avatar__content">{children}</div>;
    }

    // 2. Imagem
    if (src) {
      return (
        <div className="dss-avatar__content">
          <img src={src} alt={alt} />
        </div>
      );
    }
    
    // 3. Iniciais
    if (initials) {
      return (
        <div className="dss-avatar__content">
          <span>{initials}</span>
        </div>
      );
    }
    
    // 4. Ícone customizado ou padrão
    const iconName = icon || 'person';
    return (
      <div className="dss-avatar__content">
        <span className="dss-avatar__icon material-icons">{iconName}</span>
      </div>
    );
  };

  const avatarProps = {
    className: classes,
    role: onClick ? 'button' : (src ? 'img' : undefined),
    'aria-label': ariaLabel || (src ? alt : undefined),
    tabIndex: onClick ? 0 : undefined,
    onClick,
    onKeyDown: onClick ? (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e as any);
      }
    } : undefined,
    ...props
  };

  return (
    <div {...avatarProps}>
      {renderContent()}
      {status && (
        <span className={`dss-avatar__status dss-avatar__status--${status}`} aria-label={`Status: ${status}`}></span>
      )}
    </div>
  );
}