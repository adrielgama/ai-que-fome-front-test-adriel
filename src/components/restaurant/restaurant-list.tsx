'use client'

import restaurants from '@/data/restaurants.json'
import { Restaurant } from '@/types/restaurants'

import RestaurantCard from './restaurant-card'

export default function RestaurantList({
  searchQuery,
}: {
  searchQuery: string
}) {
  const restaurantList = restaurants as Restaurant[]

  const filteredRestaurants = restaurantList.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const open = filteredRestaurants.filter((s) => s.isOpen)
  const closed = filteredRestaurants.filter((s) => !s.isOpen)

  return (
    <div className="space-y-4 px-4 py-6">
      <h2 className="text-xl font-extrabold text-purple-500">abertos</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        {open.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold text-purple-500">fechados</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        {closed.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
