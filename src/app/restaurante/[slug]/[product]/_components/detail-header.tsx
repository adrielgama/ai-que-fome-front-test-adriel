'use client'

import { Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Plus } from '@/components/icons/plus'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatter'
import { Product } from '@/types/products'
import { memo, useMemo } from 'react'

interface DetailHeaderProps {
  product: Product
  quantity: number
  total: number
  onIncrease?: () => void
  onDecrease?: () => void
}

const DetailHeader = memo(function DetailHeader({
  product,
  quantity,
  total,
  onIncrease,
  onDecrease,
}: DetailHeaderProps) {
  const unitPrice = useMemo(
    () => product.discount || product.price,
    [product.discount, product.price]
  )

  return (
    <div className="border-b-4 border-neutral-100">
      <div className="relative aspect-[3/2] max-h-[12.1875rem] w-full">
        <Image
          src={product.image ?? '/images/placeholder.svg'}
          alt={product.name}
          fill
          priority
          className="object-cover lg:object-contain"
        />
      </div>

      <div className="space-y-1 px-4 py-3">
        <h1 className="text-xl font-bold text-neutral-700">{product.name}</h1>

        <div className="flex items-center gap-2">
          {product.options?.sizes && (
            <p className="text-sm font-extrabold text-neutral-500">
              a partir de
            </p>
          )}
          <p className="text-lg font-extrabold text-purple-500">
            {formatCurrency(unitPrice)}
          </p>
        </div>

        <p className="text-sm font-semibold text-neutral-500">
          {product.description}
        </p>
        {/* Quantidade */}
        <div className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-base font-bold text-neutral-700">quantos?</p>
            <p className="text-sm font-semibold text-neutral-500">
              total{' '}
              <span className="font-bold text-neutral-700">
                {formatCurrency(total)}
              </span>
            </p>
          </div>

          {quantity === 0 ? (
            <Button onClick={onIncrease} size="lg" className="bg-neutral-500">
              adicionar
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onDecrease}
                className="size-6 text-teal-400 hover:bg-transparent hover:text-teal-500/80"
                asChild
                aria-label="Remover produto"
              >
                <Trash2 />
              </Button>
              <span className="text-base font-bold text-neutral-700">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onIncrease}
                className="size-6 text-teal-400 hover:bg-transparent hover:text-teal-500/80"
                asChild
                aria-label="Adicionar produto"
              >
                <Plus />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default DetailHeader
