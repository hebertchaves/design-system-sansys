import { computed } from 'vue'

// Sem parâmetro de props enquanto DssParallax não tiver variantes CSS.
// Quando variantes (ex: radius) forem adicionadas, receber DssParallaxProps aqui.
export function useParallaxClasses() {
  const rootClasses = computed(() => ['dss-parallax'])

  return { rootClasses }
}
