import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import restaurants from '@/data/restaurants.json'
import { Product } from '@/types/products'

const ProductDetail = dynamic(() => import('./_components/product-detail'))

interface ProductPageParams {
  params: { slug: string; product: string }
}

export default async function ProductPage({ params }: ProductPageParams) {
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
      <ProductDetail product={found} restaurantSlug={slug} />
    </div>
  )
}
