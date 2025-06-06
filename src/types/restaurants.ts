import { Category } from './products'

type Restaurant = {
  id: number
  name: string
  slug: string
  logo: string
  deliveryFee: number
  rating: number
  distance: number
  minimumOrder: number
  deliveryTime: string
  freeDeliveryThreshold?: number
  openAt?: string
  closedAt?: string
  description?: string
  hasDeliveryPromotion?: boolean
  isOpen?: boolean
  categories: Category[]
}

export type { Restaurant }
