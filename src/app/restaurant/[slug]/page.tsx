import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import restaurants from '@/data/restaurants.json'
import { getRestaurantProducts } from '@/lib/get-restaurant-products'
import { Restaurant } from '@/types/restaurants'

const ClientRestaurantLoader = dynamic(
  () => import('./_components/restaurant-loader')
)
const RestaurantHeader = dynamic(
  () => import('./_components/restaurant-header')
)
const CategoriesList = dynamic(() => import('./_components/categories-list'))

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const restaurant = (restaurants as Restaurant[]).find((r) => r.slug === slug)

  return {
    title: restaurant
      ? `Restaurante ${restaurant.name}`
      : 'Restaurante não encontrado',
  }
}

export default async function RestaurantePageWrapper({
  params,
}: {
  params: Params
}) {
  const { slug } = await params
  const restaurant = (restaurants as Restaurant[]).find((r) => r.slug === slug)
  const categories = await getRestaurantProducts(slug)

  if (!restaurant || !categories) return notFound()

  return (
    <main className="flex-grow">
      <ClientRestaurantLoader restaurant={restaurant} />
      <RestaurantHeader restaurant={restaurant} />
      <CategoriesList categories={categories} />
    </main>
  )
}
