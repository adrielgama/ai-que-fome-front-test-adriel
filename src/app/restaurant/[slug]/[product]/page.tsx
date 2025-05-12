import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import restaurants from '@/data/restaurants.json'
import { Product } from '@/types/products'
import { Restaurant } from '@/types/restaurants'

const ProductDetail = dynamic(() => import('./_components/product-detail'))

type Params = Promise<{ slug: string; product: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, product } = await params
  const restaurant = (restaurants as Restaurant[]).find((r) => r.slug === slug)

  if (!restaurant) {
    return { title: 'Restaurante não encontrado' }
  }

  const allProducts =
    restaurant.categories?.flatMap((c) => {
      if (!Array.isArray(c.products)) return []
      return c.products.map((p) => ({
        ...p,
        categoryId: p.categoryId ?? c.id,
      })) as Product[]
    }) ?? []

  const found = allProducts.find((p) => p.id === Number(product))

  return {
    title: found
      ? `Restaurante ${restaurant.name} - ${found.name}`
      : `Restaurante ${restaurant.name}`,
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug, product } = await params
  const restaurant = restaurants.find((r) => r.slug === slug)

  if (!restaurant) return notFound()

  const allProducts =
    restaurant.categories?.flatMap((c) => {
      if (!Array.isArray(c.products)) return []
      return c.products.map((p) => ({
        ...p,
        categoryId: p.categoryId ?? c.id,
      })) as Product[]
    }) ?? []

  const found = allProducts.find((p) => p.id === Number(product))

  if (!found) return notFound()

  return (
    <div className="flex-grow lg:container lg:mx-auto">
      <ProductDetail product={found} />
    </div>
  )
}
