import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Detecta e rastreia a preferência do usuário por movimento reduzido.
 *
 * Ouve `prefers-reduced-motion: reduce` via MediaQueryList.
 * Reativo: atualiza `isReducedMotion` quando o usuário altera a preferência
 * sem recarregar a página.
 *
 * Usado pelo DssParallax para substituir o efeito de paralaxe por um
 * fallback estático quando a preferência de movimento reduzido está ativa.
 */
export function useReducedMotion() {
  const isReducedMotion = ref(false)
  let mediaQuery: MediaQueryList | null = null

  function handleChange(event: MediaQueryListEvent) {
    isReducedMotion.value = event.matches
  }

  onMounted(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      isReducedMotion.value = mediaQuery.matches
      mediaQuery.addEventListener('change', handleChange)
    }
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleChange)
  })

  return { isReducedMotion }
}
