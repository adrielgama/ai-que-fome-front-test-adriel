import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Restaurant } from '@/types/restaurants'

interface RestaurantState {
  restaurant: Restaurant | null
  setRestaurant: (r: Restaurant) => void
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurant: null,
      setRestaurant: (r) => set({ restaurant: r }),
    }),
    { name: 'restaurant-data' }
  )
)
