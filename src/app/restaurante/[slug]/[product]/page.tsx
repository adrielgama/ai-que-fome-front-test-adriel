'use client'

import dynamic from 'next/dynamic'
import { use } from 'react'

const ProductDetail = dynamic(() => import('./_components/product-detail'), {
  ssr: false,
})

export default function Page({
  params,
}: {
  params: Promise<{ slug: string; product: string }>
}) {
  const { product } = use(params)

  return (
    <div className="flex-grow lg:container lg:mx-auto">
      <ProductDetail productId={product} />
    </div>
  )
}
