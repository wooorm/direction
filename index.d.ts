type Directionality = 'rtl' | 'ltr' | 'neutral'

type DirectionFn = (value?: string) => Directionality

declare const direction: DirectionFn

export = direction
export as namespace direction
