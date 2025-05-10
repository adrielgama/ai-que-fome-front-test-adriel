'use client'

import { useEffect } from 'react'
import { useProductStore } from '@/store/product-store'
import { useRestaurantStore } from '@/store/restaurant-store'
import { Category } from '@/types/products'
import { Restaurant } from '@/types/restaurants'

export default function ClientRestaurantLoader({
  restaurant,
  categories,
}: {
  restaurant: Restaurant
  categories: Category[]
}) {
  const { setProducts } = useProductStore()
  const { setRestaurant } = useRestaurantStore()

  useEffect(() => {
    const allProducts = categories.flatMap((c) => c.products || [])
    setProducts(allProducts)
    setRestaurant(restaurant)
  }, [categories, restaurant, setProducts, setRestaurant])

  return null
}
