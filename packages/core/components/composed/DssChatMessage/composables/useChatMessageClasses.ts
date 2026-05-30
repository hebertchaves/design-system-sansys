import { computed } from 'vue'
import type { DssChatMessageProps } from '../types/chatmessage.types'

export function useChatMessageClasses(props: DssChatMessageProps) {
  const rootClasses = computed(() => ({
    'dss-chat-message--mine': props.isMine,
    'dss-chat-message--received': !props.isMine,
    'dss-chat-message--compact': props.compact,
    'dss-chat-message--selected': props.selected,
    'dss-chat-message--disable': props.disable,
    [`dss-chat-message--status-${props.status}`]: !!props.status,
  }))

  return { rootClasses }
}
