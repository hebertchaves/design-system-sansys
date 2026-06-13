<script setup lang="ts">
/**
 * ==========================================================================
 * DssChatMessage — Layer 1: Structure
 * ==========================================================================
 *
 * Componente DSS customizado para exibição de mensagens individuais de chat.
 * Classificação: Componente Composto Interativo (Fase 2 — Nível 2, Família Conteúdo Rico)
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssCarousel (composto Fase 2, usa subcomponentes DSS internamente)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado ao <article> via v-bind="$attrs".
 *   → Permite forwarding de class, style, aria-*, data-* e event handlers adicionais.
 *
 * Sem motor Quasar (EXC-Arch-01)
 *   → QChatMessage do Quasar é primitivo demais: text=[array], sem slots ricos,
 *     sem status icons, sem estados de entrega/leitura.
 *   → DssChatMessage é implementação HTML semântica customizada com DssAvatar e DssIcon.
 *   → Justificativa: limitação estrutural do QChatMessage inviabiliza wrapping.
 *
 * role="listitem"
 *   → Mensagens de chat são itens de lista (WAI-ARIA listitem).
 *   → O contêiner pai DEVE ter role="list" ou role="feed".
 *   → aria-label dinâmico compõe: remetente + timestamp + status (para leitores de tela).
 *
 * DssAvatar interno (slot + auto-render)
 *   → Slot "avatar" permite customização completa.
 *   → Se avatarSrc for fornecido e slot não preenchido, DssAvatar é renderizado.
 *   → showAvatar: true por padrão (controle explícito do consumidor).
 *
 * DssIcon para status de mensagem
 *   → Ícones: schedule (sending), done (sent), done_all (delivered/read), error_outline (error).
 *   → Cor via CSS herança (currentColor) — DssIcon usa color:inherit por design.
 *
 * Long press (~500ms)
 *   → Implementado via pointerdown/pointerup com timeout.
 *   → Cancelado por pointermove/pointercancel (scroll, saída de área).
 *   → Emite evento 'long-press' com PointerEvent original para menus contextuais.
 *
 * Touch target (WCAG 2.5.5)
 *   → N/A — DssChatMessage é container de conteúdo, não controle compacto.
 *   → Área de clique = tamanho natural da mensagem (sempre ≥ 48px em altura).
 *
 * Props bloqueadas (não expostas ao consumidor)
 *   → bgColor/textColor: cores governadas por tokens DSS e brand system.
 *   → avatarPosition: posição controlada por isMine (esquerda=received, direita=mine).
 *
 * @see DssChip (Golden Reference — componente interativo, touch target ::before)
 * @see DssCarousel (Golden Context — composto Fase 2, EXC-Arch-01 precedente)
 * @version 1.0.0
 */

import { computed, useSlots, ref, onBeforeUnmount } from 'vue'
import DssAvatar from '../../../base/DssAvatar/DssAvatar.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import type { DssChatMessageProps, DssChatMessageEmits, DssChatMessageSlots } from '../types/chatmessage.types'
import { useChatMessageClasses } from '../composables/useChatMessageClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssChatMessage',
  inheritAttrs: false,
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssChatMessageProps>(), {
  showAvatar: true,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssChatMessageEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssChatMessageSlots>()

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { rootClasses } = useChatMessageClasses(props)

// ==========================================================================
// STATUS ICON MAPPING
// ==========================================================================

const STATUS_ICONS: Record<string, string> = {
  sending: 'schedule',
  sent: 'done',
  delivered: 'done_all',
  read: 'done_all',
  error: 'error_outline',
}

const statusIcon = computed(() =>
  props.status ? (STATUS_ICONS[props.status] ?? null) : null
)

// ==========================================================================
// COMPUTED
// ==========================================================================

/** Iniciais para avatar placeholder quando avatarSrc não fornecido */
const initials = computed(() => {
  if (!props.senderName) return '?'
  return props.senderName
    .split(' ')
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('')
})

/** aria-label acessível composto (remetente + timestamp + status) */
const ariaLabel = computed(() => {
  const parts: string[] = []
  if (props.senderName) parts.push(`Mensagem de ${props.senderName}`)
  else if (props.isMine) parts.push('Mensagem enviada')
  else parts.push('Mensagem recebida')
  if (props.timestamp) parts.push(`em ${props.timestamp}`)
  if (props.status) {
    const statusLabels: Record<string, string> = {
      sending: 'enviando',
      sent: 'enviada',
      delivered: 'entregue',
      read: 'lida',
      error: 'erro no envio',
    }
    parts.push(`status: ${statusLabels[props.status] ?? props.status}`)
  }
  return parts.join(', ')
})

// ==========================================================================
// LONG PRESS
// ==========================================================================

let longPressTimer: ReturnType<typeof setTimeout> | null = null
let longPressEvent: PointerEvent | null = null

const handlePointerDown = (event: PointerEvent) => {
  if (props.disable) return
  longPressEvent = event
  longPressTimer = setTimeout(() => {
    if (longPressEvent) {
      emit('long-press', longPressEvent)
    }
  }, 500)
}

const cancelLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  longPressEvent = null
}

onBeforeUnmount(() => {
  cancelLongPress()
})

// ==========================================================================
// CLICK
// ==========================================================================

const handleClick = (event: MouseEvent) => {
  if (props.disable) return
  emit('click', event)
}
</script>

<template>
  <article
    v-bind="$attrs"
    :class="rootClasses"
    class="dss-chat-message"
    :aria-label="ariaLabel"
    role="listitem"
    @click="handleClick"
    @pointerdown="handlePointerDown"
    @pointerup="cancelLongPress"
    @pointermove="cancelLongPress"
    @pointercancel="cancelLongPress"
  >
    <!-- Avatar área (mensagens recebidas — lado esquerdo) -->
    <div
      v-if="!isMine && showAvatar"
      class="dss-chat-message__avatar-area"
      aria-hidden="true"
    >
      <slot name="avatar">
        <DssAvatar
          :size="compact ? 'sm' : 'md'"
          class="dss-chat-message__avatar"
        >
          <img
            v-if="avatarSrc"
            :src="avatarSrc"
            :alt="senderName ?? ''"
            class="dss-chat-message__avatar-img"
          />
          <span v-else aria-hidden="true">{{ initials }}</span>
        </DssAvatar>
      </slot>
    </div>

    <!-- Conteúdo principal -->
    <div class="dss-chat-message__main">
      <!-- Nome do remetente (somente mensagens recebidas) -->
      <div
        v-if="!isMine && (senderName || slots['sender-name'])"
        class="dss-chat-message__sender-name"
      >
        <slot name="sender-name">{{ senderName }}</slot>
      </div>

      <!-- Bolha da mensagem -->
      <div class="dss-chat-message__bubble">
        <!-- Conteúdo -->
        <div class="dss-chat-message__content">
          <slot>
            <p v-if="message" class="dss-chat-message__text">{{ message }}</p>
          </slot>
        </div>

        <!-- Metadados: timestamp + ícone de status -->
        <div
          v-if="timestamp || status"
          class="dss-chat-message__meta"
          aria-hidden="true"
        >
          <time
              v-if="timestamp"
              class="dss-chat-message__timestamp"
              :datetime="datetimeValue"
            >{{ timestamp }}</time>
          <span
            v-if="status && statusIcon"
            :class="`dss-chat-message__status dss-chat-message__status--${status}`"
          >
            <DssIcon
              :name="statusIcon"
              size="xs"
              decorative
            />
          </span>
        </div>
      </div>

      <!-- Ações contextuais -->
      <div v-if="slots.actions" class="dss-chat-message__actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- Avatar área (mensagens enviadas — lado direito) -->
    <div
      v-if="isMine && showAvatar"
      class="dss-chat-message__avatar-area dss-chat-message__avatar-area--mine"
      aria-hidden="true"
    >
      <slot name="avatar">
        <DssAvatar
          v-if="avatarSrc || senderName"
          :size="compact ? 'sm' : 'md'"
          class="dss-chat-message__avatar"
        >
          <img
            v-if="avatarSrc"
            :src="avatarSrc"
            :alt="senderName ?? ''"
            class="dss-chat-message__avatar-img"
          />
          <span v-else aria-hidden="true">{{ initials }}</span>
        </DssAvatar>
      </slot>
    </div>
  </article>
</template>
