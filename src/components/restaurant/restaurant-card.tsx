'use client'

import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import { Restaurant } from '@/types/restaurants'

import { Bike } from '../icons/bike'
import { Delivery } from '../icons/delivery'
import { Star } from '../icons/star'

type Props = {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  const { name, logo, deliveryFee, rating, isOpen, hasDeliveryPromotion } =
    restaurant

  return (
    <Link
      href={`/restaurante/${restaurant.slug}`}
      aria-label="Ir para restaurante"
    >
      <div className="flex h-[4.5rem] items-center gap-3 rounded-lg bg-neutral-50 transition hover:bg-neutral-100">
        <Image
          src={logo}
          alt={name}
          width={72}
          height={72}
          className={cn(
            'rounded-l-lg border border-neutral-100 object-cover',
            !isOpen && 'opacity-40'
          )}
        />
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-neutral-700">{name}</h3>
          <div className="flex items-center gap-1 text-sm font-bold">
            {deliveryFee === 0 ? (
              <div className="flex items-center gap-0.5 text-teal-600">
                <Bike />
                <span>grátis</span>
              </div>
            ) : (
              <div className="flex items-center gap-0.5 text-purple-500">
                <Delivery />
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            )}
            {hasDeliveryPromotion && (
              <span className="text-xs text-neutral-400">•</span>
            )}
            <span className="flex items-center gap-1">
              <Star className="text-yellow-500" />
              <span className="text-neutral-500">{rating}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
