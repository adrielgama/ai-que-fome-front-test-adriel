import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/products'

interface ProductState {
  products: Product[]
  setProducts: (items: Product[]) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (items) => set({ products: items }),
    }),
    {
      name: 'restaurant-products',
    }
  )
)
