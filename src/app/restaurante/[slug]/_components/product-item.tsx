'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Dollar } from '@/components/icons/dollar'
import { Spiced } from '@/components/icons/spiced'
import { Vegan } from '@/components/icons/vegan'
import { formatCurrency } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import { Product } from '@/types/products'

export const ProductItem = ({ product }: { product: Product }) => {
  const { slug } = useParams()
  const hasDiscount = !!product.discount
  const basePrice = hasDiscount ? product.discount : product.price

  const renderTags = () => (
    <>
      {product.tags?.includes('vegan') && (
        <Vegan size={14} className="text-teal-400" aria-label="Vegan option" />
      )}
      {product.tags?.includes('spiced') && (
        <Spiced
          size={14}
          className="text-teal-400"
          aria-label="Spiced option"
        />
      )}
    </>
  )

  const renderPrice = () => (
    <div className="text-right text-sm font-bold">
      {hasDiscount && (
        <p className="text-xs text-neutral-500 line-through">
          {formatCurrency(product.price)}
        </p>
      )}
      {product.options?.sizes && (
        <p className="text-xs text-neutral-500">a partir de</p>
      )}
      <p
        className={cn(
          'text-purple-500',
          hasDiscount && 'flex items-center gap-0.5 text-green-500'
        )}
      >
        {hasDiscount && <Dollar size={12} className="text-green-500" />}
        {formatCurrency(basePrice ?? 0)}
      </p>
    </div>
  )

  return (
    <Link href={`/restaurante/${slug}/${product.id}`}>
      <div className="flex w-full items-center justify-between gap-4 p-2">
        <div>
          <div className="flex items-center gap-1">
            <h1
              className="text-sm font-semibold text-neutral-900"
              aria-label={product.name}
            >
              {product.name}
            </h1>
            {renderTags()}
          </div>
          <p className="line-clamp-2 text-xs text-neutral-500">
            {product.description}
          </p>
        </div>
        {renderPrice()}
      </div>
    </Link>
  )
}
