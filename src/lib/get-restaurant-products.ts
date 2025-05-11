import restaurants from '@/data/restaurants.json'
import { Category } from '@/types/products'

export async function getRestaurantProducts(
  slug: string
): Promise<Category[] | null> {
  const restaurant = restaurants.find((r) => r.slug === slug)

  if (!restaurant) return null

  return restaurant.categories ?? []
}
