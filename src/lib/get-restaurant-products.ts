import restaurants from '@/data/restaurants.json'

export async function getRestaurantProducts(slug: string) {
  const restaurant = restaurants.find((r) => r.slug === slug)

  if (!restaurant) return null

  return restaurant.categories ?? []
}
