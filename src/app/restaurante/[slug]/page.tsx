import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import restaurants from '@/data/restaurants.json'
import { getRestaurantProducts } from '@/lib/get-restaurant-products'
import { Restaurant } from '@/types/restaurants'

import CategoriesList from './_components/categories-list'
import RestaurantHeader from './_components/restaurant-header'
import ClientRestaurantLoader from './_components/restaurant-loader'

type RestaurantePageParams = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const restaurant = (restaurants as Restaurant[]).find((r) => r.slug === slug)

  return {
    title: restaurant
      ? `Restaurante ${restaurant.name}`
      : 'Restaurante não encontrado',
  }
}

export default async function RestaurantePage({
  params,
}: RestaurantePageParams) {
  const { slug } = await params
  const restaurant = (restaurants as Restaurant[]).find((r) => r.slug === slug)
  const categories = await getRestaurantProducts(slug)

  if (!restaurant || !categories) return notFound()

  return (
    <main className="flex-grow space-y-6 p-4 lg:container lg:mx-auto">
      <ClientRestaurantLoader restaurant={restaurant} categories={categories} />
      <RestaurantHeader restaurant={restaurant} />
      <CategoriesList categories={categories} />
    </main>
  )
}
