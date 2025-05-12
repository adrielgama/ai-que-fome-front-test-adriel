'use client'

import { useEffect } from 'react'

import { useProductStore } from '@/store/product-store'
import { useRestaurantStore } from '@/store/restaurant-store'
import { Restaurant } from '@/types/restaurants'

interface ClientRestaurantLoaderProps {
  restaurant: Restaurant
}

export default function ClientRestaurantLoader({
  restaurant,
}: ClientRestaurantLoaderProps) {
  const { ticket, clearTicket } = useProductStore()
  const { restaurant: currentRestaurant, setRestaurant } = useRestaurantStore()

  useEffect(() => {
    if (
      currentRestaurant &&
      currentRestaurant.slug !== restaurant.slug &&
      ticket.length > 0
    ) {
      clearTicket()
    }

    setRestaurant(restaurant)
  }, [restaurant, currentRestaurant, setRestaurant, clearTicket, ticket])

  return null
}
