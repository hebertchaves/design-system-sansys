import { computed } from 'vue'
import type { SkeletonProps } from '../types/skeleton.types'

const QUASAR_TYPE_MAP: Record<string, string> = {
  rect: 'rect',
  text: 'text',
  circle: 'circle',
  heading: 'rect',
  avatar: 'circle',
}

const QUASAR_ANIMATION_MAP: Record<string, string> = {
  wave: 'wave',
  pulse: 'pulse',
  none: 'none',
}

export function useSkeletonClasses(props: SkeletonProps) {
  const resolvedType = computed(() => props.type ?? 'rect')
  const resolvedAnimation = computed(() => props.animation ?? 'wave')
  const resolvedLines = computed(() => props.lines ?? 1)

  const isMulti = computed(() =>
    resolvedType.value === 'text' && resolvedLines.value > 1,
  )

  const quasarType = computed(() => QUASAR_TYPE_MAP[resolvedType.value] ?? 'rect')
  const quasarAnimation = computed(() => QUASAR_ANIMATION_MAP[resolvedAnimation.value] ?? 'wave')

  const skeletonItems = computed(() => {
    const count = isMulti.value ? resolvedLines.value : 1
    return Array.from({ length: count }, (_, i) => ({
      width: isMulti.value && i === count - 1 ? '70%' : props.width,
    }))
  })

  const rootClasses = computed(() => [
    'dss-skeleton',
    `dss-skeleton--type-${resolvedType.value}`,
    `dss-skeleton--anim-${resolvedAnimation.value}`,
    {
      [`dss-skeleton--brand-${props.brand}`]: !!props.brand,
      'dss-skeleton--multi': isMulti.value,
    },
  ])

  const rootStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.radius) {
      style['--dss-skeleton-radius'] = `var(${props.radius})`
    }
    return style
  })

  return {
    rootClasses,
    rootStyle,
    quasarType,
    quasarAnimation,
    skeletonItems,
  }
}
