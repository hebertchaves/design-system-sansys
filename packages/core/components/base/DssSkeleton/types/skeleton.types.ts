export type SkeletonType = 'rect' | 'text' | 'circle' | 'heading' | 'avatar'
export type SkeletonAnimation = 'wave' | 'pulse' | 'none'
export type SkeletonBrand = 'hub' | 'water' | 'waste'
export type SkeletonRadius =
  | '--dss-radius-none'
  | '--dss-radius-sm'
  | '--dss-radius-md'
  | '--dss-radius-lg'
  | '--dss-radius-xl'
  | '--dss-radius-2xl'
  | '--dss-radius-3xl'
  | '--dss-radius-full'

export interface SkeletonProps {
  type?: SkeletonType
  width?: string
  height?: string
  lines?: number
  animation?: SkeletonAnimation
  bordered?: boolean
  tag?: string
  radius?: SkeletonRadius
  brand?: SkeletonBrand
}

export interface SkeletonSlots {
  // DssSkeleton does not expose slots — it is a pure visual placeholder.
}
