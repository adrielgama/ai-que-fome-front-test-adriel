'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/products'
import { formatCurrency } from '@/lib/formatter'
import { Button } from '@/components/ui/button'
import { Trash2, CirclePlus } from 'lucide-react'
import { Plus } from '@/components/icons/plus'

interface DetailHeaderProps {
  product: Product
}

export default function DetailHeader({ product }: DetailHeaderProps) {
  const [quantity, setQuantity] = useState(0)

  const unitPrice = product.price
  const total = quantity === 0 ? unitPrice : unitPrice * quantity

  const increase = () => setQuantity((q) => q + 1)
  const decrease = () => {
    if (quantity === 1) setQuantity(0)
    else if (quantity > 1) setQuantity((q) => q - 1)
  }

  return (
    <div className="border-b-4 border-neutral-100">
      <div className="relative aspect-[3/2] max-h-[12.1875rem] w-full">
        <Image
          src={product.image ?? '/images/placeholder.svg'}
          alt={product.name}
          fill
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
            <Button onClick={increase} size="lg" className="bg-neutral-500">
              adicionar
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrease}
                className="size-6 text-teal-400 hover:bg-transparent hover:text-teal-500/80"
                asChild
              >
                <Trash2 />
              </Button>
              <span className="text-base font-bold text-neutral-700">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increase}
                className="size-6 text-teal-400 hover:bg-transparent hover:text-teal-500/80"
                asChild
              >
                <Plus />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
