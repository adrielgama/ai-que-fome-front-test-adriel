type Tags = 'vegan' | 'spiced'
type Sizes = { label: string; price: number; discount?: number }[]
type OptionItem = { name: string; price: number }

type Product = {
  id: number
  name: string
  price: number
  image?: string
  discount?: number
  description?: string
  tags?: Tags[] | string[]
  options?: {
    sizes?: Sizes
    accompaniments?: string[]
    drinks?: OptionItem[]
    utensils?: OptionItem[]
    others?: OptionItem[]
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

export type { Product, Category, Tags, Sizes, OptionItem }
