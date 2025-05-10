type Product = {
  id: number
  name: string
  price: number
  image?: string
  discount?: number
  description?: string
  tags?: Tags[] | string[]
  options?: {
    sizes?: { label: string; price: number; discount?: number }[]
    accompaniments?: string[]
    drinks?: { name: string; price: number }[]
    utensils?: { name: string; price: number }[]
  }
  categoryId?: number
}

type Category = {
  id: number
  name: string
  slug: string
  description?: string
  hasPromotion?: boolean
  products: Product[]
}

type Tags = 'vegan' | 'spiced'

export type { Product, Category, Tags }
