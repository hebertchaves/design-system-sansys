// DssScrollArea — TypeScript interfaces

export interface ScrollPayload {
  position: { top: number; left: number }
  direction?: 'up' | 'down' | 'left' | 'right'
  delta?: { top: number; left: number }
  inflectionPoint?: { top: number; left: number }
  overflow?: boolean
}

export interface DssScrollAreaProps {
  /**
   * Controls scrollbar visibility.
   * 'auto' = show on hover/scroll (default Quasar behavior),
   * 'always' = always visible,
   * 'never' = always hidden.
   */
  visible?: 'auto' | 'always' | 'never'

  /** Enable horizontal scrolling in addition to vertical */
  horizontal?: boolean

  /**
   * Delay in milliseconds before the scrollbar hides after scroll ends.
   * Only applies when visible === 'auto'.
   */
  barDelay?: number

  /**
   * External element or CSS selector to use as scroll target.
   * When provided, the scroll detection attaches to this element instead.
   */
  scrollTarget?: Element | string

  /**
   * Accessible label for the scroll region.
   * When provided, adds role="region" and aria-label to the root element,
   * making the scroll area identifiable by screen readers.
   */
  label?: string
}

export interface DssScrollAreaEmits {
  /**
   * Emitted during scroll.
   * Payload mirrors Quasar's QScrollArea @scroll event.
   */
  (e: 'scroll', payload: ScrollPayload): void
}

export interface DssScrollAreaSlots {
  /** Content to be scrolled */
  default: () => unknown
}
